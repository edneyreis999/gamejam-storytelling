# Protótipo de Terminus

Status: em desenvolvimento.

Campanha completa em HTML, com leitura por passagens e direção de arte para preparar a migração ao RPG Maker. Inclui três etapas, seis rotas de guilda/aliança, escolhas, recrutamento, economia e batalhas. Este diretório contém a versão vigente do protótipo.

## Abrir e revisar

Abra [index.html](index.html) no navegador ou, na raiz do repositório, execute:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8765/docs/terminus/prototipo/`.

- **Jogar:** campanha com progresso salvo. Enter, Espaço ou o botão avançam a leitura; escolhas aparecem após a última passagem do trecho.
- **Cenas e variantes:** revisão isolada por cena, trecho, resposta, guilda, aliança e contexto. Não altera a partida. A semifinal permite conferir formações; o Coreto possui momentos diferentes da campanha.
- **Direção de arte:** anotações acima do palco com tipo de passagem, tempo narrativo e imagens usadas. Cada imagem abre sua ficha.
- **Inventário de arte:** filtros, contagens, fichas, usos por cena, CSV de imagens e CSV de usos. Cada uso abre a respectiva prévia. A ficha possui impressão própria.

As prévias e o inventário contêm spoilers. Seus contextos são combinações editoriais para cobrir as alternativas escritas, não partidas reais nem uma promessa de que qualquer combinação seja alcançável.

## O que desenhar

O [levantamento gerado](INVENTARIO.md) registra a proposta atual: **18 fundos, 90 imagens de bustos e 15 objetos — 123 imagens finais**. Os bustos se organizam em 32 bases de pose; as bases agrupam variantes e não são 32 desenhos adicionais. Savel e Neral aparecem com identidades visuais distintas, embora sejam a mesma pessoa.

Há dois componentes de interface em CSS: **um painel descritivo reutilizável** e uma caixa de diálogo. Eles não exigem duas novas ilustrações. Uma proposta de fundo sem uso fica fora da conta. Locais e fundos não têm correspondência um para um: estalagem, minas e coliseu precisam de enquadramentos distintos. O catálogo informa a justificativa e as cenas de cada fundo.

Esses números dimensionam a encenação proposta; não constituem encomenda aprovada. Silhuetas, cartões e fundos identificados são representações provisórias. A imagem existente do Coreto é uma referência em sépia; sua versão final no presente será colorida. A [procedência da imagem](assets/README.md) preserva a técnica e o prompt usados.

Cada ficha reúne aparência de origem, composição proposta, rosto, postura, orientação, transparência, tamanho, nome de arquivo e usos. O movimento de entrega reutiliza o mesmo objeto. Um item apenas mencionado no diálogo não vira automaticamente um pedido de desenho.

A criança permanece com nome e texto, sem busto nesta versão: sua identidade visual está pendente de confirmação do autor e não entrou na contagem. A revisão preserva a interpretação direta de Virmura experimentada no protótipo; a divergência com a possibilidade de voz cerimonial continua registrada, sem decidir novo cânone.

## Contrato de apresentação

O palco tem referência de **1280 × 720**. Diálogo e pensamento identificam quem fala/pensa e usam um busto por vez. O painel descritivo aparece no centro, esconde a caixa inferior e conserva o fundo e o busto anterior atenuados. Não mostra nome nem busto próprio do narrador.

Rheed aparece no presente da Noite da História. Narrar o passado não o transporta para as cenas de Ghork. Retornos ao presente são passagens explícitas. Objetos possuem aparição, destinatário e operação de apresentação; a animação não executa recompensas. Com movimento reduzido, a entrega continua compreensível pelo texto e pelo destinatário.

## Arquivos e substituição da arte

| Arquivo | Responsabilidade |
| --- | --- |
| `content.js`, `supplementary.js` | Diálogo, pensamento, descrição, escolhas e variantes; intervalos e reveses |
| `engine.js` | Regras, progresso, posição de leitura e replay do save |
| `staging.js` | Composição das passagens e ações com objetos |
| `art.js` | Registro de imagens, expressões, briefs e arquivos |
| `art-authority.js` | Recorte gerado das fichas que fundamentam aparência e cenário |
| `catalog.js` | Contextos editoriais, usos, variantes e CSV |
| `stage-view.js`, `app.js` | Palco e interface de jogo/revisão |
| `tokens.css`, `style.css` | Cores, escala visual, componentes e movimento reduzido |

Para inserir uma imagem final, mantenha seu ID, coloque o arquivo no caminho indicado pela ficha e defina `preview` no respectivo registro em `art.js`. Para bustos, ajuste o registro construído por `portrait` ou forneça um mapa explícito por ID. Atualize também `status`. O campo `file` documenta o arquivo previsto; só `preview` habilita a imagem no palco. Fundo, busto e objeto possuem representação substituta identificada; erros de carregamento aparecem na interface.

Após editar aparência nas fichas, regenere o recorte com o helper **mutante**:

```sh
python3 docs/terminus/prototipo/scripts/refresh-art-authority.py
```

O helper de inventário é **somente leitura** e imprime Markdown; redirecionar sua saída atualiza o retrato documental:

```sh
node docs/terminus/prototipo/scripts/report-art.cjs > docs/terminus/prototipo/INVENTARIO.md
```

O catálogo HTML continua sendo a fonte operacional de contagens e usos, recalculada do roteiro. Consulte a [visão](../visao-do-jogo.md) e as [fichas](../personagens/README.md) antes de mudar narrativa. A adaptação não promove propostas de encenação a fatos aprovados.

## Preparação para RPG Maker

IDs de cena/passagem, tipo, falante, tempo, fundo, busto, objeto e escolha tornam a encenação revisável antes do port. A transferência deverá mapear essas passagens para eventos: mostrar/trocar imagens, mostrar texto, apresentar escolhas e mover/apagar objetos. O painel descritivo exige a mesma composição própria na implementação de destino.

Esta entrega não altera o projeto RPG Maker nem exporta eventos automaticamente. Os briefs e CSVs servem como contrato de produção e rastreamento. A interface de revisão fica fora do palco e não precisa fazer parte do jogo final.

## Saves e compatibilidade

O formato permanece na versão 2 e a chave de armazenamento é `terminus-campaign-v2`. A consolidação do diretório preserva esses identificadores e as ações do save. Partidas do protótipo antigo com formato 1 não são migradas.

Exportação/importação utiliza JSON validado por replay das ações; a posição de leitura e as consequências são reconstruídas sem repetir recompensas. No servidor HTTP, manter navegador, host e porta preserva o armazenamento mesmo com a mudança de pasta. Ao abrir diretamente por `file:`, o armazenamento depende das regras do navegador; use exportação/importação para transportar partidas entre origens.

## Testar e manter

Execute na raiz do repositório, com Node.js 18 ou posterior e Python 3 para os geradores. O jogo não requer instalação de pacotes nem build.

```sh
node --test --test-reporter=spec docs/terminus/prototipo/tests/*.test.cjs
node docs/terminus/prototipo/tests/report.cjs
node .agents/skills/ui-craft/scripts/detect-token-drift.mjs docs/terminus/prototipo --token-paths tokens.css
```

A suíte cobre seis rotas com equipes vazias, completas e parciais; respostas alternativas, recrutamento, custos, novas rolagens, derrota e revanche. Também verifica saves inválidos, retomada de passagens, consequências únicas, referências de arte, variantes da semifinal, herança de composição e retornos ao Coreto. O relatório de palavras estima tempo de leitura; não substitui playtest cronometrado.

Depois de alterar a apresentação, confira no navegador: abertura e fala identificada; painel descritivo preservando a composição; entrega com e sem movimento; recarga e continuação do save; cena → ficha de arte → uso; telas de 320, 768 e 1280 px. Registre o resultado no commit. Download, importação por seletor e impressão devem ser conferidos manualmente; o teste do conteúdo JSON/CSV não comprova esses fluxos do navegador.

Não há exportador automático para RPG Maker, arte final completa ou auditoria formal de acessibilidade. A identidade visual da criança e a voz cerimonial/direta de Virmura continuam pendentes de confirmação. Consulte as [decisões editoriais e fontes](REVISAO-EDITORIAL.md) antes de alterar suas cenas.

Para evoluir o protótipo, use a [skill game-prototype-vn-html](../../../.agents/skills/game-prototype-vn-html/SKILL.md). As fichas são a fonte de aparência; `art-authority.js` é gerado e deve ser atualizado pelo script. `INVENTARIO.md` é um retrato regenerável; os usos atuais são calculados no catálogo HTML.
