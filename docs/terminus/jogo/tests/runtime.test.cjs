const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const A = require('../../prototipo/art.js');
const K = require('../../prototipo/catalog.js');
const sourceLocale = require('../../prototipo/locales/en-US.js');
const context = vm.createContext({});
for (const file of ['art.js', 'map.js', 'locale.js', 'script.js'])
  vm.runInContext(fs.readFileSync(path.join(root, 'runtime', file), 'utf8'), context);

test('Player runtime is synchronized with the production sources', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/build-runtime.cjs'), '--check']);
});

test('Every staged asset keeps its identity and image without production metadata', () => {
  for (const variant of K.build().variants) {
    for (const id of variant.passage.assets) {
      const asset = context.TerminusArt.assets[id];
      assert.ok(asset, `${variant.passage.id}: ${id}`);
      assert.equal(asset.preview, A.assets[id].preview || null);
      assert.equal(asset.owner, A.assets[id].owner);
      for (const key of ['brief', 'reference', 'source', 'status', 'editorial']) assert.equal(asset[key], undefined);
      if (asset.preview) assert.ok(fs.existsSync(path.resolve(root, asset.preview)), asset.preview);
    }
  }
});

test('Retained translations and extracted story preserve the original player content', () => {
  const byId = new Map(sourceLocale.map(record => [record.id, record]));
  for (const record of context.TerminusLocale) {
    assert.equal(record.pt, byId.get(record.id).pt);
    assert.equal(record.en, byId.get(record.id).en);
  }
  const script = require('../../prototipo/quest-script.js');
  assert.deepEqual(JSON.parse(JSON.stringify(context.TerminusQuestScript.records)), JSON.parse(JSON.stringify(script.records)));
});

test('The player entry loads only local runtime and shared gameplay files', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(match => match[1]);
  for (const file of scripts) {
    assert.doesNotMatch(file, /^(?:https?:)?\/\//);
    assert.doesNotMatch(file, /(?:catalog|art-authority|asset-files|app)\.js$|editorial\//);
    assert.ok(fs.existsSync(path.resolve(root, file)), file);
  }
  assert.ok(scripts.includes('../prototipo/engine.js'));
  assert.ok(scripts.includes('../prototipo/campaign.js'));
});
