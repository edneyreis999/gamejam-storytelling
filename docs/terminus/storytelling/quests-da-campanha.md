# Quests de Terminus

Status: em desenvolvimento.

[Guia de storytelling](README.md) · [Visão e regras](../visao-do-jogo.md) · [Base narrativa](base-narrativa.md) · [Arco de Ghork](arco-de-ghork.md) · [Arco do campeão](arco-do-campeao.md) · [Acontecimentos](acontecimentos-da-campanha.md) · [Personagens](../personagens/README.md) · [Locais](../locais/README.md)

Roteiro de primeira versão para revisão autoral e futura implementação. Abrange campanha principal e cinco recrutamentos, com cenas, falas, escolhas e retornos. Não inclui novas cadeias de missões secundárias. Os diálogos são escritos para esta versão; não são transcrições do livro nem de Punch Club.

## Leitura e estado editorial

A estrutura e os acontecimentos identificados como confirmados vêm da visão e da base narrativa. **Todos os títulos de quests, diálogos, opções, reveses, distribuição de cenas e soluções adicionais deste roteiro são propostas.** Usar nomes do catálogo não os aprova. Este arquivo não substitui os registros de decisões.

Uma cena comum é escrita uma vez. As variantes indicam exatamente o trecho a substituir ou acrescentar, depois do qual a leitura volta ao texto comum. Texto entre colchetes descreve atuação, condição ou interface; não é fala. As opções numeradas são falas de Ghork, salvo indicação de criança ou interface. Só uma resposta de cada escolha é exibida. Perguntas de investigação podem ser visitadas em qualquer ordem; a conclusão informa quais são necessárias.

Os códigos Q identificam quests; E identifica cenas compartilhadas que integram essas quests. Não se confundem com A1–C7 do documento de acontecimentos. Uma cena não acrescenta automaticamente uma missão ao diário. O socorro antecede a apresentação de Virmura; a escolha e a retaliação concluem a quinta missão da guilda escolhida.

Direções de escrita propostas: Virmura usa frases diretas e humor seco, mantendo firmeza e atenção ao cuidado; isso experimenta a revisão sugerida nas anotações antigas, sem aprovar uma nova voz na ficha. A recuperação avança por elipses, sem número de dias ou cura declarada. A enfermaria recebe o atendimento e o abrigo permanece na sede como proposta de encenação. Nenhuma tarefa exige esforço incompatível com essa recuperação.

### Sumário de leitura

- [Mapa de quests e dependências](#mapa)
- [Abertura e cenas compartilhadas do arco 1](#abertura)
- [Quests da guilda de Virmura](#guilda-a)
- [Quests da guilda de Borun](#guilda-b)
- [Quests da guilda de Sevrak](#guilda-c)
- [Compromisso e retaliação](#compromisso)
- [Contrato, alianças e classificação](#arco-2)
- [Cinco recrutamentos](#recrutamentos)
- [Campeonato, invasão e encerramento](#arco-3)
- [Intervenções, derrotas e retornos](#retornos)
- [Referências de Punch Club](#referencias)
- [Revisão e decisões para o autor](#revisao)

<a id="mapa"></a>
## Mapa de quests e dependências

| ID | Quest ou bloco | Acesso e saída |
| --- | --- | --- |
| [E00](#e00) | Uma cadeira perto da história | Abertura; conduz ao socorro e a [Q-A1](#q-a1) |
| [Q-A1](#q-a1) | Um trabalho que cabe sentado | Apresentação de Virmura; libera deslocamentos, [Q-B1](#q-b1), [Q-C1](#q-c1) e [Q-A2](#q-a2) |
| [Q-A2](#q-a2) | O caminho de volta | Depois de [Q-A1](#q-a1); pesquisa de retirada |
| [Q-A3](#q-a3) | Quem fica sem atendimento | Depois de [Q-A2](#q-a2); define equipe disponível |
| [Q-A4](#q-a4) | Uma maca na porta | Depois de [Q-A3](#q-a3); testa a retirada fora das minas |
| [Q-A5](#q-a5) | A proposta de Virmura | Depois de [Q-A4](#q-a4); permite ouvir e executar a estratégia A |
| [Q-B1](#q-b1) | O corredor errado | Apresentação de Borun; libera [Q-B2](#q-b2) |
| [Q-B2](#q-b2) | A carga que chegou antes | Depois de [Q-B1](#q-b1); compara registros e relato |
| [Q-B3](#q-b3) | Borun não veio | Depois de [Q-B2](#q-b2); Ghork conduz uma entrevista |
| [Q-B4](#q-b4) | A carga não é de vocês | Depois de [Q-B3](#q-b3); cobrança no mercado, combate e recuperação de materiais |
| [Q-B5](#q-b5) | A proposta de Borun | Depois de [Q-B4](#q-b4); permite ouvir e executar a estratégia B |
| [Q-C1](#q-c1) | O movimento repetido | Apresentação de Sevrak; libera [Q-C2](#q-c2) |
| [Q-C2](#q-c2) | O que a régua não diz | Depois de [Q-C1](#q-c1); distingue medida e hipótese |
| [Q-C3](#q-c3) | Uma cópia sem o mestre | Depois de [Q-C2](#q-c2); testa a clareza do registro |
| [Q-C4](#q-c4) | Pode repetir na minha frente | Depois de [Q-C3](#q-c3); intimidação no coliseu, cobrança e duelo |
| [Q-C5](#q-c5) | A proposta de Sevrak | Depois de [Q-C4](#q-c4); permite ouvir e executar a estratégia C |
| [E01](#e01)–[E03](#e03) | Contrato, campeão e oferta | Cenas únicas distribuídas no arco 1; ver abaixo |
| [E08](#e08) | Aprender a sair do golpe | Preparação compartilhada antes de B4/C4, integrada à primeira dessas quests iniciada |
| [E04](#e04)–[E05](#e05) | Defesa e cancelamento | Final compartilhado da quinta missão escolhida; encerra arco 1 |
| [Q-X0](#q-x0) / [Q-Y0](#q-y0) | Uma reserva de retorno / Levar menos | Apresentações do arco 2, em qualquer ordem |
| [E06](#e06) | Um método para este trabalho | Depois de ambas; compromisso X/Y, integrado à segunda apresentação concluída |
| [Q-X1](#q-x1) → [Q-X2](#q-x2) | Antes de entrar / Até onde foi conferido | Duas missões exclusivas de X |
| [Q-Y1](#q-y1) → [Q-Y2](#q-y2) | O peso de cada coisa / A marca de retorno | Duas missões exclusivas de Y |
| [Q-20](#q-20) | O nome na lista | Missão comum: devolutiva, Daratrine, preparação e classificação |
| [R1](#r1) / [R2](#r2) | Um pátio, dois turnos / Os nomes no relato | Conhecimento e resolução desde arco 1; convite desde arco 2, sujeito à trajetória |
| [R3](#r3) / [R4](#r4) | Uma peça inteira / A chave da cisterna | Depois das duas missões exclusivas X/Y |
| [R5](#r5) | Uma vaga diante do público | Depois de [Q-20](#q-20), antes da primeira eliminatória |
| [Q-31](#q-31) / [Q-32](#q-32) | As duas guildas do outro lado | Duas partidas; primeira precedida do ponto de não retorno |
| [Q-33](#q-33) | A equipe que seguiu sem você | Quartas contra X/Y preterido |
| [Q-34](#q-34) | Gente conhecida, lado contrário | Semifinal, cinco adversários pela regra dos pares |
| [Q-35](#q-35) | O nome de Ghork | U/V, final e celebração |
| [Q-36](#q-36) | As portas da festa | Invasão e confronto com Neral, com transformação na mesma batalha |
| [E07](#e07) | Notícias que cabem numa conversa | Desfecho de [Q-36](#q-36) e retorno à moldura |

As quinze quests de guilda são conteúdo a escrever, não quinze tarefas obrigatórias por partida. O percurso mínimo completa as três apresentações e uma cadeia até sua quinta missão. Q-A1 ocorre primeiro por causa da recuperação; Q-B1 e Q-C1 mantêm ordem livre. As cadeias podem ser intercaladas até o compromisso. Ouvir uma quinta proposta não fecha as outras cadeias.

E01 ocorre ao procurar a primeira segunda missão de qualquer guilda. E02–E03 entram na apresentação que completar o trio Q-A1/Q-B1/Q-C1, antes do retorno ao mapa. São cenas únicas: nunca repetir o campeão ou o vendedor porque o jogador visitou outra guilda. E04 exige as três apresentações e ao menos uma proposta de quinta missão ouvida. Só estratégias efetivamente desbloqueadas podem ser executadas.

O arco 2 tem sete quests escritas: X0, Y0, X1, X2, Y1, Y2 e Q-20; cada percurso joga cinco. E06 não é uma oitava quest. As atividades da fase de grupos são narradas durante o trabalho e a preparação, sem acrescentar partidas obrigatórias de D20. A classificação é confirmada em Q-20; o contrato não compra a vaga no torneio.

### O que o roteiro precisa lembrar

Registrar, em linguagem de roteiro: apresentações concluídas; avanço por guilda; propostas ouvidas; guilda escolhida; X/Y e sua conclusão; desfecho de cada R; convite realizado ou pendente; intervenção já paga; Ludos já recebidos pelo conflito; contribuição a Dam ou adiamento; versão U/V; partidas vencidas. As respostas de tom só voltam quando uma cena indicar isso. Não há pontuação de moralidade, afinidade ou personalidade.

Remuneração pessoal de Ghork, dinheiro do contrato e Ludos são coisas diferentes. Valores, dificuldades, recompensas numéricas e preços não são definidos aqui. A campanha não recebe uma nova taxa, item obrigatório ou bônus de combate por causa de uma fala.

### Percursos e itens de missão

O autor pediu entregas entre lugares, busca de itens e quests em que Ghork procure alguém para tirar satisfação e entre em combate. Esta versão incorpora **dois combates novos de D20, em B4 e C4**, dentro das cadeias existentes. São posteriores aos salvamentos de B1/C1 e não os substituem. A distribuição e a encenação são propostas; a solicitação autoriza acrescentar esses confrontos ao roteiro.

| Quest | Receber ou buscar | Percurso e entrega | Efeito da entrega |
| --- | --- | --- | --- |
| B1 | Lista de Virmura; bolsa de materiais com Jorvi | Sede → mercado → sede | Conclui a tarefa e o encontro com Borun |
| C1 | Pacote de ataduras separado na sede | Sede → coliseu, entregar a Rask | Conclui a entrega após o encontro com Sevrak |
| A2 | Cópia sem nomes do registro de retirada | Enfermaria → casa de contratos → enfermaria | Elune aponta as referências que precisam ser conferidas |
| A3–A4 | Pedido de suporte e maca de demonstração | Sede → oficina → sede | Durn empresta o conjunto; teste e devolução completam A4 |
| B2–B3 | Registro de carga autorizado por Pirka | Mercado → casa de contratos → sede de Borun | Material conferido sustenta o procedimento da proposta |
| B4 | Fardo roubado com cordas e estacas de marcação | Sede → corredor de cargas → mercado → sede | Combate recupera a carga; recibo comprova devolução |
| C2–C3 | Cópia do procedimento e apontamentos de Elune | Escola → casa de contratos → escola | Revisão permite defender o método |
| C4 | Estojo de treino retido pelo veterano | Escola → coliseu → escola | Devolução e duelo respondem à intimidação; ressalva do relatório é discutida na volta |
| X1 / Y1 | Apoios ou carga leve preparados pela equipe | Oficina/mercado → entrada das minas | Conferência permite iniciar a investigação |
| R2 | Autorização de relato, cópia de registro e peça de treino avariada | Enfermaria → treino → oficina → enfermaria → apresentação | As fontes permitem escolher como apresentar o caso |
| R3 | Armação cedida para um dos projetos | Oficina → demonstração no espaço de treino → oficina | Destino irreversível favorece Korr ou Velka |
| R4 | Comprovante de depósito e chave da cisterna | Canteiro → mercado → canteiro | Permite escolher suspensão ou entrega garantida |
| R5 | Programa e materiais da apresentação | Coliseu → espaço de treino → coliseu | A execução do formato escolhido conclui o conflito |

São objetos de missão com origem e destino, sem inventário de equipamento, peso numérico, dinheiro obrigatório ou bônus. “Receber” e “entregar” são ações explícitas nos pontos indicados; o objeto não desaparece antes de o destinatário recebê-lo. Cópias autorizadas podem ficar com Ghork; originais emprestados são devolvidos. Em tarefas com carga pesada, transportadores já presentes realizam o esforço; Ghork acompanha e confere. Perder uma batalha não destrói a carga nem cobra uma segunda compra.

<a id="abertura"></a>
## Abertura e cenas compartilhadas do arco 1

<a id="e00"></a>
### E00 — Uma cadeira perto da história

**Base:** criança na Noite da História; Rheed narra e toma a poção; Ghork chega quase morto e Virmura o salva. **Proposta:** encenação a seguir. **Local:** Coreto, depois enfermaria. **Objetivo:** estabelecer o ponto de vista e chegar vivo ao início da campanha. Sem escolha de guilda, batalha ou recompensa.

[A criança encontra um lugar perto de Rheed. Ele vira o frasco entre os dedos.]

**Rheed:** Chegou bem na hora. A história começa com alguém que quase não chegou ao seu destino.

**Criança — escolha:**

1. **“Quem?”** — **Rheed:** Ghork. Guardem esse nome. Ele ficaria muito satisfeito de me ouvir dizendo isso.
2. **“Essa história acaba mal?”** — **Rheed:** Tem partes difíceis. Mas vamos chegar ao final juntos, sem pular nada.

**Rheed:** Ghork foi a Terminus atrás de trabalho. Mas, quando chegou, precisava primeiro de alguém que tratasse sua perna.

[Rheed bebe. O som da plateia cede à respiração de Ghork. A chegada é fragmentada; não se inventam acompanhantes identificados.]

**Ghork:** Eu consigo... só preciso...

**Virmura:** Não tente levantar. Olhe para mim.

**Ghork:** Isto é... Terminus?

**Virmura:** É. Você chegou. Agora fique comigo.

[O atendimento prossegue sem escolha de procedimento pelo jogador. Elipse. Ghork desperta estabilizado na enfermaria; a perna permanece enfaixada.]

**Ghork:** Eu tinha pensado numa apresentação melhor.

**Virmura:** Essa quase foi a última. Deixe o discurso para quando tiver fôlego.

**Ghork:** Foi você que me...?

**Virmura:** Fui. E ainda não terminei de cuidar de você.

**Conclusão:** socorro realizado; inicia Q-A1 em momento posterior da recuperação. Não declarar prazo de cura nem usar o atendimento como dívida de adesão.

<a id="e01"></a>
### E01 — O mesmo problema sobre a mesa

**Encaixe:** introdução única à primeira Q-A2, Q-B2 ou Q-C2 iniciada. O mentor acompanha Ghork à casa de contratos; os outros líderes estão presentes, com apresentação breve caso ainda desconhecidos. Essas presenças não substituem B1/C1. **Referência:** PC2-compromisso; ver fontes.

**Meruna:** Estes dois mapas não parecem descrever as mesmas galerias. Os relatos também não esclarecem isso. Antes de financiar uma investigação maior, preciso entender o que temos.

**Ghork:** Quer que a gente entre nas minas para conferir?

**Meruna:** Só depois de eu escolher uma guilda. Primeiro, vocês vão mostrar o que conseguem descobrir com os mapas e as fontes aqui fora.

**Virmura:** E como vão trazer a equipe de volta em segurança.

**Borun:** Voltar vivo costuma ser a melhor parte do trabalho.

**Sevrak:** Todas as guildas terão acesso às mesmas cópias?

**Meruna:** Sim. O pagamento é alto, mas o contrato será de uma só guilda. Preciso de uma equipe responsável pelo levantamento inteiro.

**Ghork — perguntas livres:**

- **“Por que não contratar quem já conhece as minas?”** — **Meruna:** Cada um conhece um trecho. Preciso de quem consiga juntar esses relatos e admitir o que ainda não sabe.
- **“O dinheiro pode ajudar na preparação para o campeonato?”** — **Meruna:** A guilda pode usar a parte dela no campeonato. Eu estou pagando pelo levantamento das minas. Ganhar na arena é com vocês.
- **“Posso ouvir as três propostas antes de escolher?”** — **Meruna:** Pode. Mas, quando defender uma delas aqui, estará assumindo um compromisso com aquela guilda.

**Meruna:** Quero saber de onde vieram as informações, como vão conferir os mapas e o que ainda ficará sem resposta. Vou ouvir as três guildas. Ghork, pode aprender com todas antes de decidir a quem vai se juntar.

**Saída:** volta à segunda missão que disparou E01. As demais segundas missões retomam o contrato sem repetir esta reunião. A pista cartográfica concreta é tratada na decisão P01, ao final; sua resolução não atribui a divergência a fraude ou geografia mutável.

<a id="e02"></a>
### E02 — Um nome anterior ao cartaz

**Encaixe:** depois da terceira apresentação. Conversa breve com Virmura e passagem no coliseu, integradas à entrega que acaba de terminar. **Base:** passado do campeão e rivalidade; **proposta:** modo de revelá-los.

**Virmura:** Já ouviu falar do campeão?

**Ghork:** Desde que cheguei, vi o nome dele mais vezes do que o meu.

**Virmura:** Torvak lutou ao lado de Orcquius e Glavius.

**Ghork:** Dos dois?

**Virmura:** Os três eram do mesmo time. Agora cada um segue seu caminho.

**Ghork:** Se eu vencer alguém que lutou ao lado de Orcquius...

**Virmura:** Você terá vencido Torvak. Primeiro conheça o homem. Não faça dessa luta um recado para o general.

[No coliseu, Torvak devolve a atenção a um veterano no meio dos cumprimentos.]

**Torvak:** Ele carregou dois dos nossos até a saída. Quem for contar como voltamos vivos precisa contar essa parte também.

[O público responde. Ghork aproxima-se depois.]

**Ghork:** Você lutou com Orcquius e Glavius?

**Torvak:** Lutei. Você é de Daratrine?

**Ghork:** Sou. Ghork.

**Torvak:** E agora anda com essas guildas que acham que podem me ensinar a comandar uma arena.

**Ghork — escolha:**

1. **“Quero chegar à final.”** — **Torvak:** Então tem muito trabalho pela frente antes da nossa próxima conversa.
2. **“Por que vocês se separaram?”** — **Torvak:** A equipe acabou. É tudo que vou dizer.

**Ghork:** Se eu chegar à final, vai lembrar do meu nome?

**Torvak:** Rask vai anunciar bem alto. Não tem como esquecer.

**Saída:** prestígio e ligação com Orcquius conhecidos em qualquer rota. A causa da ruptura não vira objetivo ou promessa de investigação. Segue E03.

<a id="e03"></a>
### E03 — Uma oferta para o corpo acompanhar

**Local:** entrada do coliseu. **Participantes:** Ghork e Savel. **Referência:** PC1-químico. Oferta conhecida, sem compra ou consumo presumidos.

**Savel:** Ghork. Ouvi sua conversa. Para chegar à final, vai precisar manter o ritmo dos treinos.

**Ghork:** E você vende uma solução para isso?

**Savel:** Tenho algumas preparações. Já ajudaram gente que não conseguia mais trabalhar por causa do desgaste.

**Ghork:** Minha perna ainda está sendo tratada.

**Savel:** Eu percebi. Preferi falar com você antes que se machuque tentando acompanhar os outros.

**Ghork — escolha:**

1. **“O que tem no frasco?”** — **Savel:** A fórmula depende de como o corpo está. Não seria responsável oferecer uma dose e deixar você sem acompanhamento. **Ghork:** Você ainda não disse o que tem dentro. **Savel:** Podemos conversar com calma no boticário.
2. **“Por enquanto, vou continuar com o tratamento que tenho.”** — **Savel:** Continue. Se precisar de outra coisa, já sabe onde me encontrar.

**Savel:** Boa sorte na seleção. Às vezes, só falta uma oportunidade para alguém mostrar do que é capaz.

**Ghork:** Uma basta para começar.

**Saída:** vendedor apresentado. Preços, efeitos e eventual consumo permanecem uma decisão de sistema; este roteiro escreve a campanha completa sem consumo. Não mostrar um botão de compra sem essas definições.

<a id="e08"></a>
### E08 — Aprender a sair do golpe

**Encaixe:** abertura da primeira B4 ou C4 iniciada, antes da notícia que leva à cobrança. Não repetir na outra cadeia. O código não indica ordem cronológica. **Locais:** sede de Virmura e espaço de Guedra. **Objetivo:** mostrar a passagem dos pequenos deslocamentos à preparação para lutar, sem declarar cura completa, prazo numérico ou ganho de atributo.

[Ao longo das atividades anteriores, os cuidados continuam. Uma elipse mostra Ghork voltando de uma caminhada sem precisar interrompê-la no mesmo ponto. Virmura confere sua condição antes de ele começar a praticar.]

**Virmura:** Pode começar a praticar movimentos curtos, com alguém acompanhando. Se a perna falhar, pare. Estar melhor não significa que você deva aguentar qualquer dor.

**Ghork:** Eu quero lutar. Também quero conseguir voltar andando.

**Virmura:** Guedra sabe adaptar o treino a quem está aprendendo. Vá falar com ela.

[No espaço de treino, Guedra observa Ghork antes de pedir uma tentativa.]

**Guedra:** Sou Guedra. Mostre como recua quando alguém avança. Não tente me vencer ainda.

**Ghork:** E eu preparando uma entrada triunfal...

**Guedra:** Prepare a saída primeiro.

[Práticas acompanhadas, separadas por elipses: Ghork aprende a guardar uma passagem de recuo e a observar a preparação do golpe. Não são batalhas, testes ou montagens de cura milagrosa.]

**Guedra:** Já pode enfrentar alguém sem depender de um resgate. Mas ainda precisa perceber quando é hora de recuar.

**Ghork — escolha:**

1. **“Posso começar por alguém que não seja o maior da arena?”** — **Guedra:** Pode. Saber escolher a luta também faz parte do treino.
2. **“Se eu deixar fecharem minha saída, pelo menos vou saber o que fiz errado.”** — **Guedra:** E vai precisar praticar. Saber qual foi o erro não faz seu corpo corrigir o movimento.

**Saída:** preparação demonstrada; retomar a notícia inicial de B4 ou C4. Virmura oferece esse cuidado antes da adesão, sem pedir promessa de guilda. A cena justifica a possibilidade de lutar, não uma vitória automática.

<a id="guilda-a"></a>
## Guilda de Virmura

As tarefas de A adaptam a aproximação por ajuda prática de PC1-Mick/Casey. A tensão entre apoio e exigência usa PC1-Silver. A cadeia não exige resolver R2 nem recrutar Sura. Fontes e limites em [referências](#referencias).

<a id="q-a1"></a>
### Q-A1 — Um trabalho que cabe sentado

**Acesso:** E00 concluída, em momento posterior do tratamento. **Local:** sede de Virmura. **Participantes:** Ghork, Virmura, Lala pelo colar; recado de Dam. **Objetivo:** combinar abrigo e trabalho e conhecer a guilda. **Base:** acordo confirmado; tarefas, voz e contato são propostas.

[Virmura põe uma caixa de ataduras perto da cadeira.]

**Virmura:** Separe as ataduras limpas das que precisam de lavagem. Sentado. Se cansar, me avise.

**Ghork:** Com esse trabalho, posso ficar aqui?

**Virmura:** Pode. Você ajuda no que conseguir enquanto se recupera. O atendimento de quando chegou não é uma dívida.

**Ghork — escolha:**

1. **“Quero ajudar. Só não sei quanto vou conseguir fazer.”** — **Virmura:** Comece por essa caixa. Ela não vai fugir se você precisar parar.
2. **“Então vou impressionar você com minhas ataduras.”** — **Virmura:** Deixe as limpas de um lado e já vou ficar impressionada o bastante por hoje.

[Ghork encontra no fundo da caixa tiras separadas para transporte de feridos.]

**Ghork:** Vocês também vão buscar os feridos?

**Virmura:** Vamos. E precisamos de gente que saiba encontrar o caminho de volta. Braços fortes não resolvem tudo.

**Ghork:** Eu quero entrar no campeonato. Se eu ganhar... quero ver continuarem dizendo que não sirvo para nada.

**Virmura:** Pode sonhar com o título. Por hoje, termine essas ataduras.

[Mais tarde, Ghork prepara o contato com Lala. Proposta de recarga: Virmura verifica e repõe mana quando necessário, como parte desse convívio, sem preço ou prazo fixado.]

**Ghork:** Lala disse que alguém que soubesse usar mana podia recarregar o colar.

**Virmura:** Eu posso recarregar. Depois fale com ela. Deve estar esperando notícias suas.

**Lala:** Ghork! Você chegou! Espera... onde é que você está?

**Ghork — escolha:**

1. **“Numa enfermaria. A perna estava pior do que eu pensava.”** — **Lala:** E quando você ia me contar? Tem alguém cuidando de você?
2. **“Encontrei uma curandeira. Ela se chama Virmura.”** — **Lala:** Ainda bem. Agora me conta o que aconteceu.

**Ghork:** Quase não cheguei vivo. Virmura me salvou. Vou ficar aqui até melhorar e ajudar no que conseguir.

**Lala:** Sem se forçar, ouviu? O resto você me conta depois. Dam quer saber como está sua perna, onde você está dormindo e se está comendo. Nessa ordem. Fez questão.

**Ghork:** Pode dizer que não tiram o olho de mim.

**Lala:** Vou dizer que estão cuidando de você. Vigiado? Você sempre dava um jeito de escapar.

[Elipse de recuperação. Ghork passa a tolerar pequenos deslocamentos; não há cura declarada.]

**Virmura:** Tenho duas entregas perto daqui: uma no mercado, outra no coliseu. Escolha por qual começar. E pare para descansar quando precisar.

**Conclusão:** apresentação A feita; abre Q-A2, B1 e C1. Conhecer/resolver R1 e R2 passa a ser possível conforme seus locais. Trabalho não concede adesão nem Ludos por inferência.

<a id="q-a2"></a>
### Q-A2 — O caminho de volta

**Acesso:** A1; E01 se ainda não vista. **Locais:** enfermaria e casa de contratos. **Objetivo:** levar uma cópia autorizada a Elune e voltar com as referências a conferir. **Participantes:** Virmura, Elune e Ghork; registros sem pacientes nomeados.

**Virmura:** Este registro descreve o resgate de um ferido. Vamos ocultar o nome. Para o contrato, só precisamos do trajeto.

**Ghork:** Diz: "Da passagem estreita até o ponto de troca da maca." Mas começaram a contar a distância de onde?

**Virmura:** E precisamos saber se dá para passar andando ou levando alguém numa maca.

**Ghork — investigação, ambas disponíveis:**

- **“Vou marcar os pontos que identificam o caminho.”** — **Virmura:** Marque só o que o relato diz. O que faltar, anote como pergunta.
- **“Quero saber quem carregava a maca.”** — **Virmura:** Uma equipe de resgate. O tempo que levaram não é o mesmo de alguém andando sozinho.

[Ghork organiza e recebe uma cópia sem dados pessoais. O objetivo passa a ser levá-la a Elune, na casa de contratos. A cópia registra o ponto de partida e a direção da retirada, conforme P01.]

**Elune:** Posso ficar com uma cópia? Preciso desse registro junto dos mapas para comparar.

**Ghork:** Virmura autorizou compartilhar o trajeto. Tirei os nomes.

**Elune:** Ótimo. Leve estas anotações. Antes de comparar o registro com os mapas, preciso que confirmem onde o trajeto começou.

[Ghork recebe os apontamentos e volta à enfermaria. Entregar a Virmura conclui a etapa de investigação.]

**Ghork:** Não parece muita coisa para ganhar um contrato.

**Virmura:** É menos vistoso do que prometer que sabemos tudo. Mas é o que podemos provar.

**Ghork:** Então vou apresentar bem o que temos.

**Conclusão:** ouvir as duas perguntas, consultar Elune e entregar seus apontamentos a Virmura abre A3. Não exige R2 nem transforma os feridos em pistas dos Ignotos.

<a id="q-a3"></a>
### Q-A3 — Quem fica sem atendimento

**Acesso:** A2. **Locais:** sede e oficina. **Objetivo:** montar uma escala sem esvaziar a enfermaria e buscar o material emprestado para a demonstração. **Participantes:** Virmura, Durn e Ghork.

[Ghork vê duas listas: atendimento e possível equipe da expedição.]

**Ghork:** Se levarmos todos que sabem fazer resgate, Meruna vai ver uma equipe enorme.

**Virmura:** E vai encontrar a enfermaria vazia se precisar de atendimento.

**Ghork:** É. Quantos podemos levar sem deixar a enfermaria descoberta?

**Virmura:** Para a demonstração, basta uma equipe pequena, cada um com sua tarefa. Depois calculamos quanto custa manter o atendimento e o trabalho de campo.

**Ghork — escolha:**

1. **“Eu registro quem fica e quem sai.”** — **Virmura:** Anote a função de cada um. Ninguém pode estar nos dois lugares ao mesmo tempo.
2. **“Quero explicar isso à Meruna.”** — **Virmura:** Explique. Só não prometa que a enfermaria vai bancar a expedição sem receber nada.

[Nas duas alternativas, Ghork prepara a mesma escala; muda quem introduz sua justificativa em A5. Virmura entrega um pedido de empréstimo de material.]

**Virmura:** Durn tem uma maca de demonstração e os suportes. Leve este pedido. A equipe carrega o material; você confere as peças.

[Na oficina, Ghork entrega o pedido.]

**Durn:** É emprestado para o teste, certo? Quero tudo de volta depois.

**Ghork:** Certo. Posso conferir as peças com você?

**Durn:** Pode. Fique de frente para mim enquanto explico como encaixam.

[Durn demonstra. Ghork acompanha a entrega à sede e apresenta o recibo a Virmura.]

**Ghork:** E ainda precisamos de gente e tempo para o campeonato.

**Virmura:** Precisamos. O contrato ajudaria a pagar esse trabalho. Não vai pôr mais horas no dia.

**Ghork:** Já ouvi gente prometer isso. Nunca vi conseguir.

**Conclusão:** escala definida e material recebido na sede, sem gasto do jogador; abre A4. Memória de tom: “registro” ou “explicação”, retomada na primeira fala de A5.

<a id="q-a4"></a>
### Q-A4 — Uma maca na porta

**Acesso:** A3. **Locais:** sede, área livre, e oficina na devolução. **Objetivo:** testar a coordenação e devolver o conjunto emprestado. **Participantes:** Virmura, Durn, Ghork e ajudantes sem identidade recorrente.

[Maca vazia com uma carga de treino. Ghork observa sentado; outros fazem o esforço.]

**Virmura:** Você orienta a passagem da maca. A equipe segue suas instruções.

**Ghork:** Para a esquerda, depois... Não, a minha esquerda.

[Ajudantes param antes da passagem.]

**Virmura:** Onde você quer que coloquem a maca?

**Ghork — escolha:**

1. **“Perto da porta. Vou usar os pontos da sala como referência.”** — **Virmura:** Tente de novo. Eles ainda não leem pensamento.
2. **“Posso marcar onde cada um deve parar?”** — **Virmura:** Pode. Confira se todos conseguem ver a marca.

[A nova orientação permite a passagem. A opção não muda os mapas nem concede estatística.]

**Ghork:** Melhor errar com a maca vazia.

**Virmura:** E anote a correção. Vamos mostrar como o teste melhorou o procedimento.

[Depois do teste, Ghork acompanha a devolução à oficina.]

**Durn:** Alguma peça cedeu?

**Ghork:** Não. Minhas primeiras instruções é que saíram tortas. Corrigi antes de continuarmos.

**Durn:** Então o teste serviu. Está tudo aqui.

**Conclusão:** procedimento testado e material devolvido; abre A5. A correção é parte da cena, sem punição ou teste de D20.

<a id="q-a5"></a>
### Q-A5 — A proposta de Virmura

**Acesso:** A4. **Local:** sede. **Objetivo:** conhecer a estratégia A antes de decidir. **Participantes:** Ghork e Virmura.

**Ghork, se escolheu registro em A3:** A escala está pronta. Quem atende na enfermaria não entra na lista da equipe de campo.

**Ghork, se escolheu explicação em A3:** Vou começar explicando por que parte da guilda precisa ficar na enfermaria.

**Virmura:** Depois mostramos o registro de resgate e as instruções que você testou. Meruna precisa saber o que conseguimos conferir e como vamos cuidar de quem voltar ferido.

**Ghork:** E o trecho do mapa que não conseguimos explicar?

**Virmura:** Vamos marcar que não sabemos. Não vou esconder um perigo de quem terá de entrar lá.

**Ghork:** Se eu apoiar vocês, Borun e Sevrak perdem esse contrato.

**Virmura:** Sim. Os dois têm planos para esse dinheiro. Você precisa saber disso antes de decidir trabalhar conosco.

**Interface — escolha:**

1. **“Quero conhecer outras propostas.”** — **Virmura:** Vá. Esta continua disponível até você assumir outro compromisso. [Retorna ao mapa; proposta A ouvida.]
2. **“Quero defender esta estratégia.”** — [Só habilitada depois das três apresentações; abre a confirmação de E04. Não efetiva adesão ainda.]

**Conclusão:** ouvir registra a proposta; executar e concluir E04 fecha a quest e o arco. Recursos de cuidado não passam a ser recompensa de recrutamento.

<a id="guilda-b"></a>
## Guilda de Borun

<a id="q-b1"></a>
### Q-B1 — O corredor errado

**Acesso:** A1 e melhora para deslocamentos. **Local:** mercado. **Objetivo:** levar materiais e sair de um assalto. **Base:** encontro confirmado; falas propostas. **Referência:** aproximação por incidente e ajuda em PC1, sem importar a batalha do assalto daquele jogo.

[Ghork chega ao mercado com a lista de Virmura.]

**Jorvi:** Ataduras e material de lavagem. Está tudo na bolsa. Confira antes de sair.

**Ghork:** Se estiver faltando algo, melhor descobrir aqui do que lá na enfermaria.

[O jogador recebe a bolsa. Na saída, dois assaltantes fecham o corredor de cargas.]

**Assaltante:** Deixa a bolsa e pode ir embora.

**Ghork:** Vão fazer curativo um no outro? Porque só tem isso aqui.

[Ghork protege a bolsa. Borun, junto de uma descarga próxima, interpõe o bastão.]

**Borun:** O carrinho vazio, Ghork! Empurre para cá!

[Ghork empurra o carrinho, dificulta a perseguição e segue a passagem aberta por Borun. Na área movimentada, ambos param.]

**Ghork:** Como sabia meu nome?

**Borun:** Ouvi quando você buscou a bolsa. Depois vi aqueles dois largarem o trabalho para seguir você.

**Ghork — escolha:**

1. **“Eu não percebi.”** — **Borun:** Agora sabe o que procurar. Neste mercado, um sorriso não é garantia de nada.
2. **“Achei que só estavam esperando para passar.”** — **Borun:** Eu também. Até deixarem passar uma abertura bem na frente deles.

**Ghork:** Obrigado por me tirar de lá. E por explicar o que viu.

**Borun:** Sou Borun. Minha guilda conhece os caminhos daqui. Até os que começam mal assim. Vou com você até sairmos dessa confusão.

**Ghork:** Você sabe como funciona o campeonato?

**Borun:** Sei. Sei também que o campeão quer os melhores horários para a equipe dele. Se vai entrar, escolha bem quem vai trabalhar com você.

[O jogador volta à sede e entrega a bolsa.]

**Virmura:** Demorou. O que aconteceu?

**Ghork:** Dois homens tentaram roubar os materiais. Borun me ajudou a escapar. Consegui trazer a bolsa.

**Virmura:** Sente um pouco. Já vi que a bolsa está inteira. Quero saber como você está.

**Conclusão:** bolsa entregue, apresentação B concluída; abre B2. Se completou o trio, executar E02–E03. Nenhum D20, recrutamento ou conhecimento prévio de Sevrak.

<a id="q-b2"></a>
### Q-B2 — A carga que chegou antes

**Acesso:** B1; E01 se necessária. **Local:** mercado. **Participantes:** Borun, Pirka, Ghork. **Objetivo:** separar memória do trajeto e registro de carga. **Referência:** PC1-Casey, trabalho cotidiano como entrada numa rede.

**Pirka:** O registro acompanha a carga. Quem olha só a data de chegada acha que eu fui com ela até o fim da galeria.

**Ghork:** E não foi?

**Pirka:** Fui até onde a carroça cabia. Depois passei a carga para quem ia seguir a pé.

**Borun:** Agora entende por que eu queria que perguntasse a ela?

**Ghork — investigação:**

- **“Onde aconteceu a troca?”** — **Pirka:** O ponto está descrito aqui. Copie a descrição junto com o nome. Já perdi uma tarde procurando um lugar que só me disseram como se chamava.
- **“Você chegou a ver o caminho depois da troca?”** — **Pirka:** Não. Se alguém disser que eu vi, mande essa pessoa conversar comigo.

[Ghork anota o limite do testemunho, sem preencher o trecho interno. A cópia registra o ponto de partida e a direção da entrada no trecho conhecido, conforme P01.]

**Ghork:** Então você percorreu menos do que o registro dava a entender.

**Borun:** E agora sabemos exatamente que parte ela pode descrever.

**Pirka:** E eu consigo voltar ao trabalho?

**Ghork:** Só preciso da cópia para levar a Elune.

**Pirka:** Leve esta. O original fica comigo. Preciso conferir a próxima carga.

**Conclusão:** após as duas perguntas, registro de carga e limite do testemunho obtidos; abre B3.

<a id="q-b3"></a>
### Q-B3 — Borun não veio

**Acesso:** B2. **Local:** casa de contratos. **Participantes:** Ghork e Elune; Borun no retorno à sede. **Objetivo:** conferir uma fonte sem depender da presença do mentor.

[Borun não chega à hora combinada. Ghork entrega a Elune a cópia autorizada por Pirka; ela abre os materiais de comparação.]

**Elune:** Você trouxe as perguntas ou Borun ficou com tudo?

**Ghork:** Trouxe. Só achei que ele ia pensar em perguntas melhores.

**Elune:** Podemos começar pelas suas.

**Ghork — escolha:**

1. **“Quero separar o que Pirka viu do que contaram a ela.”** — **Elune:** Então mantenha marcado onde ela passou a carga adiante. Depois desse ponto, precisamos ouvir outra pessoa.
2. **“Quero que outra pessoa possa conferir como chegamos à conclusão.”** — **Elune:** Anote de onde veio cada informação. Assim, quem tiver dúvida vai saber a quem perguntar.

[Elune mostra como separar as anotações e devolve a cópia com seus apontamentos. Ghork recebe o material, volta à guilda e o entrega a Borun, que está chegando.]

**Borun:** Fiquei preso numa descarga. Deu conta da conversa?

**Ghork:** Deu certo. Mas você podia ter avisado.

**Borun:** Podia. Vou combinar melhor os horários com Pirka.

**Ghork:** Não vou fingir que você me deixou sozinho de propósito, para ensinar uma lição.

**Borun:** Ainda bem. Eu podia me acostumar com uma desculpa dessas.

**Conclusão:** fontes organizadas, ausência reconhecida sem punição ao jogador; abre B4. Ghork não assume culpa pelo atraso do mentor.

<a id="q-b4"></a>
### Q-B4 — A carga não é de vocês

**Acesso:** B3; executar E08 se ainda não vista. **Percurso:** sede → corredor de cargas do mercado → banca de Jorvi → sede. **Participantes:** Borun, Ghork, Pirka, Jorvi e os dois assaltantes de B1. **Objetivo:** cobrar a devolução de um fardo roubado, recuperá-lo em combate e entregá-lo. **Proposta nova solicitada pelo autor. Referência:** PC1-Bobo, reclamação que leva a outro lugar e a confronto.

**Pirka:** Roubaram as cordas e estacas que separei para a demonstração. Dois homens no corredor: um levou o fardo e o outro bloqueou a passagem.

**Ghork:** Será que são os mesmos que me cercaram?

**Borun:** A descrição bate. Antes de ir atrás deles, descubra por onde pode sair. Você está melhor para lutar, mas ainda precisa se proteger.

**Ghork:** Vou recuperar a carga. Não vou lá bancar o invencível.

[Pirka descreve a marca do fardo. Ghork vai ao corredor e encontra os assaltantes tentando abrir a carga.]

**Ghork — abordagem:**

1. **“Esse fardo é da Pirka. Devolvam.”** — **Assaltante:** Hoje veio sem o velho?
2. **“Da outra vez, vocês tentaram roubar ataduras. Agora acharam algo que sabem vender?”** — **Assaltante:** Veio buscar a carga ou perder os dentes?

**Ghork:** Vim buscar a carga.

[Um deles avança; Ghork usa o corredor para impedir que os dois o cerquem ao mesmo tempo. **Batalha B4:** dupla tratada como um encontro de D20, sem rolagem obrigatória para cada assaltante.]

**Vitória:**

**Assaltante:** Leva! Não vale apanhar por isso.

**Ghork:** Então parem de roubar.

[Os assaltantes recuam. O jogador recolhe o fardo; Ghork chama os carregadores de Pirka para o transporte até a banca, sem arrastá-lo com a perna ferida.]

**Pirka:** É a nossa marca. Vamos ver se está tudo aqui.

**Jorvi:** Todas as cordas e estacas. Aqui está o recibo.

**Ghork:** Quero uma cópia para Borun.

**Pirka:** E me mostre como descreveu o caminho. Se eu precisar que você explique por fora, ainda falta arrumar o texto.

[Ghork mostra sua descrição; Pirka aponta uma referência vaga e ele a substitui pela banca visível na saída. Ela consegue acompanhar a indicação.]

**Derrota sem nova rolagem:** Ghork recua para a área movimentada antes de ficar cercado. O fardo continua com os assaltantes. Na sede, **Borun:** “Eles conseguiram fechar os dois lados. Na próxima aproximação, guarde a passagem por onde vai sair.” **Ghork:** “Vou recuperar o fardo. Primeiro preciso recuperar o fôlego.” O jogador pode preparar-se, visitar o Coreto entre cenas e voltar; sem pagamento, perda de outro item ou recrutar alguém. Na revanche, **Assaltante:** “Você de novo?” **Ghork:** “Vocês ainda estão com a carga.” Repetir apenas o combate, não a abertura ou as recompensas.

**Entrega final, depois da vitória:**

**Borun:** O recibo está aqui. E a carga?

**Ghork:** Pirka e Jorvi conferiram tudo. Também corrigi a descrição do corredor. Antes, só entendia quem já conhecia o lugar.

**Borun:** Leia como ficou.

**Ghork:** Passe pela área de descarga, ao lado da banca. Melhor do que escrever "pelo caminho de sempre" para quem nunca veio aqui.

**Conclusão:** recuperação e entrega registradas, B5 aberta. O combate demonstra competência adquirida; não revela que Borun preparou o assalto inicial nem faz os ladrões trabalharem para Torvak. Não há morte obrigatória ou prêmio em Ludos definido.

<a id="q-b5"></a>
### Q-B5 — A proposta de Borun

**Acesso:** B4. **Local:** sede. **Objetivo:** ouvir a estratégia B. **Participantes:** Borun e Ghork. **Referência:** PC1-Silver para mentor com interesses próprios, sem dívida ou luta combinada.

**Borun:** Vamos levar o registro da carga, o relato da Pirka e as instruções que outra pessoa conseguiu seguir. Esse contrato serve para pôr gente em campo e trazer informação que preste.

**Ghork:** Você também quer usar o dinheiro para resgates.

**Borun:** Quero. Tem contratante que só pensa no caminho de volta quando falta alguém.

**Ghork:** Meruna pode reclamar que os relatos estão incompletos.

**Borun:** E estão. Mostre o que conseguimos comparar e o que ainda falta conferir. Se prometer que nunca erramos, eu desminto na hora.

**Ghork:** Virmura cuidou de mim. Sevrak também me ajudou.

**Borun:** Escolher a nossa guilda não apaga isso. Mas também não faz os dois desistirem do que querem.

**Interface — escolha:**

1. **“Vou ouvir as outras propostas.”** — **Borun:** Ouça. Depois volte com uma decisão que consiga explicar. [Mapa; B ouvida.]
2. **“Quero defender este plano.”** — [Com as três apresentações concluídas, abre confirmação E04.]

**Conclusão:** mesma distinção entre ouvir e executar de A5; não garante adesão antes da confirmação.

<a id="guilda-c"></a>
## Guilda de Sevrak

<a id="q-c1"></a>
### Q-C1 — O movimento repetido

**Acesso:** A1 e melhora para deslocamentos. **Local:** coliseu. **Participantes:** Ghork, Sevrak, iniciante e veterano. **Objetivo:** fazer uma entrega e intervir verbalmente num treino abusivo. **Base:** encontro confirmado; falas propostas.

[Ghork trouxe da sede de Virmura um pacote de ataduras para Rask, com a orientação de entregá-lo na entrada administrativa. Antes de encontrar o destinatário, observa o veterano derrubar repetidamente um iniciante.]

**Veterano:** De novo. Vê se dessa vez continua de pé.

**Ghork:** Ele ergue o ombro antes de atacar. Espere o ombro subir e saia do alcance.

[O iniciante evita o ataque seguinte. O veterano se volta contra Ghork.]

**Veterano:** Quer mostrar como se faz?

[Ele tenta agredir Ghork. Sevrak intercepta o golpe e o desarma.]

**Sevrak:** O treino acabou para você.

**Ghork:** Eu só estava...

**Sevrak:** Eu vi. Agora explique o que percebeu.

**Ghork — escolha:**

1. **“Ele se preparava do mesmo jeito antes de cada ataque.”** — **Sevrak:** E o rapaz só reagia quando o golpe já vinha. Você percebeu o aviso antes.
2. **“O rapaz precisava aprender a escapar, não a cair mais uma vez.”** — **Sevrak:** E você soube explicar como. Mostre o que chamou sua atenção.

**Ghork:** O ombro. Ele mexia antes do resto do corpo.

**Sevrak:** Sevrak Vey. Na minha escola, saber observar assim tem utilidade.

**Ghork:** Ghork. Obrigado por me poupar da demonstração prática.

**Sevrak:** Faça sua entrega. Depois venha conhecer a escola. Precisamos de alunos que saibam mais do que copiar movimentos.

[Ghork encontra Rask e entrega o pacote.]

**Rask:** As ataduras de Virmura? Pode entregar. Ela pediu confirmação; leve este recibo.

**Ghork:** Levo. E preciso avisar: um veterano tentou me agredir no treino. Sevrak impediu.

**Rask:** Vou falar com os envolvidos. Obrigado pela entrega e pelo aviso.

**Conclusão:** entrega concluída, apresentação C feita, abre C2; E02–E03 se completou o trio. Sevrak não preparou o perigo; iniciante não vira recrutável. A omissão posterior de Rask pode ser cobrada em C4.

<a id="q-c2"></a>
### Q-C2 — O que a régua não diz

**Acesso:** C1; E01 se necessária. **Local:** sede de Sevrak. **Participantes:** Sevrak e Ghork. **Objetivo:** elaborar uma comparação que explicite suas premissas.

**Sevrak:** O que podemos concluir colocando uma cópia sobre a outra?

**Ghork:** Que o papel de cima impede a gente de ler o de baixo.

**Sevrak:** E além dessa observação indispensável?

**Ghork — escolha:**

1. **“Precisamos conferir os pontos de referência antes de comparar os desenhos.”** — **Sevrak:** Anote quais. Outra pessoa deve conseguir repetir o que você fez.
2. **“Os desenhos podem ser diferentes por mais de um motivo.”** — **Sevrak:** Liste as possibilidades. Depois procure informações que permitam eliminar alguma.

[Ghork prepara campos para origem da medida, referência e trecho descrito. As fontes autorizadas de entrada e retirada permitem preencher esses campos, conforme P01.]

**Ghork:** Você já sabe a resposta?

**Sevrak:** Sei que seria um erro dar uma resposta sem ter como sustentá-la. Quero ver como você chega à sua.

**Conclusão:** comparação preparada, sem resolver por suposição a causa dos mapas; abre C3.

<a id="q-c3"></a>
### Q-C3 — Uma cópia sem o mestre

**Acesso:** C2. **Local:** casa de contratos. **Participantes:** Ghork e Elune. **Objetivo:** submeter o procedimento à leitura de outra pessoa.

**Elune:** Sevrak quer que eu confira o resultado?

**Ghork:** E o modo como chegamos nele. Se precisa do mestre para explicar, o texto ainda não está bom.

**Elune:** Você escreveu "normalizar" aqui. O que exatamente quer que eu faça?

**Ghork — escolha:**

1. **“Vou escrever os passos em vez de deixar só esse termo.”** — **Elune:** Melhor. Agora posso seguir o que você fez, sem adivinhar o que quis dizer.
2. **“Vou incluir um exemplo, deixando claro que ele não é um dado das minas.”** — **Elune:** Deixe bem claro. Não quero ver alguém citando o exemplo como se tivesse sido medido lá.

[Ghork revisa; Elune repete a comparação até o limite das fontes disponíveis.]

**Elune:** Daqui em diante, faltam informações. Não posso preencher por você.

**Ghork:** Nem quero. Sevrak ia perguntar de onde tirei.

**Elune:** Eu perguntaria também.

[Elune devolve a cópia com a revisão. Ghork recebe o material e o entrega na escola; o pedido do iniciante em C4 só começa depois desse retorno.]

**Conclusão:** cópia compreensível sem o mestre e devolvida à escola; abre C4. Elune não entrega uma solução secreta exclusiva de C.

<a id="q-c4"></a>
### Q-C4 — Pode repetir na minha frente

**Acesso:** C3; executar E08 se ainda não vista. **Percurso:** escola → coliseu → escola. **Participantes:** Sevrak, Ghork, iniciante e veterano de C1, Rask. **Objetivo:** buscar um estojo retido, confrontar a intimidação e responder num duelo supervisionado. **Proposta nova solicitada pelo autor. Referência:** PC1-Bobo, assunto levado ao responsável em outro local e combate com retorno.

[O iniciante traz à escola notícia de um estojo de treino emprestado por Sevrak. O veterano se recusou a devolvê-lo e mandou Ghork buscá-lo pessoalmente.]

**Iniciante:** Ele quer que Ghork repita a explicação sobre o ombro. Mas sem você por perto, Sevrak.

**Sevrak:** Vou falar com Rask para devolverem o estojo.

**Ghork:** Eu vou buscar. Quero ver se ele repete isso na minha frente.

**Sevrak:** Você está preparado para um duelo supervisionado. Se aceitar lutar, exija um juiz. Não precisa se arriscar para defender meu orgulho.

[No coliseu, o veterano está com o estojo.]

**Ghork:** Disseram que você queria falar comigo.

**Veterano:** Quero ver se sabe lutar ou só dar palpite.

**Ghork:** Primeiro, devolva o estojo. Não é seu.

**Rask:** Vou recolher o estojo para devolução. Fui avisado da agressão e devia ter impedido essa intimidação. Se quiserem lutar, será na área de duelo, comigo supervisionando.

[Rask recolhe o estojo; a restituição não depende de a vítima vencer uma luta. O veterano desafia Ghork, que aceita.]

**Ghork — resposta:**

1. **“Queria me ver lutar? Vamos.”** — **Veterano:** Espero que tenha aprendido mais de um movimento.
2. **“Antes eu vi de fora. Agora vou ver de perto.”** — **Veterano:** Quero ver você terminar essa frase deitado no chão.

**Rask:** Quando eu mandar parar, os dois param. Encerro a luta se alguém não puder continuar.

[**Batalha C4:** duelo de D20. Ghork observa a preparação dos golpes, mas o conhecimento não garante sucesso automático.]

**Vitória:**

**Rask:** Acabou. Ghork venceu.

**Ghork:** O rapaz aprendeu quando alguém deu uma chance. Você podia ter tentado ensinar.

**Veterano:** Já ganhou. Precisa fazer discurso também?

**Ghork:** Quero pegar o estojo e ir embora.

**Derrota sem nova rolagem:** Rask interrompe o duelo; **Veterano:** “Conselho não vence luta.” **Ghork:** “Essa tentativa não venceu. Vou voltar.” O desafio permanece aberto, sem retirar o estojo já restituído ou legitimar a intimidação. Ghork pode preparar-se e pedir revanche sem pagar. **Rask, na retomada:** “Mesmas condições. Se eu interromper, os dois param.” A quest aguarda a vitória no desafio aceito; não se torna uma derrota permanente da campanha.

**Depois da vitória, entrega na escola:**

**Sevrak:** Trouxe o estojo. Como foi o duelo?

**Ghork:** Rask supervisionou. Eu ganhei. Mas vencer uma luta não prova que eu estava certo em tudo.

**Sevrak:** Bom. De volta ao relatório: você colocou o que não sabemos antes do resultado.

**Ghork:** Não quero que essa parte passe despercebida.

**Escolha:**

1. **“Coloco ao lado da conclusão. Assim, quem ler uma também vê a outra.”** — **Sevrak:** Faça. Se continuar legível, serve.
2. **“Quero explicar primeiro o que não sabemos. Depois mostro o que conseguimos fazer mesmo assim.”** — **Sevrak:** Então esteja pronto para defender essa escolha. Não vou responder por você.

**Conclusão:** duelo vencido, estojo devolvido e versão do relatório definida; abre C5. A ordem da ressalva reaparece em E04. O veterano continua um figurante, sem vínculo inventado com o campeão ou com os Ignotos.

<a id="q-c5"></a>
### Q-C5 — A proposta de Sevrak

**Acesso:** C4. **Local:** sede. **Objetivo:** ouvir a estratégia C. **Participantes:** Sevrak e Ghork.

**Sevrak:** Vamos apresentar um método que Meruna possa verificar. Se conseguir o contrato, a escola poderá ensinar outras pessoas a fazer esse levantamento.

**Ghork:** E o contrato paga o trabalho da sua escola.

**Sevrak:** Nossa escola, se você se juntar a ela.

**Ghork:** Ainda estou decidindo.

**Sevrak:** Então saiba o que estou pedindo. Quero você na investigação e na preparação para o campeonato. Fazer parte da escola vai exigir trabalho.

**Ghork:** Você quer que eu repita seu método ou que aponte quando ele estiver errado?

**Sevrak:** Que demonstre o erro. Eu esperaria a mesma cobrança sobre meu trabalho.

**Interface — escolha:**

1. **“Vou ouvir as outras guildas.”** — **Sevrak:** O procedimento fica disponível. Não confunda demora com comparação cuidadosa. [Mapa; C ouvida.]
2. **“Quero defender este método.”** — [Com as três apresentações, abre confirmação E04.]

**Conclusão:** ouvir não é aderir; executar E04 conclui a quinta missão. Nenhuma atrocidade, pacto ou poção é condição da rota C.

<a id="compromisso"></a>
## Compromisso e retaliação

<a id="e04"></a>
### E04 — Uma assinatura, duas recusas

**Acesso:** três apresentações e proposta da quinta missão escolhida ouvida. **Encaixe:** conclusão dessa quinta missão; não é outra quest. **Local:** casa de contratos. **Participantes:** Ghork, Meruna e os três mentores. **Base:** adesão irreversível, contrato exclusivo e hostilidade; **proposta:** defesa pública e manifestações da ruptura. **Referência:** PC2-compromisso.

**Interface:** “Executar a estratégia de [guilda] confirma sua adesão. As outras duas se tornarão rivais e suas cadeias de adesão serão encerradas. Você poderá reconhecer os vínculos anteriores, mas não trocar de guilda. Confirmar / Voltar às propostas.”

“Voltar” retorna ao mapa sem mudança. “Confirmar” inicia a defesa da guilda selecionada; perguntas posteriores não desfazem a decisão nem permitem que uma resposta de tom cause perda definitiva do contrato.

**Meruna:** As três guildas apresentaram suas propostas. Ghork, qual delas você vai ajudar a executar?

**Defesa A:**

**Ghork:** A de Virmura. Comparamos o trajeto de um resgate com os mapas. Testamos as instruções usando uma maca e dividimos a equipe entre o trabalho de campo e a enfermaria.

**Sevrak:** Um relato de resgate não cobre a mina inteira.

**Ghork — escolha:**

1. **“Nem dissemos que cobre. Marcamos o que ainda precisa ser investigado.”**
2. **“É para isso que serve o contrato: investigar o resto. Já testamos como vamos trabalhar.”**

**Meruna:** Está claro o que vocês já fizeram e o que ainda vão entregar. Virmura, registre no plano os custos da enfermaria e da equipe de campo.

**Defesa B:**

**Ghork:** A de Borun. Conferimos o registro com quem transportou a carga, separamos o que ela viu do que ouviu e pedimos a outra pessoa para seguir as instruções.

**Virmura:** E se esses relatos não bastarem para saber como retirar alguém?

**Ghork — escolha:**

1. **“Vamos anotar o que falta antes de entrar. Ninguém vai chamar um palpite de rota segura.”**
2. **“Se a equipe não conseguir conferir, volta sem a resposta. Estar sendo pago não obriga ninguém a inventar uma.”**

**Meruna:** Inclua isso no relatório. Borun, a conferência das fontes em campo fica sob sua responsabilidade.

**Defesa C:**

**Ghork, se C4 começou pelo limite:** Vou explicar primeiro o que não conseguimos verificar. Depois mostro como conferimos o restante.

**Ghork, se C4 colocou a ressalva ao lado:** Cada conclusão vem com uma nota sobre o que ainda não sabemos. Elune conseguiu repetir o método sem precisar chamar Sevrak.

**Borun:** Mesmo um método bem explicado pode partir de um relato errado.

**Ghork — escolha:**

1. **“Por isso anotamos de onde veio cada informação.”**
2. **“Por isso deixamos as etapas escritas. Quem discordar pode conferir e apontar o erro.”**

**Meruna:** Sevrak, mantenha esse registro durante a investigação. Mesmo quando os resultados contrariarem sua primeira hipótese.

**Trecho comum:**

**Meruna:** A proposta defendida demonstra capacidade suficiente para a investigação que estou contratando. O contrato fica com [guilda escolhida]. O financiamento não será dividido.

[A demonstração concreta que compara os mapas deve acompanhar essa avaliação conforme P01. A financiadora escolhe entre propostas viáveis; não anuncia que as demais são incompetentes.]

**Virmura, se rejeitada:** Eu contava com esse dinheiro para a equipe de campo. Não posso ceder gente nem materiais de que a enfermaria precisa. Minha guilda vai disputar os próximos contratos e o campeonato contra a sua.

**Borun, se rejeitado:** Vou procurar trabalho para a minha gente. Nossa guilda não vai acompanhar essa expedição. E, na arena, vamos estar do outro lado.

**Sevrak, se rejeitado:** Nossos instrutores e métodos ficam na escola. Haverá outras oportunidades de mostrar o que poderíamos fazer. O campeonato é uma delas.

**Ghork — escolha, depois das duas recusas:**

1. **“Continuo grato pelo que fizeram por mim.”** — **Mentor rejeitado, primeira fala aplicável:** Virmura: “Eu sei. Mas ainda preciso cuidar do trabalho da minha guilda.” / Borun: “Eu sei. Isso não acaba só porque escolhemos lados diferentes.” / Sevrak: “Não estou contestando sua gratidão. Estou contestando sua escolha.”
2. **“Escolhi o trabalho que quero fazer. Nunca prometi entrar nas três guildas.”** — **Meruna:** Havia um contrato, não três. Vamos registrar quem vai assumir o trabalho.

**Mentor escolhido:**

- **Virmura:** Sua parte de remuneração será separada dos recursos da equipe. Primeiro combinaremos o trabalho que pode assumir.
- **Borun:** Vamos separar a sua parte da conta da guilda. Quero que saiba pelo que está trabalhando.
- **Sevrak:** Sua remuneração pessoal e a verba da investigação terão registros distintos. Começaremos pela preparação.

**Conclusão:** titularidade e adesão registradas; as cadeias das outras guildas fecham. Informações já lidas não somem. Os lugares públicos e o atendimento continuam acessíveis. A ruptura é institucional, não uma retirada retroativa do socorro. Segue E05.

<a id="e05"></a>
### E05 — Os horários riscados

**Base:** contestação, exigência de retratação e cancelamento confirmados. **Local:** administração do coliseu. **Participantes:** Ghork, mentor escolhido, Rask e Torvak. **Objetivo:** presenciar a consequência de entrar numa disputa anterior à chegada de Ghork.

**Mentor escolhido:**

- **Virmura:** Nossa equipe recebeu esses horários. A quarta guilda não pode ocupar a preparação de todos porque tem um campeão.
- **Borun:** Rask, você nos deu a faixa de treino. Se a palavra só vale depois de Torvak aprovar, devia ter dito antes.
- **Sevrak:** Há um horário concedido à nossa escola. Qual regra permite que a quarta guilda o substitua pela própria preferência?

**Torvak:** É a minha equipe que traz o público que paga por este coliseu. Querem usar a arena que sustentamos e ainda chamam nossa prioridade de abuso?

**Mentor:** Virmura: “Quando toma o que já foi concedido a outra equipe, é abuso.” / Borun: “Quero que cumpram o combinado.” / Sevrak: “Quero uma resposta à pergunta.”

**Torvak:** Retire a acusação. Agora.

**Mentor:** Virmura: “Não retiro.” / Borun: “Não vou pedir desculpas por isso.” / Sevrak: “Mantenho o que disse.”

**Torvak:** Rask, resolva os horários dessa guilda. Ou reveja se pode contar comigo no seu campeonato.

[Rask olha a lista. Risca os horários da guilda escolhida.]

**Rask:** Vocês terão de treinar fora do coliseu. A inscrição no campeonato continua válida.

**Ghork — escolha:**

1. **“Você está desfazendo uma decisão que já tinha confirmado.”** — **Rask:** Estou. Não vou fingir que houve um erro na lista.
2. **“E ele fica com a arena?”** — **Torvak:** Minha equipe fica com o espaço de que precisa para treinar.

**Ghork:** Vamos ter de organizar os treinos outra vez.

**Mentor:** Virmura: “Na sede. E ninguém vai perder descanso por causa disso.” / Borun: “Vamos dividir o trabalho. Eu acompanho os treinos que prometi.” / Sevrak: “Vamos adaptar os exercícios à escola. Primeiro, precisamos conferir o espaço.”

**Saída:** encerra arco 1. Na abertura comum do arco 2, Ghork ajuda a reorganizar materiais leves e horários; a tarefa não vira quest, pagamento ou penalidade. A crítica escolhida ocorre depois do cancelamento e não o causa.

<a id="arco-2"></a>
## Contrato, alianças e classificação

**Base comum:** titularidade da guilda, equipes externas, duas apresentações livres, compromisso e duas missões exclusivas. **Propostas usadas nesta versão:** X/Darvek é a abordagem com maior reserva de segurança; Y/Zagra preserva recursos por uma operação limitada e mais arriscada. Essas equipes não entram no bônus de combate. As cenas reconhecem a guilda sem multiplicar as sete quests.

Antes da primeira apresentação, exibir a reorganização e uma fala do mentor:

- **Virmura:** O atendimento continua deste lado; a preparação fica do outro. Se os horários apertarem, me diga antes de tirar o descanso da conta.
- **Borun:** Aqui cabe menos gente. Dividi o acompanhamento e avisei Pirka. Dessa vez você não vai descobrir meu atraso olhando uma cadeira vazia.
- **Sevrak:** Mudei a sequência dos exercícios para este espaço. Quero que registre onde ela não funcionar. Não me serve um aluno que concorda e depois improvisa escondido.

**Ghork:** Vou ajudar no que conseguir. Se não der conta de algo, aviso.

Não exigir um recrutado para carregar objetos ou ouvir essa conversa. As duas apresentações externas podem ser iniciadas em seguida.

<a id="q-x0"></a>
### Q-X0 — Uma reserva de retorno

**Local:** oficina de Durn. **Participantes:** Darvek, Durn e Ghork. **Objetivo:** compreender a proposta cautelosa. **Acesso:** entrada do arco 2. **Referência:** PC2-compromisso, pela apresentação das exigências antes da adesão.

**Darvek:** Este suporte fica de reserva. Se levarmos tudo para avançar, o que sobra para tirar alguém de lá?

**Durn:** E não adianta ter suporte sem saber montar. É preciso saber onde a peça aguenta o peso.

**Ghork:** Quanto disso sai do pagamento?

**Darvek:** Mais do que no plano de Zagra. Vamos pagar inspeções, apoios e gente pronta para ajudar na retirada. Sobra menos para o torneio.

**Ghork — perguntas, ambas necessárias:**

- **“O que conseguimos fazer com essa reserva?”** — **Darvek:** Parar e organizar a volta com gente descansada, sem tirar ninguém do transporte dos feridos. Ainda pode haver acidentes.
- **“E se não precisarmos usar?”** — **Darvek:** Ainda teremos pago pelo material e pela equipe. Preciso que você aceite esse custo antes de entrarmos.

**Durn:** Olhe o encaixe. Confira a marca e anote o resultado do teste. Deixe o peso comigo.

[Ghork confere a marca enquanto Durn demonstra.]

**Ghork:** Pelo menos agora sei pelo que estamos pagando.

**Darvek:** É um começo. Ouça Zagra antes de decidir.

**Conclusão:** apresentação X completa. Se Y0 falta, mapa; se ambas concluídas, E06. Nenhuma compra pessoal nem adesão automática.

<a id="q-y0"></a>
### Q-Y0 — Levar menos

**Local:** mercado, junto à carga. **Participantes:** Zagra, Pirka e Ghork. **Objetivo:** conhecer o limite e o custo da operação leve. **Acesso:** entrada do arco 2, independente de X0.

**Zagra:** Levamos estas cargas. A reserva pesada fica para trás neste primeiro reconhecimento. Vamos examinar um trecho curto e voltar.

**Pirka:** Menos carga barateia o transporte. Mas minha carroça continua sem caber numa galeria.

**Ghork:** Então, se alguém se machucar lá dentro...

**Zagra:** Teremos menos meios de tirar essa pessoa de lá. Esse é o risco. Em troca, sobra mais do pagamento para nossa preparação.

**Ghork — perguntas, ambas necessárias:**

- **“O que faria vocês voltarem antes do ponto combinado?”** — **Zagra:** Sinais de instabilidade, perda das referências do caminho ou alguém sem condições de continuar. Não vou prometer uma saída que não posso encontrar.
- **“O que você se recusa a cortar?”** — **Zagra:** Marcas para achar a saída, comunicação entre nós e um limite de carga que todos consigam carregar. Sem isso, o plano não funciona.

[Ghork confere a lista com Pirka.]

**Ghork:** Você e Darvek já trabalharam juntos.

**Zagra:** Sim. Ele leva uma reserva maior. Eu limito o serviço para precisar de menos. Nós já discutíamos isso muito antes de você chegar.

**Conclusão:** apresentação Y completa; E06 depois de ambas. Não escolher a equipe ao simplesmente visitar seu local.

<a id="e06"></a>
### E06 — Um método para este trabalho

**Encaixe:** conclusão da segunda apresentação realizada. **Local:** casa de contratos. **Participantes:** Ghork, Darvek, Zagra e mentor escolhido. **Objetivo:** assumir uma abordagem sabendo o que custa.

**Mentor:** Virmura: “Ouviu os dois. Que risco vai aceitar? E como vai explicar isso à equipe?” / Borun: “Conte o que você conferiu, não só qual conversa agradou mais.” / Sevrak: “Escolha o método adequado ao trabalho. Depois, terá de responder pelo resultado.”

**Interface:** “Escolher X ou Y abre duas missões exclusivas e fecha a outra abordagem nesta campanha. A equipe preterida seguirá com apoio de outra guilda e poderá enfrentá-lo. Confirmar X / Confirmar Y / Pensar mais.”

“Pensar mais” retorna ao mapa. As apresentações permanecem concluídas e a reunião pode ser retomada. Convites que dependem de X/Y continuam aguardando a resolução da rota, conforme a seção de recrutamentos.

**Escolha X:**

**Ghork:** Quero deixar a reserva de resgate pronta antes de entrar. Aceito ficar com menos dinheiro depois.

**Darvek:** Então começamos testando os apoios.

**Zagra:** Você ouviu os limites do meu plano. Ainda acha que eu só entro torcendo para ninguém se machucar?

**Ghork — escolha:**

1. **“Ouvi. Para este trabalho, prefiro ter mais recursos para a volta.”**
2. **“Não acho que você abandone os seus. Só quero uma margem maior de segurança.”**

**Zagra:** Minha equipe ainda vai mostrar o que sabe fazer. Com ou sem você.

**Escolha Y:**

**Ghork:** Vamos com Zagra e ficamos no reconhecimento limitado. Quero guardar recursos, mas não vou prometer mais do que podemos investigar.

**Zagra:** Com esses limites por escrito, podemos preparar a carga.

**Darvek:** E se precisarem de mais do que levaram para sair de lá? Minha reserva já virou exagero?

**Ghork — escolha:**

1. **“Seu plano cobre esse risco. Eu aceitei ter menos recursos para enfrentá-lo.”**
2. **“Não estou chamando você de medroso. Estou escolhendo fazer um trabalho menor.”**

**Darvek:** Espero que respeite esse limite lá dentro. Vou procurar quem queira trabalhar com a minha equipe.

**Saída:** X ou Y registrado, inicia X1 ou Y1. A mágoa profissional desenvolve a proposta já existente de B2; não estabelece promessa quebrada, roubo de pagamento ou ruína de reputação. Sua causa ainda depende de confirmação autoral.

<a id="q-x1"></a>
### Q-X1 — Antes de entrar

**Acesso:** compromisso X. **Locais:** oficina e entrada das minas. **Participantes:** Darvek, Durn e Ghork. **Objetivo:** preparar e testar a reserva de retirada.

**Durn:** As peças estão prontas. Quem vai montar?

**Darvek:** Minha equipe. Ghork confere a lista e o caminho até o ponto de espera.

**Ghork:** Posso acompanhar o teste.

**Darvek:** Fique. Se eu não explicar alguma coisa direito, não dê essa parte por conferida.

[Na entrada, a equipe ensaia a circulação com uma carga de treino. Uma reserva fica livre para atender a retirada; não se cria acidente real.]

**Ghork — escolha:**

1. **“Quero ver quem pega a carga se alguém precisar parar.”** — **Darvek:** Troquem de posição. Vamos ver se ainda conseguem voltar.
2. **“Quero ver se conseguimos alcançar os apoios com a equipe passando.”** — **Darvek:** Boa pergunta. Liberem o corredor antes de tentar de novo.

[As duas conferências fazem parte do ensaio; a opção decide a primeira atenção de Ghork.]

**Darvek:** Pronto. Aqui está o custo da reserva, separado do material que vamos usar na investigação.

**Ghork:** Isso já levou boa parte do que eu queria gastar na preparação.

**Darvek:** Levou. Pode conferir cada gasto. Não vou fingir que isso saiu de graça.

**Conclusão:** preparação concluída, abre X2; nenhum desconto em Ludos ou atributo. O pagamento do contrato sustenta a operação, sem exigir saldo pessoal.

<a id="q-x2"></a>
### Q-X2 — Até onde foi conferido

**Acesso:** X1. **Local:** galerias. **Participantes:** Darvek, Ghork e equipe figurante. **Objetivo:** registrar observações e respeitar a interrupção necessária.

[A equipe identifica uma passagem que exige conferência antes de levar a carga adiante.]

**Darvek:** Vamos parar aqui. Preciso conferir esse apoio antes de continuar.

**Ghork:** Depois de toda aquela preparação, ainda precisamos parar?

**Darvek:** Nós nos preparamos para poder parar e organizar a saída. A rocha ainda pode ceder.

**Ghork — escolha:**

1. **“Vou anotar o que vimos enquanto vocês conferem.”** — **Darvek:** Marque até onde chegamos. Do restante, ainda não sabemos.
2. **“Mostre o que precisa conferir. Quero saber explicar o atraso.”** — **Darvek:** Este apoio sustenta a passagem. Minha equipe vai examiná-lo. Anote por que paramos.

[A equipe reorganiza o percurso usando a reserva; obtém observações úteis e delimita a parte ainda incerta. Não descrever desabamento como causa dos mapas.]

**Ghork:** Vamos entregar menos do que eu queria.

**Darvek:** Vamos entregar o que verificamos e explicar por que não fomos além.

**Ghork:** Eu escolhi esse plano. Também vou explicar os gastos.

**Conclusão:** investigação X realizada; libera Q-20, R3 e R4. Convites dependentes de X/Y podem agora ser avaliados. Nenhum aliado automático. A equipe retorna viva sem uma conclusão universal de que só X é responsável.

<a id="q-y1"></a>
### Q-Y1 — O peso de cada coisa

**Acesso:** compromisso Y. **Locais:** mercado e entrada das minas. **Participantes:** Ghork, Zagra e Pirka. **Objetivo:** preparar uma carga compatível com o reconhecimento limitado.

**Pirka:** A lista diminuiu. O risco não aparece na balança; confiram tudo antes de subir.

**Zagra:** Ghork, diga o que não vamos fazer lá dentro. Quero ter certeza de que entendemos o serviço do mesmo jeito.

**Ghork — escolha:**

1. **“Não vamos entrar num trecho que exija uma operação maior.”** — **Zagra:** Certo. Esse limite vai constar no relatório.
2. **“Guardar dinheiro não nos dá a reserva de Darvek.”** — **Zagra:** Isso. Se precisarmos dela, encerramos o reconhecimento.

[Na entrada, Ghork confere marcações, carga e sinais de parada com a equipe.]

**Ghork:** E se alguém tiver vergonha de pedir para voltar?

**Zagra:** Eu pergunto antes de avançarmos. Você também pode falar. Se eu apressar alguém, me avise.

**Ghork:** Combinado. Não quero descobrir depois que todo mundo foi sem querer.

**Conclusão:** limites apresentados à equipe, abre Y2. O plano preserva mais recursos, mas não concede bônus ou elimina o risco.

<a id="q-y2"></a>
### Q-Y2 — A marca de retorno

**Acesso:** Y1. **Local:** galerias. **Participantes:** Ghork, Zagra e equipe. **Objetivo:** reconhecer, interromper e registrar o limite do serviço.

[A equipe observa sinais de instabilidade antes do ponto pretendido. Zagra levanta a mão; todos param.]

**Zagra:** Com o equipamento que trouxemos, não vamos além daqui.

**Ghork:** Ainda não chegamos ao trecho que queríamos ver.

**Zagra:** Não. Mas, se alguém se machucar ali, teremos menos meios de tirá-lo. Combinamos que pararíamos nessas condições.

**Ghork — escolha:**

1. **“Vou marcar onde paramos.”** — **Zagra:** Anote o que vimos e por que paramos. Não diga que é impossível passar. Nós não conferimos.
2. **“Eu explico por que paramos quando entregarmos o trabalho.”** — **Zagra:** Explique comigo. Fui eu quem propôs esse plano.

[Eles registram o que observaram e recuam sem acidente obrigatório.]

**Ghork:** Vamos voltar com mais dinheiro, mas sem saber o que há naquele trecho.

**Zagra:** Sim. E as duas coisas precisam constar no relatório.

**Ghork:** Não quero que façam piada de Darvek quando contarmos.

**Zagra:** Nem eu. A reserva dele teria sido útil aqui. Também teria custado mais.

**Conclusão:** investigação Y realizada; libera Q-20, R3 e R4 e a avaliação dos convites dependentes. O recuo não transforma a rota numa falha nem afirma que assumir risco sempre compensa.

<a id="q-20"></a>
### Q-20 — O nome na lista

**Acesso:** X2 ou Y2. **Locais:** casa de contratos, sede escolhida, treino e coliseu. **Participantes:** Ghork, Meruna, Elune, representante escolhido, mentor, Lala, Guedra, Dorga, Savel, Torvak e Rask em cenas separadas. **Objetivo:** entregar o trabalho, responder por seus custos e conquistar a classificação. **Referências:** PC1-químico, PC1-Silver e PC2-compromisso. B4–B6 cabem nesta única quest, com retornos ao mapa entre cenas para permitir R3/R4.

#### 1. A entrega

**Meruna:** Mostrem o que investigaram e o que ainda não puderam verificar.

**Ghork, X:** Preparamos uma reserva. Paramos para conferir um apoio e a usamos para reorganizar a retirada. Sobrou menos dinheiro para a preparação.

**Ghork, Y:** Levamos menos equipamento e voltamos ao encontrar instabilidade. Sobrou mais dinheiro, mas não examinamos o trecho além desta marca.

**Elune:** Vou marcar onde fizeram cada observação. O mapa também precisa mostrar o que ainda não sabemos.

**Meruna:** O relatório descreve o que vocês fizeram. Não prova que o restante esteja seguro para explorar. A guilda receberá o pagamento combinado; vocês o dividem conforme seu acordo.

**Ghork — escolha:**

1. **“Quero incluir os gastos do plano.”** — **Meruna:** Inclua. Vou precisar desses valores para avaliar outra investigação.
2. **“Quero explicar por que paramos.”** — **Meruna:** Descreva o que encontraram. Não prometa que o próximo grupo encontrará as mesmas condições.

**Representante:** Darvek: “Usamos a reserva para reorganizar a equipe. Aqui estão os gastos.” / Zagra: “Respeitamos o limite. O pagamento não muda aquilo que conseguimos descobrir.”

**Saída da cena:** remuneração pessoal conhecida em termos narrativos. Valores permanecem pendentes. Uma conversa de contribuição nunca usa dinheiro da guilda.

#### 2. Uma goteira e um trabalho começado

[Na sede escolhida, Ghork prepara o segundo contato. Proposta: Virmura mantém o serviço de recarga necessário aos contatos mesmo se rival, sem ceder recursos da expedição ou exigir adesão. A montagem só mostra uma recarga quando necessária, sem frequência inventada.]

**Lala:** Terminei duas peças! Vou começar a oferecer meu trabalho.

**Ghork:** Já?

**Lala:** Era para eu esperar pela loja? Primeiro preciso descobrir quem quer comprar minhas roupas.

**Ghork — escolha:**

1. **“Deixa eu ver como ficaram.”** — **Lala:** Esta é minha preferida. A outra deu mais trabalho... ainda estou brigada com aquela manga.
2. **“Ainda quero ajudar você com a loja.”** — **Lala:** Eu sei. Mas olha o que já consegui fazer. Está vendo essa manga?

**Ghork:** Estou. Eu também terminei um trabalho. Nas minas.

**Lala:** Nas minas? Depois vai me contar essa história inteira. Antes, um recado de Dam. E não vale responder prometendo uma casa nova.

**Lala, lendo o recado de Dam:** "Tem uma goteira no quarto comum. Estou cuidando do conserto, mas ainda falta material. Você consegue ajudar agora? Preciso saber para organizar o resto."

**Ghork:** Recebi minha parte do pagamento. Estava guardando para treinar mais.

**Lala:** Ele precisa de uma resposta para se organizar. Vou passar o que você disser.

**Interface:** “Contribuir usa uma parte da remuneração pessoal e abre mão de uma sessão paga adicional de preparação. Guardar preserva essa preparação. Nenhuma opção altera o D20, exige Ludos ou encerra a amizade.”

**Escolha contribuir:**

**Ghork:** Posso mandar uma parte para o material. A casa inteira ainda vai ter que esperar.

**Lala:** Ótimo. É isso que vou dizer. Ele vai perguntar quando chega.

**Ghork:** Vou confirmar o envio antes de prometer uma data.

[Proposta de remessa, sujeita à validação: Jorvi registra o valor e Pirka aceita transportá-lo numa saída já existente para Daratrine; não é uma viagem jogável, não os identifica com o cocheiro do livro e não cria taxa obrigatória.]

**Jorvi:** Confira o valor e para quem vai. Pirka leva na saída combinada. Eu guardo uma cópia.

**Pirka:** Levo o que está no registro. Se a saída mudar, aviso. Nada de dizer que chegou antes de chegar.

**Ghork:** Certo. Quero uma cópia também.

**Escolha guardar:**

**Ghork:** Vou guardar o dinheiro para a preparação. Diga que não consigo contribuir agora.

**Lala:** Vou dizer. Ele pode ficar decepcionado, Ghork. Mas precisa saber.

**Ghork:** Queria ter mais para oferecer.

**Lala:** Por enquanto, dê essa resposta. E, na próxima conversa, me conte como você está.

**Convergência:**

**Ghork:** Você também vai me contar se vendeu as peças.

**Lala:** Vou contar mesmo se não vender. Você ainda vai ouvir muito sobre aquela manga.

**Saída:** registrar contribuir/adiar. As duas opções estão disponíveis em X e Y; custos de segurança não forçam uma resposta. Nenhum contador econômico novo é implementado por este roteiro.

#### 3. Quem já ganhou também precisa de outra dose

[Na casa de contratos, Dorga cobra Meruna; Ghork chega após a própria entrega.]

**Dorga:** Nossa guilda bancou expedições quando ninguém mais aceitava o custo. Agora vocês dão os contratos a quem acabou de chegar.

**Meruna:** Avalio as propostas que recebo hoje. Os serviços de antes não substituem as informações de que preciso agora.

**Dorga:** As famílias dos veteranos continuam aqui. Mudar seus critérios não fez essas pessoas desaparecerem.

[A conversa termina sem confissão do pacto. No coliseu, um companheiro entrega uma dose a Torvak. Ele espera a mão firmar antes de cumprimentar o público. Savel recolhe o estojo.]

**Ghork — escolha:**

1. **“Sua mão está tremendo.”** — **Torvak:** Anos de luta cobram seu preço. Meu fornecedor está cuidando disso.
2. **“Está pronto para a classificação?”** — **Torvak:** Pronto para os próximos que vierem tomar meu lugar.

**Savel:** É preciso cuidado para manter a preparação. Parar as doses sem acompanhamento seria pior.

**Ghork:** E o nosso treino? Você mandou Rask cancelar nossos horários.

**Torvak:** Mandei. Seu mentor podia ter retirado a acusação. Não vou tirar minha equipe do caminho toda vez que alguém contestar o que conquistamos.

**Ghork — escolha:**

1. **“Então admita. Não quero que mudem essa história depois.”** — **Torvak:** Está admitido. Ainda vai ter que vencer na arena.
2. **“É fácil ter prioridade quando os outros pagam por ela.”** — **Torvak:** Manter meu lugar por todos esses anos também custou. Volte depois de fazer a sua parte.

**Saída:** abuso reconhecido pelo autor do ato; observação de dependência sem diagnóstico completo. O jogador não conhece a adesão ao golpe. Nos bastidores, conforme proposta do arco do campeão, ela ocorre neste período e independe de recrutamentos.

#### 4. Preparar-se e classificar

[No espaço de Guedra, Ghork pratica com o que tem.]

**Guedra, se contribuiu:** Sem a sessão extra, vamos aproveitar o tempo que já tínhamos combinado. Mostre onde você perde o equilíbrio.

**Guedra, se guardou:** Com a sessão extra, temos mais tempo para acertar sua base. A vitória eu não posso prometer.

**Ghork:** Podemos começar pela parte em que eu paro de esticar a perna para compensar o braço curto.

**Guedra:** Bom. Faça o movimento devagar.

[Rheed narra a continuidade da fase de grupos e da preparação, sem resultados numéricos ou batalhas extras. Rask recebe Ghork na entrada do coliseu.]

**Rask:** Sua equipe se classificou. Ainda dá para fazer convites antes das eliminatórias. Quando confirmar a entrada, a equipe fica fechada.

**Ghork:** Meu nome está na lista?

**Rask:** Está. Pode ler.

**Mentor escolhido:**

- **Virmura:** Você chegou até aqui respeitando os limites do trabalho. Quero que continue me dizendo quando precisar de ajuda.
- **Borun:** Você consegue explicar como chegou até aqui. Não precisa esperar que eu conte por você.
- **Sevrak:** A escola terá o que mostrar nesta classificação. Quero que nossa preparação seja reconhecida.

**Ghork — escolha:**

1. **“Vocês me ajudaram. Mas as próximas decisões continuam sendo minhas.”** — **Mentor:** Virmura: “Então diga o que quer fazer. Vou tentar ouvir antes de responder por você.” / Borun: “É o que eu espero.” / Sevrak: “E esteja pronto para defendê-las.”
2. **“Posso comemorar antes de receber a próxima cobrança?”** — **Mentor:** Virmura: “Justo. Hoje podemos comemorar.” / Borun: “Pode começar reclamando do tamanho da minha lista.” / Sevrak: “Comemore. As cobranças podem esperar até terminarmos esta conversa.”

**Torvak:** Classificado, Ghork. Seu mentor achou onde treinar depois de comprar aquela briga, então.

**Ghork:** Achou. Tivemos que refazer tudo o que você atrapalhou.

**Torvak:** Agora vamos ver se adiantou.

**Conclusão:** classificação, R5 disponível e cinco convites ainda sujeitos às condições. Não iniciar Q-31 automaticamente; abrir mapa para pendências e aviso de não retorno.

<a id="recrutamentos"></a>
## Cinco recrutamentos

**Base:** cinco conflitos opcionais, dez candidatos, até cinco aliados; dois longos e três curtos. **Proposta adotada para escrever:** pares do catálogo, R2/R4 longos. Cada conflito concede Ludos uma única vez quando concluído, independentemente de convite; valores a definir. O convite só pode favorecer a pessoa correspondente ao desfecho. Pagar uma intervenção não permite recrutar os dois.

### Acesso e distribuição proposta

Esta matriz é uma proposta desta versão para permitir a revisão das seis trajetórias; não aprova o balanceamento experimental do protótipo. “Aberto” permite qualquer dos dois desfechos e o convite correspondente. “Preto: nome” restringe o convite daquela pessoa; a outra alternativa continua gratuita se compatível com o desfecho. “Vermelho” fecha a missão inteira, ou só o convite quando o conflito já foi resolvido. O pagamento abre aquele acesso uma única vez, sem refazer a resolução nem receber sua recompensa novamente.

| Trajetória | R1 | R2 | R3 | R4 | R5 |
| --- | --- | --- | --- | --- | --- |
| A + X | Aberto | Aberto | Preto: Korr | Preto: Mavren | Vermelho |
| A + Y | Preto: Nima | Aberto | Aberto | Vermelho | Preto: Odrik |
| B + X | Aberto | Preto: Sura | Vermelho | Aberto | Preto: Lethra |
| B + Y | Vermelho | Preto: Edrin | Aberto | Preto: Tessa | Aberto |
| C + X | Preto: Brakka | Vermelho | Preto: Velka | Aberto | Aberto |
| C + Y | Aberto | Preto: Sura | Aberto | Preto: Mavren | Vermelho |

Cada linha tem dois abertos, dois pretos e um vermelho. Isso não garante quatro recrutados gratuitos: escolher antes um desfecho cujo convite depois fique preto pode deixar a alternativa gratuita incompatível com a decisão já tomada.

R1/R2 podem ser resolvidos no arco 1 antes dessas restrições. Depois da adesão, a condição de R2 na guilda A já é independente de X/Y e permite convite imediato. Os demais convites de R1/R2 desta matriz dependem da trajetória e aguardam a conclusão de X2 ou Y2; o jogador recebe esse aviso, não uma recusa definitiva. R3/R4 abrem nesse mesmo marco; R5 depois de Q-20. A restrição consolidada não expulsa alguém já recrutado.

**Aviso antes de resolver R1/R2 no arco 1:** “Este desfecho define quem poderá receber seu convite. O convite abre depois da adesão à guilda e pode depender da trajetória escolhida. Resolver agora não garante acesso gratuito depois.”

As restrições usam compromissos de trabalho, e não ódio automático pela guilda de Ghork. Sua distribuição por trajetória ainda precisa de validação; as falas de bloqueio e exceção estão completas em [intervenções](#retornos). Se a matriz mudar, alterar as condições de entrada, mantendo os conflitos e os desfechos que já tiverem sido escolhidos.

<a id="r1"></a>
### R1 — Um pátio, dois turnos

**Duração proposta:** curta. **Janela:** conflito desde A1, convite conforme a regra acima. **Local:** estalagem de Nyra, incluindo pátio. **Participantes:** Nyra, Brakka, Nima e Ghork. **Objetivo:** inspecionar o espaço e assumir um uso do turno disponível. **Referências:** PC1-Roy para amizade associada a treino e trabalho; PC2-compromisso para a incompatibilidade. O pátio e o dilema são criações de Terminus.

#### 1. Ver antes de prometer

**Nyra:** Tenho um turno livre no pátio e duas propostas. Ghork, pode olhar o espaço com eles? Quero saber quem vai cuidar dele depois que eu abrir a porta.

**Brakka:** Quero oferecer treino depois do trabalho. Tem gente que nunca consegue chegar a tempo das aulas.

**Nima:** Eu preciso de uma base para as entregas noturnas. Saímos juntos e conferimos quem voltou. Cada um saindo de um canto acaba sozinho na rua.

**Ghork:** Não dá para dividir o turno?

**Nyra:** Só se as caixas atravessarem quem está treinando. E não tenho quem cuide do pátio em outro horário.

[O jogador examina a passagem e o canto de armazenamento, em qualquer ordem.]

**Na passagem — Nima:** A carga entra por aqui. Essa passagem precisa ficar livre.

**No canto — Brakka:** Os bancos cabem aqui. Mas, se encher de caixas, não sobra espaço para treinar.

**Ghork:** Entendi. Não vou prometer o mesmo pátio duas vezes.

#### 2. Escolher e fazer

**Interface:** “Apoiar o treino favorece Brakka; apoiar o despacho favorece Nima. Só um deles poderá ser recrutado por esta missão. Confirmar treino / Confirmar despacho / Decidir depois.”

“Depois” retorna ao mapa e conserva a inspeção. Os objetos não são deslocados antes da confirmação.

**Treino:**

**Ghork:** Vou ajudar Brakka a organizar o treino.

**Nima:** Então vou procurar outro lugar para o despacho. Mais trabalho do que eu esperava.

**Brakka:** Vou começar pelos bancos. Ghork, pegue a lista e veja quem pode vir. Eu já estava contando até quem não respondeu.

[Ghork recebe a lista, confere presenças e entrega-a a Nyra. Brakka e os trabalhadores movem os bancos.]

**Nyra:** Lista recebida. Quem guardar o material também fecha o pátio.

**Ghork:** Combinado. Essa parte não vai sobrar para você.

**Despacho:**

**Ghork:** Vou ajudar Nima a organizar as entregas.

**Brakka:** Certo. Ainda preciso de um lugar para treinar. Vou procurar outro apoio.

**Nima:** Ghork, leve estas etiquetas para as caixas e confira os retornos comigo. Se ninguém reconhecer uma caixa, separe.

[Ghork recebe etiquetas, marca os volumes e devolve a lista conferida a Nyra. Nima divide o trabalho com os entregadores.]

**Nyra:** Recebido. E mantenham a passagem livre até o último voltar.

**Ghork:** Vou lembrar de tirar o banco do caminho. Já descobri como isso atrapalha uma fuga.

**Conclusão do conflito:** treino/Brakka ou despacho/Nima registrado; Ludos uma vez. Reabrir a conversa não permite trocar o desfecho.

#### 3. Convite e recusa

**Antes da janela de convite — Ghork:** Quando eu tiver uma guilda, quero conversar sobre o campeonato. **Favorecido:** Brakka: “Volte. Quero representar esse treino na arena.” / Nima: “Volte com o compromisso definido. Preciso organizar quem assume o despacho.”

**Convite liberado — Ghork:** Quero que lute comigo no campeonato. Vamos?

- **Brakka:** Vamos. Quero que vejam os trabalhadores por outro motivo além de carregar a arena dos outros.
- **Nima:** Vou. O despacho já tem gente dividindo os turnos. Não preciso fazer tudo para poder representar o grupo.

**Interface:** “Convidar / Deixar para depois.” Só “Convidar” inclui o herói; “depois” mantém a possibilidade até o ponto de não retorno.

**Se tentar convidar o preterido:** Brakka: “Assumi compromisso com outra equipe para buscar o espaço do treino. Vou disputar por ela.” / Nima: “Outra equipe apoiou nosso despacho. Vou representá-la. Você escolheu o projeto de Brakka.”

**Ghork:** Entendi. Espero ver o que conseguiram.

<a id="r2"></a>
### R2 — Os nomes no relato

**Duração proposta:** longa. **Janela:** conflito desde A1; convite conforme matriz. **Locais:** enfermaria → treino de Guedra → oficina → enfermaria → casa de contratos. **Participantes:** Sura, Edrin, Ghork, Guedra, Durn, um ferido figurante e Seldan na apresentação. **Objetivo:** reunir fontes autorizadas sobre lesões num pátio de treino e respaldar uma apresentação do caso. O pátio investigado permanece sem nome e não é o de Guedra ou de Nyra. **Referência:** PC1-objeto, busca entre interlocutores, sem transplantar o conflito auditivo de Bobo.

#### 1. A autorização

**Sura:** Quero evitar mais feridos naquele pátio. Posso reunir os registros de atendimento sem revelar quem são os pacientes.

**Edrin:** Alguns querem falar em público. Proponho ouvir quem se oferecer e usar os depoimentos para cobrar os responsáveis.

**Ghork:** Querem resolver o mesmo problema, mas de jeitos diferentes.

**Sura:** E discordamos sobre o risco de expor essas pessoas. Antes de decidir, ouça quem se machucou.

**Ferido:** Pode usar o que eu contar, mas sem meu nome. Não quero que quem ainda me dá trabalho me reconheça.

**Ghork — escolha:**

1. **“Vou respeitar isso.”** — **Ferido:** Então pode perguntar sobre o aparelho.
2. **“O que posso contar desta conversa?”** — **Ferido:** O que aconteceu. Não diga meu nome nem onde trabalho.

**Ferido:** O apoio cedeu durante o exercício. Disseram que eu não tinha jeito. Quem me ajudou guardou uma peça e levou para Guedra examinar.

**Sura:** Guedra aceitou emprestar a peça. Leve esta autorização e volte com ela. Primeiro precisamos examiná-la; só encontrá-la não prova de quem foi a culpa.

[Ghork recebe autorização e cópia anônima do relato. Não há opção de expor o paciente à força.]

#### 2. Buscar a peça e conferir o que ela mostra

**Guedra:** Trouxeram a peça para mim. Eu não estava lá quando quebrou. Dou minhas aulas aqui, não naquele pátio.

**Ghork:** Preciso saber o que o desgaste revela, sem adivinhar o resto do acidente.

**Guedra:** Durn pode examinar. Aqui está. Traga de volta; precisamos guardar a peça.

[Receber a peça avariada muda o objetivo para a oficina.]

**Durn:** Dá para ver uma falha aqui. Mas só a peça não diz quem instalou nem quem sabia desse desgaste.

**Ghork — escolha:**

1. **“Deixe isso claro no seu registro.”** — **Durn:** Vou descrever o estado da peça. Para acusar alguém, precisam de outras provas.
2. **“Quero mostrar o exame aos envolvidos antes de levar o caso adiante.”** — **Durn:** Leve uma cópia. Se encontrarem algo errado, quero saber.

[Durn não destrói a peça no exame. Ghork recebe uma nota de condição, devolve a peça a Guedra e leva a cópia à enfermaria.]

**Guedra:** Vou guardar a peça junto com o registro de quem a examinou.

**Edrin, na enfermaria:** Com isso, podemos pedir uma investigação. Ainda não prova o que alguém pretendia fazer.

**Sura:** Vou conferir se algum detalhe da cópia revela quem pediu sigilo.

#### 3. Uma apresentação inicial

**Edrin:** Posso reunir quem quiser depor. Quem pediu sigilo não entra na lista de nomes.

**Sura:** Posso apresentar as lesões e o exame sem revelar os pacientes. Ghork, escolha qual apresentação vai ajudar a preparar. Não dá para assumir as duas.

**Interface:** “Relatório anônimo favorece Sura. Depoimentos públicos voluntários favorecem Edrin. Os outros caminhos podem continuar na cidade, mas esta missão dá a Ghork um compromisso e um recrutamento possível. Confirmar / Decidir depois.”

**Relatório anônimo, na casa de contratos:**

**Ghork:** Reunimos os relatos e o exame da peça. Os pacientes autorizaram o uso, desde que seus nomes não apareçam.

**Sura:** Pedimos uma investigação dos equipamentos e das condições do pátio. Estas são as informações que temos até agora.

**Seldan:** Vou receber o material e registrar o pedido de investigação. Ainda não temos como apontar um culpado.

**Edrin:** Vou continuar procurando quem queira depor. Quem aparece nessa cópia terá seu sigilo respeitado.

**Depoimentos voluntários, no mesmo local:**

**Ghork:** Estas pessoas decidiram falar. O relato de quem pediu sigilo continua separado.

**Edrin:** Antes de confirmar, cada testemunha pode corrigir o que disse. O exame explica o estado da peça; precisamos de vocês para contar o que viram.

**Testemunha figurante:** Quero corrigir quando aconteceu. Foi depois de mudarem o exercício, não antes.

**Edrin:** Corrigido. O restante está certo?

**Testemunha:** Está.

**Seldan:** Vou receber os depoimentos e o pedido. Na investigação, também teremos de ouvir os responsáveis pelo pátio.

**Sura:** Continuarei atendendo quem precisar. E o paciente que pediu sigilo não aceitou ser identificado só porque houve uma audiência.

**Conclusão do conflito:** apresentação escolhida entregue; Ludos uma vez. Não prometer indenização, fechamento definitivo do pátio, prisão ou cura como resultado imediato. O caso não revela os Ignotos.

#### 4. Convite

**Ghork:** Quero que entre na minha equipe para o campeonato.

- **Sura, favorecida:** Você respeitou o que podia levar dos pacientes. Posso construir uma parceria assim. Quando o convite estiver disponível, conte comigo.
- **Edrin, favorecido:** Você conferiu o relato antes de usá-lo. Quero essa responsabilidade perto de mim na arena também.

Na janela correta, apresentar “Convidar / Depois”; restrição ou espera usam o bloco comum. Antes dela, registrar a intenção sem adicionar o herói.

**Preterido, se solicitado:** Sura: “Vou representar o atendimento por outra equipe. Nossa divergência não retira o cuidado de ninguém.” / Edrin: “Assumi outro compromisso para sustentar a via pública. Não vou abandoná-lo para ocupar a vaga dela.”

<a id="r3"></a>
### R3 — Uma peça inteira

**Duração proposta:** curta. **Acesso:** X2/Y2 e condição da matriz. **Locais:** oficina → espaço de Guedra → oficina. **Participantes:** Durn, Korr, Velka, Ghork e Guedra. **Objetivo:** conhecer dois usos de uma armação e autorizar um destino. **Referência:** PC1-objeto, circulação de um objeto e pessoas com necessidades próprias; o dilema é autoral.

**Durn:** Vou ceder esta armação a um projeto. Korr quer aproveitar as peças; Velka quer usá-la inteira. Vamos decidir antes que alguém pegue uma ferramenta.

**Korr:** Com esse material, faço proteções para quem não pode pagar caro. Não dá para equipar a cidade inteira.

**Velka:** Eu a uso para ensinar um movimento. Posso demonstrar. Se desmontarmos, não teremos como praticá-lo aqui.

**Ghork:** Quero ver antes de escolher.

[A armação segue com ajudantes ao espaço de treino; Ghork recebe de Durn a autorização de apresentação, sem direito de desmonte ainda.]

**Guedra:** Deixem a passagem livre. Velka, mostre onde muda o apoio.

**Velka:** Aqui. Precisamos deste intervalo entre os apoios. Ghork, observe primeiro. Não precisa forçar a perna para concordar comigo.

**Korr:** Agora entendi. Mas preciso justamente dessas partes. Se eu tirar, não dá mais para fazer o movimento.

**Ghork — perguntas livres:**

- **“Korr, o que você conseguiria fazer?”** — **Korr:** Alguns conjuntos de proteção, todos testados antes do uso. Quero aproveitar esse material para quem não consegue comprar equipamento novo.
- **“Velka, quem vai poder aprender?”** — **Velka:** Quem vier às práticas que eu organizar. Não basta guardar a armação; vou ter que dar as aulas.

[De volta à oficina, o jogador entrega a autorização de retorno.]

**Interface:** “Reaproveitar favorece Korr e desmonta a armação. Preservar favorece Velka e mantém o instrumento para ensino. Confirmar um destino / Decidir depois.”

**Reaproveitar:**

**Ghork:** Vou apoiar as proteções. Korr, vamos conferir as peças antes de desmontar.

**Velka:** Eu queria manter a armação. Vou buscar outra forma de ensinar, mas não vou fingir que consigo substituí-la amanhã.

**Durn:** Podem começar. Korr desmonta; você anota as peças que saírem.

**Korr:** Vamos testar o primeiro conjunto antes de usar. Vai levar meu nome. Se algo falhar, quero que saibam quem fez.

**Preservar:**

**Ghork:** Vou manter a armação inteira e ajudar Velka com as aulas.

**Korr:** Vou buscar outro material. Só não deixem isso pegando poeira depois de tanta conversa.

**Velka:** Também não quero isso. Vou combinar a primeira aula com Guedra.

**Durn:** Então fica para as aulas. Vou registrar a entrega; a armação sai inteira.

**Conclusão:** destino registrado e executado; Ludos uma vez. O objeto não volta ao estado anterior para permitir o outro convite. As proteções não concedem bônus além do +1 caso Korr seja recrutado.

**Convite — Ghork:** Quer levar esse trabalho comigo para o campeonato?

- **Korr, favorecido:** Quero. E quero ver como as proteções se comportam em uso de verdade.
- **Velka, favorecida:** Quero. A prática continua com quem deixei responsável; a técnica pode ser vista na arena também.

Mostrar “Convidar / Depois” conforme acesso. **Preterido:** Korr: “Outra equipe vai apoiar minha oficina. Estou comprometido com ela.” / Velka: “Vou representar o ensino com outro grupo. Continuo querendo vê-lo praticar, mesmo do outro lado.”

<a id="r4"></a>
### R4 — A chave da cisterna

**Duração proposta:** longa. **Acesso:** X2/Y2 e matriz. **Locais:** cisterna → mercado → cisterna. **Participantes:** Tessa, Mavren, Ghork, Jorvi e trabalhadores figurantes. **Objetivo:** conferir salários e garantia, depois respaldar a suspensão ou a entrega. **Referências:** PC1-Casey para trabalho com efeitos na vida da cidade; PC2-compromisso para assumir uma obrigação incompatível com outra. Não transforma Tessa ou Mavren em chefão para resolver uma divergência legítima.

#### 1. A chave ainda está aqui

**Tessa:** A cisterna está quase pronta, mas os trabalhadores ainda não receberam. Queremos segurar a entrega até pagarem tudo.

**Mavren:** Propus deixar o dinheiro com Jorvi, para ele liberar quando entregarmos. Precisamos conferir o valor e as condições primeiro.

**Ghork:** O dinheiro está lá ou só prometeram?

**Mavren:** Vou conferir. Não entrego a chave só porque alguém disse que pagou.

**Tessa:** Antes de voltar com tudo decidido, ouça quem está esperando receber.

[O jogador ouve dois trabalhadores, em qualquer ordem.]

**Trabalhador 1:** Se entregar antes de pagar, o que ainda podemos cobrar com a obra nas mãos deles?

**Trabalhador 2:** Se parar, minha conta continua chegando. Quero saber se a garantia é dinheiro de verdade.

**Ghork:** Vou conferir as contas e o depósito. Depois volto para vocês decidirem sabendo o que existe.

[Tessa entrega uma cópia dos valores devidos. Mavren entrega a proposta de garantia; a chave permanece no canteiro.]

#### 2. O que está depositado

**Jorvi:** O dinheiro está aqui. Comparem esta cópia com a lista do que é devido.

**Ghork — investigação, ambas necessárias:**

- **“O contratante pode sacar antes da entrega?”** — **Jorvi:** Pelo acordo que aceitei, não. Esse dinheiro está reservado para os pagamentos deste registro.
- **“Quem confirma a entrega?”** — **Jorvi:** Quem receber a obra e os representantes dos trabalhadores. Não libero o dinheiro sem a confirmação deles.

**Ghork:** E se os trabalhadores não aceitarem o acordo?

**Jorvi:** Não entregue a chave como se tivessem aceitado. Leve uma cópia para discutirem.

[Ghork recebe comprovante e condições de liberação; não recebe o dinheiro dos trabalhadores nem o adiciona à própria bolsa.]

#### 3. O acordo que cada um aceita

**Mavren:** Conferi a lista. O depósito cobre toda a dívida. Nessas condições, posso terminar a obra.

**Tessa:** Dinheiro reservado é melhor que promessa. Mas ainda quero receber antes de entregar. Enquanto a obra está conosco, podemos exigir isso.

**Ghork — escolha:**

1. **“Vou respaldar a suspensão até quitarem.”** [Favorece Tessa.]
2. **“Vou ajudar a concluir com essa garantia verificada.”** [Favorece Mavren.]
3. **“Preciso pensar antes de assumir uma das posições.”** [Mapa, sem entregar chave ou concluir conflito.]

Antes de confirmar 1/2, informar: “Escolher uma posição define o recrutamento possível. Não é possível entregar e reter a cisterna nesta mesma resolução.”

**Suspensão:**

**Ghork:** O depósito existe, mas vou apoiar o pagamento antes da entrega.

**Tessa:** Vou anotar quem apoia essa decisão comigo. Quem discordar pode falar, como acabou de fazer.

**Mavren:** Eu discordo. Vou respeitar a retenção da chave, mas preciso arranjar trabalho enquanto esperamos.

[O jogador entrega o comprovante a Tessa, que o anexa à comunicação de suspensão. A chave fica sob custódia dos trabalhadores.]

**Tessa:** Essa conversa não quitou a dívida. Amanhã ainda vamos ter que negociar.

**Ghork:** Eu sei. Vou manter meu apoio, sem fingir que esperar não custa nada.

**Entrega garantida:**

**Ghork:** Vou ajudar a terminar. Conferimos o depósito, e o dinheiro só sai com a participação dos representantes.

**Tessa:** A garantia existe. Eu preferia receber antes, mas quem aceitou esse acordo pode declarar seu apoio.

[Mavren e os trabalhadores concluem a etapa restante. Ghork recebe a chave para acompanhar a entrega e a passa ao responsável figurante diante dos representantes. Jorvi confirma a liberação registrada; não há novo contratante nomeado.]

**Mavren:** Chave entregue, pagamento autorizado. Antes de irmos, quero que cada um receba sua cópia.

**Ghork:** Depois de carregar tanto papel, eu ia desconfiar se acabasse só num aperto de mão.

**Conclusão:** suspensão ou entrega registrada; Ludos uma vez. Suspender não provoca desastre na cidade; entregar não exige intimidação dos trabalhadores. No desfecho de suspensão, a negociação segue aberta, sem inventar quitação instantânea.

#### 4. Convite

**Ghork:** Quero que entre na minha equipe. Podemos representar esse compromisso no campeonato.

- **Tessa, favorecida:** Podemos. A negociação continua com os demais representantes. Vou levar nossa posição para a arena.
- **Mavren, favorecido:** Vou. Quero que esse trabalho me dê autonomia para escolher o próximo, não só pagar o atraso do anterior.

Mostrar “Convidar / Depois” conforme acesso. **Preterido:** Tessa: “Vou representar minha posição por outra equipe. Não preciso fingir acordo para continuar respeitando você.” / Mavren: “Tenho outro grupo apoiando meu ofício. Já assumi esse compromisso.”

<a id="r5"></a>
### R5 — Uma vaga diante do público

**Duração proposta:** curta. **Acesso:** classificação em Q-20, matriz e ponto de não retorno ainda não cruzado. **Locais:** coliseu → treino → coliseu. **Participantes:** Odrik, Lethra, Rask, Ghork e aprendizes figurantes. **Objetivo:** preparar e realizar um dos formatos na única vaga de exibição. **Referência:** PC1-Roy, parceria fora da luta principal; o conflito de apresentação é autoral.

**Rask:** Tenho uma vaga de apresentação antes das eliminatórias e duas propostas. Não cabe tudo no horário.

**Odrik:** Quero fazer um espetáculo em benefício da enfermaria. Posso atrair público sem pôr os pacientes em exposição.

**Lethra:** Quero mostrar o trabalho dos aprendizes, com o nome de cada um. Eles não vão ser figurantes de um lutador famoso.

**Ghork:** E o que eu faço?

**Rask:** Ajude a preparar a proposta que escolher. Depois me entregue o programa, para eu anunciar tudo direito.

**Escolha com confirmação:** “Espetáculo beneficente, favorece Odrik / Demonstração dos aprendizes, favorece Lethra / Depois”. Não adiciona sexta partida de campeonato nem D20 obrigatório.

**Espetáculo, preparação no treino:**

**Odrik:** Pensei em "Ghork, o terror que..." Pela sua cara, não gostou.

**Ghork — escolha:**

1. **“Meu nome já dá trabalho suficiente.”** — **Odrik:** Ghork, então. Guardo o terror para quando você atrasar minha entrada.
2. **“Anuncie a luta. Minha história eu conto.”** — **Odrik:** Justo. Vou chamar o público pelo que vamos mostrar aqui.

[Ghork recebe o programa, confere o nome e ajuda a marcar as entradas da exibição. No coliseu, entrega o programa a Rask.]

**Rask:** Odrik e seus parceiros se apresentam em benefício da enfermaria. Os organizadores recolherão as contribuições e prestarão contas do valor arrecadado.

[A apresentação é narrada; não simula vitória no torneio.]

**Odrik:** O público veio, ninguém virou motivo de humilhação e arrecadamos para a enfermaria. Gostei de trabalhar com você.

**Lethra:** Vou procurar outro lugar para os alunos. Espero que a próxima oportunidade não dependa de ter alguém famoso junto.

**Demonstração, preparação no treino:**

**Lethra:** Ghork, leia o programa como se estivesse anunciando. Quero saber se dá tempo de falar todos os nomes antes de começarmos.

**Ghork:** Dá. Mas vocês já teriam dado o primeiro golpe antes de eu acabar.

**Lethra:** Então vamos esperar o anúncio. O público precisa saber quem está vendo.

[Ghork recebe o programa corrigido e o entrega a Rask.]

**Rask:** Uma demonstração dos aprendizes de Lethra. Vamos apresentar cada participante antes de começarem o exercício.

[Rask apresenta figurantes sem criar novas fichas recorrentes; a demonstração acontece.]

**Lethra:** Dessa vez, ouviram os nomes deles antes de olhar para mim. Obrigada por conferir o programa.

**Odrik:** Vou levar o espetáculo a outra equipe. Se quiser ajuda com a entrada, pode pedir. Mas eu queria essa vaga, sim.

**Conclusão do conflito:** formato realizado, Ludos uma vez. Arrecadação pertence à enfermaria, não à moeda da criança nem ao bolso de Ghork; não cria obrigação de quantia mínima.

**Convite — Ghork:** Ainda tenho uma vaga na equipe para você. Quer disputar comigo?

- **Odrik, favorecido:** Quero. Na apresentação eu posso combinar a queda. Na semifinal, vou lutar para continuar de pé.
- **Lethra, favorecida:** Quero. Os aprendizes seguem com a prática combinada. Também tenho uma luta para fazer.

Mostrar “Convidar / Depois” conforme matriz. **Preterido:** Odrik: “Outra equipe vai apoiar minha apresentação. Vou com ela.” / Lethra: “Encontrei outro grupo para representar os alunos. Nos veremos na arena.”

Não iniciar a eliminatória ao terminar R5. O jogador ainda pode resolver outros convites antes da confirmação.

<a id="arco-3"></a>
## Campeonato, invasão e encerramento

### Entrada nas eliminatórias

**Acesso:** Q-20. **Local:** entrada administrativa do coliseu. **Participantes:** Ghork e Rask. **Encaixe:** abertura de Q-31, sem outra quest.

**Rask:** Confira sua equipe antes de entrar. Ao confirmar, você encerra os convites. Se ainda quer procurar alguém, esta é a hora.

**Interface:** apresentar pares não conhecidos, conflitos incompletos, favorecidos sem convite, restrições e heróis já recrutados, sem revelar personagens desconhecidos pelo nome. Exemplo de rótulo: “R3: oportunidade de recrutamento não explorada”. “Voltar à cidade / Confirmar equipe e entrar”. Cancelar preserva todas as pendências; confirmar encerra novos conflitos e convites, mesmo com zero aliados. O mapa não deixa de existir, mas visitar um local não reabre a janela.

**Ghork, zero recrutados:** Vou entrar sozinho.

**Rask:** Sua inscrição permite. Confirme quando estiver pronto para enfrentar os adversários.

**Ghork, com aliados:** Esta é a equipe. Vamos entrar.

**Rask:** Inscrição confirmada. Já vamos anunciar a primeira partida.

<a id="q-31"></a>
<a id="q-32"></a>
### Q-31 e Q-32 — As duas guildas do outro lado

**Base:** duas partidas contra as guildas rejeitadas. **Proposta de ordem para esta versão:** A enfrenta B e depois C; B enfrenta A e depois C; C enfrenta A e depois B. É uma ordem de roteiro a confirmar, sem sorteio adicional. **Objetivo:** vencer cada partida e responder às consequências da adesão. **Participantes:** Ghork, Rask e o líder da guilda adversária; combatentes são seus representantes, não necessariamente o mentor.

O bloco correspondente à guilda é executado uma vez na respectiva partida. Q-31 exige a confirmação da equipe; Q-32 exige a vitória de Q-31. Cada uma tem seu D20, revés e revanche. Fontes: reencontro competitivo desenvolvido a partir das relações de Terminus; não alegar que os pares espelham uma chave de Punch Club.

#### Contra Virmura

**Virmura:** Minha equipe quer vencer. O trabalho que perdemos no contrato ainda precisa ser financiado.

**Ghork:** Eu lembro.

**Virmura:** E isso não quer dizer que eu vá tirar minha equipe da disputa.

**Ghork — escolha:**

1. **“Nem pediria. Você me ajudou, mas eles vieram para lutar.”** — **Virmura:** Então estamos entendidos.
2. **“Quero ganhar de vocês também.”** — **Virmura:** Ainda bem. Eles vieram disputar uma luta de verdade.

**Rask:** Equipe de Ghork contra os representantes da guilda de Virmura. Aos lugares.

**Depois da vitória — Virmura:** Vocês venceram. Se precisarem de atendimento, vamos cuidar dos feridos dos dois lados.

**Ghork:** Obrigado. E diga a eles que não foi fácil.

**Revés:** a equipe de Ghork perde a tentativa; Virmura mantém atendimento sem pedir adesão. **Virmura:** “Volte quando estiver em condição. Minha equipe também vai se preparar.”

#### Contra Borun

**Borun:** Conseguimos outro serviço para manter a equipe. Eu queria aquele contrato, mas não fiquei esperando você se arrepender.

**Ghork — escolha:**

1. **“Fico feliz que tenham seguido em frente. Mas ainda quero vencer.”** — **Borun:** Pode tentar. Eles sabem se virar.
2. **“Você já me ajudou bastante. Hoje não vou pedir conselho.”** — **Borun:** Ainda bem. Hoje meus conselhos vão para eles.

**Rask:** Equipe de Ghork contra os representantes da guilda de Borun. Preparem-se.

**Depois da vitória — Borun:** Você leu bem a luta. Só não espere que eu fique feliz com o resultado.

**Ghork:** Não esperava. Gostei o suficiente por nós dois.

**Revés:** Ghork recua depois da interrupção da tentativa. **Borun:** “Eles também aprenderam a observar. Se voltar, encontrará gente prestando atenção em você.” Não entrega dica secreta que traia sua equipe.

#### Contra Sevrak

**Sevrak:** Minha escola continuou trabalhando depois da sua escolha. Meus representantes estão prontos para mostrar o que aprenderam.

**Ghork — escolha:**

1. **“Quero ver o que prepararam.”** — **Sevrak:** Verá de perto.
2. **“Não preciso me arrepender para reconhecer que são bons.”** — **Sevrak:** Espero que continue pensando assim depois da partida.

**Rask:** Equipe de Ghork contra os representantes da escola de Sevrak. Podem assumir as posições.

**Depois da vitória — Sevrak:** Você venceu. Reconheço sua competência, mas continuo discordando da escolha no contrato.

**Ghork:** E eu posso ouvir isso sem voltar a pedir uma vaga na sua escola.

**Revés:** **Sevrak:** “Minha equipe soube usar o que preparou. A próxima tentativa exigirá mais atenção.” Ghork pode preparar-se sem receber treino exclusivo gratuito da guilda hostil.

#### Conclusão de cada partida

**Rask, vitória:** Resultado confirmado. A equipe de Ghork avança.

**Rask, revés:** A equipe adversária venceu esta tentativa. Vocês podem pedir revanche. Falem comigo quando estiverem prontos.

Essa convenção proposta explicita a regra de reveses e revanches da visão: a etapa só fecha ao superar o confronto, sem eliminação definitiva após a falha do D20. Precisa de validação de ritmo e regulamento; não acrescenta outra rodada obrigatória para quem vence de primeira. Preparação e cargas seguem [retornos](#retornos).

<a id="q-33"></a>
### Q-33 — A equipe que seguiu sem você

**Acesso:** Q-32 vencida. **Local:** coliseu. **Objetivo:** vencer as quartas. **Base:** X/Y preterido apoiado por uma guilda rejeitada. **Proposta:** cobrança profissional. A identidade da patrocinadora continua adiada; usar sua identificação visual só depois da decisão P03. As falas não pressupõem qual das duas foi escolhida.

**Rask:** Nas quartas, a equipe de Ghork enfrenta [Faíscas, se X / Esteios, se Y], com apoio de uma das guildas que já disputaram esta campanha.

**Se adversária é Zagra:**

**Zagra:** Conseguimos apoio para preparar a equipe. Quero que veja o que fizemos com os recursos que tínhamos.

**Ghork:** Eu não disse que vocês eram incapazes.

**Zagra:** Naquela reunião, parecia que aceitar nosso plano era concordar em abandonar alguém lá embaixo.

**Ghork — escolha:**

1. **“Escolhi uma reserva maior para aquele serviço. Não quis dizer que vocês abandonariam alguém.”** — **Zagra:** Então vamos ver o que acha do nosso trabalho na arena.
2. **“Eu podia ter explicado melhor. Mas ainda escolheria a reserva.”** — **Zagra:** Isso eu consigo ouvir. Ainda quero vencer você.

**Se adversário é Darvek:**

**Darvek:** Gastamos com segurança e mesmo assim chegamos às quartas. Conseguimos apoio e treinamos.

**Ghork:** Eu não achei que vocês fossem ficar parados.

**Darvek:** Naquela reunião, pareceu que a segurança dos meus era só uma despesa que vocês não queriam pagar.

**Ghork — escolha:**

1. **“Aceitei menos reserva porque o reconhecimento era limitado. Entendi por que você queria mais.”** — **Darvek:** Espero que lembre disso quando contar o contrato.
2. **“Eu podia ter reconhecido melhor o risco que você queria evitar.”** — **Darvek:** Podia. Agora temos outra disputa para resolver.

**Batalha:** D20 contra a equipe preterida. Nenhum representante externo foi recrutado por inferência. Não remover bônus nem acrescentar personagens nomeados para completar o time rival.

**Vitória — Zagra:** Você passou. Mas demos trabalho. **Ghork:** Deram. Ganhar não muda isso.

**Vitória — Darvek:** Você venceu. Vou cuidar do retorno dos meus. **Ghork:** Boa volta. Obrigado pela luta.

**Revés — Zagra:** Trouxemos menos do que alguns queriam e o suficiente para esta tentativa. / **Darvek:** Preparar a volta não nos impediu de avançar hoje.

**Ghork, revés:** Vou me preparar para a revanche. Não vou mudar a história do contrato porque perdi aqui.

**Conclusão:** vitória abre Q-34; revés segue regra comum sem reabrir X/Y ou transferir patrocínio.

<a id="q-34"></a>
### Q-34 — Gente conhecida, lado contrário

**Acesso:** Q-33. **Local:** arena. **Objetivo:** vencer a semifinal. **Base:** exatamente cinco adversários, um por par; recrutou um, enfrenta o outro; recrutou nenhum, sorteio entre os dois. Sortear apenas na primeira entrada e preservar o resultado nas revanches. Isso evita que recarregar uma tentativa invente outro reencontro.

**Rask:** Do outro lado, cinco adversários. Talvez vocês já tenham se encontrado pela cidade. Hoje, todos querem a vaga na final.

**Ghork, zero aliados:** Alguns eu ainda não conheço. Com os outros, já tenho conversa pendente.

**Ghork, com aliados:** Já conhecemos alguns deles. E todos querem chegar à final tanto quanto nós.

Na primeira entrada, cada adversário recebe uma fala curta. Selecionar a coluna pelo estado real do conflito. “Favorecido sem convite” vale também para um convite bloqueado; não inventar que Ghork o recusou. “Conhecido, não resolvido” exige que a apresentação daquele candidato tenha ocorrido. Se Ghork só ouviu o responsável explicar um bloqueio e nunca viu o candidato, usar “Conflito desconhecido” para essa pessoa.

| Adversário | Conflito desconhecido | Conhecido, não resolvido | Favorecido sem convite | Desfecho favoreceu o outro |
| --- | --- | --- | --- | --- |
| Brakka | Sou Brakka. Trabalho de dia e luto quando consigo. Hoje consegui. | Não acertamos aquele pátio. Vim disputar uma coisa que já está combinada. | O treino continua. Entrei por esta equipe; valeu por ajudar a abrir o espaço. | O despacho ficou com o pátio. Procurei apoio para o treino e cheguei até aqui. |
| Nima | Nima. Meu grupo trabalha com entregas. Hoje a gente veio por esta entrada. | Ainda não fechamos aquele turno. Esta partida tem hora certa. | O despacho está funcionando. Minha inscrição ficou com este grupo. | Você escolheu o treino. Eu busquei outro apoio para os entregadores. |
| Sura | Sou Sura. Também sou combatente. Você vai conhecer essa parte agora. | O caso dos feridos continua aberto. Nossa luta não vai resolvê-lo. | Você respeitou o sigilo. Continuo grata, mesmo defendendo esta equipe. | A audiência foi sua escolha. Meu cuidado continua; minha equipe também. |
| Edrin | Edrin. Prefiro uma apresentação curta antes de uma disputa longa. | Ainda temos documentos para conferir. Aqui, pelo menos, sabemos o que está em disputa. | Você respaldou os depoimentos. Hoje nos inscrevemos em lados diferentes. | Segui com a via pública. Não preciso negar o trabalho de Sura para querer vencer. |
| Korr | Korr. Se ouvir um rangido, pode ser minha proteção. Já testei. | A armação ainda espera uma decisão. Meu treino não ficou esperando junto. | Usei o material. Agora quero ver o trabalho aguentar uma luta contra você. | Você preservou a armação. Procurei outros materiais e outro grupo. |
| Velka | Velka. Observe o apoio antes de tentar seguir o movimento. | Ainda não decidimos o instrumento. Podemos decidir esta partida. | O instrumento está em uso. Obrigada pelo apoio. Vou tentar derrotá-lo. | O material foi reaproveitado. Continuei ensinando com o que tinha. |
| Tessa | Tessa. Tem gente contando comigo, como deve haver com você. | A cisterna ainda exige um acordo. Hoje falo pela equipe que me inscreveu. | Obrigada por sustentar a posição dos trabalhadores. Aqui estamos em lados distintos. | A garantia existia. Eu preferia a quitação antes. Continuo defendendo isso. |
| Mavren | Mavren. Vim conquistar condições para escolher meu próximo trabalho. | Ainda precisamos concluir aquele acordo. Esta equipe já tem o seu. | Conferimos a garantia juntos. Não esqueço isso porque agora vou enfrentá-lo. | Você apoiou a suspensão. Procurei outro trabalho e segui com este grupo. |
| Odrik | Odrik. Pode guardar o aplauso para depois, se conseguir. | A apresentação ficou pendente. Esta entrada eu já ensaiei. | A exibição valeu o trabalho. Hoje não combinamos quem cai. | Levei o espetáculo a outro grupo. Não faltou vontade de entrar na arena. |
| Lethra | Lethra. Meus alunos vão reparar na minha base antes da sua. | A vaga ainda dava conversa. A semifinal já tem hora. | Obrigada por dar lugar aos aprendizes. Agora quero conquistar o meu na final. | O espetáculo ficou com a vaga. Eu segui procurando espaço para os alunos. |

**Ghork — resposta ao conjunto:**

1. **“Boa luta. Quero chegar à final tanto quanto vocês.”** — **Rask:** Aos lugares.
2. **“Quero vencer vocês. Não preciso fingir que nunca nos conhecemos.”** — **Rask:** Conhecidos ou não, só uma equipe passa. Preparem-se.

**Batalha:** uma rolagem por tentativa contra o time completo, bônus normal de recrutamento. Não há cinco lutas extras.

**Vitória — Rask:** A equipe de Ghork está na final.

**Ghork:** Obrigado pela luta. Foi bom encontrar vocês. Melhor ainda ganhar.

**Representante adversário:** usar o primeiro do time na ordem R1–R5. Brakka/Nima: “Vamos querer ouvir como foi a final.” Sura/Edrin: “Vá fazer sua parte. Nós cuidamos da nossa.” Korr/Velka: “Agora você já viu como trabalhamos.” Tessa/Mavren: “A arena acaba; o trabalho continua.” Odrik/Lethra: “Faça uma final que valha assistir.”

**Revés — Rask:** Vitória adversária nesta tentativa. A revanche permanece aberta.

**Ghork:** Vocês não facilitaram.

**Primeiro adversário do time:** “Você também veio para ganhar. Nos vemos na retomada.”

**Conclusão:** vitória abre Q-35. A semifinal não reconcilia automaticamente conflitos nem revela informações que só existiriam numa missão ignorada.

<a id="q-35"></a>
### Q-35 — O nome de Ghork

**Acesso:** Q-34. **Locais:** sede escolhida ou espaço de Guedra; depois arena. **Objetivo:** assumir a final como conquista própria, vencer e celebrar. **Base:** campeão fixo, passado com Orcquius, título e celebração. **Proposta:** U/V e diálogos. Referência temática PC1-Silver: apoio não elimina interesses próprios; final desenvolvida a partir do arco confirmado.

#### U/V — Com quem falar antes de entrar

**Proposta de função:** escolher uma conversa curta para preparar a atitude de Ghork diante da final. U retoma o limite com o mentor; V retoma o trabalho com X/Y. Ambas mostram autonomia antes da vitória, reconhecem decisões anteriores e convergem no mesmo confronto. São cenas da quest, sem bônus, perda de aliado, nova missão ou escolha que mude o chefão.

**Interface:** “Conversar com o mentor na sede (U) / Encontrar a equipe do contrato com Guedra (V)”. A escolha determina qual visita será narrada antes da chamada; não afirma que o outro vínculo foi abandonado.

**U — sede:**

**Mentor:** Virmura: “Quero que você saia dessa luta inteiro. Ainda há muito para viver depois dela.” / Borun: “Quero ouvir como pretende enfrentar Torvak.” / Sevrak: “A final mostrará à cidade o trabalho que fizemos.”

**Ghork:** Quando cheguei, achei que bastava ganhar um título para todo mundo parar de me tratar como inútil.

**Mentor:** Virmura: “Alguns vão continuar discordando, mesmo se você vencer.” / Borun: “Torvak tem o título há anos. Você viu como ainda cobra reconhecimento dos outros.” / Sevrak: “Podem concordar com o resultado e continuar discordando sobre você.”

**Ghork — escolha:**

1. **“Quero ganhar mesmo assim. Não preciso que você escolha por mim.”**
2. **“Vou entrar por mim e pelo trabalho que fizemos. Não para encerrar toda discussão.”**

**Mentor:** Virmura: “Está bem. Vou cuidar dos nossos.” / Borun: “Então vá. Você não precisa da minha aprovação para cada passo.” / Sevrak: “Defenda essa posição quando sair da arena também.”

**V — espaço de Guedra:**

**Darvek, se X:** Trouxe a versão final do levantamento. Registrei a reserva de segurança e o custo, como você pediu.

**Zagra, se Y:** A versão final deixa claro qual trecho não verificamos. Não deixei ninguém exagerar o alcance da nossa viagem.

**Ghork:** Obrigado. Não achei que fosse querer ver um relatório antes da final.

**Guedra:** Pode deixar aí. Quero ver sua base, não sua caligrafia.

**Ghork:** Eu achava que ganhar esta luta resolveria tudo. Já tenho uma lista do que vai continuar pendente.

**Ghork — escolha:**

1. **“Vou ganhar o título. As outras respostas eu dou depois.”**
2. **“Quero lutar sem prometer que a vitória vai resolver tudo.”**

**Representante:** Darvek: “Isso eu consigo entender.” / Zagra: “Bom. Prometa que vai lutar, então.”

**Guedra:** Mostre sua base. Depois vá para a chamada.

#### A final

**Torvak:** Você chegou. O general não está aqui para ver.

**Ghork:** Não preciso dele aqui para lutar.

**Torvak:** Sua guilda vai usar qualquer resultado contra mim. Até depois de tudo que fiz por esta cidade.

**Ghork:** Você cancelou nossos treinos porque meu mentor não pediu desculpas. Chegamos aqui apesar de você.

**Torvak:** E agora acha que merece ocupar meu lugar?

**Ghork — escolha:**

1. **“Quero conquistar o título. Você ainda vai ter que lutar para mantê-lo.”** — **Torvak:** É o que pretendo fazer.
2. **“Você já fez seu nome. Vim conquistar o meu.”** — **Torvak:** Então pare de falar dos meus e entre na arena.

**Rask:** Final do campeonato de guildas de Terminus. Torvak e sua equipe contra a equipe de Ghork.

[Batalha de D20. A reputação do campeão aparece em sua técnica e resistência; não perde automaticamente por abstinência ou dose errada.]

**Revés:** Torvak vence a tentativa. **Torvak:** “Ainda estou aqui.” **Ghork:** “Eu também. Vou me preparar para voltar.” **Rask:** “A revanche segue disponível.” A conversa de U/V não é repetida nem invalidada; perder uma tentativa não devolve Ghork à exigência de aprovação universal.

**Vitória:**

**Rask:** Resultado confirmado. Ghork e sua equipe vencem o campeonato!

**Se zero aliados:** substituir o anúncio por “Ghork vence o campeonato!”; não mostrar companheiros inexistentes recebendo o título.

[Tempo para a reação. Ghork procura o próprio nome no anúncio e ri antes de falar. O ataque ainda não começa.]

**Ghork — escolha:**

1. **“Pode repetir? Quero ouvir mais uma vez.”** — **Rask:** Ghork, campeão de Terminus!
2. **“Eu consegui.”** — **Mentor:** Virmura: “Conseguiu.” / Borun: “Conseguiu. Agora pode se gabar um pouco.” / Sevrak: “Você trabalhou por esta vitória. Aproveite.”

**Torvak:** Eu perdi. Ouvi o resultado.

**Ghork:** Eu também. Não vou pedir que goste dele.

[Se houver aliados, cada um aparece na comemoração; uma fala é escolhida pela ordem R1–R5: Brakka “O turno de hoje vai dar assunto.”; Nima “Todo mundo aqui? Então podemos comemorar.”; Sura “Primeiro, deixem eu ver esse braço. Depois eu comemoro junto.”; Edrin “Este resultado eu faço questão de registrar.”; Korr “A proteção aguentou. Eu também, por pouco.”; Velka “Quero lembrar o último movimento.”; Tessa “Tem muita gente que vai querer saber como foi.”; Mavren “Finalmente uma entrega que dá vontade de anunciar.”; Odrik “Eu tinha uma fala pronta. Esqueci. Ganhei junto!”; Lethra “Vou ouvir os alunos comentarem cada passo.”]

**Rheed:** Parte da torcida gritava o nome de Ghork até perder a voz. Outros ainda defendiam o antigo campeão. Ghork demorou a sair da arena e ouviu os dois lados.

**Conclusão:** título conquistado, sem prêmio em dinheiro inventado, mensagem de Orcquius ou cura. A celebração termina quando Q-36 começa; o ataque já estava preparado.

<a id="q-36"></a>
### Q-36 — As portas da festa

**Acesso:** celebração de Q-35. **Locais:** arena e área de serviço do coliseu. **Objetivo:** alcançar o alquimista e derrotar a operação local enquanto os demais sustentam a evacuação. **Base:** pacto, capturas, ruptura de Torvak e confronto único transformado. **Proposta:** ações e falas. **Referência:** núcleo já aprovado na base narrativa; PC1-químico para dependência e coerção. Não derivar poderes novos do Profeta das Sombras.

#### 1. A ordem que não era para o público

[Invasores, misturados às equipes de serviço e apoiados pelos acessos facilitados pela quarta guilda, fecham passagens. Seldan tenta deter o movimento.]

**Seldan:** As cargas estavam autorizadas. Homens armados bloqueando o público, não. Saiam da frente da saída!

**Dorga:** Mantenha a ordem. A arena fica sob nosso comando até acertarmos as condições com as outras guildas.

**Ghork:** Vocês prepararam isso antes da luta.

**Torvak:** A tomada da arena estava combinada. Eu...

[Invasores arrastam espectadores e um companheiro da quarta guilda para junto dos carregamentos.]

**Torvak:** Soltem essas pessoas. Não era isso que vocês me disseram.

**Savel:** Precisamos de gente para sustentar a produção. Você precisa da próxima dose. Cumpra sua parte.

**Torvak:** Eu aceitei tomar a arena. Não vou entregar os meus para você.

**Savel:** Vai voltar a pedir quando sentir falta da dose.

**Torvak:** Então vai ter que esperar até eu tirar essas pessoas daqui.

[Torvak intervém contra os invasores e abre uma retirada. Sua decisão não cura sua dependência. O capuz e a apresentação do fornecedor deixam de esconder sua origem; ele assume o comando dos remanescentes como Neral.]

**Neral:** Continuem levando os capturados. Eu cuido de quem chegar ao corredor.

#### 2. Um caminho até o responsável

**Virmura:** Feridos por aqui. Deixem esta passagem livre!

**Borun:** A saída lateral está livre. Eu fico aqui até o último passar.

**Sevrak:** Aprendizes comigo. Retirem o obstáculo sem bloquear quem está vindo.

**Rask:** Sigam as orientações nas saídas. Não voltem para buscar seus pertences!

**Ghork — escolha:**

1. **“Eu vou atrás do fornecedor. Mantenham a passagem.”** — **Borun:** Vá pelo corredor de serviço. Estamos tirando o público deste lado.
2. **“Quem está cuidando dos que já saíram?”** — **Virmura:** Nyra e Jorvi estão recebendo quem saiu. Pirka cuida do transporte. Vá atrás de quem está dando as ordens.

[Ghork segue com todos os recrutados que tiver; com zero, segue sozinho. Mentores e Torvak continuam nas próprias tarefas. Não há requisito de herói para abrir a passagem, acertar ritual ou resistir à transformação.]

**Torvak, ao cruzar Ghork:** O fornecedor está junto das caixas. Eu fico com estes aqui.

**Ghork:** Vou atrás dele. Depois, você ainda vai responder pelo que combinou.

**Torvak:** Sei.

#### 3. O fornecedor

**Neral:** Você viu quantos dependem de mim. Acha que matar o fornecedor acaba com a necessidade da dose?

**Ghork:** Vi você usar isso para mandar levar pessoas à força.

**Neral:** Quando eu era pequeno, só recebia a dose quem tinha força ou posição. Aprendi a produzi-la. Depois, aprendi a decidir quem recebia.

**Ghork — escolha:**

1. **“E passou a fazer com os outros o que fizeram com você.”** — **Neral:** Passei a decidir. Não vou abrir mão disso.
2. **“Solte os capturados. Eles não são pagamento.”** — **Neral:** São o que permite que tudo continue funcionando.

[Neral usa sangue como catalisador e ergue uma proteção ritual; Ghork enfrenta a defesa, sem puzzle de símbolos ou poder exclusivo de recrutado. Pressionado, Neral ingere os concentrados. A metamorfose deforma o corpo, amplia a força e torna os movimentos e a magia menos precisos.]

**Neral:** Eu conheço as doses. As fórmulas são minhas.

**Ghork:** Então sabe o que está tomando.

**Neral:** Sei o que posso fazer com isso.

**Batalha única:** a transformação integra a apresentação e a escalada deste confronto. Uma vitória no D20 resolve a batalha inteira, sem segunda rolagem obrigatória para uma “fase dois”. As falhas produzem tentativas e reveses dentro do mesmo encontro; não repetem o consumo ou fazem o vilão voltar à forma anterior. O tiro de cena da transformação ocorre uma única vez, antes da resolução decisiva.

**Revés sem nova rolagem:** Ghork é repelido para um recuo do corredor. **Ghork:** “Ainda não consegui passar.” **Borun, da passagem de evacuação:** “Recue por aqui. A saída continua aberta.” A tentativa termina; a ação fica suspensa entre cenas para preparação e acesso ao Coreto. Não corre relógio que mate capturados enquanto o jogador usa o menu. Na retomada, **Neral:** “Voltou para pedir uma dose?” **Ghork:** “Voltei para acabar com isso.” Repetir a tentativa com a transformação preservada. O revés não permite abandonar a campanha ou pular a batalha.

**Vitória:** [Ghork supera a proteção e derrota Neral; as doses não matam o antagonista no lugar do jogador.]

**Neral:** Acha que só tenho gente aqui? Há outros grupos. Em Daratrine... até no Conselho. Vamos tomar este continente antes que percebam por onde entramos.

**Ghork:** Quem está no Conselho?

[Neral morre sem identificar infiltrados. A previsão de conquista é sua convicção, não a voz do narrador. O selo permanece intacto.]

#### 4. Os registros nas caixas

[Com o comando derrotado, os demais completam a retirada e libertam os capturados. Ghork recolhe correspondência entre os registros do fornecedor e a entrega a Seldan para preservação, mantendo uma cópia para exame.]

**Seldan:** Vou registrar onde encontraram a correspondência. Mantenham esses papéis separados das cargas de retirada.

**Ghork:** Ele falou no Conselho de Daratrine. Isso tem relação?

**Trecho de correspondência proposto para revisão de continuidade:** “O recebimento anterior foi confirmado pelo nosso contato dentro do Conselho de Daratrine. Mantenha as próximas instruções neste canal. Nenhum nome deve acompanhar a remessa.”

[O conjunto inclui resposta ao recebimento e registros correspondentes; sua coerência comprova a ligação, conforme o desfecho confirmado. A forma material de autenticação e o conteúdo final precisam de validação; não desenhar um brasão como prova suficiente nem inventar um conselheiro identificado.]

**Seldan:** As informações dos registros conferem. Eles tinham contato dentro do Conselho, mas não há nome aqui.

**Ghork:** Então não vou sair acusando alguém só por causa da ameaça que ele fez antes de morrer.

**Virmura:** Estamos cuidando dos resgatados. Quem tomava as doses também precisa de tratamento. A morte dele não acabou com a dependência.

**Conclusão:** operação local desmantelada, Neral morto, capturados libertados, vínculo documental com o Conselho preservado. Sem terceiro chefe, viagem ou investigação obrigatória adicional. Segue E07.

<a id="e07"></a>
### E07 — Notícias que cabem numa conversa

**Encaixe:** encerramento de Q-36. **Locais:** coliseu, sede escolhida e Coreto. **Participantes:** Ghork, Torvak, Virmura, Lala, recado de Dam, Rheed e criança.

#### Responsabilidade

**Torvak:** Pressionei Rask para cancelar os treinos de vocês. Aceitei tomar a arena. Queria forçar a cidade a devolver nosso lugar.

**Ghork:** Você ajudou no resgate. Mas aquelas pessoas foram capturadas por causa do acordo que você aceitou.

**Torvak:** Eu sei. O resgate não desfaz o que aceitei.

**Ghork — escolha:**

1. **“Não estou pronto para perdoar.”** — **Torvak:** Não vou pedir que decida agora.
2. **“Quero que você responda pelo que fez.”** — **Torvak:** Vou ter que responder.

**Virmura:** Primeiro, ele precisa de tratamento. Depois ainda terá de responder pelo que fez.

[Dorga permanece vinculada ao golpe pelos fatos presenciados; esta versão não decide prisão, julgamento ou reparação específica. Não criar cena de absolvição por silêncio.]

#### Terceiro contato

**Lala:** Ghork? Você está bem?

**Ghork:** Estou vivo. Ganhei o campeonato.

**Lala:** Ganhou? Ghork! Espera... por que começou dizendo que está vivo?

**Ghork:** Atacaram a festa. Libertamos os capturados e derrotamos quem comandava. Ainda tem feridos e muita coisa para fazer.

**Lala:** Você ganhou... e depois passou por tudo isso. Conte no seu tempo. Estou ouvindo.

**Ghork — escolha:**

1. **“Quero contar a final primeiro.”** — **Lala:** Conte. Mas depois vai me contar o que aconteceu na festa também.
2. **“Primeiro, me diga como você está.”** — **Lala:** Continuo trabalhando nas peças. E tentando entender como cabe tanta notícia numa conversa com você.

**Ghork:** E as peças?

**Lala:** Comecei a mostrar para as pessoas. Algumas gostaram, outras pediram ajustes. Estou descobrindo o trabalho que cada encomenda dá.

**Se contribuiu:**

**Lala, recado de Dam:** Dam mandou um recado: "Sua contribuição chegou. Compramos parte do material e estamos acertando o resto do reparo. Obrigado por dizer quanto podia mandar."

**Ghork:** Uma parte do material. Ainda longe da casa que prometi.

**Lala:** Mas era dessa parte que ele precisava agora.

**Se adiou:**

**Lala, recado de Dam:** Dam mandou um recado: "Reorganizei o reparo sem contar com o dinheiro. Ainda falta material. Queria sua ajuda, mas prefiro saber com o que posso contar a ficar esperando sem prazo. Me conte como você está."

**Ghork:** Ganhar o campeonato não pagou aquele reparo. Eu sei.

**Lala:** Então conte como você está. Sem prometer uma casa só para encerrar o assunto.

**Convergência:**

**Ghork:** Quero continuar minha vida aqui. Hoje tenho uma vitória para contar. Antes de prometer outra coisa, preciso saber como vou cumprir.

**Lala:** Pode começar prometendo notícias.

**Ghork:** Essa eu faço questão de cumprir.

**Ghork:** Encontramos documentos ligados ao Conselho. Ainda não sabemos quem está envolvido. Preciso contar isso, mas não quero que acusem alguém sem prova.

**Lala:** Vou contar o que você sabe. E deixar claro o que ainda não sabemos.

#### Volta ao Coreto

**Rheed:** Foi assim que terminou aquela vitória em Terminus. Ghork ficou com o título. E ainda havia quem discordasse dele.

**Criança — escolha:**

1. **“E ele foi para Daratrine?”** — **Rheed:** Esta história termina em Terminus. Os papéis ficam para outra conversa.
2. **“Ele ainda queria ser um grande mercenário?”** — **Rheed:** Queria. Aprender a fazer uma promessa que podia cumprir não diminuiu esse sonho.

**Rheed:** Agora posso guardar o frasco. Ele também trabalhou bastante hoje.

**Conclusão da campanha:** encerrar após a conversa, sem abrir missão obrigatória no Conselho. O percurso solo conserva todos esses vínculos, sem sermão por não ter recrutado.

<a id="retornos"></a>
## Intervenções, derrotas e retornos

### Conversas interrompidas, condições e entregas

Sair para o mapa acontece entre cenas ou pela opção explícita “Depois”. Uma conversa em andamento e uma batalha precisam terminar antes da visita ao Coreto. Reentrar numa quest mostra o objetivo pendente e a fala de retomada; não repete automaticamente toda a apresentação.

| Situação | Retomada escrita |
| --- | --- |
| Item ainda não buscado | Destinatário: “Ainda falta o material que combinamos. A origem está indicada no pedido.” Ghork: “Vou buscar antes de encerrar.” |
| Item recebido, entrega pendente | Ghork: “Trouxe o que pediu. Vamos conferir?” Destinatário: “Vamos.” Executar a entrega e seu diálogo específico. |
| Etapa já entregue | Ghork: “A entrega ficou certa?” Destinatário: “Ficou. O próximo passo é o que combinamos depois.” Não dar outra cópia utilizável nem repetir recompensa. |
| Escolha de projeto adiada | Responsável: “Ainda não destinei o material. Quer retomar as propostas?” Opções: retomar / depois. |
| Convite antes da janela | Ghork: “Quero falar do campeonato quando meu compromisso estiver definido.” Favorecido: “Volte quando puder fazer o convite.” Interface informa o marco que falta. |
| Convite aguardando X/Y | Favorecido: “Ainda preciso acertar meus compromissos depois da investigação. Volte quando ela terminar.” Não mostra custo definitivo antes de conhecer a trajetória. |
| Herói já recrutado | Ghork: “Tudo pronto para irmos juntos?” Aliado: “Estou com a equipe.” Não repetir +1 ou Ludos. |
| Depois do ponto de não retorno | Ghork: “A equipe já foi confirmada. Nos vemos na arena ou depois dela.” Não oferecer pagamento para reabrir convite. |

Os termos “destinatário”, “responsável” e “favorecido” são papéis preenchidos pelo interlocutor da quest, não novos NPCs. Preferir o diálogo específico já escrito quando houver; estas falas cobrem apenas retorno sem novo acontecimento.

### Bloqueios de recrutamento e exceções com Ludos

As causas abaixo são propostas para tornar a matriz legível. Um bloqueio não muda o resultado de uma disputa anterior nem declara deslealdade do candidato. A autorização para substituir alguém numa tarefa resolve disponibilidade; não compra amizade.

**Vermelho antes de resolver:** ao tentar iniciar, o responsável da quest explica a condição. A exceção fica disponível no próprio diálogo, depois da fala. Sem saldo, o jogador pode sair e continuar a campanha.

| Par | Bloqueio vermelho — fala do responsável | Depois da intervenção paga |
| --- | --- | --- |
| R1 | **Nyra:** Precisei ocupar o pátio com os preparativos que sobraram. Não consigo ceder esse turno agora. | **Nyra:** Os responsáveis aceitaram levar os preparativos ao próprio depósito. O turno voltou a ficar livre. Posso ouvir as duas propostas. |
| R2 | **Sura:** Não temos como acompanhar a conferência e a apresentação enquanto a equipe está cobrindo os atendimentos. | **Sura:** Conseguimos cobertura para esse período. Os pacientes ainda decidem o que autorizam; agora podemos acompanhar o trabalho. |
| R3 | **Durn:** A armação foi reservada para uma tarefa de preparação. Não vou prometer o mesmo material aos dois projetos. | **Durn:** Quem reservou encontrou um conjunto próprio. A armação está disponível para escolhermos um destino. |
| R4 | **Tessa:** A reunião com os envolvidos ficou sem acompanhamento. Não vou pedir que escolham por quem não conseguiu vir. | **Tessa:** Conseguimos reorganizar os turnos e reunir os envolvidos. Agora podemos discutir as duas propostas. |
| R5 | **Rask:** O ajuste da preparação ocupou a vaga de exibição. Não tenho um intervalo para conceder agora. | **Rask:** O ajuste foi concluído antes. Há tempo para uma apresentação. Vamos ouvir os dois formatos. |

**Vermelho depois da resolução ou preto no convite:** o conflito permanece concluído. Usar a fala do candidato favorecido, com a tarefa que o impede de acompanhar Ghork:

| Candidato | Recusa de disponibilidade | Aceitação após cobertura |
| --- | --- | --- |
| Brakka | Preciso acompanhar um turno de trabalhadores. Não posso prometer estar na arena ao mesmo tempo. | Outro responsável assumiu o turno. Posso ir com você. |
| Nima | A distribuição das entregas deixou um turno sem responsável. Estou cobrindo até acertarem. | O turno ganhou cobertura. Posso assumir o convite. |
| Sura | Preciso cobrir atendimento. Sem alguém no meu lugar, não posso entrar na equipe. | O atendimento ficou coberto. Agora posso acompanhá-lo. |
| Edrin | Assumi uma conferência de registros que coincide com a preparação da equipe. | Conseguimos dividir a conferência. Posso lutar com você. |
| Korr | Ainda respondo por uma entrega de proteções. Não vou abandonar o serviço pela metade. | A oficina conseguiu dividir o acabamento. Posso ir sem deixar a entrega descoberta. |
| Velka | Combinei acompanhar uma prática e não tenho quem assuma. | Quem já conduz os exercícios aceitou acompanhar essa prática. Posso entrar na equipe. |
| Tessa | Preciso acompanhar uma negociação. As pessoas me escolheram para estar lá. | Os demais representantes aceitaram dividir esse acompanhamento. Posso disputar com você. |
| Mavren | Tenho uma etapa de trabalho sob minha responsabilidade. Não posso simplesmente deixar a chave. | A etapa ganhou outro responsável. Posso aceitar o convite. |
| Odrik | Estou comprometido com a preparação de outra apresentação. Não consigo garantir as duas presenças. | Os responsáveis dividiram os preparativos. Posso lutar com você. |
| Lethra | Preciso acompanhar os aprendizes. Ainda não há quem assuma essa prática. | A prática ficou acompanhada. Posso entrar na equipe. |

O custo aparece antes de confirmar. A justificativa pertence à narrativa de Rheed:

**Criança:** E se alguém pudesse assumir essa tarefa?

**Rheed:** Poderia. Eu teria de encaixar uma ajuda que não tinha contado. Esse pedido custa [preço exibido de Ludos].

**Interface:** “Pagar e ouvir essa versão / Continuar sem a intervenção”. Com saldo insuficiente: “Ludos insuficientes”; permitir recusar e continuar. O marcador de preço é uma pendência de economia, não texto literal da versão publicada.

**Depois do pagamento:**

**Rheed:** Justamente naquele dia, alguém apareceu querendo terminar cedo. Pela primeira vez nesta história, uma lista foi repartida antes de virar discussão.

[Exibir a aceitação específica acima. Se a missão inteira foi aberta, executar seu roteiro; se o conflito já estava resolvido, mostrar o convite do favorecido. O pagamento não recruta automaticamente.]

**Criança, ao tentar trazer os dois:** E se os dois viessem?

**Rheed:** O pedido abriu espaço para o compromisso que Ghork assumiu. A escolha pelo outro projeto continua feita.

**Sem pagamento — Ghork:** Entendi. Vou seguir com a equipe que conseguir reunir.

**Candidato:** Boa preparação. Nos encontraremos de outro jeito.

O acesso pago fica aberto até o ponto de não retorno; revisitar não cobra de novo. Resolver o conflito concede sua recompensa uma vez. Convidar depois não repete essa recompensa, com ou sem intervenção.

### Opções pagas na campanha principal

São alternativas de diálogo nos três arcos, todas propostas. Usam a compra dentro do diálogo e têm continuação gratuita completa. Não anulam hostilidade, retaliação, escolha X/Y ou a final. Preços permanecem pendentes.

**L1 — E04, depois das recusas das guildas.** Opção paga da criança: “E se ele conseguisse terminar sem alguém interromper?”

**Rheed:** Meruna tinha um pequeno sino para controlar a reunião. Eu havia esquecido de pôr o sino na mesa.

**Meruna:** Deixem Ghork concluir.

**Ghork:** Vou trabalhar pela guilda que escolhi. O que vocês fizeram por mim continua importante. Não vou oferecer metade de um contrato que não tenho como dividir.

**Mentor rejeitado:** usar Virmura se rejeitada; senão Borun. **Virmura:** “Eu ouvi. Ainda preciso sustentar o trabalho da minha equipe.” / **Borun:** “Ouvi. E vou disputar os próximos trabalhos com a sua.”

Retoma E04 na fala do mentor escolhido. Sem comprar, usar uma das duas respostas gratuitas. Não transforma o sino em item adquirido nem em reconciliação.

**L2 — Q-20, cobrança dos horários a Torvak.** Opção paga da criança: “Alguém que ouviu a promessa de Rask pode estar perto?”

**Rheed:** Uma pessoa tinha ido buscar um objeto esquecido e ficou ouvindo. Era uma demora bastante conveniente.

**Guedra:** Eu estava aqui quando os horários foram concedidos. Não houve dúvida no combinado.

**Torvak:** Não neguei que estavam concedidos. Eu mandei mudar.

**Ghork:** Então não vou aceitar que contem isso como uma confusão nossa.

Retoma o encerramento da cena, sem reaver horários, mudar dificuldade ou revelar o pacto. A alternativa gratuita já permite a Ghork cobrar o abuso; esta acrescenta uma testemunha.

**L3 — Q-35, durante a celebração.** Opção paga da criança: “E se Rask desse um momento para ele falar?”

**Rheed:** Pela primeira vez em muito tempo, Rask economizou um anúncio para ouvir outra voz.

**Rask:** Ghork quer dizer uma coisa.

**Ghork, com aliados:** Conseguimos. Quero que ouçam os nomes de quem lutou comigo.

[Rask anuncia somente os recrutados presentes.]

**Ghork, sozinho:** Entrei sozinho na arena. Não cheguei sozinho a esta cidade. Muita gente me ajudou, e parte dela quis ganhar de mim hoje.

**Ghork, comum:** Obrigado. Vou aproveitar este título.

[Parte do público responde; não há aprovação universal. Volta à comemoração antes do ataque.]

### Preparação, cargas e revanches

Todas as batalhas usam a regra confirmada: `D20 + recrutados > dificuldade`. Igualdade é falha; Ghork não conta para o bônus. As dificuldades de B4, C4, Q-31–Q-36 permanecem a calibrar; todas precisam permitir vitória solo gratuita. B4/C4 ocorrem antes de qualquer recrutamento, portanto devem ser revisadas obrigatoriamente com bônus zero. Fazer mais cadeias antes da adesão não libera convites antecipados.

Depois de uma falha no D20, mostrar “Usar uma carga e rolar de novo / Aceitar o revés”. Sem carga, informar estoque zero e seguir para o revés ao confirmar. O novo resultado substitui o anterior; pode gastar sucessivas cargas. Só exibir a cena de derrota quando o jogador parar ou ficar sem cargas e aceitar a falha. A compra acontece no Coreto antes da batalha ou depois de um revés, nunca interrompendo a luta.

**Coreto — criança:** Quero ter outra chance se a rolagem falhar.

**Rheed:** Posso vender uma carga de nova rolagem por [preço exibido]. Você decide usá-la depois de uma falha. Se a nova rolagem também falhar, ela passa a ser o resultado da tentativa.

**Compra confirmada com saldo:** **Rheed:** “Está guardada para quando decidir usar.” Adicionar uma carga e descontar uma vez. **Saldo insuficiente:** **Rheed:** “Faltam Ludos para essa compra. Ghork ainda pode tentar a batalha sem ela.” Não criar dívida ou compra automática.

**Preparação gratuita após revés, espaço de Guedra:**

**Guedra:** Mostre onde perdeu o apoio. Devagar.

**Ghork — escolha:**

1. **“Fui atrás do golpe e perdi a saída.”** — **Guedra:** Vamos repetir a volta antes do avanço.
2. **“Quero observar o alcance antes de tentar outra vez.”** — **Guedra:** Fique nesta distância. Você decide quando entrar.

**Ghork:** Posso voltar sem fingir que a primeira tentativa não aconteceu.

**Guedra:** Pode. Não consigo prometer o resultado da próxima.

É cena de preparação, não treino numérico, cura instantânea ou requisito para revanche. Durante a invasão, usar o recuo local de Q-36 em vez de passear até Guedra no meio da emergência. Entre tentativas, o Coreto representa a pausa do relato; não desloca fisicamente a criança ao passado.

Não reaplicar eventos únicos ao repetir uma batalha: apresentação, transformação, confirmação de equipe, escolha U/V, aquisição de documentos e concessão de recompensa. B4 só entrega o fardo depois da vitória; C4 mantém o estojo restituído antes do duelo, mas conclui a quest depois da vitória e entrega final. As partidas preservam adversário e estado das relações.

<a id="referencias"></a>
## Referências de Punch Club utilizadas

As fontes externas são exemplos de construção, não decisões aprovadas para Terminus. A consulta foi dirigida aos eventos usados abaixo; não se afirma uma auditoria de todas as 85 definições do primeiro jogo ou das 179 do segundo, nem execução das rotas. Os [READMEs dos dumps](../../docs_externas/punch-club/dumps/README.md) explicam conteúdo de teste e limites da extração estática.

| Referência | O que foi conferido na fonte | Aplicação e limite em Terminus |
| --- | --- | --- |
| PC1-Mick/Casey | [mick_first_time](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/mick_first_time.txt) encaminha à academia e liga apoio a necessidades cotidianas; [casey_hi](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/casey_hi.txt) apresenta trabalho de entregas, com texto condicionado ao histórico do assalto. Localização: `d_coach_office_1`–`5`, `pizza_win_casey1/2`, `pizza_casey1`. | A1/B1 e tarefas entre estabelecimentos: ajuda e trabalho apresentam pessoas que voltam depois. Não importar emprego repetitivo ou condicionar o socorro à vitória. |
| PC1-Silver | [third_place_rookie](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/third_place_rookie.txt), campo `logic_uScriptAct_ShowMultianswer_answers_14`, declara `6b/6c`: recusas ao pedido de perder uma luta, uma oferecendo outra ajuda. A fala `6a` existe na localização mas não nesse menu. | A5/B5/C5 e Q-20: o mentor competente tem interesses próprios que Ghork pode contrariar. Nenhuma dívida com Don, perda combinada ou falsa afirmação de que o nó permite aceitar a derrota. |
| PC1-Roy | [red_hi](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/red_hi.txt) relaciona conversa de amizade, treino e problema cotidiano do carro; localização `red_hi_1`–`10` e ações `red_train`, `engine_fix`. | R1 e convivência dos recrutáveis: parceria tem vida fora da disputa. Não importar carro, irmã, romance ou morte obrigatória. |
| PC1-químico | [chemist_hi](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/chemist_hi.txt) apresenta preparações e minimiza efeitos; [chemist_bad](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/chemist_bad.txt) responde à queixa oferecendo preparações adicionais. Localização `chemist_hi_1`–`6`, `chemist_bad_1`–`6`. | E03, Q-20 e Q-36: oferta, custo observado e coerção. Ghork não é obrigado a consumir; dependência do campeão é o desenvolvimento confirmado de Terminus. |
| PC1-Bobo e busca do objeto | [bobo_acoustic](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/bobo_acoustic.txt) contém confronto por reclamação de música, chamada `StartFight`, condicionais de encontro anterior e opções posteriores de ajuda; [sport_acoustic](../../docs_externas/punch-club/dumps/punch-club-1/fluxos/codigo/sport_acoustic.txt) leva a consultar Whay e outros interlocutores sobre aparelho auditivo. | B4/C4: receber uma notícia, ir cobrar o responsável, lutar e retornar com consequência. R2/R3: circulação de objeto entre pessoas. Não transformar a perda auditiva de Durn em motivo de combate ou reproduzir toda a cadeia de Bobo. |
| PC2-compromisso | [MickAskHelp](../../docs_externas/punch-club/dumps/punch-club-2/fluxos/grafos/Event_II-MickAskHelp--63287651110796620.txt), nós 31/37/39, apresenta exigência de sensei, abandono da polícia e menu; [PoliceAskHelp](../../docs_externas/punch-club/dumps/punch-club-2/fluxos/grafos/Event_II-PoliceAskHelp---4340704808112074940.txt), nós 40/42/71/72, apresenta exigência de carreira e incompatibilidade com academia, conforme histórico. | E04/E06 e conflitos de recrutamento: esclarecer ajuda, compromisso e exclusão antes de confirmar. Não importar o tratamento da mãe, carreira policial ou tecnologia; Virmura já salvou Ghork sem exigir adesão. |

Textos consultados: [PT-BR de PC1](../../docs_externas/punch-club/dumps/punch-club-1/localizacao/lng_ptbr.txt) e [PT-BR de PC2](../../docs_externas/punch-club/dumps/punch-club-2/localizacao/lng_pt-br.txt). As [definições de PC1](../../docs_externas/punch-club/dumps/punch-club-1/quests/quests.txt) distinguem gatilhos, início, sucesso, falha e recompensas; as [de PC2](../../docs_externas/punch-club/dumps/punch-club-2/quests/quests.txt) preservam pais e conexões. Essa separação orientou acesso, objetivo, conclusão e continuidade das fichas acima. IDs ou conexões presentes no dump não provam disponibilidade numa partida.

O núcleo do golpe e dos Ignotos mantém as referências já confirmadas na [base narrativa](base-narrativa.md#referências-narrativas). As minas, o problema dos mapas, os pares e as novas cobranças não são apresentados como episódios dos jogos de referência. As falas deste documento são autorais.

<a id="revisao"></a>
## Revisão e decisões para o autor

### Decisões que esta versão propõe

| ID | Onde aparece | Proposta e custo de adotá-la |
| --- | --- | --- |
| P01 | A2–A5, B2–B5, C2–C5, E04 e entrega do contrato | Resolvida para a integração do protótipo por instrução do autor: um croqui acompanha a entrada da passagem estreita até a bifurcação; o outro acompanha a retirada no sentido inverso. Registros autorizados comprovam os pontos de partida e a direção. Cada cadeia fornece evidências suficientes; Elune auxilia a comparação sem exigir completar as demais guildas. O trecho conhecido coincide; o restante permanece desconhecido. A demonstração integra A2/B3/C3 e a defesa de E04. |
| P02 | E04 | A hostilidade se manifesta em recusa de recursos institucionais e competição por contratos e campeonato, preservando cuidado e gratidão. O custo dramático é que não há traição pessoal para justificar a ruptura; a disputa institucional precisa bastar para o tipo de inimizade desejado. |
| P03 | E06 e Q-33 | Usar a mágoa profissional já proposta, sem perda presumida de emprego ou pagamento. A guilda patrocinadora continua sem identidade escolhida, por decisão anterior de adiar; as falas funcionam sem nomeá-la, mas seu emblema precisa de decisão antes da encenação final. |
| P04 | A1, contatos e encerramento | Enfermaria e abrigo na sede; Virmura com fala direta; recargas necessárias acessíveis por ela em qualquer rota. O custo é preservar atendimento mesmo na hostilidade institucional. Não define cura, prazo ou preço de recarga. |
| P05 | Q-20 e E07 | Projeto de peças de Lala, reparo pedido por Dam, remessa por Jorvi/Pirka e custo de uma sessão adicional de preparação. A contribuição é pessoal; exige validar logística e eventual representação da moeda sem confundi-la com Ludos. |
| P06 | R1–R5 e tabela de acesso | Adotar pares e conflitos do catálogo, R2/R4 longos e a matriz proposta. O custo é escrever coberturas de trabalho por trajetória; avaliar se as restrições ficam compreensíveis e se o jogador dispõe de Ludos suficientes, sem presumir balanceamento pronto. |
| P07 | Q-31–Q-35 e retornos | Ordem das duas guildas e convenção de tentativas/revanches no campeonato. A visão já garante revanche; a forma de anunciá-la precisa soar coerente com o regulamento e funcionar no ritmo da visual novel. |
| P08 | Q-35 | U/V como visita ao mentor ou à equipe do contrato. Mantém uma bifurcação curta e convergente; o efeito é reconhecimento narrativo, sem uma vantagem mecânica exclusiva. |
| P09 | Q-36 | Encenação da evacuação, transformação uma vez dentro da mesma batalha e correspondência com o Conselho. O teor e a autenticação dos papéis exigem revisão de continuidade antes de virarem prova visual definitiva. Não identificar infiltrados. |
| P10 | Intervenções e batalhas | Falas e condições de opções pagas nos três arcos, cobertura de recrutamento e reveses gratuitos. Preços, recompensas, dificuldades e ritmo das revanches continuam pendentes de balanceamento. O roteiro não resolve esses números por inferência. |
| P11 | B4 e C4 | Dois confrontos de cobrança solicitados pelo autor, encaixados nas cinco quests das respectivas guildas. Não são novas cadeias, mas aumentam as batalhas de um percurso que explore essas rotas. Exigem validar a passagem da recuperação à condição de lutar, sem exigir cura completa. |

P01 tem resolução concreta autorizada para esta integração, registrada acima. P03 permite diálogo completo com patrocinador não nomeado. As demais questões têm uma solução escrita para revisão, sem aprovação automática. Preços, dificuldades e autenticidade material dos documentos continuam limitações de implementação; não impedem a leitura do roteiro, mas precisam ser resolvidos antes de publicar uma versão jogável definitiva.

### Conferência por percurso

| Cenário | Resultado exigido na revisão |
| --- | --- |
| B1 antes de C1 e C1 antes de B1 | Os salvamentos não pressupõem informação do outro; E02/E03 só aparecem ao completar as três apresentações. |
| Só uma cadeia até a quinta missão | A adesão tem informação suficiente; as outras apresentações bastam, sem exigir quinze quests. |
| Ouvir duas ou três quintas propostas | Nenhuma adesão antecipada; só a confirmação de execução fecha as outras cadeias. |
| A/X, A/Y, B/X, B/Y, C/X, C/Y | Duas apresentações, duas exclusivas e uma classificação; três variantes de mentor e nenhum sexto recrutado. |
| B4/C4 com bônus zero | Vitória possível sem aliado ou Ludos; revés não perde o item ou a campanha; cada entrega só acontece no estado correto. |
| R1/R2 resolvidos antes da adesão | Ludos recebidos uma vez; convite posterior mantém o favorecido, inclusive em preto/vermelho. |
| Preto com favorecido bloqueado | Não oferecer o outro integrante como troca automática; intervenção ou seguir sem recrutar. |
| Vermelho antes/depois da resolução | Um pagamento abre missão ou convite; nunca cobra duas vezes pelo mesmo acesso. |
| Sem saldo para uma intervenção | Há saída gratuita da conversa e campanha completa; recrutamento opcional pode continuar fechado. |
| Zero recrutados | Cinco adversários sorteados na semifinal, preservados na revanche; título no singular; invasão e desfecho completos. |
| Cinco recrutados | Um de cada par; os cinco opostos na semifinal; bônus +5, sem fala de aliado ausente. |
| Conflito ignorado ou não concluído | Sem agradecimento por ação que não ocorreu, sem ressentimento inventado; distinguir os dois estados. |
| Contribuição e adiamento em X/Y | Duas respostas viáveis, mesma amizade, efeito reconhecido na preparação e em E07. |
| Cancelar ponto de não retorno | Mapa e R5 permanecem disponíveis. Confirmar fecha os cinco pares, mesmo com saldo posterior. |
| Falhar, rerrolar, falhar e aceitar revés | Consumo por carga; última rolagem vale; cena de revés uma vez; retomada sem repetir abertura ou recompensa. |
| Derrota no confronto com Neral | Invasão não produz vítimas adicionais por tempo de menu; transformação não se repete; a vitória ainda é necessária. |
| Consultar fontes externas | Não confundir texto de localização com opção de menu; não promover adaptações a decisões confirmadas. |

Esta conferência verifica coerência editorial e condições descritas; não é evidência de teste de uma implementação. O texto deve passar por leitura em voz alta e validação autoral das propostas antes de migrar para o protótipo ou a engine. A revisão não exige um novo documento de Jornada do Herói.
