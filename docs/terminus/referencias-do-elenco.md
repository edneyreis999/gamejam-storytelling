# Referências e contagem do elenco

Status: em desenvolvimento.

[Análise de Terminus](analise-do-elenco.md) · [40 fichas](personagens/README.md)

Este levantamento usa Punch Club como referência externa. As tabelas permitem conferir quantas pessoas foram efetivamente identificadas e quais funções foram aproveitadas. Não são documentação aprovada de Ekios nem uma declaração de que todo o conteúdo dos jogos foi percorrido em uma partida.

## Método e limites

A unidade de contagem é **uma pessoa ou entidade individual reconhecível**, não um sprite, ID de cena, nome de apresentação, missão ou fala. Um interlocutor com designação funcional, como o prisioneiro, conta quando o contexto o individualiza. Figurantes genéricos e adversários sem função narrativa identificada não entram automaticamente.

As fontes principais são os JSONs incorporados aos atlas locais, extraídos dos recursos dos jogos. No primeiro, há 186 grafos e 23 entradas `nm_` na localização; no segundo, 930 grafos, sem uma tabela equivalente de personagens já normalizada. A quantidade de grafos mede conteúdo, não elenco. Ambos incluem materiais de expansões e nós de teste; não foram contados como pessoas.

| Recorte verificável | Contagem | O que significa |
| --- | ---: | --- |
| Punch Club 1: nomes de interlocução `nm_` | 23 | 22 encontrados em contextos da campanha/base e esgotos; Mack é o acréscimo identificado de Dark Fist nesse recorte |
| Punch Club 1: rivais narrativos adicionais abaixo | 5 | Bill, Mark, Gabe, Steve e Ivangief, fora daquela tabela de interlocução |
| **Punch Club 1: indivíduos catalogados neste levantamento** | **28** | Subtotal documentado; não censo de todos os figurantes, animais e adversários |
| Punch Club 2: interlocutores selecionados e normalizados abaixo | 31 | Campanha principal, com pessoas que também retornam na expansão |
| Punch Club 2: acréscimos selecionados de Iron Fist | 2 | MaMMa e o robô lutador; Emmit não é contado novamente |
| **Punch Club 2: indivíduos catalogados neste levantamento** | **33** | Subtotal documentado, com cobertura diferente do primeiro jogo |

**Leitura para produção:** ambos sustentam várias dezenas de identidades narrativas. O resultado justifica estudar um catálogo de 40 para Terminus, mas não obriga a escrever 40 participações na campanha atual. A recomendação vem das funções de Terminus: 22 posições estruturais, oito pontos recorrentes de conversa e dez opções futuras. Não comparar 28 e 33 como se fossem totais oficiais ou usar sua soma como número de personagens únicos da série.

Ficam fora destes subtotais os protagonistas, o pai e suas apresentações, gatos/antagonistas com identificações que exigem auditoria própria, animais, multidões, alunos genéricos e o restante das listas de lutadores. Em Punch Club 2 também não se pretende esgotar todos os interlocutores ocasionais. **Não há uma contagem exaustiva de todos os adversários do jogo nestas fontes normalizadas.**

## Punch Club 1 — 23 interlocutores

A segunda coluna torna visível a diferença entre nome exibido e chave interna. Mestre dos esgotos e Mestre Manguaça são indivíduos distintos; a tradução “Mestre” isolada não basta para fundi-los.

| Pessoa | Chave de localização | Função e evidência |
| --- | --- | --- |
| Mick | `nm_Mick` | Mentor e apoio cotidiano. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Amick_first_time) |
| Silver | `nm_Freddie` | Treinador e dono da academia. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Atutorial_gym_trainer) |
| Roy | `nm_Roy` | Amigo, treino e convívio. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Ared_hi) |
| Adrian | `nm_Girl` | Vínculo afetivo e cotidiano. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Agirl_love) |
| Apu | `nm_Apu` | Comércio e contatos. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Ashop_apu) |
| Casey | `nm_Casey` | Comida, emprego e outra rede. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Acasey_hi) |
| Tyler | `nm_Tyler` | Circuito informal. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Atyler_ask_fight) |
| Mickey | `nm_gypsy` | Conflito de vizinhança. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Agypsy_hi) |
| Big Bobo | `nm_big_bo` | Trabalho e poder local. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Abobo_work) |
| Don | `nm_don` | Financiamento, dívida e criminalidade. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Adon_hi) |
| Químico / Alquimista | `nm_Chemist` | Venda de preparações e efeitos colaterais. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Achemist_hi) |
| Mestre dos esgotos | `nm_Splinter` | Rede dos esgotos; também participa de Dark Fist. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Asewers_1) |
| Mestre Manguaça | `nm_dmaster` | Tratamento em Chinatown; distinto do Mestre dos esgotos. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Achina_trauma) |
| Whay | `nm_Proper` | Aparelho auditivo no conflito de Bobo. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Asport_acoustic) |
| Morgan Red | `nm_Morgan Red` | Convívio e orientação na prisão. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_start) |
| Paul, o guarda | `nm_prison guard` | Controle institucional na prisão. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_guard_hi) |
| Prisioneiro | `nm_prisoner` | Testemunho do passado; indivíduo sem nome próprio recuperado. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_yard) |
| Ivan | `nm_Ivan` | Recepção e treino na Rússia. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Arussia_start) |
| Din Kong | `nm_Manager` | Carreira pública e espetáculo. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Amanager_hi) |
| Harry | `nm_Manager2` | Negócios e liderança da rota criminosa. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Alair_hi) |
| Míster Y | `nm_Bro` | Rede de lutas e relação familiar. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Abro_hi) |
| Sr. Chapéu | `nm_Hatman` | Anfitrião do confronto final. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Afianl) |
| Mack | `nm_Mack` | Apoio técnico em Dark Fist. [Evento](../docs_externas/punch-club/punch-club-quests.html#s%3Amack_hi) |

### Cinco adversários narrativos adicionais

| Pessoa | Evidência no atlas | Separação |
| --- | --- | --- |
| Bill | Localização `goal_bill` / `goal_a_bill`; [esgotos](../docs_externas/punch-club/punch-club-quests.html#s%3Asewers_1) | Primeiro dos quatro irmãos; não fundir com Mestre dos esgotos |
| Mark | `goal_mark` / `goal_a_mark`; mesmo arco | Segundo irmão |
| Gabe | `goal_gabe` / `goal_a_gabe`; mesmo arco | Terceiro irmão |
| Steve | `goal_steave` / `goal_a_steave`; mesmo arco | Quarto irmão; a grafia da chave não cria outro indivíduo |
| Ivangief | `goal_win russia`, `cut_toussr_1` e [retorno das lutas](../docs_externas/punch-club/punch-club-quests.html#s%3Arussia_afterfight) | Adversário, distinto de Ivan, o interlocutor da estadia |

Mack é contado entre os 23, não somado outra vez por aparecer em Dark Fist. O Mestre dos esgotos também circula entre conteúdos. Químico/Alquimista e Freddie/Silver são aliases. O gato, suas apresentações e as revelações finais não foram normalizados aqui; seria indevido somar cada sprite como antagonista novo.

## Punch Club 2 — 31 interlocutores selecionados

| Pessoa normalizada | Função / critério de identidade | Evidência |
| --- | --- | --- |
| Adriana | Casa, cuidado e tratamento | [Evento `OldHouseAdriana`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AOldHouseAdriana) |
| Henry | Convívio e fitas | [Evento `Henry`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AHenry) |
| Apu | Loja e rede das larvas; inclui forma de larva | [Evento `Apu`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AApu) |
| Silver | Academia; reunir variantes de aparência | [Evento `Silver`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ASilver) |
| Mick | Mentoria holográfica; não contar corpo e holograma como pessoas novas | [Evento `MickHologram`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AMickHologram) |
| Bobo | Fazenda e trabalho | [Evento `Bobo`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ABobo) |
| Lil Bobo | Interlocutor da fazenda, distinto de Bobo | [Evento `LilBobo`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ALilBobo) |
| Tio do Lámen | Restaurante e emprego | [Evento `NoodleMan`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ANoodleMan) |
| Grisha | Trabalho e rede da fábrica | [Evento `Grisha`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AGrisha) |
| Boris | Rede da fábrica; interlocutor identificado no atlas | [Evento `BorisTheBlade`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ABorisTheBlade) |
| Kazuma | Rede da boate | [Evento `KazumaKiryu`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AKazumaKiryu) |
| Subchefe da boate | Contato distinto de Kazuma | [Evento `YakudzaDeputy`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AYakudzaDeputy) |
| Casey | Legado e apoio; reunir forma nas sombras e base dos crocodilos | [Evento `Casey`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACasey) |
| Emmit | Reparo e projetos; aparece também em Iron Fist | [Evento `Emmit`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEmmit) |
| Huey | Rival e identidade pública | [Evento `Event_I-Huey`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-Huey) |
| Ruth | Rivalidade e treino | [Evento `Event_I-RuthPrefight_1`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-RuthPrefight_1) |
| Esopo / Aesop | Rivalidade e vida depois da luta | [Evento `Event_I-AesopNightClubAfterWin`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-AesopNightClubAfterWin) |
| Algernon | Amigo de Esopo, recebe as flores | [Evento `Event_I-AesopNightClubAfterWin`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-AesopNightClubAfterWin) |
| Holocop | Formação policial | [Evento `Holocop`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AHolocop) |
| Dinamo | Rotina e contatos policiais | [Evento `Dinamo`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ADinamo) |
| K / Tio Barry | Uma pessoa, duas apresentações; não fundir com o tio verdadeiro | [Evento `KBehindBar`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AKBehindBar) |
| Carla | Retirada e contexto da Resistência | [Evento `CarlaJourneyGround`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACarlaJourneyGround) |
| Tio verdadeiro | Liderança da Resistência, distinto de K/Barry | [Evento `Uncle`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AUncle) |
| Frank | Apoio da Resistência | [Evento `Frank`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AFrank) |
| Jai / Jay | Continuidade da loja de Apu | [Evento `JayCassier`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AJayCassier) |
| Gyatso | Atendimento, chá e música | [Evento `GyatsoHealer`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AGyatsoHealer) |
| Gerente de entregas | Trabalho e administração | [Evento `Manager`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AManager) |
| Entregador | Rede de entregas | [Evento `Courier`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACourier) |
| Médico do hospital | Interlocução com a instituição de saúde | [Evento `HospitalDoctor`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AHospitalDoctor) |
| Rorscharch | Personagem local e observação da cidade | [Evento `Rorscharch`](../docs_externas/punch-club/punch-club-2-quests.html#event%3ARorscharch) |
| Jackson Teller | Contato identificado na rede urbana | [Evento `JacksonTeller`](../docs_externas/punch-club/punch-club-2-quests.html#event%3AJacksonTeller) |

### Dois acréscimos de Iron Fist

| Entidade | Função | Evidência |
| --- | --- | --- |
| Robô lutador | Projeto individual de construção e treino; não confundir com todos os robôs adversários | [Estação do robô](../docs_externas/punch-club/punch-club-2-quests.html#event%3ARobotsHubRobotStation) |
| MaMMa | IA que conduz o projeto e revela seu objetivo | [IA da oficina](../docs_externas/punch-club/punch-club-2-quests.html#event%3ARobotsHubAI) |

O nome interno de um grafo só localiza a evidência. Eventos com diálogos em outros grafos e entradas dinâmicas exigem leitura do contexto, não contagem automática de `npc_`. Apu e Apu em outra forma, K e Barry, versões sentadas e em pé e apresentações passadas não geram fichas adicionais. Emmit aparece antes da expansão e continua sendo uma pessoa. Personagens recorrentes nos dois jogos contam uma vez **em cada recorte por jogo**, nunca duas vezes na mesma campanha só pela mudança de representação.

## Correspondências usadas em Terminus

Uma referência pode sustentar mais de uma adaptação. Uma ficha pode combinar funções de várias fontes. Os conflitos, raças, histórias e nomes novos são criações propostas; não são acontecimentos atribuídos aos jogos de origem.

| Referência individual | Função aproveitada | Fichas propostas |
| --- | --- | --- |
| [Tsunade, retrospectiva oficial](https://naruto-official.com/en/news/01_1868) | Perde Nawaki e reconhece em Naruto sonhos de pessoas que perdeu. | [Virmura](personagens/virmura.md) |
| [Jiraiya, retrospectiva oficial](https://naruto-official.com/en/news/01_1643) | Experiência de viagem, investigação e formação de novos combatentes. | [Borun Passo-Largo](personagens/borun.md) |
| [Orochimaru, retrospectiva oficial](https://naruto-official.com/en/news/01_1629) | Interesse em Sasuke ligado à busca de poder e conhecimento. | [Sevrak Vey](personagens/sevrak.md) |
| [Mick](../docs_externas/punch-club/punch-club-quests.html#s%3Amick_first_time) | Mentor, acolhimento e entrada no circuito de luta. | [Ghork](personagens/ghork.md), [Virmura](personagens/virmura.md), [Borun Passo-Largo](personagens/borun.md) |
| [Silver / Freddie](../docs_externas/punch-club/punch-club-quests.html#s%3Athird_place_rookie_silver) | Treinador competente envolvido em dívida e interesses próprios. | [Sevrak Vey](personagens/sevrak.md), [Torvak Quebra-Ferro](personagens/torvak.md), [Lethra Passo-Justo](personagens/lethra.md), [Guedra Base-Firme](personagens/guedra.md) |
| [Roy](../docs_externas/punch-club/punch-club-quests.html#s%3Ared_hi) | Amizade, convívio, treino e apoio entre lutadores. | [Ghork](personagens/ghork.md), [Darvek do Esteio](personagens/darvek.md), [Brakka Ombro-Franco](personagens/brakka.md) |
| [Adrian](../docs_externas/punch-club/punch-club-quests.html#s%3Agirl_love) | Vínculo cotidiano e afetivo fora da carreira de luta. | [Zaila dos Retalhos](personagens/zaila.md) |
| [Apu](../docs_externas/punch-club/punch-club-quests.html#s%3Ashop_apu) | Comércio cotidiano que abre relações e contatos. | [Nima Sete-Nós](personagens/nima.md), [Jorvi Conta-Certa](personagens/jorvi.md) |
| [Casey](../docs_externas/punch-club/punch-club-quests.html#s%3Acasey_hi) | Comida, trabalho e acesso a outra rede de relações. | [Darvek do Esteio](personagens/darvek.md), [Velka do Arco Antigo](personagens/velka.md), [Nyra do Caldeirão](personagens/nyra.md) |
| [Tyler](../docs_externas/punch-club/punch-club-quests.html#s%3Atyler_ask_fight) | Porta de entrada para o circuito informal de lutas. | [Zagra Três-Cortes](personagens/zagra.md), [Brakka Ombro-Franco](personagens/brakka.md), [Tessa Pedra-Viva](personagens/tessa.md), [Lurga Duas-Risadas](personagens/lurga.md) |
| [Mickey / gypsy](../docs_externas/punch-club/punch-club-quests.html#s%3Agypsy_hi) | Intermediação e conflito local com o vizinho. | [Pirka Roda-Seca](personagens/pirka.md) |
| [Big Bobo / big_bo](../docs_externas/punch-club/punch-club-quests.html#s%3Abobo_work) | Poder local e trabalho associados a relações assimétricas. | [Zagra Três-Cortes](personagens/zagra.md) |
| [Don](../docs_externas/punch-club/punch-club-quests.html#s%3Adon_hi) | Influência econômica e ligação entre violência e negócios. | [Dorga Malho-Negro](personagens/dorga.md) |
| [Químico / Chemist](../docs_externas/punch-club/punch-club-quests.html#s%3Achemist_bad) | Efeitos colaterais levam à venda de novas preparações. | [Neral, apresentado como Savel](personagens/neral.md) |
| [Mestre Manguaça / dmaster](../docs_externas/punch-club/punch-club-quests.html#s%3Achina_trauma) | Tratamento cotidiano e serviços fora da academia. | [Sura Folha-Firme](personagens/sura.md), [Urdan Chá-de-Pedra](personagens/urdan.md) |
| [Whay / Proper](../docs_externas/punch-club/punch-club-quests.html#s%3Asport_acoustic) | Frequentador forte que usa aparelho auditivo e cede o antigo. | [Korr Rebite](personagens/korr.md), [Durn Sete-Rebites](personagens/durn.md) |
| [Morgan Red](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_start) | Interlocutor na prisão e explicação de sua vida cotidiana. | [Edrin Marca-Clara](personagens/edrin.md), [Fendro da Pedra Baixa](personagens/fendro.md) |
| [Prisioneiro](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_yard) | Testemunho sobre o passado altera a leitura do protagonista. | [Fendro da Pedra Baixa](personagens/fendro.md), [Sivren Guarda-Folhas](personagens/sivren.md) |
| [Paul, o guarda](../docs_externas/punch-club/punch-club-quests.html#s%3Aprison_guard_hi) | Autoridade cotidiana e controle de acesso na prisão. | [Seldan Portão-Firme](personagens/seldan.md) |
| [Ivan](../docs_externas/punch-club/punch-club-quests.html#s%3Arussia_start) | Acolhimento e treino fora da cidade de origem. | [Borun Passo-Largo](personagens/borun.md) |
| [Ivangief](../docs_externas/punch-club/punch-club-quests.html#s%3Arussia_afterfight) | Adversário que amplia a escala do desafio esportivo. | [Torvak Quebra-Ferro](personagens/torvak.md) |
| [Din Kong / Manager](../docs_externas/punch-club/punch-club-quests.html#s%3Amanager_hi) | Empresário enquadra o lutador como narrativa vendável. | [Meruna Voss](personagens/meruna.md), [Odrik Riso-de-Bronze](personagens/odrik.md) |
| [Harry / Manager2](../docs_externas/punch-club/punch-club-quests.html#s%3Alair_hi) | Intermediação de território, apoio e negócios da rota criminosa. | [Dorga Malho-Negro](personagens/dorga.md), [Moldren Fundo-de-Barril](personagens/moldren.md) |
| [Sr. Chapéu / Hatman](../docs_externas/punch-club/punch-club-quests.html#s%3Afianl) | Anfitrião apresenta o desafio final e seu campeão. | [Rask Voz-de-Arena](personagens/rask.md) |
| [Adriana](../docs_externas/punch-club/punch-club-2-quests.html#event%3AOldHouseAdriana) | Relação doméstica, cuidado e vulnerabilidade ligada ao tratamento. | [Sura Folha-Firme](personagens/sura.md), [Ivara Casa-Aberta](personagens/ivara.md) |
| [Henry](../docs_externas/punch-club/punch-club-2-quests.html#event%3AHenry) | Convívio e coleção de registros audiovisuais. | [Elune Margem-Rasa](personagens/elune.md), [Sivren Guarda-Folhas](personagens/sivren.md) |
| [Apu](../docs_externas/punch-club/punch-club-2-quests.html#event%3AApu) | Comércio e uma rede de acontecimentos que envolve as larvas. | [Tessa Pedra-Viva](personagens/tessa.md) |
| [Jai / Jay](../docs_externas/punch-club/punch-club-2-quests.html#event%3AJayCassier) | Continuidade do atendimento e das entregas na loja. | [Jorvi Conta-Certa](personagens/jorvi.md) |
| [Bobo](../docs_externas/punch-club/punch-club-2-quests.html#event%3ABobo) | Trabalho e rivalidade ligados à produção de alimentos. | [Mavren Chave-de-Cobre](personagens/mavren.md) |
| [Tio do Lámen](../docs_externas/punch-club/punch-club-2-quests.html#event%3ANoodleMan) | Comida, emprego e interesses de quem controla o estabelecimento. | [Mavren Chave-de-Cobre](personagens/mavren.md), [Nyra do Caldeirão](personagens/nyra.md) |
| [Casey](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACasey) | Apoio e memória ligada ao passado do pai do protagonista. | [Velka do Arco Antigo](personagens/velka.md) |
| [Emmit](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEmmit) | Recuperação de equipamentos e informações por peças e projetos. | [Korr Rebite](personagens/korr.md), [Durn Sete-Rebites](personagens/durn.md), [Elune Margem-Rasa](personagens/elune.md), [Nodri Pino-Solto](personagens/nodri.md) |
| [Mick holográfico](../docs_externas/punch-club/punch-club-2-quests.html#event%3AMickHologram) | Reconstrução de uma instituição de treino e formação. | [Guedra Base-Firme](personagens/guedra.md) |
| [Holocop](../docs_externas/punch-club/punch-club-2-quests.html#event%3AHolocop) | Ensino de procedimentos e integração à carreira policial. | [Seldan Portão-Firme](personagens/seldan.md) |
| [Dinamo](../docs_externas/punch-club/punch-club-2-quests.html#event%3ADinamo) | Interlocutor policial com problemas concretos, como ferramentas roubadas. | [Edrin Marca-Clara](personagens/edrin.md) |
| [K / Tio Barry](../docs_externas/punch-club/punch-club-2-quests.html#event%3AKBehindBar) | Papéis de investigador e organizador; identidade compartilhada revelada na campanha. | [Rask Voz-de-Arena](personagens/rask.md) |
| [Carla](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACarlaJourneyGround) | Retirada do protagonista e passagem para outro contexto da história. | [Pirka Roda-Seca](personagens/pirka.md), [Baska Vento-Baixo](personagens/baska.md) |
| [Ruth](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-RuthSparring) | Rivalidade e interação em treino e combate. | [Lethra Passo-Justo](personagens/lethra.md) |
| [Huey](../docs_externas/punch-club/punch-club-2-quests.html#event%3AEvent_I-Huey_Before_Fight) | Rivalidade de liga e apresentação pública de uma identidade. | [Odrik Riso-de-Bronze](personagens/odrik.md), [Lurga Duas-Risadas](personagens/lurga.md) |
| [Gerente de entregas](../docs_externas/punch-club/punch-club-2-quests.html#event%3AManager) | Trabalho, entregas e problemas de gestão de empregados. | [Nima Sete-Nós](personagens/nima.md) |
| [Entregador](../docs_externas/punch-club/punch-club-2-quests.html#event%3ACourier) | Interlocutor da rede de entregas. | [Baska Vento-Baixo](personagens/baska.md) |
| [Gyatso](../docs_externas/punch-club/punch-club-2-quests.html#event%3AGyatsoHealer) | Escuta, chá e atendimento fora das instituições centrais. | [Urdan Chá-de-Pedra](personagens/urdan.md) |
| [Jackson Teller](../docs_externas/punch-club/punch-club-2-quests.html#event%3AJacksonTeller) | Contato na rede de personagens da cidade. | [Moldren Fundo-de-Barril](personagens/moldren.md) |
| [Robô lutador de Iron Fist](../docs_externas/punch-club/punch-club-2-quests.html#event%3ARobotsHubRobotStation) | Projeto de construção, treino e conflito da expansão. | [Nodri Pino-Solto](personagens/nodri.md) |
| [MaMMa](../docs_externas/punch-club/punch-club-2-quests.html#event%3ARobotsHubAI) | O objetivo da IA ameaça a cidade na expansão Iron Fist. | [Ossena dos Quadros](personagens/ossena.md) |

## Fontes consultadas e rastreabilidade

- [Atlas local de Punch Club 1](../docs_externas/punch-club/punch-club-quests.html): `resources.assets / GameBalance / PathID 3213`, Unity 5.5.3f1, SHA-256 `de826211e0a95045adee2463ff57a4397f23b0926299f3dd7694abb46469ac3e`. As entradas `nm_` e os eventos citados sustentam o primeiro inventário.
- [Atlas local de Punch Club 2](../docs_externas/punch-club/punch-club-2-quests.html): extração de 17/10/2026, Unity 2022.3.30f1; localização `lng_pt-br` com fallback `lng_en`; 930 grafos. Os eventos citados sustentam a seleção de 31 interlocutores e duas entidades da expansão.
- [História da cidade de Punch Club 1](../docs_externas/punch-club/historia-da-cidade.md) e [história da cidade de Punch Club 2](../docs_externas/punch-club/punch-club-2-historia-da-cidade.md): contexto das funções e identidades. Permanecem análises externas.
- [Índice de personagens da wiki comunitária](https://punchclub.wiki.gg/wiki/Characters): consulta complementar por busca; a abertura direta retornou 403. Não sustenta os números deste levantamento e não foi tratado como lista completa recuperada.
- Retrospectivas oficiais de [Tsunade](https://naruto-official.com/en/news/01_1868), [Jiraiya](https://naruto-official.com/en/news/01_1643) e [Orochimaru](https://naruto-official.com/en/news/01_1629): relações e funções dos três modelos solicitados. Seus poderes e biografias não são transferidos integralmente.

Levantamento e catálogo preparados em 18/10/2026. A validação narrativa das criações é posterior à autorização para produzir estas fichas.
