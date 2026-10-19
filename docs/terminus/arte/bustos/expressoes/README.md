# Expressões dos personagens

Status: em desenvolvimento.

Rheed foi atualizado em 19/10/2026 conforme a nova referência do autor: [busto base e registro v2](../rheed-v2.json). As cinco expressões preservam o figurino ornamentado, a caneca e o tapa-olho à direita da imagem. Prompts e verificações atuais estão em `registros/rheed-*.json`; os arquivos anteriores permanecem no [histórico da revisão](../historico/rheed-2026-10-19/).

Produção concluída de 210 bustos: cinco expressões para cada um dos 42 visuais do elenco, incluindo as três formas de Neral. Os 42 concepts atuais permanecem preservados. Todos os conjuntos passaram pela revisão interna; a aprovação artística do autor permanece pendente.

[Galeria comparativa](galeria.md) · [Controle de produção](controle.json) · [Matriz de referências e atuação](matriz.json) · [Verificação final](verificacao-final.json)

Cada conjunto contém `neutro.png`, `feliz.png`, `triste.png`, `raiva.png` e `confuso.png`, em `assets/terminus/bustos/expressoes/<id>/`. Os PNGs têm 504 × 672 px, RGBA, transparência real, perfil sRGB e exportação não entrelaçada. O redimensionamento proporcional usa Lanczos com alfa pré-multiplicado, sem deformar o desenho.

As imagens são geradas individualmente com `image_gen` integrada. O concept atual fixa anatomia, rosto, idade aparente, proporções, cabelo, marcas, roupa e acessórios. A ficha completa orienta a personalidade. O neutro conferido fixa a composição das demais emoções; nenhuma expressão deriva de outra emoção. Os registros individuais em `registros/` preservam o prompt exato, as referências, o original gerado, a exportação e a inspeção.

O acabamento segue o guia de ilustrações v2 do Coreto: contorno preto, sépia, hachuras e pontilhismo. A expressão pode mudar olhos, boca, tensão, inclinação e gestos, sem novos objetos, símbolos, roupas ou alterações de corpo. Ghork e Virmura seguem seus concepts mais recentes. Neral disfarçado permanece coberto, com apenas os olhos visíveis; transformado mantém a anatomia bestial em todas as emoções.

O controle diferencia arquivos exportados, conjuntos completos e inspeção visual pendente. Integridade técnica e revisão interna não constituem aprovação artística do autor. Tentativas descartadas ficam fora da pasta de entrega.

A verificação final confirmou 210 combinações, sem faltas, arquivos extras ou duplicatas binárias, e a integridade dos 42 concepts por SHA-256. A revisão visual comparou cada conjunto com seu concept e conferiu a leitura das emoções no tamanho final, anatomia, mãos, presas, olhos, acessórios, margens e transparência. Foram refeitos individualmente o feliz de Neral transformado, para tornar a satisfação mais legível, e o confuso de Jorvi, para manter o caderno apoiado nas mãos. Os registros dessas imagens preservam os motivos e as fontes das tentativas substituídas.
