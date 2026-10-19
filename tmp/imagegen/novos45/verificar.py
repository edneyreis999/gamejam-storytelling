from pathlib import Path
from PIL import Image,ImageCms
import hashlib,json,struct
root=Path(__file__).resolve().parents[3]
docs=root/'docs/terminus/arte/bustos/expressoes'
matrix=json.loads((docs/'matriz-lala-figurantes.json').read_text(encoding='utf-8'))
expected={(j['id'],e) for j in matrix['personagens'] for e in matrix['expressoes']}
records=[]
errors=[]
for ident,emotion in sorted(expected):
    p=root/'assets/terminus/bustos/expressoes'/ident/(emotion+'.png')
    if not p.exists():
        errors.append('Ausente: '+str(p.relative_to(root)));continue
    raw=p.read_bytes()
    with Image.open(p) as im:
        a=im.getchannel('A') if im.mode=='RGBA' else None
        profile=ImageCms.getProfileDescription(ImageCms.ImageCmsProfile(__import__('io').BytesIO(im.info['icc_profile']))).strip() if im.info.get('icc_profile') else ''
        r={'id':ident,'expressao':emotion,'arquivo':str(p.relative_to(root)).replace('\\','/'),'dimensoes':list(im.size),'modo':im.mode,'alfa':a.getextrema() if a else None,'bbox_alfa':a.getbbox() if a else None,'perfil':profile,'entrelacado':bool(raw[28]),'sha256':hashlib.sha256(raw).hexdigest()}
        if im.size!=(504,672) or im.mode!='RGBA' or r['alfa']!=(0,255) or 'sRGB' not in profile or r['entrelacado']:errors.append('Formato: '+r['arquivo'])
        if a and (a.crop((0,0,504,1)).getextrema()[1] or a.crop((0,0,1,672)).getextrema()[1] or a.crop((503,0,504,672)).getextrema()[1]):errors.append('Margem: '+r['arquivo'])
        records.append(r)
extras=[]
for j in matrix['personagens']:
    for p in (root/'assets/terminus/bustos/expressoes'/j['id']).glob('*.png'):
        if (j['id'],p.stem) not in expected:extras.append(str(p))
if len({r['sha256'] for r in records})!=len(records):errors.append('PNG idêntico duplicado')
if extras:errors.append('Arquivos extras: '+str(extras))
baseline=json.loads((root/'tmp/imagegen/novos45/baseline-pos-pull.json').read_text(encoding='utf-8'))
changed=[p for p,h in baseline.items() if not (root/p).exists() or hashlib.sha256((root/p).read_bytes()).hexdigest()!=h]
if changed:errors.append('Arquivos anteriores alterados: '+str(changed))
report={'status':'em desenvolvimento','planejados':45,'encontrados':len(records),'sem_faltas_ou_duplicatas':len(records)==45 and not errors,'erros':errors,'arquivos':records,'integridade_bustos_anteriores':{'baseline':'main 2b68d89 após pull solicitado pelo autor','conferidos':len(baseline),'alterados':changed,'nota':'42 bases e 210 expressões trazidas pelo pull, preservadas neste lote.'}}
(docs/'verificacao-lala-figurantes.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'encontrados':len(records),'erros':errors},ensure_ascii=False))
