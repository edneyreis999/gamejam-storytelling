# Lala e oito figurantes — produção dos bustos

Status: em desenvolvimento. Aprovação artística: aguarda avaliação do autor.

Lote autorizado: 45 imagens, cinco expressões para cada um dos nove visuais. O neutro é a própria referência base; não há um sexto desenho. Os figurantes são propostas de arte, sem novas histórias pessoais ou vínculos narrativos.

[Galeria](galeria-lala-figurantes.md) · [Matriz](matriz-lala-figurantes.json) · [Verificação](verificacao-lala-figurantes.json)

## Fontes e invariantes

O plano aprovado fixa raça, idade aparente e vestimenta dos figurantes. A ficha de [Lala](../../../personagens/lala.md), o [concept do autor](referencias/lala-concept-autor.png) e as cenas completas em [content.js](../../../prototipo/content.js) orientam identidade e atuação. As referências de anatomia e acabamento de Ghork, Nodri, Korr, Moldren e Velka estão em [referencias/](referencias/). O guia consultado é [Coreto v2](C:/projetos/projectX/docs/GDD/5-arte/documento-de-artstyle-v2.md).

| Visual | Cenas consultadas | Direção de atuação |
| --- | --- | --- |
| Lala (`lala`) | Q-A1, Q-20, E07 | Enérgica, íntima e prática; alegria calorosa, tristeza contida, raiva direta e dúvida atenta. |
| Assaltante 1 (`assaltante-1`) | Q-B1, Q-B4 | Falante da dupla; postura invasiva, alegria presunçosa e raiva ameaçadora sem pose de combate. |
| Assaltante 2 (`assaltante-2`) | Q-B1, Q-B4 | Cúmplice atento; satisfação discreta, abatimento contrariado, tensão defensiva e dúvida desconfiada. |
| Veterano (`veterano`) | Q-C1, Q-C4 | Treinador intimidador; alegria convencida, tristeza contrariada, raiva firme e dúvida incrédula. |
| Iniciante (`iniciante`) | Q-C1, Q-C4 | Aprendiz atento; alegria aliviada, tristeza retraída, raiva ainda hesitante e confusão sincera. |
| Ferido (`ferido`) | R2 | Cansado e cauteloso; alegria discreta, tristeza apreensiva, indignação contida e dúvida preocupada. |
| Testemunha (`testemunha`) | R2 | Atenta e precisa; alegria moderada, tristeza empática, raiva controlada e confusão investigativa. |
| Trabalhador 1 (`trabalhador-1`) | R4 | Defende reter a obra até receber; firmeza, alegria aliviada, abatimento, indignação e dúvida ponderada. |
| Trabalhador 2 (`trabalhador-2`) | R4 | Preocupado com contas e paralisação; alegria aliviada, tristeza cansada, raiva ansiosa e dúvida cautelosa. |

A Lala usa exclusivamente o traje central do concept: capa assimétrica, sem capuz, broche circular, cabelos longos claros e orelhas pontudas. Nos demais visuais, o neutro conferido fixa o rosto e o figurino. As invariantes detalhadas e os prompts de origem estão na matriz e nos registros individuais.

## Processo e exportação

Cada busto é uma chamada individual da ferramenta integrada `image_gen`. Cada emoção parte diretamente do neutro conferido; todas as chamadas da Lala também incluem o concept do autor. Os registros em `registros/<id>-<expressao>.json` contêm o prompt exato, fontes, original gerado, correções e hashes. As tentativas substituídas ficam fora da entrega.

O acabamento usa sépia, contorno preto, hachuras e pontilhado. A atuação muda olhos, boca e a inclinação de cabeça e ombros, mantendo as mãos e os acessórios estáveis. Não foram acrescentados objetos ou efeitos para explicar as emoções.

A exportação mantém as proporções, com Lanczos em alfa pré-multiplicado, dentro de 480 × 640 px em tela transparente de 504 × 672 px. Formato PNG RGBA, sRGB incorporado, sem entrelaçamento.

## Revisão concluída

As 45 combinações foram conferidas, sem faltas, versões extras ou duplicatas binárias. A comparação dos cinco arquivos de cada conjunto verificou identidade, figurino, acessórios, anatomia, mãos, presas, olhos e leitura das emoções no tamanho final. As prévias sobre fundo cinza permitiram conferir as bordas e a ausência de halos aparentes. A verificação técnica confirmou dimensões, perfil, alfa real e margens superiores e laterais.

Antes das emoções, foram corrigidos quatro neutros: tecido contínuo nos ombros do assaltante orc, cabelo rente do assaltante goblin, remoção de manchas indevidas nas mangas do iniciante e corte quadrado da barba do veterano. Os registros individuais mantêm os prompts e originais dessas tentativas. As quatro emoções posteriores de cada personagem partiram do neutro corrigido.

A aprovação artística continua com o autor; a revisão interna não muda o status de desenvolvimento.

## Escopo e atualização do repositório

As imagens ficam em `assets/terminus/bustos/expressoes/<id>/`, com os nomes `neutro.png`, `feliz.png`, `triste.png`, `raiva.png` e `confuso.png`. Este lote não associa arquivos às cenas e não modifica diálogos ou regras. Dam, Pirka/Jorvi, representantes e responsável pela cisterna não acrescentam desenhos.

Durante a produção, o autor solicitou stash, pull e reaplicação do stash. A main foi atualizada para `2b68d89`, e os 58 arquivos locais foram restaurados sem divergências. O pull trouxe as 42 bases e as 210 expressões anteriores, ausentes na inspeção inicial. A verificação deste lote usa os hashes registrados depois do pull para conferir sua preservação.

