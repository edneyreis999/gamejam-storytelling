# Verificação da edição para jogadores

Status: em desenvolvimento.

Os testes usam a campanha compartilhada para preparar saves V3. As ações verificadas no navegador entram pela interface pública: importar, ler, escolher, visitar, rolar, exportar e consultar o diário. A preparação não representa um playtest humano completo.

Na raiz do projeto, com Node.js e as dependências Playwright já mantidas em `coreto/tools/qa/runner/`:

```powershell
node --test docs/terminus/jogo/tests/*.test.cjs
node --test docs/terminus/prototipo/tests/*.test.cjs docs/terminus/prototipo/tests/localization.cjs docs/terminus/prototipo/tests/localization-messages.cjs
node coreto/tools/qa/runner/node_modules/playwright/cli.js test -c docs/terminus/prototipo/tests/narrative.playwright.config.cjs
```

O último comando executa os projetos `player` e `narrative`. Acrescente `--project player`, `--project narrative` ou `--grep P07` para selecionar casos; `--list` mostra a seleção sem abrir o navegador. Edge é o padrão. `TERMINUS_QA_BROWSER=chrome` seleciona o Chrome instalado.

Cada worker possui um navegador, contextos isolados e, quando necessário, um servidor somente leitura em porta efêmera. A configuração valida `loki.config.json` e limita a execução a dois workers/navegadores, respeitando separadamente os dois tetos configurados. Os metadados do relatório registram os limites e suas fontes. Não execute outra suíte concorrente sem coordenar sua capacidade.

Resultados JSON, capturas, downloads e traces de falha ficam em `.artifacts/terminus-player/`. O runner encerra contextos e navegadores; a fixture encerra todas as conexões de seu servidor no teardown. Preserve uma rodada anterior antes de repetir, pois o Playwright limpa o diretório de resultados. A suíte registra erros de JavaScript, console e recursos por caso.

Os casos de jogador cobrem abertura por arquivo e HTTP sem recursos editoriais, importação e exportação V3, isolamento do protótipo, armazenamento indisponível, texto gradual, entrada repetida, toque emulado, deslocamento interrompido, resultados de dado persistidos, opções, diário, encontros e telas nos dois idiomas. O teste de voltar no navegador anexa se houve restauração real pelo cache de navegação; uma navegação que recarrega a página não comprova esse cache. As capturas precisam de inspeção visual; não são baselines aprovadas automaticamente.

Para ampliar a cobertura, acrescente um `test()` independente em `player.browser.cjs`, receba a página da fixture e mantenha seus saves e evidências no contexto e diretório desse caso. Não escreva nos dados autorais nem crie um navegador dentro do caso. Testes puros de regras continuam na suíte do protótipo; a suíte local cobre o runtime extraído e a apresentação.
