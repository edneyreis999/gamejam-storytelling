"""Acabamento nativo do lote 2; preserva fontes e salva versões novas."""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps, ImageChops

from retocar_lote1 import alternate_legs
from retocar_pilotos import cell
from spritesheets import inspect


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/terminus/personagens/em-revisao'
CONFIG = {
    'virmura': dict(head=25, legs=43, boot=(8, 48, 17, 53), ankle=14,
                    hips=(19, 25), feet=(14, 28), width=2, shoulder=(25, 28),
                    hand=(10, 35), erase=(28, 32, 38, 42), cloth='#c3a06b', skin='#c3a06b'),
    'dorga': dict(head=25, legs=45, boot=(8, 48, 18, 53), ankle=15,
                  hips=(19, 26), feet=(14, 28), width=3, shoulder=(27, 28),
                  hand=(10, 36), erase=(29, 33, 38, 43), cloth='#614729', skin='#49331d'),
    'torvak': dict(head=24, legs=44, boot=(7, 47, 18, 53), ankle=15,
                   hips=(19, 27), feet=(14, 29), width=3, shoulder=(26, 26),
                   hand=(11, 35), erase=(29, 31, 38, 42), cloth='#c69f62', skin='#c69f62'),
    'meruna': dict(head=31, legs=46, boot=(9, 49, 19, 53), ankle=16,
                   hips=(19, 25), feet=(15, 27), width=2, shoulder=(23, 34),
                   hand=(12, 39), erase=(25, 37, 31, 45), cloth='#947043', skin='#d0ad75'),
}
ARMS = {
    'virmura': [(22,25),(27,25),(30,30),(31,34),(32,38),(32,40),(29,42),(26,40),(26,35),(24,31)],
    'dorga': [(25,25),(29,25),(31,29),(32,33),(34,36),(34,39),(31,41),(28,40),(27,36),(28,32),(25,31)],
    'torvak': [(23,23),(28,23),(30,27),(32,31),(33,38),(32,41),(29,42),(27,39),(27,34),(25,30),(22,28)],
    'meruna': [(22,31),(25,31),(27,34),(28,38),(28,42),(26,44),(23,43),(23,39),(21,36)],
}


def recolor_hand(layer, glove):
    pixels = layer.load()
    for y in range(layer.height):
        for x in range(layer.width):
            r,g,b,a = pixels[x,y]
            if not a or max(r,g,b) < 48:
                continue
            if glove:
                pixels[x,y] = (int(r*.43),int(g*.43),int(b*.43),a)
            else:
                value = min(1, max(r,g,b)/100)
                pixels[x,y] = (int(210*value),int(171*value),int(111*value),a)


def profile(name, source, step_b, right):
    config = CONFIG[name]
    frame = source.copy()
    mask = Image.new('L', (40,55))
    ImageDraw.Draw(mask).polygon(ARMS[name], fill=255)
    arm = source.copy()
    arm.putalpha(ImageChops.multiply(source.getchannel('A'), mask))
    if name == 'torvak':
        draw = ImageDraw.Draw(arm)
        draw.line((27,31,29,32), fill='#e0bd80')
        draw.line((28,34,30,35), fill='#d8b476')
    if name == 'dorga' and right:
        hand = arm.crop((26,34,37,43))
        recolor_hand(hand, False)
        arm.paste(hand, (26,34))
        far_hand = frame.crop((6,32,15,39))
        recolor_hand(far_hand, True)
        frame.paste(far_hand, (6,32))
    if step_b:
        frame.paste((0,0,0,0), (0,0), mask)
        if name in ('virmura','dorga','torvak'):
            frame.paste((0,0,0,0), (29,32,39,43))
        torso = Image.new('RGBA',(40,55))
        draw = ImageDraw.Draw(torso)
        sx,sy = config['shoulder']
        color = '#5b4228' if name in ('torvak','dorga') else config['cloth']
        draw.polygon([(sx-4,sy),(sx+1,sy+1),(sx+2,42),(sx-3,43)], fill='#20180f')
        draw.polygon([(sx-3,sy+2),(sx,sy+3),(sx+1,40),(sx-2,41)], fill=color)
        torso.putalpha(ImageChops.multiply(torso.getchannel('A'),mask))
        frame.alpha_composite(torso)
        # O braço distante recua; remove a mão antes avançada fora do tronco.
        frame.paste((0,0,0,0),(5,31 if name!='meruna' else 35,15,39 if name!='meruna' else 43))
        far = Image.new('RGBA',(40,55))
        fd = ImageDraw.Draw(far)
        fd.ellipse((sx+1,36 if name!='meruna' else 39,sx+5,41 if name!='meruna' else 44),fill='#20180f')
        far_color = '#49331d' if name=='dorga' and right else '#8d693e'
        fd.rectangle((sx+2,38 if name!='meruna' else 41,sx+4,40 if name!='meruna' else 43),fill=far_color)
        far.alpha_composite(frame)
        frame = far
        arm = arm.rotate(-65, resample=Image.Resampling.NEAREST, center=config['shoulder'])
        alternate_legs(source, frame, config, 1, name)
    frame.alpha_composite(arm)
    patch(frame, source, (0,0,40,config['head']))
    if right:
        frame = ImageOps.mirror(frame)
    return frame


def patch(frame, source, bounds):
    frame.paste(source.crop(bounds), bounds[:2])


def finish(name, destination):
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    source = ART / f'{name}-v1-120x220.png'
    original = Image.open(source).convert('RGBA')
    result = original.copy()
    config = CONFIG[name]
    for row in range(4):
        a = cell(original, row, 0)
        b = cell(original, row, 2)
        if row in (0, 3):
            y = config['legs']
            b.paste(ImageOps.mirror(a.crop((0, y, 40, 55))), (0, y))
        else:
            left = cell(original, 1, 0)
            b = profile(name, left, True, row==2)
            a = profile(name, left, False, row==2)
            if row == 2:
                patch(a, cell(original, row, 0), (0,0,40,config['head']))
                patch(b, cell(original, row, 0), (0,0,40,config['head']))
            result.paste(a, (0,row*55))
        result.paste(b, (80, row*55))

    if name == 'dorga':
        # Corrige apenas o tecido central; mãos e lados anatômicos ficam intactos.
        for row, columns in ((0, (2,)), (3, (1, 2))):
            reference = cell(original, row, 0)
            for col in columns:
                frame = cell(result, row, col)
                patch(frame, reference, (11, 24, 30, 45))
                result.paste(frame, (col*40, row*55))
    if name == 'torvak':
        # Mantém a trança atrás da cabeça em toda a vista frontal.
        neutral = cell(original, 0, 1)
        for col in (0, 2):
            frame = cell(result, 0, col)
            patch(frame, neutral, (0, 0, 40, 25))
            result.paste(frame, (col*40, 0))

    result.save(destination)
    report = inspect(destination)
    report.update({
        'origem': source.relative_to(ROOT).as_posix(),
        'origem_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'resultado_sha256': hashlib.sha256(destination.read_bytes()).hexdigest(),
        'script': 'tools/retocar_lote2.py',
        'script_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        'metodo': 'Acabamento nativo após imagegen; alternância dos membros e continuidade individual.',
        'ajustes_de_identidade': {
            'dorga': 'Perfil esquerdo B usa a cabeça do perfil A; faixa corrigida sem espelhar mãos.',
            'torvak': 'Cabeça frontal de repouso reutilizada para manter a trança atrás.',
        }.get(name, 'Rostos mantidos; perfis B reutilizam o rosto do perfil A.'),
    })
    destination.with_suffix('.json').write_text(
        json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    return report


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem', choices=CONFIG)
    parser.add_argument('destino', type=Path)
    args = parser.parse_args()
    report = finish(args.personagem, args.destino)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if report['erros'] else 0)
