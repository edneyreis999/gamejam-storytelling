# Dados de referência de Dragon Cliff

Extração estática da instalação Steam local, **build 6212414**, realizada em **17/10/2026**. São **18 JSONs**, incluindo o manifesto, acompanhados dos scripts de extração. Este material é referência externa; não é documentação aprovada nem configuração de outro jogo.

Os textos vêm de `game_Data/StreamingAssets/Localization-en.json`; as constantes, configurações e fórmulas vêm de `game_Data/Managed/Assembly-CSharp.dll`. A instalação e os saves não foram alterados. Não houve validação por uma campanha jogada.

Para a interpretação dos dados, leia [os sistemas](../dragon-cliff-sistemas.md) e [a evolução da cidade](../dragon-cliff-evolucao-da-cidade.md).

## Catálogo dos arquivos

| Arquivo | Conteúdo e uso |
| --- | --- |
| [equipamentos.json](equipamentos.json) | 353 entradas localizadas de armas, armaduras, acessórios, pergaminhos, amuletos e dispositivos. IDs, categoria, templates identificados, tier e referências às regras. |
| [propriedades-equipamentos.json](propriedades-equipamentos.json) | Descritores de oito categorias básicas, atributos possíveis, garantias padrão, qualidades, fatores de potência e valores raiz de 125 tiers. |
| [regras-equipamentos.json](regras-equipamentos.json) | 300 templates de itens, suas bases e regras relacionadas a geração, receitas, produção, gemas, conjuntos e operações sobre itens. |
| [herois.json](herois.json) | 26 configurações: classe, função, elemento, convite, preço base, potenciais de atributos, habilidades e talentos associados. |
| [progressao-herois.json](progressao-herois.json) | Experiência acumulada, limite de nível, pontos de talento, fórmula de crescimento e intervalos de qualidade. |
| [regras-progressao.json](regras-progressao.json) | Fórmulas de criação e crescimento, configurações de classes e funções, modificadores e regras de dificuldade. |
| [talentos.json](talentos.json) | 117 implementações: ID, descrição, tier, nível máximo, parâmetros e heróis associados. Inclui também os textos originais. |
| [regras-talentos.json](regras-talentos.json) | Métodos, condições e herança das implementações de talentos. |
| [habilidades.json](habilidades.json) | 89 registros localizados e suas implementações identificadas: comando, categoria, elemento, alvos e talentos de habilidade. |
| [status-e-efeitos.json](status-e-efeitos.json) | 48 atributos, 113 registros de efeitos de batalha, 241 de efeitos especiais, elementos, estilos, categorias e condições de crescimento. |
| [regras-combate.json](regras-combate.json) | Implementações de habilidades e efeitos, além de regras compartilhadas de combate. |
| [inimigos.json](inimigos.json) | 189 configurações de inimigos, com herança, função e referências ao cálculo de atributos e habilidades. |
| [regras-inimigos.json](regras-inimigos.json) | Configurações completas dos inimigos e regras compartilhadas de crescimento e dificuldade. |
| [encontros-e-missoes.json](encontros-e-missoes.json) | Sete configurações de mapas comuns, descrições de missões, requisitos, cadeias e lógica de encontros e desafios especiais. |
| [cidade-e-economia.json](cidade-e-economia.json) | Edifícios, títulos, moradores, contribuições, eventos, barcos, viagens e regras de serviços urbanos. |
| [catalogo-itens.json](catalogo-itens.json) | 793 registros localizados de itens, incluindo materiais, permissões, convites e consumíveis, com códigos e categorias. |
| [identificadores.json](identificadores.json) | 142 nomes de enums resolvidos em mapas de nome interno para ID numérico; 145 declarações de origem incluem repetições idênticas. |
| [manifesto.json](manifesto.json) | Versão, método, contagens, limites e hashes SHA-256 das duas fontes e dos outros 17 JSONs. |

## Como ler os campos e relacionar tabelas

`schema_version` identifica o formato desta extração; `build_steam` identifica a versão estudada. Não são versões intercambiáveis. Os nomes internos foram preservados, incluindo grafias como `Intelligience`, `Lightening` e `IronSolider`.

Os catálogos normalizados usam `id` e `codigo`. As coleções de localização preservam chaves originais como `ItemType`, `SkillType`, `UnitClass` e `Type`. Relacione os valores dentro do enum correspondente; um mesmo número em enums diferentes não identifica necessariamente o mesmo objeto.

| Relação | Caminho |
| --- | --- |
| Herói → habilidade | `herois[].habilidades[].id` → `habilidades[].SkillType`. |
| Herói → talento | `herois[].talentos[].tipo` → `talentos[].tipo`; o ID corresponde a `AdventurerTalentType`. |
| Equipamento → catálogo de itens | `equipamentos[].id` → `itens[].ItemType`. |
| Equipamento → template | `equipamentos[].configuracoes[].tipo` → `regras-equipamentos.json`, array `tipos`, campo `tipo`. |
| Inimigo → configuração | `inimigos[].configuracao` → `regras-inimigos.json`, array `tipos`, campo `tipo`. |
| Atributo → enum | ID original da localização ou descritor → `identificadores.json`, `enums.AttributeType`. |

Uma referência como `regras-inimigos.json#AlgumTipo` é uma convenção de consulta: abra o arquivo e procure `tipos[].tipo === "AlgumTipo"`. O fragmento não é um JSON Pointer nem uma âncora de navegador. Referências `Tipo.Membro` indicam uma propriedade ou método da classe; procure também nas bases listadas em `bases` ou `heranca`.

Nos arquivos de regras, `campos` preserva valores e inicializadores; `propriedades` inclui `valor_constante` quando resolvido com segurança; `metodos` e `regra_csharp` preservam o código descompilado. Valores estruturados com `kind: "expression"` continuam sendo expressões, não resultados calculados. `null` significa ausência ou resolução insuficiente naquele campo; não equivale automaticamente a zero.

As linhas em `fonte.linha_descompilada` pertencem à saída do ILSpy usada na análise. A classe e o membro são referências mais estáveis que o número da linha.

## Equipamentos: propriedades possíveis e valores finais

O catálogo não representa itens sorteados de um save. Um valor final depende de categoria, tier, qualidade, template, aleatoriedade e modificadores. Para estudar um equipamento, siga sua configuração até as regras, consulte os descritores da categoria e aplique as condições pertinentes.

Os campos `atributos_mencionados`, `garantias_padrao` e `primarios_padrao` registram referências encontradas nos métodos. Quando existe condição no método, a menção isolada não prova que o atributo será concedido em todo contexto. O arquivo de regras preserva essa condição.

Das 353 entradas, **289 têm template individual identificado**; **64 permanecem como registros localizados**, sem configuração individualizada nesta extração. Isso não prova que sejam inacessíveis: podem usar geração compartilhada ou exigir resolução adicional. Os 300 templates do arquivo de regras incluem outros tipos de itens, portanto não têm correspondência um para um com essas 353 entradas.

A categoria segue as faixas numéricas do runtime. Cinco dessas entradas não têm correspondência no enum atual `ResourceType` e usam `codigo: null`: Cloth Gown (`200001`) e quatro Dust (`1300001–1300004`). A faixa dos Dust os coloca em `Scrolls`, mas isso não confirma que sejam pergaminhos utilizáveis. No catálogo completo de 793 itens, há 18 registros sem código correspondente no enum atual. Foram preservados para explicitar os resíduos da localização.

Os oito conjuntos de descritores correspondem às categorias básicas de armas e armaduras. Acessórios, pergaminhos, amuletos e dispositivos também aparecem no catálogo, mas usam regras próprias. Não aplique automaticamente os descritores de uma arma a esses objetos.

## Heróis, progressão, inimigos e resíduos

- Há **25 configurações de heróis com habilidades padrão**. A 26ª, `RedMage`, não tem essas habilidades e permanece marcada como de acesso jogável não confirmado.
- Os potenciais são parâmetros de crescimento, não status finais. A progressão depende de qualidade, sorteios e modificadores. STR, INT, AGI, VIT e resistências elegíveis seguem a regra de evolução; crítico não deve receber automaticamente essa mesma fórmula.
- A tabela de experiência contém **92 faixas geradas pelo código**, mas o limite jogável é **90**. As faixas 91 e 92 estão marcadas como auxiliares. O custo indicado no nível 90 descreve a faixa; não autoriza subir para 91.
- As 189 configurações de inimigos incluem **186 com ID fixo e três geradores dinâmicos**: `EndlessDungeonBossConfiguration`, `EndlessDungeonMinibossConfiguration` e `EndlessDungeonMinionConfiguration`. Os três usam `id: null`. Vida, dano e composição final das habilidades exigem nível, dificuldade e contexto do encontro.
- Entre os 89 registros localizados de habilidades, quatro não tiveram implementação vinculada: o sentinela `1` e os registros `1051`, `1052` e `1057`. São mantidos como dados de origem, sem afirmar que sejam habilidades jogáveis.
- Há 117 implementações de talentos e 118 registros de localização de talentos; a localização também contém o sentinela `None`.
- Contagens de efeitos, itens e enums incluem sentinelas ou registros residuais quando presentes. Existir no código ou na localização não comprova disponibilidade em uma partida.

Descrições com parâmetros, como `{maindamagerate}`, permanecem intactas. Seus valores dependem da implementação. A análise distingue divergências de versão, como o manual antigo de cartas de melhoria e o sistema atual de talentos.

## Exemplo de consulta com Node.js

Execute a partir da raiz do repositório. O exemplo usa os IDs para percorrer as relações, sem executar as fórmulas do jogo:

```javascript
const fs = require('fs');
const dir = 'docs/docs_externas/dragon-cliff/dados/';
const ler = nome => JSON.parse(fs.readFileSync(dir + nome, 'utf8'));

const heroi = ler('herois.json').herois.find(h => h.codigo === 'StreetMan');
const habilidades = ler('habilidades.json').habilidades;
console.log(heroi.potenciais);
console.log(heroi.habilidades.map(h =>
  habilidades.find(s => s.SkillType === h.id)));

const espada = ler('equipamentos.json').equipamentos
  .find(e => e.codigo === 'WoodenSword');
const regras = ler('regras-equipamentos.json').tipos;
console.log(espada);
console.log(espada.configuracoes.map(c => regras.find(t => t.tipo === c.tipo)));
```

## Reprodução da extração

Os arquivos [Program.cs](extracao/Program.cs), [Extractor.csproj](extracao/Extractor.csproj) e [export.cjs](extracao/export.cjs) acompanham a entrega. Requerem Node.js, SDK .NET 8 e ILSpy CLI **9.1.0.7988**. A análise original usou SDK **8.0.301**. O projeto acessa o Roslyn do SDK, sem dependência de pacote Roslyn adicional.

Use uma pasta temporária nova para intermediários e compilação. O exemplo PowerShell parte da raiz do repositório e pressupõe que `ilspycmd` já esteja disponível no PATH:

```powershell
$dcInstall = 'C:\Program Files (x86)\Steam\steamapps\common\Dragon Cliff'
$dcWork = Join-Path $env:TEMP ('dragon-cliff-extract-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $dcWork | Out-Null
$dcParser = Join-Path $dcWork 'extractor'
New-Item -ItemType Directory -Path $dcParser | Out-Null
Copy-Item -LiteralPath 'docs/docs_externas/dragon-cliff/dados/extracao/Program.cs' -Destination $dcParser
Copy-Item -LiteralPath 'docs/docs_externas/dragon-cliff/dados/extracao/Extractor.csproj' -Destination $dcParser
Copy-Item -LiteralPath 'docs/docs_externas/dragon-cliff/dados/extracao/export.cjs' -Destination $dcWork
ilspycmd (Join-Path $dcInstall 'game_Data/Managed/Assembly-CSharp.dll') -o $dcWork --disable-updatecheck
if ($LASTEXITCODE -ne 0) { throw 'Falha na descompilação.' }
dotnet run --project (Join-Path $dcParser 'Extractor.csproj') -- (Join-Path $dcWork 'Assembly-CSharp.decompiled.cs') (Join-Path $dcWork 'syntax.json')
if ($LASTEXITCODE -ne 0) { throw 'Falha na análise sintática.' }
node (Join-Path $dcWork 'export.cjs') $dcInstall
if ($LASTEXITCODE -ne 0) { throw 'Falha na exportação.' }
```

O exportador escreve novamente os JSONs em `docs/docs_externas/dragon-cliff/dados`, relativo ao diretório atual. Ele exige os hashes das fontes estudadas e rejeita uma instalação diferente; uma nova build exige revisão da extração e dos documentos. Não copie o DLL ou a descompilação integral para a pasta de referências.

É possível fornecer outra pasta de intermediários por `DRAGON_CLIFF_ANALYSIS_DIR`; sem essa variável, `syntax.json` deve estar ao lado de `export.cjs`. O parser faz análise sintática, não compilação ou execução do código do jogo. As regras exportadas preservam dependências que podem remeter a tipos fora deste recorte; não constituem um simulador independente.

## Verificação e escopo

O exportador valida os vínculos de heróis com habilidades e talentos, a presença dos potenciais esperados, IDs únicos de heróis, continuidade da experiência e estrutura dos catálogos. O manifesto registra os hashes dos 17 arquivos de dados; não inclui seu próprio hash nem os scripts.

As fórmulas condicionais permanecem em C# para permitir auditoria sem substituir regras por números inventados. Este conjunto permite pesquisar valores, comparar configurações e rastrear a lógica de origem. Ele não comprova desempenho de builds em combate nem enumera todas as instâncias possíveis de equipamentos e inimigos.
