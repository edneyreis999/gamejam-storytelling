import json, sys, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
ROOT=Path(__file__).resolve().parents[3]
DOC=ROOT/'docs/terminus/arte/bustos/expressoes'
M=json.loads((DOC/'matriz.json').read_text(encoding='utf-8-sig'))
ids=sys.argv[2:]
kind=sys.argv[1]
entries=[e for e in M['personagens'] if not ids or e['id'] in ids]
if kind=='neutros':
    entries=[e for e in entries if (ROOT/e['arquivos']['neutro']).exists()]
    cols=4; w=252; h=360
    for start in range(0,len(entries),4):
        page=Image.new('RGB',(cols*w,2*h),'#d7d4cb'); d=ImageDraw.Draw(page)
        for j,e in enumerate(entries[start:start+4]):
            for row,p in enumerate([e['concept'],e['arquivos']['neutro']]):
                im=Image.open(ROOT/p).convert('RGBA')
                im=ImageOps.contain(im,(w,336),Image.Resampling.LANCZOS)
                x=j*w+(w-im.width)//2; y=row*h+24
                page.paste(im,(x,y),im)
                d.text((j*w+5,row*h+5),e['id']+(' concept' if row==0 else ' neutro'),fill='black')
        out=ROOT/f'tmp/imagegen/expressoes/neutros-{start//4+1}.jpg'
        page.save(out,quality=93)
        print(out)
elif kind=='marcar':
    for e in entries:
        for emotion in M['expressoes']:
            p=DOC/'registros'/f"{e['id']}-{emotion}.json"
            if p.exists():
                r=json.loads(p.read_text(encoding='utf-8-sig'))
                r['inspecao_visual']='Conferido lado a lado: identidade, figurino, acessórios, anatomia, leitura da emoção, enquadramento e transparência. Avaliação artística do autor pendente.'
                p.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Registros de revisão atualizados.')

