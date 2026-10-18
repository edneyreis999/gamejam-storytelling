"""Compõe retoques de pixels desenhados por personagem, direção e pose."""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw

from retocar_pilotos import cell
from spritesheets import inspect

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / 'docs/terminus/arte/personagens/camadas-correcao.json'


def paint_layer(spans, palette):
    layer = Image.new('RGBA', (40, 55))
    for y, x, colors in spans:
        for offset, color in enumerate(colors):
            if color != '.':
                layer.putpixel((x + offset, y), tuple(palette[color]) + (255,))
    return layer


def render(original, config):
    result = original.copy()
    for pose in config['poses']:
        row, col = pose['cell']
        original_frame = cell(original, row, col)
        upper = original_frame.copy()
        edit_mask = Image.new('L', (40, 55))
        erase = ImageDraw.Draw(upper)
        for polygon in pose['erase']:
            erase.polygon([tuple(p) for p in polygon], fill=(0, 0, 0, 0))
            ImageDraw.Draw(edit_mask).polygon([tuple(p) for p in polygon], fill=255)
        frame = Image.new('RGBA', (40, 55))
        for layer in pose['layers']:
            frame.alpha_composite(paint_layer(layer['spans'], config['palette']))
        frame.alpha_composite(upper)
        frame = Image.composite(frame, original_frame, edit_mask)
        result.paste(frame, (col * 40, row * 55))
    return result


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def finish(name, destination):
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    config = json.loads(CONFIG.read_text(encoding='utf-8'))[name]
    origin = ROOT / config['source']
    original = Image.open(origin).convert('RGBA')
    result = render(original, config)
    result.save(destination)
    report = inspect(destination)
    report.update(origem=config['source'], origem_sha256=sha(origin),
                  resultado_sha256=sha(destination), script='tools/retocar_camadas.py',
                  script_sha256=sha(Path(__file__)), configuracao=config,
                  metodo='Retoque manual em pixels: pernas inteiras em camadas independentes, compostas atrás da roupa preservada.')
    destination.with_suffix('.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return report


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem')
    parser.add_argument('destino', type=Path)
    args = parser.parse_args()
    print(json.dumps(finish(args.personagem, args.destino), ensure_ascii=False, indent=2))
