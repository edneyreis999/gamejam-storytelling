# Correção dos ciclos de movimento

Status: em desenvolvimento.

O autor solicitou revisar 18 folhas por partes que desapareciam ou movimento concentrado em um único membro. Estas são novas candidatas, ainda sem aprovação. Dez substituem versões antes aprovadas; as aprovações e os PNGs anteriores permanecem no histórico.

## Causa e correção

Os métodos anteriores apagavam áreas retangulares ao substituir braços ou pernas, afetando roupa e acessórios. Também congelavam áreas inteiras do tronco e, em parte dos perfis, repetiam a geometria das pernas alterando apenas sua iluminação. Os testes de arquivo e conectividade não detectavam esses problemas visuais.

A correção preserva os quatro repousos de cada folha. O tronco e os braços usam deslocamento contínuo, sem apagar retângulos. Os braços oscilam em contrafase; a cabeça acompanha o corpo com um deslocamento deliberado de um pixel, mantendo seus pixels e proporções. Nos perfis, quadril, joelho e tornozelo são reconstruídos em pixels; as botas originais são transladadas inteiras. Frente e costas alternam o pé levantado. Nenhuma vista é espelhada.

Ensaios que apenas deformavam pernas e botas foram descartados: produziam cunhas e arrastavam pixels das bainhas. Os ensaios permanecem nesta pasta. A abordagem articulada foi apresentada ao autor durante o trabalho; sua aprovação visual ainda está pendente.

## Inspeção

[Abrir galeria com quadros individuais](../../galeria.html#rheed). Prévia em 3×, sem suavização, a 180 ms por quadro:

- [Grupo 1 — Odrik, Lethra, Durn, Elune, Lurga e Sivren](grupo-1.gif).
- [Grupo 2 — Ivara, Ossena, Rheed, Nima, Nyra e Neral disfarçado](grupo-2.gif).
- [Grupo 3 — Neral revelado e transformado, Virmura, Dorga, Torvak e Meruna](grupo-3.gif).

| Folha | Nova versão | Foco da revisão |
| --- | --- | --- |
| Odrik Riso-de-Bronze | [v3](../../../../../../assets/terminus/personagens/em-revisao/odrik-v3-120x220.png) | Capa inteira nas quatro vistas; braços e pernas alternam sem congelar as costas. |
| Lethra Passo-Justo | [v4](../../../../../../assets/terminus/personagens/em-revisao/lethra-v4-120x220.png) | Tronco, faixa e lâmina de treino mantidos; botas completas nos perfis. |
| Durn Sete-Rebites | [v3](../../../../../../assets/terminus/personagens/em-revisao/durn-v3-120x220.png) | Avental e proteção auditiva mantidos; amplitude menor no braço esquerdo anatômico. |
| Elune Margem-Rasa | [v3](../../../../../../assets/terminus/personagens/em-revisao/elune-v3-120x220.png) | Roupa, cabelo preso e porta-mapas permanecem durante a alternância dos membros. |
| Lurga Duas-Risadas | [v3](../../../../../../assets/terminus/personagens/em-revisao/lurga-v3-120x220.png) | Mecha esquerda, pulseira e roupa preservadas; pernas deslocam-se em vez de apenas mudar de iluminação. |
| Sivren Guarda-Folhas | [v3](../../../../../../assets/terminus/personagens/em-revisao/sivren-v3-120x220.png) | Casaco e rolos permanecem; braços e pés participam do ciclo. |
| Ivara Casa-Aberta | [v4](../../../../../../assets/terminus/personagens/em-revisao/ivara-v4-120x220.png) | Manta e trança preservadas, com passada curta e braços sob a manta sem cortes retangulares. |
| Ossena dos Quadros | [v3](../../../../../../assets/terminus/personagens/em-revisao/ossena-v3-120x220.png) | Pranchetas e coque preservados; alternância completa dos pés e mãos. |
| Theodor Rheed | [v7](../../../../../../assets/terminus/personagens/em-revisao/rheed-v7-120x220.png) | Barba longa, tapa-olho direito anatômico e dois frascos no lado esquerdo preservados. |
| Nima Sete-Nós | [v6](../../../../../../assets/terminus/personagens/em-revisao/nima-v6-120x220.png) | Corpo pequeno preservado; pernas ligadas ao quadril e braços em contrafase. |
| Nyra do Caldeirão | [v3](../../../../../../assets/terminus/personagens/em-revisao/nyra-v3-120x220.png) | Avental, braços e corpo largo completos nos passos; apoio dos pés mantido. |
| Neral, apresentado como Savel — disfarce | [v3](../../../../../../assets/terminus/personagens/em-revisao/neral-disfarce-v3-120x220.png) | Luvas, gola alta e casaco inteiros durante a caminhada. |
| Neral, apresentado como Savel — revelado | [v3](../../../../../../assets/terminus/personagens/em-revisao/neral-revelado-v3-120x220.png) | Mãos claras, marcas e mangas mantidas; pernas sem recortes do casaco. |
| Neral, apresentado como Savel — transformado | [v3](../../../../../../assets/terminus/personagens/em-revisao/neral-transformado-v3-120x220.png) | Constituição ampliada preservada; mãos, casaco e botas permanecem nos três quadros. |
| Virmura | [v3](../../../../../../assets/terminus/personagens/em-revisao/virmura-v3-120x220.png) | Tranças e braços completos; pernas articuladas sem apagar o tronco. |
| Dorga Malho-Negro | [v3](../../../../../../assets/terminus/personagens/em-revisao/dorga-v3-120x220.png) | Faixa e luva mantidas nos lados anatômicos das poses de repouso; não há espelhamento de vistas. |
| Torvak Quebra-Ferro | [v3](../../../../../../assets/terminus/personagens/em-revisao/torvak-v3-120x220.png) | Trança e antebraços preservados; braços e pernas participam da caminhada. |
| Meruna Voss | [v3](../../../../../../assets/terminus/personagens/em-revisao/meruna-v3-120x220.png) | Óculos, cabelo, casaco e mãos preservados; botas sem deformação por cisalhamento. |

## Verificação e limites

As 18 folhas passaram pela verificação de PNG RGBA 120 × 220, grade 3 × 4, apoio em y=52 e enquadramento. Os 72 repousos são idênticos aos anteriores; os rostos dos passos conservam os pixels do repouso, deslocados um pixel para acompanhar a marcha. As versões aprovadas anteriores não foram alteradas.

Quatro testes de regressão cobrem mãos em contrafase sem desaparecimento, translação de uma bota inteira sem recolorir ou deformar seus pixels preservação da ponta da lâmina abaixo da cintura e seleção da nova candidata na galeria quando existe uma versão aprovada anterior. Isso complementa a inspeção visual; não comprova sozinho naturalidade do ciclo.

[Verificação de preservação](verificacao-movimento.json) · [Auditoria do elenco](../auditoria-elenco.json) · [Método](../../../../../../tools/corrigir_movimento.py) · [Configuração por personagem](../../rig-movimento.json).

O status continua em desenvolvimento. O aceite das versões antigas não é transferido para estas correções, e esta revisão não altera as fichas nem integra os sprites ao motor.
