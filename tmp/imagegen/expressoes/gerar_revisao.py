import json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
ROOT=Path(__file__).resolve().parents[3]
DOC=ROOT/'docs/terminus/arte/bustos/expressoes'
m=json.loads((DOC/'matriz.json').read_text(encoding='utf-8'))
ids=sys.argv[1:]
for c in m['personagens']:
    if ids and c['id'] not in ids: continue
    paths=[c['concept']]+[c['arquivos'][e] for e in m['expressoes']]
    if not all((ROOT/p).exists() for p in paths): continue
    page=Image.new('RGB',(1512,2*700),'#d7d4cb')
    draw=ImageDraw.Draw(page)
    for j,p in enumerate(paths):
        x=(j%3)*504; y=(j//3)*700
        im=Image.open(ROOT/p).convert('RGBA')
        im=ImageOps.contain(im,(504,672),Image.Resampling.LANCZOS)
        page.paste(im,(x+(504-im.width)//2,y+28+(672-im.height)),im)
        draw.text((x+8,y+8),c['id']+' / '+(['concept']+m['expressoes'])[j],fill='black')
    out=ROOT/'tmp/imagegen/expressoes'/('revisao-'+c['id']+'.jpg')
    page.save(out,quality=94)
    print(c['id'])

