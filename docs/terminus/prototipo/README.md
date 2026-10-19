# Protótipo de Terminus — V3

Status: em desenvolvimento.

Abra [index.html](index.html) em um navegador atual. O jogo roda localmente, sem build, servidor ou instalação. Também pode ser servido a partir da raiz do repositório; mantenha a pasta `assets/terminus/` disponível, pois o protótipo referencia esses arquivos diretamente.

A V3 integra o [roteiro de quests](../storytelling/quests-da-campanha.md): quinze quests de guilda, sete do arco 2, cinco conflitos de recrutamento, campeonato, invasão, encerramento e cenas compartilhadas E00–E08. Preserva as três secundárias e permite terminar sozinho, sem gastar Ludos.

## Jogar

- A exploração abre depois de Q-A1. O mapa tem **13 destinos e um portal fixo**, todos com identificação textual. Os destinos são placeholders; as imagens de mapa ficam preservadas para uma integração futura.
- Abra um destino para ver o cenário e suas atividades. Buscas, entregas e retornos exigem visitar o local indicado. As cadeias podem ser intercaladas antes da adesão; ouvir uma proposta não escolhe a guilda.
- Use mouse ou toque. No mapa, Tab e setas percorrem os destinos; Enter/Espaço abre o selecionado. Em telas estreitas, deslize a área do mapa horizontalmente. “Voltar ao mapa” restaura a posição e o foco do destino.
- Enter/Espaço ou o botão avançam a leitura. Escolhas aparecem ao final do trecho. “Decidir depois” conserva a inspeção e a posição de leitura nos conflitos que permitem adiar.
- O portal leva à Noite da História entre cenas. Termine conversas e batalhas antes de sair. Durante a revanche da invasão, o recuo permanece no corredor do coliseu.
- O **Diário** consulta objetivos, itens em posse, equipe e histórico. Convites e intervenções acontecem nos locais dos personagens. A confirmação das eliminatórias encerra os recrutamentos, inclusive numa campanha solo.

O palco tem referência de 1280 × 720. Textos aparecem completos, com um busto por vez. O painel descritivo preserva a composição anterior atenuada. A entrega de objetos é também descrita em texto e funciona com movimento reduzido.

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

São **19 fundos selecionados** e **210 expressões disponíveis para 42 visuais**. A encenação usa o subconjunto correspondente aos participantes e às expressões explicitamente escolhidas. Os arquivos continuam **em avaliação artística**. Concepts orientam identidade e enquadramento; as expressões são os bustos do palco. Lala e figurantes sem imagem permanecem provisórios. Savel, Neral revelado e Neral transformado usam visuais distintos.

O registro `art.js`, alimentado por `asset-files.js`, é compartilhado pelo palco e pelo catálogo. As imagens mantêm proporções e transparência. Os fundos têm 1672 × 941 px, exceto a recepção de Virmura, com 1672 × 940; os bustos têm 504 × 672 px RGBA. Falhas de carregamento mostram o arquivo esperado e uma mensagem legível.

- **Cenas e variantes:** prévias por cena, trecho, resposta, guilda, X/Y e contexto, sem alterar o save. Incluem as quarenta reações da semifinal e os diferentes momentos do Coreto.
- **Inventário de arte:** fichas, usos, filtros e exportação CSV. O [inventário gerado](INVENTARIO.md) distingue referências com uso no roteiro das demais disponíveis.
- **Direção de arte:** mostra IDs e referências fora do palco; pode ser desligada para jogar.

As prévias contêm spoilers e contextos editoriais que não são partidas reais. Consulte os [fundos selecionados](../arte/locais/README.md), os [concepts](../arte/bustos/README.md) e a [matriz de expressões](../arte/bustos/expressoes/README.md). Sprites de movimentação e assets do mapa não foram aplicados à apresentação VN.

## Saves

A campanha começa do zero. O formato é **3** e a chave própria é `terminus-campaign-v3`. Na abertura, somente a chave antiga conhecida `terminus-campaign-v2` é removida. Não há migração; a importação rejeita formatos anteriores.

Exportação/importação usa JSON validado por replay. As ações reconstruem local, posição do mapa, etapas, posse e entrega de itens, escolhas, perguntas, cursor de leitura, Ludos, aliados e resultados aleatórios. Carregar não concede novamente objetos ou recompensas. O armazenamento depende da origem e das regras do navegador; use exportação para transportar partidas entre pastas, navegadores ou servidores.

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
| Alterar navegação e interface | [app.js](app.js), [style.css](style.css), [tokens.css](tokens.css) | Edição direta; tokens concentram os valores visuais compartilhados. |
| Consultar ou atualizar o inventário textual | [INVENTARIO.md](INVENTARIO.md) | Gerado do catálogo por [report-art.cjs](scripts/report-art.cjs); atualizar as fontes, depois redirecionar o relatório. |
| Verificar campanha, saves e apresentação | [campaign.test.cjs](tests/campaign.test.cjs), [presentation.test.cjs](tests/presentation.test.cjs) | Testes editados diretamente; executar com `node --test`. |
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

O teste de navegador usa a biblioteca Playwright das dependências de QA e o Edge local. Para instalar essas dependências, siga o [guia de QA](../../../coreto/docs/qa.md) e seus requisitos. A execução direta dessa biblioteca não equivale a executar o runner Coreto. O teste cria um servidor temporário e grava capturas e `browser.json` em `.artifacts/terminus-prototipo/`, já ignorado pelo Git.

Para guardar também o log de testes e o relatório de percursos localmente:

```powershell
New-Item -ItemType Directory -Force .artifacts/terminus-prototipo | Out-Null
node --test --test-reporter=tap (Get-ChildItem docs/terminus/prototipo/tests/*.test.cjs).FullName | Out-File -Encoding utf8 .artifacts/terminus-prototipo/unit-tests.tap
node docs/terminus/prototipo/tests/report.cjs | Out-File -Encoding utf8 .artifacts/terminus-prototipo/percursos.json
```

Consulte as [decisões editoriais vigentes](REVISAO-EDITORIAL.md) e o [resumo histórico da verificação V3](VERIFICACAO-V3.md). Os resultados locais podem ser substituídos a cada execução; o resumo identifica o commit que preserva as evidências originais. Toque é emulado; aparelho físico, leitor de tela, impressão, aceite artístico e playtest humano de ritmo exigem avaliação própria. O protótipo não exporta eventos automaticamente para RPG Maker.

Para evoluir o protótipo, aplique a [skill game-prototype-vn-html](../../../.agents/skills/game-prototype-vn-html/SKILL.md). A [visão](../visao-do-jogo.md), o [guia de personagens](../personagens/README.md) e o roteiro permanecem as fontes de escopo e narrativa; os registros de arte não aprovam decisões narrativas por si sós.
