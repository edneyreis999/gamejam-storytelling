# Verificação da integração do mapa

Status: em desenvolvimento.

A integração mantém a campanha e o formato V3. Esta verificação cobre a apresentação Coreto r2, o mapa ilustrado e sua ligação com as atividades reais. Os resultados de `VERIFICACAO-V3.md` e de `mapa/historico/` são históricos e não substituem esta execução.

## Cobertura automatizada

- **71 testes passaram:** os 64 testes existentes de campanha/apresentação e sete testes de mapa. Incluem mudança do destino após entrega, múltiplas atividades, convite liberado, intervenção com e sem saldo, recrutamento encerrado, revanche e replay de posição antiga.
- A suíte de navegador percorre abertura/Q-A1 pelos controles, os 13 locais e o portal, retorno com foco, localização pelo Diário, ferramentas editoriais sem alterações no save, exportação/importação e recarga de batalha.
- Resoluções: **1280 × 720**, **1920 × 1080**, **844 × 390** e orientação bloqueada em **390 × 844**. Há verificações de alvos de 44 px, sobreposição de marcadores, teclado, toque emulado, cancelamento de gesto, rolagem interna, movimento reduzido e recuperação de imagens ausentes.
- As fontes são locais, com pesos reais. O scanner de tokens não encontrou cores fora de `tokens.css`. Os contrastes de texto/papel e ação são calculados pela suíte a partir dos estilos do navegador.
- O gerador de geometria foi executado com Python/Pillow: 14 destinos, 19 fundos referenciados e recortes derivados do alfa, sem modificar as imagens.

O teste usa Playwright instalado pelas dependências do guia de QA, com Chrome local. Os fontes e manifests de `coreto/` permanecem intactos. Isso não equivale a executar o runner Coreto nem a testar o runtime RPG Maker.

## Evidências da execução

As evidências locais ficam em [`.artifacts/terminus-prototipo/`](../../../.artifacts/terminus-prototipo/), fora de `coreto/` e ignoradas pelo Git:

| Arquivo | Evidência |
| --- | --- |
| `unit-tests.tap` | Resultados dos testes de motor, apresentação e mapa |
| `browser.json` | Resultado e versão do navegador, verificações e limites |
| `mapa-1280.png`, `mapa-1920.png`, `mapa-844.png` | Composição nas três resoluções horizontais |
| `orientacao-retrato.png` | Orientação vertical e suspensão da interação |
| `leitura-844.png`, `leitura-844-sem-aviso.png`, `texto-longo-844.png` | Leitura, aviso fora do quadro e rolagem |
| `intervencao-disponivel.png`, `sem-saldo.png` | Indicadores conforme a economia real |
| `falha-cidade.png`, `falha-cenario.png` | Recuperação das imagens |
| `batalha-final.png`, `coreto.png`, `previa-editorial.png` | Composição e separação das ferramentas |
| `alpha.json` | Auditoria atual dos recortes |
| `migracao.json` | Inventário e hashes dos 33 arquivos da pasta retirada |

Para repetir a suíte no mesmo navegador:

```powershell
$env:TERMINUS_QA_BROWSER='chrome'
node docs/terminus/prototipo/tests/browser.cjs
```

O teste escolhe Português pelo seletor público, para não depender do idioma inicial. A abertura por arquivo é verificada dentro da mesma suíte; a execução principal usa um servidor temporário. As capturas aguardam a decodificação das imagens antes de serem gravadas.

## Migração e revisão

O manifesto, o gerador, os prompts e a documentação útil foram incorporados a `prototipo/mapa/`. Os prompts e todas as evidências antigas foram comparados por SHA-256 com os originais. A navegação e os testes foram adaptados à campanha; o terreno, as fachadas e o portal continuam nos PNGs existentes de `assets/terminus/mapa/` e agora têm registro e usos no catálogo.

A pasta antiga foi excluída após confirmar o caminho absoluto `C:\projetos\gamejam-storytelling\docs\terminus\prototipos`, inventariar arquivos rastreados e não rastreados e verificar as dependências. Nenhum arquivo não rastreado estava nessa pasta.

A revisão `deslop` retirou chamadas sem efeito e argumentos redundantes da integração. A revisão visual também corrigiu avisos que cobriam controles, cabeçalhos vazios de recrutamento e informações de produção que apareciam durante a partida. Mudanças editoriais e de idioma feitas em paralelo no workspace foram preservadas.

Conferência final após a exclusão: **aprovada em 19/10/2026**, com 71 testes e suíte de navegador no Chrome 155.0.8059.80. Abertura por servidor e `file://` passaram; nenhum erro de execução JavaScript foi registrado. Contrastes medidos: texto/papel **14,54:1** e texto/ação **10,88:1**. As capturas foram inspecionadas, incluindo mapa, leitura em celular, texto extenso, Coreto, batalha e ferramentas editoriais.

## Limites

Toque foi emulado; aparelho físico e leitor de tela não foram testados. Aceite artístico e avaliação humana do ritmo de leitura permanecem com o autor. A entrega não acrescenta missões nem altera economia ou progressão.
