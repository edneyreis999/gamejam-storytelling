/* Terminus — texto experimental. Decisões aprovadas: ../visao-do-jogo.md. */
(function (root) {
  "use strict";
  const quests = {};
  const guilds = {
    A: {
      name: "Mãos do Amparo",
      mentor: "Virmura",
      place: "Guilda de Virmura",
    },
    B: { name: "Caminhos Abertos", mentor: "Borun", place: "Guilda de Borun" },
    C: {
      name: "Ofício da Ascensão",
      mentor: "Sevrak",
      place: "Guilda de Sevrak",
    },
  };
  const pairs = [
    {
      id: "R1",
      names: ["Brakka", "Nima"],
      title: "O turno do pátio",
      place: "Estalagem de Nyra",
      long: false,
    },
    {
      id: "R2",
      names: ["Sura", "Edrin"],
      title: "O nome no registro",
      place: "Guilda de Virmura",
      long: true,
    },
    {
      id: "R3",
      names: ["Korr", "Velka"],
      title: "A armação inteira",
      place: "Oficina de Durn",
      long: false,
    },
    {
      id: "R4",
      names: ["Tessa", "Mavren"],
      title: "O pagamento da cisterna",
      place: "Cisterna em obras",
      long: true,
    },
    {
      id: "R5",
      names: ["Odrik", "Lethra"],
      title: "Uma vaga de exibição",
      place: "Coliseu",
      long: false,
    },
  ];
  const matrix = {
    AX: ["O", "PA", "R", "PB", "O"],
    AY: ["O", "PA", "O", "R", "PB"],
    BX: ["PB", "O", "PA", "O", "R"],
    BY: ["PB", "O", "R", "PA", "O"],
    CX: ["O", "PB", "O", "R", "PA"],
    CY: ["O", "PB", "PB", "O", "R"],
  };
  const n = (text, meta = {}) => ({
    type: "description",
    speaker: "Rheed",
    era: "past",
    text,
    ...meta,
  });
  const d = (speaker, text, expression = "atento", meta = {}) => ({
    type: "dialogue",
    speaker,
    expression,
    era: ["Rheed", "Criança"].includes(speaker) ? "present" : "past",
    text,
    ...meta,
  });
  const t = (speaker, text, expression = "reflexivo", meta = {}) => ({
    type: "thought",
    speaker,
    expression,
    era: ["Rheed", "Criança"].includes(speaker) ? "present" : "past",
    text,
    ...meta,
  });
  const p = (body, choices = []) => ({ body, choices });
  const c = (label, response, flags = {}, cost = 0) => ({
    label,
    response,
    flags,
    cost,
  });
  const q = (id, title, place, pages, kind = "event", meta = {}) => {
    quests[id] = { id, title, place, pages, kind, ...meta };
  };
  const mentor = (s) => guilds[s.guild].mentor;
  const team = (s) => s.recruits.filter((r) => r.invited).map((r) => r.name);
  const rivalGuilds = (s) => Object.keys(guilds).filter((g) => g !== s.guild);
  const otherRoute = (s) => (s.xy === "X" ? "Zagra" : "Darvek");
  const sponsor = (s) =>
    s.xy === "X"
      ? s.guild === "B"
        ? "Sevrak"
        : "Borun"
      : s.guild === "A"
        ? "Sevrak"
        : "Virmura";
  const heard = (s) =>
    s.flags.justification === "respect"
      ? "Você reconheceu meu trabalho naquela mesa. Eu ouvi. Mas também ouvi a decisão."
      : s.flags.justification === "firm"
        ? "Você fez questão de dizer por que meu plano não servia. Eu vim mostrar onde ele serve."
        : "Você tentou aliviar aquilo com uma brincadeira. Para mim, era trabalho.";

  q("intro", "Uma história que ainda dói", "Coreto da Noite da História", [
    p(
      [
        n(
          "O banco está quase cheio quando você chega. No tablado, Theodor Rheed gira um pequeno frasco entre os dedos. Espera que você encontre lugar.",
          { era: "present", background: "bg-coreto" },
        ),
        d(
          "Rheed",
          `Pode sentar. Daqui se ouve bem. Se eu disser alguma coisa que não convença, você me interrompe. Só não me peça um campeão antes de conhecer o sujeito.`,
          "alegre",
        ),
        d("Criança", "Vai ter monstro?", "investigativo"),
        n("Rheed ergue o frasco contra a luz.", {
          era: "present",
          background: "bg-coreto",
        }),
        d(
          "Rheed",
          `Haverá gente querendo muito alguma coisa. Os monstros chegam a seu tempo.`,
          "reflexivo",
        ),
      ],
      [
        c(
          "Perguntar quem é Ghork.",
          [
            d(
              "Rheed",
              `Um orc que ouviu muitas vezes que não cabia onde queria estar. Aprendeu algumas respostas. Outras ainda custavam caro.`,
            ),
            n("Você se aproxima. Rheed espera o banco parar de ranger.", {
              era: "present",
              background: "bg-coreto",
            }),
          ],
          { child: "curious" },
        ),
        c(
          "Pedir que comece pela chegada.",
          [
            d(
              "Rheed",
              `Então vamos chegar com ele. Mas não espere uma entrada com trombetas. Houve uma roda emperrada, uma rua que parecia comprida demais e uma perna que já não obedecia.`,
              "alegre",
            ),
          ],
          { child: "direct" },
        ),
      ],
    ),
    p([
      n(
        "Rheed bebe a poção e faz uma careta. Você pisca. A madeira do banco parece mais áspera sob seus dedos.",
        { era: "present", background: "bg-coreto" },
      ),
      n(
        "A carroça para em Terminus. Ghork tenta dizer o nome da cidade, mas o movimento da boca lhe custa esforço. As perguntas que ensaiou durante a viagem se embaralham.",
        {
          era: "past",
          place: "Mercado de provisões",
          background: "bg-mercado",
        },
      ),
      t("Ghork", "Cheguei. Agora só preciso descer.", "exausto"),
      n(
        "A perna lateja. Os curativos de Wanda não impediram a piora durante a viagem. Ghork procura um apoio e perde a consciência. Entre as vozes, uma mulher pede passagem.",
      ),
      d(
        "Virmura",
        `Deitado. Tragam-no para a enfermaria. A conversa fica para quando ele puder responder.`,
        "firme",
      ),
      n(
        `Ghork tenta procurar o dinheiro. Virmura afasta sua mão do embornal e chama ajuda. Não pergunta a qual guilda ele pretende pertencer.`,
      ),
    ]),
    p(
      [
        n(
          "Ghork desperta na enfermaria. Virmura aproxima uma tigela de sua boca. Do leito ao lado vem uma tosse; perto da porta, alguém pede mais panos limpos.",
          {
            place: "Guilda de Virmura · enfermaria",
            background: "bg-virmura-enfermaria",
          },
        ),
        d(
          "Ghork",
          `Eu posso pagar alguma coisa. Talvez não tudo de uma vez.`,
          "vulneravel",
        ),
        d(
          "Virmura",
          `Agora pode beber. Quando eu precisar que faça uma conta, digo.`,
          "firme",
        ),
        n(
          `Ele obedece, irritado com a facilidade com que a água treme em sua mão. Virmura segura a tigela sem comentar.`,
        ),
        d(
          "Virmura",
          `Você chegou muito mal. Não vai sair correndo porque acordou. E não precisa decidir seu futuro enquanto está deitado.`,
          "preocupado",
        ),
        n("Ghork olha para a porta."),
        t(
          "Ghork",
          "A cidade está logo ali. E eu mal consigo segurar uma tigela.",
          "vulneravel",
        ),
      ],
      [
        c(
          "Agradecer sem prometer uma vida inteira em troca.",
          [
            d(
              "Ghork",
              `Obrigado por não esperar que eu explicasse como pagar.`,
            ),
            d(
              "Virmura",
              `Depois você explica seu nome direito. O resto tem tempo.`,
            ),
            n(
              `Pela primeira vez desde a viagem, ele dorme sem tentar ensaiar uma apresentação.`,
            ),
          ],
          { arrival: "thanks" },
        ),
        c(
          "Perguntar quando poderá ajudar.",
          [
            d("Ghork", `Se eu ficar aqui, posso fazer alguma coisa?`),
            d(
              "Virmura",
              `Pode. Primeiro, não piorar. Depois veremos trabalho que caiba nessa perna.`,
            ),
            n(`Ela não ri do pedido. Isso o ajuda a aceitar a resposta.`),
          ],
          { arrival: "work" },
        ),
      ],
    ),
  ]);

  q(
    "gA1",
    "Um lugar enquanto melhora",
    "Guilda de Virmura",
    [
      p([
        n(
          `Os dias deixam de ser uma mancha de febre. Ghork já consegue sentar e separar os embrulhos que chegam à enfermaria. Virmura coloca dois cestos ao alcance de sua mão.`,
        ),
        d(
          "Virmura",
          `Estes foram conferidos. Aqueles, ainda não. Não troque para a mesa parecer arrumada.`,
        ),
        d(
          "Ghork",
          `Eu tinha um plano mais ambicioso para meu primeiro trabalho.`,
          "ironico",
        ),
        d("Virmura", `Ótimo. Este é o de hoje.`, "ironico"),
        n(
          "Ao longo do dia, chegam panos lavados, ervas e pedidos. Um visitante exige prioridade por conhecer um campeão. Virmura aponta o banco de espera.",
        ),
        n(
          "Mais tarde, Virmura oferece um quarto simples e trabalho durante a recuperação.",
        ),
        d("Ghork", "Então já sou da guilda?", "investigativo"),
        d(
          "Virmura",
          `Não se torna por dormir aqui. Se um dia escolher nossa bandeira, quero que saiba o que está escolhendo.`,
        ),
      ]),
      p(
        [
          n(
            `Virmura recarrega o colar que Ghork trouxe de Daratrine antes de devolvê-lo. A luz amarela ganha firmeza. Ele procura um canto tranquilo, ensaia um sorriso e vê Lala aparecer.`,
          ),
          d("Lala", `Você está numa cama?`, "preocupado"),
          d(
            "Ghork",
            `Numa cidade com camas. Isso já melhora bastante o relatório.`,
            "ironico",
          ),
          d(
            "Lala",
            "Ghork. Olha para mim. O que aconteceu com a sua perna?",
            "preocupado",
          ),
          d(
            "Ghork",
            "Piorou na viagem. Mas a Virmura está cuidando.",
            "vulneravel",
          ),
          d(
            "Lala",
            "O Dam perguntou se você chegou e se tem alguém cuidando de você. Era isso. Você não precisa me contar uma vitória agora.",
            "preocupado",
          ),
        ],
        [
          c(
            "Contar que chegou quase sem forças.",
            [
              n(`Lala demora a responder.`),
              d(
                "Lala",
                `Eu queria ter sabido antes. Mas estou ouvindo agora. Diz o nome de quem te ajudou.`,
                "preocupado",
              ),
              d(
                "Ghork",
                "Estou ajudando com os materiais. Ela me deu dois cestos. Comecei uma carreira de grande responsabilidade.",
                "ironico",
              ),
              d(
                "Lala",
                "E você já quis trocar tudo de lugar, aposto.",
                "alegre",
              ),
              d("Ghork", `Ainda vou fazer muita coisa aqui.`, "alegre"),
              d("Lala", `Eu sei. Me conta também as pequenas.`, "alegre"),
            ],
            { lala1: "honest" },
          ),
          c(
            "Começar pelo tratamento, depois contar o susto.",
            [
              n(
                `Ghork descreve a enfermaria antes de admitir o estado em que chegou. Lala percebe a volta que ele deu.`,
              ),
              d("Lala", `Você podia ter começado por aí.`, "firme"),
              d(
                "Ghork",
                `Queria que a primeira notícia fosse boa.`,
                "vulneravel",
              ),
              d(
                "Lala",
                `Estar vivo é boa. O susto vem junto, fazer o quê?`,
                "vulneravel",
              ),
              n(
                `Ele promete mandar notícias. Desta vez, uma promessa que entende como cumprir.`,
              ),
            ],
            { lala1: "careful" },
          ),
        ],
      ),
    ],
    "guild",
    { guild: "A", step: 1 },
  );
  q(
    "gB1",
    "O corredor de cargas",
    "Mercado de provisões",
    [
      p([
        n(
          `Quando pequenos deslocamentos se tornam possíveis, Virmura entrega a Ghork uma lista curta. A bolsa de materiais volta mais pesada do que pareceu na banca. Ele procura um caminho com menos gente e entra entre as carroças.`,
        ),
        n(
          `Dois homens se separam à sua frente. Um pergunta a hora. O outro olha para a bolsa. Ghork percebe tarde que o corredor já não tem uma saída livre.`,
        ),
        d(
          "Ghork",
          `Se precisam de curativo, estão escolhendo um jeito demorado de pedir.`,
          "ironico",
        ),
        n(
          `O mais próximo avança. Um bastão bate na madeira da carroça, bem entre os dois. Borun estava acompanhando uma descarga; deixou o ajudante segurando uma corda e entrou no corredor.`,
        ),
        d("Borun", `A passagem fica aberta. Ghork, atrás de você.`, "firme"),
        n(
          `Ghork protege a bolsa contra o peito e empurra um carrinho vazio. A roda atravessada atrapalha quem tenta segui-los. Borun abre espaço com o bastão. Eles alcançam a circulação do mercado antes que Ghork precise correr mais do que a perna suporta.`,
        ),
      ]),
      p(
        [
          n(
            `Borun espera junto de uma banca enquanto Ghork recupera o fôlego. Não pega a bolsa sem perguntar.`,
          ),
          d(
            "Borun",
            `A carga deles era leve demais. E ninguém descarrega olhando só para quem entra.`,
          ),
          n(
            `Ghork acompanha seu olhar. Os assaltantes desapareceram entre as carroças. Agora os sinais parecem óbvios; há poucos instantes, eram apenas a cidade.`,
          ),
          d(
            "Borun",
            `Da próxima vez, procure uma saída antes de precisar dela.`,
          ),
          d("Ghork", `Da próxima vez eu gostaria de não precisar.`, "ironico"),
          d("Borun", `Essa continua sendo minha opção favorita.`, "ironico"),
          n(
            `Ele aponta a sede de sua guilda e oferece continuar a conversa lá. Não pede uma resposta sobre filiação. Está mais interessado em saber por que Ghork escolheu aquele corredor.`,
          ),
        ],
        [
          c(
            "Admitir que procurava um atalho.",
            [
              d("Ghork", `Parecia mais curto.`),
              d("Borun", `Era. A pergunta é curto para quê.`, "ironico"),
              n(
                `Ele acompanha Ghork até a área movimentada, comenta as saídas e admite um atalho ruim que tomou quando era novo. Ghork ri antes de perceber que voltou a respirar normalmente.`,
              ),
            ],
            { borun: "honest" },
          ),
          c(
            "Perguntar como ele percebeu o cerco.",
            [
              n(
                `Borun mostra a posição das carroças e pede que Ghork a reconstrua com três caixas vazias. A primeira tentativa fecha a saída errada. Na segunda, Ghork entende.`,
              ),
              d(
                "Borun",
                `Guarde a observação. Meu bastão não vai estar em toda esquina.`,
              ),
              d("Ghork", `Mas se estiver, vou fingir surpresa.`, "ironico"),
            ],
            { borun: "observe" },
          ),
        ],
      ),
    ],
    "guild",
    { guild: "B", step: 1 },
  );
  q(
    "gC1",
    "O movimento repetido",
    "Coliseu",
    [
      p([
        n(
          `A entrega no coliseu deveria terminar na mesa de recebimento. Ghork para porque ouve risadas junto ao espaço de treino. Um veterano repete o mesmo golpe contra um iniciante, deixa-o levantar e começa de novo. O rapaz tenta afastar a arma para o lado que o veterano espera.`,
        ),
        d("Ghork", `Não siga a ponta. Ele abre o ombro antes.`),
        n(
          `Na tentativa seguinte, o iniciante muda de direção. Escapa por pouco. O veterano olha para Ghork e abandona o treino para avançar contra ele. Ghork recua; a perna não acompanha a intenção.`,
        ),
        n(
          `Sevrak intercepta o golpe e gira o braço do agressor até a arma cair. Não havia combinado aquilo com ninguém. Sua expressão deixa claro o que pensa de transformar uma correção em ataque.`,
        ),
        d("Sevrak", `Recolha sua arma quando souber para que veio.`, "hostil"),
        n(
          `O silêncio pesa mais que as risadas anteriores. Sevrak se volta para Ghork.`,
        ),
        d("Sevrak", `Explique o ombro.`, "investigativo"),
      ]),
      p(
        [
          n(
            `Ghork demonstra com o braço, sem tentar repetir a esquiva. Sevrak pede que diferencie o que viu do que supôs. A pergunta é exigente, mas ele permanece ouvindo quando a resposta demora.`,
          ),
          d(
            "Ghork",
            `Eu li sobre uma abertura parecida. Só não tinha visto alguém avisar tanto antes de atacar.`,
          ),
          d(
            "Sevrak",
            `Então reconheceu uma regularidade. Muitos assistem ao mesmo treino e só veem quem caiu.`,
          ),
          t(
            "Ghork",
            "Ele quer saber como eu percebi. Está mesmo esperando que eu explique.",
            "vulneravel",
          ),
          d(
            "Sevrak",
            "Venha à escola, Ghork. Quero ver se consegue repetir essa observação em outras situações.",
            "investigativo",
          ),
          d(
            "Ghork",
            "Posso ir. Só não prometo que todo veterano vai anunciar o golpe tão bem.",
            "ironico",
          ),
        ],
        [
          c(
            "Aceitar conhecer a escola, sem prometer adesão.",
            [
              d(
                "Ghork",
                `Quero conhecer. Ainda estou descobrindo onde posso ficar.`,
              ),
              d(
                "Sevrak",
                `Conheça com atenção. Uma decisão apressada desperdiçaria essa curiosidade.`,
              ),
              n(
                `O iniciante agradece quando o mestre se afasta. Ghork pede que não repita a esquiva até entendê-la. Por um instante, reconhece em si o tom de Sevrak.`,
              ),
            ],
            { sevrak: "visit" },
          ),
          c(
            "Perguntar se poderá contestar o método.",
            [
              n(`Sevrak observa Ghork por um instante.`),
              d(
                "Sevrak",
                `Se conseguir mostrar o erro, quero vê-lo. Se quiser apenas fugir do exercício, vou perceber.`,
                "investigativo",
              ),
              d(
                "Ghork",
                `Justo. Posso tentar as duas coisas em dias diferentes.`,
                "ironico",
              ),
              n(`O mestre quase sorri. O convite continua aberto.`),
            ],
            { sevrak: "question" },
          ),
        ],
      ),
    ],
    "guild",
    { guild: "C", step: 1 },
  );

  const paths = {
    A: [
      [
        "Os nomes atrás dos números",
        [
          n(
            `Virmura espalha registros de retirada sobre a mesa. Há manchas onde alguém apoiou uma mão molhada antes de escrever. Meruna abriu uma seleção: um contrato excepcional para investigar galerias pouco conhecidas. Primeiro, as guildas deverão explicar como comparar dois mapas aparentemente incompatíveis.`,
          ),
          d(
            "Virmura",
            `Se quer conhecer nosso trabalho, comece por quem precisou voltar.`,
          ),
          d(
            "Ghork",
            "Neste registro a maca passou. No outro, tiveram de desmontar. Vou usar o mais recente.",
            "investigativo",
          ),
          d(
            "Virmura",
            "Quantas pessoas a carregavam em cada retirada?",
            "investigativo",
          ),
          d(
            "Ghork",
            "Quatro aqui. Dois no outro… Melhor não guardar essa folha ainda.",
            "investigativo",
          ),
          d(
            "Virmura",
            `Um mapa que cabe na mesa pode não caber numa emergência. É isso que quero que Meruna entenda.`,
          ),
        ],
        "Perguntar quem ficou sem atendimento enquanto a equipe estava fora.",
        [
          d(
            "Virmura",
            "Veja estes turnos descobertos. Quero contratar gente para o campo sem deixar os leitos sem atendimento.",
            "preocupado",
          ),
          d("Ghork", "Eu estava olhando só o valor do contrato.", "reflexivo"),
          n(
            `Ghork passa a enxergar o prêmio como horas de pessoas que ainda não conhece.`,
          ),
        ],
        "Procurar primeiro uma retirada que realmente funcionou.",
        [
          n("Ghork encontra uma retirada registrada com hora, carga e nomes."),
          d("Ghork", "Esta funcionou. A maca voltou inteira.", "alegre"),
          d(
            "Virmura",
            "Continue. Um dos carregadores precisou de atendimento quando chegou.",
            "firme",
          ),
        ],
        [
          n(
            `Virmura não pede que Ghork vire curandeiro. Pede que não use os feridos como argumento decorativo. Ele copia os dados sem os nomes dos pacientes e acrescenta o número de pessoas necessário para cada retirada. O método começa a ganhar uma forma que pode ser mostrada.`,
          ),
        ],
      ],
      [
        "A largura de uma volta",
        [
          n(
            "Na casa de contratos, Elune dispõe os mapas ao lado dos registros trazidos por Ghork. Virmura acompanha a comparação.",
            { place: "Casa de contratos e mapas", background: "bg-contratos" },
          ),
          d(
            "Elune",
            "Veja as setas. Este desenho começa no pátio de carga. O outro acompanha quem já estava lá dentro.",
            "investigativo",
          ),
          d(
            "Ghork",
            "Então esta abertura pode ser a mesma? E a bifurcação também?",
            "investigativo",
          ),
          d(
            "Elune",
            "Confira o registro da maca. Ela saiu pelo caminho que o outro mapa usa para entrar.",
            "investigativo",
          ),
          d(
            "Ghork",
            "Estávamos comparando a entrada com a saída… Mas este trecho continua sem par. Será que repete o desenho do outro lado?",
            "investigativo",
          ),
          d(
            "Virmura",
            "Não podemos contar com isso, Ghork. É justamente aí que teremos de ir com cuidado.",
            "firme",
          ),
        ],
        "Marcar o trecho como desconhecido.",
        [
          d(
            "Ghork",
            "Vou deixar uma interrupção aqui. Assim ninguém confunde o que encontramos com o que eu estava tentando adivinhar.",
            "atento",
          ),
          d(
            "Elune",
            "Deixe a pergunta na margem. Vou mantê-la na cópia.",
            "atento",
          ),
        ],
        "Pedir que Elune confira a correspondência.",
        [
          d(
            "Ghork",
            "Pode refazer sem seguir minhas anotações? Quero saber se você chega aos mesmos pontos.",
            "investigativo",
          ),
          n(
            "Elune cobre as anotações e repete o percurso. A abertura e a bifurcação correspondem. O trecho seguinte continua sem resposta.",
          ),
          d("Elune", "Esta parte confere. A pergunta fica.", "atento"),
        ],
        [
          n(
            "De volta à enfermaria, Virmura pede que Ghork indique onde deixaria uma equipe de retirada.",
            {
              place: "Guilda de Virmura · enfermaria",
              background: "bg-virmura-enfermaria",
            },
          ),
          d(
            "Ghork",
            "Aqui, no último ponto confirmado. Mais perto ajudaria… se a passagem existir.",
            "investigativo",
          ),
          d("Virmura", "Inclua essa equipe no orçamento.", "firme"),
          d("Ghork", "Mesmo que ninguém precise dela?", "preocupado"),
          d(
            "Virmura",
            "Espero que ninguém precise. Ainda assim, ela estará lá.",
            "atento",
          ),
        ],
      ],
      [
        "O que o cuidado custa",
        [
          n(
            `Virmura coloca três pilhas de fichas na mesa: atendimento, material de campo, reserva para retorno. Ghork tenta aumentar uma sem diminuir as outras. Ela espera que ele perceba.`,
          ),
          d("Ghork", `Eu estava contando com conseguir tudo.`, "vulneravel"),
          d(
            "Virmura",
            `Meruna também. Por isso quer ouvir propostas antes de pagar.`,
          ),
          d(
            "Ghork",
            "Borun vai dizer que falta reconhecimento. Sevrak vai pedir uma medida que qualquer equipe possa repetir.",
            "preocupado",
          ),
          d("Virmura", "E o que vai responder?", "investigativo"),
          n(
            "Ghork abre a boca. Fecha de novo. Agradecer aos três não responderia à pergunta.",
          ),
          d(
            "Virmura",
            "Sem o contrato, a enfermaria continua. A ampliação da equipe de campo terá de esperar. É isso que estamos disputando.",
            "firme",
          ),
        ],
        "Defender o limite do plano diante de Virmura.",
        [
          d(
            "Ghork",
            `Podemos garantir uma forma de voltar. Não podemos chamar isso de levantamento completo.`,
          ),
          d(
            "Virmura",
            "Comece por aí quando formos apresentar. Quero que nos cobrem pelo que podemos entregar.",
            "atento",
          ),
        ],
        "Perguntar se escolher outra guilda muda seu tratamento.",
        [
          d(
            "Virmura",
            `Seu tratamento não está em disputa. Equipe, recursos e o trabalho que faremos depois, sim.`,
            "firme",
          ),
          n(
            `Ghork agradece a franqueza. Ela não promete que será fácil vê-lo defender outra bandeira.`,
          ),
        ],
        [
          n(
            "Ghork reúne os registros de acesso e retirada. Deixa as lacunas visíveis e acrescenta o orçamento da equipe de campo. A proposta está pronta para a reunião com Meruna.",
          ),
        ],
      ],
    ],
    B: [
      [
        "Uma história de estrada",
        [
          n(
            `Borun encontra Ghork na sede com duas canecas e um relato que mudou três vezes desde o mercado. Uma caravana diz que chegou às galerias pelo sul. Outra, pela abertura junto à descarga. Os dois mapas entregues por Meruna parecem confirmar lugares diferentes.`,
          ),
          d(
            "Borun",
            `Se eu disser que virei à esquerda, você sabe onde estava olhando?`,
          ),
          d(
            "Ghork",
            `Se disser com bastante confiança, muita gente vai achar que sabe.`,
          ),
          d(
            "Pirka",
            "A roda parou aqui nas duas viagens. Chamaram de descarga numa, de pátio na outra.",
            "firme",
          ),
          n("Ela deixa o registro das cargas ao lado dos mapas."),
          d(
            "Borun",
            "Antes de jogar um relato fora, descubra de onde a pessoa começou a contar. A estrada não muda porque alguém esqueceu de dizer para que lado olhava.",
            "atento",
          ),
        ],
        "Pedir a Pirka a sequência das paradas.",
        [
          d(
            "Pirka",
            "Descarregamos antes da abertura estreita. Ficamos esperando ali; a carroça não passou.",
            "atento",
          ),
          d(
            "Ghork",
            "Então a parada confere. Vou marcar a carroça também.",
            "investigativo",
          ),
        ],
        "Perguntar a Borun qual relato ele acredita.",
        [
          d("Borun", `Nos dois, até descobrir de quê estão falando.`),
          n(
            `Ghork não aceita aquilo como resposta completa. Borun concorda e entrega a caneca: a próxima pergunta precisa ser dele, não do mestre.`,
          ),
        ],
        [
          n(
            `Pirka aponta um marco que ninguém menciona por ser conhecido demais: a área onde as cargas são separadas. Ghork o registra. Para quem acabou de chegar, o óbvio também precisa de nome.`,
          ),
        ],
      ],
      [
        "Dois começos para um caminho",
        [
          n(
            `Elune acompanha a comparação na casa de contratos. Ghork dispõe os registros de Pirka ao lado dos mapas. Um cartógrafo orientou o desenho pela entrada; o outro, pelo caminho de volta até a descarga. Os relatos começam em lados distintos.`,
          ),
          d(
            "Elune",
            `Se usarmos a bifurcação e a abertura estreita como referência, esta parte deixa de se contradizer. Esta outra continua sem explicação suficiente.`,
          ),
          n(
            `Borun pede que Ghork reconte o trajeto sem apontar. Na primeira tentativa, ele usa esquerda duas vezes e perde o sentido do retorno. Recomeça com os marcos.`,
          ),
          d("Ghork", `Agora parece menos uma mina impossível.`),
          d("Borun", `Continua uma mina que não visitamos.`),
          n("Ghork escreve na margem: conferir no terreno."),
        ],
        "Separar no relato o visto do ouvido.",
        [
          n(
            `Ghork marca cada informação com sua origem. Algumas ficam mais frágeis. Borun mantém essas marcas mesmo sabendo que uma apresentação limpa impressionaria mais.`,
          ),
          d("Borun", `Quem for lá precisa saber onde começa a nossa aposta.`),
        ],
        "Pedir a Pirka que refaça o caminho descrito.",
        [
          n(
            `Pirka corrige uma parada e mantém as outras. A correção evita que uma lembrança de espera vire uma entrada nova. Elune altera a margem, sem apagar a origem da informação.`,
          ),
        ],
        [
          n(
            "O registro de Pirka acompanha a cópia dos mapas. Ghork separa os pontos confirmados daqueles que a equipe ainda precisará procurar na mina.",
          ),
        ],
      ],
      [
        "O preço de voltar",
        [
          n(
            `Borun mostra os pedidos de reconhecimento recusados por contratantes que queriam pagar apenas pela carga entregue. Há espaço em branco onde deveriam constar inspeções.`,
          ),
          d(
            "Borun",
            `Depois, quando alguém não volta, perguntam por que ninguém viu.`,
            "preocupado",
          ),
          n(
            `O novo contrato permitiria manter gente dedicada a procurar caminhos e retirar feridos. Se a guilda perder, continuará trabalhando; fará menos disso e aceitará mais serviços com margem apertada. Pirka quer que a proposta diga o custo de espera sem escondê-lo em linguagem bonita.`,
          ),
          n("Borun confere a soma duas vezes."),
          t(
            "Ghork",
            "No mercado ele parecia saber exatamente o que fazer. Aqui está esperando minha resposta.",
            "reflexivo",
          ),
        ],
        "Pedir que Borun exponha a parte mais fraca do plano.",
        [
          d(
            "Borun",
            `Memória se ajeita para caber no orgulho de quem conta. Inclusive na minha.`,
            "ironico",
          ),
          d(
            "Ghork",
            "Então vou pedir outra fonte até para as suas histórias.",
            "ironico",
          ),
          d(
            "Borun",
            "Faça isso. Vai me poupar de contar uma besteira muito bem contada.",
            "alegre",
          ),
        ],
        "Dizer que a ajuda no mercado não decide sua adesão.",
        [
          n(`Borun fica quieto antes de responder.`),
          d(
            "Borun",
            `Eu não abri aquela passagem para te conduzir à minha porta. Mas, se escolher outra, vamos disputar trabalho. Prefiro que saiba disso agora.`,
            "firme",
          ),
          n(`Ghork sente alívio e uma tristeza que não resolve a escolha.`),
        ],
        [
          n(
            "Borun devolve os registros a Ghork. As referências estão anotadas; as perguntas para a investigação, também. A apresentação caberá a ele.",
          ),
        ],
      ],
    ],
    C: [
      [
        "A mesa de comparação",
        [
          n(
            `Sevrak oferece uma mesa sem nada além dos dois mapas e uma régua. Ghork, que esperava exercícios complicados, começa medindo as linhas. Logo encontra diferenças suficientes para encher uma página.`,
          ),
          d(
            "Sevrak",
            `E qual delas impede que os mapas descrevam o mesmo lugar?`,
          ),
          d(
            "Ghork",
            "Nenhuma sozinha. A linha pode estar em outra escala. A virada depende de onde a pessoa começou.",
            "investigativo",
          ),
          d("Sevrak", "Então o que sua lista explica?", "investigativo"),
          d(
            "Sevrak",
            "Meruna vai contratar uma equipe. Preciso de um procedimento que outra pessoa consiga repetir. Você consegue escrevê-lo?",
            "investigativo",
          ),
          d(
            "Sevrak",
            `Se só você consegue explicar, não temos uma equipe. Temos dependência de você.`,
          ),
          t(
            "Ghork",
            "Consigo. Ou vou descobrir onde ainda não consigo.",
            "reflexivo",
          ),
        ],
        "Escrever um procedimento que outro aluno possa repetir.",
        [
          n(
            `Ele começa pela origem da escala e pelo sentido das setas. Um aprendiz encontra uma instrução ambígua. Ghork corrige antes que Sevrak diga qualquer coisa. O mestre observa, satisfeito, embora pareça considerar aquela correção prova de sua própria influência.`,
          ),
        ],
        "Perguntar o que a régua não pode mostrar.",
        [
          d(
            "Sevrak",
            `A confiança que merece a mão que desenhou. Nem o que ficou fora do papel.`,
          ),
          n(
            `Ghork acrescenta campos para origem e trecho coberto. A pergunta rende mais trabalho, mas o trabalho agora tem um propósito.`,
          ),
        ],
        [
          n(
            `A primeira folha de Ghork fica coberta de riscos. Sevrak pede que a guarde: é útil saber em que ponto uma certeza foi abandonada. Na saída, Ghork nota que o mestre escreveu seu nome no exercício, não apenas o da escola.`,
          ),
        ],
      ],
      [
        "O mesmo teste em outras mãos",
        [
          n(
            `Na casa de contratos, Elune recebe o procedimento. Ghork evita explicar cada passo; quer descobrir se o texto funciona sozinho. Ela compara as legendas e encontra orientações distintas, uma a partir da entrada, outra a partir do retorno.`,
          ),
          n(
            `A abertura estreita e a bifurcação se alinham quando os pontos de referência são relacionados. Elune deixa um trecho sem correspondência. Ghork quase oferece completá-lo. Lembra da pergunta que escreveu: o que ficou fora do papel?`,
          ),
          d(
            "Elune",
            `Posso reproduzir esta comparação. Não posso dizer que conheço a galeria.`,
          ),
          n(
            `Sevrak pede que ela registre as duas afirmações. Para Ghork, é desconcertante ver o melhor resultado da tarde terminar numa frase sobre o que não sabem.`,
          ),
        ],
        "Manter a lacuna no documento final.",
        [
          n(
            `Ghork explica que esconder a lacuna impediria a equipe de preparar a investigação certa. Sevrak aprova a conclusão, mas corrige um termo. Ghork aceita a correção sem deixar que ela apague o que observou.`,
          ),
        ],
        "Pedir que Sevrak execute o procedimento também.",
        [
          n(
            `O mestre ergue os olhos. Depois toma a régua e segue as instruções. Encontra um passo dispensável e nenhum atalho para o trecho desconhecido. Ghork não consegue esconder o sorriso.`,
          ),
          d("Sevrak", `Pode sorrir. Depois retire a repetição.`, "ironico"),
        ],
        [
          n(
            "O procedimento recebe as correções. No lugar da galeria desconhecida, Ghork conserva a pergunta que a equipe levará à investigação.",
          ),
        ],
      ],
      [
        "De quem é a resposta",
        [
          n(
            `Sevrak prepara a apresentação do contrato e aponta o lugar onde Ghork ficará. O nome do jovem aparece no quadro como exemplo de formação. Ghork reconhece a honra; reconhece também uma maneira de ser colocado dentro de uma história alheia.`,
          ),
          d(
            "Sevrak",
            `Sua observação no coliseu encontrou aqui uma disciplina. Isso merece ser visto.`,
          ),
          d("Ghork", `Eu já observava antes de entrar.`, "firme"),
          d("Sevrak", `E continuará observando melhor.`),
          n(
            `A escola precisa do contrato para manter instrutores e formar equipes de investigação. Se perder, terá de reduzir esse trabalho. Se ganhar, o mestre quer que Ghork seja prova pública do método. A oferta inclui ensino verdadeiro e uma expectativa que não cabe na régua.`,
          ),
        ],
        "Aceitar representar o método, preservando sua autoria.",
        [
          d(
            "Ghork",
            `Posso explicar o que aprendi aqui. Não vou dizer que comecei a pensar quando você me encontrou.`,
            "firme",
          ),
          n(
            `Sevrak demora um instante e retira uma frase da apresentação. Não abandona seu desejo de formar um sucessor. Ghork acaba de tornar a conversa menos confortável para ambos.`,
          ),
        ],
        "Pedir para apresentar também as limitações.",
        [
          d("Sevrak", `Não quero uma confissão de fracasso.`, "firme"),
          d(
            "Ghork",
            `Então vou apresentar uma pergunta bem preparada. Foi o que você me ensinou a fazer.`,
          ),
          n(
            `O mestre permite. O uso da própria lição contra sua pressa parece incomodá-lo e interessá-lo na mesma medida.`,
          ),
        ],
        [
          n(
            "Ghork guarda o procedimento junto dos mapas. Seu nome permanece na apresentação, assim como as limitações que pediu para explicar.",
          ),
        ],
      ],
    ],
  };
  for (const [g, entries] of Object.entries(paths))
    entries.forEach((e, i) =>
      q(
        `g${g}${i + 2}`,
        e[0],
        guilds[g].place,
        [
          p(e[1], [
            c(e[2], e[3], { [`method${g}${i}`]: "first" }),
            c(e[4], e[5], { [`method${g}${i}`]: "second" }),
          ]),
          p(e[6]),
        ],
        "guild",
        { guild: g, step: i + 2 },
      ),
    );

  q("champion", "O nome que a arquibancada conhece", "Coliseu", [
    p([
      n(
        `Depois de conhecer os três mentores, Ghork volta a ouvir o mesmo nome: Torvak. Os relatos variam, mas a prioridade reivindicada pela quarta guilda aparece em todos. Na enfermaria, Virmura interrompe a arrumação quando ele menciona o campeão.`,
      ),
      d(
        "Virmura",
        `Lutou com Orcquius e Glavius. Depois se separaram. A causa não é uma história que eu vá contar por eles.`,
      ),
      n(
        `Ghork segura a pergunta seguinte. Enfrentar alguém daquele time dá ao campeonato uma forma que ele não havia imaginado. Não seria apenas conseguir um lugar em Terminus. Seria uma vitória difícil de ignorar em Daratrine.`,
      ),
      n(
        `Virmura percebe o silêncio e devolve a conversa ao presente: Torvak usa feitos antigos para exigir prioridade agora. Ghork poderá ver isso sem precisar conhecer todos os segredos de sua vida.`,
      ),
    ]),
    p(
      [
        n(
          `No coliseu, Torvak cumprimenta companheiros pelo nome. Um veterano é chamado pelo público para contar uma expedição; ele começa atribuindo tudo ao campeão. Torvak o interrompe e lembra quem segurou a passagem enquanto os outros retiravam os feridos. A arquibancada aplaude o homem esquecido.`,
        ),
        t(
          "Ghork",
          "Ele lembra o nome de quem segurou a passagem. Eu também gostaria que lembrassem.",
          "reflexivo",
        ),
        n(
          "Torvak reconhece os sinais das guildas que acolheram o recém-chegado.",
        ),
        d("Torvak", `Estão todos interessados em você, pelo visto.`, "alegre"),
        d(
          "Ghork",
          "O senhor lutou mesmo com Orcquius e Glavius? Por que se separaram?",
          "investigativo",
        ),
        d(
          "Torvak",
          `Lutamos juntos. Hoje respondo pelos meus. Você fará bem em descobrir quem são os seus.`,
        ),
      ],
      [
        c(
          "Dizer que pretende chegar à final.",
          [
            d(
              "Torvak",
              `Então chegue. A arquibancada vai querer uma boa luta.`,
              "alegre",
            ),
            t(
              "Ghork",
              "Será que Orcquius ouviria falar de uma vitória aqui? Não. Essa pergunta não é para ele.",
              "reflexivo",
            ),
          ],
          { champion: "ambition" },
        ),
        c(
          "Perguntar por que sua guilda tem prioridade.",
          [
            d(
              "Torvak",
              `Porque construímos coisas que muita gente usa sem perguntar quem pagou.`,
              "firme",
            ),
            d("Ghork", `Isso dá direito a escolher quem vem depois?`),
            n(
              "Alguém chama Torvak da arquibancada. Ele se afasta sem responder.",
            ),
          ],
          { champion: "challenge" },
        ),
      ],
    ),
    p(
      [
        n(
          `Na saída, um boticário reservado oferece água a um lutador cansado. Apresenta-se como Savel e se volta para Ghork depois de ouvir a palavra campeonato.`,
        ),
        d(
          "Savel",
          `A vontade costuma se recuperar antes do corpo. Eu preparo coisas para encurtar essa distância.`,
        ),
        n(
          `Ele fala da perna sem tocar nela. Mostra um frasco, explica uma medida e não começa pelo preço. Ghork percebe como é agradável ouvir alguém oferecer ajuda sem recomendar paciência.`,
        ),
        d(
          "Savel",
          `Não precisa decidir agora. Minha loja fica no caminho do mercado.`,
        ),
      ],
      [
        c(
          "Recusar e guardar o nome do boticário.",
          [
            d("Ghork", `Já tenho gente cuidando disso.`),
            n(`Savel recolhe o frasco sem discutir.`),
            d(
              "Savel",
              `Quando quiser uma segunda conversa, sabe onde encontrar.`,
            ),
            n("Ghork guarda o nome da loja."),
          ],
          { potion: "refused" },
        ),
        c(
          "Perguntar o que acontece quando o efeito passa.",
          [
            d("Savel", `Depende do corpo e da medida. Podemos acompanhar.`),
            d(
              "Ghork",
              "Acompanhar como? Vou precisar voltar toda vez que parar de tomar?",
              "investigativo",
            ),
            d(
              "Savel",
              "As preparações podem precisar de ajustes. Prefiro conversar sobre o seu caso na loja.",
              "atento",
            ),
          ],
          { potion: "asked" },
        ),
        c(
          "Pedir a Rheed que faça Savel explicar melhor.",
          [
            d("Criança", `Ele falou muito e não respondeu!`),
            d(
              "Rheed",
              `É verdade. Por sorte, uma carroça barulhenta fez Ghork pedir que repetisse. Duas vezes.`,
              "ironico",
            ),
            n(
              `Savel admite que clientes voltam procurando alívio depois das primeiras doses. Ghork ainda não conhece a causa, mas passa a prestar atenção a quem retorna.`,
            ),
          ],
          { potion: "warned" },
          1,
        ),
      ],
    ),
  ]);
  for (const g of Object.keys(guilds))
    q(
      `g${g}5`,
      "A palavra que escolhe uma bandeira",
      "Casa de contratos e mapas",
      [
        p(
          (s) => [
            n(
              `Meruna reúne as guildas diante dos mapas. Ghork reconhece as margens anotadas, os pontos comuns e a lacuna que nenhuma comparação honesta eliminou. Não estão ali para fingir que já exploraram a mina. Estão ali para decidir quem fará isso.`,
            ),
            d(
              "Meruna",
              `Pago uma investigação. Preciso saber como vocês chegam a uma conclusão, e como vão reconhecer quando ela estiver errada. O contrato é exclusivo. Dividi-lo hoje deixaria indefinido quem responde pela entrega.`,
            ),
            n(
              `Ghork escolheu sustentar a proposta de ${guilds[g].mentor}. As outras duas lideranças esperam sua explicação. Há gratidão suficiente para todos naquela sala; os recursos não seguem a mesma regra.`,
            ),
            d(
              guilds[g].mentor,
              g === "A"
                ? "Ghork, fale do cuidado que podemos garantir. Não prometa mais em nosso nome."
                : g === "B"
                  ? "Conte por onde chegou à resposta, companheiro. E deixe à vista o que ainda não sabemos."
                  : "Apresente o procedimento, Ghork. Depois veremos se resiste às perguntas.",
              "firme",
            ),
          ],
          [
            c(
              "Explicar o método e reconhecer seus limites.",
              [
                n(
                  `Ghork expõe as referências que permitem relacionar os mapas e mostra o trecho ainda desconhecido. Explica por que confia no método escolhido, sem atribuir incapacidade aos demais. Meruna faz perguntas que obrigam a equipe a rever uma estimativa. A proposta permanece de pé.`,
                ),
              ],
              { guildSpeech: "respect" },
            ),
            c(
              "Defender com firmeza a prioridade escolhida.",
              [
                n(
                  `Ghork diz qual risco considera mais importante reduzir e por que o método escolhido o enfrenta melhor. As outras lideranças contestam a comparação. Ele responde com o que observou, não com a ajuda pessoal que recebeu. A discussão é dura, mas se mantém sobre trabalho verificável.`,
                ),
              ],
              { guildSpeech: "firm" },
            ),
          ],
        ),
        p(
          (s) => [
            n(
              `Meruna concede o contrato à guilda ${guilds[g].name}. Uma folha é assinada, outra volta para a pasta. O som é pequeno para a diferença que produz.`,
            ),
            ...Object.entries(guilds)
              .filter(([k]) => k !== g)
              .map(([k, v]) =>
                d(
                  v.mentor,
                  k === "A"
                    ? "A enfermaria continua aberta. Mas minha equipe de campo fica comigo. Teremos de buscar outro contrato."
                    : k === "B"
                      ? "Vou procurar outro trabalho com os meus, companheiro. E, no campeonato, vamos estar do outro lado."
                      : "Meus instrutores permanecem com a escola. Teremos resultados para comparar, Ghork. Espero que defenda os seus.",
                  "firme",
                ),
              ),
            t(
              "Ghork",
              "Se eu explicar outra vez… Eles entenderam. É por terem entendido que estão indo embora.",
              "vulneravel",
            ),
          ],
          [
            c(
              "Agradecer a ajuda e sustentar a escolha.",
              [
                d(
                  "Ghork",
                  `Eu me lembro do que fizeram por mim. Continuo escolhendo este trabalho.`,
                ),
                n(
                  "As outras lideranças recolhem seus documentos. Ghork permanece junto da guilda que escolheu.",
                ),
              ],
              { guildAfter: "steady" },
            ),
            c(
              "Reconhecer que a disputa continuará.",
              [
                d(
                  "Ghork",
                  `Eu esperava que fosse menos difícil sair desta sala.`,
                  "vulneravel",
                ),
                d(
                  "Meruna",
                  `Pode ser uma boa escolha e ainda ser difícil. Agora preciso da investigação.`,
                ),
                n(
                  `Ghork recolhe a cópia que lhe cabe. Pela primeira vez, há uma responsabilidade concreta junto da bandeira.`,
                ),
              ],
              { guildAfter: "plain" },
            ),
          ],
        ),
        p([
          d(
            "Meruna",
            "A guilda receberá pela operação. A remuneração de Ghork fica separada. Antes da partida, quero o prazo e a composição da equipe.",
            "firme",
          ),
          d(
            "Rheed",
            `Naquela noite, ele ensaiou como contaria a novidade a Lala. Começava pelo contrato. Depois pela guilda. Em todas as versões, demorava a chegar às duas pessoas que saíram contrariadas.`,
          ),
          d("Criança", `Elas deixaram de gostar dele?`),
          d(
            "Rheed",
            `Você pode querer bem a alguém e recusar trabalho para a bandeira dele. Ghork ainda estava descobrindo como era ouvir essa recusa em voz alta.`,
          ),
        ]),
      ],
      "guild",
      { guild: g, step: 5 },
    );

  q("retaliation", "Os horários riscados", "Coliseu", [
    p(
      (s) => [
        n(
          `${mentor(s)} encontra Rask diante do quadro de preparação. A quarta guilda recebeu mais uma prioridade. A sua já tinha horários concedidos; agora precisa disputar até a confirmação do que foi combinado. Ghork acompanha a conversa.`,
        ),
        d(
          mentor(s),
          `Esse espaço não foi reservado para nós por favor. Está no registro.`,
        ),
        n("Torvak se aproxima do quadro."),
        d(
          "Torvak",
          "Retire essa contestação. Aqui, diante de quem ouviu.",
          "hostil",
        ),
        d(
          mentor(s),
          "Não vou retirar a contestação. O horário estava concedido.",
          "firme",
        ),
        d(
          "Torvak",
          `Então explique aos seus por que preferiu isso à preparação.`,
          "hostil",
        ),
        n(
          `Ele pressiona Rask invocando patrocinadores e serviços da quarta guilda. O organizador olha o quadro e risca os horários da guilda de Ghork. A inscrição no campeonato permanece válida. O dano é deliberado.`,
        ),
      ],
      [
        c(
          "Cobrar de Rask que diga de quem foi a decisão.",
          [
            d("Rask", `Eu alterei o quadro depois da exigência de Torvak.`),
            n(
              `A frase não devolve os horários, mas impede que tudo seja contado depois como uma confusão. Ghork guarda a cópia anterior.`,
            ),
          ],
          { retaliation: "record" },
        ),
        c(
          "Dizer a Torvak que isso não lhe dá razão.",
          [
            d("Torvak", `Não pedi sua concordância.`, "hostil"),
            d(
              "Ghork",
              `Percebi. Está pedindo espaço que já era de outra equipe.`,
              "firme",
            ),
            n(
              `O campeão não recua. Ghork descobre uma diferença entre responder à injustiça e conseguir impedi-la.`,
            ),
          ],
          { retaliation: "confront" },
        ),
      ],
    ),
    p((s) => [
      n(
        `A preparação volta às instalações da guilda. ${s.guild === "A" ? "Virmura separa tarefas para que o treino não elimine pausas ou atendimento. Ghork ajuda a preparar um espaço livre e precisa aceitar que o descanso continue no plano." : s.guild === "B" ? "Borun redistribui práticas e acompanhamento. Pede a Ghork que observe o espaço antes de sugerir uma solução. Desta vez, não esconde a informação necessária sob uma lição." : "Sevrak adapta os exercícios à escola e aumenta sua cobrança. Ghork pede objetivos que possa cumprir ali, em vez de uma comparação diária com a arena perdida."}`,
      ),
      n(
        "Os treinos passam a dividir espaço com as outras tarefas da guilda. A inscrição permanece válida; Rask envia a confirmação.",
      ),
      n(
        `Ghork já queria vencer Torvak. Agora consegue explicar por quê sem mencionar Orcquius. Essa diferença o acompanha quando chega a hora de conhecer as equipes de investigação.`,
      ),
    ]),
  ]);

  q(
    "introX",
    "Esteios antes da descida",
    "Oficina de Durn",
    [
      p([
        n(
          `Darvek apoia uma mão num suporte e pede que Ghork observe onde a carga será recebida. Durn espera que ambos estejam de frente para explicar o teste. Não há peça bonita o bastante para dispensá-lo.`,
        ),
        d(
          "Darvek",
          `Quero reserva de escoramento, inspeção e gente pronta para retirada. Se alguém não puder andar, não vamos começar a inventar transporte lá dentro.`,
          "firme",
        ),
        n(
          `O plano custa uma parcela maior do pagamento. Ghork pergunta quanto sobrará para a preparação do campeonato. Darvek mostra os grupos de despesa e admite que haverá menos.`,
        ),
        d(
          "Darvek",
          `Não vou chamar isso de detalhe. É a diferença entre preparar agora uma coisa que talvez não usemos e precisar dela sem ter.`,
          "firme",
        ),
        n(
          `Ele e Zagra já trabalharam juntos. Discordaram sobre o tamanho da reserva, não sobre a obrigação de trazer pessoas de volta.`,
        ),
      ]),
      p(
        [
          n(
            `Durn pede que Ghork segure uma peça enquanto Darvek explica a retirada. O ensaio é lento. Uma passagem estreita exige mudar a posição da carga antes de prosseguir. Ghork pergunta se fariam aquilo mesmo sem ninguém ferido.`,
          ),
          d(
            "Darvek",
            `É quando se aprende sem cobrar a lição de um ferido.`,
            "atento",
          ),
          d(
            "Ghork",
            "Quanto dessa reserva cabe no pagamento? Quero entender antes de dizer que sim.",
            "investigativo",
          ),
        ],
        [
          c(
            "Pedir um limite para o gasto.",
            [
              d(
                "Darvek",
                "Esta reserva cobre o trecho que combinamos. Se precisar de mais, interrompo e consulto a guilda.",
                "atento",
              ),
              d(
                "Ghork",
                "Então quero esse limite por escrito também.",
                "firme",
              ),
            ],
            { xQuestion: "cost" },
          ),
          c(
            "Perguntar em que situação ele recuaria.",
            [
              n(
                `Darvek aponta uma condição que o escoramento não resolveria: uma passagem cujo retorno não possa ser mantido.`,
              ),
              d(
                "Darvek",
                `Levar mais equipamento não autoriza seguir sempre.`,
                "firme",
              ),
              n(
                `Ghork anota aquilo porque parece fácil esquecer depois de gastar tanto.`,
              ),
            ],
            { xQuestion: "limit" },
          ),
        ],
      ),
    ],
    "xyIntro",
    { route: "X" },
  );
  q(
    "introY",
    "Só o que consegue voltar",
    "Mercado de provisões",
    [
      p([
        n(
          `Zagra está retirando itens de uma lista quando Ghork chega. Pirka espera a decisão antes de acomodar a carga. O plano é um reconhecimento curto, com peso limitado e pontos de interrupção claros.`,
        ),
        d(
          "Zagra",
          `Se vamos levantar informação, não precisamos carregar uma segunda expedição dentro da primeira.`,
          "firme",
        ),
        n(
          `Ela preserva mais recursos para a preparação do campeonato. A economia tem um preço: menos meios de retirada se alguém se ferir. Ghork pede que ela repita essa parte. Zagra repete, sem enfeitar.`,
        ),
        d(
          "Zagra",
          `Por isso a distância é menor e o recuo vem antes. Se eu prometer entrar até onde Darvek entraria, estou vendendo uma vantagem que não tenho.`,
          "firme",
        ),
        n(
          `Pirka confirma o limite de carga. Não confundirá a pressa de ninguém com capacidade de transporte.`,
        ),
      ]),
      p(
        [
          n(
            `Zagra desenha as marcas de retorno e pede que Ghork aponte o último ponto seguro antes de uma passagem não verificada. Ele escolhe uma linha mais adiante. Ela risca.`,
          ),
          d(
            "Zagra",
            `Esta linha é o que queremos saber. Não é o que já sabemos.`,
            "firme",
          ),
          d(
            "Ghork",
            "Deixei o que quero encontrar passar na frente do que já vi. Elune ia me fazer apagar essa linha.",
            "ironico",
          ),
          d("Zagra", "Então apague antes que ela tenha o trabalho.", "ironico"),
        ],
        [
          c(
            "Pedir que o recuo seja decidido antes da entrada.",
            [
              d(
                "Ghork",
                "Qualquer pessoa pode pedir o retorno?",
                "investigativo",
              ),
              d(
                "Zagra",
                "Pode. Por isso estamos combinando agora. Lá dentro ninguém vai precisar disputar minha atenção.",
                "firme",
              ),
            ],
            { yQuestion: "limit" },
          ),
          c(
            "Perguntar o que acontece se alguém se ferir.",
            [
              d(
                "Zagra",
                "Com esta carga, conseguimos retirar alguém até aqui. Depois desta marca, dependeríamos de ajuda de fora.",
                "firme",
              ),
              d("Ghork", "É uma margem curta.", "preocupado"),
              d("Zagra", "É. Quero que escolha sabendo disso.", "firme"),
            ],
            { yQuestion: "risk" },
          ),
        ],
      ),
    ],
    "xyIntro",
    { route: "Y" },
  );
  q("alliance", "Quem desce com a guilda", "Casa de contratos e mapas", [
    p(
      [
        n("Darvek e Zagra deixam os planos diante de Meruna."),
        d(
          "Meruna",
          "A guilda responde pelo contrato. Qual das equipes fará a investigação com vocês?",
          "investigativo",
        ),
        n(
          `Meruna quer uma decisão que permita preparar a investigação. Os antigos parceiros conseguem descrever o plano um do outro sem concordar com ele. A discussão fica pior quando tentam adivinhar o que a escolha dirá sobre sua competência.`,
        ),
        t(
          "Ghork",
          "Se eu disser que os dois vão gostar da resposta, já começo mentindo.",
          "preocupado",
        ),
      ],
      [
        c(
          "Escolher X: investir na reserva de segurança de Darvek.",
          [
            n(
              `Darvek recolhe a lista de material. Zagra mantém a sua aberta por mais um instante. O trabalho seguirá com uma reserva maior e menos recursos livres para preparação.`,
            ),
          ],
          { routeChoice: "X" },
        ),
        c(
          "Escolher Y: adotar o reconhecimento limitado de Zagra.",
          [
            n(
              `Zagra confirma a carga e os pontos de recuo. Darvek recolhe o orçamento de escoramento. O trabalho preservará mais recursos, com uma margem menor diante de um ferimento.`,
            ),
          ],
          { routeChoice: "Y" },
        ),
      ],
    ),
    p(
      (s) => [
        n(
          `${s.flags.routeChoice === "X" ? "Zagra" : "Darvek"} pede que Ghork diga por que escolheu o outro método. A pergunta é profissional, mas a antiga discordância ocupa a cadeira ao lado. Ghork pode reconhecer o que está deixando para trás sem trocar a decisão.`,
        ),
      ],
      [
        c(
          "Reconhecer a competência dos dois e explicar a prioridade.",
          [
            d(
              "Ghork",
              "Ouvi os dois. Escolhi a margem com que consigo assumir este trabalho. Não estou dizendo que você não sabe o que faz.",
              "firme",
            ),
            n(
              "A explicação é ouvida em silêncio. O orçamento recusado permanece sobre a mesa.",
            ),
          ],
          { justification: "respect" },
        ),
        c(
          "Defender a escolha sem suavizar a discordância.",
          [
            n(
              `Ghork explica a fragilidade que mais o preocupa no plano recusado. O representante contesta a avaliação. A discussão termina com a decisão mantida e um desacordo que nenhum aperto de mão encerra.`,
            ),
          ],
          { justification: "firm" },
        ),
        c(
          "Tentar aliviar o clima com humor.",
          [
            d(
              "Ghork",
              "Eu gostaria de levar os dois orçamentos e pagar só um.",
              "ironico",
            ),
            n(
              "A brincadeira cai mal. Ghork baixa os olhos e volta ao plano que escolheu.",
            ),
          ],
          { justification: "humor" },
        ),
      ],
    ),
  ]);

  q(
    "X1",
    "Ensaiar a retirada",
    "Minas e galerias",
    [
      p([
        n(
          `Os Esteios chegam à entrada com a reserva combinada. Darvek confere nomes, material e caminho de volta. Ghork vê quanto trabalho acontece antes de alguém dar o primeiro passo para dentro. Há uma parte sua que chama isso de demora. Outra lembra da mão de Virmura impedindo que o colocassem em pé.`,
        ),
        n(
          `A equipe ensaia retirar uma carga pelo trecho conhecido. Uma correia prende numa saliência. Ninguém está ferido; podem parar, mudar a posição e repetir. O erro custa tempo e revela a limitação antes da urgência.`,
        ),
        d(
          "Darvek",
          `Anote a mudança. A próxima equipe não estava aqui para ver.`,
          "atento",
        ),
        n("Ghork acrescenta a mudança à cópia que ficará com a guilda."),
      ]),
      p(
        [
          n(
            `O pagamento do material reduz o saldo da operação. Darvek apresenta a conta à guilda antes de avançar. Ghork percebe que não poderá dizer depois que o custo apareceu sem aviso. Pode, porém, cobrar o uso do que foi pago.`,
          ),
        ],
        [
          c(
            "Conferir o material com a conta.",
            [
              d(
                "Ghork",
                "Esta peça ficou na entrada. Entra como material consumido?",
                "investigativo",
              ),
              d(
                "Darvek",
                "Não. Vai voltar identificada. Reserva também precisa ter destino quando ninguém usa.",
                "atento",
              ),
            ],
            { field1: "account" },
          ),
          c(
            "Repetir com a equipe o procedimento de retorno.",
            [
              n(
                `Ghork explica o procedimento e pede uma correção. Um trabalhador mostra onde sua descrição exigia virar a carga sem espaço. Eles ajustam a instrução antes de levá-la para dentro.`,
              ),
            ],
            { field1: "practice" },
          ),
        ],
      ),
    ],
    "route",
    { route: "X", step: 1 },
  );
  q(
    "X2",
    "A passagem que pede tempo",
    "Minas e galerias",
    [
      p([
        n(
          `A primeira parte do levantamento confirma os marcos relacionados nos mapas. Mais adiante, uma passagem exige inspeção antes de receber o peso da equipe. Darvek interrompe. A reserva permite organizar o retorno e manter gente fora enquanto o trecho é observado.`,
        ),
        t("Ghork", "Mais um pouco. O relatório ficaria tão…", "investigativo"),
        n(
          "Um trabalhador espera sua resposta junto da carga. Ghork olha de novo para a passagem.",
        ),
        d(
          "Darvek",
          `Podemos conferir daqui. Não podemos afirmar que atravessamos.`,
          "preocupado",
        ),
        n("Ghork marca o ponto de interrupção no levantamento."),
      ]),
      p(
        [
          n(
            `Na devolutiva, Elune distingue trechos observados e estimados. Darvek responde pelo gasto. A guilda recebe informação útil e uma indicação precisa do que ainda exige investigação. Ghork terá menos preparação paga do que imaginou ao ouvir o valor do contrato.`,
          ),
        ],
        [
          c(
            "Defender a interrupção e cobrar uma conta clara.",
            [
              d(
                "Ghork",
                "Defendo a parada. Também quero conferir o que gastamos.",
                "firme",
              ),
              d(
                "Darvek",
                "Está tudo nesta conta. Vamos conferir juntos.",
                "atento",
              ),
            ],
            { field2: "accountable" },
          ),
          c(
            "Admitir que esperava avançar mais.",
            [
              d(
                "Ghork",
                `Ainda acho difícil olhar para o trecho em branco.`,
                "vulneravel",
              ),
              d(
                "Darvek",
                `Eu também. Prefiro que esteja no mapa a estar na lista de quem voltou.`,
                "preocupado",
              ),
              n(
                `Ghork mantém o trecho em branco e explica a razão com suas próprias palavras.`,
              ),
            ],
            { field2: "honest" },
          ),
        ],
      ),
    ],
    "route",
    { route: "X", step: 2 },
  );
  q(
    "Y1",
    "Marcas antes da pressa",
    "Minas e galerias",
    [
      p([
        n(
          `As Faíscas chegam com a carga limitada e a proposta de um reconhecimento curto. Zagra manda separar o que ficará na entrada. Pirka confere se a economia no papel corresponde ao peso que terá de retirar.`,
        ),
        n(
          `Ghork acompanha a marcação do retorno. Uma curva parece fácil de reconhecer na ida, mas se parece com outra quando ele olha de volta. Corrige a marca. Zagra espera; não transforma o próprio plano leve numa ordem para fazer tudo depressa.`,
        ),
        d(
          "Zagra",
          `Se não soubermos voltar, o pouco que carregamos já é demais.`,
          "preocupado",
        ),
        n(
          "Pirka deixa o equipamento restante junto da entrada. A equipe seguirá com a carga combinada.",
        ),
      ]),
      p(
        [
          n(
            `Antes da entrada, um trabalhador pede que o ponto de recuo seja repetido. Zagra indica a referência e pede a Ghork que diga o que fariam se ela não estivesse visível. A pergunta chega antes do perigo.`,
          ),
        ],
        [
          c(
            "Interromper se perderem a referência.",
            [
              n(
                `Ghork não acrescenta uma exceção para quando estiverem perto do objetivo. Zagra confirma a regra diante de todos. A equipe sabe que o limite não dependerá do humor de quem estiver liderando.`,
              ),
            ],
            { field1: "limit" },
          ),
          c(
            "Conferir de novo as marcas olhando para a saída.",
            [
              n(
                `Uma marca fica escondida atrás da carga quando vista no retorno. Eles a reposicionam. O tempo gasto é pequeno, mas suficiente para Ghork deixar de chamar toda espera de atraso.`,
              ),
            ],
            { field1: "check" },
          ),
        ],
      ),
    ],
    "route",
    { route: "Y", step: 1 },
  );
  q(
    "Y2",
    "O levantamento incompleto",
    "Minas e galerias",
    [
      p([
        n(
          `A equipe alcança os marcos comuns dos mapas. A comparação externa funciona naquele trecho. Adiante, sinais de instabilidade aparecem antes do limite pretendido. Zagra para e olha para a carga disponível. Não têm a reserva que Darvek teria levado.`,
        ),
        t(
          "Ghork",
          "Dava para tentar mais uma vez. Foi por pensar assim que combinamos a volta antes de entrar.",
          "preocupado",
        ),
        d("Zagra", `Vamos marcar o que vimos daqui e voltar.`, "firme"),
        n(
          "Na volta, Ghork precisa virar de lado junto da carga. Olha para o espaço por onde teriam de passar com alguém ferido e prossegue em silêncio.",
        ),
      ]),
      p(
        [
          n(
            `Elune recebe o levantamento e pede que não desenhem o trecho interrompido como percorrido. Zagra preservou mais recursos, mas entrega menos extensão do que desejava. A informação continua útil para Meruna porque distingue observação de desejo.`,
          ),
        ],
        [
          c(
            "Assinar o limite do levantamento junto de Zagra.",
            [
              d(
                "Ghork",
                "Eu assino também. Escolhemos essa margem juntos.",
                "firme",
              ),
              d(
                "Zagra",
                "Então confira onde marquei o recuo. Quero a medida certa.",
                "atento",
              ),
            ],
            { field2: "accountable" },
          ),
          c(
            "Perguntar o que fariam diferente na próxima entrada.",
            [
              d(
                "Zagra",
                "Agora sabemos onde o apoio falta. Na próxima entrada, levo a reserva para esse trecho.",
                "atento",
              ),
              d(
                "Ghork",
                "Vou querer ver a lista antes de ajudar a carregar.",
                "ironico",
              ),
            ],
            { field2: "learn" },
          ),
        ],
      ),
    ],
    "route",
    { route: "Y", step: 2 },
  );
  q("classify", "O que cabe numa promessa", "Coliseu", [
    p(
      (s) => [
        n(
          `Meruna aceita o relatório com seus limites. ${s.xy === "X" ? "A reserva de segurança consumiu uma parcela maior do pagamento. A guilda precisará distribuir a preparação restante com cuidado." : "O reconhecimento limitado preservou mais recursos. A guilda pode ampliar a preparação, mas ainda terá de explicar os trechos não percorridos."}`,
        ),
        n(
          "Depois de receber sua parte do pagamento, Ghork volta à guilda. Recarrega o colar antes de procurar Lala.",
          { background: guildBackground(s) },
        ),
        n(
          "A imagem de Lala aparece sobre o brilho do colar. Ela aproxima um tecido para mostrar a costura.",
        ),
        d(
          "Lala",
          "Olha esta parte. Refiz três vezes, mas agora o caimento ficou bom. Vou começar a oferecer as peças.",
          "alegre",
        ),
      ],
      [
        c(
          "Perguntar sobre o trabalho que ela começou.",
          [
            d(
              "Ghork",
              "Vai começar por quem? Já pensou onde mostrar?",
              "investigativo",
            ),
            d(
              "Lala",
              "Já. E antes que você pergunte: não preciso esperar a loja ficar pronta para mostrar uma manga.",
              "ironico",
            ),
            d("Ghork", "Eu ia perguntar da outra manga.", "ironico"),
          ],
          { lala2: "listen" },
        ),
        c(
          "Lembrar a promessa da loja, depois ouvir o plano dela.",
          [
            d(
              "Lala",
              `Eu lembro da loja. Mas posso começar antes de você conseguir comprar uma.`,
              "firme",
            ),
            n(
              `Ghork sente a correção, respira e pede que mostre a peça de novo. Ela não recusa seu apoio; recusa ficar esperando para trabalhar.`,
            ),
          ],
          { lala2: "promise" },
        ),
      ],
    ),
    p(
      [
        d(
          "Lala",
          "O Dam pediu para falar da goteira no quarto comum. Já viu o que precisa trocar. Quer saber se você pode ajudar com uma parte.",
          "preocupado",
        ),
        d("Ghork", "Quanto falta?", "investigativo"),
        d(
          "Lala",
          "Ele mandou a conta. E pediu uma resposta, Ghork. Precisa organizar o resto.",
          "firme",
        ),
        n(
          "Ghork confere o pedido. Pode separar a contribuição e combinar uma remessa com Pirka, com recibo. Se enviar, abrirá mão da preparação adicional que pagaria com sua parte do contrato.",
        ),
        t(
          "Ghork",
          "Eu prometi uma casa inteira. Agora tenho uma conta de reparo nas mãos.",
          "vulneravel",
        ),
      ],
      [
        c(
          "Contribuir e abrir mão da preparação adicional.",
          [
            n(
              `Ghork combina a remessa com recibo e pede que Lala avise o valor da contribuição a Dam. Não diz que resolveu o problema inteiro.`,
            ),
            d(
              "Lala",
              `Vou contar. E vou contar que você perguntou pelo trabalho.`,
            ),
            n(
              `A conversa termina sem anúncio de façanha. Ghork fica olhando o colar por um tempo.`,
            ),
          ],
          { dam: "help" },
        ),
        c(
          "Guardar o dinheiro e comunicar que não pode contribuir agora.",
          [
            n(
              `Ghork explica que manterá a preparação prevista e pede que Dam não conte com aquele dinheiro. A frase custa mais que uma promessa vaga.`,
            ),
            d(
              "Lala",
              `Ele vai preferir saber. Vai ter de mudar o plano, mas vai saber.`,
              "preocupado",
            ),
            n(
              `Ela continua conversando sobre suas peças. O assunto difícil não tomou o lugar de toda a amizade.`,
            ),
          ],
          { dam: "defer" },
        ),
      ],
    ),
    p((s) => [
      n(
        `Guedra observa Ghork antes de indicar um exercício. ${s.flags.dam === "help" ? "A sessão paga adicional ficou de fora. Eles reorganizam o treino disponível na guilda; há menos tempo de acompanhamento individual. Ghork precisa escolher uma correção para trabalhar por vez." : "A preparação adicional oferece mais tempo para corrigir o apoio. Guedra avisa que tempo de treino não compra o resultado de uma luta. Ghork ainda terá de executá-lo quando estiver com medo."}`,
      ),
      d(
        "Guedra",
        `Pare de tentar usar o alcance de alguém maior. Mostre o que consegue fazer daqui.`,
      ),
      n(
        "Ghork muda o apoio. A perna exige uma posição diferente da que tentou imitar. Ele repete o movimento, perde o equilíbrio e volta ao início.",
      ),
      d(
        "Guedra",
        "Uma correção por vez. Primeiro o apoio. Depois você aumenta o alcance.",
        "firme",
      ),
      n(
        `Da passagem para o público, ele vê um companheiro entregar uma dose a Torvak. O campeão demora a firmar a mão antes de sorrir para quem o chama.`,
        { background: "bg-coliseu-entrada" },
      ),
    ]),
    p(
      [
        n(
          "Na passagem do coliseu, Dorga conversa com Meruna. Savel espera perto dos acompanhantes.",
        ),
        d(
          "Dorga",
          "Nossa guilda manteve equipes quando os outros recusaram o serviço. Isso precisa pesar na próxima contratação.",
          "firme",
        ),
        d(
          "Meruna",
          "Vai pesar. Ainda preciso do prazo e das condições do próximo trabalho.",
          "atento",
        ),
        n(
          `Torvak encontra Ghork na passagem. Não nega o cancelamento dos horários.`,
        ),
        d(
          "Torvak",
          `Seu mentor podia ter encerrado aquilo com uma retratação.`,
        ),
        d("Ghork", `Você podia ter aceitado a contestação.`),
        n(
          `O campeão mantém sua justificativa. Ghork percebe desgaste, influência e medo de perder espaço no mesmo homem. Compreender isso não devolve o que sua guilda perdeu.`,
        ),
      ],
      [
        c(
          "Perguntar pela dose, sem esquecer a cobrança.",
          [
            d(
              "Torvak",
              `Você quer falar da minha mão ou da sua preparação?`,
              "hostil",
            ),
            d("Ghork", `Das duas. Uma não apaga a outra.`, "firme"),
            n(
              `O campeão encerra a conversa. A recusa em explicar fica junto do que Ghork viu, ainda longe de provar uma conspiração.`,
            ),
          ],
          { symptoms: "ask" },
        ),
        c(
          "Cobrar a retaliação e guardar a observação.",
          [
            d(
              "Ghork",
              "Chegamos até aqui. O cancelamento dos horários continua sendo responsabilidade sua.",
              "firme",
            ),
            d(
              "Torvak",
              "Na arena vamos ver o que conseguiram preparar.",
              "hostil",
            ),
          ],
          { symptoms: "observe" },
        ),
        c(
          "Pedir a Rheed um detalhe que passou despercebido.",
          [
            d(
              "Rheed",
              `O frasco tinha uma marca no gargalo. Ghork a reconheceu da oferta de Savel. Não leu a mente de ninguém; reconheceu uma embalagem.`,
            ),
            d("Criança", `Então o vendedor voltou à história.`),
            d("Rheed", `Na verdade, não tinha saído.`),
          ],
          { doseClue: true },
          1,
        ),
      ],
    ),
    p((s) => [
      d(
        "Rask",
        "Classificação confirmada! A equipe de Ghork segue para as eliminatórias.",
        "alegre",
      ),
      n(
        "Ghork lê o próprio nome no quadro. Confere uma segunda vez, sorrindo.",
      ),
      d(
        mentor(s),
        `${s.guild === "A" ? "Você avançou. Agora respeite os limites que combinamos também quando estiver contente." : s.guild === "B" ? "Quero ouvir de você o que funcionou. Não me devolva só o que eu disse." : "A classificação mostra o valor do trabalho. Quero que reconheça a formação que recebeu."}`,
      ),
      n(
        `Ghork agradece e mantém para si uma parte da conquista. No quadro seguinte estão as equipes das guildas rejeitadas. Mais adiante, poderá reencontrar quem não escolheu para a investigação.`,
      ),
      d(
        "Rask",
        "Antes da primeira eliminatória, preciso da lista definitiva. Ainda dá tempo de conversar com seus convidados. Venha confirmar quando estiver pronto.",
        "atento",
      ),
    ]),
  ]);

  const recruitTexts = [
    [
      [
        n(
          `Nyra abre a porta do pátio e mostra o espaço que consegue ceder naquela noite. Brakka já mediu onde caberiam os trabalhadores que saem tarde. Nima trouxe as listas do despacho noturno. Os dois conhecem o horário do outro; nenhum inventou a necessidade para vencer a discussão.`,
        ),
        d(
          "Brakka",
          `Quando eles largam as cargas, os espaços de treino já fecharam. Só quero uma noite em que não precisem escolher entre trabalhar e aprender.`,
          "preocupado",
        ),
        d(
          "Nima",
          `E eu quero que os entregadores saiam juntos. Se montar o despacho depois, alguém vai acabar atravessando a cidade sozinho.`,
          "firme",
        ),
        d(
          "Nyra",
          "Tenho este pátio e esta noite. Se prometerem outro lugar, digam quem vai abrir a porta e cuidar dele.",
          "firme",
        ),
      ],
      [
        n(
          `Ghork confere bancos, iluminação e passagem. Brakka aceita mover equipamento para não obstruir a saída. Nima reduz as pilhas para manter o mesmo acesso livre. A disposição de cada um para colaborar não resolve a disputa pelo horário.`,
        ),
        d(
          "Nyra",
          `Quero uma resposta que eu consiga pôr em prática antes de anoitecer. Se vocês decidirem amanhã, os dois perderam hoje.`,
        ),
        n(
          "Ghork olha o material de treino e as listas de despacho. Nyra espera junto da porta.",
        ),
      ],
      [
        "Preparar o pátio para o treino de Brakka.",
        "Organizar o despacho coletivo de Nima.",
      ],
      [
        [
          n(
            `Brakka ajuda a mover os bancos e recebe trabalhadores ainda com roupa de serviço. Não faz discurso sobre terem vencido os entregadores. Nima reorganiza a saída daquela noite e deixa claro que continuará procurando apoio para o despacho.`,
          ),
          d(
            "Brakka",
            `Se montar um time, me chama. Quero levar esse pessoal comigo quando entrar na arena, mesmo que fiquem na arquibancada.`,
            "alegre",
          ),
        ],
        [
          n(
            `Nima prende as listas onde todos podem vê-las e combina a saída em grupo. Brakka recolhe o material de treino e procura outra oportunidade; a conversa não resolve sua falta de horário.`,
          ),
          d(
            "Nima",
            `Quando tiver um time, podemos conversar. Não quero ser lembrada só pela pessoa que entrega a arma de quem aparece no cartaz.`,
            "firme",
          ),
        ],
      ],
    ],
    [
      [
        n(
          "Sura mostra os registros de lesões sem nomes expostos. Edrin traz relatos de pessoas que querem pedir reparação publicamente.",
        ),
        d(
          "Sura",
          `Há gente que só procurou cuidado porque prometemos sigilo. Não vou retirar essa proteção para tornar o relatório mais forte.`,
          "firme",
        ),
        d(
          "Edrin",
          `E há gente que pediu para falar. Não vou responder por elas que é melhor desaparecer atrás de uma soma.`,
          "firme",
        ),
        d(
          "Ghork",
          "Posso ajudar a preparar uma apresentação agora. O relatório ou os depoimentos.",
          "atento",
        ),
        d(
          "Sura",
          "Nos dois casos, vamos conferir o que cada pessoa autorizou.",
          "firme",
        ),
      ],
      [
        n(
          `Um ferido autoriza a inclusão do relato, mas pede que não mostrem seu nome. Outro quer se identificar e exige ver a forma como suas palavras foram registradas. Ghork percebe como seria fácil reuni-los numa frase conveniente e perder as duas vontades.`,
        ),
        n(
          `Edrin pede que ele repita o que entendeu antes de escrever. Sura acompanha a leitura e corrige uma conclusão que os registros não sustentam. Nem toda lesão prova a mesma responsabilidade. O trabalho precisa ser preciso mesmo quando a indignação parece suficiente.`,
        ),
        d(
          "Edrin",
          "Este nome pode aparecer. Aquele pediu sigilo. Não junte as duas respostas para o documento ficar mais simples.",
          "firme",
        ),
      ],
      [
        "Preparar o relatório anônimo com Sura.",
        "Organizar depoimentos voluntários com Edrin.",
      ],
      [
        [
          n(
            `Sura confere se o conjunto permite reconhecer alguém por acidente. Ghork troca uma descrição específica por uma informação suficiente para sustentar o pedido. Edrin recebe uma cópia autorizada e mantém contato com quem deseja falar depois.`,
          ),
          d(
            "Sura",
            `Posso competir no seu time quando houver uma vaga. Cuidar não me impede de lutar. Só muda o que aceito fazer com a força.`,
            "firme",
          ),
        ],
        [
          n(
            `Edrin lê cada depoimento com seu autor antes da apresentação. Quem recusa exposição permanece fora da lista pública. Sura mantém os registros sob cuidado e encaminha o que pode ser compartilhado.`,
          ),
          d(
            "Edrin",
            `Quando formar o time, me procure. Quero entrar na arena com meu nome. Depois de tanto registro falando por mim, isso importa.`,
            "firme",
          ),
        ],
      ],
    ],
    [
      [
        n(
          `Na oficina, Durn aponta uma armação cedida legitimamente a um projeto coletivo. Korr vê peças que permitiriam produzir proteção acessível. Velka vê o último instrumento disponível para demonstrar uma técnica. O objeto não é de um deles, e não há uma cópia escondida esperando uma solução agradável.`,
        ),
        d(
          "Korr",
          `Estas articulações podem virar proteção para gente que só recebe equipamento gasto.`,
          "alegre",
        ),
        d(
          "Velka",
          `E montadas assim ensinam um movimento que não está num desenho. Desmontar também perde alguma coisa.`,
          "firme",
        ),
        n(
          `Durn pede que falem de frente e mostra os pontos de união. Ghork pode ajudar a desmontar com cuidado ou conservar e preparar a demonstração. As peças não servirão aos dois usos ao mesmo tempo.`,
        ),
      ],
      [
        n(
          `Korr demonstra uma proteção possível com outra peça da bancada. Não promete fabricar tudo naquele dia. Velka executa o movimento lentamente, permitindo que Ghork observe o ponto de apoio. O valor de ambos fica mais claro, e a escolha não fica mais fácil.`,
        ),
        d(
          "Durn",
          `Digam o que vamos fazer antes de soltar o primeiro pino. Depois, arrependimento não recoloca desgaste no lugar.`,
          "firme",
        ),
        d("Ghork", "Quem aprende a cuidar disso depois?", "investigativo"),
        d(
          "Korr",
          "Quem usar a proteção. Vou mostrar o encaixe até conseguirem trocar sozinhos.",
          "alegre",
        ),
        d(
          "Velka",
          "Meus aprendizes. Quero que possam ensinar sem depender de mim.",
          "atento",
        ),
      ],
      [
        "Desmontar para o projeto de proteção de Korr.",
        "Conservar para o ensino de Velka.",
      ],
      [
        [
          n(
            `Ghork ajuda a separar as peças e identificar limites de uso. Velka registra o que consegue antes da desmontagem, sem fingir que o registro substitui tudo.`,
          ),
          d(
            "Korr",
            `Se levar meu trabalho para a arena, eu quero ir junto. Sei como ele se move. E quero ver se quem nunca teve equipamento novo consegue ser visto.`,
            "alegre",
          ),
        ],
        [
          n(
            `Ghork ajuda a estabilizar a armação e preparar o espaço de demonstração. Korr recolhe o projeto de proteção e procura outra fonte de peças; a necessidade continua.`,
          ),
          d(
            "Velka",
            `Se me chamar para o time, eu vou competir. Uma técnica não permanece viva só porque alguém promete guardá-la.`,
            "firme",
          ),
        ],
      ],
    ],
    [
      [
        n(
          `A cisterna está perto de ficar pronta. O pagamento, não. Tessa quer suspender a entrega até que os salários sejam quitados. Mavren propõe concluir se o valor devido estiver depositado sob custódia verificável. Uma promessa do contratante não satisfaz o plano dele.`,
        ),
        d(
          "Tessa",
          `Depois que entregarmos, a pressão muda de lado. Quem está sem receber já esperou o bastante.`,
          "firme",
        ),
        d(
          "Mavren",
          `E parar também custa aos nossos. Quero ver o dinheiro fora da mão de quem deve antes de abrir a obra.`,
          "preocupado",
        ),
        d(
          "Tessa",
          "Precisamos conferir as condições com quem trabalhou. Depois quero saber qual compromisso você vai sustentar.",
          "firme",
        ),
      ],
      [
        n(
          `Jorvi abre os registros no mercado. Há um depósito real reservado para os salários, com valores e destinatários conferíveis. Mavren pede que Ghork verifique a condição de liberação. Tessa aponta que uma garantia ainda não é dinheiro na mão de quem trabalhou.`,
        ),
        n(
          "Os trabalhadores se dividem. Alguns querem receber antes da entrega; outros preferem concluir com o depósito sob custódia. Ghork anota as posições.",
        ),
        n(
          `Ghork confere uma divergência pequena no registro de um turno. Jorvi a corrige antes de fechar a lista. A decisão agora pode se apoiar num valor verificado, não na esperança de que ninguém reclame depois.`,
        ),
      ],
      [
        "Apoiar Tessa e reter a entrega até a quitação.",
        "Verificar a custódia e concluir com Mavren.",
      ],
      [
        [
          n(
            `A entrega fica suspensa. Ghork ajuda a comunicar a condição e a organizar a manutenção necessária enquanto aguardam a quitação. Mavren aceita que a posição prevaleceu, mas mantém sua crítica ao custo da espera.`,
          ),
          d(
            "Tessa",
            `Se eu entrar no seu time, levo essa escolha comigo. Quero que lembrem quem constrói o lugar onde todo mundo se reúne.`,
            "firme",
          ),
        ],
        [
          n(
            `Ghork confere o depósito e a liberação vinculada à entrega antes de respaldar a conclusão. Jorvi apresenta o registro aos trabalhadores. Tessa reconhece a garantia real e mantém sua discordância com entregar antes da quitação direta.`,
          ),
          d(
            "Mavren",
            `Se formarmos um time, quero competir como alguém capaz de sustentar um acordo. Não como quem aceitou qualquer promessa para acabar logo.`,
            "firme",
          ),
        ],
      ],
    ],
    [
      [
        n(
          `Rask tem uma única vaga de exibição antes das eliminatórias. Odrik quer arrecadar para a enfermaria com um espetáculo. Lethra quer dar autoria e visibilidade aos aprendizes numa demonstração. O espaço não comporta as duas montagens no tempo concedido.`,
        ),
        d(
          "Odrik",
          `Se o público rir e abrir a bolsa, os panos chegam do mesmo jeito.`,
          "ironico",
        ),
        d(
          "Lethra",
          `Quero que saibam quem aprendeu. Meus alunos já apareceram atrás de gente famosa o bastante.`,
          "firme",
        ),
        n(
          `Ghork acabou de conquistar a classificação. É fácil esquecer quem ainda procura o primeiro anúncio com o próprio nome. Rask pede uma proposta pronta, não um acordo que empurre o atraso para a próxima equipe.`,
        ),
      ],
      [
        n(
          `Odrik ensaia uma entrada e interrompe a própria piada quando percebe que usaria um ferido como motivo de riso. Lethra muda a ordem da demonstração para que um aprendiz possa explicar o que executará. Ghork vê cuidado nos dois formatos.`,
        ),
        d(
          "Ghork",
          "Não dá para encurtar as duas apresentações?",
          "investigativo",
        ),
        d(
          "Rask",
          "Ainda preciso do tempo de montagem. Uma entra hoje. A outra vai precisar de outra data.",
          "firme",
        ),
      ],
      [
        "Preparar o espetáculo beneficente de Odrik.",
        "Preparar a demonstração dos alunos de Lethra.",
      ],
      [
        [
          n(
            `Odrik organiza a arrecadação com destino informado e uma apresentação que ri de si, não dos pacientes. Lethra recolhe os materiais e promete procurar outro espaço para seus alunos.`,
          ),
          d(
            "Odrik",
            `Posso fazer graça e lutar bem. Se me chamar para seu time, pretendo provar as duas coisas.`,
            "alegre",
          ),
        ],
        [
          n(
            `Lethra divide a fala entre os aprendizes e os deixa mostrar a correção de um movimento, não apenas o acerto final. Odrik procura outra ocasião para arrecadar.`,
          ),
          d(
            "Lethra",
            `Se houver lugar no seu time, quero disputar. Meus alunos precisam ver que ensinar não é sair do campo.`,
            "alegre",
          ),
        ],
      ],
    ],
  ];
  recruitTexts.forEach((r, i) => {
    const pages = [p(r[0]), p(r[1])];
    if (pairs[i].long)
      pages.push(
        p(
          i === 1
            ? [
                n(
                  `Ghork volta aos registros antes de escolher. Uma assinatura falta porque a pessoa ainda não decidiu. Ele deixa o espaço vazio. Edrin não pressiona; Sura não presume recusa. Esperar uma resposta também faz parte de respeitar alguém.`,
                ),
                d(
                  "Seldan",
                  "Recebo e preservo os documentos. Só não posso declarar culpa com o que ainda está em discussão.",
                  "atento",
                ),
                d(
                  "Edrin",
                  "Então registre também o que falta confirmar.",
                  "firme",
                ),
              ]
            : [
                n(
                  `Na cisterna, Tessa reúne quem trabalhou para explicar as duas condições. Mavren leva a prova do depósito. Ghork lê os nomes e turnos corrigidos em voz alta, permitindo que cada pessoa confirme a própria parte.`,
                ),
                n(
                  "Depois da leitura, algumas pessoas mantêm a mão levantada pela suspensão; outras defendem a entrega. A conferência dos valores não encerrou a discordância.",
                ),
              ],
        ),
      );
    pages.push(
      p(
        [n("A conferência terminou. Os dois aguardam a resposta de Ghork.")],
        r[2].map((label, j) =>
          c(label, r[3][j], { [`R${i + 1}`]: j === 0 ? "A" : "B" }),
        ),
      ),
    );
    q(`R${i + 1}`, pairs[i].title, pairs[i].place, pages, "recruit", {
      index: i,
    });
  });

  q(
    "side1",
    "Uma mesa para quem chega",
    "Estalagem de Nyra",
    [
      p(
        [
          n(
            "Nyra precisa preparar uma mesa para quem chegará depois do serviço. Puxa uma cadeira para Ghork.",
          ),
          d(
            "Nyra",
            "Sente aqui e confira as porções. Se sobrar alguém na lista, me avise antes de eu fechar a panela.",
            "atento",
          ),
          n(
            `Um nome aparece duas vezes. Ele pergunta antes de riscar. São duas pessoas diferentes que deixaram o mesmo apelido. Nyra ri e pede que acrescente uma informação com a qual ambas concordem.`,
          ),
          t(
            "Ghork",
            "Ninguém perguntou pela Prova de Fogo. Só querem saber se o prato está separado.",
            "reflexivo",
          ),
        ],
        [
          c("Separar as porções e deixar os recados claros.", [
            n(
              `Nyra confere o trabalho e oferece companhia à mesa quando ele terminar. Ghork aceita sem transformar a refeição numa dívida que precise pagar com uma façanha.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir que os recém-chegados ajudem a conferir.", [
            n(
              `A conferência vira conversa. Um trabalhador corrige o horário e outro oferece trazer a tigela que falta. Nyra agradece a tarefa concluída; não ganhou empregados para sempre.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
        ],
      ),
    ],
    "side",
    { arc: 1 },
  );
  q(
    "side2",
    "A peça devolvida",
    "Oficina de Durn",
    [
      p(
        [
          n(
            `Durn recebeu de volta uma peça que teria falhado num treino. Pede a Ghork que descreva o movimento olhando para ele, não para a bancada. O relato inicial culpa o metal; a demonstração mostra que a carga foi aplicada num ponto diferente do previsto.`,
          ),
          d(
            "Durn",
            "A carga veio aqui. O pino foi feito para receber deste lado.",
            "investigativo",
          ),
          d("Ghork", "Isso estava explicado quando entregou?", "investigativo"),
          d(
            "Durn",
            "Não estava claro. Vamos mostrar antes de devolver.",
            "firme",
          ),
        ],
        [
          c("Mostrar primeiro o uso correto e depois o limite.", [
            n(
              `A pessoa que trouxe a peça consegue repetir a explicação. Durn anota a alteração na entrega. Ghork reconhece o valor de uma correção que não precisa humilhar ninguém para ser lembrada.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
          c("Pedir ao usuário que explique onde se confundiu.", [
            n(
              `A dúvida estava numa instrução que parecia clara apenas para quem fabricou a peça. Durn reescreve o aviso e agradece a explicação. Ghork deixa a oficina com uma história pequena que sabe contar até o fim.`,
            ),
            n(
              "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
              { era: "present", background: "bg-coreto" },
            ),
          ]),
        ],
      ),
    ],
    "side",
    { arc: 2 },
  );
  q(
    "side3",
    "Uma passagem para o público",
    "Coliseu",
    [
      p(
        [
          n(
            `Antes das eliminatórias, Seldan confere o acesso do público. Uma pilha de materiais está dentro da área de circulação. Tem autorização de entrega, mas não de permanência. Jorvi espera alguém decidir quem a moverá.`,
          ),
          d(
            "Jorvi",
            "Confiro os volumes. Se você conferir o destino, conseguimos tirar tudo antes da abertura.",
            "atento",
          ),
          d(
            "Seldan",
            "Deixei para o próximo turno. Vou assinar a remoção agora.",
            "preocupado",
          ),
        ],
        [
          c(
            "Acompanhar a retirada até liberar a passagem.",
            [
              n(
                "Jorvi confere os volumes. Seldan percorre o acesso desocupado e guarda a ordem de remoção.",
              ),
              n(
                "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
                { era: "present", background: "bg-coreto" },
              ),
            ],
            { passage: true },
          ),
          c(
            "Dividir a conferência com Jorvi e cobrar o registro.",
            [
              n(
                `Ghork confere o destino; Jorvi, a quantidade. Seldan registra quem autorizou a retirada. A tarefa termina sem depender de um favor escondido.`,
              ),
              n(
                "No Coreto, três Ludos caem na sua mão. Rheed espera que você os guarde antes de continuar.",
                { era: "present", background: "bg-coreto" },
              ),
            ],
            { passage: true },
          ),
        ],
      ),
    ],
    "side",
    { arc: 3 },
  );

  q("potionVisit", "Uma medida pequena", "Boticário", [
    p(
      [
        n(
          `Savel reconhece Ghork e não começa perguntando se trouxe dinheiro. Pergunta se continua cansado. O cansaço é real; a oferta parece encontrar exatamente o lugar onde a ambição esbarra no corpo.`,
        ),
        d(
          "Savel",
          `Não estou oferecendo coragem. Disso você já tem. Estou oferecendo ajuda para sustentá-la.`,
        ),
        d(
          "Savel",
          "Esta amostra é por minha conta. Se ajudar, conversamos sobre as próximas preparações.",
          "atento",
        ),
        n("O frasco permanece aberto sobre o balcão. Ghork ainda não o tocou."),
      ],
      [
        c(
          "Recusar a amostra.",
          [
            d("Ghork", `Vou conversar com quem acompanha minha recuperação.`),
            d("Savel", `Naturalmente.`),
            n(
              `O boticário recolhe o frasco. Sua expressão não permite saber se aprovou a prudência ou apenas aprendeu como abordar Ghork outra vez.`,
            ),
          ],
          { sample: "refused" },
        ),
        c(
          "Experimentar a amostra oferecida.",
          [
            n(
              `O calor vem antes de qualquer sensação de força. Ghork fica inquieto e, mais tarde, percebe o mal-estar quando o efeito passa. Procura atendimento e conta o que tomou. No treino, a inquietação só atrapalha sua concentração.`,
            ),
            n(
              "Nos dias seguintes, Ghork observa quem volta à loja. Reconhece a inquietação de alguns clientes, mas ainda não sabe o que Savel lhes vendeu.",
            ),
          ],
          { sample: "taken" },
        ),
        c(
          "Perguntar por quem volta querendo outra dose.",
          [
            n(
              `Savel fala de corpos diferentes e acompanhamento. Ghork insiste em perguntar o que os clientes sentem quando param. A resposta se alonga e fica menos precisa.`,
            ),
            n(
              "Ghork deixa o frasco sobre o balcão e sai. A pergunta continua sem resposta.",
            ),
          ],
          { sample: "questioned" },
        ),
      ],
    ),
  ]);

  q("gate", "Antes da primeira eliminatória", "Coliseu", [
    p(
      [
        n(
          `Rask recebe Ghork diante da lista de inscrições. Ainda há vozes vindo da cidade, convites possíveis e trabalhos que podem esperar pela sua resposta. O organizador não começa a chamada enquanto ele confere o time.`,
        ),
        d(
          "Rask",
          `Depois que confirmar, os recrutamentos fecham. Você pode competir sozinho. Pode vir com quem aceitou acompanhá-lo. Mas não vou acrescentar um nome entre duas eliminatórias.`,
        ),
        n("Ghork confere a lista uma última vez. Rask mantém a pena suspensa."),
      ],
      [
        c(
          "Confirmar o time e iniciar as eliminatórias.",
          [
            n(
              "Rask registra os nomes e fecha a lista. Da arena vem a primeira chamada.",
            ),
          ],
          { gateConfirmed: true },
        ),
      ],
    ),
  ]);

  for (let i = 0; i < 2; i++)
    q(
      `fight${i}`,
      i === 0 ? "A primeira bandeira rival" : "A outra dívida de gratidão",
      "Coliseu",
      [
        p(
          (s) => {
            const g = rivalGuilds(s)[i],
              m = guilds[g].mentor;
            return [
              n(
                `A equipe da ${guilds[g].name} entra antes de Ghork. ${m} acompanha os representantes até a passagem para a arena.`,
              ),
              d(
                m,
                `${g === "A" ? "O atendimento continuou. A equipe de campo teve de esperar. Hoje quero que vejam o que conseguimos fazer mesmo sem aquele contrato." : g === "B" ? "Encontramos outro trabalho. Mais apertado, mas nosso. Não vim pedir que você devolva a escolha. Vim disputar o resultado." : "A escola continuou formando gente. Você escolheu outro método. Agora terá de enfrentar quem trabalha com o nosso."}`,
              ),
              n(
                `Ghork lembra da ajuda que recebeu. ${s.flags.guildSpeech === "respect" ? "Sua explicação respeitosa na seleção não é tratada como insulto. Ainda assim, a liderança mantém a oposição institucional." : "A defesa firme de seu método reaparece na cobrança. O rival quer que a comparação seja sustentada também diante do público."}`,
              ),
              n(
                "Rask chama as equipes para suas posições. O contrato ficou para trás; a vaga na próxima partida está em disputa.",
              ),
            ];
          },
          [
            c(
              "Agradecer a ajuda e assumir a disputa.",
              [
                d("Ghork", `Eu me lembro. E vou tentar vencer vocês.`),
                n("O adversário reconhece o cumprimento e toma posição."),
              ],
              { [`rival${i}`]: "thanks" },
            ),
            c(
              "Responder que seu compromisso continua sendo válido.",
              [
                n(
                  `Ghork explica que sustenta o trabalho que escolheu. A liderança discorda de parte da justificativa, mas não há outro contrato sobre a mesa. Chega a hora de competir.`,
                ),
              ],
              { [`rival${i}`]: "firm" },
            ),
            c(
              "Pedir a Rheed que recupere um detalhe do primeiro encontro.",
              [
                d(
                  "Rheed",
                  "Antes de olhar a outra bandeira, ele lembrou como tinha conhecido aquela pessoa. Certas lembranças duram mais que uma assinatura.",
                  "reflexivo",
                ),
                d(
                  "Ghork",
                  "Eu não esqueci o que você fez por mim. Hoje vou tentar vencer sua equipe.",
                  "firme",
                ),
              ],
              { [`rival${i}`]: "memory" },
              1,
            ),
          ],
        ),
      ],
      "fight",
      { index: i },
    );
  q(
    "fight2",
    "O método do outro lado",
    "Coliseu",
    [
      p(
        (s) => [
          n(
            `${otherRoute(s)} chega com uma equipe apoiada por ${sponsor(s)}. O novo apoio não substitui as duas partidas anteriores: as guildas podem inscrever mais de um time. O preterido construiu uma trajetória própria desde a reunião do contrato.`,
          ),
          d(otherRoute(s), `${heard(s)}`),
          n(
            `Ghork observa a preparação. ${s.xy === "X" ? "Zagra organiza carga e movimento com limites que seus companheiros conhecem. Não veio provar que cuidado é inútil; veio mostrar que sua equipe não é descartável." : "Darvek confere os apoios e encerra a verificação a tempo da chamada. Não veio provar que todo risco deve ser recusado; veio mostrar que cautela também pode avançar."}`,
          ),
          n("Rask espera o fim da conversa para fazer a chamada."),
        ],
        [
          c(
            "Reconhecer o trabalho e manter a escolha anterior.",
            [
              d(
                "Ghork",
                `Estou vendo o que vocês construíram. Continuo respondendo pelo que escolhi.`,
              ),
              n(
                "O cumprimento é devolvido. Do outro lado, a equipe termina de se preparar.",
              ),
            ],
            { xyReturn: "respect" },
          ),
          c(
            "Esclarecer o que quis dizer na reunião.",
            [
              d(
                "Ghork",
                "Não quis dizer que seu trabalho era ruim. Eu precisava escolher uma margem para aquela entrada.",
                "firme",
              ),
              n(
                "A conversa esclarece uma parte da cobrança. A discordância permanece quando chega a chamada.",
              ),
            ],
            { xyReturn: "explain" },
          ),
        ],
      ),
    ],
    "fight",
    { index: 2 },
  );
  const semifinalVoices = {
    Brakka: [
      "Brakka. Quando acabar, me conta como veio parar aqui. Agora eu vou tentar te derrubar.",
      "Você abriu espaço para o nosso treino. Hoje vai ver o que saiu de lá, parceiro.",
      "Achei outro horário para o pessoal treinar. Foi apertado, mas chegamos. Vamos?",
    ],
    Nima: [
      "Sou Nima. Temos tempo para conversar depois da partida.",
      "O despacho continua funcionando. Hoje minha entrega é aqui na arena.",
      "Consegui reorganizar as saídas. Agora quero ver como você se sai sem uma lista na mão.",
    ],
    Sura: [
      "Sura. Se precisar interromper, diga. Eu também vou dizer.",
      "Você cuidou daqueles nomes comigo. Posso agradecer e ainda querer ganhar esta luta.",
      "Edrin fez um bom trabalho. Eu continuei com os registros e com meu treino.",
    ],
    Edrin: [
      "Edrin. Parece que vamos nos conhecer pela disputa.",
      "Os depoimentos foram ouvidos. Eu queria que soubesse disso antes da chamada.",
      "O relatório de Sura ajudou. Ainda tenho testemunhos a ouvir. Hoje, porém, vim competir.",
    ],
    Korr: [
      "Korr. Repare no apoio quando eu girar. Ou melhor: repare depois da luta.",
      "Aquelas peças já estão em uso. Quero que veja como aguentam uma partida.",
      "Velka conservou bem a armação. Achei outras peças. Deram trabalho, mas estão aqui.",
    ],
    Velka: [
      "Velka. Teremos tempo para apresentações depois do primeiro movimento.",
      "Os aprendizes já usam a armação. Hoje verão a técnica em disputa.",
      "Registrei o que pude antes da desmontagem. Ainda tenho o movimento para mostrar.",
    ],
    Tessa: [
      "Tessa. Tem bastante gente torcendo por nós lá fora. Quero dar uma boa luta.",
      "Você sustentou nossa decisão na cisterna. Eu lembro. Agora sustento este time.",
      "Continuo preferindo receber antes de entregar. Podemos discordar e fazer uma boa partida.",
    ],
    Mavren: [
      "Mavren. Vamos ver se a preparação aguenta a entrega.",
      "A garantia foi cumprida. Hoje tenho outro acordo para sustentar, com este time.",
      "A cisterna esperou. Meu time não vai esperar que eu termine aquela discussão para lutar.",
    ],
    Odrik: [
      "Odrik. Pode sorrir: a entrada é minha, mas a queda ainda está em disputa.",
      "Os panos chegaram à enfermaria. Agora falta convencer a arquibancada de que também sei lutar.",
      "Os alunos de Lethra foram bem. Guardei minha entrada para hoje. Espero que você repare.",
    ],
    Lethra: [
      "Lethra. Meus alunos estão assistindo. Vou tentar dar trabalho a você.",
      "Eles tiveram o nome anunciado. Obrigada por isso. Agora quero que vejam minha luta.",
      "O benefício ajudou a enfermaria. Meus alunos terão outra ocasião. Hoje vão me ver competir.",
    ],
  };
  q(
    "fight3",
    "Cinco nomes na outra lista",
    "Coliseu",
    [
      p(
        (s) => [
          n(
            `Rask anuncia os cinco adversários da semifinal: ${s.opponents.join(", ")}. Ghork procura rostos que reconhece. ${s.recruits.some((r) => r.invited) ? "Nenhum dos seus aliados está entre eles. Cada convite deixou outra pessoa livre para construir uma equipe diferente." : "Não ter formado um grupo não apagou as pessoas que conheceu. Algumas estarão do outro lado; outras ainda são desconhecidas."}`,
          ),
          ...s.opponents.map((name, i) => {
            const r = s.recruits[i];
            return d(
              name,
              semifinalVoices[name][!r.outcome ? 0 : r.name === name ? 1 : 2],
              "firme",
            );
          }),
          n(
            "Ghork reconhece alguns sorrisos. Outros adversários já olham para a arena.",
          ),
        ],
        [
          c(
            "Desejar uma boa luta, sem pedir aprovação.",
            [
              d("Ghork", `Quero vencer. Espero que vocês também.`),
              n(
                "Alguém do outro lado sorri. Ghork toma posição antes que Rask precise chamá-lo outra vez.",
              ),
            ],
            { semi: "steady" },
          ),
          c(
            "Responder aos conhecidos antes da chamada.",
            [
              n(
                `Ghork menciona os trabalhos que realmente acompanhou e se apresenta a quem ainda não conhece. Não reivindica intimidade com todo mundo. Rask precisa chamá-los de novo; dessa vez, o atraso tem um motivo pelo qual ninguém parece ofendido.`,
              ),
            ],
            { semi: "talk" },
          ),
        ],
      ),
    ],
    "fight",
    { index: 3 },
  );
  q("uv", "Antes de ouvir seu nome", "Coliseu", [
    p(
      (s) => [
        n(
          `Há alguns minutos antes da final. ${mentor(s)} quer conversar em particular. Perto da entrada, algumas pessoas esperam ouvir Ghork sobre a disputa com Torvak. Ele não conseguirá atender às duas conversas antes da chamada.`,
        ),
        n(
          `Já venceu gente que lhe ajudou, gente que discordou de seu trabalho e pessoas que continuam amigas. Agora enfrentará um antigo companheiro de Orcquius. O peso desse passado ainda existe. Não precisa carregar sozinho o significado da luta.`,
        ),
      ],
      [
        c(
          "U — Conversar reservadamente com o mentor.",
          (s) => [
            n(
              `${mentor(s)} fala da preparação e do que a vitória representaria para a guilda. Ghork agradece e estabelece um limite: não pode entrar para provar que o mentor estava certo sobre tudo.`,
            ),
            d(
              "Ghork",
              `Quero esse título. Quero vencer o que ele fez conosco. Mas a minha vida não pode depender de conseguir uma resposta perfeita para vocês.`,
              "vulneravel",
            ),
            n(
              `A conversa termina com apoio e alguma discordância. Ele consegue ir para a arena mesmo assim.`,
            ),
          ],
          { uv: "U" },
        ),
        c(
          "V — Responder publicamente às expectativas.",
          [
            n(
              `Ghork fala do trabalho, do cancelamento dos horários e das pessoas com quem chegou até ali. Não promete que sua vitória consertará a cidade inteira. Alguém pergunta se quer mandar um recado a Daratrine.`,
            ),
            d(
              "Ghork",
              `Quero ganhar esta luta. Quem estiver ouvindo de longe pode decidir o que acha depois.`,
              "firme",
            ),
            n(
              `Há aplausos e gente que continua torcendo por Torvak. Ghork consegue terminar a fala sem tentar conquistar os dois grupos.`,
            ),
          ],
          { uv: "V" },
        ),
      ],
    ),
  ]);
  q(
    "fight4",
    "O campeão diante de Ghork",
    "Coliseu",
    [
      p(
        (s) => [
          n(
            `Torvak recebe a chamada com a familiaridade de quem já ouviu o próprio nome tomar uma arquibancada. Seus feitos foram reais antes das doses. Seu medo de perder também é real agora. Ele estudou o modo como Ghork luta e não entrou para oferecer uma lição com derrota combinada.`,
          ),
          d(
            "Torvak",
            `Seus mentores ensinaram você a falar de justiça. Quero ver o que consegue fazer aqui.`,
            "hostil",
          ),
          d(
            "Ghork",
            `Eles também tiveram de reorganizar o trabalho depois que você tirou nossos horários.`,
          ),
          n(
            "Torvak aponta a arquibancada e repete que sua guilda conquistou a prioridade. Ghork deixa que termine. Já ouviu a justificativa antes.",
          ),
          t(
            "Ghork",
            s.flags.uv === "U"
              ? "Eu disse ao meu mentor o que precisava dizer. Agora é a luta."
              : "O público já ouviu minha resposta. Não preciso prometer mais nada.",
            "firme",
          ),
          n(
            `Torvak conheceu Orcquius. Isso não o autoriza a falar pelo general. Ghork deseja a vitória por tudo que trouxe e por tudo que viveu desde que chegou.`,
          ),
        ],
        [
          c(
            "Reconhecer os feitos de Torvak e contestar o privilégio.",
            [
              d(
                "Ghork",
                `Sei que você trouxe gente de volta. Isso não lhe dá o direito de fechar o caminho de quem vem depois.`,
              ),
              n(
                `Torvak se prepara. A resposta agora será uma luta de verdade.`,
              ),
            ],
            { finalSpeech: "recognize" },
          ),
          c(
            "Dizer que não precisa de sua aprovação.",
            [
              d(
                "Ghork",
                `Você pode continuar achando que eu não devia estar aqui. Eu vou competir mesmo assim.`,
                "firme",
              ),
              n(
                "Ghork ainda espera uma reação. Torvak apenas se prepara. Desta vez, ele não tenta outra frase.",
              ),
            ],
            { finalSpeech: "autonomy" },
          ),
        ],
      ),
    ],
    "fight",
    { index: 4 },
  );
  q("celebration", "O título tem o seu nome", "Coliseu", [
    p(
      (s) => [
        n(
          `Rask anuncia a vitória de Ghork. Desta vez, ele não precisa imaginar como seria ouvir seu nome. O som chega inteiro. ${team(s).length ? `${team(s).join(", ")} comemoram com ele. Cada pessoa trouxe uma razão própria para estar ali.` : "Ele olha para o espaço em que lutou sozinho e depois para as pessoas que acompanharam seu caminho. A ausência de recrutados não torna a conquista vazia."}`,
        ),
        n(
          `${mentor(s)} reconhece a vitória. Há gente que festeja, gente que respeita o resultado e gente que preferia outro campeão. Ghork percebe as três reações sem perder a alegria.`,
        ),
        n(
          "Torvak sai da arena. O anúncio de Rask ainda ecoa quando os torcedores cercam Ghork.",
        ),
      ],
      [
        c(
          "Celebrar com quem está perto.",
          [
            n(
              `Ghork permite que a comemoração dure. Lembra do banco da enfermaria, dos cestos, das primeiras entregas. Nada disso parecia o caminho para aquele anúncio enquanto acontecia.`,
            ),
            n(
              "A comemoração continua. Ghork deixa que continuem chamando seu nome.",
            ),
          ],
          { celebrate: "people" },
        ),
        c(
          "Guardar um instante para acreditar no resultado.",
          [
            n("Ghork passa o dedo sobre o próprio nome no registro."),
            t(
              "Ghork",
              "Ganhei. Não preciso contar melhor para ter acontecido.",
              "alegre",
            ),
            n("Só então se junta à comemoração."),
          ],
          { celebrate: "quiet" },
        ),
      ],
    ),
  ]);
  q("invasion", "A celebração interrompida", "Coliseu", [
    p((s) => [
      n(
        `O primeiro acesso fecha enquanto ainda há gente comemorando. Depois outro. Homens entram pelas áreas de serviço entre carregamentos que vinham sendo preparados antes da final. A derrota de Torvak mudou o papel que esperavam dele; não provocou o ataque.`,
      ),
      d(
        "Dorga",
        "Fechem os acessos. Os financiadores vão ouvir nossas condições antes de sair.",
        "hostil",
      ),
      n(
        "Torvak vê os invasores arrastarem feridos e espectadores até os carregamentos. Avança para barrar a passagem.",
      ),
      n(
        `Savel já não fala como um vendedor paciente. Usa o nome Neral e condiciona a próxima distribuição de doses à obediência.`,
      ),
      d(
        "Neral",
        `Querem continuar de pé? Então façam o que foi combinado.`,
        "hostil",
      ),
      d("Torvak", "Tomar a arena, você disse. Solte essas pessoas.", "hostil"),
      d("Neral", "Sua próxima dose depende de cumprir o acordo.", "hostil"),
      d("Torvak", "Então fique com ela.", "firme"),
      n("A mão dele treme quando se volta contra os invasores."),
    ]),
    p(
      (s) => [
        n(
          `Virmura organiza o atendimento. Borun mantém uma passagem livre. Sevrak conduz aprendizes e remove obstáculos. As guildas continuam rivais, mas têm pessoas para retirar. Cada um mantém sua equipe no trabalho de retirada.`,
        ),
        n(
          `${s.flags.passage ? "Seldan usa a passagem que Ghork ajudou a liberar. O trabalho anterior torna a retirada mais organizada naquele ponto." : "Seldan e Jorvi precisam desobstruir uma passagem enquanto o público recua. A retirada demora mais naquele ponto, sem bloquear o caminho de Ghork."}`,
        ),
        n(
          `Torvak enfrenta invasores para libertar capturados. Está debilitado. Nyra recebe gente fora da área tomada; Pirka organiza transporte local. Ghork pode alcançar Neral porque essas pessoas sustentam o resto da evacuação.`,
        ),
      ],
      [
        c(
          "Confiar as saídas aos mentores e seguir para Neral.",
          [
            d("Ghork", "Borun, esta saída fica com vocês?", "preocupado"),
            d("Borun", "Fica. Siga pela área de serviço.", "firme"),
            d("Ghork", "Virmura, há feridos junto da carga!", "preocupado"),
            d("Virmura", "Eu os vi. Vá.", "firme"),
          ],
          { rescue: "trust" },
        ),
        c(
          "Ajudar a soltar os últimos capturados no caminho.",
          [
            n(
              "Ghork solta uma amarra enquanto Torvak contém os invasores próximos.",
            ),
            d(
              "Torvak",
              "Ele foi pela área de serviço. Ainda dá para alcançar.",
              "exausto",
            ),
          ],
          { rescue: "help" },
        ),
      ],
    ),
  ]);
  q(
    "fight5",
    "A última dose do fornecedor",
    "Coliseu",
    [
      p(
        (s) => [
          n(
            `Neral recua para junto dos carregamentos. A proteção ritual marca o chão ao seu redor. Usa magia sanguínea para ferir e afastar quem se aproxima. Não é o comandante de todos os Ignotos; é o responsável por esta operação, preparado para transformar dependência em domínio.`,
          ),
          d(
            "Neral",
            `Se me destruir, quem vai dar a eles o que precisam?`,
            "hostil",
          ),
          n(
            `${s.flags.sample === "taken" ? "Ghork lembra do mal-estar depois da amostra. A lembrança não prova tudo sobre os outros consumidores, mas impede que trate a necessidade deles como fingimento." : "Ghork lembra dos tremores de Torvak e das respostas incompletas do vendedor. A necessidade dos consumidores não desaparece porque a ameaça foi revelada."}`,
          ),
          d(
            "Ghork",
            `Eles vão precisar de cuidado. Não de cativeiro.`,
            "firme",
          ),
          n(
            `Pressionado pelo fracasso da operação, Neral consome concentrados que antes evitava usar em si. Confia que seu conhecimento permitirá controlar a mudança. O corpo se deforma, a força aumenta e os gestos mágicos perdem precisão. Neral avança antes que Ghork consiga recuperar a distância. Ainda precisa ser vencido.`,
          ),
          d("Neral", "Ainda posso sustentar isto. Afaste-se.", "hostil", {
            pose: "transformado",
          }),
        ],
        [
          c(
            "Enfrentá-lo e abrir caminho para os capturados.",
            [
              t(
                "Ghork",
                "As pessoas estão tentando sair. Preciso abrir essa passagem.",
                "firme",
              ),
            ],
            { last: "free" },
          ),
          c(
            "Recusar a chantagem sem negar a dependência.",
            [
              d(
                "Ghork",
                `Você fez a ferida parecer uma dívida. Eles não lhe devem a liberdade.`,
                "firme",
              ),
              n(
                `A proteção de Neral resiste. Ghork prepara o ataque com os meios que tem, acompanhado pelos aliados que recrutou ou sozinho.`,
              ),
            ],
            { last: "refuse" },
          ),
        ],
      ),
    ],
    "fight",
    { index: 5 },
  );

  const victories = [
    [
      n(
        "Rask encerra a primeira eliminatória. A equipe adversária se recolhe; Ghork recebe um cumprimento breve antes de deixar a arena.",
      ),
    ],
    [
      n(
        "A segunda bandeira rival deixa a disputa. Ghork olha para a liderança que conheceu antes do contrato. Faz um sinal de agradecimento e segue para a próxima partida.",
      ),
    ],
    [
      n(
        "A equipe preterida encerra sua participação. Seu representante cumprimenta Ghork e volta para junto dos companheiros. O nome de Ghork avança no quadro.",
      ),
    ],
    [
      n(
        "A semifinal termina. Um adversário oferece a mão; outro sai sem conversar. Ghork devolve o cumprimento e deixa livre o caminho de quem quer ficar sozinho.",
      ),
    ],
    [
      n(
        "Torvak tenta recuperar a posição. Ghork mantém a vantagem até o sinal de Rask. O confronto terminou.",
      ),
      d("Rask", "Ghork vence a final! Terminus tem um novo campeão!", "alegre"),
    ],
    [
      n(
        "A proteção ritual cede. Neral tenta se erguer e falha. Ainda fala de outros núcleos e de uma ligação com o Conselho de Daratrine antes de morrer.",
      ),
      n(
        "Entre os carregamentos, registros e correspondência confirmam uma ligação com o Conselho, mas não identificam infiltrados. Ghork recolhe os documentos. O selo permanece intacto.",
      ),
      n(
        "Os últimos capturados deixam a área de serviço. A operação local foi desmantelada; o atendimento aos feridos continua.",
      ),
    ],
  ];
  victories.forEach((text, i) =>
    q(`after${i}`, "Depois da luta", "Coliseu", [p(text)], "victory", {
      index: i,
    }),
  );
  q(
    "ending",
    "Uma vitória que cabe na verdade",
    "Coreto da Noite da História",
    [
      p((s) => [
        n(
          `Terminus amanhece com trabalho por fazer. O ataque foi repelido, os capturados estão livres e a operação de Neral foi desmantelada. A dependência dos consumidores continua exigindo cuidado.`,
        ),
        n(
          "Torvak sobrevive. Ainda debilitado, admite diante de Rask que exigiu o cancelamento dos horários e aceitou participar da tomada da arena.",
        ),
        d(
          "Torvak",
          "Eu concordei com o golpe. Quando vi as capturas, tentei impedir. Foi assim que aconteceu.",
          "exausto",
        ),
        n(
          "Rask registra a declaração. A evacuação ajudou a salvar pessoas; a apuração do golpe continua.",
        ),
        n(
          `${mentor(s)} encontra Ghork entre o atendimento e a reorganização. Há orgulho na vitória e exaustão no corpo. Não é necessário resolver todas as divergências antes de reconhecer que conseguiram proteger a cidade.`,
        ),
        n("Mais tarde, com o colar recarregado, Ghork procura Lala.", {
          background: "bg-virmura-enfermaria",
        }),
      ]),
      p(
        (s) => [
          d("Lala", "Você ganhou? Ghork, você ganhou mesmo!", "alegre"),
          d("Ghork", "Ganhei. Depois… aconteceu outra coisa.", "exausto"),
          n(
            "Ele conta o ataque e a correspondência encontrada. Lala escuta até o fim.",
          ),
          d(
            "Lala",
            "A peça ficou pronta. Vou mostrar outro dia. Você está quase dormindo sentado.",
            "preocupado",
          ),
          d(
            "Ghork",
            s.flags.lala2 === "listen"
              ? "É a peça que você refez três vezes? Quero ver como terminou. Só me dê um instante."
              : "Quero ver a peça antes de voltar a falar da loja. Só me dê um instante.",
            "exausto",
          ),
          d(
            "Lala",
            s.flags.dam === "help"
              ? "O Dam mandou dizer que a contribuição chegou. Ajudou com o reparo. Ele ainda está organizando o que falta."
              : "O Dam mudou o uso do quarto enquanto termina de juntar o necessário para o reparo. Pediu que você mande notícias quando puder.",
            "atento",
          ),
          d("Ghork", "Vou mandar. Diga que eu ouvi o recado.", "reflexivo"),
          d("Lala", `E agora?`, "investigativo"),
        ],
        [
          c(
            "Celebrar o que conquistou e dizer o que ainda não sabe.",
            [
              d(
                "Ghork",
                `Agora eu quero dormir. Depois quero continuar. Ainda não sei tudo que vou conseguir fazer.`,
                "exausto",
              ),
              n(
                `Lala ri da primeira resposta e aceita a segunda. Ele consegue falar do futuro sem transformá-lo numa promessa de salvar todos.`,
              ),
            ],
            { ending: "honest" },
          ),
          c(
            "Falar do próximo compromisso sem prometer resolver tudo.",
            [
              d(
                "Ghork",
                `Vou ajudar com o que ficou aqui. E vou contar o que descobrimos sobre Daratrine a quem puder agir com cuidado. Não sei quanto tempo leva.`,
              ),
              n(
                `Lala pede notícias. Ghork promete notícias. A promessa é menor que uma casa e, naquele momento, mais verdadeira.`,
              ),
            ],
            { ending: "commitment" },
          ),
        ],
      ),
      p((s) => [
        n(
          "O colar perde a luz. No Coreto, você volta a sentir a madeira sob as mãos. Rheed fecha o frasco e fica em silêncio.",
          { era: "present", background: "bg-coreto" },
        ),
        d("Criança", `Orcquius ficou sabendo?`),
        d(
          "Rheed",
          `Talvez um dia a história chegue até ele. Ghork não precisou esperar a resposta para saber o que tinha feito.`,
        ),
        n(
          s.recruits.filter((r) => r.invited).length
            ? `Você lembra os nomes que acompanharam Ghork: ${team(s).join(", ")}. As escolhas deram a cada encontro um peso diferente.`
            : "Você lembra os encontros de Ghork, mesmo sem ter convidado ninguém para o time. Ele lutou sozinho; não viveu sem relações.",
          { era: "present", background: "bg-coreto" },
        ),
        d(
          "Rheed",
          "Ele ainda fazia planos grandes. Mas naquela manhã conseguiu contar o que tinha feito sem prometer o resto da vida junto.",
          "reflexivo",
        ),
        d("Rheed", `Por hoje, ficamos aqui.`, "reflexivo"),
        n(
          "Rheed guarda o frasco. Perto de você, alguém se levanta devagar para não quebrar o silêncio.",
          { era: "present", background: "bg-coreto" },
        ),
      ]),
    ],
  );
  // Direção de cena: referências explícitas, sem dedução pelo texto exibido.
  const guildBackground = (s) =>
    ({ A: "bg-virmura-sede", B: "bg-borun-sede", C: "bg-sevrak-sede" })[
      s.guild
    ];
  const stage = (id, page, background) => {
    const entry = quests[id].pages[page];
    const authored = entry.body;
    const apply = (passages, state) =>
      passages.map((passage, i) =>
        i === 0
          ? {
              background:
                typeof background === "function"
                  ? background(state)
                  : background,
              ...passage,
            }
          : passage,
      );
    entry.body =
      typeof authored === "function" || typeof background === "function"
        ? (state) =>
            apply(
              typeof authored === "function" ? authored(state) : authored,
              state,
            )
        : apply(authored);
  };
  [
    ["intro", 0, "bg-coreto"],
    ["intro", 1, "bg-coreto"],
    ["intro", 2, "bg-virmura-enfermaria"],
    ["gA1", 0, "bg-virmura-enfermaria"],
    ["gA1", 1, "bg-virmura-enfermaria"],
    ["gB1", 0, "bg-mercado"],
    ["gB1", 1, "bg-mercado"],
    ["gC1", 0, "bg-coliseu-arena"],
    ["gC1", 1, "bg-coliseu-arena"],
    ["gA2", 0, "bg-virmura-enfermaria"],
    ["gA2", 1, "bg-virmura-enfermaria"],
    ["gA3", 0, "bg-contratos"],
    ["gA3", 1, "bg-virmura-enfermaria"],
    ["gA4", 0, "bg-virmura-sede"],
    ["gA4", 1, "bg-virmura-sede"],
    ["gB2", 0, "bg-borun-sede"],
    ["gB2", 1, "bg-borun-sede"],
    ["gB3", 0, "bg-contratos"],
    ["gB3", 1, "bg-contratos"],
    ["gB4", 0, "bg-borun-sede"],
    ["gB4", 1, "bg-borun-sede"],
    ["gC2", 0, "bg-sevrak-sede"],
    ["gC2", 1, "bg-sevrak-sede"],
    ["gC3", 0, "bg-contratos"],
    ["gC3", 1, "bg-contratos"],
    ["gC4", 0, "bg-sevrak-sede"],
    ["gC4", 1, "bg-sevrak-sede"],
    ["champion", 0, "bg-virmura-enfermaria"],
    ["champion", 1, "bg-coliseu-entrada"],
    ["champion", 2, "bg-coliseu-entrada"],
    ["retaliation", 0, "bg-coliseu-entrada"],
    ["retaliation", 1, guildBackground],
    ["introX", 0, "bg-oficina"],
    ["introX", 1, "bg-oficina"],
    ["introY", 0, "bg-mercado"],
    ["introY", 1, "bg-mercado"],
    ["alliance", 0, "bg-contratos"],
    ["alliance", 1, "bg-contratos"],
    ["X1", 0, "bg-minas-entrada"],
    ["X1", 1, "bg-minas-entrada"],
    ["X2", 0, "bg-minas-subsolo"],
    ["X2", 1, "bg-contratos"],
    ["Y1", 0, "bg-minas-entrada"],
    ["Y1", 1, "bg-minas-entrada"],
    ["Y2", 0, "bg-minas-subsolo"],
    ["Y2", 1, "bg-contratos"],
    ["classify", 0, "bg-contratos"],
    ["classify", 1, guildBackground],
    ["classify", 2, "bg-treino"],
    ["classify", 3, "bg-coliseu-entrada"],
    ["classify", 4, "bg-coliseu-entrada"],
    ["side1", 0, "bg-estalagem-salao"],
    ["side2", 0, "bg-oficina"],
    ["side3", 0, "bg-coliseu-entrada"],
    ["potionVisit", 0, "bg-boticario"],
    ["gate", 0, "bg-coliseu-entrada"],
    ["uv", 0, "bg-coliseu-entrada"],
    ["celebration", 0, "bg-coliseu-arena"],
    ["invasion", 0, "bg-coliseu-arena"],
    ["invasion", 1, "bg-coliseu-servico"],
    ["ending", 0, "bg-virmura-enfermaria"],
    ["ending", 1, "bg-virmura-enfermaria"],
    ["ending", 2, "bg-coreto"],
  ].forEach(([id, page, background]) => stage(id, page, background));
  for (const g of ["A", "B", "C"])
    quests[`g${g}5`].pages.forEach((_, page) =>
      stage(`g${g}5`, page, "bg-contratos"),
    );
  [
    "bg-estalagem-patio",
    "bg-virmura-enfermaria",
    "bg-oficina",
    "bg-cisterna",
    "bg-coliseu-entrada",
  ].forEach((background, i) =>
    quests[`R${i + 1}`].pages.forEach((_, page) =>
      stage(
        `R${i + 1}`,
        page,
        i === 3 && page === 1 ? "bg-mercado" : background,
      ),
    ),
  );
  for (let i = 0; i < 6; i++) {
    stage(`fight${i}`, 0, i === 5 ? "bg-coliseu-servico" : "bg-coliseu-arena");
    stage(`after${i}`, 0, i === 5 ? "bg-coliseu-servico" : "bg-coliseu-arena");
  }
  quests.intro.pages[1].place = "Guilda de Virmura · enfermaria";
  quests.intro.pages[2].place = "Guilda de Virmura · enfermaria";
  quests.ending.pages[0].place = "Terminus · depois do ataque";
  quests.ending.pages[1].place = "Terminus · contato com Daratrine";
  root.TerminusContent = { quests, guilds, pairs, matrix };
  if (typeof module !== "undefined") module.exports = root.TerminusContent;
})(globalThis);
