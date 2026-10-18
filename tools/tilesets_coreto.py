"""Assemble, install and verify the redrawn Coreto tilesets (Pillow + NumPy)."""

import argparse
import hashlib
import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'rpg-maker/Terminus'
ASSETS = ROOT / 'assets/tilesets-coreto'
ORIGINALS = ASSETS / 'originais'
OUTPUT = ASSETS / 'processados'
MANIFEST = ASSETS / 'manifest.json'
REVISION = ASSETS / 'redesenho-v2'
GENERATED = REVISION / 'gerados'
PAPER = (244, 215, 160, 255)


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def assemble(original, generated, quarters):
    source = np.array(original.convert('RGBA'))
    registered = generated.convert('RGBA').resize(original.size, Image.Resampling.LANCZOS)
    backing = np.full_like(source, PAPER)
    dark = (source[:, :, :3].max(axis=2) < 48) & (source[:, :, 3] > 0)
    backing[dark, :3] = (47, 36, 22)
    canvas = Image.fromarray(backing)
    canvas.alpha_composite(registered)
    result = np.array(canvas)
    result[:, :, 3] = source[:, :, 3]
    invisible = source[:, :, 3] == 0
    result[invisible] = source[invisible]
    # MZ recombines 24 px quarters. Identical source pieces must keep one
    # drawing across sheets and animation frames instead of drifting.
    for y in range(0, source.shape[0], 24):
        for x in range(0, source.shape[1], 24):
            key = source[y:y + 24, x:x + 24].tobytes()
            if key in quarters:
                result[y:y + 24, x:x + 24] = quarters[key]
            else:
                quarters[key] = result[y:y + 24, x:x + 24].copy()
    return Image.fromarray(result)


def verify(manifest, directory):
    failures = []
    quarters = {}
    repeated_quarters = 0
    for entry in manifest['sheets']:
        name = entry['name']
        original_path = ORIGINALS / name
        if digest(original_path) != entry['original_sha256']:
            failures.append(f'{name}: original alterado')
        with Image.open(original_path) as image:
            original = np.array(image.convert('RGBA'))
        with Image.open(directory / name) as image:
            if list(image.size) != entry['size'] or image.mode != 'RGBA':
                failures.append(f'{name}: tamanho ou modo incorreto')
                continue
            result = np.array(image)
        if not np.array_equal(original[:, :, 3], result[:, :, 3]):
            failures.append(f'{name}: transparência alterada')
        invisible = original[:, :, 3] == 0
        if not np.array_equal(original[invisible], result[invisible]):
            failures.append(f'{name}: pixels invisíveis alterados')
        if np.array_equal(original, result):
            failures.append(f'{name}: nenhum tratamento aplicado')
        for y in range(0, original.shape[0], 24):
            for x in range(0, original.shape[1], 24):
                source_key = original[y:y + 24, x:x + 24].tobytes()
                output_key = result[y:y + 24, x:x + 24].tobytes()
                if source_key in quarters:
                    repeated_quarters += 1
                    if quarters[source_key] != output_key:
                        failures.append(f'{name}: peça repetida recebeu tratamento diferente em {x},{y}')
                else:
                    quarters[source_key] = output_key
        if entry.get('output_sha256') and digest(directory / name) != entry['output_sha256']:
            failures.append(f'{name}: resultado diferente do manifesto')
    for relative, expected in manifest['protected'].items():
        if digest(PROJECT / relative) != expected:
            failures.append(f'{relative}: dados ou configuração alterados desde o snapshot')
    if failures:
        raise ValueError('\n'.join(failures))
    return {'sheets': len(manifest['sheets']), 'dimensions': 'preserved',
            'alpha': 'pixel-identical', 'invisible_pixels': 'unchanged',
            'data_and_plugins': 'unchanged', 'identical_repeated_quarters': repeated_quarters}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['build', 'install', 'verify'])
    args = parser.parse_args()
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    if args.action == 'build':
        missing = [e['name'] for e in manifest['sheets'] if not (GENERATED / e['name']).exists()]
        if missing:
            raise ValueError('Redesenhos ausentes: ' + ', '.join(missing))
        OUTPUT.mkdir(parents=True, exist_ok=True)
        manifest['method'] = 'Redesenho com image_gen; adaptação à grade e máscara alfa nativas'
        manifest['revision'] = 2
        manifest['palette'] = {'paper': list(PAPER[:3]), 'ink': [47, 36, 22]}
        manifest['protected'] = json.loads((REVISION / 'baseline-dados.json').read_text(encoding='utf-8'))
        quarters = {}
        for entry in manifest['sheets']:
            source = ORIGINALS / entry['name']
            if digest(source) != entry['original_sha256']:
                raise ValueError(f'Original alterado: {source.name}')
            entry.setdefault('installed_sha256', entry['output_sha256'])
            with Image.open(source) as image, Image.open(GENERATED / source.name) as generated:
                assemble(image, generated, quarters).save(OUTPUT / source.name)
                entry['generated_size'] = list(generated.size)
            entry['generated_sha256'] = digest(GENERATED / source.name)
            entry['output_sha256'] = digest(OUTPUT / source.name)
        print(json.dumps(verify(manifest, OUTPUT)))
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    elif args.action == 'install':
        verify(manifest, OUTPUT)
        for entry in manifest['sheets']:
            target = PROJECT / 'img/tilesets' / entry['name']
            if digest(target) not in (entry['original_sha256'], entry['output_sha256'], entry['installed_sha256']):
                raise ValueError(f'Tileset editado fora deste processo: {target.name}')
        for entry in manifest['sheets']:
            shutil.copy2(OUTPUT / entry['name'], PROJECT / 'img/tilesets' / entry['name'])
            entry['installed_sha256'] = entry['output_sha256']
        print(json.dumps(verify(manifest, PROJECT / 'img/tilesets')))
        MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    else:
        print(json.dumps(verify(manifest, PROJECT / 'img/tilesets')))


if __name__ == '__main__':
    main()
