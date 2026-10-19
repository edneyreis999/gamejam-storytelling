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
  const d = (speaker, text, expression = "atento", extra = {}) => ({
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
  function speeches(parts, s) {
    return parts
      .filter(
        (p) =>
          p.text && (!conditions[p.condition] || conditions[p.condition](s, p)),
      )
      .map((p) => d(p.speaker, p.text, "atento"));
  }
  function read(from, to) {
    const pages = [];
    let body = [],
      choices = [],
      question = false;
    const flush = () => {
      const bodySnapshot = body.slice();
      if (body.length || choices.length)
        pages.push({
          body: (s) => speeches(bodySnapshot, s),
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
            d(record.speaker, record.choice, "investigativo"),
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
  const mentor = (a, b, c) => (s) => [
    d(C.guilds[s.guild].mentor, { A: a, B: b, C: c }[s.guild], "firme"),
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
  const evidence = [
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
        "Este croqui começa na entrada da passagem estreita e segue até a bifurcação. O outro acompanha a retirada, no sentido inverso.",
        "investigativo",
      ),
      d(
        "Ghork",
        "Então a esquerda de quem entra fica à direita de quem volta. Que registro confirma isso?",
        "investigativo",
      ),
      d(
        "Elune",
        "Os registros autorizados indicam onde cada percurso começou e para onde seguia. Vamos acompanhar as referências nessa ordem.",
        "firme",
      ),
      d(
        "Ghork",
        "Entrada, passagem estreita, bifurcação. Na volta, bifurcação, passagem, entrada. O trecho coincide.",
        "firme",
      ),
      d(
        "Elune",
        "Esse trecho. As outras galerias continuam sem informação suficiente. Vou marcar a comparação e deixar o restante em aberto.",
        "atento",
      ),
    ]),
  ];
  quest(
    "intro",
    "E00 · Uma cadeira perto da história",
    [
      step("cadeira", "coreto", "Ouvir Rheed", read(117, 127)),
      step(
        "socorro",
        "virmura",
        "O socorro",
        [
          page([
            n(
              "Rheed bebe. O som da plateia cede à respiração de Ghork.",
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
              "Os cuidados continuam. Com o tempo, Ghork passa a tolerar pequenos deslocamentos.",
            ),
            d(
              "Virmura",
              "Tenho duas entregas curtas, uma no mercado e outra no coliseu. Pode escolher por qual começar. Se precisar parar, pare.",
              "firme",
            ),
          ]),
        ],
        { automatic: true },
      ),
    ],
    "guild",
    { guild: "A", step: 1 },
  );
  quest("E01", "E01 · O mesmo problema sobre a mesa", [
    excerpt(
      "contrato",
      "contratos",
      "Conhecer o contrato das galerias",
      153,
      174,
    ),
  ]);
  quest("champion", "E02 · Um nome anterior ao cartaz", [
    excerpt("passado", "virmura", "Conversar sobre o campeão", 182, 194),
    excerpt("torvak", "coliseu", "Conhecer Torvak", 198, 217),
  ]);
  quest("E03", "E03 · Uma oferta para o corpo acompanhar", [
    excerpt("oferta", "coliseu", "Ouvir a oferta de Savel", 226, 243),
  ]);
  quest("E08", "E08 · Aprender a sair do golpe", [
    excerpt("cuidado", "virmura", "Rever os cuidados", 254, 258),
    step("pratica", "treino", "Preparar movimentos e recuo", [
      page([
        n(
          "Guedra acompanha práticas curtas. Entre as tentativas, Ghork aprende a preservar uma passagem de recuo.",
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
        "Consultar e receber a cópia anônima",
        344,
        354,
        { receive: ["registro-retirada"], background: "bg-virmura-enfermaria" },
      ),
      step(
        "elune",
        "contratos",
        "Entregar a cópia a Elune",
        [...read(357, 362), ...evidence],
        {
          deliver: [deliver("registro-retirada", "Elune")],
          receive: ["apontamentos-a"],
          evidence: true,
        },
      ),
      excerpt(
        "retorno",
        "virmura",
        "Entregar os apontamentos a Virmura",
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
    "Q-A3 · Quem fica sem atendimento",
    [
      step("escala", "virmura", "Preparar a escala e receber o pedido", a3, {
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
      excerpt("teste", "virmura", "Testar a passagem com a equipe", 422, 440, {
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
        "Receber a lista de Virmura",
        "Virmura entrega a lista de ataduras e material de lavagem para buscar com Jorvi.",
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
        "Sair do corredor",
        [
          page([
            n(
              "Dois assaltantes fecham o corredor. Ghork protege a bolsa. Borun interpõe o bastão junto à descarga.",
            ),
          ]),
          ...read(493, 501),
          page([
            n(
              "Ghork empurra o carrinho, dificulta a perseguição e segue a passagem aberta por Borun.",
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
    "Q-B2 · A carga que chegou antes",
    [
      excerpt(
        "pirka",
        "mercado",
        "Investigar e receber a cópia de Pirka",
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
        [...read(569, 579), ...evidence],
        {
          deliver: [deliver("registro-carga", "Elune")],
          receive: ["apontamentos-b"],
          evidence: true,
        },
      ),
      excerpt(
        "retorno",
        "borun",
        "Entregar os apontamentos a Borun",
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
        "Cobrar a devolução no corredor",
        611,
        617,
        { battle: "B4" },
      ),
      excerpt(
        "recuperar",
        "mercado",
        "Recolher o fardo após a vitória",
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
        "Ghork recebe o pacote separado por Virmura. A entrega é para Rask, na entrada administrativa do coliseu.",
        { receive: ["ataduras"] },
      ),
      step("sevrak", "coliseu", "Intervir no treino", [
        page([n("Um veterano derruba repetidamente um iniciante.")]),
        ...read(686, 696),
        page([
          n(
            "O veterano tenta agredir Ghork. Sevrak intercepta o golpe e o desarma.",
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
        "Preparar a comparação para Elune",
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
    "Q-C3 · Uma cópia sem o mestre",
    [
      step(
        "elune",
        "contratos",
        "Entregar o procedimento a Elune",
        [...read(754, 772), ...evidence],
        {
          deliver: [deliver("procedimento", "Elune")],
          receive: ["apontamentos-c"],
          evidence: true,
        },
      ),
      textStep(
        "retorno",
        "sevrak",
        "Entregar a revisão a Sevrak",
        "Ghork entrega na escola a cópia revisada por Elune. O trecho comparado e os limites da conclusão permanecem registrados.",
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
      excerpt("noticia", "sevrak", "Ouvir o iniciante", 784, 790),
      excerpt(
        "restituicao",
        "coliseu",
        "Cobrar a restituição com Rask",
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
      step("retorno", "sevrak", "Devolver o estojo e revisar a ressalva", c4, {
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
          "Confirmar adesão e executar a estratégia",
          [
            ...read(880, 880),
            ...read(a, b),
            page([
              d(
                "Ghork",
                "O primeiro croqui acompanha a entrada até a bifurcação. O segundo registra a retirada no sentido inverso. Os pontos de partida e a direção estão nas fontes autorizadas.",
                "firme",
              ),
              d(
                "Meruna",
                "A comparação sustenta esse trecho. O restante continua como trabalho a realizar. O contrato fica com a guilda que você escolheu.",
                "firme",
              ),
            ]),
            ...read(929, 939),
            page(
              mentor(
                "Sua parte de remuneração será separada dos recursos da equipe. Primeiro combinaremos o trabalho que pode assumir.",
                "Vamos separar a sua parte da conta da guilda. Quero que saiba pelo que está trabalhando.",
                "Sua remuneração pessoal e a verba da investigação terão registros distintos. Começaremos pela preparação.",
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
      step("horarios", "coliseu", "Contestar o cancelamento", [
        page(
          mentor(
            "Nossa equipe recebeu esses horários. A quarta guilda não pode ocupar a preparação de todos porque tem um campeão.",
            "Rask, você nos deu a faixa de treino. Se a palavra só vale depois de Torvak aprovar, devia ter dito antes.",
            "Há um horário concedido à nossa escola. Qual regra permite que a quarta guilda o substitua pela própria preferência?",
          ),
        ),
        ...read(959, 959),
        page(
          mentor(
            "É abuso quando retira o que foi concedido aos outros.",
            "Quero o que foi combinado.",
            "Quero que responda à pergunta.",
          ),
        ),
        ...read(963, 963),
        page(
          mentor(
            "Não retiro.",
            "Não vou pedir desculpas por isso.",
            "Minha posição permanece.",
          ),
        ),
        ...read(967, 979),
        page(
          mentor(
            "Na sede. Sem cortar o descanso de ninguém.",
            "Vamos dividir o trabalho. Eu assumo os horários que prometi acompanhar.",
            "Adaptaremos os exercícios à escola. Começamos pelo espaço.",
          ),
        ),
      ]),
      step("reorganizacao", home, "Reorganizar a preparação", [
        page([
          n(
            "Na sede, Ghork ajuda a reorganizar os materiais leves e os horários.",
          ),
        ]),
        page(
          mentor(
            "O atendimento continua deste lado; a preparação fica do outro. Se os horários apertarem, me diga antes de tirar o descanso da conta.",
            "Aqui cabe menos gente. Dividi o acompanhamento e avisei Pirka. Dessa vez você não vai descobrir meu atraso olhando uma cadeira vazia.",
            "Mudei a sequência dos exercícios para este espaço. Quero que registre onde ela não funcionar. Não me serve um aluno que concorda e depois improvisa escondido.",
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
    "Q-X0 · Uma reserva de retorno",
    [excerpt("reserva", "oficina", "Conhecer o plano de Darvek", 1004, 1024)],
    "xyIntro",
    { route: "X" },
  );
  quest(
    "introY",
    "Q-Y0 · Levar menos",
    [excerpt("carga", "mercado", "Conhecer o plano de Zagra", 1032, 1050)],
    "xyIntro",
    { route: "Y" },
  );
  quest("alliance", "E06 · Um método para este trabalho", [
    step("escolha", "contratos", "Escolher X ou Y", [
      page(
        mentor(
          "Ouviu os dois. Quero saber o risco que aceita e como vai explicá-lo à equipe.",
          "Conte o que conferiu, não só quem gostou de ouvir.",
          "Escolha pelo trabalho que pretende realizar. Depois terá de responder pelo resultado.",
        ),
      ),
      page(
        [
          n(
            "O compromisso abre as duas missões da abordagem escolhida. A equipe preterida seguirá com outra guilda.",
          ),
        ],
        [
          choice(
            "Confirmar X · preparar reserva de retirada",
            joined(read(1066, 1072)),
            { routeChoice: "X" },
          ),
          choice(
            "Confirmar Y · reconhecimento limitado",
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
    excerpt("resposta-y", "contratos", "Responder a Darvek", 1090, 1094, {
      when: (s) => s.flags.routeChoice === "Y",
      automatic: true,
    }),
  ]);
  quest(
    "X1",
    "Q-X1 · Antes de entrar",
    [
      excerpt("apoios", "oficina", "Receber os apoios preparados", 1101, 1107, {
        receive: ["apoios"],
      }),
      excerpt(
        "ensaio",
        "minas",
        "Entregar os apoios e conferir a retirada",
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
        "Entregar a carga e conferir as marcações",
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
      `Q-${route}2 · Até o limite conferido`,
      [
        excerpt(
          "galeria",
          "minas",
          "Investigar as galerias e registrar o retorno",
          a,
          b,
          { background: "bg-minas-subsolo", receive: ["levantamento"] },
        ),
      ],
      "route",
      { route, step: 2 },
    );
  quest("classify", "Q-20 · O nome na lista", [
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
            "Contribuir usa remuneração pessoal e abre mão de uma sessão adicional. Guardar preserva essa preparação. Nenhuma opção exige Ludos ou altera o D20.",
          ),
        ],
        [
          choice(
            "Contribuir com o material de Dam",
            (s) => read(1262, 1267).flatMap((p) => resolve(p.body, s)),
            { dam: "help" },
          ),
          choice(
            "Guardar para a preparação",
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
      "Registrar a remessa com Jorvi e Pirka",
      1270,
      1275,
      { when: (s) => s.flags.dam === "help", receive: ["recibo-dam"] },
    ),
    excerpt("dorga", "contratos", "Ouvir a cobrança de Dorga", 1299, 1303),
    step("dose", "coliseu", "Encontrar Torvak e Savel", [
      page([
        n(
          "Um companheiro entrega uma dose a Torvak. Ele espera a mão firmar antes de cumprimentar o público. Savel recolhe o estojo.",
        ),
      ]),
      ...read(1307, 1321),
    ]),
    excerpt("preparo", "treino", "Preparar-se com Guedra", 1329, 1335),
    step("classificacao", "coliseu", "Confirmar a classificação", [
      ...read(1339, 1343),
      page(
        mentor(
          "Você chegou até aqui respeitando os limites do trabalho. Quero que continue me dizendo quando precisar de ajuda.",
          "Você consegue explicar como chegou até aqui. Não precisa esperar que eu conte por você.",
          "A escola terá o que mostrar nesta classificação. Quero que nossa preparação seja reconhecida.",
        ),
      ),
      ...read(1353, 1361),
    ]),
  ]);
  const outcomePage = (id, labels, ranges) =>
    page(
      [
        n(
          "Escolha o compromisso que vai assumir. Só uma das duas pessoas poderá ser convidada por esta missão.",
        ),
      ],
      labels.map((label, i) =>
        choice(
          label,
          (s) => [
            d("Ghork", label, "firme"),
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
    "R1 · Um pátio, dois turnos",
    [
      step(
        "inspecao",
        "estalagem",
        "Inspecionar o pátio",
        [
          ...read(1397, 1405),
          {
            ...page(
              [n("Ghork examina a passagem e o canto de armazenamento.")],
              [
                choice("Examinar a passagem", [
                  d(
                    "Nima",
                    "É por aqui que recebemos a carga. Tem que ficar livre.",
                    "firme",
                  ),
                ]),
                choice("Examinar o canto", [
                  d(
                    "Brakka",
                    "Aqui cabem os bancos. Mas, se lotar de caixas, ninguém consegue praticar.",
                    "atento",
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
        "Escolher o uso do turno",
        [
          outcomePage(
            "R1",
            ["Preparar treino · Brakka", "Organizar despacho · Nima"],
            [[[1423, 1427]], [[1437, 1441]]],
          ),
        ],
        { background: "bg-estalagem-patio" },
      ),
      textStep(
        "lista",
        "estalagem",
        "Receber e conferir a lista",
        "Ghork recebe a lista de Brakka e confere quem consegue vir. Os trabalhadores movem os bancos.",
        {
          when: (s) => s.flags.R1 === "A",
          receive: ["lista-patio"],
          background: "bg-estalagem-patio",
        },
      ),
      textStep(
        "etiquetas",
        "estalagem",
        "Receber etiquetas e conferir os volumes",
        "Nima entrega as etiquetas a Ghork. Eles identificam as caixas, separam as não reconhecidas e conferem os retornos.",
        {
          when: (s) => s.flags.R1 === "B",
          receive: ["etiquetas-patio", "lista-patio"],
          background: "bg-estalagem-patio",
        },
      ),
      textStep(
        "identificar",
        "estalagem",
        "Aplicar as etiquetas aos volumes",
        "Ghork fixa as etiquetas conferidas nas caixas do despacho.",
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
    "R2 · Os nomes no relato",
    [
      excerpt(
        "autorizacao",
        "virmura",
        "Obter autorização e relato anônimo",
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
        "Entregar autorização e buscar a peça",
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
        "Conferir o material e escolher a apresentação",
        [
          ...read(1515, 1523),
          outcomePage(
            "R2",
            [
              "Preparar relatório anônimo · Sura",
              "Preparar depoimentos voluntários · Edrin",
            ],
            [[], []],
          ),
        ],
        { requires: ["relato-anonimo", "nota-condicao"] },
      ),
      step(
        "apresentar",
        "contratos",
        "Entregar a apresentação a Seldan",
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
    "R3 · Uma peça inteira",
    [
      excerpt(
        "autorizacao",
        "oficina",
        "Receber autorização de apresentação",
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
        "Devolver a autorização e escolher o destino",
        [
          outcomePage(
            "R3",
            ["Reaproveitar · Korr", "Preservar · Velka"],
            [[[1598, 1605]], [[1608, 1615]]],
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
              [n("Os trabalhadores querem conferir o que pode ser cobrado.")],
              [
                choice("Ouvir quem quer reter a entrega", [
                  d(
                    "Trabalhador",
                    "Se entregar antes de pagar, o que ainda podemos cobrar com a obra nas mãos deles?",
                    "preocupado",
                  ),
                ]),
                choice("Ouvir quem precisa do pagamento", [
                  d(
                    "Trabalhador",
                    "Se parar, minha conta continua chegando. Quero saber se a garantia é dinheiro de verdade.",
                    "preocupado",
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
        "Conferir depósito e receber comprovante",
        1654,
        1663,
        { requires: ["contas-cisterna"], receive: ["deposito"] },
      ),
      step(
        "acordo",
        "cisterna",
        "Entregar comprovante e assumir posição",
        [
          ...read(1669, 1671),
          outcomePage(
            "R4",
            ["Respaldar suspensão · Tessa", "Concluir com garantia · Mavren"],
            [[[1683, 1693]], [[1697, 1699]]],
          ),
        ],
        { deliver: [deliver("deposito", "Representantes dos trabalhadores")] },
      ),
      textStep(
        "chave",
        "cisterna",
        "Receber a chave de Mavren",
        "Mavren entrega a chave a Ghork. Os representantes acompanham a conferência.",
        { when: (s) => s.flags.R4 === "B", receive: ["chave-cisterna"] },
      ),
      step(
        "entrega",
        "cisterna",
        "Entregar a chave e autorizar o pagamento",
        [
          page([
            n(
              "Diante dos representantes, Ghork entrega a chave ao responsável. A entrega autoriza o pagamento garantido pelo depósito.",
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
    "R5 · Uma vaga diante do público",
    [
      step("formato", "coliseu", "Escolher o formato da apresentação", [
        ...read(1723, 1731),
        outcomePage(
          "R5",
          [
            "Espetáculo beneficente · Odrik",
            "Demonstração dos aprendizes · Lethra",
          ],
          [[], []],
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
        "Entregar o programa a Rask e apresentar",
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
      "Confirmar equipe e encerrar convites",
      1790,
      1800,
    ),
  ]);
  for (let i = 0; i < 2; i++) {
    const rival = (s) => Object.keys(C.guilds).filter((g) => g !== s.guild)[i];
    quest(
      `fight${i}`,
      `Q-3${i + 1} · As duas guildas do outro lado`,
      Object.entries({ A: [1812, 1824], B: [1833, 1841], C: [1850, 1858] })
        .filter(([g]) => (i === 0 ? g !== "C" : g !== "A"))
        .map(([g, range]) =>
          excerpt(
            `chamada-${g}`,
            "coliseu",
            "Responder à guilda adversária",
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
                  "Resultado confirmado. A equipe de Ghork avança.",
                  "alegre",
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
              `Nas quartas, a equipe de Ghork enfrenta ${s.xy === "X" ? "Faíscas" : "Esteios"}, com apoio de uma das guildas que já disputaram esta campanha.`,
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
      step("resultado", "coliseu", "Reconhecer a luta", [
        page((s) => [
          d(
            s.xy === "X" ? "Zagra" : "Darvek",
            s.xy === "X"
              ? "Você passou. Nós fizemos uma luta de verdade."
              : "Você venceu. Vou cuidar do retorno dos meus.",
            "firme",
          ),
          d(
            "Ghork",
            s.xy === "X"
              ? "Fizeram. O resultado não apaga isso."
              : "Boa volta. Obrigado pela luta.",
            "atento",
          ),
        ]),
      ]),
    ],
    "victory",
  );
  quest(
    "fight3",
    "Q-34 · Gente conhecida, lado contrário",
    [
      step(
        "semifinal",
        "coliseu",
        "Encontrar os cinco adversários",
        [
          ...read(1923, 1927),
          page((s) =>
            s.opponents.map((name, i) =>
              d(
                name,
                C.semifinalLines[name][
                  s.recruits[i].outcome
                    ? s.recruits[i].name === name
                      ? 2
                      : 3
                    : s.metCandidates.includes(name)
                      ? 1
                      : 0
                ],
                "firme",
              ),
            ),
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
      step("resultado", "coliseu", "Receber a chamada para a final", [
        page([
          d("Rask", "A equipe de Ghork está na final.", "alegre"),
          d(
            "Ghork",
            "Obrigado pela luta. Foi bom encontrar vocês. Melhor ainda ganhar.",
            "alegre",
          ),
        ]),
      ]),
    ],
    "victory",
  );
  quest("uv", "Q-35 · Antes da final", [
    step("visita", "coliseu", "Escolher com quem conversar", [
      page(
        [n("Antes da chamada, Ghork tem tempo para uma conversa.")],
        [
          choice(
            "U · Conversar com o mentor",
            [d("Ghork", "Vou passar na sede antes da chamada.", "reflexivo")],
            { uv: "U" },
          ),
          choice(
            "V · Encontrar a equipe com Guedra",
            [
              d(
                "Ghork",
                "Vou encontrar a equipe do contrato no treino.",
                "reflexivo",
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
            "Quero que você saia dessa luta em condição de continuar vivendo depois dela.",
            "Quero ouvir como pretende enfrentar Torvak.",
            "A final mostrará à cidade o trabalho que fizemos.",
          ),
        ),
        page([
          d(
            "Ghork",
            "Quando cheguei, achei que um título faria todo mundo parar de me olhar como alguém que não serve.",
            "reflexivo",
          ),
        ]),
        page(
          mentor(
            "Alguns vão continuar discordando, mesmo se você vencer.",
            "Torvak tem um título há bastante tempo. Você viu o que ainda exige dos outros.",
            "Um resultado pode ser incontestável. A interpretação raramente é.",
          ),
        ),
        ...read(1982, 1985),
        page(
          mentor(
            "Eu ouvi. Estarei cuidando dos nossos.",
            "Então vá. Seu plano não precisa caber inteiro numa aprovação minha.",
            "Defenda essa posição quando sair da arena também.",
          ),
        ),
      ],
      { when: (s) => s.flags.uv === "U" },
    ),
    step(
      "equipe",
      "treino",
      "Encontrar a equipe do contrato",
      [
        ...read(1992, 2006),
        page((s) => [
          d(
            s.xy === "X" ? "Darvek" : "Zagra",
            s.xy === "X"
              ? "É uma resposta com que consigo trabalhar."
              : "Bom. Prometa que vai lutar, então.",
            "atento",
          ),
          d("Guedra", "Mostre o apoio. Depois vá para a chamada.", "firme"),
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
    "O título de Terminus",
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
              "alegre",
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
            .map((r) => d(r.name, C.celebrationLines[r.name], "alegre")),
        ),
        page([
          n(
            "Houve quem gritasse o nome dele até perder a voz. Houve quem continuasse preferindo o antigo campeão. Ghork ficou ali tempo suficiente para ouvir os dois.",
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
            "Homens armados misturados às equipes de serviço fecham as passagens.",
          ),
        ]),
        ...read(2067, 2073),
        page([
          n(
            "Invasores arrastam espectadores e um companheiro da quarta guilda para junto dos carregamentos.",
          ),
        ]),
        ...read(2077, 2085),
        page([
          n(
            "Torvak abre uma retirada. O fornecedor abandona o disfarce e assume o comando como Neral.",
          ),
          d(
            "Neral",
            "Continuem levando os capturados. Eu cuido de quem chegar ao corredor.",
            "hostil",
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
              "Neral usa sangue como catalisador e ergue uma proteção ritual. Pressionado por Ghork, ingere os concentrados. O corpo se deforma; a força aumenta e os movimentos perdem precisão.",
            ),
            d("Neral", "Eu conheço as medidas. Eu fiz as fórmulas.", "hostil", {
              pose: "transformado",
            }),
            d("Ghork", "Então sabe o que está tomando.", "firme"),
            d("Neral", "Sei o que posso fazer com isso.", "hostil", {
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
        "Derrotar o comando local",
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
              "Neral morre sem identificar infiltrados. O selo permanece intacto. Os demais completam a retirada e libertam os capturados.",
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
              "O recebimento anterior foi confirmado pelo nosso contato dentro do Conselho de Daratrine. Mantenha as próximas instruções neste canal. Nenhum nome deve acompanhar a remessa.",
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
  quest("ending", "E07 · Notícias que cabem numa conversa", [
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
      "Sou Brakka. Trabalho de dia e luto quando consigo. Hoje consegui.",
      "Não acertamos aquele pátio. Vim disputar uma coisa que já está combinada.",
      "O treino continua. Entrei por esta equipe; valeu por ajudar a abrir o espaço.",
      "O despacho ficou com o pátio. Procurei apoio para o treino e cheguei até aqui.",
    ],
    Nima: [
      "Nima. Meu grupo trabalha com entregas. Hoje a gente veio por esta entrada.",
      "Ainda não fechamos aquele turno. Esta partida tem hora certa.",
      "O despacho está funcionando. Minha inscrição ficou com este grupo.",
      "Você escolheu o treino. Eu busquei outro apoio para os entregadores.",
    ],
    Sura: [
      "Sou Sura. Também sou combatente. Você vai conhecer essa parte agora.",
      "O caso dos feridos continua aberto. Nossa luta não vai resolvê-lo.",
      "Você respeitou o sigilo. Continuo grata, mesmo defendendo esta equipe.",
      "A audiência foi sua escolha. Meu cuidado continua; minha equipe também.",
    ],
    Edrin: [
      "Edrin. Prefiro uma apresentação curta antes de uma disputa longa.",
      "Ainda temos documentos para conferir. Aqui, pelo menos, sabemos o que está em disputa.",
      "Você respaldou os depoimentos. Hoje nos inscrevemos em lados diferentes.",
      "Segui com a via pública. Não preciso negar o trabalho de Sura para querer vencer.",
    ],
    Korr: [
      "Korr. Se ouvir um rangido, pode ser minha proteção. Já testei.",
      "A armação ainda espera uma decisão. Meu treino não ficou esperando junto.",
      "Usei o material. Agora quero ver o trabalho aguentar uma luta contra você.",
      "Você preservou a armação. Procurei outros materiais e outro grupo.",
    ],
    Velka: [
      "Velka. Observe o apoio antes de tentar seguir o movimento.",
      "Ainda não decidimos o instrumento. Podemos decidir esta partida.",
      "O instrumento está em uso. Obrigada pelo apoio. Vou tentar derrotá-lo.",
      "O material foi reaproveitado. Continuei ensinando com o que tinha.",
    ],
    Tessa: [
      "Tessa. Tem gente contando comigo, como deve haver com você.",
      "A cisterna ainda exige um acordo. Hoje falo pela equipe que me inscreveu.",
      "Obrigada por sustentar a posição dos trabalhadores. Aqui estamos em lados distintos.",
      "A garantia existia. Eu preferia a quitação antes. Continuo defendendo isso.",
    ],
    Mavren: [
      "Mavren. Vim conquistar condições para escolher meu próximo trabalho.",
      "Ainda precisamos concluir aquele acordo. Esta equipe já tem o seu.",
      "Conferimos a garantia juntos. Não esqueço isso porque agora vou enfrentá-lo.",
      "Você apoiou a suspensão. Procurei outro trabalho e segui com este grupo.",
    ],
    Odrik: [
      "Odrik. Pode guardar o aplauso para depois, se conseguir.",
      "A apresentação ficou pendente. Esta entrada eu já ensaiei.",
      "A exibição valeu o trabalho. Hoje não combinamos quem cai.",
      "Levei o espetáculo a outro grupo. Não faltou vontade de entrar na arena.",
    ],
    Lethra: [
      "Lethra. Meus alunos vão reparar na minha base antes da sua.",
      "A vaga ainda dava conversa. A semifinal já tem hora.",
      "Obrigada por dar lugar aos aprendizes. Agora quero conquistar o meu na final.",
      "O espetáculo ficou com a vaga. Eu segui procurando espaço para os alunos.",
    ],
  };
  C.celebrationLines = {
    Brakka: "O turno de hoje vai dar assunto.",
    Nima: "Todo mundo aqui? Então podemos comemorar.",
    Sura: "Primeiro, deixem eu ver esse braço. Depois eu comemoro junto.",
    Edrin: "Este resultado eu faço questão de registrar.",
    Korr: "A proteção aguentou. Eu também, por pouco.",
    Velka: "Quero lembrar o último movimento.",
    Tessa: "Tem muita gente que vai querer saber como foi.",
    Mavren: "Finalmente uma entrega que dá vontade de anunciar.",
    Odrik: "Eu tinha uma fala pronta. Esqueci. Ganhei junto!",
    Lethra: "Vou ouvir os alunos comentarem cada passo.",
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
          "Pedir a Rheed que Ghork termine sem interrupção · 1 Ludo",
          (s) => [
            d(
              "Criança",
              "E se ele conseguisse terminar sem alguém interromper?",
              "investigativo",
            ),
            d(
              "Rheed",
              "Meruna tinha um pequeno sino para controlar a reunião. Eu havia esquecido de pôr o sino na mesa.",
              "ironico",
            ),
            d("Meruna", "Deixem Ghork concluir.", "firme"),
            d(
              "Ghork",
              "Vou trabalhar pela guilda que escolhi. O que vocês fizeram por mim continua importante. Não vou oferecer metade de um contrato que não tenho como dividir.",
              "firme",
            ),
            d(
              s.guild === "A" ? "Borun" : "Virmura",
              s.guild === "A"
                ? "Ouvi. E vou disputar os próximos trabalhos com a sua."
                : "Eu ouvi. Ainda preciso sustentar o trabalho da minha equipe.",
              "firme",
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
        "Pedir a Rheed uma testemunha dos horários · 1 Ludo",
        [
          d(
            "Criança",
            "Alguém que ouviu a promessa de Rask pode estar perto?",
            "investigativo",
          ),
          d(
            "Rheed",
            "Uma pessoa tinha ido buscar um objeto esquecido e ficou ouvindo. Era uma demora bastante conveniente.",
            "ironico",
          ),
          d(
            "Guedra",
            "Eu estava aqui quando os horários foram concedidos. Não houve dúvida no combinado.",
            "firme",
          ),
          d(
            "Torvak",
            "Não neguei que estavam concedidos. Eu mandei mudar.",
            "hostil",
          ),
          d(
            "Ghork",
            "Então não vou aceitar que contem isso como uma confusão nossa.",
            "firme",
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
            "E se Rask desse um momento para ele falar?",
            "investigativo",
          ),
          d(
            "Rheed",
            "Pela primeira vez em muito tempo, Rask economizou um anúncio para ouvir outra voz.",
            "ironico",
          ),
          d("Rask", "Ghork quer dizer uma coisa.", "atento"),
          d(
            "Ghork",
            s.recruits.some((r) => r.invited)
              ? "Conseguimos. Quero que ouçam os nomes de quem lutou comigo."
              : "Entrei sozinho na arena. Não cheguei sozinho a esta cidade. Muita gente me ajudou, e parte dela quis ganhar de mim hoje.",
            "alegre",
          ),
          ...s.recruits
            .filter((r) => r.invited)
            .map((r) => d("Rask", r.name + "!", "alegre")),
          d("Ghork", "Obrigado. Vou aproveitar este título.", "alegre"),
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
          "Precisei ocupar o pátio com os preparativos que sobraram. Não consigo ceder esse turno agora.",
        accepted:
          "Os responsáveis aceitaram levar os preparativos ao próprio depósito. O turno voltou a ficar livre. Posso ouvir as duas propostas.",
      },
      {
        speaker: "Sura",
        blocked:
          "Não temos como acompanhar a conferência e a apresentação enquanto a equipe está cobrindo os atendimentos.",
        accepted:
          "Conseguimos cobertura para esse período. Os pacientes ainda decidem o que autorizam; agora podemos acompanhar o trabalho.",
      },
      {
        speaker: "Durn",
        blocked:
          "A armação foi reservada para uma tarefa de preparação. Não vou prometer o mesmo material aos dois projetos.",
        accepted:
          "Quem reservou encontrou um conjunto próprio. A armação está disponível para escolhermos um destino.",
      },
      {
        speaker: "Tessa",
        blocked:
          "A reunião com os envolvidos ficou sem acompanhamento. Não vou pedir que escolham por quem não conseguiu vir.",
        accepted:
          "Conseguimos reorganizar os turnos e reunir os envolvidos. Agora podemos discutir as duas propostas.",
      },
      {
        speaker: "Rask",
        blocked:
          "O ajuste da preparação ocupou a vaga de exibição. Não tenho um intervalo para conceder agora.",
        accepted:
          "O ajuste foi concluído antes. Há tempo para uma apresentação. Vamos ouvir os dois formatos.",
      },
    ],
    candidates: {
      Brakka: {
        blocked:
          "Preciso acompanhar um turno de trabalhadores. Não posso prometer estar na arena ao mesmo tempo.",
        accepted: "Outro responsável assumiu o turno. Posso ir com você.",
      },
      Nima: {
        blocked:
          "A distribuição das entregas deixou um turno sem responsável. Estou cobrindo até acertarem.",
        accepted: "O turno ganhou cobertura. Posso assumir o convite.",
      },
      Sura: {
        blocked:
          "Preciso cobrir atendimento. Sem alguém no meu lugar, não posso entrar na equipe.",
        accepted: "O atendimento ficou coberto. Agora posso acompanhá-lo.",
      },
      Edrin: {
        blocked:
          "Assumi uma conferência de registros que coincide com a preparação da equipe.",
        accepted: "Conseguimos dividir a conferência. Posso lutar com você.",
      },
      Korr: {
        blocked:
          "Ainda respondo por uma entrega de proteções. Não vou abandonar o serviço pela metade.",
        accepted:
          "A oficina conseguiu dividir o acabamento. Posso ir sem deixar a entrega descoberta.",
      },
      Velka: {
        blocked: "Combinei acompanhar uma prática e não tenho quem assuma.",
        accepted:
          "Quem já conduz os exercícios aceitou acompanhar essa prática. Posso entrar na equipe.",
      },
      Tessa: {
        blocked:
          "Preciso acompanhar uma negociação. As pessoas me escolheram para estar lá.",
        accepted:
          "Os demais representantes aceitaram dividir esse acompanhamento. Posso disputar com você.",
      },
      Mavren: {
        blocked:
          "Tenho uma etapa de trabalho sob minha responsabilidade. Não posso simplesmente deixar a chave.",
        accepted: "A etapa ganhou outro responsável. Posso aceitar o convite.",
      },
      Odrik: {
        blocked:
          "Estou comprometido com a preparação de outra apresentação. Não consigo garantir as duas presenças.",
        accepted:
          "Os responsáveis dividiram os preparativos. Posso lutar com você.",
      },
      Lethra: {
        blocked:
          "Preciso acompanhar os aprendizes. Ainda não há quem assuma essa prática.",
        accepted: "A prática ficou acompanhada. Posso entrar na equipe.",
      },
    },
    invitations: {
      Brakka:
        "Vamos. Quero que vejam os trabalhadores por outro motivo além de carregar a arena dos outros.",
      Nima: "Vou. O despacho já tem gente dividindo os turnos. Não preciso fazer tudo para poder representar o grupo.",
      Sura: "Você respeitou o que podia levar dos pacientes. Posso construir uma parceria assim. Quando o convite estiver disponível, conte comigo.",
      Edrin:
        "Você conferiu o relato antes de usá-lo. Quero essa responsabilidade perto de mim na arena também.",
      Korr: "Quero. E quero ver como as proteções se comportam em uso de verdade.",
      Velka:
        "Quero. A prática continua com quem deixei responsável; a técnica pode ser vista na arena também.",
      Tessa:
        "Podemos. A negociação continua com os demais representantes. Vou levar nossa posição para a arena.",
      Mavren:
        "Vou. Quero que esse trabalho me dê autonomia para escolher o próximo, não só pagar o atraso do anterior.",
      Odrik:
        "Quero. Na apresentação eu posso combinar a queda. Na semifinal, vou lutar para continuar de pé.",
      Lethra:
        "Quero. Os aprendizes seguem com a prática combinada. Também tenho uma luta para fazer.",
    },
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
              "Quero que entre na minha equipe para o campeonato. Vamos?",
              "atento",
            ),
            d(
              s.recruits[i].name,
              C.recruitmentDialogue.invitations[s.recruits[i].name],
              "alegre",
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
        step("cobertura", C.recruitPlaces[i], "Ouvir a versão com cobertura", [
          page((s) => [
            d(
              "Rheed",
              "Justamente naquele dia, alguém apareceu querendo terminar cedo. Pela primeira vez nesta história, uma lista foi repartida antes de virar discussão.",
              "ironico",
            ),
            d(
              s.recruits[i].outcome
                ? s.recruits[i].name
                : C.recruitmentDialogue.blocks[i].speaker,
              s.recruits[i].outcome
                ? C.recruitmentDialogue.candidates[s.recruits[i].name].accepted
                : C.recruitmentDialogue.blocks[i].accepted,
              "atento",
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
              "Eles conseguiram fechar os dois lados. Na próxima aproximação, guarde a passagem por onde vai sair.",
              "firme",
            ),
            d(
              "Ghork",
              "Vou recuperar o fardo. Primeiro preciso recuperar o fôlego.",
              "exausto",
            ),
          ]
        : id === "C4"
          ? [
              d(
                "Rask",
                "Encerrado. O estojo continua restituído. O desafio permanece aberto.",
                "firme",
              ),
              d("Ghork", "Essa tentativa não venceu. Vou voltar.", "firme"),
            ]
          : id === "t5"
            ? [
                n(
                  "Ghork é repelido para um recuo do corredor. A evacuação continua.",
                ),
                d("Ghork", "Ainda não consegui passar.", "exausto"),
                d("Borun", "Recue por aqui. A saída continua aberta.", "firme"),
              ]
            : [
                d(
                  "Rask",
                  "Esta tentativa ficou com a equipe adversária. A revanche permanece disponível; acertem a retomada comigo quando estiverem prontos.",
                  "atento",
                ),
                d("Ghork", "Vou me preparar para voltar.", "firme"),
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
