"""Registra candidatas revisadas e preserva separadamente a aprovação do autor."""
import hashlib
import json
import re
from pathlib import Path

from previa_lote import preview
from retocar_elenco import finish
from spritesheets import gallery

ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'docs/terminus/arte/personagens'
ASSETS=ROOT/'assets/terminus/personagens/em-revisao'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def register(lot):
    manifest=ART/'controle.json'
    data=json.loads(manifest.read_text(encoding='utf-8'))
    for entry in data['folhas']:
        if entry['lote']!=lot:
            continue
        name=entry['id']
        assert sha(ROOT/entry['ficha'])==entry['ficha_sha256'], name
        assert not entry['tentativas'], f'{name} já registrado'
        raw_versions=[1,2] if (ASSETS/f'{name}-v2.png').exists() else [1]
        for version in raw_versions:
            prompt=ART/'prompts'/f'{name}-v1.txt'
            if version==2:
                prompt=ART/'prompts'/f'{name}-correcao-v2.txt'
            text=prompt.read_text(encoding='utf-8')
            pilot=re.search(r'approved (rheed|borun|ghork|nima) pilot',text)
            refs=[r['path'] for r in data['referencias']]
            if pilot:
                refs.append(f'assets/terminus/personagens/{pilot[1]}.png')
            if version==2:
                refs.insert(0,f'assets/terminus/personagens/em-revisao/{name}-v1.png')
            raw=ASSETS/f'{name}-v{version}.png'
            entry['tentativas'].append(dict(versao=version,arquivo=raw.relative_to(ROOT).as_posix(),
                sha256=sha(raw),prompt=prompt.relative_to(ART).as_posix(),prompt_sha256=sha(prompt),
                ficha_sha256=entry['ficha_sha256'],ferramenta='image_gen integrada',
                transparencia_solicitada=True,entradas=refs,data='2026-10-18'))
        version=max(raw_versions)+1
        destination=ASSETS/f'{name}-v{version}-120x220.png'
        report=finish(name,destination)
        assert not report['erros'], (name,report['erros'])
        entry['arquivo_candidato']=destination.relative_to(ROOT).as_posix()
        entry['estado']='aguarda_aprovacao'
        entry['revisao_tecnica']=report
        appearance=next(line.split('** ',1)[1] for line in (ROOT/entry['ficha']).read_text(encoding='utf-8').splitlines() if line.startswith('- **Raça, idade e aparência:**'))
        entry['revisao_visual']=dict(estado='revisado_internamente',data='2026-10-18',
            observacoes=[appearance,'Repouso e caminhada revisados em tamanho nativo e ampliado.'],
            registro=f'revisoes/lote-{lot}.md',pendencias=[])
        entry['tentativas'].append(dict(versao=version,arquivo=entry['arquivo_candidato'],sha256=sha(destination),
            script=report['script'],script_sha256=report['script_sha256'],configuracao=report['configuracao'],
            entradas=[report['origem']],data='2026-10-18',
            estudos_intermediarios=[p.relative_to(ROOT).as_posix() for p in ASSETS.glob(f'{name}-retoque-*.png')]))
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    gallery(manifest)
    preview(lot)
    return [e['arquivo_candidato'] for e in data['folhas'] if e['lote']==lot]

if __name__=='__main__':
    import sys
    print(json.dumps(register(int(sys.argv[1])),ensure_ascii=False))
