(function (root) {
  "use strict";
  const C =
    typeof module !== "undefined"
      ? require("./supplementary.js")
      : root.TerminusContent;
  const difficulties = [8, 9, 10, 11, 12, 12];
  const VERSION = 2;
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
    if (!s.guild) return "O";
    return C.matrix[s.guild + (s.xy || "X")][i];
  }
  function opened(s, i) {
    return i < 2 ? s.stage >= 1 : i < 4 ? s.routeProgress === 2 : s.stage >= 3;
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
        s.stage >= 2 &&
        !expired &&
        !!r.outcome &&
        !r.invited &&
        !red &&
        !black,
      canUnlock:
        opened(s, i) &&
        s.stage >= 2 &&
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
                    : "Convite disponível"
                  : "Conflito disponível",
    };
  }
  function primary(s) {
    if (s.stage === 0) return ["intro"];
    if (s.stage === 4) return [];
    if (s.stage === 1) {
      const all = Object.values(s.progress).every((n) => n >= 1),
        ids = [];
      for (const g of Object.keys(C.guilds)) {
        const next = s.progress[g] + 1;
        if (next < 5 || (next === 5 && all && done(s, "champion")))
          ids.push(`g${g}${next}`);
      }
      if (all && !done(s, "champion")) ids.push("champion");
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
    if (i === 4 && !done(s, "uv")) return ["uv"];
    if (i === 5 && !done(s, "celebration")) return ["celebration"];
    if (i === 5 && !done(s, "invasion")) return ["invasion"];
    if (i === 6) return ["ending"];
    return [`fight${i}`];
  }
  function available(s) {
    if (s.scene || s.battle || s.stage === 4) return [];
    const ids = [...primary(s)];
    if (s.stage > 0 && s.stage < 4) ids.push("coreto");
    if (s.stage > 0) {
      const side = `side${s.stage}`;
      if (!done(s, side) && (s.stage !== 3 || !s.tournamentStarted))
        ids.push(side);
      if (s.stage === 2 && done(s, "retaliation") && !done(s, "potionVisit"))
        ids.push("potionVisit");
      C.pairs.forEach((p, i) => {
        if (recruitStatus(s, i).canPlay) ids.push(p.id);
      });
    }
    return ids;
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
      choices:
        last && scene.responseIndex === null
          ? raw.choices.map((c) => ({
              label: c.label,
              cost: c.cost,
              affordable: s.ludos >= c.cost,
            }))
          : [],
    };
  }
  function newScene(id) {
    return {
      quest: id,
      page: 0,
      response: null,
      responseIndex: null,
      cursor: 0,
      visual: {},
    };
  }
  function log(s, text) {
    s.history.push(text);
  }
  function beginBattle(s, i) {
    s.battle = { index: i, status: "ready", die: null, total: null };
    s.rematch = null;
  }
  function complete(s, id) {
    const q = C.quests[id];
    s.scene = null;
    if (q.kind === "fight") {
      beginBattle(s, q.index);
      return;
    }
    if (q.kind === "interlude") {
      s.location = "coreto";
      return;
    }
    if (q.kind === "setback") return;
    if (done(s, id)) throw new Error("Esta cena já foi concluída.");
    s.completed.push(id);
    log(s, `Concluiu: ${q.title}.`);
    if (id === "intro") s.stage = 1;
    if (q.kind === "guild") {
      s.progress[q.guild] = q.step;
      if (q.step === 5) {
        s.guild = q.guild;
        s.stage = 2;
      }
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
  function act(s, a) {
    if (!a || typeof a !== "object") throw new Error("Ação inválida.");
    if (a.type === "start") {
      if (!available(s).includes(a.id))
        throw new Error("Esta cena não está disponível neste momento.");
      s.scene = newScene(a.id);
      s.location = null;
      return;
    }
    if (a.type === "choose") {
      if (!s.scene || s.scene.response !== null || !Number.isInteger(a.index))
        throw new Error("Não há uma escolha disponível.");
      if (!page(s).choices.length)
        throw new Error("Leia o trecho antes de escolher.");
      const raw = C.quests[s.scene.quest].pages[s.scene.page],
        choice = raw.choices[a.index];
      if (!choice) throw new Error("Escolha inexistente.");
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
      const current = page(s);
      if (s.scene.cursor + 1 < current.count) {
        s.scene.cursor++;
        return;
      }
      const quest = C.quests[s.scene.quest],
        raw = quest.pages[s.scene.page];
      s.scene.visual = current.passage.visual;
      if (raw.choices.length && s.scene.response === null)
        throw new Error("Escolha uma resposta antes de continuar.");
      if (s.scene.page + 1 === quest.pages.length) complete(s, quest.id);
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
      b.status = b.total > difficulties[b.index] ? "won" : "failed";
      s.rolls.push({
        battle: b.index,
        die: b.die,
        bonus: allyCount(s),
        total: b.total,
        won: b.status === "won",
      });
      log(
        s,
        `D20: ${b.die} + ${allyCount(s)} = ${b.total}; dificuldade ${difficulties[b.index]}. ${b.status === "won" ? "Vitória." : "Falha."}`,
      );
      return;
    }
    if (a.type === "acceptVictory") {
      if (!s.battle || s.battle.status !== "won")
        throw new Error("A batalha ainda não foi vencida.");
      const i = s.battle.index;
      s.battle = null;
      s.scene = newScene(`after${i}`);
      return;
    }
    if (a.type === "acceptDefeat") {
      if (!s.battle || s.battle.status !== "failed")
        throw new Error("Não há derrota a resolver.");
      const i = s.battle.index;
      s.losses[i]++;
      s.rematch = i;
      s.battle = null;
      s.scene = newScene(`setback${i}`);
      log(s, "Revés aceito. Preparação e revanche gratuitas.");
      return;
    }
    if (s.scene || s.battle || s.stage === 0 || s.stage === 4)
      throw new Error("Termine a cena ou batalha antes desta ação.");
    if (a.type === "leaveCoreto") {
      if (s.location !== "coreto") throw new Error("Você não está no Coreto.");
      s.location = null;
      return;
    }
    if (a.type === "rematch") {
      if (s.rematch === null) throw new Error("Não há revanche disponível.");
      beginBattle(s, s.rematch);
      return;
    }
    if (a.type === "buyReroll") {
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
      } else {
        if (!status.canInvite)
          throw new Error("Este convite ainda não está disponível.");
        r.invited = true;
        log(s, `${r.name} aceitou o convite para o time.`);
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
  };
  if (typeof module !== "undefined") module.exports = root.TerminusEngine;
})(globalThis);
