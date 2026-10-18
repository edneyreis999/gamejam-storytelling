# Dumps de diálogos e quests de Punch Club

Referência externa extraída das instalações Windows/Steam em 18 de outubro de 2026. Não constitui documentação aprovada de Terminus. Contém spoilers e material de DLC, testes e conteúdo possivelmente não utilizado.

| Jogo | Idiomas | Entradas por idioma | Definições de quests | Fluxos |
| --- | ---: | ---: | ---: | ---: |
| [Punch Club](punch-club-1/README.md) | 2 | 2.359 | 85 | 186 classes uScript |
| [Punch Club 2: Fast Forward](punch-club-2/README.md) | 2 | 14.779 | 179 | 930 grafos FlowCanvas |

## Como consultar

- **Ler falas:** abra `localizacao/lng_ptbr.txt` no primeiro jogo ou `localizacao/lng_pt-br.txt` no segundo. Cada separador contém o índice original e a chave do texto. Somente português e inglês foram preservados, conforme o escopo solicitado.
- **Consultar quests:** `quests/quests.txt` reúne as definições; `quests/GameBalance.txt` preserva o recurso completo, incluindo condições, eventos, recursos e tabelas auxiliares que podem participar da progressão.
- **Seguir escolhas e consequências:** use `fluxos/codigo/` no primeiro jogo e `fluxos/grafos/` no segundo. Procure a chave de uma fala nesses arquivos para localizar seus usos. Os arquivos de código contêm C# decompilado, salvo como texto para consulta.
- **Conferir procedência e limites:** leia o README de cada jogo, os manifestos e os relatórios de referências. Para repetir a extração, siga [Reprodução](REPRODUCAO.md).

## Formatos e fidelidade

Todos os arquivos desta entrega são `.txt` ou `.md`, codificados em UTF-8. Os `.txt` estruturados usam notação JSON indentada para preservar listas, identificadores, números, condições, conexões e metadados. A extensão continua sendo `.txt`.

Os arquivos `lng_*.txt` são uma apresentação de leitura. Os correspondentes `lng_*.estrutura.txt` preservam a estrutura serializada completa, inclusive listas paralelas, aliases e metadados. Não há tradução automática nem substituição de textos ausentes por outro idioma. Recursos mistos incluem também textos de interface para não descartar possíveis dependências narrativas.

Cada grafo de Punch Club 2 preserva tanto o objeto com a string `_serializedGraph` original quanto sua expansão legível em `graph`. Isso duplica parte do conteúdo deliberadamente, permitindo conferir a expansão contra o original. As 53.743 conexões incluem execução e dados; não representam uma sequência linear de acontecimentos.

## Verificação e limites

Os quatro recursos de idioma preservados e os dois recursos `GameBalance` passaram por leitura integral e reserialização idêntica byte a byte. Cada arquivo estruturado foi recarregado após a escrita. As referências de origem e destino das conexões de grafos foram verificadas; os hashes das fontes foram comparados antes e depois da extração. O [relatório de validação](VALIDACAO.md) registra os resultados e as referências não resolvidas.

A enumeração de containers abrange assets, cenas e bundles das instalações. No primeiro jogo, os fluxos estão compilados em uScript; no segundo, os grafos exportados foram encontrados no bundle de scripts visuais. Arquivos binários e assemblies permanecem nas instalações, sem cópia para este diretório.

O dump é estático. Não executa o jogo, não determina a ordem real das missões, não comprova acesso a DLCs nem distingue automaticamente conteúdo ativo, obsoleto e de teste. Valores calculados em execução, referências por nome e textos literais podem aparecer nos relatórios como não resolvidos. Esses registros não são automaticamente defeitos dos jogos.

Os atlas HTML anteriores não foram alterados nem utilizados como fonte dos dumps. Em particular, o atlas antigo de Punch Club 1 cita macOS; esta extração usa a instalação Windows atual.
