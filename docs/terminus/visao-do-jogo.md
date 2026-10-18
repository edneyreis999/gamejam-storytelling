# Visão do jogo

Status: em desenvolvimento.

Este documento reúne o conceito do jogo e as decisões confirmadas na entrevista com o autor. Os pontos em aberto ao final ainda precisam de definição.

## Escopo da entrega

A entrega para a **Ctrl+AI+Jam Week 02** contempla somente a parte de visual novel do jogo, com a campanha até a vitória no campeonato de guildas e um confronto obrigatório posterior contra um chefão.

## Premissa e abertura

Rheed narra o jogo, como no livro. O jogador é uma criança que chega à Noite da História na primeira cena. Depois, Rheed toma uma poção e coloca o jogador na pele de Ghork, um orc mirrado que acaba de chegar a Terminus, vindo de Daratrine.

Para consultar o passado de Ghork, use o [livro](../docs_externas/universo-coreto/AF_Miolo_Ghork_214Pgs_14x21cm_V3.pdf) e as [fichas de personagens da época de Daratrine](../docs_externas/universo-coreto/personagens/). Esses materiais são referências externas, não documentação aprovada do jogo.

## Exploração e objetivo

O jogador se desloca por Terminus como em Punch Club, entra nos estabelecimentos e realiza missões. Um portal no mapa de Terminus permite voltar à Noite da História, na pele da criança, no Coreto onde está Rheed. O portal fica acessível entre cenas; diálogos e batalhas precisam terminar antes dessa visita.

Vencer o campeonato de guildas de Terminus com o time de Ghork é o objetivo que conduz a campanha, mas não seu encerramento definitivo. A vitória revela a ameaça dos Ignotos e leva a um confronto obrigatório contra um chefão, incluído na entrega da game jam.

## Referências narrativas

Por preferência autoral, **Punch Club 1 é a referência narrativa principal; Punch Club 2 é complementar**. A inspiração inclui acontecimentos, encontros, conflitos, relações, reviravoltas e progressão da história, além do formato dos diagramas. Esses elementos servem como pontos de partida para adaptações ao passado de Ghork e ao mundo de Terminus, sem se tornarem automaticamente fatos do jogo.

O [roteiro para a próxima entrevista](proxima-entrevista.md) orienta o uso dessas referências para desenvolver o núcleo dramático da campanha.

## Estrutura da campanha e guildas

A Jornada do Herói serve como referência flexível para a transformação de Ghork. Seus marcos podem se combinar ou atravessar mais de um arco da campanha; não representam doze capítulos obrigatórios.

O primeiro arco trata da escolha entre três guildas. Cada guilda tem cinco missões sequenciais, das quais a primeira é obrigatória. O jogador pode intercalar o avanço entre elas. As três apresentações precisam estar concluídas antes do compromisso no confronto final desse arco.

A quinta missão de cada guilda apresenta sua estratégia para um mesmo confronto entre as três. Ghork pode ouvir as propostas para as quais cumpriu os requisitos. A escolha se torna irreversível ao confirmar a execução de uma estratégia, com essa consequência sinalizada antes da decisão. Resolver o confronto apoiando uma guilda encerra o arco; as outras duas passam a agir como inimigas. As relações construídas anteriormente podem ser reconhecidas nos diálogos, sem anular essa hostilidade.

A estrutura escolhida é **Decisões que se acumulam**, com três arcos. O detalhamento está na [apresentação da campanha](campanha-decisoes-acumuladas.html). Matrizes de acesso, exemplos de cenas e associações à Jornada apresentados como sugestões não são decisões narrativas definitivas.

No segundo arco, X/Y representam pessoas e alianças diferentes dentro da trajetória da guilda. O jogador faz duas missões curtas de apresentação, em qualquer ordem, e então assume um compromisso com X ou Y. Seguem duas missões exclusivas da rota escolhida e uma missão compartilhada que leva à classificação. São cinco missões jogadas e sete a escrever, com variações que reconheçam a guilda, sem criar seis campanhas independentes.

O terceiro arco faz as escolhas anteriores voltarem em cinco partidas: uma contra cada guilda rejeitada, quartas contra o grupo preterido em X/Y, semifinal contra heróis não recrutados e final contra um chefão fixo do torneio. A ordem entre as duas guildas rivais ainda é uma decisão de roteiro. Depois da final permanecem a revelação dos Ignotos e o confronto obrigatório pós-campeonato, distinto do chefão do torneio.

A semifinal tem cinco adversários, um de cada par de recrutamento. Se Ghork recrutou um integrante, o outro participa do time adversário. Se não recrutou nenhum daquele par, sorteia-se um dos dois. Participar do time adversário não implica ressentimento: os reencontros podem reconhecer amizade, gratidão ou rivalidade.

Uma bifurcação curta U/V, antes da final, reconhece as alianças e decisões anteriores e converge na disputa contra o mesmo chefão. Sua função concreta ainda será discutida. As escolhas principais determinam reencontros; as menores podem reaparecer em diálogos e condições de cenas, sem exigir uma partida própria para cada decisão.

## Ignotos e revelação após o campeonato

A vitória revela que Ekios está sendo atacada por Ignotos infiltrados, que influenciavam os acontecimentos da história em segredo desde o início. São sobreviventes ocultos da Grande Guerra, cujo objetivo é romper o selo e libertar os Ignotos que continuam no subsolo.

O passado compartilhado com *Daratrine: A Origem* distingue o aprisionamento ancestral da restauração do selo após a Grande Guerra. Essa restauração bloqueou a chegada de novos Ignotos, enquanto os que permaneceram na superfície foram combatidos. A sobrevivência dos infiltrados é uma revelação de Terminus diante do relato anterior de eliminação dos Ignotos da superfície; o selo continua intacto no início dessa infiltração.

A referência consultada para essa cronologia é `docs/GDD/03_Narrative/História_Inteira_de_Daratrine.md`, no projeto *Daratrine: A Origem*, disponível no checkout local `/Users/edney/projects/coreto/projectX`. Ela serve como referência do passado compartilhado, sem alterar a documentação daquele projeto nem incorporar automaticamente suas demais decisões ao jogo de Terminus.

A ligação concreta entre o campeonato e o plano de romper o selo permanece em aberto por decisão do autor.

## Batalhas

As batalhas usam uma rolagem de D20 contra uma dificuldade definida para a batalha. Cada herói recrutado concede +1; Ghork não conta para o bônus. Todos os recrutados acompanham as batalhas, permitindo um bônus de +0 a +5. O jogador vence quando:

```text
rolagem do D20 + quantidade de heróis recrutados > dificuldade da batalha
```

A igualdade não satisfaz a condição de vitória. Uma derrota em batalha obrigatória causa um revés narrativo e permite preparação e revanche, sem encerrar a campanha. Os detalhes desses reveses ainda precisam ser definidos.

Toda batalha obrigatória, incluindo os confrontos finais, deve ter chance de vitória com Ghork sozinho e sem gastar Ludos. Recrutar é opcional; a campanha completa deve funcionar com zero heróis recrutados. As cargas de nova rolagem reduzem o risco, mas não são requisito para avançar. A dificuldade e o ritmo de revanches ainda precisam ser definidos para que o percurso solo seja viável também na prática.

## Missões e recompensas

Há três tipos de missão:

- **Campanha principal:** missões que conduzem a escolha da guilda, sua trajetória em relação ao torneio e os confrontos finais. O segundo arco desenvolve alianças durante a fase de grupos e termina na classificação.
- **Missões secundárias:** concedem Ludos, moeda que permite alterar a história contada por Rheed por meio das compras descritas abaixo.
- **Missões de recrutamento:** são cinco missões opcionais, duas longas e três curtas, com dez heróis possíveis e até cinco recrutados. Cada missão oferece dois desfechos de recrutamento, um para o herói A e outro para o herói B; diferentes ações podem conduzir ao mesmo desfecho. Escolher um implica abrir mão do outro, inclusive quando uma opção de diálogo foi liberada com Ludos.

O recrutamento decorre da resolução de conflitos ou interesses diferentes entre os dois heróis. Esses conflitos podem envolver valores, prioridades ou preferências, sem exigir uma classificação universal de resposta certa ou errada. Os exemplos discutidos de roubo e decoração de estátua não constituem missões aprovadas.

O jogo é sobre fazer amigos e inimigos. Recrutar é a experiência esperada e concede a vantagem nas batalhas, mas o jogador procura aliados por iniciativa própria: a campanha principal não exige recrutamento. A possibilidade de concluir sem aliados é uma liberdade, não o percurso usado como referência narrativa principal. A expectativa de que a maioria recrute o máximo possível ainda precisa ser observada com jogadores.

Conhecer um conflito, resolvê-lo e recrutar são momentos distintos. R1 e R2 podem ser conhecidos e resolvidos no arco 1, mas o convite só fica disponível na entrada do arco 2, depois de escolher a guilda. R3 e R4 ficam disponíveis após concluir as duas missões exclusivas de X/Y. R5 abre ao conquistar a classificação, no fim do segundo arco. São dois recrutamentos longos e três curtos; a identificação de R2 e R4 como longos continua sendo a distribuição proposta na apresentação.

Concluir o conflito de recrutamento concede Ludos uma única vez, mesmo quando o convite fica para depois. Recrutar posteriormente não repete essa recompensa. O desfecho anterior determina o herói favorecido; liberar seu convite não troca automaticamente esse desfecho nem permite recrutar o outro integrante do par também.

A distribuição-base desejada, sem intervenções com Ludos, é a mesma em cada combinação de guilda e X/Y: dois recrutamentos abertos, dois pretos (uma alternativa de herói fechada) e um vermelho (missão fechada). A identidade das restrições varia por trajetória. A matriz concreta permanece proposta de balanceamento. Uma opção gratuita ainda pode ter sido descartada pelo desfecho de um conflito anterior; a contagem de cores não garante quatro aliados gratuitos em qualquer histórico.

Um bloqueio vermelho encontrado após a resolução do conflito impede o convite: Ludos permitem uma exceção para recrutar o herói favorecido. Se o conflito ainda não foi realizado quando o bloqueio passa a valer, o pagamento libera a missão inteira; concluí-la concede sua recompensa única e permite o recrutamento conforme o desfecho. Não se cobra um segundo desbloqueio para o mesmo acesso. Um bloqueio preto restringe uma das alternativas de herói, mantendo a outra gratuita quando compatível com o desfecho.

Depois de liberadas, as missões podem ser concluídas até um ponto de não retorno antes da primeira partida eliminatória. A passagem exige aviso e confirmação e permite cuidar das pendências, inclusive R5, antes de avançar. O convite de um recrutamento que depende de X/Y espera a resolução dessa rota; os demais não precisam esperar. Nenhum recrutamento é requisito para concluir a campanha.

## Compras com Ludos

### Opções de diálogo

Os Ludos representam a criança interferindo na história contada por Rheed. O narrador improvisa uma justificativa, por vezes absurda, para permitir algo que não estava previsto em seu relato. No jogo, essas intervenções podem ser diálogos previamente escritos; não exigem geração de texto durante a partida. Não se trata de Ghork pagando pela amizade dos personagens.

Algumas opções começam bloqueadas e são compradas no próprio diálogo, sem visitar o Coreto. Se não tiver saldo suficiente, o jogador escolhe uma alternativa gratuita e a cena avança. A oportunidade de usar aquela opção paga pode passar, mas a campanha continua possível.

Haverá oportunidades de intervenção nos três arcos; seus exemplos concretos e custos ainda serão discutidos. Esses diálogos podem abrir alternativas na campanha principal e acessos a missões ou soluções de recrutamento. A campanha principal sempre mantém um percurso gratuito completo. Um recrutamento opcional pode permanecer inacessível sem o pagamento; isso não bloqueia a história. Ludos não permitem recrutar os dois heróis de um mesmo par nem desfazer a adesão à guilda e a hostilidade estabelecida no confronto.

### Cargas de nova rolagem

No Coreto, Rheed vende cargas de nova rolagem para batalhas. Após falhar em uma rolagem de D20, o jogador pode consumir uma carga para rolar novamente; o novo resultado substitui o anterior.

É permitido gastar sucessivas cargas na mesma tentativa, até vencer, parar de gastar ou esgotar o estoque. Se o jogador parar ou ficar sem cargas após uma falha, a derrota segue a regra de revés e revanche descrita em Batalhas.

## Pontos em aberto

- **Detalhamento da campanha:** definir os grupos X/Y, o conteúdo das sete missões do arco 2, a função de U/V e as associações à Jornada do Herói.
- **Recrutamentos:** definir os cinco pares e conflitos, confirmar quais missões são longas e escolher a matriz de restrições por trajetória. Avaliar conteúdo e tempo disponíveis, além da contagem de cores.
- **Campeonato e selo:** o autor ainda vai definir como o torneio se conecta ao plano dos infiltrados para romper o selo.
- **Chefões:** definir a identidade e a preparação do chefão fixo do torneio e, separadamente, do chefão obrigatório após o campeonato.
- **Economia de Ludos:** definir preços das opções de diálogo e das cargas de nova rolagem, além das recompensas das missões.
- **Reveses:** definir as consequências narrativas das derrotas e como o jogador se prepara para as revanches.
