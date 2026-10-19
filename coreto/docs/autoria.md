# Operar a CLI

Execute na raiz deste projeto com Node 22.23.2+. `<jogo>` é o caminho informado no [índice](../README.md). Informe esse caminho nas operações sobre o jogo. A CLI não exige npm nem o editor aberto. Nos exemplos de shell, substitua `"<jogo>"` pelo caminho entre aspas simples; dentro dele, represente uma aspa simples por `'\''`.

## Descobrir antes de escrever

```sh
node coreto/tools/coreto/cli.mjs --help --json
node coreto/tools/coreto/cli.mjs message --help --json
node coreto/tools/coreto/cli.mjs message api list --json
node coreto/tools/coreto/cli.mjs message api describe /General/MessageRows --json
```

Os catálogos funcionam sem um jogo selecionado. `api describe` aceita ID, nome ou caminho publicado; consulte contexto, dependências, disponibilidade e formato dos valores. Uma API de runtime descrita não implica uma operação executável pela CLI. Não invente comandos a partir de nomes de métodos.

| Namespace | Recursos |
| --- | --- |
| `core` | Configuração central, comandos, tags e validação estática do jogo |
| `battle` | Regras e apresentação da batalha, parâmetros, sequências e tags |
| `message` | Mensagens, escolhas, comandos, tags, textos e tabelas de idiomas |
| `vn` | Bustos, movimento, efeitos, comandos e validação VN |
| `ext-message` | Auto/avanço rápido, console, menus e escapes estendidos |
| `ani-message` | Efeitos animados de texto e presets |
| `options` | Categorias, controles, opções e textos de ajuda |
| `save` | Saves, autosave, comandos e globais |
| `picture-choices` | Escolhas gráficas |
| `choice-common-events` | Common Events associados a escolhas |
| `attached-pictures` | Pictures anexadas |
| `event-title-scene` | Título dirigido por evento |
| `message-visibility` | Visibilidade das janelas de mensagem |
| `config` | Migração da configuração existente, sem ativar plugins |

Cada namespace de plugin publica `api list`, `api describe`, `install` e operações de parâmetros. Grupos adicionais variam: consulte `<namespace> --help --json` para a superfície exata. Prefira descritores específicos a carregar os JSON completos de `coreto/src/`.

## Preparar configuração e ativação

Inspecione `<jogo>/js/plugins.js` e ative os plugins necessários:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" message install --json
```

Execute somente as escritas necessárias à tarefa. `inherit` lê os parâmetros da entrada original, mesmo desativada; `own` usa a entrada Coreto. `install` materializa a configuração e ativa somente o plugin solicitado; não instala dependências nem recompila bundles. Não troque manualmente o seletor para copiar parâmetros.

Na composição completa, a ordem é Core → Battle → SkillsStates (quando usado) → Message → Options → Save → Extended → PictureChoices → VN → Ani → Choice → Attached → EventTitle → Visibility. Os consumidores Battle de tier 2/3 ficam após Battle e seus suportes. Para ActSeqImpact, registre também `pixi-filters` antes desse consumidor; a versão 3.1.0 e a licença MIT são entregues em `<jogo>/js/plugins/pixi-filters.js` e `<jogo>/js/libs/licenses/pixi-filters-3.1.0.txt`. Ative apenas o necessário e confira as dependências do catálogo. Plugins originais não acompanham o pacote; não ative providers concorrentes. SkillsStatesCore é uma dependência externa de recursos específicos, não uma parte da Coreto entregue.

## Ler, simular, escrever e conferir

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
```

`--value` recebe JSON, inclusive aspas de strings. Nas operações que aceitam `--input`, um arquivo JSON evita erros de escape do shell. Use `--dry-run` quando disponível, leia o diff e consulte o alvo depois da escrita. Reabra o editor e reinicie o playtest para observar a configuração efetiva.

Mapas, eventos e páginas precisam existir. A CLI não cria genericamente a estrutura do jogo. Exemplos de seletores: `map:1/event:1/page:1`, `common-event:1`, `troop:1/page:1`; IDs são os reais do jogo. Índices de comandos são base zero; páginas usam o seletor documentado. Use `commands list` para obter posição, indentação e hash antes de inserir ou atualizar. Operações com `--expected-hash` rejeitam um alvo modificado desde a consulta. Releia o alvo após conflito ou interrupção; não repita uma escrita às cegas.

Tags são editadas pelos grupos `tags`; Mostrar Texto usa `text`; idiomas usam `message language`. Consulte a ajuda de cada grupo para valores, limites e alvos. Funções JavaScript autoradas são analisadas sem execução pela CLI; seu efeito exige playtest.

## Validar e executar

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core validate --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" vn validate --json
node coreto/tools/dev/server.mjs --project "<jogo>"
```

Use `vn validate` somente quando VN fizer parte da configuração. Leia `result.valid` e os diagnósticos; uma resposta JSON válida não comprova configuração válida. A validação inspeciona presença dos arquivos necessários, referências e configuração sem executar o jogo. Não recompila nem compara bundles Coreto com fontes; sucesso não certifica integridade ou comportamento da engine. Personalizações seguem [extensões](extensoes.md).

O servidor oferece os serviços locais de metadados usados pela exportação de textos e pelo editor de coordenadas de pictures. Os arquivos resultantes ficam em `<jogo>/.RPGMakerMZ-metadata/`. Use a URL impressa pelo servidor; outro servidor estático pode não oferecer esses serviços.

Com `--json`, leia `ok`, `operation`, `target`, `result` ou `error`. Códigos usuais: 0 sucesso, 2 entrada inválida, 3 alvo ausente, 4 conflito, 5 falha de I/O, 6 capacidade indisponível. A ajuda do namespace especifica os casos aplicáveis. Validação estática não comprova aparência, áudio ou jornadas: use [QA](qa.md).

## Atualizar uma configuração antiga

Se o registry veio de uma versão anterior sem seletores explícitos, consulte `config migrate --help --json` e simule a normalização antes de salvar no editor:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --json
```

A migração preserva valores, ordem e ativação; um registry já normalizado não é reescrito.

## Configurar batalha

O Battle próprio suporta MZ 1.10.0/Pixi 5.3.12 e exige Coreto Core antes dele. Consulte a disponibilidade antes de usar sequências de câmera, projétil, impacto ou outros recursos fornecidos por plugins externos. Copiar ou ativar Battle não instala esses consumidores.

```sh
node coreto/tools/coreto/cli.mjs battle api describe /BattleLayout/ListMinRows --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle install --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle install --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle parameters set --path /BattleLayout/ListMinRows --value 7 --json
node coreto/tools/coreto/cli.mjs battle api describe ActSeq_Movement_Opacity --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle commands list --target common-event:1 --json
```

O comando `install` substitui somente o provider Battle selecionado e materializa seus parâmetros; confira a ordem resultante no Gerenciador de Plugins. IDs antigos `VisuMZ_1_BattleCore` em eventos continuam aceitos pelo provider próprio. Novos comandos podem usar `Coreto_1_BattleCore`. Não mantenha os dois providers ativos.

Tags de habilidades, estados e inimigos usam `skills:ID`, `states:ID` e `enemies:ID`. Layout de tropa usa `troop:ID/name` ou `troop:ID/page:N/comment:I`, onde I aponta para o comando de comentário108; continuações408 pertencem ao mesmo bloco. Use a tag completa como string JSON e o hash retornado por `tags list`. Callbacks são armazenados pela CLI e executados pelo jogo no contexto publicado; a edição offline não os executa.

Após salvar no Editor ou pela CLI, reabra o projeto e reinicie o playtest. Confira uma batalha e o retorno ao mapa, incluindo os consumidores ativados.

## Events & Movement: movimento e rotas

O namespace `events-move` publica parâmetros, comandos, tags, rotas e nomes para movimento, passagem, dados Self/Map, ativação, templates, apresentação, temporizador e seguidores. A ajuda informa os consumidores compatíveis e suas versões; esses plugins e seus assets são instalados separadamente.

Consulte `node coreto/tools/coreto/cli.mjs events-move --help` e `events-move api list` antes de editar. Ative Coreto_0_CoreEngine antes de Events. Use `events-move install --project <jogo>` para selecionar Coreto_1_EventsMoveCore; a operação desativa apenas o provedor original de Events e preserva os demais registros e dependências. Posicione Events após Core e antes dos consumidores. A base entregue mantém Events desativado até a seleção explícita do autor. O gerenciador do MZ pode avisar que um consumidor original exige `VisuMZ_1_EventsMoveCore`: o cabeçalho `@base` desse consumidor continua nomeando o original, enquanto o provider ativo é Coreto. Esse aviso nominal foi observado com CommonEventMenu; confira a ordem e as versões qualificadas e mantenha somente um provider Events ativo. Não altere os arquivos originais nem ative ambos para eliminar o aviso.

`CoretoConfigSource=inherit` lê o registro VisuMZ_1_EventsMoveCore mesmo desativado; na ausência dele, lê o próprio registro. `own` usa os valores do registro Coreto. Alterar apenas esse seletor não copia parâmetros. A primeira edição funcional pela CLI materializa os valores efetivos em `own`, preservando valores não editados. Por exemplo:

```sh
node coreto/tools/coreto/cli.mjs events-move parameters get --project <jogo> --path /Movement/EnableDir8
node coreto/tools/coreto/cli.mjs events-move parameters set --project <jogo> --path /Movement/EnableDir8 --value true --dry-run
```

Remova `--dry-run` para aplicar a edição. `parameters reset` restaura o valor padrão do campo indicado. Comandos nativos existentes conservam o receptor `VisuMZ_1_EventsMoveCore`; o provedor próprio atende esse receptor sem exigir o arquivo original. Use as operações `commands list`, `insert` e `update` com um alvo nativo e o hash retornado pela leitura para controlar conflitos. O editor continua exibindo parâmetros e comandos nas superfícies nativas.

### Rotas de movimento

Use `events-move routes list --target map:190/event:1/page:1/route` para uma rota autônoma. Para a rota de um comando Definir Rota de Movimento, use `map:190/event:1/page:1/command:2/route`; listas de eventos comuns e tropas aceitam o mesmo sufixo `/command:I/route`. Os IDs devem existir no projeto, e as páginas começam em um; os índices de comando e instrução começam em zero. A leitura retorna o hash necessário às alterações:

```sh
node coreto/tools/coreto/cli.mjs events-move routes insert --project <jogo> --target map:190/event:1/page:1/route --before 0 --value '"Move Right: 2"' --expected-hash <hash> --dry-run
node coreto/tools/coreto/cli.mjs events-move routes update --project <jogo> --target map:190/event:1/page:1/route --index 0 --value '"Balloon: Heart"' --expected-hash <hash>
node coreto/tools/coreto/cli.mjs events-move routes remove --project <jogo> --target map:190/event:1/page:1/route --index 0 --expected-hash <hash>
```

A CLI preserva as outras instruções, as opções da rota e seu terminador; em comandos 205, atualiza também as continuações 505. A gramática completa entregue aparece em `events-move --help` (`routeGrammar`). Inclui movimento repetido nas oito direções, `Move Right Until Stop`, `Jump Forward: 2`, alvos por coordenadas (`Move To: 10, 7`), evento (`Move To Event: 2`), jogador (`Move To Player`) ou origem (`Move To Home`), além de Step Toward/Away From, Turn To/Away From e Teleport To. Há efeitos `Animation: 1`, `Balloon: Heart`, `Opacity: 50%`, `Fade Out: 16`, `Index: +1`, `Force Dash: On` e `Hug: Left`. Operandos globais aceitam `\V[1]` e `$gameVariables.value(1)`.

Execute essas instruções de script no Playtest; a prévia de rotas do editor não executa a gramática do plugin. `Turn To: x, y` gira sem deslocar o personagem. Uma rota não pulável para um destino inalcançável pode continuar esperando; substitua a rota explicitamente para interrompê-la. `Crash Move … Until Stop` retoma após a liberação do bloqueio pelo jogador. Force Carry, Pose e bloqueio de padrões usam a apresentação VS8 descrita abaixo.

As tags de mapa `<Diagonal Movement On>` e `<Diagonal Movement Off>` selecionam a diagonal padrão. Notas de evento e comentários de página aceitam `<True Random Move>`, `<Random Move Weight: 0.1>` e as tags Move Synch Target, Type, Delay e Distance Opacity. Consulte `events-move api list` e `api describe <id>` para os descritores e alvos de cada tag; a sincronização aceita Player ou Event N como alvo e tipos mimic, reverse mimic, mirror horizontal/vertical, approach, away, custom e random.

As regras de passagem de Events aceitam notas de mapa como `<Player Forbid Region: 70>` e `<Boat Dock Region: 71>`. As listas do mapa acrescentam IDs aos parâmetros. `Allow` vence `Forbid`; `Walk` abrange jogador e eventos, e `Vehicle` abrange os três veículos. `Dock` usa a região à frente do barco/navio e a região atual da aeronave. Os parâmetros `BoatDockRegionOnly`, `ShipDockRegionOnly` e `AirshipDockRegionOnly` restringem o desembarque às regiões de atracação configuradas.

Em notas de evento ou comentários de página, `<Move Only Regions: 70, 71>` substitui as regras normais de passagem desse evento; zero é ignorado. `<Hitbox Right: 2>` amplia sua área retangular em duas casas à direita, com variantes `Left`, `Up` e `Down`. As bordas são inclusivas e todas as casas ocupadas participam da colisão. A consulta de posição desse retângulo não atravessa a costura de um mapa circular. A corda requer simultaneamente uma casa marcada como escada e a etiqueta de terreno configurada em `TerrainTag.Rope`.

`events-move names get|set --target system:variable:ID` e `system:switch:ID` leem ou substituem o nome nativo em `System.json`. Leia o hash com `get`; use-o em `set --expected-hash HASH --value '"<Self> ((Contador))"'`. `--dry-run` calcula a alteração sem gravar. A operação preserva os demais campos e a formatação do arquivo e recusa hash desatualizado, referência duplicada ou marcadores de escopo conflitantes.

`<Self>` usa o contexto do evento chamador; sem um evento, o acesso usa o slot global nativo. `<Map>` compartilha o valor no mapa atual. `((Nome))` e `（（Nome））` permitem `$gameVariables.value("nome")`, `$gameVariables.setValue("nome", valor)` e os equivalentes de switches, sem distinção de maiúsculas ou espaços nas extremidades. Uma referência inexistente emite aviso e retorna zero ou falso; sua escrita não altera dados. Em dados antigos com aliases duplicados, vence o último ID. A CLI recusa criar essa ambiguidade.

`<JS>expressão</JS>` calcula a leitura em tempo de execução, com `this` ligado ao evento quando houver contexto e com `variableId` ou `switchId` disponível. As condições de página que dependem dessas expressões recebem atualização periódica a cada 60 quadros. A CLI apenas compila a expressão para verificar a sintaxe. Nomes antigos com vários marcadores seguem a precedência de leitura JS, Self, Map, global; a escrita segue Self, Map, global. Para novas edições, escolha um escopo. `<Global>` do Save não pode coexistir com Self ou JS.

Scripts podem usar `getSelfVariableValue(mapId, eventId, variableId)` e `setSelfVariableValue(mapId, eventId, variableId, valor)`, assim como `getMapVariableValue(mapId, variableId)` e seu setter. Os equivalentes `SwitchValue` recebem um ID numérico para switches próprios numerados; os helpers Self também aceitam letras nativas como `"A"`. Rotas aceitam `Self Variable 21: 7`, `Self Switch A: Toggle`, `Self Switch 21: On` e `Move Right: \SelfVar[21]`. Cada rota usa o evento que está se movendo. `SelfDataResetAll` apaga os dados próprios dos eventos do mapa indicado; zero seleciona o mapa atual. Os demais mapas e os valores marcados como `<Map>` permanecem intactos.

Nas rotas próprias, `\V[n]` também respeita o escopo Self da variável e lê o evento que está se movendo. `\SelfVar[n]` é a forma explícita.

`events-move commands insert` também publica `CallEvent`, `CallEventSamePageNumber` e `CallEventSamePageName`. A leitura remota usa a página salva no arquivo do mapa e conserva o ID do chamador: “Este Evento”, variáveis Self e eventos comuns filhos pertencem ao chamador. O evento usado como modelo não é alterado. Uma página ou nome ausente termina sem executar outra página; chamadas por nome exigem um evento de mapa como chamador. A troca de mapa encerra o interpretador anterior e descarta sua leitura pendente.

Em Notas de evento ou Comentários de página, use `<Click Trigger>`, `<Activation Square: 2>` (também Circle, Radius, Delta, Diamond, Row ou Column), `<Activation Region: 70>` e `<Bypass Click Stop>`. Os parâmetros RegionOk/RegionTouch associam regiões a eventos comuns; eventos nativos acionáveis têm prioridade. `<Screen Activation>` inicia ao entrar na tela; `<Screen Parallel>` repete sua lista, e `<Screen Parallel Once>` executa uma vez por entrada. Uma lista paralela já iniciada pode terminar fora da tela; apagar o evento cancela seu interpretador. Trocar a página conserva o estado da entrada na tela até sair e entrar novamente.

Nomeie uma página com o Comentário `<Page Name: Nome>`. Para condições próprias, coloque comandos nativos entre os Comentários `<Page Conditions>` e `</Page Conditions>`; a página é aceita somente se a execução alcançar um Comentário `<Conditions Met>`. Preserve condições e ramificações nativas ao editar esses blocos. A Nota do mapa aceita `<Map Load Common Events: 1, 2>`, `<JS On Map Load>código</JS On Map Load>` e `<JS On Map Exit>código</JS On Map Exit>`. Os blocos JS recebem o mapa em `this`; a CLI valida sua sintaxe sem executá-los. `<Exit Reset Self Data>` na Nota do evento limpa seus dados Self quando seu mapa é aberto após outro mapa.

Os marcadores de condições também podem ser editados nos alvos `common-event:E/comment:I` e `troop:T/page:P/comment:I`. `I` aponta para um Comentário 108 existente; continuações 408 e índices de comandos são preservados. Condições de eventos comuns e tropas usam seu contexto nativo, sem herdar os dados Self de um evento de mapa.

Templates de Events são cadastrados em `Template.List`; nomes ignoram caixa e espaços externos. Mapas da lista são pré-carregados automaticamente; fontes numéricas remotas exigem `Template.PreloadMaps`. A Nota `<Copy Event: Map 1, Event 2>` (ou `<Copy Event: Nome>`) conserva ID e posição do receptor e reutiliza as páginas do modelo. `MorphEventTo` substitui o modelo e `MorphEventRemove` restaura a definição anterior. A preservação usa os IDs resolvidos, inclusive “Este Evento”, e sobrevive ao retorno ao mapa e ao save/load nativo.

Os callbacks recebem `this` como evento receptor e `arguments[0]`, `[1]`, `[2]` como mapa fonte, evento fonte e receptor. Copy executa global pre, nomeado pre, global post, nomeado post. Morph nomeado executa nomeado pre, global pre, global post, nomeado post; restaurar uma transformação preservada não repete callbacks. Spawn executa nomeado pre, global pre, nomeado post, global post; durante pre, o receptor ainda tem o ID fonte, e durante post já tem o ID dinâmico.

`SpawnEventAtXY`, `SpawnEventAtRegion` e `SpawnEventAtTerrainTag` aceitam filtros de colisão e passagem. Os seletores por lista escolhem uma casa elegível; nenhuma casa ou fonte inexistente resulta em switch de sucesso falso, sem criar evento. Um mapa numérico remoto não pré-carregado mostra o alerta nativo e mantém o switch anterior. Os comandos `SpawnEventDespawn…` retiram por ID, coordenada, regiões, terrenos ou todos. IDs começam em 1000; slots retirados não são reutilizados no mesmo estado de jogo. `$gameMap.firstSpawnedEventID()` e `$gameMap.lastSpawnedEventID()` retornam zero quando não há eventos criados. Eventos não preservados desaparecem ao sair do mapa; os preservados retornam com seus dados Self.

`EventLocationSave`, `EventLocationCreate` e `EventLocationDelete` controlam posições salvas. A Nota de mapa `<Save Event Locations>` aplica salvamento automático a todos; `<Save Event Location>` na Nota do evento ou Comentário da página aplica ao evento. O retorno restaura posição e direção; restaura também o índice da rota se a página continuar igual. Apagar a posição salva faz o próximo carregamento usar a posição autorada. `<Start: 1, 2>`, `<Start X: 2>` e `<Start Y: -1>` acrescentam deslocamentos iniciais; uma posição salva tem precedência. Os aliases `Location` e `Start Location` usam a mesma sintaxe.

A Anotação do evento no editor MZ aceita uma única linha. Separe tags por espaços nesse campo: ao confirmar o evento, o editor descarta o conteúdo depois de uma quebra de linha. A CLI rejeita escritas que produzam uma Anotação de evento multilinha. Para rótulos com várias linhas, use um bloco de Comentários da página (108/408); ao editar esse bloco pela CLI, preserve sua quantidade de linhas. Notes de mapas e do banco de dados mantêm o suporte multilinha.

A apresentação de Events aceita `<Label: Atlas>` e o bloco `<Label>texto</Label>`, com quebras de linha e códigos de texto nativos. `\V[n]` é resolvido no evento receptor ao preparar a página ou executar `EventLabelRefresh`. `EventLabelVisible` mostra, esconde ou alterna todos os rótulos. `Label.SpriteBased` seleciona o rótulo em sprite ou janela; o primeiro aceita `<Label Hue Shift: 2>`. `<Label Range: 3>` usa a forma de `<Label Range Type: Square|Circle|Delta>`; Radius e Diamond são aliases de Delta. Offset/Buffer X, Y ou combinado deslocam rótulos e ícones em pixels.

`<Icon: 64>` desenha uma célula do IconSet. `EventIconChange` é substituído pela próxima preparação de página; `EventIconChangeForced` persiste sobre as tags. `EventIconDelete` mantém o ícone apagado até `EventIconRestore`. Os equivalentes `PlayerIconChange` e `PlayerIconDelete` afetam apenas o jogador. Os comandos aceitam os IDs originais de mapa/evento; zero seleciona o mapa ou chamador atual.

Arquivos em `img/characters` conservam os prefixos nativos `!` (objeto alinhado à grade) e `$` (folha 3×4). `[Inv]` ou `[Invisible]` oculta os pixels do personagem e mantém seu rótulo. `[VS8]` usa a folha 12×8 para caminhada, corrida, transporte, escada, corda e poses; não combine `[VS8]` com `$`. As rotas agora aceitam `Force Carry: On|Off`, `Pose: Victory`, `Pattern Lock: 2` e `Pattern Unlock`, além das rotas anteriores. `Force Dash` seleciona os quadros de corrida durante o movimento. Pattern Lock aceita operandos como `\SelfVar[n]`; a CLI publica a lista de poses na gramática. A pose Sleep continua animada; `this.clearPose()` em uma rota Script encerra uma pose explícita.

`<Scale: 150%>`, `<Scale X: 150%>`, `<Scale Y: 80%>`, `<Mirror Sprite>`, `<Sprite Offset: +8, -4>` e `<Custom Z: 7>` controlam o personagem no tilemap. A escala combinada tem precedência sobre os eixos no mesmo corpo de tags. Sombras usam `Movement.ShowShadows`, `DefaultShadow` e `ShadowLayer`; `<Hide Shadow>` e `<Shadow Filename: Shadow1>` personalizam um evento. `<Step Pattern: Left To Right>` altera o ciclo; também há Right To Left e Spin CW/CCW. Eventos com imagem de tile aceitam `<Tile Expand Right: 1>` e as outras três direções, estendendo o retângulo na folha de tiles.

`<Picture Filename: Marker>` carrega `img/pictures/Marker.png`; Enemy e SV Enemy selecionam suas pastas nativas. Combine com Max Size, Scale, Offset e Blend Mode, por exemplo `<Picture Max Size: 96>` e `<Picture Scale: 50%>`. O maior lado é ajustado ao máximo antes de aplicar a porcentagem. A imagem acompanha o evento; trocar sua página invalida carregamentos antigos, e apagar o evento remove sua imagem. Arquivos ausentes mantêm o erro de carregamento nativo do MZ. Esses anexos estáticos usam uma imagem inteira; a integração com AnimatedPictures pertence à sua capacidade própria.

Os comandos `ShadowHidePlayer`/`ShadowShowPlayer`, `ShadowHideFollowers`/`ShadowShowFollowers` e `ShadowHideAllEvents`/`ShadowShowAllEvents` controlam os três grupos separadamente. Mostrar eventos restaura as sombras permitidas pelas Notes; corrige o comando original que mantinha o grupo oculto. Offsets visuais não deslocam o tile usado pelo clique nativo.

Temporizador: inicie pelo comando nativo de controle do temporizador. `EventTimerFramesSet` e `EventTimerFramesGain` somam Frames + Seconds×60 + Minutes×3600 + Hours×216000; só atuam enquanto ele está em funcionamento e limitam o resultado a pelo menos 1 frame. `EventTimerSpeed` usa valores assinados: -1 reduz um frame por atualização ativa, 0 congela o valor e positivos aumentam. Velocidade positiva também inicia a contagem com pelo menos 1 frame. Iniciar com zero pelo comando nativo não dispara expiração.

`EventTimerPause` preserva o tempo e `EventTimerResume` continua; repeti-los não duplica trabalho. Iniciar/parar nativamente limpa a pausa. `EventTimerExpireEvent` reserva o Common Event quando a contagem cruza zero; atualizações posteriores não o reservam de novo. A atribuição permanece para uma próxima contagem. `EventTimerExpireClear` restaura a expiração nativa, que aborta a batalha. O menu não avança o temporizador; uma transferência preserva seu estado.

Seguidores: `FollowerSetGlobalChase` controla o acompanhamento do grupo e `FollowerSetTargetChase` o do índice escolhido, começando em 1. `FollowerSetControl` redireciona o alvo “Jogador” dos comandos de evento para esse seguidor, sem trocar o personagem controlado pelas teclas. Um índice ausente não recebe a rota. `FollowerReset` restaura o alvo Jogador e o acompanhamento global e individual; pode ser repetido, inclusive após uma transferência. Definir controle não desliga o acompanhamento: desative-o separadamente para manter uma posição manual.

A Note do mapa aceita `<Hide Followers>` e `<Show Followers>` para sobrepor a visibilidade nativa apenas nesse mapa. Se ambas existirem, Hide vence. A transferência recalcula a regra do destino, sem alterar a configuração nativa de mostrar/ocultar seguidores.

O original `VisuMZ_2_CommonEventMenu` 1.02 funciona após `Coreto_1_EventsMoveCore`, com o Events original desativado. Instale o arquivo original licenciado no jogo e mantenha sua descrição nativa; o pacote Coreto não o distribui. `events-move --help` informa as versões dos consumidores compatíveis e `events-move validate` identifica provedor ausente, ordem incorreta, arquivo ausente ou versão declarada incompatível.

No editor, use o comando original **Common Event Menu: Start** e os comentários do Common Event para nome, imagem, ajuda, subtexto e condições. A seleção executa o evento filho e retorna ao chamador. Para permitir cancelar sem ação, selecione um Common Event válido contendo apenas o comando final vazio. Reabrir o menu recalcula as condições por switches. Uma lista sem IDs válidos apresenta o diagnóstico nativo no Playtest e continua sem abrir o menu. Consulte a ajuda para a lista completa de integrações compatíveis.

### Imagens animadas anexas

O original licenciado `VisuMZ_4_AnimatedPictures` 1.05 pode ser carregado após `Coreto_1_EventsMoveCore`. Use um atlas em `img/pictures` com nome como `Marker[ANI][3x2].png` e a Note ou comentário `<Picture Filename: Marker[ANI][3x2]>`. `<Picture Wait Frames: 2>` define duas atualizações do motor por célula, com mínimo de uma; `<Attach Picture Delay Frames: 2>` é uma forma equivalente. As células percorrem as colunas e depois as linhas, repetindo a sequência. O comando `events-move tags` publica `attach-animation-delay`; a validação identifica a ausência do consumidor.

Scale e Offset continuam relativos ao evento. Troca de página e morph reavaliam as tags e substituem a imagem; despawn retira o anexo sem destruir a imagem compartilhada de outro evento. Para atlas, prefira `<Picture Scale: 25%>`: o consumidor original calcula a grade depois do carregamento básico, portanto Max Size pode usar as dimensões anteriores na primeira substituição. Arquivos originais e imagens licenciadas não são distribuídos pelo pacote Coreto.

### Bússola e minimapa

O original `VisuMZ_4_ProximityCompass` 1.08 funciona após `Coreto_1_EventsMoveCore`. Marque eventos com `<Compass Icon: 16>` na Note ou no comentário da página conforme a autoria do consumidor. Um spawn desse modelo recebe seu próprio indicador; movimento atualiza sua posição e despawn o oculta. Transferir ou carregar reconstrói os indicadores dos eventos atuais, incluindo os spawns preservados.

O minimapa consulta as regiões All/Player Allow/Forbid do Events. Por exemplo, `<Player Forbid Region: 70>` deixa a região 70 bloqueada para o jogador e transparente no mapa de passagem; `<Player Allow Region: 90>` permite a região 90. Forbid prevalece sobre Allow. Essa classificação é de passagem do jogador, sem prometer ícones para alvos que o consumidor não representa. Os marcadores e opções específicos da bússola continuam no plugin original; `events-move` publica as regras de região e os comandos de spawn/despawn.

### Perseguição e encontros

O original `VisuMZ_4_EncounterEffects` 1.12 pode ser carregado após `Coreto_1_EventsMoveCore`. As tags de alerta e encontro pertencem ao consumidor original. Para um jogador em quatro direções com um perseguidor diagonal, use PlayerMovementDiagonal = `disable` e `<Enable Diagonal Chase>` no evento. A combinação inversa usa `enable` e `<Disable Diagonal Chase>`. O Coreto respeita a escolha do perseguidor também no retorno à posição inicial, sem alterar a configuração do jogador.

`<Alert Range: 12>`, `<Alert FoV Angle: 360>`, `<Alert Response: chase>` e `<Return Position>` formam um exemplo de perseguidor que detecta, segue e retorna. `<Alert Time: 6>` mantém o alerta por seis atualizações após perder o alvo; `<Return Time: 2>` espera duas antes de retornar. StopAutoMoveEvents e StopAutoMoveMessages controlam a atualização do alerta durante eventos e mensagens, conforme o original; não representam uma pausa geral de toda animação ou movimento já iniciado. Após Battle Processing, uma self switch para uma página sem alerta impede que o mesmo encontro seja iniciado novamente.

### Personagens DragonBones

A integração usa os originais `Public_0_Dragonbones` 5.7.002b e `VisuMZ_2_DragonbonesUnion` 1.32. Carregue a biblioteca antes de DragonbonesUnion, e o consumidor depois do Coreto Events. Biblioteca, plugin licenciado, skeleton, atlas e textura são recursos obrigatórios do jogo e não acompanham a distribuição Coreto.

Configure AssetsPath e atribua uma imagem nativa ao evento: a regra de visibilidade do MZ continua ocultando eventos sem gráfico. O consumidor oculta o quadro dessa imagem e desenha o esqueleto. Use, por exemplo, `<Dragonbones Sprite: Personagem>` na Anotação e `<Dragonbones Sprite Scale: 0.15, 0.15>` em um Comentário da página. Mantenha o nome do recurso sozinho na Anotação: o consumidor original pode incorporar uma segunda tag da mesma linha ao nome do arquivo. As tags de escala, offset, direção e animação DragonBones permanecem na autoria do consumidor original.

Em tile de escada com o TerrainTag de corda configurado no Events, o movimento tenta ropeclimb, ladderclimb e walk; parado, tenta ropeidle, ladderidle e idle. Só a ausência de uma animação opcional usa esse fallback. Skeleton, atlas ou textura ausente é uma falha de recurso. Personagens DragonBones seguem a orientação VS8 na corda; Flip Left e Flip Right do consumidor controlam o espelhamento.

### SaveCore original e continuação de eventos

`VisuMZ_1_SaveCore` 1.14 e `Coreto_1_SaveCore` 0.1.0 funcionam após `Coreto_1_EventsMoveCore`; o provedor original aceita os modos Standard e Single. Mantenha um único provedor de Save ativo. O Events fornece a limpeza do cache de eventos que o SaveCore chama após carregar; eventos com `<Save Event Location>` e seus dados Self continuam disponíveis para movimentação e interação.

No modo Standard, a escolha do arquivo ocorre na lista. No modo Single, use Salvar no menu principal: o arquivo é o slot 0 e Continue pode carregar diretamente do título. O comando nativo Abrir Tela de Save usa a lista do MZ, que não permite gravar o slot 0. Salvar pela tela Save mantém a lista aberta após a confirmação: use Cancelar para voltar ao mapa. A compatibilidade entre provedores de Events de um save antigo é uma verificação distinta da continuação no mesmo provedor.

### Escolhas e popups com MessageCore

`VisuMZ_1_MessageCore` 1.57 e `Coreto_1_MessageCore` 0.1.0 funcionam após `Coreto_1_EventsMoveCore`, inclusive com BattleCore e OptionsCore próprios. As condições Self de visibilidade e habilitação das escolhas usam o evento que iniciou a mensagem, inclusive em uma página chamada por outro evento. Cancelar, reabrir e redesenhar a lista preservam esse contexto.

`MsgPopupPlayer`, `MsgPopupFollower`, `MsgPopupEvent` e `MsgPopupTargetTile` mostram texto no mapa. Ative um único provedor MessageCore após Events. Sem essa capacidade, a validação aponta o comando e o runtime informa a dependência ausente. Os comandos não mostram popups na batalha.

FollowerIndex começa em 0; EventId = 0 usa o evento chamador. Alvos inexistentes não criam popup. O popup guarda o tile do personagem no instante da criação e acompanha a rolagem do mapa, sem seguir movimentos posteriores do personagem. TileX e TileY são arredondados. MsgDuration usa frames, com mínimo de 12; 0 usa 60. PopupExtra permite fades, offsets, escalas, ângulos e arco. O texto usa os códigos e o estilo do MessageCore ativo. O popup desaparece ao expirar e não atravessa uma transferência de mapa.

### Reflexos do VisualParallaxes

O original `VisuMZ_4_VisualParallaxes` 1.15 funciona após `Coreto_1_EventsMoveCore`. Configure regiões ou Terrain Tags refletivos no consumidor, por exemplo `<Solid Reflection Region: 40>`, `<Solid Reflection Opacity: 100%>` e `<Solid Reflection Blur: 0>` na Note do mapa. O consumidor requer os filtros PIXI e não cria suas camadas de reflexo em mapas com loop ou `<No Reflections>`.

O reflexo usa a imagem, posição e escala do personagem, com o eixo Y invertido, e acompanha a rolagem e as mudanças de página, opacidade e gráfico. Spawn e morph atualizam seus próprios reflexos. O Coreto remove os sprites do evento despawnado, incluindo reflexos, preservando imagens compartilhadas por outros personagens; transferir ou retornar do título reconstrói os donos atuais. Máscaras, camadas, filtros e tags específicas de reflexo continuam pertencendo ao consumidor original.

### Autoria de doodads

Carregue `VisuMZ_2_DoodadsSystem` 1.02 e depois `VisuMZ_3_DoodadsEditor` 1.02, ambos após Coreto Events. Para editar e gravar `data/Doodads.json`, inicie um Playtest pelo editor MZ, pressione F10 e use Place Doodads e Save and Close. A autoria exige o NW.js local e acesso ao projeto; reproduzir um layout no navegador não oferece esse fluxo de gravação.

Após salvar, o MZ pode avisar que os dados foram modificados externamente. Aceitar o recarregamento atualiza também a sessão de Playtest; recusar mantém a sessão atual. Reabra F10 para conferir a edição. Use arquivos PNG na pasta de doodads configurada e reinicie o Playtest após adicionar novos arquivos.

Doodads não criam colisão. Marque a região desejada no mapa e use, por exemplo, `<Player Forbid Region: 70>`. Remover a restrição permite passagem sem remover a imagem. Eventos e regiões continuam nos arquivos nativos de mapa; o layout visual permanece em Doodads.json.
