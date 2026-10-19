# Protótipo de Terminus — V3

Status: em desenvolvimento.

A guilda C chama-se **Chapéu Minúsculo** / **Tiny Hat**. Seus [60 bustos com chapéu](../arte/bustos/tiny-hat/galeria.md) são variantes dos originais: Sevrak sempre, Ghork após a adesão e recrutáveis somente depois do convite na rota C. As prévias editoriais respeitam o momento da adesão e os conflitos ainda sem convite. O traje e a expressão são selecionados separadamente; os saves mantêm o formato V3.

Para jogar sem ferramentas de produção, abra a [edição para jogadores](../jogo/index.html). Ela compartilha esta campanha, usa saves separados com importação V3 e tem [instruções próprias de uso e manutenção](../jogo/README.md).

Abra [index.html](index.html) em um navegador atual. O jogo roda localmente, sem build, servidor ou instalação. Também pode ser servido a partir da raiz do repositório; mantenha a pasta `assets/terminus/` disponível, pois o protótipo referencia esses arquivos diretamente.

A V3 integra o [roteiro de quests](../storytelling/quests-da-campanha.md): quinze quests de guilda, sete do arco 2, cinco conflitos de recrutamento, campeonato, invasão, encerramento e cenas compartilhadas E00–E08. Preserva as três secundárias e permite terminar sozinho, sem gastar Ludos.

## Idiomas e revisão para a jam

O jogo abre em **English**. O seletor **Português / English** está na abertura e no menu; a escolha fica em `terminus-language`, separada do save. Trocar idioma redesenha a apresentação sem avançar a leitura, repetir entregas ou alterar resultados. Os saves V3 continuam usando os mesmos comandos.

A segunda rodada cobre **1.156 unidades narrativas e de objetivos/escolhas**, com revisão em EN-US seguida de localização para PT-BR nos [lotes A](editorial/lote-a.json), [B](editorial/lote-b.json) e [C](editorial/lote-c.json). Cada entrada conserva o ID, as versões anteriores (`previousPt` e `previousEn`), a rodada de revisão e a direção de expressão. Os arquivos `round2-*.json` registram as propostas integradas. O [registro editorial](REVISAO-EDITORIAL.md) distingue os resultados desta rodada da revisão inicial aprovada no [piloto](editorial/piloto.md).

Os inventários `editorial/inventory-*.json` preservam original, ID, cenas, participantes, ocorrências e linhas de origem da captura inicial. Essas linhas são referências históricas; para localizar o texto atual, use o ID no lote e busque sua versão `pt` na fonte indicada. Os registros de variantes remetem aos [contextos observados nas prévias](editorial/variant-contexts.json), atualizados após a integração; as condições completas continuam nas fontes. As variantes também podem ser lidas em **Cenas e variantes**. O [relatório da primeira integração](editorial/integracao.json) permanece como histórico daquela migração.

O português jogável permanece em `quests-da-campanha.md`, `campaign.js`, `content.js` e `supplementary.js`. O inglês é gerado em `locales/en-US.js` a partir dos lotes, do [glossário](editorial/glossario.json) e do [catálogo de interface](editorial/interface-en.json). Este último inclui itens, ações geradas, diário, batalha, mapa, avisos e acessibilidade. As ferramentas internas de produção podem conservar português.

Para corrigir um texto depois desta integração:

1. Localize seu ID no inventário e ajuste a fonte PT e a entrada correspondente do lote, mantendo o ID. Para mensagens de interface, ajuste `interface-en.json`; parâmetros como `{p0}` precisam existir nos dois idiomas.
2. Preserve as linhas estruturais do Markdown: os recortes de montagem ainda dependem de seus intervalos. Regenere `quest-script.js` quando alterar o roteiro principal.
3. Gere o catálogo e execute a cobertura abaixo. O teste aponta variantes, textos ou parâmetros ausentes; não aceite uma entrada sem inglês como conclusão da revisão.

Toda fala tem uma expressão explícita: `neutro`, `feliz`, `triste`, `raiva` ou `confuso`. No roteiro, escreva `**Ghork:** [expressao=triste] Fala.`; para uma escolha, `1. **“Resposta.”** [expressao=feliz] — **Lala:** [expressao=neutro] Réplica.`. Nas variantes de mentor, use `Virmura: [expressao=neutro] “Fala.”`. Mantenha a anotação na mesma linha. O extrator separa a direção do texto exibido e das condições. No JavaScript, registre a expressão na fala correspondente; `expressionOverrides` no lote documenta diferenças por ocorrência.

```powershell
node docs/terminus/prototipo/scripts/extract-quest-script.cjs
node docs/terminus/prototipo/scripts/build-locales.cjs
node docs/terminus/prototipo/scripts/report-editorial.cjs --write
node docs/terminus/prototipo/scripts/integrate-editorial.cjs --check
node --test docs/terminus/prototipo/tests/*.test.cjs docs/terminus/prototipo/tests/localization.cjs docs/terminus/prototipo/tests/localization-messages.cjs
node docs/terminus/prototipo/tests/localization-browser.cjs
node coreto/tools/qa/runner/node_modules/playwright/cli.js test -c docs/terminus/prototipo/tests/narrative.playwright.config.cjs --project=narrative
```

`integrate-editorial.cjs --write` é a migração inicial, já aplicada; não é o comando de edição cotidiana. A verificação `--check` não depende de Acorn. `localization.js` resolve chaves de conteúdo estáveis e templates explícitos na apresentação, sem usar somente a posição da passagem: falas diferentes na mesma posição têm registros próprios. O relatório exportado acompanha o idioma selecionado.

O teste visual de idiomas aceita as mesmas variáveis do teste de mapa: `$env:TERMINUS_QA_BROWSER="chrome"` e `$env:TERMINUS_QA_TRANSPORT="file"` executam a abertura direta do HTML no Chrome, sem acesso HTTP. Seu relatório e capturas ficam em `.artifacts/terminus-localization/browser/`.

Os 12 cenários de `narrative.browser.cjs` verificam texto, identidade, expressão e posição de leitura nos dois idiomas. Usam saves preparados para alcançar cada cena e importados pela interface pública. A seleção `--project=narrative` executa esse arquivo com um worker e um navegador, respeitando os limites de `loki.config.json`; o Edge é o padrão. A configuração também registra os testes da [edição para jogadores](../jogo/README.md). As novas capturas ficam em `.artifacts/terminus-player/browser/` e o relatório em `.artifacts/terminus-player/browser-results.json`; as capturas anteriores permanecem em `.artifacts/terminus-localization/round2/`. A preparação dos saves não equivale a um playtest humano completo.

A resposta da rota Y omitida no recorte original foi recuperada como segunda opção. A opção que já existia conserva o índice zero para manter o sentido dos comandos de saves anteriores. Não foram acrescentados efeitos, páginas ou recompensas.

## Jogar

- A exploração abre depois de Q-A1. O mapa tem **13 destinos e um portal fixo**, todos com identificação textual. O terreno, as fachadas e o portal usam as ilustrações existentes. Clique para visitar; no toque, selecione e toque novamente no mesmo destino.
- Abra um destino para ver o cenário e suas atividades. Buscas, entregas e retornos exigem visitar o local indicado. As cadeias podem ser intercaladas antes da adesão; ouvir uma proposta não escolhe a guilda.
- Use mouse ou toque. No mapa, Tab e setas percorrem os destinos; Enter/Espaço abre o selecionado. O mapa cabe inteiro na janela horizontal. “Voltar ao mapa” restaura a seleção e o foco do destino; não há deslocamento horizontal.
- Enter/Espaço ou o botão avançam a leitura. Escolhas aparecem ao final do trecho. “Decidir depois” conserva a inspeção e a posição de leitura nos conflitos que permitem adiar.
- O portal leva à Noite da História entre cenas. Termine conversas e batalhas antes de sair. Durante a revanche da invasão, o recuo permanece no corredor do coliseu.
- Os pictogramas junto às construções indicam **missões**, **convites** e **intervenções com Ludos** disponíveis. Números indicam múltiplas ações da mesma categoria; a legenda explica as formas. O rodapé mostra a primeira atividade na ordem do local e quantas outras existem. Intervenções aparecem somente com saldo suficiente; os bloqueios conhecidos continuam explicados no local.
- O **Diário** consulta objetivos, itens em posse, equipe e histórico. **Localizar no mapa** destaca o destino sem visitá-lo nem iniciar a missão; durante cenas e batalhas, o motivo da indisponibilidade aparece na consulta. Convites e intervenções acontecem nos locais dos personagens. A confirmação das eliminatórias encerra os recrutamentos, inclusive numa campanha solo.

O menu no canto superior direito reúne Diário, recursos, exportação/importação, nova partida, ajuda, movimento reduzido e ferramentas editoriais. A apresentação segue o Style Guide Coreto r2: Cinzel Decorative, Averia Libre e Outfit locais, papel/tinta, ação roxa, hover lavanda e foco dourado.

O quadro do jogo tem referência de 1280 × 720. Em retrato ou espaço insuficiente, uma orientação pede rotação/ampliação e suspende a interação. Textos extensos e atividades têm rolagem interna; avisos reservam espaço fora do quadro e podem ser fechados. Textos aparecem completos, com um busto por vez. O painel descritivo preserva a composição anterior atenuada. A entrega de objetos é também descrita em texto e funciona com movimento reduzido.

## Regras experimentais

| Regra | Valor |
| --- | --- |
| Opção comum paga / nova rolagem | 1 Ludo |
| Exceção de recrutamento | 3 Ludos, uma vez por par |
| Conflito curto / longo | 2 / 3 Ludos |
| Cada secundária | 3 Ludos |
| B4 e C4 | Dificuldade 8; independentes do campeonato |
| Campeonato e confronto final | 8, 9, 10, 11, 12 e 12 |

Vitória exige `D20 + aliados > dificuldade`; igualdade é falha. Ghork não entra no bônus. Uma nova rolagem consome uma carga comprada no Coreto e substitui o dado anterior. Aceitar o revés permite revanche gratuita. Em B4 o fardo só é recolhido depois da vitória; em C4 o estojo é restituído antes do duelo.

R1/R2 podem ser resolvidos desde Q-A1. Os convites aguardam a trajetória X/Y concluída, exceto R2 da guilda A, cuja condição já está definida pela adesão. R3/R4 abrem depois da investigação; R5 depois da classificação. Resolver um conflito, convidar e pagar uma exceção são operações distintas.

## Arte e revisão

São **19 fundos selecionados**, **255 expressões disponíveis para 51 visuais** e **15 artes do mapa** (terreno, 13 fachadas e portal). A encenação usa o subconjunto correspondente aos participantes e às expressões explicitamente escolhidas. Os arquivos continuam **em avaliação artística**. Concepts orientam identidade e enquadramento; as expressões são os bustos do palco. Lala e oito visuais de figurantes usam a arte já produzida; vozes coletivas sem imagem correspondente permanecem provisórias. Savel, Neral revelado e Neral transformado usam visuais distintos.

O registro `art.js`, alimentado por `asset-files.js`, é compartilhado pelo palco e pelo catálogo. As imagens mantêm proporções e transparência. Os fundos têm 1672 × 941 px, exceto a recepção de Virmura, com 1672 × 940; os bustos têm 504 × 672 px RGBA. Falhas de carregamento mostram o arquivo esperado e uma mensagem legível.

- **Cenas e variantes:** prévias por cena, trecho, resposta, guilda, X/Y e contexto, sem alterar o save. Incluem as quarenta reações da semifinal e os diferentes momentos do Coreto.
- **Inventário de arte:** fichas, usos, filtros e exportação CSV. O [inventário gerado](INVENTARIO.md) distingue referências com uso no roteiro das demais disponíveis.
- **Direção de arte:** mostra IDs e referências nas prévias editoriais. O jogo permanece sem essas informações.
- **Prévia do mapa:** consulta as artes da cidade sem visitar locais nem modificar o save.

Os **35 objetos usados nas cenas** possuem PNGs transparentes associados ao palco e ao catálogo, em avaliação artística. Consulte a [galeria dos objetos](../arte/objetos/galeria.md) e sua [documentação de produção](../arte/objetos/README.md).

As prévias contêm spoilers e contextos editoriais que não são partidas reais. Consulte os [fundos selecionados](../arte/locais/README.md), os [concepts](../arte/bustos/README.md) e a [matriz de expressões](../arte/bustos/expressoes/README.md). Sprites de movimentação não são usados. A composição e a procedência do mapa estão em [mapa/README.md](mapa/README.md).

## Saves

A campanha começa do zero. O formato é **3** e a chave própria é `terminus-campaign-v3`. Na abertura, somente a chave antiga conhecida `terminus-campaign-v2` é removida. Não há migração; a importação rejeita formatos anteriores.

Exportação/importação usa JSON validado por replay. Os saves V3 anteriores continuam aceitos: comandos antigos de deslocamento horizontal são reproduzidos, mas a apresentação usa apenas o destino selecionado. As ações reconstruem local, posição histórica do mapa, etapas, posse e entrega de itens, escolhas, perguntas, cursor de leitura, Ludos, aliados e resultados aleatórios. Carregar não concede novamente objetos ou recompensas. O armazenamento depende da origem e das regras do navegador; use exportação para transportar partidas entre pastas, navegadores ou servidores.

## Manutenção

Comece pela tarefa na tabela. Arquivos gerados permanecem versionados quando são necessários para abrir o jogo sem build ou consultar seu inventário em texto. Edite suas fontes e use os comandos de geração abaixo; evidências de uma execução ficam fora da documentação versionada.

| Tarefa | Arquivo responsável | Fonte editável e atualização |
| --- | --- | --- |
| Abrir o jogo ou alterar a ordem de carregamento | [index.html](index.html) | Edição direta; carrega os scripts locais e os estilos. |
| Revisar o roteiro principal | [quests da campanha](../storytelling/quests-da-campanha.md) | Fonte narrativa; seguir o [guia do elenco](../personagens/README.md) e revisar a montagem antes de extrair. |
| Atualizar as falas extraídas | [quest-script.js](quest-script.js) | Gerado do roteiro por [extract-quest-script.cjs](scripts/extract-quest-script.cjs), com linhas de origem e hash. |
| Montar quests, etapas, locais, condições e efeitos | [campaign.js](campaign.js) | Edição direta; combina o recorte do roteiro com as definições comuns e adaptações de encenação. |
| Alterar matriz, definições comuns ou secundárias | [content.js](content.js) | Edição direta; fonte das três secundárias, guildas, pares e matriz experimental. |
| Alterar intervalos e reveses | [supplementary.js](supplementary.js) | Edição direta; complementa o conteúdo usado pela campanha. |
| Alterar regras de execução ou save | [engine.js](engine.js) | Edição direta; valida ações, progresso, inventário e replay. |
| Preparar passagens e composição visual | [staging.js](staging.js) | Edição direta; resolve a apresentação a partir da campanha e do registro de arte. |
| Renderizar o palco | [stage-view.js](stage-view.js) | Edição direta; transforma as passagens em elementos visuais. |
| Selecionar arquivos de imagem | [asset-files.js](asset-files.js) | Manifesto editado manualmente conforme os [fundos](../arte/locais/README.md), [concepts](../arte/bustos/README.md) e [expressões](../arte/bustos/expressoes/README.md). |
| Atualizar descrições extraídas das fichas | [art-authority.js](art-authority.js) | Gerado das fichas de [personagens](../personagens/README.md) e [locais](../locais/README.md) por [refresh-art-authority.cjs](scripts/refresh-art-authority.cjs). |
| Alterar IDs, variantes ou referências de arte | [art.js](art.js) | Registro editado manualmente; combina o manifesto e as descrições extraídas para palco e catálogo. |
| Alterar prévias editoriais, usos ou CSV | [catalog.js](catalog.js) | Edição direta; consulta campanha, encenação e arte sem salvar uma partida. |
| Alterar navegação e interface | [app.js](app.js), [style.css](style.css), [game-shell.css](game-shell.css), [tokens.css](tokens.css) | Edição direta; tokens concentram os valores visuais compartilhados. |
| Alterar mapa e indicadores | [map-view.js](map-view.js), [map.css](map.css), [manifesto](mapa/manifest.js) | O manifesto contém a composição. A consulta pura `locationActivities` em `engine.js` fornece ações para o mapa e o local. Marcadores não têm flags persistidas. |
| Consultar ou atualizar o inventário textual | [INVENTARIO.md](INVENTARIO.md) | Gerado do catálogo por [report-art.cjs](scripts/report-art.cjs); atualizar as fontes, depois redirecionar o relatório. |
| Verificar campanha, saves e apresentação | [campaign.test.cjs](tests/campaign.test.cjs), [presentation.test.cjs](tests/presentation.test.cjs), [map.test.cjs](tests/map.test.cjs) | Testes editados diretamente; executar com `node --test`. |
| Manter percursos automatizados de teste | [helpers.cjs](tests/helpers.cjs) | Edição direta; apoio às suítes e aos relatórios de percurso. |
| Estimar extensão dos percursos | [report.cjs](tests/report.cjs) | Edição direta; imprime JSON com palavras, estimativa de leitura e rolagens. Não mede playtest humano. |
| Verificar a interface no navegador | [browser.cjs](tests/browser.cjs) | Edição direta; gera capturas e `browser.json` em `.artifacts/terminus-prototipo/`, na raiz. |
| Consultar decisões e pendências da adaptação | [REVISAO-EDITORIAL.md](REVISAO-EDITORIAL.md) | Registro vigente da V3; atualizar a partir das fontes e decisões do autor. |
| Consultar resultados da entrega original | [VERIFICACAO-V3.md](VERIFICACAO-V3.md) | Resumo histórico vinculado ao commit; não representa o resultado dos testes atuais. |

O fluxo de autoria é **roteiro → extrator → `quest-script.js` → montagem em `campaign.js`**. As etapas têm IDs próprios, mas a seleção de falas ainda depende dos intervalos de linhas em `campaign.js` e do limite explícito `i < 2252` no extrator. Ao inserir ou remover linhas do roteiro, confira ambos, as condições e os limites entre cenas antes de regenerar. O hash detecta uma fonte desatualizada; regenerar sozinho não comprova que a seleção das falas continua correta.

### Atualizar arquivos gerados

Com Node.js 20 ou posterior, na raiz do repositório:

```powershell
# Helpers mutantes: atualizam apenas os artefatos derivados do protótipo.
node docs/terminus/prototipo/scripts/extract-quest-script.cjs
node docs/terminus/prototipo/scripts/refresh-art-authority.cjs

# Relatório somente leitura; o redirecionamento atualiza o retrato documental.
node docs/terminus/prototipo/scripts/report-art.cjs | Out-File -Encoding utf8 docs/terminus/prototipo/INVENTARIO.md
```

### Executar testes e relatórios

Na raiz do repositório:

```powershell
node --test (Get-ChildItem docs/terminus/prototipo/tests/*.test.cjs).FullName
node docs/terminus/prototipo/tests/report.cjs
node docs/terminus/prototipo/tests/browser.cjs
node .agents/skills/ui-craft/scripts/detect-token-drift.mjs docs/terminus/prototipo --token-paths tokens.css
```

O teste de navegador usa a biblioteca Playwright das dependências de QA e o Edge local. Para instalar essas dependências, siga o [guia de QA](../../../coreto/docs/qa.md) e seus requisitos. A execução direta dessa biblioteca não equivale a executar o runner Coreto. Para usar Chrome, defina `$env:TERMINUS_QA_BROWSER="chrome"`. O teste cria um servidor temporário e grava capturas e `browser.json` em `.artifacts/terminus-prototipo/`, já ignorado pelo Git.

Para guardar também o log de testes e o relatório de percursos localmente:

```powershell
New-Item -ItemType Directory -Force .artifacts/terminus-prototipo | Out-Null
node --test --test-reporter=tap (Get-ChildItem docs/terminus/prototipo/tests/*.test.cjs).FullName | Out-File -Encoding utf8 .artifacts/terminus-prototipo/unit-tests.tap
node docs/terminus/prototipo/tests/report.cjs | Out-File -Encoding utf8 .artifacts/terminus-prototipo/percursos.json
```

A [verificação da integração](VERIFICACAO-MAPA.md) separa os novos resultados do histórico. Consulte as [decisões editoriais vigentes](REVISAO-EDITORIAL.md) e o [resumo histórico da verificação V3](VERIFICACAO-V3.md). Os resultados locais podem ser substituídos a cada execução; o resumo identifica o commit que preserva as evidências originais. Toque é emulado; aparelho físico, leitor de tela, impressão, aceite artístico e playtest humano de ritmo exigem avaliação própria. O protótipo não exporta eventos automaticamente para RPG Maker.

Para evoluir o protótipo, aplique a [skill game-prototype-vn-html](../../../.agents/skills/game-prototype-vn-html/SKILL.md). A [visão](../visao-do-jogo.md), o [guia de personagens](../personagens/README.md) e o roteiro permanecem as fontes de escopo e narrativa; os registros de arte não aprovam decisões narrativas por si sós.
