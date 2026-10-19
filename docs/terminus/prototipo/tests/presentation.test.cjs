const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const E = require("../engine");
const C = require("../campaign");
const K = require("../catalog");
const A = require("../art");
const files = require("../asset-files");
const script = require("../quest-script");
const { finishScene, finishQuest, start, play } = require("./helpers.cjs");
const data = K.build();

test("Catálogo cobre todas as páginas e respostas aplicáveis sem instruções editoriais", () => {
  const ids = new Set(data.records.map((a) => a.id));
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
  for (const { passage: p } of data.variants) {
    assert.ok(
      ["description", "dialogue", "thought", "action"].includes(p.type),
    );
    assert.ok(p.text.trim());
    assert.doesNotMatch(
      p.text,
      /O jogador pode|Repetir apenas|A quest aguarda|\[guilda|Interface:|Só habilitada|P01/,
    );
    for (const id of p.assets) assert.ok(ids.has(id), id);
    if (p.era === "present") assert.equal(p.background, "bg-coreto", p.id);
    if (p.era === "past") assert.notEqual(p.background, "bg-coreto", p.id);
    if (p.type === "dialogue")
      assert.equal(A.assets[p.bust].owner, p.speaker, p.id);
  }
});

test("Recorte de autoria corresponde ao roteiro usado na montagem", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "../../storytelling/quests-da-campanha.md"),
  );
  assert.equal(
    script.sha256,
    crypto
      .createHash("sha256")
      .update(source.toString("utf8").replace(/\r\n/g, "\n"))
      .digest("hex"),
    "Atualize o recorte e confira os intervalos de campaign.js após alterar a fonte.",
  );
});

test("19 fundos e 51 visuais com cinco expressões existem; bustos têm canal alfa", () => {
  assert.equal(Object.keys(files.backgrounds).length, 19);
  assert.equal(Object.keys(files.portraits).length, 51);
  const read = (relative) =>
    fs.readFileSync(path.resolve(__dirname, "..", relative));
  for (const file of Object.values(files.backgrounds)) {
    const png = read("../../../assets/terminus/locais/" + file + ".png");
    assert.equal(png.toString("ascii", 1, 4), "PNG");
    assert.ok(
      Math.abs(png.readUInt32BE(16) / png.readUInt32BE(20) - 16 / 9) < 0.01,
    );
  }
  for (const portrait of Object.values(files.portraits)) {
    assert.ok(read(portrait.concept).length);
    assert.deepEqual(Object.keys(portrait.files).sort(), [
      "confuso",
      "feliz",
      "neutro",
      "raiva",
      "triste",
    ]);
    for (const file of Object.values(portrait.files)) {
      const png = read(file);
      assert.equal(png[25], 6, file);
      assert.deepEqual(
        [png.readUInt32BE(16), png.readUInt32BE(20)],
        [504, 672],
        file,
      );
    }
  }
  for (const asset of data.records.filter((a) => a.preview))
    assert.ok(read(asset.preview).length, asset.id);
});

test("Identidades, figurantes e três formas de Neral usam seus próprios bustos", () => {
  assert.match(A.assets[A.portrait("Savel")].preview, /neral-disfarce/);
  assert.match(A.assets[A.portrait("Neral")].preview, /neral-revelado/);
  assert.match(
    A.assets[A.portrait("Neral", "hostil", "transformado")].preview,
    /neral-transformado/,
  );
  for (const [name, visual] of [["Lala", "lala"], ["Assaltante", "assaltante-1"], ["Trabalhador", "trabalhador-1"], ["Ferido", "ferido"], ["Testemunha", "testemunha"], ["Veterano", "veterano"], ["Iniciante", "iniciante"]])
    assert.ok(A.assets[A.portrait(name)].preview.includes(`/expressoes/${visual}/`));
  assert.match(A.assets[A.portrait("Trabalhador", "triste", "segundo")].preview, /trabalhador-2/);
  for (const name of ["Responsável pela cisterna", "Pirka e Jorvi", "Representantes dos trabalhadores"])
    assert.equal(A.assets[A.portrait(name)].preview, null);
  assert.match(A.assets[A.portrait("Criança")].preview, /crianca/);
  for (const asset of data.records.filter((a) => a.preview))
    assert.equal(asset.status, "Em avaliação artística");
});

test("Semifinal tem quarenta reações: desconhecido, conhecido, favorecido e preterido", () => {
  const lines = data.variants.filter(
    (v) => v.scene === "fight3" && v.passage.type === "dialogue",
  );
  for (const name of C.pairs.flatMap((p) => p.names))
    assert.deepEqual(
      new Set(
        lines
          .filter((v) => v.passage.speaker === name)
          .map((v) => v.passage.text),
      ),
      new Set(C.semifinalLines[name]),
      name,
    );
});

test("Neral só ingere concentrados na transformação e mantém essa forma até morrer", () => {
  const opening = data.variants.filter((v) => v.scene === "intro");
  assert.ok(
    opening.every(
      (v) =>
        !v.passage.text.includes("Neral") &&
        !v.passage.assets.includes("obj-concentrado"),
    ),
  );
  const death = data.variants.filter(
    (v) => v.scene === "after5" && v.passage.speaker === "Neral",
  );
  assert.ok(death.length);
  assert.ok(death.every((v) => v.passage.bust.includes("transformado")));
});

test("Intervenção paga volta ao presente e restaura o fundo ao retornar para Ghork", () => {
  for (const id of ["commitA", "classify", "celebration"]) {
    const q = C.quests[id],
      page = q.pages.findIndex((p) => p.choices.some((c) => c.cost));
    const choice = q.pages[page].choices.findIndex((c) => c.cost);
    const body = K.preview(id, page, null, K.context());
    const response = K.preview(id, page, choice, K.context());
    assert.ok(response.some((p) => p.era === "present"));
    assert.ok(
      response
        .filter((p) => p.era === "past")
        .every((p) => p.background === body.at(-1).background),
    );
  }
});

test("Salvar cada passagem da abertura preserva cursor, composição e resposta", () => {
  const game = E.create(135);
  start(game, "intro");
  let count = 0;
  while (game.state.scene) {
    const p = E.page(game.state);
    assert.deepEqual(E.page(E.restore(game.save()).state), p);
    count++;
    game.dispatch(
      p.choices.length
        ? { type: "choose", index: p.choices[0].index }
        : { type: "advance" },
    );
  }
  assert.ok(count > 10);
});

test("Entrega encenada retoma sem duplicar item, recibo ou recompensa", () => {
  const game = E.create(135);
  finishQuest(game, "intro");
  finishQuest(game, "gA1");
  start(game, "gB1");
  finishScene(game);
  start(game, "gB1");
  while (E.page(game.state).passage.operation !== "give")
    game.dispatch({ type: "advance" });
  assert.equal(E.page(game.state).passage.recipient, "Jorvi");
  const restored = E.restore(game.save());
  assert.deepEqual(E.page(restored.state), E.page(game.state));
  finishScene(restored);
  assert.ok(restored.state.items["bolsa-materiais"]);
  assert.ok(!restored.state.items["lista-virmura"]);
  assert.equal(
    restored.state.deliveries.filter((d) => d.item === "lista-virmura").length,
    1,
  );
});

test("Catálogo e CSV são consultas isoladas de campanha e persistência", () => {
  const game = play({ stopAt: (s) => s.stage === 2 && !s.scene }).game;
  const before = game.save();
  K.preview("ending", 1, null, K.context("C", "Y", "aliados-b"));
  K.build();
  for (const kind of ["assets", "uses"])
    assert.ok(K.csv(kind).startsWith('\ufeff"'));
  assert.deepEqual(game.save(), before);
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
    assert.equal(new Set(a.uses.map((u) => u.passage)).size, a.uses.length);
  }
});
