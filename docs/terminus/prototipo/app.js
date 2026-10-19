(function () {
  "use strict";
  const C = TerminusContent,
    E = TerminusEngine,
    A = TerminusArt,
    K = TerminusCatalog,
    P = TerminusStaging,
    V = TerminusStageView,
    KEY = "terminus-campaign-v2";
  const main = document.querySelector("#main"),
    toolbar = document.querySelector("#toolbar"),
    stats = document.querySelector("#stats");
  const notice = document.querySelector("#notice"),
    modal = document.querySelector("#modal");
  let game = null,
    view = "title",
    storageAvailable = true;
  const arcNames = [
    "A Noite da História",
    "I · Uma bandeira",
    "II · O custo de avançar",
    "III · Quem está do outro lado",
    "Fim da história",
  ];
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else node.setAttribute(k, v);
    }
    for (const child of children.flat()) {
      if (child !== null && child !== undefined)
        node.append(
          typeof child === "string" ? document.createTextNode(child) : child,
        );
    }
    return node;
  }
  function button(label, fn, attrs = {}) {
    const b = el("button", { type: "button", ...attrs }, label);
    b.addEventListener("click", fn);
    return b;
  }
  function inform(text, error = false) {
    notice.hidden = !text;
    notice.textContent = text;
    notice.classList.toggle("error", error);
    notice.setAttribute("role", error ? "alert" : "status");
  }
  function paragraphs(text, parent = main) {
    for (const part of text.split("\n\n")) parent.append(el("p", {}, part));
    return parent;
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(game.save()));
      storageAvailable = true;
    } catch (error) {
      storageAvailable = false;
      inform(
        "O navegador não conseguiu salvar nesta pasta. Você pode continuar e usar “Exportar partida” para guardar o progresso.",
        true,
      );
    }
  }
  function run(action, message = "") {
    try {
      game.dispatch(action);
      persist();
      view = "play";
      if (storageAvailable) inform(message);
      render();
    } catch (error) {
      inform(error.message, true);
    }
  }
  function confirmAction(title, text, accept, label = "Confirmar escolha") {
    document.querySelector("#modal-title").textContent = title;
    const body = document.querySelector("#modal-body");
    body.replaceChildren();
    paragraphs(text, body);
    const actions = document.querySelector("#modal-actions");
    actions.replaceChildren(
      button("Voltar sem alterar", () => modal.close()),
      button(
        label,
        () => {
          modal.close();
          accept();
        },
        { class: "primary" },
      ),
    );
    modal.showModal();
  }
  function download(name, data, type = "application/json") {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = el("a", { href: url, download: name });
    document.body.append(a);
    a.click();
    a.remove();
    window.addEventListener("pagehide", () => URL.revokeObjectURL(url), {
      once: true,
    });
  }
  function newGame() {
    const seed = crypto.getRandomValues(new Uint32Array(1))[0] || 1;
    game = E.create(seed);
    run({ type: "start", id: "intro" });
  }
  function start(id) {
    if (C.quests[id].kind === "guild" && C.quests[id].step === 5) {
      confirmAction(
        "Assumir esta bandeira?",
        `Você apoiará ${C.guilds[C.quests[id].guild].mentor} na seleção. A adesão será irreversível nesta partida. As outras duas guildas passarão a disputar trabalho e o campeonato contra você. Os conflitos de recrutamento já resolvidos serão preservados.`,
        () => run({ type: "start", id }),
        "Assumir o compromisso",
      );
      return;
    }
    if (id === "gate") {
      const s = game.state;
      const pending = C.pairs
        .filter((_, i) => !s.recruits[i].invited)
        .map((p) => p.title);
      confirmAction(
        "Encerrar os recrutamentos?",
        `Seu time tem ${E.allyCount(s)} de 5 aliados possíveis. Você pode vencer sozinho.\n\n${pending.length ? `Pares sem aliado no time: ${pending.join("; ")}.` : "Todos os cinco lugares estão preenchidos."}\n\nConfirmar fecha os convites, inclusive os que dependem de Ludos. Voltar permite cuidar das pendências.`,
        () => run({ type: "start", id }),
        "Revisar o time e avançar",
      );
      return;
    }
    run({ type: "start", id });
  }
  function heading(title, eyebrow) {
    if (eyebrow) main.append(el("p", { class: "eyebrow" }, eyebrow));
    main.append(el("h1", {}, title));
  }
  function nav() {
    toolbar.replaceChildren();
    stats.replaceChildren();
    if (!game) {
      toolbar.append(
        button("Como jogar", () => {
          view = "review";
          render();
        }),
        button("Importar partida", () =>
          document.querySelector("#import-file").click(),
        ),
      );
      return;
    }
    const s = game.state,
      locked = !!s.scene || !!s.battle || s.stage === 0 || s.stage === 4;
    toolbar.append(
      button(view === "title" ? "Continuar partida" : "História", () => {
        view = "play";
        render();
      }),
      button("Diário", () => {
        view = "journal";
        render();
      }),
      button(
        "Coreto",
        () => {
          run({ type: "start", id: "coreto" });
        },
        locked
          ? { disabled: "", title: "Disponível entre cenas e batalhas." }
          : {},
      ),
      button("Exportar partida", () =>
        download(
          "terminus-v2-partida.json",
          JSON.stringify(game.save(), null, 2),
        ),
      ),
      button("Importar partida", () =>
        document.querySelector("#import-file").click(),
      ),
      button("Nova partida", () =>
        confirmAction(
          "Começar outra história?",
          "O salvamento local atual será substituído. Você pode cancelar e exportá-lo antes de recomeçar.",
          newGame,
          "Começar nova partida",
        ),
      ),
    );
    stats.append(
      el("span", {}, arcNames[s.stage]),
      el("span", {}, s.guild ? C.guilds[s.guild].name : "Sem guilda"),
      el(
        "span",
        {},
        `${s.ludos} ${s.ludos === 1 ? "Ludo" : "Ludos"} · ${s.rerolls} ${s.rerolls === 1 ? "nova rolagem" : "novas rolagens"}`,
      ),
      el("span", {}, `${E.allyCount(s)}/5 aliados`),
    );
  }
  function title() {
    const wrap = el("div", { class: "cover" }),
      copy = el("section");
    copy.append(
      el("p", { class: "intro-number" }, "NOITE DA HISTÓRIA"),
      el("h1", {}, "Nem toda vitória\nencerra uma rejeição."),
      el(
        "p",
        { class: "lede" },
        "Chegue a Terminus na pele de Ghork. Escolha uma guilda, encontre aliados e enfrente as pessoas que seguiram outro caminho.",
      ),
      el(
        "p",
        { class: "muted" },
        "V2 · campanha completa, leitura por passagens e inventário de arte. Fundos e bustos ainda usam representações provisórias identificadas.",
      ),
    );
    copy.append(
      button(
        game ? "Continuar a história" : "Sentar para ouvir",
        () => {
          if (game) {
            view = "play";
            render();
          } else newGame();
        },
        { class: "primary" },
      ),
    );
    wrap.append(
      copy,
      el(
        "figure",
        {},
        el("img", {
          src: "assets/coreto.png",
          alt: "Coreto de madeira à luz de lanternas, com um banco para o contador de histórias.",
          width: "1672",
          height: "941",
        }),
        el("figcaption", {}, "Há um lugar para você na Noite da História."),
      ),
    );
    main.append(wrap);
    main.append(
      el(
        "p",
        { class: "muted" },
        "Jogue no seu ritmo. Texto e escolhas aparecem imediatamente. O progresso é salvo neste navegador quando o armazenamento está disponível.",
      ),
    );
  }
  let inspect = true,
    reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let assetId = null,
    assetReturn = "catalog";
  let preview = {
    id: "gA3",
    page: 0,
    choice: null,
    guild: "A",
    route: "X",
    profile: "solo",
    mask: 0,
    stage: 3,
    moment: "tournament",
    cursor: 0,
  };
  let filter = {
    search: "",
    category: "",
    owner: "",
    status: "",
    usage: "used",
  };
  function showAsset(id) {
    assetId = id;
    assetReturn = view;
    view = "asset";
    render();
  }
  function stage(p) {
    return V.render(p, { inspect, reduced, onAsset: showAsset });
  }
  function scene() {
    const s = game.state,
      p = E.page(s);
    heading(
      p.title,
      `${A.assets[p.passage.background].name} · passagem ${p.cursor + 1}/${p.count} · trecho ${p.index}/${p.total}`,
    );
    main.append(stage(p.passage));
    const choices = el("div", {
      class: "choices",
      "aria-label": "Escolhas da cena",
    });
    if (p.choices.length)
      p.choices.forEach((c, index) => {
        const b = button(
          c.label,
          () => run({ type: "choose", index }),
          c.affordable ? {} : { disabled: "" },
        );
        if (c.cost)
          b.append(
            el(
              "small",
              {},
              `${c.cost} Ludo · ${c.affordable ? "intervenção da criança" : "saldo insuficiente"}`,
            ),
          );
        choices.append(b);
      });
    else
      choices.append(
        button("Continuar a história", () => run({ type: "advance" }), {
          class: "primary",
          "data-advance": "",
        }),
      );
    main.append(choices);
  }
  function battle() {
    const s = game.state,
      b = s.battle,
      diff = E.difficulties[b.index];
    heading(C.quests[`fight${b.index}`].title, "Confronto · D20");
    const last = P.sequence(`fight${b.index}`, 0, null, s).at(-1);
    main.append(
      stage({
        ...last,
        type: "action",
        speaker: "Rheed",
        object: null,
        text:
          b.status === "won"
            ? "A tentativa foi bem-sucedida."
            : b.status === "failed"
              ? "Ghork precisa de outra tentativa."
              : "Ghork se prepara para o confronto.",
        id: `fight${b.index}.battle`,
      }),
    );
    const box = el("section", { class: "battle" });
    box.append(
      el(
        "p",
        {},
        "Vence quando a rolagem mais os aliados supera a dificuldade. Empate é falha. Uma derrota permite preparação e revanche gratuitas.",
      ),
      el(
        "dl",
        {},
        el("div", {}, el("dt", {}, "Dificuldade"), el("dd", {}, String(diff))),
        el(
          "div",
          {},
          el("dt", {}, "Bônus dos aliados"),
          el("dd", {}, `+${E.allyCount(s)}`),
        ),
        el(
          "div",
          {},
          el("dt", {}, "Chance nesta rolagem"),
          el("dd", {}, `${Math.min(100, (20 - diff + E.allyCount(s)) * 5)}%`),
        ),
      ),
    );
    if (b.die !== null) {
      box.append(
        el(
          "p",
          { class: "dice-result" },
          `${b.die} + ${E.allyCount(s)} = ${b.total}`,
        ),
        el(
          "p",
          {},
          b.status === "won"
            ? "Vitória. Você superou a dificuldade."
            : b.total === diff
              ? "Empate. É preciso superar a dificuldade."
              : "A tentativa falhou.",
        ),
      );
    }
    const actions = el("div", { class: "actions" });
    if (b.status === "ready")
      actions.append(
        button("Rolar o D20", () => run({ type: "roll" }), {
          class: "primary",
        }),
      );
    if (b.status === "failed") {
      actions.append(
        button(
          `Usar nova rolagem (${s.rerolls} ${s.rerolls === 1 ? "disponível" : "disponíveis"})`,
          () => run({ type: "roll" }),
          s.rerolls ? { class: "primary" } : { disabled: "" },
        ),
        button("Aceitar o revés e preparar revanche", () =>
          run({ type: "acceptDefeat" }),
        ),
      );
    }
    if (b.status === "won")
      actions.append(
        button(
          "Ver o resultado da luta",
          () => run({ type: "acceptVictory" }),
          { class: "primary" },
        ),
      );
    box.append(actions);
    main.append(box);
  }
  function questList(ids) {
    const list = el("ul", { class: "quest-list" });
    for (const id of ids) {
      const q = C.quests[id];
      const label =
        q.kind === "guild"
          ? `${C.guilds[q.guild].mentor} · ${q.title} · ${q.step}/5`
          : q.title;
      list.append(
        el(
          "li",
          {},
          el("span", { class: "meta" }, q.place),
          button(label, () => start(id)),
        ),
      );
    }
    return list;
  }
  function hub() {
    const s = game.state;
    heading(
      s.stage === 0
        ? "A história espera"
        : s.rematch !== null
          ? "Recuperar o fôlego"
          : "Entre uma escolha e outra",
      arcNames[s.stage],
    );
    const layout = el("div", { class: "hub" }),
      story = el("div"),
      side = el("aside", { "aria-label": "Time e recrutamentos" });
    if (s.rematch !== null) {
      story.append(
        el(
          "div",
          { class: "note" },
          el("h2", {}, "Uma tentativa não encerra a história"),
          el(
            "p",
            {},
            "A pausa terminou. Você pode tentar outra vez sem custo.",
          ),
          el(
            "p",
            {},
            "Guedra pede que Ghork reveja um movimento de cada vez. A preparação e a revanche são gratuitas. Os aliados permanecem no time.",
          ),
          button("Voltar para a revanche", () => run({ type: "rematch" }), {
            class: "primary",
          }),
        ),
      );
    }
    const ids = E.available(s),
      primary = E.primary(s);
    const mainSection = el("section");
    mainSection.append(el("h2", {}, "Seguir a história"), questList(primary));
    if (!primary.length && s.rematch === null)
      mainSection.append(
        el("p", {}, "Consulte o diário para acompanhar seu percurso."),
      );
    story.append(mainSection);
    const optional = ids.filter(
      (id) => !primary.includes(id) && C.quests[id].kind !== "recruit",
    );
    if (optional.length) {
      const sec = el("section");
      sec.append(el("h2", {}, "Outros encontros"), questList(optional));
      story.append(sec);
    }
    side.append(
      el("h2", {}, "Pessoas e compromissos"),
      el(
        "p",
        { class: "muted" },
        s.tournamentStarted
          ? "Os convites estão encerrados. Cada aliado acompanha todas as batalhas."
          : "Conhecer, ajudar e convidar são momentos diferentes. Cada par permite um aliado.",
      ),
    );
    C.pairs.forEach((pair, i) => {
      const r = s.recruits[i],
        status = E.recruitStatus(s, i),
        item = el("section", { class: "recruit-item" });
      item.append(
        el("h3", {}, pair.names.join(" / ")),
        el("p", {}, pair.title),
        el("p", { class: "muted" }, status.reason),
      );
      if (status.opened && !status.expired) {
        if (status.access === "PA" || status.access === "PB")
          item.append(
            el(
              "p",
              { class: "muted" },
              `Nesta trajetória, o convite de ${pair.names[status.access === "PA" ? 0 : 1]} exige 3 Ludos, salvo acesso já liberado. A outra alternativa precisa corresponder ao desfecho.`,
            ),
          );
        if (s.stage === 1)
          item.append(
            el(
              "p",
              { class: "muted" },
              "A adesão definirá as restrições de convite. Resolver este conflito não garante recrutamento gratuito.",
            ),
          );
      }
      const actions = el("div", { class: "actions" });
      if (status.canPlay)
        actions.append(button("Conhecer o conflito", () => start(pair.id)));
      if (status.canUnlock)
        actions.append(
          button(
            "Pedir uma exceção · 3 Ludos",
            () =>
              run(
                { type: "unlock", index: i },
                "Acesso liberado. Seu compromisso anterior permanece.",
              ),
            s.ludos >= 3
              ? {}
              : { disabled: "", title: "Você precisa de 3 Ludos." },
          ),
        );
      if (status.canInvite)
        actions.append(
          button(`Convidar ${r.name}`, () =>
            run(
              { type: "invite", index: i },
              `${r.name} aceita representar esse compromisso ao seu lado. O outro integrante do par seguirá com uma equipe diferente.`,
            ),
          ),
        );
      item.append(actions);
      side.append(item);
    });
    layout.append(story, side);
    main.append(layout);
  }
  function coreto() {
    const s = game.state;
    heading("Um intervalo com Rheed", "Noite da História · colorido");
    const passages = P.sequence("coreto", 0, null, s);
    main.append(
      stage(passages.at(-1)),
      el(
        "div",
        { class: "actions" },
        button(
          `Comprar nova rolagem · 1 Ludo (${s.ludos} no saldo)`,
          () => {
            try {
              game.dispatch({ type: "buyReroll" });
              persist();
              render();
              inform("Uma nova rolagem guardada para a próxima falha.");
            } catch (error) {
              inform(error.message, true);
            }
          },
          s.ludos ? { class: "primary" } : { disabled: "" },
        ),
        button("Voltar a Terminus", () => run({ type: "leaveCoreto" })),
      ),
    );
  }
  function transcript() {
    if (!game) return "";
    const replay = E.create(game.save().seed),
      out = [];
    for (const action of game.save().commands) {
      const s = replay.state;
      if (s.scene && (action.type === "choose" || action.type === "advance")) {
        const pg = E.page(s);
        out.push(
          `${pg.title} · ${pg.passage.id}\n${pg.passage.type === "dialogue" || pg.passage.type === "thought" ? pg.passage.speaker + "\n" : ""}${pg.body}`,
        );
      }
      replay.dispatch(action);
    }
    return out.join("\n\n");
  }
  function report() {
    const s = game.state,
      t = transcript(),
      words = t.trim().split(/\s+/).length;
    return `TERMINUS — relatório de percurso\nStatus: em desenvolvimento\nGuilda: ${s.guild || "nenhuma"}; rota: ${s.xy || "nenhuma"}\nAliados: ${
      s.recruits
        .filter((r) => r.invited)
        .map((r) => r.name)
        .join(", ") || "nenhum"
    }\nEtapa: ${arcNames[s.stage]}\nPalavras percorridas: ${words}\nLeitura estimada a 170–220 palavras/minuto: ${Math.round(words / 220)}–${Math.round(words / 170)} min, sem tempo de decisões. Não é medição humana.\n\nHISTÓRICO\n${s.history.join("\n")}\n\nTEXTO PERCORRIDO\n${t}`;
  }
  function journal() {
    const s = game.state;
    heading("O que ficou das escolhas", "Diário de Ghork");
    main.append(
      el(
        "p",
        { class: "lede" },
        s.guild
          ? `Você representa ${C.guilds[s.guild].name}.${s.xy ? ` A investigação seguiu com ${s.xy === "X" ? "Darvek" : "Zagra"}.` : ""}`
          : "Você ainda está conhecendo as guildas.",
      ),
      el(
        "p",
        {},
        `Aliados: ${
          s.recruits
            .filter((r) => r.invited)
            .map((r) => r.name)
            .join(", ") || "nenhum"
        }.`,
      ),
    );
    const list = el("ol", { class: "history" });
    for (const entry of s.history) list.append(el("li", {}, entry));
    if (!s.history.length)
      main.append(el("p", {}, "A história ainda não registrou decisões."));
    main.append(
      list,
      button("Exportar relatório do percurso", () =>
        download("terminus-percurso.txt", report(), "text/plain"),
      ),
      button("Retomar a história", () => {
        view = "play";
        render();
      }),
    );
  }
  function ending() {
    const s = game.state;
    heading("Por hoje, ficamos aqui.", "Terminus · história concluída");
    const box = el("section", { class: "end-summary" });
    box.append(
      el(
        "p",
        {},
        `Ghork conquistou o campeonato pela guilda ${C.guilds[s.guild].name} e derrotou a operação de Neral.`,
      ),
      el(
        "p",
        {},
        `Aliados: ${
          s.recruits
            .filter((r) => r.invited)
            .map((r) => r.name)
            .join(", ") || "Ghork lutou sozinho"
        }.`,
      ),
      el(
        "p",
        {},
        "As guildas mantêm suas diferenças. Torvak sobrevive para responder pelo golpe. A ligação com Daratrine permanece uma pergunta para outro dia.",
      ),
    );
    main.append(
      box,
      el(
        "div",
        { class: "actions" },
        button(
          "Rever minhas escolhas",
          () => {
            view = "journal";
            render();
          },
          { class: "primary" },
        ),
        button("Exportar relatório", () =>
          download("terminus-percurso.txt", report(), "text/plain"),
        ),
        button("Experimentar outro caminho", () =>
          confirmAction(
            "Começar outro percurso?",
            "Exporte a partida ou o relatório se quiser preservar este caminho antes de começar outro.",
            newGame,
            "Começar nova partida",
          ),
        ),
      ),
    );
  }
  function review() {
    heading("Uma campanha para experimentar", "Em desenvolvimento");
    const prose = el("article", { class: "reading" });
    paragraphs(
      "A V2 apresenta a campanha completa como visual novel. Direção de arte mostra as imagens de cada passagem. Cenas e variantes permite consultar alternativas sem alterar sua partida. Inventário de arte reúne os pedidos de desenho, seus usos e a exportação CSV. Os bustos e objetos são representações provisórias identificadas; a V2 não contém as ilustrações finais. As decisões confirmadas vêm da visão do jogo e da base narrativa. Encenação, falas e soluções ainda abertas são hipóteses para avaliar jogando.\n\nEscolha atividades na cidade. Termine cada cena antes de voltar ao Coreto. O diário e a exportação permanecem disponíveis durante a leitura. A adesão a uma guilda e o fechamento dos recrutamentos têm aviso antes da confirmação.\n\nGhork pode concluir a história sozinho e sem gastar Ludos. Batalhas usam D20 + aliados, e é necessário superar a dificuldade. Derrota permite revanche gratuita.\n\nHipóteses desta versão: mapas com orientações diferentes; ruptura institucional; Darvek cauteloso e Zagra com reconhecimento limitado; patrocínio do preterido; conversa privada ou pública antes da final; contribuição a Dam; efeitos narrativos da amostra de Savel.\n\nEconomia experimental: conflitos curtos rendem 2 Ludos, longos 3; três secundárias rendem 3 cada. Intervenções comuns e novas rolagens custam 1; acesso de recrutamento custa 3. Dificuldades: 8, 9, 10, 11, 12 e 12.\n\nO relatório exporta as escolhas e o texto percorrido. Use-o para apontar onde uma consequência parece artificial, uma fala perde a voz do personagem ou uma escolha não oferece informação suficiente.",
      prose,
    );
    main.append(
      prose,
      el(
        "p",
        {},
        el(
          "a",
          { href: "README.md" },
          "Registro de hipóteses e instruções de teste",
        ),
      ),
      button(game ? "Retomar a partida" : "Voltar ao início", () => {
        view = game ? "play" : "title";
        render();
      }),
    );
  }
  function select(label, value, options, change) {
    const id = `field-${label.replace(/[^a-z0-9]/gi, "")}`;
    const input = el("select", { id });
    for (const [v, name] of options) {
      const option = el("option", { value: String(v) }, name);
      option.selected = String(v) === String(value);
      input.append(option);
    }
    input.addEventListener("change", () => change(input.value));
    return el(
      "label",
      { class: "field", for: id },
      el("span", {}, label),
      input,
    );
  }
  const categoryNames = {
    background: "Fundos",
    bust: "Bustos",
    object: "Objetos",
    interface: "Interface",
  };
  function catalog() {
    const data = K.build(),
      used = data.records.filter((a) => a.uses.length);
    heading(
      "Inventário de arte",
      "Produção · contém spoilers de toda a campanha",
    );
    main.append(
      el(
        "p",
        { class: "lede" },
        "Cada imagem é contada uma vez. Abra uma ficha para ver o pedido de desenho e as cenas que o utilizam.",
      ),
    );
    const summary = el("dl", { class: "inventory-totals" });
    for (const [key, label] of Object.entries(categoryNames)) {
      const subset = used.filter((a) => a.category === key);
      const detail =
        key === "bust"
          ? `${new Set(subset.map((a) => a.base)).size} poses-base · ${subset.length} imagens finais`
          : key === "interface"
            ? "componentes em CSS; sem encomenda raster"
            : `${subset.length} imagens finais`;
      summary.append(
        el(
          "div",
          {},
          el("dt", {}, label),
          el("dd", {}, String(subset.length)),
          el("small", {}, detail),
        ),
      );
    }
    main.append(
      summary,
      el(
        "p",
        { class: "muted" },
        `Propostas sem uso fora desses totais: ${data.records.filter((a) => !a.uses.length).length}. Imagens finais solicitadas não equivalem a desenhos do zero. Direção e aparência ainda precisam da aprovação do autor.`,
      ),
    );
    const controls = el("div", { class: "catalog-filters" });
    const search = el("input", {
      type: "search",
      id: "asset-search",
      value: filter.search,
    });
    const form = el(
      "form",
      { class: "search-form" },
      el("label", { for: "asset-search" }, "Buscar imagem ou descrição"),
      search,
      button("Buscar", () => {
        filter.search = search.value;
        render();
      }),
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      filter.search = search.value;
      render();
    });
    controls.append(form);
    controls.append(
      select(
        "Categoria",
        filter.category,
        [["", "Todas"], ...Object.entries(categoryNames)],
        (v) => {
          filter.category = v;
          render();
        },
      ),
      select(
        "Personagem ou local",
        filter.owner,
        [
          ["", "Todos"],
          ...[...new Set(data.records.map((a) => a.owner))]
            .sort()
            .map((v) => [v, v]),
        ],
        (v) => {
          filter.owner = v;
          render();
        },
      ),
      select(
        "Produção",
        filter.status,
        [
          ["", "Todos"],
          ...[...new Set(data.records.map((a) => a.status))].map((v) => [v, v]),
        ],
        (v) => {
          filter.status = v;
          render();
        },
      ),
      select(
        "Uso",
        filter.usage,
        [
          ["used", "Com uso no roteiro"],
          ["unused", "Propostas sem uso"],
          ["all", "Tudo"],
        ],
        (v) => {
          filter.usage = v;
          render();
        },
      ),
    );
    main.append(
      controls,
      el(
        "div",
        { class: "actions" },
        button("Limpar filtros", () => {
          filter = {
            search: "",
            category: "",
            owner: "",
            status: "",
            usage: "used",
          };
          render();
        }),
        button("Exportar inventário CSV", () =>
          download(
            "terminus-v2-inventario.csv",
            K.csv(),
            "text/csv;charset=utf-8",
          ),
        ),
        button("Exportar usos CSV", () =>
          download(
            "terminus-v2-usos.csv",
            K.csv("uses"),
            "text/csv;charset=utf-8",
          ),
        ),
        button("Imprimir catálogo", () => window.print()),
      ),
    );
    const query = A.slug(filter.search);
    const records = data.records.filter(
      (a) =>
        (!filter.category || a.category === filter.category) &&
        (!filter.owner || a.owner === filter.owner) &&
        (!filter.status || a.status === filter.status) &&
        (filter.usage === "all" ||
          (filter.usage === "used" ? a.uses.length : !a.uses.length)) &&
        (!query || A.slug(`${a.name} ${a.id} ${a.brief}`).includes(query)),
    );
    main.append(
      el("p", { role: "status" }, `${records.length} registros neste filtro.`),
    );
    const table = el(
        "table",
        { class: "asset-table" },
        el(
          "thead",
          {},
          el(
            "tr",
            {},
            ...["Imagem", "Tipo / base", "Produção", "Cenas"].map((t) =>
              el("th", { scope: "col" }, t),
            ),
          ),
        ),
      ),
      body = el("tbody");
    for (const a of records)
      body.append(
        el(
          "tr",
          {},
          el(
            "td",
            {},
            button(a.name, () => showAsset(a.id)),
            el("small", { class: "asset-id" }, a.id),
          ),
          el(
            "td",
            {},
            categoryNames[a.category],
            el("small", {}, a.base || a.variant),
          ),
          el("td", {}, a.status),
          el("td", {}, String(new Set(a.uses.map((u) => u.scene)).size)),
        ),
      );
    table.append(body);
    main.append(el("div", { class: "table-scroll" }, table));
    if (!records.length)
      main.append(
        el(
          "p",
          {},
          "Nenhuma imagem corresponde aos filtros. Limpe os filtros para ver o conjunto.",
        ),
      );
    const portraits = used.filter((a) => a.category === "bust");
    main.append(el("h2", {}, "Bustos por personagem"));
    const totals = el("ul", { class: "owner-totals" });
    for (const owner of [...new Set(portraits.map((a) => a.owner))].sort()) {
      const list = portraits.filter((a) => a.owner === owner);
      totals.append(
        el(
          "li",
          {},
          button(owner, () => {
            filter.owner = owner;
            filter.category = "bust";
            render();
          }),
          ` ${new Set(list.map((a) => a.base)).size} ${new Set(list.map((a) => a.base)).size === 1 ? "pose-base" : "poses-base"} · ${list.length} ${list.length === 1 ? "imagem" : "imagens"} · ${list.map((a) => a.name.split(" — ")[1]).join(", ")}`,
        ),
      );
    }
    main.append(totals);
  }
  function openUse(use) {
    preview = {
      id: use.scene,
      page: use.page,
      choice: use.choice,
      guild: use.guild,
      route: use.route,
      profile: use.profile,
      mask: use.mask,
      stage: use.stage,
      moment: use.moment,
      cursor: 0,
    };
    const frames = previewFrames();
    preview.cursor = Math.max(
      0,
      frames.findIndex((p) => p.id === use.passage),
    );
    view = "scenes";
    render();
  }
  function asset() {
    const a = K.build().records.find((a) => a.id === assetId);
    heading(a.name, "Ficha de produção · em desenvolvimento");
    main.append(
      el(
        "div",
        { class: "actions no-print" },
        button("Voltar à consulta", () => {
          view = assetReturn;
          render();
        }),
        button("Imprimir ficha", () => window.print()),
      ),
    );
    const details = el("dl", { class: "brief-meta" });
    for (const [label, value] of [
      ["Identificador", a.id],
      ["Categoria", categoryNames[a.category]],
      ["Personagem / local", a.owner],
      ["Pose-base / relação", a.base || "Imagem-base"],
      ["Variação", a.variant],
      ["Estado editorial", a.editorial],
      ["Produção", a.status],
      ["Arquivo previsto", a.file || "Componente CSS reutilizável"],
      ["Entrega", a.format],
      ["Orientação", a.orientation],
      ["Finalidade", a.reason],
    ])
      details.append(el("dt", {}, label), el("dd", {}, value));
    main.append(details, el("h2", {}, "Pedido de desenho"));
    const prose = el("div", { class: "brief-copy" });
    paragraphs(a.brief, prose);
    main.append(
      prose,
      el("p", {}, el("a", { href: a.source }, "Consultar ficha de referência")),
    );
    const source = el(
      "details",
      {},
      el("summary", {}, "Referência editorial e composição"),
      el("pre", { class: "source-excerpt" }, a.reference),
    );
    main.append(source);
    if (a.preview)
      main.append(
        el(
          "figure",
          {},
          el("img", {
            src: a.preview,
            alt: "Referência existente; não representa aprovação da arte final.",
            class: "reference-image",
          }),
          el(
            "figcaption",
            {},
            "Referência disponível. Conferir a direção antes de produzir a versão final.",
          ),
        ),
      );
    main.append(el("h2", {}, `Onde aparece · ${a.uses.length} passagens`));
    if (!a.uses.length)
      main.append(
        el(
          "p",
          {},
          "Proposta sem uso no roteiro atual. Não incluída no total de imagens solicitadas.",
        ),
      );
    const list = el("ul", { class: "use-list" });
    for (const use of a.uses)
      list.append(
        el(
          "li",
          {},
          button(`${use.title} · ${use.passage}`, () => openUse(use)),
          el(
            "details",
            {},
            el("summary", {}, `${use.contexts.length} contextos de revisão`),
            el("p", {}, use.contexts.join("; ")),
          ),
        ),
      );
    main.append(list);
  }
  function previewFrames() {
    const s = K.applyMoment(
      K.context(preview.guild, preview.route, preview.profile, preview.mask),
      preview.moment,
    );
    return K.preview(preview.id, preview.page, preview.choice, s);
  }
  function scenes() {
    const q = C.quests[preview.id];
    heading(
      "Cenas e variantes",
      "Prévia editorial · contém spoilers · não altera sua partida",
    );
    const controls = el("div", { class: "preview-controls" });
    const reset = () => {
      preview.cursor = 0;
      render();
    };
    controls.append(
      select(
        "Cena",
        preview.id,
        Object.values(C.quests).map((q) => [q.id, `${q.id} · ${q.title}`]),
        (v) => {
          preview.id = v;
          preview.page = 0;
          preview.choice = null;
          reset();
        },
      ),
      select(
        "Trecho",
        preview.page,
        q.pages.map((p, i) => [i, `${i + 1} de ${q.pages.length}`]),
        (v) => {
          preview.page = Number(v);
          preview.choice = null;
          reset();
        },
      ),
      select(
        "Passagem ou resposta",
        preview.choice === null ? "body" : preview.choice,
        [
          ["body", "Cena antes da escolha"],
          ...q.pages[preview.page].choices.map((c, i) => [i, c.label]),
        ],
        (v) => {
          preview.choice = v === "body" ? null : Number(v);
          reset();
        },
      ),
      select(
        "Guilda",
        preview.guild,
        Object.entries(C.guilds).map(([id, g]) => [id, g.name]),
        (v) => {
          preview.guild = v;
          reset();
        },
      ),
      select(
        "Aliança",
        preview.route,
        [
          ["X", "X · Darvek"],
          ["Y", "Y · Zagra"],
        ],
        (v) => {
          preview.route = v;
          reset();
        },
      ),
      select(
        "Contexto",
        preview.profile,
        K.profiles.map((p) => [p.id, p.name]),
        (v) => {
          preview.profile = v;
          reset();
        },
      ),
    );
    if (preview.id === "fight3")
      controls.append(
        select(
          "Adversários sorteados",
          preview.mask,
          Array.from({ length: 32 }, (_, mask) => [
            mask,
            C.pairs.map((p, i) => p.names[(mask >> i) & 1]).join(" / "),
          ]),
          (v) => {
            preview.mask = Number(v);
            reset();
          },
        ),
      );
    if (preview.id === "coreto")
      controls.append(
        select(
          "Momento do intervalo",
          preview.moment,
          K.moments.map((m) => [m.id, m.name]),
          (v) => {
            preview.moment = v;
            reset();
          },
        ),
      );
    main.append(controls);
    const frames = previewFrames();
    preview.cursor = Math.min(preview.cursor, frames.length - 1);
    const p = frames[preview.cursor];
    main.append(
      el(
        "p",
        { class: "preview-title" },
        `${q.title} · ${preview.cursor + 1}/${frames.length}`,
      ),
      stage(p),
    );
    const actions = el(
      "div",
      { class: "actions" },
      button(
        "Passagem anterior",
        () => {
          preview.cursor--;
          render();
        },
        preview.cursor ? {} : { disabled: "" },
      ),
      button(
        "Próxima passagem",
        () => {
          preview.cursor++;
          render();
        },
        preview.cursor < frames.length - 1
          ? { class: "primary" }
          : { disabled: "" },
      ),
    );
    if (preview.cursor === frames.length - 1) {
      if (preview.choice === null && q.pages[preview.page].choices.length)
        q.pages[preview.page].choices.forEach((c, i) =>
          actions.append(
            button(`Rever resposta: ${c.label}`, () => {
              preview.choice = i;
              reset();
            }),
          ),
        );
      else if (preview.page + 1 < q.pages.length)
        actions.append(
          button("Próximo trecho", () => {
            preview.page++;
            preview.choice = null;
            reset();
          }),
        );
    }
    main.append(actions);
    const timeline = el(
      "details",
      {},
      el("summary", {}, "Roteiro deste trecho"),
    );
    const list = el("ol", { class: "timeline" });
    frames.forEach((f, i) =>
      list.append(
        el(
          "li",
          {},
          button(
            `${i + 1}. ${f.type === "description" ? "Painel descritivo" : f.speaker} · ${f.id}`,
            () => {
              preview.cursor = i;
              render();
            },
          ),
          el("p", {}, f.text),
        ),
      ),
    );
    timeline.append(list);
    main.append(timeline);
  }

  function render() {
    if (view === "play" && !game) view = "title";
    document
      .querySelectorAll("[data-view]")
      .forEach((b) =>
        b.setAttribute(
          "aria-current",
          b.dataset.view === view ? "page" : "false",
        ),
      );
    nav();
    const editorial = ["scenes", "catalog", "asset"].includes(view);
    toolbar.hidden = editorial;
    stats.hidden = editorial;
    main.replaceChildren();
    if (view === "title") title();
    else if (view === "review") review();
    else if (view === "journal") journal();
    else if (view === "coreto") coreto();
    else if (view === "catalog") catalog();
    else if (view === "asset") asset();
    else if (view === "scenes") scenes();
    else if (view === "hub") hub();
    else {
      const s = game.state;
      if (s.scene) scene();
      else if (s.battle) battle();
      else if (s.stage === 4) ending();
      else if (s.location === "coreto") coreto();
      else hub();
    }
    main.focus({ preventScroll: true });
  }
  document.addEventListener("keydown", (event) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      (event.target === main ||
        event.target.classList?.contains("description-panel") ||
        event.target.classList?.contains("dialogue-panel"))
    ) {
      const next = main.querySelector("[data-advance]");
      if (next) {
        event.preventDefault();
        next.click();
      }
    }
  });
  document.querySelectorAll("[data-view]").forEach((b) =>
    b.addEventListener("click", () => {
      view = b.dataset.view;
      render();
    }),
  );
  document.querySelector("#art-mode").addEventListener("change", (e) => {
    inspect = e.target.checked;
    render();
  });
  document.querySelector("#reduce-motion").checked = reduced;
  document.querySelector("#reduce-motion").addEventListener("change", (e) => {
    reduced = e.target.checked;
    render();
  });
  document.querySelector("#review-button").addEventListener("click", () => {
    view = "review";
    render();
  });
  document
    .querySelector("#import-file")
    .addEventListener("change", async (event) => {
      const input = event.target,
        file = input.files[0];
      if (!file) return;
      try {
        if (file.size > 2000000)
          throw new Error(
            "Arquivo muito grande. Escolha uma exportação de Terminus de até 2 MB.",
          );
        const imported = E.restore(JSON.parse(await file.text()));
        confirmAction(
          "Usar a partida importada?",
          "A partida local será substituída. Cancele se quiser exportar seu progresso atual primeiro.",
          () => {
            game = imported;
            persist();
            view = "play";
            if (storageAvailable)
              inform("Partida importada. Seu progresso foi reconstruído.");
            render();
          },
          "Usar esta partida",
        );
      } catch (error) {
        inform(
          `Não foi possível importar: ${error.message} A partida atual foi preservada.`,
          true,
        );
      } finally {
        input.value = "";
      }
    });
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) game = E.restore(JSON.parse(saved));
  } catch (error) {
    inform(
      "O salvamento local não pôde ser aberto. Importe uma cópia exportada ou comece uma nova partida. O arquivo anterior não foi alterado.",
      true,
    );
  }
  render();
})();
