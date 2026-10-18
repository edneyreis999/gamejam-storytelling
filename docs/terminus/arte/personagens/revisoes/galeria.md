# Verificação da galeria

Status: em desenvolvimento.

Interface local para inspeção das 42 folhas, sem gravação de aprovações. Registro: produto. VISUAL_VARIANCE 2, MOTION_INTENSITY 1, INFORMATION_DENSITY 6. Fundo claro e tipografia do sistema mantêm a atenção nos sprites pequenos.

## Estado atual — elenco completo

Em 18/10/2026, a galeria passou a apresentar 42 folhas: 14 aprovadas e 28 candidatas dos lotes 3–9. As 88 imagens carregaram sem falhas e os 168 canvases estavam presentes. Iniciar acionou a reprodução; Avançar pausou e mudou o quadro. A navegação para o lote 9 mostrou Moldren em tamanho nativo e ampliado. Os lotes também foram inspecionados em suas prévias GIF com as quatro direções.

As referências, os pilotos e os lotes aprovados continuam acessíveis na navegação. Há links para o conjunto, a ordem embaralhada e a comparação entre pilotos e último lote. A [captura do elenco](elenco-apresentacao.png) e a [captura da galeria](galeria-lote-9-final.png) preservam esta apresentação. Os testes de layout em diferentes larguras registrados abaixo são históricos; não foram repetidos todos nesta rodada. A navegação nova usa o fluxo normal do texto e pode quebrar em várias linhas.

Os próximos registros descrevem rodadas anteriores e não substituem este estado atual.

## Estados implementados

| Elemento | Estados e comportamento |
| --- | --- |
| Iniciar/pausar | Botão nativo; desabilitado até carregar ao menos uma folha válida; muda o texto conforme reprodução; foco visível, hover e pressionado |
| Avançar quadro | Botão nativo; pausa e avança um passo; disponível depois do carregamento |
| Fundo de inspeção | Select com rótulo; cinza, branco ou escuro somente atrás dos sprites |
| Folhas | Tamanho nativo e ampliação sem suavização; erro de arquivo exibido na legenda |
| Animação | Quatro direções; inicia pausada; preferência por redução de movimento pausa a reprodução ao mudar |
| Dados ausentes | Mensagem explícita orienta manter galeria-dados.js junto ao HTML; controles continuam desabilitados |
| Dimensão inválida | Animação da folha é recusada com mensagem; não disfarça erro usando escala CSS |

Não há envio remoto, formulário de aprovação, indicador de sucesso editorial ou estado vazio de aprovação: essas ações não fazem parte da galeria. O carregamento reserva espaço das imagens e as alterações do fundo não modificam os PNGs.

## Histórico de verificações

Verificação no navegador integrado em 18/10/2026:

- As 11 imagens carregaram: três referências e duas visualizações por piloto. Dimensões naturais de todas: 120 × 220 px. Dezesseis canvases apresentam as quatro direções dos quatro pilotos.
- Iniciar mudou o controle para Pausar e avançou os quadros. Avançar interrompeu a reprodução. A tecla Espaço também acionou Avançar, com foco visível.
- A seleção de fundo branco funcionou sem alterar os arquivos.
- Larguras de 320, 768, 1280 e 1920 px foram verificadas; largura do conteúdo igual à área útil, sem rolagem horizontal. A configuração temporária de viewport foi removida ao terminar.
- A [captura de Rheed](galeria-rheed.png) mostra a folha nativa, ampliação, quadros animados e as pendências visuais explícitas.
- Os estados de dados ausentes e arquivo inválido foram inspecionados no código, mas não foram forçados no navegador. Redução de movimento está implementada com início pausado e escuta da preferência; não foi alterada a configuração do sistema para testar a mudança. Não foi executado leitor de tela externo.

O servidor local de revisão escuta somente em 127.0.0.1:8789. O processo iniciado nesta sessão tem PID 70056; a galeria também pode ser aberta diretamente pelo HTML enquanto os arquivos relativos forem mantidos juntos. A primeira tentativa de servidor dentro do sandbox não ficou acessível ao navegador; o servidor local fora do sandbox foi autorizado pela revisão automática de execução.

## Conferência após o retoque

As candidatas atuais são Rheed v6, Ghork v2, Borun v3 e Nima v5. As folhas e as quatro direções animadas foram reinspecionadas no navegador. Naquela rodada, a galeria apresentou as quatro como “Aguardando aprovação”; o total era zero de 42 aprovadas. A revisão detectou vestígios de braços em Rheed v5 e Nima v4, corrigidos nas versões apresentadas.

A [captura do conjunto](pilotos-apresentacao.png) registra a apresentação atual. A [prévia GIF](pilotos-caminhada.gif) contém quatro quadros de 180 ms, com as quatro direções de cada piloto. Seu fundo cinza pertence somente à prévia. A captura anterior de Rheed permanece como evidência das pendências encontradas antes do acabamento.

## Lote 1 e pilotos aprovados

Após a aprovação dos quatro pilotos e do estudo de Neral, a galeria passou a mostrar seis candidatas do lote 1 antes dos quatro pilotos finais. Naquela rodada, o total era quatro de 42 folhas aprovadas. O estudo aparece separadamente, com aprovação própria; as folhas completas de Neral aguardam aprovação com o restante do lote.

Na conferência de 18/10/2026, as 24 imagens carregaram sem falhas e os 40 canvases estavam presentes. Iniciar acionou a reprodução, e a navegação “Lote 1” levou à primeira candidata. O conjunto das quatro direções também foi conferido na [prévia animada](lote-1-previa.gif). A [captura do lote](lote-1-apresentacao.png) preserva a apresentação desta rodada. Não houve novo teste de todos os breakpoints nesta rodada.

## Lote 2

Após a aprovação das seis folhas do lote 1, a galeria apresenta Virmura, Dorga, Torvak e Meruna primeiro. São 14 folhas disponíveis, dez aprovadas, 32 imagens carregadas sem falhas e 56 canvases. Iniciar e Avançar foram conferidos novamente. A [apresentação do lote 2](lote-2-apresentacao.png), a [prévia animada](lote-2-previa.gif) e o [relatório](lote-2.md) registram esta rodada. As quatro candidatas aguardam aprovação antes do lote 3.
