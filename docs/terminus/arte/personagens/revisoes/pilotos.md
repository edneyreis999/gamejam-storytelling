# Revisão dos pilotos

Status: em desenvolvimento.

Data: 18/10/2026. Geração pela ferramenta integrada `image_gen`, seguida de exportação técnica e acabamento manual de pixels por script, ambos autorizados pelo autor. Nenhuma folha foi aprovada pelo usuário e nenhum lote posterior foi iniciado.

## Candidatas apresentadas

| Personagem | Versão | Resultado do acabamento |
| --- | --- | --- |
| Rheed | rheed-v6-120x220.png | Alternância lateral, braços e dois frascos no quadril esquerdo anatômico; tapa-olho direito preservado |
| Ghork | ghork-v2-120x220.png | Braços e pernas alternados; passada curta, sem indicar lado da lesão ou cura |
| Borun | borun-v3-120x220.png | Alternância das pernas sob a capa; bastão permanece na mão direita |
| Nima | nima-v5-120x220.png | Alternância dos membros nas duas laterais, preservando as cabeças da v2 |

As quatro passaram pela inspeção estrutural: PNG RGBA de 120 × 220 px, transparência binária, 12 células não vazias, margens livres e apoio em y=52. As 48 regiões de cabeça foram comparadas pixel a pixel com suas origens, sem alterações. A revisão visual abrangeu tamanho nativo, ampliação sem suavização, perfis, continuidade de acessórios e prévias das quatro direções na galeria.

As candidatas permanecem em `assets/terminus/personagens/em-revisao/`. A aprovação do autor continua pendente. O acabamento é específico destes pilotos e não deve ser aplicado automaticamente às demais raças ou roupas.

[Galeria](../galeria.html) · [Prévia animada do conjunto](pilotos-caminhada.gif) · [Dados de produção](../controle.json)

## Histórico e mudança de método

- A geração retornou imagens de 926 × 1698 px apesar do pedido de resolução nativa. O autor autorizou exportação técnica por script para cumprir a grade.
- Rheed v3 melhorou os passos frontais, mas perdeu o tapa-olho lateral. V4 recuperou o tapa-olho; permaneciam os perfis repetidos e a migração dos frascos.
- Ghork v1 e Borun v2 repetiam a mesma fase de pernas nos perfis.
- Nima v2 manteve esse defeito no perfil esquerdo. A correção de um quadro isolado alterou cabeça e escala; a montagem v3 foi rejeitada e preservada.
- Após essas tentativas, o autor autorizou explicitamente: “Sim, retocar os pixels por script”. A autorização cobre pernas, braços e continuidade de acessórios, preservando originais e rostos.
- Os estudos `retoque-estudo-1` testaram a inversão parcial das pernas, mas criaram recortes inadequados nas botas. Os estudos 2 desenharam botas com textura simplificada demais. Os estudos 3 recuperaram os pixels das botas originais e corrigiram suas ligações às pernas. São estudos internos, não folhas aprovadas.
- Rheed v5 e Nima v4 ainda tinham vestígios do contorno dos braços antigos. V6 e v5, respectivamente, removem esses vestígios antes do novo traçado. Todas essas imagens foram preservadas.

O [script de acabamento](../../../../../tools/retocar_pilotos.py) registra a autorização e recusa sobrescrita. Cada candidata tem um relatório JSON com a origem e seus hashes. O controle mantém as revisões anteriores e a reprodução das candidatas pelo script atual.

## Verificação e aprovação

Os cinco testes do exportador verificam preservação do original e das células, recusa de sobrescrita, rejeição de cortes na borda, grade incompleta e PNG opaco. A conferência dos pilotos inclui comparação dos hashes das fontes, das referências e das fichas.

Essas verificações não substituem julgamento de anatomia, estilo ou movimento. As folhas estão apresentadas para avaliação do autor; só após sua aprovação serão copiadas para o diretório final. O lote 1 e o estudo das formas de Neral aguardam essa etapa, conforme o plano aprovado.

## Aprovação recebida

Em 18/10/2026, o autor aprovou explicitamente Rheed v6, Ghork v2, Borun v3 e Nima v5, liberando o lote 1. As versões acima foram copiadas sem alteração para `assets/terminus/personagens/`, com os IDs das fichas. O registro anterior descreve a revisão antes desta aprovação. A autorização mantém o estudo de Neral como etapa anterior às suas folhas completas.
