# Validação dos dumps

Verificação executada em 18 de outubro de 2026 contra as instalações Windows/Steam identificadas nos manifestos. Resultado: extração e integridade dos artefatos verificadas; referências estáticas não resolvidas documentadas abaixo. Não houve execução dos jogos.

## Resultado por jogo

| Verificação | Punch Club | Punch Club 2 |
| --- | ---: | ---: |
| Idiomas preservados | EN e PT-BR | EN e PT-BR |
| Entradas por idioma | 2.359 | 14.779 |
| Aliases por idioma | 56 | 363 |
| Chaves faltantes/extras de PT-BR em relação a EN | 0 / 0 | 0 / 0 |
| Definições de quests | 85 | 179 |
| Objetos com leitura integral e reserialização byte a byte | 3 | 3 |
| Containers enumerados (assets, cenas e bundles) | 134 | 165 |
| Fluxos | 186 classes uScript | 930 grafos FlowCanvas |
| Nós FlowCanvas | Não se aplica | 50.676 |
| Conexões de execução e dados | Preservadas no código | 53.743 |
| Nós de múltipla escolha FlowCanvas | Não se aplica | 212 |
| Arquivos de código decompilado | 586 | 532 |
| Arquivos `.txt` reproduzidos | 604 | 1.479 |

## Conferências realizadas

- A leitura dos quatro recursos de localização e dos dois `GameBalance` consumiu todos os bytes. A reserialização reproduziu exatamente os bytes de origem, sem descartar campos ou aceitar leitura parcial.
- Todos os arquivos estruturados foram gravados e recarregados. Nos grafos, a expansão `graph` corresponde ao JSON da string original `_serializedGraph`; as referências de origem e destino das conexões apontam para nós presentes.
- Os hashes dos arquivos de origem foram comparados antes e depois da extração e reconferidos na instalação. Nenhuma fonte mudou.
- Foram verificados UTF-8 estrito, extensões `.txt`/`.md`, hashes e tamanhos dos arquivos exportados. Somente EN e PT-BR permaneceram nas pastas de localização.
- Uma extração nova, com o script final e apenas esses dois idiomas, reproduziu os 2.083 arquivos `.txt` da entrega byte a byte. Os índices de hashes cobrem os arquivos gerados, exceto os próprios índices. READMEs e este relatório são documentação editorial.
- As quebras de linha dos dumps são fixadas em LF por `.gitattributes`, evitando que a conversão automática do Git no Windows invalide os hashes.

Exemplos de encadeamento conferidos: a quest 10 do primeiro jogo chama `tutorial_street_robbery`, cujo código contém `firstscene_1`; `bobo_acoustic` preserva as alternativas `bobo_acoustic_hero_w2` e `bobo_acoustic_hero_w3` e seus eventos. No segundo jogo, `Event_DLC-DreamLabFromScene` preserva os nós de fala e a chamada a `Event_DLC-DreamLabBoth`. O dump mantém os campos originais de condições e efeitos; não os converte em uma ordem narrativa presumida.

## Referências não resolvidas e limites

**Punch Club:** as 77 chamadas diretas de quests para uScript foram resolvidas para classes exportadas. Das 1.459 ocorrências de literais de fala e opções indexadas, nove não correspondem a chave ou alias inglês. São textos literais em `demo_street_1`, `russia_fight` e `after_rob_fight`; permanecem intactos no código. Veja [o relatório](punch-club-1/fluxos/referencias-nao-resolvidas.txt).

**Punch Club 2:** dos 14.224 candidatos a referências indexados, 103 não foram resolvidos: 100 textuais, duas chamadas para `TestSewerage` em `FlowScriptTest2` e o ID `wrong` em `TestStoryTree`. Veja [o relatório](punch-club-2/fluxos/referencias-nao-resolvidas.txt). A existência de um valor literal ou de um grafo de teste não comprova um defeito em conteúdo acessível ao jogador.

Os índices de referências cobrem literais reconhecidos, sem avaliação de expressões dinâmicas, Lua, estado de partida ou todos os possíveis gatilhos de runtime. Os recursos e códigos completos pertinentes permanecem disponíveis para inspeção. A contagem de quests inclui entradas de teste ou obsoletas existentes no recurso; não equivale a uma lista de missões jogáveis. A presença de conteúdo de DLC não comprova sua disponibilidade na conta.
