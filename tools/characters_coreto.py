"""Export and verify Coreto redraws on the native RPG Maker character grids."""

import argparse
import hashlib
import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'rpg-maker/Terminus'
ASSETS = ROOT / 'assets/characters-coreto'
MANIFEST = ASSETS / 'manifest.json'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def grid_cells(image, columns, rows):
    for row in range(rows):
        for column in range(columns):
            yield image.crop((round(column * image.width / columns),
                              round(row * image.height / rows),
                              round((column + 1) * image.width / columns),
                              round((row + 1) * image.height / rows)))


def separators(projection, count):
    step = len(projection) / count
    result = [0]
    for i in range(1, count):
        nominal = i * step
        left, right = round(nominal - step * 0.2), round(nominal + step * 0.2)
        window = projection[left:right]
        minima = np.flatnonzero(window == window.min()) + left
        breaks = np.flatnonzero(np.diff(minima) > 1) + 1
        centers = [float(np.mean(run)) for run in np.split(minima, breaks)]
        result.append(round(min(centers, key=lambda center: abs(center - nominal))))
    return result + [len(projection)]


def generated_cells(image, columns, rows):
    # Generated spacing drifts; find the gaps before rebuilding the native grid.
    mask = np.array(image.getchannel('A')) >= 128
    ys = separators(mask.sum(axis=1), rows)
    width, height = image.width / columns, image.height / rows
    margin_x, margin_y = round(width * 0.25), round(height * 0.25)
    cells = []
    for row in range(rows):
        xs = separators(mask[ys[row]:ys[row + 1]].sum(axis=0), columns)
        for column in range(columns):
            box = (xs[column], ys[row], xs[column + 1], ys[row + 1])
            cell = Image.new('RGBA', (round(width) + margin_x * 2, round(height) + margin_y * 2))
            cell.alpha_composite(image.crop(box), (round(box[0] - column * width) + margin_x,
                                                   round(box[1] - row * height) + margin_y))
            cells.append(cell)
    return cells


def export(entry):
    name = entry['name']
    original = Image.open(ASSETS / 'originais' / name).convert('RGBA')
    generated = Image.open(ASSETS / 'gerados' / name).convert('RGBA')
    pixels = np.array(generated)
    light = (pixels[:, :, :3] @ np.array([0.299, 0.587, 0.114]) - 18) / 210
    light = np.clip(light, 0, 1) ** 0.9
    pixels[:, :, :3] = np.rint(np.array([19, 15, 9]) + light[:, :, None] * np.array([229, 205, 160])).astype(np.uint8)
    generated = Image.fromarray(pixels)
    columns, rows = entry['grid']
    if name.startswith('!'):
        # Object animation states must retain their native hinges and cutouts.
        result = Image.new('RGBA', original.size)
        width, height = original.width // columns, original.height // rows
        for i, (source, drawing) in enumerate(zip(grid_cells(original, columns, rows), grid_cells(generated, columns, rows))):
            source_box = source.getbbox()
            if not source_box:
                continue
            box = drawing.getchannel('A').point(lambda a: 255 if a >= 128 else 0).getbbox()
            if not box:
                raise ValueError(f'{name}: geração perdeu o objeto {i}')
            drawing = drawing.crop(box).resize((source_box[2] - source_box[0], source_box[3] - source_box[1]), Image.Resampling.LANCZOS)
            backing = np.full((source.height, source.width, 4), [244, 215, 160, 255], dtype=np.uint8)
            source_pixels = np.array(source)
            backing[source_pixels[:, :, :3].max(axis=2) < 32, :3] = [30, 23, 15]
            frame = Image.fromarray(backing)
            frame.alpha_composite(drawing, source_box[:2])
            frame.putalpha(source.getchannel('A'))
            result.alpha_composite(frame, ((i % columns) * width, (i // columns) * height))
        return result

    source_cells = list(grid_cells(original, columns, rows))
    drawing_cells = generated_cells(generated, columns, rows)
    for frame in drawing_cells:
        frame.putalpha(frame.getchannel('A').point(lambda a: 255 if a >= 128 else 0))
    result = Image.new('RGBA', original.size)
    cell_width, cell_height = original.width // columns, original.height // rows
    group_height = 1 if 'Damage' in name or name.startswith('$BigMonster') else 4
    for group_y in range(0, rows, group_height):
        for group_x in range(0, columns, 3):
            indices = [(group_y + y) * columns + group_x + x for y in range(group_height) for x in range(3)]
            occupied = [i for i in indices if source_cells[i].getbbox()]
            if not occupied:
                continue
            if any(not drawing_cells[i].getbbox() for i in occupied):
                raise ValueError(f'{name}: geração perdeu um quadro ocupado')
            source_bounds = [source_cells[i].getbbox() for i in occupied]
            bounds = [drawing_cells[i].getbbox() for i in occupied]
            max_height = max(b[3] - b[1] for b in bounds)
            max_width = max(b[2] - b[0] for b in bounds)
            anchors = {}
            for row in range(group_y, group_y + group_height):
                row_boxes = [drawing_cells[row * columns + group_x + x].getbbox() for x in range(3)]
                if any(row_boxes):
                    anchors[row] = float(np.median([(b[0] + b[2]) / 2 for b in row_boxes if b]))
            half_width = max(max(anchors[i // columns] - b[0], b[2] - anchors[i // columns])
                             for i, b in zip(occupied, bounds))
            scale = min(max(b[3] - b[1] for b in source_bounds) / max_height,
                        max(b[2] - b[0] for b in source_bounds) / max_width,
                        (cell_width / 2 - 1) / half_width,
                        min((s[3] - 1) / (b[3] - b[1]) for s, b in zip(source_bounds, bounds)))
            for i, source_box, box in zip(occupied, source_bounds, bounds):
                frame = drawing_cells[i].crop(box)
                frame = frame.resize((max(1, round(frame.width * scale)),
                                      max(1, round(frame.height * scale))), Image.Resampling.LANCZOS)
                # One row anchor keeps motion from being recentered frame by frame.
                anchor = anchors[i // columns]
                x = round(cell_width / 2 + (box[0] - anchor) * scale)
                y = source_box[3] - frame.height
                if x < 0 or y < 0 or x + frame.width > cell_width or y + frame.height > cell_height:
                    raise ValueError(f'{name}: quadro {i} ultrapassa a célula')
                result.alpha_composite(frame, ((i % columns) * cell_width + x, (i // columns) * cell_height + y))
    return result


def verify(manifest, directory):
    frames = 0
    for entry in manifest['sheets']:
        name = entry['name']
        original_path = ASSETS / 'originais' / name
        if digest(original_path) != entry['original_sha256']:
            raise ValueError(f'{name}: original modificado')
        original = Image.open(original_path).convert('RGBA')
        result = Image.open(directory / name)
        if list(result.size) != entry['size'] or result.mode != 'RGBA':
            raise ValueError(f'{name}: formato ou dimensão incorretos')
        if digest(directory / name) != entry['output_sha256']:
            raise ValueError(f'{name}: hash diferente do manifesto')
        for i, (before, after) in enumerate(zip(grid_cells(original, *entry['grid']), grid_cells(result, *entry['grid']))):
            if bool(before.getbbox()) != bool(after.getbbox()):
                raise ValueError(f'{name}: ocupação alterada no quadro {i}')
            frames += bool(before.getbbox())
        if name.startswith('!') and original.getchannel('A').tobytes() != result.getchannel('A').tobytes():
            raise ValueError(f'{name}: máscara dos objetos alterada')
    for relative, expected in manifest['protected'].items():
        if digest(PROJECT / relative) != expected:
            raise ValueError(f'{relative}: arquivo protegido mudou desde o início')
    return {'sheets': len(manifest['sheets']), 'occupied_frames': frames,
            'dimensions': 'preserved', 'cell_occupancy': 'preserved',
            'object_alpha': 'pixel-identical', 'protected_files': 'unchanged'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['build', 'install', 'verify'])
    parser.add_argument('--only', help='Export one pilot without updating the manifest.')
    args = parser.parse_args()
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    output = ASSETS / 'processados'
    if args.action == 'build':
        selected = [e for e in manifest['sheets'] if not args.only or e['name'] == args.only]
        if not selected:
            raise ValueError('Folha não encontrada')
        for entry in selected:
            if digest(ASSETS / 'originais' / entry['name']) != entry['original_sha256']:
                raise ValueError('Original alterado: ' + entry['name'])
            export(entry).save(output / entry['name'])
            entry['output_sha256'] = digest(output / entry['name'])
            entry['generated_sha256'] = digest(ASSETS / 'gerados' / entry['name'])
        if not args.only:
            print(json.dumps(verify(manifest, output)))
            MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    elif args.action == 'install':
        verify(manifest, output)
        target = PROJECT / 'img/characters'
        for entry in manifest['sheets']:
            if digest(target / entry['name']) not in (entry['original_sha256'], entry['output_sha256']):
                raise ValueError('Arquivo editado fora deste processo: ' + entry['name'])
        for entry in manifest['sheets']:
            shutil.copy2(output / entry['name'], target / entry['name'])
        print(json.dumps(verify(manifest, target)))
    else:
        print(json.dumps(verify(manifest, PROJECT / 'img/characters')))


if __name__ == '__main__':
    main()
