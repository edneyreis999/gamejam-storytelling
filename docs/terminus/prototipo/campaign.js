/* Roteiro jogável v3. Cada etapa tem local, efeitos e identidade próprios. */
(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./supplementary.js")
      : root.TerminusContent;
  const script =
    typeof module !== "undefined"
      ? require("./quest-script.js")
      : root.TerminusQuestScript;
  const places = {
    estalagem: ["Estalagem de Nyra", "estalagem-salao"],
    mercado: ["Mercado de provisões", "mercado"],
    boticario: ["Boticário", "boticario"],
    contratos: ["Casa de contratos e mapas", "contratos"],
    virmura: ["Guilda de Virmura", "virmura-sede"],
    borun: ["Guilda de Borun", "borun-sede"],
    sevrak: ["Guilda de Sevrak", "sevrak-sede"],
    treino: ["Espaço de Guedra", "treino"],
    quarta: ["Quarta guilda", "quarta-sede"],
    coliseu: ["Coliseu", "coliseu-entrada"],
    oficina: ["Oficina de Durn", "oficina"],
    cisterna: ["Cisterna em obras", "cisterna"],
    minas: ["Minas e galerias", "minas-entrada"],
  };
  const home = (s) => ({ A: "virmura", B: "borun", C: "sevrak" })[s.guild];
  const resolve = (value, s) =>
    typeof value === "function" ? value(s) : value;
  const n = (text, background) => ({
    type: "description",
    speaker: "Rheed",
    era: background === "bg-coreto" ? "present" : "past",
    text,
    background,
  });
  const d = (speaker, text, expression = "neutro", extra = {}) => ({
    type: "dialogue",
    speaker,
    text,
    expression,
    era: ["Rheed", "Criança"].includes(speaker) ? "present" : "past",
    ...extra,
  });
  const conditions = {
    ", se escolheu registro em A3": (s) => s.flags.a3 !== 1,
    ", se escolheu explicação em A3": (s) => s.flags.a3 === 1,
    ", se C4 começou pelo limite": (s) => s.flags.c4 === 1,
    ", se C4 colocou a ressalva ao lado": (s) => s.flags.c4 !== 1,
    ", se rejeitada": (s, p) => C.guilds[s.guild].mentor !== p.speaker,
    ", se rejeitado": (s, p) => C.guilds[s.guild].mentor !== p.speaker,
    ", X": (s) => s.xy === "X",
    ", Y": (s) => s.xy === "Y",
    ", se X": (s) => s.xy === "X",
    ", se Y": (s) => s.xy === "Y",
    ", se contribuiu": (s) => s.flags.dam === "help",
    ", se guardou": (s) => s.flags.dam !== "help",
    ", zero recrutados": (s) => !s.recruits.some((r) => r.invited),
    ", zero aliados": (s) => !s.recruits.some((r) => r.invited),
    ", com aliados": (s) => s.recruits.some((r) => r.invited),
    "papel:Virmura": (s) => s.guild === "A",
    "papel:Borun": (s) => s.guild === "B",
    "papel:Sevrak": (s) => s.guild === "C",
    "papel:Darvek": (s) => s.xy === "X",
    "papel:Zagra": (s) => s.xy === "Y",
    "primeiro-rejeitado": (s, p) =>
      p.speaker === (s.guild === "A" ? "Borun" : "Virmura"),
  };
  function speeches(parts, s, expressions = {}) {
    return parts
      .filter(
        (p) =>
          p.text && (!conditions[p.condition] || conditions[p.condition](s, p)),
      )
      .map((p) => d(p.speaker, p.text, expressions[p.speaker] || p.expression));
  }
  function read(from, to, expressions = {}) {
    const pages = [];
    let body = [],
      choices = [],
      question = false;
    const flush = () => {
      const bodySnapshot = body.slice();
      if (body.length || choices.length)
        pages.push({
          body: (s) => speeches(bodySnapshot, s, expressions),
          choices: choices.slice(),
          question,
        });
      body = [];
      choices = [];
      question = false;
    };
    for (const record of script.records.filter(
      (r) => r.line >= from && r.line <= to,
    )) {
      if (record.choice) {
        question = record.question;
        choices.push({
          label: record.choice,
          response: (s) => [
            d(record.speaker, record.choice, record.expression),
            ...speeches(record.response, s),
          ],
          flags: {},
          cost: 0,
        });
      } else {
        if (choices.length) flush();
        body.push(...record.body.filter((p) => p.text));
      }
    }
    flush();
    return pages;
  }
  const page = (body, choices = []) => ({ body, choices });
  const choice = (label, response, flags = {}, cost = 0) => ({
    label,
    response,
    flags,
    cost,
  });
  const mentor = (a, b, c, expressions) => (s) => [
    d(C.guilds[s.guild].mentor, { A: a, B: b, C: c }[s.guild], expressions[s.guild]),
  ];
  const joined = (pages) => (s) => pages.flatMap((p) => resolve(p.body, s));
  function step(id, location, title, pages, meta = {}) {
    return { id, location, title, pages, ...meta };
  }
  function quest(id, title, steps, kind = "event", meta = {}) {
    const pages = [];
    steps.forEach((st, i) => {
      st.firstPage = pages.length;
      st.pages.forEach((pg, j) => {
        const original = pg.body;
        pages.push({
          ...pg,
          step: i,
          stepEnd: j === st.pages.length - 1,
          body: (s) => {
            const location = resolve(st.location, s);
            const background =
              st.background ||
              (location === "coreto"
                ? "bg-coreto"
                : `bg-${places[location][1]}`);
            let body = resolve(original, s);
            if (!body.length) body = [n(st.title, background)];
            return body.map((p, index) => {
              const changesTime =
                index > 0 &&
                p.era === "past" &&
                body[index - 1].era === "present";
              return {
                ...p,
                ...((index === 0 || changesTime) && !p.background
                  ? {
                      background:
                        p.era === "present" ? "bg-coreto" : background,
                    }
                  : {}),
              };
            });
          },
        });
      });
    });
    C.quests[id] = {
      id,
      title,
      kind,
      steps,
      pages,
      place:
        typeof steps[0].location === "string"
          ? places[steps[0].location]?.[0] || "Noite da História"
          : "Sede escolhida",
      ...meta,
    };
  }
  const textStep = (id, loc, title, text, meta) =>
    step(id, loc, title, [page([n(text)])], meta);
  const excerpt = (id, loc, title, a, b, meta) =>
    step(id, loc, title, read(a, b), meta);
  const deliver = (item, to) => ({ item, to });
  const evidence = (discoveryExpression = "feliz") => [
    page([
      {
        type: "action",
        speaker: "Rheed",
        era: "past",
        text: "Um croqui acompanha a entrada: passagem estreita, depois bifurcação.",
        object: "obj-mapa-entrada",
        operation: "show",
      },
      {
        type: "action",
        speaker: "Rheed",
        era: "past",
        text: "O outro acompanha a retirada: bifurcação, passagem estreita, entrada.",
        object: "obj-mapa-retirada",
        operation: "show",
      },
      d(
        "Elune",
        "Olhe aqui. Este desenho vai da entrada, pela passagem estreita, até a bifurcação. O outro descreve a retirada. Estamos lendo no sentido contrário.",
        "neutro",
      ),
      d(
        "Ghork",
        "Então a esquerda de quem entrava seria a direita de quem saía. Isso explicaria... mas temos como confirmar o sentido de cada grupo?",
        "confuso",
      ),
      d(
        "Elune",
        "Nestes dois trajetos, temos. Os registros indicam o ponto de partida e a direção. Ponha o dedo no primeiro marco; vamos seguir a ordem.",
        "neutro",
      ),
      d(
        "Ghork",
        "Entrada, passagem estreita, bifurcação. Depois a volta: bifurcação, passagem, entrada. Está aí! É o mesmo trecho, visto de lados opostos.",
        discoveryExpression,
      ),
      d(
        "Elune",
        "Esse trecho, sim. Não leve a conclusão além do que os registros mostram. Vou marcar a parte conferida; as outras galerias continuam com perguntas.",
        "neutro",
      ),
    ]),
  ];
  quest(
    "intro",
    "E00 · Um lugar perto do contador",
    [
      step("cadeira", "coreto", "Ouvir Rheed", read(117, 127)),
      step(
        "socorro",
        "virmura",
        "Sobreviver à chegada a Terminus",
        [
          page([
            n(
              "Rheed bebe a poção. As vozes ao redor do Coreto se afastam, até restar apenas a respiração difícil de Ghork.",
              "bg-virmura-enfermaria",
            ),
          ]),
          ...read(128, 144),
        ],
        { background: "bg-virmura-enfermaria", automatic: true },
      ),
    ],
    "opening",
  );
  quest(
    "gA1",
    "Q-A1 · Um trabalho que cabe sentado",
    [
      excerpt("abrigo", "virmura", "Combinar abrigo e trabalho", 291, 312),
      step(
        "contato",
        "virmura",
        "Dar notícias a Lala",
        [
          ...read(314, 334),
          page([
            n(
              "Os cuidados e as pequenas tarefas passam a fazer parte da rotina. Aos poucos, Ghork consegue caminhar pequenas distâncias, sempre atento a um lugar para descansar.",
            ),
            d(
              "Virmura",
              "Tenho duas entregas aqui perto que você pode fazer: uma no mercado, outra no coliseu. Escolha por qual começar. E, se precisar descansar, pare. Os pacotes podem esperar junto com você.",
              "neutro",
            ),
          ]),
        ],
        { automatic: true },
      ),
    ],
    "guild",
    { guild: "A", step: 1 },
  );
  quest("E01", "E01 · Dois mapas, um contrato", [
    excerpt(
      "contrato",
      "contratos",
      "Conhecer o contrato das minas",
      153,
      174,
    ),
  ]);
  quest("champion", "E02 · O homem por trás do cartaz", [
    excerpt("passado", "virmura", "Perguntar a Virmura sobre o campeão", 182, 194),
    excerpt("torvak", "coliseu", "Conhecer Torvak", 198, 217),
  ]);
  quest("E03", "E03 · Uma oferta para aguentar o treino", [
    excerpt("oferta", "coliseu", "Ouvir a oferta de Savel", 226, 243),
  ]);
  quest("E08", "E08 · Aprender a recuar", [
    excerpt("cuidado", "virmura", "Conversar sobre os cuidados com a perna", 254, 258),
    step("pratica", "treino", "Praticar movimentos e recuo", [
      page([
        n(
          "Guedra acompanha Ghork em práticas curtas. Ele aprende a observar o espaço atrás de si com o mesmo cuidado que dedica ao adversário à frente.",
        ),
      ]),
      ...read(262, 275),
    ]),
  ]);
  quest(
    "gA2",
    "Q-A2 · O caminho de volta",
    [
      excerpt(
        "registro",
        "virmura",
        "Consultar o registro de resgate e receber a cópia sem nomes",
        344,
        354,
        { receive: ["registro-retirada"], background: "bg-virmura-enfermaria" },
      ),
      step(
        "elune",
        "contratos",
        "Entregar a cópia a Elune",
        [...read(357, 362), ...evidence()],
        {
          deliver: [deliver("registro-retirada", "Elune")],
          receive: ["apontamentos-a"],
          evidence: true,
        },
      ),
      excerpt(
        "retorno",
        "virmura",
        "Levar as anotações a Virmura",
        365,
        370,
        { deliver: [deliver("apontamentos-a", "Virmura")] },
      ),
    ],
    "guild",
    { guild: "A", step: 2 },
  );
  const a3 = read(380, 398);
  a3.find((p) => p.choices.length).choices.forEach((c, i) => (c.flags.a3 = i));
  quest(
    "gA3",
    "Q-A3 · Alguém precisa ficar",
    [
      step("escala", "virmura", "Preparar a escala e receber o pedido para Durn", a3, {
        receive: ["pedido-maca"],
      }),
      excerpt(
        "emprestimo",
        "oficina",
        "Entregar o pedido a Durn e conferir a maca",
        399,
        406,
        {
          deliver: [deliver("pedido-maca", "Durn")],
          receive: ["maca", "recibo-maca"],
        },
      ),
      excerpt("sede", "virmura", "Apresentar o recibo a Virmura", 407, 414, {
        deliver: [deliver("recibo-maca", "Virmura")],
      }),
    ],
    "guild",
    { guild: "A", step: 3 },
  );
  quest(
    "gA4",
    "Q-A4 · Uma maca na porta",
    [
      excerpt("teste", "virmura", "Orientar a equipe no teste de passagem da maca", 422, 440, {
        requires: ["maca"],
      }),
      excerpt("devolucao", "oficina", "Devolver o conjunto a Durn", 443, 448, {
        deliver: [deliver("maca", "Durn")],
      }),
    ],
    "guild",
    { guild: "A", step: 4 },
  );
  quest(
    "gB1",
    "Q-B1 · O corredor errado",
    [
      textStep(
        "lista",
        "virmura",
        "Receber a lista de materiais de Virmura",
        "Virmura entrega uma lista de materiais a Ghork. Jorvi, no mercado, tem as ataduras e o material de lavagem de que ela precisa.",
        { receive: ["lista-virmura"] },
      ),
      step(
        "bolsa",
        "mercado",
        "Buscar a bolsa com Jorvi",
        [...read(487, 489)],
        {
          deliver: [deliver("lista-virmura", "Jorvi")],
          receive: ["bolsa-materiais"],
        },
      ),
      step(
        "borun",
        "mercado",
        "Escapar do corredor bloqueado",
        [
          page([
            n(
              "Dois assaltantes bloqueiam a passagem. Ghork aperta a bolsa de materiais contra o peito. Perto da descarga, Borun põe o bastão entre eles.",
            ),
          ]),
          ...read(493, 501),
          page([
            n(
              "Ghork empurra o carrinho vazio para o caminho dos assaltantes. Enquanto eles tentam contornar, ele passa pela abertura que Borun mantém livre.",
            ),
          ]),
          ...read(503, 520),
        ],
        { automatic: true },
      ),
      excerpt("entrega", "virmura", "Entregar a bolsa a Virmura", 522, 528, {
        deliver: [deliver("bolsa-materiais", "Virmura")],
      }),
    ],
    "guild",
    { guild: "B", step: 1 },
  );
  quest(
    "gB2",
    "Q-B2 · Onde a carroça parou",
    [
      excerpt(
        "pirka",
        "mercado",
        "Perguntar a Pirka sobre o percurso e receber a cópia",
        535,
        559,
        { receive: ["registro-carga"] },
      ),
    ],
    "guild",
    { guild: "B", step: 2 },
  );
  quest(
    "gB3",
    "Q-B3 · Borun não veio",
    [
      step(
        "elune",
        "contratos",
        "Entregar a cópia a Elune",
        [...read(569, 579), ...evidence()],
        {
          deliver: [deliver("registro-carga", "Elune")],
          receive: ["apontamentos-b"],
          evidence: true,
        },
      ),
      excerpt(
        "retorno",
        "borun",
        "Levar as anotações a Borun",
        582,
        591,
        { deliver: [deliver("apontamentos-b", "Borun")] },
      ),
    ],
    "guild",
    { guild: "B", step: 3 },
  );
  quest(
    "gB4",
    "Q-B4 · A carga não é de vocês",
    [
      excerpt("noticia", "borun", "Ouvir Pirka sobre o roubo", 599, 605),
      excerpt(
        "cobranca",
        "mercado",
        "Exigir a devolução da carga roubada",
        611,
        617,
        { battle: "B4" },
      ),
      excerpt(
        "recuperar",
        "mercado",
        "Recolher o fardo após vencer a luta",
        620,
        622,
        { requiresWin: "B4", receive: ["fardo"] },
      ),
      excerpt(
        "conferir",
        "mercado",
        "Entregar o fardo a Pirka e Jorvi",
        626,
        632,
        {
          deliver: [deliver("fardo", "Pirka e Jorvi")],
          receive: ["recibo-fardo"],
        },
      ),
      excerpt("retorno", "borun", "Entregar o recibo a Borun", 640, 646, {
        deliver: [deliver("recibo-fardo", "Borun")],
      }),
    ],
    "guild",
    { guild: "B", step: 4 },
  );
  quest(
    "gC1",
    "Q-C1 · O movimento repetido",
    [
      textStep(
        "pacote",
        "virmura",
        "Receber o pacote de ataduras",
        "Virmura entrega a Ghork um pacote de ataduras para Rask. A entrega o leva à entrada administrativa do coliseu, de onde já se ouvem os treinos.",
        { receive: ["ataduras"] },
      ),
      step("sevrak", "coliseu", "Ajudar o iniciante durante o treino", [
        page([n("Na área de treino, um veterano derruba um iniciante. O rapaz se levanta, tenta se firmar e cai outra vez com o mesmo ataque.")]),
        ...read(686, 696),
        page([
          n(
            "O veterano se volta contra Ghork e avança. Sevrak entra entre os dois, intercepta o ataque e o desarma.",
          ),
        ]),
        ...read(698, 713),
      ]),
      excerpt("entrega", "coliseu", "Entregar as ataduras a Rask", 716, 722, {
        deliver: [deliver("ataduras", "Rask")],
        receive: ["recibo-ataduras"],
      }),
    ],
    "guild",
    { guild: "C", step: 1 },
  );
  quest(
    "gC2",
    "Q-C2 · O que a régua não diz",
    [
      excerpt(
        "procedimento",
        "sevrak",
        "Preparar a comparação dos mapas para Elune",
        730,
        746,
        { receive: ["procedimento"] },
      ),
    ],
    "guild",
    { guild: "C", step: 2 },
  );
  quest(
    "gC3",
    "Q-C3 · Um método sem o mestre",
    [
      step(
        "elune",
        "contratos",
        "Levar o procedimento escrito a Elune",
        [...read(754, 772), ...evidence("neutro")],
        {
          deliver: [deliver("procedimento", "Elune")],
          receive: ["apontamentos-c"],
          evidence: true,
        },
      ),
      textStep(
        "retorno",
        "sevrak",
        "Entregar a cópia revisada a Sevrak",
        "Ghork volta à escola com a cópia revisada por Elune. O trecho conferido está bem marcado; as perguntas ainda sem resposta continuam ao lado.",
        { deliver: [deliver("apontamentos-c", "Sevrak")] },
      ),
    ],
    "guild",
    { guild: "C", step: 3 },
  );
  const c4 = read(827, 839);
  c4.find((p) => p.choices.length).choices.forEach((c, i) => (c.flags.c4 = i));
  quest(
    "gC4",
    "Q-C4 · Pode repetir na minha frente",
    [
      excerpt("noticia", "sevrak", "Ouvir o que aconteceu com o estojo de treino", 784, 790),
      excerpt(
        "restituicao",
        "coliseu",
        "Falar com Rask e exigir a devolução do estojo",
        794,
        800,
        { receive: ["estojo"] },
      ),
      excerpt("duelo", "coliseu", "Aceitar o duelo supervisionado", 806, 809, {
        battle: "C4",
      }),
      excerpt("resultado", "coliseu", "Ouvir o resultado", 815, 821, {
        requiresWin: "C4",
      }),
      step("retorno", "sevrak", "Devolver o estojo e revisar a ressalva do relatório", c4, {
        deliver: [deliver("estojo", "Sevrak")],
      }),
    ],
    "guild",
    { guild: "C", step: 4 },
  );
  for (const [g, a, b] of [
    ["A", 456, 470],
    ["B", 655, 667],
    ["C", 847, 859],
  ])
    quest(
      `g${g}5`,
      `Q-${g}5 · A proposta de ${C.guilds[g].mentor}`,
      [
        excerpt(
          "proposta",
          { A: "virmura", B: "borun", C: "sevrak" }[g],
          "Ouvir a proposta sem assumir compromisso",
          a,
          b,
        ),
      ],
      "guild",
      { guild: g, step: 5 },
    );
  for (const [g, a, b] of [
    ["A", 884, 893],
    ["B", 897, 908],
    ["C", 910, 923],
  ]) {
    quest(
      `commit${g}`,
      `E04 · Defender ${C.guilds[g].name}`,
      [
        step(
          "defesa",
          "contratos",
          "Confirmar adesão e defender a estratégia",
          [
            ...read(880, 880),
            ...read(a, b),
            page([
              d(
                "Ghork",
                "E aqui está o trecho que pudemos conferir. Este desenho acompanha a entrada até a bifurcação; o outro, a volta. Os registros confirmam onde cada percurso começou e em que sentido seguiu.",
                "neutro",
              ),
              d(
                "Meruna",
                "Esse trecho está conferido. As galerias restantes farão parte da investigação. O contrato fica com a guilda que você escolheu, Ghork. Vamos registrar as responsabilidades por escrito.",
                "neutro",
              ),
            ]),
            ...read(929, 939, g === "C" ? { Virmura: "raiva", Borun: "raiva" } : {}),
            page(
              mentor(
                "Agora, seu pagamento é seu. Fica separado do dinheiro da equipe. Antes de nos empolgarmos com os planos, vamos combinar que trabalho você pode assumir.",
                "Vamos separar seu pagamento das contas da guilda. Você precisa saber exatamente o que ganhou, sem ter de me pedir permissão para usar.",
                "Vamos registrar seu pagamento separado do dinheiro da investigação. Você saberá qual parte é sua para usar. Agora temos preparativos a fazer.", { A: "neutro", B: "neutro", C: "neutro" },
              ),
            ),
          ],
        ),
      ],
      "commit",
      { guild: g, shared: "E04" },
    );
  }
  quest(
    "retaliation",
    "E05 · Os horários riscados",
    [
      step("horarios", "coliseu", "Contestar a retirada dos horários de treino", [
        page(
          mentor(
            "Esses horários estavam reservados para nossa equipe, Torvak. Ter um campeão não dá à quarta guilda o direito de tirar os outros da arena.",
            "Rask, você nos deu esses horários. Se sua palavra só vale até Torvak reclamar, devia ter avisado antes de fazermos os planos.",
            "A escola recebeu esse horário. Gostaria de saber que regra permite cancelar porque a quarta guilda o prefere.", { A: "raiva", B: "raiva", C: "raiva" },
          ),
        ),
        ...read(959, 959),
        page(
          mentor(
            "Quando sua prioridade tira o horário já prometido a outra equipe, sim. É exatamente de abuso que estou chamando.",
            "Estou pedindo que cumpra o acordo. Não devíamos ter de implorar por um horário que já era nosso.",
            "Uma descrição da sua popularidade não responde à pergunta. Que regra permite isso?", { A: "raiva", B: "raiva", C: "neutro" },
          ),
        ),
        ...read(963, 963),
        page(
          mentor(
            "Não. Você ouviu muito bem.",
            "Não. Não vou pedir desculpas por esperar que cumpram a palavra.",
            "Mantenho a pergunta. Não vejo motivo para retirá-la.", { A: "raiva", B: "raiva", C: "neutro" },
          ),
        ),
        ...read(967, 979),
        page(
          mentor(
            "Vamos abrir espaço na sede. E ninguém vai perder descanso para pagar pela birra dele.",
            "Vamos dividir o trabalho na sede. Prometi acompanhar aqueles treinos e vou acompanhar. Vamos ver o que cabe em cada espaço.",
            "Na escola, então. Vamos avaliar o espaço e adaptar os exercícios. Ainda temos um campeonato para preparar.", { A: "neutro", B: "neutro", C: "neutro" },
          ),
        ),
      ]),
      step("reorganizacao", home, "Reorganizar os treinos na sede da guilda", [
        page([
          n(
            "De volta à sede da guilda, Ghork leva os materiais mais leves enquanto reorganizam o espaço e os horários de treino.",
          ),
        ]),
        page(
          mentor(
            "Atendimento deste lado, treino do outro. Se os horários não couberem, me procure. Não tente resolver cortando seu descanso, Ghork. Deu trabalho demais cuidar dessa perna.",
            "Aqui é mais apertado, então dividi os grupos. Pirka tem os horários, e você também vai ter. Desta vez não vai descobrir meu atraso esperando ao lado de uma cadeira vazia.",
            "Adaptei a sequência a esta sala. Teste e registre o que falhar. Preciso que diga quando um exercício não funciona, não que concorde agora e troque escondido depois.", { A: "neutro", B: "neutro", C: "neutro" },
          ),
        ),
        ...read(995, 995),
      ]),
    ],
    "event",
    { shared: "E05" },
  );
  quest(
    "introX",
    "Q-X0 · Um caminho de volta",
    [excerpt("reserva", "oficina", "Conhecer o plano de Darvek", 1004, 1024)],
    "xyIntro",
    { route: "X" },
  );
  quest(
    "introY",
    "Q-Y0 · Menos bagagem",
    [excerpt("carga", "mercado", "Conhecer o plano de Zagra", 1032, 1050)],
    "xyIntro",
    { route: "Y" },
  );
  quest("alliance", "E06 · A escolha da equipe", [
    step("escolha", "contratos", "Escolher a rota X ou Y", [
      page(
        mentor(
          "Você ouviu os dois planos. Agora escolha um que consiga defender quando a equipe perguntar por quê.",
          "Antes de me contar quem convenceu você, conte o que foi conferir por conta própria.",
          "Uma proposta convincente não basta. Escolha um método que consiga justificar quando tivermos o resultado.", { A: "neutro", B: "neutro", C: "neutro" },
        ),
      ),
      page(
        [
          n(
            "Esta escolha abre duas missões na rota selecionada e fecha a outra. A equipe que você não escolher trabalhará com outra guilda.",
          ),
        ],
        [
          choice(
            "Escolher X · preparar uma reserva de resgate",
            joined(read(1066, 1072)),
            { routeChoice: "X" },
          ),
          choice(
            "Escolher Y · limitar o levantamento",
            joined(read(1081, 1088)),
            { routeChoice: "Y" },
          ),
        ],
      ),
    ]),
    excerpt("resposta-x", "contratos", "Responder a Zagra", 1074, 1080, {
      when: (s) => s.flags.routeChoice === "X",
      automatic: true,
    }),
    excerpt("resposta-y", "contratos", "Responder a Darvek", 1089, 1094, {
      when: (s) => s.flags.routeChoice === "Y",
      automatic: true,
    }),
  ]);
  // Preserve the existing Y answer at index 0 for version-3 save replay.
  C.quests.alliance.pages
    .find((p) => C.quests.alliance.steps[p.step].id === "resposta-y")
    .choices.reverse();
  quest(
    "X1",
    "Q-X1 · Antes de entrar",
    [
      excerpt("apoios", "oficina", "Receber os esteios preparados", 1101, 1107, {
        receive: ["apoios"],
      }),
      excerpt(
        "ensaio",
        "minas",
        "Entregar os esteios e testar a saída",
        1111,
        1123,
        { deliver: [deliver("apoios", "Darvek")] },
      ),
    ],
    "route",
    { route: "X", step: 1 },
  );
  quest(
    "Y1",
    "Q-Y1 · O peso de cada coisa",
    [
      excerpt(
        "carga",
        "mercado",
        "Conferir e receber a carga leve",
        1159,
        1167,
        { receive: ["carga-leve"] },
      ),
      excerpt(
        "entrada",
        "minas",
        "Entregar a carga e conferir as marcas do caminho",
        1170,
        1175,
        { deliver: [deliver("carga-leve", "Zagra")] },
      ),
    ],
    "route",
    { route: "Y", step: 1 },
  );
  for (const [route, a, b] of [
    ["X", 1133, 1151],
    ["Y", 1185, 1205],
  ])
    quest(
      `${route}2`,
      (route === "X" ? "Q-X2 · Onde paramos" : "Q-Y2 · Onde paramos"),
      [
        excerpt(
          "galeria",
          "minas",
          "Examinar as galerias e registrar o caminho de volta",
          a,
          b,
          { background: "bg-minas-subsolo", receive: ["levantamento"] },
        ),
      ],
      "route",
      { route, step: 2 },
    );
  quest("classify", "Q-20 · Meu nome na lista", [
    excerpt(
      "relatorio",
      "contratos",
      "Entregar o levantamento a Meruna",
      1215,
      1230,
      { deliver: [deliver("levantamento", "Meruna")] },
    ),
    step("daratrine", home, "Conversar com Lala", [
      ...read(1238, 1257),
      page(
        [
          n(
            "Contribuir usa parte do pagamento pessoal de Ghork e abre mão de um treino extra. Guardar o dinheiro mantém esse treino. Nenhuma das opções gasta Ludos ou altera o D20.",
          ),
        ],
        [
          choice(
            "Ajudar a pagar o material para o conserto de Dam",
            (s) => read(1262, 1267).flatMap((p) => resolve(p.body, s)),
            { dam: "help" },
          ),
          choice(
            "Guardar o dinheiro para os treinos",
            (s) => read(1278, 1285).flatMap((p) => resolve(p.body, s)),
            { dam: "defer" },
          ),
        ],
      ),
      ...read(1288, 1291),
    ]),
    excerpt(
      "remessa",
      "mercado",
      "Combinar o envio com Jorvi e Pirka",
      1270,
      1275,
      { when: (s) => s.flags.dam === "help", receive: ["recibo-dam"] },
    ),
    excerpt("dorga", "contratos", "Ouvir a reclamação de Dorga", 1299, 1303),
    step("dose", "coliseu", "Procurar Torvak e Savel", [
      page([
        n(
          "Um companheiro passa uma dose a Torvak. Ele espera o tremor da mão diminuir antes de se virar para cumprimentar o público. Savel fecha o estojo.",
        ),
      ]),
      ...read(1307, 1321),
    ]),
    excerpt("preparo", "treino", "Treinar com Guedra", 1329, 1335),
    step("classificacao", "coliseu", "Confirmar classificação", [
      ...read(1339, 1343),
      page(
        mentor(
          "Você conseguiu. E não precisou ultrapassar seus limites no trabalho para chegar aqui. Me avise quando precisar de uma mão, está bem?",
          "Olhe seu nome ali. Você sabe o que deu trabalho. Vá, conte do seu jeito; eu não preciso falar por nós dois.",
          "Está aí. Sua classificação. A preparação da escola ajudou você a chegar aqui, Ghork. Pretendo garantir que isso seja reconhecido.", { A: "feliz", B: "feliz", C: "feliz" },
        ),
      ),
      ...read(1353, 1361),
    ]),
  ]);
  const outcomePage = (id, labels, ranges, expressions) =>
    page(
      [
        n(
          "Escolha qual projeto apoiar. Nesta missão, você só poderá convidar a pessoa responsável pelo projeto escolhido.",
        ),
      ],
      labels.map((label, i) =>
        choice(
          label,
          (s) => [
            d("Ghork", label, expressions[i]),
            ...ranges[i].flatMap(([a, b]) =>
              read(a, b).flatMap((p) => resolve(p.body, s)),
            ),
          ],
          { [id]: i ? "B" : "A" },
        ),
      ),
    );
  quest(
    "R1",
    "R1 · Um pátio, dois planos",
    [
      step(
        "inspecao",
        "estalagem",
        "Inspecionar o pátio",
        [
          ...read(1397, 1405),
          {
            ...page(
              [n("Ghork percorre a passagem e examina o canto disponível para guardar material.")],
              [
                choice("Examinar a passagem", [
                  d(
                    "Nima",
                    "As cargas passam por aqui. Bloqueie isso e nada entra nem sai.",
                    "neutro",
                  ),
                ]),
                choice("Examinar o canto para guardar material", [
                  d(
                    "Brakka",
                    "Posso pôr os bancos aqui. A menos que fique tudo cheio de caixas, claro. Aí terei uma turma sem espaço nem para ficar em pé.",
                    "neutro",
                  ),
                ]),
              ],
            ),
            question: true,
          },
        ],
        { background: "bg-estalagem-patio" },
      ),
      step(
        "turno",
        "estalagem",
        "Escolher como usar o horário noturno",
        [
          outcomePage(
            "R1",
            ["Vou ajudar o Brakka a começar os treinos.", "Vou ajudar a Nima a organizar as entregas noturnas."],
            [[[1423, 1427]], [[1437, 1441]]], ["neutro", "neutro"],
          ),
        ],
        { background: "bg-estalagem-patio" },
      ),
      textStep(
        "lista",
        "estalagem",
        "Receber a lista de participantes e conferir",
        "Ghork pega a lista de Brakka e confere quem pode participar enquanto os trabalhadores arrumam os bancos.",
        {
          when: (s) => s.flags.R1 === "A",
          receive: ["lista-patio"],
          background: "bg-estalagem-patio",
        },
      ),
      textStep(
        "etiquetas",
        "estalagem",
        "Receber as etiquetas e conferir as caixas",
        "Com as etiquetas de Nima em mãos, Ghork ajuda a identificar as caixas e conferir os retornos. Eles separam tudo o que ninguém reconhece.",
        {
          when: (s) => s.flags.R1 === "B",
          receive: ["etiquetas-patio", "lista-patio"],
          background: "bg-estalagem-patio",
        },
      ),
      textStep(
        "identificar",
        "estalagem",
        "Colocar as etiquetas nas caixas",
        "Ghork prende uma etiqueta em cada caixa que conferiu.",
        {
          when: (s) => s.flags.R1 === "B",
          consume: ["etiquetas-patio"],
          background: "bg-estalagem-patio",
        },
      ),
      step(
        "entregar",
        "estalagem",
        "Entregar a lista conferida a Nyra",
        [
          page((s) =>
            read(
              s.flags.R1 === "A" ? 1431 : 1445,
              s.flags.R1 === "A" ? 1435 : 1447,
            ).flatMap((p) => resolve(p.body, s)),
          ),
        ],
        {
          deliver: [deliver("lista-patio", "Nyra")],
          background: "bg-estalagem-patio",
        },
      ),
    ],
    "recruit",
    { index: 0 },
  );
  quest(
    "R2",
    "R2 · Quem põe o nome?",
    [
      excerpt(
        "autorizacao",
        "virmura",
        "Obter a autorização e o relato anônimo",
        1473,
        1490,
        {
          receive: ["autorizacao-r2", "relato-anonimo"],
          background: "bg-virmura-enfermaria",
        },
      ),
      excerpt(
        "peca",
        "treino",
        "Entregar a autorização e buscar a peça quebrada",
        1496,
        1500,
        {
          deliver: [deliver("autorizacao-r2", "Guedra")],
          receive: ["peca-avariada"],
        },
      ),
      excerpt("exame", "oficina", "Examinar a peça com Durn", 1504, 1510, {
        requires: ["peca-avariada"],
        receive: ["nota-condicao"],
      }),
      excerpt("devolver", "treino", "Devolver a peça a Guedra", 1513, 1513, {
        deliver: [deliver("peca-avariada", "Guedra")],
      }),
      step(
        "conferir",
        "virmura",
        "Conferir as provas e escolher como apresentar o caso",
        [
          ...read(1515, 1523),
          outcomePage(
            "R2",
            [
              "Sura, vou ajudar a preparar o relatório sem identificar os pacientes.",
              "Edrin, vou ajudar quem quer depor a preparar seus relatos.",
            ],
            [[], []], ["neutro", "neutro"],
          ),
        ],
        { requires: ["relato-anonimo", "nota-condicao"] },
      ),
      step(
        "apresentar",
        "contratos",
        "Apresentar o caso a Seldan",
        [
          page((s) =>
            read(
              s.flags.R2 === "A" ? 1529 : 1539,
              s.flags.R2 === "A" ? 1537 : 1551,
            ).flatMap((p) => resolve(p.body, s)),
          ),
        ],
        {
          deliver: [
            deliver("nota-condicao", "Seldan"),
            deliver("relato-anonimo", "Seldan"),
          ],
        },
      ),
    ],
    "recruit",
    { index: 1 },
  );
  quest(
    "R3",
    "R3 · Antes de desmontar",
    [
      excerpt(
        "autorizacao",
        "oficina",
        "Receber a autorização para a demonstração",
        1571,
        1577,
        { receive: ["autorizacao-armacao"] },
      ),
      excerpt(
        "demonstracao",
        "treino",
        "Acompanhar a demonstração",
        1581,
        1591,
        { requires: ["autorizacao-armacao"] },
      ),
      step(
        "destino",
        "oficina",
        "Devolver a autorização e escolher o destino da estrutura",
        [
          outcomePage(
            "R3",
            ["Vamos usar as peças para as proteções do Korr.", "Vamos manter a estrutura para as aulas da Velka."],
            [[[1598, 1605]], [[1608, 1615]]], ["neutro", "neutro"],
          ),
        ],
        { deliver: [deliver("autorizacao-armacao", "Durn")] },
      ),
    ],
    "recruit",
    { index: 2 },
  );
  quest(
    "R4",
    "R4 · A chave da cisterna",
    [
      step(
        "contas",
        "cisterna",
        "Ouvir os trabalhadores e receber os registros",
        [
          ...read(1632, 1640),
          {
            ...page(
              [n("Os trabalhadores se reúnem para discutir os salários atrasados. Todos precisam do dinheiro, mas discordam sobre a entrega.")],
              [
                choice("Ouvir quem quer adiar a entrega", [
                  d(
                    "Trabalhador",
                    "Já fizemos o trabalho. Se entregarmos a cisterna também, por que vão resolver pagar justamente depois?",
                    "raiva",
                  ),
                ]),
                choice("Ouvir quem precisa receber agora", [
                  d(
                    "Trabalhador",
                    "E, se pararmos, o que digo às pessoas a quem devo? Preciso saber se esse depósito existe mesmo.",
                    "triste",
                    { pose: "segundo" },
                  ),
                ]),
              ],
            ),
            question: true,
          },
          ...read(1648, 1648),
        ],
        { receive: ["contas-cisterna"] },
      ),
      excerpt(
        "deposito",
        "mercado",
        "Conferir o depósito e receber o comprovante",
        1654,
        1663,
        { requires: ["contas-cisterna"], receive: ["deposito"] },
      ),
      step(
        "acordo",
        "cisterna",
        "Entregar o comprovante e escolher qual posição apoiar",
        [
          ...read(1669, 1671),
          outcomePage(
            "R4",
            ["Estou com a Tessa. Paguem a equipe antes da entrega.", "Estou com o Mavren. Vamos concluir o trabalho com o pagamento garantido."],
            [[[1683, 1693]], [[1697, 1699]]], ["neutro", "neutro"],
          ),
        ],
        { deliver: [deliver("deposito", "Representantes dos trabalhadores")] },
      ),
      textStep(
        "chave",
        "cisterna",
        "Receber a chave de Mavren",
        "Mavren passa a chave a Ghork. Os representantes acompanham a última conferência.",
        { when: (s) => s.flags.R4 === "B", receive: ["chave-cisterna"] },
      ),
      step(
        "entrega",
        "cisterna",
        "Entregar a chave e autorizar o pagamento",
        [
          page([
            n(
              "Diante dos representantes, Ghork entrega a chave a quem recebe a cisterna. A confirmação dos dois lados autoriza a liberação do pagamento depositado.",
            ),
          ]),
          ...read(1703, 1705),
        ],
        {
          when: (s) => s.flags.R4 === "B",
          deliver: [deliver("chave-cisterna", "Responsável pela cisterna")],
        },
      ),
    ],
    "recruit",
    { index: 3 },
  );
  quest(
    "R5",
    "R5 · Uma vez diante do público",
    [
      step("formato", "coliseu", "Escolher qual apresentação apoiar", [
        ...read(1723, 1731),
        outcomePage(
          "R5",
          [
            "Odrik, vamos fazer um espetáculo para ajudar a enfermaria.",
            "Lethra, vamos dar esse espaço de exibição aos seus aprendizes.",
          ],
          [[], []], ["neutro", "neutro"],
        ),
      ]),
      excerpt(
        "programa-odrik",
        "treino",
        "Preparar e receber o programa",
        1737,
        1743,
        { when: (s) => s.flags.R5 === "A", receive: ["programa"] },
      ),
      excerpt(
        "programa-lethra",
        "treino",
        "Preparar e receber o programa",
        1755,
        1760,
        { when: (s) => s.flags.R5 === "B", receive: ["programa"] },
      ),
      step(
        "apresentacao",
        "coliseu",
        "Entregar o programa a Rask e fazer a apresentação",
        [
          page((s) =>
            read(
              s.flags.R5 === "A" ? 1746 : 1763,
              s.flags.R5 === "A" ? 1752 : 1770,
            ).flatMap((p) => resolve(p.body, s)),
          ),
        ],
        { deliver: [deliver("programa", "Rask")] },
      ),
    ],
    "recruit",
    { index: 4 },
  );
  quest("gate", "Conferir a equipe antes das eliminatórias", [
    excerpt(
      "inscricao",
      "coliseu",
      "Confirmar a equipe e encerrar os convites",
      1790,
      1800,
    ),
  ]);
  for (let i = 0; i < 2; i++) {
    const rival = (s) => Object.keys(C.guilds).filter((g) => g !== s.guild)[i];
    quest(
      `fight${i}`,
      (i === 0 ? "Q-31 · As duas guildas adversárias" : "Q-32 · As duas guildas adversárias"),
      Object.entries({ A: [1812, 1824], B: [1833, 1841], C: [1850, 1858] })
        .filter(([g]) => (i === 0 ? g !== "C" : g !== "A"))
        .map(([g, range]) =>
          excerpt(
            `chamada-${g}`,
            "coliseu",
            "Conversar com a guilda adversária",
            ...range,
            {
              when: (s) => rival(s) === g,
              battle: `t${i}`,
              background: "bg-coliseu-arena",
            },
          ),
        ),
      "fight",
      { index: i },
    );
    quest(
      `after${i}`,
      "Resultado da partida",
      [
        step(
          "resultado",
          "coliseu",
          "Ouvir o resultado",
          [
            page((s) => {
              const ranges = {
                A: [1825, 1828],
                B: [1842, 1845],
                C: [1859, 1862],
              };
              return [
                ...read(...ranges[rival(s)]).flatMap((p) => resolve(p.body, s)),
                d(
                  "Rask",
                  "Resultado confirmado! A equipe de Ghork avança!",
                  "feliz",
                ),
              ];
            }),
          ],
          { background: "bg-coliseu-arena" },
        ),
      ],
      "victory",
    );
  }
  quest(
    "fight2",
    "Q-33 · A equipe que seguiu sem você",
    [
      step(
        "chamada",
        "coliseu",
        "Ouvir a chamada das quartas",
        [
          page((s) => [
            d(
              "Rask",
              (s.xy === "X" ? "Quartas de final! A equipe de Ghork enfrenta os Faíscas, com apoio de uma guilda adversária!" : "Quartas de final! A equipe de Ghork enfrenta os Esteios, com apoio de uma guilda adversária!"), "neutro",
            ),
          ]),
        ],
        { background: "bg-coliseu-arena" },
      ),
      excerpt("zagra", "coliseu", "Responder a Zagra", 1882, 1894, {
        when: (s) => s.xy === "X",
        automatic: true,
        battle: "t2",
        background: "bg-coliseu-arena",
      }),
      excerpt("darvek", "coliseu", "Responder a Darvek", 1895, 1906, {
        when: (s) => s.xy === "Y",
        automatic: true,
        battle: "t2",
        background: "bg-coliseu-arena",
      }),
    ],
    "fight",
    { index: 2 },
  );
  quest(
    "after2",
    "Resultado das quartas",
    [
      step("resultado", "coliseu", "Reconhecer o esforço dos adversários", [
        page((s) => [
          d(
            s.xy === "X" ? "Zagra" : "Darvek",
            s.xy === "X"
              ? "Você passou. Não foi fácil, hein?"
              : "Você venceu. Vou cuidar da volta do meu pessoal.",
            "neutro",
          ),
          d(
            "Ghork",
            s.xy === "X"
              ? "Não foi mesmo. Vou lembrar dessa luta por um tempo."
              : "Boa viagem. E obrigado pela luta.",
            (s.xy === "X" ? "feliz" : "neutro"),
          ),
        ]),
      ]),
    ],
    "victory",
  );
  quest(
    "fight3",
    "Q-34 · Conhecidos do outro lado da arena",
    [
      step(
        "semifinal",
        "coliseu",
        "Encontrar os cinco adversários",
        [
          ...read(1923, 1927),
          page((s) =>
            s.opponents.map((name, i) => {
              const reaction = s.recruits[i].outcome
                ? s.recruits[i].name === name ? 2 : 3
                : s.metCandidates.includes(name) ? 1 : 0;
              return d(name, C.semifinalLines[name][reaction], C.semifinalExpressions[name][reaction]);
            }),
          ),
          ...read(1944, 1947),
        ],
        { battle: "t3", background: "bg-coliseu-arena" },
      ),
    ],
    "fight",
    { index: 3 },
  );
  quest(
    "after3",
    "Resultado da semifinal",
    [
      step("resultado", "coliseu", "Ouvir a chamada para a final", [
        page([
          d("Rask", "A equipe de Ghork está na final!", "feliz"),
          d(
            "Ghork",
            "Que luta. Foi bom encontrar vocês de novo. Melhor ainda ganhar.",
            "feliz",
          ),
        ]),
      ]),
    ],
    "victory",
  );
  quest("uv", "Q-35 · Antes da final", [
    step("visita", "coliseu", "Escolher com quem conversar", [
      page(
        [n("Ainda dá tempo de uma conversa antes de chamarem Ghork para a final.")],
        [
          choice(
            "U · Conversar com o mentor",
            [d("Ghork", "Vou passar na sede antes da chamada.", "neutro")],
            { uv: "U" },
          ),
          choice(
            "V · Encontrar a equipe com Guedra",
            [
              d(
                "Ghork",
                "Vou encontrar o pessoal das minas no espaço de treino.",
                "neutro",
              ),
            ],
            { uv: "V" },
          ),
        ],
      ),
    ]),
    step(
      "mentor",
      home,
      "Conversar com o mentor",
      [
        page(
          mentor(
            "Volte inteiro dessa luta. Quero ver o que vai fazer com todos os dias que vêm depois dela.",
            "Então me conte. Como pretende enfrentar Torvak?",
            "A cidade inteira vai ver você na final. Mostre o que nosso trabalho produziu.", { A: "neutro", B: "neutro", C: "neutro" },
          ),
        ),
        page([
          d(
            "Ghork",
            "Quando cheguei, eu pensei... é só ganhar um título, e vão parar de olhar para mim como se eu não servisse para nada.",
            "triste",
          ),
        ]),
        page(
          mentor(
            "Talvez alguns nunca enxerguem você como gostaria. Mesmo com esse título.",
            "Torvak tem esse título há anos. Não foi o bastante para ele parar de cobrar reverência dos outros, foi?",
            "Podem aceitar o resultado. Isso não significa que todos vão aceitar você.", { A: "neutro", B: "neutro", C: "neutro" },
          ),
        ),
        ...read(1982, 1985),
        page(
          mentor(
            "Está bem. Vá, então. Eu cuido dos nossos.",
            "Então vá. Não precisa parar para pedir minha aprovação a cada passo.",
            "Lembre do que acabou de dizer. Vai precisar sustentar essa posição fora da arena também.", { A: "feliz", B: "feliz", C: "neutro" },
          ),
        ),
      ],
      { when: (s) => s.flags.uv === "U" },
    ),
    step(
      "equipe",
      "treino",
      "Encontrar a equipe das minas",
      [
        ...read(1992, 2006),
        page((s) => [
          d(
            s.xy === "X" ? "Darvek" : "Zagra",
            s.xy === "X"
              ? "Está bem. Agora vá se preparar para a luta."
              : "Ótimo. Então me prometa uma boa luta.",
            (s.xy === "X" ? "neutro" : "feliz"),
          ),
          d("Guedra", "Primeiro, a base. Depois vá quando chamarem.", "neutro"),
        ]),
      ],
      { when: (s) => s.flags.uv === "V" },
    ),
  ]);
  quest(
    "fight4",
    "Q-35 · O nome de Ghork",
    [
      excerpt("final", "coliseu", "Enfrentar Torvak", 2014, 2029, {
        battle: "t4",
        background: "bg-coliseu-arena",
      }),
    ],
    "fight",
    { index: 4 },
  );
  quest(
    "after4",
    "Campeão de Terminus",
    [
      step(
        "titulo",
        "coliseu",
        "Ouvir o anúncio",
        [
          page((s) => [
            d(
              "Rask",
              s.recruits.some((r) => r.invited)
                ? "Ghork e sua equipe vencem o campeonato!"
                : "Ghork vence o campeonato!",
              "feliz",
            ),
          ]),
        ],
        { background: "bg-coliseu-arena" },
      ),
    ],
    "victory",
  );
  quest("celebration", "Celebrar a vitória", [
    step(
      "celebracao",
      "coliseu",
      "Comemorar antes de deixar a arena",
      [
        ...read(2041, 2051),
        page((s) =>
          s.recruits
            .filter((r) => r.invited)
            .map((r) => d(r.name, C.celebrationLines[r.name], C.celebrationExpressions[r.name])),
        ),
        page([
          n(
            "Parte da torcida grita o nome de Ghork até a voz falhar. Outros ainda aplaudem o antigo campeão. Ghork fica mais um pouco na arena, ouvindo os dois lados.",
          ),
        ]),
      ],
      { background: "bg-coliseu-arena" },
    ),
  ]);
  quest("invasion", "Q-36 · As portas da festa", [
    step(
      "tomada",
      "coliseu",
      "Enfrentar a tomada da arena",
      [
        page([
          n(
            "Homens armados saem do meio das equipes de serviço e se espalham pelas saídas.",
          ),
        ]),
        ...read(2067, 2073),
        page([
          n(
            "Os invasores arrastam espectadores para perto das cargas. Entre eles está um companheiro da própria guilda de Torvak.",
          ),
        ]),
        ...read(2077, 2085),
        page([
          n(
            "Torvak se volta contra os invasores e luta para abrir uma saída. O fornecedor abandona o disfarce. Savel é Neral, e os atacantes obedecem às suas ordens.",
          ),
          d(
            "Neral",
            "Continuem levando os capturados. Quem chegar ao corredor fica por minha conta.",
            "neutro",
          ),
        ]),
        ...read(2093, 2112),
      ],
      { background: "bg-coliseu-arena" },
    ),
  ]);
  quest(
    "fight5",
    "Q-36 · O fornecedor",
    [
      step(
        "neral",
        "coliseu",
        "Alcançar Neral no corredor de serviço",
        [
          ...read(2116, 2125),
          page([
            n(
              "Neral usa sangue para erguer uma proteção ritual. Ghork pressiona a defesa. O alquimista bebe os concentrados, e seu corpo incha e se deforma. Os golpes ficam mais fortes, mas ele perde a precisão.",
            ),
            d("Neral", "Eu criei essas fórmulas. Conheço as doses!", "raiva", {
              pose: "transformado",
            }),
            d("Ghork", "Então sabe o que está engolindo.", "neutro"),
            d("Neral", "Sei o que elas me permitem fazer.", "raiva", {
              pose: "transformado",
            }),
          ]),
        ],
        { battle: "t5", background: "bg-coliseu-servico", transform: true },
      ),
    ],
    "fight",
    { index: 5 },
  );
  quest(
    "after5",
    "Os registros nas caixas",
    [
      step(
        "queda",
        "coliseu",
        "Derrotar o comandante local",
        [
          ...read(2139, 2143).map((pg) => ({
            ...pg,
            body: (s) =>
              resolve(pg.body, s).map((p) =>
                p.speaker === "Neral" ? { ...p, pose: "transformado" } : p,
              ),
          })),
          page([
            n(
              "Neral morre antes de dizer um nome. O selo continua intacto. Nos outros setores da arena, os últimos espectadores são retirados em segurança e os capturados são libertados.",
            ),
          ]),
        ],
        { background: "bg-coliseu-servico", receive: ["correspondencia"] },
      ),
      step(
        "registros",
        "coliseu",
        "Entregar os registros a Seldan",
        [
          ...read(2151, 2153),
          page([
            n(
              "Nosso contato no Conselho de Daratrine confirmou o recebimento da remessa anterior. Enviem as próximas instruções por este meio. Não incluam nomes.",
            ),
          ]),
          ...read(2159, 2163),
        ],
        {
          deliver: [deliver("correspondencia", "Seldan")],
          receive: ["copia-correspondencia"],
          background: "bg-coliseu-servico",
        },
      ),
    ],
    "victory",
  );
  quest("ending", "E07 · Tanta coisa para contar", [
    excerpt("responsabilidade", "coliseu", "Ouvir Torvak", 2174, 2185),
    step("noticias", home, "Dar notícias a Lala", [
      ...read(2191, 2211),
      page((s) =>
        read(
          s.flags.dam === "help" ? 2212 : 2220,
          s.flags.dam === "help" ? 2216 : 2224,
        ).flatMap((p) => resolve(p.body, s)),
      ),
      ...read(2228, 2236),
    ]),
    excerpt("coreto", "coreto", "Encerrar a Noite da História", 2240, 2248, {
      automatic: true,
    }),
  ]);
  for (const id of ["side1", "side2", "side3", "coreto"]) {
    const q = C.quests[id];
    const loc = {
      side1: "estalagem",
      side2: "oficina",
      side3: "coliseu",
      coreto: "coreto",
    }[id];
    quest(id, q.title, [step("conversa", loc, q.title, q.pages)], q.kind);
  }
  C.semifinalLines = {
    Brakka: [
      "Brakka. Trabalho o dia todo, luto quando dá. Estava esperando por esta chance.",
      "Ainda não acertamos o uso daquele pátio, hein? Pelo menos achamos um lugar para lutar.",
      "Aquele espaço de treino que você ajudou a garantir? Ainda estamos usando. Entrei nesta equipe para o campeonato. Vamos ver se o treino valeu!",
      "As entregas ficaram com o pátio. Arranjamos outro apoio para o treino. Deu certo o bastante para chegarmos até aqui!",
    ],
    Nima: [
      "Nima. Fazemos entregas pela cidade inteira. Hoje, o pessoal veio lutar.",
      "Ainda não acertamos o turno do pátio. Pelo menos ninguém mudou o horário desta partida.",
      "As entregas estão em dia. Para o campeonato, me inscrevi com este grupo. Estamos prontos quando você estiver.",
      "Você deixou o pátio para o treino. Eu consegui outro apoio para os entregadores. Continuamos aqui.",
    ],
    Sura: [
      "Sura. Se ouviu dizer que sou curandeira, é verdade. Mas não é só isso que sei fazer.",
      "Ainda precisamos resolver como tratar o caso dos feridos. Uma vitória aqui não vai decidir isso por nós.",
      "Não esqueci como você protegeu o sigilo dos pacientes. Sou grata. E também vou dar o melhor de mim por esta equipe.",
      "Você escolheu os depoimentos públicos. Continuei atendendo os feridos, e minha equipe continuou treinando. Estamos prontos para enfrentar vocês.",
    ],
    Edrin: [
      "Edrin. Vou poupar tempo na apresentação. Imagino que a luta dure mais.",
      "Aqueles registros ainda precisam ser conferidos. Aqui, pelo menos, está claro o que disputamos: uma vaga na final.",
      "Você deu apoio às testemunhas. Eu respeito isso. Estar na equipe adversária não muda nada.",
      "Ainda acho que aquelas testemunhas deviam ser ouvidas em público. Sura fez um bom trabalho. Agora vamos ver quem fica com a vaga na final.",
    ],
    Korr: [
      "Korr. Se ouvir um rangido, deve ser minha proteção. Já testei. Pode acreditar.",
      "A armação ainda espera uma decisão. Eu não esperei para treinar.",
      "Lembra daquele material? Aproveitei bem. Agora vou descobrir se a proteção aguenta uma luta contra você.",
      "Você preservou a armação. Eu encontrei outros materiais e uma equipe para lutar comigo. Venha ver o que montamos.",
    ],
    Velka: [
      "Velka. Observe meus pés. Vai ter mais chance de acompanhar o movimento.",
      "A armação pode esperar até depois da partida. Espero que esteja pronto.",
      "Estamos usando a armação nas aulas. Obrigada. Agora, espero que não se importe se eu tentar vencer você.",
      "Deram uso ao material. Continuei as aulas com o que restou. Hoje você vai ver o que aprendemos.",
    ],
    Tessa: [
      "Tessa. Tem gente contando comigo. Imagino que com você também.",
      "Os pagamentos da cisterna ainda precisam ser acertados. Por enquanto, esta equipe está contando comigo.",
      "Você ficou ao lado dos trabalhadores. Obrigada por isso. Hoje, minha equipe precisa de mim deste lado da arena.",
      "Eu sei que o pagamento estava garantido. Ainda prefiro ver o dinheiro antes de entregar o serviço. Podemos discordar e fazer uma boa luta.",
    ],
    Mavren: [
      "Mavren. Espero que uma vitória aqui me deixe escolher o próximo serviço, para variar.",
      "Nosso acordo ainda não foi fechado. Mas esta equipe está contando comigo, e eu vim fazer minha parte.",
      "Conferimos aquela garantia juntos. Eu lembro. Nem por isso posso pegar leve agora.",
      "Você apoiou a suspensão do serviço. Eu arranjei outro trabalho e um lugar nesta equipe. Precisava seguir em frente.",
    ],
    Odrik: [
      "Odrik. Tente guardar os aplausos para depois.",
      "Nossa apresentação ainda espera uma vaga. Mas esta entrada? Deu tempo de ensaiar.",
      "Aquela exibição valeu todo o trabalho. Mas aviso: hoje ninguém combinou quem vai cair.",
      "Arranjei outro grupo para o espetáculo. Achou que eu ia perder minha chance de entrar na arena?",
    ],
    Lethra: [
      "Lethra. Meus alunos estão assistindo. Vão julgar minha base antes de reparar na sua.",
      "Ainda temos uma conversa para terminar sobre a vaga da apresentação. Depois da semifinal.",
      "Você garantiu um lugar para os aprendizes. Obrigada. Agora quero conquistar minha própria vaga na final.",
      "O espetáculo ficou com a vaga. Continuei procurando espaço para os alunos praticarem. Meu treino também não parou.",
    ],
  };
  C.semifinalExpressions = {
  "Brakka": [
    "feliz",
    "feliz",
    "feliz",
    "feliz"
  ],
  "Nima": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Sura": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Edrin": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Korr": [
    "feliz",
    "neutro",
    "feliz",
    "neutro"
  ],
  "Velka": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Tessa": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Mavren": [
    "neutro",
    "neutro",
    "neutro",
    "neutro"
  ],
  "Odrik": [
    "feliz",
    "feliz",
    "feliz",
    "feliz"
  ],
  "Lethra": [
    "feliz",
    "neutro",
    "feliz",
    "neutro"
  ]
};
  C.celebrationLines = {
    Brakka: "Ah, o pessoal do próximo turno vai ouvir essa história.",
    Nima: "Está todo mundo aqui? Ótimo. Agora podemos comemorar!",
    Sura: "Fique quieto um instante. Deixe eu ver esse braço... depois você me puxa para a comemoração.",
    Edrin: "Este resultado eu vou registrar com gosto.",
    Korr: "A proteção aguentou! Eu também. Por pouco.",
    Velka: "Aquele último movimento... quero lembrar exatamente como foi.",
    Tessa: "Quero só ver quando contarmos a todo mundo como foi.",
    Mavren: "Esse é um trabalho que eu faço questão de anunciar!",
    Odrik: "Eu tinha um discurso. Dos bons! Não lembro uma palavra. Nós ganhamos!",
    Lethra: "Meus alunos viram tudo. Vou ouvir falar dessa luta por um bom tempo!",
  };
  C.celebrationExpressions = {
  "Brakka": "feliz",
  "Nima": "feliz",
  "Sura": "feliz",
  "Edrin": "feliz",
  "Korr": "feliz",
  "Velka": "feliz",
  "Tessa": "feliz",
  "Mavren": "feliz",
  "Odrik": "feliz",
  "Lethra": "feliz"
};
  C.items = {
    "lista-patio": "Lista conferida do pátio",
    "etiquetas-patio": "Etiquetas dos volumes do despacho",
    "registro-retirada": "Cópia anônima do registro de retirada",
    "apontamentos-a": "Apontamentos de Elune para Virmura",
    "pedido-maca": "Pedido de empréstimo de material",
    maca: "Maca e suportes de demonstração",
    "recibo-maca": "Recibo do conjunto emprestado",
    "lista-virmura": "Lista de Virmura",
    "bolsa-materiais": "Bolsa de ataduras e material de lavagem",
    "registro-carga": "Cópia autorizada de Pirka",
    "apontamentos-b": "Apontamentos de Elune para Borun",
    fardo: "Fardo de cordas e estacas",
    "recibo-fardo": "Recibo da carga recuperada",
    ataduras: "Pacote de ataduras",
    "recibo-ataduras": "Confirmação de Rask",
    procedimento: "Cópia do procedimento",
    "apontamentos-c": "Procedimento revisado por Elune",
    estojo: "Estojo de treino restituído",
    apoios: "Apoios de retirada",
    "carga-leve": "Carga leve e marcadores",
    levantamento: "Levantamento das galerias",
    "recibo-dam": "Cópia do registro da contribuição a Dam",
    "autorizacao-r2": "Autorização para conferir a peça",
    "relato-anonimo": "Cópia anônima do relato",
    "peca-avariada": "Peça de treino avariada",
    "nota-condicao": "Nota de condição de Durn",
    "autorizacao-armacao": "Autorização de apresentação da armação",
    "contas-cisterna": "Cópia dos valores devidos",
    deposito: "Comprovante de depósito",
    "chave-cisterna": "Chave da cisterna",
    programa: "Programa da apresentação",
    correspondencia: "Correspondência do fornecedor",
    "copia-correspondencia": "Cópia da correspondência preservada",
  };
  for (const g of "ABC") {
    const q = C.quests[`commit${g}`];
    q.pages
      .findLast((p) => p.choices.length)
      .choices.push(
        choice(
          "Pedir a Rheed que deixem Ghork terminar · 1 Ludo",
          (s) => [
            d(
              "Criança",
              "Mas ele não terminou! Não podem deixar ele falar o resto antes de ficar bravos?",
              "confuso",
            ),
            d(
              "Rheed",
              "Poderiam... Meruna tinha um sininho para reuniões assim. Que descuido o meu deixar de fora. Uma reunião sem sino! Não admira que ninguém consiga se ouvir.",
              "feliz",
            ),
            d("Meruna", "Um de cada vez, por favor. Ghork, termine o que estava dizendo.", "neutro"),
            d(
              "Ghork",
              "Vou trabalhar com a guilda que escolhi. Isso não apaga o que fizeram por mim. Mas não posso agradecer prometendo parte de um contrato que não posso dividir.",
              "neutro",
            ),
            d(
              s.guild === "A" ? "Borun" : "Virmura",
              s.guild === "A"
                ? "Está bem. Você foi claro. Quando vier o próximo contrato, porém, sua guilda e a minha vão disputar o mesmo trabalho."
                : "Eu ouvi. Agora me escute: minha equipe ainda precisa de trabalho. Vou procurar, mesmo que isso nos coloque no seu caminho.",
              "neutro",
            ),
          ],
          { meetingIntervention: true },
          1,
        ),
      );
  }
  C.quests.classify.pages
    .filter(
      (p) => p.choices.length && C.quests.classify.steps[p.step].id === "dose",
    )
    .at(-1)
    .choices.push(
      choice(
        "Pedir a Rheed uma testemunha do acordo dos treinos · 1 Ludo",
        [
          d(
            "Criança",
            "Espera. Não tinha mais ninguém perto quando o Rask prometeu aqueles horários?",
            "confuso",
          ),
          d(
            "Rheed",
            "Por acaso, alguém tinha voltado para buscar uma coisa esquecida. E ficou um instante ouvindo. Sorte não estar com pressa, não é?",
            "feliz",
          ),
          d(
            "Guedra",
            "Eu ouvi o Rask liberar aqueles treinos para vocês. O combinado existiu.",
            "neutro",
          ),
          d(
            "Torvak",
            "Ninguém disse que não. Eu mandei mudar.",
            "raiva",
          ),
          d(
            "Ghork",
            "Ótimo. Então ninguém vai usar a desculpa de que entendemos errado.",
            "raiva",
          ),
        ],
        { scheduleWitness: true },
        1,
      ),
    );
  C.quests.celebration.pages
    .find((p) => p.choices.length)
    .choices.push(
      choice(
        "Pedir a Rheed um momento para Ghork falar · 1 Ludo",
        (s) => [
          d(
            "Criança",
            "Rask podia deixar ele falar um pouquinho?",
            "feliz",
          ),
          d(
            "Rheed",
            "E, por uma vez, Rask deixou o próximo anúncio para depois. A palavra era de outra pessoa.",
            "feliz",
          ),
          d("Rask", "Nosso campeão quer dizer uma coisa!", "feliz"),
          d(
            "Ghork",
            s.recruits.some((r) => r.invited)
              ? "Conseguimos! E vocês vão ouvir o nome de cada pessoa que lutou comigo."
              : "Entrei na arena sozinho. Mas, desde que cheguei, muita gente me ajudou. Alguns até fizeram bastante esforço para ganhar de mim hoje.",
            "feliz",
          ),
          ...s.recruits
            .filter((r) => r.invited)
            .map((r) => d("Rask", r.name + "!", "feliz")),
          d("Ghork", "Então... obrigado. E eu vou aproveitar esse título.", "feliz"),
        ],
        { victorySpeech: true },
        1,
      ),
    );
  C.recruitmentDialogue = {
    blocks: [
      {
        speaker: "Nyra",
        blocked:
          "Precisei usar o pátio para pôr os preparativos em dia. Não posso liberar esse turno agora.",
        accepted:
          "Levaram os preparativos para o próprio depósito. Aquele turno no pátio está livre de novo. Vamos ouvir as duas propostas.", acceptedExpression: "neutro",
      },
      {
        speaker: "Sura",
        blocked:
          "Precisamos de toda a equipe no atendimento. Não sobra ninguém para acompanhar a conferência e apresentar os relatos.",
        accepted:
          "Conseguimos quem cuide dos pacientes enquanto acompanhamos a conferência. Isso nos dá tempo. Não muda o que eles autorizaram compartilhar.", acceptedExpression: "neutro",
      },
      {
        speaker: "Durn",
        blocked:
          "A armação está reservada para os preparativos. Não posso prometer a mesma peça para dois serviços.",
        accepted:
          "Quem tinha reservado a armação encontrou outro conjunto. Podemos voltar a decidir o que fazer com esta.", acceptedExpression: "neutro",
      },
      {
        speaker: "Tessa",
        blocked:
          "Alguns dos envolvidos não conseguem vir à reunião. Não vou decidir por eles.",
        accepted:
          "Reorganizamos os turnos e reunimos os envolvidos. Agora podemos ouvir as duas propostas com atenção.", acceptedExpression: "neutro",
      },
      {
        speaker: "Rask",
        blocked:
          "Os treinos remarcados ocuparam a vaga da apresentação. Não tenho outro intervalo agora.",
        accepted:
          "Terminamos de ajustar os treinos mais cedo. Afinal, sobrou tempo para uma apresentação. Vamos ouvir as duas propostas.", acceptedExpression: "neutro",
      },
    ],
    candidates: {
      Brakka: {
        blocked:
          "Tenho um turno de trabalhadores para acompanhar. Não posso dizer a eles que vou estar lá e prometer o mesmo a você.",
        accepted: "Assumiram meu turno. Posso ir com você.", acceptedExpression: "feliz",
      },
      Nima: {
        blocked:
          "Um turno de entregas ficou sem responsável. Estou cobrindo até resolvermos.",
        accepted: "O turno está coberto. Conte comigo.", acceptedExpression: "feliz",
      },
      Sura: {
        blocked:
          "Os pacientes precisam de mim aqui. Se conseguirmos alguém para cobrir meu lugar, posso entrar na equipe.",
        accepted: "Os pacientes já têm quem cuide deles. Agora posso ir com você.", acceptedExpression: "feliz",
      },
      Edrin: {
        blocked:
          "Já marquei a conferência dos registros. É no mesmo horário da preparação da equipe.",
        accepted: "Dividimos a conferência dos registros. Estou livre para entrar na equipe.", acceptedExpression: "neutro",
      },
      Korr: {
        blocked:
          "Tenho proteções para terminar e entregar. Não posso deixar pela metade.",
        accepted:
          "A oficina dividiu o acabamento. Posso ir sem atrasar a entrega.", acceptedExpression: "feliz",
      },
      Velka: {
        blocked: "Prometi acompanhar uma prática. Não tenho quem assuma meu lugar.",
        accepted:
          "Outra pessoa vai conduzir os exercícios. Posso entrar na equipe.", acceptedExpression: "neutro",
      },
      Tessa: {
        blocked:
          "Me escolheram para representar o grupo na negociação. Preciso estar lá.",
        accepted:
          "Os outros representantes vão dividir as reuniões. Posso lutar com você.", acceptedExpression: "neutro",
      },
      Mavren: {
        blocked:
          "Esta etapa da obra é responsabilidade minha. Alguém precisa assumir antes de eu sair.",
        accepted: "Outra pessoa assumiu esta etapa do serviço. Agora posso aceitar.", acceptedExpression: "feliz",
      },
      Odrik: {
        blocked:
          "Já estou preparando outro espetáculo. Queria dizer sim, mas não consigo prometer os dois.",
        accepted:
          "Dividimos os preparativos do espetáculo. Estou livre para lutar com você.", acceptedExpression: "feliz",
      },
      Lethra: {
        blocked:
          "Os aprendizes estão contando comigo na prática. Ainda não consegui quem assuma.",
        accepted: "Consegui quem acompanhe os aprendizes. Estou pronta para entrar na equipe.", acceptedExpression: "feliz",
      },
    },
    invitations: {
      Brakka:
        "Estou dentro. Está na hora de verem os trabalhadores lutando, em vez de carregar as coisas para a luta dos outros.",
      Nima: "Conte comigo. Dividimos os turnos das entregas. Posso lutar pelo grupo sem tentar fazer o trabalho de todo mundo.",
      Sura: "Você respeitou o que os pacientes queriam compartilhar. Posso confiar que vai me ouvir também. Conte comigo.",
      Edrin:
        "Você conferiu o relato antes de agir. É bom ter alguém com esse cuidado ao meu lado na arena.",
      Korr: "Estou dentro. Já passou da hora de testar essas proteções numa luta de verdade.",
      Velka:
        "Sim. Deixei alguém cuidando da prática. Está na hora de usar a técnica na arena.",
      Tessa:
        "Vamos. Os outros representantes continuam a negociação. Eu levo nossa luta para a arena.",
      Mavren:
        "Vou. Para variar, quero escolher o próximo serviço, em vez de aceitar só para pagar as dívidas do anterior.",
      Odrik:
        "Com prazer. Num espetáculo, combinamos quem vai cair. Na semifinal? Vou fazer de tudo para continuar de pé.",
      Lethra:
        "Sim. A prática dos aprendizes está acertada. Eu também quero fazer minha luta.",
    },
  };
  C.invitationExpressions = {
  "Brakka": "feliz",
  "Nima": "feliz",
  "Sura": "feliz",
  "Edrin": "neutro",
  "Korr": "feliz",
  "Velka": "neutro",
  "Tessa": "feliz",
  "Mavren": "feliz",
  "Odrik": "feliz",
  "Lethra": "feliz"
};
  C.recruitPlaces = ["estalagem", "virmura", "oficina", "cisterna", "coliseu"];
  for (let i = 0; i < 5; i++) {
    quest(
      "invite" + i,
      "Convite para a equipe",
      [
        step("convite", C.recruitPlaces[i], "Combinar a participação", [
          page((s) => [
            d(
              "Ghork",
              "Quero você na minha equipe para o campeonato. O que me diz?",
              "feliz",
            ),
            d(
              s.recruits[i].name,
              C.recruitmentDialogue.invitations[s.recruits[i].name],
              C.invitationExpressions[s.recruits[i].name],
            ),
          ]),
        ]),
      ],
      "conversation",
    );
    quest(
      "unlock" + i,
      "Uma ajuda que Rheed ainda não contou",
      [
        step("cobertura", C.recruitPlaces[i], "Ouvir como conseguiram dividir o serviço", [
          page((s) => [
            d(
              "Rheed",
              "Por acaso, justamente naquele dia, apareceu alguém com tempo para dividir o serviço. Acertaram as tarefas antes de começar outra discussão. Uma coincidência e tanto, não acha?",
              "feliz",
            ),
            d(
              s.recruits[i].outcome
                ? s.recruits[i].name
                : C.recruitmentDialogue.blocks[i].speaker,
              s.recruits[i].outcome
                ? C.recruitmentDialogue.candidates[s.recruits[i].name].accepted
                : C.recruitmentDialogue.blocks[i].accepted,
              s.recruits[i].outcome
                ? C.recruitmentDialogue.candidates[s.recruits[i].name].acceptedExpression
                : C.recruitmentDialogue.blocks[i].acceptedExpression,
            ),
          ]),
        ]),
      ],
      "conversation",
    );
  }
  for (const id of ["B4", "C4", "t0", "t1", "t2", "t3", "t4", "t5"]) {
    const body =
      id === "B4"
        ? [
            d(
              "Borun",
              "Fecharam os dois lados. Na próxima, precisamos deixar uma saída livre.",
              "neutro",
            ),
            d(
              "Ghork",
              "Vou recuperar o fardo. Só... deixe eu recuperar o fôlego primeiro.",
              "neutro",
            ),
          ]
        : id === "C4"
          ? [
              d(
                "Rask",
                "Esta tentativa acabou. O estojo já foi devolvido. Você pode tentar o desafio de novo.",
                "neutro",
              ),
              d("Ghork", "Essa eu perdi. Vou voltar.", "neutro"),
            ]
          : id === "t5"
            ? [
                n(
                  "Ghork é forçado a recuar para uma reentrância do corredor. Mais adiante, os outros continuam retirando o público.",
                ),
                d("Ghork", "Ainda não consigo passar.", "neutro"),
                d("Borun", "Recue por aqui! A saída ainda está livre.", "neutro"),
              ]
            : [
                d(
                  "Rask",
                  "A equipe adversária vence esta luta. Vocês podem pedir revanche. Falem comigo quando estiverem prontos.",
                  "neutro",
                ),
                d("Ghork", "Preciso de um tempo para me preparar. Vou voltar.", "neutro"),
              ];
    quest(
      `setback-${id}`,
      "Recuperar o fôlego",
      [
        step(
          "recuo",
          id === "B4" ? "borun" : "coliseu",
          "Preparar a revanche gratuita",
          [page(body)],
          { background: id === "t5" ? "bg-coliseu-servico" : undefined },
        ),
      ],
      "setback",
    );
  }
  C.places = places;
  C.home = home;
  C.resolve = resolve;
  root.TerminusContent = C;
  if (typeof module !== "undefined") module.exports = C;
})(globalThis);
