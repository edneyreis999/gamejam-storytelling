(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./campaign.js")
      : root.TerminusContent;
  const difficulties = [8, 9, 10, 11, 12, 12];
  const VERSION = 3;
  const P =
    typeof module !== "undefined"
      ? require("./staging.js")
      : root.TerminusStaging;
  function initial(seed) {
    return {
      seed,
      rng: seed,
      stage: 0,
      location: null,
      returnLocation: null,
      map: { scroll: 0, focus: "virmura" },
      questSteps: {},
      items: {},
      deliveries: [],
      questions: {},
      metCandidates: [],
      pausedScenes: {},
      wins: [],
      guild: null,
      progress: { A: 0, B: 0, C: 0 },
      xy: null,
      intros: [],
      routeProgress: 0,
      recruits: C.pairs.map(() => ({
        outcome: null,
        name: null,
        invited: false,
        paid: false,
      })),
      ludos: 0,
      rerolls: 0,
      flags: {},
      completed: [],
      scene: null,
      battle: null,
      rematch: null,
      tournamentStarted: false,
      tournamentIndex: 0,
      opponents: null,
      history: [],
      losses: [0, 0, 0, 0, 0, 0],
      rolls: [],
    };
  }
  function random(s, n) {
    let x = s.rng;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    s.rng = x >>> 0;
    return Math.floor((s.rng / 4294967296) * n);
  }
  const done = (s, id) => s.completed.includes(id);
  const allyCount = (s) => s.recruits.filter((r) => r.invited).length;
  function code(s, i) {
    if (!s.guild || !invitationWindow(s, i)) return "O";
    return C.matrix[s.guild + (s.xy || "X")][i];
  }
  function invitationWindow(s, i) {
    return (
      s.stage >= 2 && ((i === 1 && s.guild === "A") || s.routeProgress === 2)
    );
  }
  function opened(s, i) {
    return i < 2
      ? done(s, "gA1")
      : i < 4
        ? s.routeProgress === 2
        : s.stage >= 3;
  }
  function recruitStatus(s, i) {
    const r = s.recruits[i],
      access = code(s, i);
    const expired = s.tournamentStarted || s.stage === 4;
    const base = {
      access,
      expired,
      opened: opened(s, i),
      invited: r.invited,
      paid: r.paid,
      outcome: r.outcome,
      name: r.name,
    };
    const red = access === "R" && !r.paid;
    const black = r.outcome && access === `P${r.outcome}` && !r.paid;
    return {
      ...base,
      canPlay: opened(s, i) && !expired && !r.outcome && !red,
      canInvite:
        opened(s, i) &&
        invitationWindow(s, i) &&
        !expired &&
        !!r.outcome &&
        !r.invited &&
        !red &&
        !black,
      canUnlock:
        opened(s, i) &&
        invitationWindow(s, i) &&
        !expired &&
        !r.invited &&
        !r.paid &&
        (red || !!black),
      reason: r.invited
        ? "No time"
        : expired
          ? "Convites encerrados"
          : !opened(s, i)
            ? "Ainda não disponível"
            : red
              ? "Acesso fechado pela trajetória"
              : black
                ? `Convite de ${r.name} exige intervenção`
                : r.outcome
                  ? s.stage < 2
                    ? "Convite após escolher uma guilda"
                    : !invitationWindow(s, i)
                      ? "Convite após concluir a investigação X/Y"
                      : "Convite disponível"
                  : "Conflito disponível",
    };
  }
  function primary(s) {
    if (s.stage === 0) return ["intro"];
    if (s.stage === 4) return [];
    if (s.stage === 1) {
      if (!done(s, "gA1")) return ["gA1"];
      const all = Object.values(s.progress).every((n) => n >= 1),
        ids = [];
      if (all && !done(s, "champion")) return ["champion"];
      if (all && !done(s, "E03")) return ["E03"];
      if (!done(s, "E01")) ids.push("E01");
      if ((s.progress.B >= 3 || s.progress.C >= 3) && !done(s, "E08"))
        ids.push("E08");
      for (const g of Object.keys(C.guilds)) {
        const next = s.progress[g] + 1;
        if (
          next <= 5 &&
          (next === 1 || done(s, "E01")) &&
          !(next === 4 && g !== "A" && !done(s, "E08"))
        )
          ids.push(`g${g}${next}`);
        if (all && next === 6 && s.flags.cartography) ids.push(`commit${g}`);
      }
      return ids;
    }
    if (s.stage === 2) {
      if (!done(s, "retaliation")) return ["retaliation"];
      if (s.intros.length < 2)
        return ["X", "Y"]
          .filter((r) => !s.intros.includes(r))
          .map((r) => `intro${r}`);
      if (!s.xy) return ["alliance"];
      if (s.routeProgress < 2) return [`${s.xy}${s.routeProgress + 1}`];
      return ["classify"];
    }
    if (!s.tournamentStarted) return ["gate"];
    if (s.rematch !== null) return [];
    const i = s.tournamentIndex;
    if (
      done(s, `fight${i}`) &&
      s.wins.includes(`t${i}`) &&
      !done(s, `after${i}`)
    )
      return [`after${i}`];
    if (i === 4 && !done(s, "uv")) return ["uv"];
    if (i === 5 && !done(s, "celebration")) return ["celebration"];
    if (i === 5 && !done(s, "invasion")) return ["invasion"];
    if (i === 6) return ["ending"];
    return [`fight${i}`];
  }
  function available(s) {
    if (s.scene || s.battle || s.stage === 4) return [];
    const ids = [...primary(s)];
    if (!done(s, "gA1")) return ids;
    if (s.stage > 0 && s.stage < 4 && s.location !== "coreto")
      ids.push("coreto");
    if (s.stage > 0) {
      const side = `side${s.stage}`;
      if (!done(s, side) && (s.stage !== 3 || !s.tournamentStarted))
        ids.push(side);
      C.pairs.forEach((p, i) => {
        if (recruitStatus(s, i).canPlay) ids.push(p.id);
      });
    }
    return ids.filter((id) => {
      const st = currentStep(s, id);
      return (
        (!st.requiresWin || s.wins.includes(st.requiresWin)) &&
        [
          ...(st.requires || []),
          ...(st.consume || []),
          ...(st.deliver || []).map((d) => d.item),
        ].every((item) => s.items[item])
      );
    });
  }
  function currentStep(s, id) {
    const q = C.quests[id];
    return q.steps[q.pages[questPage(s, id)].step];
  }
  function questPage(s, id) {
    const q = C.quests[id];
    let index = s.questSteps[id] || 0;
    while (index < q.pages.length) {
      const st = q.steps[q.pages[index].step];
      if (!st.when || st.when(s)) return index;
      index += st.pages.length;
    }
    throw new Error(`Sem etapa pendente: ${id}`);
  }
  function destination(s, id) {
    return C.resolve(currentStep(s, id).location, s);
  }
  function localActions(s) {
    return available(s).filter(
      (id) => id !== "coreto" && destination(s, id) === s.location,
    );
  }
  function itemName(id) {
    return C.items[id] || id;
  }
  function objectives(s) {
    const ids = new Set([
      ...available(s),
      ...Object.keys(s.questSteps),
      ...(s.scene ? [s.scene.quest] : []),
    ]);
    return [...ids]
      .filter((id) => {
        const q = C.quests[id];
        return (
          !done(s, id) &&
          !["interlude", "setback", "conversation"].includes(q.kind) &&
          (s.questSteps[id] || 0) < q.pages.length &&
          !(s.tournamentStarted && q.kind === "recruit") &&
          !(s.guild && q.kind === "guild" && q.guild !== s.guild)
        );
      })
      .map((id) => {
        const q = C.quests[id],
          st =
            s.scene?.quest === id
              ? q.steps[q.pages[s.scene.page].step]
              : currentStep(s, id);
        const location = C.resolve(st.location, s);
        return {
          id,
          title: q.title,
          task: st.title,
          location,
          place: C.places[location]?.[0] || "Noite da História",
        };
      });
  }
  function page(s) {
    if (!s.scene) return null;
    const scene = s.scene,
      quest = C.quests[scene.quest],
      raw = quest.pages[scene.page];
    const passages = P.sequence(
      scene.quest,
      scene.page,
      scene.responseIndex,
      s,
      scene.visual,
    );
    const passage = passages[scene.cursor];
    const last = scene.cursor === passages.length - 1;
    return {
      title: quest.title,
      place: raw.place || quest.place,
      index: scene.page + 1,
      total: quest.pages.length,
      body: passage.text,
      passage,
      cursor: scene.cursor,
      count: passages.length,
      canDefer:
        last &&
        scene.responseIndex === null &&
        raw.choices.length > 0 &&
        ["recruit", "alliance", "uv"].includes(
          quest.kind === "recruit" ? "recruit" : quest.id,
        ),
      choices:
        last && scene.responseIndex === null
          ? raw.choices
              .map((c, index) => ({
                index,
                label: c.label,
                cost: c.cost,
                affordable: s.ludos >= c.cost,
                asked: (
                  s.questions[`${scene.quest}.${scene.page}`] || []
                ).includes(index),
              }))
              .filter((c) => !raw.question || !c.asked)
          : [],
    };
  }
  function newScene(id, page = 0) {
    return {
      quest: id,
      page,
      response: null,
      responseIndex: null,
      cursor: 0,
      visual: {},
    };
  }
  function log(s, text) {
    s.history.push(text);
  }
  function rememberParticipant(s) {
    if (!s.scene || C.quests[s.scene.quest].kind !== "recruit") return;
    const speaker = page(s).passage.speaker;
    if (
      C.pairs.some((pair) => pair.names.includes(speaker)) &&
      !s.metCandidates.includes(speaker)
    )
      s.metCandidates.push(speaker);
  }
  function beginBattle(s, id) {
    const index = id.startsWith("t") ? Number(id.slice(1)) : null;
    s.battle = {
      id,
      index,
      difficulty: index === null ? 8 : difficulties[index],
      status: "ready",
      die: null,
      total: null,
    };
    s.rematch = null;
  }
  function complete(s, id) {
    const q = C.quests[id];
    s.scene = null;
    if (q.kind === "interlude") {
      delete s.questSteps.coreto;
      s.location = "coreto";
      return;
    }
    if (q.kind === "setback") {
      delete s.questSteps[id];
      return;
    }
    if (q.kind === "conversation") {
      delete s.questSteps[id];
      return;
    }
    if (done(s, id)) throw new Error("Esta cena já foi concluída.");
    s.completed.push(id);
    log(s, `Concluiu: ${q.title}.`);
    if (id === "intro") s.stage = 1;
    if (q.kind === "guild") {
      s.progress[q.guild] = q.step;
    }
    if (q.kind === "commit") {
      s.stage = 2;
      s.completed.push("E04");
    }
    if (q.kind === "xyIntro") s.intros.push(q.route);
    if (id === "alliance") s.xy = s.flags.routeChoice;
    if (q.kind === "route") s.routeProgress = q.step;
    if (id === "classify") s.stage = 3;
    if (q.kind === "recruit") {
      const r = s.recruits[q.index];
      r.outcome = s.flags[id];
      r.name = C.pairs[q.index].names[r.outcome === "A" ? 0 : 1];
      s.ludos += C.pairs[q.index].long ? 3 : 2;
    }
    if (q.kind === "side") s.ludos += 3;
    if (id === "gate") {
      s.tournamentStarted = true;
      s.opponents = s.recruits.map(
        (r, i) =>
          C.pairs[i].names[
            r.invited ? (r.outcome === "A" ? 1 : 0) : random(s, 2)
          ],
      );
    }
    if (q.kind === "victory") s.tournamentIndex++;
    if (id === "ending") s.stage = 4;
  }
  function finishStep(s, quest, raw) {
    const st = quest.steps[raw.step];
    for (const { item, to } of st.deliver || []) {
      if (!s.items[item])
        throw new Error(`Você precisa trazer: ${itemName(item)}.`);
      delete s.items[item];
      s.deliveries.push({ item, to, step: `${quest.id}.${st.id}` });
      log(s, `Entregou ${itemName(item)} a ${to}.`);
    }
    for (const item of st.receive || []) {
      s.items[item] = true;
      log(s, `Recebeu ${itemName(item)}.`);
    }
    for (const item of st.consume || []) {
      if (!s.items[item])
        throw new Error(`Você precisa trazer: ${itemName(item)}.`);
      delete s.items[item];
      log(s, `Usou ${itemName(item)}.`);
    }
    if (st.evidence) s.flags.cartography = true;
    if (st.transform) s.flags.transformed = true;
    let next = s.scene.page + 1;
    while (next < quest.pages.length) {
      const nextStep = quest.steps[quest.pages[next].step];
      if (!nextStep.when || nextStep.when(s)) break;
      next += nextStep.pages.length;
    }
    s.questSteps[quest.id] = next;
    if (st.battle) {
      s.scene = null;
      if (quest.kind === "fight") {
        s.completed.push(quest.id);
      }
      beginBattle(s, st.battle);
    } else if (next === quest.pages.length) complete(s, quest.id);
    else if (quest.steps[quest.pages[next].step].automatic) {
      s.scene = newScene(quest.id, next);
      s.location = destination(s, quest.id);
    } else s.scene = null;
  }
  function act(s, a) {
    if (!a || typeof a !== "object") throw new Error("Ação inválida.");
    if (a.type === "start") {
      if (!available(s).includes(a.id))
        throw new Error("Esta cena não está disponível neste momento.");
      if (
        a.id !== "coreto" &&
        a.id !== "intro" &&
        !(s.stage === 1 && a.id === "gA1") &&
        destination(s, a.id) !== s.location
      )
        throw new Error(
          "Vá ao local indicado no mapa antes de iniciar a atividade.",
        );
      const st = currentStep(s, a.id);
      for (const item of [
        ...(st.requires || []),
        ...(st.consume || []),
        ...(st.deliver || []).map((d) => d.item),
      ])
        if (!s.items[item])
          throw new Error(`Você precisa trazer: ${itemName(item)}.`);
      if (st.requiresWin && !s.wins.includes(st.requiresWin))
        throw new Error("Vença o confronto antes de recuperar a carga.");
      if (C.quests[a.id].kind === "commit") s.guild = C.quests[a.id].guild;
      if (a.id === "coreto") s.returnLocation = s.location;
      s.scene = s.pausedScenes[a.id] || newScene(a.id, questPage(s, a.id));
      delete s.pausedScenes[a.id];
      s.location = destination(s, a.id);
      return;
    }
    if (a.type === "defer") {
      if (!s.scene || !page(s).canDefer)
        throw new Error("Esta conversa precisa terminar antes da saída.");
      rememberParticipant(s);
      s.pausedScenes[s.scene.quest] = s.scene;
      s.questSteps[s.scene.quest] = s.scene.page;
      s.scene = null;
      s.location = null;
      return;
    }
    if (a.type === "choose") {
      if (!s.scene || s.scene.response !== null || !Number.isInteger(a.index))
        throw new Error("Não há uma escolha disponível.");
      if (!page(s).choices.length)
        throw new Error("Leia o trecho antes de escolher.");
      rememberParticipant(s);
      const raw = C.quests[s.scene.quest].pages[s.scene.page],
        choice = raw.choices[a.index];
      if (!choice) throw new Error("Escolha inexistente.");
      if (raw.question) {
        const key = `${s.scene.quest}.${s.scene.page}`;
        const asked = s.questions[key] || (s.questions[key] = []);
        if (asked.includes(a.index))
          throw new Error("Esta pergunta já foi investigada.");
        asked.push(a.index);
      }
      if (s.ludos < choice.cost)
        throw new Error(
          "Ludos insuficientes. Escolha uma alternativa gratuita.",
        );
      s.ludos -= choice.cost;
      Object.assign(s.flags, choice.flags);
      s.scene.visual = page(s).passage.visual;
      s.scene.responseIndex = a.index;
      s.scene.cursor = 0;
      s.scene.response = true;
      log(
        s,
        `${C.quests[s.scene.quest].title}: ${choice.label}${choice.cost ? ` (−${choice.cost} Ludo)` : ""}`,
      );
      return;
    }
    if (a.type === "advance") {
      if (!s.scene) throw new Error("Não há cena em andamento.");
      rememberParticipant(s);
      const current = page(s);
      if (s.scene.cursor + 1 < current.count) {
        s.scene.cursor++;
        return;
      }
      const quest = C.quests[s.scene.quest],
        raw = quest.pages[s.scene.page];
      s.scene.visual = current.passage.visual;
      const asked = s.questions[`${s.scene.quest}.${s.scene.page}`] || [];
      if (
        raw.choices.length &&
        s.scene.response === null &&
        (!raw.question || asked.length < raw.choices.length)
      )
        throw new Error("Escolha uma resposta antes de continuar.");
      if (
        raw.question &&
        s.scene.response !== null &&
        asked.length < raw.choices.length
      ) {
        s.scene.response = null;
        s.scene.responseIndex = null;
        s.scene.cursor = P.sequence(quest.id, s.scene.page, null, s).length - 1;
        return;
      }
      if (raw.stepEnd) finishStep(s, quest, raw);
      else {
        s.scene.page++;
        s.scene.response = null;
        s.scene.responseIndex = null;
        s.scene.cursor = 0;
      }
      return;
    }
    if (a.type === "roll") {
      if (!s.battle || s.battle.status === "won")
        throw new Error("Não há batalha aguardando rolagem.");
      if (s.battle.status === "failed") {
        if (s.rerolls < 1)
          throw new Error(
            "Não há cargas. Aceite o revés para preparar uma revanche gratuita.",
          );
        s.rerolls--;
      }
      const b = s.battle;
      b.die = random(s, 20) + 1;
      b.total = b.die + allyCount(s);
      b.status = b.total > b.difficulty ? "won" : "failed";
      s.rolls.push({
        battle: b.id,
        die: b.die,
        bonus: allyCount(s),
        total: b.total,
        won: b.status === "won",
      });
      log(
        s,
        `D20: ${b.die} + ${allyCount(s)} = ${b.total}; dificuldade ${b.difficulty}. ${b.status === "won" ? "Vitória." : "Falha."}`,
      );
      return;
    }
    if (a.type === "acceptVictory") {
      if (!s.battle || s.battle.status !== "won")
        throw new Error("A batalha ainda não foi vencida.");
      const i = s.battle.index;
      s.wins.push(s.battle.id);
      s.battle = null;
      if (i !== null) s.scene = newScene(`after${i}`);
      return;
    }
    if (a.type === "acceptDefeat") {
      if (!s.battle || s.battle.status !== "failed")
        throw new Error("Não há derrota a resolver.");
      const i = s.battle.index,
        id = s.battle.id;
      if (i !== null) s.losses[i]++;
      s.rematch = id;
      s.battle = null;
      s.scene = newScene(`setback-${id}`);
      s.location = id === "B4" ? "borun" : "coliseu";
      log(s, "Revés aceito. Preparação e revanche gratuitas.");
      return;
    }
    if (s.scene || s.battle || s.stage === 0 || s.stage === 4)
      throw new Error("Termine a cena ou batalha antes desta ação.");
    if (a.type === "mapPosition") {
      if (
        s.location !== null ||
        !done(s, "gA1") ||
        !Number.isFinite(a.scroll) ||
        a.scroll < 0 ||
        a.scroll > 2160 ||
        !Object.hasOwn(C.places, a.focus)
      )
        throw new Error("Posição de mapa inválida.");
      s.map = { scroll: a.scroll, focus: a.focus };
      return;
    }
    if (a.type === "visit") {
      if (!done(s, "gA1") || !Object.hasOwn(C.places, a.location))
        throw new Error("Destino indisponível.");
      if (s.rematch === "t5" && a.location !== "coliseu")
        throw new Error(
          "A invasão continua. O recuo fica no corredor do coliseu.",
        );
      if (
        a.scroll !== undefined &&
        (!Number.isFinite(a.scroll) || a.scroll < 0 || a.scroll > 2160)
      )
        throw new Error("Posição de mapa inválida.");
      s.location = a.location;
      s.map = { scroll: a.scroll || 0, focus: a.location };
      return;
    }
    if (a.type === "map") {
      if (!done(s, "gA1"))
        throw new Error("Conclua a apresentação de Virmura.");
      s.location = null;
      return;
    }

    if (a.type === "leaveCoreto") {
      if (s.location !== "coreto") throw new Error("Você não está no Coreto.");
      s.location = s.returnLocation;
      return;
    }
    if (a.type === "rematch") {
      if (s.rematch === null) throw new Error("Não há revanche disponível.");
      const loc = s.rematch === "B4" ? "mercado" : "coliseu";
      if (s.location !== loc)
        throw new Error("Retorne ao local do confronto para a revanche.");
      beginBattle(s, s.rematch);
      return;
    }
    if (a.type === "buyReroll") {
      if (s.location !== "coreto")
        throw new Error(
          "Visite Rheed pelo portal para comprar uma nova rolagem.",
        );
      if (s.ludos < 1)
        throw new Error("É necessário 1 Ludo para comprar uma carga.");
      s.ludos--;
      s.rerolls++;
      log(s, "A criança comprou uma nova rolagem de Rheed (−1 Ludo).");
      return;
    }
    if (a.type === "unlock" || a.type === "invite") {
      if (!Number.isInteger(a.index) || a.index < 0 || a.index >= 5)
        throw new Error("Par de recrutamento inválido.");
      const status = recruitStatus(s, a.index),
        r = s.recruits[a.index];
      if (a.type === "unlock") {
        if (s.location !== C.recruitPlaces[a.index])
          throw new Error("Encontre o responsável no local da missão.");
        if (!status.canUnlock)
          throw new Error(
            "Este acesso não precisa ou não permite intervenção.",
          );
        if (s.ludos < 3)
          throw new Error("São necessários 3 Ludos para esta intervenção.");
        s.ludos -= 3;
        r.paid = true;
        log(
          s,
          `Rheed abriu uma exceção para ${C.pairs[a.index].title} (−3 Ludos).`,
        );
        s.scene = newScene(`unlock${a.index}`);
        s.location = C.recruitPlaces[a.index];
      } else {
        if (!status.canInvite)
          throw new Error("Este convite ainda não está disponível.");
        if (s.location !== C.recruitPlaces[a.index])
          throw new Error("Encontre seu aliado no local do convite.");
        r.invited = true;
        log(s, `${r.name} aceitou o convite para o time.`);
        s.scene = newScene(`invite${a.index}`);
      }
      return;
    }
    throw new Error("Ação desconhecida.");
  }
  function create(seed) {
    if (!Number.isInteger(seed) || seed < 1 || seed > 4294967295)
      throw new Error("Identificador de partida inválido.");
    let state = initial(seed);
    const commands = [];
    return {
      get state() {
        return structuredClone(state);
      },
      dispatch(a) {
        const next = structuredClone(state);
        act(next, a);
        state = next;
        commands.push(structuredClone(a));
        return this.state;
      },
      save() {
        return {
          format: "terminus",
          version: VERSION,
          seed,
          commands: structuredClone(commands),
        };
      },
    };
  }
  function restore(data) {
    if (
      !data ||
      data.format !== "terminus" ||
      data.version !== VERSION ||
      !Array.isArray(data.commands) ||
      data.commands.length > 20000
    )
      throw new Error(
        "Arquivo incompatível. Use uma partida exportada por esta versão de Terminus.",
      );
    const game = create(data.seed);
    for (const command of data.commands) game.dispatch(command);
    return game;
  }
  root.TerminusEngine = {
    create,
    restore,
    available,
    primary,
    page,
    recruitStatus,
    allyCount,
    difficulties,
    code,
    currentStep,
    destination,
    localActions,
    itemName,
    objectives,
  };
  if (typeof module !== "undefined") module.exports = root.TerminusEngine;
})(globalThis);
