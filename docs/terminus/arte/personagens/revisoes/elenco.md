# Revisão do elenco completo

Status: em desenvolvimento.

Em 18/10/2026, as 42 folhas ficaram disponíveis: 14 aprovadas e 28 candidatas dos lotes 3–9. A revisão interna não encerra a entrega; falta o aceite visual do autor para as candidatas.

## Comparação visual

O conjunto foi inspecionado em [tamanho nativo](elenco-nativo.png), [ampliado](elenco-completo.png) e em [ordem embaralhada](elenco-embaralhado.png), com semente 4218. Os quatro personagens do último lote foram comparados diretamente com os [pilotos nas quatro direções](pilotos-e-lote-9.png).

As diferenças de porte permanecem legíveis: goblins e criança pequenos, anões compactos, ogros largos e trolls altos, com variações próprias de cada ficha. Cabelo, roupa e acessórios distinguem as silhuetas dentro da paleta compartilhada. Elune e Ossena têm cabelo claro preso e pele escura por suas fichas; o estilete, a roupa e os materiais de trabalho diferenciam suas folhas.

A comparação revelou preenchimentos planos sob alguns braços nos lotes 3–4 e contraste baixo em Edrin. Foram produzidas novas versões com textura preservada e contraste corrigido. A inspeção animada também motivou revisões das pernas de Guedra e Urdan. Os relatórios de cada lote mantêm esses achados e as versões anteriores continuam disponíveis.

## Verificação técnica

O [relatório executável](../../../../../tools/auditar_elenco.py) registra em [JSON](auditoria-elenco.json):

- 42 PNGs RGBA de 120 × 220 px, com alfa e 12 células no formato previsto.
- Referências e fichas compatíveis com os hashes registrados.
- Integridade dos 14 arquivos aprovados.
- Reprodução idêntica, por script e configuração individual, das 28 candidatas.
- Inspeção auxiliar de componentes desconectados; não substitui avaliação de anatomia.

Cada lote tem folhas estáticas e GIF de quatro quadros, a 180 ms por quadro. A galeria apresenta tamanho nativo, ampliação sem suavização e animação das quatro direções, com controles de pausa, avanço e fundo de inspeção.

## Limites da entrega

A leitura de pequenos traços depende da resolução: cicatrizes, rachaduras de lentes, anéis e etiquetas são poucos pixels. Não há texto legível nas etiquetas nem novos símbolos narrativos. O ciclo é de repouso e caminhada, sem ataques ou expressões adicionais.

A revisão estrutural não comprova integração com o motor. A aprovação visual das 28 candidatas continua pendente; somente depois dela os arquivos correspondentes serão copiados para a pasta final.

[Controle e versões atuais](../controle.md) · [Galeria](../galeria.html)
