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
        "Este desenho vai da entrada da passagem estreita até a bifurcação. O outro mostra a retirada, no sentido contrário.",
        "investigativo",
      ),
      d(
        "Ghork",
        "Então a esquerda de quem entra é a direita de quem sai. Temos algum registro que confirme o sentido?",
        "investigativo",
      ),
      d(
        "Elune",
        "Os registros que nos deram mostram onde cada percurso começou e em que direção seguiu. Vamos acompanhar os marcos nessa ordem.",
        "firme",
      ),
      d(
        "Ghork",
        "Entrada, passagem estreita, bifurcação. Na volta: bifurcação, passagem, entrada. É o mesmo trecho.",
        "firme",
      ),
      d(
        "Elune",
        "Esse trecho, sim. Sobre as outras galerias ainda sabemos pouco. Vou marcar o que conferimos e deixar o resto em aberto.",
        "atento",
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
        "O socorro",
        [
          page([
            n(
              "Rheed bebe a poção. As vozes da plateia somem, dando lugar à respiração de Ghork.",
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
              "Os cuidados continuam. Aos poucos, Ghork consegue caminhar pequenas distâncias.",
            ),
            d(
              "Virmura",
              "Tenho duas entregas perto daqui: uma no mercado, outra no coliseu. Escolha por qual começar. E pare para descansar quando precisar.",
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
      "Conhecer o contrato das minas",
      153,
      174,
    ),
  ]);
  quest("champion", "E02 · O homem por trás do cartaz", [
    excerpt("passado", "virmura", "Conversar sobre o campeão", 182, 194),
    excerpt("torvak", "coliseu", "Conhecer Torvak", 198, 217),
  ]);
  quest("E03", "E03 · Uma oferta para aguentar o treino", [
    excerpt("oferta", "coliseu", "Ouvir a oferta de Savel", 226, 243),
  ]);
  quest("E08", "E08 · Aprender a escapar do golpe", [
    excerpt("cuidado", "virmura", "Conversar sobre os cuidados com a perna", 254, 258),
    step("pratica", "treino", "Praticar movimentos e recuo", [
      page([
        n(
          "Guedra acompanha as práticas curtas. A cada tentativa, Ghork aprende a deixar espaço para recuar.",
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
        "Consultar o registro e receber a cópia sem nomes",
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
      excerpt("teste", "virmura", "Testar a passagem da maca com a equipe", 422, 440, {
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
        "Virmura entrega a Ghork uma lista de ataduras e material de lavagem. Ele deve buscá-los com Jorvi.",
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
              "Dois assaltantes bloqueiam o corredor. Ghork segura a bolsa junto ao corpo. Perto da área de descarga, Borun ergue o bastão entre eles.",
            ),
          ]),
          ...read(493, 501),
          page([
            n(
              "Ghork empurra o carrinho para atrapalhar os assaltantes e escapa pela passagem que Borun abriu.",
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
        "Investigar o percurso e receber a cópia de Pirka",
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
        "Exigir a devolução no corredor",
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
        "Ghork recebe o pacote que Virmura separou. Deve entregá-lo a Rask, na entrada administrativa do coliseu.",
        { receive: ["ataduras"] },
      ),
      step("sevrak", "coliseu", "Intervir no treino", [
        page([n("Um veterano derruba o mesmo iniciante, de novo e de novo.")]),
        ...read(686, 696),
        page([
          n(
            "O veterano avança contra Ghork. Sevrak intercepta o golpe e o desarma.",
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
    "Q-C3 · Um método sem o mestre",
    [
      step(
        "elune",
        "contratos",
        "Levar o procedimento escrito a Elune",
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
        "Ghork leva à escola a cópia revisada por Elune. Ela mostra o trecho conferido e o que ainda não foi possível concluir.",
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
        "Cobrar com Rask a devolução do estojo",
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
      step("retorno", "sevrak", "Devolver o estojo e revisar a nota sobre os limites", c4, {
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
                "O primeiro desenho mostra a entrada até a bifurcação. O segundo mostra o caminho de volta. Os registros confirmam o ponto de partida e a direção de cada um.",
                "firme",
              ),
              d(
                "Meruna",
                "Vocês conseguiram conferir esse trecho. O restante fica para a investigação. O contrato será da guilda que você escolheu.",
                "firme",
              ),
            ]),
            ...read(929, 939),
            page(
              mentor(
                "Seu pagamento fica separado do dinheiro da equipe. Primeiro, vamos combinar que trabalho você pode assumir.",
                "Seu pagamento fica separado das contas da guilda. Quero que saiba quanto recebe pelo seu trabalho.",
                "Seu pagamento e o dinheiro da investigação terão registros separados. Vamos começar os preparativos.",
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
            "Esses horários foram reservados para a nossa equipe. Ter um campeão não dá à quarta guilda o direito de tomar o treino dos outros.",
            "Rask, você nos prometeu esses horários. Se precisava da licença de Torvak para cumprir, devia ter avisado.",
            "Nossa escola já tinha um horário. Que regra permite cancelá-lo para atender à preferência da quarta guilda?",
          ),
        ),
        ...read(959, 959),
        page(
          mentor(
            "Quando toma o que já foi concedido a outra equipe, é abuso.",
            "Quero que cumpram o combinado.",
            "Quero uma resposta à pergunta.",
          ),
        ),
        ...read(963, 963),
        page(
          mentor(
            "Não retiro.",
            "Não vou pedir desculpas por isso.",
            "Mantenho o que disse.",
          ),
        ),
        ...read(967, 979),
        page(
          mentor(
            "Na sede. E ninguém vai perder descanso por causa disso.",
            "Vamos dividir o trabalho. Eu acompanho os treinos que prometi.",
            "Vamos adaptar os exercícios à escola. Primeiro, precisamos conferir o espaço.",
          ),
        ),
      ]),
      step("reorganizacao", home, "Reorganizar os treinos", [
        page([
          n(
            "Na sede da guilda, Ghork ajuda a reorganizar os materiais leves e os horários de treino.",
          ),
        ]),
        page(
          mentor(
            "O atendimento continua deste lado. O treino fica do outro. Se faltar tempo, fale comigo. Não corte seu descanso para fazer caber tudo.",
            "Cabe menos gente aqui. Dividi os grupos e avisei Pirka dos horários. Desta vez você não vai descobrir que estou atrasado olhando para uma cadeira vazia.",
            "Adaptei a sequência ao espaço disponível. Anote o que não funcionar. Concordar comigo e improvisar escondido depois não ajuda ninguém.",
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
    "Q-X0 · Uma reserva para voltar",
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
  quest("alliance", "E06 · Como faremos o trabalho", [
    step("escolha", "contratos", "Escolher X ou Y", [
      page(
        mentor(
          "Ouviu os dois. Que risco vai aceitar? E como vai explicar isso à equipe?",
          "Conte o que você conferiu, não só qual conversa agradou mais.",
          "Escolha o método adequado ao trabalho. Depois, terá de responder pelo resultado.",
        ),
      ),
      page(
        [
          n(
            "A escolha abre duas missões da rota escolhida e fecha a outra rota. A equipe que ficar de fora seguirá com outra guilda.",
          ),
        ],
        [
          choice(
            "Confirmar X · preparar reserva de resgate",
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
      excerpt("apoios", "oficina", "Receber os apoios preparados", 1101, 1107, {
        receive: ["apoios"],
      }),
      excerpt(
        "ensaio",
        "minas",
        "Entregar os apoios e testar a retirada",
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
      `Q-${route}2 · Até onde pudemos verificar`,
      [
        excerpt(
          "galeria",
          "minas",
          "Investigar as galerias e registrar o caminho de volta",
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
            "Contribuir usa parte do pagamento pessoal de Ghork e dispensa uma sessão extra de treino. Guardar o dinheiro mantém essa sessão. Nenhuma escolha gasta Ludos ou muda o D20.",
          ),
        ],
        [
          choice(
            "Contribuir para o material pedido por Dam",
            (s) => read(1262, 1267).flatMap((p) => resolve(p.body, s)),
            { dam: "help" },
          ),
          choice(
            "Guardar o dinheiro para a preparação",
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
    step("dose", "coliseu", "Encontrar Torvak e Savel", [
      page([
        n(
          "Um companheiro entrega uma dose a Torvak. Ele espera o tremor da mão passar antes de saudar o público. Savel guarda o estojo.",
        ),
      ]),
      ...read(1307, 1321),
    ]),
    excerpt("preparo", "treino", "Preparar-se com Guedra", 1329, 1335),
    step("classificacao", "coliseu", "Confirmar a classificação", [
      ...read(1339, 1343),
      page(
        mentor(
          "Você chegou até aqui sem ultrapassar seus limites no trabalho. Continue me dizendo quando precisar de ajuda.",
          "Você sabe contar como chegou até aqui. Não precisa mais esperar que eu conte por você.",
          "Essa classificação mostra o trabalho da escola. Quero que reconheçam nossa preparação.",
        ),
      ),
      ...read(1353, 1361),
    ]),
  ]);
  const outcomePage = (id, labels, ranges) =>
    page(
      [
        n(
          "Escolha qual projeto vai apoiar. Nesta missão, você só poderá convidar a pessoa favorecida pela decisão.",
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
              [n("Ghork examina a passagem e o canto onde guardam os materiais.")],
              [
                choice("Examinar a passagem", [
                  d(
                    "Nima",
                    "A carga entra por aqui. Essa passagem precisa ficar livre.",
                    "firme",
                  ),
                ]),
                choice("Examinar o canto", [
                  d(
                    "Brakka",
                    "Os bancos cabem aqui. Mas, se encher de caixas, não sobra espaço para treinar.",
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
        "Escolher como usar o turno",
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
        "Ghork pega a lista de Brakka e confere quem pode vir. Os trabalhadores arrastam os bancos.",
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
        "Nima entrega as etiquetas a Ghork. Juntos, identificam as caixas, separam as que ninguém reconhece e conferem os retornos.",
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
        "Ghork coloca as etiquetas nas caixas que já conferiu.",
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
        "Entregar a autorização e buscar a peça",
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
        "Conferir o material e escolher como apresentar o caso",
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
    "R3 · Uma armação inteira",
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
        "Devolver a autorização e escolher o destino da armação",
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
              [n("Os trabalhadores discutem como cobrar o pagamento.")],
              [
                choice("Ouvir quem quer segurar a entrega", [
                  d(
                    "Trabalhador",
                    "Se entregarmos antes de receber, o que vai obrigar eles a pagar depois?",
                    "preocupado",
                  ),
                ]),
                choice("Ouvir quem precisa receber", [
                  d(
                    "Trabalhador",
                    "Se pararmos, minhas contas não param junto. Quero saber se esse dinheiro existe mesmo.",
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
        "Conferir o depósito e receber o comprovante",
        1654,
        1663,
        { requires: ["contas-cisterna"], receive: ["deposito"] },
      ),
      step(
        "acordo",
        "cisterna",
        "Entregar o comprovante e escolher uma posição",
        [
          ...read(1669, 1671),
          outcomePage(
            "R4",
            ["Apoiar a suspensão · Tessa", "Concluir com garantia · Mavren"],
            [[[1683, 1693]], [[1697, 1699]]],
          ),
        ],
        { deliver: [deliver("deposito", "Representantes dos trabalhadores")] },
      ),
      textStep(
        "chave",
        "cisterna",
        "Receber a chave de Mavren",
        "Mavren entrega a chave a Ghork. Os representantes acompanham a conferência final.",
        { when: (s) => s.flags.R4 === "B", receive: ["chave-cisterna"] },
      ),
      step(
        "entrega",
        "cisterna",
        "Entregar a chave e autorizar o pagamento",
        [
          page([
            n(
              "Ghork entrega a chave ao responsável, diante dos representantes. Com a entrega confirmada, o dinheiro do depósito pode ser liberado.",
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
    "R5 · Uma chance diante do público",
    [
      step("formato", "coliseu", "Escolher o tipo de apresentação", [
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
              `Nas quartas de final, a equipe de Ghork enfrenta os ${s.xy === "X" ? "Faíscas" : "Esteios"}, apoiados por uma das guildas adversárias.`,
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
              ? "Você passou. Mas demos trabalho."
              : "Você venceu. Vou cuidar do retorno dos meus.",
            "firme",
          ),
          d(
            "Ghork",
            s.xy === "X"
              ? "Deram. Ganhar não muda isso."
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
                "Vou encontrar o pessoal do contrato no espaço de treino.",
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
            "Quero que você saia dessa luta inteiro. Ainda há muito para viver depois dela.",
            "Quero ouvir como pretende enfrentar Torvak.",
            "A final mostrará à cidade o trabalho que fizemos.",
          ),
        ),
        page([
          d(
            "Ghork",
            "Quando cheguei, achei que bastava ganhar um título para todo mundo parar de me tratar como inútil.",
            "reflexivo",
          ),
        ]),
        page(
          mentor(
            "Alguns vão continuar discordando, mesmo se você vencer.",
            "Torvak tem o título há anos. Você viu como ainda cobra reconhecimento dos outros.",
            "Podem concordar com o resultado e continuar discordando sobre você.",
          ),
        ),
        ...read(1982, 1985),
        page(
          mentor(
            "Está bem. Vou cuidar dos nossos.",
            "Então vá. Você não precisa da minha aprovação para cada passo.",
            "Defenda essa posição quando sair da arena também.",
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
              ? "Isso eu consigo entender."
              : "Bom. Prometa que vai lutar, então.",
            "atento",
          ),
          d("Guedra", "Mostre sua base. Depois vá para a chamada.", "firme"),
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
            "Parte da torcida gritava o nome de Ghork até perder a voz. Outros ainda defendiam o antigo campeão. Ghork demorou a sair da arena e ouviu os dois lados.",
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
            "Homens armados saem do meio das equipes de serviço e bloqueiam as passagens.",
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
            "Torvak enfrenta os invasores e abre uma saída. O fornecedor abandona o disfarce: é Neral, que assume o comando dos atacantes.",
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
              "Neral usa sangue para erguer uma proteção ritual. Ghork pressiona sua defesa, e o alquimista bebe os concentrados. Seu corpo se deforma. Os golpes ficam mais fortes, mas menos precisos.",
            ),
            d("Neral", "Eu conheço as doses. As fórmulas são minhas.", "hostil", {
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
              "Neral morre sem dar nomes. O selo continua intacto. Enquanto isso, os demais concluem a evacuação e libertam os capturados.",
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
              "Nosso contato no Conselho de Daratrine confirmou o recebimento anterior. Enviem as próximas instruções por este mesmo meio. Não incluam nomes na remessa.",
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
      "Sou Brakka. Trabalho de dia e luto quando consigo. Hoje consegui.",
      "Não resolvemos o uso daquele pátio. Mas esta luta, pelo menos, está marcada.",
      "O treino continua. Entrei nesta equipe. Obrigado por ajudar a garantir nosso espaço.",
      "O pátio ficou para as entregas. Encontrei outro apoio para o treino e cheguei até aqui.",
    ],
    Nima: [
      "Nima. Minha equipe faz entregas pela cidade. Hoje viemos disputar uma luta.",
      "Não acertamos o turno do pátio. Esta partida, pelo menos, tem hora marcada.",
      "As entregas estão funcionando. Para o campeonato, me inscrevi com este grupo.",
      "Você escolheu o treino. Eu busquei outro apoio para os entregadores.",
    ],
    Sura: [
      "Sou Sura. Também sei lutar. Você vai ver.",
      "O caso dos feridos continua aberto. Nossa luta não vai resolvê-lo.",
      "Você respeitou o sigilo. Continuo grata, mesmo defendendo esta equipe.",
      "Você escolheu os depoimentos públicos. Continuei cuidando dos feridos e preparando minha equipe.",
    ],
    Edrin: [
      "Edrin. Prefiro uma apresentação curta antes de uma disputa longa.",
      "Ainda temos documentos para conferir. Aqui, pelo menos, sabemos o que está em disputa.",
      "Você respaldou os depoimentos. Hoje nos inscrevemos em lados diferentes.",
      "Continuei defendendo os depoimentos públicos. Respeito o trabalho de Sura, mas também quero vencer.",
    ],
    Korr: [
      "Korr. Se ouvir um rangido, pode ser minha proteção. Já testei.",
      "Ainda não decidimos o destino da armação. Mas eu continuei treinando.",
      "Usei o material. Agora vamos ver se minhas proteções aguentam uma luta contra você.",
      "Você preservou a armação. Procurei outros materiais e outro grupo.",
    ],
    Velka: [
      "Velka. Repare nos meus pés antes de tentar acompanhar o movimento.",
      "Ainda não decidimos o destino do instrumento. Vamos decidir esta partida.",
      "Estamos usando o instrumento nas aulas. Obrigada pela ajuda. Agora vou tentar vencer você.",
      "Reaproveitaram o material. Continuei ensinando com o que restou.",
    ],
    Tessa: [
      "Tessa. Tem gente contando comigo, como deve haver com você.",
      "Ainda precisamos acertar o pagamento da cisterna. Hoje vim lutar por esta equipe.",
      "Obrigada por sustentar a posição dos trabalhadores. Aqui estamos em lados distintos.",
      "O dinheiro estava garantido, eu sei. Mas ainda prefiro receber antes de entregar o serviço.",
    ],
    Mavren: [
      "Mavren. Vim ganhar a chance de escolher meu próximo serviço.",
      "Ainda precisamos fechar aquele acordo. Com esta equipe, já está tudo combinado.",
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
      "Ainda podíamos discutir a vaga da apresentação. Mas agora é hora da semifinal.",
      "Obrigada por dar lugar aos aprendizes. Agora quero conquistar o meu na final.",
      "O espetáculo ficou com a vaga. Eu segui procurando espaço para os alunos.",
    ],
  };
  C.celebrationLines = {
    Brakka: "Vai ter assunto no próximo turno.",
    Nima: "Todo mundo aqui? Então podemos comemorar.",
    Sura: "Primeiro, deixa eu ver esse braço. Depois comemoro com vocês.",
    Edrin: "Este resultado eu faço questão de registrar.",
    Korr: "A proteção aguentou. Eu também, por pouco.",
    Velka: "Quero guardar aquele último movimento na memória.",
    Tessa: "Tem muita gente que vai querer saber como foi.",
    Mavren: "Finalmente um trabalho que faço questão de anunciar.",
    Odrik: "Eu tinha um discurso pronto. Esqueci tudo. Nós ganhamos!",
    Lethra: "Meus alunos vão comentar cada passo que eu dei.",
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
              "E se deixassem ele terminar de falar sem interromper?",
              "investigativo",
            ),
            d(
              "Rheed",
              "Meruna tinha um sininho para pôr ordem na reunião. Esqueci de colocar na mesa. Ora, como fui esquecer o sino?",
              "ironico",
            ),
            d("Meruna", "Deixem Ghork concluir.", "firme"),
            d(
              "Ghork",
              "Vou trabalhar com a guilda que escolhi. Continuo grato a vocês, mas não posso oferecer um pedaço de um contrato que não é divisível.",
              "firme",
            ),
            d(
              s.guild === "A" ? "Borun" : "Virmura",
              s.guild === "A"
                ? "Entendi. E nos próximos contratos, a sua guilda vai disputar com a minha."
                : "Eu ouvi. E ainda preciso garantir o sustento da minha equipe.",
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
            "Não pode ter alguém por perto que ouviu Rask prometer os horários?",
            "investigativo",
          ),
          d(
            "Rheed",
            "Alguém voltara para buscar um objeto esquecido e ficou ouvindo. Um atraso muito conveniente, não acha?",
            "ironico",
          ),
          d(
            "Guedra",
            "Eu estava aqui quando Rask deu os horários a vocês. O combinado foi claro.",
            "firme",
          ),
          d(
            "Torvak",
            "Não neguei isso. Eu mandei mudar.",
            "hostil",
          ),
          d(
            "Ghork",
            "Então ninguém vai dizer que fomos nós que entendemos errado.",
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
            "Pela primeira vez em muito tempo, Rask deixou um anúncio para depois e ouviu outra pessoa.",
            "ironico",
          ),
          d("Rask", "Ghork quer dizer uma coisa.", "atento"),
          d(
            "Ghork",
            s.recruits.some((r) => r.invited)
              ? "Conseguimos. Quero que ouçam os nomes de quem lutou comigo."
              : "Lutei sozinho, mas muita gente me ajudou desde que cheguei. Alguns até tentaram ganhar de mim hoje.",
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
          "Precisei usar o pátio para os preparativos que ficaram pendentes. Não posso liberar esse turno agora.",
        accepted:
          "Levaram os preparativos para o próprio depósito. O pátio está livre nesse turno de novo. Vamos ouvir as duas propostas.",
      },
      {
        speaker: "Sura",
        blocked:
          "Nossa equipe está ocupada com os atendimentos. Não temos quem acompanhe a conferência e a apresentação dos relatos.",
        accepted:
          "Conseguimos quem cuide dos atendimentos nesse período. Agora podemos acompanhar a conferência. Os pacientes ainda decidem o que autorizam.",
      },
      {
        speaker: "Durn",
        blocked:
          "Reservaram a armação para os preparativos. Não posso prometer o mesmo material para dois projetos.",
        accepted:
          "Quem tinha reservado a armação encontrou outro conjunto. Podemos decidir como usá-la.",
      },
      {
        speaker: "Tessa",
        blocked:
          "Alguns dos envolvidos não conseguem vir à reunião. Não vou pedir que os outros decidam por eles.",
        accepted:
          "Reorganizamos os turnos e reunimos os envolvidos. Agora podemos discutir as duas propostas.",
      },
      {
        speaker: "Rask",
        blocked:
          "A reorganização dos treinos ocupou a vaga da apresentação. Não tenho outro intervalo agora.",
        accepted:
          "Terminamos o ajuste dos treinos mais cedo. Sobrou tempo para uma apresentação. Vamos ouvir as duas propostas.",
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
          "Ficou um turno de entregas sem responsável. Estou cobrindo até acertarem.",
        accepted: "Conseguimos alguém para o turno. Posso aceitar o convite.",
      },
      Sura: {
        blocked:
          "Preciso cobrir atendimento. Sem alguém no meu lugar, não posso entrar na equipe.",
        accepted: "Conseguimos quem cuide dos atendimentos. Agora posso ir com você.",
      },
      Edrin: {
        blocked:
          "Marquei uma conferência de registros no mesmo horário da preparação da equipe.",
        accepted: "Dividimos a conferência dos registros. Posso lutar com você.",
      },
      Korr: {
        blocked:
          "Ainda respondo por uma entrega de proteções. Não vou abandonar o serviço pela metade.",
        accepted:
          "A oficina dividiu o acabamento. Posso ir sem atrasar a entrega.",
      },
      Velka: {
        blocked: "Combinei acompanhar uma prática e não tenho quem assuma.",
        accepted:
          "Outra pessoa que conduz os exercícios assumiu a prática. Posso entrar na equipe.",
      },
      Tessa: {
        blocked:
          "Preciso acompanhar uma negociação. As pessoas me escolheram para estar lá.",
        accepted:
          "Os outros representantes aceitaram dividir as reuniões. Posso lutar com você.",
      },
      Mavren: {
        blocked:
          "Sou responsável por uma etapa da obra. Não posso largar tudo sem alguém no meu lugar.",
        accepted: "Outra pessoa assumiu essa etapa. Posso aceitar o convite.",
      },
      Odrik: {
        blocked:
          "Já estou preparando outra apresentação. Não consigo me comprometer com as duas.",
        accepted:
          "Dividimos os preparativos da apresentação. Posso lutar com você.",
      },
      Lethra: {
        blocked:
          "Preciso acompanhar os aprendizes. Ainda não há quem assuma essa prática.",
        accepted: "Consegui quem acompanhe os aprendizes. Posso entrar na equipe.",
      },
    },
    invitations: {
      Brakka:
        "Vamos. Quero que vejam os trabalhadores lutando, não só carregando coisas para a arena dos outros.",
      Nima: "Vou. Já dividimos os turnos das entregas. Posso representar o grupo sem fazer todo o serviço sozinha.",
      Sura: "Você respeitou o que os pacientes autorizaram. Gosto de trabalhar com alguém assim. Conte comigo.",
      Edrin:
        "Você conferiu o relato antes de usá-lo. Quero alguém com esse cuidado ao meu lado na arena.",
      Korr: "Quero. Está na hora de testar essas proteções numa luta de verdade.",
      Velka:
        "Quero. Deixei alguém responsável pela prática. Agora vou mostrar a técnica na arena.",
      Tessa:
        "Vamos. Os outros representantes continuam a negociação. Quero levar nossa posição para a arena.",
      Mavren:
        "Vou. Quero ganhar a liberdade de escolher o próximo serviço, em vez de só pagar as dívidas do anterior.",
      Odrik:
        "Quero. Numa apresentação, a gente combina quem cai. Na semifinal, vou fazer de tudo para ficar de pé.",
      Lethra:
        "Quero. Os aprendizes continuam com a prática combinada. Eu também tenho uma luta para fazer.",
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
        step("cobertura", C.recruitPlaces[i], "Ouvir como conseguiram dividir o serviço", [
          page((s) => [
            d(
              "Rheed",
              "Justamente naquele dia, apareceu alguém disposto a dividir o serviço. Separaram as tarefas antes que começasse outra discussão. Uma novidade nesta história.",
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
              "Eles fecharam os dois lados. Na próxima, mantenha uma saída livre.",
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
                "Acabou. O estojo já foi devolvido. Você pode tentar o desafio de novo.",
                "firme",
              ),
              d("Ghork", "Desta vez eu perdi. Vou voltar.", "firme"),
            ]
          : id === "t5"
            ? [
                n(
                  "Ghork é forçado a recuar para uma reentrância do corredor. Os outros continuam retirando o público.",
                ),
                d("Ghork", "Ainda não consegui passar.", "exausto"),
                d("Borun", "Recue por aqui. A saída continua aberta.", "firme"),
              ]
            : [
                d(
                  "Rask",
                  "A equipe adversária venceu esta tentativa. Vocês podem pedir revanche. Falem comigo quando estiverem prontos.",
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
