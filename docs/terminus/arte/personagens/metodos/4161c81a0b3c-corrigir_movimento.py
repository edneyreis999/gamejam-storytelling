"""Reconstrói a caminhada sem recortar braços, troncos ou acessórios por retângulos."""

import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

from retocar_pilotos import cell
from spritesheets import inspect

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / 'docs/terminus/arte/personagens/rig-movimento.json'


def displace_upper(source, rig, row, phase):
    """Amostragem inversa contínua: ombros fixos e mãos em contrafase."""
    pixels = np.asarray(source)
    yy, xx = np.mgrid[:55, :40].astype(float)
    sx, sy = xx.copy(), yy.copy()
    shoulder, hand = rig['shoulder'], rig['hand']
    left, right = rig['arms'][row]
    amounts = rig.get('arm_amounts', [[1, 1]] * 4)[row]

    def displacement(x, y):
        reach = np.clip((y - shoulder) / max(1, hand - shoulder), 0, 1)
        reach *= np.clip((hand + 4 - y) / 3, 0, 1)
        wl = np.exp(-((x-left)/3.5)**2) * reach * amounts[0]
        wr = np.exp(-((x-right)/3.5)**2) * reach * amounts[1]
        if row in (1, 2):
            dx = phase * rig.get('arm_swing', 2) * (wr-wl)
            dy = np.ones_like(y)
        else:
            dx = phase * .5 * (wr-wl)
            dy = 1 + phase * 1.5 * (wl-wr)
        return dx, dy

    for _ in range(16):
        dx, dy = displacement(sx, sy)
        sx, sy = xx-dx, yy-dy
    ix, iy = np.rint(sx).astype(int), np.rint(sy).astype(int)
    valid = (ix >= 0) & (ix < 40) & (iy >= 0) & (iy < 55)
    out = np.zeros_like(pixels)
    out[valid] = pixels[iy[valid], ix[valid]]
    return Image.fromarray(out)


def leg_layer(source, mask, start, target, lift):
    pixels = np.asarray(source)
    ys, xs = np.nonzero(mask & (pixels[:, :, 3] > 0))
    if not len(xs):
        raise ValueError('Perna sem pixels; conferir o rig individual')
    foot_x = float(np.mean(xs[ys >= ys.max()-1]))
    result = Image.new('RGBA', (40, 55))
    # Cada faixa vem da perna inteira, incluindo a bota. A raiz continua no quadril.
    for y in range(start, 53):
        fraction = min(1, (y-start) / max(1, 49-start))
        dx = round((target-foot_x)*fraction)
        dy = round((1-fraction) - lift*fraction)
        strip = pixels[y:y+1].copy()
        strip[~mask[y:y+1]] = 0
        result.alpha_composite(Image.fromarray(strip), (dx, y+dy))
    return result


def profile_leg(neutral, walking, start, split, side, target, width):
    """Desenha a articulação oculta pela bainha e reutiliza a bota inteira."""
    pixels = np.asarray(walking)
    x0, x1 = (0, split) if side == 0 else (split, 40)
    boot = walking.crop((x0, 49, x1, 53))
    ys, xs = np.nonzero(np.asarray(boot)[:, :, 3])
    foot_x = x0 + float(np.mean(xs[ys == ys.max()]))
    hip = split
    knee = round((hip+target)/2)
    sample_x = split + (-3 if side == 0 else 3)
    sample = np.asarray(neutral)[start:50, max(0,sample_x-2):sample_x+3]
    colors = sample[(sample[:, :, 3] > 0) & (sample[:, :, :3].max(axis=2) > 45), :3]
    cloth = tuple(np.median(colors, axis=0).astype(int)) if len(colors) else (80, 58, 34)
    layer = Image.new('RGBA', (40, 55))
    draw = ImageDraw.Draw(layer)
    joint_y = min(48, start+3)
    points = [(hip, start), (knee, joint_y), (target, 50)]
    draw.line(points, fill=(31, 23, 14), width=width+2, joint='curve')
    draw.line(points, fill=cloth, width=width, joint='curve')
    highlight = tuple(min(235, int(v*1.2)) for v in cloth)
    draw.line([(hip-1, start), (knee-1, joint_y)], fill=highlight)
    layer.alpha_composite(boot, (x0+round(target-foot_x), 49))
    return layer


def frame(source, rig, row, phase, walking):
    pixels = np.array(source)
    yy, xx = np.mgrid[:55, :40]
    start, split = rig['legs'][row], rig.get('split', [20]*4)[row]
    x0, x1 = rig.get('leg_bounds', [[0, 40]]*4)[row]
    legs = (yy >= start) & (xx >= x0) & (xx < x1)
    # Abaixo da bainha, somente as pernas saem do tronco; as abas ficam na camada de roupa.
    upper = pixels.copy()
    upper[legs] = 0
    torso = displace_upper(Image.fromarray(upper), rig, row, phase)
    masks = [legs & (xx < split), legs & (xx >= split)]
    layers = []
    for side, mask in enumerate(masks):
        ys, xs = np.nonzero(mask & (pixels[:, :, 3] > 0))
        if not len(xs):
            raise ValueError(f'Perna {side} ausente na vista {row}')
        rest_x = float(np.mean(xs[ys >= ys.max()-1]))
        if row in (1, 2):
            stride = rig.get('stride', 4)
            target = split + phase*stride*(1 if side == 0 else -1)
            layers.append(profile_leg(source, walking, start, split, side, target, rig.get('leg_width', 3)))
        else:
            target = rest_x + (1 if side == 0 else -1)*phase*.5
            lift = 1 if (side == 0) == (phase == 1) else 0
            layers.append(leg_layer(source, mask, start, target, lift))
    out = Image.new('RGBA', (40, 55))
    order = (0, 1) if row != 2 else (1, 0)
    for side in order:
        out.alpha_composite(layers[side])
    out.alpha_composite(torso)
    return out


def finish(name, destination):
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    rig = json.loads(CONFIG.read_text(encoding='utf-8'))[name]
    origin = ROOT / rig['source']
    original = Image.open(origin).convert('RGBA')
    result = Image.new('RGBA', (120, 220))
    for row in range(4):
        neutral = cell(original, row, 1)
        result.paste(neutral, (40, row*55))
        for col, phase in ((0, 1), (2, -1)):
            result.paste(frame(neutral, rig, row, phase, cell(original, row, 0)), (col*40, row*55))
    result.save(destination)
    report = inspect(destination)
    report.update(origem=rig['source'], origem_sha256=hashlib.sha256(origin.read_bytes()).hexdigest(),
                  resultado_sha256=hashlib.sha256(destination.read_bytes()).hexdigest(),
                  script='tools/corrigir_movimento.py',
                  script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), configuracao=rig,
                  metodo='Pose completa; deslocamento contínuo dos braços e tronco, pernas em camadas com trajetórias opostas. Sem espelhar vistas ou trocar iluminação para simular passos.')
    destination.with_suffix('.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    return report


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem')
    parser.add_argument('destino', type=Path)
    args = parser.parse_args()
    print(json.dumps(finish(args.personagem, args.destino), ensure_ascii=False, indent=2))
