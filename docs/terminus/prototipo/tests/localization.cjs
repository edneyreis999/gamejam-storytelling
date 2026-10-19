// Run from the repository root: node --test docs/terminus/prototipo/tests/localization.cjs
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const C = require("../campaign.js");
const E = require("../engine.js");
const K = require("../catalog.js");
const L = require("../localization.js");
const { play, start } = require("./helpers.cjs");

const editorial = path.join(__dirname, "../editorial");
const read = (file) => JSON.parse(fs.readFileSync(path.join(editorial, file), "utf8"));
const records = new Map(L.records.map((record) => [record.pt, record]));
const catalog = K.build();
const parameters = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

function assertTranslation(text, context) {
  const record = records.get(text);
  assert.ok(record, `Missing catalog entry at ${context}: ${text}`);
  L.setLanguage("en-US");
  assert.equal(L.text(text), record.en, context);
  L.setLanguage("pt-BR");
  assert.equal(L.text(text), text, context);
}

test("Every reviewed unit retains its key and both languages in the generated catalog", () => {
  assert.equal(new Set(L.records.map((record) => record.id)).size, L.records.length);
  for (const batch of ["a", "b", "c"]) {
    const inventory = read(`inventory-${batch}.json`);
    const rows = new Map(read(`lote-${batch}.json`).map((row) => [row.id, row]));
    assert.equal(rows.size, inventory.length, `Coverage of batch ${batch}`);
    for (const source of inventory) {
      const row = rows.get(source.id);
      assert.ok(row, source.id);
      assert.equal(row.original, source.original, source.id);
      assert.equal(row.status, "revisado", source.id);
      assert.ok(row.pt.trim() && row.en.trim(), source.id);
      assert.doesNotMatch(row.pt + row.en, /[\r\n]/, source.id);
      L.setLanguage("pt-BR");
      assert.equal(L.t(row.id), row.pt, row.id);
      L.setLanguage("en-US");
      assert.equal(L.t(row.id), row.en, row.id);
    }
  }
});

test("Every narrative variant, choice, quest title and objective is localized", () => {
  const seen = new Set();
  for (const variant of catalog.variants) {
    const passage = variant.passage;
    if (passage.type === "action" || seen.has(passage.text)) continue;
    seen.add(passage.text);
    assertTranslation(passage.text, `${variant.scene}: ${passage.id}`);
  }
  for (const quest of Object.values(C.quests)) {
    assertTranslation(quest.title, `${quest.id} title`);
    for (const step of quest.steps) assertTranslation(step.title, `${quest.id}.${step.id}`);
    quest.pages.forEach((page, index) => {
      for (const choice of page.choices)
        assertTranslation(choice.label, `${quest.id}.${index} choice`);
    });
  }
  assert.ok(seen.size > 900, "The coverage must include alternatives, not one playthrough");
});

test("All forty semifinal reactions remain distinct and available in English", () => {
  let count = 0;
  for (const [speaker, lines] of Object.entries(C.semifinalLines)) {
    assert.equal(lines.length, 4, speaker);
    const english = new Set();
    const staged = new Set(catalog.variants
      .filter((variant) => variant.scene === "fight3" && variant.passage.speaker === speaker)
      .map((variant) => variant.passage.text));
    for (const line of lines) {
      assert.ok(staged.has(line), `${speaker}: missing staged reaction`);
      assertTranslation(line, `${speaker}: semifinal`);
      L.setLanguage("en-US");
      english.add(L.text(line));
      count++;
    }
    assert.equal(english.size, 4, `${speaker}: translated relationship contexts collapsed`);
  }
  assert.equal(count, 40);
});

test("Recruitment blocks, exceptions and invitations outside ordinary previews are covered", () => {
  const dialogue = C.recruitmentDialogue;
  const blocks = [...dialogue.blocks, ...Object.values(dialogue.candidates)];
  assert.equal(blocks.length, 15);
  for (const block of blocks) {
    assertTranslation(block.blocked, "recruitment block");
    assertTranslation(block.accepted, "recruitment exception");
  }
  for (const [name, invitation] of Object.entries(dialogue.invitations))
    assertTranslation(invitation, `${name}: invitation`);
});

test("Quest items and generated receipts translate their item and recipient parameters", () => {
  const approved = read("interface-en.json");
  L.setLanguage("en-US");
  for (const [id, item] of Object.entries(C.items)) {
    assertTranslation(item, `item ${id}`);
    L.setLanguage("en-US");
    for (const source of [`Ghork recebe ${item}.`, `Recebeu ${item}.`, `Usou ${item}.`]) {
      assert.ok(approved[source], `Missing item-specific wording: ${source}`);
      assert.equal(L.text(source), approved[source], id);
    }
    for (const source of [`Ghork entrega ${item} a {p0}.`, `Entregou ${item} a {p0}.`]) {
      assert.ok(approved[source], `Missing item-specific delivery: ${source}`);
      for (const recipient of ["Virmura", "Durn"]) {
        const result = L.text(source.replace("{p0}", recipient));
        assert.equal(result, approved[source].replace("{p0}", recipient), id);
        assert.ok(result.endsWith(`to ${recipient}.`), `Recipient changed: ${id}`);
      }
    }
  }
  assert.equal(L.text("Ghork recebe Lista conferida do pátio."), "Ghork receives the checked yard roster.");
  assert.equal(L.text("Entregou Lista de Virmura a Durn."), "Delivered Virmura's list to Durn.");
  for (const { passage } of catalog.variants.filter((variant) => variant.passage.type === "action")) {
    L.setLanguage("en-US");
    assert.notEqual(L.text(passage.text), passage.text, `Untranslated action: ${passage.id}`);
    assert.doesNotMatch(L.text(passage.text), /\{\w+\}/, passage.id);
    L.setLanguage("pt-BR");
    assert.equal(L.text(passage.text), passage.text, passage.id);
  }
});

test("Template parameters are preserved, required and localized without replacing proper names", () => {
  for (const record of L.records) {
    assert.deepEqual(parameters(record.pt), parameters(record.en), record.id);
    if (!record.template) continue;
    const values = Object.fromEntries(parameters(record.pt).map((name) => [name, "Ghork"]));
    for (const language of ["pt-BR", "en-US"]) {
      L.setLanguage(language);
      assert.doesNotMatch(L.t(record.id, values), /\{\w+\}/, record.id);
      assert.throws(() => L.t(record.id), /Missing parameter/, record.id);
    }
  }
  L.setLanguage("en-US");
  assert.equal(L.text("Concluiu: Noite da História."), "Completed: Story Night.");
  assert.equal(L.text("Fala de Criança"), "Child speaking");
  assert.equal(L.text("Convite de Sura exige intervenção"), "Inviting Sura requires an intervention");
  assert.equal(L.text("Ghork"), "Ghork");
  assert.throws(() => L.t("missing.test.key"), /Unknown localization key/);
  assert.throws(() => L.setLanguage("fr-FR"), /Unsupported language/);
  assert.equal(L.getLanguage(), "en-US");
});

function checkLanguageSwitch(game) {
  const before = game.state;
  const save = game.save();
  const page = E.page(before);
  for (const language of ["en-US", "pt-BR", "en-US", "pt-BR"]) {
    L.setLanguage(language);
    if (page) {
      L.text(page.body);
      page.choices.forEach((choice) => L.text(choice.label));
    }
    before.history.forEach((entry) => L.text(entry));
    assert.deepEqual(game.state, before, "Language switching changed game state");
    assert.deepEqual(game.save(), save, "Language switching appended replay commands");
    assert.deepEqual(E.page(game.state), page, "Language switching advanced the passage");
    assert.deepEqual(E.restore(save).state, before, "Replay depends on display language");
  }
}

test("Switching language preserves reading position, pending choice and replay", () => {
  const game = E.create(123456);
  start(game, "intro");
  checkLanguageSwitch(game);
  while (!E.page(game.state).choices.length) game.dispatch({ type: "advance" });
  checkLanguageSwitch(game);
  game.dispatch({ type: "choose", index: 0 });
  checkLanguageSwitch(game);
});

test("Six guild/route combinations preserve campaign results and saves across both languages", () => {
  for (const guild of "ABC") for (const route of "XY") {
    L.setLanguage("en-US");
    const english = play({ guild, route, mode: "solo", seed: 123456 }).game;
    L.setLanguage("pt-BR");
    const portuguese = play({ guild, route, mode: "solo", seed: 123456 }).game;
    assert.equal(english.state.stage, 4, `${guild}/${route}`);
    assert.deepEqual(english.save(), portuguese.save(), `${guild}/${route}: commands`);
    assert.deepEqual(english.state, portuguese.state, `${guild}/${route}: state`);
    checkLanguageSwitch(english);
  }
});

test("Switching after item effects, recruitment and battle outcomes never repeats effects", () => {
  for (const [seed, outcome, action] of [[1, "failed", "acceptDefeat"], [123456, "won", "acceptVictory"]]) {
    const { game } = play({ guild: "A", route: "X", mode: "max", paid: true, seed,
      stopAt: (state) => !!state.battle });
    assert.equal(E.allyCount(game.state), 5, "Recruitment already applied");
    assert.ok(game.state.flags.meetingIntervention, "Paid choice already applied");
    checkLanguageSwitch(game);
    game.dispatch({ type: "roll" });
    assert.equal(game.state.battle.status, outcome);
    checkLanguageSwitch(game);
    game.dispatch({ type: action });
    checkLanguageSwitch(game);
  }
});
