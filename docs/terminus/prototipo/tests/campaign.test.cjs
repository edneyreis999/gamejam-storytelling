const test = require("node:test");
const assert = require("node:assert/strict");
const E = require("../engine.js");
const C = require("../campaign.js");
const {
  play,
  finishScene,
  finishQuest,
  finishBattle,
  start,
} = require("./helpers.cjs");
const restored = (game) => E.restore(JSON.parse(JSON.stringify(game.save())));
function opened(seed = 123456) {
  const game = E.create(seed);
  finishQuest(game, "intro");
  finishQuest(game, "gA1");
  return game;
}
function toBattle(id, seed = 123456) {
  return play({ guild: id[0], seed, stopAt: (s) => s.battle?.id === id }).game;
}
for (const guild of "ABC")
  for (const route of "XY")
    for (const mode of ["solo", "max", "partial"])
      test(`${guild}${route}: ${mode}, percurso, itens e save 3`, () => {
        const { game } = play({
          guild,
          route,
          mode,
          reverse: route === "Y",
          allGuilds: mode === "max",
        });
        const s = game.state;
        assert.equal(s.stage, 4);
        assert.equal(s.guild, guild);
        assert.equal(s.xy, route);
        assert.equal(s.tournamentIndex, 6);
        assert.equal(
          E.allyCount(s),
          mode === "solo" ? 0 : mode === "max" ? 5 : 3,
        );
        assert.equal(game.save().version, 3);
        assert.deepEqual(restored(game).state, s);
        assert.equal(s.opponents.length, 5);
        s.recruits.forEach((r, i) => {
          assert.ok(C.pairs[i].names.includes(s.opponents[i]));
          if (r.invited) assert.notEqual(r.name, s.opponents[i]);
        });
        assert.equal(new Set(s.completed).size, s.completed.length);
        assert.equal(
          new Set(s.deliveries.map((d) => d.step + ":" + d.item)).size,
          s.deliveries.length,
        );
        assert.ok(s.flags.cartography);
        assert.ok(s.flags.transformed);
        assert.equal(s.wins.filter((id) => id.startsWith("t")).length, 6);
        if (mode === "solo") {
          assert.equal(s.ludos, 0);
          assert.equal(s.rerolls, 0);
          assert.ok(!s.recruits.some((r) => r.outcome));
        }
      });
for (const guild of "ABC")
  for (const route of "XY")
    test(`${guild}${route}: outros cinco heróis e respostas alternativas`, () => {
      const { game } = play({
        guild,
        route,
        mode: "max",
        variant: 1,
        outcome: "B",
        allGuilds: true,
      });
      assert.equal(game.state.stage, 4);
      assert.equal(game.state.flags.dam, "defer");
      assert.equal(game.state.flags.uv, "V");
      game.state.recruits.forEach((r, i) =>
        assert.equal(r.name, C.pairs[i].names[1]),
      );
    });
test("Q-A1 precede exploração e apresentações B/C", () => {
  const g = E.create(12);
  assert.throws(() => g.dispatch({ type: "visit", location: "mercado" }));
  finishQuest(g, "intro");
  assert.deepEqual(E.available(g.state), ["gA1"]);
  assert.throws(() => start(g, "gB1"));
});
for (const order of [
  ["gB1", "gC1"],
  ["gC1", "gB1"],
])
  test("Apresentações em ordem livre: " + order.join("/"), () => {
    const g = opened();
    order.forEach((id) => finishQuest(g, id));
    assert.equal(g.state.guild, null);
    assert.deepEqual(E.primary(g.state), ["champion"]);
    finishQuest(g, "champion");
    finishQuest(g, "E03");
    assert.throws(() => start(g, "champion"));
  });
test("Cadeias intercaladas e três propostas ouvidas sem adesão", () => {
  const g = opened();
  finishQuest(g, "gB1");
  finishQuest(g, "gC1");
  finishQuest(g, "champion");
  finishQuest(g, "E03");
  finishQuest(g, "E01");
  for (let i = 2; i <= 5; i++)
    for (const x of "ABC") {
      if (i === 4 && x === "B") finishQuest(g, "E08");
      finishQuest(g, `g${x}${i}`);
    }
  assert.equal(g.state.guild, null);
  assert.equal(g.state.stage, 1);
  assert.deepEqual(g.state.progress, { A: 5, B: 5, C: 5 });
  assert.equal(g.state.completed.filter((id) => id === "E08").length, 1);
  finishQuest(g, "commitC");
  assert.equal(g.state.guild, "C");
  assert.ok(!E.available(g.state).some((id) => id.startsWith("gA")));
});
test("Cada guilda resolve os croquis sem completar as outras", () => {
  for (const guild of "ABC") {
    const { game } = play({ guild, stopAt: (s) => s.stage === 2 });
    assert.ok(game.state.flags.cartography);
    for (const other of "ABC")
      if (other !== guild) assert.equal(game.state.progress[other], 1);
  }
});
test("Destino incorreto não recebe item nem inicia a etapa", () => {
  const g = opened();
  start(g, "gB1");
  finishScene(g);
  assert.ok(g.state.items["lista-virmura"]);
  g.dispatch({ type: "visit", location: "oficina" });
  const before = g.state;
  assert.throws(() => g.dispatch({ type: "start", id: "gB1" }));
  assert.deepEqual(g.state, before);
  start(g, "gB1");
  finishScene(g);
  assert.ok(g.state.items["bolsa-materiais"]);
  assert.ok(!g.state.items["lista-virmura"]);
});
test("Recarga entre obtenção e entrega não repete objetos", () => {
  let g = opened();
  start(g, "gB1");
  finishScene(g);
  start(g, "gB1");
  finishScene(g);
  g = restored(g);
  finishQuest(g, "gB1");
  assert.ok(!g.state.items["bolsa-materiais"]);
  assert.equal(
    g.state.deliveries.filter((d) => d.item === "bolsa-materiais").length,
    1,
  );
  assert.throws(() => start(g, "gB1"));
  assert.deepEqual(restored(g).state, g.state);
});
test("Perguntas investigativas são livres, obrigatórias e persistidas", () => {
  let g = opened();
  finishQuest(g, "E01");
  start(g, "gA2");
  while (!E.page(g.state).choices.length) g.dispatch({ type: "advance" });
  const choices = E.page(g.state).choices;
  assert.equal(choices.length, 2);
  g.dispatch({ type: "choose", index: 1 });
  g = restored(g);
  while (!E.page(g.state).choices.length) g.dispatch({ type: "advance" });
  assert.deepEqual(
    E.page(g.state).choices.map((c) => c.index),
    [0],
  );
  assert.throws(() => g.dispatch({ type: "choose", index: 1 }));
  assert.throws(() => g.dispatch({ type: "advance" }));
  finishScene(g);
  assert.ok(g.state.items["registro-retirada"]);
});
for (const id of ["B4", "C4"])
  test(
    id + ": bônus zero, posse antes/depois da vitória e campeonato intacto",
    () => {
      const g = toBattle(id);
      assert.equal(E.allyCount(g.state), 0);
      assert.equal(g.state.battle.difficulty, 8);
      assert.equal(g.state.battle.index, null);
      assert.equal(!!g.state.items.estojo, id === "C4");
      assert.ok(!g.state.items.fardo);
      finishBattle(g);
      assert.equal(g.state.tournamentIndex, 0);
      finishQuest(g, "g" + id);
      assert.equal(g.state.progress[id[0]], 4);
      assert.equal(
        g.state.deliveries.filter(
          (d) => d.item === (id === "B4" ? "fardo" : "estojo"),
        ).length,
        1,
      );
    },
  );
for (const id of ["B4", "C4"])
  test(id + ": empate, rerrolagem e revanche gratuita", () => {
    let g;
    for (let seed = 1; seed < 100; seed++) {
      const x = toBattle(id, seed * 10000);
      x.dispatch({ type: "roll" });
      if (x.state.battle.die === 8) {
        g = x;
        break;
      }
    }
    assert.ok(g);
    assert.equal(g.state.battle.status, "failed");
    assert.throws(() => g.dispatch({ type: "roll" }));
    const before = restored(g);
    assert.deepEqual(before.state, g.state);
    g.dispatch({ type: "acceptDefeat" });
    finishScene(g);
    assert.equal(!!g.state.items.estojo, id === "C4");
    start(g, "coreto");
    finishScene(g);
    g.dispatch({ type: "leaveCoreto" });
    g.dispatch({
      type: "visit",
      location: id === "B4" ? "mercado" : "coliseu",
    });
    g.dispatch({ type: "rematch" });
    assert.equal(g.state.battle.status, "ready");
    assert.equal(g.state.ludos, 0);
  });
test("Ludos: conflito uma vez, convite sem recompensa duplicada", () => {
  const g = opened();
  finishQuest(g, "R1");
  assert.equal(g.state.ludos, 2);
  assert.equal(E.recruitStatus(g.state, 0).canInvite, false);
  assert.throws(() => g.dispatch({ type: "invite", index: 0 }));
  assert.throws(() => start(g, "R1"));
  assert.equal(restored(g).state.ludos, 2);
});
test("Acesso preto cobra 3 e preserva o desfecho", () => {
  const { game: g } = play({
    mode: "max",
    stopAt: (s) => s.stage === 2 && !s.scene,
  });
  const i = 1;
  assert.equal(g.state.recruits[i].outcome, "A");
  assert.equal(E.recruitStatus(g.state, i).canInvite, false);
  const balance = g.state.ludos;
  g.dispatch({ type: "visit", location: C.recruitPlaces[i] });
  g.dispatch({ type: "unlock", index: i });
  assert.equal(g.state.ludos, balance - 3);
  assert.throws(() => g.dispatch({ type: "unlock", index: i }));
  finishScene(g);
  g.dispatch({ type: "visit", location: C.recruitPlaces[i] });
  g.dispatch({ type: "invite", index: i });
  assert.throws(() => g.dispatch({ type: "invite", index: i }));
  assert.equal(g.state.recruits[i].name, "Sura");
});
test("Vermelho fecha conflito até pagar uma única exceção", () => {
  const { game: g } = play({
    mode: "solo",
    stopAt: (s) => s.routeProgress === 2 && !s.scene,
  });
  const i = 2;
  assert.equal(E.recruitStatus(g.state, i).canPlay, false);
  finishQuest(g, "side2");
  g.dispatch({ type: "visit", location: C.recruitPlaces[i] });
  g.dispatch({ type: "unlock", index: i });
  assert.equal(g.state.ludos, 0);
  finishQuest(g, "R3");
  const balance = g.state.ludos;
  g.dispatch({ type: "visit", location: "oficina" });
  g.dispatch({ type: "invite", index: i });
  assert.equal(g.state.ludos, balance);
});
test("R5 antes do fechamento, convites encerrados mesmo em solo", () => {
  const { game: g } = play({ stopAt: (s) => s.stage === 3 && !s.scene });
  assert.ok(E.available(g.state).includes("R5"));
  finishQuest(g, "gate");
  assert.equal(g.state.tournamentStarted, true);
  assert.equal(E.recruitStatus(g.state, 4).canPlay, false);
  assert.throws(() => g.dispatch({ type: "unlock", index: 4 }));
});
test("Semifinal persiste adversários na recarga e na revanche", () => {
  let { game: g } = play({ seed: 1, stopAt: (s) => s.battle?.id === "t3" });
  const team = g.state.opponents;
  g = restored(g);
  assert.deepEqual(g.state.opponents, team);
  g.dispatch({ type: "roll" });
  assert.equal(g.state.battle.status, "failed");
  g.dispatch({ type: "acceptDefeat" });
  finishScene(g);
  g.dispatch({ type: "rematch" });
  assert.deepEqual(g.state.opponents, team);
});
test("Neral se transforma uma vez e recua localmente durante invasão", () => {
  let { game: g } = play({ seed: 1, stopAt: (s) => s.battle?.id === "t5" });
  assert.ok(g.state.flags.transformed);
  g.dispatch({ type: "roll" });
  assert.equal(g.state.battle.status, "failed");
  g.dispatch({ type: "acceptDefeat" });
  finishScene(g);
  assert.throws(() => g.dispatch({ type: "visit", location: "treino" }));
  start(g, "coreto");
  finishScene(g);
  g.dispatch({ type: "leaveCoreto" });
  g.dispatch({ type: "rematch" });
  assert.ok(restored(g).state.flags.transformed);
  assert.equal(g.state.completed.filter((x) => x === "fight5").length, 1);
});
test("Carga custa 1, rerrolagens consomem uma carga e substituem a tentativa", () => {
  const g = opened();
  finishQuest(g, "side1");
  start(g, "coreto");
  finishScene(g);
  g.dispatch({ type: "buyReroll" });
  g.dispatch({ type: "buyReroll" });
  assert.equal(g.state.ludos, 1);
  assert.equal(g.state.rerolls, 2);
  g.dispatch({ type: "leaveCoreto" });
  assert.throws(() => g.dispatch({ type: "buyReroll" }));
});
test("Saves incompatíveis e ações forjadas são rejeitados atomicamente", () => {
  const g = opened();
  const s = g.state;
  for (const version of [1, 2, 4])
    assert.throws(() => E.restore({ ...g.save(), version }));
  const bad = g.save();
  bad.commands.push({ type: "invite", index: 99 });
  assert.throws(() => E.restore(bad));
  assert.deepEqual(g.state, s);
  assert.throws(() => g.dispatch({ type: "visit", location: "inventado" }));
  assert.throws(() =>
    g.dispatch({ type: "visit", location: "mercado", scroll: -1 }),
  );
  assert.deepEqual(g.state, s);
});
test("Coreto não avança etapas e devolve o local", () => {
  const g = opened();
  g.dispatch({ type: "visit", location: "oficina", scroll: 700 });
  const before = g.state;
  for (let i = 0; i < 3; i++) {
    start(g, "coreto");
    finishScene(g);
    g.dispatch({ type: "leaveCoreto" });
  }
  assert.deepEqual(g.state.questSteps, before.questSteps);
  assert.equal(g.state.location, "oficina");
  assert.deepEqual(g.state.map, { scroll: 700, focus: "oficina" });
  assert.equal(g.state.ludos, 0);
});
test("Portal e viagens são recusados durante conversa e batalha", () => {
  const g = opened();
  start(g, "gB1");
  assert.throws(() => start(g, "coreto"));
  assert.throws(() => g.dispatch({ type: "visit", location: "oficina" }));
  const b = toBattle("B4");
  assert.throws(() => start(b, "coreto"));
  assert.throws(() => b.dispatch({ type: "map" }));
});

test("Convites aguardam X/Y, exceto R2 da guilda A", () => {
  for (const guild of "ABC") {
    const { game: g } = play({
      guild,
      stopAt: (s) => s.stage === 2 && !s.scene,
    });
    finishQuest(g, "R1");
    finishQuest(g, "R2");
    for (let i = 0; i < 2; i++) {
      const status = E.recruitStatus(g.state, i);
      if (guild === "A" && i === 1) {
        assert.equal(status.canUnlock, true);
        continue;
      }
      assert.equal(status.canInvite, false);
      assert.equal(status.canUnlock, false);
      assert.match(status.reason, /X\/Y/);
    }
  }
});

test("Adiar uma escolha conserva inspeção, perguntas e cursor após recarga", () => {
  const g = opened();
  start(g, "R1");
  finishScene(g);
  start(g, "R1");
  while (!E.page(g.state).canDefer) g.dispatch({ type: "advance" });
  const before = E.page(g.state),
    questions = g.state.questions;
  g.dispatch({ type: "defer" });
  assert.equal(g.state.location, null);
  assert.equal(g.state.recruits[0].outcome, null);
  const r = restored(g);
  start(r, "R1");
  assert.deepEqual(E.page(r.state), before);
  assert.deepEqual(r.state.questions, questions);
  finishQuest(r, "R1", { outcome: "B" });
  assert.equal(r.state.recruits[0].name, "Nima");
  assert.ok(!r.state.items["etiquetas-patio"]);
});

test("R4 mantém chave em posse entre obtenção e entrega; suspensão não transfere chave", () => {
  for (const outcome of ["A", "B"]) {
    const { game: g } = play({
      guild: "B",
      route: "X",
      stopAt: (s) => s.routeProgress === 2 && !s.scene,
    });
    while (!g.state.completed.includes("R4")) {
      start(g, "R4");
      finishScene(g, { outcome });
      if (g.state.items["chave-cisterna"]) {
        assert.equal(outcome, "B");
        assert.ok(restored(g).state.items["chave-cisterna"]);
        assert.equal(
          g.state.deliveries.filter((d) => d.item === "chave-cisterna").length,
          0,
        );
      }
    }
    assert.equal(
      g.state.deliveries.filter((d) => d.item === "chave-cisterna").length,
      outcome === "B" ? 1 : 0,
    );
  }
});

for (const id of ["B4", "C4"])
  test(`${id}: duas rerrolagens pagas substituem o dado, incluindo após recarga`, () => {
    const g = opened(1);
    finishQuest(g, "side1");
    start(g, "coreto");
    finishScene(g);
    g.dispatch({ type: "buyReroll" });
    g.dispatch({ type: "buyReroll" });
    g.dispatch({ type: "leaveCoreto" });
    finishQuest(g, "gB1");
    finishQuest(g, "gC1");
    finishQuest(g, "champion");
    finishQuest(g, "E03");
    finishQuest(g, "E01");
    for (const n of [2, 3]) finishQuest(g, `g${id[0]}${n}`);
    finishQuest(g, "E08");
    while (!g.state.battle) {
      start(g, "g" + id);
      finishScene(g);
    }
    g.dispatch({ type: "roll" });
    assert.equal(g.state.battle.status, "failed");
    assert.equal(g.state.rerolls, 2);
    g.dispatch({ type: "roll" });
    assert.equal(g.state.battle.status, "failed");
    assert.equal(g.state.rerolls, 1);
    const r = restored(g);
    r.dispatch({ type: "roll" });
    assert.equal(r.state.rerolls, 0);
    assert.equal(r.state.rolls.length, 3);
    assert.equal(r.state.battle.die, r.state.rolls.at(-1).die);
    assert.equal(r.state.tournamentIndex, 0);
  });

test("Intervenções L1/L2/L3 custam um Ludo sem substituir consequências", () => {
  const { game: g } = play({ mode: "max", paid: true });
  for (const flag of [
    "meetingIntervention",
    "scheduleWitness",
    "victorySpeech",
  ])
    assert.ok(g.state.flags[flag], flag);
  const payments = g.save().commands.filter((a) => a.type === "choose").length;
  assert.ok(payments > 3);
  assert.equal(g.state.stage, 4);
  assert.ok(g.state.completed.includes("retaliation"));
  assert.equal(g.state.tournamentIndex, 6);
});

test("Posição livre do mapa sobrevive à exportação e ao portal", () => {
  const g = opened();
  g.dispatch({ type: "map" });
  g.dispatch({ type: "mapPosition", scroll: 900, focus: "minas" });
  const before = g.state.map;
  start(g, "coreto");
  finishScene(g);
  g.dispatch({ type: "leaveCoreto" });
  assert.deepEqual(restored(g).state.map, before);
  assert.equal(g.state.location, null);
});

test("Apresentações vistas ficam conhecidas mesmo antes da primeira etapa concluída", () => {
  const g = opened();
  start(g, "R2");
  while (!E.page(g.state).canDefer) g.dispatch({ type: "advance" });
  g.dispatch({ type: "defer" });
  assert.equal(g.state.recruits[1].outcome, null);
  assert.ok(g.state.metCandidates.includes("Sura"));
  assert.ok(g.state.metCandidates.includes("Edrin"));
  assert.deepEqual(restored(g).state.metCandidates, g.state.metCandidates);
});
