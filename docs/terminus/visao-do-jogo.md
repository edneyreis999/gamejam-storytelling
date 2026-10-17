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

Toda batalha obrigatória deve ter chance de vitória sem gastar Ludos, considerando a party disponível naquele momento. As cargas de nova rolagem reduzem o risco, mas não são requisito para avançar.

## Missões e recompensas

Há três tipos de missão:

- **Campanha principal:** missões liberadas conforme o jogador avança no torneio de guildas.
- **Missões secundárias:** concedem Ludos, moeda que permite alterar a história contada por Rheed por meio das compras descritas abaixo.
- **Missões de recrutamento:** cada missão tem duas soluções e permite recrutar o herói A ou o herói B. Escolher um implica abrir mão do outro. São dez heróis possíveis, dos quais cinco podem ser recrutados para compor a party de Ghork.

## Compras com Ludos

### Opções de diálogo

Algumas opções começam bloqueadas e são compradas no próprio diálogo, sem visitar o Coreto. Se não tiver saldo suficiente, o jogador escolhe uma alternativa gratuita e a cena avança. A oportunidade de usar aquela opção paga pode passar, mas a campanha continua possível.

### Cargas de nova rolagem

No Coreto, Rheed vende cargas de nova rolagem para batalhas. Após falhar em uma rolagem de D20, o jogador pode consumir uma carga para rolar novamente; o novo resultado substitui o anterior.

É permitido gastar sucessivas cargas na mesma tentativa, até vencer, parar de gastar ou esgotar o estoque. Se o jogador parar ou ficar sem cargas após uma falha, a derrota segue a regra de revés e revanche descrita em Batalhas.

## Pontos em aberto

- **Campeonato e selo:** o autor ainda vai definir como o torneio se conecta ao plano dos infiltrados para romper o selo.
- **Chefão obrigatório:** definir sua identidade e os detalhes do confronto após o campeonato.
- **Economia de Ludos:** definir preços das opções de diálogo e das cargas de nova rolagem, além das recompensas das missões.
- **Reveses:** definir as consequências narrativas das derrotas e como o jogador se prepara para as revanches.
