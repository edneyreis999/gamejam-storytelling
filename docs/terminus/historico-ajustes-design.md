# Histórico de ajustes de design de Terminus

Status: em desenvolvimento.

Este arquivo reúne os pedidos de design do autor, as decisões tomadas e os ajustes aplicados. Por solicitação do autor em 18/10/2026, os próximos pedidos de design devem ser acrescentados aqui, com data, situação e localização da configuração. Alterações posteriores devem indicar o que substituem, preservando o histórico. Pedidos ainda não implementados devem ser identificados como pendentes.

A [configuração da interface Coreto](interface-coreto.md) descreve o estado atual e os detalhes de validação. Os registros abaixo foram recuperados da conversa de configuração do projeto; valores de implementação não representam pedidos literais do autor.

## 18/10/2026 — Base visual Coreto

**Pedido:** criar Terminus neste repositório e usar o guia e os plugins Coreto para ajustar a UI.

**Situação:** aplicado.

- Projeto: `rpg-maker/Terminus/game.rmmzproject`.
- Guia: `C:/projetos/coreto-design-system/coreto-style-guide-github/`.
- Origem dos provedores: `C:/projetos/gamejam-vn-terror/rpg-maker/The Dryland Drowned/`.
- Provedores instalados: CoreEngine, MessageCore, OptionsCore, SaveCore e ExtMessageFunc.
- Tema: Coreto Design System 1.2.1, preset `coreto-default`, revisão `coreto-approved-2026-10-17-r2`.
- Tela e área de UI configuradas em 1280 × 720.
- Fontes instaladas: Outfit, Outfit Medium, Averia Libre e Cinzel Decorative Regular.

**Onde configurar:** `data/System.json`, `js/plugins.js` e `fonts/`, dentro do projeto RPG Maker.

## 18/10/2026 — Fundo e composição da tela de título

**Pedido:** ajustar a tela de título conforme o guia Coreto e usar uma arte existente indicada pelo autor.

**Situação:** aplicado; a aparência das letras foi atualizada nos registros seguintes.

- Arte escolhida: `C:/projetos/coreto-design-system/terminus-background-entrada.png`.
- Exportação para o jogo: `img/titles1/Terminus_Entrada.png`, em 1280 × 720.
- Fundo principal `Terminus_Entrada`; segundo fundo vazio; desenho do título ativado.
- Configuração inicial das letras: Cinzel Decorative, alias `CoretoCinzel`, tamanho 52 px, linha de 56 px, cor de tinta do tema, centralização e posição vertical `y = 144`.
- Janela de comandos: largura de 320 px, centralizada, altura calculada pelo provedor e margem inferior de 96 px.

**Onde configurar:** Sistema do MZ e `Coreto_0_CoreEngine → MenuLayout → Title → drawGameTitle / CommandRect`.

## 18/10/2026 — Ícones do menu de opções

**Pedido:** ajustar os ícones de opções seguindo o guia Coreto.

**Situação:** aplicado.

- Células originais 0–319 do `IconSet.png` preservadas.
- Ícones Coreto adicionados nas células 320–331, com desenhos de 24 × 24 px em células de 32 × 32 px, sobre papel claro com raio de 6 px.
- Categorias General, Audio, UI e Playtest passaram a usar Settings, Audio, Menu e Settings, respectivamente.
- Ícones das linhas associados às suas funções; Settings usado quando não há pictograma específico.
- Desenho do volume principal alinhado à receita dos demais volumes, com ícone Audio.

**Onde configurar:** `img/system/IconSet.png` e `Coreto_1_OptionsCore → Categories`, incluindo `Icon` e o `DrawJS` de `masterVolume`. O mapa completo de índices está em [Interface Coreto](interface-coreto.md#ícones-de-opções).

## 18/10/2026 — Negrito no título

**Pedido:** orientação sobre como colocar o título em negrito.

**Situação:** orientação fornecida; `bitmap.fontBold = true` foi encontrado na configuração do autor e preservado no ajuste seguinte.

**Onde configurar:** `Coreto_0_CoreEngine → MenuLayout → Title → drawGameTitle`, antes das chamadas a `bitmap.drawText`.

O negrito atual é sintetizado pelo canvas sobre a fonte Regular. O guia recomenda pesos reais; uma variante Bold ainda não foi instalada e registrada para esse título.

## 18/10/2026 — Letras roxas com relevo dourado

**Pedido:** reproduzir a estética de `C:/projetos/coreto-design-system/temrinus-banner.png`, com dourado atrás das letras, usando as configurações do `Coreto_0_CoreEngine`.

**Decisão explícita do autor:** o banner serve apenas como referência visual. Não usar sua imagem como título.

**Situação:** aplicado e conferido no playtest. Substitui a cor de tinta da configuração inicial do título.

- Título mantido como texto, obtido de `$dataSystem.gameTitle` e convertido em maiúsculas para destacar os ornamentos da fonte.
- Fonte `CoretoCinzel`, 52 px, negrito existente preservado.
- Camada dourada Coreto `#edaa2f` desenhada primeiro, deslocada 2 px à direita e 3 px abaixo.
- Camada roxa Coreto `#552070` desenhada por cima, na posição original.
- Efeito nítido, sem desfoque ou animação.
- Banner não importado para o jogo.

**Onde configurar:** `Coreto_0_CoreEngine → MenuLayout → Title → drawGameTitle`.

Callback aplicado:

```js
const bitmap = this._gameTitleSprite.bitmap;
const text = $dataSystem.gameTitle.toUpperCase();
const x = 28;
const y = 144;
const width = Graphics.width - 56;
const height = 56;
const goldOffsetX = 2;
const goldOffsetY = 3;

bitmap.fontFace = 'CoretoCinzel';
bitmap.fontSize = 52;
bitmap.fontBold = true;
bitmap.outlineWidth = 0;

bitmap.textColor = '#edaa2f';
bitmap.drawText(text, x + goldOffsetX, y + goldOffsetY, width, height, 'center');
bitmap.textColor = '#552070';
bitmap.drawText(text, x, y, width, height, 'center');
```

Para ajustar depois: `goldOffsetX` e `goldOffsetY` controlam o deslocamento dourado; `fontSize`, o tamanho das letras; `y`, a posição vertical.

**Validação:** CoreEngine validado; execução em navegador com Design System ligado e desligado sem erros JavaScript; navegação por teclado e volume conferidos; título inspecionado no playtest nativo em 1280 × 720.

Ao alterar parâmetros externamente, feche o projeto no editor, reabra-o após a gravação e reinicie o playtest. A reaplicação do preset pode substituir callbacks personalizados.

## 18/10/2026 — Revisão completa do menu de opções

**Pedido:** analisar tudo que ainda destoava do design system ou usava um ícone genérico; em seguida, corrigir todas as falhas encontradas e desenhar ícones quando necessário.

**Situação:** aplicado. Substitui o uso de Settings como alternativa genérica e a descrição anterior de que os demais callbacks permaneceriam iguais.

**Problemas identificados:** 42 ações usavam Settings; apenas sete callbacks tinham a receita visual completa; alternativas ON/OFF ficavam com a mesma opacidade; seções e separadores recebiam tratamento de botão e foco; barras, tipografia e rótulos variavam entre controles; havia inglês misturado ao português; o remapeamento desenhava texto escuro sobre seleção roxa.

**Ajustes realizados:**

- As 77 ações configuradas receberam rótulos em português, pictogramas associados à função e um desenho comum baseado nos tokens Coreto. Inclui opções condicionais de plugins ainda não instalados, que continuam ocultas.
- Desenhados 50 pictogramas vetoriais originais: corrida, bússola, missões, teclado, controle, tipografia, ponteiro, sons de navegação/confirmação/cancelamento, recursos de teste e outras funções. Fontes SVG preservadas em `tools/terminus-ui/icons/`; PNGs no jogo; índices novos 336–385. As células anteriores do atlas foram preservadas.
- Categorias: Geral, Áudio, Interface e Teste. Settings permanece apenas na categoria Geral, onde representa o conjunto de configurações.
- Rótulos em Outfit Medium 22/28, seções em Averia Libre 32/40, controles em Outfit Medium 20/24. Sem negrito sintético nos novos desenhos.
- Alternativas ativas agora têm preenchimento e marca de confirmação, sem depender apenas de cor ou opacidade. Ao selecionar a linha, texto e ícones passam a creme.
- Barras de áudio, tonalidade, velocidade e multiplicadores usam trilho arredondado, indicador de posição e valor legível. O espaço do valor se adapta a textos como “Instantâneo”.
- Os cantos são traçados com `arcTo`, compatível com o Chromium embarcado no MZ; o playtest identificou que `roundRect` não existe nesse runtime.
- Cliques nas alternativas selecionam a alternativa apontada; cliques no trilho ajustam o valor usando os handlers existentes. Setas e confirmação continuam funcionando.
- Removidos 17 separadores vazios. Os 17 cabeçalhos configurados passam a ser títulos sem botão nem foco; grupos sem ações visíveis não aparecem.
- Opções indisponíveis mostram o motivo quando dependem da organização personalizada.
- Remapeamento de teclado e controle recebeu português, Outfit Medium e contraste correto na seleção; mensagens de espera, tecla reservada e controle desconectado foram traduzidas.

**Implementação:** callbacks em `Coreto_1_OptionsCore → Categories`, parâmetros de Rebind e ButtonAssist; correções locais nos provedores OptionsCore e DesignSystem para navegação, interação dos controles e contraste do remapeamento. A geração parte de `tools/terminus-ui/`, sem novo plugin de sobreposição. Estas alterações locais precisam ser preservadas ao atualizar os provedores.

**Validação:** 77 símbolos únicos, 50 desenhos distintos e comparação das ações/condições/configuração com a cópia anterior. Nenhum handler de negócio, condição de visibilidade ou configuração do título foi alterado. Testes em navegador isolado cobrem teclado, cliques, limites de volume, velocidade máxima de texto, opções condicionais, multiplicadores, remapeamento e retorno ao título; sem erros JavaScript, com tema ligado e desligado e sem a API `roundRect`. Conferência visual em 1280 × 720 e abertura das opções confirmada no playtest nativo após a correção de compatibilidade. A configuração de título roxo e dourado permanece como no registro anterior.

**Para consultar e ajustar:** [Interface Coreto](interface-coreto.md), [fontes dos rótulos e ícones](../../tools/terminus-ui/options.mjs), [mapa completo de opções](../../tools/terminus-ui/manifest.json).

## 18/10/2026 — Seis VisuMZ, prioridade dos provedores e correções de opções

**Status do projeto:** em desenvolvimento.

**Pedido:** implementar o plano aprovado, mantendo todos os Coreto e adicionando somente os seis VisuMZ solicitados com defaults completos. Priorizar as configurações dos VisuMZ e corrigir o hover acumulado e os fundos opacos dos ícones do cabeçalho.

**Instalação:** ElementStatusCore 1.26, BattleCore 1.85, EventsMoveCore 1.60, ItemsEquipsCore 1.56, MainMenuCore 1.26 e SkillsStatesCore 1.48, copiados de projectX sem alteração dos fontes. SHA-256 comparado com a origem. Ordem: Coreto CoreEngine, os seis VisuMZ nessa sequência, Coreto MessageCore, OptionsCore, SaveCore, ExtMessageFunc e DesignSystem. Não foram importados mapas, banco de dados, parâmetros de projectX ou provedores VisuMZ duplicados.

**Ajustes de apresentação:**

- Português nos comandos, categorias, instruções, mensagens auxiliares, descrições de características e estados. Identificadores internos e callbacks mecânicos foram preservados.
- Outfit Medium nos campos com configuração de fonte; barras PV/PM/PT desenhadas pelos callbacks de SkillsStatesCore, com cores semânticas Coreto, textos de 16 px e barras de 6 px.
- Comandos de batalha com 280 px; tabelas de status/equipamento sobre papel; tempo de jogo em 18 px, sem sobreposição entre rótulo e contador.
- Oito pictogramas novos: voltar, mochila, status, elementos, chave, elmo, anel e formação, em 386–393. Os anteriores mantêm os índices. Setas e botões de toque também foram redesenhados com a linguagem Coreto.
- Os rótulos de combate automático e barra de vida, além das alternativas do estilo de combate, são lidos do BattleCore pelas opções. Não há rótulos concorrentes fixos no DesignSystem.
- Cores globais e moeda configuradas no CoreEngine quando não há controle equivalente no provedor específico. Opacidade de indisponíveis restaurada para 160; o DesignSystem não a força a 255 nas telas VisuMZ.
- Indicador “NOVO” afastado do ícone do item pelos offsets do ItemsEquipsCore. O callback global `DamageColor` usa as cores semânticas Coreto para dano e recuperação, incluindo as informações da loja/inventário.
- DesignSystem limitado a molduras, superfícies e estados sem configuração equivalente. Nas telas VisuMZ, cores, fontes, dimensões e callbacks permanecem sob responsabilidade do provedor; seleção clara e borda dourada conservam a leitura das cores semânticas.

**Hover:** o teste nativo reproduziu uma seleção anterior que permanecia roxa. O OptionsCore havia capturado `select` antes da intervenção do DesignSystem; o redesenho não acompanhava todos os caminhos de mudança de seleção. A atualização agora considera seleção anterior/atual e hover anterior/atual, redesenhando apenas os índices afetados. Foram conferidos movimentos sequenciais, preferência de seleção por hover ligada/desligada, saída do ponteiro, rolagem, troca de categoria e desativação.

**Transparência:** removido o retângulo de papel do gerador do atlas. Células 320–331 e 336–393 agora têm fundo transparente; células 0–319 preservadas por comparação de pixels. O OptionsCore aplica tinta ou creme ao pictograma do cabeçalho conforme o estado. Este registro substitui a decisão anterior de manter uma placa clara atrás dos ícones.

**Verificação:** navegador e NW.js 0.48.4 / Chromium 85, sem erros JavaScript ou recursos ausentes nos testes aprovados. Conferidos menus, opções de batalha, persistência, loja, salvamento/carregamento isolado, movimento diagonal e entrada/saída de batalha com retorno às opções. Teclado, cliques, limites e telas de remapeamento também passaram no runtime nativo. Parâmetros sentinela comprovaram a prioridade efetiva em quatro combinações: navegador/NW.js, com DesignSystem ligado/desligado. Não havia gamepad físico conectado; foi verificado o estado correspondente e o cancelamento de remapeamento.

**Preservação:** fontes VisuMZ intactos, título roxo/dourado e arte mantidos, saves existentes comparados por hash. Recuperação anterior em `.local-tools/visumz-before/`; testes gravam apenas em armazenamento separado. Os defaults técnicos completos continuam ativos, incluindo movimento diagonal, inclinação, sombras e regras de combate/estados, conforme a decisão aprovada.

**Interações adicionais conferidas:** uso de poção com recuperação de PV e consumo de uma unidade, troca efetiva de arma, lista de habilidades da classe e navegação por todas as categorias de status, tanto no navegador quanto no NW.js.

**Manutenção:** [matriz de responsabilidades e instruções](interface-coreto.md#integração-visumz--18102026), [manifesto dos parâmetros e hashes](../../tools/terminus-ui/visumz-manifest.json), [configuração de apresentação](../../tools/terminus-ui/visumz-presentation.mjs) e [patch dos provedores Coreto](../../tools/terminus-ui/provider-changes.patch). Capturas e resultados locais em `.local-tools/visumz-review/` e `.local-tools/options-review/`.

## 18/10/2026 — Verificação do controle de hover pelos VisuMZ

**Status do projeto:** em desenvolvimento.

**Pedido:** verificar se os próprios VisuMZ podem controlar o hover, evitando intervenção do DesignSystem onde já houver funcionalidade equivalente.

**Resultado:** os seis plugins instalados não expõem configuração equivalente ao destaque visual das linhas das opções. O `MouseCursor` do MainMenuCore troca a imagem do ponteiro. A seleção ao passar o mouse já é executada pelo MZ e habilitada/desabilitada pela preferência `uiHoverSelect` do OptionsCore. O DesignSystem observa esses estados e redesenha somente as linhas afetadas; não escolhe a seleção.

**Decisão:** manter a correção visual de hover acumulado no DesignSystem. Não houve alteração de plugins ou parâmetros nesta auditoria. A preferência de seleção por hover permanece independente do destaque visual de passagem.

**Verificação:** cabeçalhos e parâmetros das seis versões revisados; menu de opções exercitado em navegador isolado nas quatro combinações VisuMZ/DesignSystem ligados e desligados. Seleção por hover respeitou a preferência em todas; métodos compartilhados de seleção permaneceram iguais; nenhum erro JavaScript. Resultado em `.local-tools/visumz-review/hover-ownership.json`. A matriz e os limites desta verificação estão na [Interface Coreto](interface-coreto.md#auditoria-da-responsabilidade-pelo-hover--18102026).

## 18/10/2026 — Remoção de sobreposição com o status de batalha

**Status do projeto:** em desenvolvimento.

**Pedido:** revisar as demais funcionalidades do DesignSystem, remover as sobreposições com os seis VisuMZ e configurar o estilo Coreto nos provedores.

**Falha confirmada:** o DesignSystem substituía a moldura e o fundo de `Window_BattleStatus`, desconsiderando a skin configurada no BattleCore. O caso falhou com o DesignSystem ligado e passou com ele desligado.

**Ajustes:**

- `Window_BattleStatus` e suas subclasses deixaram de receber decoração, redesenho de hover e ocultação do cursor pelo DesignSystem.
- Configurado `BattleCore → BattleLayout → StatusWindowSkinFilename = CoretoWindow`. Papel, moldura e seleção vêm da skin Coreto existente; não foi criado um recurso novo.
- Mantidos os controles oficiais de ocultar skin e fundo selecionável. O foco nativo continua visível mesmo quando o fundo selecionável está oculto.
- Materializadas as 35 entradas adicionais do schema oficial `BattleLayout` que não constavam no JSON inicial do parâmetro, preservando os valores existentes. A ferramenta de instalação repete essa expansão de forma explícita, sem alterar os demais grupos.
- Atualizados manifesto, verificação de fontes e patch dos provedores.

**Demais áreas:** layouts, comandos, ícones, fontes, cores, barras, rótulos e callbacks dos VisuMZ já estavam sob responsabilidade dos respectivos provedores. A revisão manteve no DesignSystem somente os acabamentos sem equivalente identificado nos seis plugins. A [matriz da auditoria](interface-coreto.md#auditoria-das-demais-sobreposições--18102026) registra cada grupo revisado, inclusive opções, diálogo, salvamento e pictures.

**Validação:** prioridade de skin, visibilidade e foco no NW.js com DesignSystem ligado/desligado; prioridade dos parâmetros dos seis VisuMZ no navegador; integração e regressão de hover no NW.js. Sem erros JavaScript nos casos testados. Fontes VisuMZ e saves existentes preservados. Recuperação em `.local-tools/provider-ownership-before/`; evidências em `.local-tools/visumz-review/`.

## 18/10/2026 — Opções com a estética do menu interno

**Status do projeto:** em desenvolvimento.

**Pedido:** suavizar o menu de opções para acompanhar o menu dentro do jogo, respeitando o design system Coreto e a prioridade dos plugins.

**Diagnóstico:** as opções ainda usavam linhas inteiras em roxo, texto creme e contornos em todas as alternativas, enquanto o menu interno já usava seleção lavanda com texto escuro. Os pictogramas das linhas também eram maiores que os desenhos do atlas.

**Ajustes:**

- Categorias, linhas e remapeamento agora usam seleção lavanda com contorno dourado e texto em tinta. Hover sem seleção tem contorno roxo; pressionar escurece o contorno. O redesenho continua restrito às linhas afetadas.
- Somente o valor ativo recebe superfície clara e contorno sutil, com confirmação em roxo. Alternativas inativas ficam sem caixas adicionais, mantendo as áreas de clique.
- Barras permanecem roxas sobre trilho neutro, sem inversão dourada ao selecionar a linha.
- Pictogramas das linhas reduzidos de 32 para 24 px, com transparência e alinhamento preservados. Fontes, escala tipográfica e tokens Coreto existentes foram mantidos.

**Responsabilidades:** controles gerados nos `DrawJS` do OptionsCore por `option-draw.js`; DesignSystem responsável apenas pelo acabamento das três classes de janela de opções/remapeamento. Seleção e ações continuam no MZ/OptionsCore. Os seis VisuMZ conservam seus parâmetros, fontes e posição prioritária. Esta entrada substitui o tratamento anterior de roxo/creme nas opções; o título conserva sua composição.

**Validação:** interações e regressão de hover no Edge e no NW.js 0.48.4, incluindo seleção por hover ligada/desligada, saída do ponteiro, rolagem, mudança de categoria, desativação, teclado, alternativas, barras, indisponibilidade e remapeamento. Capturas nativas conferidas. Verificados os 77 símbolos, transparência do atlas, hashes/ordem dos VisuMZ e prioridade de seus parâmetros. Nenhum erro JavaScript nos cenários executados.

**Preservação:** a comparação com a instalação inicial detectou saves/preferências atualizados antes desta revisão (03:19–03:22). Esses arquivos foram conservados; a conferência usa a cópia desta revisão, sem restaurar saves antigos. Recuperação em `.local-tools/options-refinement-before/`; capturas e resultados em `.local-tools/options-review/` e `.local-tools/visumz-review/`. Patch de manutenção atualizado em `tools/terminus-ui/provider-changes.patch`.

## 18/10/2026 — Contraste dos textos das opções em hover

**Status do projeto:** em desenvolvimento.

**Relato:** textos das linhas, como “Sempre correr”, sem contraste suficiente ao passar o mouse sobre o novo fundo claro.

**Causa confirmada:** os callbacks persistidos no `plugins.js` continham novamente o desenho anterior, que aplicava creme ao texto selecionado. O DesignSystem já usava lavanda. A reprodução no NW.js confirmou a combinação; o novo teste falhou com `#fff8eb` sobre `#eedff2`, contraste de 1,21:1. O arquivo de parâmetros havia sido regravado após a harmonização; não foi identificado qual processo fez essa gravação.

**Correção:** regenerados os desenhos do OptionsCore a partir de `option-draw.js`, mantendo tinta nos rótulos e roxo nos valores ativos. A alteração de parâmetros ficou restrita aos campos `DrawJS` das opções e seus títulos de seção. Nenhuma nova intervenção no DesignSystem ou nos fontes VisuMZ. Ordem dos plugins, demais parâmetros, título e saves preservados.

**Validação:** `verify-option-contrast.mjs` passou no navegador e no NW.js, medindo texto, fundo e opacidade em seis combinações de seleção/hover. Menor contraste medido: 9,02:1. Regressão nativa de hover sequencial, saída do ponteiro, rolagem, categorias e desativação também passou, sem erros JavaScript. Conferidos os 77 controles, transparência do atlas, hashes e parâmetros dos VisuMZ. Captura nativa revisada em `.local-tools/options-review/contrast-native.png`; resultados em `contrast-native.json` e `contrast-browser.json`. Backup em `.local-tools/option-contrast-before/`.

**Manutenção:** fechar editor/playtest antes de regenerar os parâmetros e reabrir o projeto para carregar a versão atual. A nova verificação de contraste complementa a de fundos, que não detectava texto claro indevido.

## 18/10/2026 — Persistência da correção no editor e no playtest manual

**Status do projeto:** em desenvolvimento.

**Relato:** o teste manual ainda apresentava creme sobre lavanda após a correção anterior.

**Investigação:** `plugins.js` continha novamente `const ink = selected ? colors.onAccent : ColorManager.normalColor();`. A lista de janelas do Windows mostrou o editor Terminus aberto, embora a consulta de processos no terminal restrito não o mostrasse. A consulta fora dessa restrição confirmou o processo. As verificações anteriores executavam o runtime isolado com o arquivo recém-gerado, mas não conferiam a gravação posterior pelo editor que mantinha a configuração antiga em memória. Portanto, aquelas verificações não confirmavam a resolução no fluxo manual do autor.

**Correção do fluxo:** criado backup de parâmetros, banco de dados e saves em `.local-tools/editor-contrast-before/`; encerrado o editor pela interface; confirmada sua ausência na lista de janelas; regenerados os desenhos; reaberto Terminus no RPG Maker. O editor passou a carregar os parâmetros atuais. Não foi acrescentada uma sobreposição de cores no DesignSystem nem alterado fonte VisuMZ.

**Conferência real:** salvo o projeto pelo editor e iniciado o playtest pelo botão da barra de ferramentas. Aberto o menu de opções pela tela de título; conferidos visualmente “Sempre correr” em seleção/hover e “Animações de batalha” em hover sem seleção, ambos com texto escuro sobre lavanda. O SHA-256 de `plugins.js` permaneceu `fdebf0c03aabf11b04f6695a355d8f506f1ca3ae3e5526958f35a9e257693a21` após salvar e iniciar o playtest. Editor e tela de opções foram deixados abertos para conferência do autor.

**Procedimento de manutenção:** alterações externas de parâmetros exigem encerramento confirmado pela interface e reabertura do editor antes de salvar/testar. Não considerar uma listagem vazia de processos no terminal restrito como prova de que o editor está fechado. A validação de entrega inclui a persistência após salvar e iniciar pelo editor, além do teste isolado de contraste.

## 18/10/2026 — IDR e capturas da interface atual

**Status do projeto:** em desenvolvimento.

**Pedido:** após confirmar manualmente que as opções estavam corretas, o autor solicitou prints da UI atual e um Interface Design Record em Markdown.

**Entrega:** [IDR-001 — Interface Coreto de Terminus](idr/IDR-001-interface-coreto.md), com contexto, decisões, paleta, tipografia, estados, responsabilidade dos plugins e galeria de 18 capturas nativas em 1280 × 720 px. Imagens e manifesto estão em `docs/terminus/idr/assets/IDR-001/`.

**Coleta:** sessão NW.js isolada com os plugins e recursos atuais. Dados de demonstração foram usados para povoar inventário, loja, salvamento, diálogo e batalha, sem definir conteúdo final da campanha. Parâmetros e saves do autor preservados. A janela de comandos de batalha foi capturada após terminar de abrir.

**Limites registrados:** confirmação de contraste das opções não tratada como aprovação integral da UI. O IDR descreve diferenças ainda observáveis, incluindo seleção roxa no salvamento, ícones nativos do banco, nome claro do interlocutor, comandos de diálogo em inglês e indicador `NEW!`. Nenhuma dessas áreas foi redesenhada neste pedido.

**Manutenção:** preservar IDR-001 e suas imagens como referência datada. Mudanças futuras de decisão ou aparência devem ser relacionadas em um novo registro. A documentação de interface aponta para o IDR; o manifesto identifica ambiente, parâmetros, fontes dos plugins e hashes dos PNGs.
