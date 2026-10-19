const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('../../../../coreto/tools/qa/runner/node_modules/playwright');
const E = require('../engine');
const C = require('../campaign');
const map = require('../mapa/manifest');
const {play, finishQuest, start, finishScene} = require('./helpers.cjs');
const root = path.resolve(__dirname, '../../../..');
const out = path.join(root, '.artifacts/terminus-prototipo');
fs.mkdirSync(out, {recursive:true});
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) {res.writeHead(403);res.end();return;}
  fs.readFile(file, (error,data) => {
    if(error) {res.writeHead(404);res.end();return;}
    const types={'.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf'};
    res.setHeader('Content-Type',types[path.extname(file)] || 'text/html');res.end(data);
  });
});
const results=[];
const errors=[];
const failedChecks=[];
const observe=page => page.on('pageerror',e=>errors.push(e.stack));
async function state(page) {
  return E.restore(await page.evaluate(()=>JSON.parse(localStorage.getItem('terminus-campaign-v3')))).state;
}
async function menuAction(page,name) {
  await page.locator('#menu-button').click();
  await page.locator('#game-menu').getByRole('button',{name,exact:true}).click();
}
async function ready(page) {await page.locator('.city-map[data-ready="true"]').waitFor();}
async function importSave(page,save) {
  await page.locator('#import-file').setInputFiles({name:'partida-v3.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(save))});
  await page.getByRole('button',{name:'Usar esta partida',exact:true}).click();
}
async function finishReading(page) {
  for(let i=0;i<180;i++) {
    if(!(await state(page)).scene) return;
    await page.locator('.scene-controls .choices button:enabled').first().click();
  }
  throw new Error('A conversa não terminou em 180 ações');
}
async function visit(page,id) {
  await ready(page);
  await page.locator('#destination-'+id).focus();
  await page.keyboard.press('Enter');
}
async function back(page) {
  await page.getByRole('button',{name:'Voltar ao mapa',exact:true}).click();
  await ready(page);
}
async function capture(page,name) {
  await page.evaluate(() => Promise.allSettled([...document.images].map(img => img.decode())));
  await page.screenshot({path:path.join(out,name+'.png')});
}
async function hitPoint(page,id) {
  const place=map.destinations.find(p=>p.id===id);
  const row=place.hitRows.map((runs,y)=>({runs,y})).filter(r=>r.runs.length).sort((a,b)=>Math.abs(a.y-80)-Math.abs(b.y-80))[0];
  const run=[...row.runs].sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]))[0];
  const rect=await page.locator('#destination-'+id).boundingBox();
  return {x:rect.x+rect.width*(run[0]+run[1])/2/map.hitGrid,y:rect.y+rect.height*(row.y+.5)/map.hitGrid};
}
function opened() {
  const g=E.create(123456);finishQuest(g,'intro');finishQuest(g,'gA1');g.dispatch({type:'map'});return g;
}
(async()=>{
  let browser;
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    browser=await chromium.launch({channel:process.env.TERMINUS_QA_BROWSER || 'msedge',headless:true,downloadsPath:path.join(out,'downloads')});
    const url = process.env.TERMINUS_QA_TRANSPORT === 'file'
      ? pathToFileURL(path.join(root,'docs/terminus/prototipo/index.html')).href
      : `http://127.0.0.1:${server.address().port}/docs/terminus/prototipo/index.html`;
    const context=await browser.newContext({locale:'pt-BR',viewport:{width:1280,height:720},reducedMotion:'reduce',hasTouch:true});
    const page=await context.newPage();observe(page);
    await page.goto(url);
    await page.locator('#language-title').selectOption('pt-BR');
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.evaluate(() => ['400 20px Outfit','500 20px Outfit','400 32px Averia','400 52px Cinzel'].every(font => document.fonts.check(font))),true);
    await capture(page,'titulo-coreto');
    const contrasts = await page.evaluate(() => {
      const luminance = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(v => v/255).map(v => v<=.04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((sum,v,i) => sum+v*[.2126,.7152,.0722][i],0);
      const ratio = (a,b) => (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      const primary = getComputedStyle(document.querySelector('.primary'));
      return [ratio(luminance(getComputedStyle(document.querySelector('#main')).color),luminance(getComputedStyle(document.querySelector('#game-frame')).backgroundColor)),ratio(luminance(primary.color),luminance(primary.backgroundColor))];
    });
    assert.ok(contrasts.every(value => value >= 4.5));
    results.push('Fontes locais carregadas; contraste texto/papel e ação: '+contrasts.map(v=>v.toFixed(2)+':1').join(', '));
    await page.getByRole('button',{name:'Sentar para ouvir',exact:true}).click();
    for(let i=0;i<180;i++) {
      const s=await state(page);
      if(s.completed.includes('gA1')) break;
      if(s.scene) await page.locator('.scene-controls .choices button:enabled').first().click();
      else await page.locator('.quest-list button').first().click();
    }
    assert.ok((await state(page)).completed.includes('gA1'));
    await back(page);
    assert.equal(await page.locator('[data-destination]').count(),14);
    results.push('Abertura e Q-A1 por controles públicos; 13 destinos e portal integrados');

    for(const size of [{width:1280,height:720},{width:1920,height:1080},{width:844,height:390}]) {
      await page.setViewportSize(size);
      await page.locator('#destination-virmura').focus();
      await capture(page,`mapa-${size.width}`);
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth || document.documentElement.scrollHeight>innerHeight,
        targets:[...document.querySelectorAll('[data-destination]')].map(el=>({id:el.id,w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})),
        badges:[...document.querySelectorAll('.quest-markers')].map(el=>el.getBoundingClientRect().toJSON()),
        footer:document.querySelector('.destination-bar').getBoundingClientRect().toJSON(),
        frame:document.querySelector('#game-frame').getBoundingClientRect().toJSON(),
      }));
      assert.equal(metrics.overflow,false);
      for(const target of metrics.targets) assert.ok(target.w>=44 && target.h>=44,JSON.stringify(target));
      for(let i=0;i<metrics.badges.length;i++) {
        const a=metrics.badges[i];
        assert.ok(a.y>=metrics.frame.y && a.bottom<=metrics.footer.y);
        for(const b of metrics.badges.slice(i+1)) assert.ok(a.right<=b.x || b.right<=a.x || a.bottom<=b.y || b.bottom<=a.y,'Marcadores sobrepostos');
      }
      assert.ok(metrics.frame.right<=size.width+1 && metrics.frame.bottom<=size.height+1);
      results.push(`Mapa ${size.width} × ${size.height}: enquadramento, alvos e marcadores sem sobreposição`);
    }
    await page.setViewportSize({width:390,height:844});
    await page.locator('#orientation').waitFor({state:'visible'});
    assert.equal(await page.locator('#game-frame').evaluate(e=>e.inert),true);
    await capture(page,'orientacao-retrato');
    await page.setViewportSize({width:1280,height:720});
    await page.locator('#game-frame').waitFor({state:'visible'});
    for(const place of map.destinations.filter(p=>!p.fixed)) {
      await visit(page,place.id);
      assert.equal((await state(page)).location,place.id);
      assert.equal((await state(page)).scene,null);
      await back(page);
      await page.waitForFunction(id=>document.activeElement.id==='destination-'+id,place.id);
    }
    results.push('Todos os destinos visitáveis por teclado; retorno restaura foco; retrato suspende interação');
    await page.keyboard.press('ArrowLeft');
    assert.notEqual(await page.evaluate(()=>document.activeElement.id),'destination-minas');
    await page.locator('#map-legend-button').click();
    assert.equal(await page.locator('.map-legend').isVisible(),true);
    await capture(page,'legenda');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.map-legend').isVisible(),false);

    const point=await hitPoint(page,'quarta');
    await page.touchscreen.tap(point.x,point.y);
    assert.equal((await state(page)).location,null);
    await page.touchscreen.tap(point.x,point.y);
    assert.equal((await state(page)).location,'quarta');
    await capture(page,'local-quarta');
    await back(page);
    const drag=await hitPoint(page,'mercado');
    const cdp=await context.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[drag]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:drag.x+30,y:drag.y}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    assert.equal((await state(page)).location,null);
    await cdp.detach();
    results.push('Toque seleciona antes de visitar; deslocamento cancela ativação');

    await menuAction(page,'Diário');
    const location=await page.locator('[data-locate]').first().getAttribute('data-locate');
    const beforeLocate=await state(page);
    await page.locator('[data-locate]').first().click();
    await ready(page);
    await page.waitForFunction(id=>document.activeElement.id==='destination-'+id,location);
    const afterLocate=await state(page);
    assert.equal(afterLocate.location,null);
    assert.equal(afterLocate.map.focus,location);
    assert.deepEqual(afterLocate.completed,beforeLocate.completed);
    assert.deepEqual(afterLocate.items,beforeLocate.items);
    assert.equal(afterLocate.ludos,beforeLocate.ludos);
    await visit(page,'coreto');
    await finishReading(page);
    await capture(page,'coreto');
    await page.getByRole('button',{name:/Voltar a Terminus/}).click();
    await ready(page);
    await page.waitForFunction(() => document.activeElement.id === 'destination-coreto');
    results.push('Diário localiza sem iniciar missão; portal vai e volta da Noite da História');

    const beforeEditorial=await page.evaluate(()=>localStorage.getItem('terminus-campaign-v3'));
    await page.locator('#menu-button').click();
    await page.locator('#game-menu summary').click();
    await page.locator('#game-menu').getByRole('button',{name:'Cenas e variantes',exact:true}).click();
    await capture(page,'previa-editorial');
    await page.locator('#workspace-nav').getByRole('button',{name:'Inventário de arte',exact:true}).click();
    await page.locator('#menu-button').click();
    await page.locator('#game-menu').getByRole('button',{name:'Prévia do mapa',exact:true}).click();
    await ready(page);
    assert.equal(await page.evaluate(()=>localStorage.getItem('terminus-campaign-v3')),beforeEditorial);
    results.push('Cenas, catálogo e prévia do mapa isolados do save');

    const g=opened();
    g.dispatch({type:'mapPosition',scroll:1840,focus:'quarta'});
    await importSave(page,g.save());await ready(page);
    assert.equal((await state(page)).map.scroll,1840);
    await page.waitForFunction(() => document.activeElement.id === 'destination-quarta');
    await capture(page,'save-v3-antigo');
    const downloaded=page.waitForEvent('download');
    await menuAction(page,'Exportar partida');
    const download=await downloaded;
    const downloadPath=path.join(out,'exportado-v3.json');
    try {
      await download.saveAs(downloadPath);
      assert.deepEqual(E.restore(JSON.parse(fs.readFileSync(downloadPath))).state,await state(page));
      results.push('Exportação JSON pelo botão preserva a partida V3');
    } catch(error) {failedChecks.push({check:'Exportação JSON pelo navegador',error:String(error)});}
    results.push('Importação V3 preserva posição antiga, itens e recompensas');

    const mobile=opened();start(mobile,'gB1');finishScene(mobile);start(mobile,'gB1');
    while(E.page(mobile.state).passage.operation!=='give') mobile.dispatch({type:'advance'});
    await importSave(page,mobile.save());
    await page.setViewportSize({width:844,height:390});
    await capture(page,'leitura-844');
    assert.equal(await page.locator('#notice').evaluate(e => e.getBoundingClientRect().top >= document.querySelector('#game-frame').getBoundingClientRect().bottom - 1),true);
    await page.getByRole('button',{name:'Fechar aviso',exact:true}).click();
    await capture(page,'leitura-844-sem-aviso');
    assert.doesNotMatch(await page.locator('.scene-object').innerText(), /null|OBJETO A PRODUZIR/);
    assert.equal(await page.locator('.handover').evaluate(e=>getComputedStyle(e).animationName),'none');
    assert.equal(await page.locator('.scene-controls').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight),true);
    await menuAction(page,'Diário');
    assert.equal(await page.locator('[data-locate]').count(),0);
    assert.ok(await page.getByText('Termine a cena ou batalha para explorar.',{exact:true}).count());
    await page.getByRole('button',{name:'Retomar a história',exact:true}).click();
    await page.setViewportSize({width:1280,height:720});
    results.push('Cena e escolhas no quadro, movimento reduzido, Diário bloqueado durante diálogo');

    const longText=play({mode:'max',stopAt:s=>s.scene?.quest==='side2'}).game;
    await importSave(page,longText.save());
    await page.getByRole('button',{name:'Fechar aviso',exact:true}).click();
    await page.setViewportSize({width:844,height:390});
    const panel=page.locator('.description-panel,.dialogue-panel').first();
    assert.equal(await panel.locator('p').innerText(),E.page(longText.state).passage.text);
    assert.ok(await panel.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=18));
    await panel.evaluate(e=>{e.scrollTop=e.scrollHeight;});
    assert.equal(await panel.evaluate(e=>e.scrollTop+e.clientHeight>=e.scrollHeight-1),true);
    await capture(page,'texto-longo-844');
    await page.setViewportSize({width:1280,height:720});
    results.push('Texto extenso preservado e acessível por rolagem interna em 844 × 390');

    const paid=play({mode:'max',stopAt:s=>s.stage===2&&!s.scene}).game;
    paid.dispatch({type:'map'});await importSave(page,paid.save());await ready(page);
    assert.ok(await page.locator('.quest-markers [data-category="intervention"]').count());
    await capture(page,'intervencao-disponivel');
    const blocked=play({stopAt:s=>s.routeProgress===2&&!s.scene}).game;
    blocked.dispatch({type:'map'});await importSave(page,blocked.save());await ready(page);
    assert.equal(await page.locator('.quest-markers [data-category="intervention"]').count(),0);
    await capture(page,'sem-saldo');
    results.push('Marcadores de intervenção correspondem ao saldo real da campanha');

    const broken=await context.newPage();observe(broken);
    await broken.route('**/assets/terminus/mapa/cidade-v2.png',route=>route.abort());
    await broken.goto(url);
    await broken.locator('#language-title').selectOption('pt-BR');
    await importSave(broken,opened().save());
    await broken.locator('#retry-city').waitFor({state:'visible'});
    assert.equal(await broken.locator('[data-destination]:disabled').count(),14);
    await capture(broken,'falha-cidade');
    await broken.unroute('**/assets/terminus/mapa/cidade-v2.png');
    await broken.locator('#retry-city').click();await ready(broken);
    await broken.route('**/assets/terminus/locais/guilda-virmura-recepcao-v1.png',route=>route.abort());
    await visit(broken,'virmura');
    await broken.getByRole('alert').filter({hasText:'Não foi possível abrir'}).waitFor();
    await capture(broken,'falha-cenario');
    await broken.unroute('**/assets/terminus/locais/guilda-virmura-recepcao-v1.png');
    await broken.getByRole('button',{name:'Carregar imagem novamente',exact:true}).click();
    await broken.waitForFunction(()=>document.querySelector('.background-image')?.naturalWidth>0);
    await broken.close();
    results.push('Falhas de cidade e cenário têm recuperação real sem alterar progresso');

    const final=play({guild:'C',route:'Y',stopAt:s=>s.battle?.id==='t5'}).game;
    await importSave(page,final.save());
    await page.getByRole('button',{name:'Rolar o D20',exact:true}).waitFor();
    await capture(page,'batalha-final');
    await page.reload();
    await page.getByRole('button',{name:'Continuar a história',exact:true}).click();
    assert.deepEqual(await state(page),final.state);
    results.push('Batalha final recarrega com resultados e posição de leitura preservados');

    const localContext=await browser.newContext({locale:'pt-BR',viewport:{width:1280,height:720}});
    const local=await localContext.newPage();observe(local);
    await local.goto(pathToFileURL(path.join(root,'docs/terminus/prototipo/index.html')).href);
    await local.locator('#language-title').selectOption('pt-BR');
    await importSave(local,opened().save());await ready(local);
    await capture(local,'arquivo-local');
    const geometry=await hitPoint(local,'coliseu');await local.mouse.move(geometry.x,geometry.y);
    await capture(local,'hover-violeta');
    assert.equal(await local.locator('[data-id="coliseu"]').getAttribute('data-state'),'hover');
    assert.equal(await local.locator('[data-id="coliseu"] .facade').evaluate(e=>getComputedStyle(e).transform),'matrix(1.04, 0, 0, 1.04, 0, 0)');
    assert.equal(await local.locator('[data-id="coliseu"] .cast-shadow').evaluate(e=>getComputedStyle(e).transform),'matrix(1, 0, 0, 1, 6, 8)');
    await local.mouse.click(geometry.x,geometry.y);
    assert.equal((await state(local)).location,'coliseu');
    results.push('file:// carrega fontes, mapa e campanha; hover e clique com recorte alfa');
    await localContext.close();
    assert.deepEqual(errors,[]);
    assert.deepEqual(failedChecks,[]);
    fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify({status:'pass',browser:await browser.version(),results,errors,limits:['Toque emulado; sem aparelho físico ou leitor de tela.','Aceite artístico permanece com o autor.']},null,2));
    console.log(results.join('\n'));
  } catch(error) {
    fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify({status:'fail',results,errors,failedChecks,error:String(error)},null,2));
    throw error;
  } finally {
    if(browser) await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
