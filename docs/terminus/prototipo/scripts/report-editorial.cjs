// Read-only summary by default; --write refreshes preview metadata in the editorial inventory.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const K = require('../catalog.js');
const directory = path.resolve(__dirname, '../editorial');
const write = process.argv.includes('--write');
const contextSets = {};
const byText = new Map();
for (const variant of K.build().variants) {
  if (variant.passage.type === 'action') continue;
  const contexts = [...variant.contexts].sort();
  const key = 'contexts.' + crypto.createHash('sha256').update(JSON.stringify(contexts)).digest('hex').slice(0, 16);
  if (contextSets[key]) assert.deepEqual(contextSets[key], contexts, 'Context hash collision');
  contextSets[key] = contexts;
  const entry = {
    passageId: variant.passage.id,
    scene: variant.scene,
    page: variant.page,
    choice: variant.choice,
    contextSet: key,
    exampleState: {
      guild: variant.guild,
      route: variant.route,
      profile: variant.profile,
      mask: variant.mask,
      stage: variant.stage,
      moment: variant.moment,
    },
  };
  if (!byText.has(variant.passage.text)) byText.set(variant.passage.text, []);
  byText.get(variant.passage.text).push(entry);
}
const files = [];
const summary = { units: 0, unitsWithVariants: 0, sourceOnly: 0, variants: 0, contextSets: Object.keys(contextSets).length, batches: {} };
const coveredTexts = new Set();
for (const batch of ['a', 'b', 'c']) {
  const file = path.join(directory, `inventory-${batch}.json`);
  const before = fs.readFileSync(file, 'utf8');
  const inventory = JSON.parse(before);
  const revisions = JSON.parse(fs.readFileSync(path.join(directory, `lote-${batch}.json`), 'utf8'));
  const byId = new Map(revisions.map(row => [row.id, row]));
  const counts = { units: inventory.length, unitsWithVariants: 0, sourceOnly: 0, variants: 0 };
  for (const unit of inventory) {
    const row = byId.get(unit.id);
    assert.ok(row, `Missing revision: ${unit.id}`);
    assert.equal(row.original, unit.original, `Original mismatch: ${unit.id}`);
    unit.variants = byText.get(row.pt) || [];
    if (unit.variants.length) {
      coveredTexts.add(row.pt);
      delete unit.conditionSource;
      counts.unitsWithVariants++;
      counts.variants += unit.variants.length;
    } else {
      unit.conditionSource = 'Condições e usos na fonte e nas ocorrências registradas; sem passagem correspondente no catálogo de prévias.';
      counts.sourceOnly++;
    }
  }
  files.push({ file, before, after: JSON.stringify(inventory, null, 2) + '\n' });
  summary.batches[batch] = counts;
  for (const key of ['units', 'unitsWithVariants', 'sourceOnly', 'variants']) summary[key] += counts[key];
}
const unmatchedTexts = [...byText.keys()].filter(text => !coveredTexts.has(text));
assert.deepEqual(unmatchedTexts, [], 'Narrative preview texts missing from the editorial inventory');
if (write) {
  for (const f of files) assert.equal(fs.readFileSync(f.file, 'utf8'), f.before, `Concurrent edit: ${f.file}`);
  for (const f of files) if (f.after !== f.before) fs.writeFileSync(f.file, f.after);
  fs.writeFileSync(path.join(directory, 'variant-contexts.json'), JSON.stringify({
    status: 'em desenvolvimento',
    source: 'catalog.js:build().variants',
    interpretation: 'Contextos observados nas prévias editoriais, não predicados completos de acesso. exampleState reproduz o estado representativo armazenado pelo catálogo; os demais contextos permanecem no conjunto referenciado.',
    indexes: 'page e choice usam índice zero; choice null indica o corpo da página.',
    contexts: contextSets,
  }, null, 2) + '\n');
}
console.log(JSON.stringify({ mode: write ? 'write' : 'read-only', ...summary }, null, 2));
