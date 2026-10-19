import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

const {chromium} = createRequire(import.meta.url)('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(here, 'verificacao');
fs.mkdirSync(output, {recursive: true});
const browser = await chromium.launch({channel: 'msedge', headless: true});
const page = await browser.newPage({viewport: {width: 1280, height: 720}});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const url = pathToFileURL(path.join(here, 'index.html')).href;
const checks = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const camera = target => target.locator('#world').evaluate(element => getComputedStyle(element).transform);
const isOpen = target => target.locator('#preview').evaluate(element => element.open);
const focus = async (target, id) => {
  await target.keyboard.press('Tab');
  await target.locator(`[data-id="${id}"] button`).focus();
};
const point = (target, id) => target.evaluate(id => {
  const place = window.TERMINUS_MAP.destinations.find(place => place.id === id);
  const rect = document.querySelector(`[data-id="${id}"]`).getBoundingClientRect();
  const n = window.TERMINUS_MAP.hitGrid;
  const candidates = place.hitRows.flatMap((runs, y) => runs.map(([a, b]) => ({a, b, y})))
    .filter(run => run.y > n * .4 && run.y < n * .75).sort((a, b) => b.b - b.a - (a.b - a.a));
  const run = candidates[0];
  return {x: rect.x + rect.width * (run.a + run.b) / (2 * n), y: rect.y + rect.height * (run.y + .5) / n};
}, id);
const waitScene = target => target.waitForFunction(() => {
  const image = document.getElementById('scene-image');
  return !image.hidden && image.complete && image.naturalWidth > 0;
});
try {
  await page.goto(url);
  await page.waitForFunction(() => !document.getElementById('visit').disabled);
  await page.evaluate(() => document.fonts.ready);
  const manifest = await page.evaluate(() => window.TERMINUS_MAP);
  check('14 destinos e 19 fundos no manifesto', manifest.destinations.length === 14 && manifest.destinations.reduce((sum, d) => sum + d.views.length, 0) === 19);
  check('Arquivos locais sem servidor', page.url().startsWith('file:///'));
  check('Sem sobreposição entre caixas das fachadas', manifest.destinations.filter(p => !p.fixed).every((a, i, all) => all.slice(i + 1).every(b => a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y)));
  await page.screenshot({path: path.join(output, 'cidade-1280.png')});

  for (const place of manifest.destinations) {
    await focus(page, place.id);
    const before = await camera(page);
    assert.equal(await page.locator('#destination-name').textContent(), place.name);
    assert.equal(await page.locator('.landmark[data-state]').count(), 1);
    const rect = await page.locator(`[data-id="${place.id}"] button`).boundingBox();
    check(`Foco revela ${place.id}`, rect.x >= -1 && rect.x + rect.width <= 1281);
    await page.keyboard.press('Enter');
    await waitScene(page);
    assert.equal(await page.locator('#preview-title').textContent(), place.name);
    for (let i = 0; i < place.views.length; i++) {
      await page.locator('#view-controls button').nth(i).click();
      await waitScene(page);
      check(`${place.id}: ${place.views[i].name}`, (await page.locator('#scene-image').getAttribute('src')).endsWith(place.views[i].file));
    }
    if (place.id === 'coliseu') await page.screenshot({path: path.join(output, 'previa-coliseu.png')});
    await page.keyboard.press('Escape');
    assert.equal(await isOpen(page), false);
    assert.equal(await camera(page), before, `Câmera após voltar: ${place.id}`);
    assert.equal(await page.locator('#destination-name').textContent(), place.name);
  }
  checks.push('Retorno dos 14 destinos preserva câmera e seleção');

  await focus(page, 'estalagem');
  const tabbed = new Set();
  for (let i = 0; i < 22; i++) {
    const id = await page.evaluate(() => document.activeElement.closest('.landmark')?.dataset.id);
    if (id) tabbed.add(id);
    await page.keyboard.press('Tab');
  }
  check('Tab alcança as 14 fachadas', tabbed.size === 14);
  await focus(page, 'estalagem');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  check('Shift+Tab e Tab restauram o foco', await page.locator('[data-id="estalagem"] button').evaluate(el => el === document.activeElement));
  await page.keyboard.press('ArrowRight');
  check('Seta direita escolhe destino à direita', (await page.locator('#destination-name').textContent()) !== 'Estalagem de Nyra');
  await page.keyboard.press('Space');
  check('Espaço abre o destino', await isOpen(page));
  await page.keyboard.press('Escape');

  await focus(page, 'estalagem');
  const inn = await point(page, 'estalagem');
  await page.mouse.move(inn.x, inn.y);
  check('Hover violeta único', await page.locator('.landmark[data-state="hover"]').count() === 1);
  await page.screenshot({path: path.join(output, 'hover-violeta.png')});
  await page.mouse.move(690, 150);
  check('Saída do ponteiro mantém seleção dourada', await page.locator('[data-id="estalagem"]').getAttribute('data-state') === 'selected');
  await page.mouse.click(inn.x, inn.y);
  check('Clique na fachada abre a prévia', await isOpen(page));
  await page.locator('#back').click();
  const emptyCorner = await page.locator('[data-id="estalagem"]').boundingBox();
  await page.mouse.click(emptyCorner.x + 1, emptyCorner.y + 1);
  await page.mouse.click(700, 150);
  check('Transparência e intervalo não abrem destinos', !(await isOpen(page)));
  await focus(page, 'cisterna');
  const excluded = await page.evaluate(() => {
    const p = window.TERMINUS_MAP.destinations.find(p => p.id === 'cisterna');
    const box = document.querySelector('[data-id="cisterna"]').getBoundingClientRect();
    let tested = 0;
    for (let y = 4; y < 124; y += 6) for (let x = 4; x < 124; x += 6) {
      if (p.hitRows[y].some(([a,b]) => x >= a && x < b)) continue;
      const element = document.elementFromPoint(box.x + (x + .5) / 128 * box.width, box.y + (y + .5) / 128 * box.height);
      if (element?.classList.contains('landmark-button')) return -1;
      tested++;
    }
    return tested;
  });
  check('Recorte nativo exclui vazios internos e margens', excluded > 20);

  await focus(page, 'estalagem');
  const start = await point(page, 'estalagem');
  const beforeDrag = await camera(page);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x - 160, start.y, {steps: 10});
  await page.mouse.up();
  check('Arrasto sobre fachada move câmera sem visitar', !(await isOpen(page)) && await camera(page) !== beforeDrag);
  await page.mouse.move(600, 180);
  await page.mouse.wheel(10000, 0);
  await page.waitForFunction(() => document.getElementById('pan-right').disabled);
  check('Limite direito respeitado', await page.locator('#pan-right').isDisabled());
  await page.screenshot({path: path.join(output, 'cidade-direita-1280.png')});
  await page.mouse.wheel(-10000, 0);
  await page.waitForFunction(() => document.getElementById('pan-left').disabled);
  check('Limite esquerdo respeitado', await page.locator('#pan-left').isDisabled());
  const beforeEdge = await camera(page);
  await page.mouse.move(1278, 200);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  check('Ponteiro na borda não desloca câmera', await camera(page) === beforeEdge);

  await focus(page, 'coliseu');
  await page.keyboard.press('Enter');
  check('Teclado continua funcionando depois de um arrasto', await isOpen(page));
  await page.locator('#view-controls button').nth(1).click();
  await page.locator('#view-controls button').nth(2).click();
  await waitScene(page);
  check('Troca rápida mantém o último fundo solicitado', (await page.locator('#scene-image').getAttribute('src')).endsWith('coliseu-servico-v2.png'));
  await page.keyboard.press('Escape');
  await focus(page, 'minas');
  await page.setViewportSize({width: 1920, height: 1080});
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
  await page.screenshot({path: path.join(output, 'cidade-1920.png')});
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({width, height: 720});
    await focus(page, 'portal');
    await page.screenshot({path: path.join(output, `cidade-${width}.png`)});
    check(`Sem transbordamento horizontal em ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    check(`Nome longo legível em ${width}px`, await page.locator('#destination-name').evaluate(el => el.scrollWidth <= el.clientWidth));
    check(`Controles de pelo menos 44px em ${width}px`, await page.locator('#city button:not([hidden])').evaluateAll(buttons => buttons.every(button => {
      const r = button.getBoundingClientRect();
      return r.width >= 44 && r.height >= 44;
    })));
  }
  await page.setViewportSize({width: 1280, height: 720});
  await focus(page, 'contratos');
  await page.screenshot({path: path.join(output, 'foco-teclado.png')});
  check('Sem animações nem transições decorativas', await page.evaluate(() => [...document.querySelectorAll('*')].every(el => getComputedStyle(el).animationName === 'none' && getComputedStyle(el).transitionDuration === '0s')));

  const touch = await browser.newPage({viewport: {width: 1280, height: 720}, hasTouch: true});
  await touch.goto(url);
  await touch.waitForFunction(() => !document.getElementById('visit').disabled);
  const touchInn = await point(touch, 'estalagem');
  await touch.touchscreen.tap(touchInn.x, touchInn.y);
  check('Primeiro toque identifica', !(await isOpen(touch)) && await touch.locator('#destination-name').textContent() === 'Estalagem de Nyra');
  await touch.touchscreen.tap(touchInn.x, touchInn.y);
  check('Segundo toque visita', await isOpen(touch));
  await touch.locator('#back').tap();
  const cdp = await touch.context().newCDPSession(touch);
  const touchBefore = await camera(touch);
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: touchInn.x, y: touchInn.y}]});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: touchInn.x - 150, y: touchInn.y}]});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  check('Arrasto por toque não visita', !(await isOpen(touch)) && await camera(touch) !== touchBefore);
  const portal = await point(touch, 'portal');
  await touch.touchscreen.tap(portal.x, portal.y);
  const portalCamera = await camera(touch);
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: portal.x, y: portal.y}]});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: portal.x - 24, y: portal.y}]});
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  check('Deslizar sobre portal não visita nem move a câmera', !(await isOpen(touch)) && await camera(touch) === portalCamera);
  await touch.touchscreen.tap(portal.x, portal.y);
  await touch.touchscreen.tap(portal.x, portal.y);
  check('Dois toques visitam o portal', await isOpen(touch) && await touch.locator('#preview-title').textContent() === 'Portal para a Noite da História');
  await touch.close();

  const failed = await browser.newPage({viewport: {width: 1280, height: 720}});
  await failed.route('**/panorama-v1.png', route => route.abort());
  await failed.goto(url);
  await failed.locator('#retry-city').waitFor({state: 'visible'});
  check('Imagem ausente bloqueia controles e oferece recuperação', await failed.locator('#visit').isDisabled() && await failed.locator('.landmark-button:enabled').count() === 0);
  await failed.screenshot({path: path.join(output, 'falha-carregamento.png')});
  await failed.unroute('**/panorama-v1.png');
  await failed.locator('#retry-city').click();
  await failed.waitForFunction(() => !document.getElementById('visit').disabled);
  check('Recuperação da cidade funciona', await failed.locator('#load-panel').isHidden());
  await failed.close();
  const failedScene = await browser.newPage({viewport: {width: 1280, height: 720}});
  await failedScene.route('**/estalagem-nyra-salao-v1.png', route => route.abort());
  await failedScene.goto(url);
  await failedScene.waitForFunction(() => !document.getElementById('visit').disabled);
  await failedScene.locator('#visit').click();
  await failedScene.locator('#retry-scene').waitFor({state: 'visible'});
  check('Falha de fundo oferece repetir ou voltar', await failedScene.locator('#back').isEnabled());
  await failedScene.screenshot({path: path.join(output, 'falha-fundo.png')});
  await failedScene.unroute('**/estalagem-nyra-salao-v1.png');
  await failedScene.locator('#retry-scene').click();
  await waitScene(failedScene);
  check('Recuperação do fundo funciona', await failedScene.locator('#retry-scene').isHidden());
  await failedScene.close();

  const contrast = (a,b) => {
    const luminance = hex => {
      const rgb = hex.match(/[\da-f]{2}/gi).map(n => parseInt(n,16)/255).map(n => n <= .04045 ? n/12.92 : ((n+.055)/1.055)**2.4);
      return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
    };
    const values = [luminance(a),luminance(b)].sort((a,b)=>b-a);
    return (values[0]+.05)/(values[1]+.05);
  };
  const ratios = {text: contrast('360a0b','f9eacf'), action: contrast('fff8eb','552070'), hover: contrast('fff8eb','8224ad'), marker: contrast('360a0b','f9eacf'), focusBacking: contrast('edaa2f','360a0b'), disabled: contrast('704737','d3c7b4')};
  check('Contraste de texto ≥ 4,5 e indicadores ≥ 3', Object.values(ratios).every(value => value >= 4.5));
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'resultados.json'), JSON.stringify({status: 'em desenvolvimento', checkedAt: new Date().toISOString(), browser: await browser.version(), checks, contrast: ratios, errors, limitations: ['Toque validado por emulação Chromium; sem dispositivo físico.', 'Sem sessão manual com leitor de tela.']}, null, 2) + '\n');
  console.log(`${checks.length} checks passed; screenshots and resultados.json saved.`);
} finally {
  await browser.close();
}
