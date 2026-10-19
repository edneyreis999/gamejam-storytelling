const {
  test, expect, E, play, sceneFixture, mapFixture, importSave, saved, state,
  settings, capture, fileURL,
} = require('./fixtures.cjs');
const L = require('../../prototipo/localization.js');
const map = require('../../prototipo/mapa/manifest.js');
const fs = require('node:fs');

test.use({ hasTouch: true, launchOptions: { ignoreDefaultArgs: ['--disable-back-forward-cache'] } });

for (const transport of ['file', 'http']) test(`P01-${transport}: local title, shared game, no editorial or external resources`, async ({ page, serverURL }, info) => {
  const resources = [];
  page.on('request', request => resources.push(request.url()));
  await page.goto(transport === 'file' ? fileURL : serverURL);
  await expect(page.locator('#start-game')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.locator('body')).not.toContainText(/em avaliação artística|inventário de arte|V3|art direction|development/i);
  await capture(page, info, 'title');
  expect(resources.filter(resource => /(?:catalog|art-authority|asset-files|app)\.js|\/editorial\//.test(resource))).toEqual([]);
  expect(resources.filter(resource => /^https?:/.test(resource) && !resource.startsWith('http://127.0.0.1:'))).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('P02: import confirms replacement and keeps prototype saves untouched', async ({ page }) => {
  const old = JSON.stringify(E.create(98).save());
  await page.addInitScript(value => {
    localStorage.setItem('terminus-campaign-v3', value);
    localStorage.setItem('terminus-campaign-v2', 'legacy-sentinel');
  }, old);
  await page.goto(fileURL);
  const game = sceneFixture('intro', current => current.passage.type === 'dialogue');
  await page.locator('#import-file').setInputFiles({ name: 'scene.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(game.save())) });
  await expect(page.locator('#modal')).toBeVisible();
  expect(await saved(page)).toBeNull();
  await page.locator('#modal-actions button').first().click();
  expect(await saved(page)).toBeNull();
  await importSave(page, game.save());
  expect(await state(page)).toEqual(game.state);
  await settings(page, { language: 'pt-BR' });
  expect(await state(page)).toEqual(game.state);
  await page.reload();
  await page.locator('#continue-game').click();
  expect(await state(page)).toEqual(game.state);
  expect(await page.evaluate(() => localStorage.getItem('terminus-campaign-v3'))).toBe(old);
  expect(await page.evaluate(() => localStorage.getItem('terminus-campaign-v2'))).toBe('legacy-sentinel');
});

test('P03: malformed import leaves the active campaign intact', async ({ page }) => {
  await page.goto(fileURL);
  await importSave(page, mapFixture().save());
  const before = await saved(page);
  await page.locator('#import-file').setInputFiles({ name: 'broken.json', mimeType: 'application/json', buffer: Buffer.from('{broken') });
  await expect(page.locator('#modal, #notice').filter({ hasText: /invalid|incompat|inválido|import|arquivo|file/i }).first()).toBeVisible();
  expect(await saved(page)).toEqual(before);
});

test('P04: typewriter completes before advancing and ignores held Enter', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'text-speed': 'slow', 'reduce-motion': false });
  const game = sceneFixture('intro', current => current.passage.id === 'intro.p1.choice0.1');
  await importSave(page, game.save());
  await page.locator('.advance').click();
  await expect(page.locator('[data-revealing="true"]')).toBeVisible();
  const before = await saved(page);
  await page.locator('.advance').click();
  await expect(page.locator('[data-revealing="true"]')).toHaveCount(0);
  expect(await saved(page)).toEqual(before);
  await page.keyboard.down('Enter');
  const once = await saved(page);
  await page.keyboard.down('Enter');
  await page.keyboard.down('Enter');
  await page.keyboard.up('Enter');
  expect(once.commands.length).toBe(before.commands.length + 1);
  expect(await saved(page)).toEqual(once);
});

test('P05: rapid choice selection commits once', async ({ page }) => {
  await page.goto(fileURL);
  await settings(page, { 'text-speed': 'instant' });
  const game = sceneFixture('intro', current => current.choices.length > 0);
  await importSave(page, game.save());
  const before = await saved(page);
  const button = page.locator('.choices button[data-choice]').first();
  await expect(button).toBeEnabled();
  await button.dblclick();
  const after = await saved(page);
  expect(after.commands.filter(command => command.type === 'choose').length).toBe(before.commands.filter(command => command.type === 'choose').length + 1);
  expect((await state(page)).scene).not.toEqual(game.state.scene);
});

for (const reduced of [false, true]) test(`P06-${reduced ? 'reduced' : 'animated'}: D20 persists once through double click and reload`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'reduce-motion': reduced });
  const game = play({ mode: 'max', seed: 123456, stopAt: current => Boolean(current.battle) }).game;
  await importSave(page, game.save());
  await page.locator('#roll-die').dblclick();
  const rolled = await state(page);
  expect(rolled.rolls.length).toBe(game.state.rolls.length + 1);
  expect(rolled.battle.status).toBe('won');
  await page.reload();
  await page.locator('#continue-game').click();
  expect(await state(page)).toEqual(rolled);
  await expect(page.locator('.dice-result')).toContainText(String(rolled.battle.die));
  await expect(page.locator('#accept-victory')).toBeVisible();
  expect((await saved(page)).commands.filter(command => command.type === 'roll').length).toBe(1);
});

test('P07: walking can be skipped and reload never duplicates the visit', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'reduce-motion': false });
  await importSave(page, mapFixture().save());
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  const before = await saved(page);
  await page.locator('#destination-minas').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#skip-animation')).toBeVisible();
  await page.locator('#skip-animation').click();
  await expect.poll(async () => (await state(page)).location).toBe('minas');
  const after = await saved(page);
  expect(after.commands.filter(command => command.type === 'visit').length).toBe(before.commands.filter(command => command.type === 'visit').length + 1);
  await page.reload();
  await page.locator('#continue-game').click();
  expect(await saved(page)).toEqual(after);
});

test('P08: touch selects first, visits second, and portrait orientation blocks play', async ({ page }) => {
  await page.goto(fileURL);
  await importSave(page, mapFixture().save());
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  const place = map.destinations.find(destination => destination.id === 'minas');
  const box = await page.locator('.landmark[data-id="minas"]').boundingBox();
  const row = place.hitRows[64][0];
  const x = box.x + box.width * (row[0] + row[1]) / 256;
  const y = box.y + box.height * 64.5 / 128;
  await page.touchscreen.tap(x, y);
  expect((await state(page)).location).toBeNull();
  await expect(page.locator('#destination-minas')).toHaveAttribute('aria-pressed', 'true');
  await page.touchscreen.tap(x, y);
  await expect.poll(async () => (await state(page)).location).toBe('minas');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#orientation')).toBeVisible();
});

test('P09: unavailable storage explains recovery and still starts the game', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = function () { throw new DOMException('Storage disabled', 'QuotaExceededError'); }; });
  await page.goto(fileURL);
  await page.locator('#start-game').click();
  await expect(page.locator('[data-passage]')).toBeVisible();
  await expect(page.locator('#notice')).toContainText(/sav|armazen|export/i);
});

const screens = [
  { id: 'dialogue', build: () => sceneFixture('intro', current => current.passage.id === 'intro.p2.body.1') },
  { id: 'choices', build: () => sceneFixture('intro', current => current.choices.length > 0) },
  { id: 'map', build: mapFixture },
  { id: 'battle', build: () => play({ mode: 'max', stopAt: current => Boolean(current.battle) }).game },
  { id: 'ending', build: () => sceneFixture('ending', current => current.passage.id === 'ending.p5.body.1'), narrow: true },
  { id: 'completed', build: () => play({ mode: 'solo' }).game },
];

for (const screen of screens) test(`P10-${screen.id}: English and Portuguese presentation preserves campaign`, async ({ page }, info) => {
  await page.goto(fileURL);
  await settings(page, { 'text-speed': 'instant' });
  const game = screen.build();
  await importSave(page, game.save());
  if (screen.narrow) await page.setViewportSize({ width: 844, height: 390 });
  const before = await saved(page);
  for (const language of ['en-US', 'pt-BR']) {
    await settings(page, { language });
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    if (game.state.scene) {
      const passage = E.page(game.state).passage;
      L.setLanguage(language);
      await expect(page.locator('[data-passage]')).toHaveAttribute('data-passage', passage.id);
      await expect(page.locator('.dialogue-panel, .description-panel')).toContainText(L.text(passage.text));
    }
    if (screen.id === 'map') await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('#orientation')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.asset-error')).toHaveCount(0);
    await capture(page, info, language);
    expect(await saved(page)).toEqual(before);
  }
});

test('P11: diary tabs and locating an objective do not visit or consume rewards', async ({ page }, info) => {
  await page.goto(fileURL);
  await importSave(page, mapFixture().save());
  const before = await state(page);
  await page.locator('#journal-button').click();
  for (const tab of ['objectives', 'items', 'team', 'history']) {
    await page.locator(`.tabs button[data-tab="${tab}"]`).click();
    await expect(page.locator('#journal-content')).toBeVisible();
    await expect(page.locator('#journal-content')).not.toContainText(/\b(?:Q-[A-Z0-9]+|E\d\d|R\d|S\d)\s*·/);
  }
  await capture(page, info, 'journal');
  await page.locator('.tabs button[data-tab="objectives"]').click();
  await page.getByRole('button', { name: /Locate on map|Localizar no mapa/i }).first().click();
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  const after = await state(page);
  expect(after.location).toBeNull();
  expect(after.ludos).toBe(before.ludos);
  expect(after.items).toEqual(before.items);
  expect(after.completed).toEqual(before.completed);
});

test('P12: fresh dialogue keeps choices hidden until its text is revealed', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'text-speed': 'slow', 'reduce-motion': false });
  await page.locator('#start-game').click();
  await expect(page.locator('[data-revealing="true"]')).toBeVisible();
  await expect(page.locator('.choices')).toBeHidden();
  const before = await saved(page);
  await page.locator('.advance').click();
  await expect(page.locator('.choices')).toBeVisible();
  expect(await saved(page)).toEqual(before);
});

test('P13: exported player save restores in the shared V3 engine', async ({ page }, info) => {
  await page.goto(fileURL);
  const game = play({ mode: 'max', stopAt: current => Boolean(current.battle) }).game;
  await importSave(page, game.save());
  await page.locator('#menu-button').click();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export save', exact: true }).click();
  const file = await downloaded;
  const output = info.outputPath('player-save.json');
  await file.saveAs(output);
  const exported = JSON.parse(fs.readFileSync(output, 'utf8'));
  expect(exported.version).toBe(3);
  expect(E.restore(exported).state).toEqual(game.state);
});

test('P14: reload during walking keeps a valid map save without an extra visit', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'reduce-motion': false });
  await importSave(page, mapFixture().save());
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  await page.locator('#destination-minas').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#skip-animation')).toBeVisible();
  const during = await saved(page);
  expect(E.restore(during).state.location).toBeNull();
  await page.reload();
  await page.locator('#continue-game').click();
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  expect(await saved(page)).toEqual(during);
});

test('P15: sound, reading and language preferences survive reload without changing the save', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await importSave(page, mapFixture().save());
  const before = await saved(page);
  await settings(page, { language: 'pt-BR', 'text-speed': 'fast', 'reduce-motion': true, sound: false });
  await page.reload();
  await page.locator('#menu-button').click();
  await expect(page.locator('#language')).toHaveValue('pt-BR');
  await expect(page.locator('#text-speed')).toHaveValue('fast');
  await expect(page.locator('#reduce-motion')).toBeChecked();
  await expect(page.locator('#sound')).not.toBeChecked();
  expect(await saved(page)).toEqual(before);
});

for (const battle of ['t3', 't5']) test(`P16-${battle}: actual encounter uses the saved opponent forms`, async ({ page }, info) => {
  await page.goto(fileURL);
  const game = play({ mode: 'max', stopAt: current => current.battle?.id === battle }).game;
  await importSave(page, game.save());
  const enemies = page.locator('.formation.enemies');
  if (battle === 't3') {
    for (const name of game.state.opponents) await expect(enemies).toContainText(name);
    await expect(enemies.locator('.fighter')).toHaveCount(5);
    await expect(enemies).not.toContainText('Neral');
  } else {
    await expect(enemies.locator('img')).toHaveAttribute('src', /neral-transformado/);
    await expect(enemies.locator('.fighter')).toHaveCount(1);
  }
  expect(await state(page)).toEqual(game.state);
  await capture(page, info, battle);
});

test.describe('Browser navigation lifecycle', () => {
  test('P17: browser back restores a playable reading position', async ({ page, serverURL }, info) => {
    await page.addInitScript(() => addEventListener('pageshow', event => { window.playerTestPageshowPersisted = event.persisted; }));
    await page.goto(serverURL);
    const game = sceneFixture('intro', current => current.passage.id === 'intro.p2.body.1');
    await importSave(page, game.save());
    const before = await saved(page);
    await page.goto(new URL('/__player-test-return', serverURL).href);
    await page.goBack({ waitUntil: 'commit' });
    const persisted = await page.evaluate(() => window.playerTestPageshowPersisted);
    await info.attach('back-forward-cache', { body: JSON.stringify({ persisted }), contentType: 'application/json' });
    if (await page.locator('#continue-game').isVisible()) await page.locator('#continue-game').click();
    await expect(page.locator('[data-passage]')).toHaveAttribute('data-passage', 'intro.p2.body.1');
    expect(await saved(page)).toEqual(before);
    await page.locator('.advance').click();
    expect((await saved(page)).commands.length).toBe(before.commands.length + 1);
  });
});

for (const sample of [{ id: 'long-dialogue', scene: 'gB5', choices: false }, { id: 'long-choices', scene: 'alliance', choices: true }])
  test(`P18-${sample.id}: narrow reading panel keeps controls reachable in both languages`, async ({ page }, info) => {
    await page.goto(fileURL);
    await settings(page, { 'text-speed': 'instant' });
    const game = sceneFixture(sample.scene, current => sample.choices ? current.choices.length > 0 : current.passage.id === 'gB5.p1.body.1');
    await importSave(page, game.save());
    await page.setViewportSize({ width: 844, height: 390 });
    for (const language of ['en-US', 'pt-BR']) {
      await settings(page, { language });
      const panel = page.locator('.dialogue-panel, .description-panel');
      const control = panel.locator('button:visible').last();
      await control.scrollIntoViewIfNeeded();
      const bounds = await control.boundingBox();
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(844);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(390);
      await expect(control).toBeInViewport();
      expect(await control.evaluate(node => {
        const r = node.getBoundingClientRect();
        return node.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
      })).toBe(true);
      await capture(page, info, language);
    }
  });

test('P19: real audio becomes audible after interaction and stays silent when muted', async ({ page }, info) => {
  await page.addInitScript(() => {
    const NativeAudioContext = window.AudioContext;
    window.playerAudioObservations = { contexts: 0, peaks: [] };
    window.AudioContext = class extends NativeAudioContext {
      constructor(...args) {
        super(...args);
        window.playerAudioObservations.contexts++;
        const analyser = this.createAnalyser();
        analyser.fftSize = 256;
        analyser.connect(this.destination);
        const createGain = this.createGain.bind(this);
        this.createGain = () => {
          const gain = createGain(), connect = gain.connect.bind(gain);
          gain.connect = target => connect(target === this.destination ? analyser : target);
          return gain;
        };
        const samples = new Uint8Array(analyser.fftSize);
        setInterval(() => {
          analyser.getByteTimeDomainData(samples);
          window.playerAudioObservations.peaks.push(Math.max(...samples.map(value => Math.abs(value - 128))));
        }, 20);
      }
    };
  });
  await page.goto(fileURL);
  expect(await page.evaluate(() => window.playerAudioObservations.contexts)).toBe(0);
  await page.locator('#menu-button').click();
  await page.locator('#menu-close').click();
  await expect.poll(() => page.evaluate(() => window.playerAudioObservations.peaks.some(peak => peak > 0))).toBe(true);
  const audible = await page.evaluate(() => Math.max(...window.playerAudioObservations.peaks));
  await settings(page, { sound: false });
  await expect.poll(() => page.evaluate(() => window.playerAudioObservations.peaks.slice(-5).every(peak => peak === 0))).toBe(true);
  await page.evaluate(() => { window.playerAudioObservations.peaks = []; });
  await page.locator('#menu-button').click();
  await page.locator('#menu-close').click();
  await expect.poll(() => page.evaluate(() => window.playerAudioObservations.peaks.length)).toBeGreaterThanOrEqual(5);
  expect(await page.evaluate(() => Math.max(...window.playerAudioObservations.peaks))).toBe(0);
  await info.attach('audio-signal', { body: JSON.stringify({ audiblePeak: audible, mutedPeak: 0 }), contentType: 'application/json' });
});
