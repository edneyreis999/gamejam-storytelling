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

**Rheed:** [expressao=feliz] Aí está você. Chegue mais perto; guardamos um lugar. Eu ia contar justamente a história de alguém que quase não chegou.

**Criança — escolha:**

1. **“Quem não chegou?”** [expressao=confuso] — **Rheed:** [expressao=feliz] Ghork. Guardem esse nome, todos vocês. Ele ia adorar saber que eu pedi.
2. **“Espera... essa história tem um final triste?”** [expressao=triste] — **Rheed:** [expressao=neutro] Tem seus momentos difíceis. Fique por perto, e vamos passar por eles juntos. Mas nada de espiar o final. Acabei de abrir o frasco.

**Rheed:** [expressao=neutro] Ghork tinha vindo de longe, de Daratrine. Trabalho, um novo começo, alguém que cuidasse da perna ferida... Terminus devia ter tudo isso. Mas, quando chegou, mal conseguia respirar.

[Rheed bebe. O som da plateia cede à respiração de Ghork. A chegada é fragmentada; não se inventam acompanhantes identificados.]

**Ghork:** [expressao=triste] Eu consigo... só preciso de um instante...

**Virmura:** [expressao=neutro] Calma. Não tente levantar. Olhe para mim, aqui.

**Ghork:** [expressao=confuso] Eu cheguei...? Aqui é Terminus?

**Virmura:** [expressao=neutro] É. Você chegou. Continue olhando para mim, Ghork. Agora deixe o trabalho comigo.

[O atendimento prossegue sem escolha de procedimento pelo jogador. Elipse. Ghork desperta estabilizado na enfermaria; a perna permanece enfaixada.]

**Ghork:** [expressao=feliz] Bom... eu tinha planejado uma primeira impressão melhor.

**Virmura:** [expressao=neutro] Eu já me contento com uma que você sobreviva para contar. Guarde o discurso, está bem? Mal recuperou o fôlego.

**Ghork:** [expressao=neutro] Foi você que... Você me salvou?

**Virmura:** [expressao=neutro] Salvei. E você ainda está sob meus cuidados. Nada de começar a me agradecer saindo da cama.

**Conclusão:** socorro realizado; inicia Q-A1 em momento posterior da recuperação. Não declarar prazo de cura nem usar o atendimento como dívida de adesão.

<a id="e01"></a>
### E01 — O mesmo problema sobre a mesa

**Encaixe:** introdução única à primeira Q-A2, Q-B2 ou Q-C2 iniciada. O mentor acompanha Ghork à casa de contratos; os outros líderes estão presentes, com apresentação breve caso ainda desconhecidos. Essas presenças não substituem B1/C1. **Referência:** PC2-compromisso; ver fontes.

**Meruna:** [expressao=neutro] Olhem estes dois mapas. Supostamente da mesma mina, mas não parecem concordar. Os relatos também não ajudam muito. Estou disposta a financiar uma investigação completa, mas antes preciso saber quem é capaz de entender isso.

**Ghork:** [expressao=confuso] Então quer que a gente entre lá e veja qual mapa está certo?

**Meruna:** [expressao=neutro] Ainda não. Primeiro vou escolher uma guilda. Por enquanto, trabalhem com os mapas e as fontes que podemos consultar aqui fora. Mostrem o que conseguem descobrir antes de alguém pôr os pés nas galerias.

**Virmura:** [expressao=neutro] E mostrem como pretendem tirar sua gente de lá depois. De preferência, inteira.

**Borun:** [expressao=feliz] Também gosto bastante dessa parte. Fica difícil aproveitar o pagamento quando a gente não volta.

**Sevrak:** [expressao=neutro] Antes de começarmos: todas as guildas recebem as mesmas cópias, correto?

**Meruna:** [expressao=neutro] Correto. O pagamento é alto, e o contrato é exclusivo. Uma guilda responde pelo levantamento inteiro. Não vou dividir o trabalho entre três planos concorrentes.

**Ghork — perguntas livres:**

- **“Não seria mais fácil contratar alguém que já andou por essas minas?”** [expressao=confuso] — **Meruna:** [expressao=neutro] Cada pessoa conhece um pedaço. Preciso de alguém que junte esses relatos e me diga onde faltam informações. Até agora, ninguém conseguiu me mostrar o quadro completo.
- **“E a guilda poderia usar uma parte do pagamento para se preparar para o campeonato?”** [expressao=neutro] — **Meruna:** [expressao=neutro] Depois de ganhar sua parte, a guilda decide o que fazer com ela. Eu estou pagando por um levantamento das minas, Ghork. Se quiser um título na arena também, vai ter de conquistá-lo por conta própria.
- **“Posso ouvir o que as três guildas pretendem fazer antes de escolher uma?”** [expressao=confuso] — **Meruna:** [expressao=neutro] Pode. Ouvir uma proposta não obriga você a aceitá-la. Mas, quando vier a esta mesa e se comprometer a executar uma delas, estará entrando naquela guilda. Tenha certeza antes de decidir.

**Meruna:** [expressao=neutro] Tragam suas fontes e mostrem como vão conferir os mapas. Se algo continuar incerto, digam. Cada guilda será ouvida. Ghork, conheça o trabalho delas antes de escolher de qual vai fazer parte.

**Saída:** volta à segunda missão que disparou E01. As demais segundas missões retomam o contrato sem repetir esta reunião. A pista cartográfica concreta é tratada na decisão P01, ao final; sua resolução não atribui a divergência a fraude ou geografia mutável.

<a id="e02"></a>
### E02 — Um nome anterior ao cartaz

**Encaixe:** depois da terceira apresentação. Conversa breve com Virmura e passagem no coliseu, integradas à entrega que acaba de terminar. **Base:** passado do campeão e rivalidade; **proposta:** modo de revelá-los.

**Virmura:** [expressao=neutro] Você anda olhando bastante para o coliseu. Já ouviu falar do campeão de lá?

**Ghork:** [expressao=feliz] O nome dele está em todo lugar. Desde que cheguei, vi mais vezes que o meu.

**Virmura:** [expressao=neutro] Então vou contar uma coisa que não está nos cartazes. Torvak lutou ao lado de Orcquius e Glavius.

**Ghork:** [expressao=confuso] Orcquius e Glavius? Os dois?

**Virmura:** [expressao=neutro] Os três eram do mesmo time. Isso acabou. Cada um seguiu seu caminho.

**Ghork:** [expressao=neutro] Se eu vencesse alguém que lutou ao lado de Orcquius... ele ia ter de...

**Virmura:** [expressao=neutro] Você teria vencido Torvak, Ghork. Já é bastante coisa para querer. Conheça o homem antes de transformar essa luta num recado para o general.

[No coliseu, Torvak devolve a atenção a um veterano no meio dos cumprimentos.]

**Torvak:** [expressao=feliz] Este homem carregou dois dos nossos até a saída! Se vão contar como voltamos para casa, tratem de contar a parte dele também.

[O público responde. Ghork aproxima-se depois.]

**Ghork:** [expressao=confuso] Torvak? É verdade que você lutou ao lado de Orcquius e Glavius?

**Torvak:** [expressao=neutro] É verdade. Pelo jeito, você veio de Daratrine?

**Ghork:** [expressao=neutro] Vim. Meu nome é Ghork.

**Torvak:** [expressao=neutro] Ghork. E agora está andando com aquelas guildas que acham que podem me ensinar a administrar uma arena.

**Ghork — escolha:**

1. **“Vou tentar chegar à final. Quero enfrentar você lá.”** [expressao=neutro] — **Torvak:** [expressao=feliz] Então tem um bocado de trabalho antes da nossa próxima conversa. Melhor começar.
2. **“O que aconteceu com seu antigo time? Por que vocês se separaram?”** [expressao=confuso] — **Torvak:** [expressao=neutro] A equipe acabou. Essa parte da minha vida não está aberta a perguntas.

**Ghork:** [expressao=neutro] Se eu conseguir chegar à final... vai lembrar do meu nome, não vai?

**Torvak:** [expressao=feliz] Rask vai gritar seu nome para o coliseu inteiro. Acredite, não vai precisar me lembrar.

**Saída:** prestígio e ligação com Orcquius conhecidos em qualquer rota. A causa da ruptura não vira objetivo ou promessa de investigação. Segue E03.

<a id="e03"></a>
### E03 — Uma oferta para o corpo acompanhar

**Local:** entrada do coliseu. **Participantes:** Ghork e Savel. **Referência:** PC1-químico. Oferta conhecida, sem compra ou consumo presumidos.

**Savel:** [expressao=neutro] Ghork, não é? Acabei ouvindo a conversa. Chegar à final é uma bela ambição. A parte difícil vai ser acompanhar o ritmo dos treinos.

**Ghork:** [expressao=confuso] Deixe eu adivinhar. Você vende alguma coisa que ajuda?

**Savel:** [expressao=neutro] Preparo fórmulas para quem já não consegue acompanhar o esforço que o trabalho exige. Alguns puderam voltar a ganhar a vida. Achei que gostaria de saber.

**Ghork:** [expressao=neutro] Já estou tratando essa perna. Não quero atrapalhar o tratamento.

**Savel:** [expressao=neutro] Claro. Percebi que ainda está se recuperando. Por isso vim falar agora, antes que a pressão para acompanhar os outros acabe em outro ferimento.

**Ghork — escolha:**

1. **“Antes de falar em tomar isso... o que tem nesse frasco?”** [expressao=confuso] — **Savel:** [expressao=neutro] A preparação dependeria do seu estado. Eu não entregaria uma dose para depois deixar você por sua conta. Seria preciso acompanhar o tratamento. **Ghork:** [expressao=neutro] Está bem, mas você ainda não me disse o que tem dentro. **Savel:** [expressao=neutro] Passe no boticário. Lá podemos conversar com calma sobre suas dúvidas.
2. **“Por enquanto, vou continuar com o tratamento que já tenho. Está ajudando.”** [expressao=neutro] — **Savel:** [expressao=neutro] Como preferir. Se sentir que precisa de algo mais, já sabe onde procurar.

**Savel:** [expressao=neutro] Boa sorte para conquistar sua vaga, Ghork. É uma pena ver alguém capaz passar despercebido por falta de uma única oportunidade.

**Ghork:** [expressao=neutro] Me deem uma. O resto eu faço.

**Saída:** vendedor apresentado. Preços, efeitos e eventual consumo permanecem uma decisão de sistema; este roteiro escreve a campanha completa sem consumo. Não mostrar um botão de compra sem essas definições.

<a id="e08"></a>
### E08 — Aprender a sair do golpe

**Encaixe:** abertura da primeira B4 ou C4 iniciada, antes da notícia que leva à cobrança. Não repetir na outra cadeia. O código não indica ordem cronológica. **Locais:** sede de Virmura e espaço de Guedra. **Objetivo:** mostrar a passagem dos pequenos deslocamentos à preparação para lutar, sem declarar cura completa, prazo numérico ou ganho de atributo.

[Ao longo das atividades anteriores, os cuidados continuam. Uma elipse mostra Ghork voltando de uma caminhada sem precisar interrompê-la no mesmo ponto. Virmura confere sua condição antes de ele começar a praticar.]

**Virmura:** [expressao=neutro] Você já pode praticar movimentos curtos, com alguém acompanhando. Se essa perna falhar, pare. Eu sei que está se sentindo melhor. Isso não significa que pode ignorar qualquer dor e continuar.

**Ghork:** [expressao=neutro] Eu quero lutar, Virmura. Mas também gostaria de voltar andando depois.

**Virmura:** [expressao=neutro] Ótimo. Diga isso à Guedra. Ela sabe preparar um treino que sirva para você, em vez de obrigar você a caber no exercício dos outros.

[No espaço de treino, Guedra observa Ghork antes de pedir uma tentativa.]

**Guedra:** [expressao=neutro] Sou Guedra. Vamos ver como você se move. Vou avançar; mostre como recuaria. Ainda não estamos tentando ganhar nada.

**Ghork:** [expressao=feliz] E eu tinha planejado um primeiro ataque tão magnífico...

**Guedra:** [expressao=feliz] Guarde para depois. Primeiro me mostre uma fuga magnífica.

[Práticas acompanhadas, separadas por elipses: Ghork aprende a guardar uma passagem de recuo e a observar a preparação do golpe. Não são batalhas, testes ou montagens de cura milagrosa.]

**Guedra:** [expressao=neutro] Você já pode enfrentar alguém sem depender de um resgate. Aprendeu a deixar espaço para recuar. Agora precisa reconhecer quando usá-lo, mesmo que queira continuar lutando.

**Ghork — escolha:**

1. **“Meu primeiro adversário pode ser alguém que não seja o maior lutador da arena? Só para começar com calma.”** [expressao=feliz] — **Guedra:** [expressao=neutro] Pode. Escolher uma luta que consegue enfrentar faz parte do treino. Não precisa se arriscar só para impressionar alguém.
2. **“E, se eu deixar alguém fechar minha saída, pelo menos vou saber onde errei.”** [expressao=neutro] — **Guedra:** [expressao=neutro] Vai saber. Depois vai praticar de novo. Entender o erro é um começo; fazer os pés se moverem de outro jeito exige treino.

**Saída:** preparação demonstrada; retomar a notícia inicial de B4 ou C4. Virmura oferece esse cuidado antes da adesão, sem pedir promessa de guilda. A cena justifica a possibilidade de lutar, não uma vitória automática.

<a id="guilda-a"></a>
## Guilda de Virmura

As tarefas de A adaptam a aproximação por ajuda prática de PC1-Mick/Casey. A tensão entre apoio e exigência usa PC1-Silver. A cadeia não exige resolver R2 nem recrutar Sura. Fontes e limites em [referências](#referencias).

<a id="q-a1"></a>
### Q-A1 — Um trabalho que cabe sentado

**Acesso:** E00 concluída, em momento posterior do tratamento. **Local:** sede de Virmura. **Participantes:** Ghork, Virmura, Lala pelo colar; recado de Dam. **Objetivo:** combinar abrigo e trabalho e conhecer a guilda. **Base:** acordo confirmado; tarefas, voz e contato são propostas.

[Virmura põe uma caixa de ataduras perto da cadeira.]

**Virmura:** [expressao=neutro] Está vendo esta caixa? Ataduras limpas de um lado, as que precisam de lavagem do outro. Pode fazer sentado. Se cansar, me avise.

**Ghork:** [expressao=confuso] E se eu ajudar... posso ficar aqui? Ainda não tenho onde morar.

**Virmura:** [expressao=neutro] Pode. Um lugar para ficar, em troca do trabalho que conseguir fazer enquanto melhora. Esse é o acordo. Ter salvado sua vida não faz de você meu devedor.

**Ghork — escolha:**

1. **“Quero ajudar. Só não quero prometer mais do que essa perna vai deixar.”** [expressao=triste] — **Virmura:** [expressao=feliz] Então comece pela caixa. Se precisar descansar, ela continua aqui. Ataduras não têm o costume de fugir.
2. **“Então prepare-se para ver uma separação de ataduras digna de entrar para a história.”** [expressao=feliz] — **Virmura:** [expressao=feliz] As limpas numa pilha separada, por favor. Vamos conseguir isso antes de encomendar sua estátua.

[Ghork encontra no fundo da caixa tiras separadas para transporte de feridos.]

**Ghork:** [expressao=confuso] Então vocês não cuidam só de quem chega aqui? Também saem para buscar os feridos?

**Virmura:** [expressao=neutro] Saímos. E alguém precisa encontrar o caminho para trazer todos de volta. Braços fortes não adiantam muito se a equipe inteira se perder.

**Ghork:** [expressao=neutro] Eu quero entrar no campeonato. E ganhar. Se eu voltar com esse título... quero ver dizerem outra vez que não sirvo para nada.

**Virmura:** [expressao=neutro] Pode me contar tudo sobre esse título enquanto separa. As ataduras não vão se arrumar sozinhas, campeão.

[Mais tarde, Ghork prepara o contato com Lala. Proposta de recarga: Virmura verifica e repõe mana quando necessário, como parte desse convívio, sem preço ou prazo fixado.]

**Ghork:** [expressao=neutro] Lala me deu esse colar para a gente continuar conversando. Disse que alguém que sabe usar mana pode recarregar. Você conseguiria...?

**Virmura:** [expressao=neutro] Me dê aqui. Isso eu consigo. Depois fale com ela e conte que chegou. Imagino que queira ouvir de você.

**Lala:** [expressao=feliz] Ghork! Até que enfim! Eu estava... espera. Onde você está? O que é isso atrás de você?

**Ghork — escolha:**

1. **“É uma enfermaria. A perna estava pior do que eu pensava, Lala.”** [expressao=triste] — **Lala:** [expressao=confuso] Uma enfermaria? Ghork, por que não falou logo? Tem alguém aí com você?
2. **“Encontrei uma curandeira. Virmura. Ela está cuidando de mim.”** [expressao=neutro] — **Lala:** [expressao=neutro] Ai, ainda bem. Está bem. Me conta o que aconteceu, desde o começo.

**Ghork:** [expressao=triste] Quase não cheguei vivo. Virmura salvou minha vida. Vai me deixar ficar enquanto melhoro, e eu ajudo no que conseguir.

**Lala:** [expressao=neutro] Então deixe ela cuidar de você, por favor. Depois você me conta da cidade. Dam me passou uma lista: como está sua perna, onde está dormindo e se está comendo. Nessa ordem. Pelo visto, não posso improvisar.

**Ghork:** [expressao=feliz] Diga que estou sendo muito bem vigiado. Nem consegui impressionar a curandeira com as ataduras ainda.

**Lala:** [expressao=feliz] Vou dizer que tem alguém cuidando de você. Ser vigiado nunca impediu você de se meter em confusão.

[Elipse de recuperação. Ghork passa a tolerar pequenos deslocamentos; não há cura declarada.]

**Virmura:** [expressao=neutro] Tenho duas entregas aqui perto que você pode fazer: uma no mercado, outra no coliseu. Escolha por qual começar. E, se precisar descansar, pare. Os pacotes podem esperar junto com você.

**Conclusão:** apresentação A feita; abre Q-A2, B1 e C1. Conhecer/resolver R1 e R2 passa a ser possível conforme seus locais. Trabalho não concede adesão nem Ludos por inferência.

<a id="q-a2"></a>
### Q-A2 — O caminho de volta

**Acesso:** A1; E01 se ainda não vista. **Locais:** enfermaria e casa de contratos. **Objetivo:** levar uma cópia autorizada a Elune e voltar com as referências a conferir. **Participantes:** Virmura, Elune e Ghork; registros sem pacientes nomeados.

**Virmura:** [expressao=neutro] Podemos usar este registro de resgate. Cubra o nome do paciente antes de copiar. Meruna precisa conhecer o caminho, não saber de quem eram os ferimentos que nos levaram até lá.

**Ghork:** [expressao=confuso] Olhe isto: "Da passagem estreita até o ponto de troca da maca." Tem uma distância, mas... começaram a contar de onde?

**Virmura:** [expressao=neutro] Essa é uma pergunta. Outra: passaram andando por esse espaço ou levaram uma maca? Não quero descobrir a diferença com um paciente em cima.

**Ghork — investigação, ambas disponíveis:**

- **“Vou marcar os pontos de referência. Pelo menos assim dá para ver de que parte do caminho estão falando.”** [expressao=neutro] — **Virmura:** [expressao=neutro] Só os que realmente descreveram. Se precisar adivinhar, deixe uma pergunta. Podemos procurar a resposta depois; um erro que parece certeza só atrapalha.
- **“Quem carregava a maca? Isso não mudaria o tempo do percurso?”** [expressao=confuso] — **Virmura:** [expressao=neutro] Uma equipe de resgate. E mudaria, sim. Carregar alguém em grupo é diferente de andar sozinho. Não use o passo de uma pessoa para calcular o deles.

[Ghork organiza e recebe uma cópia sem dados pessoais. O objetivo passa a ser levá-la a Elune, na casa de contratos. A cópia registra o ponto de partida e a direção da retirada, conforme P01.]

**Elune:** [expressao=neutro] Posso ficar com uma cópia? Preciso pôr ao lado dos mapas e acompanhar o caminho como está descrito.

**Ghork:** [expressao=neutro] Virmura autorizou compartilhar o trajeto. Tirei os nomes, para a história dos pacientes não ir junto.

**Elune:** [expressao=neutro] Obrigada. Leve estas anotações para ela. Consigo comparar os marcos, mas preciso confirmar de onde partiram para essas distâncias fazerem sentido.

[Ghork recebe os apontamentos e volta à enfermaria. Entregar a Virmura conclui a etapa de investigação.]

**Ghork:** [expressao=triste] Depois de tudo isso, só podemos garantir um trecho? Eu esperava ter mais para mostrar à Meruna.

**Virmura:** [expressao=neutro] Preferia ficar na frente dela e fingir que conhece a mina inteira? Podemos mostrar como conferimos esta parte. Nisso ela pode confiar.

**Ghork:** [expressao=neutro] Não. Quero que ela acredite na gente. Vou mostrar o trabalho que deu chegar até aqui.

**Conclusão:** ouvir as duas perguntas, consultar Elune e entregar seus apontamentos a Virmura abre A3. Não exige R2 nem transforma os feridos em pistas dos Ignotos.

<a id="q-a3"></a>
### Q-A3 — Quem fica sem atendimento

**Acesso:** A2. **Locais:** sede e oficina. **Objetivo:** montar uma escala sem esvaziar a enfermaria e buscar o material emprestado para a demonstração. **Participantes:** Virmura, Durn e Ghork.

[Ghork vê duas listas: atendimento e possível equipe da expedição.]

**Ghork:** [expressao=feliz] E se levássemos todo mundo que entende de resgate para a demonstração? Meruna ia ver quanta ajuda esta guilda pode oferecer.

**Virmura:** [expressao=neutro] E, se precisasse de uma curandeira depois, encontraria uma bela enfermaria vazia.

**Ghork:** [expressao=confuso] É. Não pensei nisso. Quantos podemos levar sem fazer falta aqui?

**Virmura:** [expressao=neutro] Uma equipe pequena basta para mostrar como trabalhamos. Cada um com uma tarefa. Depois fazemos a conta direito: quem vai a campo e quem mantém este lugar funcionando.

**Ghork — escolha:**

1. **“Vou preparar uma escala. Quem sai, quem fica e do que cada pessoa vai cuidar.”** [expressao=neutro] — **Virmura:** [expressao=neutro] Ótimo. Nada de pôr a mesma pessoa nas duas listas. Eu adoraria aprender esse truque, mas ainda não consegui.
2. **“Deixe eu explicar à Meruna. Ela precisa saber por que não vamos levar a guilda inteira.”** [expressao=neutro] — **Virmura:** [expressao=neutro] Explique. Só não ofereça o trabalho da enfermaria de graça para melhorar a proposta. Alguém precisa pagar pelo atendimento que continua aqui.

[Nas duas alternativas, Ghork prepara a mesma escala; muda quem introduz sua justificativa em A5. Virmura entrega um pedido de empréstimo de material.]

**Virmura:** [expressao=neutro] Leve este pedido a Durn. Ele tem uma maca e suportes para a demonstração. A equipe vai carregar. Seu trabalho é conferir se vieram todas as peças.

[Na oficina, Ghork entrega o pedido.]

**Durn:** [expressao=neutro] Vão pegar emprestado para o teste? Está bem. Depois me devolvam cada peça. Inclusive as pequenas que o pessoal costuma esquecer.

**Ghork:** [expressao=neutro] Entendido. Podemos conferir juntos antes de a equipe levar? Quero saber pelo que estou respondendo.

**Durn:** [expressao=neutro] Podemos. Fique onde eu consiga ver seu rosto quando falar. Vou mostrar como as peças encaixam, e você pergunta o que precisar.

[Durn demonstra. Ghork acompanha a entrega à sede e apresenta o recibo a Virmura.]

**Ghork:** [expressao=confuso] Depois de cuidar da enfermaria e da equipe de campo... ainda vai sobrar gente e tempo para o campeonato?

**Virmura:** [expressao=neutro] Isso faz parte do planejamento. O contrato ajudaria a pagar o trabalho. Não vai espremer mais uma hora no dia, por mais bonito que você peça.

**Ghork:** [expressao=feliz] Já ouvi umas promessas bem confiantes sobre isso. Ainda estou esperando alguém cumprir.

**Conclusão:** escala definida e material recebido na sede, sem gasto do jogador; abre A4. Memória de tom: “registro” ou “explicação”, retomada na primeira fala de A5.

<a id="q-a4"></a>
### Q-A4 — Uma maca na porta

**Acesso:** A3. **Locais:** sede, área livre, e oficina na devolução. **Objetivo:** testar a coordenação e devolver o conjunto emprestado. **Participantes:** Virmura, Durn, Ghork e ajudantes sem identidade recorrente.

[Maca vazia com uma carga de treino. Ghork observa sentado; outros fazem o esforço.]

**Virmura:** [expressao=neutro] Sua vez de orientar a passagem da maca. A equipe vai seguir o que você disser. Dê tempo para entenderem antes de se mover.

**Ghork:** [expressao=confuso] Um pouco para a esquerda, depois... espera, a minha esquerda. Desculpem. Assim não ajuda, não é?

[Ajudantes param antes da passagem.]

**Virmura:** [expressao=neutro] Diga onde a maca precisa chegar. Escolha alguma coisa que todos na sala consigam ver.

**Ghork — escolha:**

1. **“Ao lado da porta. Vou usar a sala como referência, para ninguém precisar descobrir para que lado estou virado.”** [expressao=neutro] — **Virmura:** [expressao=feliz] Melhor. Tente de novo. A gente ensinou a equipe a carregar uma maca, não a ler sua cabeça.
2. **“Posso marcar onde cada um deve parar? Assim eles mesmos podem conferir.”** [expressao=confuso] — **Virmura:** [expressao=neutro] Pode. Dê uma volta e confira se cada pessoa consegue ver a marca do lado em que está.

[A nova orientação permite a passagem. A opção não muda os mapas nem concede estatística.]

**Ghork:** [expressao=neutro] Ainda bem que não tem ninguém nessa maca. Eu não queria aprender isso com alguém esperando atendimento.

**Virmura:** [expressao=neutro] É por isso que estamos praticando. Anote o que mudou enquanto ainda lembra bem. Meruna precisa ver a correção, não só a tentativa.

[Depois do teste, Ghork acompanha a devolução à oficina.]

**Durn:** [expressao=neutro] Como se saiu? Alguma peça entortou ou saiu do lugar com o peso?

**Ghork:** [expressao=feliz] A maca estava boa. Minhas instruções é que saíram meio tortas. Arrumamos isso antes de continuar.

**Durn:** [expressao=feliz] Então o teste serviu para alguma coisa. Deixe eu contar... sim, está tudo aqui. Obrigado por devolver direito.

**Conclusão:** procedimento testado e material devolvido; abre A5. A correção é parte da cena, sem punição ou teste de D20.

<a id="q-a5"></a>
### Q-A5 — A proposta de Virmura

**Acesso:** A4. **Local:** sede. **Objetivo:** conhecer a estratégia A antes de decidir. **Participantes:** Ghork e Virmura.

**Ghork, se escolheu registro em A3:** [expressao=neutro] A escala está pronta. Conferi as duas listas: ninguém ficou encarregado de estar em campo e junto a um leito da enfermaria ao mesmo tempo.

**Ghork, se escolheu explicação em A3:** [expressao=neutro] Então vou explicar por que precisamos de gente aqui e em campo. É por aí que quero começar.

**Virmura:** [expressao=neutro] Ótimo. Junte com o registro de resgate e as instruções que testou. Meruna precisa ver o que conferimos. E, se alguém voltar ferido, precisa saber que deixamos gente aqui para cuidar.

**Ghork:** [expressao=confuso] O que eu digo quando ela apontar as partes do mapa que ainda não sabemos explicar?

**Virmura:** [expressao=neutro] Que não sabemos. Marque bem. Quem entrar lá merece ver onde faltam informações antes de ter de descobrir no escuro.

**Ghork:** [expressao=triste] Se eu ficar do seu lado naquela reunião, Borun e Sevrak vão perder o contrato. Depois de tudo que fizeram por mim...

**Virmura:** [expressao=neutro] Sim. Eles também precisam desse dinheiro, e não vão gostar. Não vou fingir o contrário para convencer você a entrar. Pense nisso antes de me dar sua palavra.

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

**Jorvi:** [expressao=neutro] Ataduras e material de lavagem para Virmura. Coloquei tudo nesta bolsa. Confira antes de sair; é mais fácil corrigir um erro enquanto você está aqui.

**Ghork:** [expressao=neutro] Prefiro descobrir agora a ter de explicar uma bolsa vazia para Virmura. Vamos ver...

[O jogador recebe a bolsa. Na saída, dois assaltantes fecham o corredor de cargas.]

**Assaltante:** [expressao=raiva] A bolsa. Deixa no chão e pode continuar andando.

**Ghork:** [expressao=confuso] São ataduras. Vão fazer curativo um no outro? Escolheram a bolsa errada.

[Ghork protege a bolsa. Borun, junto de uma descarga próxima, interpõe o bastão.]

**Borun:** [expressao=neutro] Ghork! Aquele carrinho vazio... empurre para cá. Agora!

[Ghork empurra o carrinho, dificulta a perseguição e segue a passagem aberta por Borun. Na área movimentada, ambos param.]

**Ghork:** [expressao=confuso] Você sabia meu nome. Como sabia meu nome?

**Borun:** [expressao=neutro] Ouvi quando você pegou a bolsa. Depois aqueles dois largaram o que estavam fazendo e seguiram você. Achei que valia ficar de olho.

**Ghork — escolha:**

1. **“Eu não percebi nada. Só quando fecharam a passagem.”** [expressao=triste] — **Borun:** [expressao=neutro] É fácil não perceber quando ainda está tentando se achar por aqui. Agora você já viu uma vez. Na próxima, olhe o que as pessoas fazem, não só o sorriso que mostram.
2. **“Achei que estavam esperando espaço para passar. Tinha tanta gente.”** [expressao=confuso] — **Borun:** [expressao=neutro] Eu também achei, no começo. Mas abriu um espaço bem na frente deles e nenhum se moveu. Não estavam esperando passagem. Estavam esperando você.

**Ghork:** [expressao=neutro] Obrigado. Por me tirar de lá e por ficar para explicar. Eu ia continuar tentando entender o que não percebi.

**Borun:** [expressao=feliz] Borun. Minha guilda se chama Caminhos Abertos. Tentamos fazer jus ao nome, até em manhãs como esta. Venha, acompanho você até passarmos dessa confusão.

**Ghork:** [expressao=neutro] Caminhos Abertos... vocês entram no campeonato? Estou tentando entender como funciona.

**Borun:** [expressao=neutro] Entramos. Encontrar uma equipe é uma parte. Achar onde treinar é outra, com o campeão querendo os melhores horários para os dele. Conheça quem vai trabalhar com você antes de se comprometer.

[O jogador volta à sede e entrega a bolsa.]

**Virmura:** [expressao=confuso] Aí está você. Demorou mais do que eu esperava. O que houve?

**Ghork:** [expressao=triste] Dois homens tentaram levar os materiais. Borun me ajudou a sair do corredor. Não perdi a bolsa, está vendo? Está tudo aqui.

**Virmura:** [expressao=neutro] Ponha a bolsa aí e sente um pouco. Estou vendo que os materiais estão bem. Estou perguntando de você.

**Conclusão:** bolsa entregue, apresentação B concluída; abre B2. Se completou o trio, executar E02–E03. Nenhum D20, recrutamento ou conhecimento prévio de Sevrak.

<a id="q-b2"></a>
### Q-B2 — A carga que chegou antes

**Acesso:** B1; E01 se necessária. **Local:** mercado. **Participantes:** Borun, Pirka, Ghork. **Objetivo:** separar memória do trajeto e registro de carga. **Referência:** PC1-Casey, trabalho cotidiano como entrada numa rede.

**Pirka:** [expressao=neutro] Este registro acompanha a carga, não a mim. Se olhar só essa data de chegada, parece que levei a carroça até o fim da galeria.

**Ghork:** [expressao=confuso] Você não foi até o fim com ela?

**Pirka:** [expressao=neutro] Só até onde a carroça cabia. Dali em diante, entreguei a carga. O resto do caminho foi outra pessoa que fez, a pé.

**Borun:** [expressao=neutro] Entendeu por que eu queria que ouvisse a Pirka? O registro não conta onde ela deixou de acompanhar a carga.

**Ghork — investigação:**

- **“Onde exatamente você passou a carga adiante? Dá para achar esse ponto no mapa?”** [expressao=confuso] — **Pirka:** [expressao=neutro] Tem uma descrição aqui. Copie também, não só o nome do lugar. Já perdi uma tarde procurando um ponto que todo mundo sabia nomear e ninguém sabia indicar.
- **“Você chegou a ver o caminho depois desse ponto, mesmo sem levar a carga até lá?”** [expressao=confuso] — **Pirka:** [expressao=neutro] Não. Minha parte termina ali. Se alguém disser que vi mais alguma coisa, traga aqui. Eu mesma quero ouvir essa história.

[Ghork anota o limite do testemunho, sem preencher o trecho interno. A cópia registra o ponto de partida e a direção da entrada no trecho conhecido, conforme P01.]

**Ghork:** [expressao=neutro] Então o registro fez sua parte da viagem parecer maior. Vou marcar onde você realmente parou.

**Borun:** [expressao=neutro] Ótimo. Agora sabemos sobre que trecho perguntar a ela e onde precisamos procurar outra pessoa.

**Pirka:** [expressao=neutro] Falando em viagem, tenho outra carga para cuidar. Terminamos por aqui?

**Ghork:** [expressao=neutro] Quase. Posso levar uma cópia para Elune? Ela vai precisar comparar com os mapas.

**Pirka:** [expressao=neutro] Leve esta. O original fica comigo; preciso dele para conferir a próxima carga.

**Conclusão:** após as duas perguntas, registro de carga e limite do testemunho obtidos; abre B3.

<a id="q-b3"></a>
### Q-B3 — Borun não veio

**Acesso:** B2. **Local:** casa de contratos. **Participantes:** Ghork e Elune; Borun no retorno à sede. **Objetivo:** conferir uma fonte sem depender da presença do mentor.

[Borun não chega à hora combinada. Ghork entrega a Elune a cópia autorizada por Pirka; ela abre os materiais de comparação.]

**Elune:** [expressao=confuso] Achei que Borun vinha com você. Trouxe as perguntas ou ficaram com ele também?

**Ghork:** [expressao=triste] Trouxe. Só estava esperando que ele viesse para pensar nas que eu deixei passar.

**Elune:** [expressao=neutro] Bom, você está aqui. Quero ouvir as suas. Podemos começar por elas.

**Ghork — escolha:**

1. **“Primeiro, quero separar o que Pirka viu do que contaram a ela depois.”** [expressao=neutro] — **Elune:** [expressao=neutro] Então não perca esse ponto de troca. O relato dela leva até ali. Depois, precisamos de alguém que tenha seguido pelo caminho.
2. **“Quero que alguém leia isto depois e entenda como chegamos à resposta, sem ter de acreditar só na minha palavra.”** [expressao=neutro] — **Elune:** [expressao=neutro] Então ponha uma fonte ao lado de cada informação. Se alguma coisa não bater, saberão onde conferir, sem precisar procurar você primeiro.

[Elune mostra como separar as anotações e devolve a cópia com seus apontamentos. Ghork recebe o material, volta à guilda e o entrega a Borun, que está chegando.]

**Borun:** [expressao=neutro] Aí está você. Uma carga me prendeu na descarga. Como foi com Elune?

**Ghork:** [expressao=neutro] Deu certo. Mas eu fiquei esperando você. Podia ter mandado um recado.

**Borun:** [expressao=triste] Devia ter mandado. Vou combinar os horários com Pirka e avisar quando mudarem.

**Ghork:** [expressao=neutro] Ótimo. Porque eu não ia fingir que você me deixou lá para me ensinar a ser independente.

**Borun:** [expressao=feliz] Não finja mesmo. Uma desculpa tão boa dessas, sou capaz de acabar acreditando.

**Conclusão:** fontes organizadas, ausência reconhecida sem punição ao jogador; abre B4. Ghork não assume culpa pelo atraso do mentor.

<a id="q-b4"></a>
### Q-B4 — A carga não é de vocês

**Acesso:** B3; executar E08 se ainda não vista. **Percurso:** sede → corredor de cargas do mercado → banca de Jorvi → sede. **Participantes:** Borun, Ghork, Pirka, Jorvi e os dois assaltantes de B1. **Objetivo:** cobrar a devolução de um fardo roubado, recuperá-lo em combate e entregá-lo. **Proposta nova solicitada pelo autor. Referência:** PC1-Bobo, reclamação que leva a outro lugar e a confronto.

**Pirka:** [expressao=raiva] Levaram as cordas e estacas da nossa demonstração. Dois homens no corredor: um saiu com o fardo enquanto o outro impedia a gente de ir atrás.

**Ghork:** [expressao=confuso] Dois, agindo juntos? Será que são os mesmos que me cercaram?

**Borun:** [expressao=neutro] Parece. Antes de ir atrás, descubra como sair daquele corredor. Você já pode tentar uma luta, mas isso não significa deixar os dois prenderem você de novo.

**Ghork:** [expressao=neutro] Eu lembro de como foi. Vou buscar a carga da Pirka, não provar que nada pode me machucar.

[Pirka descreve a marca do fardo. Ghork vai ao corredor e encontra os assaltantes tentando abrir a carga.]

**Ghork — abordagem:**

1. **“Vocês levaram o fardo da Pirka. Devolvam, e podemos encerrar isso aqui.”** [expressao=neutro] — **Assaltante:** [expressao=feliz] Olha quem voltou. Veio sem o velho para se esconder atrás dele?
2. **“Da outra vez eram ataduras. Finalmente acharam uma bolsa que vale roubar ou pegam qualquer coisa que estiver perto?”** [expressao=feliz] — **Assaltante:** [expressao=raiva] Quer o fardo ou quer perder os dentes?

**Ghork:** [expressao=neutro] O fardo. Foi para isso que eu vim.

[Um deles avança; Ghork usa o corredor para impedir que os dois o cerquem ao mesmo tempo. **Batalha B4:** dupla tratada como um encontro de D20, sem rolagem obrigatória para cada assaltante.]

**Vitória:**

**Assaltante:** [expressao=triste] Está bem! Leva! Não vou apanhar mais por um saco de cordas.

**Ghork:** [expressao=raiva] Então parem de levar o que não é de vocês.

[Os assaltantes recuam. O jogador recolhe o fardo; Ghork chama os carregadores de Pirka para o transporte até a banca, sem arrastá-lo com a perna ferida.]

**Pirka:** [expressao=neutro] É a nossa marca no fardo. Ótimo. Ponha aqui; quero ver o que deixaram dentro.

**Jorvi:** [expressao=neutro] Cordas, estacas... está tudo aqui. Este é o recibo, para ninguém precisar ficar só na nossa palavra de que chegou.

**Ghork:** [expressao=neutro] Posso ficar com uma cópia para Borun? Ele vai querer saber que recuperamos tudo.

**Pirka:** [expressao=neutro] Já que está aqui, me mostre as instruções. Eu preciso conseguir seguir sem você ao meu lado explicando cada curva.

[Ghork mostra sua descrição; Pirka aponta uma referência vaga e ele a substitui pela banca visível na saída. Ela consegue acompanhar a indicação.]

**Derrota sem nova rolagem:** Ghork recua para a área movimentada antes de ficar cercado. O fardo continua com os assaltantes. Na sede, **Borun:** “Eles conseguiram fechar os dois lados. Na próxima aproximação, guarde a passagem por onde vai sair.” **Ghork:** “Vou recuperar o fardo. Primeiro preciso recuperar o fôlego.” O jogador pode preparar-se, visitar o Coreto entre cenas e voltar; sem pagamento, perda de outro item ou recrutar alguém. Na revanche, **Assaltante:** “Você de novo?” **Ghork:** “Vocês ainda estão com a carga.” Repetir apenas o combate, não a abertura ou as recompensas.

**Entrega final, depois da vitória:**

**Borun:** [expressao=confuso] Está com o recibo. E a carga? Veio tudo?

**Ghork:** [expressao=neutro] Pirka e Jorvi conferiram cada peça. Também arrumei as instruções do corredor. Percebi que tinha escrito para quem já conhecia o caminho.

**Borun:** [expressao=neutro] É fácil cair nessa. Vamos lá, leia a versão nova.

**Ghork:** [expressao=feliz] Passe pela área de descarga, ao lado da banca. Isso alguém novo consegue achar. "Pelo caminho de sempre" só ajuda quem já tem um caminho de sempre.

**Conclusão:** recuperação e entrega registradas, B5 aberta. O combate demonstra competência adquirida; não revela que Borun preparou o assalto inicial nem faz os ladrões trabalharem para Torvak. Não há morte obrigatória ou prêmio em Ludos definido.

<a id="q-b5"></a>
### Q-B5 — A proposta de Borun

**Acesso:** B4. **Local:** sede. **Objetivo:** ouvir a estratégia B. **Participantes:** Borun e Ghork. **Referência:** PC1-Silver para mentor com interesses próprios, sem dívida ou luta combinada.

**Borun:** [expressao=neutro] Vamos pôr o relato da Pirka ao lado do registro da carga e mostrar as instruções que outra pessoa conseguiu seguir. É esse trabalho que quero financiar com o contrato: gente saindo, olhando direito e trazendo algo útil para a próxima equipe.

**Ghork:** [expressao=neutro] E usaria parte do dinheiro para resgates. Você falou disso antes.

**Borun:** [expressao=neutro] Usaria. Tem contratante muito interessado no caminho de ida que só pergunta pelo de volta quando alguém não aparece.

**Ghork:** [expressao=confuso] E se Meruna disser que os relatos estão incompletos demais para confiar?

**Borun:** [expressao=neutro] Mostre exatamente o que pudemos conferir e o que ainda precisa de uma visita. Os relatos estão incompletos. Blefar não melhora isso. E, se prometer que nunca erramos, vou ter de interromper você.

**Ghork:** [expressao=triste] Virmura salvou minha vida. Sevrak também me protegeu. É estranho falar em escolher entre vocês.

**Borun:** [expressao=neutro] Pode ser grato aos dois e ainda escolher seu trabalho. Mas eles têm guildas para cuidar, assim como eu. Não espere que sua gratidão faça os dois saírem do caminho.

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

**Veterano:** [expressao=raiva] Levanta. De novo. Vai passar o treino inteiro no chão?

**Ghork:** [expressao=neutro] Olhe o ombro dele! Ele ergue antes de atacar. Quando subir, saia do alcance. Não espere pelo golpe.

[O iniciante evita o ataque seguinte. O veterano se volta contra Ghork.]

**Veterano:** [expressao=raiva] Então ajudou ele a escapar de um. Acha que consegue fazer melhor? Venha mostrar.

[Ele tenta agredir Ghork. Sevrak intercepta o golpe e o desarma.]

**Sevrak:** [expressao=raiva] Basta. Seu treino acabou.

**Ghork:** [expressao=confuso] Eu só estava tentando ajudar o rapaz. Não queria...

**Sevrak:** [expressao=neutro] Eu vi o que aconteceu. Pode parar de se justificar e explicar o movimento. O que percebeu?

**Ghork — escolha:**

1. **“Ele se preparava do mesmo jeito toda vez. Depois que percebi, dava para saber quando vinha o próximo ataque.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] Enquanto o rapaz esperava ver o próprio golpe. Você deu a ele um sinal que permitia agir antes. Uma diferença útil.
2. **“Alguém precisava dizer ao rapaz como escapar. Derrubar de novo não estava ensinando nada.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] E você tinha mais a oferecer do que compaixão. Deu uma instrução que ele conseguiu usar. Mostre o que viu.

**Ghork:** [expressao=neutro] O ombro, ali. Mexia antes do resto do corpo. Quando o braço avançava, o aviso já tinha passado.

**Sevrak:** [expressao=neutro] Sevrak Vey. Dirijo uma escola em que vale a pena desenvolver esse tipo de observação. Já pensou no que poderia fazer com isso?

**Ghork:** [expressao=feliz] Ghork. E obrigado. Eu preferia não descobrir pessoalmente como é receber aquele golpe.

**Sevrak:** [expressao=neutro] Parece que tem uma entrega para terminar. Depois, venha conhecer a escola. Tenho muitos alunos que sabem copiar um movimento. Gostaria de ter mais que soubessem explicar.

[Ghork encontra Rask e entrega o pacote.]

**Rask:** [expressao=neutro] São as ataduras de Virmura? Obrigado, pode entregar. Ela pediu confirmação, então leve este recibo para ela.

**Ghork:** [expressao=neutro] Levo. Rask, aconteceu uma coisa na entrada. Um veterano tentou me bater durante o treino. Sevrak impediu, mas você precisa saber.

**Rask:** [expressao=neutro] Vou conversar com os envolvidos. Fez bem em me contar. E obrigado por trazer os materiais.

**Conclusão:** entrega concluída, apresentação C feita, abre C2; E02–E03 se completou o trio. Sevrak não preparou o perigo; iniciante não vira recrutável. A omissão posterior de Rask pode ser cobrada em C4.

<a id="q-c2"></a>
### Q-C2 — O que a régua não diz

**Acesso:** C1; E01 se necessária. **Local:** sede de Sevrak. **Participantes:** Sevrak e Ghork. **Objetivo:** elaborar uma comparação que explicite suas premissas.

**Sevrak:** [expressao=neutro] Aqui estão as duas cópias. Digamos que coloquemos uma sobre a outra. O que isso permite concluir?

**Ghork:** [expressao=feliz] Que não dá mais para ler a de baixo.

**Sevrak:** [expressao=neutro] Uma descoberta indispensável. Agora, o que tornaria a comparação útil?

**Ghork — escolha:**

1. **“Precisaríamos conferir os pontos de referência primeiro. Senão podemos estar comparando desenhos de lugares diferentes.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] Então identifique os marcos e escreva como vai compará-los. Quero que outra pessoa consiga fazer isso sem você apontando para o papel.
2. **“Uma diferença nos desenhos pode significar várias coisas. Não devíamos escolher uma explicação só porque foi a primeira que veio à cabeça.”** [expressao=confuso] — **Sevrak:** [expressao=neutro] Concordo. Anote as possibilidades. Depois procure algo que possa conferir para eliminar uma delas. Uma lista de palpites é só o começo.

[Ghork prepara campos para origem da medida, referência e trecho descrito. As fontes autorizadas de entrada e retirada permitem preencher esses campos, conforme P01.]

**Ghork:** [expressao=confuso] Está esperando que eu descubra uma resposta que você já sabe?

**Sevrak:** [expressao=neutro] Estou esperando para ver o que consegue sustentar. Dar uma conclusão sem as provas só ensinaria você a me repetir. Mostre como chega à sua.

**Conclusão:** comparação preparada, sem resolver por suposição a causa dos mapas; abre C3.

<a id="q-c3"></a>
### Q-C3 — Uma cópia sem o mestre

**Acesso:** C2. **Local:** casa de contratos. **Participantes:** Ghork e Elune. **Objetivo:** submeter o procedimento à leitura de outra pessoa.

**Elune:** [expressao=confuso] Sevrak mandou você com isto? O que ele quer conferir, o resultado?

**Ghork:** [expressao=neutro] Isso, e se você consegue seguir as etapas sem ele ao lado. Se precisar chamar o mestre para explicar cada linha, não escrevi muito bem.

**Elune:** [expressao=confuso] Então foi aqui que me perdi. "Normalizar." O que devo fazer com o mapa quando chegar nessa palavra?

**Ghork — escolha:**

1. **“Entendi o problema. Vou escrever o que fazer, passo a passo, em vez de esconder tudo numa palavra.”** [expressao=neutro] — **Elune:** [expressao=neutro] Obrigada. Agora posso tentar a mesma comparação que você fez, sem ter de adivinhar o que quis dizer.
2. **“Vou incluir um exemplo explicado. E marcar que é só um exemplo, para ninguém confundir com medidas tiradas da mina.”** [expressao=neutro] — **Elune:** [expressao=neutro] Ponha o aviso onde ninguém deixe de ver. Essas páginas são copiadas. Não quero uma medida inventada circulando sem a explicação.

[Ghork revisa; Elune repete a comparação até o limite das fontes disponíveis.]

**Elune:** [expressao=neutro] Até aqui consigo acompanhar. Depois deste ponto, faltam informações. Não posso preencher os espaços só para terminar a página.

**Ghork:** [expressao=feliz] Por favor, não preencha. Sevrak ia perguntar onde achei as informações que faltavam, e minha resposta seria bem constrangedora.

**Elune:** [expressao=neutro] Ele não seria o único a perguntar.

[Elune devolve a cópia com a revisão. Ghork recebe o material e o entrega na escola; o pedido do iniciante em C4 só começa depois desse retorno.]

**Conclusão:** cópia compreensível sem o mestre e devolvida à escola; abre C4. Elune não entrega uma solução secreta exclusiva de C.

<a id="q-c4"></a>
### Q-C4 — Pode repetir na minha frente

**Acesso:** C3; executar E08 se ainda não vista. **Percurso:** escola → coliseu → escola. **Participantes:** Sevrak, Ghork, iniciante e veterano de C1, Rask. **Objetivo:** buscar um estojo retido, confrontar a intimidação e responder num duelo supervisionado. **Proposta nova solicitada pelo autor. Referência:** PC1-Bobo, assunto levado ao responsável em outro local e combate com retorno.

[O iniciante traz à escola notícia de um estojo de treino emprestado por Sevrak. O veterano se recusou a devolvê-lo e mandou Ghork buscá-lo pessoalmente.]

**Iniciante:** [expressao=triste] Sevrak, aquele veterano não quer devolver seu estojo de treino. Diz que Ghork tem de ir buscar e explicar de novo o truque do ombro. Sem você por perto.

**Sevrak:** [expressao=neutro] Reter meu equipamento para forçar um confronto? Vou falar com Rask. O estojo tem de ser devolvido.

**Ghork:** [expressao=raiva] Eu vou buscar. Se tem alguma coisa para dizer de mim, pode dizer na minha frente.

**Sevrak:** [expressao=neutro] Você já pode enfrentar um duelo supervisionado. Se aceitar lutar, exija um juiz. E tenha clareza do motivo. Meu orgulho ferido não é razão para você se arriscar.

[No coliseu, o veterano está com o estojo.]

**Ghork:** [expressao=neutro] Mandou me chamar. Estou aqui. O que queria dizer?

**Veterano:** [expressao=raiva] Quero ver se tem um lutador por trás de tanto conselho. Ou só sabe falar?

**Ghork:** [expressao=neutro] Pode descobrir depois de devolver o estojo. Ele pertence à escola.

**Rask:** [expressao=neutro] Entregue para mim. O estojo será devolvido, aconteça o que acontecer aqui. Ghork me avisou da agressão; eu devia ter impedido que isso continuasse. Se os dois querem lutar, usem a área de duelo. Eu mesmo vou supervisionar.

[Rask recolhe o estojo; a restituição não depende de a vítima vencer uma luta. O veterano desafia Ghork, que aceita.]

**Ghork — resposta:**

1. **“Queria saber se consigo lutar. Está bem. Vamos fazer isso direito.”** [expressao=neutro] — **Veterano:** [expressao=raiva] Vamos torcer para ter aprendido alguma coisa além de olhar ombros.
2. **“Da outra vez eu estava olhando de fora. Vamos ver o que percebo de perto.”** [expressao=feliz] — **Veterano:** [expressao=raiva] Continue falando. Quero ver como fica esperto de costas no chão.

**Rask:** [expressao=neutro] Quando eu mandar parar, os dois param. Se um dos lutadores não puder continuar, a luta acaba ali. Entendido?

[**Batalha C4:** duelo de D20. Ghork observa a preparação dos golpes, mas o conhecimento não garante sucesso automático.]

**Vitória:**

**Rask:** [expressao=neutro] Parem! A luta acabou. Ghork venceu.

**Ghork:** [expressao=neutro] Aquele rapaz aprendeu quando alguém deu uma chance. Você podia ter feito isso por ele, em vez de deixar com medo de levantar outra vez.

**Veterano:** [expressao=raiva] Já ganhou. Ainda tenho de ouvir sermão?

**Ghork:** [expressao=neutro] Não. Vou levar o estojo de volta para a escola. Já estou indo.

**Derrota sem nova rolagem:** Rask interrompe o duelo; **Veterano:** “Conselho não vence luta.” **Ghork:** “Essa tentativa não venceu. Vou voltar.” O desafio permanece aberto, sem retirar o estojo já restituído ou legitimar a intimidação. Ghork pode preparar-se e pedir revanche sem pagar. **Rask, na retomada:** “Mesmas condições. Se eu interromper, os dois param.” A quest aguarda a vitória no desafio aceito; não se torna uma derrota permanente da campanha.

**Depois da vitória, entrega na escola:**

**Sevrak:** [expressao=neutro] O estojo voltou. Ótimo. Agora me diga como foi o duelo.

**Ghork:** [expressao=neutro] Rask foi o juiz. Eu ganhei. Foi bom, mas... vencer não faz tudo que eu disse estar certo. Essa parte ainda precisa se sustentar sozinha.

**Sevrak:** [expressao=neutro] Uma diferença que vale guardar. Agora, seu relatório: você colocou o que não sabemos antes do que descobrimos. Por que começar por aí?

**Ghork:** [expressao=neutro] Porque alguém pode ler o resultado e parar ali. Não quero Meruna mandando gente para a mina com metade da explicação.

**Escolha:**

1. **“Vou pôr o aviso ao lado da conclusão. Assim ela vê o que descobrimos e onde deixa de haver certeza.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] Tente. Se eu conseguir ler os dois sem procurar pela página, deve servir.
2. **“Prefiro explicar primeiro o que não conseguimos descobrir. Depois mostro quanto ainda conseguimos conferir.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] Então esteja pronto para explicar isso à Meruna. Essa escolha de apresentação é sua. Não vou intervir para defendê-la por você.

**Conclusão:** duelo vencido, estojo devolvido e versão do relatório definida; abre C5. A ordem da ressalva reaparece em E04. O veterano continua um figurante, sem vínculo inventado com o campeão ou com os Ignotos.

<a id="q-c5"></a>
### Q-C5 — A proposta de Sevrak

**Acesso:** C4. **Local:** sede. **Objetivo:** ouvir a estratégia C. **Participantes:** Sevrak e Ghork.

**Sevrak:** [expressao=neutro] Meruna poderá conferir nosso trabalho por conta própria. É isso que oferecemos. Com o contrato, a escola pode ensinar mais pessoas a fazer o mesmo levantamento, em vez de depender do julgamento de uma só.

**Ghork:** [expressao=neutro] E o dinheiro mantém sua escola funcionando. Não se trata só dos mapas.

**Sevrak:** [expressao=neutro] Ela poderia ser sua escola também, Ghork. Se decidir entrar.

**Ghork:** [expressao=neutro] Ainda não decidi. Quero deixar isso claro.

**Sevrak:** [expressao=neutro] Então também vou ser claro. Quero você trabalhando na investigação e se preparando para o campeonato. Vejo algo em você que vale desenvolver, mas entrar na escola significa trabalhar.

**Ghork:** [expressao=confuso] E se eu encontrar um erro no seu método? Quer que eu aponte ou aprenda a fazer do seu jeito mesmo assim?

**Sevrak:** [expressao=neutro] Mostre o erro. Dizer que discorda não basta, mas demonstrar uma falha é útil. Você deve exigir de mim o mesmo cuidado.

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

**Meruna:** [expressao=neutro] Ghork, você conheceu o trabalho dessas guildas. Agora preciso de uma resposta: qual proposta vai ajudar a executar?

**Defesa A:**

**Ghork:** [expressao=neutro] A de Virmura. Conferimos um trajeto de resgate com os mapas e depois testamos as instruções com uma maca. Sabemos quem vai a campo e quem fica para cuidar de quem precisa da guilda.

**Sevrak:** [expressao=neutro] Conferiram um trajeto de resgate. Uma mina tem um pouco mais do que isso. O que vão dizer à Meruna sobre o restante?

**Ghork — escolha:**

1. **“Que ainda precisa ser investigado. Está marcado na proposta. Não estamos pedindo que acredite que conferimos mais do que realmente conferimos.”** [expressao=neutro]
2. **“É isso que o contrato vai pagar para investigar. O que mostramos hoje foi como vamos fazer. Já testamos o procedimento.”** [expressao=neutro]

**Meruna:** [expressao=neutro] Consigo distinguir o que conferiram do que estão propondo. Ótimo. Virmura, inclua os custos da enfermaria no plano, junto com os da equipe de campo. Preciso ver o custo completo desse acordo.

**Defesa B:**

**Ghork:** [expressao=neutro] A de Borun. Conferimos o registro da carga com Pirka, que fez o transporte. Separamos o que ela viu do que contaram a ela e depois demos as instruções a outra pessoa, para ver se conseguia seguir.

**Virmura:** [expressao=neutro] E quando alguém se machucar lá embaixo? O que acontece se esses relatos não bastarem para indicar como tirar a pessoa?

**Ghork — escolha:**

1. **“Anotamos o que falta antes de alguém entrar. Se não podemos confirmar uma saída, não marcamos como segura e torcemos para dar certo.”** [expressao=neutro]
2. **“Então a equipe volta com essa pergunta sem resposta. Receber pelo trabalho não obriga ninguém a inventar o que não conseguiu descobrir.”** [expressao=neutro]

**Meruna:** [expressao=neutro] Inclua esse limite no relatório. Borun, você fica responsável por conferir essas fontes em campo. Espero que o registro mostre o que realmente encontraram.

**Defesa C:**

**Ghork, se C4 começou pelo limite:** [expressao=neutro] Antes de mostrar o resultado, quero apontar o que não conseguimos verificar. Depois explico como conferimos o restante.

**Ghork, se C4 colocou a ressalva ao lado:** [expressao=neutro] Escolho a proposta de Sevrak. Cada conclusão indica o que ainda não sabemos. Elune conseguiu repetir o método sem chamar o mestre para explicar, então você também pode conferir nosso trabalho.

**Borun:** [expressao=neutro] Instruções bem arrumadas não fazem um relato errado virar verdade. E se a pessoa que passou a informação tiver se enganado?

**Ghork — escolha:**

1. **“É por isso que cada informação tem uma fonte ao lado. Se alguma coisa não bater, sabemos onde voltar para conferir.”** [expressao=neutro]
2. **“Então alguém pode seguir as etapas escritas e mostrar onde erramos. Não precisa aceitar só porque Sevrak ou eu dissemos.”** [expressao=neutro]

**Meruna:** [expressao=neutro] Sevrak, quero esse registro mantido durante toda a investigação. Especialmente quando um resultado contrariar sua primeira explicação. Não pago a mais para manter coerência com um erro.

**Trecho comum:**

**Meruna:** A proposta defendida demonstra capacidade suficiente para a investigação que estou contratando. O contrato fica com [guilda escolhida]. O financiamento não será dividido.

[A demonstração concreta que compara os mapas deve acompanhar essa avaliação conforme P01. A financiadora escolhe entre propostas viáveis; não anuncia que as demais são incompetentes.]

**Virmura, se rejeitada:** [expressao=triste] Eu contava com esse dinheiro para pôr uma equipe em campo. Sem ele, não posso ceder gente e materiais que fazem falta na enfermaria. Vamos disputar os próximos contratos. E vamos enfrentar vocês no campeonato.

**Borun, se rejeitado:** [expressao=triste] Então vou ter de procurar outro trabalho para minha gente. Não vamos acompanhar sua expedição. E, quando chegar o campeonato, lembre que vamos competir contra você.

**Sevrak, se rejeitado:** [expressao=neutro] Nossos instrutores e métodos continuam na escola. Terá a chance de ver do que abriu mão, Ghork. Imagino que o campeonato ofereça uma.

**Ghork — escolha, depois das duas recusas:**

1. **“Não esqueci o que fizeram por mim. Escolher esta guilda não significa que deixei de ser grato.”** [expressao=triste] — **Mentor rejeitado, primeira fala aplicável:** Virmura: [expressao=triste] “Eu sei que é grato. Não estou pedindo que negue isso. Mas ainda tenho uma guilda cheia de gente dependendo de mim.” / Borun: [expressao=triste] “Eu sei, rapaz. Não acho que esqueceu. Mas, neste trabalho, ainda vamos seguir caminhos diferentes.” / Sevrak: “Não estou contestando sua gratidão. Estou contestando sua escolha.”
2. **“Escolhi o trabalho que quero fazer. Nunca prometi entrar nas três guildas, e nem conseguiria cumprir essa promessa.”** [expressao=neutro] — **Meruna:** [expressao=neutro] Ofereci um contrato. Alguém ia sair daqui sem ele. Vamos registrar quem assume a responsabilidade pelo trabalho.

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

**Torvak:** [expressao=raiva] Minha equipe traz o público que mantém este coliseu aberto. Vocês querem treinar na arena que pagamos e chamam de abuso quando pedimos prioridade?

**Mentor:** Virmura: [expressao=raiva] “Quando sua prioridade tira o horário já prometido a outra equipe, sim. É exatamente de abuso que estou chamando.” / Borun: [expressao=raiva] “Estou pedindo que cumpra o acordo. Não devíamos ter de implorar por um horário que já era nosso.” / Sevrak: [expressao=neutro] “Uma descrição da sua popularidade não responde à pergunta. Que regra permite isso?”

**Torvak:** [expressao=raiva] Retire o que disse. Aqui, na frente de todos.

**Mentor:** Virmura: [expressao=raiva] “Não. Você ouviu muito bem.” / Borun: [expressao=raiva] “Não. Não vou pedir desculpas por esperar que cumpram a palavra.” / Sevrak: [expressao=neutro] “Mantenho a pergunta. Não vejo motivo para retirá-la.”

**Torvak:** [expressao=raiva] Rask. Cancele os horários de treino dessa guilda. Se não consegue fazer isso, talvez deva ver como seu campeonato se sai sem mim.

[Rask olha a lista. Risca os horários da guilda escolhida.]

**Rask:** [expressao=triste] Estou retirando seus horários de treino. Vocês terão de treinar fora do coliseu. A inscrição no campeonato continua válida... isso não vou retirar.

**Ghork — escolha:**

1. **“Você já tinha confirmado esses horários. Agora vai tirar porque ele mandou?”** [expressao=raiva] — **Rask:** [expressao=triste] Sim. Tem todo o direito de dizer que voltei atrás no que prometi. Não foi um erro na agenda.
2. **“E ele fica com a arena? Ele ameaça ir embora, e nós perdemos nosso lugar?”** [expressao=raiva] — **Torvak:** [expressao=raiva] Minha equipe vai ter o espaço de que precisa. Fizemos o bastante por este coliseu para merecer isso.

**Ghork:** [expressao=triste] A gente já tinha organizado os treinos. Agora vai ter de encontrar espaço para tudo outra vez.

**Mentor:** Virmura: [expressao=neutro] “Vamos abrir espaço na sede. E ninguém vai perder descanso para pagar pela birra dele.” / Borun: [expressao=neutro] “Vamos dividir o trabalho na sede. Prometi acompanhar aqueles treinos e vou acompanhar. Vamos ver o que cabe em cada espaço.” / Sevrak: [expressao=neutro] “Na escola, então. Vamos avaliar o espaço e adaptar os exercícios. Ainda temos um campeonato para preparar.”

**Saída:** encerra arco 1. Na abertura comum do arco 2, Ghork ajuda a reorganizar materiais leves e horários; a tarefa não vira quest, pagamento ou penalidade. A crítica escolhida ocorre depois do cancelamento e não o causa.

<a id="arco-2"></a>
## Contrato, alianças e classificação

**Base comum:** titularidade da guilda, equipes externas, duas apresentações livres, compromisso e duas missões exclusivas. **Propostas usadas nesta versão:** X/Darvek é a abordagem com maior reserva de segurança; Y/Zagra preserva recursos por uma operação limitada e mais arriscada. Essas equipes não entram no bônus de combate. As cenas reconhecem a guilda sem multiplicar as sete quests.

Antes da primeira apresentação, exibir a reorganização e uma fala do mentor:

- **Virmura:** O atendimento continua deste lado; a preparação fica do outro. Se os horários apertarem, me diga antes de tirar o descanso da conta.
- **Borun:** Aqui cabe menos gente. Dividi o acompanhamento e avisei Pirka. Dessa vez você não vai descobrir meu atraso olhando uma cadeira vazia.
- **Sevrak:** Mudei a sequência dos exercícios para este espaço. Quero que registre onde ela não funcionar. Não me serve um aluno que concorda e depois improvisa escondido.

**Ghork:** [expressao=neutro] Vou ajudar no que puder. E, se não der conta de alguma coisa, aviso antes que vire outro problema.

Não exigir um recrutado para carregar objetos ou ouvir essa conversa. As duas apresentações externas podem ser iniciadas em seguida.

<a id="q-x0"></a>
### Q-X0 — Uma reserva de retorno

**Local:** oficina de Durn. **Participantes:** Darvek, Durn e Ghork. **Objetivo:** compreender a proposta cautelosa. **Acesso:** entrada do arco 2. **Referência:** PC2-compromisso, pela apresentação das exigências antes da adesão.

**Darvek:** [expressao=neutro] Esse esteio fica aqui. Se levarmos todos lá para dentro, o que sobra para trazer alguém de volta?

**Durn:** [expressao=neutro] Primeiro, aprendam a montar. Um esteio no lugar errado não sustenta grande coisa.

**Ghork:** [expressao=confuso] E tudo isso sai do nosso pagamento? Quanto, mais ou menos?

**Darvek:** [expressao=neutro] Mais do que a Zagra está pedindo. Vamos pagar pelas inspeções, pelos esteios, por gente pronta para ajudar na saída. Vai sobrar menos para o campeonato.

**Ghork — perguntas, ambas necessárias:**

- **“Digamos que alguma coisa dê errado. O que essa reserva permite fazer?”** [expressao=neutro] — **Darvek:** [expressao=neutro] Parar. Preparar a volta. Ter alguém livre para ajudar, em vez de todo mundo ocupado carregando os feridos. Não nos torna invulneráveis.
- **“E se a gente sair sem usar nada disso?”** [expressao=neutro] — **Darvek:** [expressao=neutro] O material continua custando. O tempo da equipe também. Prefiro que você reclame do custo aqui em cima. Pior seria só descobrir isso lá embaixo.

**Durn:** [expressao=neutro] Chegue mais perto. Está vendo esta junção? Confira com a marca e anote o que acontecer no teste. O peso fica comigo.

[Ghork confere a marca enquanto Durn demonstra.]

**Ghork:** [expressao=neutro] Está bem. Fica mais fácil entender a conta quando vejo o que estamos pagando.

**Darvek:** [expressao=neutro] Ótimo. Agora deixe a Zagra mostrar a dela. Você ainda não escolheu.

**Conclusão:** apresentação X completa. Se Y0 falta, mapa; se ambas concluídas, E06. Nenhuma compra pessoal nem adesão automática.

<a id="q-y0"></a>
### Q-Y0 — Levar menos

**Local:** mercado, junto à carga. **Participantes:** Zagra, Pirka e Ghork. **Objetivo:** conhecer o limite e o custo da operação leve. **Acesso:** entrada do arco 2, independente de X0.

**Zagra:** [expressao=neutro] Estas cargas vão conosco. A reserva pesada fica aqui em cima. Levantamos um trecho curto e voltamos. Esse é o trabalho que estou propondo.

**Pirka:** [expressao=feliz] Menos peso, frete mais barato. Só lembrem: onde começa o túnel, termina o caminho da minha carroça.

**Ghork:** [expressao=confuso] E se alguém se machucar depois desse ponto... a gente traz de volta por conta própria?

**Zagra:** [expressao=neutro] Com menos equipamento para ajudar. Sim. Não vou enfeitar isso. Em troca, sobraria mais do pagamento para os treinos.

**Ghork — perguntas, ambas necessárias:**

- **“O que faria você encerrar o trabalho antes de terminar?”** [expressao=neutro] — **Zagra:** [expressao=neutro] Rocha instável. Perder o caminho. Alguém sem condições de continuar. Se eu não enxergar uma saída, não levo vocês mais para dentro.
- **“Tem alguma coisa de que você não abre mão para economizar?”** [expressao=neutro] — **Zagra:** [expressao=neutro] Marcas para encontrar a saída. Um jeito de manter contato. Cargas que cada um consiga carregar. Sem isso, já não é o trabalho que propus.

[Ghork confere a lista com Pirka.]

**Ghork:** [expressao=neutro] Você e o Darvek já trabalharam na mesma equipe, não foi?

**Zagra:** [expressao=neutro] Já. Ele leva o suficiente para enfrentar um problema maior. Eu aceito um trabalho menor. Pode acreditar: essa discussão é mais velha que o seu contrato.

**Conclusão:** apresentação Y completa; E06 depois de ambas. Não escolher a equipe ao simplesmente visitar seu local.

<a id="e06"></a>
### E06 — Um método para este trabalho

**Encaixe:** conclusão da segunda apresentação realizada. **Local:** casa de contratos. **Participantes:** Ghork, Darvek, Zagra e mentor escolhido. **Objetivo:** assumir uma abordagem sabendo o que custa.

**Mentor:** Virmura: [expressao=neutro] “Você ouviu os dois planos. Agora escolha um que consiga defender quando a equipe perguntar por quê.” / Borun: [expressao=neutro] “Antes de me contar quem convenceu você, conte o que foi conferir por conta própria.” / Sevrak: [expressao=neutro] “Uma proposta convincente não basta. Escolha um método que consiga justificar quando tivermos o resultado.”

**Interface:** “Escolher X ou Y abre duas missões exclusivas e fecha a outra abordagem nesta campanha. A equipe preterida seguirá com apoio de outra guilda e poderá enfrentá-lo. Confirmar X / Confirmar Y / Pensar mais.”

“Pensar mais” retorna ao mapa. As apresentações permanecem concluídas e a reunião pode ser retomada. Convites que dependem de X/Y continuam aguardando a resolução da rota, conforme a seção de recrutamentos.

**Escolha X:**

**Ghork:** [expressao=neutro] Vamos com o Darvek. Quero essa reserva pronta antes de alguém entrar. Vou ter que me virar com menos para os treinos.

**Darvek:** [expressao=neutro] Está bem. Venha ajudar a testar os esteios.

**Zagra:** [expressao=raiva] Você ouviu até onde eu iria. Ainda acha que eu arrastaria minha equipe para dentro e torceria para dar certo?

**Ghork — escolha:**

1. **“Eu ouvi. Mesmo assim, quero mais ajuda preparada se a volta der errado.”** [expressao=neutro]
2. **“Não acho que você abandonaria ninguém. Eu só dormiria melhor sabendo que temos mais recursos à mão.”** [expressao=neutro]

**Zagra:** [expressao=raiva] Está bem. Minha equipe sabe fazer esse trabalho. Vamos encontrar alguém disposto a vir conosco.

**Escolha Y:**

**Ghork:** [expressao=neutro] Vamos com a Zagra. Um levantamento curto, com dinheiro sobrando para os treinos. Se não der para verificar um trecho com o que levamos, deixamos esse trecho para depois.

**Zagra:** [expressao=neutro] Então ponha isso no plano. Quero que todos ouçam a mesma coisa antes de arrumarmos a carga.

**Darvek:** [expressao=triste] E se a volta exigir mais de vocês do que a ida? A minha reserva ainda vai parecer exagero?

**Ghork — escolha:**

1. **“Sua reserva cobriria isso. Eu sei. Estou aceitando o risco de ter menos recursos à mão.”** [expressao=neutro]
2. **“Não estou chamando você de covarde, Darvek. Estou dizendo que vamos parar antes.”** [expressao=neutro]

**Darvek:** [expressao=neutro] Então lembre disso quando faltar só mais uma curva para verificar. Vou encontrar trabalho para minha equipe.

**Saída:** X ou Y registrado, inicia X1 ou Y1. A mágoa profissional desenvolve a proposta já existente de B2; não estabelece promessa quebrada, roubo de pagamento ou ruína de reputação. Sua causa ainda depende de confirmação autoral.

<a id="q-x1"></a>
### Q-X1 — Antes de entrar

**Acesso:** compromisso X. **Locais:** oficina e entrada das minas. **Participantes:** Darvek, Durn e Ghork. **Objetivo:** preparar e testar a reserva de retirada.

**Durn:** [expressao=neutro] As peças estão prontas. Quem vai montar? Quero mostrar as junções a essa pessoa.

**Darvek:** [expressao=neutro] Minha equipe monta. Ghork, confira a lista e o caminho até o ponto de espera. Veja se conseguimos chegar lá com tudo isso.

**Ghork:** [expressao=neutro] Quero ficar para o teste. Fui eu que disse que precisávamos disso.

**Darvek:** [expressao=neutro] Então fique. E pergunte. Não aprove nada por vergonha de dizer que não entendeu minha explicação.

[Na entrada, a equipe ensaia a circulação com uma carga de treino. Uma reserva fica livre para atender a retirada; não se cria acidente real.]

**Ghork — escolha:**

1. **“Digamos que um de nós precise parar. Quem fica com a carga dessa pessoa?”** [expressao=neutro] — **Darvek:** [expressao=neutro] Boa pergunta. Troquem de lugar, pessoal. Vamos tentar a volta desse jeito.
2. **“Com todo mundo passando por aqui, ainda dá para alcançar os esteios?”** [expressao=neutro] — **Darvek:** [expressao=neutro] Assim, não. Desobstruam a passagem. Vamos tentar de novo.

[As duas conferências fazem parte do ensaio; a opção decide a primeira atenção de Ghork.]

**Darvek:** [expressao=neutro] Agora sim. Aqui está o custo da reserva, separado do material que vamos usar no levantamento.

**Ghork:** [expressao=triste] Isso dá... um bom número de treinos, empilhados na forma de esteios.

**Darvek:** [expressao=neutro] Dá mesmo. Confira as contas comigo se quiser. Pedi que você abrisse mão disso; não vou esconder o preço.

**Conclusão:** preparação concluída, abre X2; nenhum desconto em Ludos ou atributo. O pagamento do contrato sustenta a operação, sem exigir saldo pessoal.

<a id="q-x2"></a>
### Q-X2 — Até onde foi conferido

**Acesso:** X1. **Local:** galerias. **Participantes:** Darvek, Ghork e equipe figurante. **Objetivo:** registrar observações e respeitar a interrupção necessária.

[A equipe identifica uma passagem que exige conferência antes de levar a carga adiante.]

**Darvek:** [expressao=neutro] Parem aqui. Não gostei daquele suporte. Vamos conferir antes de alguém avançar.

**Ghork:** [expressao=confuso] Já vamos parar? Depois de todo o tempo que passamos preparando a entrada?

**Darvek:** [expressao=neutro] Foi para isso que nos preparamos. Para poder parar e organizar a saída. Aqueles esteios não mudam a rocha.

**Ghork — escolha:**

1. **“Está bem. Enquanto você verifica, vou anotar o que vimos.”** [expressao=neutro] — **Darvek:** [expressao=neutro] Marque onde paramos. Deixe o resto em branco; ainda não vimos o que há lá.
2. **“Mostre o que está preocupando você. Se perguntarem por que paramos, quero saber responder.”** [expressao=neutro] — **Darvek:** [expressao=neutro] Aquele suporte sustenta esta passagem. Minha equipe vai verificar. Anote isso como o motivo da parada.

[A equipe reorganiza o percurso usando a reserva; obtém observações úteis e delimita a parte ainda incerta. Não descrever desabamento como causa dos mapas.]

**Ghork:** [expressao=triste] Achei que teríamos mais para mostrar na volta.

**Darvek:** [expressao=neutro] Eu também. Vamos mostrar o que conferimos e explicar por que não avançamos.

**Ghork:** [expressao=neutro] E quanto custou. Eu escolhi a reserva. Não vou deixar você explicar a conta sozinho.

**Conclusão:** investigação X realizada; libera Q-20, R3 e R4. Convites dependentes de X/Y podem agora ser avaliados. Nenhum aliado automático. A equipe retorna viva sem uma conclusão universal de que só X é responsável.

<a id="q-y1"></a>
### Q-Y1 — O peso de cada coisa

**Acesso:** compromisso Y. **Locais:** mercado e entrada das minas. **Participantes:** Ghork, Zagra e Pirka. **Objetivo:** preparar uma carga compatível com o reconhecimento limitado.

**Pirka:** [expressao=neutro] Lista curta. Confiram mesmo assim. O que esquecerem aqui não vai ficar mais perto depois que sairmos.

**Zagra:** [expressao=neutro] Ghork. Antes de carregar, diga onde esse trabalho termina. Não quero que cada um esteja concordando com uma coisa diferente.

**Ghork — escolha:**

1. **“Se um trecho exigir mais equipamento ou gente do que levamos, não entramos nele.”** [expressao=neutro] — **Zagra:** [expressao=neutro] Isso. Ponha no relatório também. Ninguém vai chamar de serviço incompleto porque resolveu querer mais depois.
2. **“E o dinheiro que vamos guardar não vai ajudar a carregar alguém para fora. Não teremos a reserva do Darvek.”** [expressao=neutro] — **Zagra:** [expressao=neutro] Certo. Se o trabalho exigir essa reserva, nosso serviço termina ali.

[Na entrada, Ghork confere marcações, carga e sinais de parada com a equipe.]

**Ghork:** [expressao=confuso] E se alguém quiser voltar, mas não quiser ser a pessoa que pede?

**Zagra:** [expressao=neutro] Vou perguntar antes de avançar. Você também pode perguntar. E, se for eu quem estiver apressando os outros, espero que me interrompa.

**Ghork:** [expressao=neutro] Isso eu consigo. Prefiro uma conversa desconfortável aqui a descobrir lá embaixo que ninguém queria ir.

**Conclusão:** limites apresentados à equipe, abre Y2. O plano preserva mais recursos, mas não concede bônus ou elimina o risco.

<a id="q-y2"></a>
### Q-Y2 — A marca de retorno

**Acesso:** Y1. **Local:** galerias. **Participantes:** Ghork, Zagra e equipe. **Objetivo:** reconhecer, interromper e registrar o limite do serviço.

[A equipe observa sinais de instabilidade antes do ponto pretendido. Zagra levanta a mão; todos param.]

**Zagra:** [expressao=neutro] Este é o nosso limite. Não trouxemos o suficiente para passar daqui.

**Ghork:** [expressao=triste] Mas o trecho que viemos examinar ainda está mais à frente.

**Zagra:** [expressao=neutro] Eu sei. E, se alguém se machucar lá dentro, teremos pouca coisa para ajudar na volta. Foi aqui que eu disse que pararíamos.

**Ghork — escolha:**

1. **“Então vou marcar este ponto. Pelo menos vão saber até onde chegamos.”** [expressao=neutro] — **Zagra:** [expressao=neutro] E por quê. Não marque o próximo trecho como intransponível. Não sabemos disso; não fomos conferir.
2. **“Na entrega, eu explico por que voltamos.”** [expressao=neutro] — **Zagra:** [expressao=neutro] Nós explicamos. Eu propus esse plano, Ghork. Você não precisa responder por ele sozinho.

[Eles registram o que observaram e recuam sem acidente obrigatório.]

**Ghork:** [expressao=triste] Então continuo com o dinheiro dos treinos. E continuo sem poder dizer o que tem lá embaixo.

**Zagra:** [expressao=neutro] Foi o que aconteceu. Ponha as duas coisas no relatório, mesmo que não seja o final que queríamos.

**Ghork:** [expressao=neutro] Seja lá o que dissermos, não quero que o Darvek vire piada.

**Zagra:** [expressao=neutro] Não vai virar, se depender de mim. A reserva dele teria ajudado aqui. Também teríamos pago por ela.

**Conclusão:** investigação Y realizada; libera Q-20, R3 e R4 e a avaliação dos convites dependentes. O recuo não transforma a rota numa falha nem afirma que assumir risco sempre compensa.

<a id="q-20"></a>
### Q-20 — O nome na lista

**Acesso:** X2 ou Y2. **Locais:** casa de contratos, sede escolhida, treino e coliseu. **Participantes:** Ghork, Meruna, Elune, representante escolhido, mentor, Lala, Guedra, Dorga, Savel, Torvak e Rask em cenas separadas. **Objetivo:** entregar o trabalho, responder por seus custos e conquistar a classificação. **Referências:** PC1-químico, PC1-Silver e PC2-compromisso. B4–B6 cabem nesta única quest, com retornos ao mapa entre cenas para permitir R3/R4.

#### 1. A entrega

**Meruna:** [expressao=neutro] Primeiro, mostrem por onde passaram. Depois, onde tiveram que parar.

**Ghork, X:** [expressao=neutro] Montamos a reserva. Quando foi preciso verificar um suporte, paramos e usamos a reserva para organizar a saída. Sobrou menos do pagamento para os treinos.

**Ghork, Y:** [expressao=neutro] Levamos menos equipamento. Quando chegamos ao terreno instável, voltamos. Sobrou mais dinheiro, mas depois desta marca? Não conseguimos verificar.

**Elune:** [expressao=neutro] Vou colocar cada observação aqui, onde vocês a fizeram. O espaço em branco fica em branco. Não quero que a próxima equipe entenda isso como caminho livre.

**Meruna:** [expressao=neutro] Isso explica o serviço feito. Não libera o restante da mina para exploração. O pagamento combinado vai para a guilda; a divisão segue o acordo de vocês.

**Ghork — escolha:**

1. **“Quero incluir o custo do plano também. Isso pesou na nossa escolha.”** [expressao=neutro] — **Meruna:** [expressao=neutro] Inclua. Se contratarmos outro levantamento, vou precisar saber quanto este exigiu.
2. **“Podemos explicar melhor a parada? Não quero que pareça que só nos cansamos do serviço.”** [expressao=neutro] — **Meruna:** [expressao=neutro] Descreva o que fez vocês pararem. Seja específico, mas não diga à próxima equipe o que ela vai encontrar. As condições podem mudar.

**Representante:** Darvek: [expressao=neutro] “A reserva permitiu reorganizar a equipe para a volta. Aqui estão as despesas, uma por uma.” / Zagra: [expressao=neutro] “Nosso plano terminava ali. Respeitamos isso. Receber o pagamento não nos dá uma resposta sobre o resto.”

**Saída da cena:** remuneração pessoal conhecida em termos narrativos. Valores permanecem pendentes. Uma conversa de contribuição nunca usa dinheiro da guilda.

#### 2. Uma goteira e um trabalho começado

[Na sede escolhida, Ghork prepara o segundo contato. Proposta: Virmura mantém o serviço de recarga necessário aos contatos mesmo se rival, sem ceder recursos da expedição ou exigir adesão. A montagem só mostra uma recarga quando necessária, sem frequência inventada.]

**Lala:** [expressao=feliz] Duas peças prontas! Duas! Vou começar a mostrar para as pessoas. Ver se alguém quer comprar alguma coisa.

**Ghork:** [expressao=confuso] Duas? Quando você achou tempo para tudo isso?

**Lala:** [expressao=feliz] O quê, era para esperar a loja aparecer? Preciso de clientes antes de precisar de um balcão.

**Ghork — escolha:**

1. **“Vamos, mostre. Quero ver o que você fez.”** [expressao=feliz] — **Lala:** [expressao=feliz] Esta é minha preferida. Aquela deu mais trabalho. Não pergunte pela manga. Eu e a manga ainda estamos discutindo.
2. **“Eu estava falando sério sobre a loja. Ainda quero ajudar você a chegar lá.”** [expressao=neutro] — **Lala:** [expressao=feliz] Eu sei. Mas olhe esta parte primeiro. Aqui, a manga. Fui eu que fiz, Ghork.

**Ghork:** [expressao=feliz] Estou olhando. Ficou boa. Também tenho uma coisa para contar... terminei um trabalho nas minas.

**Lala:** [expressao=confuso] Nas minas? Ah, você vai me contar tudo. Mas, primeiro, o Dam mandou um recado. Escute antes de prometer uma casa inteira.

**Lala, lendo o recado de Dam:** [expressao=neutro] “Apareceu uma goteira no quarto coletivo. Estou organizando o conserto, mas falta material. Você consegue ajudar com alguma coisa agora? Preciso saber o que mais vou ter que arranjar.”

**Ghork:** [expressao=triste] Estou com a minha parte do pagamento. Ia usar para treinar mais...

**Lala:** [expressao=neutro] Ele precisa saber, seja qual for a resposta. Diga o que você consegue fazer e eu passo o recado.

**Interface:** “Contribuir usa uma parte da remuneração pessoal e abre mão de uma sessão paga adicional de preparação. Guardar preserva essa preparação. Nenhuma opção altera o D20, exige Ludos ou encerra a amizade.”

**Escolha contribuir:**

**Ghork:** [expressao=neutro] Consigo mandar uma parte para o material. Diga isso a ele. A casa inteira vai demorar um pouco mais.

**Lala:** [expressao=feliz] Vou dizer. Ele vai perguntar quando chega. O que respondo?

**Ghork:** [expressao=neutro] Que vou combinar a entrega primeiro. Não quero deixar ele esperando por uma data que inventei.

[Proposta de remessa, sujeita à validação: Jorvi registra o valor e Pirka aceita transportá-lo numa saída já existente para Daratrine; não é uma viagem jogável, não os identifica com o cocheiro do livro e não cria taxa obrigatória.]

**Jorvi:** [expressao=neutro] Confira aqui a quantia e o nome de quem recebe. A Pirka leva na saída que combinamos. Esta cópia fica comigo.

**Pirka:** [expressao=neutro] É isso que vou levar. Se a saída mudar, eu aviso. Enquanto eu não entregar, não diga a eles que já chegou.

**Ghork:** [expressao=neutro] Entendi. Posso ficar com uma cópia? Quero passar os dados certos para o Dam.

**Escolha guardar:**

**Ghork:** [expressao=triste] Desta vez, preciso guardar para os treinos. Diga a ele... diga que não consigo mandar nada agora.

**Lala:** [expressao=neutro] Está bem. Talvez ele fique decepcionado. Prefiro dar a sua resposta a deixar ele esperando.

**Ghork:** [expressao=triste] Achei que a esta altura já teria mais para mandar para ele.

**Lala:** [expressao=neutro] Vou dar o recado a ele. Mas, da próxima vez, conte como você está também, está bem?

**Convergência:**

**Ghork:** [expressao=feliz] E você tem que me contar quando vender essas peças. Quero saber disso.

**Lala:** [expressao=feliz] Vou contar vendendo ou não. Você não vai escapar da história da manga.

**Saída:** registrar contribuir/adiar. As duas opções estão disponíveis em X e Y; custos de segurança não forçam uma resposta. Nenhum contador econômico novo é implementado por este roteiro.

#### 3. Quem já ganhou também precisa de outra dose

[Na casa de contratos, Dorga cobra Meruna; Ghork chega após a própria entrega.]

**Dorga:** [expressao=raiva] Quando ninguém queria pagar por aquelas expedições, nossa guilda pagou. Agora os contratos vão para gente que nem estava lá.

**Meruna:** [expressao=neutro] Eu não esqueci. Mas estou avaliando o trabalho proposto agora. Preciso dos detalhes, seja quem for que traga a proposta.

**Dorga:** [expressao=raiva] E as famílias dos nossos veteranos? Ainda estão aqui, Meruna. Você pode mudar os critérios. Não pode esperar que elas deixem de precisar de trabalho.

[A conversa termina sem confissão do pacto. No coliseu, um companheiro entrega uma dose a Torvak. Ele espera a mão firmar antes de cumprimentar o público. Savel recolhe o estojo.]

**Ghork — escolha:**

1. **“Sua mão... você está bem?”** [expressao=confuso] — **Torvak:** [expressao=neutro] São os anos de arena. Uma hora eles pesam. Meu fornecedor está cuidando disso.
2. **“Então, pronto para as eliminatórias?”** [expressao=neutro] — **Torvak:** [expressao=feliz] Estou pronto para quem achar que chegou sua vez de tomar meu lugar.

**Savel:** [expressao=neutro] O treinamento dele exige muito do corpo. Interromper as doses sem acompanhamento só agravaria a situação.

**Ghork:** [expressao=raiva] Já que estamos falando de treino... foi você que fez o Rask cancelar os nossos.

**Torvak:** [expressao=raiva] Fui eu. Seu mentor poderia ter retirado aquela acusação. Minha equipe não vai abrir espaço toda vez que alguém decidir que não merecemos o que conquistamos.

**Ghork — escolha:**

1. **“Então diga isso com todas as letras. Não venha chamar de erro de agenda depois.”** [expressao=raiva] — **Torvak:** [expressao=neutro] Acabei de dizer. Pronto. Agora tente me vencer na arena.
2. **“É fácil chamar de conquista quando quem abre mão de alguma coisa são os outros.”** [expressao=raiva] — **Torvak:** [expressao=raiva] Acha que fiquei neste lugar por tantos anos sem pagar um preço? Volte quando tiver feito tanto quanto eu.

**Saída:** abuso reconhecido pelo autor do ato; observação de dependência sem diagnóstico completo. O jogador não conhece a adesão ao golpe. Nos bastidores, conforme proposta do arco do campeão, ela ocorre neste período e independe de recrutamentos.

#### 4. Preparar-se e classificar

[No espaço de Guedra, Ghork pratica com o que tem.]

**Guedra, se contribuiu:** [expressao=neutro] Não temos o treino extra, mas ainda temos nosso horário marcado. Vamos aproveitar. Mostre onde você perde o apoio.

**Guedra, se guardou:** [expressao=neutro] Com esse treino extra, dá para dedicar mais tempo à sua base. Nisso, consigo ajudar. Ganhar já é outra história.

**Ghork:** [expressao=feliz] Vamos começar pela parte em que tento fazer a perna ficar mais comprida porque meus braços não alcançam.

**Guedra:** [expressao=neutro] Então vamos pegar esse momento. Devagar, para eu enxergar.

[Rheed narra a continuidade da fase de grupos e da preparação, sem resultados numéricos ou batalhas extras. Rask recebe Ghork na entrada do coliseu.]

**Rask:** [expressao=neutro] Sua equipe está classificada. Ainda dá tempo de convidar pessoas antes do mata-mata. Confirme a inscrição quando estiver pronto; depois disso, a equipe fica fechada.

**Ghork:** [expressao=confuso] Ali. É o meu nome?

**Rask:** [expressao=feliz] É seu. Pode ler de novo, se quiser.

**Mentor escolhido:**

- **Virmura:** Você chegou até aqui respeitando os limites do trabalho. Quero que continue me dizendo quando precisar de ajuda.
- **Borun:** Você consegue explicar como chegou até aqui. Não precisa esperar que eu conte por você.
- **Sevrak:** A escola terá o que mostrar nesta classificação. Quero que nossa preparação seja reconhecida.

**Ghork — escolha:**

1. **“Você me ajudou a chegar aqui. Não esqueci disso. Mas, daqui para a frente, quero fazer minhas próprias escolhas.”** [expressao=neutro] — **Mentor:** Virmura: [expressao=neutro] “Está bem. Conte o que está pensando. Vou tentar não responder por você antes que termine.” / Borun: [expressao=feliz] “Ótimo. Eu ficaria decepcionado se você não fizesse isso.” / Sevrak: [expressao=neutro] “Então esteja pronto para explicar essas escolhas quando alguém questionar.”
2. **“Posso aproveitar meu nome ali antes de chegarmos à próxima lista do que devo fazer por todo mundo?”** [expressao=feliz] — **Mentor:** Virmura: [expressao=feliz] “Pode. Tem razão. Hoje, vamos comemorar.” / Borun: [expressao=feliz] “Ah, minha lista está tão comprida assim? Então é melhor começar a reclamar agora.” / Sevrak: [expressao=feliz] “Muito bem. Comemore. Vou guardar minhas cobranças até você pelo menos terminar esta conversa.”

**Torvak:** [expressao=neutro] Então se classificou, Ghork. Seu mentor conseguiu onde treinar depois de toda aquela confusão.

**Ghork:** [expressao=raiva] Conseguimos. Teria sido mais fácil sem você nos obrigar a refazer tudo.

**Torvak:** [expressao=neutro] Então vamos ver o que conseguiram fazer.

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

**Nyra:** [expressao=neutro] Sobrou um horário à noite no pátio e tenho duas pessoas querendo usar. Ghork, dê uma olhada com elas. Antes de abrir, quero saber quem vai cuidar do lugar.

**Brakka:** [expressao=neutro] Treino depois do trabalho. É isso que estou pedindo. Tem gente ainda no serviço quando as aulas começam. Nunca consegue participar.

**Nima:** [expressao=neutro] E eu preciso de um lugar para despachar as entregas noturnas. Saímos juntos, conferimos quem voltou. Sem uma base, cada um acaba andando sozinho por essas ruas.

**Ghork:** [expressao=confuso] Um de vocês não podia começar depois? Dividir a noite?

**Nyra:** [expressao=neutro] Se conseguir fazer as caixas atravessarem as pessoas. É um horário, Ghork. Não tenho quem cuide do pátio em outro momento.

[O jogador examina a passagem e o canto de armazenamento, em qualquer ordem.]

**Na passagem — Nima:** [expressao=neutro] As cargas passam por aqui. Bloqueie isso e nada entra nem sai.

**No canto — Brakka:** [expressao=neutro] Posso pôr os bancos aqui. A menos que fique tudo cheio de caixas, claro. Aí terei uma turma sem espaço nem para ficar em pé.

**Ghork:** Entendi. Não vou prometer o mesmo pátio duas vezes.

#### 2. Escolher e fazer

**Interface:** “Apoiar o treino favorece Brakka; apoiar o despacho favorece Nima. Só um deles poderá ser recrutado por esta missão. Confirmar treino / Confirmar despacho / Decidir depois.”

“Depois” retorna ao mapa e conserva a inspeção. Os objetos não são deslocados antes da confirmação.

**Treino:**

**Ghork:** [expressao=neutro] Vamos abrir espaço para os treinos do Brakka. Eu ajudo a preparar.

**Nima:** [expressao=triste] Então preciso de outro lugar para as entregas. Achei que finalmente fôssemos resolver isso.

**Brakka:** [expressao=feliz] Certo! Primeiro, os bancos. Ghork, confira esta lista, veja quem consegue vir. Talvez eu tenha me animado antes de receber todas as respostas.

[Ghork recebe a lista, confere presenças e entrega-a a Nyra. Brakka e os trabalhadores movem os bancos.]

**Nyra:** [expressao=neutro] A lista está certa. Quem guardar o material tranca o pátio. Não quero que deixem isso para mim.

**Ghork:** [expressao=neutro] Combinamos cuidar do lugar. Isso inclui a fechadura.

**Despacho:**

**Ghork:** [expressao=neutro] Vamos dar uma base às entregas da Nima. Eu ajudo com as caixas.

**Brakka:** [expressao=triste] Está bem. Vou continuar procurando. Aquelas pessoas ainda precisam de onde treinar, mesmo que não seja aqui.

**Nima:** [expressao=neutro] Ótimo. Aqui estão as etiquetas. Confira as caixas comigo, depois os retornos. O que ninguém reconhecer fica de lado. Nada de adivinhar.

[Ghork recebe etiquetas, marca os volumes e devolve a lista conferida a Nyra. Nima divide o trabalho com os entregadores.]

**Nyra:** [expressao=neutro] Está bem. Mantenham a passagem livre até a última pessoa voltar. Não só até cansarem de prestar atenção nela.

**Ghork:** [expressao=feliz] Nada de banco no caminho. Pode acreditar: aprendi o estrago que um banco faz quando você precisa sair depressa.

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

**Sura:** [expressao=neutro] Continuo atendendo gente que se machucou naquele pátio. Quero que isso pare. Podemos usar os registros de atendimento para mostrar o que acontece sem expor os pacientes.

**Edrin:** [expressao=neutro] Algumas dessas pessoas querem falar em público, com nome. Eu reuniria quem quiser depor e cobraria uma resposta dos responsáveis.

**Ghork:** [expressao=confuso] Vocês dois querem impedir que mais gente se machuque. O que impede vocês de fazer isso juntos?

**Sura:** [expressao=neutro] O que acontece com essas pessoas depois. É aí que discordamos. Antes de escolher, ouça alguém que se machucou.

**Ferido:** [expressao=triste] Podem usar o que eu contar. Só... sem nome. Ainda preciso que aquela gente me contrate. Não posso deixar que me reconheçam nisso.

**Ghork — escolha:**

1. **“Está bem. Seu nome fica de fora.”** [expressao=neutro] — **Ferido:** [expressao=neutro] Então... pergunte sobre o equipamento. Disso eu posso falar.
2. **“Diga o que você se sente à vontade para deixar a gente contar.”** [expressao=neutro] — **Ferido:** [expressao=neutro] O que aconteceu comigo. Meu nome, não. Nem onde trabalho.

**Ferido:** [expressao=triste] O suporte cedeu no meio do exercício. Disseram que eu era desastrado. Quem me ajudou guardou um pedaço e levou para a Guedra. Pelo menos alguém quis olhar aquilo.

**Sura:** [expressao=neutro] A Guedra vai nos emprestar a peça. Leve esta autorização e traga o pedaço. Vamos ver o que ele pode nos dizer antes de decidir de quem é a culpa.

[Ghork recebe autorização e cópia anônima do relato. Não há opção de expor o paciente à força.]

#### 2. Buscar a peça e conferir o que ela mostra

**Guedra:** [expressao=neutro] Trouxeram isso para mim depois. Não vi quebrar, Ghork. Eu dou aula aqui; o acidente foi em outro pátio.

**Ghork:** [expressao=neutro] Entendi. Precisamos que alguém examine o dano, não que complete a história que ninguém viu.

**Guedra:** [expressao=neutro] Leve ao Durn. Ele pode fazer isso. E traga de volta depois. Precisamos guardar essa peça.

[Receber a peça avariada muda o objetivo para a oficina.]

**Durn:** [expressao=neutro] Está vendo aqui? Há uma falha. Isso eu consigo mostrar. Quem montou, quem percebeu o desgaste antes de quebrar... a peça não me conta isso.

**Ghork — escolha:**

1. **“Anote isso também. Não quero que seu laudo diga mais do que você pode afirmar.”** [expressao=neutro] — **Durn:** [expressao=neutro] Não vai dizer. Vou descrever o que encontrei. Para acusar alguém, vocês vão precisar de mais do que isso.
2. **“Deixe as pessoas envolvidas lerem antes de levarmos isso adiante. Elas precisam saber o que estamos associando ao relato delas.”** [expressao=neutro] — **Durn:** [expressao=neutro] Leve uma cópia. Se encontrarem alguma coisa errada, tragam para mim. Prefiro corrigir agora.

[Durn não destrói a peça no exame. Ghork recebe uma nota de condição, devolve a peça a Guedra e leva a cópia à enfermaria.]

**Guedra:** [expressao=neutro] Vou guardar a peça aqui, junto com o registro de quem examinou. Podemos precisar dela de novo.

**Edrin, na enfermaria:** [expressao=neutro] Isso basta para pedir uma investigação. Não para dizer que alguém quis que acontecesse.

**Sura:** [expressao=neutro] Deixe eu conferir a cópia mais uma vez. Tirar o nome não protege ninguém se os detalhes entregarem a pessoa.

#### 3. Uma apresentação inicial

**Edrin:** [expressao=neutro] Vou reunir quem quer depor. Só essas pessoas. Quem pediu sigilo fica fora da lista de nomes.

**Sura:** [expressao=neutro] E eu posso apresentar os ferimentos e as conclusões do Durn sem identificar os pacientes. Ghork, qual apresentação você vai ajudar a preparar? Não dá tempo de fazer as duas.

**Interface:** “Relatório anônimo favorece Sura. Depoimentos públicos voluntários favorecem Edrin. Os outros caminhos podem continuar na cidade, mas esta missão dá a Ghork um compromisso e um recrutamento possível. Confirmar / Decidir depois.”

**Relatório anônimo, na casa de contratos:**

**Ghork:** [expressao=neutro] Aqui estão os relatos que recolhemos e as conclusões sobre a peça quebrada. Os pacientes permitiram que usássemos suas histórias. Não que revelássemos seus nomes.

**Sura:** [expressao=neutro] Por favor, investigue o equipamento e as condições daquele pátio. Isto é o que conseguimos apurar. Não queremos esperar alguém se machucar de novo.

**Seldan:** [expressao=neutro] Vou receber o material e registrar o pedido. Apontar um responsável vem depois da investigação, não antes.

**Edrin:** [expressao=neutro] Vou continuar procurando quem queira depor. Isso não muda o que prometemos aos pacientes deste relatório.

**Depoimentos voluntários, no mesmo local:**

**Ghork:** [expressao=neutro] Todos aqui escolheram falar. Mantivemos o relato sigiloso separado. Aquele paciente não faz parte destes depoimentos.

**Edrin:** [expressao=neutro] Antes de confirmar qualquer coisa, releiam seus depoimentos. Corrijam o que precisar. Já temos o exame da peça; de vocês, precisamos do que viram.

**Testemunha figurante:** [expressao=confuso] Esta parte está errada. A ordem. Aconteceu depois que mudaram o exercício, não antes.

**Edrin:** [expressao=neutro] Depois da mudança. Pronto, corrigido. O resto está como você lembra?

**Testemunha:** [expressao=neutro] Sim. Está certo.

**Seldan:** [expressao=neutro] Vou receber os depoimentos e o pedido. Também precisamos ouvir os responsáveis pelo pátio antes de chegar a uma conclusão.

**Sura:** [expressao=neutro] Vou continuar atendendo quem precisar de mim. E, por favor, lembrem: uma audiência pública não desfaz uma promessa de sigilo.

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

**Durn:** [expressao=neutro] Vou doar esta estrutura para um projeto. Korr quer as peças; Velka quer ela inteira. Ninguém pega ferramenta até decidirmos.

**Korr:** [expressao=feliz] Olhe esse material! Dá para fazer proteção que as pessoas consigam pagar. Não para Terminus inteira, antes que alguém pergunte. Mas alguns conjuntos.

**Velka:** [expressao=neutro] E eu posso ensinar com ela assim. Deixem eu mostrar o movimento. Depois de desmontada, perdemos onde praticar.

**Ghork:** [expressao=neutro] Quero ver. Não quero escolher só pelas duas descrições do mesmo monte de metal.

[A armação segue com ajudantes ao espaço de treino; Ghork recebe de Durn a autorização de apresentação, sem direito de desmonte ainda.]

**Guedra:** [expressao=neutro] Deem espaço para ela. Mantenham a passagem livre. Velka, mostre a transferência de peso.

**Velka:** [expressao=neutro] Aqui. Viu quanto espaço preciso entre os apoios? Por enquanto, só olhe, Ghork. Não preciso que você force a perna para provar meu argumento.

**Korr:** [expressao=neutro] Ah. Sim, agora entendi. Mas são justamente as peças que eu usaria. Não consigo tirar sem acabar com esse movimento.

**Ghork — perguntas livres:**

- **“Korr, explique melhor. O que daria para fazer com isso?”** [expressao=neutro] — **Korr:** [expressao=feliz] Alguns conjuntos de proteção. Testados antes de alguém vestir, claro. Pense em quem está se virando como pode porque equipamento novo custa caro demais.
- **“Velka, se mantivermos a estrutura, quem vai poder usar?”** [expressao=neutro] — **Velka:** [expressao=neutro] Quem vier às aulas que eu organizar. E eu vou ensinar. Não pediria para você preservar isso só para eu admirar a estrutura parada aqui.

[De volta à oficina, o jogador entrega a autorização de retorno.]

**Interface:** “Reaproveitar favorece Korr e desmonta a armação. Preservar favorece Velka e mantém o instrumento para ensino. Confirmar um destino / Decidir depois.”

**Reaproveitar:**

**Ghork:** [expressao=neutro] Vou apoiar as proteções. Korr, vamos conferir o que temos antes de soltar qualquer peça.

**Velka:** [expressao=triste] Eu queria manter a estrutura. Vou procurar outro jeito de ensinar o movimento, mas... não, não consigo substituir isso amanhã.

**Durn:** [expressao=neutro] Está bem. Korr desmonta. Ghork, anote cada peça que sair. Não vamos perder nada pelo chão.

**Korr:** [expressao=neutro] O primeiro conjunto vai ser testado antes de ser usado. E leva meu nome. Se der problema, quero que venham falar comigo.

**Preservar:**

**Ghork:** [expressao=neutro] A estrutura fica inteira. Velka, vou ajudar você a começar as aulas.

**Korr:** [expressao=triste] Vou encontrar outro material. Só... usem, está bem? Depois disso tudo, não quero ver a estrutura aqui juntando poeira.

**Velka:** [expressao=neutro] Nem eu. Vou falar com a Guedra e marcar a primeira aula.

**Durn:** [expressao=neutro] Então fica para as aulas. Vou registrar a entrega. Uma estrutura, ainda inteira.

**Conclusão:** destino registrado e executado; Ludos uma vez. O objeto não volta ao estado anterior para permitir o outro convite. As proteções não concedem bônus além do +1 caso Korr seja recrutado.

**Convite — Ghork:** Quer levar esse trabalho comigo para o campeonato?

- **Korr, favorecido:** Quero. E quero ver como as proteções se comportam em uso de verdade.
- **Velka, favorecida:** Quero. A prática continua com quem deixei responsável; a técnica pode ser vista na arena também.

Mostrar “Convidar / Depois” conforme acesso. **Preterido:** Korr: “Outra equipe vai apoiar minha oficina. Estou comprometido com ela.” / Velka: “Vou representar o ensino com outro grupo. Continuo querendo vê-lo praticar, mesmo do outro lado.”

<a id="r4"></a>
### R4 — A chave da cisterna

**Duração proposta:** longa. **Acesso:** X2/Y2 e matriz. **Locais:** cisterna → mercado → cisterna. **Participantes:** Tessa, Mavren, Ghork, Jorvi e trabalhadores figurantes. **Objetivo:** conferir salários e garantia, depois respaldar a suspensão ou a entrega. **Referências:** PC1-Casey para trabalho com efeitos na vida da cidade; PC2-compromisso para assumir uma obrigação incompatível com outra. Não transforma Tessa ou Mavren em chefão para resolver uma divergência legítima.

#### 1. A chave ainda está aqui

**Tessa:** [expressao=raiva] Estamos quase terminando a cisterna e a equipe ainda não recebeu. Queremos o pagamento antes da entrega. Depois que a chave sair da nossa mão, o que sobra para negociar?

**Mavren:** [expressao=neutro] Propus deixar o dinheiro com Jorvi para liberar na entrega. Mas precisamos conferir a quantia e as condições. Não estou pedindo que ninguém aceite só na confiança.

**Ghork:** [expressao=neutro] O dinheiro já está com Jorvi? Ou ainda estamos falando de uma promessa?

**Mavren:** [expressao=neutro] Vamos descobrir. Até lá, a chave fica aqui. Alguém dizer que pagou não basta.

**Tessa:** [expressao=neutro] E, antes de voltar com a resposta pronta, ouça quem está esperando pelo salário.

[O jogador ouve dois trabalhadores, em qualquer ordem.]

**Trabalhador 1:** Se entregar antes de pagar, o que ainda podemos cobrar com a obra nas mãos deles?

**Trabalhador 2:** Se parar, minha conta continua chegando. Quero saber se a garantia é dinheiro de verdade.

**Ghork:** [expressao=neutro] Vou comparar o que devem com o depósito e trazer a resposta. Assim vocês vão saber o que estão pedindo que aceitem.

[Tessa entrega uma cópia dos valores devidos. Mavren entrega a proposta de garantia; a chave permanece no canteiro.]

#### 2. O que está depositado

**Jorvi:** [expressao=neutro] O dinheiro está aqui. Esta é a sua cópia do registro. Confira com cada pagamento devido.

**Ghork — investigação, ambas necessárias:**

- **“O cliente pode retirar o dinheiro antes de entregarmos a cisterna?”** [expressao=neutro] — **Jorvi:** [expressao=neutro] Não. Pelo acordo que aceitei, está reservado para estes pagamentos. O cliente não pode simplesmente retirar.
- **“E quem precisa confirmar que a entrega foi concluída?”** [expressao=neutro] — **Jorvi:** [expressao=neutro] Quem recebe e os representantes dos trabalhadores. Preciso da confirmação dos dois lados antes de liberar qualquer quantia.

**Ghork:** [expressao=neutro] E se os trabalhadores lerem isso e ainda assim não aceitarem?

**Jorvi:** [expressao=neutro] Então não entregue a chave dizendo que concordaram. Leve a cópia. Deixe que leiam por conta própria.

[Ghork recebe comprovante e condições de liberação; não recebe o dinheiro dos trabalhadores nem o adiciona à própria bolsa.]

#### 3. O acordo que cada um aceita

**Mavren:** [expressao=neutro] Conferi a lista. Está tudo lá, o suficiente para cobrir a dívida. Nessas condições, estou disposto a terminar e entregar.

**Tessa:** [expressao=neutro] É melhor do que uma promessa, sim. Ainda quero os salários pagos primeiro. Podemos exigir isso enquanto a cisterna estiver nas nossas mãos.

**Ghork — escolha:**

1. **“Vou respaldar a suspensão até quitarem.”** [Favorece Tessa.]
2. **“Vou ajudar a concluir com essa garantia verificada.”** [Favorece Mavren.]
3. **“Preciso pensar antes de assumir uma das posições.”** [Mapa, sem entregar chave ou concluir conflito.]

Antes de confirmar 1/2, informar: “Escolher uma posição define o recrutamento possível. Não é possível entregar e reter a cisterna nesta mesma resolução.”

**Suspensão:**

**Ghork:** [expressao=neutro] Conferimos o depósito. Ele existe. Mesmo assim, apoio esperar o pagamento da equipe antes de entregar a chave.

**Tessa:** [expressao=neutro] Vou anotar quem apoia essa decisão comigo. Quem não apoiar, pode dizer. Não vou falar por vocês.

**Mavren:** [expressao=triste] Não concordo. Não vou tirar a chave das mãos de vocês, mas não posso passar essa espera sem trabalho. Vou ter que procurar.

[O jogador entrega o comprovante a Tessa, que o anexa à comunicação de suspensão. A chave fica sob custódia dos trabalhadores.]

**Tessa:** [expressao=neutro] Ainda não recebemos, Ghork. Isso não acaba porque concordamos. Amanhã, vamos ter que negociar de novo.

**Ghork:** [expressao=neutro] Eu sei. Vou manter o que disse. E não vou dizer ao Mavren que essa espera não custa nada a ele.

**Entrega garantida:**

**Ghork:** [expressao=neutro] Vou ajudar a terminar. Conferimos o dinheiro, e os representantes precisam confirmar a entrega antes da liberação.

**Tessa:** [expressao=neutro] O dinheiro está garantido. Reconheço isso. Ainda preferia receber primeiro. Quem quiser aceitar esse acordo pode falar por si.

[Mavren e os trabalhadores concluem a etapa restante. Ghork recebe a chave para acompanhar a entrega e a passa ao responsável figurante diante dos representantes. Jorvi confirma a liberação registrada; não há novo contratante nomeado.]

**Mavren:** [expressao=neutro] A chave foi entregue. O pagamento está autorizado. Antes de alguém ir embora, confira se está com sua cópia.

**Ghork:** [expressao=feliz] Depois de carregar tanto papel, eu ficaria preocupado se isso terminasse num “confia em mim” e um aperto de mão.

**Conclusão:** suspensão ou entrega registrada; Ludos uma vez. Suspender não provoca desastre na cidade; entregar não exige intimidação dos trabalhadores. No desfecho de suspensão, a negociação segue aberta, sem inventar quitação instantânea.

#### 4. Convite

**Ghork:** Quero que entre na minha equipe. Podemos representar esse compromisso no campeonato.

- **Tessa, favorecida:** Podemos. A negociação continua com os demais representantes. Vou levar nossa posição para a arena.
- **Mavren, favorecido:** Vou. Quero que esse trabalho me dê autonomia para escolher o próximo, não só pagar o atraso do anterior.

Mostrar “Convidar / Depois” conforme acesso. **Preterido:** Tessa: “Vou representar minha posição por outra equipe. Não preciso fingir acordo para continuar respeitando você.” / Mavren: “Tenho outro grupo apoiando meu ofício. Já assumi esse compromisso.”

<a id="r5"></a>
### R5 — Uma vaga diante do público

**Duração proposta:** curta. **Acesso:** classificação em Q-20, matriz e ponto de não retorno ainda não cruzado. **Locais:** coliseu → treino → coliseu. **Participantes:** Odrik, Lethra, Rask, Ghork e aprendizes figurantes. **Objetivo:** preparar e realizar um dos formatos na única vaga de exibição. **Referência:** PC1-Roy, parceria fora da luta principal; o conflito de apresentação é autoral.

**Rask:** [expressao=neutro] Tenho um horário de exibição antes do mata-mata. Duas propostas para ele. Por favor, não me peçam para encaixar as duas.

**Odrik:** [expressao=feliz] Um espetáculo para arrecadar para a enfermaria. Consiga um público e eu dou a ele um motivo para abrir a bolsa. Os pacientes não vão precisar ficar lá sendo olhados.

**Lethra:** [expressao=neutro] Quero que os aprendizes mostrem seu trabalho. Com seus próprios nomes. Quando há um lutador famoso na frente, as pessoas esquecem de olhar para o resto.

**Ghork:** [expressao=confuso] E onde eu entro? Além de ser quem tem que escolher.

**Rask:** [expressao=neutro] Ajude a preparar a apresentação que escolher e traga o programa. Preciso saber o que vou anunciar antes de subir lá.

**Escolha com confirmação:** “Espetáculo beneficente, favorece Odrik / Demonstração dos aprendizes, favorece Lethra / Depois”. Não adiciona sexta partida de campeonato nem D20 obrigatório.

**Espetáculo, preparação no treino:**

**Odrik:** [expressao=feliz] Imagine: “Ghork, o terror que...” Não? Seu rosto está dizendo um não bem firme.

**Ghork — escolha:**

1. **“Meu nome já me dá problema suficiente sem a sua ajuda.”** [expressao=feliz] — **Odrik:** [expressao=feliz] Só Ghork, então. Guardo o terror para quando você perder a hora da minha entrada.
2. **“Conte sobre a luta. Minha história, deixe comigo.”** [expressao=neutro] — **Odrik:** [expressao=neutro] Justo. Temos uma apresentação que vale assistir. Posso atrair o público com isso.

[Ghork recebe o programa, confere o nome e ajuda a marcar as entradas da exibição. No coliseu, entrega o programa a Rask.]

**Rask:** [expressao=neutro] Odrik e seus parceiros se apresentam em apoio à enfermaria! As contribuições serão recolhidas pelos organizadores, que prestarão contas do valor arrecadado.

[A apresentação é narrada; não simula vitória no torneio.]

**Odrik:** [expressao=feliz] Público, dinheiro para a enfermaria e ninguém virando piada. Nada mal, hein? Gostei, Ghork. De trabalhar com você.

**Lethra:** [expressao=triste] Vou encontrar outro lugar para os aprendizes. Queria que tivessem um público sem precisar pegar a fama de alguém emprestada.

**Demonstração, preparação no treino:**

**Lethra:** [expressao=neutro] Leia como se estivesse anunciando, Ghork. Todos os nomes. Quero saber quanto tempo leva antes de começarmos os movimentos.

**Ghork:** [expressao=feliz] Dá tempo de falar todos. Mas você teria dado o primeiro golpe enquanto eu ainda estivesse lendo.

**Lethra:** [expressao=neutro] Então o primeiro golpe pode esperar. Deixe o público ouvir quem vai assistir.

[Ghork recebe o programa corrigido e o entrega a Rask.]

**Rask:** [expressao=neutro] A seguir, uma demonstração dos aprendizes de Lethra! Cada participante será apresentado antes do início do exercício.

[Rask apresenta figurantes sem criar novas fichas recorrentes; a demonstração acontece.]

**Lethra:** [expressao=feliz] Ouviram os nomes dos alunos antes de procurar por mim. Era isso que eu queria. Obrigada por conferir o programa.

**Odrik:** [expressao=neutro] Vou procurar outra equipe para o espetáculo. Se precisarem de ajuda com uma entrada, sabem onde me achar. E sim, eu queria esse horário. Posso ficar decepcionado.

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

**Rask:** [expressao=neutro] Última conferência antes de entrar. Depois que confirmar a equipe, os convites se encerram. Se ainda quer procurar alguém, é agora.

**Interface:** apresentar pares não conhecidos, conflitos incompletos, favorecidos sem convite, restrições e heróis já recrutados, sem revelar personagens desconhecidos pelo nome. Exemplo de rótulo: “R3: oportunidade de recrutamento não explorada”. “Voltar à cidade / Confirmar equipe e entrar”. Cancelar preserva todas as pendências; confirmar encerra novos conflitos e convites, mesmo com zero aliados. O mapa não deixa de existir, mas visitar um local não reabre a janela.

**Ghork, zero recrutados:** [expressao=neutro] Vou entrar sozinho.

**Rask:** [expressao=neutro] Sua inscrição permite. Confirme quando estiver pronto para enfrentá-los.

**Ghork, com aliados:** [expressao=feliz] Esta é a minha equipe. Estamos prontos.

**Rask:** [expressao=neutro] Confirmado. Aguarde a chamada para a primeira partida.

<a id="q-31"></a>
<a id="q-32"></a>
### Q-31 e Q-32 — As duas guildas do outro lado

**Base:** duas partidas contra as guildas rejeitadas. **Proposta de ordem para esta versão:** A enfrenta B e depois C; B enfrenta A e depois C; C enfrenta A e depois B. É uma ordem de roteiro a confirmar, sem sorteio adicional. **Objetivo:** vencer cada partida e responder às consequências da adesão. **Participantes:** Ghork, Rask e o líder da guilda adversária; combatentes são seus representantes, não necessariamente o mentor.

O bloco correspondente à guilda é executado uma vez na respectiva partida. Q-31 exige a confirmação da equipe; Q-32 exige a vitória de Q-31. Cada uma tem seu D20, revés e revanche. Fontes: reencontro competitivo desenvolvido a partir das relações de Terminus; não alegar que os pares espelham uma chave de Punch Club.

#### Contra Virmura

**Virmura:** [expressao=neutro] Minha equipe veio para vencer. Ainda temos pacientes para atender, e aquele contrato teria ajudado a pagar o trabalho.

**Ghork:** [expressao=neutro] Eu não esqueci.

**Virmura:** [expressao=neutro] Que bom. Então entende por que não vou pedir que abram caminho para você.

**Ghork — escolha:**

1. **“Nem pediria. Você me ajudou, mas eles também vieram disputar esta luta.”** [expressao=neutro] — **Virmura:** [expressao=neutro] Então não temos mais nada para acertar antes da partida.
2. **“Quero ganhar deles numa luta de verdade.”** [expressao=feliz] — **Virmura:** [expressao=feliz] Ainda bem. Foi para isso que eles vieram.

**Rask:** [expressao=neutro] Equipe de Ghork contra a guilda de Virmura! Aos lugares.

**Depois da vitória — Virmura:** [expressao=neutro] Vocês venceram. Agora, alguém precisa de atendimento? Vamos cuidar das duas equipes.

**Ghork:** [expressao=neutro] Obrigado. Diga a eles que deram trabalho.

**Revés:** a equipe de Ghork perde a tentativa; Virmura mantém atendimento sem pedir adesão. **Virmura:** “Volte quando estiver em condição. Minha equipe também vai se preparar.”

#### Contra Borun

**Borun:** [expressao=neutro] Arranjamos outro serviço para manter o pessoal. Eu queria aquele contrato, claro. Mas não dava para ficar sentado esperando você mudar de ideia.

**Ghork — escolha:**

1. **“Que bom que vocês se acertaram. Mas ainda quero ganhar de vocês.”** [expressao=feliz] — **Borun:** [expressao=feliz] Pode tentar. Eles vão dar trabalho.
2. **“Você já me deu bastante conselho. Hoje eu não vou pedir nenhum.”** [expressao=feliz] — **Borun:** [expressao=feliz] Ainda bem. Hoje os conselhos são para eles.

**Rask:** [expressao=neutro] Equipe de Ghork contra a guilda de Borun! Lutadores, preparem-se.

**Depois da vitória — Borun:** [expressao=neutro] Você leu bem a luta. Só não me peça para comemorar.

**Ghork:** [expressao=feliz] Nem ia pedir. Eu comemoro o suficiente por nós dois.

**Revés:** Ghork recua depois da interrupção da tentativa. **Borun:** “Eles também aprenderam a observar. Se voltar, encontrará gente prestando atenção em você.” Não entrega dica secreta que traia sua equipe.

#### Contra Sevrak

**Sevrak:** [expressao=neutro] Minha escola não parou quando você escolheu outra guilda. Meus representantes querem mostrar o que aprenderam.

**Ghork — escolha:**

1. **“Estou curioso para ver o que prepararam para a arena.”** [expressao=feliz] — **Sevrak:** [expressao=neutro] Vai poder conferir de perto.
2. **“Eles são bons. Posso reconhecer isso e continuar satisfeito com minha escolha.”** [expressao=neutro] — **Sevrak:** [expressao=neutro] Veremos se diz o mesmo depois da partida.

**Rask:** [expressao=neutro] Equipe de Ghork contra a escola de Sevrak! Lutadores, aos lugares.

**Depois da vitória — Sevrak:** [expressao=neutro] Você lutou bem. A vitória é sua. Isso não mudou minha opinião sobre o contrato.

**Ghork:** [expressao=neutro] Não esperava que mudasse. E não estou pedindo para me aceitar de volta.

**Revés:** **Sevrak:** “Minha equipe soube usar o que preparou. A próxima tentativa exigirá mais atenção.” Ghork pode preparar-se sem receber treino exclusivo gratuito da guilda hostil.

#### Conclusão de cada partida

**Rask, vitória:** [expressao=feliz] Resultado confirmado! A equipe de Ghork avança!

**Rask, revés:** [expressao=neutro] A equipe adversária vence esta luta. Vocês podem pedir revanche. Falem comigo quando estiverem prontos.

Essa convenção proposta explicita a regra de reveses e revanches da visão: a etapa só fecha ao superar o confronto, sem eliminação definitiva após a falha do D20. Precisa de validação de ritmo e regulamento; não acrescenta outra rodada obrigatória para quem vence de primeira. Preparação e cargas seguem [retornos](#retornos).

<a id="q-33"></a>
### Q-33 — A equipe que seguiu sem você

**Acesso:** Q-32 vencida. **Local:** coliseu. **Objetivo:** vencer as quartas. **Base:** X/Y preterido apoiado por uma guilda rejeitada. **Proposta:** cobrança profissional. A identidade da patrocinadora continua adiada; usar sua identificação visual só depois da decisão P03. As falas não pressupõem qual das duas foi escolhida.

**Rask:** Nas quartas, a equipe de Ghork enfrenta [Faíscas, se X / Esteios, se Y], com apoio de uma das guildas que já disputaram esta campanha.

**Se adversária é Zagra:**

**Zagra:** [expressao=neutro] Conseguimos apoio. Investimos no treino. Venha ver o que esse pessoal sabe fazer.

**Ghork:** [expressao=neutro] Eu nunca duvidei de que vocês soubessem lutar.

**Zagra:** [expressao=neutro] Eu sei. Mas saí daquela reunião sentindo que ainda precisava provar que minha equipe traria todo mundo de volta.

**Ghork — escolha:**

1. **“Eu queria uma reserva de segurança maior para aquele serviço. Não estava dizendo que vocês abandonariam alguém.”** [expressao=neutro] — **Zagra:** [expressao=neutro] Então deixe nossa luta falar por nós.
2. **“Eu podia ter explicado melhor. Ainda assim, colocaria o dinheiro na reserva.”** [expressao=neutro] — **Zagra:** [expressao=neutro] Isso eu aceito. Mas ainda vou tentar ganhar de você.

**Se adversário é Darvek:**

**Darvek:** [expressao=neutro] Pagamos pela segurança e mesmo assim chegamos às quartas. Conseguimos apoio e pusemos o treino em dia.

**Ghork:** [expressao=neutro] Não achei que vocês fossem desistir.

**Darvek:** [expressao=neutro] Eu ouvi. Mesmo assim, doeu ver minha reserva de segurança virar algo de que vocês podiam abrir mão.

**Ghork — escolha:**

1. **“Era um reconhecimento limitado. Por isso aceitei uma reserva menor. Eu entendi por que você queria mais.”** [expressao=neutro] — **Darvek:** [expressao=neutro] Então lembre dessa parte quando contar como foi o serviço.
2. **“Eu devia ter dado mais atenção ao risco que você estava explicando.”** [expressao=neutro] — **Darvek:** [expressao=neutro] Devia. Mas, agora, temos uma partida pela frente.

**Batalha:** D20 contra a equipe preterida. Nenhum representante externo foi recrutado por inferência. Não remover bônus nem acrescentar personagens nomeados para completar o time rival.

**Vitória — Zagra:** [expressao=neutro] Você passou. Não foi fácil, hein? **Ghork:** [expressao=feliz] Não foi mesmo. Vou lembrar dessa luta por um tempo.

**Vitória — Darvek:** [expressao=neutro] Você venceu. Vou cuidar da volta do meu pessoal. **Ghork:** [expressao=neutro] Boa viagem. E obrigado pela luta.

**Revés — Zagra:** Trouxemos menos do que alguns queriam e o suficiente para esta tentativa. / **Darvek:** Preparar a volta não nos impediu de avançar hoje.

**Ghork, revés:** Vou me preparar para a revanche. Não vou mudar a história do contrato porque perdi aqui.

**Conclusão:** vitória abre Q-34; revés segue regra comum sem reabrir X/Y ou transferir patrocínio.

<a id="q-34"></a>
### Q-34 — Gente conhecida, lado contrário

**Acesso:** Q-33. **Local:** arena. **Objetivo:** vencer a semifinal. **Base:** exatamente cinco adversários, um por par; recrutou um, enfrenta o outro; recrutou nenhum, sorteio entre os dois. Sortear apenas na primeira entrada e preservar o resultado nas revanches. Isso evita que recarregar uma tentativa invente outro reencontro.

**Rask:** [expressao=neutro] Cinco adversários entre vocês e a final! Talvez já tenham se encontrado pela cidade. Hoje, eles vieram disputar a mesma vaga que vocês.

**Ghork, zero aliados:** [expressao=neutro] Alguns rostos novos. E algumas conversas que ainda não terminaram.

**Ghork, com aliados:** [expressao=neutro] Já conhecemos alguns deles. Não esperem facilidade: eles também querem chegar à final.

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

1. **“Vamos fazer uma boa luta. Quero chegar à final tanto quanto vocês.”** [expressao=feliz] — **Rask:** [expressao=neutro] Aos lugares.
2. **“Quero ganhar de vocês. Nem por isso precisamos fingir que nunca nos vimos.”** [expressao=neutro] — **Rask:** [expressao=neutro] Conhecidos ou não, só uma equipe passa. Preparem-se!

**Batalha:** uma rolagem por tentativa contra o time completo, bônus normal de recrutamento. Não há cinco lutas extras.

**Vitória — Rask:** [expressao=feliz] A equipe de Ghork está na final!

**Ghork:** [expressao=feliz] Que luta. Foi bom encontrar vocês de novo. Melhor ainda ganhar.

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

**Mentor:** Virmura: [expressao=neutro] “Volte inteiro dessa luta. Quero ver o que vai fazer com todos os dias que vêm depois dela.” / Borun: [expressao=neutro] “Então me conte. Como pretende enfrentar Torvak?” / Sevrak: [expressao=neutro] “A cidade inteira vai ver você na final. Mostre o que nosso trabalho produziu.”

**Ghork:** [expressao=triste] Quando cheguei, eu pensei... é só ganhar um título, e vão parar de olhar para mim como se eu não servisse para nada.

**Mentor:** Virmura: [expressao=neutro] “Talvez alguns nunca enxerguem você como gostaria. Mesmo com esse título.” / Borun: [expressao=neutro] “Torvak tem esse título há anos. Não foi o bastante para ele parar de cobrar reverência dos outros, foi?” / Sevrak: [expressao=neutro] “Podem aceitar o resultado. Isso não significa que todos vão aceitar você.”

**Ghork — escolha:**

1. **“Quero ganhar mesmo assim. Não preciso que você escolha por mim.”**
2. **“Vou entrar por mim e pelo trabalho que fizemos. Não para encerrar toda discussão.”**

**Mentor:** Virmura: [expressao=feliz] “Está bem. Vá, então. Eu cuido dos nossos.” / Borun: [expressao=feliz] “Então vá. Não precisa parar para pedir minha aprovação a cada passo.” / Sevrak: [expressao=neutro] “Lembre do que acabou de dizer. Vai precisar sustentar essa posição fora da arena também.”

**V — espaço de Guedra:**

**Darvek, se X:** [expressao=neutro] Aqui está o levantamento completo. Reserva de segurança, custos... tudo registrado, como você pediu.

**Zagra, se Y:** [expressao=neutro] O relatório final aponta o trecho que não verificamos. Ninguém vai dizer que exploramos mais do que de fato vimos.

**Ghork:** [expressao=feliz] Obrigado. Se alguém me dissesse que eu ia ficar feliz de ver um relatório antes da final...

**Guedra:** [expressao=feliz] Deixe isso de lado um instante. Pedi para ver sua base, não sua caligrafia.

**Ghork:** [expressao=neutro] Achei que uma vitória ia resolver tudo. Pelo visto, tem uma lista inteira me esperando depois.

**Ghork — escolha:**

1. **“Primeiro, vou ganhar o título. Das outras perguntas eu cuido depois.”** [expressao=neutro]
2. **“Ainda quero ganhar. Só não posso prometer que isso vai resolver tudo.”** [expressao=neutro]

**Representante:** Darvek: [expressao=neutro] “Está bem. Agora vá se preparar para a luta.” / Zagra: [expressao=feliz] “Ótimo. Então me prometa uma boa luta.”

**Guedra:** [expressao=neutro] Primeiro, a base. Depois vá quando chamarem.

#### A final

**Torvak:** [expressao=neutro] Então você chegou. Pena que o general não está aqui para ver.

**Ghork:** [expressao=neutro] Posso lutar sem ele assistindo.

**Torvak:** [expressao=raiva] Aconteça o que acontecer aqui, sua guilda vai usar isso contra mim. Depois de tudo que fiz por esta cidade.

**Ghork:** [expressao=raiva] Você tirou nossos horários de treino porque meu mentor não pediu desculpas. Tentou nos impedir. Chegamos mesmo assim.

**Torvak:** [expressao=raiva] E acha que isso lhe dá o direito de tomar meu lugar?

**Ghork — escolha:**

1. **“Vim conquistar o título. Se quiser ficar com ele, vai ter que me vencer.”** [expressao=neutro] — **Torvak:** [expressao=neutro] Foi para isso que vim.
2. **“Você já fez seu nome. Vim conquistar o meu.”** [expressao=neutro] — **Torvak:** [expressao=raiva] Então chega de falar do meu. Entre na arena.

**Rask:** [expressao=neutro] Final do campeonato de guildas de Terminus! Torvak e sua equipe enfrentam a equipe de Ghork!

[Batalha de D20. A reputação do campeão aparece em sua técnica e resistência; não perde automaticamente por abstinência ou dose errada.]

**Revés:** Torvak vence a tentativa. **Torvak:** “Ainda estou aqui.” **Ghork:** “Eu também. Vou me preparar para voltar.” **Rask:** “A revanche segue disponível.” A conversa de U/V não é repetida nem invalidada; perder uma tentativa não devolve Ghork à exigência de aprovação universal.

**Vitória:**

**Rask:** Resultado confirmado. Ghork e sua equipe vencem o campeonato!

**Se zero aliados:** substituir o anúncio por “Ghork vence o campeonato!”; não mostrar companheiros inexistentes recebendo o título.

[Tempo para a reação. Ghork procura o próprio nome no anúncio e ri antes de falar. O ataque ainda não começa.]

**Ghork — escolha:**

1. **“Pode repetir? Só mais uma vez.”** [expressao=feliz] — **Rask:** [expressao=feliz] Ghork! Campeão de Terminus!
2. **“Eu... eu consegui.”** [expressao=feliz] — **Mentor:** Virmura: [expressao=feliz] “Conseguiu.” / Borun: [expressao=feliz] “Conseguiu. Vá, pode se gabar um pouco. Não vou impedir.” / Sevrak: [expressao=feliz] “Você trabalhou por esta vitória. Tire um instante para aproveitar.”

**Torvak:** [expressao=neutro] Eu ouvi. Perdi.

**Ghork:** [expressao=neutro] Eu também ouvi. Você não precisa gostar.

[Se houver aliados, cada um aparece na comemoração; uma fala é escolhida pela ordem R1–R5: Brakka “O turno de hoje vai dar assunto.”; Nima “Todo mundo aqui? Então podemos comemorar.”; Sura “Primeiro, deixem eu ver esse braço. Depois eu comemoro junto.”; Edrin “Este resultado eu faço questão de registrar.”; Korr “A proteção aguentou. Eu também, por pouco.”; Velka “Quero lembrar o último movimento.”; Tessa “Tem muita gente que vai querer saber como foi.”; Mavren “Finalmente uma entrega que dá vontade de anunciar.”; Odrik “Eu tinha uma fala pronta. Esqueci. Ganhei junto!”; Lethra “Vou ouvir os alunos comentarem cada passo.”]

**Rheed:** Parte da torcida grita o nome de Ghork até a voz falhar. Outros ainda aplaudem o antigo campeão. Ghork fica mais um pouco na arena, ouvindo os dois lados.

**Conclusão:** título conquistado, sem prêmio em dinheiro inventado, mensagem de Orcquius ou cura. A celebração termina quando Q-36 começa; o ataque já estava preparado.

<a id="q-36"></a>
### Q-36 — As portas da festa

**Acesso:** celebração de Q-35. **Locais:** arena e área de serviço do coliseu. **Objetivo:** alcançar o alquimista e derrotar a operação local enquanto os demais sustentam a evacuação. **Base:** pacto, capturas, ruptura de Torvak e confronto único transformado. **Proposta:** ações e falas. **Referência:** núcleo já aprovado na base narrativa; PC1-químico para dependência e coerção. Não derivar poderes novos do Profeta das Sombras.

#### 1. A ordem que não era para o público

[Invasores, misturados às equipes de serviço e apoiados pelos acessos facilitados pela quarta guilda, fecham passagens. Seldan tenta deter o movimento.]

**Seldan:** [expressao=raiva] Autorizei aquelas entregas, não homens armados! Saiam das saídas. Deixem o público passar!

**Dorga:** [expressao=neutro] Mantenham a ordem. A arena fica sob nosso comando até acertarmos as condições com as outras guildas.

**Ghork:** [expressao=raiva] Vocês prepararam isso antes mesmo da nossa luta.

**Torvak:** [expressao=confuso] Combinamos a tomada da arena. Eu...

[Invasores arrastam espectadores e um companheiro da quarta guilda para junto dos carregamentos.]

**Torvak:** [expressao=raiva] Soltem essas pessoas! Vocês não falaram nada disso.

**Savel:** [expressao=neutro] A produção precisa de gente. E você precisa de outra dose. Cumpra sua parte do acordo.

**Torvak:** [expressao=raiva] Concordei em tomar a arena. Não em entregar meu pessoal para você.

**Savel:** [expressao=neutro] Vai voltar a pedir. Quando começar a sentir falta da dose.

**Torvak:** [expressao=raiva] Então vai esperar. Vou tirar essas pessoas daqui.

[Torvak intervém contra os invasores e abre uma retirada. Sua decisão não cura sua dependência. O capuz e a apresentação do fornecedor deixam de esconder sua origem; ele assume o comando dos remanescentes como Neral.]

**Neral:** [expressao=neutro] Continuem levando os capturados. Quem chegar ao corredor fica por minha conta.

#### 2. Um caminho até o responsável

**Virmura:** [expressao=neutro] Tragam os feridos por aqui! Deixem a passagem livre!

**Borun:** [expressao=neutro] A saída lateral está livre! Só saio daqui quando o último de vocês passar.

**Sevrak:** [expressao=neutro] Aprendizes, comigo! Retirem aquele obstáculo. Deixem espaço para quem está passando.

**Rask:** [expressao=neutro] Sigam as orientações nas saídas! Deixem os pertences. Não voltem para buscar nada!

**Ghork — escolha:**

1. **“Vou atrás do fornecedor. Mantenham esta passagem livre.”** [expressao=raiva] — **Borun:** [expressao=neutro] Corredor de serviço! Vá por lá. Estamos tirando o público por aqui.
2. **“Quem está cuidando de quem já saiu?”** [expressao=neutro] — **Virmura:** [expressao=neutro] Nyra e Jorvi estão com eles. Pirka cuida do transporte. Vá. Encontre quem está dando essas ordens.

[Ghork segue com todos os recrutados que tiver; com zero, segue sozinho. Mentores e Torvak continuam nas próprias tarefas. Não há requisito de herói para abrir a passagem, acertar ritual ou resistir à transformação.]

**Torvak, ao cruzar Ghork:** [expressao=neutro] Ele está junto das caixas. Eu tiro essas pessoas daqui.

**Ghork:** [expressao=raiva] Vou atrás dele. Isso não livra você de responder pelo acordo que fez.

**Torvak:** [expressao=neutro] Eu sei.

#### 3. O fornecedor

**Neral:** [expressao=neutro] Você viu quantas pessoas precisam de mim. Mate o fornecedor, e depois? Acha que a necessidade morre com ele?

**Ghork:** [expressao=raiva] Vi você usar isso para ameaçar essas pessoas. Depois, mandar arrastar outras à força.

**Neral:** [expressao=neutro] Quando eu era criança, via as doses irem para quem tinha força ou posição para exigi-las. Então aprendi a produzi-las. Com o tempo, fui eu quem passou a decidir quem recebia.

**Ghork — escolha:**

1. **“E agora faz com eles o que fizeram com você.”** [expressao=raiva] — **Neral:** [expressao=neutro] Agora eu decido. Não pretendo abrir mão disso.
2. **“Solte essas pessoas. Elas não são pagamento.”** [expressao=raiva] — **Neral:** [expressao=neutro] Sem elas, a produção para. É simples assim.

[Neral usa sangue como catalisador e ergue uma proteção ritual; Ghork enfrenta a defesa, sem puzzle de símbolos ou poder exclusivo de recrutado. Pressionado, Neral ingere os concentrados. A metamorfose deforma o corpo, amplia a força e torna os movimentos e a magia menos precisos.]

**Neral:** [expressao=raiva] Eu criei essas fórmulas. Conheço as doses!

**Ghork:** [expressao=neutro] Então sabe o que está engolindo.

**Neral:** [expressao=raiva] Sei o que elas me permitem fazer.

**Batalha única:** a transformação integra a apresentação e a escalada deste confronto. Uma vitória no D20 resolve a batalha inteira, sem segunda rolagem obrigatória para uma “fase dois”. As falhas produzem tentativas e reveses dentro do mesmo encontro; não repetem o consumo ou fazem o vilão voltar à forma anterior. O tiro de cena da transformação ocorre uma única vez, antes da resolução decisiva.

**Revés sem nova rolagem:** Ghork é repelido para um recuo do corredor. **Ghork:** “Ainda não consegui passar.” **Borun, da passagem de evacuação:** “Recue por aqui. A saída continua aberta.” A tentativa termina; a ação fica suspensa entre cenas para preparação e acesso ao Coreto. Não corre relógio que mate capturados enquanto o jogador usa o menu. Na retomada, **Neral:** “Voltou para pedir uma dose?” **Ghork:** “Voltei para acabar com isso.” Repetir a tentativa com a transformação preservada. O revés não permite abandonar a campanha ou pular a batalha.

**Vitória:** [Ghork supera a proteção e derrota Neral; as doses não matam o antagonista no lugar do jogador.]

**Neral:** [expressao=raiva] Acha que isso termina aqui? Existem outros grupos. Em Daratrine... até no Conselho. Teremos este continente antes que vocês descubram por onde entramos.

**Ghork:** [expressao=confuso] Quem? Quem está no Conselho?

[Neral morre sem identificar infiltrados. A previsão de conquista é sua convicção, não a voz do narrador. O selo permanece intacto.]

#### 4. Os registros nas caixas

[Com o comando derrotado, os demais completam a retirada e libertam os capturados. Ghork recolhe correspondência entre os registros do fornecedor e a entrega a Seldan para preservação, mantendo uma cópia para exame.]

**Seldan:** [expressao=neutro] Mostre onde encontraram estas cartas. Preciso registrar. Deixem separadas dos materiais que estão retirando.

**Ghork:** [expressao=confuso] Ele falou no Conselho de Daratrine. É disso que tratam estas cartas?

**Trecho de correspondência proposto para revisão de continuidade:** “O recebimento anterior foi confirmado pelo nosso contato dentro do Conselho de Daratrine. Mantenha as próximas instruções neste canal. Nenhum nome deve acompanhar a remessa.”

[O conjunto inclui resposta ao recebimento e registros correspondentes; sua coerência comprova a ligação, conforme o desfecho confirmado. A forma material de autenticação e o conteúdo final precisam de validação; não desenhar um brasão como prova suficiente nem inventar um conselheiro identificado.]

**Seldan:** [expressao=neutro] Os registros conferem. Havia um contato dentro do Conselho. Nada aqui diz quem era.

**Ghork:** [expressao=neutro] Então não temos um nome. Não vou acusar alguém só porque ele quis me assustar antes de morrer.

**Virmura:** [expressao=neutro] Estamos cuidando dos resgatados. Quem tomava as doses dele também precisa de atendimento. A morte dele não acaba com a abstinência.

**Conclusão:** operação local desmantelada, Neral morto, capturados libertados, vínculo documental com o Conselho preservado. Sem terceiro chefe, viagem ou investigação obrigatória adicional. Segue E07.

<a id="e07"></a>
### E07 — Notícias que cabem numa conversa

**Encaixe:** encerramento de Q-36. **Locais:** coliseu, sede escolhida e Coreto. **Participantes:** Ghork, Torvak, Virmura, Lala, recado de Dam, Rheed e criança.

#### Responsabilidade

**Torvak:** [expressao=neutro] Pressionei Rask para cancelar seus treinos. Concordei em tomar a arena. Achei que podia obrigar esta cidade a devolver nosso lugar.

**Ghork:** [expressao=raiva] Você ajudou a tirá-los de lá. Eu vi. Mas foi o seu acordo que permitiu que aquelas pessoas fossem capturadas.

**Torvak:** [expressao=triste] Eu sei. Tirar as pessoas de lá não desfaz o que fiz.

**Ghork — escolha:**

1. **“Não estou pronto para perdoar você.”** [expressao=triste] — **Torvak:** [expressao=neutro] Não vou pedir que decida isso agora.
2. **“Quero que você responda pelo que fez.”** [expressao=neutro] — **Torvak:** [expressao=neutro] Vou ter que responder.

**Virmura:** [expressao=neutro] Primeiro, ele precisa de tratamento. Isso não vai livrá-lo de responder pelo que fez.

[Dorga permanece vinculada ao golpe pelos fatos presenciados; esta versão não decide prisão, julgamento ou reparação específica. Não criar cena de absolvição por silêncio.]

#### Terceiro contato

**Lala:** [expressao=confuso] Ghork? Você está bem?

**Ghork:** [expressao=feliz] Estou vivo. E ganhei o campeonato.

**Lala:** [expressao=confuso] Você ganhou? Ghork! Espere... por que estar vivo foi a primeira coisa que você disse?

**Ghork:** [expressao=neutro] Atacaram a festa. Levaram pessoas à força. Conseguimos libertá-las e derrotamos quem comandava, mas... ainda tem feridos. O trabalho não terminou.

**Lala:** [expressao=neutro] Você ganhou e depois... tudo isso. Vá com calma, Ghork. Estou aqui.

**Ghork — escolha:**

1. **“Posso contar a final primeiro?”** [expressao=feliz] — **Lala:** [expressao=feliz] Claro. Mas depois quero saber o que aconteceu na festa. Está bem?
2. **“Primeiro, me conte como você está.”** [expressao=neutro] — **Lala:** [expressao=feliz] Continuo trabalhando nas peças. E, pelo visto, tentando acompanhar você. É muita notícia para uma conversa só.

**Ghork:** [expressao=feliz] Como vai o trabalho com as peças?

**Lala:** [expressao=feliz] Comecei a mostrar para as pessoas. Algumas gostam como estão; outras sugerem mudanças. Estou descobrindo quanto trabalho pode dar até um ajuste pequeno.

**Se contribuiu:**

**Lala, recado de Dam:** [expressao=neutro] Dam mandou um recado: "O dinheiro chegou. Compramos parte do material e estamos acertando o resto do reparo. Obrigado por avisar quanto podia mandar."

**Ghork:** [expressao=triste] Parte do material. Ainda está longe da casa que prometi.

**Lala:** [expressao=neutro] Era disso que ele precisava agora, Ghork.

**Se adiou:**

**Lala, recado de Dam:** [expressao=neutro] Dam mandou um recado: "Reorganizei o reparo sem contar com seu dinheiro. Ainda falta material. Queria sua ajuda, mas prefiro saber como estão as coisas a continuar esperando. Me conte como você está."

**Ghork:** [expressao=triste] Ganhar não pagou aquele reparo. Eu sei.

**Lala:** [expressao=neutro] Então conte como você está. Não precisa prometer uma casa inteira para responder isso.

**Convergência:**

**Ghork:** [expressao=neutro] Quero ficar aqui. Construir minha vida. Já tenho uma vitória para contar, pelo menos... mas, antes de prometer outra coisa, preciso saber como vou cumprir.

**Lala:** [expressao=feliz] Pode prometer que vai dar notícias. Eu aceito.

**Ghork:** [expressao=feliz] Essa eu vou cumprir.

**Ghork:** [expressao=neutro] Tem outra coisa. Encontramos papéis ligando esse grupo ao Conselho. Ainda não sabemos a quem. Eu precisava contar, mas... não deixe que comecem a acusar pessoas sem prova.

**Lala:** [expressao=neutro] Vou contar o que vocês descobriram. E deixar claro o que ainda não sabem.

#### Volta ao Coreto

**Rheed:** [expressao=feliz] E assim foi a vitória de Ghork em Terminus. O título era dele. A aprovação de todo mundo, veja bem, não. Mas o título era dele.

**Criança — escolha:**

1. **“Depois ele foi para Daratrine?”** [expressao=confuso] — **Rheed:** [expressao=neutro] Este conto termina em Terminus. Aqueles papéis vão ter que esperar outra conversa.
2. **“Ele ainda queria ser um grande mercenário?”** [expressao=confuso] — **Rheed:** [expressao=feliz] Ah, queria. Os sonhos não tinham acabado. Só aprendeu a pensar um pouco mais antes de prometer uma casa a alguém.

**Rheed:** [expressao=feliz] Pronto. Já posso guardar o frasco. A noite dele também foi movimentada.

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
