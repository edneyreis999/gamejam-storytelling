# Mapa de Terminus — tela única

**Status: em desenvolvimento.** Protótipo visual de navegação da campanha, fora do RPG Maker. Os 14 destinos estão disponíveis para avaliação; isso não define acesso, bairros, geografia ou progressão da campanha. A tela de Novo jogo / Continuar / Opções permanece fora desta entrega.

## Abrir e explorar

Abra [index.html](index.html) no navegador, mantendo a estrutura de pastas do projeto. Não há servidor, instalação ou dependência de rede. As fontes e os fundos são locais.

- A cidade inteira aparece em uma tela. Não há câmera, arrasto de navegação, setas laterais ou indicador de deslocamento.
- Passe o ponteiro por uma fachada para ver seu nome e fundos disponíveis no rodapé. Clique para visitar.
- No toque, o primeiro toque seleciona e o segundo toque no mesmo destino visita. Um deslocamento maior que 8 pixels cancela a ativação, sem mover a cidade.
- Tab e Shift+Tab percorrem os controles. As quatro setas escolhem o destino pela posição espacial; Enter ou Espaço visita.
- Clicar ou tocar no terreno limpa a seleção. Esc também limpa quando nenhuma prévia está aberta.
- Na prévia, os controles inferiores alternam os fundos. **Voltar à cidade** ou Esc restaura o destino e o foco de origem. O diálogo restringe o foco aos seus controles.
- **Retornar ao Coreto**, no alto à esquerda, abre a prévia da Noite da História.

## Composição

A composição fixa tem **1280 × 720 unidades**, com rodapé estável de **96 unidades**. Em telas horizontais, o conjunto recebe uma escala uniforme para caber na janela. Em orientação vertical ou quando a escala fica abaixo de 40%, uma mensagem pede para girar o dispositivo ou ampliar a janela; o mapa fica oculto e inerte.

As fachadas ocupam três planos escalonados, com ruas entre eles, entradas desimpedidas e espaço para sombras e pegadas. Suas posições foram ajustadas pelas bases visíveis e entradas, descontando as margens transparentes dos PNGs, para acompanhar as bordas e ramificações dos caminhos de pedra. Virmura, coliseu e espaço de treino foram preservados como referências de encaixe. O fundo mantém solo claro, perspectiva elevada de três quartos, tinta preta e bege, hachuras e luz diurna vinda do alto à esquerda. As pequenas construções secundárias do fundo não duplicam os destinos.

| Conjunto de interface | Destinos |
| --- | --- |
| Esquerda | Estalagem de Nyra, mercado, boticário, casa de contratos e mapas |
| Centro | Virmura, Borun, Sevrak, espaço de treino |
| Direita | Quarta guilda, coliseu, oficina, cisterna, minas |
| Aba superior esquerda | Retorno ao Coreto / Noite da História |

Esses conjuntos organizam a interface, sem estabelecer geografia narrativa. O canto superior direito reserva **96 × 72 unidades**, sem controles ou destinos, para o futuro menu do RPG Maker. A aba de papel do Coreto mede 192 × 160 unidades, com margem de 16 unidades; sua superfície e sombra evidenciam outro plano narrativo. O coreto recortado não tem camafeu ou vegetação de moldura.

## Estados e identidade Coreto

Registro **Product**: variação visual **3/10**, movimento **1/10**, densidade **3/10**. Controles usam Outfit Medium; títulos usam Averia Libre. As receitas seguem o [style guide local do Coreto](../../../../../coreto-design-system/coreto-style-guide-github/docs/index.html), incluindo superfícies, bordas, espaçamentos e estados. O [tema local](../../../../tools/terminus-ui/theme.json) permanece como referência de integração futura.

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
| Hover | Fachada ampliada em 4%, halo e duas pegadas violetas; nome e fundos no rodapé |
| Saída do hover | Remove o destaque temporário; restaura a seleção mantida ou o estado vazio |
| Foco por teclado / primeiro toque | Fachada ampliada em 4%, halo e pegadas douradas, com seleção mantida |
| Hover sobre outra fachada | Substitui visualmente a seleção mantida; nunca há dois destaques principais |
| Terreno / Esc fora da prévia | Limpa a seleção e o foco da fachada |
| Deslocamento durante o gesto | Cancela a visita; não desloca o mapa |
| Carregamento da cidade | Fachadas indisponíveis até o fundo e as 14 imagens carregarem |
| Falha na cidade | Lista imagens ausentes e oferece **Carregar novamente**; destinos permanecem indisponíveis |
| Carregamento de fundo | Mensagem explícita e retorno disponível |
| Falha no fundo | Nome do fundo, orientação e ação para repetir; não mantém uma imagem anterior como se fosse a nova |
| Fundo pronto | Imagem completa, sem recorte; controle local selecionado com visto e `aria-pressed` |

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

## Verificação

[Relatório da tela única](verificacao/tela-unica/resultados.json): **81 verificações aprovadas** em Edge/Chromium, abrindo os arquivos locais. Cobrem enquadramento integral, separação dos alvos e marcadores com zoom, reserva superior direita, sombra independente, zoom de hover e seleção, preferência por movimento reduzido, teclado, toque emulado, cancelamento após deslocamento, os 14 destinos e 19 fundos, transparências, troca rápida de fundos, retorno das prévias e recuperação de imagens ausentes.

Foram verificadas as resoluções **1280 × 720**, **1920 × 1080** e **844 × 390**, além de **390 × 844** para a orientação vertical. Alvos têm dimensões mínimas de 44 × 44 px nas resoluções horizontais testadas. Contrastes: tinta/papel **14,69:1**, primário **10,88:1**; demais valores estão no relatório. As capturas foram revisadas para encaixe das bases, caminhos, hachuras, sombras, marcadores e nomes longos.

- [Cidade em 1280 × 720](verificacao/tela-unica/cidade-1280.png) e [1920 × 1080](verificacao/tela-unica/cidade-1920.png).
- [Hover violeta](verificacao/tela-unica/hover-violeta.png) e [foco dourado](verificacao/tela-unica/foco-dourado.png).
- [Prévia do coliseu](verificacao/tela-unica/previa-coliseu.png).
- [Verificação do alfa](verificacao/alpha.json).

[verify.mjs](verify.mjs) usa Node, Playwright e Edge do ambiente de autoria. Execute `node verify.mjs` com Playwright disponível na resolução de módulos (`NODE_PATH`, se necessário). Não instala pacotes nem modifica o RPG Maker. Os resultados anteriores em `verificacao/` são históricos da composição panorâmica; os atuais ficam em `verificacao/tela-unica/`.

Limites da validação: **toque emulado, sem aparelho físico; sem sessão manual de leitor de tela**. A arte e a composição seguem em desenvolvimento para avaliação do autor. Não há missões, desbloqueios, salvamento de campanha ou integração com o runtime do jogo.

## Referências

- [Visão do jogo](../../visao-do-jogo.md), para preservar escopo e separação narrativa do Coreto.
- [Hamlet de Darkest Dungeon](https://darkestdungeon.wiki.gg/wiki/Hamlet), referência inicial de navegação por construções.
- `C:\projetos\gamejam-vn-terror\rpg-maker\The Dryland Drowned\game.rmmzproject`, referência de escolhas por imagens. Nenhum plugin ou configuração foi importado.
- Fundos de Terminus já produzidos, para materiais e acabamento. `docs/docs_externas/` permanece apenas como referência, sem aprovação narrativa implícita.
