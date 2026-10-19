# Objetos de Terminus

Status: em desenvolvimento.

Os 35 objetos usados na encenação do protótipo possuem ilustração: dois mapas comparativos e 33 objetos de missão. Foram produzidos com a ferramenta integrada `image_gen`, um objeto por chamada, seguindo sépia, contornos pretos, hachuras e pontilhado do Coreto. A aprovação artística permanece com o autor.

Consulte a [galeria comparativa](galeria.md) para os arquivos finais e as capturas das cenas. Os PNGs ficam em `assets/terminus/objetos/`, com os IDs do catálogo preservados. Cada arquivo tem 720 × 540 px, RGBA, perfil sRGB, transparência real e exportação sem entrelaçamento. O redimensionamento preserva proporções, com pelo menos 50 px livres nas bordas da tela final.

## Direção e fontes

- [Matriz](matriz.json): nome, contexto, passagens, brief, prompt, referências e estado de cada objeto.
- [Direção](direcao.json) e [referências](referencias.json): técnica comum e entradas usadas nas gerações, incluindo o guia de artstyle do Coreto e o busto de Durn como referência de acabamento.
- [Roteiro das quests](../../storytelling/quests-da-campanha.md) e [catálogo do protótipo](../../prototipo/art.js): função e uso narrativo dos objetos.
- [Originais gerados](fontes-geradas.json): procedência das imagens selecionadas, preservadas no diretório de geração.
- [Correção](correcoes.json): retirada de ícones de carga indevidos do pedido de empréstimo da maca; a tentativa descartada fica fora da entrega.

Os documentos usam marcas gráficas e diagramas, sem nomes, assinaturas, valores monetários ou brasões inventados. O conteúdo legível permanece no roteiro e na interface. Os dois mapas compartilham os marcos e distinguem entrada e retirada pelas setas e pelo papel. A revisão do procedimento conserva seus diagramas; a cópia da correspondência mantém a organização da carta. A peça avariada e a nota de Durn mostram o mesmo componente, sem atribuir causa ou culpa à quebra.

## Integração e verificação

O manifesto `asset-files.js` associa os 35 arquivos; `art.js` usa essas associações para preencher imagem, formato e estado de produção. As mesmas entradas alimentam catálogo e palco. Os 13 objetos cadastrados sem uso permanecem fora deste lote. A integração não altera falas, regras, bustos ou fundos.

- [Verificação técnica](verificacao-tecnica.json): dimensões, RGBA, alfa, perfil de cor, entrelaçamento, margens e SHA-256 de cada PNG.
- [Verificação no navegador](verificacao-browser/resultado.json): 35 objetos nas 70 passagens indexadas, em Chrome, pela interface de inventário e prévia; nenhum erro de carregamento ou objeto fora do palco. Movimento reduzido ativado para conferir também as entregas.
- Os dez testes existentes de `tests/presentation.test.cjs` passaram após a integração.
- A [conferência em 640 × 360](verificacao-browser-compacto/resultado.json) cobriu seis objetos representativos em 13 passagens, incluindo mapas, documentos, maca e chave. Os arquivos carregaram e permaneceram dentro do palco. Nessa resolução a prévia editorial tem palco maior que a janela e exige rolagem; a conferência focalizou o objeto, não a composição inteira simultaneamente.
- As imagens originais foram inspecionadas individualmente; as folhas de contato conferem o conjunto em tamanho reduzido. Capturas das cenas estão ligadas na galeria.

Para repetir a exportação a partir dos originais preservados, execute `exportar.py` com Python e Pillow. Os caminhos de origem estão em `fontes-geradas.json`. A ferramenta apenas enquadra e reduz as imagens; não redesenha nem remove fundos por aproximação de cor.
