"""Export and inspect Terminus spritesheets. Requires Pillow and NumPy."""

import argparse
import hashlib
import json
import os
from pathlib import Path

import numpy as np
from PIL import Image


SIZE = (120, 220)
BASELINE = 52


def occupied_runs(mask):
    edges = np.diff(np.pad(mask.astype(int), (1, 1)))
    return list(zip(np.flatnonzero(edges == 1), np.flatnonzero(edges == -1)))


def inspect(path):
    with Image.open(path) as source:
        original_format = source.format
        original_mode = source.mode
        size = source.size
        pixels = np.asarray(source.convert('RGBA'))
    alpha = pixels[:, :, 3]
    errors = []
    if original_format != 'PNG':
        errors.append('O arquivo precisa ser PNG.')
    if size != SIZE:
        errors.append(f'Dimensão {size}; esperado {SIZE}.')
    if original_mode != 'RGBA' or not np.any(alpha == 0):
        errors.append('PNG precisa de canal alfa e pixels transparentes.')
    cells = []
    if size == SIZE:
        for row in range(4):
            for col in range(3):
                cell = pixels[row * 55:(row + 1) * 55, col * 40:(col + 1) * 40]
                y, x = np.nonzero(cell[:, :, 3])
                if not len(x):
                    errors.append(f'Célula {row},{col} vazia.')
                    continue
                bounds = [int(x.min()), int(y.min()), int(x.max()) + 1, int(y.max()) + 1]
                if bounds[0] == 0 or bounds[1] == 0 or bounds[2] == 40 or bounds[3] == 55:
                    errors.append(f'Célula {row},{col} encosta na borda.')
                if bounds[3] != BASELINE + 1:
                    errors.append(f'Célula {row},{col} não apoia os pés em y={BASELINE}.')
                cells.append({'linha': row, 'coluna': col, 'limites': bounds})
        for row in range(4):
            a = pixels[row * 55:(row + 1) * 55, :40]
            b = pixels[row * 55:(row + 1) * 55, 80:120]
            if np.array_equal(a, b):
                errors.append(f'Linha {row}: passos A e B idênticos.')
    return {'arquivo': path.as_posix(), 'dimensoes': list(size), 'modo': original_mode,
            'pixels_transparentes': int(np.sum(alpha == 0)), 'celulas': cells,
            'erros': errors, 'aprovacao_visual': None}


def export(source_path, destination, height):
    if destination.exists():
        raise ValueError(f'O destino já existe; escolha outra versão: {destination}')
    source = Image.open(source_path).convert('RGBA')
    pixels = np.array(source)
    mask = pixels[:, :, 3] >= 128
    if mask[0].any() or mask[-1].any() or mask[:, 0].any() or mask[:, -1].any():
        raise ValueError('O original encosta na borda externa; conferir possível corte antes de exportar.')
    rows = occupied_runs(mask.any(axis=1))
    if len(rows) != 4:
        raise ValueError(f'Esperadas quatro faixas separadas; encontradas {len(rows)}. Revisar o original.')
    frames = []
    for top, bottom in rows:
        columns = occupied_runs(mask[top:bottom].any(axis=0))
        if len(columns) != 3:
            raise ValueError('Esperados três personagens separados por faixa. Revisar o original.')
        row_frames = []
        for left, right in columns:
            y, x = np.nonzero(mask[top:bottom, left:right])
            row_frames.append((int(left + x.min()), int(top + y.min()),
                               int(left + x.max() + 1), int(top + y.max() + 1)))
        frames.append(row_frames)
    max_height = max(b - t for row in frames for l, t, r, b in row)
    # Keep one anchor per source column instead of centering each moving silhouette.
    anchors = [float(np.median([(row[col][0] + row[col][2]) / 2 for row in frames])) for col in range(3)]
    half_width = max(max(abs(l - anchors[col]), abs(r - anchors[col]))
                     for row in frames for col, (l, t, r, b) in enumerate(row))
    scale = min(height / max_height, 18 / half_width)
    pixels[:, :, 3] = np.where(mask, 255, 0)
    pixels[~mask, :3] = 0
    cleaned = Image.fromarray(pixels)
    sheet = Image.new('RGBA', SIZE)
    placement = []
    for row_index, row in enumerate(frames):
        for col, bounds in enumerate(row):
            left, top, right, bottom = bounds
            width = max(1, round((right - left) * scale))
            frame_height = max(1, round((bottom - top) * scale))
            frame = cleaned.crop(bounds).resize((width, frame_height), Image.Resampling.NEAREST)
            x = round(20 + (left - anchors[col]) * scale)
            y = BASELINE + 1 - frame_height
            if x < 1 or y < 1 or x + width > 39 or y + frame_height > 54:
                raise ValueError(f'Quadro {row_index},{col} ultrapassa a margem; revisar escala e origem.')
            sheet.alpha_composite(frame, (col * 40 + x, row_index * 55 + y))
            placement.append({'linha': row_index, 'coluna': col, 'origem': list(bounds),
                              'destino': [x, y, width, frame_height]})
    destination.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(destination)
    report = inspect(destination)
    report.update({'origem': source_path.as_posix(),
                   'origem_sha256': hashlib.sha256(source_path.read_bytes()).hexdigest(),
                   'metodo': 'Escala única, nearest-neighbor, alfa binário 128, âncoras fixas por coluna, apoio y=52.',
                   'escala': scale, 'altura_maxima_solicitada': height, 'posicionamento': placement})
    destination.with_suffix('.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return report


def gallery(manifest):
    data = json.loads(manifest.read_text(encoding='utf-8'))
    root = Path(__file__).resolve().parents[1]
    records = []
    status = {'pendente_de_correcao_visual': 'Correção visual pendente',
              'aguarda_aprovacao': 'Aguardando aprovação', 'aprovado': 'Aprovado'}
    for entry in sorted(data['folhas'], key=lambda entry: entry['estado'] == 'aprovado'):
        if not entry.get('arquivo_candidato'):
            continue
        candidate = root / (entry.get('arquivo_final') or entry['arquivo_candidato'])
        name = entry['nome'] + (f" — {entry['forma']}" if entry.get('forma') else '')
        records.append({'id': entry['id'], 'nome': name, 'estado': status.get(entry['estado'], entry['estado']),
                        'resumo': entry['resumo'],
                        'observacoes': entry['revisao_visual']['observacoes'],
                        'imagem': Path(os.path.relpath(candidate, manifest.parent)).as_posix()})
    approved = sum(entry['aprovacao_usuario'] is not None for entry in data['folhas'])
    payload = {'resumo': f'{len(records)} folhas disponíveis para inspeção; {approved} de 42 folhas aprovadas.',
               'folhas': records, 'proxima_condicao': data['proxima_condicao']}
    if data.get('estudo_neral'):
        study = data['estudo_neral']
        payload['estudo_neral'] = {
            'estado': 'Estudo aprovado' if study['estado'] == 'aprovado' else 'Estudo aguardando aprovação',
            'imagem': Path(os.path.relpath(root / study['prancha'], manifest.parent)).as_posix(),
            'observacoes': study['observacoes']}
    target = manifest.parent / 'galeria-dados.js'
    target.write_text('window.SPRITESHEETS = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print(target)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    export_parser = commands.add_parser('export')
    export_parser.add_argument('source', type=Path)
    export_parser.add_argument('destination', type=Path)
    export_parser.add_argument('--height', type=int, choices=range(35, 53), default=50)
    check_parser = commands.add_parser('check')
    check_parser.add_argument('paths', type=Path, nargs='+')
    gallery_parser = commands.add_parser('gallery')
    gallery_parser.add_argument('manifest', type=Path)
    args = parser.parse_args()
    if args.command == 'export':
        reports = [export(args.source, args.destination, args.height)]
    elif args.command == 'check':
        reports = [inspect(path) for path in args.paths]
    else:
        gallery(args.manifest)
        return
    print(json.dumps(reports, ensure_ascii=False, indent=2))
    raise SystemExit(1 if any(report['erros'] for report in reports) else 0)


if __name__ == '__main__':
    main()
