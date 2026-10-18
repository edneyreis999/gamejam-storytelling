const test = require("node:test");
const assert = require("node:assert/strict");
const E = require("../engine.js");
const C = require("../content.js");

const { play, finishScene } = require("./helpers.cjs");

for (const guild of ["A", "B", "C"])
  for (const route of ["X", "Y"])
    for (const mode of ["solo", "max", "partial"])
      test(`${guild}${route}: ${mode}, do início ao fim e restauração`, () => {
        const { game } = play({
            guild,
            route,
            mode,
            reverse: route === "Y",
            allGuilds: mode === "max",
          }),
          s = game.state;
        assert.equal(s.guild, guild);
        assert.equal(s.xy, route);
        assert.equal(s.stage, 4);
        assert.equal(s.tournamentIndex, 6);
        assert.equal(
          E.allyCount(s),
          mode === "solo" ? 0 : mode === "max" ? 5 : 3,
        );
        assert.equal(s.completed.filter((id) => /^after/.test(id)).length, 6);
        assert.equal(
          s.completed.filter((id) => /^g[A-C]/.test(id)).length,
          mode === "max" ? 13 : 7,
        );
        assert.equal(s.opponents.length, 5);
        s.recruits.forEach((r, i) => {
          assert.ok(C.pairs[i].names.includes(s.opponents[i]));
          if (r.invited) assert.notEqual(r.name, s.opponents[i]);
        });
        assert.deepEqual(
          E.restore(JSON.parse(JSON.stringify(game.save()))).state,
          s,
        );
        if (mode === "solo") {
          assert.equal(s.ludos, 0);
          assert.equal(s.rerolls, 0);
          assert.ok(!s.history.some((t) => t.includes("Ludo")));
        }
      });
test("Apresentações, sequências e compromisso não podem ser ignorados", () => {
  const game = E.create(123);
  assert.throws(() => game.dispatch({ type: "start", id: "gA5" }));
  game.dispatch({ type: "start", id: "intro" });
  assert.throws(() => game.dispatch({ type: "start", id: "gA1" }));
  assert.throws(() => game.dispatch({ type: "choose", index: 0 }));
  while (!E.page(game.state).choices.length) game.dispatch({ type: "advance" });
  assert.throws(() => game.dispatch({ type: "advance" }));
  finishScene(game);
  assert.throws(() => game.dispatch({ type: "start", id: "gA2" }));
  assert.throws(() => game.dispatch({ type: "invite", index: 0 }));
  assert.throws(() => game.dispatch({ type: "buyReroll" }));
});
test("Resultado resolvido antes da adesão não concede convite nem recompensa repetida", () => {
  const game = E.create(321);
  game.dispatch({ type: "start", id: "intro" });
  finishScene(game);
  game.dispatch({ type: "start", id: "R1" });
  finishScene(game);
  assert.equal(game.state.ludos, 2);
  assert.equal(game.state.recruits[0].outcome, "A");
  assert.equal(E.recruitStatus(game.state, 0).canInvite, false);
  assert.throws(() => game.dispatch({ type: "invite", index: 0 }));
  assert.throws(() => game.dispatch({ type: "start", id: "R1" }));
});
test("Bloqueio preto mantém o desfecho, cobra uma vez e não concede outro herói", () => {
  const { game } = play({
    guild: "A",
    stopAt: (s) => s.stage === 2 && !s.scene,
  });
  game.dispatch({ type: "start", id: "R2" });
  finishScene(game);
  assert.equal(game.state.ludos, 3);
  assert.equal(E.recruitStatus(game.state, 1).canInvite, false);
  game.dispatch({ type: "unlock", index: 1 });
  assert.equal(game.state.ludos, 0);
  game.dispatch({ type: "invite", index: 1 });
  assert.equal(game.state.recruits[1].name, "Sura");
  assert.throws(() => game.dispatch({ type: "unlock", index: 1 }));
  assert.throws(() => game.dispatch({ type: "invite", index: 1 }));
  assert.throws(() => game.dispatch({ type: "start", id: "R2" }));
  assert.equal(game.state.ludos, 0);
});
test("Vermelho libera missão inteira sem cobrar novamente ao convidar", () => {
  const { game } = play({
    guild: "A",
    route: "X",
    stopAt: (s) => s.routeProgress === 2 && !s.scene,
  });
  assert.equal(E.code(game.state, 2), "R");
  assert.throws(() => game.dispatch({ type: "start", id: "R3" }));
  game.dispatch({ type: "start", id: "side2" });
  finishScene(game);
  game.dispatch({ type: "unlock", index: 2 });
  game.dispatch({ type: "start", id: "R3" });
  finishScene(game);
  assert.equal(game.state.ludos, 2);
  game.dispatch({ type: "invite", index: 2 });
  assert.equal(game.state.ludos, 2);
});
test("Intervenção paga preserva alternativa gratuita e não pode gerar saldo negativo", () => {
  const game = E.create(666);
  game.dispatch({ type: "start", id: "intro" });
  finishScene(game);
  game.dispatch({ type: "start", id: "side1" });
  finishScene(game);
  for (const g of ["A", "B", "C"]) {
    game.dispatch({ type: "start", id: `g${g}1` });
    finishScene(game);
  }
  game.dispatch({ type: "start", id: "champion" });
  finishScene(game, { paid: true });
  assert.equal(game.state.ludos, 2);
  assert.equal(game.state.flags.potion, "warned");
});
test("Empate é derrota, carga substitui a tentativa e revanche é gratuita", () => {
  let game;
  for (let seed = 1; seed < 500; seed++) {
    const candidate = play({ seed, stopAt: (s) => s.battle !== null }).game;
    candidate.dispatch({ type: "roll" });
    if (candidate.state.battle.total === 8) {
      game = candidate;
      break;
    }
  }
  assert.ok(game);
  assert.equal(game.state.battle.status, "failed");
  assert.throws(() => game.dispatch({ type: "roll" }));
  game.dispatch({ type: "acceptDefeat" });
  assert.equal(game.state.ludos, 0);
  assert.equal(game.state.losses[0], 1);
  finishScene(game);
  game.dispatch({ type: "rematch" });
  assert.equal(game.state.battle.status, "ready");
});
test("R5 abre antes da confirmação, pausa não fecha convites e o fechamento é definitivo", () => {
  const { game } = play({ stopAt: (s) => s.stage === 3 && !s.scene });
  assert.ok(E.available(game.state).includes("R5"));
  const saved = game.save();
  assert.ok(E.available(E.restore(saved).state).includes("R5"));
  game.dispatch({ type: "start", id: "gate" });
  assert.equal(game.state.tournamentStarted, false);
  finishScene(game);
  assert.equal(game.state.tournamentStarted, true);
  assert.ok(!E.available(game.state).includes("R5"));
  assert.throws(() => game.dispatch({ type: "start", id: "R5" }));
});
test("Importação inválida é rejeitada e não altera a partida original", () => {
  const game = E.create(999),
    before = game.state;
  assert.throws(() =>
    E.restore({
      format: "terminus",
      version: 1,
      seed: 1,
      commands: [{ type: "invite", index: 0 }],
    }),
  );
  assert.deepEqual(game.state, before);
  assert.throws(() => E.restore({ ...game.save(), version: 1 }));
  assert.throws(() => E.restore({ ...game.save(), seed: 0 }));
  assert.throws(() =>
    E.restore({ ...game.save(), commands: [{ type: "start", id: "ending" }] }),
  );
});
test("Salvar durante escolha, resultado e batalha preserva exatamente o momento", () => {
  const game = E.create(99);
  game.dispatch({ type: "start", id: "intro" });
  assert.deepEqual(E.restore(game.save()).state, game.state);
  while (!E.page(game.state).choices.length) game.dispatch({ type: "advance" });
  game.dispatch({ type: "choose", index: 1 });
  assert.deepEqual(E.restore(game.save()).state, game.state);
  const fighting = play({ stopAt: (s) => s.battle !== null }).game;
  fighting.dispatch({ type: "roll" });
  assert.deepEqual(E.restore(fighting.save()).state, fighting.state);
});
test("Cada uma das seis matrizes mantém a distribuição e R1/R2 não dependem de X/Y", () => {
  for (const row of Object.values(C.matrix)) {
    assert.equal(row.filter((x) => x === "O").length, 2);
    assert.equal(row.filter((x) => x.startsWith("P")).length, 2);
    assert.equal(row.filter((x) => x === "R").length, 1);
  }
  for (const g of ["A", "B", "C"])
    assert.deepEqual(
      C.matrix[g + "X"].slice(0, 2),
      C.matrix[g + "Y"].slice(0, 2),
    );
});

for (const guild of ["A", "B", "C"])
  for (const route of ["X", "Y"])
    test(`${guild}${route}: respostas alternativas e outros cinco heróis`, () => {
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
      assert.equal(game.state.flags.justification, "firm");
      assert.equal(E.allyCount(game.state), 5);
      game.state.recruits.forEach((r, i) =>
        assert.equal(r.name, C.pairs[i].names[1]),
      );
    });
test("Duas novas rolagens sucessivas consomem cargas sem criar vitória automática", () => {
  let selected;
  for (let seed = 1; seed <= 200; seed++) {
    const game = play({
      seed,
      mode: "max",
      stopAt: (s) => s.stage === 3 && !s.scene,
    }).game;
    if (game.state.ludos < 2) {
      game.dispatch({ type: "start", id: "side3" });
      finishScene(game);
    }
    game.dispatch({ type: "buyReroll" });
    game.dispatch({ type: "buyReroll" });
    game.dispatch({ type: "start", id: "gate" });
    finishScene(game);
    game.dispatch({ type: "start", id: "fight0" });
    finishScene(game);
    game.dispatch({ type: "roll" });
    if (game.state.battle.status !== "failed") continue;
    game.dispatch({ type: "roll" });
    if (game.state.battle.status === "failed") {
      selected = game;
      break;
    }
  }
  assert.ok(
    selected,
    "Um cenário determinístico deve exercitar duas falhas sucessivas",
  );
  assert.equal(selected.state.rerolls, 1);
  selected.dispatch({ type: "roll" });
  assert.equal(selected.state.rerolls, 0);
  assert.equal(selected.state.rolls.length, 3);
  assert.equal(selected.state.battle.total, selected.state.rolls[2].total);
  assert.throws(() => selected.dispatch({ type: "roll" }));
});
test("A visita ao boticário aceita recusa, amostra e pergunta sem mudar o bônus", () => {
  for (let variant = 0; variant < 3; variant++) {
    const { game } = play({
      stopAt: (s) => s.completed.includes("retaliation") && !s.scene,
    });
    game.dispatch({ type: "start", id: "potionVisit" });
    finishScene(game, { variant });
    assert.equal(
      game.state.flags.sample,
      ["refused", "taken", "questioned"][variant],
    );
    assert.equal(E.allyCount(game.state), 0);
    assert.equal(game.state.ludos, 0);
  }
});
