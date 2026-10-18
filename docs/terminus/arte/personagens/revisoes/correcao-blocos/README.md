# Correções por problema

Status: em desenvolvimento.

O autor solicitou nova revisão de 15 folhas e aprovou a sequência abaixo. Cada bloco começa por uma amostra: aprovação da amostra, produção dos demais, aprovação do bloco completo e só então início do próximo. Aprovar o plano não aprova as imagens.

| Bloco | Problema | Amostra | Demais personagens | Estado |
| --- | --- | --- | --- | --- |
| 1 | Pernas cortadas e pés invertidos nos perfis | Odrik | Lethra, Durn, Elune, Lurga, Sivren, Ivara, Ossena | Odrik aprovado; outras sete versões aceitas com ressalvas |
| 2 | Falhas nas costas dos perfis | Guedra | Darvek, Edrin, Tessa, Rask | Guedra v4 aprovada; quatro candidatas aguardam aprovação do bloco |
| 3 | Tronco congelado na caminhada | Pirka | Urdan | Aguarda conclusão do bloco 2 |

## Amostra do bloco 1: Odrik v4

[Galeria com pausa e avanço de quadro](../../galeria.html#odrik) · [Folha transparente](../../../../../../assets/terminus/personagens/em-revisao/odrik-v4-120x220.png) · [Antes/depois animado](odrik-v3-v4-caminhada.gif) · [Troca das quatro direções](odrik-v3-v4-direcoes.gif) · [Folhas ampliadas](odrik-v3-v4-folhas.png) · [Detalhe dos perfis](odrik-v4-perfis-detalhe.png)

Ficha completa de Odrik relida; hash compatível com a geração original. Mantidos raça, cabelo alto, dente quebrado e capa remendada. Nenhuma alteração narrativa. A versão v3 foi preservada junto do seu histórico. O autor aprovou a v4 com “o odrik ficou bom”; a folha foi copiada para o destino final, preservando a candidata e seu relatório.

### Defeitos e alteração por quadro

| Vista e quadros | Evidência na v3 | Alteração na v4 |
| --- | --- | --- |
| Esquerda, A e B | Pernas convergiam num único ponto; canos das botas desapareciam e fragmentos de pés apontavam para trás | Desenho individual de duas pernas completas, com botas inteiras e pontas para a esquerda |
| Direita, A e B | Mesmo recorte incompleto; pés não acompanhavam a direção da vista | Desenho individual para a direita, mantendo o membro próximo e o distante separados |
| Esquerda e direita, repouso | Pés abertos para lados diferentes, causando mudança de orientação durante o ciclo | Redesenho abaixo de y=46, com ambas as botas orientadas para a vista |
| Frente e costas, todos | Fora do defeito desta amostra | Pixels idênticos à v3 |

O método anterior recortava somente y=49–52 e separava cada pé pelo centro da célula. A v4 usa desenhos manuais em resolução nativa: cada perna tem suas próprias linhas de pixels, da raiz até a sola. A perna distante é composta primeiro, seguida da próxima. As cores foram selecionadas da paleta de Odrik. Não há recorte de botas, deformação automática nem espelhamento da figura.

As máscaras de edição são específicas desta amostra. Nos passos, mudam apenas y=45–52; no repouso, y=46–52. Cabeça, braços, tronco e capa permanecem idênticos à v3. O estudo 1 revelou fragmentos antigos fora da máscara; o estudo 2 corrigiu a cobertura dessa máscara. Ambos estão preservados. A v4 corresponde exatamente aos pixels do estudo 2.

### Verificação técnica

- PNG RGBA de 120 × 220 px, 12 células, transparência, margens e apoio em y=52 sem erros estruturais.
- Reprodução do PNG idêntica por SHA-256; fontes e referências preservadas.
- Cinco testes: preservação das regiões intactas; composição dos pixels; bota acima do antigo corte e atravessando o centro; sola completa no pé de apoio e no levantado; cobertura das máscaras e orientação das pontas.
- A regressão usa pixels da amostra real. A ponta dianteira em (11, 51), vista esquerda A, estava ausente na v3 e está presente na v4.

O [compositor](../../../../../../tools/retocar_camadas.py) lê os desenhos em [camadas-correcao.json](../../camadas-correcao.json). Os relatórios preservam a configuração completa, origem e hashes. O auditor passa a reproduzir Odrik por esse método; as demais folhas mantêm seus métodos anteriores.

### Avaliação visual e aprovação

Foram inspecionados os 12 quadros em tamanho nativo e ampliação sem suavização, incluindo continuidade das pernas, direção das botas e sobreposição dos membros. As prévias apresentam o ciclo A → repouso → B → repouso a 180 ms, nas quatro direções, com comparação à v3. A inspeção técnica não comprova anatomia nem naturalidade da caminhada.

## Bloco 1 completo para avaliação

A aprovação de Odrik liberou a produção das outras sete candidatas. Todas as fichas foram relidas e seus hashes conferidos. Cada personagem recebeu desenho próprio dos membros inferiores nas duas direções, sem reutilizar o recorte que dividia botas pelo centro da célula. Os perfis incluem também pés de repouso orientados para o lado correto.

| Personagem | Versão | Ajuste individual | Comparação |
| --- | --- | --- | --- |
| Lethra | v5 | Pernas esguias; bainha esquerda protegida em x26–28/y44–46 | [Animada](lethra-v5-comparacao.gif) · [Ampliada](lethra-v5-comparacao.png) |
| Durn | v4 | Passada curta e botas largas sob o avental; braço esquerdo rígido preservado | [Animada](durn-v4-comparacao.gif) · [Ampliada](durn-v4-comparacao.png) |
| Elune | v4 | Botas estreitas; porta-mapas, mãos e cabelo preservados | [Animada](elune-v4-comparacao.gif) · [Ampliada](elune-v4-comparacao.png) |
| Lurga | v4 | Volume das calças e botas; mecha e pulseira esquerdas preservadas | [Animada](lurga-v4-comparacao.gif) · [Ampliada](lurga-v4-comparacao.png) |
| Sivren | v4 | Passada sob o casaco; abas, rolos e mãos intactos | [Animada](sivren-v4-comparacao.gif) · [Ampliada](sivren-v4-comparacao.png) |
| Ivara | v5 | Passada menor; manta, chaves, postura encurvada e trança preservadas | [Animada](ivara-v5-comparacao.gif) · [Ampliada](ivara-v5-comparacao.png) |
| Ossena | v4 | Pernas estreitas; quadros de madeira e coque preservados | [Animada](ossena-v4-comparacao.gif) · [Ampliada](ossena-v4-comparacao.png) |

[Grupo 1 animado: Odrik, Lethra, Durn, Elune](bloco-1-grupo-1.gif) · [Grupo 2 animado: Lurga, Sivren, Ivara, Ossena](bloco-1-grupo-2.gif) · [Tamanho nativo](bloco-1-nativo.png) · Pranchas ampliadas [1](bloco-1-folhas-1.png), [2](bloco-1-folhas-2.png), [3](bloco-1-folhas-3.png).

### Verificações do bloco

- As sete folhas mantêm PNG RGBA de 120 × 220 px, 12 células, margens livres e apoio em y=52. Uma perna mantém apoio e a outra fica um pixel acima nos passos; ambas apoiam no repouso.
- Nove testes de composição passam, cobrindo os oito personagens. Incluem regiões intactas, membros sem pixels isolados, botas dentro das máscaras, direção dos pés, alternância do apoio e proteção da bainha de Lethra.
- Frente, costas e todos os pixels fora das máscaras individuais permanecem idênticos às versões anteriores. Isso inclui os braços e acessórios. Odrik aprovado não recebeu novos retoques.
- Cada candidata tem relatório, configuração completa, hash e reprodução idêntica. Estudos intermediários e versões substituídas estão preservados.
- Os 84 quadros das novas candidatas foram inspecionados em tamanho nativo e ampliado. As prévias a 180 ms permitem comparar os passos com Odrik e com as versões anteriores. As conclusões técnicas e a aprovação artística continuam separadas.

### Aceite com ressalvas do bloco 1

Em 18/10/2026, o autor disse: “não está perfeito, mas por enquanto podem ficar com essa versão mesmo. Passe para o próximo bloco”. As sete versões foram aceitas por enquanto e copiadas para seus destinos finais, preservando candidatas e históricos. A ressalva continua explícita; este aceite não equivale a declarar a caminhada perfeita. Odrik conserva sua aprovação anterior.

## Amostra do bloco 2: Guedra v4

[Galeria](../../galeria.html#guedra) · [Antes/depois animado](guedra-v4-comparacao.gif) · [Troca de direções](guedra-v4-direcoes.gif) · [Folhas ampliadas](guedra-v4-comparacao.png) · [Tamanho nativo](guedra-v4-nativo.png).

Ficha completa relida e hash conferido. Mantidos cabeça raspada, constituição, roupa de treino e joelheira esquerda. Nenhuma alteração narrativa.

| Quadros | Defeito na v3 | Correção na v4 |
| --- | --- | --- |
| Esquerda A | Braço e roupa sujeitos à colagem da faixa inferior | Braço inteiro delimitado por linha de pixels, composto sobre base completa |
| Esquerda B | Contorno das costas interrompido em y29–34; fragmento horizontal junto à mão | Reconstrução das costas e roupa ocultas; mão ligada ao antebraço, com balanço à frente |
| Direita A | Braço encurtado pela faixa inferior e junção irregular com a roupa | Composição própria da vista direita, preservando a textura do braço |
| Direita B | Ombro com saliência e perda de contorno junto ao braço | Ombro contínuo e base independente, sem espelhar a figura |
| Frente, costas, repousos e regiões preservadas | Fora do ajuste desta amostra | Pixels idênticos à v3 |

A causa estava na remoção do braço sem reconstruir toda a região oculta e na colagem de pernas de largura total a partir de y35. Esta candidata substitui essas operações nos quatro passos laterais por três camadas: tronco e roupa da própria direção, pixels desenhados para a área oculta e braço completo delimitado do ombro ao punho. Os deslocamentos de cada linha articulam o braço sem rotacionar um recorte que apague as costas. A configuração guarda esses limites individualmente para cada vista e pose.

A edição fica entre y19 e y37 nos perfis A/B. Cabeças, parte inferior a partir de y38, joelheira, repousos e vistas frontal/traseira permanecem idênticos. As pernas mantêm a versão anterior; a comparação não deve ser interpretada como uma nova revisão da passada. O estudo 1 e a candidata v4 têm pixels idênticos.

### Verificação e avaliação

- PNG RGBA de 120 × 220 px, 12 células, transparência real, margens livres e apoio em y52; reprodução do PNG idêntica por SHA-256.
- Quatro novos testes verificam pixels das costas antes ausentes, preservação das regiões intactas, sobrevivência de todos os pixels opacos do braço e reprodução idêntica das oito folhas aceitas do bloco 1.
- Os nove testes de composição do bloco 1, cinco de exportação e quatro do método histórico continuam passando. Testes técnicos não aprovam anatomia nem naturalidade.
- Inspeção dos 12 quadros em tamanho nativo e ampliado, com comparação de A, repouso e B nas quatro vistas. As prévias usam A → repouso → B → repouso, 180 ms, e incluem troca de direções.

### Aprovação da amostra

Em 18/10/2026, o autor disse: “A Guedra ficou boa. Pode seguir com Darvek, Edrin, Tessa e Rask, mantendo o mesmo cuidado na revisão.” A v4 foi copiada para `assets/terminus/personagens/guedra.png`, com hash idêntico ao da candidata. Nenhum pixel da amostra aprovada foi alterado na expansão.

## Bloco 2 completo para avaliação

As quatro fichas foram relidas integralmente e seus hashes conferidos. Cada folha recebeu limites próprios para costas, mangas, antebraços e mãos. A base sob o braço existe antes da composição do membro; os acessórios são compostos em camada própria quando atravessam a região editada. Não há rotação de recorte nem colagem de pernas sobre a roupa.

| Personagem | Versão | Região editada nos perfis A/B | Cuidado específico | Comparações |
| --- | --- | --- | --- | --- |
| Darvek | v5 | y20–39 | Livro ligado à cintura, cordas e textura dos braços preservados | [Animada](darvek-v5-comparacao.gif) · [Ampliada](darvek-v5-comparacao.png) · [Direções](darvek-v5-direcoes.gif) |
| Edrin | v5 | y32–43 | Bolsa protegida e marcas dos braços reutilizadas da própria vista | [Animada](edrin-v5-comparacao.gif) · [Ampliada](edrin-v5-comparacao.png) · [Direções](edrin-v5-direcoes.gif) |
| Tessa | v4 | y27–42 | Lenço, orelha e livro preservados; braços mantêm as manchas de suas vistas | [Animada](tessa-v4-comparacao.gif) · [Ampliada](tessa-v4-comparacao.png) · [Direções](tessa-v4-direcoes.gif) |
| Rask | v3 | y21–39 | Faixa e tabuleta mantidas; costas completas sob o braço | [Animada](rask-v3-comparacao.gif) · [Ampliada](rask-v3-comparacao.png) · [Direções](rask-v3-direcoes.gif) |

Nos passos B, a v4 de Darvek perdia pixels das costas em (27,30) e (12,30); Edrin em (26,39) e (13,39); Tessa em (26,37) e (12,35); Rask em (27,35) e (12,34). Cada par corresponde às vistas esquerda/direita, em coordenadas da célula. Esses pontos foram reconstruídos e incluídos nas regressões. O passo A também recebeu braço inteiro para manter continuidade com o repouso e B.

Os primeiros estudos de Darvek e Edrin revelaram falta de ligação dos acessórios à cintura. Um segundo estudo corrigiu essas junções; o teste de composição ainda encontrou pixels do braço fora da máscara, corrigidos no terceiro estudo. Os estudos permanecem guardados. Tessa e Rask mantêm o primeiro estudo. Essas correções de preparação não alteraram Guedra nem foram tratadas como aprovações do autor.

### Revisão e verificações da expansão

- Os 48 quadros foram inspecionados em tamanho nativo e ampliados, comparando A, repouso e B e as quatro direções. [Prévia do bloco com Guedra](bloco-2-completo.gif) · [Folhas nativas](bloco-2-nativo.png).
- Quatro PNGs RGBA de 120 × 220 px, 12 células cada, margens livres e apoio em y52. Comparações animadas a 180 ms, ciclo A → repouso → B → repouso.
- Frente, costas, repousos e pixels fora das máscaras individuais permanecem idênticos. As cabeças e regiões das pernas abaixo dos limites da tabela também permanecem idênticas. A passada anterior não foi redesenhada neste bloco.
- Os 26 testes passam: nove do bloco 1, quatro da amostra Guedra e regressão das folhas aceitas, quatro da expansão, cinco de exportação e quatro do método histórico. Incluem as costas ausentes nas duas vistas, composição sem perder pixels dos braços/acessórios e preservação das regiões intactas.
- Configuração, entradas, versões anteriores, hashes e reprodução de cada PNG foram registrados. A aprovação de Guedra não se transfere às novas candidatas. Testes técnicos não comprovam naturalidade da animação.

**Próxima condição: aprovação de Darvek v5, Edrin v5, Tessa v4 e Rask v3**, conforme o ciclo de revisão solicitado no plano. Depois do bloco 2 completo, começar a amostra Pirka do bloco 3.
