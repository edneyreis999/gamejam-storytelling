# Protótipo de Terminus — V3

Status: em desenvolvimento.

Abra [index.html](index.html) em um navegador atual. O jogo roda localmente, sem build, servidor ou instalação. Também pode ser servido a partir da raiz do repositório; mantenha a pasta `assets/terminus/` disponível, pois o protótipo referencia esses arquivos diretamente.

A V3 integra o [roteiro de quests](../storytelling/quests-da-campanha.md): quinze quests de guilda, sete do arco 2, cinco conflitos de recrutamento, campeonato, invasão, encerramento e cenas compartilhadas E00–E08. Preserva as três secundárias e permite terminar sozinho, sem gastar Ludos.

## Jogar

- A exploração abre depois de Q-A1. O mapa tem **13 destinos e um portal fixo**, todos com identificação textual. Os destinos são placeholders; as imagens de mapa ficam preservadas para uma integração futura.
- Abra um destino para ver o cenário e suas atividades. Buscas, entregas e retornos exigem visitar o local indicado. As cadeias podem ser intercaladas antes da adesão; ouvir uma proposta não escolhe a guilda.
- Use mouse ou toque. No mapa, Tab e setas percorrem os destinos; Enter/Espaço abre o selecionado. Em telas estreitas, deslize a área do mapa horizontalmente. “Voltar ao mapa” restaura a posição e o foco do destino.
- Enter/Espaço ou o botão avançam a leitura. Escolhas aparecem ao final do trecho. “Decidir depois” conserva a inspeção e a posição de leitura nos conflitos que permitem adiar.
- O portal leva à Noite da História entre cenas. Termine conversas e batalhas antes de sair. Durante a revanche da invasão, o recuo permanece no corredor do coliseu.
- O **Diário** consulta objetivos, itens em posse, equipe e histórico. Convites e intervenções acontecem nos locais dos personagens. A confirmação das eliminatórias encerra os recrutamentos, inclusive numa campanha solo.

O palco tem referência de 1280 × 720. Textos aparecem completos, com um busto por vez. O painel descritivo preserva a composição anterior atenuada. A entrega de objetos é também descrita em texto e funciona com movimento reduzido.

## Regras experimentais

| Regra | Valor |
| --- | --- |
| Opção comum paga / nova rolagem | 1 Ludo |
| Exceção de recrutamento | 3 Ludos, uma vez por par |
| Conflito curto / longo | 2 / 3 Ludos |
| Cada secundária | 3 Ludos |
| B4 e C4 | Dificuldade 8; independentes do campeonato |
| Campeonato e confronto final | 8, 9, 10, 11, 12 e 12 |

Vitória exige `D20 + aliados > dificuldade`; igualdade é falha. Ghork não entra no bônus. Uma nova rolagem consome uma carga comprada no Coreto e substitui o dado anterior. Aceitar o revés permite revanche gratuita. Em B4 o fardo só é recolhido depois da vitória; em C4 o estojo é restituído antes do duelo.

R1/R2 podem ser resolvidos desde Q-A1. Os convites aguardam a trajetória X/Y concluída, exceto R2 da guilda A, cuja condição já está definida pela adesão. R3/R4 abrem depois da investigação; R5 depois da classificação. Resolver um conflito, convidar e pagar uma exceção são operações distintas.

## Arte e revisão

São **19 fundos selecionados** e **210 expressões disponíveis para 42 visuais**. A encenação usa o subconjunto correspondente aos participantes e às expressões explicitamente escolhidas. Os arquivos continuam **em avaliação artística**. Concepts orientam identidade e enquadramento; as expressões são os bustos do palco. Lala e figurantes sem imagem permanecem provisórios. Savel, Neral revelado e Neral transformado usam visuais distintos.

O registro `art.js`, alimentado por `asset-files.js`, é compartilhado pelo palco e pelo catálogo. As imagens mantêm proporções e transparência. Os fundos têm 1672 × 941 px, exceto a recepção de Virmura, com 1672 × 940; os bustos têm 504 × 672 px RGBA. Falhas de carregamento mostram o arquivo esperado e uma mensagem legível.

- **Cenas e variantes:** prévias por cena, trecho, resposta, guilda, X/Y e contexto, sem alterar o save. Incluem as quarenta reações da semifinal e os diferentes momentos do Coreto.
- **Inventário de arte:** fichas, usos, filtros e exportação CSV. O [inventário gerado](INVENTARIO.md) distingue referências com uso no roteiro das demais disponíveis.
- **Direção de arte:** mostra IDs e referências fora do palco; pode ser desligada para jogar.

As prévias contêm spoilers e contextos editoriais que não são partidas reais. Consulte os [fundos selecionados](../arte/locais/README.md), os [concepts](../arte/bustos/README.md) e a [matriz de expressões](../arte/bustos/expressoes/README.md). Sprites de movimentação e assets do mapa não foram aplicados à apresentação VN.

## Saves

A campanha começa do zero. O formato é **3** e a chave própria é `terminus-campaign-v3`. Na abertura, somente a chave antiga conhecida `terminus-campaign-v2` é removida. Não há migração; a importação rejeita formatos anteriores.

Exportação/importação usa JSON validado por replay. As ações reconstruem local, posição do mapa, etapas, posse e entrega de itens, escolhas, perguntas, cursor de leitura, Ludos, aliados e resultados aleatórios. Carregar não concede novamente objetos ou recompensas. O armazenamento depende da origem e das regras do navegador; use exportação para transportar partidas entre pastas, navegadores ou servidores.

## Manutenção

| Arquivo | Responsabilidade |
| --- | --- |
| `quest-script.js` | Recorte gerado do roteiro, com linha de origem e hash |
| `campaign.js` | Montagem explícita das quests, etapas, locais, falas condicionais e efeitos |
| `content.js`, `supplementary.js` | Matriz, definições comuns, secundárias e intervalos |
| `engine.js` | Ações validadas, progresso, inventário e replay |
| `staging.js`, `stage-view.js` | Passagens, composição e renderização |
| `asset-files.js`, `art.js`, `art-authority.js` | Arquivos selecionados, registro e recorte das fichas |
| `catalog.js` | Variantes, contextos editoriais, usos e CSV |
| `app.js`, `style.css`, `tokens.css` | Navegação e apresentação |

As etapas têm IDs próprios. Os intervalos de linhas usados em `campaign.js` são deliberados: ao editar o roteiro, revise esses intervalos e suas condições antes de regenerar o recorte. O hash detecta fonte desatualizada; não substitui revisão narrativa.

Com Node.js 20 ou posterior, na raiz do repositório:

```powershell
# Helpers mutantes: atualizam apenas os artefatos derivados do protótipo.
node docs/terminus/prototipo/scripts/extract-quest-script.cjs
node docs/terminus/prototipo/scripts/refresh-art-authority.cjs

# Relatório somente leitura; o redirecionamento atualiza o retrato documental.
node docs/terminus/prototipo/scripts/report-art.cjs | Out-File -Encoding utf8 docs/terminus/prototipo/INVENTARIO.md

node --test (Get-ChildItem docs/terminus/prototipo/tests/*.test.cjs).FullName
node docs/terminus/prototipo/tests/report.cjs
node .agents/skills/ui-craft/scripts/detect-token-drift.mjs docs/terminus/prototipo --token-paths tokens.css
```

O teste de navegador usa a biblioteca Playwright já instalada nas dependências de QA e o Edge local: `node docs/terminus/prototipo/tests/browser.cjs`. Ele cria um servidor temporário e gera evidências em `verificacao/`. Para instalar essas dependências, siga o [guia de QA](../../../coreto/docs/qa.md) e seus requisitos. A execução direta da biblioteca nesta entrega não equivale a executar o runner Coreto.

Veja [verificação e auditoria da V3](VERIFICACAO-V3.md) e [revisão editorial](REVISAO-EDITORIAL.md). Toque foi emulado; não houve ensaio em aparelho físico, leitor de tela ou impressão. Aceite artístico e playtest humano de ritmo permanecem fora dessa verificação. Esta entrega não modifica a engine, plugins congelados ou eventos do RPG Maker e não exporta eventos automaticamente.

Para evoluir o protótipo, aplique a [skill game-prototype-vn-html](../../../.agents/skills/game-prototype-vn-html/SKILL.md). A [visão](../visao-do-jogo.md), o [guia de personagens](../personagens/README.md) e o roteiro permanecem as fontes de escopo e narrativa; os registros de arte não aprovam decisões narrativas por si sós.
