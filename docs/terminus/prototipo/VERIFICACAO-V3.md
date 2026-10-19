# Verificação da integração V3

Status: em desenvolvimento.

Data: 19/10/2026. Revisão direta por Codex. Escopo: protótipo HTML, mapa, campanha, save e catálogo. Autoridade visual: [tokens.css](tokens.css), contrato de apresentação do protótipo e registros de produção. Nenhum arquivo congelado da Coreto ou código do RPG Maker foi alterado nesta implementação.

## Resultado

A suíte tem **64 testes passando**, incluindo seis combinações de guilda/X–Y com equipes vazias, completas e parciais, além dos dez candidatos favorecidos. O teste de navegador registra **16 verificações passando** no Edge 155.0.4283.62. As evidências brutas estão em [unit-tests.tap](verificacao/unit-tests.tap) e [browser.json](verificacao/browser.json).

A `main`, incluindo `73686bd`, foi incorporada à branch `add/assets-coreto` pelo merge `33c6047`. Os conflitos de visão e catálogo de locais preservaram as decisões narrativas e os registros artísticos. O protótipo usa save 3 e começa uma campanha nova.

## Campanha e persistência

| Cenário | Resultado verificado |
| --- | --- |
| Seis trajetórias, solo/5 aliados/3 aliados | Chegam ao encerramento; solo sem gastar Ludos; restauração reproduz o estado completo. |
| B1/C1 em ambas as ordens; cadeias intercaladas | Apresentações independentes; propostas não aderem; cenas compartilhadas não repetem. |
| Cartografia por A, B ou C | Cada cadeia resolve o trecho conhecido sem exigir as outras; E04 confirma só uma guilda. |
| Buscas e entregas | Destino incorreto recusado; posse e entrega persistidas; recibos, chave, etiquetas e recompensas sem duplicação. |
| Perguntas e “Depois” | Ordem das perguntas registrada; retomada conserva cursor e inspeção. Candidatos vistos ficam conhecidos mesmo antes de concluir a etapa. |
| B4/C4 | Bônus zero, dificuldade 8, empate como falha, duas rerrolagens pagas, revanche gratuita; não avançam campeonato. |
| Convites e intervenção | Espera X/Y, exceção R2/A, custo 3, acesso pago uma vez, convite separado da recompensa, fechamento nas eliminatórias. |
| Semifinal | Adversários persistem em save e revanche; quarenta falas cobrem os quatro estados de conhecimento/resolução. |
| Neral | Transformação uma vez; revanche no recuo local; forma transformada preservada até a morte. |
| L1/L2/L3 | Alternativas de 1 Ludo com retorno ao presente; consequências principais preservadas. |
| Consultas e saves inválidos | Diário e prévias não avançam estado; formatos antigos e ações inválidas são recusados. |

O [relatório de percursos](verificacao/percursos.json) estima palavras e minutos para doze trajetórias. Não é medição de playtest humano.

## Auditoria de interface — ui-craft

**Tarefa:** o jogador abre o mapa para encontrar o próximo interlocutor ou entrega e retomar objetivos iniciados.

**Cena de uso:** leitura individual em computador ou telefone, com pausas entre conversas; nomes, atividades e retorno precisam ser legíveis sem interpretar uma planta ilustrada. Registro Product, variação visual 3, movimento 1, densidade 3. O mapa reutiliza a linguagem dos objetos provisórios solicitada no plano.

### Achados e correções

| Gravidade | Achado | Correção e evidência |
| --- | --- | --- |
| Bloqueador, corrigido | A renderização geral roubava o foco restaurado ao destino. | Restauração após render; teste de Enter, retorno e foco passa. |
| Bloqueador, corrigido | Uma ação de concentrado aparecia fora de Neral. | Removida a inserção global; teste da abertura e da forma final. |
| Bloqueador, corrigido | Convites podiam antecipar a janela de X/Y. | Janela validada pelo motor, com teste da exceção R2/A. |
| Bloqueador, corrigido | Diário não reunia itens e objetivos na primeira montagem. | Consultas explícitas e teste de ausência de mutação durante a leitura. |
| Correção de clareza | Fichas exibiam caminho previsto mesmo quando havia PNG produzido. | Arquivo selecionado compartilhado entre ficha, CSV e palco. |
| Correção de clareza | Rótulos diziam “colorido”/“a produzir” sobre imagens integradas. | Tempo narrativo e status artístico identificados separadamente. |

### Cobertura de estados

| Superfície | Padrão | Hover/ativo | Foco | Desabilitado | Vazio | Erro | Conclusão |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Destinos e portal | ✓ | ✓ | ✓ | ✓, cena/batalha e recuo local | Sem atividade indicado | Ação inválida recusada pelo motor | Local aberto e retorno |
| Escolhas e entregas | ✓ | ✓ | ✓ | Saldo insuficiente | Não aplicável | Mensagem de ação inválida | Efeito registrado uma vez |
| Diário/equipe | ✓ | Não aplicável | Controles nativos | Sem convites no diário | Objetivos/itens vazios identificados | Não aplicável | Consulta sem avanço |
| Imagens | Arquivo ou placeholder | Não aplicável | Ficha acessível | Não aplicável | Representação provisória | Falha legível | PNG decodificado |
| Importação/confirmação | ✓ | ✓ | Diálogo nativo | Não aplicável | Seletor cancelável | Formato incompatível | Retomada no cursor exportado |

Não há carregamento remoto de dados na campanha. Os campos de carregamento de tabelas remotas e modo escuro não se aplicam a esta superfície local de tema claro.

### Critérios visuais e acessibilidade

- Hierarquia, alinhamento, textos longos e ausência de overflow da página conferidos em 320, 768 e 1280 px. A rolagem horizontal fica na área do mapa.
- Destinos são botões nativos, com foco visível, Tab, setas, Enter/Espaço e toque emulado. O portal permanece fora da área rolável.
- Entrega com `prefers-reduced-motion` foi conferida no elemento real: animação desativada e texto preservado.
- As 229 imagens foram decodificadas no navegador. Os testes também conferem existência, dimensões e canal alfa dos 210 bustos. A inspeção das capturas confirmou recorte e proporções.
- Auditoria de cores: nenhuma cor fora dos tokens. Contrastes calculados: texto/papel 12,74:1; texto secundário/papel 5,52:1; botão principal 7,42:1; foco/superfície 6,13:1.
- Sem ocorrências remanescentes observadas de interatividade falsa, foco ausente, overflow textual, emojis decorativos, gradientes, vidro, ilustração genérica, centralização de todo o conteúdo ou raios arbitrários. Dimensões fixas de palco e mundo do mapa são parte do contrato solicitado. Placeholders repetidos são intencionais; nomes e atividades distinguem os destinos.

### Capturas

| Momento | Evidência |
| --- | --- |
| Mapa amplo | [1280 px](verificacao/mapa-1280.png) |
| Mapa intermediário | [768 px](verificacao/mapa-768.png) |
| Mapa estreito | [320 px](verificacao/mapa-320.png) |
| Entrega e movimento reduzido | [Leitura em 320 px](verificacao/leitura-320.png) |
| Local sem missão | [Quarta guilda](verificacao/local-quarta.png) |
| Portal | [Coreto](verificacao/coreto.png) |
| Prévia editorial | [Cenas e variantes](verificacao/previa.png) |
| Batalha final | [Neral transformado](verificacao/neral-transformado.png) |

## Limites da verificação

Executado no Windows, com Node 20.18.0 e a biblioteca Playwright das dependências locais de QA; o runner Coreto, que possui requisitos próprios, não foi executado. O navegador é headless e o toque é emulado. Não houve ensaio em aparelho físico, leitor de tela, outros navegadores ou impressão. A comparação de tokens não substitui uma auditoria completa de contraste sobre cada imagem.

Arte permanece em avaliação; mapa e objetos continuam provisórios. A origem artística e as pendências narrativas estão no [registro editorial](REVISAO-EDITORIAL.md). Não houve publicação, port automático para RPG Maker ou alteração dos plugins congelados.
