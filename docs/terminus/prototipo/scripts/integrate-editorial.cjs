// Dry run by default. Use --write once, then --check. --acorn PATH selects a local Acorn install.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const acornArg = args.indexOf('--acorn');
const write = args.includes('--write');
const readJson = name => JSON.parse(fs.readFileSync(path.join(root, 'editorial', name), 'utf8'));
const inventory = ['a', 'b', 'c'].flatMap(b => readJson(`inventory-${b}.json`));
const revisions = ['a', 'b', 'c'].flatMap(b => readJson(`lote-${b}.json`));
const byId = new Map(revisions.map(r => [r.id, r]));
assert.equal(byId.size, revisions.length, 'Duplicate revision IDs');
assert.equal(inventory.length, revisions.length, 'Inventory/revision count mismatch');
const units = inventory.map(u => {
  const r = byId.get(u.id);
  assert.ok(r, `Missing revision: ${u.id}`);
  assert.equal(r.original, u.original, `Original mismatch: ${u.id}`);
  assert.equal(r.status, 'revisado', `Unreviewed unit: ${u.id}`);
  assert.ok(r.pt && r.en && !/[\r\n]/.test(r.pt), `Invalid prose: ${u.id}`);
  return { ...u, pt: r.pt, matches: [] };
});
const byOriginal = new Map(units.map(u => [u.original, u]));
if (args.includes('--check')) {
  const C = require('../campaign.js');
  const K = require('../catalog.js');
  const Q = require('../quest-script.js');
  const actual = new Set(K.build().variants.filter(v => v.passage.type !== 'action').map(v => v.passage.text));
  for (const q of Object.values(C.quests)) {
    actual.add(q.title);
    q.steps.forEach(s => actual.add(s.title));
    q.pages.forEach(p => p.choices.forEach(c => actual.add(c.label)));
  }
  C.recruitmentDialogue.blocks.forEach(b => actual.add(b.blocked));
  Object.values(C.recruitmentDialogue.candidates).forEach(c => actual.add(c.blocked));
  const missing = units.filter(u => !actual.has(u.pt)).map(u => ({ id: u.id, pt: u.pt }));
  const md = fs.readFileSync(path.join(root, '../storytelling/quests-da-campanha.md'), 'utf8');
  const digest = crypto.createHash('sha256').update(md.replace(/\r\n/g, '\n')).digest('hex');
  assert.equal(Q.sha256, digest, 'quest-script.js needs regeneration');
  console.log(JSON.stringify({ units: units.length, runtimeTexts: actual.size, missing, sourceHashValid: true }, null, 2));
  assert.equal(missing.length, 0, 'Reviewed text is absent from the mounted campaign');
  process.exit(0);
}
const acorn = require(acornArg === -1 ? 'acorn' : path.resolve(args[acornArg + 1]));
const files = [];
const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sourceFile = '../storytelling/quests-da-campanha.md';
const sourcePath = path.join(root, sourceFile);
const markdown = fs.readFileSync(sourcePath, 'utf8');
const parts = markdown.split(/(\r?\n)/);
for (let i = 0; i < parts.length; i += 2) {
  const line = i / 2 + 1;
  const candidates = units.filter(u => u.sources.some(s => s.file === sourceFile && s.line === line));
  if (!candidates.length) continue;
  const pattern = new RegExp(candidates.map(u => escapeRegex(u.original)).sort((a, b) => b.length - a.length).join('|'), 'g');
  parts[i] = parts[i].replace(pattern, original => {
    const u = byOriginal.get(original);
    u.matches.push({ file: sourceFile, line });
    return u.pt;
  });
}
const revisedMarkdown = parts.join('');
assert.equal(markdown.split('\n').length, revisedMarkdown.split('\n').length, 'Markdown line count changed');
files.push({ file: sourceFile, before: markdown, after: revisedMarkdown });

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
const templateRevisions = new Map([
  ['`Q-${route}2 · Até o limite conferido`', {
    text: '`Q-${route}2 · Até onde pudemos verificar`',
    originals: ['Q-X2 · Até o limite conferido', 'Q-Y2 · Até o limite conferido'],
  }],
  ['`Nas quartas, a equipe de Ghork enfrenta ${s.xy === "X" ? "Faíscas" : "Esteios"}, com apoio de uma das guildas que já disputaram esta campanha.`', {
    text: '`Nas quartas de final, a equipe de Ghork enfrenta os ${s.xy === "X" ? "Faíscas" : "Esteios"}, apoiados por uma das guildas adversárias.`',
    originals: [
      'Nas quartas, a equipe de Ghork enfrenta Faíscas, com apoio de uma das guildas que já disputaram esta campanha.',
      'Nas quartas, a equipe de Ghork enfrenta Esteios, com apoio de uma das guildas que já disputaram esta campanha.',
    ],
  }],
]);
let fixedRoute = false;
for (const file of ['campaign.js', 'content.js', 'supplementary.js']) {
  const before = fs.readFileSync(path.join(root, file), 'utf8');
  const ast = acorn.parse(before, { ecmaVersion: 'latest', locations: true });
  const edits = [];
  walk(ast, node => {
    if (node.type === 'Literal' && typeof node.value === 'string') {
      const u = byOriginal.get(node.value);
      if (!u) return;
      u.matches.push({ file, line: node.loc.start.line });
      if (u.original !== u.pt) edits.push({ start: node.start, end: node.end, text: JSON.stringify(u.pt) });
    }
    if (node.type === 'TemplateLiteral') {
      if (!node.expressions.length) {
        const u = byOriginal.get(node.quasis[0].value.cooked);
        if (u) {
          u.matches.push({ file, line: node.loc.start.line });
          if (u.original !== u.pt) edits.push({ start: node.start, end: node.end, text: JSON.stringify(u.pt) });
        }
        return;
      }
      const revision = templateRevisions.get(before.slice(node.start, node.end));
      if (!revision) return;
      for (const original of revision.originals) {
        const u = byOriginal.get(original);
        assert.ok(u, `Template revision missing: ${original}`);
        u.matches.push({ file, line: node.loc.start.line, template: true });
      }
      edits.push({ start: node.start, end: node.end, text: revision.text });
    }
    if (file === 'campaign.js' && node.type === 'CallExpression' && node.callee.name === 'excerpt' && node.arguments[0]?.value === 'resposta-y') {
      assert.ok([1089, 1090].includes(node.arguments[3].value), 'Unexpected Y response range');
      assert.equal(node.arguments[4].value, 1094);
      if (node.arguments[3].value === 1090) {
        edits.push({ start: node.arguments[3].start, end: node.arguments[3].end, text: '1089' });
        fixedRoute = true;
      }
    }
  });
  let after = before;
  edits.sort((a, b) => b.start - a.start);
  let lastStart = before.length;
  for (const edit of edits) {
    assert.ok(edit.end <= lastStart, `Overlapping edits: ${file}`);
    after = after.slice(0, edit.start) + edit.text + after.slice(edit.end);
    lastStart = edit.start;
  }
  if (file === 'campaign.js' && fixedRoute) {
    const anchor = /  quest\(\r?\n    "X1",/g;
    assert.equal([...after.matchAll(anchor)].length, 1, 'Expected one X1 insertion anchor');
    const newline = before.includes('\r\n') ? '\r\n' : '\n';
    after = after.replace(anchor, match => [
      '  // Preserve the existing Y answer at index 0 for version-3 save replay.',
      '  C.quests.alliance.pages',
      '    .find((p) => C.quests.alliance.steps[p.step].id === "resposta-y")',
      '    .choices.reverse();',
      match,
    ].join(newline));
  }
  acorn.parse(after, { ecmaVersion: 'latest' });
  files.push({ file, before, after });
}
const report = {
  status: 'em desenvolvimento',
  mode: write ? 'write' : 'dry-run',
  units: units.length,
  changedText: units.filter(u => u.original !== u.pt).length,
  markdownLines: markdown.split('\n').length,
  fixedYResponseRange: fixedRoute,
  files: files.map(f => ({ file: f.file, changed: f.before !== f.after })),
  unmatched: units.filter(u => u.original !== u.pt && !u.matches.length).map(({ id, original, pt, sources }) => ({ id, original, pt, sources })),
  coverage: units.map(({ id, original, pt, matches }) => ({ id, changed: original !== pt, matches })),
};
if (write) {
  assert.equal(report.unmatched.length, 0, 'Unmatched revisions; inspect the dry-run report before writing');
  for (const f of files) assert.equal(fs.readFileSync(path.join(root, f.file), 'utf8'), f.before, `Concurrent edit: ${f.file}`);
  for (const f of files) if (f.before !== f.after) fs.writeFileSync(path.join(root, f.file), f.after);
  const extraction = spawnSync(process.execPath, [path.join(__dirname, 'extract-quest-script.cjs')], { encoding: 'utf8' });
  assert.equal(extraction.status, 0, extraction.stderr);
}
const reportArg = args.indexOf('--report');
if (reportArg !== -1) fs.writeFileSync(path.resolve(args[reportArg + 1]), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, coverage: undefined }, null, 2));
