from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / 'docs/terminus/arte/bustos/expressoes'
matrix = json.loads((DOCS / 'matriz.json').read_text(encoding='utf-8'))
emotions = matrix['expressoes']
records = []
missing = []
for character in matrix['personagens']:
    source = ROOT / character['concept']
    assert hashlib.sha256(source.read_bytes()).hexdigest() == character['concept_sha256'], character['id']
    for emotion in emotions:
        key = character['id'] + '-' + emotion
        path = DOCS / 'registros' / (key + '.json')
        if not path.exists():
            missing.append(key)
            continue
        record = json.loads(path.read_text(encoding='utf-8'))
        output = ROOT / record['arquivo']
        if not output.exists() or 'verificacao_tecnica' not in record:
            missing.append(key)
            continue
        with Image.open(output) as image:
            assert image.size == (504, 672) and image.mode == 'RGBA', key
            assert image.getchannel('A').getextrema()[0] == 0, key
        with Image.open(output) as image:
            image.verify()
        assert hashlib.sha256(output.read_bytes()).hexdigest() == record['verificacao_tecnica']['sha256'], key
        records.append(record)
assert len({x['verificacao_tecnica']['sha256'] for x in records}) == len(records), 'Imagens duplicadas'
complete = [c['id'] for c in matrix['personagens'] if all(c['id'] + '-' + e not in missing for e in emotions)]
report = {'status': 'em desenvolvimento', 'planejados': 210, 'exportados': len(records), 'conjuntos_completos': complete, 'faltantes': missing, 'referencias_preservadas': 42, 'inspecao_visual_pendente': [x['id'] + '-' + x['expressao'] for x in records if x['inspecao_visual'] == 'pendente'], 'aprovacao': 'aguarda avaliação do autor'}
(DOCS / 'controle.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
gallery = ['# Expressões de Terminus', '', 'Status: em desenvolvimento.', '', f"{len(records)} de 210 imagens exportadas; {len(complete)} conjuntos completos. Avaliação artística do autor pendente.", '', 'Ordem: neutro, feliz, triste, com raiva e confuso. Os concepts originais estão preservados.', '']
for character in matrix['personagens']:
    gallery += ['## ' + character['nome'], '', '| Neutro | Feliz | Triste | Com raiva | Confuso |', '| --- | --- | --- | --- | --- |']
    cells=[]
    for emotion in emotions:
        key=character['id']+'-'+emotion
        link='../../../../../'+character['arquivos'][emotion]
        cells.append('Pendente' if key in missing else f'![{character["id"]} — {emotion}]({link})')
    gallery += ['| ' + ' | '.join(cells) + ' |', '']
(DOCS/'galeria.md').write_text('\n'.join(gallery), encoding='utf-8')
print(json.dumps({'exportados': len(records), 'conjuntos_completos': len(complete), 'faltantes':len(missing)}, ensure_ascii=False))
