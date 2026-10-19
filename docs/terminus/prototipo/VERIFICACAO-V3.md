# Resumo histórico da verificação V3

Status: em desenvolvimento.

Verificação realizada em **19/10/2026**, preservada no commit **`dc6ec7d3791bf01eeef30ee81ecbeae47b717194`**. Este resumo documenta a entrega original do protótipo HTML; não representa o resultado dos testes da versão atual. Para executar os testes, consulte o [guia de manutenção](README.md#executar-testes-e-relatórios).

## Resultados da entrega

Foram registrados **64 testes automatizados aprovados** e **16 verificações de navegador aprovadas**, em Windows, Node 20.18.0 e Edge 155.0.4283.62. O teste usou a biblioteca Playwright das dependências locais de QA, sem executar o runner Coreto.

| Área | Cobertura registrada |
| --- | --- |
| Campanha | Seis combinações de guilda/X–Y com equipes vazias, completas e parciais; encerramento solo sem gastar Ludos; dez candidatos favorecidos. |
| Etapas e itens | Apresentações em ambas as ordens, cadeias intercaladas, propostas sem adesão, comparação dos croquis por qualquer guilda, destino de entregas e recompensas sem duplicação. |
| Persistência | Replay do estado completo, perguntas e adiamentos, cursor de leitura, adversários da semifinal, importação/exportação e rejeição de saves incompatíveis. |
| Combate e recrutamento | B4/C4 independentes do campeonato, empate como falha, rerrolagens e revanche gratuita; janela X/Y e exceção R2/A, convite separado da recompensa e fechamento nas eliminatórias. |
| Encerramento e consultas | Transformação única de Neral e recuo local; intervenções L1/L2/L3; diário e prévias sem avanço da partida. |
| Interface | Larguras de 320, 768 e 1280 px; rolagem restrita ao mapa, teclado, retorno de foco e posição, toque emulado, movimento reduzido e falhas de imagem legíveis. |
| Arte | 229 imagens decodificadas; existência, dimensões e canal alfa dos 210 bustos; inspeção das capturas de mapa, entrega, local, Coreto, prévia e Neral transformado. |

A auditoria registrou cores dentro dos tokens e contrastes calculados de 12,74:1 para texto/papel, 5,52:1 para texto secundário/papel, 7,42:1 para botão principal e 6,13:1 para foco/superfície. O relatório de percursos estimou palavras e minutos para doze trajetórias; não foi uma medição de playtest.

## Limites

O navegador foi executado em headless. Não houve ensaio em aparelho físico, leitor de tela, outros navegadores ou impressão. A comparação de tokens não substitui uma auditoria completa de contraste sobre cada imagem. Aceite artístico, recepção humana das falas e ritmo de leitura não foram verificados.

Arte permanecia em avaliação; mapa e objetos eram provisórios. As fontes e pendências da adaptação estão no [registro editorial](REVISAO-EDITORIAL.md). A entrega não modificou arquivos congelados da Coreto, código ou eventos do RPG Maker, nem realizou publicação ou port automático.

## Recuperar as evidências originais

As oito capturas, `browser.json`, `percursos.json` e `unit-tests.tap` foram retirados da árvore atual e permanecem no commit acima. Na raiz do repositório, este comando recupera esses arquivos e o relatório completo em um ZIP local, sem substituir os arquivos atuais:

```powershell
New-Item -ItemType Directory -Force .artifacts | Out-Null
git archive --format=zip --output=.artifacts/terminus-prototipo-v3-dc6ec7d.zip dc6ec7d3791bf01eeef30ee81ecbeae47b717194 docs/terminus/prototipo/verificacao docs/terminus/prototipo/VERIFICACAO-V3.md
```

Novas execuções usam `.artifacts/terminus-prototipo/`, ignorado pelo Git, conforme o [guia de testes e relatórios](README.md#executar-testes-e-relatórios). Seus resultados podem ser substituídos a cada execução e não atualizam este resumo histórico.
