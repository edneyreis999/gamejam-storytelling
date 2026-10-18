# Roteiro para a próxima entrevista

Status: em desenvolvimento.

Prompt de trabalho para continuar o desenvolvimento narrativo de Terminus em uma nova janela. Os caminhos abaixo partem da raiz do repositório.

```text
Quero continuar o desenvolvimento narrativo de Terminus. Use a skill
grill-me para me entrevistar: uma pergunta por vez, com sua recomendação
e os principais custos ou consequências das alternativas.

Não concorde automaticamente comigo. Questione contradições, escolhas
óbvias demais, consequências artificiais e aumento desnecessário de escopo.
Quando minha resposta for ambígua, esclareça antes de construir sobre ela.

LEITURA INICIAL

Leia nesta ordem:

1. AGENTS.md
2. .agents/skills/grill-me/SKILL.md
3. docs/terminus/visao-do-jogo.md
4. docs/terminus/campanha-decisoes-acumuladas.html
5. docs/docs_externas/universo-coreto/personagens/README.md
6. docs/docs_externas/universo-coreto/personagens/nucleo/ghork.md
7. docs/docs_externas/universo-coreto/personagens/moldura-adultos/theodor-rheed.md
8. docs/docs_externas/universo-coreto/terminus.md

A visão contém decisões confirmadas, ainda em desenvolvimento.
A apresentação mistura decisões confirmadas e propostas marcadas para debate.
As decisões das duas rodadas da entrevista já foram registradas na visão.
O HTML não foi atualizado com esses blocos; use a visão para as decisões
narrativas mais recentes.
Tudo em docs/docs_externas/ é referência, não documentação aprovada do jogo.
Nas fichas, preserve a distinção entre Livro, Notion, Inferência e Criação.

Consulte o livro nos trechos necessários para esclarecer continuidade:
docs/docs_externas/universo-coreto/AF_Miolo_Ghork_214Pgs_14x21cm_V3.pdf

Não leia todas as fichas de personagens de uma vez. Explore referências
adicionais conforme a pergunta exigir.

Antes de propor novos detalhes sobre os Ignotos, consulte as fontes já
usadas no checkout C:/projetos/projectX, sob docs/GDD/:
- 2-world-building/racas/raca-ignotos.md
- 2-world-building/o-continente-de-ekios.md (história e ecologia dos Ignotos)
- 3-historia/historia-de-daratrine.md
- 2-world-building/magia.md (Profundina e influência onírica, se necessário)

São referências do passado compartilhado, não aprovação automática de
conteúdo para Terminus. Não altere esse projeto. Não atribua a todos os
Ignotos os poderes do Profeta das Sombras nem importe uma conspiração
organizada de Punch Club para preencher lacunas de nossa história.

COMO USAR PUNCH CLUB

Quero usar o que acontece em Punch Club como “muleta” para criar minha
história. Gosto mais do primeiro jogo: ele é a referência principal.
Punch Club 2 serve como apoio complementar.

Não limite essa inspiração ao formato dos diagramas. Use também
acontecimentos, encontros, conflitos, relações, reviravoltas e progressão
da história como pontos de partida para propor situações em Terminus.

Antes de começar a entrevista, leia o panorama narrativo nestes arquivos:

Referência principal — Punch Club 1:
- docs/docs_externas/punch-club/punch-club-quests.html
- docs/docs_externas/punch-club/historia-da-cidade.md

Referência complementar — Punch Club 2:
- docs/docs_externas/punch-club/punch-club-2-quests.html
- docs/docs_externas/punch-club/punch-club-2-historia-da-cidade.md

Consulte sistemas apenas quando forem relevantes para explicar um evento:
- docs/docs_externas/punch-club/sistemas-e-features.md
- docs/docs_externas/punch-club/punch-club-2-sistemas.md

Em cada decisão importante para a qual exista uma referência útil:
1. Explique brevemente o acontecimento de Punch Club, indicando qual jogo
   e o arquivo ou seção que o sustenta.
2. Explique sua função narrativa: apresentar alguém, criar dependência,
   testar uma relação, mudar o objetivo, preparar um confronto etc.
3. Proponha uma adaptação para Ghork e Terminus.
4. Aponte o que precisa mudar para respeitar nosso mundo e nossa campanha.
5. Faça uma pergunta para escolher ou ajustar essa adaptação.

Prefira começar por exemplos do primeiro jogo. Use o segundo quando
oferecer um contraste ou uma solução especialmente útil.
Não invente fatos sobre os jogos para preencher lacunas das referências.
Não force uma correspondência para cada personagem ou missão: explique
quando a adaptação não funcionar e ofereça outra possibilidade.

A inspiração deve considerar o passado de Ghork, sua personalidade,
as guildas, as amizades e inimizades e o narrador Rheed.
Trocar nomes e cenários pode ser um primeiro exercício, mas quero que você
me ajude a encontrar motivos e consequências que funcionem em Terminus.

O QUE JÁ ESTÁ DECIDIDO

- Ghork quer vencer para provar seu valor a quem o rejeitou. Quem ele quer
  convencer e qual rejeição pesa mais foram adiados pelo autor. Retome essas
  questões posteriormente, depois de explorar outros tópicos.
- O chefão fixo do torneio é um personagem novo de Terminus, de uma quarta
  guilda veterana sem rota de adesão. É um ídolo por talento e espetáculo,
  quer continuar no topo, usa vantagens na preparação e defende abertamente
  seus privilégios como merecidos. Nome e aparência ainda não foram definidos.
- As três guildas do arco 1 disputam um contrato exclusivo, com pagamento
  excepcional, para investigar galerias pouco conhecidas de minas, mapear
  recursos e avaliar perigos. A seleção da guilda antecede a investigação;
  não é uma corrida para entregar primeiro um levantamento.
- O contratante é um financiador mercantil, interessado em informações
  confiáveis para decidir sobre um investimento. Ele seleciona por capacidade
  demonstrada e apresenta o mesmo problema às três guildas: dois mapas
  aparentemente incompatíveis, analisáveis com informações fora das minas.
  A dificuldade decorre de conhecimento fragmentado. A causa concreta da
  divergência dos mapas foi adiada; não estão aprovadas fraude ou galerias
  que mudam fisicamente.
- Escolhemos “Decisões que se acumulam”, com três arcos e convergências.
  Não estamos escolhendo novamente a arquitetura da campanha.
- O jogo é sobre fazer amigos e inimigos. Recrutar é esperado e vantajoso,
  mas a main quest não exige aliados.
- Arco 1: três guildas e compromisso irreversível com uma delas.
  As outras duas tornam-se hostis. Os requisitos estão na visão.
- Arco 2: duas apresentações, escolha X/Y, duas missões exclusivas
  e uma missão compartilhada de classificação. X/Y trata de pessoas
  e alianças. São cinco missões jogadas e sete escritas.
- X/Y são equipes externas, cujos representantes são antigos parceiros.
  Podem trabalhar com qualquer guilda escolhida, que mantém a titularidade
  do contrato das minas. A execução desse contrato ocorre no arco 2.
- Os representantes divergem sobre o risco aceitável à integridade física
  dos companheiros. A abordagem cautelosa custa mais dinheiro do pagamento,
  deixando menos para a preparação para o campeonato. Ainda não atribuímos
  cada abordagem a X ou Y, nem definimos os gastos concretos.
- A equipe preterida recebe apoio de uma das guildas rejeitadas e reaparece
  nas quartas com mágoa e cobrança. A causa dessa mágoa foi adiada.
  Guildas podem inscrever mais de uma equipe no campeonato.
- As equipes X/Y não concedem automaticamente aliados a Ghork. Sua relação
  com o elenco ainda precisa ser detalhada, preservando os recrutamentos
  opcionais e a campanha completa com zero recrutados.
- Arco 3: uma partida contra cada guilda rejeitada, quartas contra
  o grupo preterido em X/Y, semifinal contra heróis não recrutados
  e final contra um chefão fixo. Uma bifurcação curta U/V converge
  antes da final; sua função narrativa concreta continua em discussão.
- Na semifinal, há um adversário de cada par de recrutamento:
  o integrante não recrutado ou um sorteado, caso nenhum tenha sido.
- A vitória no torneio revela a ameaça dos Ignotos e leva a outro confronto
  obrigatório. O chefão do torneio e o chefão posterior são distintos.
- Os Ignotos são grupos dispersos, sem comando central. São sobreviventes
  fisicamente escondidos na superfície, não uma organização infiltrada
  socialmente ou manipulando os acontecimentos desde o início.
- Nos preparativos da festividade, trabalhadores abrem uma passagem e
  expõem acidentalmente um refúgio. Os remanescentes atacam durante a
  celebração após a vitória de Ghork. Local e trabalho ainda estão abertos.
- O selo estava intacto no início; abrir esse refúgio não equivale a rompê-lo.
  Alcançar e libertar os Ignotos selados é um impulso dos remanescentes,
  sem compreensão completa. Não há um plano coordenado aprovado.
  Como revelar esse impulso ao jogador e o desfecho do selo estão abertos.
- Existem cinco recrutamentos opcionais, distribuídos em 2 + 2 + 1.
  Resolver o conflito, receber a recompensa única e recrutar podem
  acontecer em momentos diferentes. Consulte os detalhes na visão.
- A distribuição-base desejada é dois abertos, dois pretos e um vermelho.
  A matriz concreta do HTML ainda é uma proposta.
- Ludos representam a criança pedindo uma mudança e Rheed inventando
  uma explicação, às vezes absurda. Existem intervenções nos três arcos.
  Elas não apagam automaticamente o histórico nem concedem ambos
  os heróis de um par. Valores continuam em aberto.
- A Jornada do Herói é uma referência flexível, não doze capítulos obrigatórios.

OBJETIVO DA ENTREVISTA

Retomar pela última pergunta sem resposta: a natureza do chefão obrigatório
pós-campeonato. Foram oferecidas as alternativas Ignoto Bruto e Ignoto
Sombrio, com recomendação do Bruto, mas nenhuma foi escolhida. A recomendação
não é uma decisão. Fundamente as alternativas nas fontes sobre os Ignotos.

Depois, avance conforme o interesse do autor, sem escrever a campanha
inteira nem reabrir decisões confirmadas. Permanecem questões como:

1. Como apresentar o impulso dos remanescentes e encerrar esse confronto?
2. Quais estratégias as três guildas apresentam para conquistar o contrato
   e como a intervenção de Ghork provoca a hostilidade das duas preteridas?
3. Como distribuir a execução do contrato e as alianças X/Y nas sete missões
   escritas do arco 2, sem ampliar a estrutura aprovada?
4. Qual é a função de U/V e como preparar o campeão ao longo da campanha?
5. Quais são os pares e conflitos de recrutamento e como funciona um
   percurso completo da campanha?

Respeite os pontos explicitamente adiados: quem Ghork quer convencer e
qual rejeição pesa mais; a causa da divergência entre os mapas; a causa
da mágoa da equipe preterida em X/Y. Retome-os posteriormente, sem tratá-los
como impedimentos para explorar outros tópicos. Não presuma perda de
trabalho, pagamento ou reputação como causa da mágoa. Não apresente todas
as perguntas de uma vez.

A cena em que o campeão prolonga o treino e ocupa o horário reservado
a outro grupo continua sendo proposta não aprovada. O uso de privilégios
na preparação e sua defesa dessa prioridade estão confirmados; a cena não.
Não presuma uma ligação do chefão do torneio ou das minas com os Ignotos.
O ataque na celebração está confirmado; uma ruptura do selo ou um plano
coordenado para isso não estão. O tipo, a identidade e os poderes do chefão
pós-campeonato ainda precisam de decisão.
Não invente cura, viagens ou reconciliações de Ghork como fatos estabelecidos.

CONDUÇÃO E REGISTRO

- Comece com uma síntese curta do que entendeu e da primeira decisão aberta.
- Use o passado documentado de Ghork para oferecer hipóteses fundamentadas.
  Não transforme interpretações editoriais em cânone automaticamente.
- Faça uma pergunta por vez, com alternativas concretas e sua recomendação.
  Permita que eu proponha outra resposta.
- Não me pergunte algo que possa descobrir nos documentos.
- Procure conflitos entre interesses defensáveis, sem exigir que todo dilema
  tenha lados moralmente equivalentes.
- Faça escolhas importantes voltarem como reencontros e consequências.
  Nem toda pessoa preterida precisa odiar Ghork.
- Ao concluir cada bloco, resuma decisões confirmadas, propostas e dúvidas.
- Antes de registrar narrativa nova, apresente a síntese para validação.
  A documentação do jogo fica em docs/terminus/, em desenvolvimento.
- Não crie HTML, fichas completas, cenas extensas ou commits sem solicitação.

Comece com uma síntese curta do ataque na celebração e retome a pergunta
sobre a natureza do chefão pós-campeonato. Explique as alternativas usando
a documentação dos Ignotos antes de fazer uma única pergunta. Não force
uma ligação com Punch Club quando ela contrariar essa documentação.
```
