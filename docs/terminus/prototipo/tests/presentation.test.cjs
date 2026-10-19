const test = require("node:test");
const assert = require("node:assert/strict");
const E = require("../engine");
const C = require("../supplementary");
const P = require("../staging");
const K = require("../catalog");
const A = require("../art");
const { finishScene, play } = require("./helpers.cjs");

test("Inventário cobre corpos, respostas e referências de todas as cenas, incluindo alternativas", () => {
  const data = K.build(),
    ids = new Set(data.records.map((a) => a.id));
  assert.equal(ids.size, data.records.length);
  for (const q of Object.values(C.quests))
    q.pages.forEach((p, page) => {
      for (const choice of [null, ...p.choices.map((_, i) => i)])
        assert.ok(
          data.variants.some(
            (v) => v.scene === q.id && v.page === page && v.choice === choice,
          ),
          `${q.id}.${page}.${choice}`,
        );
    });
  for (const v of data.variants) {
    const p = v.passage;
    assert.ok(
      ["description", "dialogue", "thought", "action"].includes(p.type),
    );
    assert.ok(p.text.trim());
    assert.ok(p.speaker);
    for (const id of p.assets) assert.ok(ids.has(id), id);
    if (p.era === "past") assert.notEqual(p.background, "bg-coreto", p.id);
    if (p.era === "present") assert.equal(p.background, "bg-coreto", p.id);
    if (p.type === "dialogue" && p.speaker !== "Criança")
      assert.equal(A.assets[p.bust].owner, p.speaker);
  }
  for (const a of data.records) {
    for (const field of [
      "brief",
      "format",
      "orientation",
      "source",
      "status",
      "reason",
    ])
      assert.ok(a[field], `${a.id}.${field}`);
    assert.equal(
      new Set(a.uses.map((u) => u.passage)).size,
      a.uses.length,
      a.id,
    );
  }
});

test("As trinta reações dos semifinalistas são consultáveis sem alterar campanha", () => {
  const game = E.create(55),
    before = game.save();
  const all = K.build().variants.filter(
    (v) => v.scene === "fight3" && v.passage.type === "dialogue",
  );
  for (const name of C.pairs.flatMap((p) => p.names)) {
    const lines = new Set(
      all.filter((v) => v.passage.speaker === name).map((v) => v.passage.text),
    );
    assert.equal(lines.size, 3, name);
  }
  K.preview("ending", 1, 0, K.context("C", "Y", "aliados-b"));
  assert.deepEqual(game.save(), before);
});

test("Respostas herdam a composição do corpo, inclusive em contato remoto", () => {
  for (const id of ["classify", "gA3", "retaliation"]) {
    const s = K.context("B", "X", "solo");
    C.quests[id].pages.forEach((p, page) => {
      const body = K.preview(id, page, null, s);
      p.choices.forEach((_, choice) => {
        const result = K.preview(id, page, choice, s);
        const raw = P.resolve(p.choices[choice].response, s)[0];
        if (!raw.background && raw.era === body.at(-1).era)
          assert.equal(
            result[0].background,
            body.at(-1).background,
            `${id}.${page}.${choice}`,
          );
      });
    });
  }
});

test("Descrição preserva busto e retorno do Coreto restaura o passado", () => {
  const s = K.context();
  const frames = K.preview("intro", 2, null, s);
  const i = frames.findIndex(
    (p, i) => i && p.type === "description" && frames[i - 1].bust,
  );
  assert.ok(i > 0);
  assert.equal(frames[i].bust, frames[i - 1].bust);
  const response = K.preview("champion", 2, 2, s);
  assert.ok(response.some((p) => p.era === "present"));
  const past = response.filter((p) => p.era === "past");
  assert.ok(past.length);
  assert.ok(past.every((p) => p.background === "bg-coliseu-entrada"));
});

test("Salvar cada passagem da abertura preserva cursor, composição e a escolha única", () => {
  const game = E.create(135);
  game.dispatch({ type: "start", id: "intro" });
  const seen = new Set();
  while (game.state.scene) {
    const p = E.page(game.state);
    seen.add(p.passage.type);
    const restored = E.restore(game.save());
    assert.deepEqual(E.page(restored.state), p);
    assert.deepEqual(restored.state, game.state);
    if (p.choices.length) {
      game.dispatch({ type: "choose", index: 0 });
      assert.throws(() => game.dispatch({ type: "choose", index: 0 }));
    } else game.dispatch({ type: "advance" });
  }
  assert.ok(seen.has("description"));
  assert.ok(seen.has("dialogue"));
  assert.ok(seen.has("action"));
});

test("Entrega de objeto pode ser retomada sem duplicar recompensa", () => {
  const game = play({ stopAt: (s) => s.stage === 2 && !s.scene }).game;
  const before = game.state.ludos;
  game.dispatch({ type: "start", id: "side2" });
  while (!E.page(game.state).choices.length) game.dispatch({ type: "advance" });
  game.dispatch({ type: "choose", index: 0 });
  while (E.page(game.state).passage.operation !== "give")
    game.dispatch({ type: "advance" });
  const restored = E.restore(game.save());
  assert.deepEqual(E.page(restored.state), E.page(game.state));
  finishScene(restored);
  assert.equal(restored.state.ludos, before + 3);
  assert.throws(() => restored.dispatch({ type: "start", id: "side2" }));
});

test("Visitas repetidas ao Coreto não avançam campanha nem geram recursos", () => {
  const game = E.create(27);
  game.dispatch({ type: "start", id: "intro" });
  finishScene(game);
  const before = game.state;
  for (let i = 0; i < 2; i++) {
    game.dispatch({ type: "start", id: "coreto" });
    finishScene(game);
    assert.equal(game.state.location, "coreto");
    game.dispatch({ type: "leaveCoreto" });
  }
  assert.deepEqual(game.state.progress, before.progress);
  assert.equal(game.state.ludos, before.ludos);
  assert.deepEqual(game.state.completed, before.completed);
  const lines = K.moments.map(
    (m) =>
      K.preview("coreto", 0, null, K.applyMoment(K.context(), m.id))[1].text,
  );
  assert.equal(new Set(lines).size, K.moments.length);
});

test("Mudanças visuais usam as mesmas imagens; CSV preserva inventário e todos os usos", () => {
  const data = K.build();
  const piece = data.records.find((a) => a.id === "obj-peca");
  assert.ok(piece.uses.length >= 3);
  assert.equal(data.records.filter((a) => a.id === "obj-peca").length, 1);
  assert.equal(
    data.records.filter((a) => a.category === "interface").length,
    2,
  );
  const unused = data.records.filter((a) => !a.uses.length);
  assert.ok(unused.some((a) => a.id === "bg-quarta-sede"));
  for (const kind of ["assets", "uses"])
    assert.ok(K.csv(kind).startsWith('\ufeff"'));
});
