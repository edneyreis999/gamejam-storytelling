"""Acabamento individual do lote 1, com o método usado nos pilotos aprovados."""

import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

from spritesheets import inspect
from retocar_pilotos import cell


ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/terminus/personagens/em-revisao'
CONFIG = {
    'sevrak': dict(head=29, legs=44, boot=(9,48,17,53), ankle=15,
                   hips=(18,23), feet=(14,26), width=2, shoulder=(25,32),
                   hand=(17,38), erase=(25,35,39,43), cloth='#392a1b', skin='#d3ae74'),
    'nyra': dict(head=25, legs=45, boot=(7,48,19,53), ankle=15,
                hips=(20,27), feet=(15,29), width=3, shoulder=(29,28),
                hand=(19,35), erase=(28,30,39,43), cloth='#775530', skin='#9d7541'),
    'crianca': dict(head=36, legs=46, boot=(10,48,18,53), ankle=15,
                   hips=(18,23), feet=(15,24), width=2, shoulder=(23,38),
                   hand=(17,42), erase=(23,39,39,45), cloth='#d6b67c', skin='#bd935a'),
    'neral-disfarce': dict(head=28, legs=47, boot=(9,47,20,53), ankle=17,
                          hips=(20,25), feet=(15,27), width=2, shoulder=(25,30),
                          hand=(17,37), erase=(27,33,39,42), cloth='#58402a', skin='#302317'),
    'neral-revelado': dict(head=28, legs=48, boot=(10,47,20,53), ankle=17,
                          hips=(20,26), feet=(14,27), width=2, shoulder=(25,31),
                          hand=(17,39), erase=(27,34,39,43), cloth='#5b422d', skin='#e4c38d'),
    'neral-transformado': dict(head=27, legs=48, boot=(6,47,19,53), ankle=15,
                             hips=(20,28), feet=(14,29), width=3, shoulder=(29,29),
                             hand=(19,39), erase=(30,32,39,43), cloth='#65472d', skin='#e7c58e'),
}
INK = '#20180f'


def alternate_legs(source, frame, config, row, name):
    layer = Image.new('RGBA', (40,55))
    draw = ImageDraw.Draw(layer)
    boot = source.crop(config['boot'])
    near_color = source.getpixel((config['ankle'],49))
    start = 44 if name.startswith('neral-') else config['legs']
    coat = frame.copy()
    for hip, foot, far in zip(config['hips'],config['feet'],(True,False)):
        width = config['width']
        draw.polygon([(hip-width,start), (hip+width,start),
                      (foot+2,51),(foot-2,51)],fill=INK)
        draw.line((hip,start,foot,50),fill='#3b2c1c' if far else near_color,width=width+1)
        if not far:
            draw.line((hip-1,start,foot-1,49),fill='#8c673b')
        pixels=np.array(boot)
        if far:
            pixels[:,:,:3]=(pixels[:,:,:3]*0.68).astype(np.uint8)
        layer.alpha_composite(Image.fromarray(pixels),
                              (config['boot'][0]+foot-config['ankle'],config['boot'][1]))
    if row==2:
        layer=ImageOps.mirror(layer)
    frame.paste((0,0,0,0),(0,start,40,55))
    frame.alpha_composite(layer)
    if name.startswith('neral-'):
        bounds=(24,44,40,48) if row==1 else (0,44,16,48)
        frame.alpha_composite(coat.crop(bounds),bounds[:2])


def forward_arm(frame, name, config, row):
    original=frame.copy()
    draw=ImageDraw.Draw(frame)
    axis=39
    def point(x,y):
        return (x if row==1 else axis-x,y)
    def polygon(vertices,color):
        draw.polygon([point(x,y) for x,y in vertices],fill=color)
    x0,y0,x1,y1=config['erase']
    polygon([(x0,y0),(x1,y0),(x1,y1),(x0,y1)],(0,0,0,0))
    # Fecha o contorno do tecido que estava oculto pelo braço anterior.
    polygon([(x0-2,y0),(x0+1,y0),(x0+1,y1),(x0-2,y1)],INK)
    polygon([(x0-2,y0),(x0,y0),(x0,y1-1),(x0-2,y1)],config['cloth'])
    sx,sy=config['shoulder'];hx,hy=config['hand']
    elbow=((sx+hx)//2,hy-2)
    width=7 if name in ('nyra','neral-transformado') else 5
    points=[point(sx,sy),point(*elbow),point(hx,hy)]
    draw.line(points,fill=INK,width=width)
    radius=width//2
    for x,y in points:
        draw.ellipse((x-radius,y-radius,x+radius,y+radius),fill=INK)
    draw.line(points,fill=config['cloth'],width=width-2)
    draw.line([point(*elbow),point(hx,hy)],fill=config['skin'],width=width-2)
    px,py=point(hx,hy)
    draw.rectangle((px-1,py-1,px+1,py+1),fill=config['skin'])
    if name in ('neral-revelado','neral-transformado'):
        ex,ey=elbow
        for offset in (0,2):
            draw.line([point(ex-1,ey+offset),point(ex+1,ey+offset)],fill='#6e4e2e')
        draw.line([point(hx+1,hy),point(hx+1,hy+2)],fill=config['skin'])
    elif name=='sevrak':
        draw.point(point(hx-1,hy+1),fill='#43301e')
        draw.point(point(hx+1,hy+1),fill='#43301e')
    elif name=='nyra':
        draw.line([point(elbow[0]-1,elbow[1]-1),point(elbow[0]+2,elbow[1]-1)],
                  fill='#dec18b',width=2)
        draw.point(point(hx,hy),fill='#75512e')
    frame.paste(original.crop((0,0,40,config['head'])),(0,0))


def retouch(name, destination):
    if destination.exists() or destination.with_suffix('.json').exists():
        raise FileExistsError(destination)
    config=CONFIG[name]
    source=ART/f'{name}-v1-120x220.png'
    original=Image.open(source).convert('RGBA');result=original.copy()
    for row in range(4):
        a=cell(original,row,0);b=cell(original,row,2)
        if row in (0,3):
            y=config['legs']
            b.paste(ImageOps.mirror(a.crop((0,y,40,55))),(0,y))
        else:
            b.paste(a.crop((0,config['head'],40,55)),(0,config['head']))
            forward_arm(b,name,config,row)
            alternate_legs(cell(original,1,0),b,config,row,name)
        result.paste(b,(80,row*55))
    for row in range(4):
        for col in range(3):
            if not np.array_equal(np.asarray(cell(original,row,col))[:config['head']],
                                  np.asarray(cell(result,row,col))[:config['head']]):
                raise ValueError('Rosto alterado')
    result.save(destination)
    report=inspect(destination)
    report.update({'origem':source.relative_to(ROOT).as_posix(),
                   'origem_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
                   'resultado_sha256':hashlib.sha256(destination.read_bytes()).hexdigest(),
                   'script':'tools/retocar_lote1.py',
                   'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
                   'metodo':'Acabamento nativo após imagegen; cabeças preservadas e membros simétricos alternados.',
                   'cabecas_preservadas':True})
    destination.with_suffix('.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return report


if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('personagem',choices=CONFIG)
    parser.add_argument('destino',type=Path)
    args=parser.parse_args()
    report=retouch(args.personagem,args.destino)
    print(json.dumps(report,ensure_ascii=False,indent=2))
    raise SystemExit(1 if report['erros'] else 0)
