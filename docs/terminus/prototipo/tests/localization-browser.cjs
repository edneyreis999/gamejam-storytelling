// Public-UI checks: language changes must preserve commands, reading position and effects.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {pathToFileURL} = require('node:url');
const assert = require('node:assert/strict');
const {chromium} = require('../../../../coreto/tools/qa/runner/node_modules/playwright');
const E = require('../engine');
const L = require('../localization');
const {play, finishQuest, start} = require('./helpers.cjs');
const root = path.resolve(__dirname, '../../../..');
const out = path.join(root, '.artifacts/terminus-localization/browser');
fs.mkdirSync(out, {recursive:true});
fs.mkdirSync(path.join(out,'downloads'), {recursive:true});
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error,data) => {
    if (error) { res.writeHead(404).end(); return; }
    const types = {'.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf'};
    res.setHeader('Content-Type', types[path.extname(file)] || 'text/html');
    res.end(data);
  });
});
const errors = [];
const checks = [];
const limits = [];
const save = page => page.evaluate(() => localStorage.getItem('terminus-campaign-v3'));
const passageId = page => page.locator('[data-passage]').evaluateAll(nodes => nodes[0]?.dataset.passage || null);
async function closeNotice(page) {
  if (await page.locator('#notice').isVisible()) await page.locator('#notice button').click();
}
async function language(page, value) {
  const before = await save(page);
  const passage = await passageId(page);
  await page.locator('#menu-button').click();
  await page.locator('#language-menu').selectOption(value);
  assert.equal(await page.locator('#game-menu').evaluate(el => el.open), true);
  await page.locator('#menu-close').click();
  await closeNotice(page);
  assert.equal(await save(page), before, 'Language switch changed the saved commands');
  assert.equal(await passageId(page), passage);
  assert.equal(await page.locator('html').getAttribute('lang'), value);
  L.setLanguage(value);
}
async function importSave(page, game) {
  await page.locator('#import-file').setInputFiles({name:'test-save.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(game.save()))});
  await page.locator('#modal-actions button').last().click();
  await closeNotice(page);
  assert.deepEqual(E.restore(JSON.parse(await save(page))).state, game.state);
}
async function screenshot(page, name) {
  await page.evaluate(() => Promise.allSettled([...document.images].map(img => img.decode())));
  await page.screenshot({path:path.join(out, name + '.png')});
}
async function verifyPassage(page) {
  const state = E.restore(JSON.parse(await save(page))).state;
  if (!state.scene) return;
  const p = E.page(state);
  assert.equal(await page.locator('.dialogue-panel > p, .description-panel > p').innerText(), L.text(p.passage.text));
  const labels = await page.locator('.scene-controls .choices button').allTextContents();
  for (const choice of p.choices) assert.ok(labels.some(label => label.startsWith(L.text(choice.label))), choice.label);
}
(async () => {
  let browser;
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    browser = await chromium.launch({channel:process.env.TERMINUS_QA_BROWSER || 'msedge',headless:true,downloadsPath:path.join(out,'downloads')});
    const context = await browser.newContext({viewport:{width:1280,height:720},reducedMotion:'reduce'});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.stack));
    const url = process.env.TERMINUS_QA_TRANSPORT === 'file'
      ? pathToFileURL(path.join(root,'docs/terminus/prototipo/index.html')).href
      : `http://127.0.0.1:${server.address().port}/docs/terminus/prototipo/index.html`;
    await page.goto(url);
    assert.equal(await page.locator('#language-title').inputValue(), 'en-US');
    await screenshot(page, 'title-en');
    await page.locator('#language-title').selectOption('pt-BR');
    assert.equal(await save(page), null);
    await closeNotice(page);
    await screenshot(page, 'title-pt');
    await page.locator('#language-title').selectOption('en-US');
    await closeNotice(page);
    await page.locator('.cover button').click();
    await language(page, 'pt-BR'); await verifyPassage(page);
    await language(page, 'en-US'); await verifyPassage(page);
    await screenshot(page, 'intro-en');
    const persisted = await save(page);
    await page.reload();
    assert.equal(await page.locator('#language-title').inputValue(), 'en-US');
    await page.locator('.cover button').click();
    assert.equal(await save(page), persisted);
    await verifyPassage(page);
    checks.push('English default; both selectors; preference survives reload; reading/save unchanged');

    const mapGame = E.create(123456);
    finishQuest(mapGame,'intro'); finishQuest(mapGame,'gA1'); mapGame.dispatch({type:'map'});
    await importSave(page,mapGame);
    for (const lang of ['pt-BR','en-US']) {
      await language(page,lang);
      await page.locator('.city-map[data-ready="true"]').waitFor();
      await page.locator('#destination-virmura').focus();
      await screenshot(page,'map-'+lang);
      await page.locator('#menu-button').click();
      await page.locator('#toolbar').getByRole('button',{name:L.text('Diário'),exact:true}).click();
      assert.equal(await page.locator('#main h1').innerText(),L.text('O que ficou das escolhas'));
      await screenshot(page,'journal-'+lang);
      if (lang === 'en-US') {
        const downloaded = page.waitForEvent('download');
        await page.getByRole('button',{name:L.text('Exportar relatório do percurso'),exact:true}).click();
        const download = await downloaded;
        const report = await page.evaluate(async url => (await fetch(url)).text(), download.url());
        const failure = await download.failure();
        if (failure) limits.push(`Report contents checked through its emitted Blob; browser download to disk: ${failure}`);
        assert.match(report,/^TERMINUS — playthrough report/);
        assert.doesNotMatch(report,/HISTÓRICO|TEXTO PERCORRIDO|Concluiu:|Recebeu /);
        fs.writeFileSync(path.join(out,'playthrough-en.txt'),report);
      }
      await page.getByRole('button',{name:L.text('Retomar a história'),exact:true}).click();
    }
    checks.push('Map, accessible destinations, journal and objectives in both languages');

    for (const quest of ['alliance','R1','fight3','invasion','ending']) {
      const fixture = play({mode:'max',variant:quest === 'ending' ? 1 : 0,stopAt:s=>s.scene?.quest === quest}).game;
      assert.equal(fixture.state.scene?.quest,quest);
      await importSave(page,fixture);
      for (const lang of ['pt-BR','en-US']) { await language(page,lang); await verifyPassage(page); }
      await screenshot(page,quest+'-en');
      if (quest === 'R1') {
        await page.setViewportSize({width:844,height:390});
        await screenshot(page,'recruitment-narrow-en');
        assert.equal(await page.locator('#orientation').isVisible(),false);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
        await page.setViewportSize({width:1280,height:720});
      }
      if (quest === 'ending') {
        const longTextGame = E.restore(fixture.save());
        for (let step = 0; step < 80; step++) {
          if (!longTextGame.state.scene) { start(longTextGame,'ending'); continue; }
          const current = E.page(longTextGame.state);
          if (current.passage.id === 'ending.p5.body.1') break;
          longTextGame.dispatch(current.choices.length ? {type:'choose',index:current.choices[0].index} : {type:'advance'});
        }
        await importSave(page,longTextGame);
        assert.equal(await passageId(page),'ending.p5.body.1');
        await page.setViewportSize({width:844,height:390});
        for (const lang of ['pt-BR','en-US']) {
          await language(page,lang); await verifyPassage(page);
          await screenshot(page,'longest-dialogue-narrow-'+lang);
          const panel = page.locator('.dialogue-panel');
          assert.ok(await panel.evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 18));
          await panel.evaluate(el => { el.scrollTop = el.scrollHeight; });
          assert.equal(await panel.evaluate(el => el.scrollTop + el.clientHeight >= el.scrollHeight - 1),true);
        }
        await page.setViewportSize({width:1280,height:720});
      }
    }
    checks.push('Alliance, recruitment, semifinal, invasion and ending: same passage and save after toggles; longest English dialogue at 844×390 in both languages');
    const battleGame = play({stopAt:s=>!!s.battle}).game;
    await importSave(page,battleGame);
    await language(page,'pt-BR'); await language(page,'en-US');
    await screenshot(page,'battle-en');
    await page.setViewportSize({width:390,height:844});
    await page.locator('#orientation').waitFor({state:'visible'});
    assert.equal(await page.locator('#orientation').isVisible(),true);
    assert.match(await page.locator('#orientation').innerText(), /landscape/i);
    checks.push('Battle switch preserves roll state; portrait orientation message localized');
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({status:'pass',checks,errors,limits},null,2));
    console.log(JSON.stringify({status:'pass',checks,limits},null,2));
  } catch (error) {
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({status:'fail',checks,errors,limits,error:error.stack},null,2));
    throw error;
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
