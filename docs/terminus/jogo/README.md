# Terminus — edição para jogadores

Status: em desenvolvimento.

A guilda C chama-se **Chapéu Minúsculo** em português e **Tiny Hat** em inglês. Sevrak usa o chapéu sempre; Ghork, desde a confirmação da adesão; recrutáveis, somente após o convite para a equipe nessa rota. Diálogos, entregas, combate e diário compartilham a seleção em `TerminusArt.costume`, derivada de `guild` e `recruits[].invited`, sem alterar o save V3. [Artes e revisão](../arte/bustos/tiny-hat/README.md).

Abra [index.html](index.html) no Chrome ou Edge. A edição funciona diretamente do arquivo, offline, sem instalação ou build para jogar. Mantenha a estrutura do repositório: imagens e fontes continuam nas pastas compartilhadas. Esta entrega ainda não é um pacote portátil.

## Jogar

- **Começar a história** inicia uma campanha. **Continuar a história** retoma o progresso desta edição.
- O jogo começa em inglês. Escolha português na abertura ou no menu.
- Uma fala aparece gradualmente. Clique em **Revelar texto** ou pressione Enter/Espaço para completá-la; o próximo avanço continua a história. Escolhas aparecem ao completar a fala. O menu permite leitura lenta, normal, rápida ou instantânea.
- Descrições e ações narradas aparecem integralmente em um card roxo central, com detalhe lateral creme. Falas e pensamentos mantêm o painel de diálogo.
- Clique em um destino do mapa para visitar. No toque, selecione e toque novamente. Tab e setas percorrem os locais; Enter confirma. Ghork caminha até o destino; **Chegar ao destino** abrevia o percurso. **Localizar no mapa**, no diário, apenas destaca o local.
- Os percursos levam até 2,4 segundos, com deslocamento e passos na metade da velocidade da primeira edição.
- No combate, role o D20. O resultado é salvo antes da animação. **Abreviar animação** não muda o dado. D20 + aliados precisa superar a dificuldade; empate é revés. Cargas permitem outra rolagem; aceitar o revés permite revanche gratuita.
- O menu oferece som geral, volumes separados de música e efeitos e movimento reduzido. A preferência de movimento do sistema também é respeitada. Músicas e efeitos começam após a primeira interação; não há voz nem som por letra ou avanço de fala. A música pausa ao ocultar a aba.
- Use a janela na horizontal. Textos extensos, escolhas, diário e menu têm rolagem interna quando necessário.

## Guardar ou transportar a partida

O jogo salva automaticamente em `terminus-player-v3`. O protótipo conserva `terminus-campaign-v3`; uma edição não substitui nem apaga o progresso da outra. Opções ficam em `terminus-player-settings`.

Para continuar um save do protótipo, exporte-o por lá e escolha **Importar partida** aqui. Confirme a substituição somente depois de guardar a partida atual, caso queira preservá-la. O formato continua V3, validado pelo mesmo replay de comandos. Arquivos inválidos não substituem a campanha ativa.

O armazenamento depende da pasta/origem e do navegador. Use **Exportar partida** para guardar uma cópia ou mudar de navegador. Se o armazenamento não estiver disponível, é possível jogar e exportar durante a sessão.

## Manter o jogo

O Coreto e as cinco expressões de Rheed usam as versões coloridas selecionadas em `prototipo/asset-files.js`, também consumidas pelo protótipo editorial. O [registro das artes](../arte/bustos/rheed-coreto-coloridos.json) conserva prompts, referências e arquivos. As versões sépia anteriores permanecem no projeto.

Campanha, efeitos, regras, textos e localização continuam nas fontes do [protótipo](../prototipo/README.md). Esta edição não é uma cópia independente do roteiro. Siga aquele guia para alterar conteúdo e regenerar os arquivos narrativos e de idioma.

Depois de alterar arte, roteiro extraído, mapa ou localização, execute na raiz:

```powershell
node docs/terminus/jogo/scripts/build-runtime.cjs
node docs/terminus/jogo/scripts/build-runtime.cjs --check
```

O gerador consulta as fontes de produção em Node e escreve `runtime/`: imagens e expressões usadas pela campanha, mapa, textos extraídos e traduções. Não incorpora briefs, fichas, histórico editorial ou ferramentas de prévia. O campo `line` dos textos extraídos permanece porque a montagem compartilhada da campanha o usa para selecionar passagens; não aparece ao jogador. Os arquivos gerados são versionados para permitir abrir o HTML sem preparação.

| Responsabilidade | Fonte |
| --- | --- |
| Entradas, diário, opções, leitura e armazenamento | `player.js` |
| Caminhos do mapa, caminhada e formações | `presentation.js` |
| Catálogo, seleção de trilha, reprodução e volumes | `audio.js`, com gravações em `audio/` |
| Composição, estados e transições | `player.css` |
| Tokens adicionais da edição | `tokens.css` |
| Registro de arte e traduções para execução | `scripts/build-runtime.cjs`, a partir das fontes do protótipo |

O visual conserva papel/tinta, tipografia e ações Coreto. A composição usa ilustração como palco e elementos de tabuleiro para destinos, escolhas e rolagens. Variação visual **6/10**, movimento **6/10**, densidade **3/10**. A abertura usa registro de marca; controles mantêm a clareza de produto. O contexto é leitura de uma aventura em notebook ou tela horizontal, com pausas entre ações e informação concentrada no palco. O projeto não possui `DESIGN.md`; os tokens Coreto existentes e esta documentação orientam as extensões desta edição.

Os estados de controles incluem repouso, hover, pressionado, foco e indisponibilidade. O mapa tem carregamento, falha e nova tentativa; consultas têm estados vazios; importação e nova partida pedem confirmação; falhas de armazenamento oferecem exportação. Animações não são proprietárias de decisões, prêmios ou sorteios. Conteúdo permanece legível com som desligado e movimento reduzido.

## Verificar alterações

Na raiz do projeto, com as dependências de QA já preparadas conforme o [guia Coreto](../../../coreto/docs/qa.md):

```powershell
node --test docs/terminus/jogo/tests/*.test.cjs
node --test docs/terminus/prototipo/tests/*.test.cjs docs/terminus/prototipo/tests/localization.cjs docs/terminus/prototipo/tests/localization-messages.cjs
node coreto/tools/qa/runner/node_modules/playwright/cli.js test -c docs/terminus/prototipo/tests/narrative.playwright.config.cjs --project=player
node coreto/tools/qa/runner/node_modules/playwright/cli.js test -c docs/terminus/prototipo/tests/narrative.playwright.config.cjs --project=narrative
node .agents/skills/ui-craft/scripts/detect-token-drift.mjs docs/terminus/jogo --token-paths tokens.css
```

`--grep` seleciona cenários individuais. O projeto `player` cobre a edição nova e `narrative` preserva os cenários editoriais existentes. Edge é o navegador padrão; `$env:TERMINUS_QA_BROWSER="chrome"` seleciona Chrome. O executor lê e valida `loki.config.json`, usa até dois workers com um navegador por worker, sem paralelismo aninhado. Contextos e servidores de porta efêmera são fechados pelas fixtures. Resultados, capturas e traces ficam em `.artifacts/terminus-player/`.

Os testes usam saves produzidos pelas regras reais e importados pela interface. Verificação automatizada não representa aceite artístico, dispositivo físico ou playtest humano completo. O protótipo editorial continua em [prototipo/index.html](../prototipo/index.html).

## Áudio

As 16 gravações de [audio/](audio/) são cópias sem alteração de [rpg-maker/Terminus/audio/](../../../rpg-maker/Terminus/audio/). O catálogo em [audio.js](audio.js) registra seus caminhos e ganhos por efeito. O HTML usa somente as cópias locais; não precisa acessar a pasta do RPG Maker para reproduzi-las.

| Contexto | Arquivo em audio/ |
| --- | --- |
| Abertura | bgm/Theme1.ogg |
| Cidade e conversas comuns | bgm/Town1.ogg |
| Coreto e moldura da história | bgm/Town6.ogg |
| Invasão e preparação do confronto final | bgm/Dungeon1.ogg |
| Combates comuns e campeonato | bgm/Battle1.ogg |
| Confronto com Neral | bgm/Battle5.ogg |
| Encerramento | bgm/Theme2.ogg |
| Navegação, escolhas, retorno | se/Cursor1.ogg, se/Decision1.ogg, se/Cancel1.ogg |
| Passos, dado, recompensa, portal | se/Move1.ogg, se/Switch1.ogg, se/Item1.ogg, se/Teleport.ogg |
| Vitória e revés | me/Victory1.ogg, me/Defeat1.ogg |

A transição de trilha dura um segundo. Menus e diário conservam a música atual. As vinhetas de resultado reduzem temporariamente a trilha a 25% do volume configurado. Efeitos repetidos do mesmo tipo substituem a própria cauda para evitar acúmulo.

Os padrões são música em 25% e efeitos em 35%, com som ativado. Preferências anteriores de silêncio e volume de efeitos são preservadas; `musicVolume` é acrescentado às opções, sem alterar o save V3. Os controles usam os mesmos tokens e estados nativos do menu: rótulos nos dois idiomas, foco visível e operação por teclado. Silenciar é reversível; os controles de volume continuam disponíveis.

Para trocar uma gravação, copie o arquivo de origem para a categoria correspondente e atualize o catálogo e esta tabela. Mantenha a seleção por contexto fora das regras da campanha. A ausência de áudio não bloqueia a história.

A verificação técnica não substitui a avaliação auditiva da seleção musical, que permanece pendente.

### Revisão de cores, caminhada e narração — 19 de outubro de 2026

As artes coloridas do Coreto e as cinco expressões de Rheed foram conferidas em abertura, introdução, retorno pelo portal, visita e encerramento. Na visita, Rheed fica à esquerda do painel de opções. A narração central foi inspecionada em português e inglês, em 1280 × 720 e 844 × 390, incluindo texto longo, escolhas e objetos; o contraste entre texto creme e card roxo é 9,59:1. Os testes de caminhada verificam duração duplicada em todas as rotas, quadros a cada 360 ms, passos a cada 720 ms e encerramento único por chegada, abreviação ou cancelamento.

A seleção de 58 cenários de navegador passou após reconferências. A primeira execução identificou a expectativa antiga do caminho do retrato de Rheed e restrições do sandbox para HTTP/download; a expectativa foi atualizada e os casos afetados passaram com a execução autorizada fora do sandbox. A última conferência da visita ao Coreto passou nas duas resoluções. A execução usou dois workers e até dois navegadores, dentro dos limites 10/10 de `loki.config.json`, sem sobreposição com outra execução desta revisão; os recursos foram encerrados sem falhas de limpeza.

O conjunto Node teve 93 de 95 testes aprovados: duas verificações globais de arquivos encontraram PNGs ausentes de `brakka/tiny-hat/neutro.png` e `nima/tiny-hat/neutro.png`, referentes à produção paralela de figurinos. Isso limita a aprovação global daquele estado do projeto; os arquivos e o código dessa outra produção foram preservados.

Evidências em `.artifacts/terminus-player/`: `visual-adjustments-final-unit.tap`, `visual-adjustments-first-browser-results.json`, `visual-adjustments-recheck-browser-results.json`, `visual-adjustments-coreto-responsive-results.json`, `color-art-checks.json` e capturas nas pastas correspondentes. As artes e a interface passaram pela revisão interna; isso não substitui avaliação artística nem playtest humano.
