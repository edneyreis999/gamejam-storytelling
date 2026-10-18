# Interface Coreto

Status: em desenvolvimento.

Pedidos do autor e evolução das configurações: [Histórico de ajustes de design](historico-ajustes-design.md).

Referência visual datada, decisões e capturas: [IDR-001 — Interface Coreto de Terminus](idr/IDR-001-interface-coreto.md), de 18/10/2026.

Referência: guia Coreto 1.1, pacote 1.2.1, revisão `coreto-approved-2026-10-17-r2`, em `C:/projetos/coreto-design-system/coreto-style-guide-github/`.

## Título

O jogador usa esta tela para iniciar uma partida, continuar um save ou abrir opções. A composição considera leitura em monitor, com os portões nas laterais e a área clara central livre para título e comandos. O registro visual é de produto, com a arte fornecida pelo autor como fundo. Variação visual 2/10, movimento 1/10 e densidade 2/10: aplicação do sistema existente, sem nova animação.

- Arte indicada pelo autor: `C:/projetos/coreto-design-system/terminus-background-entrada.png`.
- Recurso do jogo: `rpg-maker/Terminus/img/titles1/Terminus_Entrada.png`, exportado em 1280 × 720. O original permanece intacto.
- Sistema do MZ: `title1Name = Terminus_Entrada`, segundo fundo vazio e desenho do nome ativado.
- CoreEngine → `MenuLayout/Title/drawGameTitle`: texto em maiúsculas com Cinzel Decorative (`CoretoCinzel`), 52 px, linha de 56 px, sem contorno. Duas chamadas a `bitmap.drawText` produzem o relevo: dourado Coreto `#edaa2f` deslocado 2 px à direita e 3 px abaixo, seguido por roxo Coreto `#552070` na posição original. O `fontBold = true` configurado pelo autor permanece ativo.
- `temrinus-banner.png` é apenas referência visual; não é importado nem carregado pelo jogo. O título continua usando `$dataSystem.gameTitle`.
- CoreEngine → `MenuLayout/Title/CommandRect`: janela de 320 px, centralizada, com altura calculada pelo provedor e margem inferior de 96 px.

A configuração usa os callbacks publicados do CoreEngine. Não requer mapa de título nem EventTitleScene.

Para ajustar o relevo, edite `goldOffsetX` e `goldOffsetY` no callback. `fontSize` controla o tamanho das letras e `y` a posição vertical. O negrito atual é sintetizado pelo canvas sobre a fonte Regular; para usar peso real, como orienta o guia, será necessário instalar e registrar a variante Bold.

## Ícones de opções

O atlas `img/system/IconSet.png` conserva as células originais 0–319. As células Coreto têm 32 × 32 px e desenho de 24 × 24 px com fundo transparente. O OptionsCore colore os pictogramas das categorias em tinta, inclusive na seleção clara; não há placa de papel atrás deles.

| Índice | Recurso Coreto |
| --- | --- |
| 320 | Settings |
| 321 | Audio |
| 322 | TextEffects |
| 323 | Menu |
| 324 | Save |
| 325 | Clock |
| 326 | Conversation |
| 327 | Language |
| 328 | Music |
| 329 | Ambience |
| 330 | Jingle |
| 331 | SoundEffects |

As categorias Geral, Áudio, Interface e Teste usam Settings, Audio, Menu e Debug. Nenhuma das 77 ações usa Settings como alternativa genérica. Os 50 pictogramas iniciais ocupam 336–385; oito desenhos da integração VisuMZ ocupam 386–393: voltar, mochila, status, elementos, chave, elmo, anel e formação. Fontes vetoriais em `tools/terminus-ui/icons/` e exportações em `img/system/TerminusUI_*.png`. As células 332–335 permanecem livres. O [manifesto](../../tools/terminus-ui/manifest.json) relaciona símbolos, rótulos, recursos e índices.

Nas linhas e categorias, os PNGs transparentes são coloridos em tinta. Os pictogramas das linhas são exibidos em 24 × 24 px, com a mesma escala visual das categorias e do menu interno. O atlas também é transparente. Os ícones foram desenhados em grade de 24 unidades, traço de 1,6 e terminações arredondadas, seguindo o vocabulário do pacote Coreto. O `ButtonSet.png` usa a mesma linguagem nas setas, confirmação, menu e ajustes numéricos; conserva o contrato nativo de 11 células por duas linhas de 48 px.

## Controles e composição

O jogador ajusta áudio, leitura e entrada em quatro categorias. Registro de produto; variação visual 2/10, movimento 1/10, densidade 5/10. A resolução de referência é 1280 × 720, com o redimensionamento proporcional do MZ. Não há tema escuro ou layout móvel separado.

- Rótulos: Outfit Medium, 22 px, linha de 28 px. Seções: Averia Libre, 32/40. Alternativas: Outfit Medium, 20/24. Explicações de indisponibilidade: Outfit Medium, 16/20.
- Papel `#f9eacf`, tinta `#360a0b`, roxo `#552070`, creme `#fff8eb`, dourado `#edaa2f`, borda `#704737` e desabilitado `#d3c7b4` vêm da receita aprovada em `tools/terminus-ui/theme.json`.
- Categorias, linhas e remapeamento usam seleção lavanda `#eedff2`, texto em tinta e contorno dourado. O hover sem seleção usa contorno roxo; pressionar usa contorno roxo escuro. As linhas padrão mantêm papel e contorno fino.
- Apenas a alternativa ativa tem superfície clara, contorno sutil e marca de confirmação em roxo. As demais permanecem sem caixa, conservando a área de clique de 44 px de altura. A alternativa ativa usa papel sobre a linha destacada e lavanda sobre a linha padrão.
- Barras têm trilho de 8 px e indicador de 10 × 18 px. O preenchimento permanece roxo sobre trilho neutro, inclusive durante seleção. O valor reserva largura suficiente para não comprimir “Instantâneo”. Cliques usam os incrementos permitidos pelos handlers originais; valores entre passos são ajustados ao próximo passo na direção do clique.
- Títulos de seção não aceitam foco nem cliques. Grupos vazios ficam ocultos. Foram removidas as linhas separadoras vazias.
- Teclado e controle usam as mesmas fontes e cores. O remapeamento mantém as restrições e a persistência originais, com instruções em português.

Os 77 `DrawJS` são gerados pela mesma fonte `tools/terminus-ui/option-draw.js`. Os callbacks de ação, disponibilidade, visibilidade, valor inicial e gravação/carregamento foram preservados. As opções de plugins ausentes continuam ocultas; a revisão visual não ativa funcionalidades opcionais. Escolher uma fonte de leitura continua permitido, mantendo a fonte da interface dos controles.

## Manutenção

Edite `tools/terminus-ui/options.mjs` para rótulos e associações de ícones, `icon-paths.mjs` para os traços, `theme.json` para a receita e `option-draw.js` para o desenho comum. O `manifest.json`, os SVGs, os PNGs e os parâmetros são saídas da geração. Os parâmetros continuam editáveis no gerenciador de plugins; uma nova geração substitui os campos visuais que administra.

Com o editor e o playtest fechados, execute na raiz do repositório, em um ambiente Node com `sharp` disponível:

```powershell
node tools/terminus-ui/build.mjs --coreto-cli C:/projetos/gamejam-vn-terror/coreto/tools/coreto/cli.mjs
```

Há alterações locais em `Coreto_1_OptionsCore.js`: títulos fora da navegação, tipografia das categorias/remapeamento e interação por posição dos controles. `Coreto_5_DesignSystem.js` passa a decorar também `Window_KeyRebinds`, corrigindo o contraste. O [patch dos provedores](../../tools/terminus-ui/provider-changes.patch) registra essas diferenças; não substitua esses arquivos por versões externas sem reconciliá-las. O gerador de parâmetros não reaplica o patch dos provedores.

Reabra o projeto após alterações externas. Confirme o encerramento do editor pela lista de janelas do Windows: a consulta de processos no terminal restrito desta sessão não mostrou o RPG Maker que continuava aberto. O editor mantém parâmetros em memória e pode gravar a versão antiga sobre `plugins.js`. Depois de regenerar, reabra, salve pelo editor e inicie o playtest por ele; confira que os callbacks continuam atuais. Reaplicar o preset com `--reapply` pode substituir callbacks personalizados; confira o dry-run antes.

## Estados e verificação

| Estado | Título e opções |
| --- | --- |
| Padrão | Papel e tinta nos comandos; nome do jogo sobre a arte. |
| Hover | Nas opções, fundo lavanda e contorno roxo quando a linha não está selecionada; texto e ícone em tinta. No título, tratamento original do preset. |
| Seleção/foco | Opções e remapeamento: lavanda, contorno dourado e tinta; confirmação em roxo distingue o valor ativo. Título: roxo e creme, preservados. |
| Pressionado | Clique ou setas atualizam o valor e redesenham o estado pelos handlers existentes. |
| Indisponível | Fundo próprio do preset e texto legível. Ajuda e posição das janelas explicam a dependência da organização personalizada. |
| Carregamento | Recursos locais carregados pelo ImageManager; o desenho é atualizado quando o ícone fica disponível. |
| Erro/espera | Remapeamento informa tecla reservada, espera por entrada ou ausência de controle; Esc cancela a espera. |
| Vazio | Seções sem ações visíveis não aparecem. |
| Confirmação | O próprio controle mostra o novo valor; não foi adicionada uma notificação extra. |

`tools/terminus-ui/verify-source.mjs` verifica os 77 símbolos, recursos, compilação dos callbacks, transparência do atlas e 58 desenhos distintos. Quando a cópia local anterior está disponível, compara ações/condições, configuração do título e pixels anteriores do atlas. `verify.mjs` usa Playwright e Edge em contexto isolado para verificar navegação que pula seções, cliques em alternativas/trilhos, limites, texto instantâneo, ferramentas de teste, remapeamento e retorno ao título. Use `--without-ds` para conferir execução sem o tema. Capturas ficam em `.local-tools/options-review/`.

A harmonização de 18/10/2026 mantém os desenhos dos controles nos 77 callbacks do OptionsCore. O DesignSystem limita a nova superfície clara a `Window_Options`, `Window_OptionsCategory` e `Window_KeyRebinds`; a seleção por mouse continua no MZ/OptionsCore. Não houve mudança de ordem, fontes ou parâmetros dos seis VisuMZ. Hover e interações passaram no navegador e no NW.js 0.48.4; a verificação de prioridade dos seis provedores também passou no navegador. Para comparar saves em uma revisão posterior, `verify-visumz.mjs --save-baseline <pasta>` aceita a cópia correspondente à revisão, sem exigir que o jogador mantenha as preferências e saves da instalação inicial.

`verify-option-contrast.mjs` mede as cores efetivamente desenhadas nos rótulos, alternativas e categorias, exigindo contraste mínimo de 4,5:1 nos estados padrão, selecionado e hover, com seleção por ponteiro ligada/desligada. Use `--native` para executar no NW.js. A regressão de 18/10/2026 detectou callbacks antigos gravados em `plugins.js`: texto creme sobre a nova superfície lavanda, com contraste de 1,21:1. Reaplicar os desenhos atuais do OptionsCore corrigiu o problema; o menor contraste medido passou a 9,02:1. O teste de fundos sozinho não detectava essa divergência entre parâmetros e fonte de geração.

As verificações em navegador passaram com Design System ligado e desligado, sem erros JavaScript. O contraste de tinta sobre papel é 14,69:1. A conferência visual usa 1280 × 720 e é complementada pelo playtest nativo. O canvas do MZ não oferece semântica HTML/ARIA: estes testes não equivalem a uma auditoria completa de acessibilidade ou a teste com leitor de tela. As ações de plugins ausentes tiveram sua configuração revisada, mas não foram exercitadas sem esses plugins.

## Integração VisuMZ — 18/10/2026

Os seis fontes foram copiados de `C:/projetos/projectX/frontend/js/plugins`, sem edição. Os parâmetros partiram dos defaults completos dos próprios cabeçalhos; mapas, banco de dados e configurações de projectX não foram importados. O [manifesto VisuMZ](../../tools/terminus-ui/visumz-manifest.json) registra versões, SHA-256 e cada alteração de apresentação. A instalação não modifica a campanha ou implementa o sistema narrativo de batalha.

Ordem ativa:

```text
Coreto_0_CoreEngine
VisuMZ_1_ElementStatusCore     1.26
VisuMZ_1_BattleCore            1.85
VisuMZ_1_EventsMoveCore        1.60
VisuMZ_1_ItemsEquipsCore       1.56
VisuMZ_1_MainMenuCore          1.26
VisuMZ_1_SkillsStatesCore      1.48
Coreto_1_MessageCore
Coreto_1_OptionsCore
Coreto_1_SaveCore
Coreto_2_ExtMessageFunc
Coreto_5_DesignSystem
```

O nome `SkillsStatesCore` tem **Skills** no plural. Não foram acrescentados os CoreEngine, MessageCore, OptionsCore ou SaveCore originais da VisuStella.

### Responsabilidade por propriedade

| Tela/propriedade | Responsável e configuração |
| --- | --- |
| Menu principal: comandos, rótulos, ícones, organização e tempo | MainMenuCore: `CommandList`, `CustomCmdWin`, `CommandWindowStyle`, `Playtime`. Tempo em 18 px evita colisão entre rótulo e contador. |
| Status: categorias, textos, ícones, fundos das tabelas e conteúdo | ElementStatusCore: `StatusMenu`, `StatusMenuList`, `DrawJS` e textos de apresentação dos conjuntos de características. Identificadores internos e regras permanecem originais. |
| Itens, equipamento e loja: disposição, categorias, comandos, informações e indicador de novidade | ItemsEquipsCore: `ItemScene`, `Categories`, `New`, `EquipScene`, `ShopScene`, `StatusWindow`. Categorias por ícone com rótulo na seleção, evitando comprimir nove nomes na mesma linha. `New/OffsetX=36` e `OffsetY=8` afastam “NOVO” do pictograma do item. |
| Batalha: comandos, largura, mensagens, combo, indicadores e nomes das opções | BattleCore: `BattleLayout`, `PartyCmd`, `ActorCmd`, `BattleLog`, `InBattleStatus`, `MultiTarget`, `ComboWindow`, `AutoBattle`, `HpGauge`. Largura dos comandos: 280 px. |
| Status de batalha: skin, moldura, fundo e cursor de seleção | BattleCore: `BattleLayout/StatusWindowSkinFilename = CoretoWindow`, `StatusWindowSkinHide = false`, `StatusWindowSelectableBackHide = false`. DesignSystem não decora `Window_BattleStatus` nem suas subclasses, incluindo a seleção de aliados. A skin fornece papel, moldura de tinta e seleção lavanda com contorno dourado. |
| Opções acrescentadas pela batalha: rótulos e alternativas de estilo | BattleCore fornece `StartName`, `StyleName`, `StyleOFF`, `StyleON` e `HpGauge/Name`. OptionsCore lê esses valores em tempo de execução; não mantém uma tradução concorrente. |
| Opções: categorias, pictogramas, controles, ações e persistência | Coreto OptionsCore: `Categories`, `DrawJS`, `Rebind`. O desenho mantém os handlers originais. |
| Seleção ao passar o mouse | RPG Maker MZ: `processTouch`/`onTouchSelect`; Coreto OptionsCore aplica a preferência `ConfigManager.uiHoverSelect` em `isHoverEnabled`. DesignSystem não decide a seleção. |
| Imagem do ponteiro do mouse | MainMenuCore: `MouseCursor`. Controla imagens de repouso/movimento e clique, com seus pontos de ancoragem; não controla o destaque dos itens. |
| Habilidades: custos, fontes, cores, estados, buffs e desenho de PV/PM/PT | SkillsStatesCore: `Skills`, `Costs`, `Gauge`, `States`, `Buffs`. Barras de 6 px e textos de 16 px nos callbacks `GaugeDrawJS`; atributos mecânicos preservados. |
| Eventos: métricas dos rótulos e ícones | EventsMoveCore: `Label` em 22/28 px, ícones de 24 px. Movimento e eventos usam os defaults completos. |
| Paleta compartilhada, transparência dos indisponíveis e moeda | Coreto CoreEngine: `Color` (incluindo `DamageColor`), `Window/TranslucentOpacity` (160), `Gold`. Esses valores são usados quando o provedor específico não oferece controle próprio. Dano/cura usam cores semânticas Coreto também nas informações de itens. |
| Fontes registradas e interpretação de códigos de texto | Coreto MessageCore; os VisuMZ escolhem fonte/tamanho onde expõem essa configuração. |
| Moldura e superfície comuns, contorno de foco/hover e lacunas de opções | DesignSystem, exceto no status de batalha controlado pelo BattleCore. Não substitui cores, opacidade, fontes ou callbacks das telas dos seis VisuMZ. Nas demais listas dessas telas, a seleção usa superfície clara e borda dourada, preservando as cores semânticas desenhadas pelo provedor. |
| Setas e botões nativos de toque | `ButtonSet.png`, gerado de `icons/touch-buttons.svg`; dimensões e regiões de clique originais. |

`Playtime/WindowRect` é utilizado no layout vertical padrão do MainMenuCore. O layout horizontal reorganiza essa janela internamente; por isso o ajuste aplicado ao contador usa `Playtime/FontSize`. A verificação de prioridade exercita o callback no layout em que ele é suportado.

### Correções dos bugs relatados

**Hover acumulado:** reproduzido no NW.js com uma linha anterior ainda roxa após mudança de seleção. O OptionsCore mantém uma referência de `select` capturada antes do DesignSystem, portanto interceptar apenas `Window_Selectable.select` não cobria todos os caminhos. O DesignSystem agora acompanha o índice selecionado anterior e atual em seu ciclo de atualização, junto ao hover. Só redesenha as linhas afetadas quando o estado muda. A saída do ponteiro, a desativação e a invisibilidade removem o hover. Não há repintura contínua da janela inteira nem atraso artificial.

**Ícones opacos:** o gerador removia a transparência ao compor cada célula sobre papel. `build.mjs` agora gera células transparentes, inclusive 320–331, mantendo todos os índices. O OptionsCore tinge somente os pictogramas das categorias conforme o texto; as células 0–319 permanecem idênticas por comparação de pixels.

### Auditoria da responsabilidade pelo hover — 18/10/2026

Foram revisados os cabeçalhos e parâmetros das seis versões instaladas. Nenhuma expõe configuração equivalente ao destaque visual e à limpeza do fundo das linhas do menu de opções. O `MouseCursor` do MainMenuCore personaliza a imagem do ponteiro sobre o jogo; não é o cursor de seleção da janela nem o fundo do botão.

A seleção por movimento do mouse já pertence ao RPG Maker MZ, respeitando `uiHoverSelect` pelo OptionsCore. O DesignSystem observa o item apontado e a seleção existente para desenhar os estados Coreto. Seu acabamento substitui visualmente o cursor de seleção da janela; não substitui os handlers que escolhem o item. Desligar a preferência de **seleção** por hover impede que o foco acompanhe o ponteiro, mas mantém o destaque visual de passagem enquanto o DesignSystem estiver ativo.

A auditoria executou o menu de opções em navegador isolado nas quatro combinações dos seis VisuMZ ligados/desligados e DesignSystem ligado/desligado. Em todas, mover o ponteiro da linha 1 para a 2 selecionou a linha 2 com `uiHoverSelect=true` e manteve a linha 1 com `false`. Os corpos de `Window_Selectable.processTouch`, `isHoverEnabled`, `onTouchSelect` e `select` foram iguais nas quatro execuções; não houve erros JavaScript. Evidência local: `.local-tools/visumz-review/hover-ownership.json`; roteiro: `.local-tools/audit-hover-ownership.mjs`.

Não foi encontrada uma configuração desses seis VisuMZ para receber a correção visual do hover acumulado. Portanto, esta auditoria mantém a correção no DesignSystem e não altera plugins ou parâmetros. O resultado se limita às versões instaladas e ao fluxo das opções; não afirma que outros plugins ou versões da VisuStella não possam oferecer recursos adicionais. A correção visual já possui a validação nativa registrada acima; esta comparação de responsabilidade foi executada no navegador.

### Auditoria das demais sobreposições — 18/10/2026

**Escopo:** intervenções do `Coreto_5_DesignSystem` comparadas aos parâmetros e schemas públicos das seis versões instaladas. O objetivo é manter a interface Coreto legível ao navegar pelos menus e escolher ações, com um responsável por propriedade. A apresentação aprovada continua sendo a referência; não foram criados tokens, animações ou um novo layout.

**Falha reproduzida e removida:** mesmo com uma skin configurada no BattleCore, `_refreshBack` e `_refreshFrame` do DesignSystem substituíam as texturas de `Window_BattleStatus`. O teste falhava com DesignSystem ligado e passava com ele desligado. A janela e suas subclasses agora ficam fora da decoração do DesignSystem: moldura, fundo, redesenho de estados e ocultação do cursor. O BattleCore usa `CoretoWindow` pelo parâmetro oficial; o foco utiliza o cursor da skin, inclusive quando o provedor oculta os fundos selecionáveis. O controle `StatusWindowSelectableBackHide` já funcionava e foi preservado.

| Área revisada do DesignSystem | Equivalente nos seis VisuMZ / resultado |
| --- | --- |
| Texturas de moldura e fundo do status de batalha | **Migrado:** `BattleLayout/StatusWindowSkinFilename`. Retirada a substituição de texturas pelo DesignSystem. |
| Estado visual e cursor do status de batalha | **Retirada a intervenção:** cursor nativo da skin e fundos controlados pelo BattleCore. `StatusWindowSkinHide` e `StatusWindowSelectableBackHide` continuam prioritários. |
| Molduras e superfícies das outras janelas; cartão de ajuda | Nenhum dos seis oferece uma skin específica equivalente para essas janelas. Mantido o acabamento no DesignSystem. Os controles de tipo de fundo dos provedores continuam responsáveis por normal/escurecido/transparente. |
| Cores de texto, fontes e opacidade de indisponíveis | Já protegidas nas telas dos seis VisuMZ; mantidos os parâmetros/callbacks nos provedores e a paleta global no CoreEngine. |
| Layout, dimensões, categorias e comandos do menu | Já pertencem a MainMenuCore, ItemsEquipsCore, ElementStatusCore, SkillsStatesCore e BattleCore. DesignSystem não redefine seus retângulos ou listas. |
| Fundos internos das tabelas de atributos e equipamentos | `BackRectColor`/`DrawBackRect` dos provedores já configurados. São fundos do conteúdo, distintos da moldura da janela; não foram substituídos por outro desenho. |
| Barras, custos, estados e buffs | SkillsStatesCore já controla os callbacks, fontes e cores; sem implementação concorrente de barras no DesignSystem. |
| Rótulos/ícones sobre eventos e personagens | EventsMoveCore; sem intervenção correspondente do DesignSystem. |
| Hover das demais listas e contraste das opções | Sem configuração equivalente nos seis instalados; mantida a correção do hover, conforme auditoria anterior. |
| Geometria das opções, ícones e controles de valores | Os seis não implementam a tela de opções. OptionsCore mantém conteúdo/handlers; DesignSystem mantém somente suas lacunas documentadas. |
| Botão de voltar e setas de rolagem | Sem equivalente nos seis; `MouseCursor` do MainMenuCore configura o ponteiro, não esses botões. Mantidos os recursos e estados existentes. |
| Diálogo, nome do falante, escolhas, continuação e edição de nome | Sem equivalente nos seis. Mantidas as integrações existentes com MessageCore/ExtMessageFunc. |
| Salvamento e seus cartões | Sem equivalente nos seis; SaveCore continua responsável pelos dados e callbacks configurados. |
| Pictures e biblioteca de componentes | Decoração optativa por papéis; não alcança os retratos do MainMenuCore nem as imagens de batalha dos VisuMZ. Mantida. |
| Registro de fontes e carregamento de ícones | Sem substituição de configuração de um dos seis; MessageCore e ImageManager permanecem responsáveis pelo carregamento. |

O JSON de default do parâmetro `BattleLayout` omitia 35 entradas declaradas no schema `struct~BattleLayout`, incluindo o nome da skin. O leitor de parâmetros passou a permitir a expansão explícita de schemas; instalação e verificação expandem somente `BattleLayout`, preservando os valores já fornecidos. Isso torna os controles visuais oficiais editáveis e reproduzíveis. Os demais grupos não são expandidos indiscriminadamente. A expressão anterior “defaults completos” refere-se aos valores declarados no JSON inicial dos parâmetros; não significava que todos os campos adicionais de todos os schemas haviam sido materializados.

**Configuração aplicada:** `VisuMZ_1_BattleCore → Battle Layout Settings → Status Window Elements → Window Skin → Filename = CoretoWindow`. Ocultar skin e ocultar fundo selecionável permanecem desligados no projeto; os testes os alteram apenas nas cópias isoladas. Não houve mudança de regras de combate, movimento, mapas, banco de dados ou arquivos de origem dos VisuMZ.

**Verificação:** `verify-provider-surfaces.mjs` reproduziu a falha antes da correção. Depois, o NW.js confirmou skin e foco com DesignSystem ligado/desligado, além de skin oculta com DesignSystem ligado. `verify-priority.mjs` confirmou novamente os parâmetros dos seis provedores no navegador. `verify-integration.mjs --native` cobriu menus, itens, equipamento, habilidades, status, loja, save/load isolado, movimento e batalha; `verify-hover.mjs --native` confirmou os estados de hover das opções. Sem erros JavaScript nesses testes. Captura nativa da batalha inspecionada em 1280 × 720; não se trata de uma auditoria completa de acessibilidade do canvas.

Recuperação desta revisão: `.local-tools/provider-ownership-before/`. Evidências: `.local-tools/visumz-review/provider-surfaces-*.json`, `priority-browser-on.json`, `integration-native.json` e `hover-native.json`. O manifesto e o patch dos provedores foram atualizados.

### Defaults, manutenção e recuperação

Foram mantidos os defaults técnicos autorizados: movimento diagonal com colisão estrita, inclinação ao correr, sombras, regras de dano, reaplicação e duração de estados/buffs, custos e sequências de batalha. As opções de combate automático e barra de vida ficam disponíveis conforme as condições originais. Essas configurações não significam que a campanha de Terminus já esteja implementada.

Com editor/playtest fechados, a instalação é reproduzível com:

```powershell
node tools/terminus-ui/install-visumz.mjs C:/projetos/projectX/frontend/js/plugins
node tools/terminus-ui/build.mjs --coreto-cli C:/projetos/gamejam-vn-terror/coreto/tools/coreto/cli.mjs
```

O instalador reaplica **defaults + apresentação documentada** aos seis plugins; não o execute sobre ajustes manuais que ainda não tenham sido incorporados a `visumz-presentation.mjs`. O gerador de ícones/controles administra seus campos visuais. Nenhum dos dois reaplica o patch de código dos provedores Coreto.

A cópia recuperável anterior à integração está em `.local-tools/visumz-before/` (JavaScript, recursos de sistema, saves e ferramentas). Os testes nativos usam diretórios próprios em `.local-tools/`, com saves separados. `config.rmmzsave`, `file0.rmmzsave` e `global.rmmzsave` do projeto foram comparados por SHA-256 e preservados. O título e sua arte também permanecem como configurados anteriormente.

### Evidências e repetição dos testes

| Verificação | Resultado / ferramenta |
| --- | --- |
| Seis fontes originais, versões, hashes, ordem, defaults completos e alterações documentadas | `verify-visumz.mjs`; inclui preservação dos saves e do título. |
| Atlas transparente, células originais e 58 pictogramas distintos | `verify-source.mjs`. |
| Hover sequencial com preferência ligada/desligada, saída, rolagem, categoria, desativação e seleção | `verify-hover.mjs --native`; aprovado no NW.js 0.48.4 / Chromium 85. |
| Teclado, clique, limites, controles condicionais, remapeamento e retorno ao título | `verify.mjs --native`; aprovado sem erros. Remapeamento inclui espera/cancelamento e estado sem gamepad conectado. |
| Opções de batalha gravadas/recarregadas, uso/consumo de poção, troca de equipamento, habilidades, todas as categorias de status, compra, save/load, movimento diagonal e opções dentro da batalha | `verify-integration.mjs` e `--native`; aprovado. |
| Prioridade efetiva de parâmetros e callbacks | `verify-priority.mjs`, com `--native` e/ou `--without-ds`; quatro combinações aprovadas. Valores temporários nunca são gravados no projeto. |

O teste de prioridade confere pixels, fonte, tamanho e cor de um callback de status; retângulo/rótulo do menu; largura/fonte de itens; largura de batalha; rótulo de batalha chegando às opções; métricas de eventos, cor de custo e opacidade de indisponíveis. O DesignSystem ligado conserva os mesmos valores observados com ele desligado.

Capturas e resultados JSON ficam em `.local-tools/visumz-review/` e `.local-tools/options-review/`. São evidências locais, regeneráveis pelos scripts. A conferência foi feita em 1280 × 720; não houve teste com controle físico conectado. A revisão cobre os recursos instalados e os casos registrados, não todas as combinações possíveis de notetags dos plugins.
