# Revisão do lote 2

Status: em desenvolvimento.

Data: 18/10/2026. Virmura, Dorga, Torvak e Meruna aguardam aprovação. Dez folhas anteriores estão aprovadas e copiadas para a pasta final. Esta rodada não altera essas imagens.

## Fichas e decisões visuais

As quatro fichas completas foram consultadas e seus hashes conferidos contra o controle. Os traços autorizados nas fichas orientam o desenho; as propostas narrativas continuam em desenvolvimento.

| Folha | Traços preservados | Solução para detalhes não especificados |
| --- | --- | --- |
| Virmura | Orc musculosa, duas tranças negras, presas pequenas, cicatrizes e linhas sob os olhos e no queixo | Túnica curta clara, calças e botas, pequeno fecho de cristal sem brilho; mãos livres durante a caminhada |
| Dorga | Orc robusta, laterais raspadas, presas aparadas, faixa e uma luva | Luva na mão esquerda anatômica; faixa do ombro direito ao quadril esquerdo, sem brasão inventado |
| Torvak | Orc largo e musculoso, trança curta com anéis, cicatrizes nos braços | Colete sem mangas, calças, proteção de couro na cintura e botas; postura pública, sem animação permanente de tremor |
| Meruna | Anã madura, cabelo escuro com mechas claras, trança com anéis, lentes pequenas e mãos manchadas | Casaco curto de viagem, calças e botas; sem arma ou objeto carregado |

A paleta traduz verde, vermelho, branco e preto em valores sépia. As alturas máximas solicitadas na exportação foram 51, 49, 52 e 45 px, respectivamente; a largura disponível também limita a escala. São parâmetros de arte para a mesma célula, não medidas biológicas adicionais.

## Histórico de produção

Cada personagem recebeu uma chamada individual ao imagegen integrado, com as três referências originais. Borun foi a comparação adicional para os orcs; Rheed, para Meruna. Os textos enviados estão em `prompts/<id>-v1.txt`, e os originais foram preservados em `assets/terminus/personagens/em-revisao/<id>-v1.png`.

A exportação v1 passou nos testes estruturais, mas ainda continha passos repetidos. Dorga também tinha a faixa invertida em três quadros e o perfil esquerdo B voltado para a direita. A trança de Torvak mudava de lado na vista frontal.

O primeiro estudo de acabamento deixou os braços simplificados demais. O método seguinte reutiliza pixels dos braços originais, com máscaras e rotação sem suavização; o ângulo foi conferido isoladamente antes da versão apresentada. As provas intermediárias, incluindo a de ângulo incorreto, permanecem como histórico, sem aprovação.

As candidatas v2 alternam os membros, corrigem a faixa de Dorga e reutilizam o rosto correto para seu perfil esquerdo. A cabeça frontal de repouso de Torvak mantém a trança atrás. A construção do perfil direito reaproveita membros simétricos, preserva o rosto da vista direita e corrige separadamente a luva e a mão descoberta de Dorga. Não há espelhamento indiscriminado de folhas.

## Verificação e apresentação

As quatro candidatas têm PNG RGBA de 120 × 220 px, 12 células ocupadas, margens livres, transparência real e apoio em y=52. Os passos A e B diferem em todas as direções. A revisão compara as folhas em tamanho nativo e ampliado e o ciclo A → repouso → B → repouso com os pilotos aprovados.

[Galeria](../galeria.html) · [Prévia animada](lote-2-previa.gif) · [Prancha dos pilotos e lote 2](lote-2-comparacao.png) · [Captura da apresentação](lote-2-apresentacao.png)

Conferência final: 14 folhas atuais verificadas sem erros estruturais; dez arquivos finais com hashes preservados; quatro retoques reproduzidos byte a byte em diretório temporário; cinco testes do exportador aprovados. As fichas e referências também mantêm os hashes registrados. No navegador, as 32 imagens carregaram e os 56 canvases estavam presentes. Iniciar reproduziu a caminhada e Avançar pausou o ciclo. Não houve novo teste de todos os tamanhos de tela nesta rodada.

Os caminhos, hashes e relatórios individuais estão no [controle de produção](../controle.json). Somente após a aprovação do autor as quatro candidatas serão copiadas para a pasta final e será iniciado o lote 3. A integração no motor continua sendo uma etapa posterior.

## Aceite e continuidade

Em 18/10/2026, após a apresentação das quatro folhas, o autor autorizou seguir para os próximos lotes. As quatro versões 2 foram copiadas sem alteração para a pasta final e seus hashes de aprovação registrados.
