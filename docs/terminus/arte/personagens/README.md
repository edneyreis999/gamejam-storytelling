# Produção visual do elenco

Status: em desenvolvimento.

**Retificação do concept de Neral — 18/10/2026:** capuz e cobertura integral, com apenas olhos visíveis, valem somente para o disfarce. As formas revelada e transformada seguem a descrição dos Ignotos e podem expor cabeça, rosto e corpo. O [disfarce v2 e os novos concepts](../bustos/README.md) orientam a revisão; consulte a [ficha](../../personagens/neral.md) e o [resumo](resumos/neral.md). O concept transformado v4 foi aprovado e já orienta a [nova spritesheet v6](revisoes/neral-transformado-v6/README.md), em avaliação. As outras duas formas continuam pendentes de adaptação.

## Entrega e decisões

O plano autorizado em 18/10/2026 prevê 42 spritesheets para as [40 fichas](../../personagens/README.md): uma por personagem, com duas formas adicionais de Neral. A [visão do jogo](../../visao-do-jogo.md) continua sendo a autoridade narrativa. Usar as propostas visuais das fichas não valida suas propostas narrativas nem amplia a campanha com a reserva.

Este guia serve ao autor e à produção de arte. O [controle](controle.md), os [dados de produção](controle.json) e os resumos individuais registram o andamento e permitem retomar o trabalho sem depender da memória do chat.

[Abrir a galeria de revisão](galeria.html) · [Revisão dos pilotos](revisoes/pilotos.md) · [Lote 1](revisoes/lote-1.md) · [Lote 2](revisoes/lote-2.md)

Situação em 18/10/2026: 42 folhas disponíveis. As [correções anteriores de movimento](revisoes/correcao-movimento/README.md) reabriram dez versões aprovadas. Há 19 folhas aceitas, sendo sete com ressalvas, e 23 candidatas aguardando avaliação. A aprovação anterior do estudo de Neral está preservada como histórico; a correção de concept descrita acima substitui sua direção visual.

Revisão atual: os blocos 2 e 3 completos foram aprovados. A revisão dos três blocos está encerrada; o bloco 1 permanece aceito com ressalvas. O [registro dos três blocos](revisoes/correcao-blocos/README.md) separa testes técnicos, inspeção e aceite visual.

## Contrato visual

| Item | Padrão |
| --- | --- |
| Arquivo final | PNG RGBA, transparência real, 120 × 220 px |
| Grade | Três colunas, quatro linhas; células de 40 × 55 px |
| Linhas | Frente, esquerda, direita, costas |
| Colunas | Passo A, repouso, passo B |
| Caminhada | A → repouso → B → repouso; 180 ms por quadro na prévia |
| Aparência | Sépia, contorno escuro, cabeça grande, detalhe legível em tamanho nativo |
| Proporções | Altura, largura e anatomia variam por raça e constituição; ninguém pode ultrapassar a célula |
| Transparência | Sem fundo preto, quadriculado incorporado, sombras de chão ou halos |
| Escopo | Repouso e caminhada; sem ataques, retratos ou expressões adicionais |

As três imagens em `referencias/` foram fornecidas pelo autor. Os originais têm 120 × 220 px e fundo preto opaco; preservá-los sem alteração. Copiar seu desenho e acabamento, não sua raça nem o fundo. Cores descritas nas fichas são convertidas em valores sépia. Assimetrias seguem o corpo do personagem, não o lado da tela.

O quadro de repouso determina a escala e a linha dos pés de cada personagem. Nos passos, manter escala e linha de apoio; não recentralizar cada silhueta pelo seu retângulo externo. Não usar espelhamento que inverta tapa-olho, cicatriz, luva ou acessório.

## Sequência e aprovações

| Etapa | Personagens | Folhas |
| --- | --- | --- |
| Pilotos | Rheed, Ghork, Borun, Nima | 4 |
| Lote 1 | Sevrak, Nyra, criança, Neral nas três formas | 6 |
| Lote 2 | Virmura, Dorga, Torvak, Meruna | 4 |
| Lote 3 | Darvek, Zagra, Brakka, Sura | 4 |
| Lote 4 | Edrin, Korr, Velka, Tessa | 4 |
| Lote 5 | Mavren, Odrik, Lethra, Jorvi | 4 |
| Lote 6 | Durn, Elune, Rask, Guedra | 4 |
| Lote 7 | Seldan, Pirka, Fendro, Zaila | 4 |
| Lote 8 | Urdan, Lurga, Sivren, Baska | 4 |
| Lote 9 | Moldren, Ivara, Nodri, Ossena | 4 |

O plano inicial exigiu aprovação dos pilotos e de cada lote antes do seguinte, além do estudo de Neral antes das folhas completas. Após o lote 2, o autor autorizou: “Pode seguir para os próximos lotes, mantendo o mesmo padrão de qualidade e revisão.” Isso permitiu produzir os lotes 3–9 em sequência, com revisão interna por lote; não aprovou antecipadamente suas imagens. A conclusão continua exigindo aprovação visual das 42 folhas.

## Procedimento por personagem

1. Ler a ficha completa e conferir seu SHA-256 contra o resumo. Se mudou, revisar o resumo antes da geração.
2. Usar `prompts/base.md`, as três referências originais e o resumo específico. Após aprovação dos pilotos, usar também esses pilotos como comparação; nunca substituir o padrão pelo último resultado.
3. Registrar o texto exato enviado, ferramenta, entradas e resultado em `prompts/` e no controle. Usar a ferramenta integrada `imagegen`, uma solicitação por folha; não recorrer à API por conta própria.
4. Guardar tentativas em `assets/terminus/personagens/em-revisao/` com versão. Não sobrescrever tentativas nem marcar material intermediário como final.
5. Conferir arquivo, identidade, direções e movimento. Corrigir apenas o que falhou e reinspecionar a folha inteira.
6. Depois de duas rodadas de correção sem resolver o mesmo defeito, registrar o bloqueio e apresentar outra abordagem ao autor. Não reduzir o critério para cumprir a quantidade.
7. Apresentar o lote revisado em tamanho nativo, ampliado sem suavização e animado. Registrar a resposta do autor e sua referência no controle.
8. Copiar somente as versões aprovadas para `assets/terminus/personagens/<id>.png`; usar `neral-disfarce.png`, `neral-revelado.png` e `neral-transformado.png`.

A geração pode devolver uma imagem maior ou uma grade irregular. Isso não satisfaz o contrato. Resolver o método de exportação antes de escalar a produção; registrar limitações em vez de simular uma aprovação técnica.

### Exportação técnica autorizada

Em 18/10/2026, após duas saídas de Rheed em 926 × 1698 px, o autor autorizou uma etapa por script para escala, recorte, alinhamento, transparência e montagem, preservando os originais. O [exportador](../../../../tools/spritesheets.py) usa Pillow e NumPy. Ele encontra quatro faixas e três figuras por faixa, aplica uma única escala por personagem, mantém âncoras horizontais fixas por coluna e alinha o apoio em y=52. A transparência é convertida em alfa binário no limiar 128; a redução usa vizinho mais próximo. O relatório JSON registra origem, hash, recortes, escala e posições.

Alturas máximas de teste: Rheed 49 px, Ghork 47 px, Borun 52 px, Nima 42 px. A largura disponível pode limitar a escala. Esses valores são parâmetros dos pilotos, sujeitos à aprovação visual do conjunto; não são uma tabela biológica.

```powershell
python tools/spritesheets.py export assets/terminus/personagens/em-revisao/personagem-v1.png assets/terminus/personagens/em-revisao/personagem-v1-120x220.png --height 49
python tools/spritesheets.py check assets/terminus/personagens/em-revisao/personagem-v1-120x220.png
python tools/spritesheets.py gallery docs/terminus/arte/personagens/controle.json
python -m unittest discover -s tools -p 'test_spritesheets.py'
```

Executar com Python que tenha Pillow e NumPy. Nesta sessão foi usado o runtime fornecido pelo Codex. O script recusa sobrescrever versões e rejeita originais encostados na borda ou sem separação detectável. Não redesenha membros nem decide aprovação artística. Um relatório sem erros significa apenas que os testes estruturais passaram.

### Acabamento de pixels autorizado

Em 18/10/2026, o autor autorizou: “Sim, retocar os pixels por script”. O [script de retoque dos pilotos](../../../../tools/retocar_pilotos.py) trabalha em resolução nativa, preserva os originais e verifica a igualdade dos pixels das cabeças antes de salvar. Ele corrige braços, pernas e a posição dos frascos de Rheed. A autorização cobre os quatro pilotos; não substitui sua aprovação visual.

O passo B dos perfis recua a perna próxima da câmera e avança a perna distante. As botas reutilizam pixels do desenho original; somente os membros simétricos são reconstruídos para a direção oposta. Cabeças, tapa-olho e bastão não são espelhados. Ghork recebe passada menor, sem lateralizar a lesão. Rheed conserva dois frascos no quadril esquerdo anatômico, ocultos na vista direita.

```powershell
python tools/retocar_pilotos.py nima assets/terminus/personagens/em-revisao/nima-nova-versao-120x220.png
```

O destino precisa ser novo. Os estudos intermediários e as candidatas substituídas permanecem guardados. O relatório ao lado de cada PNG identifica origem, hashes, autorização e verificação estrutural. As prévias com fundo cinza são apenas material de inspeção; os PNGs candidatos têm transparência real.

Após a aprovação dos pilotos e a autorização para avançar ao lote 1, o mesmo método foi aplicado às novas folhas. O [script do lote 1](../../../../tools/retocar_lote1.py) usa ajustes individuais para Sevrak, Nyra, criança e as três formas de Neral, sem alterar os pixels das cabeças. A continuidade do processo não substitui a aprovação visual, registrada separadamente.

No lote 2, o [acabamento individual](../../../../tools/retocar_lote2.py) reutiliza a textura dos braços e botas, corrige a faixa e o perfil de Dorga e estabiliza a trança frontal de Torvak. As cabeças corretas são reutilizadas quando necessário para corrigir direção ou continuidade. As versões anteriores são preservadas; somente as novas candidatas aguardam aprovação.

Os lotes 3–9 usam o [acabamento do elenco](../../../../tools/retocar_elenco.py), com [configuração individual](retoques-elenco.json). O registro de cada tentativa preserva os parâmetros usados. Os perfis partem do repouso da própria direção; a leitura de profundidade das pernas alterna entre A e B, junto do balanço dos braços. A revisão do conjunto substituiu áreas planas sob os braços por textura da roupa e corrigiu recortes que interrompiam a ligação das pernas. Edrin e Ivara receberam também correções individuais pelo imagegen.

O [auditor](../../../../tools/auditar_elenco.py) confere as 42 folhas, as fichas e referências, a integridade das 14 aprovadas e a reprodução das 28 candidatas. Gera pranchas em ordem de produção, embaralhadas e de comparação entre pilotos e lote 9. O resultado permanece separado da aprovação visual.

## Critérios de revisão

- **Arquivo:** tamanho exato, canal alfa com pixels transparentes, 12 células não vazias, nenhum texto ou marca.
- **Enquadramento:** corpo e acessórios inteiros; nenhum contato com células vizinhas; apoio dos pés consistente.
- **Identidade:** raça, idade aparente, constituição, roupa, cabelo e traços essenciais da ficha; sem novos fatos narrativos.
- **Direções:** frente e costas reconhecíveis, laterais voltadas corretamente e assimetrias anatômicas preservadas.
- **Movimento:** passos alternados distintos, repouso identificável, sem mudança de tamanho ou acessórios que desaparecem.
- **Estilo:** leitura em 1× e ampliação por vizinho mais próximo; sépia, contornos e densidade comparáveis aos modelos.
- **Conjunto:** silhuetas distinguíveis, diferenças corporais legíveis e últimos personagens comparados diretamente aos pilotos.

Inspeção automática não aprova anatomia, estilo ou movimento. A revisão visual e a aprovação do autor são campos separados no controle. Ao fim, revisar as 42 folhas juntas e em ordem embaralhada. Só concluir com todas tecnicamente verificadas e aprovadas.

## Galeria de revisão

O autor abre a galeria no computador para comparar o traço minúsculo das referências com os candidatos e identificar falhas ao caminhar. Interface de produto, fundo claro neutro, nomes e estado explícitos, sem efeitos decorativos. Dials: VISUAL_VARIANCE 2, MOTION_INTENSITY 1, INFORMATION_DENSITY 6. A animação é conteúdo de inspeção e terá controle de pausa; respeitar redução de movimento.

Não foi encontrado DESIGN.md nem sistema de tokens para esta superfície; usar tokens locais simples e recomendar uma base compartilhada antes de ampliar a interface. A galeria não grava aprovações: elas continuam sendo decisões explícitas do autor registradas na documentação.

## Revisão dos movimentos

O [método anterior de correção](../../../../tools/corrigir_movimento.py) foi usado nas 18 folhas listadas no [registro da revisão](revisoes/correcao-movimento/README.md). A revisão posterior do autor revelou que ele também cortava as botas dos perfis; a descrição anterior de “botas inteiras” estava incorreta. Preservá-lo para reproduzir as versões históricas, sem usá-lo como garantia de qualidade.

Os oito personagens do bloco 1, os cinco do bloco 2 e a amostra Pirka usam [camadas delimitadas individualmente](../../../../tools/retocar_camadas.py), com registro em `revisao_camadas` no controle. O bloco 2 combina roupa reconstruída, braço da própria direção e proteção dos acessórios. Pirka também recupera poses corporais da v1, identificadas por arquivo e hash no relatório. Esse campo tem precedência sobre `revisao_movimento` na reprodução. Testes técnicos, inspeção visual e aprovação do autor são registros separados.
