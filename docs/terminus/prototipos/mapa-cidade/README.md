# Mapa panorâmico de Terminus

**Status: em desenvolvimento.** Protótipo visual de navegação da campanha, fora do RPG Maker. Todos os destinos estão disponíveis para avaliação; isso não define acesso, bairros, geografia ou progressão da campanha. A tela de Novo jogo / Continuar / Opções não faz parte desta entrega.

## Abrir e explorar

Abra [index.html](index.html) no navegador, mantendo a estrutura de pastas do projeto. Não há servidor, instalação, dependência de rede ou alteração no RPG Maker. As fontes e os fundos são lidos dos arquivos locais existentes.

- Arraste a cidade, use os controles laterais ou role horizontalmente pelo mouse/trackpad. Shift + rolagem vertical também desloca a câmera. Aproximar o ponteiro da borda não move a cidade.
- Passe o ponteiro por uma fachada para identificá-la na faixa inferior. Clique na fachada ou em **Visitar** para abrir os fundos.
- No toque, o primeiro toque identifica; o segundo toque no mesmo destino visita. Arrastar sobre uma fachada não conta como visita.
- Tab e Shift+Tab percorrem os controles. Nas fachadas, as quatro setas escolhem o destino na direção correspondente e a câmera revela o foco. Enter ou Espaço visita.
- Na prévia, escolha um fundo pelos controles inferiores. **Voltar à cidade** ou Esc restaura a câmera e o destino. O diálogo restringe o foco aos seus próprios controles enquanto está aberto.

O portal fica na moldura, independente do deslocamento da cidade. O coreto aparece dentro dele, preservando a separação entre a Noite da História e Terminus.

## Composição

Janela de referência: **1280 × 720**. Mundo: **2160 × 720** unidades. Em telas largas, o conjunto mantém a proporção 16:9 e a escala uniforme. Em telas estreitas, a janela ocupa a altura disponível e mostra uma fatia menor do mesmo panorama, preservando o tamanho legível das fachadas e dos controles. Nenhuma ilustração é esticada.

O fundo contém terreno, caminhos, vegetação e construções secundárias distantes. Os 13 destinos físicos são imagens independentes sobrepostas ao terreno; o 14.º é o portal fixo. Os dois planos de construções deixam intervalos livres e não têm caixas de interação sobrepostas. A arquitetura deriva dos fundos existentes, com madeira, reboco e pedra clara, tinta preta, bege e hachuras. A luz da cidade é diurna; a noite existe apenas dentro da representação do portal.

| Conjunto de interface | Destinos |
| --- | --- |
| Esquerda | Estalagem de Nyra, mercado, boticário, casa de contratos e mapas |
| Centro | Virmura, Borun, Sevrak, espaço de treino |
| Direita | Quarta guilda, coliseu, oficina, cisterna, minas |
| Moldura fixa | Portal para a Noite da História |

Esses conjuntos organizam a interface; não nomeiam bairros nem aprovam posições narrativas.

## Estados e identidade Coreto

Registro **Product**. Variação visual **3/10**, movimento **1/10**, densidade **3/10**. Cena: o jogador percorre uma cidade ilustrada, reconhece uma fachada e consulta o cenário antes de retornar ao mapa.

Os controles usam Outfit Medium; títulos usam Averia Libre. As superfícies e cores vêm de [theme.json](../../../../tools/terminus-ui/theme.json) e do [style guide local do Coreto](../../../../../coreto-design-system/coreto-style-guide-github/docs/index.html). O guia proíbe acrescentar halo ao tema padrão; **o halo deste mapa é uma extensão específica solicitada pelo autor**, limitada a este protótipo.

| Papel | Token usado |
| --- | --- |
| Papel / painel | `#F8E9CC` / `#F9EACF` |
| Texto e marcador | `#360A0B` |
| Borda | `#704737` |
| Ação principal / pressionado | `#552070` / `#4D1D6B` |
| Texto sobre ação | `#FFF8EB` |
| Hover da fachada | `#8224AD`, halo com 50% de opacidade |
| Foco / seleção mantida | `#EDAA2F`, halo com 65% de opacidade |
| Indisponível durante carregamento | `#D3C7B4`, texto `#704737` |

O dourado é o token de foco do guia; no arquivo legado do tema ele se chama `gold`. O violeta do hover do guia corresponde ao valor chamado `focus` naquele arquivo. O protótipo usa nomes semânticos conforme o comportamento solicitado.

| Estado | Apresentação e comportamento |
| --- | --- |
| Padrão | Fachada sem halo, marcador ou nome sobre a cidade |
| Hover real do ponteiro | Um halo violeta segue o alfa da fachada; marcador em losango e nome na faixa fixa |
| Foco por teclado | Halo dourado, marcador com anel de foco sobre contorno escuro, nome e revelação pela câmera |
| Seleção mantida | Halo dourado e marcador após o ponteiro sair; nome permanece |
| Pressionado | Ativação nativa do botão; sem escala, pulsação ou efeito decorativo |
| Arrastando | Cursor de arrasto, câmera limitada ao panorama, visita cancelada ao soltar |
| Carregando cidade | Mensagem explícita; fachadas, câmera e Visitar indisponíveis até as 15 imagens carregarem |
| Falha na cidade | Lista das imagens ausentes, orientação sobre a pasta e Carregar novamente; nenhuma fachada acionável |
| Carregando fundo | Prévia com mensagem de carregamento e retorno disponível |
| Falha no fundo | Mensagem com o nome, ação para repetir e retorno disponível; nenhuma imagem anterior apresentada como se fosse a nova |
| Fundo pronto | Fundo completo, sem recorte; controle local selecionado com losango e `aria-pressed` |

Só um destino recebe destaque principal. Alterações de câmera ou redimensionamento não criam um hover artificial. Os halos são filtros `drop-shadow` aplicados ao alfa, com resposta imediata; não há retângulo luminoso, transição ou animação. Nome, forma do marcador e estado acessível complementam a cor. O dourado isolado sobre papel não é usado como único indicador de contraste: o marcador e a base escura do foco fornecem a distinção.

## Artes, versões e manifesto

As novas imagens estão em [assets/terminus/mapa](../../../../assets/terminus/mapa/). O fundo selecionado é `panorama-v1.png` (2172 × 724, proporção 3:1). As fachadas mantêm seus PNGs nativos com alfa real. Mercado e boticário usam **v2** para a correção de paleta; os demais usam **v1**. As primeiras versões foram preservadas.

O [registro de prompts](prompts.json) guarda os prompts completos, referências, origem de cada geração, versões e seleção. Todas as artes foram produzidas com `image_gen` integrado. O [registro dos fundos existentes](../../arte/locais/prompts.json) permanece como fonte para os 19 cenários reutilizados.

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
| Portal para a Noite da História | Coreto |

[manifest.js](manifest.js) centraliza os destinos, fachadas, posições, dimensões, áreas clicáveis e fundos consumidos pelo navegador. É um script comum para funcionar em `file://`, sem `fetch` nem módulos de rede.

Para editar a composição, altere `PLACES` em [build-manifest.py](build-manifest.py) e regenere o manifesto com Python e Pillow. Essa ferramenta é apenas de autoria, não é necessária para abrir o protótipo. Ela lê o alfa sem alterar as artes e gera uma malha conservadora de 128 × 128 células: uma célula só entra no recorte se todos os seus pixels tiverem alfa ≥ 200. Vazios internos também são excluídos. O recorte SVG limita o próprio botão HTML; a sombra visual não participa da área de clique. A discretização pode deixar uma borda não clicável de aproximadamente 2 px na escala de referência.

## Verificação

[Resultados automatizados](verificacao/resultados.json): **72 verificações aprovadas**, em Edge/Chromium, abrindo diretamente pelo sistema de arquivos. Incluem os 14 destinos, os 19 fundos, mouse, teclado, toque emulado, arrastos nas fachadas e no portal fixo, limites, restauração da câmera, troca rápida de fundos, transparências, falhas com recuperação e ausência de animação. Foram capturadas telas em 1280 × 720, 1920 × 1080, 768 × 720, 390 × 720 e 320 × 720, incluindo o nome longo do portal.

Contrastes medidos: texto/papel **14,69:1**, ação **10,88:1**, hover **7,09:1**, foco dourado/base escura **8,62:1**, indisponível **4,76:1**. Os controles têm caixa mínima de 44 × 44 px. Veja os valores precisos no JSON.

- [Cidade em 1280 × 720](verificacao/cidade-1280.png) e [trecho direito](verificacao/cidade-direita-1280.png).
- [Cidade em 1920 × 1080](verificacao/cidade-1920.png).
- [Hover violeta](verificacao/hover-violeta.png) e [foco por teclado](verificacao/foco-teclado.png).
- [Prévia do coliseu](verificacao/previa-coliseu.png).
- [Tela estreita e nome longo](verificacao/cidade-390.png).
- [Falha na cidade](verificacao/falha-carregamento.png) e [falha no fundo](verificacao/falha-fundo.png).
- [Verificação do alfa](verificacao/alpha.json).

[verify.mjs](verify.mjs) executa os testes com Node, Playwright e Edge já disponíveis no ambiente de autoria. Não instala pacotes e não modifica arquivos do RPG Maker. Use `node verify.mjs` com Playwright disponível na resolução de módulos do Node (`NODE_PATH`, se necessário).

Limites da validação: toque por emulação Chromium, sem aparelho físico; sem sessão manual com leitor de tela. A arte e a composição seguem **em desenvolvimento** para avaliação do autor. Não há missões, desbloqueios, salvamento de campanha ou integração com o runtime do jogo.

## Referências

- [Visão do jogo](../../visao-do-jogo.md), para preservar o escopo e a separação narrativa do Coreto.
- [Hamlet de Darkest Dungeon](https://darkestdungeon.wiki.gg/wiki/Hamlet), como referência de cidade navegável por construções.
- `C:\projetos\gamejam-vn-terror\rpg-maker\The Dryland Drowned\game.rmmzproject`, consulta das escolhas por imagens. Nenhum plugin ou configuração foi importado.
- Fundos de Terminus já produzidos, para materiais e acabamento. O material em `docs/docs_externas/` foi usado somente como referência artística, sem aprovação narrativa implícita.
