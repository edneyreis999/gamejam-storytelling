---
name: game-write-devlog
description: Devlogs for itch.io. Use when writing or revising development posts from project work, or archiving published devlogs. Do not use for changelogs, internal design records, or general marketing copy.
---

# Escrever devlogs

## 1. Conferir o trabalho e o histórico

Leia as instruções do projeto, os commits indicados e seus diffs. Consulte a visão do jogo e os documentos relacionados ao assunto; em Terminus, comece por `docs/terminus/visao-do-jogo.md`. Ao tratar de personagens ou locais, siga os percursos dos respectivos índices. Resolva diferenças entre a documentação atual e o commit antes de atribuir uma decisão àquela entrega.

Separe propostas, decisões confirmadas, implementação e validação. Uma ficha escrita comprova trabalho de escrita; uma imagem de referência não comprova arte produzida. Use fontes externas conforme a precedência definida pelo projeto.

Confira os devlogs locais e o histórico publicado disponível. Reutilize o número de um post ao revisá-lo ou arquivá-lo. Para um novo post, continue a sequência conhecida com o título `DevLog #X — Título`. Pergunte quando houver conflito de numeração que as fontes não resolvam.

Conclua quando cada post tiver fonte, assunto, número e estado de publicação identificados.

## 2. Escolher o que contar

Escreva para leitores do itch.io, incluindo participantes da jam que nunca viram o repositório. Use inglês por padrão, primeira pessoa do plural para a equipe e aproximadamente 250–350 palavras, salvo orientação diferente do usuário.

Escolha um avanço concreto e explique por que ele interessa à experiência de jogar ou ao processo de criação. Use o enfoque emocional informado pelo autor. Quando ele não estiver disponível, relate as decisões e o trabalho observável; não invente sentimentos, conversas da equipe, sessões de trabalho, reações de jogadores ou resultados de testes.

Selecione um ou dois detalhes que sustentem o assunto. Preserve o estado de proposta dos exemplos e evite revelar reviravoltas da história sem solicitação. Mantenha números de commits e caminhos de arquivos nos metadados, fora do texto para os leitores.

Conclua quando houver um assunto central, exemplos verificáveis e limites claros sobre o que já foi feito.

## Estilo de escrita

- Escreva como alguém contando a outro participante da jam o que acabou de trabalhar. Use contrações naturais em inglês e vocabulário cotidiano.
- Prefira detalhes observáveis a elogios ao próprio projeto. Explique uma decisão pelo que ela muda, sem transformar o texto em uma lista de funcionalidades.
- Varie o comprimento das frases e dos parágrafos conforme o pensamento. Preserve a gramática; informalidade não exige erros fabricados, gírias forçadas ou entusiasmo constante.
- Escolha a abertura e o encerramento a partir do assunto de cada post. Compare com os posts anteriores para evitar repetir o mesmo percurso emocional ou bordão.
- Use prosa contínua, sem emojis ou destaques decorativos. Reserve listas para conteúdo que realmente precise de comparação ou sequência.
- Corte slogans, perguntas retóricas, contrastes formulaicos e encerramentos motivacionais genéricos. Termine em uma observação ou trabalho seguinte sustentado pelas fontes.
- Trate medo do prazo, humor e entusiasmo como escolhas do autor, não como ingredientes obrigatórios de todo devlog.

## 3. Revisar e guardar

Para textos novos ou reescritos, faça uma revisão independente:

1. Como agente autor, prepare o rascunho e delegue a revisão de voz a outro agente. Envie o texto, o público do itch.io, as preferências de estilo desta skill e do usuário e os fatos que precisam ser preservados.
2. Instrua o agente revisor a ler integralmente [a skill humanizer](../humanizer/SKILL.md) e aplicá-la ao texto. Reserve a aplicação de humanizer exclusivamente ao revisor. Peça que devolva o texto revisado e um resumo curto das mudanças, sem publicar nem delegar novamente.
3. Ao receber a revisão, confira cada afirmação factual contra as fontes. Confira também idioma, número, título, possíveis spoilers e metadados antes de salvar. Se reescrever substancialmente o texto após a revisão, encaminhe a nova versão ao revisor e repita a conferência antes de concluir.

Se não houver outro agente disponível, informe que a revisão independente está pendente. Não a substitua por autorrevisão nem declare o fluxo concluído.

Organize cada devlog em uma pasta `NNN-assunto/`, com o corpo e o frontmatter em `text.md` e suas imagens em `assets/`. Em Terminus, use `docs/terminus/devlogs/002-quests/text.md` como exemplo: número preenchido com zeros à esquerda até três dígitos e assunto descritivo estável. Preserve o nome da pasta ao revisar ou arquivar o mesmo post; ao migrar um arquivo existente, use seu nome sem `.md`.

Referencie as imagens a partir de `text.md` como `assets/nome-do-arquivo`. Versione `assets/.gitkeep` enquanto a pasta estiver vazia e retire-o ao adicionar imagens. Atualize os links do índice e as referências locais quando mover um post.

Use frontmatter para `status: em desenvolvimento`, `publicacao: rascunho` ou `publicado`, `commit` e `idioma`. Inclua `url` quando publicado e `titulo_publicado` quando o título local diferir do original. Esse bloco é controle editorial e fica fora do conteúdo enviado ao itch.io.

Ao arquivar, preserve integralmente as cópias históricas de posts publicados e sua origem; identifique uma reescrita editorial separadamente do arquivo histórico. Uma cópia local marcada como rascunho não altera o post remoto. Publique ou edite no itch.io somente se isso fizer parte do pedido; a autorização já dada na conversa continua válida. Após publicar, confira o conteúdo e o estado público antes de registrar o link e mudar o estado local.

Conclua quando todos os posts seguirem essa estrutura, os links locais de texto e imagens resolverem, os metadados corresponderem ao estado real da publicação e cada texto novo ou reescrito tiver recebido a revisão independente e a conferência do autor, incluindo nova revisão após qualquer reescrita substancial.
