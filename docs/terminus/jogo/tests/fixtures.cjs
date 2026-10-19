const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test: base, expect } = require('../../../../coreto/tools/qa/runner/node_modules/playwright/test');
const E = require('../../prototipo/engine.js');
const { play, finishQuest, start } = require('../../prototipo/tests/helpers.cjs');
const root = path.resolve(__dirname, '../../../..');
const entry = path.join(root, 'docs/terminus/jogo/index.html');

const test = base.extend({
  serverURL: [async ({}, use) => {
    const server = http.createServer((request, response) => {
      if (request.url === '/favicon.ico') { response.writeHead(204).end(); return; }
      if (request.url === '/__player-test-return') { response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><title>Return test</title><p>Return to Terminus.</p>'); return; }
      const file = path.resolve(root, '.' + decodeURIComponent(request.url.split('?')[0]));
      if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
      fs.readFile(file, (error, data) => {
        if (error) { response.writeHead(404).end(); return; }
        const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
        response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
        response.end(data);
      });
    });
    try {
      await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
      await use(`http://127.0.0.1:${server.address().port}/docs/terminus/jogo/index.html`);
    } finally {
      if (server.listening) await new Promise((resolve, reject) => { server.close(error => error ? reject(error) : resolve()); server.closeAllConnections(); });
    }
  }, { scope: 'worker' }],
  diagnostics: [async ({ page }, use, info) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) errors.push(`${response.status()} ${response.url()}`); });
    page.on('requestfailed', request => errors.push(`${request.failure()?.errorText} ${request.url()}`));
    await use(errors);
    await info.attach('browser-diagnostics', { body: JSON.stringify(errors, null, 2), contentType: 'application/json' });
    expect(errors).toEqual([]);
  }, { auto: true }],
});

function sceneFixture(scene, predicate = () => true, choice = 0) {
  const guild = /^g([ABC])/.exec(scene)?.[1] || 'A';
  const game = play({ guild, mode: 'max', paid: scene === 'ending', stopAt: state => state.scene?.quest === scene }).game;
  for (let i = 0; i < 160; i++) {
    if (!game.state.scene) { start(game, scene); continue; }
    const current = E.page(game.state);
    if (predicate(current)) return game;
    game.dispatch(current.choices.length ? { type: 'choose', index: current.choices[choice].index } : { type: 'advance' });
  }
  throw new Error(`Unreachable scene fixture: ${scene}`);
}

function mapFixture() {
  const game = E.create(123456);
  finishQuest(game, 'intro');
  finishQuest(game, 'gA1');
  game.dispatch({ type: 'map' });
  return game;
}

async function importSave(page, save) {
  await page.locator('#import-file').setInputFiles({ name: 'terminus-v3.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(save)) });
  await expect(page.locator('#modal')).toBeVisible();
  await page.locator('#modal-actions button').last().click();
  await expect(page.locator('#modal')).not.toBeVisible();
}

async function saved(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('terminus-player-v3')));
}
async function state(page) { return E.restore(await saved(page)).state; }
async function settings(page, values) {
  await page.locator('#menu-button').click();
  for (const [key, value] of Object.entries(values)) {
    const control = page.locator('#' + key);
    if (typeof value === 'boolean') await control.setChecked(value);
    else await control.selectOption(value);
  }
  await page.locator('#menu-close').click();
}
async function capture(page, info, name) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  });
  await page.screenshot({ path: info.outputPath(name + '.png'), animations: 'disabled' });
}

module.exports = { test, expect, E, play, sceneFixture, mapFixture, importSave, saved, state, settings, capture, fileURL: pathToFileURL(entry).href };
