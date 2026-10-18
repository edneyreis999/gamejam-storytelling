"""Acabamento de pixels autorizado em 18/10/2026; mantém os originais."""

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

from spritesheets import inspect


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/terminus/personagens/em-revisao'
CONFIG = {
    'rheed': (4, 6, 43, (8, 46, 19, 53), 17, 32),
    'ghork': (1, 2, 43, (10, 48, 18, 53), 15, 31),
    'borun': (2, 3, 46, (9, 48, 18, 53), 15, 34),
    'nima': (2, 5, 43, (10, 48, 18, 53), 15, 34),
}
INK = '#21180e'


def cell(sheet, row, col):
    return sheet.crop((col * 40, row * 55, col * 40 + 40, row * 55 + 55))


def alternate_legs(frame, source_left, name, row, start):
    """Perna próxima recua no passo B; os dois pés apontam na direção da vista."""
    layer = Image.new('RGBA', (40, 55))
    draw = ImageDraw.Draw(layer)
    near_pants = {'rheed': '#705032', 'ghork': '#735231',
                  'borun': '#957044', 'nima': '#d4b07a'}[name]
    near_light = {'rheed': '#89623a', 'ghork': '#967046',
                  'borun': '#b28b57', 'nima': '#eac994'}[name]
    front, back = (15, 24) if name == 'ghork' else (14, 26)
    boot_box, ankle = CONFIG[name][3:5]
    boot = source_left.crop(boot_box)
    for hip, foot, far in [(18, front, True), (23, back, False)]:
        knee = (hip + foot) // 2
        width = 2 if name == 'nima' else 3
        draw.polygon([(hip-width,start), (hip+width,start), (knee+width,47),
                      (foot+2,50), (foot-2,50), (knee-width,47)], fill=INK)
        draw.line([(hip,start),(knee,47),(foot,50)],
                  fill='#46311d' if far else near_pants, width=width+1)
        if not far:
            draw.line([(hip-1,start),(knee-1,47),(foot-1,49)], fill=near_light)
        pixels = np.array(boot)
        if far:
            pixels[:,:,:3] = (pixels[:,:,:3] * 0.68).astype(np.uint8)
        layer.alpha_composite(Image.fromarray(pixels), (boot_box[0] + foot - ankle, boot_box[1]))
    if row == 2:
        layer = ImageOps.mirror(layer)
    frame.paste((0,0,0,0),(0,start,40,55))
    frame.alpha_composite(layer)
    return frame


def arm(frame, name, row, phase):
    if name == 'borun':
        return frame
    head_y = CONFIG[name][-1]
    head = frame.crop((0, 0, 40, head_y))
    # Coordenadas de desenho na vista esquerda; só o traçado do braço muda de lado.
    axis = 38 if name == 'rheed' else 41
    def point(x, y):
        return (x if row == 1 else axis - x, y)
    def polygon(points, color):
        draw.polygon([point(x, y) for x, y in points], fill=color)
    draw = ImageDraw.Draw(frame)
    if name == 'rheed':
        shoulder, end, body = 33, 43, '#4f351f'
        erase = [(23, 35), (35, 35), (35, 44), (23, 44)]
    elif name == 'ghork':
        shoulder, end, body = 32, 42, '#88643b'
        erase = [(21, 33), (25, 33), (25, 41), (23, 42), (21, 39)]
    else:
        shoulder, end, body = 35, 44, '#4b311c'
        erase = [(23, 35), (31, 35), (31, 44), (23, 44)]
    polygon(erase, (0, 0, 0, 0))
    polygon([(20, shoulder + 1), (24, shoulder + 2), (24, end - 1),
             (21, end), (20, end - 1)], INK)
    polygon([(21, shoulder + 2), (23, shoulder + 3), (23, end - 2),
             (21, end - 1)], body)
    elbow_x, hand_x = (26, 28) if phase == 0 else (20, 17)
    points = [point(23, shoulder), point(elbow_x, shoulder + 4), point(hand_x, shoulder + 6)]
    draw.line(points, fill=INK, width=5)
    for x, y in points:
        draw.ellipse((x-2,y-2,x+2,y+2), fill=INK)
    sleeve = '#76512d' if name == 'rheed' else '#d7ad71'
    draw.line(points, fill=sleeve, width=3)
    draw.line([point(23, shoulder), point(elbow_x, shoulder + 3)],
              fill='#a57a46' if name == 'rheed' else '#f0ce94', width=1)
    hx, hy = point(hand_x, shoulder + 6)
    draw.rectangle((hx - 1, hy - 1, hx + 1, hy + 1), fill='#d4a066')
    draw.point((hx, hy - 1), fill='#f0c486')
    frame.paste(head, (0, 0))
    return frame


def vials(frame, row):
    draw = ImageDraw.Draw(frame)
    # Remove os frascos gerados em posições diferentes, restaurando o tecido.
    regions = {0: [(13, 39, 16, 42), (24, 35, 29, 43)],
               1: [], 2: [(17, 36, 24, 42)],
               3: [(12, 35, 18, 42), (24, 34, 30, 42)]}
    for x0, y0, x1, y1 in regions[row]:
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                if frame.getpixel((x, y))[3]:
                    color = ['#4c321c', '#593c23', '#66472b'][(x // 2 + y // 3) % 3]
                    draw.point((x, y), fill=color)
    # Dois frascos no quadril esquerdo anatômico; ocultos na vista direita.
    positions = {0: [(25, 37), (29, 37)], 1: [(21, 39), (25, 39)],
                 2: [], 3: [(12, 37), (16, 37)]}
    for x, y in positions[row]:
        draw.rectangle((x - 1, y, x + 2, y + 5), fill=INK)
        draw.line((x, y + 1, x, y + 4), fill='#e7c28a')
        draw.line((x + 1, y + 1, x + 1, y + 4), fill='#ad7d43')
        draw.point((x, y), fill='#997044')
    return frame


def retouch(name, destination):
    old, version, leg_y, _, _, head_y = CONFIG[name]
    source = ART / f'{name}-v{old}-120x220.png'
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    original = Image.open(source).convert('RGBA')
    result = original.copy()
    for row in (1, 2):
        base = cell(original, row, 0)
        for col in (0, 2):
            frame = cell(original, row, col)
            frame.paste(base.crop((0, head_y, 40, 55)), (0, head_y))
            frame = arm(frame, name, row, col)
            if col == 2:
                frame = alternate_legs(frame, cell(original,1,0), name, row, leg_y)
            if name == 'borun':
                staff_x = (8, 12) if row == 1 else (30, 35)
                frame.paste(base.crop((staff_x[0], 34, staff_x[1], 55)), (staff_x[0], 34))
            result.paste(frame, (col * 40, row * 55))
    if name == 'rheed':
        for row in range(4):
            for col in range(3):
                result.paste(vials(cell(result, row, col), row), (col * 40, row * 55))
    for row in range(4):
        for col in range(3):
            if not np.array_equal(np.asarray(cell(original,row,col))[:head_y],
                                  np.asarray(cell(result,row,col))[:head_y]):
                raise ValueError('Cabeça alterada')
    result.save(destination)
    report = inspect(destination)
    report.update({'origem': source.relative_to(ROOT).as_posix(),
                   'origem_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                   'resultado_sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
                   'script': 'tools/retocar_pilotos.py', 'versao': version,
                   'script_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                   'autorizacao': '18/10/2026: Sim, retocar os pixels por script',
                   'cabecas_preservadas': True,
                   'metodo': 'Retoque nativo dos membros nos perfis e continuidade dos frascos de Rheed.'})
    destination.with_suffix('.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem', choices=CONFIG)
    parser.add_argument('destino', type=Path)
    args = parser.parse_args()
    report = retouch(args.personagem, args.destino)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if report['erros'] else 0)
