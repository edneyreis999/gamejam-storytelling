# Sistemas e features de Punch Club

## Índice de features por sistema

- [Tempo e rotina](#tempo-e-rotina): relógio e passagem dos dias; calendário de lutas; duração, interrupção e intervalos das atividades; deslocamento.
- [Necessidades e condição física](#necessidades-e-condição-física): alimentação e estoque; energia cotidiana e sono; saúde e recuperação; humor e lazer; lesões e tratamento.
- [Atributos e treinamento](#atributos-e-treinamento): força, agilidade e vigor; exercícios e aparelhos; eficiência e esgotamento do exercício; perda diária e pisos de atributos; treino acompanhado.
- [Técnicas e desenvolvimento](#técnicas-e-desenvolvimento): pontos de talento; árvore básica e estilos; pré-requisitos; vantagens passivas; técnicas equipadas e espaços disponíveis.
- [Combate](#combate): preparação e leitura do adversário; resolução automática; rounds e ajustes; ataques, precisão e dano; bloqueio e esquiva; energia de combate; resultados.
- [Competições](#competições): liga por classificação; inscrições e calendário; temporadas e eliminatórias; combates supremos; clube da luta; sequências de confrontos e recompensas.
- [Economia e bens](#economia-e-bens): empregos; dinheiro e compras; comida e bebidas; aparelhos domésticos; poções e itens de quest; despesas recorrentes; renda alternativa.
- [Exploração e acesso](#exploração-e-acesso): mapa e transporte; descoberta de locais e serviços; restrições de acesso; encontros condicionais; áreas temporárias.
- [Relações sociais](#relações-sociais): amizade e reciprocidade; romance e manutenção do vínculo; ajuda a moradores e benefícios; mudanças por eventos narrativos.
- [Narrativa e quests](#narrativa-e-quests): objetivos e pré-requisitos; diálogos e escolhas; consequências e rotas; eventos únicos e repetíveis; arcos opcionais.
- [Progressão avançada](#progressão-avançada): carreira profissional, empresário e fama; gestão de gangue e respeito; disputa territorial; residência e serviços; acesso ao torneio final.
- [Dark Fist](#dark-fist): mala e identidade de herói; acompanhamento de crimes; pistas e investigação; emboscadas e confrontos; peças, reator e armadura; encerramento do arco.
- [Modos e suporte à experiência](#modos-e-suporte-à-experiência): tutorial; informações e estatísticas; salvamento; Fácil e Hardcore; nuvem e integração histórica com Twitch; conquistas.
- [Fontes, diferenças de versão e lacunas](#fontes-diferenças-de-versão-e-lacunas).
- [Conexões entre sistemas](#conexões-entre-sistemas).

## Escopo e critério de leitura

Catálogo em português de **Punch Club 1 e da expansão Dark Fist**, com spoilers. É referência externa para consulta: não é documentação aprovada de Ghork nem proposta de implementação. A análise dos lugares e de suas transformações permanece em [História e evolução da cidade](historia-da-cidade.md).

Cada entrada reúne ação e decisão, recursos envolvidos, acesso e consequências, conexões e exemplo. A base é o [atlas local de quests](punch-club-quests.html), complementado por anúncios oficiais e documentação comunitária. **Atlas** significa evidência de diálogos, condições e operações extraídos do jogo, não uma sessão jogada nesta pesquisa. Quando uma regra vem somente de guia comunitário, isso é indicado. Textos de interface ajudam a explicar sistemas corroborados, mas um identificador isolado não comprova uma feature ativa.

Três distinções orientam a leitura: **energia cotidiana** sustenta trabalho e treino; **energia de combate** é gasta e recuperada durante a luta. **Atributos** descrevem o corpo; **técnicas e vantagens** são desbloqueios que determinam opções e efeitos. **Fama** organiza a carreira esportiva; **respeito** organiza a progressão da gangue. Não se presume conversão direta entre esses recursos.

## Tempo e rotina

### Relógio, dias e duração das atividades

O jogador distribui o dia entre trabalhar, treinar, comer, descansar e circular. Atividades consomem tempo e recursos corporais; o dia seguinte também pode trazer perda de progresso dos atributos, conforme o modo. A decisão é quanto da rotina dedicar à preparação antes de voltar a obter renda. Por exemplo, dormir recupera energia, mas ocupa tempo que poderia ser usado na academia. O relógio do jogo não deve ser convertido automaticamente em uma simulação de 24 horas reais. [Game Mechanics — fonte comunitária](https://punch-club.fandom.com/wiki/Game_Mechanics).

O trabalho para por cansaço ou fome; sessões e ações possuem condições próprias, não uma duração universal. Descanso e exercícios oferecem acompanhamento do progresso durante sua execução. Não se fixa aqui a menor unidade de tempo nem uma regra única de cancelamento e pagamento parcial. O atlas contém o aviso `stop_work_not_enough_txt`; o [tutorial doméstico](punch-club-quests.html#q%3A10001) introduz a dependência entre treino e alimentação.

### Calendário, agendamento e intervalos

O calendário informa o dia e as próximas lutas; os painéis de liga mostram inscrição, disponibilidade e espera. O jogador deve encaixar recuperação e treino antes de competir. Há também intervalos particulares: Silver pode pedir que volte no dia seguinte, Tyler exige descanso entre confrontos e Mick limita a reinscrição na eliminatória. Esses controles impedem repetir indefinidamente uma ação lucrativa ou geradora de talentos. Exemplo: após uma tentativa de temporada, usar a espera para treinar em vez de procurar imediatamente outra inscrição. [Silver](punch-club-quests.html#e%3Asparring_pr), [Tyler](punch-club-quests.html#e%3Atyler_ask_fight), [Mick](punch-club-quests.html#e%3Amick_playoff).

Os prazos não são uniformes entre circuitos. Esta referência não estende a periodicidade da liga inicial a lutas narrativas, crimes ou torneios. O custo temporal do transporte está descrito em [Exploração e acesso](#exploração-e-acesso).

## Necessidades e condição física

### Alimentação, energia cotidiana e descanso

Comprar comida, manter alimentos em casa e escolher quando comer sustentam a rotina. Fome e energia insuficientes interrompem trabalho e treino. Dormir recupera energia; alimentos e bebidas têm efeitos distintos sobre as necessidades. O jogador decide entre gastar dinheiro em reposição rápida ou reservar tempo para descansar. Exemplo: conservar parte do salário para comida antes de pagar outra sessão de academia. [Tutorial de alimentação](punch-club-quests.html#e%3Atutorial_eat), [Getting started — fonte comunitária](https://punch-club.fandom.com/wiki/Getting_started).

Existem ajudas condicionais, como refeições oferecidas por Mick, e abastecimento associado às residências avançadas. Essas fontes não equivalem a comida gratuita ilimitada desde o início. [Ajuda de Mick](punch-club-quests.html#e%3Amick_food), [abastecimento ao passar o dia](punch-club-quests.html#e%3Aafter_day). As quantidades e taxas de recuperação não foram reconstruídas.

### Saúde, humor e recuperação

A saúde influencia os PV disponíveis na luta; chegar machucado pode tornar o mesmo adversário mais difícil. Humor interfere na eficiência do treino. Descansar, comer e buscar lazer entram, portanto, no planejamento esportivo. Televisão e convivência com Roy oferecem alternativas à rotina de trabalho. Exemplo: recuperar saúde antes de entrar no galpão e reservar lazer quando o treino estiver prejudicado pelo humor. [Getting started — fonte comunitária](https://punch-club.fandom.com/wiki/Getting_started), [convivência com Roy](punch-club-quests.html#e%3Ared_go_bar); no atlas, descrições `tooltip_sm_hp` e `tooltip_sm_mood`.

Saúde baixa e lesão são estados diferentes. Recuperar a barra não demonstra, por si só, a remoção de uma penalidade de lesão. Não se atribui à energia cotidiana uma proporção de conversão em energia de combate.

### Lesões e tratamentos

Os combates supremos podem causar lesões e reabrir ferimentos. Braço, perna e cabeça lesionados prejudicam diferentes partes do treino, segundo as descrições das vantagens negativas concedidas pelo evento. O jogador decide entre esperar recuperação e procurar o serviço de tratamento em Chinatown, acessível por encaminhamento de Casey. Isso conecta risco esportivo, tempo e dinheiro: uma derrota pode tornar mais cara a preparação seguinte. Exemplo: tratar uma lesão antes de voltar a treinar o membro afetado. [Pós-combate supremo](punch-club-quests.html#e%3Aafter_ult), [encaminhamento](punch-club-quests.html#e%3Acasey_trauma), [tratamento](punch-club-quests.html#e%3Achina_trauma).

O evento de tratamento remove explicitamente as lesões e restaura saúde. Não se generalizam probabilidades, preços ou duração da recuperação natural. A lesão roteirizada que antecede a viagem esportiva é tratada como evento narrativo, sem presumir que possa ser evitada pelo mesmo serviço.

## Atributos e treinamento

### Força, agilidade e vigor

O jogador escolhe quais atributos desenvolver para sustentar suas técnicas. Força aumenta dano e também o consumo de energia dos golpes; agilidade participa da precisão e da evasão; vigor favorece recuperação de energia em combate e proteção. A decisão envolve equilíbrio: um ataque mais forte pode se tornar difícil de sustentar. Exemplo: preparar vigor junto de uma estratégia de golpes fortes, em vez de avaliar apenas o dano anunciado. [Atlas local](punch-club-quests.html), descrições `tooltip_str`, `tooltip_agl`, `tooltip_stm`, `tooltip_eye`, `tooltip_enp` e `tooltip_arm` no atlas.

Esses atributos não são pontos de talento nem a barra de energia. Não se apresentam fórmulas de precisão, PV, proteção ou recuperação: as fontes comunitárias incluem hipóteses e reconstruções não verificadas nesta entrega.

### Exercícios, equipamentos e eficiência

Treinar em aparelhos distintos desenvolve combinações diferentes de atributos. Casa, academia e locais das rotas oferecem conjuntos de exercícios próprios. O jogador troca tempo, comida e energia por desenvolvimento corporal, escolhendo exercício e local conforme seu objetivo e seus custos. Exemplo: usar o supino para orientar o treino à força e a esteira ao vigor. [Training — trechos de Punch Club 1](https://punchclub.wiki.gg/wiki/Training).

O uso continuado de um exercício possui limite de sessão/esgotamento representado na interface, incentivando alternância. A fonte comunitária alerta que o círculo parcialmente preenchido não prova uma redução proporcional do ganho; por isso, não se afirma uma curva de rendimento decrescente. Humor, lesões e benefícios sociais também afetam o resultado. Não se importam dessa página os aparelhos de neurotreino de Punch Club 2. [Training — fonte comunitária](https://punchclub.wiki.gg/wiki/Training).

### Perda diária, pisos e treino acompanhado

Nos modos com perda de atributos, manter a condição exige treino recorrente. Certas vantagens estabelecem pisos abaixo dos quais o atributo não cai; comprá-las compete com outros desbloqueios. Exemplo: proteger um patamar alcançado antes de dedicar mais dias a outra prioridade. Os valores dos pisos devem ser conferidos na técnica e versão jogadas. [Perks and Traits — fonte comunitária](https://punch-club.fandom.com/wiki/Perks_and_Traits). O modo Fácil remove a perda de atributos, conforme a [atualização oficial 1.30](https://store.steampowered.com/news/app/394310/view/5222443045215244228).

Roy pode acompanhar o treino, condicionado à amizade, à ajuda no carro e à convivência. O jogador investe tempo na relação para obter apoio à preparação; não basta repetir convites. Exemplo: ajudar no conserto e depois combinar o encontro na academia. [Treino com Roy](punch-club-quests.html#e%3Ared_train). Treino com aparadores e sparring com Silver pertencem à obtenção de talentos, explicada a seguir.

## Técnicas e desenvolvimento

### Pontos de talento e pré-requisitos

Lutas e sessões específicas com Silver fornecem pontos para comprar técnicas e vantagens. O jogador escolhe entre ampliar opções imediatas ou avançar em direção a um desbloqueio mais distante. A compra pode exigir atributos e desbloqueios anteriores; possuir um atributo elevado não concede automaticamente o golpe correspondente. Exemplo: usar treino com aparadores para progredir na árvore, enquanto os aparelhos desenvolvem o corpo. [NPCs — fonte comunitária](https://punch-club.fandom.com/wiki/NPCs), [árvore e requisitos das técnicas](https://punch-club.fandom.com/wiki/Skills_and_Abilities).

Os ganhos dependem da atividade e do resultado. Não se usa a expressão “lutar sempre dá a mesma quantidade de pontos”, nem se fixa uma tabela de custos crescentes sem validar a versão.

### Árvores, estilos e vantagens

A árvore básica abre caminhos associados ao Urso, ao Tigre e à Tartaruga: força, agilidade e vigor, respectivamente. O jogador desenvolve uma combinação de atributos e desbloqueios; o estilo orienta a especialização. Exemplo: priorizar a árvore do Tigre ao construir um lutador focado em agilidade. [Skill Trees — fonte comunitária](https://punch-club.fandom.com/wiki/Skill_Trees), [descrição oficial](https://store.steampowered.com/app/394310/Punch_Club/).

Vantagens passivas alteram regras de treino ou combate e podem proteger atributos. Técnicas ativas precisam compor a seleção usada na luta. Comprar mais opções amplia o repertório, mas não significa executar todas ao mesmo tempo. Exemplo: uma vantagem de retenção corporal continua tendo função fora do ringue; um ataque aprendido precisa integrar a preparação do confronto. [Perks and Traits](https://punch-club.fandom.com/wiki/Perks_and_Traits), [Skills and Abilities](https://punch-club.fandom.com/wiki/Skills_and_Abilities). Não se inferem bônus ocultos dos estilos nem efeitos cumulativos de vantagens substituídas.

### Seleção e espaços de técnicas

A preparação tem espaços limitados; desbloqueios ampliam a capacidade de equipar técnicas. O jogador escolhe ataques, defesa e modificadores compatíveis com sua estratégia. Exemplo: reservar espaço para uma opção econômica em energia em vez de preencher o conjunto apenas com ataques caros. A seleção pode ser revista entre rounds. [Fighting — fonte comunitária](https://punch-club.fandom.com/wiki/Fighting), [Tips — espaços de técnicas](https://punch-club.fandom.com/wiki/Tips).

O atlas conserva textos sobre “pontos de foco”, mas isso não basta para afirmar uma moeda adicional ativa de configuração. O catálogo usa a seleção de técnicas corroborada pela interface descrita nos guias.

## Combate

### Preparação, automação e rounds

O jogador examina adversário, atributos e técnicas, configura seu conjunto e inicia o combate. Os golpes são resolvidos automaticamente; a intervenção estratégica se concentra na preparação e nos intervalos entre rounds. O tempo interno da luta não equivale ao calendário da rotina. Exemplo: ao perceber muitos erros ou gasto excessivo de energia no primeiro round, trocar a seleção antes do próximo. [Fighting — fonte comunitária](https://punch-club.fandom.com/wiki/Fighting).

### Ataque, defesa, precisão e energia de combate

Ataques combinam dano, precisão e custo de energia; bloqueio e esquiva oferecem formas de defesa. Técnicas e vantagens também podem modificar a energia do oponente ou outras condições da disputa. O jogador precisa sustentar o ritmo ofensivo e resistir à resposta adversária. Exemplo: um golpe de dano maior pode ser uma escolha pior se errar com frequência ou esgotar a energia necessária às ações seguintes. [Skills and Abilities](https://punch-club.fandom.com/wiki/Skills_and_Abilities), [atlas local](punch-club-quests.html), descrições de dano, precisão e consumo (`tooltip_mb_*`).

A energia usada aqui é a reserva da luta, com recuperação vinculada ao vigor. Saúde da rotina influencia os PV de entrada; energia cotidiana não deve ser tratada como a mesma barra. Acompanhamento de PV, energia e desempenho das técnicas permite diagnosticar a preparação. [Fighting](https://punch-club.fandom.com/wiki/Fighting); descrições `tooltip_f_energy`, `tooltip_sm_hp` e `tooltip_stats_nums` no atlas. Não se fixam probabilidades de acerto, ordem interna das ações ou regras de empate.

### Adversários e resultados

Vencer ou perder modifica a progressão conforme o circuito: classificação, recompensa, objetivo narrativo ou lesão. Assim, não existe uma única tabela de consequências para toda luta. Exemplo: um sparring serve ao desenvolvimento, enquanto uma derrota no circuito supremo pode prejudicar o treino posterior. [Sparring](punch-club-quests.html#e%3Asparring_fight), [combates supremos](punch-club-quests.html#e%3Aafter_ult). O modo Hardcore altera a evolução dos adversários; não se presume que todos cresçam junto do jogador no modo comum.

## Competições

### Liga por classificação e acesso profissional

Na liga dos iniciantes, o jogador se inscreve, acompanha o próximo adversário e disputa posições. Vitórias e marcos de classificação abrem eventos e objetivos; chegar ao topo conduz à etapa que concede a carteira profissional. O recurso em disputa é progresso competitivo, além dos ganhos de luta. Exemplo: tornar-se primeiro colocado habilita a temporada, em vez de representar imediatamente o título mundial. [Primeiro lugar](punch-club-quests.html#e%3Afirst_place_rookie), [vitória na temporada](punch-club-quests.html#e%3Aplayoff_win).

### Temporadas e eliminatórias

O jogador se inscreve em uma disputa eliminatória e precisa avançar por suas fases. Uma derrota encerra a tentativa; retornar exige respeitar o intervalo de reinscrição. O sistema conecta prontidão, sequência de resultados e licença profissional. Exemplo: após falhar, procurar Mick quando outra inscrição estiver disponível. O atlas documenta quartas, semifinal e final nos textos da interface, corroborados pelo fluxo de temporada. [Inscrição](punch-club-quests.html#e%3Amick_playoff), [resultado](punch-club-quests.html#e%3Aplayoff_win).

A “temporada suprema” aparece no percurso avançado criminoso, com seu próprio acesso; não é outra denominação da liga dos iniciantes. [Eliminatória suprema](punch-club-quests.html#e%3Abro_playoff), [encerramento](punch-club-quests.html#e%3Aend_playoff). Não se presume calendário anual ou competição sazonal online.

### Combates supremos e clube da luta

O galpão oferece um circuito clandestino, com avanço, renda e risco de lesão. O acesso vem do contato na academia, e as lutas não ocorrem todos os dias. O jogador decide aceitar maior risco em troca de progressão e dinheiro. Exemplo: visitar o galpão depois da indicação do levantador de pesos. [Indicação](punch-club-quests.html#e%3Agym_lifter_talk), [entrada](punch-club-quests.html#e%3Awarhouse1), [avanço até Don](punch-club-quests.html#e%3Aafter_yellow_win).

Os confrontos com Tyler, nos fundos do bar, formam outra sequência, com descanso entre lutas e um pedido de ajuda após vitórias acumuladas. Não são a mesma competição do galpão. Exemplo: avançar no clube da luta abre a questão de Mickey, conectando combate e relações locais. [Tyler](punch-club-quests.html#e%3Atyler_ask_fight), [pedido após vitórias](punch-club-quests.html#e%3Afight_club_5).

### Sequências especiais e recompensas

Rússia, prisão, filmagens, disputas de gangue e ilha reutilizam confrontos para objetivos diferentes. O jogador enfrenta etapas e adversários para obter retorno à cidade, reputação ou avanço narrativo. Exemplo: ganhar lutas na prisão participa do caminho de liberdade. [Prisão](punch-club-quests.html#e%3Aprison_afterfight), [Rússia](punch-club-quests.html#e%3Arussia_afterfight), [filmagem](punch-club-quests.html#e%3Amovie), [ilha](punch-club-quests.html#e%3Afianl). Não se presume recuperação completa entre adversários ou recompensa monetária em todos os contextos.

## Economia e bens

### Empregos, dinheiro e despesas recorrentes

Construção e entrega de pizza trocam tempo e condição física por renda. Os empregos dependem de descoberta ou apresentação; o jogador decide quanto trabalhar para financiar comida e preparação. Exemplo: a notícia no jornal abre o trabalho inicial, enquanto Casey oferece a atividade de entregas. [Jornal](punch-club-quests.html#e%3Atutorial_take_newspaper), [Casey](punch-club-quests.html#e%3Acasey_hi).

Alimentação, entrada na academia, sessões pagas e transporte pressionam o orçamento. Mais tarde, a estrutura da mansão inclui diária. Comprar equipamento ou gastar em carreira pode deixar pouco dinheiro para o ciclo seguinte. Exemplo: reservar dinheiro para as refeições antes de contratar outra atividade. [Academia](punch-club-quests.html#e%3Atutorial_gym_trainer2), [contrato](punch-club-quests.html#e%3Amanager_hi). Não se atribui aluguel à casa inicial sem evidência.

### Compras, consumíveis e equipamento doméstico

Comida e bebidas repõem necessidades com combinações diferentes de efeitos; aparelhos são bens duráveis que ampliam o treino doméstico. O jogador compara o desembolso inicial com o uso futuro. Exemplo: comprar uma esteira permite treinar em casa, reorganizando gastos de entrada e viagens. [Consumables — fonte comunitária](https://punch-club.fandom.com/wiki/Consumables), [Training — aparelhos de Punch Club 1](https://punchclub.wiki.gg/wiki/Training).

Poções oferecem melhoria temporária de atributo, com riscos associados ao uso repetido; não são técnicas aprendidas permanentemente. Itens de quest, como o aparelho auditivo e flores, servem a relações e objetivos. Exemplo: obter o aparelho auditivo participa de uma solução para o conflito de vizinhança. [Consumables](https://punch-club.fandom.com/wiki/Consumables), [aparelho auditivo](punch-club-quests.html#e%3Asport_acoustic). Não se transforma a organização da wiki em uma afirmação de que aparelhos e itens de quest são consumidos como comida.

### Fontes alternativas de renda

Além de empregos, há recompensas de circuitos e trabalho para Bobo, condicionado à resolução de seu arco e a intervalos entre cobranças. A decisão envolve disponibilidade e consequências narrativas; não é uma renda repetível sem limites. Exemplo: voltar para a cobrança quando Bobo indicar que os negócios tiveram tempo de gerar dinheiro. [Oferta](punch-club-quests.html#e%3Acamp), [trabalho de Bobo](punch-club-quests.html#e%3Abobo_work). Gestão de carreira e de gangue amplia o uso do dinheiro, conforme a progressão avançada.

## Exploração e acesso

### Mapa e transporte

O jogador escolhe destinos no mapa e decide entre caminhar, gastando tempo, e pagar ônibus para economizar deslocamento. Isso conecta dinheiro à rotina: visitar serviços próximos numa mesma saída pode reduzir viagens. Exemplo: combinar mercearia e academia antes de voltar para casa. [Getting started — fonte comunitária](https://punch-club.fandom.com/wiki/Getting_started); interface `TRAVEL_BUS` no atlas. Não se estabelece uma tabela de distâncias ou se atribui custo de viagem a toda convocação automática de luta.

### Descoberta, serviços e restrições

Conversas, classificação e quests liberam lugares ou ações em locais conhecidos. O jogador investiga indicações e cumpre condições para ampliar suas opções. Exemplo: Mick apresenta a academia; o contato com um frequentador revela o galpão. [Mick](punch-club-quests.html#e%3Amick_first_time), [levantador de pesos](punch-club-quests.html#e%3Agym_lifter_talk). Desbloqueio no mapa significa acesso, não construção de prédio.

As viagens à Rússia ou à prisão reorganizam temporariamente treino, alimentação e combate. Posteriormente, mansão ou covil substituem a base doméstica acessível. São consequências de rota, não destinos que o jogador pode visitar livremente desde o início. [Rússia](punch-club-quests.html#e%3Arussia_start), [prisão](punch-club-quests.html#e%3Aprison_start), [mansão](punch-club-quests.html#e%3Amanager_hi), [covil](punch-club-quests.html#e%3Alair_hi).

### Encontros e eventos condicionais

Deslocamentos e visitas podem disparar assaltos e acontecimentos. O jogador precisa considerar a condição física e o estado das quests ao circular. Exemplo: intervir no assalto à mercearia conecta luta, ajuda a Apu e novos contatos. [Assalto à loja](punch-club-quests.html#e%3Ashop_robber), [consequência](punch-club-quests.html#e%3Ashop_robber2), [assaltos posteriores](punch-club-quests.html#q%3A20007).

Não se repete como regra atual um limiar monetário de assaltos dos primeiros guias: o próprio [guia comunitário General Help](https://steamcommunity.com/sharedfiles/filedetails/?id=598795240) registra que patches invalidaram seu conselho original. Também não se interpreta vitória contra assaltantes como eliminação permanente de todo crime da cidade.

## Relações sociais

### Amizade, reciprocidade e serviços

Conversar, passar tempo com Roy e ajudar no carro mantém uma relação que oferece convivência, sparring e treino acompanhado. O recurso investido é tempo, com estados de relacionamento e disponibilidade como consequência. Exemplo: um convite recusado por falta de ajuda no carro indica que o benefício depende de reciprocidade. [Treino](punch-club-quests.html#e%3Ared_train), [sparring](punch-club-quests.html#e%3Ared_fight).

Outras relações concedem ajuda ou acesso por acontecimentos concretos: Mick oferece alimento sob condições; Apu aproxima o protagonista de Casey. Esses vínculos não comprovam uma barra universal de amizade para todos os moradores. [Mick](punch-club-quests.html#e%3Amick_food), [Apu](punch-club-quests.html#e%3Ashop_apu_pizza).

### Romance e manutenção do vínculo

A aproximação de Adrian envolve apresentação, flores para seu herbário e interações posteriores, incluindo conversa, presentes e romantismo. O jogador dedica tempo e itens ao relacionamento; o benefício “Apaixonado” reduz necessidades associadas à rotina de treino. Exemplo: completar a coleta abre a convivência e permite desenvolver o romance. [Flores e vínculo](punch-club-quests.html#e%3Agirl_love), [romantismo](punch-club-quests.html#e%3Agirl_romantic); descrição `perk_d_girl love` no atlas.

O vínculo exige atenção e pode influenciar a mudança de Adrian para a nova residência. A continuidade após a ausência do protagonista depende da rota e do relacionamento. Não se descreve casamento, filhos ou romance com múltiplos parceiros. [Reencontro](punch-club-quests.html#e%3Asister_hi), [convite](punch-club-quests.html#e%3Agirl_inv).

### Ajuda a moradores e mudanças narrativas

Problemas locais podem ser resolvidos por objetos, diálogos e combate, liberando relações e serviços. Exemplo: o conflito sonoro de Mickey leva ao aparelho auditivo e ao contato com Bobo. O recurso pode ser um item, dinheiro ou capacidade de vencer uma luta. [Mickey](punch-club-quests.html#e%3Agypsy_hi), [solução com Bobo](punch-club-quests.html#e%3Abobo_acoustic2). Benefícios e perdas sociais também decorrem de eventos únicos, como o destino de Roy na rota esportiva; não são todos reversíveis por repetir uma interação. [Partida para a Rússia](punch-club-quests.html#e%3Acutscene_to_ussr).

## Narrativa e quests

### Objetivos, pré-requisitos e escolhas

O painel de história apresenta objetivos e progresso; eventos alteram estados, concedem acesso e iniciam novas etapas. O jogador combina preparação com requisitos narrativos. Exemplo: alcançar o topo da liga leva à busca da carteira profissional e ao medalhão. [Primeiro lugar](punch-club-quests.html#e%3Afirst_place_rookie), [vitória na temporada](punch-club-quests.html#e%3Aplayoff_win).

Diálogos podem oferecer decisões com consequências, mas nem toda variação de resposta muda uma rota. No pedido de Silver para perder uma luta, o grafo consultado demonstra respostas de recusa; uma fala isolada não comprova uma opção jogável de vender o resultado. [Pedido de Silver](punch-club-quests.html#e%3Athird_place_rookie). Esse cuidado impede transformar texto residual em sistema de manipulação de lutas.

### Rotas, eventos únicos e repetição

A oportunidade esportiva conduz à Rússia; continuar o trabalho criminoso de Don conduz à prisão. Há intervenções de Mick e Casey durante a aproximação criminosa. Não se apresenta a primeira conversa com Don como uma escolha binária que determina instantaneamente todos os acontecimentos seguintes. [Don](punch-club-quests.html#e%3Adon_hi), [Mick](punch-club-quests.html#e%3Amick_street), [Casey](punch-club-quests.html#e%3Acasey_street), [prisão](punch-club-quests.html#e%3Acutscene_prison).

Ações repetíveis, como cobranças e sparring, convivem com revelações, desbloqueios e viagens únicos. O jogador pode usar atividades recorrentes para se preparar para uma etapa narrativa. Exemplo: lutar com Roy entre objetivos não repete a apresentação inicial ao amigo. [Cobranças](punch-club-quests.html#e%3Abobo_work), [sparring](punch-club-quests.html#e%3Ared_fight).

### Arcos opcionais

Flores, conflitos locais e a sequência dos esgotos aproveitam os mesmos sistemas de exploração, itens, diálogo e combate. Exemplo: a pizza especial abre um percurso de confrontos e contatos nos esgotos. [Pizza especial](punch-club-quests.html#e%3Acasey_spice), [esgotos](punch-club-quests.html#e%3Asewers_1). Esses arcos ampliam conteúdo sem transformar cada personagem ou quest em um sistema autônomo. Dark Fist acrescenta uma sequência própria, descrita abaixo.

## Progressão avançada

### Carreira profissional, empresário e fama

Após o percurso esportivo, Mick encaminha o protagonista a Din Kong. A carreira exige popularidade para organizar novas lutas; o jogador administra dinheiro e fama além da condição física. Filmagens e atividades de exposição fazem parte dessa etapa. Exemplo: preparar-se para confrontos de uma filmagem e usar a fama para habilitar a próxima luta profissional. [Encaminhamento](punch-club-quests.html#e%3Agood_brother), [contrato](punch-club-quests.html#e%3Amanager_hi), [filmagens](punch-club-quests.html#e%3Amovie), [Map and Locations — complemento comunitário](https://punch-club.fandom.com/wiki/Map_and_Locations).

O painel de carreira informa a fama necessária, mas o atlas não contém toda a configuração econômica das ações de gestão. Não se fornece tabela de investimentos, rendimentos ou perda diária de fama. Fama não substitui atributos nem garante a vitória nas lutas habilitadas.

### Gangue, respeito e disputa territorial

Na continuação criminosa, o irmão encaminha o protagonista à liderança de uma gangue. O jogador administra dinheiro e respeito e enfrenta líderes rivais pelo controle territorial. Exemplo: preparar um confronto de gangues para avançar na hierarquia criminosa e no caminho para a ilha. [Entrada na gangue](punch-club-quests.html#e%3Alair_hi), [guerra de gangues](punch-club-quests.html#e%3Agang_war), [vitória sobre rivais](punch-club-quests.html#e%3Awin_unranked).

Respeito é o requisito indicado pelo painel de gangue; não é fama esportiva com outro nome narrativo. O controle territorial é expresso pela sequência de vitórias e suas consequências, sem evidência suficiente para afirmar um mapa de conquista livre, fronteiras simuladas ou gestão individual de bairros. A economia detalhada da gangue continua uma lacuna.

### Residência, serviços e desfecho competitivo

Mansão e covil concentram moradia, treino e abastecimento. A mudança depende da rota e altera a logística cotidiana; na mansão, o contrato prevê cobrança diária e adiantamento. Exemplo: passar a treinar no porão e receber refeições na residência, reduzindo a dependência de compras externas. [Mansão](punch-club-quests.html#e%3Amanager_hi), [covil](punch-club-quests.html#e%3Alair_hi), [reposição diária](punch-club-quests.html#e%3Aafter_day).

O título esportivo ou a progressão criminosa conduz ao convite para a ilha e seus confrontos finais. O jogador precisa completar a rota correspondente; as duas residências não constituem uma sequência obrigatória na mesma campanha. [Título](punch-club-quests.html#e%3Awin_ranked), [convite criminoso](punch-club-quests.html#e%3Aend_playoff), [ilha](punch-club-quests.html#e%3Afianl).

## Dark Fist

### Mala, identidade de herói e acompanhamento de crimes

A expansão integra uma história paralela à campanha. Uma mala em casa indica crimes; o protagonista assume a identidade do Punho Negro. O jogador consulta os chamados e desvia tempo e preparação para atender ocorrências. Exemplo: a mala leva à investigação de roubos na cidade. O anúncio da versão 1.10 orientava iniciar uma nova campanha e procurar a mala por volta do sexto dia; isso é orientação de lançamento, não garantia de gatilho idêntico em toda edição. [Anúncio oficial de Dark Fist](https://store.steampowered.com/news/posts/?appgroupname=Punch+Club&appids=394310&enddate=1457703118), [mala](punch-club-quests.html#e%3Atake_case), [identidade](punch-club-quests.html#e%3Acrime_hero).

### Investigação, pistas e confrontos

Visitar vítimas, acompanhar pistas e enfrentar envolvidos encadeia o arco. Roubo de ração, laser desaparecido e animais sequestrados apontam para uma ameaça comum. A investigação modifica estados de quest e acesso a encontros, enquanto as lutas exigem a preparação habitual. Exemplo: ajudar Bobo numa emboscada produz pistas que depois passam pelo terraço e pela ponte. [Apu](punch-club-quests.html#e%3Acrime_apu), [laser](punch-club-quests.html#e%3Acrime_sport), [emboscada](punch-club-quests.html#e%3Acrime_bobo_ambush), [pista no terraço](punch-club-quests.html#e%3Aroof_hi).

Trata-se de investigação roteirizada, não de um simulador confirmado de criminalidade emergente ou de dedução livre. Alguns confrontos admitem nova preparação e tentativa após derrota. [Resultado da emboscada](punch-club-quests.html#e%3Aambush_after_fight). Não se fixa uma frequência uniforme para todos os chamados.

### Peças, reator e armadura

O jogador enfrenta oponentes e leva o progresso a Mack para reunir partes da armadura. O fluxo distingue parte inferior, peitoral/braços, capacete e a necessidade de um reator, obtido por confronto com Don. Há resultados sem obtenção de peça: não é correto prometer uma peça por vitória. Exemplo: depois de reunir a estrutura, buscar o reator para concluir a armadura. [Confronto de armadura](punch-club-quests.html#e%3Apower), [montagem com Mack](punch-club-quests.html#e%3Amack_power), [Don e o reator](punch-club-quests.html#e%3Adon_power).

São progressão de quest e transformações de inventário; não há base para generalizar isso como crafting de equipamentos, oficinas ou catálogo de armaduras. Os bônus numéricos e a utilização fora do arco não foram confirmados.

### Encerramento e relação com a campanha

Os confrontos finais revelam o papel de Fofucho, encerram a crise e devolvem o foco à investigação familiar. Exemplo: concluir o arco do herói não substitui a busca pelo assassino do pai. [Revelação](punch-club-quests.html#e%3Acat_final), [encerramento](punch-club-quests.html#e%3Ahero_last). A identidade de herói não deve ser tratada como uma terceira carreira equivalente às rotas de fama e respeito, nem como um modo separado de campanha.

## Modos e suporte à experiência

### Tutorial e informação ao jogador

As primeiras quests apresentam treino, alimentação, deslocamento e contatos; descrições da interface explicam atributos e preparação. O jogador aprende a interpretar custos antes de organizar sua rotina. Calendário, painel de ligas, árvore de talentos, ficha e histórico de objetivos apoiam decisões. Exemplo: consultar próxima luta e adversário antes de gastar o restante do dia. [Treino inicial](punch-club-quests.html#e%3Atutorial_garage), [encaminhamento de Mick](punch-club-quests.html#e%3Amick_first_time) e descrições `tooltip_hud_*` no atlas.

A vantagem Tactics Learner amplia os detalhes visíveis das técnicas, relacionando informação e desenvolvimento. [Perks and Traits — fonte comunitária](https://punch-club.fandom.com/wiki/Perks_and_Traits). As conquistas registram marcos, como chegar a posições na liga; são suporte ao acompanhamento da experiência, sem pressupor recompensas econômicas. [Página oficial — recursos Steam](https://store.steampowered.com/app/394310/Punch_Club/).

### Salvamento e versões

O jogo oferece salvamento de progresso; o atlas contém “Salvar e sair” e avisos de erro. A decisão de encerrar a sessão pertence ao suporte da experiência, não à economia da campanha. Exemplo: retomar uma campanha salva para continuar os objetivos. O texto “salvar só é permitido em casa” também está na localização, mas **não foi confirmado como restrição ativa universal**. A pesquisa não verificou frequência de autosave, slots nem comportamento de recuperação de uma luta interrompida.

A versão 1.10 anunciou sincronização de saves entre PC e mobile. É um recurso histórico documentado, sem teste de disponibilidade atual ou compatibilidade entre todas as lojas e consoles. [Notas oficiais de 2016](https://store.steampowered.com/news/posts/?appgroupname=Punch+Club&appids=394310&enddate=1457703118).

### Fácil, Hardcore e integrações históricas

O **Fácil**, introduzido na atualização 1.30, elimina a perda de atributos, alterando a pressão de manutenção da rotina. O jogador escolhe um modo que preserva seus ganhos corporais ao passar dos dias. [Atualização oficial 1.30](https://store.steampowered.com/news/app/394310/view/5222443045215244228), [histórico oficial mobile](https://apps.apple.com/za/app/punch-club/id1024951378).

O **Hardcore** faz os adversários evoluírem junto do jogador, conforme as notas da 1.10. Escolhê-lo muda a dificuldade da progressão; não significa morte permanente ou remoção de saves. A mesma atualização anunciou integração com **Twitch**, permitindo apostas de espectadores com pontos e recompensas do programa tinyRewards. Essa integração é suporte histórico de transmissão, não uma profissão de apostas para o protagonista. Disponibilidade atual não verificada. [Notas oficiais da 1.10](https://store.steampowered.com/news/posts/?appgroupname=Punch+Club&appids=394310&enddate=1457703118).

## Fontes, diferenças de versão e lacunas

Consulta realizada em **17 de outubro de 2026**. Os links próximos às entradas identificam a evidência usada; as categorias do índice são uma organização deste catálogo, não nomes oficiais de menus.

- **Base local:** [atlas de quests](punch-club-quests.html), com 85 registros e 186 grafos. Metadados: Unity `5.5.3f1`, `resources.assets / GameBalance / PathID 3213`, SHA-256 `de826211e0a95045adee2463ff57a4397f23b0926299f3dd7694abb46469ac3e`. Não se deduz a versão comercial apenas da versão Unity. Os textos de interface citados por chave estão no objeto `locales` embutido no HTML; os fragmentos abrem quests e eventos.
- **Fontes oficiais:** apresentação comercial de Punch Club, anúncios/notas da 1.10, anúncio da 1.30 e histórico mobile. Confirmam escopo e mudanças de produto, mas não substituem evidência da implementação de cada regra.
- **Fontes comunitárias:** páginas específicas de Punch Club 1 sobre treino, combate, técnicas, consumíveis e relações, além de General Help. O conteúdo indexado foi acessível na pesquisa, embora a abertura direta de algumas wikis tenha retornado bloqueio/403. Não se afirma uma inspeção integral de todas as páginas. Regras sem confirmação direta foram mantidas qualitativas e atribuídas à fonte.
- **Separação de jogos:** a página Training mistura seções dos dois títulos. Foram usados somente os trechos do primeiro jogo; neurotreino, seus equipamentos e outras regras da sequência foram excluídos. Não se importam sistemas de Punch Club 2: Fast Forward.
- **Alcançabilidade:** registros inativos, protótipos, eventos `demo_*` e falas sem entrada demonstrada não fundamentam sistemas adicionais. O retorno da Rússia usa `russia_afterfight`, não o registro inativo associado a `after_russia`. Rótulos de UI, como foco e restrição de salvamento, não foram promovidos sozinhos a mecânicas confirmadas.

### Lacunas que limitam regras específicas

| Tema | O que está sustentado | O que ainda exigiria validar em uma versão identificada |
| --- | --- | --- |
| Tempo e agenda | Atividades consomem tempo; calendários e intervalos existem | Duração exata de cada atividade, cancelamento, pagamento parcial e prazos por circuito |
| Necessidades e treino | Fome/energia limitam atividades; humor e lesões interferem no treino | Taxas de consumo, limiares, recuperação e relação precisa entre indicadores de esgotamento e ganhos |
| Combate | Seleção automática por conjunto equipado, rounds, PV e energia | Fórmulas, prioridades, probabilidades, empate e todos os efeitos ocultos |
| Talentos | Árvores, pré-requisitos, vantagens e espaços | Custos por versão, substituições e interação de bônus temporários com requisitos |
| Competições | Classificação, temporadas, circuitos e sequências distintos | Valores de recompensas, penalidades de ausência e recuperação entre todas as etapas |
| Gestão avançada | Fama e respeito habilitam progressão; residências alteram serviços | Catálogo completo de ações econômicas, custos, rendimentos e possíveis perdas de reputação |
| Dark Fist | Mala, sequência de crimes, investigação e montagem da armadura | Todos os intervalos, chances de peças, bônus da armadura e compatibilidade do arco com saves antigos |
| Suporte e plataformas | Modos e nuvem anunciados em versões identificadas | Restrições atuais de save, compatibilidade entre plataformas e funcionamento atual de Twitch/tinyRewards |

Não houve execução de uma campanha nesta pesquisa. As lacunas impedem usar este catálogo como especificação de balanceamento ou roteiro de reprodução exata; não impedem a consulta dos sistemas e suas relações.

## Conexões entre sistemas

| Sistema de origem | Recurso ou condição transmitida | Sistema relacionado | Exemplo e consequência |
| --- | --- | --- | --- |
| Tempo e rotina | Dias e janelas de disponibilidade | Competições | Preparar e recuperar o lutador antes da próxima inscrição/luta |
| Economia | Dinheiro convertido em comida e serviços | Necessidades e treinamento | O emprego financia alimentação e academia |
| Necessidades | Comida, energia, saúde e humor | Trabalho, treino e combate | Fome impede atividade; saúde baixa reduz PV de entrada |
| Treinamento | Força, agilidade e vigor | Técnicas e combate | Atributos satisfazem requisitos e alteram dano, precisão e sustentação |
| Combate e sessões com treinador | Pontos de talento e resultados | Desenvolvimento | Comprar técnicas amplia as opções da preparação |
| Desenvolvimento | Técnicas equipadas e vantagens | Combate e rotina | Seleção determina opções de luta; pisos protegem atributos |
| Competições | Classificação, licença e vitórias | Narrativa e acesso | Liderar a liga conduz à temporada e à carteira profissional |
| Combates supremos | Dinheiro, progresso e possível lesão | Economia e recuperação | A renda vem acompanhada do risco de prejudicar o treino |
| Exploração | Viagens e encontros | Tempo, economia e quests | Ônibus troca dinheiro por economia de tempo; visitas disparam eventos |
| Relações sociais | Apoio, benefícios e disponibilidade | Treinamento e necessidades | Roy acompanha o treino; romance concede benefício à rotina |
| Quests locais | Itens e favores concluídos | Relações e serviços | O conflito de Mickey aproxima o protagonista de Bobo |
| Narrativa | Rota, viagem e novos contatos | Progressão avançada | Rússia e prisão conduzem a continuações diferentes |
| Carreira profissional | Dinheiro e fama | Lutas profissionais | Popularidade permite organizar a próxima luta |
| Gangue | Dinheiro, respeito e vitórias | Disputa territorial | Vencer líderes rivais altera a hierarquia criminosa |
| Residência avançada | Treino e abastecimento concentrados | Rotina e economia | Mansão/covil reorganizam deslocamentos e serviços |
| Dark Fist | Chamados, pistas, peças e reator | Exploração, combate e narrativa | Investigar crimes conduz à armadura e ao encerramento do arco |
| Modos de dificuldade | Retenção de atributos ou evolução adversária | Treino e combate | Fácil remove perda de atributos; Hardcore altera adversários |
| Informação e salvamento | Leitura do estado e continuidade | Todos os sistemas | Calendário orienta o planejamento; save preserva a campanha |
