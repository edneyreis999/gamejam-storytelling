# Revisão do lote 1

Status: em desenvolvimento.

Data: 18/10/2026. As seis folhas completas foram aprovadas pelo autor. Os quatro pilotos foram aprovados antes deste lote; o autor também aprovou o estudo das três formas de Neral com a resposta “Aprovo as três formas”, antes da produção de suas folhas completas. O histórico abaixo descreve a rodada apresentada.

## Candidatas apresentadas

| Folha | Versão | Pontos conferidos |
| --- | --- | --- |
| Sevrak | v2 | Corpo esguio, orelhas élficas, cabelo preso baixo, fechos de cristal, dedos manchados |
| Nyra | v2 | Corpo largo de ogra, lenço, avental, marcas nas mãos, chaves no quadril esquerdo anatômico |
| Criança | v2 | Menina orc pequena, presas discretas, cabelo curto; desenvolvimento equivalente a dez anos humanos |
| Neral — disfarce | v2 | Gola alta, luvas, membros cobertos e roupa do estudo aprovado |
| Neral — revelado | v2 | Mesmo rosto e roupa, mãos expostas alongadas, palidez e marcas simples |
| Neral — transformado | v2 | Corpo ampliado e curvado, mangas rompidas, dois braços e duas pernas, identidade preservada |

Os arquivos estão em `assets/terminus/personagens/em-revisao/<id>-v2-120x220.png`. Os [dados de produção](../controle.json) identificam os caminhos completos, hashes, fichas, prompts e referências de cada tentativa. Os originais gerados com imagegen, exportações v1 e estudos intermediários de retoque foram preservados.

## Processo e revisão

Cada folha teve uma solicitação individual ao imagegen com as três referências originais, a descrição específica da ficha e um piloto aprovado ou o estudo aprovado da forma. A exportação aplicou escala única, vizinho mais próximo, alfa binário e apoio em y=52.

As saídas geradas repetiam a perna próxima nos dois passos de perfil. O acabamento por script alternou pernas e braço próximo no passo B, reaproveitando os pixels das botas e preservando todas as cabeças. O primeiro estudo de retoque deixou fragmentos dos braços anteriores; a segunda revisão eliminou esses fragmentos. A versão v2 ajustou também os recortes das botas. Não foram espelhadas folhas inteiras nem acessórios assimétricos.

As folhas foram inspecionadas em tamanho nativo, ampliadas sem suavização e no ciclo A → repouso → B → repouso. As silhuetas distinguem Sevrak esguio, Nyra larga e a criança menor que Nima. As três formas de Neral conservam cabelo, rosto e roupa reconhecíveis. Chaves e dedos são detalhes de poucos pixels; a oclusão pelas mãos durante a passada foi considerada na revisão.

## Verificação

- Dez folhas atuais verificadas: quatro pilotos finais e seis candidatas. Todas têm 120 × 220 px, transparência real, 12 células preenchidas, margens livres e apoio alinhado.
- Os seis retoques foram reproduzidos em diretório temporário e comparados byte a byte às candidatas apresentadas, sem diferenças.
- Hashes das fichas das 42 entradas, três referências originais e quatro pilotos finais conferidos, sem divergências.
- Cinco testes do exportador passaram. Os testes estruturais não substituem a avaliação artística do autor.
- Galeria carregou 24 imagens sem falhas e 40 canvases, com dez folhas disponíveis e quatro de 42 aprovadas. Controles de animação e avanço conferidos no navegador.

## Apresentação e próxima etapa

[Galeria estática e animada](../galeria.html) · [Prévia GIF das quatro direções](lote-1-previa.gif) · [Captura da apresentação](lote-1-apresentacao.png) · [Estudo aprovado de Neral](neral-estudo-v1.png)

A prévia tem fundo cinza somente para inspeção. Os seis PNGs candidatos continuam transparentes. A aprovação deste lote é necessária antes de promover essas versões para a pasta final e iniciar o lote 2. A integração no motor permanece fora desta entrega.

## Aprovação registrada

Em 18/10/2026, o autor respondeu: “Aprovo as seis folhas do lote 1. Pode seguir para o lote 2, mantendo o mesmo padrão de qualidade e revisão.” As seis versões v2 foram copiadas sem alteração para `assets/terminus/personagens/<id>.png`. Os hashes dos arquivos aprovados e o texto da autorização estão no controle. Essa aprovação liberou o lote 2.
