# Os sistemas de Dragon Cliff

**Objeto:** Dragon Cliff, instalação Steam local, build `6212414`.

**Finalidade:** explicar como os sistemas funcionam e se relacionam, incluindo craft, party, atributos, talentos, cidade e conteúdo avançado. Estudo externo, sem propostas de adaptação para outro jogo.

**Método:** leitura dos textos locais e inspeção estática da lógica compilada. Não houve campanha jogada nem alteração de saves. **Data:** 17 de outubro de 2026. **Contém spoilers.**

Dragon Cliff organiza o crescimento em ciclos de combate, coleta, produção, recrutamento e especialização. O grupo conquista recursos fora da cidade; a cidade transforma esses recursos em capacidade de enfrentar desafios superiores. A descrição oficial o apresenta como um RPG semi-idle centrado em combinações de equipamentos e habilidades. A análise abaixo detalha a implementação local, que também contém textos de versões anteriores. [Página oficial na Steam](https://store.steampowered.com/app/758190/Dragon_Cliff/).

Para história e transformação urbana, veja [a evolução da cidade](dragon-cliff-evolucao-da-cidade.md). Para consultar valores e regras por identificador, veja [os JSONs](dados/README.md).

## 1 O ciclo central

1. Selecionar região, nível, grupo e consumíveis.
2. Vencer encontros e obter recursos, experiência administrável, equipamento e progressão.
3. Fabricar, vender, combinar ou desmontar itens.
4. Investir em aventureiros, habilidades, moradores e serviços.
5. Ajustar o grupo e tentar um patamar superior; repetir fases úteis quando faltam recursos.

As viagens marítimas acrescentam operações paralelas. Eventos urbanos geram benefícios temporários ou de uso limitado. No conteúdo avançado, pergaminhos, dispositivos e conjuntos de amuletos aumentam as combinações possíveis.

O crescimento tem dois movimentos diferentes: **acumular recursos** repetindo conteúdo e **ampliar o patamar alcançado** vencendo desafios novos. A repetição pode sustentar o primeiro sem produzir o segundo.

**Fontes:** L, missões `3–7`, manuais `7–11`; C, `AdventureSuccessCalculation`, `PlayerProfile`, `ProductionBuildingProfile`.

## 2 Recursos e suas funções

| Recurso ou medida | Obtenção e uso | Limitação relevante |
| --- | --- | --- |
| Gold | Venda, recompensas e contribuições; paga contratações, compras e diversas operações. | Disputa espaço com investimento produtivo e manutenção. |
| Wood, Ore e Hide | Aventuras e exploração; alimentam receitas e construções pertinentes. | Estoques de um material não substituem os de outro. |
| Practice Points | Aventuras e recompensas; sobem níveis, participam de serviços e podem convocar visitantes. | A experiência é um recurso administrável, não apenas XP automaticamente aplicado ao herói que lutou. |
| Reputação | Acompanha patamares vencidos. | Repetir uma fase já superada não aumenta indefinidamente o título. |
| Receitas e permissões | Liberam fabricação ou serviços. | Possuir dinheiro e materiais não substitui um desbloqueio. |
| Book Pages | Especialização e craft avançado. | Compete com outros gastos de desenvolvimento. |
| Demon Fragment e Infused Powder | Reciclagem elegível e outras fontes; utilizados em operações avançadas. | Decomposição exige categoria e nível adequados. |
| Materiais de região | Entram em receitas avançadas, incluindo pergaminhos. | Incentivam obter recursos de diferentes regiões. |
| Mystic Key | Entrada na Mystic Dimension; vendida na loja após o desbloqueio pertinente. | Acesso ao sistema e posse da chave são condições distintas. |
| Ash of Hope | Recompensas da Mystic Dimension; compras e operações avançadas. | Não equivale ao dinheiro comum. |
| Pontos de política | Capacidade de manter eventos urbanos ativos. | Total de 100, repartido entre eventos; não é uma moeda gerada por loot. |
| Rage | Recurso de combate para táticas. | Seu uso pode competir com a manutenção de auras e outras táticas. |
| Energy Points | Orçamento de ações em combate. | Esgotar a energia pode causar derrota mesmo com sobreviventes. |

**Exemplo ilustrativo:** transformar todo o equipamento excedente em ouro melhora o caixa, mas reduz o estoque disponível para combinação, decomposição ou transferência de efeitos. O valor de um item inclui suas possíveis transformações.

**Fontes:** L, `ResourceCategoryDescriptions`, `ItemDescriptions`, interface `958–961,1009–1010,1121–1122`; C, `PlayerProfile.AvaliablePolicyPoints`, `School.GetCostForCombineScroll`, `Shop.GetCommodities`.

## 3 Tempo, repetição e automação

O calendário avança com o tempo da simulação. Ele organiza reposição de loja e estalagem, duração de eventos e viagens. Os dias citados nesses sistemas são dias do jogo.

A aventura automática repete o conteúdo selecionado; auto-advance permite avançar após uma vitória. A interface libera a aventura automática a partir de 500 de reputação no modo normal. As regras de táticas automáticas aparecem no título 5. Existem ainda opções de venda automática, contratação automática de candidatos de certas raridades, compra automática de acessórios e repetição de viagens.

Automatizar exige definir o que guardar e o que consumir. Uma rotina que vence uma fase fácil não garante preparação para os modificadores da seguinte. O limite do inventário e os gastos de produção também continuam relevantes.

**Exemplo ilustrativo:** repetir uma fase para obter materiais enquanto as oficinas trabalham permite financiar ajustes do grupo; ativar avanço automático passa a priorizar tentativa de progressão.

**Fontes:** L, interface `736–746,864–880,947–953,1046,1101–1106,1152–1153`; C, `GameTimeProcessor`, `PlayerProfile`, condições de desbloqueio da interface.

## 4 Recrutamento e reserva de heróis

A **Inn** concentra a contratação. Convites desbloqueiam classes elegíveis para aparecer, mas não entregam necessariamente um herói daquela classe imediatamente. Killer, Street Man, Drunk Reader e Missionary já têm convites na inicialização; o grupo inicial contém os três primeiros.

O jogador compara classe, função, raridade, potencial de crescimento e efeitos especiais. A contratação custa ouro. O elenco pode conter até **200 aventureiros** na lógica normal; esse limite é diferente do tamanho da party.

Há renovação periódica, chegada de visitantes após aventuras e eventos urbanos de recrutamento. Também é possível gastar Practice Points para gerar um visitante: a fórmula local parte de **50.000** e acrescenta **25.000 por geração anterior contabilizada** por esse mecanismo. Não se trata de garantia de uma classe ou raridade específica.

Ao dispensar um aventureiro, o jogo devolve seus equipamentos ao inventário e converte **70% de sua experiência acumulada** em Practice Points. Não permite dispensar o último aventureiro. Essa devolução facilita substituir integrantes, mas não restitui integralmente todos os gastos feitos na carreira.

**Divergência de versão:** o manual localizado fala em permanência de 45 dias na estalagem. A classe `RecruitmentFacility` define a expiração dos candidatos em **20 dias**. Para esta build, foi priorizada a lógica.

**Fontes:** L, manual `7–8`, diálogos `67–70`; C, `PlayerProfile.InitPlayer/GetMaxNumberOfAdventurers/ReleaseAdventurer`, `RecruitmentFacility.GetRollPointsRequired`, `AdventurerCandidateExpiration`.

## 5 Party, funções e sinergias

A party comporta **até cinco heróis**. Existem três configurações de equipe salvas. Elas são predefinições de composição, não evidência de três batalhas terrestres simultâneas. O plantel de reserva e as tripulações marítimas são administrados separadamente.

| Função | Contribuição ao grupo | Critério de avaliação |
| --- | --- | --- |
| Tank/defensor | Sobrevivência e controle de alvos conforme habilidades. | Resistências, vida, provocação e proteção efetiva. |
| Healer | Recuperação e sustentação. | Frequência, alcance, remoção de efeitos e interação com escudos. |
| Support | Amplificação, controle e utilidade. | Quanto melhora o desempenho dos demais integrantes. |
| Assassin | Dano especializado e efeitos ofensivos. | Alvos atingidos, tipo de dano e dependências da build. |
| Balanced/warrior | Combinação de ataque e utilidade. | Como suas habilidades completam as lacunas do grupo. |

As funções são classificações da lógica, não traduções literais dos nomes. **Chubby Lady**, por exemplo, está configurada como `PhysicalKiller`; o nome da personagem não permite deduzir seu papel. **Fire Assassin** possui elemento próprio Physical nessa configuração, embora efeitos e habilidades possam lidar com outros elementos.

O grupo deve ser analisado pela interação entre habilidades automáticas, táticas, elementos, equipamentos e orçamento de ações. Mais cura pode prolongar a sobrevivência, mas não resolve sozinha falta de dano ou esgotamento de energia.

**Exemplo ilustrativo:** um defensor, um curandeiro, um suporte e dois causadores de dano formam uma hipótese de composição. Isso não é uma regra obrigatória nem uma build universal validada em partida.

**Fontes:** C, `ConfigueAdventurerPanelController.PickHero`, `PlayerProfile.AdvancedTeamEnabled/GetBattleTeams`, configurações dos heróis; [tabela de heróis](dados/herois.json).

## 6 Atributos e capacidade de ação

Força e inteligência determinam a capacidade de saída conforme a classe; vitalidade participa da vida máxima; agilidade afeta o preenchimento da barra de turno. Crítico pode alterar dano e cura. Resistências reduzem os tipos de dano correspondentes, enquanto Resilience trata o dano crítico recebido.

Hit Rate Adjustment e Dodge Rate Adjustment se relacionam à agilidade. Effect Hit Rating e Effect Resistance Rating tratam aplicação e resistência a efeitos negativos. Eles não devem ser confundidos com acerto de dano. Rage Efficiency reduz o custo de táticas; Effect Mastery influencia durações. As descrições de todos os atributos foram preservadas nos JSONs.

Os números de uma habilidade são funções dessas medidas, além de nível e modificadores. Uma habilidade que usa 200% de output capacity não causa necessariamente esse valor como dano final: resistências, crítico e efeitos adicionais ainda participam do resultado.

**Exemplo ilustrativo:** aumentar inteligência favorece a saída de um conjurador, mas um inimigo resistente ao elemento usado pode exigir penetração, redução de resistência ou outro conjunto de ataques.

**Fontes:** L, manuais `3,5,6,12`, `AttributeLocalizations`; C, `UnitExtensions`, `BattleUnitExtensions`; [atributos e efeitos](dados/status-e-efeitos.json).

## 7 Progressão dos heróis e potenciais por classe

O nível é comprado com **Practice Points**. O limite é **90**. O custo segue uma curva de experiência acumulada, com forte aumento dos incrementos depois da faixa inicial; a [tabela de progressão](dados/progressao-herois.json) preserva todas as faixas geradas, marcando como auxiliares as de níveis 91 e 92.

Cada classe define potenciais de crescimento. Para um atributo evolutivo não garantido, o ganho de uma subida combina um sorteio entre aproximadamente **80% e 100% do potencial**, o multiplicador **1 + QualityCoefficient** e a taxa **1,2**. O sorteio passa por arredondamento; os JSONs preservam a fórmula e os valores de origem. Um herói de mesmo nome e nível pode ter atributos diferentes de outro.

A tabela abaixo mostra **parâmetros de crescimento**, arredondados para leitura, e não status finais. “—” significa ausência daquele potencial na configuração. Crítico é a taxa base configurada, não um incremento por nível. O perfil também inicializa CritDamage em 2,0. Equipamento, talentos e efeitos são camadas adicionais.

| Herói | STR | INT | AGI | VIT | Crítico base |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bun Sister | 1,0 | — | 7,3 | 12,0 | 8% |
| Chubby Lady | 3,0 | — | 7,0 | 7,0 | 8% |
| Conjurer | — | 3,8 | 8,0 | 9,0 | 10% |
| Cube | — | 3,2 | 8,0 | 7,0 | 8% |
| Drunk Reader | — | 2,8 | 5,0 | 6,5 | 10% |
| Duelist | 2,4 | — | 4,0 | 8,7 | 10% |
| Elemental Wizard | — | 3,2 | 6,0 | 7,0 | 10% |
| Fashion Boy | — | 3,5 | 5,0 | 4,3 | 8% |
| Fire Assassin | 3,4 | — | 7,5 | 7,2 | 10% |
| Fire Player | — | 3,2 | 7,0 | 5,5 | 10% |
| Fire Charger | — | 3,0 | 6,8 | 4,2 | 8% |
| Golden Shaman | — | 3,5 | 7,5 | 6,0 | 5% |
| Iron Soldier | 3,2 | — | 15,0 | 7,9 | 5% |
| Killer | 2,8 | — | 4,5 | 6,0 | 5% |
| Missionary | — | 3,3 | 6,5 | 9,0 | 5% |
| Night Blade | 3,0 | — | 6,0 | 7,2 | 5% |
| Paladin | 1,3 | — | 6,5 | 6,8 | 8% |
| Red Horn | 4,1 | — | 5,8 | 5,8 | 35% |
| Snow Maiden | — | 2,2 | 8,3 | 5,8 | 10% |
| Soul Thief | 2,8 | — | 8,2 | 6,5 | 12% |
| Street Man | 2,5 | — | 5,0 | 7,0 | 8% |
| Tactician | 2,9 | — | 5,0 | 9,9 | 5% |
| Tough Woman | 2,8 | — | 8,0 | 5,0 | 8% |
| Warrior | 3,0 | — | 5,0 | 8,0 | 5% |
| Young Warlock | — | 3,2 | 3,0 | 6,0 | 12% |

Há uma 26ª configuração, **RedMage**, sem habilidades padrão. Ela está preservada nos JSONs como registro de acesso jogável não confirmado; foi excluída desta comparação de classes completas.

As raridades Normal, Rare, Epic, Legendary e Ancient correspondem a diferentes faixas de QualityCoefficient. Ancient pode receber uma variante Star conforme o contexto de geração, com efeitos específicos de classe. Não existe uma porcentagem única de recrutamento Star válida para todos os mecanismos.

**Fontes:** C, `UnitGrowthProfile`, `UnitExtensions.SetupLevelConfigurations/CreateAdventurer/GenerateGradeQualitySettingValueForAdventurer`, `AdventurerProfile.LevelUpLogic`; [heróis](dados/herois.json), [regras de progressão](dados/regras-progressao.json).

## 8 Talentos e efeitos elementais

O herói ganha **um ponto de talento a cada cinco níveis, do 5 ao 85**, totalizando **17**. Cada melhoria de talento custa um ponto na implementação consultada, mas os talentos possuem limites próprios de nível. Redefinir a distribuição custa **10.000 Practice Points**.

O conjunto disponível reúne talentos comuns, talentos do elemento, talentos da função e talentos das habilidades. Assim, classe, função e habilidades influenciam não apenas o comportamento básico, mas as escolhas posteriores de especialização.

No nível **15**, é habilitado o efeito elemental correspondente ao elemento próprio do herói. No **30**, são adicionados os demais efeitos elementais previstos pela lógica. Isso permite que fontes adicionais de dano interajam com efeitos que o herói não possuía no começo.

**Exemplo ilustrativo:** dois integrantes da mesma classe podem distribuir pontos entre precisão, defesa, duração de efeitos e modificações de suas técnicas. O potencial de crescimento e o equipamento continuam sendo variáveis independentes.

**Divergência de versão:** o manual de Upgrade Cards descreve cartas a cada três níveis e desbloqueio de tática por carta. A criação atual dos heróis já inclui suas habilidades ativas padrão, e a subida de nível usa talentos. As cartas não foram apresentadas como sistema vigente desta build.

**Fontes:** C, `AdventurerUnitConfigurationBase.GenerateTalents/GenerateSkills`, `TalentExtensions.GetTalentCostPerLevel`, `AdventurerProfile.LevelUpLogic/ResetTalent`; [117 implementações de talentos](dados/talentos.json).

## 9 Habilidades e escola

As habilidades possuem ações básicas, técnicas ativas e componentes passivos conforme a classe. A escola melhora especializações utilizando os recursos exigidos. Seu progresso é registrado por tipo de habilidade no perfil do jogador; a interface identifica os aventureiros impactados. É um investimento compartilhado pelos portadores daquela habilidade.

O edifício possui três níveis: o inicial, o liberado por **Mystic Stone** e o liberado por **Book Collection**. A capacidade de melhorar uma técnica depende do nível atual da própria habilidade, do limite dessa habilidade, dos recursos e do estágio da escola.

Os textos de habilidades contêm parâmetros como `{maindamagerate}` porque os números são preenchidos pela lógica. O catálogo JSON conserva esses parâmetros e aponta suas implementações, em vez de inventar um valor fixo universal.

**Exemplo ilustrativo:** investir em uma habilidade usada por vários heróis pode beneficiar diferentes composições, mas não substitui as subidas de nível individuais.

**Fontes:** C, `School.GetAllSkillProfiles/GetSkillRequiredSchoolLevel/UpgradeSkill`, `SkillExtensions`; [habilidades](dados/habilidades.json), [regras de combate](dados/regras-combate.json).

## 10 Combate: turnos automáticos, táticas e energia

Os integrantes executam turnos quando suas barras estão preenchidas. O jogador intervém com táticas que consomem Rage, escolhe alvos quando aplicável e pode configurar regras automáticas. Agilidade, controle, cura e efeitos que adiantam ou atrasam ações alteram o fluxo da batalha.

O orçamento de **Energy Points** limita a quantidade de ações. A interface descreve consumo de um ponto por ação de turno do aventureiro e dois por tática. Healers acrescentam 15% e suportes 10% cada ao multiplicador básico do orçamento. Há também efeitos especiais que interferem nesse sistema. O código contém regras distintas de reinicialização da energia em encontros normais e em patamares avançados da Mystic Dimension; não foi adotado um único orçamento fixo para todo o jogo.

As táticas podem ter auras vinculadas à disponibilidade de Rage. Gastar o recurso imediatamente tem um custo de oportunidade: pode adiar outra técnica ou alterar benefícios ativos. As condições exatas devem ser lidas na implementação de cada habilidade, porque o texto genérico do manual não cobre todas elas.

**Exemplo ilustrativo:** um time que cura continuamente mas demora a eliminar inimigos pode perder por energia. A resposta pode envolver dano, controle, eficiência de táticas ou mudança na distribuição das funções.

**Fontes:** L, interface `1065–1067,1121–1122`, manual `2`; C, `Adventure.CalculateMaxActionCounts`, execução dos encontros e `EndlessDungeonResolver`.

## 11 Elementos, status e encadeamento de efeitos

O jogo distingue dano direto de dano ao longo do tempo e reflexão. O manual explica que dano direto pode disparar efeitos vinculados a acertos, enquanto as outras categorias não devem ser tratadas automaticamente como novos gatilhos equivalentes.

Estados como sangramento, atordoamento, provocação, escudos e alterações de atributos se combinam com resistências, duração e regras de remoção. Certas habilidades dissipam efeitos positivos de inimigos; outras removem efeitos negativos de aliados. Algumas descrições incluem exceções a imunidade, resistência ou dissipação.

Uma build depende tanto do que causa dano quanto das condições que ela consegue produzir. Provocar, esquivar, curar ou eliminar um inimigo pode alimentar talentos, equipamentos e dispositivos.

**Exemplo ilustrativo:** empilhar dano periódico não significa multiplicar todos os efeitos “ao acertar”. É necessário verificar se o efeito exige dano direto, qual evento o dispara e se existe limite de frequência.

**Fontes:** L, manual `12`, `EffectDescriptions`, `SpecialEffectLocalizations`; C, classes de efeitos e processadores em [regras de combate](dados/regras-combate.json).

## 12 Aventuras, inimigos e tabelas de encontros

Região, nível, dificuldade e missão definem os encontros. Existem inimigos comuns, minibosses e chefes; missões podem substituir a formação, fixar um chefe ou adicionar efeitos à fase. A mesma região pode ser revisitada com outra composição de ameaças.

Os inimigos não têm todos uma única ficha final de HP e dano. Seus atributos podem vir de uma função compartilhada, sofrer modificações de classe e escalar pela dificuldade. As 189 configurações exportadas incluem variantes e geradores. Consultar uma habilidade mencionada em uma classe não basta para reconstruir toda batalha: as classes-base e os overrides do encontro também contam.

| Camada | O que determina | Onde consultar |
| --- | --- | --- |
| Configuração do inimigo | Identidade, herança e particularidades. | [inimigos.json](dados/inimigos.json) |
| Função e dificuldade | Crescimento, estatísticas e regras comuns. | [regras-inimigos.json](dados/regras-inimigos.json) |
| Região e missão | Formação, nível, chefe e efeitos de cenário. | [encontros-e-missoes.json](dados/encontros-e-missoes.json) |
| Habilidade e efeito | Ação, alvo, dano, cura ou estado aplicado. | [habilidades.json](dados/habilidades.json) e [status-e-efeitos.json](dados/status-e-efeitos.json) |

**Exemplo confirmado:** o ramo inicial de Orc Threats exige enfrentar Purple Skin na Wooden Forest, nível 8. Já outras missões constroem uma configuração específica a partir de uma fase existente. Essas instâncias especiais não devem ser reduzidas à tabela regular da região.

**Fontes:** C, `MainChapterOnehandler.Main16`, `LevelConfigurationBase` e derivados, `LevelConfigurationExtension`, `MonsterUnitConfigurationBase`, `DifficultyLevelMeasurement`.

## 13 Equipamentos: tipo, nível, raridade e propriedades

Uma peça combina identidade, categoria, nível/tier, raridade, atributos e possíveis efeitos especiais. Esses eixos são diferentes: uma arma de nível maior não é necessariamente superior para toda build se perder uma propriedade decisiva.

As categorias de armas incluem espada, cajado, faca, machado e lança; armaduras incluem robe, couro e placa. Há também acessórios, pergaminhos, amuletos e dispositivos. Cada categoria tem sua base de atributos possíveis e garantidos. Templates específicos podem acrescentar exceções.

O número básico de propriedades adicionais por qualidade é Normal **0**, Rare **0**, Epic **1**, Legendary **2** e Ancient **4**. Esses números não representam o total de linhas da ficha: atributos primários, garantias do template, Crystal Stone, eventos e regras Star podem acrescentar outras características.

**Exemplo confirmado:** a categoria Sword favorece certos atributos com intensidades diferentes; seu padrão garante vitalidade e define força como atributo primário. Os descritores por categoria e os **125 valores de tier** foram exportados, junto das regras que os transformam em atributos.

**Fontes:** C, `ItemCategoryRootDefault`, `SwordRootDefault`, `ItemRoot`, `ItemExtensions.AdditionalPropertyGradeSetting`; [equipamentos](dados/equipamentos.json), [propriedades](dados/propriedades-equipamentos.json).

## 14 Craft nas fábricas

O jogador obtém a receita, seleciona o produto e a quantidade e compromete os materiais necessários. A produção ocupa uma fila e exige trabalho ao longo do tempo. Moradores e efeitos urbanos podem aumentar a velocidade ou melhorar os resultados.

Weapon Factory e Armor Factory usam o mesmo ciclo geral, mas fabricam categorias diferentes. Os requisitos e a carga de trabalho dependem do tier. Os itens gerados podem ser equipados, vendidos automaticamente conforme configuração, guardados ou usados nas operações do forno.

A receita define uma família de produto; as propriedades finais ainda passam pelas regras de geração. Produzir repetidamente não garante obter a combinação exata de atributos desejada.

**Crystal Stone:** sua posse acrescenta uma propriedade potencial à produção das fábricas. **Armory Research:** concede duas propriedades adicionais aos próximos itens Ancient elegíveis produzidos por fábricas ou combinação, dentro do número de ativações do benefício.

**Exemplo ilustrativo:** fabricar um lote para procurar uma peça útil e vender o restante transforma materiais em equipamento e renda. Direcionar moradores e eventos para essa fase altera tanto a velocidade quanto o retorno da operação.

**Fontes:** C, `Recipe.GetProductionRequirements`, `ProductionBuildingProfile.Enqueue/GetCapableRecipes`, `ItemExtensions`, `ArmoryResearchProcessor`; L, evento `8`.

## 15 Forno: combinação, encantamento, reforja e reciclagem

| Operação | Entrada e resultado | Restrição ou custo de oportunidade |
| --- | --- | --- |
| Combinar equipamento | Três itens compatíveis e ouro geram uma peça de qualidade superior. | A combinação usual usa mesmo tipo, nível e qualidade; a geração de Ancient exige forno nível 2. |
| Combinar gemas | Três gemas do mesmo tipo e nível geram uma de nível superior. | Tem custo e limite de nível; não segue simplesmente a subida de raridade de uma arma. |
| Encantar | Acrescenta propriedades nas categorias elegíveis. | Armas e armaduras precisam ser Ancient; dispositivos possuem regras próprias. |
| Reforjar | Permite alterar um atributo existente dentro das possibilidades da peça. | Depende de atributos elegíveis e recursos; repetir não garante a propriedade ideal. |
| Decompor | Converte equipamentos e gemas elegíveis em materiais avançados. | Equipamento nível 8+ e gemas nível 7+ são os limiares descritos na interface; o item é consumido. |
| Transferir efeitos | Transfere efeitos especiais de uma peça para outra elegível. | Consome o doador e pode substituir efeitos anteriores do receptor. |

A operação normal de combinação pode ser feita em lote, com filtros e proteção dos itens bloqueados. A lógica de combinação manual admite algumas situações mais amplas que o resumo da interface; o trio homogêneo descrito acima é a regra operacional comum, não uma afirmação de que todos os caminhos internos rejeitam qualidades mistas.

Na transferência, os textos distinguem efeitos Ancient e Star; pergaminhos recebem efeitos, preservando os efeitos exclusivos próprios conforme a regra descrita. O limiar apresentado para transferência de equipamento é nível 8. Atributos numéricos e efeitos especiais não são a mesma coisa.

**Exemplo ilustrativo:** uma arma pode ser fraca em atributos e ainda valer como doadora de efeito. Vendê-la encerra essa possibilidade. Já combinar três cópias altera a qualidade da peça resultante, mas não é garantia de conservar todos os atributos das originais.

**Fontes:** L, interface `826,836,841,869–878,1005–1013,1057–1059,1069–1073`; C, `BuildingExtensions.IsCombineable/CalculateCombineResult`, `Item.IsEnchantable/IsReforgeable`; [regras de equipamentos](dados/regras-equipamentos.json).

## 16 Gemas e conjuntos individuais

Gemas adicionam atributos e podem ativar bônus de conjunto. Os encaixes possuem cores, e os patches permitem adicionar encaixes conforme os limites da peça. O manual descreve até quatro em armas e três em armaduras.

O bônus de conjunto depende da quantidade exigida de gemas de mesmo nome no aventureiro; elas não precisam ter todas o mesmo nível. Assim, completar um conjunto pode competir com a escolha de uma gema isolada de atributos maiores.

**Exemplo ilustrativo:** trocar uma gema para ganhar um atributo imediato pode romper um bônus ativo. A comparação deve incluir a ficha individual e o efeito do conjunto.

**Fontes:** L, manual `4`, `SocketTypeLocalizations`; C, `GemGeneratorBase` e geradores específicos, preservados em [regras de equipamentos](dados/regras-equipamentos.json).

## 17 Pergaminhos

A criação de pergaminhos é habilitada pela **Blueprint of Scrolls**, obtida do chefe Nameless. A escola possui a operação de criação, que combina materiais de vários sistemas.

A receita consultada exige **50 Book Pages, 20 Infused Powder, 20 Demon Fragment** e uma unidade de cada um dos sete materiais regionais: Crystal of the Wooden Forest, Ink of the Mist Forest, Ice of the Snow Mountain, Seal of the Buried Temple, Stone of the Hellish Path, Leaf of the Imperial Mausoleum e Sands of the Northern Territory.

O tipo de pergaminho é sorteado entre os tipos disponíveis na lista da operação. A criação gera Ancient ou Star conforme as regras de progressão. Não é a compra direta de qualquer efeito desejado. Os pergaminhos também participam da transferência de efeitos como receptores.

**Exemplo ilustrativo:** ter páginas em excesso não basta para sustentar a produção se falta um dos materiais regionais. O craft incentiva diversificar as fontes de suprimento.

**Fontes:** C, `School.GetCostForCombineScroll/CombineScroll`, `Nameless.GenerateGuarranteedDrops`; L, item `1100014`, interface `1073`.

## 18 Dispositivos e energias de combate

Dispositivos acrescentam um circuito de **coletores** e **ativadores**. Certos eventos da batalha acumulam recursos como Prism Light, Ghost Breath, Vital Energy e Chaotic Spirit. Outros dispositivos gastam esses pontos ao atingir suas condições e produzem efeitos automáticos.

As descrições incluem coleta ligada a ações como provocar, escapar da morte ou consumir Energy Points, e efeitos de liberação como proteção, remoção de efeitos positivos e redução de resistências. Essas energias específicas não são sinônimos de Rage nem do orçamento geral de ações da aventura.

A interface libera a categoria no título Salvation of Heaven ou no modo difícil. A utilidade depende de uma combinação capaz de gerar o recurso que o ativador consome. Dispositivos também possuem regras próprias de personalização.

**Exemplo ilustrativo:** um coletor baseado em provocação depende de uma party que provoque com frequência. Equipar apenas um ativador de Vital Energy não cria automaticamente uma fonte de Vital Energy.

**Fontes:** L, itens `1500001–1500016`, efeitos especiais `254,261–262,274–282`; C, regras de dispositivos em `ItemExtensions`, processamento de `RunePower` e condições da interface.

## 19 Amuletos e conjuntos da party

Os amuletos avançados formam conjuntos como **The Deer God, Thorns, Guilt of Prince, Corruption e Focus**. Cada um possui três peças distintas. O bônus é verificado entre os equipamentos dos integrantes da party: as peças podem estar distribuídas entre heróis.

Essa regra difere dos conjuntos de gemas individuais. Trocar um integrante ou seu amuleto pode afetar todo o grupo. As peças também têm atributos, adequação a funções e melhorias próprias.

O upgrade consome recursos antes de verificar o resultado e pode falhar. A implementação limita o nível a 100 e calcula uma chance que não cai abaixo de 50%. Portanto, o custo total até um objetivo não é simplesmente o preço de uma tentativa multiplicado pelo número de níveis.

**Exemplo ilustrativo:** três heróis usando as três peças distintas de um conjunto podem ativar seu benefício coletivo; três cópias da mesma peça não satisfazem a exigência de possuir todas as peças do conjunto.

**Fontes:** C, `TeamSetBase.GetAdventureTeamBonus`, cinco classes de conjunto, `Item.CanTeamSetUpgrade/GetTeamSetUpgradeSuccessChance/UpgradeTeamSetPiece`; [regras de equipamentos](dados/regras-equipamentos.json).

## 20 Moradores e capacidade econômica

Moradores são selecionados entre candidatos, respeitando as vagas. A cidade começa com cinco vagas e pode chegar a 30. A chegada de candidatos está vinculada às aventuras e pode ser ampliada por outros mecanismos. O avanço melhora as possibilidades de contribuição dos candidatos.

| Contribuição | Efeito principal |
| --- | --- |
| Production | Acelera produção. |
| Weapon Sale / Armor Sale | Melhora o retorno de vendas. |
| Luck | Favorece qualidade de fabricação e drops. |
| Practice | Melhora ganhos de Practice Points. |
| Gem Contribution / Assistance / Wealth | Entrega recursos nas condições do efeito. |
| Divine Heart | Favorece baús de qualidade. |
| Determination | Converte parte dos Practice Points gastos em renda. |
| Recruitment | Favorece obtenção de convites. |

Algumas contribuições são únicas ou limitadas. Somar a porcentagem impressa de todos os moradores sem consultar essas regras pode superestimar o benefício. Também existe a decisão entre uma contribuição urbana melhor e competências marítimas melhores.

**Exemplo ilustrativo:** ao preparar um grande lote de fabricação, um morador de produção pode ser mais útil; para vender o estoque acumulado, a composição voltada à renda pode ter outro valor. Isso descreve uma possibilidade de administração, não uma necessidade de substituir moradores a todo momento.

**Fontes:** L, manuais `9–10`, `ResidentEffectLocalizations`; C, `PlayerProfile`, `ResidentsExtensions`, efeitos específicos dos residentes.

## 21 Eventos urbanos e felicidade

Eventos consomem capacidade política e recursos diários, avançam ao longo do calendário e produzem benefícios. A cidade possui 100 pontos de política. Armory Research reserva 60; Trade e Alchemy, 30 cada; os eventos de recrutamento consultados reservam 40.

| Evento | Resultado principal |
| --- | --- |
| Trade | Benefício temporário para venda de equipamento. |
| Poetry Party | Atrai dois aventureiros. |
| Alchemy | Produz poções e aumenta a capacidade de saída em combate por um período. |
| Armory Research | Propriedades adicionais em um lote limitado de itens Ancient elegíveis. |
| Tea Party | Atrai suporte e beneficia resistências. |
| Banquet | Atrai assassino e beneficia crítico. |
| Drumming | Atrai warrior e beneficia agilidade. |
| Meditation | Atrai healer ou tank e beneficia Resilience. |

Os resultados dependem do avanço e da participação associada à felicidade. Moradores podem se cansar da repetição de um evento. A restrição de pontos permite combinar alguns eventos, mas impede manter todos simultaneamente.

**Exemplo ilustrativo:** Armory Research e Trade cabem juntos em 90 pontos; acrescentar Alchemy ultrapassaria a capacidade de 100. Ainda é preciso sustentar os recursos consumidos.

**Fontes:** L, `TownEventLocalizaitons`; C, `TownEventProcessorBase`, processadores dos eventos e `PlayerProfile.AvaliablePolicyPoints`.

## 22 Exploração marítima

O título Salvation of Heaven, com 10.000 de reputação no percurso normal, disponibiliza a missão **Exploration!**. O Port Permit habilita o sistema. São confirmados três modelos de barco, com três, quatro e cinco lugares, e limites de três barcos e três viagens.

| Competência | Papel nos encontros |
| --- | --- |
| Battle | Enfrentar guardiões, piratas e frotas. |
| Trade | Viabilizar encontros comerciais. |
| Research | Viabilizar encontros acadêmicos. |
| Culture | Melhorar o aproveitamento dos resultados pertinentes. |
| Collection | Melhorar a coleta quando a descoberta é aproveitada. |

A velocidade influencia a frequência de encontros; alimentos limitam a duração e podem ser perdidos em falhas. Durabilidade pertence ao barco e é distinta da reserva de alimentos. Reparos têm custo. A localização menciona perda de 10% nos reparos, mas o campo `WearAndTearRate` da lógica consultada não possui esse valor inicializado; essa porcentagem não foi adotada como regra confirmada.

Moradores embarcados mantêm suas contribuições urbanas. Heróis embarcados deixam de estar disponíveis para batalhas. Recolher recompensas faz parte da liberação do ciclo: uma viagem concluída, mas ainda não resgatada, ocupa uma das vagas consideradas pelo limite de viagens.

**Exemplo confirmado de custo:** o barco de nível 1 requer 50.000 Gold, 50.000 Practice Points, 1.000 Hide e 1.000 Ore. Escolher produzi-lo compete diretamente com níveis de heróis e outros investimentos.

**Fontes:** L, manual `11`, `JourneyContributionLocalizations`, `VehicleAttributeLocalizations`, `TripOutcomeLocalizations`; C, `PlayerProfile`, `BoatLevelOne`, `VehicleGeneratorBase.Repair`; [cidade e economia](dados/cidade-e-economia.json).

## 23 Missões, reputação e dificuldades

A campanha introduz serviços por requisitos como produzir, comprar, recrutar, aprender e vencer encontros específicos. Ramos paralelos entregam relíquias, convites e ampliações institucionais. Missões recorrentes e desafios adicionais reutilizam esses sistemas com outros objetivos e recompensas.

A reputação é atualizada até o patamar de conclusão de uma fase quando ele supera o atual. O histórico de progressão é separado por dificuldade, enquanto recursos e outros componentes do perfil possuem regras próprias de compartilhamento. A mudança de modo não foi descrita como apagar a cidade ou reiniciar todo o inventário.

**Exploration! concluída no modo normal habilita o modo difícil.** Esse detalhe é mais específico do que afirmar genericamente que “zerar a campanha” libera tudo. No modo difícil, atingir 10.000 de reputação libera a Mystic Dimension.

**Exemplo ilustrativo:** repetir uma fase rentável pode financiar a preparação para um chefe sem melhorar o título. Superar o patamar necessário pode então liberar candidatos, eventos ou conteúdo adicional.

**Fontes:** C, controladores de missões, `AdventureSuccessCalculation`, `PlayerProfile.GetEnabledStars/GetProgress/EndlessDungeonIsEnabled`; [encontros e missões](dados/encontros-e-missoes.json).

## 24 Mystic Dimension e continuidade avançada

A Mystic Dimension acrescenta níveis progressivos, entrada por Mystic Key, Ash of Hope, equipamento avançado e amuletos. A progressão alcançada também participa da geração de itens e mercadorias. Os inimigos e regras de batalha se tornam mais exigentes; a relação entre defesa, dano, energia e efeitos de grupo ganha peso.

O ciclo avançado utiliza recursos de sistemas anteriores: materiais para pergaminhos, peças doadoras de efeitos, gemas, Practice Points e moradores. O nível 90 dos heróis não encerra a construção da party.

**Exemplo ilustrativo:** melhorar apenas o nível dos personagens deixa de ser uma opção após o limite; a progressão passa a depender mais de equipamento, talentos, especialização de habilidades e combinações de efeitos.

**Fontes:** L, interface `1080–1081`; C, `EndlessDungeonResolver`, `DifficultyLevelMeasurement`, `PlayerProfile.GetProductionDifficultyLevelMeasurement`, `Shop`.

## 25 O que os JSONs permitem consultar

Os arquivos trazem catálogos por identificador, potenciais por herói, talentos associados, curva de experiência, propriedades por categoria, valores por tier, configurações de inimigos e tabelas de encontros. Os arquivos `regras-*.json` preservam condições e fórmulas C# quando não existe um valor constante que possa substituí-las corretamente.

Há **353 entradas de equipamentos**, **189 configurações de inimigos**, **26 configurações de heróis**, **117 implementações de talentos**, **89 registros localizados de habilidades**, **113 registros de efeitos de batalha** e **241 de efeitos especiais**. Essas são contagens de registros, incluindo sentinelas e conteúdo residual onde presentes; não são uma promessa de igual quantidade de conteúdo acessível em uma partida.

O [guia dos dados](dados/README.md) explica as relações, os campos, os limites e exemplos de consulta. O [manifesto](dados/manifesto.json) identifica os arquivos por hash.

<a id="fontes-e-limites"></a>

## 26 Fontes, divergências e limites

**L — Localização:** `game_Data/StreamingAssets/Localization-en.json`, na instalação fornecida. Os números citados são identificadores de registros. Os textos originais em inglês foram preservados nos JSONs; nomes internos com grafias como `Intelligience`, `Lightening` e `IronSolider` não foram corrigidos nos identificadores, para manter as ligações.

**C — Lógica:** `game_Data/Managed/Assembly-CSharp.dll`, inspecionada com ILSpy `9.1.0.7988`. O código foi analisado com Roslyn para separar tipos, membros, constantes e herança. Os arquivos de regras são evidência estática; não são um port executável do jogo.

| Divergência ou limite | Tratamento adotado |
| --- | --- |
| Cartas a cada três níveis versus talentos a cada cinco. | Priorizar criação e progressão atuais por talentos; preservar textos antigos sem apresentá-los como regra vigente. |
| Manual diz 45 dias de permanência na Inn; constante usa 20. | Informar a constante da build. |
| Textos de construção, barco e classe sem confirmação suficiente. | Manter registros, distinguindo existência no catálogo de acessibilidade. |
| Descrições contêm parâmetros e alguns erros de tradução. | Preservar texto e consultar fórmula; não preencher com suposição. |
| Stats de inimigos variam com contexto. | Exportar configurações e regras herdadas; não inventar uma ficha final única. |
| Tabela de XP gera faixas acima do nível máximo. | Marcar 91 e 92 como auxiliares; limite jogável permanece 90. |

Os JSONs foram parseados e suas ligações entre heróis, habilidades e talentos foram verificadas. A curva de experiência foi conferida quanto a continuidade, limiares e limite de talentos. Isso valida a consistência da extração, não o equilíbrio do jogo nem a eficácia de builds em partidas.

Não foram extraídas imagens ou amostras de saves. A análise de combate não substitui uma simulação integral de todos os modificadores. Os exemplos identificados como ilustrativos explicam relações entre sistemas e não são relatos de uma partida realizada.

`AGENTS.md` cita as ADRs G004–G006 em `docs/adrs/README.md`, mas esses documentos não estão neste checkout. A ausência foi registrada sem presumir regras; todo o material permanece em referências externas.
