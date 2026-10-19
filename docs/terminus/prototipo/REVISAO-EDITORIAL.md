# Decisões editoriais do protótipo

Status: em desenvolvimento.

## Segunda rodada: contexto, voz e atuação — 19/10/2026

O autor autorizou a revisão integral sem novo piloto: inglês primeiro, com `rewrite-en-us`, seguido de localização para português. Os três lotes revisaram novamente as 1.156 unidades, sem reutilizar o estado de revisão anterior como evidência. Foram alteradas 1.014 versões inglesas e 1.018 portuguesas. As unidades mantidas incluem títulos, objetivos e ações que já comunicavam corretamente sua função. Todas as falas montadas têm direção explícita entre as cinco expressões existentes, incluindo respostas às escolhas, pensamentos e variantes; três ocorrências compartilham texto, mas recebem expressão própria conforme o contexto.

O trabalho acrescentou referências concretas, reações e transições para sustentar a compreensão das cenas. Preservou acontecimentos, informações decisivas, escolhas e consequências. Virmura continua direta e protetora, com humor seco; os demais personagens mantêm suas diferenças de voz. A leitura cruzada corrigiu referências aos mapas, respostas que pressupunham uma promessa não feita, acusações incompatíveis com alternativas anteriores e uma fala que confundia gratidão com dívida. As quarenta reações da semifinal, bloqueios, convites, Coreto, reveses e recados de Dam foram incluídos.

Os [lotes e inventários](README.md#idiomas-e-revisão-para-a-jam) preservam os IDs editoriais. `previousPt` e `previousEn` registram a versão anterior; `pt`, `en`, `expression` e eventuais `expressionOverrides` registram o resultado. A aplicação conferiu os textos anteriores antes de substituir as fontes. O roteiro mantém as mesmas 2.459 linhas e 712 registros extraídos. Permanecem 76 cenas, 139 etapas e 246 páginas, com os mesmos IDs, condições, custos e efeitos. As direções no Markdown não aparecem nos textos exibidos. O catálogo inglês e as prévias foram regenerados; 22 templates do diário foram atualizados para acompanhar títulos revisados.

Foram associados os arquivos existentes de Lala e oito visuais de figurantes, sem criação de arte. O registro agora dispõe de 51 visuais e 255 expressões. A direção preserva a identidade de Savel e os momentos da revelação e transformação de Neral. Perguntas não recebem confusão automaticamente; firmeza e ironia são dirigidas conforme a cena.

Verificação desta rodada:

- **84 testes aprovados**, incluindo cobertura integral da rodada, expressões, extração, traduções, parâmetros e percursos das seis combinações de guilda/X/Y, com campanha solo e recrutamento.
- **12 saves anteriores** reproduzidos com o mesmo estado de jogo e comandos; apenas a redação do histórico mudou. A comparação também conferiu condições, intervalos do roteiro, custos, flags, itens e batalhas.
- **9.202 estados e 1.346 textos dinâmicos** conferidos em 12 percursos, sem tradução ausente.
- **12 cenários no Edge aprovados**, cada um em EN-US e PT-BR: abertura, socorro, cuidado de Virmura, trabalho e abrigo, Lala, contrato X/Y, recrutamento, semifinal, revelação, transformação e recado final de Dam. As 24 capturas foram produzidas; a inspeção visual cobriu esses momentos, incluindo o recado em 844 × 390 nos dois idiomas.
- **Teste adicional de localização aprovado no Edge via arquivo local**: preferência, retomada, mapa, diário, objetivos, importação, exportação, batalha e troca de idioma sem alterar passagem ou save. Nenhuma limitação foi registrada nessa execução.

Evidências locais em `.artifacts/terminus-localization/round2/`: `unit-tests.tap`, `compatibility.json`, `integration-dry-run.json`, `browser-results.json` e `browser/`. O teste adicional registra `browser/report.json` na pasta superior. Os comandos reproduzíveis estão no [README](README.md). A conferência automatizada e visual não registra aceite humano de ritmo. Layout e mapa não foram alterados nesta rodada.

## Primeira revisão bilíngue para a jam — histórico de 19/10/2026

O autor aprovou o padrão do [piloto E00/Q-A1/contrato](editorial/piloto.md) nesta revisão. Os textos jogáveis anteriores foram tratados como primeira versão, independentemente dos registros editoriais abaixo. Os três lotes passaram por coerência em PT-BR, tradução e polimento EN-US com `rewrite-en-us`, seguidos de segunda leitura e conferência da integração. A aprovação do padrão não substitui uma partida humana completa para avaliar ritmo.

Foram integradas 1.156 unidades, com 809 reescritas em português e inglês final para todas. O [inventário e as instruções de manutenção](README.md#idiomas-e-revisão-para-a-jam) ligam originais, revisões, fontes e contextos das variantes. Itens, ações, avisos, objetivos e acessibilidade também recebem tradução. Nomes pessoais, Terminus, Daratrine e Ludos são preservados; o [glossário](editorial/glossario.json) fixa os nomes descritivos.

Preservaram-se acontecimentos, custos e consequências. A alternativa de resposta Y omitida pelo recorte anterior foi recuperada sem deslocar o índice da resposta existente nos saves V3. As quarenta reações da semifinal, os recados de Dam por Lala e a identidade de Savel/Neral foram conferidos. Não há exceção narrativa pendente apontada pelos três revisores; playtest humano de ritmo e aceite artístico continuam distintos desta revisão.

Verificação automática desta entrega: 81 testes aprovados, incluindo seis combinações guilda/rota e alternativas de recrutamento, além de uma auditoria de 12 percursos, 9.202 estados e 1.346 textos dinâmicos sem tradução ausente. A rodada no Chrome via arquivo local passou nos dois idiomas: preferência, retomada, mapa, diário, recrutamento, semifinal, invasão, encerramento, batalha e fala longa em 844 × 390. As capturas foram inspecionadas. Evidências reproduzíveis ficam em `.artifacts/terminus-localization/`, com `browser/report.json` e `all-tests.tap`.

Limite do ambiente: o sandbox cancelou a gravação do relatório como download; seu conteúdo em inglês foi validado pelo Blob gerado pelo botão. A execução no Edge fora do sandbox não foi concluída devido a timeouts do serviço de aprovação, mesmo com autorização do autor. A verificação visual foi concluída dentro do sandbox com Chrome, sem liberar rede. Playtest humano de ritmo, aparelho físico e leitor de tela continuam pendentes.

Este registro reúne as fontes, escolhas de voz e limites de adaptação vigentes no protótipo V3, integrado ao [roteiro de quests da campanha](../storytelling/quests-da-campanha.md). A [skill humanizer](../../../.agents/skills/humanizer/SKILL.md) orientou a revisão de naturalidade sem uniformizar os personagens. As hipóteses de encenação continuam sujeitas à confirmação do autor; a implementação não constitui aceite artístico ou revisão humana final. As versões anteriores deste registro permanecem no histórico do Git.

## Fontes e critérios

Foram consultados a [visão do jogo](../visao-do-jogo.md), o [guia do elenco](../personagens/README.md), a [leitura do livro sobre Ghork](../storytelling/ghork-leitura-do-livro.md), as [anotações antigas da chegada](../storytelling/ghork-chegada-anotacoes-antigas.md) e o [arco do campeão](../storytelling/arco-do-campeao.md).

As fichas foram consultadas nas seções de personalidade, assinatura de fala, relações e pendências. Os exercícios de voz serviram para comparação, sem serem tratados como falas canônicas. Cobertura:

| Núcleo | Fichas consultadas |
| --- | --- |
| Moldura e protagonista | [Rheed](../personagens/rheed.md), [criança](../personagens/crianca.md), [Ghork](../personagens/ghork.md) |
| Mentores e contrato | [Virmura](../personagens/virmura.md), [Borun](../personagens/borun.md), [Sevrak](../personagens/sevrak.md), [Meruna](../personagens/meruna.md), [Elune](../personagens/elune.md) |
| Equipes externas | [Darvek](../personagens/darvek.md), [Zagra](../personagens/zagra.md), [Pirka](../personagens/pirka.md) |
| Quarta guilda | [Torvak](../personagens/torvak.md), [Dorga](../personagens/dorga.md), [Neral/Savel](../personagens/neral.md) |
| Recrutamento R1 | [Brakka](../personagens/brakka.md), [Nima](../personagens/nima.md) |
| Recrutamento R2 | [Sura](../personagens/sura.md), [Edrin](../personagens/edrin.md) |
| Recrutamento R3 | [Korr](../personagens/korr.md), [Velka](../personagens/velka.md) |
| Recrutamento R4 | [Tessa](../personagens/tessa.md), [Mavren](../personagens/mavren.md) |
| Recrutamento R5 | [Odrik](../personagens/odrik.md), [Lethra](../personagens/lethra.md) |
| Cidade e torneio | [Nyra](../personagens/nyra.md), [Durn](../personagens/durn.md), [Jorvi](../personagens/jorvi.md), [Rask](../personagens/rask.md), [Seldan](../personagens/seldan.md), [Guedra](../personagens/guedra.md) |
| Daratrine | [Lala](../personagens/lala.md), [Dam](../personagens/dam.md) |

Dam continua participando por recados de Lala. Savel e Neral são a mesma pessoa. Os personagens da reserva, Orcquius e Glavius não receberam novas falas nem aparições por consequência desta revisão.

## Vozes e autoria

Principais decisões de escrita:

- Ghork formula hipóteses, brinca, admite receio e contesta. Não recebe todas as conclusões prontas do narrador.
- Elune compara pontos concretos; Sevrak interroga o método; Borun provoca sem sempre concluir a lição; Virmura cobra cuidado e responsabilidade.
- Darvek e Zagra expõem o custo e o limite de seus próprios planos. Nenhum se torna uma caricatura da posição rival.
- Lala mostra seu trabalho e interrompe a pose de Ghork com intimidade. Os recados de Dam permanecem identificáveis como pedidos dele.
- As dez pessoas da semifinal têm falas próprias para quatro situações: desconhecido, conhecido com conflito não resolvido, projeto favorecido sem convite e projeto preterido. São quarenta variantes.
- A explicação sobre regras de recrutamento permanece na chamada de Rask, quando ele efetivamente precisa fechar inscrições. Comentários como “a história não cobra agora uma nova batalha” foram retirados da ficção.
- As consequências do golpe aparecem na ação, nas ordens de Dorga, na ameaça de Neral e na declaração de Torvak. A recusa às capturas não apaga sua adesão ao golpe.

## Hipóteses e limites preservados

- **Virmura:** a ficha mantém uma proposta cerimoniosa e registra a alternativa direta das notas antigas. O protótipo conserva uma direção direta e firme, com humor seco ocasional. Isso continua sendo uma hipótese de voz para avaliação; não houve alteração da ficha nem adoção automática de arcaísmos.
- **Mapas — P01:** a resolução foi autorizada pelo autor para a integração do protótipo e registrada no roteiro. O croqui de entrada segue passagem estreita → bifurcação; o de retirada percorre o sentido inverso. Pontos de partida e direção estão nos registros autorizados. A2, B3 e C3 permitem a mesma comparação com Elune sem depender das outras cadeias. A defesa de E04 mostra o trecho reconciliado e mantém desconhecidas as demais galerias. Não foram introduzidos fraude, geografia mutável ou desabamento como causa.
- **Nomes, guildas e conflitos locais:** conservam o estado experimental definido na documentação. O texto ser encenável não significa que suas hipóteses foram aprovadas.
- **Colar:** Lala permanece em Daratrine, vista à distância. Dam não recebeu busto em comunicação direta; o colar não transporta objetos ou dinheiro.
- **Torvak e Neral:** não foi criada uma causa para a separação de Orcquius/Glavius. Neral transforma-se na mesma batalha e conserva essa forma até morrer; a operação local acaba, o selo permanece e a correspondência não identifica infiltrados. A autenticação visual final da correspondência permanece em avaliação.
- **Alianças e balanceamento:** a guilda que apoia a equipe X/Y preterida segue sem identidade específica. Dificuldades e preços são os valores experimentais solicitados para esta versão.

## Continuidade de apresentação

- Rheed e a criança falam no presente. A autoria de Rheed nas descrições do passado não exige seu busto no palco. O retorno do Coreto restaura a composição do relato; a distinção entre presente e passado permanece textual e estrutural.
- Lala é vista à distância sobre o cenário de Ghork. A troca de falante não leva a câmera a Daratrine. As respostas às escolhas herdam o fundo ao final do trecho anterior.
- Na retaliação, o cancelamento dos horários precede a reação de Ghork e a reorganização na sede.
- No fim da classificação, a observação da dose ocorre na entrada do coliseu, depois do treino.
- Em `side2`, Durn já recebeu a peça de uma bancada articulada. Ghork a devolve depois de manuseá-la; o destaque não representa a chegada de uma peça que trouxe de fora. A bancada distingue a secundária do caso de lesões e da peça de treino investigado em R2.
- O concentrado de Neral aparece antes da transformação. O selo narrativo intacto não é necessariamente um lacre de carta: a correspondência representa a ligação com o Conselho.
- Reveses reconhecem cada adversário; o de Neral ocorre na área de serviço. Os intervalos do Coreto distinguem o momento da campanha, sem anunciar como futura uma tarefa concluída.

As falas condicionais, respostas, intervalos e reveses pertencem ao roteiro, mesmo que não apareçam numa única partida. Consulte **Cenas e variantes** para revisá-los; os testes e os comandos estão no [guia do protótipo](README.md#manutenção). Objetos mencionados só exigem imagem própria quando marcados na encenação; as quantidades são derivadas do catálogo.

## Arte integrada

A criança, Lala e os figurantes com arte produzida usam seus visuais próprios; vozes coletivas sem correspondência continuam provisórias. Nenhuma identidade recebe o retrato de outra. Savel, Neral revelado e Neral transformado são separados no registro. O palco usa cinco expressões produzidas, com direção explícita por ocorrência nesta rodada. Os fundos atuais, inclusive o Coreto, seguem a produção em tinta e bege. Isso não converte a imagem sépia em aprovação de uma futura direção colorida.

Consulte os [registros de fundos](../arte/locais/README.md), [concepts](../arte/bustos/README.md), [expressões](../arte/bustos/expressoes/README.md) e o [inventário de uso](INVENTARIO.md). A seleção para o protótipo preserva o status de avaliação artística.

## Cobertura da integração V3

A revisão de 19/10/2026 comparou o recorte das falas com o roteiro e corrigiu intervalos que omitiam perguntas, respostas ou encerramentos. A tabela registra a cobertura daquela integração; alterações posteriores exigem nova conferência dos trechos afetados.

| Cobertura | Conferência na V3 |
| --- | --- |
| E00, Q-A1, E01–E03 e E08 | Moldura, socorro e pequenos deslocamentos antes da exploração; apresentação de Torvak e primeira oferta de Savel uma única vez; preparação antes de B4/C4. |
| Q-A1–A5 | Sigilo dos registros, atendimento mantido, empréstimo e devolução da maca; proposta ouvida separada da adesão. |
| Q-B1–B5 | Bolsa entregue após a fuga; cópia autorizada de Pirka; recuperação do fardo após vitória; recibo entregue a Borun. |
| Q-C1–C5 | Entrega a Rask, procedimento contestável e estojo restituído antes do duelo; a ressalva escolhida retorna na defesa. |
| E04–E06, X0/Y0, X1–X2/Y1–Y2 | Três apresentações e estratégia antes da adesão; duas recusas institucionais; cancelamento dos horários antes da reação de Ghork; reorganização na sede; ambas as propostas externas antes do compromisso. |
| Q-20 e três contatos com Lala | Remuneração pessoal distinta de Ludos; contribuição opcional a Dam, registro no mercado e recado correspondente no encerramento; dose de Torvak sem consumo obrigatório de Ghork. |
| R1–R5 | Dois desfechos por conflito, investigação e entregas, possibilidade de adiar, recompensa única, convites próprios e cobertura de trabalho para exceções. Nenhum pagamento escolhe outro favorecido ou recruta os dois. |
| Q-31–Q-35 e U/V | Duas guildas rivais, equipe X/Y preterida, semifinal persistente e conversa antes da final. Quarenta falas de semifinal: desconhecido, conhecido não resolvido, favorecido sem convite e preterido. |
| Celebração, Q-36 e E07 | Comemoração antes da invasão; Torvak coopera sem absolvição automática; transformação única; Neral conserva a forma até morrer; vínculo documental com o Conselho sem nomear infiltrados. |
| Intervenções L1/L2/L3, bloqueios e convites | Retorno explícito a Rheed e à criança; custo visível antes de escolher; consequências principais e continuação gratuita preservadas. |
| Secundárias, Coreto e reveses | Três secundárias preservadas, intervalos adequados ao progresso, recompensa uma vez; recuo da invasão localizado no coliseu. |

O [resumo histórico da verificação V3](VERIFICACAO-V3.md) registra os resultados e limites dos testes daquela entrega. Eles verificam execução e continuidade de estado; não medem recepção humana, duração real ou aprovação das falas.
