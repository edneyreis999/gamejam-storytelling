"""Versiona as 18 correções solicitadas sem substituir as aprovações históricas."""

import copy
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from corrigir_movimento import finish
from retocar_pilotos import cell
from spritesheets import gallery

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'docs/terminus/arte/personagens'
OUT = ART / 'revisoes/correcao-movimento'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def previews(entries):
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 15)
    for group in range(3):
        batch = entries[group*6:(group+1)*6]
        frames = []
        for col in (0, 1, 2, 1):
            board = Image.new('RGB', (880, 770), '#e6e4df')
            draw = ImageDraw.Draw(board)
            draw.text((12, 10), f'Correção de movimento · grupo {group+1} · novas candidatas', font=font, fill='#28251e')
            for i, entry in enumerate(batch):
                x = 90+i*130
                draw.text((x, 50), entry['id'], font=font, fill='#28251e')
                sheet = Image.open(ROOT/entry['arquivo_candidato'])
                for row, label in enumerate(('Frente', 'Esquerda', 'Direita', 'Costas')):
                    y = 90+row*165
                    if i == 0:
                        draw.text((8, y+70), label, font=font, fill='#51493c')
                    sprite = cell(sheet, row, col).resize((120, 165), Image.Resampling.NEAREST)
                    board.paste(sprite, (x, y), sprite)
            frames.append(board)
        frames[0].save(OUT/f'grupo-{group+1}.gif', save_all=True, append_images=frames[1:], duration=180, loop=0, disposal=2)
        for index, label in ((0, 'a'), (1, 'repouso'), (2, 'b')):
            frames[index].save(OUT/f'grupo-{group+1}-{label}.png')
    for group in range(6):
        board = Image.new('RGB', (1110, 690), '#b5b1a8')
        draw = ImageDraw.Draw(board)
        for i, entry in enumerate(entries[group*3:(group+1)*3]):
            sheet = Image.open(ROOT/entry['arquivo_candidato']).resize((360, 660), Image.Resampling.NEAREST)
            draw.text((i*370+5, 4), entry['id'], font=font, fill='#28251e')
            board.paste(sheet, (i*370, 25), sheet)
        board.save(OUT/f'folhas-{group+1}.png')


def register():
    manifest = ART/'controle.json'
    data = json.loads(manifest.read_text(encoding='utf-8'))
    rigs = json.loads((ART/'rig-movimento.json').read_text(encoding='utf-8'))
    entries = [next(e for e in data['folhas'] if e['id'] == name) for name in rigs]
    if any(e.get('revisao_movimento') for e in entries):
        raise ValueError('Correção já registrada; preservar o histórico antes de abrir outra rodada.')
    (OUT/'controle-antes.json').write_bytes(manifest.read_bytes())
    for entry in entries:
        name = entry['id']
        version = max(t['versao'] for t in entry['tentativas'])+1
        target = ROOT/f'assets/terminus/personagens/em-revisao/{name}-v{version}-120x220.png'
        report = finish(name, target)
        if report['erros']:
            raise ValueError(f"{name}: {report['erros']}")
        history = {k: copy.deepcopy(entry.get(k)) for k in ('estado', 'arquivo_candidato', 'revisao_tecnica', 'revisao_visual', 'aprovacao_usuario', 'reproducao')}
        history.update(data='2026-10-18', motivo='Autor solicitou corrigir partes que desaparecem e movimento incompleto.')
        entry.setdefault('historico_revisoes', []).append(history)
        if entry['aprovacao_usuario']:
            entry.setdefault('historico_aprovacoes', []).append(copy.deepcopy(entry['aprovacao_usuario']))
        entry['aprovacao_usuario'] = None
        entry['estado'] = 'aguarda_aprovacao'
        entry['arquivo_candidato'] = target.relative_to(ROOT).as_posix()
        entry['revisao_tecnica'] = report
        entry['revisao_movimento'] = {'data': '2026-10-18', 'versao': version,
                                      'origem': rigs[name]['source'], 'registro': 'revisoes/correcao-movimento/README.md'}
        entry['revisao_visual'] = {'estado': 'em_revisao', 'data': '2026-10-18',
            'registro': 'revisoes/correcao-movimento/README.md',
            'observacoes': ['Nova candidata após o relato de falhas de movimento.',
                'Repouso preservado; braços em contrafase e pernas articuladas nos perfis. Revisar a caminhada nas quatro direções.']}
        entry['tentativas'].append({'versao': version, 'arquivo': entry['arquivo_candidato'], 'sha256': sha(target),
            'data': '2026-10-18', 'script': report['script'], 'script_sha256': report['script_sha256'],
            'configuracao': rigs[name], 'entradas': [rigs[name]['source']],
            'relatorio': target.with_suffix('.json').relative_to(ROOT).as_posix()})
    data['etapa_atual'] = 'correcao_movimento_18_folhas'
    data['proxima_condicao'] = 'Revisar as 18 novas candidatas de movimento. Dez substituem versões antes aprovadas, preservadas no histórico. As demais candidatas continuam aguardando aprovação.'
    data['correcao_movimento'] = {'data': '2026-10-18', 'folhas': list(rigs), 'registro': 'revisoes/correcao-movimento/README.md'}
    snapshots = []
    for source in (ROOT/'tools/corrigir_movimento.py', ART/'rig-movimento.json'):
        digest = sha(source)
        target = ART/'metodos'/f'{digest[:12]}-{source.name}'
        if not target.exists():
            target.write_bytes(source.read_bytes())
        snapshots.append({'path': target.relative_to(ROOT).as_posix(), 'sha256': digest})
    data['correcao_movimento']['metodo'] = snapshots
    manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    previews(entries)
    gallery(manifest)
    print(json.dumps({'correcoes': len(entries), 'aprovacoes_vigentes': sum(e['estado']=='aprovado' for e in data['folhas'])}))


if __name__ == '__main__':
    register()
