# A evolução da cidade em Dragon Cliff

**Objeto:** Dragon Cliff, instalação Steam local, build `6212414`.

**Perspectiva:** história, habitantes, edifícios, serviços, economia e desbloqueios, da abertura ao conteúdo avançado.

**Estado:** referência externa; não define conteúdo aprovado para outro jogo e não propõe adaptações para Terminus.

**Data da análise:** 17 de outubro de 2026. **Contém spoilers completos.**

Dragon Cliff acompanha uma cidade pobre que recupera sua capacidade produtiva, reúne aventureiros e amplia sua influência prestando serviços à Corte do Dragão. O crescimento material é real: oficinas voltam a produzir, o comércio se fortalece, chegam moradores especializados e a cidade organiza expedições marítimas. Ao mesmo tempo, as missões revelam versões incompatíveis sobre a legitimidade do imperador e sobre os inimigos que sustentam essa prosperidade.

A cidade cresce como base de operações. Sua evolução se manifesta sobretudo nos serviços disponíveis, nas pessoas recrutadas e na qualidade dos recursos acessíveis. As fontes examinadas não demonstram uma simulação livre de ruas, zoneamento ou expansão territorial urbana.

Leia também [os sistemas do jogo](dragon-cliff-sistemas.md) e o [guia dos JSONs extraídos](dados/README.md).

## 1 Como interpretar esta reconstrução

Há três percursos que se cruzam: as missões da campanha, o avanço da reputação e as melhorias obtidas por objetos especiais. Eles não formam uma única sequência linear. Depois de certas vitórias, abrem-se simultaneamente investigações, serviços e missões de personagens.

| Forma de evolução | O que muda | Exemplo |
| --- | --- | --- |
| Recuperação produtiva | Uma instalação existente volta a ser útil. | As oficinas recebem materiais e receitas após a primeira missão. |
| Construção e abertura | A cidade ganha um serviço mediante permissão. | Estalagem, loja, escola e forno. |
| Qualificação | Um serviço existente passa a entregar resultados superiores. | Crystal Stone, Mystic Stone, Dragon Blood Stone e coleção de livros. |
| Crescimento demográfico | Aumentam as vagas e mudam os moradores selecionados. | Contribuições à produção, ao comércio e às viagens. |
| Reconhecimento | O desempenho externo altera o título da cidade. | Acesso à missão de exploração marítima. |
| Revelação narrativa | O significado das instituições muda para quem acompanha a história. | Acusações sobre o príncipe herdeiro e o Mandato do Céu. |

**Critério de evidência:** textos de personagens são apresentados como relatos, acusações ou crenças quando há disputa. Requisitos numéricos vêm da lógica instalada quando ela foi conferida. As siglas **L** e **C** remetem às [fontes e limites](#fontes-e-limites).

## 2 O passado que condiciona a cidade

### 2.1 Uma ordem imperial contestada

A religião política do império vincula o poder ao Deity Dragon, ao Great Book e ao Mandato do Céu. O conflito sobre quem representa essa autoridade antecede a campanha. A rebelião do príncipe Lu é tratada pelos porta-vozes imperiais como origem de desordem, monstros e sofrimento; adversários afirmam que Lu era o escolhido legítimo e foi eliminado como traidor.

O Buried Temple materializa esse passado. Sua descrição informa que guardava a barba do dragão, que o príncipe Lu a levou durante a rebelião e que o imperador mandou executar os sacerdotes. O templo foi abandonado. Trata-se de um lugar externo à cidade, mas seu destino explica por que relíquias, pesquisa e devoção se tornaram assuntos politicamente perigosos.

**Fontes:** L, `AdventureDescriptions[AdventureType=6]`; `DialogDetails[Identifier=46,58,115,152–168]`.

### 2.2 A produção de armas ficou paralisada

Um comentário de morador relaciona a suspensão da fabricação de armas ao medo da suspeita da Corte após a rebelião. Na abertura, as oficinas estão sem atividade há muito tempo. A campanha oferece uma justificativa autorizada para retomar a produção: combater os monstros em nome do imperador.

Essa retomada tem dois sentidos. Economicamente, permite converter materiais em equipamento e renda. Politicamente, transforma uma atividade potencialmente suspeita em demonstração de lealdade. A cidade ganha condições de sobreviver dentro de uma ordem que também limitava suas iniciativas.

**Fontes:** L, diálogos `3,5,47,58,60`.

## 3 A cidade no início da partida

O conselheiro apresenta a cidade como pobre e com poucos suprimentos. As cidades vizinhas mobilizam seus recursos para caçar monstros e atrair a atenção imperial. O jogador recebe o papel de senhor local, responsável por aproveitar essa oportunidade.

A inicialização do jogo já cria **Town Hall, Armor Factory e Weapon Factory**, além de três aventureiros: **Street Man, Drunk Reader e Killer**. Existem **cinco vagas residenciais**, inicialmente sem moradores. Portanto, a primeira transformação das oficinas é sua ativação econômica; não é necessário descrevê-las como prédios erguidos do zero durante a primeira missão.

A cidade ainda precisa de receitas, materiais, recrutamento adicional, comércio regular e contribuições de moradores. Cada um desses elementos será introduzido por ações concretas da abertura.

**Fontes:** L, diálogos `3–14`; C, `PlayerProfile.InitPlayer`.

## 4 Da sobrevivência à base de aventureiros

### 4.1 Prologue e Collector: reabrir o ciclo produtivo

**Prologue** leva o grupo à Wooden Forest. Sua conclusão concede materiais e receitas iniciais. **Collector** exige produzir uma arma e uma armadura. A sequência ensina a relação que sustentará a cidade: enfrentar perigos, trazer matéria-prima e transformá-la em capacidade militar ou dinheiro.

Os diálogos comemoram a reabertura das oficinas. A produção devolve utilidade a instalações que já faziam parte da vida local, inclusive às relações econômicas do ferreiro com os moradores.

### 4.2 Path to Adventure: abrir a estalagem

Depois de Collector, o jogador recebe a permissão da **Inn**. A missão seguinte exige contratar um aventureiro e vender uma arma e uma armadura. A cidade passa a reunir pessoas de fora, avaliar suas capacidades e financiar novas contratações com a própria produção.

A estalagem também é um lugar narrativo: os moradores comentam os viajantes, trocam histórias e especulam sobre heróis antigos. Para o jogador, porém, a decisão central é administrativa: quais candidatos contratar e quais características priorizar.

### 4.3 Finance Management e Town Management: comércio e população

Concluir Path to Adventure concede a permissão da **Shop**. Finance Management pede uma compra; Town Management pede admitir um morador. O comércio e a população entram no ciclo como sistemas operáveis, e não apenas como indicadores decorativos.

A loja conecta a cidade ao restante do império. Os diálogos explicam que monstros prejudicam as rotas e que aventuras bem-sucedidas favorecem a renovação das mercadorias. Moradores, por sua vez, alteram produção, venda e outras recompensas. Há limite de vagas, possibilidade de expansão e expulsão de habitantes.

**Fontes desta etapa:** L, `QuestDescriptions[3–7]`, diálogos `5–14,64–75`; C, `MainChapterOnehandler.Main12/Main13/Main14/Main15` e `PlayerProfile.InitPlayer`.

## 5 Segurança local e primeiras contradições

### 5.1 Os orcs e a fronteira da cidade

A apresentação inicial responsabiliza os orcs da Wooden Forest por ameaças aos moradores. **Orc Threats** culmina no confronto com Purple Skin, no nível 8 dessa região. A vitória é celebrada como proteção da comunidade e confirma a utilidade do grupo de aventureiros.

O adversário, entretanto, afirma que os humanos invadem uma terra reconhecida ao seu povo pelo próprio dragão. O grupo rejeita sua interpretação. O jogo já introduz aqui uma tensão que reaparecerá em escala imperial: a expansão celebrada na cidade pode ser narrada como invasão por quem sofre suas consequências.

### 5.2 Blood Stone e novas frentes

Depois dos orcs, surge a ameaça de Blood Stone Beast. A conclusão de **Blood Stone** abre duas frentes relevantes: a busca ligada ao ferreiro continua na Wooden Forest e a investigação do suposto sequestro do herdeiro avança para Mist Forest. Não é obrigatório terminar primeiro toda a história de Wong para iniciar essa investigação.

**Fontes:** L, missões `8,9,17`, diálogos `15,16,79–83,97–99`; C, `MainChapterOnehandler.Main16/Main17/Main18` e `MainChapterTwoHandler.Main21`.

## 6 Oficinas e escola: prosperar com conhecimentos suspeitos

### 6.1 A herança de Blacksmith Wong

Em **Crystal Stone**, Wong solicita recuperar uma relíquia familiar levada por seu irmão. O irmão é encontrado em condição de morto-vivo e associa a pedra aos milagres do dragão, ao medo da Corte e ao desejo de reconhecimento na capital. Wong explica sua tragédia como resultado de delírios. A narrativa apresenta essas versões sem autorizar o estudo a diagnosticá-lo ou escolher uma delas como verdade onisciente.

O resultado econômico é concreto: a pedra melhora os produtos das oficinas. Na lógica de geração de equipamentos, sua posse adiciona uma propriedade potencial aos itens produzidos pelas fábricas. A história familiar altera uma capacidade persistente da cidade.

### 6.2 A escola e seus três estágios

A escola entra por uma frente de estudo e combate: a missão **Challenge** é disponibilizada a partir de 1.000 de reputação; concluí-la concede a permissão de construção. **Study, study!** pede três melhorias de habilidades. A sequência conduz a **Mystic**, associada a uma pedra capaz de romper os selos que limitam a escola.

O responsável explica que pedir autorização à Corte seria impossível. Assim, a mesma cidade que cresce servindo ao império adquire conhecimento à margem de suas restrições.

| Estágio da escola | Condição verificada | Significado para a cidade |
| --- | --- | --- |
| Nível 1 | Escola construída após obtenção da permissão. | Institucionaliza o aprimoramento das habilidades. |
| Nível 2 | Posse de Mystic Stone. | Rompe a limitação associada aos selos. |
| Nível 3 | Posse de Book Collection. | Amplia o acervo e os níveis de especialização disponíveis. |

O terceiro estágio está ligado a **Evil Books**, disponibilizada após a missão final Demon Dragon 3. A Corte exige matar o bibliotecário Zhuolun por difundir ideias atribuídas ao dragão inimigo. O responsável pela escola propõe conservar os livros. O ganho institucional nasce de uma operação de repressão, mas preserva justamente o conhecimento que ela visava combater.

**Fontes:** L, missões `35,36,38,40,52`, diálogos `93–96,105–119,256–257`; C, `MainChapterOnehandler.CreateQuest1223/AddQuest1224/AddQuest1225`, `School.GetLevel`, `ItemExtensions`, `Side6QuestHandler`.

## 7 O forno e a economia de reaproveitamento

Concluir **Evil Spirit**, em Mist Forest, concede a permissão da **Furnace** e abre **Gear Upgrade**, que exige uma combinação de itens. A cidade adquire uma forma de transformar excedentes de equipamento em peças melhores.

Concluir Gear Upgrade abre **Dragon Blood**, com um confronto em Snow Mountain. A **Dragon Blood Stone** eleva o forno ao nível 2 e permite atingir Ancient pela combinação de equipamentos adequados. O forno, mais adiante, também centraliza operações de encantamento, reforja, decomposição e transferência de efeitos, cada uma com restrições próprias.

A abertura de Snow Mountain ocorre após Evil Spirit, em paralelo ao ramo do forno. A progressão narrativa da região não deve ser confundida com a exigência de concluir previamente toda melhoria da oficina.

**Fontes:** L, missões `18,39,41`, diálogos `129–130`; C, `MainChapterTwoHandler.Main24/Main25`, `MainChapterThreeHandler.Main31`, `ForgingFacility.GetLevel`, `BuildingExtensions.IsCombineable`.

## 8 O reconhecimento da cidade

### 8.1 Reputação é avanço demonstrado

A reputação acompanha os patamares vencidos nas aventuras. A lógica compara a reputação atual com a reputação de conclusão da fase e concede apenas a diferença necessária para alcançar aquele patamar. Repetir indefinidamente uma fase já superada não produz crescimento ilimitado do título.

É possível repetir conteúdo para obter materiais, dinheiro e candidatos enquanto o título permanece estável. Essa distinção explica por que a cidade precisa tanto de eficiência na rotina quanto de vitórias em desafios novos.

### 8.2 Os títulos e seus limiares

Os nomes abaixo são preservados em inglês para facilitar a consulta no jogo. São faixas de reputação, não uma lista de capítulos narrativos obrigatoriamente separados.

| Nível | Título | Reputação mínima |
| --- | --- | ---: |
| 0 | Anonymous | 0 |
| 1 | Silent Pursuit | 10 |
| 2 | Villagers chat | 100 |
| 3 | Windy Crisp | 500 |
| 4 | Solid Fruit | 1.000 |
| 5 | Romantic rumors | 1.500 |
| 6 | Fairy's crooning | 2.000 |
| 7 | Devout believers | 2.500 |
| 8 | Wonderland's whispers | 3.000 |
| 9 | The hero's explorations | 3.500 |
| 10 | Proud Adventures | 4.000 |
| 11 | Wonderful future | 5.000 |
| 12 | Style of the Empire | 6.000 |
| 13 | Dragon's Blessing | 7.000 |
| 14 | The Dragon Cliff's Torch | 8.000 |
| 15 | The Sacred Dragon Messenger | 9.000 |
| 16 | Salvation of Heaven | 10.000 |
| 17 | Hesitated Heart | 13.000 |
| 18 | Formless Hope | 16.000 |
| 19 | Sated Harmony | 19.000 |
| 20 | Green Trace | 22.000 |
| 21 | Empty Mind | 25.000 |

No percurso normal, a aventura automática aparece a partir de 500 de reputação, e as regras de táticas automáticas a partir do título 5. Isso reduz a intervenção repetitiva conforme cresce a quantidade de decisões administrativas.

**Fontes:** L, `ManualLocalizations[9]`, `TownTitleLocalizations`, interface `1103–1115`; C, `TownTitleRequirement.Requirements`, `AdventureSuccessCalculation`, condições da interface para aventura e tática automáticas.

## 9 Uma população selecionada por contribuição

A cidade começa com cinco vagas residenciais e pode comprar novas vagas até o limite de **30**. Os preços crescem por faixas. Um conjunto de candidatos chega após aventuras bem-sucedidas; admitir um candidato da lista corrente encerra a escolha daquele conjunto. A acomodação temporária posterior oferece outra forma de guardar candidatos elegíveis.

Os tipos de residentes incluem camponeses, refugiados, comerciantes, estudiosos, músicos, nobres, oficiais, pesquisadores e personagens de origem misteriosa. A diversidade é representada principalmente por contribuições e competências: um habitante pode melhorar a produção, aumentar a renda de equipamentos, favorecer recompensas ou ser útil em viagens.

O jogo não transforma cada admissão em uma história pessoal extensa. A dimensão social aparece no contraste entre o discurso de prosperidade coletiva e a substituição deliberada de moradores menos úteis. O próprio tutorial admite a crueldade da expulsão, mas a apresenta como instrumento de fortalecimento da cidade.

**Fontes:** L, diálogos `12–14`, `ResidentLocalizations`, `ResidentEffectLocalizations`; C, `PlayerProfile.GetMaxNumberOfResidents/GetResidentSlotUnlockCost/AddNewResidents`, `MaxResidentSlot`.

## 10 A vida cívica passa a produzir benefícios

Eventos urbanos associam atividades sociais a resultados econômicos e militares. Comércio aumenta a receita de vendas; poesia atrai aventureiros; alquimia produz consumíveis; pesquisa de armamentos melhora lotes de fabricação. Chá, banquete, tambores e meditação atraem funções específicas de aventureiros e concedem benefícios de combate.

Os textos apresentam os primeiros eventos nos títulos Fairy's crooning, Wonderland's whispers e Wonderful future; os eventos direcionados por função aparecem em Dragon's Blessing. Tecnicamente, o desbloqueio consulta o avanço de dificuldade padronizado, que considera também o modo difícil. Por isso, o título exibido isoladamente não explica todas as partidas avançadas.

A cidade possui **100 pontos de política** para distribuir entre eventos ativos. Há consumo de recursos ao longo dos dias. A felicidade dos moradores participa dos resultados, e a repetição do mesmo evento pode gerar cansaço temporário. A população passa a influenciar não apenas a quantidade produzida, mas a qualidade da atividade coletiva.

**Fontes:** L, `TownEventLocalizaitons`, interface `954–973`; C, `PlayerProfile.AvaliablePolicyPoints/GetStandardizedDiffcultyValueForTownEventSystem`, `TownEventProcessorBase`, processadores dos oito eventos.

## 11 Da cidade protegida à agente da Corte

A investigação do herdeiro percorre **Mist Forest → Snow Mountain → Buried Temple → Hellish Path**. A Corte fornece a justificativa para avançar; os inimigos questionam essa justificativa.

Servidores expulsos da Corte negam o envolvimento no sequestro e afirmam depender de práticas proibidas para sobreviver. Adversários posteriores dizem que o herdeiro não existe e que a história foi fabricada. Antes do confronto com o dragão, o velho sacerdote deixa a cidade; outro personagem assume a transmissão das ordens imperiais. Um inimigo sugere verificar o desaparecimento de membros importantes da comunidade.

O crescimento urbano torna-se moralmente ambíguo: mais recursos e capacidade militar também permitem executar com maior eficiência as ordens de uma autoridade contestada. O estudo não transforma as acusações dos inimigos em uma cronologia comprovada de cada conspiração. O que está documentado é a construção deliberada desse conflito de versões.

**Fontes:** L, diálogos `20–21,40–41,84–95,120–169`; C, `MainChapterTwoHandler`, `MainChapterThreeHandler`, `MainChapterFourHandler`, `MainChapterFiveHandler`.

### 11.1 A princesa de Lu e a memória da violência

O arco dos Qilin e de **The undead aristocracy** amplia o passado da rebelião. A princesa afirma ter traído o marido, o amante e o pai; identifica o imperador como amante e diz que o assassinou, deixando-o também morto-vivo. Ela própria está presa a uma maldição que impede a morte desejada.

Esse arco não equivale a construir outro bairro. Ele altera o sentido histórico da ordem à qual a cidade presta serviços. Sua entrada é paralela à campanha principal: o controlador o abre após **Bone Demon**, no Buried Temple.

**Fontes:** L, missões `47–50`, diálogos `234–254`; C, `Side1QuestHandler`.

## 12 O porto e a projeção para fora do império

Ao alcançar **10.000 de reputação**, correspondente ao título Salvation of Heaven, aparece **Exploration!**. O confronto dessa missão permite obter **Port Permit**, chamado `PortBlueprint` na lógica. Sua posse habilita as explorações marítimas.

Agora a cidade pode manter até **três barcos** e **três viagens** simultaneamente, respeitando a ocupação das viagens ainda sem recompensas recolhidas. Os barcos confirmados têm três, quatro e cinco lugares. O código disponibiliza seus modelos em patamares de dificuldade alcançada de 100, 130 e 160; a interface os associa aos títulos 16, 17 e 18.

A tripulação combina moradores e aventureiros. Moradores continuam contribuindo com a cidade enquanto viajam; aventureiros embarcados ficam indisponíveis para as batalhas. A administração precisa dividir recursos humanos entre ganhos marítimos e avanço terrestre.

Northern Sea privilegia materiais; Yellow Sea é apresentado como opção para dinheiro; Red River oferece outra frente de exploração. Os encontros incluem comércio, pesquisa, descoberta de recursos, piratas e frotas estrangeiras. A cidade passa a produzir resultados por várias operações em paralelo.

**Fontes:** L, missão `51`, diálogo `255`, manual `11`, `VehicleLocalizations`, `DestinationLocalizations`; C, `Side5QuestHandler`, drop de `FireMageKeeper` (unidade `FireMage`), `PlayerProfile.ExplorationEnabled/GetProduceableVehicles/GetMaxNumberOfTripsPossible`.

### 12.1 As viagens abrem o conflito do norte

Depois de uma viagem concluída, abre-se a frente de **Northern Territory**, com **Thugs** e depois **Nameless Rebels**. A narrativa fala em ataques aos barcos e em rebeldes que desafiam a administração imperial.

Os rebeldes questionam o valor dos heróis para pessoas submetidas à pobreza, à fome e à guerra. O grupo defende a ordem como proteção contra quem detém poder. A resposta final contrapõe essa defesa ao sofrimento existente. O debate fecha o percurso de uma cidade que começou buscando sobrevivência e passou a intervir na disputa sobre quem deve governar.

Há uma diferença útil entre história e gatilho: os diálogos descrevem um ataque específico; a lógica consultada inicia o arco no evento de conclusão de uma viagem, sem exigir que o jogador tenha presenciado exatamente aquele encontro marítimo.

**Fontes:** L, missões `54–55`, diálogos `258–280`; C, `Side8QuestHandler.ProcessGameEvent`.

## 13 A cidade no conteúdo avançado

O jogo permite continuar qualificando a base após os grandes confrontos. Concluir Exploration! no percurso normal habilita o modo difícil. A reputação desse modo possui registro próprio; alcançar 10.000 nela libera **Mystic Dimension**.

Vencer Nameless fornece a **Blueprint of Scrolls**, que abre a criação de pergaminhos. A progressão avançada acrescenta equipamentos Star, amuletos de conjunto, dispositivos, Ash of Hope e novas aplicações para os excedentes acumulados. Esses sistemas estão detalhados no documento de sistemas.

O fechamento textual que anuncia o retorno da paz convive com a continuidade dos desafios. Não há evidência suficiente, nesta análise, para afirmar uma reforma política da cidade, troca de governante, reconstrução física generalizada ou múltiplos finais urbanos. O que se confirma é uma base econômica e militar que permanece operante e continua a se especializar.

**Fontes:** L, interface `1080–1081`; C, `PlayerProfile.GetEnabledStars/EndlessDungeonIsEnabled`, `Nameless.GenerateGuarranteedDrops`.

## 14 Quadro de evolução dos lugares e serviços

| Lugar ou serviço | Situação inicial | Transformação confirmada | Efeito persistente |
| --- | --- | --- | --- |
| Town Hall | Presente na inicialização. | Gestão de residentes, vagas e atividade urbana. | Organiza população e contribuições. |
| Weapon Factory | Presente, narrativamente paralisada. | Recebe receitas e materiais; beneficia-se da Crystal Stone e de eventos. | Produz armas para uso ou venda. |
| Armor Factory | Presente, narrativamente paralisada. | Mesmo ciclo produtivo; a lógica da Crystal Stone afeta produção de equipamento. | Produz armaduras e sustenta a renda. |
| Inn | Abertura após Collector. | Recrutamento, convites de novas classes e eventos que atraem visitantes. | Renova a força de aventureiros. |
| Shop | Permissão após Path to Adventure. | Reposição por tempo e aventuras; mercadorias acompanham o avanço. | Fornece itens, consumíveis e compras avançadas. |
| School | Construção após Challenge. | Mystic Stone e Book Collection; criação de pergaminhos com blueprint próprio. | Conhecimento compartilhado e fabricação especializada. |
| Furnace | Permissão após Evil Spirit. | Dragon Blood Stone e operações avançadas sobre itens. | Combina, recicla e personaliza equipamento. |
| Vagas residenciais | Cinco. | Compra de vagas até 30; substituição dos moradores admitidos. | Amplia a capacidade de contribuições e tripulações. |
| Exploração marítima | Indisponível. | Port Permit, três modelos de barco e até três viagens. | Abre fontes paralelas de recursos e o arco do norte. |

As referências a Shrine, Casino e área de treino presentes nos catálogos não foram tratadas como edifícios funcionais confirmados da campanha. Da mesma forma, nomes de barcos de níveis 4–6 existem na localização, mas os geradores e a lista de produção consultados confirmam somente os três primeiros modelos.

O controlador de aparência contém mapas sazonais e efeitos de clima. Isso demonstra variação ambiental prevista pelo código; não comprova uma sequência de reformas visuais da cidade por título. Não foram feitas capturas comparativas de partidas em diferentes estágios.

<a id="fontes-e-limites"></a>

## 15 Fontes e limites

**L — Textos locais:** `game_Data/StreamingAssets/Localization-en.json`, da instalação em `C:\Program Files (x86)\Steam\steamapps\common\Dragon Cliff`. As referências usam o nome da coleção e o identificador do registro, não sua posição no array. Intervalos de identificadores indicam as falas consultadas, não uma reprodução integral.

**C — Lógica local:** `game_Data/Managed/Assembly-CSharp.dll`, inspecionada estaticamente com ILSpy `9.1.0.7988`. Métodos, classes e condições citados permitem localizar a evidência sem depender de uma linha específica do arquivo descompilado. Os [JSONs de cidade e economia](dados/cidade-e-economia.json) e de [encontros e missões](dados/encontros-e-missoes.json) preservam os dados e as regras pertinentes. O [manifesto](dados/manifesto.json) registra os hashes das duas fontes e dos arquivos exportados.

**Identificação da versão:** `appmanifest_758190.acf`, campo `buildid=6212414`. A data de consulta não deve ser confundida com a data de lançamento dessa build. A instalação usa Unity 5.6.6f2, identificado no cabeçalho de `resources.assets`; os assets não foram convertidos em um catálogo visual completo.

O estudo é documental. Não houve campanha jogada, manipulação de saves ou alteração da instalação. Os marcos foram reconstruídos por textos e dependências de código; ausência de descrição de uma transformação não é prova absoluta de sua inexistência. Foram evitadas afirmações de acessibilidade baseadas apenas em nomes residuais.

**Limite do repositório:** `AGENTS.md` referencia as ADRs G004–G006 em `docs/adrs/README.md`, mas o caminho e os registros não foram encontrados neste checkout. Não foram presumidas instruções desses documentos. Esta entrega permanece uma referência externa.
