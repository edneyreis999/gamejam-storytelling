# Punch Club 2: Fast Forward — dump Windows

Steam AppID **1161590**, build **20464979**, Unity **2022.3.30f1**. Extração estática da instalação local, incluindo recursos de Iron Fist presentes nos arquivos. Referência externa, com spoilers.

## Textos e quests

- [Português brasileiro](localizacao/lng_pt-br.txt) e [inglês](localizacao/lng_en.txt): 14.779 entradas por idioma.
- Estruturas completas: [PT-BR](localizacao/lng_pt-br.estrutura.txt) e [EN](localizacao/lng_en.estrutura.txt). Incluem aliases e metadados de localização. Os demais idiomas não integram a entrega.
- [179 definições de quests](quests/quests.txt): IDs, pais, ícones, zonas, conexões e expressões serializadas.
- [GameBalance completo](quests/GameBalance.txt): também preserva tabelas de eventos, lógica, itens, personagens e outros recursos relacionados à progressão.

## Fluxos

Há 930 grafos FlowCanvas em `fluxos/grafos/`, totalizando 50.676 nós e 53.743 conexões de execução e dados. O [inventário](inventario-containers.txt) relaciona cada grafo ao container e PathID de origem. Cada arquivo preserva a string serializada original, o objeto Unity e uma expansão legível do grafo, incluindo opções de resposta, condições e parâmetros.

Exemplo: [Event_DLC-DreamLabFromScene](fluxos/grafos/Event_DLC-DreamLabFromScene---9216498144978548214.txt) contém falas, ações e uma chamada para outro grafo. As chaves como `ev_dlc1_start_dream_lab_1` podem ser consultadas nos dois idiomas. Não há substituição automática de texto ausente.

O [índice de código](fluxos/codigo/indice.txt) reúne 532 classes decompiladas pertinentes à interpretação dos nós, diálogos e quests. Os [14.224 candidatos a referências](fluxos/referencias.txt) incluem falas, opções, nomes de scripts e IDs de quests.

Após consultar chaves e aliases ingleses, nomes de grafos e IDs de quests, permanecem [103 ocorrências não resolvidas](fluxos/referencias-nao-resolvidas.txt): 100 textuais, duas chamadas de script e um ID de quest. As chamadas e o ID de quest não resolvidos aparecem em grafos de teste. Textos literais ou valores calculados não constituem necessariamente uma referência ausente ou um defeito do jogo.

## Procedência

- [Manifesto e contagens](manifesto.txt), [build Steam](steam-appmanifest.txt) e [objetos exportados](objetos-exportados.txt).
- [Fontes e hashes](fontes.txt), [inventário de containers](inventario-containers.txt) e [hashes dos arquivos gerados](arquivos.txt).
- [Cobertura de localização](localizacao/cobertura.txt), [inconsistências de conexões](fluxos/inconsistencias.txt) e [validação geral](../VALIDACAO.md).

Os três objetos de idioma/quests preservados passaram por reserialização idêntica byte a byte. Todas as referências de origem/destino das conexões de grafos foram encontradas. A análise não determina o estado de uma partida, a disponibilidade de DLC nem quais grafos de teste são utilizados. Não houve execução do jogo.
