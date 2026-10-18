# Punch Club — dump Windows

Steam AppID **394310**, build **1734185**, Unity **5.5.3f1**. Extração estática da instalação local, preservando português brasileiro e inglês. Referência externa, com spoilers.

## Textos e quests

- [Português](localizacao/lng_ptbr.txt) e [inglês](localizacao/lng_en.txt): 2.359 entradas por idioma, com 56 aliases por recurso.
- Estruturas completas: [PT-BR](localizacao/lng_ptbr.estrutura.txt) e [EN](localizacao/lng_en.estrutura.txt). Preservam ordem e campos originais, sem aplicar fallback de tradução.
- [85 definições de quests](quests/quests.txt): IDs, gatilhos, scripts de início/sucesso/falha e recompensas, incluindo entradas de teste presentes no recurso.
- [GameBalance completo](quests/GameBalance.txt): o objeto original se chama `game_data`. Inclui tabelas auxiliares e trechos Lua que participam da narrativa.
- [Referências de quests para uScript](quests/referencias-scripts.txt): as 77 chamadas diretas com prefixo `:` apontam para scripts exportados.

## Fluxos

O [índice do código](fluxos/codigo/indice.txt) localiza as classes decompiladas. Há 186 classes com métodos `Relay_*`, seus componentes e classes auxiliares de diálogo, quests e ações uScript. São 586 arquivos de código ao todo, incluindo [GJL](fluxos/codigo/GJL.txt), que implementa a localização.

Exemplo de consulta: procure `firstscene_1` no texto de idioma e em [tutorial_street_robbery](fluxos/codigo/tutorial_street_robbery.txt). Os campos `logic_*` guardam parâmetros; os métodos `Relay_*` e os eventos preservam o encadeamento. A definição de quest com ID 10 chama esse script em `start_lua`.

O [índice de referências textuais](fluxos/referencias.txt) relaciona 1.459 literais de falas e opções aos scripts. [Nove ocorrências não foram resolvidas](fluxos/referencias-nao-resolvidas.txt) como chave ou alias inglês. Literais, valores calculados e chamadas Lua devem ser conferidos nos arquivos originais exportados; o índice não substitui o código completo.

## Procedência

- [Manifesto e contagens](manifesto.txt), [build Steam](steam-appmanifest.txt) e [objetos exportados](objetos-exportados.txt).
- [Fontes e hashes](fontes.txt), [inventário de containers](inventario-containers.txt) e [hashes dos arquivos gerados](arquivos.txt).
- [Cobertura de localização](localizacao/cobertura.txt) e [validação geral](../VALIDACAO.md).

Os três objetos de idioma/quests preservados passaram por reserialização idêntica byte a byte. Nenhum jogo foi executado. C# decompilado é representação do assembly, não o código-fonte original do estúdio nem um projeto preparado para compilação. Não se presume que todas as quests exportadas sejam alcançáveis.
