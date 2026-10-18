"""Confere arquivos e gera pranchas para revisão humana do elenco completo."""
import hashlib
import json
import random
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from retocar_elenco import finish
from retocar_pilotos import cell
from spritesheets import inspect, active_sheet
from corrigir_movimento import finish as correct_movement
from retocar_camadas import finish as compose_layers

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'docs/terminus/arte/personagens'
REVIEWS = ART / 'revisoes'
FONT = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 14)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def components(frame):
    alpha = frame.getchannel('A')
    remaining = {(x,y) for y in range(55) for x in range(40) if alpha.getpixel((x,y))}
    found = []
    while remaining:
        seed = remaining.pop()
        group = [seed]
        stack = [seed]
        while stack:
            x,y = stack.pop()
            for dx in (-1,0,1):
                for dy in (-1,0,1):
                    point = (x+dx,y+dy)
                    if point in remaining:
                        remaining.remove(point)
                        group.append(point)
                        stack.append(point)
        if len(group) >= 4:
            xs,ys = zip(*group)
            found.append({'pixels':len(group),'limites':[min(xs),min(ys),max(xs)+1,max(ys)+1]})
    return sorted(found,key=lambda part:-part['pixels'])


def board(entries, destination, scale=3, directions=(0,)):
    columns = 7 if len(entries)>8 else len(entries)
    width = max(130,40*scale+16)
    height = 30+len(directions)*(55*scale+8)
    out = Image.new('RGB',(columns*width,((len(entries)+columns-1)//columns)*height),'#e6e4df')
    draw = ImageDraw.Draw(out)
    for i,entry in enumerate(entries):
        x,y = (i%columns)*width,(i//columns)*height
        draw.text((x+4,y+6),entry['id'],font=FONT,fill='#39352f')
        sheet = Image.open(ROOT/active_sheet(entry))
        for j,row in enumerate(directions):
            frame = cell(sheet,row,1).resize((40*scale,55*scale),Image.Resampling.NEAREST)
            out.paste(frame,(x+(width-40*scale)//2,y+28+j*(55*scale+8)),frame)
    out.save(destination)


def audit():
    manifest = ART/'controle.json'
    data = json.loads(manifest.read_text(encoding='utf-8'))
    run = REVIEWS/'reproducao'/datetime.now().strftime('%Y%m%d-%H%M%S')
    run.mkdir(parents=True,exist_ok=False)
    report = {'status':'em desenvolvimento','folhas':[],'erros':[],'componentes_para_inspecao':[]}
    for reference in data['referencias']:
        if sha(ROOT/reference['path']) != reference['sha256']:
            report['erros'].append(f"Referência alterada: {reference['path']}")
    for entry in data['folhas']:
        path = ROOT/active_sheet(entry)
        result = inspect(path)
        errors = result['erros'][:]
        if sha(ROOT/entry['ficha']) != entry['ficha_sha256']:
            errors.append('Ficha alterada desde a geração')
        if entry['estado']=='aprovado':
            if sha(path) != entry['arquivo_final_sha256']:
                errors.append('Arquivo aprovado alterado')
        elif entry['lote']>=3 or entry.get('revisao_movimento'):
            reproduced = run/f"{entry['id']}.png"
            if entry.get('revisao_camadas'):
                method, script = compose_layers, 'tools/retocar_camadas.py'
            elif entry.get('revisao_movimento'):
                method, script = correct_movement, 'tools/corrigir_movimento.py'
            else:
                method, script = finish, 'tools/retocar_elenco.py'
            method(entry['id'],reproduced)
            identical = sha(reproduced)==sha(path)
            entry['reproducao'] = {'data':'2026-10-18','script':script,
                'sha256_script':sha(ROOT/script),'png_identico':identical,
                'arquivo':reproduced.relative_to(ROOT).as_posix()}
            if not identical:
                errors.append('Reprodução diferente da candidata')
        sheet = Image.open(path)
        for row in range(4):
            for col in range(3):
                parts = components(cell(sheet,row,col))
                if len(parts)>1:
                    report['componentes_para_inspecao'].append({'id':entry['id'],'linha':row,'coluna':col,'partes':parts})
        report['folhas'].append({'id':entry['id'],'arquivo':path.relative_to(ROOT).as_posix(),
            'sha256':sha(path),'dimensoes':result['dimensoes'],'erros':errors,'estado':entry['estado']})
        report['erros'].extend(f"{entry['id']}: {error}" for error in errors)
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (REVIEWS/'auditoria-elenco.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    board(data['folhas'],REVIEWS/'elenco-completo.png')
    board(data['folhas'],REVIEWS/'elenco-nativo.png',scale=1)
    shuffled = data['folhas'][:]
    random.Random(4218).shuffle(shuffled)
    board(shuffled,REVIEWS/'elenco-embaralhado.png')
    board([e for e in data['folhas'] if e['lote'] in (0,9)],REVIEWS/'pilotos-e-lote-9.png',scale=2,directions=(0,1,2,3))
    print(json.dumps({'folhas':len(report['folhas']),'erros':report['erros'],
        'componentes_para_inspecao':report['componentes_para_inspecao']},ensure_ascii=False))


if __name__=='__main__':
    audit()
