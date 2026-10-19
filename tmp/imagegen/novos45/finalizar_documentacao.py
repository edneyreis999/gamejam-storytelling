from pathlib import Path
import hashlib,json,shutil
root=Path(__file__).resolve().parents[3]
docs=root/'docs/terminus/arte/bustos/expressoes'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def save(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
new=read(docs/'matriz-lala-figurantes.json')
report=read(docs/'verificacao-lala-figurantes.json')
review=read(root/'tmp/imagegen/novos45/revisao-visual.json')
ids=[j['id'] for j in new['personagens']]
assert report['sem_faltas_ou_duplicatas'] and set(ids)==set(review['conjuntos'])
matrix=read(docs/'matriz.json')
old=[j for j in matrix['personagens'] if j['id'] not in ids]
assert len(old)==42
for j in new['personagens']:
    neutral=read(docs/'registros'/(j['id']+'-neutro.json'))
    j['neutro_conferido']=neutral['arquivo']
    j['neutro_sha256']=neutral['verificacao_tecnica']['sha256']
    j['revisao_interna']='concluída'
    j['aprovacao']='aguarda avaliação do autor'
    j['expressoes_conferidas']=new['expressoes']
    for e in new['expressoes']:
        p=docs/'registros'/(j['id']+'-'+e+'.json');r=read(p)
        r['inspecao_visual']=review['criterios']
        r['base_neutra']=j['neutro_conferido']
        r['fontes_narrativas']={'arquivo':'docs/terminus/prototipo/content.js','cenas':j['scenes']}
        if j['id']=='lala':r['ficha']='docs/terminus/personagens/lala.md'
        save(p,r)
    entry={'id':j['id'],'nome':j['nome'],'concept':j['neutro_conferido'],'concept_sha256':j['neutro_sha256'],'tipo_referencia':'neutro do próprio conjunto; sem sexto desenho','invariantes':j['invariants'],'atuacao':j['acting'],'cenas':j['scenes'],'fontes':['docs/terminus/prototipo/content.js',j['referenceLocal']],'prompt_do_concept':neutral['prompt'],'status':'em desenvolvimento'}
    if j['id']=='lala':
        entry['ficha']='docs/terminus/personagens/lala.md'
        entry['concept_autor']='docs/terminus/arte/bustos/expressoes/referencias/lala-concept-autor.png'
    old.append(entry)
new['exportados']=45
new['revisao_interna']='45 combinações conferidas; aprovação artística do autor pendente.'
new['observacao']='As 42 bases e 210 expressões anteriores foram trazidas pelo pull solicitado pelo autor durante a produção. Os 58 arquivos locais foram restaurados sem divergências. Verificação por hashes contra main 2b68d89 confirma a preservação dos 252 arquivos anteriores.'
save(docs/'matriz-lala-figurantes.json',new)
matrix['total_planejado']=255;matrix['personagens']=old
save(docs/'matriz.json',matrix)
control=read(docs/'controle.json')
control.update(planejados=255,exportados=255,conjuntos_completos=[j['id'] for j in old],faltantes=[],inspecao_visual_pendente=[],novos_neutros_como_referencia=9,referencias_preservadas=42)
save(docs/'controle.json',control)
save(docs/'controle-lala-figurantes.json',{'status':'em desenvolvimento','planejados':45,'exportados':45,'conjuntos_completos':ids,'faltantes':[],'inspecao_visual_pendente':[],'aprovacao':'aguarda avaliação do autor'})
intro='# Lala e oito figurantes — galeria comparativa\n\nStatus: em desenvolvimento.\n\n45 de 45 imagens exportadas; nove conjuntos conferidos internamente. Aprovação artística do autor pendente.\n\nOrdem: neutro, feliz, triste, com raiva e confuso. [Registro de produção, fontes e critérios](lala-figurantes.md).\n'
sections=[]
for j in new['personagens']:
    ident=j['id']
    part='\n## '+j['nome']+'\n\n'
    if ident=='lala':part+='[Concept do autor — traje central](referencias/lala-concept-autor.png)\n\n'
    part+='| Neutro | Feliz | Triste | Com raiva | Confuso |\n| --- | --- | --- | --- | --- |\n| '
    part+=' | '.join('!['+ident+' — '+e+'](../../../../../assets/terminus/bustos/expressoes/'+ident+'/'+e+'.png)' for e in new['expressoes'])+' |\n'
    sections.append(part)
    preview=docs/'previas-lala-figurantes';preview.mkdir(exist_ok=True)
    shutil.copy2(root/'tmp/imagegen/novos45'/('prancha-'+ident+'-neutro.jpg'),preview/(ident+'.jpg'))
(docs/'galeria-lala-figurantes.md').write_text(intro+''.join(sections),encoding='utf-8')
gallery=docs/'galeria.md';txt=gallery.read_text(encoding='utf-8')
txt=txt.replace('210 de 210 imagens exportadas; 42 conjuntos completos.','255 de 255 imagens exportadas; 51 conjuntos completos.')
if '## Lala' not in txt:txt+='\n'+''.join(sections)
gallery.write_text(txt,encoding='utf-8')
report['revisao_visual']={'conjuntos':ids,'criterios':review['criterios'],'aprovacao_artistica':'aguarda avaliação do autor'}
save(docs/'verificacao-lala-figurantes.json',report)
final=read(docs/'verificacao-final.json')
final.update(imagens=255,visuais=51,novas_imagens=45,novos_visuais=9,referencias_preservadas=42,novos_neutros_como_referencia=9,expressoes_anteriores_preservadas=210,verificacao_novo_lote='verificacao-lala-figurantes.json',revisao_visual='45 novas combinações conferidas lado a lado no tamanho final; mantida a revisão registrada dos 210 bustos anteriores.')
save(docs/'verificacao-final.json',final)
print('Documentação integrada: 51 visuais, 255 expressões; lote novo: 45.')
