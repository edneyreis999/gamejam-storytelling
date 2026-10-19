Jogo construido para gamejam Ctrl+AI+Jam Week 02.

A weekly 48-hour game jam where we push AI to its limits.
Every week, jammers build a game from scratch using AI for code, art, audio, writing, or a mix of all of it.

The goal isn't to avoid the hard parts. It's to find out how far iterative prompting can take you, where it breaks, and what clever workarounds you invent when it does. Writers can code, coders can make art, and designers can compose.



Theme	STORYTELLING
Every game tells a story. This week, the story is the point: what happens, who tells it, and how it unfolds as you play.

Limitation	???

## Documentação de Terminus

Status: em desenvolvimento.

| Para | Consulte |
| --- | --- |
| Jogar e revisar cenas e desenhos | [Protótipo HTML](docs/terminus/prototipo/index.html) · [guia de uso e testes](docs/terminus/prototipo/README.md) · [inventário de arte](docs/terminus/prototipo/INVENTARIO.md) |
| Conhecer as decisões confirmadas e os pontos em aberto | [Visão do jogo](docs/terminus/visao-do-jogo.md) |
| Ler os arcos de Ghork e do campeão e a sequência da campanha | [Storytelling de Terminus](docs/terminus/storytelling/README.md) |
| Escrever personagens, cenas e diálogos | [Índice do elenco e guia de leitura](docs/terminus/personagens/README.md) |
| Consultar cenários e orientar a produção de fundos | [Catálogo de locais e guia de leitura](docs/terminus/locais/README.md) |
| Retomar o desenvolvimento da história com o autor | [Roteiro para a próxima entrevista](docs/terminus/storytelling/proxima-entrevista.md) |

A visão concentra estrutura e regras; a base narrativa preserva os detalhes confirmados. O arco de Ghork tem eixo aprovado; suas cenas, as fichas e a análise identificam propostas que aguardam validação. Os materiais em `docs/docs_externas/` são referências.

## Desenvolvimento e histórico

- Para alterar o protótipo, consulte seu [guia de manutenção](docs/terminus/prototipo/README.md#manutenção), com fontes editáveis, arquivos gerados e testes, e a [skill de visual novel HTML](.agents/skills/game-prototype-vn-html/SKILL.md).
- Para preparar ou consultar publicações, use o [índice de devlogs](docs/terminus/devlogs/README.md), que distingue posts publicados de rascunhos.
- Para consultar a continuação anterior ao livro, use o [índice das anotações antigas](docs/docs_externas/universo-coreto/anotacoes-antigas/README.md); esses documentos não substituem as decisões do jogo.

Teste a campanha a partir da raiz:

```sh
node --test --test-reporter=spec docs/terminus/prototipo/tests/*.test.cjs
```

## Projeto RPG Maker MZ

Projeto RPG Maker MZ: [Terminus](rpg-maker/Terminus/game.rmmzproject), com tela e área de UI configuradas em 1280 × 720 e o preset `coreto-default` (Design System 1.2.1). A base usa CoreEngine, MessageCore, OptionsCore, SaveCore e ExtMessageFunc. A [configuração da interface](docs/terminus/interface-coreto.md) registra o título e os ícones; mapas e personagens ainda são os recursos provisórios do MZ.

- [Histórico de ajustes de design](docs/terminus/historico-ajustes-design.md)
