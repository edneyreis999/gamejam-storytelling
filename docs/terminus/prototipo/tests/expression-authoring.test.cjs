const test = require("node:test");
const assert = require("node:assert/strict");
const { extract } = require("../scripts/extract-quest-script.cjs");

test("Acting annotations stay out of spoken text and preserve branch conditions", () => {
  const { records } = extract([
    "**Ghork, se guardou:** [expressao=triste] Ainda não consegui.",
    "**Ghork — escolha:**",
    "1. **“Pode contar comigo.”** [expressao=feliz] — **Lala:** [expressao=neutro] Vou cobrar. **Ghork:** [expressao=feliz] Eu sei.",
    "**Mentor:** Virmura: [expressao=triste] “Volte inteiro.” Borun: [expressao=feliz] “Até a volta.” Sevrak: [expressao=neutro] “Observe primeiro.”",
    "**Mentor rejeitado:** Virmura: [expressao=raiva] “Você decidiu.” Borun: [expressao=neutro] “Já ouvi.”",
  ].join("\n"));
  assert.deepEqual(records[0].body, [{
    speaker: "Ghork", condition: ", se guardou", expression: "triste", text: "Ainda não consegui.",
  }]);
  const choice = records.find(record => record.choice);
  assert.equal(choice.choice, "Pode contar comigo.");
  assert.equal(choice.expression, "feliz");
  assert.deepEqual(choice.response.map(p => [p.speaker, p.expression, p.text]), [
    ["Lala", "neutro", "Vou cobrar."], ["Ghork", "feliz", "Eu sei."],
  ]);
  assert.deepEqual(records[3].body.map(p => [p.condition, p.expression]), [
    ["papel:Virmura", "triste"], ["papel:Borun", "feliz"], ["papel:Sevrak", "neutro"],
  ]);
  assert.ok(records[4].body.every(p => p.condition === "primeiro-rejeitado"));
});

test("Unknown acting annotations fail extraction rather than disappearing", () => {
  assert.throws(() => extract("**Ghork:** [expressao=irritado] Não."), /Expressão desconhecida/);
});

test("Every mounted utterance uses its reviewed acting direction in both languages", () => {
  const C = require("../campaign.js");
  const K = require("../catalog.js");
  const A = require("../art.js");
  const L = require("../localization.js");
  const fs = require("node:fs");
  const path = require("node:path");
  const rows = ["a", "b", "c"].flatMap(batch => JSON.parse(fs.readFileSync(
    path.join(__dirname, `../editorial/lote-${batch}.json`), "utf8",
  )));
  const byText = new Map(rows.map(row => [row.pt, row]));
  assert.equal(rows.length, 1156);
  for (const row of rows) {
    assert.equal(row.reviewRound, 2, row.id);
    assert.equal(row.status, "revisado", row.id);
    assert.ok(row.previousPt && row.previousEn, `Missing previous revision: ${row.id}`);
    assert.doesNotMatch(row.pt + row.en, /\[expressao=/, row.id);
  }
  const valid = new Set(["neutro", "feliz", "triste", "raiva", "confuso"]);
  for (const { passage } of K.build().variants) {
    if (!["dialogue", "thought"].includes(passage.type)) continue;
    const row = byText.get(passage.text);
    assert.ok(row, `Utterance absent from review: ${passage.id}: ${passage.text}`);
    const direction = row.expressionOverrides?.find(o => o.passageId === passage.id)?.expression || row.expression;
    assert.ok(valid.has(direction), `Unreviewed acting: ${row.id}`);
    assert.equal(passage.expression, direction, `${passage.id}: ${passage.text}`);
    assert.equal(A.assets[passage.bust].variant, direction, passage.id);
    for (const locale of ["en-US", "pt-BR"]) {
      L.setLanguage(locale);
      assert.equal(L.text(passage.text), locale === "en-US" ? row.en : row.pt);
    }
  }
  for (const record of [...C.recruitmentDialogue.blocks, ...Object.values(C.recruitmentDialogue.candidates)])
    assert.ok(byText.has(record.blocked), record.blocked);
});
