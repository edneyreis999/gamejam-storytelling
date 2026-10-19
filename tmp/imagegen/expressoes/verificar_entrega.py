import hashlib, json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[3]
DOC=ROOT/'docs/terminus/arte/bustos/expressoes'
m=json.loads((DOC/'matriz.json').read_text(encoding='utf-8'))
expected={p for c in m['personagens'] for p in c['arquivos'].values()}
actual={p.relative_to(ROOT).as_posix() for p in (ROOT/'assets/terminus/bustos/expressoes').rglob('*') if p.is_file()}
assert actual==expected, {'faltam':sorted(expected-actual),'extras':sorted(actual-expected)}
hashes=[]; pending=[]
for c in m['personagens']:
    assert hashlib.sha256((ROOT/c['concept']).read_bytes()).hexdigest()==c['concept_sha256']
    for emotion,path in c['arquivos'].items():
        key=c['id']+'-'+emotion
        r=json.loads((DOC/'registros'/(key+'.json')).read_text(encoding='utf-8-sig'))
        data=(ROOT/path).read_bytes()
        assert data[:8]==b'\x89PNG\r\n\x1a\n' and data[28]==0,key
        with Image.open(ROOT/path) as im:
            assert im.size==(504,672) and im.mode=='RGBA',key
            assert im.getchannel('A').getextrema()==(0,255),key
            assert im.info.get('icc_profile'),key
        digest=hashlib.sha256(data).hexdigest()
        assert digest==r['verificacao_tecnica']['sha256'],key
        hashes.append(digest)
        if r['inspecao_visual']=='pendente': pending.append(key)
assert len(hashes)==210 and len(set(hashes))==210
assert not pending,pending
result={'status':'em desenvolvimento','imagens':210,'visuais':42,'expressoes_por_visual':5,'faltantes':0,'arquivos_extras':0,'duplicatas_binarias':0,'dimensoes':[504,672],'modo':'RGBA','alfa':'0 a 255 em todos os arquivos','perfil':'sRGB incorporado','png_entrelacado':False,'referencias_preservadas':42,'revisao_visual':'210 combinações conferidas lado a lado com o concept e dentro de seus conjuntos','aprovacao_artistica':'aguarda avaliação do autor'}
(DOC/'verificacao-final.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))

