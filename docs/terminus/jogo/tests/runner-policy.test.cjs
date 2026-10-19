const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const configPath = path.resolve(__dirname, '../../prototipo/tests/narrative.playwright.config.cjs');
const source = fs.readFileSync(configPath, 'utf8');

function configuration(contents) {
  const context = vm.createContext({
    __dirname: path.dirname(configPath), module: { exports: {} }, process: { env: {} },
    require(name) {
      if (name === 'node:fs') return { existsSync: () => contents !== undefined, readFileSync: () => contents };
      if (name === 'node:path') return path;
      if (name.endsWith('playwright/test')) return { defineConfig: value => value };
      throw new Error('Unexpected dependency: ' + name);
    },
  });
  vm.runInContext(source, context);
  return context.module.exports;
}

test('Runner independently resolves defaults and caps workers by both resource limits', () => {
  for (const contents of [undefined, '{}', '{"slowTests":{}}']) {
    const config = configuration(contents);
    assert.equal(config.metadata.maxWorkers, 10);
    assert.equal(config.metadata.maxBrowsers, 10);
    assert.equal(config.workers, 2);
  }
  const config = configuration('{"slowTests":{"maxBrowsers":1}}');
  assert.equal(config.metadata.maxWorkersSource, 'default');
  assert.equal(config.metadata.maxBrowsersSource, 'loki.config.json');
  assert.equal(config.workers, 1);
});

test('Runner rejects malformed policy and invalid present sections or limits', () => {
  for (const contents of ['{', 'null', '[]', '{"slowTests":null}', '{"slowTests":[]}', '{"slowTests":false}', '{"slowTests":{"maxWorkers":0}}', '{"slowTests":{"maxBrowsers":1.5}}', '{"slowTests":{"maxBrowsers":"2"}}'])
    assert.throws(() => configuration(contents), undefined, contents);
});
