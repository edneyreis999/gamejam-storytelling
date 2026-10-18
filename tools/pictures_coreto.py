"""Prepare, export and verify the Coreto portrait replacements."""

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets/pictures-coreto'
TARGET = ROOT / 'rpg-maker/Terminus/img/pictures'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def contact(paths, destination):
    canvas = Image.new('RGB', (1320, 750), '#e9d4ac')
    draw = ImageDraw.Draw(canvas)
    for index, path in enumerate(paths):
        x, y = index % 4 * 330, index // 4 * 375
        portrait = Image.open(path).convert('RGBA')
        canvas.paste(portrait, (x, y + 25), portrait)
        draw.text((x + 8, y + 5), path.name, fill='#21190f')
    canvas.save(destination)


def prepare():
    for directory in ('originais', 'gerados', 'processados', 'verificacao'):
        (ASSETS / directory).mkdir(parents=True, exist_ok=True)
    manifest_path = ASSETS / 'manifest.json'
    if manifest_path.exists():
        raise FileExistsError(manifest_path)
    entries = []
    for path in sorted(TARGET.glob('*.png')):
        shutil.copy2(path, ASSETS / 'originais' / path.name)
        entries.append({'name': path.name, 'size': list(Image.open(path).size),
                        'original_sha256': digest(path)})
    manifest_path.write_text(json.dumps({'status': 'em desenvolvimento',
                                        'portraits': entries}, indent=2))
    paths = sorted((ASSETS / 'originais').glob('*.png'))
    for start in range(0, len(paths), 8):
        contact(paths[start:start + 8], ASSETS / 'verificacao' / f'originais-{start // 8 + 1:02}.png')


def build():
    manifest_path = ASSETS / 'manifest.json'
    manifest = json.loads(manifest_path.read_text())
    for entry in manifest['portraits']:
        source = ASSETS / 'gerados' / entry['name']
        if not source.exists():
            continue
        image = Image.open(source).convert('RGBA')
        alpha = image.getchannel('A')
        if alpha.getextrema()[0] != 0 or alpha.getextrema()[1] != 255:
            raise ValueError(f'{source.name}: missing transparent background or opaque subject')
        image = image.resize(tuple(entry['size']), Image.Resampling.LANCZOS)
        output = ASSETS / 'processados' / entry['name']
        image.save(output)
        entry['generated_sha256'] = digest(source)
        entry['output_sha256'] = digest(output)
        entry['status'] = 'redesenhado'
    manifest_path.write_text(json.dumps(manifest, indent=2))
    paths = sorted((ASSETS / 'processados').glob('*.png'))
    for start in range(0, len(paths), 8):
        contact(paths[start:start + 8], ASSETS / 'verificacao' / f'coreto-{start // 8 + 1:02}.png')


def install():
    manifest = json.loads((ASSETS / 'manifest.json').read_text())
    for entry in manifest['portraits']:
        if entry.get('status') == 'bloqueado_pela_ferramenta':
            assert digest(TARGET / entry['name']) == entry['original_sha256'], entry['name']
            continue
        output = ASSETS / 'processados' / entry['name']
        assert digest(output) == entry['output_sha256'], output
        assert digest(TARGET / entry['name']) in (entry['original_sha256'], entry['output_sha256']), entry['name']
    for entry in manifest['portraits']:
        if entry.get('status') != 'bloqueado_pela_ferramenta':
            shutil.copy2(ASSETS / 'processados' / entry['name'], TARGET / entry['name'])


def verify():
    manifest = json.loads((ASSETS / 'manifest.json').read_text())
    blocked = []
    for entry in manifest['portraits']:
        assert digest(ASSETS / 'originais' / entry['name']) == entry['original_sha256']
        if entry.get('status') == 'bloqueado_pela_ferramenta':
            assert digest(TARGET / entry['name']) == entry['original_sha256'], entry['name']
            blocked.append(entry['name'])
            continue
        image = Image.open(TARGET / entry['name'])
        assert image.mode == 'RGBA' and list(image.size) == entry['size'], entry['name']
        assert image.getchannel('A').getextrema() == (0, 255), entry['name']
        assert digest(TARGET / entry['name']) == entry['output_sha256'], entry['name']
    report = {'portraits': len(manifest['portraits']) - len(blocked),
              'blocked_originals_preserved': blocked, 'size': [330, 350],
              'format': 'RGBA', 'transparency': 'verified', 'originals': 'preserved',
              'installed_hashes': 'verified'}
    (ASSETS / 'verificacao/integridade.json').write_text(json.dumps(report, indent=2))
    print(json.dumps(report))


def compare():
    names = ('Actor1_1.png', 'Monster_7.png', 'Nature_1.png')
    canvas = Image.new('RGB', (990, 750), '#e9d4ac')
    draw = ImageDraw.Draw(canvas)
    for row, (directory, label) in enumerate((('originais', 'Original'), ('processados', 'Coreto'))):
        for column, name in enumerate(names):
            x, y = column * 330, row * 375
            portrait = Image.open(ASSETS / directory / name).convert('RGBA')
            canvas.paste(portrait, (x, y + 25), portrait)
            draw.text((x + 8, y + 5), f'{label} - {name}', fill='#21190f')
    canvas.save(ASSETS / 'verificacao/comparacao.png')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=('prepare', 'build', 'install', 'verify', 'compare'))
    globals()[parser.parse_args().action]()
