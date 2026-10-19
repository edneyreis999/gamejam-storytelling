const {
  test, expect, E, play, sceneFixture, mapFixture, importSave, saved, state,
  settings, capture, fileURL,
} = require('./fixtures.cjs');
const L = require('../../prototipo/localization.js');
const map = require('../../prototipo/mapa/manifest.js');
const fs = require('node:fs');

test.use({ hasTouch: true, launchOptions: { ignoreDefaultArgs: ['--disable-back-forward-cache'] } });

for (const language of ['pt-BR', 'en-US']) test(`Tiny Hat ${language}: confirmed adhesion changes Ghork during the commitment scene`, async ({page}, info) => {
  const game = play({guild: 'C', mode: 'solo', stopAt: current => current.scene?.quest === 'commitC'}).game;
  while (E.page(game.state).passage.speaker !== 'Ghork') game.dispatch({type: 'advance'});
  expect(game.state.guild).toBe('C');
  expect(game.state.stage).toBe(1);
  await page.goto(fileURL);
  await settings(page, {language, 'text-speed': 'instant'});
  await importSave(page, game.save());
  await expect(page.locator('.portrait:not(.portrait-out) img')).toHaveAttribute('src', /\/ghork\/tiny-hat\//);
  await capture(page, info, 'confirmed-adhesion-' + language);
  expect(await saved(page)).toEqual(game.save());
});

for (const guild of ['A', 'B', 'C']) test(`Tiny Hat ${guild}: recruited allies in battle, journal and restored save`, async ({page}, info) => {
  const game = play({guild, mode: 'max', paid: true, stopAt: current => current.battle?.id === 't3'}).game;
  expect(game.state.battle.id).toBe('t3');
  await page.goto(fileURL);
  await settings(page, {'text-speed': 'instant'});
  await importSave(page, game.save());
  const allies = page.locator('.formation.allies img');
  await expect(allies).toHaveCount(1 + game.state.recruits.filter(r => r.invited).length);
  for (const portrait of await allies.all()) {
    if (guild === 'C') await expect(portrait).toHaveAttribute('src', /\/tiny-hat\/neutro\.png$/);
    else await expect(portrait).not.toHaveAttribute('src', /\/tiny-hat\//);
  }
  for (const portrait of await page.locator('.formation.enemies img').all())
    await expect(portrait).not.toHaveAttribute('src', /\/tiny-hat\//);
  await capture(page, info, 'battle-'+guild);
  await page.locator('#journal-button').click();
  await page.locator('#tab-team').click();
  for (const portrait of await page.locator('.journal-member img').all()) {
    if (guild === 'C') await expect(portrait).toHaveAttribute('src', /\/tiny-hat\/neutro\.png$/);
    else await expect(portrait).not.toHaveAttribute('src', /\/tiny-hat\//);
  }
  await capture(page, info, 'journal-'+guild);
  await page.reload();
  await page.locator('#continue-game').click();
  expect(await state(page)).toEqual(game.state);
  if (guild === 'C') await expect(page.locator('.formation.allies img').first()).toHaveAttribute('src', /\/tiny-hat\/neutro\.png$/);
});

test('Tiny Hat: Sevrak wears it before adhesion while Ghork does not', async ({page}, info) => {
  await page.goto(fileURL);
  await settings(page, {'text-speed': 'instant'});
  for (const speaker of ['Ghork', 'Sevrak']) {
    const game = sceneFixture('gC1', current => current.passage.type === 'dialogue' && current.passage.speaker === speaker);
    expect(game.state.guild).toBeNull();
    await importSave(page, game.save());
    const portrait = page.locator('.portrait:not(.portrait-out) img');
    await expect(portrait).toBeVisible();
    if (speaker === 'Sevrak') await expect(portrait).toHaveAttribute('src', /\/tiny-hat\//);
    else await expect(portrait).not.toHaveAttribute('src', /\/tiny-hat\//);
    await capture(page, info, 'before-adhesion-'+speaker);
  }
});

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

for (const transport of ['file', 'http']) test('P19-' + transport + ': recorded audio starts after input, keeps playing and obeys independent volumes', async ({ page, serverURL }, info) => {
  await page.addInitScript(() => {
    const NativeAudio = window.Audio;
    window.observedAudio = [];
    window.Audio = function (...args) {
      const media = new NativeAudio(...args);
      window.observedAudio.push(media);
      if (location.protocol === 'http:') {
        const context = window.audioProbeContext ||= new AudioContext();
        const analyser = context.createAnalyser();
        context.createMediaElementSource(media).connect(analyser);
        analyser.connect(context.destination);
        media.probe = analyser;
      }
      return media;
    };
  });
  await page.goto(transport === 'file' ? fileURL : serverURL);
  expect(await page.evaluate(() => observedAudio.length)).toBe(0);
  await page.locator('#menu-button').click();
  await expect.poll(() => page.evaluate(() => observedAudio.some(a => a.src.endsWith('Theme1.ogg') && a.currentTime > 0.1 && !a.paused && a.volume > 0))).toBe(true);
  if (transport === 'http') await expect.poll(() => page.evaluate(() => observedAudio.some(a => {
    const samples = new Uint8Array(a.probe.fftSize); a.probe.getByteTimeDomainData(samples);
    return samples.some(value => Math.abs(value - 128) > 1);
  }))).toBe(true);
  await page.locator('#menu-close').click();
  await page.locator('#menu-button').click();
  expect(await page.evaluate(() => observedAudio.filter(a => a.src.endsWith('Theme1.ogg')).length)).toBe(1);
  await page.locator('#music-volume').fill('0');
  await expect.poll(() => page.evaluate(() => observedAudio.filter(a => a.loop).every(a => a.paused || a.volume === 0))).toBe(true);
  await page.locator('#menu-close').click();
  await expect.poll(() => page.evaluate(() => observedAudio.some(a => a.src.endsWith('Cancel1.ogg') && !a.paused && a.volume > 0))).toBe(true);
  await page.locator('#menu-button').click();
  await page.locator('#volume').fill('0');
  await page.locator('#music-volume').fill('0.25');
  await expect.poll(() => page.evaluate(() => observedAudio.some(a => a.loop && !a.paused && a.volume > 0))).toBe(true);
  await capture(page, info, 'audio-menu');
  await page.locator('#sound').uncheck();
  expect(await page.evaluate(() => observedAudio.every(a => a.paused))).toBe(true);
  await page.reload();
  await page.locator('#menu-button').click();
  await expect(page.locator('#sound')).not.toBeChecked();
  await expect(page.locator('#volume')).toHaveValue('0');
  await expect(page.locator('#music-volume')).toHaveValue('0.25');
  expect(await page.evaluate(() => observedAudio.every(a => a.paused))).toBe(true);
  await page.locator('#sound').check();
  await expect.poll(() => page.evaluate(() => observedAudio.some(a => a.loop && !a.paused && a.currentTime > 0.1))).toBe(true);
});

test('P20: music follows imported scenes and battles, with no replayed rewards', async ({ page }, info) => {
  await page.addInitScript(() => {
    const NativeAudio = window.Audio;
    window.observedAudio = [];
    window.Audio = function (...args) { const media = new NativeAudio(...args); observedAudio.push(media); return media; };
  });
  await page.goto(fileURL);
  const cases = [
    [mapFixture(), 'Town1'],
    [sceneFixture('intro'), 'Town6'],
    [sceneFixture('invasion'), 'Dungeon1'],
    [play({ mode: 'max', stopAt: s => s.battle?.id === 't5' }).game, 'Battle5'],
    [sceneFixture('ending'), 'Theme2'],
  ];
  for (const [game, track] of cases) {
    await importSave(page, game.save());
    await expect.poll(() => page.evaluate(name => observedAudio.some(a => a.src.endsWith('/' + name + '.ogg') && !a.paused && a.currentTime > 0.1), track)).toBe(true);
    await expect.poll(() => page.evaluate(() => observedAudio.filter(a => a.loop && !a.paused).length)).toBe(1);
    expect(await page.evaluate(() => observedAudio.some(a => /Item1|Victory1|Defeat1/.test(a.src)))).toBe(false);
    expect(await saved(page)).toEqual(game.save());
  }
  await settings(page, { language: 'pt-BR' });
  await page.setViewportSize({ width: 900, height: 600 });
  await page.locator('#menu-button').click();
  const slider = page.getByLabel('Volume da música');
  await slider.focus(); await slider.press('ArrowRight');
  await expect(slider).toHaveValue('0.3');
  await capture(page, info, 'audio-menu-pt-narrow');
});

const narrationSamples = [
  { id: 'short', scene: 'intro', passage: 'intro.p3.body.1' },
  { id: 'long', scene: 'side2', passage: 'side2.p1.body.1' },
  { id: 'choices', scene: 'alliance', passage: 'alliance.p2.body.1' },
  { id: 'action', scene: 'gB3', passage: 'gB3.p2.body.2' },
];
for (const sample of narrationSamples) for (const width of [1280, 844]) for (const language of ['en-US', 'pt-BR'])
  test(`P20-${sample.id}-${width}-${language}: narration stays centered and readable with reachable controls`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width === 1280 ? 720 : 390 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(fileURL);
    await settings(page, { language, 'text-speed': 'slow', 'reduce-motion': false });
    const game = sceneFixture(sample.scene, current => current.passage.id === sample.passage);
    await importSave(page, game.save());
    const card = page.locator('.description-panel');
    await expect(card).toHaveAttribute('data-revealing', 'false');
    await expect(card.locator('.speaker-plate')).toHaveCount(0);
    await expect(page.locator('.dialogue-panel')).toHaveCount(0);
    L.setLanguage(language);
    await expect(card.locator('.passage-text > [aria-hidden="true"]')).toHaveText(L.text(E.page(game.state).passage.text));
    const frame = await page.locator('#game-frame').boundingBox();
    const bounds = await card.boundingBox();
    expect(Math.abs(bounds.x + bounds.width / 2 - frame.x - frame.width / 2)).toBeLessThan(1);
    expect(Math.abs(bounds.y + bounds.height / 2 - frame.y - frame.height / 2)).toBeLessThan(1);
    expect(await card.evaluate(node => {
      const style = getComputedStyle(node);
      return { colors: [style.backgroundColor, style.color, style.borderLeftColor].map(color => color.match(/\d+/g).map(Number)), alignment: style.textAlign };
    })).toEqual({ colors: [[85, 32, 112], [248, 233, 204], [248, 233, 204]], alignment: 'left' });
    if (sample.id === 'action') {
      const object = await page.locator('.scene-object').boundingBox();
      expect(object.y + object.height).toBeLessThanOrEqual(bounds.y);
      await expect(page.locator('.scene-object img')).toBeVisible();
    }
    const control = card.locator('button:visible').last();
    await control.scrollIntoViewIfNeeded();
    const button = await control.boundingBox();
    expect(button.height).toBeGreaterThanOrEqual(44);
    expect(button.y + button.height).toBeLessThanOrEqual(frame.y + frame.height);
    expect(await control.evaluate(node => {
      const rect = node.getBoundingClientRect();
      return node.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
    })).toBe(true);
    await capture(page, info, 'narration');
    const before = await saved(page);
    if (width === 844) await control.tap();
    else { await control.focus(); await page.keyboard.press('Enter'); }
    expect((await saved(page)).commands.length).toBe(before.commands.length + 1);
  });

test('P21: entering narration displays all text immediately before returning to dialogue', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(fileURL);
  await settings(page, { 'text-speed': 'slow', 'reduce-motion': false });
  const game = sceneFixture('intro', current => current.passage.id === 'intro.p2.body.1');
  await importSave(page, game.save());
  await page.locator('.advance').click();
  await expect(page.locator('.description-panel')).toHaveAttribute('data-revealing', 'false');
  game.dispatch({ type: 'advance' });
  L.setLanguage('en-US');
  await expect(page.locator('.passage-text > [aria-hidden="true"]')).toHaveText(L.text(E.page(game.state).passage.text));
  await page.locator('.advance').click();
  await expect(page.locator('.dialogue-panel')).toHaveAttribute('data-revealing', 'true');
  await expect(page.locator('.description-panel')).toHaveCount(0);
});

test('P22: colored Coreto and Reed persist from title through portal visits and finale', async ({ page, serverURL }, info) => {
  await page.goto(serverURL);
  const background = page.locator('.scene-background:not(.outgoing-background)');
  await expect(background).toHaveAttribute('src', /coreto-noite-historia-colorido-v1\.png$/);
  await capture(page, info, 'colored-title');
  await page.locator('#start-game').click();
  await expect(background).toHaveAttribute('src', /coreto-noite-historia-colorido-v1\.png$/);
  await expect(page.locator('.portrait:not(.portrait-out) img')).toHaveAttribute('src', /rheed-colorido-v1\//);
  await capture(page, info, 'colored-intro');
  const portraits = await page.evaluate(async () => {
    const A = window.TerminusArt;
    return Promise.all(['neutro', 'feliz', 'triste', 'raiva', 'confuso'].map(async expression => {
      const src = A.assets[A.portrait('Rheed', expression)].preview;
      const image = new Image(); image.src = src; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 128, 128);
      const pixels = context.getImageData(0, 0, 128, 128).data;
      let transparent = 0, colored = 0;
      for (let index = 0; index < pixels.length; index += 4) {
        if (pixels[index + 3] === 0) transparent++;
        if (pixels[index + 3] > 200 && Math.max(...pixels.slice(index, index + 3)) - Math.min(...pixels.slice(index, index + 3)) > 35) colored++;
      }
      return { expression, src, width: image.naturalWidth, height: image.naturalHeight, transparent, colored };
    }));
  });
  expect(new Set(portraits.map(portrait => portrait.src)).size).toBe(5);
  expect(new Set(portraits.map(portrait => `${portrait.width}x${portrait.height}`)).size).toBe(1);
  for (const portrait of portraits) {
    expect(portrait.src).toMatch(new RegExp(`rheed-colorido-v1/${portrait.expression}\\.png$`));
    expect(portrait.transparent).toBeGreaterThan(1000);
    expect(portrait.colored).toBeGreaterThan(1000);
  }
  await info.attach('colored-portrait-pixels', { body: JSON.stringify(portraits), contentType: 'application/json' });
  await importSave(page, mapFixture().save());
  await expect(page.locator('.city-map')).toHaveAttribute('data-ready', 'true');
  await page.locator('#destination-coreto').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-passage]')).toHaveAttribute('data-passage', 'coreto.p1.body.1');
  await expect(background).toHaveAttribute('src', /coreto-noite-historia-colorido-v1\.png$/);
  for (let index = 0; index < 3; index++) await page.locator('.advance').click();
  await expect(page.locator('.location-panel')).toBeVisible();
  await expect(background).toHaveAttribute('src', /coreto-noite-historia-colorido-v1\.png$/);
  await expect(page.locator('.portrait img')).toHaveAttribute('src', /rheed-colorido-v1\/feliz\.png$/);
  for (const viewport of [{ width: 1280, height: 720 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    const portraitBounds = await page.locator('.portrait').boundingBox();
    const panelBounds = await page.locator('.location-panel').boundingBox();
    expect(portraitBounds.x + portraitBounds.width).toBeLessThan(panelBounds.x);
    await capture(page, info, `colored-coreto-visit-${viewport.width}`);
  }
  await page.setViewportSize({ width: 1280, height: 720 });
  await importSave(page, play({ mode: 'solo' }).game.save());
  await expect(page.locator('.end-screen')).toBeVisible();
  await expect(background).toHaveAttribute('src', /coreto-noite-historia-colorido-v1\.png$/);
  await capture(page, info, 'colored-finale');
});
