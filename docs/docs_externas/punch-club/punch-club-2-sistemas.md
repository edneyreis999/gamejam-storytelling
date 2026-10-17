# Os sistemas de Punch Club 2: Fast Forward e Iron Fist

**Objeto:** Punch Club 2: Fast Forward, incluindo o DLC Iron Fist.

**Perspectiva:** funcionamento da rotina, recursos, treinamento, ligas, profissões, exploração e progressão narrativa.

**Finalidade:** estudo de referência do jogo, sem propostas de adaptação ou definição de sistemas para outro projeto.

**Estado:** análise documental dos tutoriais, diálogos, grafos e textos da instalação local. Não substitui uma verificação por partidas instrumentadas.

**Data:** 17 de outubro de 2026. **Contém spoilers completos.**

Punch Club 2 organiza a campanha em torno de uma rotina: obter dinheiro, alimentar-se, descansar, treinar e chegar preparado às lutas. A vitória dá acesso a novos patamares esportivos e narrativos, mas manter essa ascensão exige administrar os intervalos entre os combates. Trabalhos, deslocamentos, cursos, alunos, filmes e missões concorrem pelo mesmo tempo.

Iron Fist acrescenta um segundo personagem administrável: o robô. Ele possui condição física, treinamento, trabalho, recursos e progressão próprios. Isso amplia a rotina porque parte das atividades robóticas continua sem a presença do protagonista, mas depende de manutenção e infraestrutura.

**Navegação:** [Como ler](#1-como-ler-este-estudo) · [Recursos e dependências](#2-recursos-e-dependências) · [Tempo e rotina](#3-tempo-e-rotina) · [Corpo e treinamento](#4-corpo-e-treinamento) · [Combate e ligas](#5-combate-e-progressão-esportiva) · [Economia e trabalho](#6-economia-e-trabalho) · [Narrativa e exploração](#7-narrativa-e-exploração) · [Iron Fist](#8-sistemas-de-iron-fist) · [Exemplos integrados](#9-exemplos-integrados) · [Fontes e limites](#10-fontes-e-limites-da-análise).

## 1 Como ler este estudo

Os 49 tópicos abaixo não representam 49 sistemas autônomos. **Sistema** designa um conjunto de regras com ciclo próprio; **subsistema**, uma parte desse ciclo; **conteúdo narrativo**, uma sequência de missões ou acontecimentos que utiliza regras compartilhadas. Um serviço, como comprar comida, participa de vários sistemas sem necessariamente constituir um sistema independente.

A numeração é uma organização editorial reconstruída a partir das fontes disponíveis. A lista anterior de 49 itens mencionada no pedido não acompanhou o plano recebido nem foi encontrada no checkout. Portanto, há 49 tópicos cobertos e identificados, mas não se afirma correspondência literal com aquela lista ausente.

Cada tópico apresenta sua finalidade, ações e requisitos, entradas e resultados, progressão, limitações ou falha e um exemplo. Onde não existe uma condição de derrota própria, a consequência é apresentada como bloqueio, custo de oportunidade ou atraso. As descrições da execução do combate são deliberadamente breves; a organização das ligas, os PBP e os pagamentos recebem mais detalhe.

As regras vêm principalmente do [atlas local](punch-club-2-quests.html). As expressões **condicional** e **exemplo ilustrativo** distinguem ramificações e situações construídas para explicar as regras. Um evento que fecha uma academia não prova a existência de uma simulação geral de fechamento de estabelecimentos.

## 2 Recursos e dependências

### 2.1 O que cada medida representa

| Recurso ou medida | Função | Obtenção ou recuperação | Uso, perda ou restrição |
| --- | --- | --- | --- |
| Tempo e calendário | Organizam rotina e compromissos. | Não são uma moeda que o jogador produz; a agenda permite aproveitá-los. | Deslocamentos e atividades ocupam tempo; lutas e trabalhos têm condições temporais próprias. |
| Força, Agilidade e Vigor | Atributos de desenvolvimento do lutador. | Treinamento e efeitos específicos. | Determinam capacidades; não equivalem às necessidades atuais nem ao Tônus. |
| Alimentação, energia cotidiana e condição de saúde | Sustentam atividades e preparação. | Comida, descanso, recuperação e serviços apropriados. | Trabalho, treinamento e lutas criam demanda por recuperação. Os efeitos variam por ação. |
| Fúria / satisfação | Estado de disposição que modifica rendimento. | Lazer, lutas e efeitos de vantagens ou estados. | Estados negativos prejudicam treino e trabalho. A localização usa “Fúria”, enquanto a variável se chama `_satisfaction`. |
| Tônus de Força, Agilidade e Vigor | Reservas para técnicas especiais. | Treinamento; serviços e benefícios específicos podem interferir. | O conjunto de técnicas selecionado pode cobrar Tônus a cada round. Não é dinheiro nem nível do atributo. |
| Vida, energia e iniciativa de combate | Parâmetros da luta. | Derivam dos atributos, condição e efeitos ativos. | Gastos e danos durante o combate. A energia de luta não deve ser confundida com Vigor. |
| Dinheiro | Financia sobrevivência, serviços e parte da carreira esportiva. | Trabalhos, pagamentos de lutas e recompensas. | Compras, transporte, serviços, desafios profissionais e taxas. |
| PBP — Pontos de Boa Pessoa | Prestígio institucional e progressão humana; ligados às técnicas e às ligas. | Lutas e eventos de progressão. | Há ganhos e perdas; comparar PBP determina pagamentos nos casos profissionais confirmados. A contabilidade exata da compra de técnicas não foi reconstruída. |
| RA — Respeito das Antigas | Progressão das vantagens associadas aos filmes. | Assistir às fitas pertinentes. | Liberação de vantagens na árvore própria, com seus requisitos. Não confundir com a palavra “respeito” usada informalmente em desafios. |
| Reputação e progresso de profissão | Acesso a tarefas, promoções e benefícios. | Trabalho e missões do empregador. | Falhas e escolhas podem retirar benefícios ou bloquear uma ramificação. Não se trata de uma única moeda universal. |
| Carga do robô — DLC | Sustenta atividades e participa da energia de combate robótica. | Estação de recarga, baterias e melhorias pertinentes. | Trabalho e treinamento podem parar por falta de carga. |
| Durabilidade do robô — DLC | Condição de manutenção e base da vida em combate. | Mesa de reparos e peças sobressalentes. | Danos e certas atividades; recarregar não substitui reparar. |
| Pontos de Robô Implacável — DLC | Liberação de técnicas do robô. | Lutas robóticas; vencer rende mais. | Progressão na árvore robótica. O tutorial português abrevia como **PRB**; o identificador do evento usa `BRP`. |
| Aço, microchips e fios — DLC | Componentes da produção e reconstrução. | Fornecedores, tarefas e trabalho do robô conforme desbloqueios. | Fabricação e melhorias com receitas específicas. Microchips como material não são os chips equipáveis. |
| Plantas, chips equipáveis, peças, baterias, tintas e nanorobôs — DLC | Desbloqueios, configuração, manutenção e consumíveis distintos. | Missões, comércio e fábrica, conforme o item. | Cada categoria tem uma finalidade; não existe conversão geral demonstrada entre elas. |

### 2.2 Dependências principais

| Objetivo | Dependências | Resultado e retorno à rotina |
| --- | --- | --- |
| Sustentar treinamento | Alimentação, descanso, acesso ao equipamento ou serviço e tempo. | Atributos e Tônus favorecem lutas; as sessões exigem nova recuperação. |
| Disputar uma luta agendada | Liga acessível, compromisso válido, preparação e presença dentro da janela. | Resultado esportivo, PBP e consequências narrativas; faltar pode produzir derrota técnica. |
| Subir na liga profissional | PBP, seleção de adversário, dinheiro quando exigido e desempenho. | A ascensão abre divisões e acontecimentos; o custo de desafiar reforça a necessidade de renda. |
| Manter uma carreira | Requisitos de ingresso, tarefas e compromissos cumpridos. | Pagamento, promoções e benefícios condicionais; falhas podem retirar acesso. |
| Adquirir vantagens das antigas | Fitas, acesso à exibição, RA e condições da vantagem. | Benefícios à rotina; ocupa tempo que poderia ser usado em trabalho ou treino. |
| Evoluir o robô | Oficina, treino, carga, durabilidade e lutas. | Pontos e posição na liga abrem novas opções; manutenção mantém o ciclo operante. |
| Expandir a oficina | Materiais, plantas e eventos de desbloqueio. | Produção, personalização e automação; também avança a história da IA. |

## 3 Tempo e rotina

### 01 — Calendário e compromissos

**Tipo:** sistema central do jogo base, compartilhado com o DLC.

O tempo transforma ações úteis em escolhas concorrentes. O jogador consulta compromissos, executa atividades e reserva espaço para deslocamento e recuperação. O requisito para uma luta não é apenas estar forte: é também ter uma inscrição ou desafio válido e comparecer na janela correspondente.

**Entradas e resultados:** atividades ocupam tempo e produzem dinheiro, recuperação, treinamento ou progresso de missão. A progressão acrescenta mais compromissos e serviços. Uma janela perdida pode resultar em derrota técnica; em profissões, a consequência depende do evento de falta ou fracasso.

**Exemplo:** terminar um turno de trabalho só é vantajoso se ainda houver tempo para preparar-se e comparecer à luta. O dia não deve ser planejado apenas pela renda máxima possível. [Calendário da liga](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit_FightTutorial_2).

### 02 — Mapa, deslocamento e transporte

**Tipo:** subsistema de mobilidade.

O mapa conecta casas, empregos, academias, comércio e locais de missão. O jogador escolhe destinos e utiliza as opções de transporte disponíveis. O acesso depende da descoberta ou liberação do lugar; viagens também entram no orçamento de tempo e, quando pagas, de dinheiro.

**Progressão e limites:** um passe de ônibus reduz o preço do serviço, segundo `bus_pass_perk_d`. A carreira policial contém uma melhoria específica de velocidade de caminhada. Esses benefícios têm origens diferentes e não devem ser presumidos no começo do jogo. Uma viagem mal planejada pode comprometer a agenda, sem constituir uma derrota independente.

**Exemplo:** usar transporte para preservar a janela da liga pode valer mais que economizar a tarifa. A missão do rastreador de Silver, por sua vez, pede caminhada: deslocar-se não é sempre equivalente a cumprir aquela tarefa. [Passe](punch-club-2-quests.html#event%3AOnItemUseBusPass) · [Melhoria policial](punch-club-2-quests.html#event%3AEvent_II-Pol2LvlUp2DreamLab) · [Rastreador](punch-club-2-quests.html#event%3ASilver).

### 03 — Alimentação e abastecimento

**Tipo:** subsistema de necessidades.

Comer mantém a rotina viável. O jogador adquire alimentos, usa os pontos de abastecimento disponíveis e administra o que tem guardado. Os requisitos incluem dinheiro ou uma fonte condicional de ajuda, estoque e acesso ao serviço.

**Entradas e resultados:** alimentos recuperam as necessidades indicadas no próprio item; não se deve atribuir o mesmo efeito a toda comida. A fome pode impedir trabalho, como mostram os diálogos de NoodleMan. A campanha altera fontes de abastecimento: o dispenser inicial bloqueado é um gatilho narrativo específico.

**Exemplo:** gastar toda a renda em treinamento pode deixar o personagem sem condição de trabalhar para comprar a próxima refeição. Uma barra de proteína recebida de Silver também ajuda na recuperação de vida e energia, segundo o evento inicial. [Dispenser](punch-club-2-quests.html#event%3AEvent_2_FirstHenryVisit) · [Fome e trabalho](punch-club-2-quests.html#event%3ANoodleMan) · [Barra de proteína](punch-club-2-quests.html#event%3AEvent_7_FirstFightLost).

### 04 — Sono, descanso e energia cotidiana

**Tipo:** subsistema de necessidades.

Dormir e descansar recuperam a capacidade de continuar a rotina. É necessário ter acesso ao ponto de descanso e reservar tempo. A localização distingue estados de cansaço, sonolência e proximidade de colapso; portanto, a administração do sono não se resume a comprar um alimento.

**Progressão e falha:** novos espaços e vantagens podem melhorar a recuperação. O texto da vantagem `i_need_a_vacation_perk_1_d`, do DLC, prevê recuperação de energia mais rápida ao dormir. Não foi confirmada aqui uma duração universal de sono nem o gatilho exato de cada estado.

**Exemplo:** recuperar energia antes de trabalhar cria um custo de tempo imediato, mas evita tentar sustentar a jornada com o personagem exausto. [Poltrona da casa](punch-club-2-quests.html#event%3AOldHouseArmchair) · [Sofá do apartamento](punch-club-2-quests.html#event%3ASkyApartmentSofa).

### 05 — Fúria, satisfação e lazer

**Tipo:** subsistema de rendimento.

“Fúria” é o rótulo português dos estados associados a satisfação. Não significa que o jogador deva interpretar toda atividade como produção de raiva narrativa. Lazer, lutas e vantagens interagem com essa medida, que afeta a eficiência das outras ações.

**Entradas e resultados:** o jogador investe tempo e, conforme a atividade, dinheiro; obtém recuperação de disposição e efeitos associados. Os textos `satisfaction_red_zone_d` e `satisfaction_green_zone_d` confirmam penalidades ou bônus de treino e trabalho. A zona baixa também reduz máximos de necessidades. Não se reproduzem aqui os limiares numéricos das zonas, que não foram verificados.

**Exemplo:** insistir em trabalhar e treinar em estado ruim pode render menos do que reservar um período de lazer. Filmes têm uma segunda função, concedendo RA e acesso a vantagens, tratada no tópico 36. [Casa de Henry](punch-club-2-quests.html#event%3AHenryHouse) · [Árvore de RA](punch-club-2-quests.html#event%3AOSRTreeTutorial).

### 06 — Saúde e recuperação após esforço ou luta

**Tipo:** subsistema de condição física.

A condição de saúde atual interfere na preparação; a vida apresentada no combate também depende de Força. O jogador utiliza recuperação, itens e serviços adequados antes de voltar a assumir riscos. Não basta possuir um atributo alto para ignorar a condição atual.

**Entradas e resultados:** a recuperação custa tempo, consumíveis ou dinheiro conforme a opção. Vantagens podem reduzir a perda de saúde após lutas. Sofrer dano cria demanda de recuperação; não se deduz daí uma regra única de morte permanente ou hospitalização automática.

**Exemplo:** depois de uma derrota, restaurar a condição antes de investir em outra tentativa pode ser mais útil que comprar uma técnica. O tratamento da mãe no hospital pertence a uma missão e não prova que toda recuperação pessoal siga aquele orçamento. [Pós-luta](punch-club-2-quests.html#event%3AEvent_7_FirstFightLost) · [Serviço de recuperação de Silver](punch-club-2-quests.html#event%3ASilver).

### 07 — Casa e organização dos pontos de apoio

**Tipo:** infraestrutura da rotina.

A casa reúne funções como descanso, alimentos e equipamento. O jogador compra ou instala aparelhos e passa a utilizar outros espaços quando a campanha permite. Cada função exige seu objeto e acesso; possuir uma casa não implica possuir todos os serviços.

**Entradas e resultados:** aquisição e instalação usam recursos próprios de cada item e reduzem dependência de visitas a outros lugares. A progressão muda a distribuição das atividades entre garagem, academia e outros espaços. Bloqueios narrativos, como Adriana dormindo perto do dispenser, interferem em usos específicos.

**Exemplo:** instalar equipamento na garagem aproxima treino e descanso, mas ainda é necessário abastecer a alimentação. Benefícios do apartamento policial são condicionais e aparecem separadamente no tópico 30. [Garagem](punch-club-2-quests.html#event%3AOldGarage) · [Instalação de equipamentos](punch-club-2-quests.html#event%3ABuildGymTrainersInOldGarage) · [Adriana](punch-club-2-quests.html#event%3AOldHouseAdriana).

## 4 Corpo e treinamento

### 08 — Força, Agilidade e Vigor

**Tipo:** sistema de atributos.

Os três atributos orientam o desenvolvimento físico. Os textos locais confirmam: **Força** afeta vida, dano e consumo de energia em combate; **Agilidade** afeta iniciativa; **Vigor** afeta energia de combate e recuperação entre rounds. Isso não constitui uma fórmula completa para cada técnica.

**Ações e recursos:** escolher sessões e equipamentos exige acesso e condição para treinar; as sessões consomem tempo e recursos indicados pela atividade e produzem desenvolvimento nos atributos correspondentes. A progressão abre técnicas e configurações mais exigentes. Treinar um atributo sem considerar o restante pode produzir um lutador incapaz de sustentar sua configuração.

**Exemplo:** elevar Força não resolve automaticamente um problema de energia. Este estudo não importa a regra de deterioração de atributos do primeiro Punch Club: níveis, condição atual e reservas de Tônus são medidas separadas. Fontes diretas: `ui_stat_strength_d`, `ui_stat_agility_d` e `ui_stat_endurance_d`, em `lng_pt-br`.

### 09 — Treinamento físico e equipamentos

**Tipo:** sistema de treinamento convencional.

O jogador utiliza aparelhos como barras, esteira, saco e pera de treino. Cada aparelho direciona a sessão; não se assume que todos desenvolvam igualmente os três atributos. É preciso obter acesso ao equipamento e ter condição de realizar a atividade.

**Entradas e resultados:** tempo e necessidades sustentam a sessão; atributos e Tônus são resultados relevantes do treinamento. Compra de aparelhos, liberação de níveis e vantagens específicas ampliam as opções. Falta de condição ou equipamento bloqueia a ação; escolhas pouco adequadas desperdiçam parte da agenda.

**Exemplo:** antes de uma luta com técnicas que usam Tônus, uma sessão pode servir para recompor a reserva, mesmo quando obter outro nível de atributo não é o objetivo imediato. [Barra](punch-club-2-quests.html#event%3ABarbell) · [Esteira](punch-club-2-quests.html#event%3ARunningTrack) · [Liberação de equipamentos](punch-club-2-quests.html#event%3AUnlockTrainersTier2).

### 10 — Neurotreinamento

**Tipo:** alternativa tecnológica de treinamento.

Na academia de Silver, o jogador escolhe programas de neurotreinamento. Acesso, disponibilidade da sessão, condição e pagamento devem ser conferidos no serviço. O ciclo converte tempo e recursos em desenvolvimento ou efeitos próprios do programa.

**Progressão e limites:** programas e softwares modificam eficácia, custo e disponibilidade. Não existe nas fontes consultadas fundamento para declarar que neurotreinamento é sempre superior ao exercício convencional. Cansaço e especialização tecnológica entram nessa comparação.

**Exemplo:** o software oferecido por Silver melhora neurotreinamento, mas prejudica o treino das antigas. Isso muda a conveniência dos aparelhos que o jogador já possui. [Introdução à academia](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit) · [Neurotreinador](punch-club-2-quests.html#event%3ANeurotrainer) · [Oferta de Silver](punch-club-2-quests.html#event%3ASilver).

### 11 — Neurotreinamento extremo e sobrecarga

**Tipo:** subsistema de risco do treinamento.

O treinamento extremo exige desbloqueio próprio e introduz risco de sobrecarga cerebral. O jogador escolhe quando utilizar a modalidade e quando interromper a insistência para recuperar-se ou procurar o serviço apropriado.

**Entradas e resultados:** utiliza os custos da sessão; produz treinamento, mas pode acrescentar uma condição negativa. Os textos de sobrecarga confirmam perda de satisfação, redução da eficiência do neurotreinamento e, em estados mais graves, prejuízo ao trabalho e aos máximos de saúde e energia. O aviso textual de gravidade não permite deduzir uma fórmula de morte ou uma probabilidade universal de acidente.

**Exemplo:** repetir sessões extremas para acelerar a preparação pode prejudicar também a capacidade de trabalhar para financiá-las. [Desbloqueio](punch-club-2-quests.html#event%3AUnlockExtremeNeurotrainings) · [Sessão](punch-club-2-quests.html#event%3AExtremeNeurotraining) · [Serviço de cura](punch-club-2-quests.html#event%3AGyatsoHealer).

### 12 — Softwares, assinaturas e especialização

**Tipo:** subsistema de modificadores persistentes.

Softwares instalados no chip alteram atividades: há foco de atributos, melhorias ou penalidades de modalidades de treino e vantagens de transporte. O jogador decide instalar e, quando permitido, remover programas; deve verificar taxa de instalação e cobrança recorrente, quando existirem.

**Entradas e resultados:** dinheiro, instalação e requisitos do fornecedor dão acesso a modificadores. Focar um atributo pode prejudicar o treinamento dos demais. A oferta gratuita de um programa não garante ausência de consequências: o Neurotrainer PRO Plus de Silver possui uma dificuldade narrativa de desinstalação, encaminhada a Emmit.

**Exemplo:** adotar foco em Vigor favorece esse desenvolvimento, mas exige reconsiderar as sessões para Força e Agilidade. Não se acumulam percentuais de versões ou programas sem conferir a configuração. [Silver](punch-club-2-quests.html#event%3ASilver) · [Emmit](punch-club-2-quests.html#event%3AEmmit) · [Foco em Vigor](punch-club-2-quests.html#event%3AOnItemUseStmTrainFocus).

### 13 — Suplementos, efeitos temporários e intoxicação

**Tipo:** subsistema de consumíveis.

Suplementos oferecem efeitos ligados aos atributos e também aparecem como objetos exigidos por NPCs. O jogador compra, utiliza ou entrega o item correto. A descrição do produto e os efeitos ativos precisam ser considerados antes de repetir o uso.

**Entradas e resultados:** dinheiro e unidades consumíveis resultam no efeito ou na entrega da missão. A localização contém estados crescentes de intoxicação, com penalidades de treinamento. Não foram confirmadas aqui as durações, a fórmula de acúmulo nem a composição exata de todos os suplementos.

**Exemplo:** usar o suplemento grande pedido por Bobo satisfaz uma necessidade diferente de entregá-lo para obter o reconhecimento do empregador. Repetir consumo pode comprometer sessões futuras. [Pedido de Bobo](punch-club-2-quests.html#event%3ABobo) · [Pedido ligado à Agilidade](punch-club-2-quests.html#event%3ANoodleMan) · [Tratamento de intoxicação](punch-club-2-quests.html#event%3AUnlockIntoxicationHealBuy).

### 14 — Tônus e preparação entre lutas

**Tipo:** subsistema que conecta treinamento e combate.

Há reservas de Tônus associadas a Força, Agilidade e Vigor. Algumas técnicas as exigem. O jogador escolhe as técnicas, observa o custo total mostrado e treina para recompor as reservas necessárias.

**Regra confirmada:** selecionar a técnica exibe o custo, mas ainda não gasta Tônus. O tutorial explica que, com a configuração escolhida, **cada round** passará a cobrar pontos. Assim, a preparação depende também da duração da luta, não apenas de conseguir pagar uma vez.

**Progressão e falha:** técnicas mais exigentes acrescentam uma obrigação de manutenção. Não foi reconstituído o comportamento exato de todas as técnicas quando a reserva se esgota; a configuração precisa ser ajustada ao que a interface permite. Benefícios específicos, como o de Gold, podem dispensar Tônus de uma técnica indicada, sem liberar todas as técnicas.

**Exemplo:** antes de marcar mais uma sessão de trabalho, comparar as reservas com os custos por round pode revelar que a prioridade é treinar. [Tutorial de Tônus](punch-club-2-quests.html#event%3AFuelTutorial) · [Gold e Silver](punch-club-2-quests.html#event%3ASilver).

### 15 — Controle energético e redistribuição

**Tipo:** serviço de ajuste do desenvolvimento.

SpoonBoy oferece uma forma de redistribuir pontos depois de sua introdução. O tutorial faz uma ressalva essencial: o exemplo de converter Força em Agilidade destina os pontos ao **Tônus de Agilidade**, não diretamente ao nível de Agilidade.

**Entradas e resultados:** o serviço tem preço, modifica a distribuição escolhida e apresenta aviso de perda de parte dos Tônus. Sem a janela e seus valores, não se deve inventar taxa de conversão nem tratar a operação como reinicialização livre de todos os atributos.

**Exemplo:** corrigir uma distribuição que ficou inadequada exige avaliar o que será retirado e qual reserva será preenchida; não equivale a comprar níveis diretamente. [SpoonBoy](punch-club-2-quests.html#event%3ASpoonBoy). Complemento local: `ui_stat_change`, `ui_stat_change_sure` e `ui_stat_change_warning`.

## 5 Combate e progressão esportiva

### 16 — Resolução das lutas

**Tipo:** sistema de combate, resumido.

O jogador prepara o conjunto de habilidades e acompanha sua execução nos rounds. Técnicas, atributos e condição do lutador determinam o que a configuração consegue sustentar. O resultado produz consequências próprias da liga ou missão; não se presume a mesma recompensa para toda luta.

**Exemplo:** perder uma luta de missão e faltar a uma partida agendada são falhas diferentes. A primeira pode abrir uma tentativa posterior; a segunda pode registrar derrota técnica sem combate. [Preparação inicial](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit_FightTutorial) · [Liga profissional](punch-club-2-quests.html#event%3AProLeagueTutorial).

### 17 — Vida, energia e iniciativa na luta

**Tipo:** subsistema de recursos de combate, resumido.

Vida depende de Força e saúde atual; energia depende de Vigor e condição energética; iniciativa depende de Agilidade, conforme as descrições locais. Técnicas gastam ou alteram esses recursos. A recuperação também pode depender de efeitos específicos.

**Exemplo:** uma configuração que esgota energia pode fracassar apesar de causar bastante dano. A solução pode envolver preparação e escolha de técnicas, sem exigir um aumento indiscriminado de todos os atributos. Fonte: família `ui_stat_*` e descrições de técnicas em `lng_pt-br`.

### 18 — Seleção de técnicas e modificadores

**Tipo:** subsistema de configuração, resumido.

O jogador equipa técnicas ofensivas, defensivas e modificadores disponíveis. Os requisitos incluem desbloqueio e compatibilidade com os espaços e recursos apresentados. A configuração transforma as opções adquiridas em comportamento de luta; uma escolha inadequada pode consumir energia ou Tônus demais.

**Exemplo:** adicionar uma técnica não é uma melhoria automática se o lutador não consegue sustentar seu custo. Fonte: textos `tut_prefight_*` e [tutorial de Tônus](punch-club-2-quests.html#event%3AFuelTutorial).

### 19 — Escolas marciais

**Tipo:** subsistema de sinergias, resumido.

O jogador libera uma escola e utiliza habilidades pertencentes a ela para ativar suas vantagens. O tutorial confirma que mais habilidades da mesma escola ativam mais vantagens. A progressão combina acesso à escola e aquisição das habilidades; selecionar a escola isoladamente não garante todos os bônus.

**Exemplo:** trocar uma habilidade pode alterar uma vantagem da escola, além do próprio golpe. [Liberação de escola](punch-club-2-quests.html#event%3AFightingSchoolTutorial) · [Ativação das vantagens](punch-club-2-quests.html#event%3ANewSchoolTutorial).

### 20 — PBP e árvore de técnicas

**Tipo:** sistema de progressão humana, ligado ao prestígio e às ligas.

O “BP” mencionado informalmente corresponde, neste estudo, a **PBP — Pontos de Boa Pessoa**. A versão inglesa utiliza GPP, e os grafos guardam o recurso em `_gpp`. PBP não é dinheiro: ter prestígio suficiente para estar na disputa não significa ter saldo financeiro para pagar um adversário.

O tutorial da árvore ensina a liberar habilidades com os pontos obtidos após uma vitória. Os ramos e escolas também possuem condições de acesso. Portanto, o jogador transforma os resultados da carreira em opções para as lutas seguintes, em vez de receber apenas uma posição decorativa no ranking. [Árvore de técnicas](punch-club-2-quests.html#event%3ATechTreeTutorial).

**Três usos que precisam ser distinguidos:** PBP participa da comparação entre lutadores; serve à progressão de técnicas descrita pelo tutorial; e aparece em condições de campanha e acesso institucional. O evento `TwoThousandGpp`, por exemplo, articula o marco dos pontos com a conclusão dos estudos policiais. Uma condição institucional não é automaticamente uma regra da liga. [Marco de PBP](punch-club-2-quests.html#event%3ATwoThousandGpp).

**Limite contábil:** o atlas e os textos da interface consultados não bastam para concluir como cada desbloqueio de técnica afeta a pontuação usada pelo ranking — saldo atual, pontos disponíveis ou outro registro de progressão. Por isso, não se afirma que comprar uma técnica necessariamente rebaixa o jogador, nem que todos os pontos de desbloqueio formam uma carteira separada. Essa relação exigiria inspeção adicional da implementação ou uma comparação antes/depois em partida.

**Exemplo:** um jogador com PBP suficiente para progredir ainda pode precisar trabalhar para financiar a próxima luta profissional. Vencer, ganhar pontos e ter dinheiro são resultados relacionados, mas não intercambiáveis.

### 21 — Prática com Silver e treinamento de Gold

**Tipo:** serviços de prática, resumidos.

Silver oferece sessões de prática com disponibilidade limitada; a campanha abre outras condições, incluindo sessões em que ele não revida. Gold pede demonstrações de técnicas já dominadas. O jogador precisa do acesso narrativo e da disponibilidade do serviço.

**Entradas e resultados:** tempo, disponibilidade e preparação resultam em prática e benefícios específicos. A localização `gold_training_buff_d` descreve permissão para usar uma técnica indicada sem gastar Tônus. Não se generaliza esse efeito a toda a configuração, nem se assume disponibilidade contínua: Silver e Gold podem mandar voltar no dia seguinte.

**Exemplo:** uma sessão de Gold pode alterar a necessidade de Tônus de determinada técnica para a preparação seguinte. [Serviços e bloqueios](punch-club-2-quests.html#event%3ASilver) · [Prática avançada](punch-club-2-quests.html#event%3ATrainWithSilverV2).

### 22 — Liga do Silver: entrada, calendário e transição

**Tipo:** sistema de competição inicial.

A Liga do Silver apresenta a carreira organizada. Silver inscreve o protagonista, o terminal mostra os lutadores e o jogador consulta a luta marcada e os dados do adversário. O tutorial inicial apresenta uma lista de onze oponentes. Essa descrição vale para a liga apresentada, não para qualquer competição do jogo.

**Inscrição e preparação:** a primeira luta é uma exceção tutorial que permite entrada imediata. A própria fala explica que normalmente é necessário apresentar-se com antecedência. Assim, não se deve deduzir dessa primeira experiência que basta aparecer em qualquer momento e escolher qualquer oponente. [Inscrição e adversário](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit_FightTutorial).

**Calendário:** há dias específicos de luta e uma janela de participação. O tutorial confirma **8h às 22h** para a Liga do Silver, com indicação de tempo restante. Perder a oportunidade conta como derrota. Esse horário pertence a essa liga e não deve ser aplicado às divisões profissionais ou ao robô. [Janela de participação](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit_FightTutorial_2).

**Economia e progresso:** Silver apresenta a competição como uma forma de obter dinheiro e PBP. Ela estabelece o ciclo de preparar-se, lutar e usar o resultado para avançar. As regras de pagamento por diferença de PBP são explicitamente apresentadas mais tarde como uma diferença da liga profissional; não devem ser retroativamente atribuídas a todos os confrontos amadores. [Apresentação](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit).

**Conclusão:** chegar à primeira posição aciona o encontro com Barry e o convite para sua liga. O grafo verifica `_gpp` e, **se estiver abaixo de 2.000, define-o como 2.000**. Se já for igual ou superior, não aplica esse ajuste. Trata-se de um piso de saída nesse evento, não de um prêmio fixo de mais 2.000 pontos. A transição também altera a participação na liga anterior. [Vitória e convite](punch-club-2-quests.html#event%3AEvent_II-ProL0_AfterWinSilverLeague), nós 76–78 e seus caminhos de comparação.

**Exemplo:** concluir a liga com 1.850 PBP levaria a 2.000 nesse ajuste; chegar com 2.100 não levaria a 4.100. Os números de partida são ilustrativos; a regra de comparação e o piso são confirmados no grafo.

### 23 — Liga profissional: divisões, desafios, pagamentos e ranking

**Tipo:** sistema de ascensão esportiva e econômica.

#### Entrada e objetivo

Depois do convite de Barry, o jogador ingressa na **segunda divisão**. Chegar ao topo permite passar à **primeira divisão**; vencer essa divisão encaminha o título e o acesso narrativo à Cidade Alta. A apresentação inicial promete 9.000 PBP e o convite, mas os grafos permitem descrever com mais precisão o ajuste de pontos e as etapas posteriores. [Entrada na liga](punch-club-2-quests.html#event%3AEvent_II-ProL1_JoinProLeague).

O modelo documentado é uma **liga de classificação e desafios**. Não é adequado descrevê-lo como uma chave eliminatória na qual uma derrota necessariamente expulsa o jogador do torneio. O jogador pode enfrentar adversários diferentes para continuar sua progressão. Barry aconselha explicitamente a desafiar outro lutador e obter PBP suficiente para ultrapassar um adversário difícil. Isso também impede tratar cada rival como um chefe obrigatório em uma sequência rígida. [Conselho sobre oponentes difíceis](punch-club-2-quests.html#event%3AEvent_II-ProLHint).

#### Quem paga a quem

A regra confirmada se apoia na **comparação de PBP**, não apenas em quem tomou a iniciativa do convite. Enfrentar alguém com mais prestígio exige financiar a oportunidade; receber alguém com menos PBP pode produzir renda.

| Situação confirmada | Pagador | Recebedor | Implicação |
| --- | --- | --- | --- |
| Você desafia alguém com mais PBP. | Você. | Adversário, conforme a operação da liga. | Subir exige caixa além de preparação. |
| Alguém com mais PBP desafia você e você aceita. | Você. | Adversário, conforme a operação da liga. | Receber o desafio não torna a luta gratuita. |
| Alguém com menos PBP desafia você e você aceita. | Adversário. | Você, sujeito à taxa da organização. | Seu prestígio cria uma oportunidade de renda. |
| PBP iguais ou outras combinações não explicadas pelos tutoriais. | Não determinado nesta análise. | Não determinado nesta análise. | Conferir a proposta na interface; não extrapolar uma fórmula. |

Barry informa que cobra uma taxa sobre as lutas. Isso impede equiparar automaticamente o valor bruto negociado ao ganho líquido. Não foram confirmados o percentual, a fórmula do preço por diferença de pontos, o momento exato da cobrança e eventuais condições de restituição. O documento não atribui números a essas regras. [Explicação de Barry](punch-club-2-quests.html#event%3AEvent_II-ProL1_JoinProLeague), falas dos nós 35–40 · [Desafio recebido](punch-club-2-quests.html#event%3AProLeagueChallengeTutorial), nós 20–23 e 30–31.

**Exemplo ilustrativo:** você possui 3.000 PBP e recebe um desafio de alguém com 3.400. Se aceitar, é você quem precisa pagar, embora o convite tenha vindo do adversário. Se o convite vier de alguém com 2.700, o tutorial prevê pagamento a você. Os números apenas ilustram a desigualdade; não permitem calcular o preço da luta.

#### Escolher e confirmar uma luta

O tutorial conduz o jogador pela lista da divisão, seleção de oponente, pagamento exigido e confirmação do desafio. Quando falta dinheiro, o assistente concede uma ajuda para ensinar o fluxo. Essa intervenção é parte do tutorial e não uma promessa de financiamento automático para todas as partidas.

Uma preparação coerente consiste em consultar o adversário, conferir o valor exibido, reservar dinheiro para necessidades e deslocamento, confirmar o confronto e então organizar a rotina até a janela da luta. O custo não compra a vitória: o personagem ainda precisa chegar em condição de disputar. [Fluxo de desafio](punch-club-2-quests.html#event%3AProLeagueTutorial).

#### Desafios recebidos e recusa

Ao receber um desafio, o jogador pode aceitá-lo quando possuir os recursos exigidos ou buscar outro confronto. O tutorial declara que a forma de recusar sem desonra é **estar envolvido em outra luta**. Não aceitar o desafio e não enfrentar ninguém leva à perda de PBP e de “respeito”, na linguagem da fala.

Esse “respeito” não foi identificado como gasto de **Respeito das Antigas**. RA pertence às fitas e à sua árvore de vantagens. Também não se deve inventar uma segunda carteira de prestígio apenas porque o tutorial usa a palavra em sentido social.

O prazo exato de resposta, o valor da perda e o momento em que outro compromisso passa a proteger contra a penalidade não foram reconstituídos. A alternativa de desafiar outra pessoa é confirmada; uma estratégia de ignorar indefinidamente todos os desafios sem consequências não é. [Tutorial de desafios](punch-club-2-quests.html#event%3AProLeagueChallengeTutorial).

#### Horário, presença e derrota técnica

O tutorial informa que as lutas profissionais **geralmente acontecem entre 18h e 23h30** e aponta onde consultar a próxima partida. A palavra “geralmente” é preservada: o compromisso exibido tem prioridade sobre uma generalização do horário.

Atrasar-se causa derrota técnica e desperdício do dinheiro investido, conforme a explicação. Isso torna alimentação, sono, deslocamento e trabalho parte da competição. Não basta reservar o valor para desafiar: também é preciso preservar as condições de comparecimento. [Horário e ausência](punch-club-2-quests.html#event%3AProLeagueTutorial), nós 46–48.

#### Ranking, PBP e promoções

As fontes conectam PBP à posição e à possibilidade de superar adversários, mas não expõem toda a fórmula de atualização da classificação. Não se afirma que cada vitória troca automaticamente as posições dos dois lutadores, nem que o ganho é sempre igual à diferença entre suas pontuações.

Há, entretanto, **ajustes de promoção confirmados nos grafos**:

| Marco | Operação confirmada sobre `_gpp` | O que não significa |
| --- | --- | --- |
| Conclusão da Liga do Silver. | Se estiver abaixo de 2.000, define 2.000. | Não soma 2.000 a qualquer saldo. |
| Promoção da segunda para a primeira divisão. | Se estiver abaixo de 5.000, define 5.000. | Não é prova de que atingir 5.000 sozinho substitua vencer a divisão. |
| Título da primeira divisão. | Se estiver abaixo de 9.000, define 9.000. | Não soma 9.000 como prêmio fixo. |

No evento de promoção à primeira divisão, o protagonista deixa a segunda e é adicionado à primeira. Barry descreve onze lutadores à frente do objetivo final. No título, o passe para a Cidade Alta ainda é associado a acontecimentos posteriores, incluindo a conversa sobre os donuts; obter o piso de pontos não equivale a pular toda a sequência narrativa. [Promoção](punch-club-2-quests.html#event%3AEvent_II-ProLDivision1), nós 61–65 e 74–76 · [Título](punch-club-2-quests.html#event%3AEvent_II-ProLChampion), nós 2–4 e diálogo sobre o passe.

#### O ciclo econômico da competição

Há duas pressões complementares. Desafiar alguém de maior PBP pode favorecer a ascensão, mas exige dinheiro. Aceitar um desafiante de menor PBP pode financiar a rotina, mas não dispensa preparação nem torna a vitória garantida. Trabalhar abastece a carreira; lutar pode reabastecer o orçamento e alterar as oportunidades seguintes.

**Exemplo ilustrativo:** o jogador dispõe de dinheiro suficiente para uma proposta cara, mas ficaria sem reserva para comida e transporte. Pode adiar a aceitação enquanto obtém recursos, respeitando o prazo exibido, ou buscar outro confronto permitido. Se houver um desafio pendente, simplesmente não lutar tem custo de PBP segundo o tutorial. A decisão envolve caixa, agenda, adversário e prestígio ao mesmo tempo.

### 24 — Lutas de missão, favores e condições especiais

**Tipo:** conteúdo narrativo apoiado no combate.

Há confrontos fora da rotina normal das ligas e pedidos que interferem no resultado desejado, como entregar uma luta. O requisito é o evento correspondente; gastos, recompensas, repetição e consequências dependem da missão.

**Exemplo:** aceitar um pedido para perder pode cumprir um favor e prejudicar o resultado esportivo. Não é evidência de que toda luta possa ser manipulada por um sistema universal de apostas. [Pedido de Silver](punch-club-2-quests.html#event%3AEvent_I-S1_ForfeitAFight) · [Combate narrativo na ponte](punch-club-2-quests.html#event%3ABridgeFight).

## 6 Economia e trabalho

### 25 — Orçamento e circulação de dinheiro

**Tipo:** sistema econômico da rotina.

O dinheiro circula entre trabalho, compras, serviços, transporte, desafios e missões. O jogador escolhe como repartir renda entre sobrevivência imediata, preparação e investimentos. Requisitos variam por fornecedor e etapa narrativa.

**Progressão e falha:** novos empregos e benefícios alteram renda e despesas; não eliminam todas as necessidades financeiras. Ficar sem dinheiro pode bloquear uma compra ou desafio e criar um ciclo de dificuldade para trabalhar. As ajudas de emergência são condicionais, não uma renda permanente.

**Exemplo:** uma promoção que oferece academia e moradia economiza despesas enquanto o vínculo estiver ativo. A perda do emprego pode desfazer essa vantagem. [Benefícios perdidos](punch-club-2-quests.html#event%3APoliceWorkThreeFailed) · [Pagamento profissional](punch-club-2-quests.html#event%3AEvent_II-ProL1_JoinProLeague).

### 26 — Empregos iniciais e ciclos de trabalho

**Tipo:** sistema de produção de renda.

Fazenda, produção de robôs e atividades ligadas ao lámen introduzem o trabalho remunerado. O jogador procura o responsável, desbloqueia o serviço e realiza as ações disponíveis enquanto sua condição permite. Não se presume que todos os empregos tenham o mesmo turno, consumo ou pagamento.

**Entradas e resultados:** tempo e necessidades sustentam o trabalho; o pagamento alimenta compras e treinamento. Missões e relações com o empregador ampliam oportunidades. Há eventos próprios de indisponibilidade e diálogos em que fome impede trabalhar.

**Exemplo:** produzir mais dinheiro hoje pode exigir gastar parte dele em alimentação antes de continuar. O rendimento deve ser entendido junto com o custo de manter o trabalhador. [Fazenda](punch-club-2-quests.html#event%3ABoboFarm) · [Fábrica](punch-club-2-quests.html#event%3ARobofactory) · [Lámen](punch-club-2-quests.html#event%3ANoodleMan).

### 27 — Facções, favores e promoções locais

**Tipo:** progressão de relações vinculada a empregos e missões.

Bobo, a Máfia Russa e a Yakuza articulam tarefas, favores e acesso a oportunidades. O jogador conversa, entrega objetos, resolve conflitos e cumpre os requisitos específicos do ramo. Algumas recompensas são acesso ou reconhecimento, não apenas dinheiro.

**Progressão e falha:** níveis e ramificações são liberados por eventos próprios. Uma tarefa pendente ou condição não atendida bloqueia a próxima etapa. Não foi demonstrada uma simulação geral em que todas as facções disputem territórios continuamente.

**Exemplo:** entregar um suplemento solicitado para melhorar a relação com um empregador exige abrir mão de usá-lo. No DLC, procurar as três facções por materiais é uma missão de abastecimento da oficina, não uma nova regra geral de diplomacia. [Bobo](punch-club-2-quests.html#event%3ABobo) · [Yakuza](punch-club-2-quests.html#event%3ANoodleMan) · [Ramo russo](punch-club-2-quests.html#event%3AUnlockRussianMafiaBranch).

### 28 — Carreira policial

**Tipo:** sistema de profissão com missões e benefícios.

A entrada exige progressão institucional, incluindo estudo das leis e o marco de PBP pertinente. Depois, o jogador cumpre plantões e atividades disponíveis, avança em patentes e participa de missões policiais. As exigências de estudo, reputação e serviço não são substituídas apenas por ter bons atributos.

**Entradas e resultados:** dedicação à carreira produz pagamento, promoção, acesso a espaços e vantagens. O custo inclui agenda e manutenção das necessidades. O evento de falhas repetidas confirma demissão e perda de apartamento, academia gratuita e pagamento regular; não se aplica essa consequência a uma única falha sem verificar seu contador.

**Exemplo:** a promoção e a melhoria de deslocamento podem facilitar a rotina, mas dependem do ramo alcançado. A decisão de avançar para detetive também se conecta ao bloqueio da academia de Mick. [Ingresso](punch-club-2-quests.html#event%3ATwoThousandGpp) · [Plantão](punch-club-2-quests.html#event%3APoliceWorkStart) · [Demissão](punch-club-2-quests.html#event%3APoliceWorkThreeFailed) · [Conflito de carreira](punch-club-2-quests.html#event%3AEvent_II-PoliceDetectiveWhenTrainer).

### 29 — Academia de Mick e trabalho de treinador

**Tipo:** sistema de profissão e desenvolvimento da academia.

Recuperar Mick e sua academia abre o trabalho com estudantes. Os grafos distinguem ações de treinamento físico, prática de técnicas e conversa. O jogador administra a sessão conforme sua disponibilidade e as condições dos alunos; não se trata apenas de acionar um turno de renda indiferenciado.

**Entradas e resultados:** tempo e ações de ensino produzem progresso dos alunos e da profissão. Vantagens podem acelerar o treinamento e reduzir o cansaço dos estudantes ao praticar técnicas. A progressão inclui novos patamares profissionais e histórias ligadas à academia.

**Falha e conexões:** faltas e fracassos têm eventos próprios, com restrições de acesso e retorno. Determinadas escolhas policiais fecham essa ramificação. **Exemplo:** variar entre prática e outras ações precisa considerar o cansaço dos estudantes, em vez de repetir indefinidamente a mesma técnica. [Treino físico](punch-club-2-quests.html#event%3AMickGymTrainersObj) · [Técnicas](punch-club-2-quests.html#event%3AMickGymAbilsObj) · [Conversa](punch-club-2-quests.html#event%3AMickGymSocObj) · [Falhas](punch-club-2-quests.html#event%3AMickGymThreeFailed).

### 30 — Moradia, serviços e benefícios condicionais

**Tipo:** subsistema de recompensas profissionais.

Apartamento, academia e vantagens de rotina podem ser concedidos pela carreira. O jogador utiliza os serviços enquanto satisfaz as condições de acesso; são benefícios em espécie, além do pagamento monetário.

**Progressão e falha:** receber um benefício muda o orçamento e os trajetos, mas não o transforma em propriedade incondicional. A demissão policial retira explicitamente vantagens. Os eventos `BlockPoliceBranch` e `BlockMickGymBranch` também demonstram bloqueios de ramificação, sem autorizar uma regra simplista de que todas as atividades das duas carreiras sejam incompatíveis desde o início.

**Exemplo:** um planejamento apoiado no apartamento policial precisa ser revisto depois da demissão. Não se deve combinar esse benefício com uma etapa de história na qual ele já foi revogado. [Apartamento](punch-club-2-quests.html#event%3ASkyApartment) · [Perda de benefícios](punch-club-2-quests.html#event%3APoliceWorkThreeFailed) · [Bloqueio policial](punch-club-2-quests.html#event%3ABlockPoliceBranch) · [Bloqueio de Mick](punch-club-2-quests.html#event%3ABlockMickGymBranch).

### 31 — Comércio, inventário e entregas

**Tipo:** subsistema de aquisição e circulação de objetos.

Lojas e outros fornecedores disponibilizam comida, consumíveis, equipamentos e itens específicos. O jogador compra, utiliza, guarda ou entrega objetos conforme a função. Ter um item de missão não implica poder consumi-lo como mercadoria comum.

**Entradas e resultados:** dinheiro ou recompensa de missão produz estoque; entregas consomem o objeto e podem avançar um evento. Catálogos e responsáveis mudam em momentos da campanha. O ramo de entregas usa pacotes e destinatários definidos; não foi identificado aqui um gerador infinito de rotas comerciais.

**Exemplo:** a entrega de um pacote a Silver verifica o evento e remove o item correspondente. A troca de Apu por Jai altera um serviço conhecido por causa de acontecimentos específicos. [Loja](punch-club-2-quests.html#event%3AApuShop) · [Entregas](punch-club-2-quests.html#event%3ADeliveryOffice) · [Pacote de Silver](punch-club-2-quests.html#event%3ASilver) · [Jai na loja](punch-club-2-quests.html#event%3AEvent_II-ApuShopJayWorker).

### 32 — Ajuda de emergência e recuperação da rotina

**Tipo:** mecanismos condicionais contra situações de escassez.

Há diálogos de ajuda quando o protagonista está sem dinheiro, com fome ou cansado, envolvendo personagens como Adriana, Henry e Bobo. O jogador procura essas interações para recuperar condições mínimas de agir.

**Entradas e resultados:** disponibilidade narrativa e condição do personagem dão acesso à ajuda prevista no evento. Não se fixa uma frequência, quantidade ou repetibilidade universal sem inspecionar a condição correspondente. O efeito é retomar a rotina, não substituir empregos e compras para sempre.

**Exemplo:** conseguir comida numa situação de bloqueio permite voltar a trabalhar. A existência dessa saída não garante socorro automático em qualquer lugar ou estado da história. [Adriana](punch-club-2-quests.html#event%3ADeadlock-Adriana-1) · [Henry](punch-club-2-quests.html#event%3ADeadlock-Henry-1) · [Bobo](punch-club-2-quests.html#event%3ABobo) · [Situação extrema](punch-club-2-quests.html#event%3AHardDeadlock).

## 7 Narrativa e exploração

### 33 — Multipasse e árvore de histórias

**Tipo:** sistema de acompanhamento da campanha.

O multipasse reúne acesso às informações e a árvore de missões. O tutorial apresenta alternativas simultâneas: levar o hambúrguer para Henry, procurar Bobo por trabalho ou visitar Silver. O jogador consulta o que está disponível e escolhe sua próxima ação.

**Entradas e resultados:** completar condições muda estados de missão e libera eventos, pessoas ou serviços. Os recursos gastos pertencem à tarefa concreta — item, dinheiro, tempo ou luta — e não a uma taxa universal para usar a árvore. Uma missão pendente pode impedir uma continuação, sem implicar necessariamente um prazo.

**Exemplo:** a árvore permite decidir entre buscar renda e avançar um contato. Não garante que todas as ramificações permaneçam abertas para sempre. [Tutorial da árvore](punch-club-2-quests.html#event%3AStoryTreeTutorial).

### 34 — Diálogos, escolhas e relações

**Tipo:** sistema de interação narrativa com conteúdo condicionado.

Conversar pode revelar tarefas, permitir aceitar ou recusar pedidos e abrir opções antes bloqueadas. Requisitos incluem conhecer o personagem, possuir o item ou estar no estado certo de missão. As escolhas podem mudar o resultado local e as interações seguintes.

**Entradas e resultados:** informações e decisões levam a acesso, recompensas ou conflitos; quando há pagamento ou entrega, o custo é explícito no evento. Não foi demonstrado um medidor universal de amizade aplicável a todos os NPCs.

**Exemplo:** aceitar o pedido de Silver para entregar uma luta cria uma obrigação específica, diferente de simplesmente aumentar uma barra de relação. [Pedido e alternativas](punch-club-2-quests.html#event%3AEvent_I-S1_ForfeitAFight) · [Recusa do telefonema](punch-club-2-quests.html#event%3AEvent_I-S1_ForfeitAFight_DeclinedCall).

### 35 — Exploração, esgotos e objetos de missão

**Tipo:** sistema de acesso e exploração de conteúdo autorado.

O jogador percorre lugares e trechos dos esgotos, interage com objetos, encontra personagens e enfrenta bloqueios. Portas e ramificações dependem de eventos e missões; descobrir um acesso pode encurtar percursos ou permitir alcançar um objetivo antes inacessível.

**Entradas e resultados:** exploração usa tempo e, quando há conflito, preparação para lutar. Produz objetos, contatos e desbloqueios. Um caminho bloqueado exige satisfazer sua condição; não há fundamento aqui para tratar a rede como dungeon procedural que se reorganiza a cada visita.

**Exemplo:** no DLC, a rota para o porão do reator pode exigir um desvio pelos esgotos antes da abertura do acesso direto da oficina. [Entrada](punch-club-2-quests.html#event%3AEnterSewerage) · [Ramificação da Resistência](punch-club-2-quests.html#event%3AUnlockResistanceSewerageBranch) · [Rota do reator](punch-club-2-quests.html#event%3AEvent_DLC-Reactor).

### 36 — Fitas, filmes e Respeito das Antigas

**Tipo:** sistema de coleção e vantagens de rotina.

O jogador encontra ou obtém fitas, assiste aos filmes e utiliza RA na árvore de vantagens. O tutorial associa vantagens a um filme e pede verificar o requisito para liberá-las. A coleção, portanto, não serve apenas para completar uma lista decorativa.

**Entradas e resultados:** obter a fita pode exigir dinheiro ou missão; assistir ocupa tempo e se conecta ao lazer. RA e condições atendidas permitem vantagens de trabalho, treino, recuperação e outras atividades. Não se assume que repetir indefinidamente qualquer filme gere RA sem limite.

**Exemplo:** uma vantagem que melhora o rendimento em determinado aparelho pode tornar uma sessão futura mais eficiente. O benefício deve ser avaliado junto com o custo de obter e assistir à fita. [Tutorial de RA](punch-club-2-quests.html#event%3AOSRTreeTutorial) · [Henry](punch-club-2-quests.html#event%3AHenry) · [Fitas de Mick](punch-club-2-quests.html#event%3AMickGymWatchedAllTapes).

### 37 — Memórias, chips e investigação

**Tipo:** conteúdo narrativo com ferramentas de acesso.

A campanha introduz investigação de memórias e manipulação de chips. O jogador obtém componentes e informações, procura os personagens certos e participa das sequências liberadas. Isso transforma conhecimentos anteriores sobre pessoas e instituições.

**Entradas e resultados:** objetos e requisitos de missão permitem acesso a revelações e novos objetivos. Não se trata de uma ferramenta universal com a qual o jogador possa hackear qualquer cidadão e escolher livremente um efeito. Bloqueios dependem do roteiro e dos componentes exigidos.

**Exemplo:** as memórias de Bobo contextualizam a fazenda, mas não constituem um painel de gestão da produção urbana. [Preparação do dispositivo](punch-club-2-quests.html#event%3AEvent_II-HackDevicePrequel) · [Dispositivo pronto](punch-club-2-quests.html#event%3AEvent_II-HackDeviceReady) · [Memória de Bobo](punch-club-2-quests.html#event%3AEvent_II-FlashbackBobo).

### 38 — Mudanças de lugares, campanhas pessoais e conteúdo opcional

**Tipo:** conjunto de conteúdos narrativos que modifica a rotina.

Recuperar a academia, lidar com a doença de Adriana, encontrar Apu, realizar entregas e participar de histórias pessoais pode mudar serviços e acessos. O jogador cumpre as condições de cada arco; alguns exigem recursos ou lutas, outros conversas e objetos.

**Progressão e falha:** uma alteração pode ser física, institucional ou apenas uma revelação. Fechar a academia numa ramificação ou trocar o atendente da loja não comprova uma simulação geral de economia, urbanismo ou população. Conteúdos identificados como `PreorderPet*` também devem ser tratados como opcionais e dependentes da edição/acesso; não como rotina obrigatória de toda campanha.

**Exemplo:** o hospital exige pagamento e decisões no arco de Adriana, mas essa dívida pertence à missão. A manutenção do robô, por outro lado, é uma atividade recorrente do DLC. [Hospital](punch-club-2-quests.html#event%3AEvent_II-AdrianaSickHospitalTalk) · [Fechamento da academia](punch-club-2-quests.html#event%3AEvent_II-PoliceDetectiveWhenTrainer) · [Conteúdo opcional de mascote](punch-club-2-quests.html#event%3APreorderPet).

## 8 Sistemas de Iron Fist

A expansão acrescenta uma história, liga e árvore de técnicas próprias, além da oficina e das injeções de nanomáquinas, conforme sua [descrição oficial](https://store.steampowered.com/app/2923090/Punch_Club_2_Iron_Fist/). Os detalhes a seguir vêm dos eventos e textos locais. A presença de robôs na história base não torna automaticamente suas mecânicas jogáveis parte do DLC.

### 39 — Oficina, robô e controle remoto

**Tipo:** sistema central da expansão.

A oficina apresenta o robô e MaMMa, a IA que orienta sua progressão. O jogador passa a administrar tarefas e estações, inicialmente por interação local. O acesso depende de iniciar o conteúdo e realizar sua introdução.

**Entradas e resultados:** missões abrem funcionalidades; estações permitem manutenção, trabalho e treino. Conectar MaMMa à rede libera o controle remoto pelo multipasse. A nova aba oferece comandos e acompanhamento da classificação, mas não remove as necessidades de carga e reparo.

**Exemplo:** depois do desbloqueio remoto, o jogador pode administrar a tarefa do robô sem voltar fisicamente à oficina a cada mudança. Antes disso, não se deve supor que a aba esteja disponível. [Introdução](punch-club-2-quests.html#event%3AEvent_DLC-WorkshopStart) · [Conexão](punch-club-2-quests.html#event%3AEvent_DLC-NetworkStart) · [Aba remota](punch-club-2-quests.html#event%3AEvent_DLC-TutorialRobotTab).

### 40 — Carga, durabilidade e manutenção

**Tipo:** sistema de necessidades do robô.

O tutorial separa duas medidas: **durabilidade** determina sua vida em combate; **carga** determina energia na luta e capacidade de realizar atividades fora dela. O jogador usa a mesa de reparos para durabilidade e a estação de recarga para carga.

**Entradas e resultados:** a recuperação nas estações leva tempo. Peças sobressalentes e baterias oferecem uma forma mais rápida de reparar e carregar; o tutorial aponta o Salão da Delegacia como um lugar para obtê-las. Esses itens são distintos dos componentes de fabricação.

**Progressão e falha:** um robô ocioso vai automaticamente à estação de recarga, segundo a introdução. Trabalhos podem parar por falta de energia ou vida; treino autônomo para quando precisa recarregar. Melhorias posteriores alteram o ciclo, mas não autorizam presumir desde o início um robô permanentemente disponível.

**Exemplo:** após uma luta, observar somente a carga pode deixar o robô com pouca durabilidade para a atividade seguinte. [Durabilidade](punch-club-2-quests.html#event%3AEvent_DLC-AfterFirstFight) · [Carga e consumíveis](punch-club-2-quests.html#event%3AEvent_DLC-AfterFirstFightPart2) · [Mesa de reparos](punch-club-2-quests.html#event%3ARobotsHubRepairStation).

### 41 — Treinamento assistido e autônomo do robô

**Tipo:** sistema de treinamento com duas modalidades.

O jogador pode desenvolver cada atributo por **treinamento do jogador**, com participação do protagonista, ou **treinamento do robô**, autônomo. Os nomes da localização incluem sessões “em equipe” e “individual”; a distinção funcional é a presença do jogador.

**Entradas e resultados:** o treinamento assistido exige um período específico e os recursos necessários à sessão. O autônomo é apresentado como sem duração fixa e sem exigência de recursos de entrada; continua até receber outra tarefa ou precisar recarregar a bateria. Portanto, “não precisa de recursos” no tutorial não significa ausência de consumo de carga.

**Progressão e falha:** atributos mais desenvolvidos ajudam na liga; indisponibilidade de recursos bloqueia o assistido e bateria baixa interrompe o autônomo. **Exemplo:** deixar o robô treinando enquanto o protagonista trabalha aproveita a autonomia, mas exige conferir sua carga antes da luta. [Tutorial das modalidades](punch-club-2-quests.html#event%3AEvent_DLC-FirstTrainingTutorial) · [Estação](punch-club-2-quests.html#event%3ARobotsHubTrainingStation).

### 42 — Trabalho autônomo do robô

**Tipo:** sistema de produção ligado à oficina.

Depois de pesquisar as fontes de materiais e liberar a estação, o jogador escolhe um trabalho na cápsula. O robô executa a tarefa sem exigir acompanhamento presencial contínuo. A lista de opções depende do progresso de desbloqueio.

**Entradas e resultados:** o trabalho produz os recursos correspondentes e utiliza a condição do robô. O tutorial diz que ele continua até perder toda a energia ou vida e depois vai à estação de recarga. Isso não torna recarga e reparo a mesma operação: é preciso observar as duas necessidades.

**Exemplo:** antes de um período longo de atividade do protagonista, atribuir um trabalho ao robô pode abastecer a próxima melhoria. Ordenar trabalho perto de uma luta pode, porém, deixá-lo sem condições de competir. [Liberação e funcionamento](punch-club-2-quests.html#event%3AEvent_DLC-FactoryAllAsked) · [Estação de trabalho](punch-club-2-quests.html#event%3ARobotsHubWorkStation).

### 43 — Materiais, plantas e fábrica

**Tipo:** sistema de produção e melhoria da infraestrutura.

Reabrir a fábrica exige **aço, microchips e fios**. O protagonista procura as três facções para obter recursos ou condições de fornecimento; o robô também participa da produção conforme os desbloqueios. Plantas são requisitos de acesso a melhorias, não um substituto para os materiais.

**Entradas e resultados:** receitas e reconstruções consomem os componentes exigidos e liberam produtos ou níveis. Os textos da fábrica mencionam chips, partes robóticas, nanorobôs e melhorias, condicionados ao avanço. A primeira melhoria de fábrica e a seguinte têm missões de obtenção de plantas distintas.

**Falha e exemplo:** sem planta ou materiais, o próximo produto permanece bloqueado. Gastar o aço disponível em uma fabricação pode adiar a melhoria que o jogador pretendia concluir; é uma disputa de estoque, não uma punição aleatória. [Reconstrução](punch-club-2-quests.html#event%3AEvent_DLC-Factory) · [Primeira melhoria](punch-club-2-quests.html#event%3AEvent_DLC-FactoryLvlUp1) · [Melhoria para nanorobôs](punch-club-2-quests.html#event%3AEvent_DLC-FactoryLvlUp2).

### 44 — Chips equipáveis e combinações de bônus

**Tipo:** subsistema de configuração robótica.

O tutorial chama os chips de portadores de estilos de luta robóticos. O jogador fabrica ou obtém chips, abre os espaços disponíveis e equipa os bônus desejados. As combinações exercem função semelhante à das vantagens das escolas humanas, mas com configuração própria.

**Entradas e resultados:** fabricação utiliza materiais e desbloqueios; equipar define os bônus ativos. Há chips que recuperam energia, afetam defesa ou criam compensações, como melhorar recuperação em troca de dano. Mais espaços dependem de progresso específico, incluindo reator e ajuda de um hacker no evento de Lil Bobo.

**Exemplo:** combinar um chip que reduz recuperação com outro voltado à sustentação exige observar o efeito final, em vez de somar apenas benefícios aparentes. O microchip usado como componente de fábrica não é automaticamente um chip equipável. [Fabricação inicial](punch-club-2-quests.html#event%3AEvent_DLC-PerfocardUnlock) · [Equipar](punch-club-2-quests.html#event%3AEvent_DLC-PerfocardTutorial) · [Mais espaços](punch-club-2-quests.html#event%3AEvent_DLC-Bonus1).

### 45 — Pontos de Robô Implacável e árvore robótica

**Tipo:** sistema de progressão de habilidades da expansão.

O robô recebe Pontos de Robô Implacável após cada luta; vencer rende mais, segundo o tutorial. O jogador utiliza esses pontos para liberar novas técnicas na árvore robótica, obedecendo a seus requisitos.

**Entradas e resultados:** participação em lutas produz pontos e o investimento libera opções. O resultado de uma derrota, portanto, não deve ser descrito como ausência automática de toda progressão. A pontuação não substitui dinheiro, PBP humano, RA ou materiais da oficina.

**Exemplo:** depois de perder, o jogador pode conferir se os pontos obtidos permitem uma opção útil antes de voltar a treinar. Não foram confirmados os valores exatos de vitória e derrota nem uma conversão entre as moedas. [Tutorial de pontos](punch-club-2-quests.html#event%3AEvent_DLC-BRP).

### 46 — Liga robótica e marcos de classificação

**Tipo:** sistema de competição da expansão.

A liga possui tela própria; o tutorial inicial instrui a começar pelo botão de lutar. O jogador prepara seu robô, enfrenta adversários e avança na classificação. A posição também aciona diálogos e missões de infraestrutura.

**Entradas e resultados:** treinamento, manutenção, técnicas e chips sustentam as tentativas; lutas produzem pontos e progresso conforme o resultado. O Cubo cria uma barreira acompanhada de orientações condicionais: construir o reator, avançar nos nanorobôs e procurar uma técnica nos esgotos, dependendo do que falta.

**Limite importante:** as fontes consultadas não autorizam aplicar à liga robótica a tabela de pagamentos por PBP, a taxa de Barry ou os horários da liga humana. **Exemplo:** perder para o Cubo pode abrir a procura por uma solução específica, em vez de exigir apenas mais níveis de atributo. [Primeira luta](punch-club-2-quests.html#event%3AEvent_DLC-FirstFight) · [Após a derrota para o Cubo](punch-club-2-quests.html#event%3AEvent_DLC-CubeAfterLose).

### 47 — Partes, aparência e pintura

**Tipo:** subsistema de personalização e fabricação.

O jogador seleciona partes na janela de customização e aplica as opções disponíveis. A fábrica e os desbloqueios fornecem acesso a partes; pintura depende de latas de tinta da cor desejada. O tutorial aponta a loja de Apu como fonte de outras cores.

**Entradas e resultados:** partes e materiais próprios permitem mudar o robô; tintas custeiam cores. Não se atribui bônus de combate a uma cor sem descrição que o confirme. O botão de reverter é explicado como reversão da configuração, mas a fala não basta para prometer reembolso universal de consumíveis.

**Exemplo:** escolher uma cor diferente requer a tinta apropriada, mesmo que a peça já esteja disponível. A personalização tem requisitos separados do treinamento dos atributos. [Tutorial na estação de recarga](punch-club-2-quests.html#event%3ARobotsHubEnergyStation) · [Primeiras partes](punch-club-2-quests.html#event%3AOnFirstRobotDetailsCrafted).

### 48 — Rede, estações e reator

**Tipo:** progressão da infraestrutura da oficina com conteúdo narrativo.

As melhorias resolvem limitações concretas: conexão à rede permite controle remoto; estações habilitam serviços; o reator é apresentado como solução para a recarga frequente. O jogador obtém acesso, componentes e instruções conforme a missão.

**Entradas e resultados:** construção exige trabalho de campanha e recursos pertinentes. O reator também é requisito mencionado para ampliar a capacidade de chips. A abertura do acesso pelo porão depende de ferramenta e melhoria; enquanto isso, o roteiro oferece um desvio pelos esgotos.

**Falha e exemplo:** não concluir o reator mantém pendentes as vantagens e missões que dependem dele. Construí-lo altera a rotina, mas também participa do plano da IA e de acontecimentos posteriores. Não é um sistema livre de abastecimento energético de todos os bairros. [Rede](punch-club-2-quests.html#event%3AEvent_DLC-NetworkStart) · [Reator](punch-club-2-quests.html#event%3AEvent_DLC-Reactor) · [Conclusão](punch-club-2-quests.html#event%3AEvent_DLC-ReactorFinished) · [Consequências](punch-club-2-quests.html#event%3AEvent_DLC-PostReactor).

### 49 — Nanorobôs, injeções e consequências da campanha

**Tipo:** subsistema de melhorias e conteúdo narrativo do DLC.

Níveis avançados da fábrica permitem produzir nanorobôs a partir de matéria biológica, conforme a explicação de MaMMa. A expansão inclui injeções de nanomáquinas e efeitos próprios. O jogador precisa alcançar a infraestrutura e os desbloqueios correspondentes; não recebe esse recurso junto da primeira refeição ou do primeiro treino.

**Entradas e resultados:** fabricação e uso dependem dos recursos e receitas disponíveis. Os textos locais de efeitos como `blind_rage_*` e `mindfulness_*` descrevem alterações de dano, recuperação ou custo energético do oponente. Não foi reconstituída a tabela completa de receitas, duração, aplicação e acúmulo; esses efeitos não devem ser confundidos com aumento permanente universal de atributos.

**Consequências narrativas:** a missão de introduzir nanorobôs na Fazenda Bobo participa da preparação contra o Cubo. Depois, a história aborda efeitos na população e uma correção por suplemento distribuído na loja de Apu. Essa cadeia é conteúdo autorado, não uma simulação aberta de epidemias ou genética urbana.

**Exemplo:** investir na melhoria da fábrica pode abrir a próxima etapa de preparação e, simultaneamente, avançar um problema narrativo que o jogador precisará enfrentar. [Produção avançada](punch-club-2-quests.html#event%3AEvent_DLC-FactoryLvlUp2) · [Requisitos contra o Cubo](punch-club-2-quests.html#event%3AEvent_DLC-CubeAfterLose) · [Consequências dos nanorobôs](punch-club-2-quests.html#event%3AEvent_DLC-PostNanoStart).

## 9 Exemplos integrados

### 9.1 Conciliar trabalho e luta profissional

**Situação ilustrativa:** o protagonista já ingressou na liga profissional e possui uma luta confirmada para um dia de trabalho. O adversário tem mais PBP, portanto há pagamento a considerar. Não se presume qualquer benefício policial ou da academia de Mick.

1. Consultar a data e a janela exibidas para essa partida; o tutorial informa o intervalo profissional usual de 18h a 23h30.
2. Conferir o dinheiro exigido e preservar uma reserva para alimentação e deslocamento. A quantia gasta para obter o confronto não substitui a preparação.
3. Avaliar saúde, energia, satisfação e Tônus antes de decidir quanto trabalhar.
4. Encerrar as atividades com margem para recuperação e viagem, conforme os tempos exibidos na partida real.
5. Comparecer à luta. Se faltar, o tutorial prevê derrota técnica e dinheiro desperdiçado.

Não há um cronograma minuto a minuto porque duração de trajeto, trabalho, recuperação e efeitos ativos não foram fixados. O ponto é que a janela esportiva limita quanto trabalho cabe naquele dia.

### 9.2 Receber um desafio de alguém com mais PBP

**Situação ilustrativa:** você tem 3.200 PBP, recebe um desafio de alguém com 3.600 e não possui dinheiro suficiente para a proposta exibida.

Receber o convite não inverte o pagamento: ao aceitar, você paga. O tutorial permite aceitar quando houver dinheiro ou desafiar outro lutador. Se não aceitar e também não participar de outra luta, há perda de PBP. A melhor decisão depende do prazo e das alternativas mostradas na interface, além do custo de preparar-se para cada adversário.

Um desafiante com menos PBP pode representar renda, mas esse caso não garante uma vitória fácil. Prestígio, dinheiro disponível e compatibilidade da preparação são avaliações diferentes. Nenhum valor de taxa ou prêmio foi inventado para o exemplo.

### 9.3 Preparar técnicas que consomem Tônus

**Situação ilustrativa:** uma nova técnica foi liberada e aumenta o custo total de Tônus mostrado na preparação.

O jogador verifica qual reserva será utilizada, treina para recuperá-la e considera que a cobrança se repete por round. Equipar a técnica apenas para consultar o custo ainda não consome a reserva. Se o conjunto exigir demais, pode ser necessário treinar mais ou alterar a configuração disponível.

Uma vantagem de Gold só deve entrar no planejamento se a sessão correspondente estiver liberada e seu efeito estiver ativo para a técnica indicada. Esse benefício não deve ser combinado automaticamente com toda preparação hipotética.

### 9.4 Manter o robô enquanto o protagonista cuida da própria rotina

**Situação ilustrativa:** a oficina e o treino autônomo já estão liberados, mas o reator ainda não foi construído.

Depois de uma luta, o jogador verifica durabilidade e carga separadamente. Repara o necessário e recarrega, ou usa peças e baterias disponíveis para acelerar a recuperação. Em seguida, atribui treinamento autônomo enquanto o protagonista realiza suas atividades.

O treino termina quando recebe outra ordem ou quando a bateria precisa de recarga. Antes de uma nova luta, o jogador volta a conferir a condição; não presume que a passagem de tempo tenha deixado o robô pronto para tudo. Se o objetivo seguinte for fabricar uma melhoria, pode trocar treino por trabalho, aceitando o custo sobre a condição robótica.

Controle remoto só entra nesse exemplo depois de conectar MaMMa à rede. Recarga aprimorada pelo reator e espaços adicionais de chips pertencem a etapas posteriores e não são acumulados desde o começo.

## 10 Fontes e limites da análise

### 10.1 Fontes utilizadas

| Fonte | Uso neste estudo | Limite |
| --- | --- | --- |
| [Atlas de história e missões de Punch Club 2](punch-club-2-quests.html) | Tutoriais, diálogos, parâmetros, condições e saídas dos grafos. Links de eventos estão distribuídos pelos tópicos. | Não contém toda a implementação das fórmulas de economia, treino e combate. |
| `resources.assets / lng_pt-br` da instalação local | Rótulos e descrições de atributos, Fúria, Tônus, efeitos, softwares, itens, robô e interfaces. | Texto de interface confirma o significado apresentado ao jogador, mas não prova sozinho toda a execução da regra. |
| `appmanifest_1161590.acf` da instalação local | Identificação da instalação: build Steam `20464979`. | Identifica o recorte consultado, sem prometer que outras versões tenham números idênticos. |
| [Descrição oficial de Iron Fist](https://store.steampowered.com/app/2923090/Punch_Club_2_Iron_Fist/) | Confirma escopo da expansão: oficina, robô, liga, árvore e injeções. | Material de apresentação, insuficiente para fórmulas e condições detalhadas. |

A instalação consultada está em `C:/Program Files (x86)/Steam/steamapps/common/Punch Club 2 Fast Forward/`. O SHA-256 de `Punch Club 2 Fast Forward_Data/resources.assets` é `6d7a5f57bbfe3175e738708df4cfa1a982b8df4f6b972ff7ba02b6453668e8ae`, idêntico ao registrado pelo atlas. As chaves de localização citadas permitem reencontrar os textos no recurso sem depender de uma tradução livre dos nomes.

O atlas registra extração em 17 de outubro de 2026, Unity `2022.3.30f1` e localização portuguesa com fallback inglês. Eventos de teste, depuração ou salto de campanha não foram usados como prova de opções normalmente disponíveis ao jogador. Os links para o atlas utilizam seus identificadores de seleção `event:`; o navegador precisa executar o JavaScript do arquivo para abrir a visualização correspondente.

### 10.2 Regras exatas efetivamente confirmadas

| Regra | Evidência direta |
| --- | --- |
| Liga do Silver: janela apresentada de 8h a 22h. | [Tutorial de calendário](punch-club-2-quests.html#event%3AEvent_7_FirstSilverVisit_FightTutorial_2), nó 8. |
| Liga profissional: janela usual de 18h a 23h30 e derrota técnica por atraso. | [Tutorial profissional](punch-club-2-quests.html#event%3AProLeagueTutorial), nós 46–48. |
| Aceitar desafio de alguém com mais PBP exige pagar; alguém com menos PBP paga ao jogador quando o desafia. | [Tutorial de desafios](punch-club-2-quests.html#event%3AProLeagueChallengeTutorial), nós 20 e 30. |
| Ignorar desafio sem enfrentar alguém causa perda de PBP. | [Tutorial de desafios](punch-club-2-quests.html#event%3AProLeagueChallengeTutorial), nós 21–23. |
| Pisos condicionais de 2.000, 5.000 e 9.000 PBP nos respectivos marcos. | [Silver](punch-club-2-quests.html#event%3AEvent_II-ProL0_AfterWinSilverLeague), [promoção](punch-club-2-quests.html#event%3AEvent_II-ProLDivision1) e [título](punch-club-2-quests.html#event%3AEvent_II-ProLChampion): comparação com saída `<` para atribuição do piso. |
| Selecionar técnica exibe custo de Tônus; a cobrança é por round. | [Tutorial de Tônus](punch-club-2-quests.html#event%3AFuelTutorial), nós 17 e 29. |
| Treino autônomo do robô continua até nova tarefa ou necessidade de recarga. | [Tutorial de treinamento robótico](punch-club-2-quests.html#event%3AEvent_DLC-FirstTrainingTutorial), nós 24–27. |
| Trabalho robótico continua até esgotar energia ou vida e então encaminha à recarga. | [Tutorial de trabalho](punch-club-2-quests.html#event%3AEvent_DLC-FactoryAllAsked), nós 19–21. |

### 10.3 Lacunas e cautelas de interpretação

Não foram confirmadas as fórmulas do preço de desafio, da taxa de Barry, do ganho ou perda de PBP por resultado, do desempate no ranking e da atualização completa das posições. Também ficaram em aberto o tratamento de adversários com PBP iguais, o prazo preciso para responder a desafios e a relação contábil entre desbloquear técnicas e a pontuação usada na classificação. As descrições dessas áreas se limitam às regras explícitas dos tutoriais e grafos.

Não foram tabelados todos os custos, durações, receitas, multiplicadores e condições de equipamentos, consumíveis, softwares ou nanomáquinas. A análise não mede desempenho em partida nem garante combinações de benefícios de carreiras divergentes. As consequências de missões não são generalizadas como regras universais da cidade.

**Cobertura editorial:** tempo e rotina, 01–07; corpo e treinamento, 08–15; combate e progressão esportiva, 16–24; economia e trabalho, 25–32; narrativa e exploração, 33–38; Iron Fist, 39–49. A contagem verifica os tópicos deste documento. A correspondência com a lista original permanece não verificável enquanto essa lista não estiver disponível.

**Limite do checkout:** `AGENTS.md` referencia as ADRs G004–G006 em `docs/adrs/README.md`, mas esse caminho e os registros não estavam presentes no material local consultado. Não se atribuem instruções presumidas a documentos ausentes. Esta entrega permanece um estudo externo de referência.
