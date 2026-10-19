# Terminus — edição para jogadores

Status: em desenvolvimento.

Abra [index.html](index.html) no Chrome ou Edge. A edição funciona diretamente do arquivo, offline, sem instalação ou build para jogar. Mantenha a estrutura do repositório: imagens e fontes continuam nas pastas compartilhadas. Esta entrega ainda não é um pacote portátil.

## Jogar

- **Começar a história** inicia uma campanha. **Continuar a história** retoma o progresso desta edição.
- O jogo começa em inglês. Escolha português na abertura ou no menu.
- Uma fala aparece gradualmente. Clique em **Revelar texto** ou pressione Enter/Espaço para completá-la; o próximo avanço continua a história. Escolhas aparecem ao completar a fala. O menu permite leitura lenta, normal, rápida ou instantânea.
- Clique em um destino do mapa para visitar. No toque, selecione e toque novamente. Tab e setas percorrem os locais; Enter confirma. Ghork caminha até o destino; **Chegar ao destino** abrevia o percurso. **Localizar no mapa**, no diário, apenas destaca o local.
- No combate, role o D20. O resultado é salvo antes da animação. **Abreviar animação** não muda o dado. D20 + aliados precisa superar a dificuldade; empate é revés. Cargas permitem outra rolagem; aceitar o revés permite revanche gratuita.
- O menu oferece som geral, volumes separados de música e efeitos e movimento reduzido. A preferência de movimento do sistema também é respeitada. Músicas e efeitos começam após a primeira interação; não há voz nem som por letra ou avanço de fala. A música pausa ao ocultar a aba.
- Use a janela na horizontal. Textos extensos, escolhas, diário e menu têm rolagem interna quando necessário.

## Guardar ou transportar a partida

O jogo salva automaticamente em `terminus-player-v3`. O protótipo conserva `terminus-campaign-v3`; uma edição não substitui nem apaga o progresso da outra. Opções ficam em `terminus-player-settings`.

Para continuar um save do protótipo, exporte-o por lá e escolha **Importar partida** aqui. Confirme a substituição somente depois de guardar a partida atual, caso queira preservá-la. O formato continua V3, validado pelo mesmo replay de comandos. Arquivos inválidos não substituem a campanha ativa.

O armazenamento depende da pasta/origem e do navegador. Use **Exportar partida** para guardar uma cópia ou mudar de navegador. Se o armazenamento não estiver disponível, é possível jogar e exportar durante a sessão.

## Manter o jogo

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

### Resultado em 19 de outubro de 2026

Passaram 93 testes Node e 40 cenários de navegador (28 da edição para jogadores e 12 do protótipo), sem cenários ignorados ou instáveis. A execução final usou dois workers e dois navegadores; os limites de dez workers e dez navegadores vieram de `loki.config.json`. Durante a inspeção visual paralela, o pico coordenado foi de três navegadores. Contextos, navegadores e servidores de teste foram encerrados sem falhas de limpeza.

As evidências estão em `.artifacts/terminus-player/unit-tests.tap`, `.artifacts/terminus-player/browser-results.json` e nas pastas `browser/` e `visual/` desse mesmo diretório. A conferência incluiu abertura local e por servidor, retomada de navegação, áudio após interação, leitura e escolhas em janela estreita, além das verificações de campanha, idiomas e saves. A entrega permanece **em desenvolvimento**.

## Áudio

As 16 gravações de `audio/` são cópias sem alteração de `rpg-maker/Terminus/audio/`. O catálogo em `audio.js` registra seus caminhos e ganhos por efeito. O HTML usa somente as cópias locais; não precisa acessar a pasta do RPG Maker para reproduzi-las.

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

Verificação da sonorização: 96 testes Node e 30 cenários da edição no Edge passaram, incluindo reprodução por arquivo e HTTP, sinal de áudio, volumes independentes, silêncio persistente, trilhas de saves importados e ausência de recompensas repetidas. O teste de ciclo de vida cobre pausa, retomada, redução da música durante vinhetas e rejeição de reprodução. Foram usados dois workers e dois navegadores, abaixo dos limites 10/10 de `loki.config.json`; o runner encerrou os recursos sem erros de limpeza. Evidências: `.artifacts/terminus-player/audio-unit-tests.tap`, `browser-results.json` e capturas de menu em `browser/`. A inspeção visual cobriu inglês e português em janela estreita. Esta verificação técnica não inclui avaliação auditiva da seleção musical.
