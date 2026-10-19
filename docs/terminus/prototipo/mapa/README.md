# Mapa integrado de Terminus

Status: em desenvolvimento.

Abra o [protótipo jogável](../index.html). A exploração abre após Q-A1; as construções visitam os locais reais da campanha e o portal retorna à Noite da História. A composição é de interface e não estabelece geografia narrativa.

Clique para visitar. No toque, selecione e toque novamente no mesmo destino; deslocar o dedo cancela a visita. Tab e setas navegam, Enter/Espaço visita. Voltar ao mapa restaura seleção e foco. Esc ou um toque no terreno limpa o destaque.

Os indicadores representam missões (incluindo recrutamento e revanche), convites e intervenções compráveis com o saldo atual. Cada categoria ocupa um pictograma; múltiplas ações acrescentam a quantidade. A legenda é textual e o nome acessível do destino enumera as atividades. O rodapé apresenta a primeira ação na ordem do local e a quantidade de outras ações. Violeta e dourado ficam reservados à interação.

`engine.js` determina disponibilidade com `locationActivities`; o componente visual não decide progressão. Os marcadores são derivados do estado e não acrescentam campos ao save. Os IDs `quarta` e `coreto` correspondem aos IDs históricos da campanha. Deslocamentos antigos continuam válidos no replay V3, sem mover a nova composição.

## Composição

A composição fixa tem **1280 × 720 unidades**, com rodapé de referência de **96 unidades** e mínimo de **64 px**. Em telas horizontais, as artes recebem escala uniforme; textos e controles mantêm medidas legíveis. Em orientação vertical ou quando a escala fica abaixo de 40%, uma mensagem pede para girar o dispositivo ou ampliar a janela; o mapa fica oculto e inerte.

As fachadas ocupam três planos escalonados, com ruas entre eles, entradas desimpedidas e espaço para sombras e pegadas. Suas posições foram ajustadas pelas bases visíveis e entradas, descontando as margens transparentes dos PNGs, para acompanhar as bordas e ramificações dos caminhos de pedra. Virmura, coliseu e espaço de treino foram preservados como referências de encaixe. O fundo mantém solo claro, perspectiva elevada de três quartos, tinta preta e bege, hachuras e luz diurna vinda do alto à esquerda. As pequenas construções secundárias do fundo não duplicam os destinos.

| Conjunto de interface | Destinos |
| --- | --- |
| Esquerda | Estalagem de Nyra, mercado, boticário, casa de contratos e mapas |
| Centro | Virmura, Borun, Sevrak, espaço de treino |
| Direita | Quarta guilda, coliseu, oficina, cisterna, minas |
| Aba superior esquerda | Retorno ao Coreto / Noite da História |

Esses conjuntos organizam a interface, sem estabelecer geografia narrativa. O canto superior direito contém o menu compacto do protótipo; a área foi reservada na composição original. A aba de papel do Coreto mede 192 × 160 unidades, com margem de 16 unidades; sua superfície e sombra evidenciam outro plano narrativo. O coreto recortado não tem camafeu ou vegetação de moldura.

## Estados e identidade Coreto

Registro **Product**: variação visual **3/10**, movimento **1/10**, densidade **4/10**. Controles usam Outfit Medium; títulos usam Averia Libre. As receitas seguem o [style guide local do Coreto](../../../../../coreto-design-system/coreto-style-guide-github/docs/index.html), incluindo superfícies, bordas, espaçamentos e estados. O [tema local](../../../../tools/terminus-ui/theme.json) permanece como referência de integração futura.

| Papel | Valor |
| --- | --- |
| Papel / painel | `#F8E9CC` / `#F9EACF` |
| Tinta / borda | `#360A0B` / `#704737` |
| Ação primária / hover / pressionado | `#552070` / `#6D3185` / `#4D1D6B` |
| Texto sobre ação | `#FFF8EB` |
| Hover secundário | Superfície `#EEDFF2`, contorno `#8224AD` |
| Hover da fachada | Violeta `#8224AD`, halo a 50% |
| Foco / seleção mantida | Dourado `#EDAA2F`, halo a 65% |
| Indisponível | Superfície `#D3C7B4` |

Botões comuns usam raio de 6 px, painéis 10 px, espaçamentos de 4/8/12/16/24/32 px e foco de 2 px com afastamento de 3 px. Ações usam 20/24 px; títulos, 32/40 px. As prévias adaptam controles a janelas horizontais menores mantendo alvos de pelo menos 44 × 44 px.

| Estado | Apresentação e comportamento |
| --- | --- |
| Inicial / sem seleção | Sem halo ou pegadas; rodapé mostra somente “Escolha seu próximo destino” |
| Hover | Fachada ampliada em 4%, halo e duas pegadas violetas; nome e atividades no rodapé |
| Saída do hover | Remove o destaque temporário; restaura a seleção mantida ou o estado vazio |
| Foco por teclado / primeiro toque | Fachada ampliada em 4%, halo e pegadas douradas, com seleção mantida |
| Hover sobre outra fachada | Substitui visualmente a seleção mantida; nunca há dois destaques principais |
| Terreno / Esc fora da legenda | Limpa a seleção e o foco da fachada |
| Deslocamento durante o gesto | Cancela a visita; não desloca o mapa |
| Carregamento da cidade | Fachadas indisponíveis até o fundo e as 14 imagens carregarem |
| Falha na cidade | Lista imagens ausentes e oferece **Carregar novamente**; destinos permanecem indisponíveis |
| Carregamento de fundo | Mensagem explícita e retorno disponível |
| Falha no fundo | Nome do fundo, orientação e ação para repetir; não mantém uma imagem anterior como se fosse a nova |
| Fundo pronto | Cenário da campanha e lista das atividades disponíveis |

As pegadas são duas solas de botas desenhadas em SVG, com preenchimento conforme o estado e contorno escuro para legibilidade, sem placa ou moldura retangular. Nome e marcador complementam a cor. O retorno ao Coreto é um único botão acessível; toda a aba de papel pertence ao alvo.

**Extensões específicas deste mapa, solicitadas pelo autor:** halos nas silhuetas, sombras das fachadas, sombra da aba e zoom de interação. A sombra permanente usa uma camada independente, preta a **38%**, deslocada **6 × 8 unidades para sudeste**, com desfoque de **4 unidades**, reforçando o aspecto de botão destacado do terreno. O halo é aplicado somente à fachada; selecionar não colore nem amplia a sombra. O zoom de **1,04×** acontece imediatamente no hover e na seleção, ancorado no centro inferior para manter a base junto à rua. Fachada e recorte clicável recebem a mesma transformação; sombra e pegadas permanecem estáveis. A preferência por movimento reduzido desativa o zoom e preserva halo, pegadas e nome. Não há pulsação, transição ou animação decorativa. Esta revisão substitui a orientação anterior de não ampliar as fachadas.

## Artes, versões e manifesto

As artes estão em [assets/terminus/mapa](../../../../assets/terminus/mapa/). Esta revisão seleciona **cidade-v2.png** para o terreno e **portal-v3.png** para o botão do Coreto: uma ilustração colorida com Reed em primeiro plano, baseada em `C:\projetos\gamejam-vn-terror\rpg-maker\The Dryland Drowned\img\pictures\Reed final.png`. Madeira e lanternas recebem cores quentes; cabelo e barba brancos, tapa-olho e roupa vermelha e dourada seguem a referência indicada pelo autor. A cor distingue a moldura narrativa da cidade em preto e bege. A imagem tem transparência real e não inclui camafeu, moldura ou texto. Essa composição é específica do botão. As 13 fachadas físicas foram reutilizadas: mercado e boticário usam v2, as demais v1. As versões anteriores do panorama e do portal foram preservadas.

O [registro de prompts](prompts.json) guarda prompts completos, referências, arquivos originais, versões e seleção. As artes do terreno e do portal foram geradas com `image_gen` integrado. O prompt do terreno registra o planejamento inicial; as posições atuais estão no manifesto. O ajuste de alinhamento, sombra e zoom reutiliza as artes selecionadas. O [registro dos fundos existentes](../../arte/locais/prompts.json) continua sendo a fonte dos 19 cenários reutilizados.

| Destino | Fundos disponíveis |
| --- | --- |
| Estalagem de Nyra | Salão, pátio |
| Mercado de provisões | Banca de Jorvi |
| Boticário | Loja |
| Casa de contratos e mapas | Sala de consulta |
| Guilda de Virmura | Recepção, enfermaria |
| Guilda de Borun | Salão de preparação |
| Guilda de Sevrak | Sala de estudos |
| Espaço de treino | Pátio de treino |
| Quarta guilda veterana | Recepção |
| Coliseu | Entrada, arena, serviço |
| Oficina de Durn | Oficina |
| Cisterna em obras | Obras |
| Entrada das minas | Entrada, galeria |
| Retornar ao Coreto | Coreto / Noite da História |

[manifest.js](manifest.js) centraliza destinos, imagens, posições, dimensões, áreas clicáveis e fundos. Usa script comum para funcionar em `file://`, sem `fetch` ou módulos de rede. Não contém estado de câmera.

Para editar a composição, altere `PLACES` em [build-manifest.py](build-manifest.py) e regenere o manifesto com Python e Pillow. Essa ferramenta de autoria não é necessária para abrir o protótipo. Ela lê o alfa sem modificar as artes: uma célula da malha de 128 × 128 só entra no recorte quando todos os seus pixels têm alfa ≥ 200. Vazios internos também são excluídos. O recorte SVG limita o botão HTML da fachada e acompanha seu zoom; sombras, halos e pegadas não ampliam o alvo. A discretização pode deixar uma estreita borda não clicável. A aba do Coreto usa sua própria superfície como alvo, conforme a composição da interface.

## Verificação e manutenção

Os testes atuais são [map.test.cjs](../tests/map.test.cjs) e [browser.cjs](../tests/browser.cjs). Execute-os pela [instrução do protótipo](../README.md#executar-testes-e-relatórios). As evidências novas ficam em `.artifacts/terminus-prototipo/`, fora de `coreto/`. Consulte [VERIFICACAO-MAPA.md](../VERIFICACAO-MAPA.md) para os resultados desta integração.

A pasta [historico](historico/) preserva as capturas e relatórios anteriores, sem apresentá-los como testes da campanha integrada. O [relatório da antiga tela única](historico/tela-unica/resultados.json) registra 81 verificações da navegação visual isolada. As imagens da raiz de `historico/` correspondem à composição panorâmica anterior.

Para regenerar a geometria, na raiz do repositório, execute `python docs/terminus/prototipo/mapa/build-manifest.py` em um ambiente com Pillow. O gerador atualiza `manifest.js` e grava a auditoria de alfa em `.artifacts/terminus-prototipo/alpha.json`; não modifica PNGs. O manifesto versionado permite abrir o jogo sem Python ou build.

Toque é emulado; aparelho físico, leitor de tela, aceite artístico e playtest humano continuam exigindo avaliação própria. A [visão do jogo](../../visao-do-jogo.md) é a fonte de escopo e narrativa.
