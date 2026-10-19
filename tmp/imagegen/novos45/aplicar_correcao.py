from pathlib import Path
import json,sys
root=Path(__file__).resolve().parents[3]
for key in sys.argv[1:]:
    p=root/'docs/terminus/arte/bustos/expressoes/registros'/(key+'.json')
    r=json.loads(p.read_text(encoding='utf-8'))
    c=json.loads((root/'tmp/imagegen/novos45'/(key+'-correcao.json')).read_text(encoding='utf-8'))
    r.setdefault('tentativas_descartadas',[]).append({'original_gerado':r['original_gerado'],'prompt':r['prompt'],'motivo':c['motivo']})
    r.update(c)
    p.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
