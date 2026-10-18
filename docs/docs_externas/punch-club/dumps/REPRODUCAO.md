# Reprodução da extração

O script abaixo lê as instalações locais sem executar os jogos ou alterar seus arquivos. Exporta somente inglês e português brasileiro. Use uma pasta de saída nova: o script recusa sobrescrever um dump existente.

## Ferramentas

- Python 3.13 (execução registrada: 3.13.15).
- UnityPy 1.25.4 e TypeTreeGeneratorAPI 0.0.10, em ambiente virtual.
- .NET 8 e ILSpyCmd 9.1.0.7988, instalados em pasta temporária.
- Referências das ferramentas: [UnityPy](https://github.com/K0lb3/UnityPy) e [ILSpyCmd](https://github.com/icsharpcode/ILSpy/blob/master/ICSharpCode.ILSpyCmd/README.md).

A descoberta de recursos usa nomes e classes, não PathIDs fixos. A leitura dos objetos sem árvore de tipos gera o esquema a partir dos assemblies instalados, normaliza os containers de listas e o alinhamento do cabeçalho MonoBehaviour e exige que a reserialização produza exatamente os mesmos bytes. Uma divergência interrompe a extração; não há recuperação por strings soltas nem descarte silencioso de campos.

Os objetos dos grafos que já contêm árvore de tipos usam essa árvore original. A string `_serializedGraph` permanece intacta e sua expansão é validada por recarregamento. O código decompilado fica em `.txt`; ferramentas, assemblies e projetos intermediários ficam fora do repositório.

## Execução

Salve o bloco Python deste documento como `extract.py` em uma pasta temporária. No PowerShell, ajuste os caminhos se necessário:

```powershell
$dumpTools = Join-Path $env:TEMP ('punch-club-repro-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $dumpTools | Out-Null
$pythonExe = 'C:\Users\Edney\AppData\Local\Programs\Python\Python313\python.exe'
& $pythonExe -m venv (Join-Path $dumpTools 'venv')
$dumpPython = Join-Path $dumpTools 'venv\Scripts\python.exe'
& $dumpPython -m pip install UnityPy==1.25.4 TypeTreeGeneratorAPI==0.0.10
dotnet tool install ilspycmd --version 9.1.0.7988 --tool-path (Join-Path $dumpTools 'dotnet')
# Aponte para o extract.py salvo a partir do bloco abaixo.
$extractScript = 'C:\caminho\temporario\extract.py'
& $dumpPython $extractScript --steam 'C:\Program Files (x86)\Steam\steamapps\common' --output (Join-Path $dumpTools 'resultado') --work (Join-Path $dumpTools 'intermediarios') --ilspy (Join-Path $dumpTools 'dotnet\ilspycmd.exe')
```

Os índices e READMEs editoriais são mantidos neste repositório. O script reproduz os dados `.txt`, seus manifestos e os relatórios de referências. `arquivos.txt` registra hashes dos arquivos gerados, exceto o próprio índice de hashes. Builds diferentes podem produzir resultados diferentes; consulte `fontes.txt` e `steam-appmanifest.txt` antes de comparar contagens. O resumo Steam inclui apenas identificação e versão do jogo.

## Script

```python
"""Static extraction of installed Punch Club narrative resources. Never runs game code."""
import argparse
import gc
import hashlib
import importlib.metadata
import json
from pathlib import Path
import re
import subprocess
import sys

import UnityPy
from UnityPy.helpers import TypeTreeHelper as TH
from UnityPy.helpers.TypeTreeGenerator import TypeTreeGenerator
from UnityPy.helpers.TypeTreeNode import TypeTreeNode
from UnityPy.streams import EndianBinaryReader, EndianBinaryWriter


def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def text(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(value.replace('\r\n', '\n'), encoding='utf-8', newline='\n')


def dump(path, value):
    rendered = json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + '\n'
    text(path, rendered)
    assert json.loads(path.read_text(encoding='utf-8')) == value, path


def safe(value):
    return re.sub(r'[^A-Za-z0-9_.-]', '_', value)[:130]


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for item in value.values():
            yield from strings(item)
    elif isinstance(value, list):
        for item in value:
            yield from strings(item)


def pc1_references(code, english, alias):
    refs = []
    for name, body in sorted(code.items()):
        for match in re.finditer(r'\b(logic_\w+)\s*=\s*"([^"\r\n]*)"', body):
            if '_txt_' in match[1].lower():
                refs.append({'script':name,'field':match[1],'value':match[2]})
        for match in re.finditer(r'\b(logic_\w+_answers_\d+)\s*=\s*new string\[\d+\]\s*\{([^}]+)\}', body):
            for value in re.findall(r'"([^"\r\n]*)"',match[2]):
                refs.append({'script':name,'field':match[1],'value':value})
    for ref in refs:
        value = ref['value']
        seen = set()
        while value not in english and value in alias and value not in seen:
            seen.add(value)
            value = alias[value]
        ref['resolved_english_key'] = value if value in english else None
    return refs


class Reader:
    def __init__(self, root, version):
        self.generator = TypeTreeGenerator(version)
        self.generator.load_local_game(str(root))
        self.cache = {}

    def node(self, obj, script):
        full = '.'.join(x for x in (script.m_Namespace, script.m_ClassName) if x)
        key = (script.m_AssemblyName, full)
        if key not in self.cache:
            raw = self.generator.get_nodes(*key)
            nodes = []
            for i, n in enumerate(raw):
                typ, flags = n.m_Type, n.m_MetaFlag
                # GeneratorAPI represents List<T> with the element's type name.
                # UnityPy dispatches primitives before arrays: name these containers vector.
                if (i + 3 < len(raw) and raw[i+1].m_Level == n.m_Level+1
                        and raw[i+1].m_Type == 'Array'
                        and not (typ == 'string' and raw[i+3].m_Type == 'char')):
                    typ = 'vector'
                # Unity MonoBehaviour header pads the enabled byte to a 4-byte boundary.
                if n.m_Level == 1 and n.m_Name == 'm_Enabled':
                    flags |= 0x4000
                nodes.append(TypeTreeNode(n.m_Level, typ, n.m_Name, 0, 0, m_MetaFlag=flags))
            self.cache[key] = TypeTreeNode.from_list(nodes)
        return self.cache[key]

    def read(self, obj, script):
        node = obj.serialized_type.node or self.node(obj, script)
        raw = obj.get_raw_data()
        reader = EndianBinaryReader(raw, endian=obj.reader.endian)
        config = TH.TypeTreeConfig(True, obj.assets_file)
        # Explicit Python reader uses the generated array/header schema consistently.
        tree = TH.read_value(node, reader, config)
        assert reader.Position == len(raw), (obj.path_id, reader.Position, len(raw))
        writer = EndianBinaryWriter(endian=obj.reader.endian)
        TH.write_value(tree, node, writer, config)
        assert writer.bytes == raw, ('binary roundtrip', obj.path_id)
        return tree


def run(args, destination=None):
    result = subprocess.run([str(x) for x in args], capture_output=True, check=True)
    if result.stderr.strip():
        raise RuntimeError(result.stderr.decode('utf-8', errors='replace'))
    if destination:
        text(destination, result.stdout.decode('utf-8-sig'))
    return result.stdout.decode('utf-8-sig')


def extract(game, slug, args):
    root = args.steam / game
    data = root / (game + '_Data')
    out = args.output / slug
    assert not out.exists(), f'Use an empty destination: {out}'
    out.mkdir(parents=True)
    source_paths = [data/'resources.assets', data/'globalgamemanagers.assets']
    source_paths += sorted((data/'Managed').glob('*.dll'))
    bundles = sorted(data.rglob('*.bundle'))
    flows_bundle = next((p for p in bundles if p.name == 'visualscripts_assets_flowscripts.bundle'), None)
    if flows_bundle:
        source_paths.append(flows_bundle)
    # Scan all serialized asset containers, including scenes, for coverage evidence.
    containers = sorted(p for p in data.iterdir() if p.suffix == '.assets'
                        or (p.name.startswith('level') and p.name[5:].isdigit())) + bundles
    source_paths = sorted(set(source_paths + containers))
    before = {str(p.relative_to(root)): sha(p) for p in source_paths}
    env = UnityPy.load(str(data/'resources.assets'))
    version = next(iter(env.objects)).assets_file.unity_version
    reader = Reader(root, version)
    objects, locales, aliases, balance, issues = [], {}, {}, None, []
    checks = {'binary_roundtrips': 0, 'graphs': 0, 'nodes': 0, 'connections': 0}
    for obj in env.objects:
        if obj.type.name != 'MonoBehaviour':
            continue
        head = obj.parse_monobehaviour_head()
        if not head.m_Script.m_PathID:
            continue
        script = head.m_Script.deref_parse_as_object()
        if script.m_ClassName not in ['GJL', 'LL', 'GameBalance']:
            continue
        if script.m_ClassName in ['GJL','LL'] and head.m_Name not in ['lng_en','lng_ptbr','lng_pt-br']:
            continue
        tree = reader.read(obj, script)
        checks['binary_roundtrips'] += 1
        entry = {'source':'resources.assets', 'path_id':obj.path_id,
                 'name':head.m_Name, 'class':script.m_ClassName,
                 'bytes':obj.byte_size, 'raw_sha256':hashlib.sha256(obj.get_raw_data()).hexdigest()}
        if script.m_ClassName == 'GameBalance':
            balance = tree
            entry['file'] = 'quests/GameBalance.txt'
            dump(out/entry['file'], tree)
            qkey = 'quests_data' if slug == 'punch-club-1' else 'questData'
            dump(out/'quests/quests.txt', tree[qkey])
            checks['quests'] = len(tree[qkey])
        else:
            name = safe(head.m_Name)
            entry['file'] = f'localizacao/{name}.estrutura.txt'
            dump(out/entry['file'], tree)
            keys = tree.get('txt_ids', tree.get('txtIds'))
            values = tree['txts']
            assert len(keys) == len(values), name
            a1 = tree.get('aliases_1', tree.get('aliases1'))
            a2 = tree.get('aliases_2', tree.get('aliases2'))
            assert len(a1) == len(a2), name
            entry.update({'texts':len(keys), 'aliases':len(a1), 'duplicate_keys':len(keys)-len(set(keys))})
            locales[head.m_Name] = dict(zip(keys, values))
            aliases[head.m_Name] = dict(zip(a1,a2))
            # Readable view is derived. The structure file retains every original field/list.
            lines = [f'Idioma: {tree["id"]}\nRecurso: {head.m_Name}\nPathID: {obj.path_id}\n',
                     'Textos em ordem original; conteúdo entre separadores pode conter quebras de linha.\n']
            for i, (key, val) in enumerate(zip(keys, values)):
                lines.append(f'\n===== {i}: {key} =====\n{val}\n')
            lines.append('\n===== ALIASES (origem -> destino) =====\n')
            lines.extend(f'{a} -> {b}\n' for a,b in zip(a1,a2))
            text(out/f'localizacao/{name}.txt', ''.join(lines))
        objects.append(entry)
    assert balance and locales
    del env
    english = locales['lng_en']
    ptname = 'lng_ptbr' if slug == 'punch-club-1' else 'lng_pt-br'
    assert ptname in locales
    locale_report = {}
    for name, values in locales.items():
        locale_report[name] = {'keys':len(values), 'missing_vs_en':sorted(set(english)-set(values)),
                               'extra_vs_en':sorted(set(values)-set(english))}
    dump(out/'localizacao/cobertura.txt', locale_report)

    # Independent source inventory; graph resources outside the main bundle are not ignored.
    inventory, graph_refs, graphs, sample, used_types = [], [], [], {}, set()
    for path in containers:
        e = UnityPy.load(str(path))
        found = []
        failures = []
        for obj in e.objects:
            if obj.type.name != 'MonoBehaviour':
                continue
            head = obj.parse_monobehaviour_head()
            node = obj.serialized_type.node
            fields = {n.m_Name for n in node.traverse()} if node else set()
            if '_serializedGraph' not in fields and '_boundGraphSerialization' not in fields:
                continue
            tree = obj.read_typetree()
            if '_serializedGraph' not in tree:
                # Preserve graph-owner configuration, including bound serialization.
                dest = f'fluxos/instancias/{safe(path.stem)}--{obj.path_id}.txt'
                dump(out/dest, tree)
                found.append({'path_id':obj.path_id,'file':dest,'kind':'owner'})
                continue
            serialized = tree['_serializedGraph']
            if not serialized:
                graph = None
            else:
                graph = json.loads(serialized)
            dest = f'fluxos/grafos/{safe(head.m_Name or "sem-nome")}--{obj.path_id}.txt'
            export = {'source':str(path.relative_to(data)), 'asset_file':obj.assets_file.name,
                      'path_id':obj.path_id, 'serialized_graph_sha256':hashlib.sha256(serialized.encode('utf-8')).hexdigest(),
                      'object':tree}
            # Keep the source serialization as well as a readable expansion.
            export['graph'] = graph
            dump(out/dest, export)
            checks['graphs'] += 1
            if graph:
                nodes = graph.get('nodes',[])
                conns = graph.get('connections',[])
                checks['nodes'] += len(nodes)
                checks['connections'] += len(conns)
                ids = {str(n['$id']) for n in nodes if '$id' in n}
                for c in conns:
                    for side in ['_sourceNode','_targetNode']:
                        if isinstance(c.get(side),dict) and '$ref' in c[side] and str(c[side]['$ref']) not in ids:
                            issues.append({'graph':head.m_Name,'connection':c,'reason':'node reference not in nodes'})
                for n in nodes:
                    kind = n.get('$type','')
                    used_types.add(kind.split('`')[0].split('.')[-1])
                    params = n.get('_inputPortValues',{})
                    for port,v in params.items():
                        value = v.get('$content') if isinstance(v,dict) else v
                        if isinstance(value,str) and port.lower().replace(' ','') in ['text','phrase','scriptname','questid','storynode','parent','child']:
                            graph_refs.append({'graph':head.m_Name,'node':n.get('$id'),'type':kind,'port':port,'value':value})
                    for answer in n.get('answerOptions',[]):
                        if isinstance(answer.get('id'),str):
                            graph_refs.append({'graph':head.m_Name,'node':n.get('$id'),'type':kind,'port':'answerOptions.id','value':answer['id']})
                graphs.append(head.m_Name)
                if not sample and nodes and conns:
                    sample={'file':dest,'name':head.m_Name,'nodes':len(nodes),'connections':len(conns)}
            found.append({'path_id':obj.path_id,'name':head.m_Name,'file':dest,'kind':'graph'})
        inventory.append({'source':str(path.relative_to(data)), 'objects':len(e.objects),
                          'objects_with_typetree':sum(bool(o.serialized_type and o.serialized_type.node) for o in e.objects),
                          'graphs_or_owners':found,'failures':failures})
        del e
        gc.collect()
    dump(out/'inventario-containers.txt', inventory)

    # Decompile to a temporary directory; only narrative classes enter the dump.
    decompiled = args.work / (slug+'-decompiled')
    assembly = data/'Managed/Assembly-CSharp.dll'
    run([args.ilspy,'--disable-updatecheck','-p','-o',decompiled,assembly])
    code = {p.stem:(p,p.read_text(encoding='utf-8-sig')) for p in decompiled.rglob('*.cs')}
    if slug == 'punch-club-1':
        selected = {name for name,(_,body) in code.items() if re.search(r'\bRelay_\w+\s*\(',body)}
        checks['uscript_graphs'] = len(selected)
        selected |= {name+'_Component' for name in list(selected) if name+'_Component' in code}
        selected |= {name for name in code if name.startswith('uScript')}
        selected |= {name for name in code if re.search(r'Quest|Dialog|SpeechBubble|GameScript|TriggersDescription|GoalData|GameBalance', name)}
        extra = out/'fluxos/codigo/GJL.txt'
        run([args.ilspy,'--disable-updatecheck','-t','GJL',data/'Managed/Assembly-CSharp-firstpass.dll'], extra)
    else:
        selected = {name for name,(path,body) in code.items()
                    if 'FlowCanvasNodes' in str(path) or name.startswith('Flow_') or name in used_types
                    or re.search(r'Quest|Dialog|Speech|GameBalance|^LL$|LogicDefinition|EventDefinition|KnowledgeSystemManager',name)}
    code_index = []
    code_bodies = []
    for name in sorted(selected):
        path, body = code[name]
        if any(marker in body for marker in ['Error decompiling','ICSharpCode.Decompiler.DecompilerException']):
            raise ValueError(('decompiler failure',name))
        dest = 'fluxos/codigo/'+safe(name)+'.txt'
        text(out/dest, body)
        code_index.append({'type_file':str(path.relative_to(decompiled)), 'file':dest,
                           'assembly':'Managed/Assembly-CSharp.dll'})
        code_bodies.append(body)
    dump(out/'fluxos/codigo/indice.txt', code_index)
    checks['code_files'] = len(code_index) + (1 if slug=='punch-club-1' else 0)

    if slug == 'punch-club-2':
        unresolved = []
        quest_ids = {q['id'] for q in balance['questData']}
        def resolve_locale(value):
            seen = set()
            while value not in english and value in aliases['lng_en'] and value not in seen:
                seen.add(value)
                value = aliases['lng_en'][value]
            return value in english
        for ref in graph_refs:
            if not ref['value']:
                continue
            if ref['port'].lower() in ['text','phrase','answeroptions.id'] and not resolve_locale(ref['value']):
                unresolved.append({**ref,'reason':'not resolved as an English locale key or alias; may be literal/dynamic'})
            if ref['port'].lower() == 'scriptname' and ref['value'] not in graphs:
                unresolved.append({**ref,'reason':'not a graph asset name; may be dynamic/scene-bound'})
            if ref['port'].lower().replace(' ','') in ['questid','storynode','parent','child'] and ref['value'] not in quest_ids:
                unresolved.append({**ref,'reason':'not a quest definition ID; may be dynamic'})
        dump(out/'fluxos/referencias.txt', graph_refs)
        dump(out/'fluxos/referencias-nao-resolvidas.txt', unresolved)
        checks['reference_candidates'] = len(graph_refs)
        checks['unresolved_candidates'] = len(unresolved)
    else:
        # Static string references in generated uScript fields; retain raw code for dynamic values.
        refs = pc1_references({name:code[name][1] for name in selected}, english, aliases['lng_en'])
        dump(out/'fluxos/referencias.txt',refs)
        unresolved = [ref for ref in refs if not ref['resolved_english_key']]
        dump(out/'fluxos/referencias-nao-resolvidas.txt',unresolved)
        checks['reference_candidates'] = len(refs)
        checks['unresolved_candidates'] = len(unresolved)
        quest_refs = []
        for quest in balance['quests_data']:
            for field in ['start_lua','success_lua','fail_lua']:
                value=quest[field].strip()
                if value.startswith(':'):
                    quest_refs.append({'quest_id':quest['_id'],'field':field,'script':value[1:],
                                       'exported':value[1:] in selected})
        dump(out/'quests/referencias-scripts.txt',quest_refs)
        checks['quest_script_references'] = len(quest_refs)
        checks['unresolved_quest_scripts'] = sum(not r['exported'] for r in quest_refs)
    dump(out/'fluxos/inconsistencias.txt',issues)
    assert not issues, ('broken graph node references',len(issues))
    checks['locales'] = len(locales)
    checks['localization_entries'] = sum(len(v) for v in locales.values())
    assert before == {str(p.relative_to(root)):sha(p) for p in source_paths}, 'Installation changed during extraction'
    dump(out/'objetos-exportados.txt',objects)
    sources = [{'path':name,'sha256':value,'bytes':(root/name).stat().st_size} for name,value in before.items()]
    dump(out/'fontes.txt',sources)
    steam_manifests = []
    for p in sorted(args.steam.parent.glob('appmanifest_*.acf')):
        content = p.read_text(encoding='utf-8')
        if re.search(r'"installdir"\s+"'+re.escape(game)+r'"',content):
            build = {key:re.search(r'"'+key+r'"\s+"([^"]*)"',content).group(1)
                     for key in ['appid','name','installdir','buildid','LastUpdated']}
            dump(out/'steam-appmanifest.txt',build)
            steam_manifests.append(p.name)
    files = sorted(p for p in out.rglob('*') if p.is_file())
    for p in files:
        assert p.suffix in ['.txt','.md']
        p.read_text(encoding='utf-8',errors='strict')
    manifest = {'game':game,'source_root':str(root),'unity':version,'python':sys.version.split()[0],
                'UnityPy':importlib.metadata.version('UnityPy'),
                'TypeTreeGeneratorAPI':importlib.metadata.version('TypeTreeGeneratorAPI'),
                'ILSpy':run([args.ilspy,'--version']).strip(), 'steam_manifests':steam_manifests,
                'checks':checks,'sample_graph':sample,'failed_selected_objects':0}
    dump(out/'manifesto.txt',manifest)
    files = sorted(p for p in out.rglob('*') if p.is_file() and p.name != 'arquivos.txt')
    dump(out/'arquivos.txt',[{'path':str(p.relative_to(out)).replace('\\','/'), 'sha256':sha(p),
                            'bytes':p.stat().st_size} for p in files])
    print(slug,json.dumps(checks),flush=True)


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--steam',type=Path,required=True,help='steamapps/common')
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--work',type=Path,required=True,help='Temporary decompilation directory')
    parser.add_argument('--ilspy',type=Path,required=True)
    a=parser.parse_args()
    for game,slug in [('Punch Club','punch-club-1'),('Punch Club 2 Fast Forward','punch-club-2')]:
        extract(game,slug,a)
```
