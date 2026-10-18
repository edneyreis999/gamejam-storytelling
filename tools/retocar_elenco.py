"""Acabamento por personagem a partir do repouso, sem alterar as folhas aprovadas."""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageOps

from retocar_pilotos import cell
from spritesheets import inspect

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/terminus/personagens/em-revisao'
CONFIG_PATH = ROOT / 'docs/terminus/arte/personagens/retoques-elenco.json'


def walking_profile(source, boot_source, config, right, step):
    frame = source.copy()
    arm_mask = Image.new('L', (40,55))
    points = config['arm']
    pivot = config['shoulder']
    if right:
        points = [(39-x,y) for x,y in points]
        pivot = (39-pivot[0],pivot[1])
    ImageDraw.Draw(arm_mask).polygon(points,fill=255)
    arm = source.copy()
    arm.putalpha(ImageChops.multiply(source.getchannel('A'),arm_mask))
    frame.paste((0,0,0,0),(0,0),arm_mask)
    under = Image.new('RGBA',(40,55))
    draw = ImageDraw.Draw(under)
    sx,sy = config['shoulder']
    vertices = [(sx-4,sy),(sx+3,sy+1),(sx+3,config['legs']),(sx-4,config['legs'])]
    if right:
        vertices = [(39-x,y) for x,y in vertices]
    draw.polygon(vertices,fill=config['cloth'])
    if config.get('textured_under'):
        under = Image.new('RGBA',(40,55))
        canonical = ImageOps.mirror(source) if right else source
        for y in range(sy,config['legs']):
            edge = sx if y < sy+5 else sx-1
            for x in range(sx-4,edge+1):
                color = canonical.getpixel((sx-4-(x%2),y))
                under.putpixel((39-x if right else x,y),color)
    under.putalpha(ImageChops.multiply(under.getchannel('A'),arm_mask))
    frame.alpha_composite(under)
    angle = (20 if step==0 else -35) * (-1 if right else 1)
    if config.get('stiff_left') and not right:
        angle = 0
    arm = arm.rotate(angle,resample=Image.Resampling.NEAREST,center=pivot)
    frame.alpha_composite(arm)
    start = config.get('profile_legs',config['legs'])
    legs = boot_source.copy()
    if step==2:
        pixels=legs.load()
        for y in range(start,55):
            for x in range(40):
                r,g,b,a=pixels[x,y]
                if not a or max(r,g,b)<42:
                    continue
                front = x>=21 if right else x<21
                factor=.7 if front else 1.35
                pixels[x,y]=(min(235,int(r*factor)),min(210,int(g*factor)),min(167,int(b*factor)),a)
    if config.get('leg_clip'):
        x0,x1,until=config['leg_clip']
        mask=Image.new('L',(40,55))
        draw=ImageDraw.Draw(mask)
        if right:
            x0,x1=40-x1,40-x0
        draw.rectangle((x0,start,x1-1,until-1),fill=255)
        draw.rectangle((0,until,39,54),fill=255)
        frame.paste(legs,(0,0),mask)
    else:
        frame.paste(legs.crop((0,start,40,55)),(0,start))
    frame.paste(source.crop((0,0,40,config['head'])),(0,0))
    return frame


def finish(name,destination):
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    config = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))[name]
    origin = ART/config.get('source',f'{name}-v1-120x220.png')
    original = Image.open(origin).convert('RGBA')
    for change in config.get('tints',[]):
        frame=cell(original,change['row'],change['col'])
        region=frame.crop(change['box']);alpha=region.getchannel('A')
        region=region.convert('RGB').point(lambda v:int(v*change['factor']))
        region.putalpha(alpha);frame.paste(region,change['box'][:2])
        original.paste(frame,(change['col']*40,change['row']*55))
    result = original.copy()
    for row in (1,2):
        neutral = cell(original,row,1)
        for col in (0,2):
            frame = walking_profile(neutral,cell(original,row,0),config,row==2,col)
            result.paste(frame,(col*40,row*55))
    for row in (0,3):
        a = cell(original,row,0);b=cell(original,row,2)
        start = config['legs']
        b.paste(ImageOps.mirror(a.crop((0,start,40,55))),(0,start))
        result.paste(b,(80,row*55))
    if name=='sura':
        head=cell(original,0,1).crop((0,0,40,29))
        head.putpixel((23,24),(235,209,157,255))
        for col in range(3):
            result.paste(head,(col*40,0))
    for change in config.get('copy_regions',[]):
        reference=cell(original,change['row'],change['source_col'])
        for col in change['cols']:
            frame=cell(result,change['row'],col)
            frame.paste(reference.crop(change['box']),change['box'][:2])
            result.paste(frame,(col*40,change['row']*55))
    for change in config.get('pixels',[]):
        for col in change['cols']:
            for x,y,r,g,b,a in change['values']:
                result.putpixel((col*40+x,change['row']*55+y),(r,g,b,a))
    for change in config.get('mirror_regions',[]):
        for col in change['cols']:
            frame=cell(result,change['row'],col)
            frame.paste(ImageOps.mirror(frame.crop(change['box'])),change['box'][:2])
            result.paste(frame,(col*40,change['row']*55))
    if config.get('sepia'):
        alpha=result.getchannel('A')
        gray=ImageOps.grayscale(result)
        if config.get('contrast'):
            gray=ImageOps.autocontrast(gray,cutoff=1,mask=alpha)
        result=ImageOps.colorize(gray,(23,16,9),(255,215,150))
        result.putalpha(alpha)
    result.save(destination)
    report=inspect(destination)
    report.update(origem=origin.relative_to(ROOT).as_posix(),origem_sha256=hashlib.sha256(origin.read_bytes()).hexdigest(),
                  resultado_sha256=hashlib.sha256(destination.read_bytes()).hexdigest(),
                  script='tools/retocar_elenco.py',script_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                  configuracao=config,metodo='Repouso estável; braços originais rotacionados, passos alternados e configuração individual.')
    destination.with_suffix('.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return report


if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem');parser.add_argument('destino',type=Path)
    args=parser.parse_args();report=finish(args.personagem,args.destino)
    print(json.dumps(report,ensure_ascii=False,indent=2))
    raise SystemExit(bool(report['erros']))
