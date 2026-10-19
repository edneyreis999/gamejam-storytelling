import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
const here=path.dirname(fileURLToPath(import.meta.url));
const output=path.join(here,'verificacao','tela-unica');
fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const url=pathToFileURL(path.join(here,'index.html')).href;
const checks=[];
function check(name,value){assert.ok(value,name);checks.push(name);}
const ready=p=>p.waitForFunction(()=>document.getElementById('stage').dataset.ready==='true');
const opened=p=>p.locator('#preview').evaluate(e=>e.open);
const selected=p=>p.locator('.landmark[data-state]').evaluateAll(es=>es.map(e=>e.dataset.id));
const button=(p,id)=>p.locator('[data-id="'+id+'"] button');
const focus=async(p,id)=>{await p.keyboard.press('Tab');await button(p,id).focus();};
const point=(p,id)=>p.evaluate(id=>{
  const place=window.TERMINUS_MAP.destinations.find(p=>p.id===id);
  const r=document.querySelector('[data-id="'+id+'"] button').getBoundingClientRect();
  if(place.fixed)return {x:r.x+r.width/2,y:r.y+r.height/2};
  const runs=place.hitRows.flatMap((runs,y)=>runs.map(([a,b])=>({a,b,y}))).filter(r=>r.y>52&&r.y<94).sort((a,b)=>(b.b-b.a)-(a.b-a.a));
  const run=runs[0];
  return {x:r.x+r.width*(run.a+run.b)/256,y:r.y+r.height*(run.y+.5)/128};
},id);
const scene=p=>p.waitForFunction(()=>{const i=document.getElementById('scene-image');return !i.hidden&&i.complete&&i.naturalWidth>0;});
const capture=(p,name)=>p.screenshot({path:path.join(output,name+'.png')});
const resize=async(p,size)=>{
  await p.setViewportSize(size);
  await p.waitForFunction(()=>Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale'))-Math.min(innerWidth/1280,innerHeight/720))<.000001);
};
try{
  await page.goto(url);await ready(page);await page.evaluate(()=>document.fonts.ready);
  const map=await page.evaluate(()=>window.TERMINUS_MAP);
  check('14 destinos / 19 fundos',map.destinations.length===14&&map.destinations.reduce((n,d)=>n+d.views.length,0)===19);
  check('Abertura local sem servidor',page.url().startsWith('file:///'));
  check('Inicia sem seleção',(await selected(page)).length===0&&await page.locator('#empty-selection').isVisible());
  check('Título visual, Visitar e controles de câmera removidos',await page.locator('.masthead,#visit,#pan-left,#pan-right,#camera-thumb').count()===0);
  await capture(page,'cidade-1280');
  for(const size of [{width:1280,height:720},{width:1920,height:1080},{width:844,height:390}]){
    await resize(page,size);
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)));
    const geometry=await page.evaluate(()=>{
      const frame=document.getElementById('frame').getBoundingClientRect();
      const footer=document.querySelector('.destination-bar').getBoundingClientRect();
      const boxes=[...document.querySelectorAll('.landmark')].map(e=>{const r=e.getBoundingClientRect();return {id:e.dataset.id,x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};});
      return {frame:{x:frame.x,y:frame.y,right:frame.right,bottom:frame.bottom,width:frame.width},footerTop:footer.top,boxes};
    });
    const g=geometry;
    check('Todos visíveis em '+size.width,g.boxes.every(r=>r.x>=g.frame.x-1&&r.y>=g.frame.y-1&&r.right<=g.frame.right+1&&r.bottom<=g.footerTop));
    check('Caixas separadas em '+size.width,g.boxes.every((a,i)=>g.boxes.slice(i+1).every(b=>a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y)));
    check('Alvos mínimos 44px em '+size.width,g.boxes.every(r=>r.w>=44&&r.h>=44));
    check('Reserva para menu MZ em '+size.width,g.boxes.every(r=>r.right<=g.frame.right-96*g.frame.width/1280||r.y>=g.frame.y+72*g.frame.width/1280));
    await capture(page,'cidade-'+size.width);
    const zoomFits=await page.evaluate(()=>{
      const footer=document.querySelector('.destination-bar').getBoundingClientRect();
      const frame=document.getElementById('frame').getBoundingClientRect();
      return [...document.querySelectorAll('#destinations .landmark')].map(e=>{
        const button=e.querySelector('button');button.focus();
        const r=button.getBoundingClientRect();
        const marker=e.querySelector('.landmark-marker').getBoundingClientRect();
        const others=[...document.querySelectorAll('.landmark')].filter(other=>other!==e).map(other=>other.querySelector('button').getBoundingClientRect());
        const separate=box=>others.every(other=>box.right<=other.left||other.right<=box.left||box.bottom<=other.top||other.bottom<=box.top);
        return {id:e.dataset.id,within:r.left>=frame.left&&r.top>=frame.top&&r.right<=frame.right&&r.bottom<=footer.top,markerFits:marker.bottom<=footer.top,targetSeparate:separate(r),markerSeparate:separate(marker)};
      }).filter(result=>!result.within||!result.markerFits||!result.targetSeparate||!result.markerSeparate);
    });
    assert.deepEqual(zoomFits,[],'Zoom e pegadas em '+size.width);
    checks.push('Zoom e pegadas cabem sem colisões em '+size.width);
    await page.keyboard.press('Escape');
  }
  await resize(page,{width:1280,height:720});
  const inn=await point(page,'estalagem');
  await page.mouse.move(inn.x,inn.y);
  check('Hover identifica somente a fachada apontada',(await selected(page)).join()==='estalagem');
  check('Pegadas e halo violeta coincidem',await page.locator('[data-id="estalagem"]').evaluate(e=>e.dataset.state==='hover'&&getComputedStyle(e.querySelector('.landmark-marker')).color==='rgb(130, 36, 173)'));
  const shadow=await page.locator('[data-id="estalagem"] .cast-shadow').evaluate(e=>({filter:getComputedStyle(e).filter,transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity}));
  check('Sombra reforçada sudeste independente',shadow.transform==='matrix(1, 0, 0, 1, 6, 8)'&&shadow.opacity==='0.38'&&shadow.filter==='brightness(0) blur(4px)');
  check('Hover amplia fachada e recorte juntos',await page.locator('[data-id="estalagem"]').evaluate(e=>{
    const facade=getComputedStyle(e.querySelector('.facade'));const target=getComputedStyle(e.querySelector('button'));
    return facade.transform==='matrix(1.04, 0, 0, 1.04, 0, 0)'&&target.transform===facade.transform&&target.transformOrigin===facade.transformOrigin;
  }));
  await capture(page,'hover-violeta');
  await page.mouse.move(450,50);
  check('Sair do hover restaura rodapé vazio',(await selected(page)).length===0&&await page.locator('#empty-selection').isVisible());
  await focus(page,'contratos');
  check('Foco mantém seleção dourada',await page.locator('[data-id="contratos"]').evaluate(e=>e.dataset.state==='selected'&&e.dataset.keyboard==='true'&&getComputedStyle(e.querySelector('.landmark-marker')).color==='rgb(237, 170, 47)'));
  check('Seleção mantém zoom',await page.locator('[data-id="contratos"] .facade').evaluate(e=>getComputedStyle(e).transform==='matrix(1.04, 0, 0, 1.04, 0, 0)'));
  await page.mouse.move(inn.x,inn.y);
  check('Hover substitui seleção mantida sem duplicar',(await selected(page)).join()==='estalagem');
  await page.mouse.move(450,50);
  check('Saída restaura seleção mantida',(await selected(page)).join()==='contratos');
  await capture(page,'foco-dourado');
  await page.mouse.click(450,50);
  check('Clique no terreno limpa seleção',(await selected(page)).length===0);
  await focus(page,'contratos');await page.keyboard.press('Escape');
  check('Esc limpa seleção fora da prévia',(await selected(page)).length===0);
  for(const place of map.destinations){
    await focus(page,place.id);await page.keyboard.press('Enter');await scene(page);
    assert.equal(await page.locator('#preview-title').textContent(),place.name);
    for(let i=0;i<place.views.length;i++){
      await page.locator('#view-controls button').nth(i).click();await scene(page);
      check(place.id+': '+place.views[i].name,(await page.locator('#scene-image').getAttribute('src')).endsWith(place.views[i].file));
    }
    if(place.id==='coliseu')await capture(page,'previa-coliseu');
    await page.keyboard.press('Escape');
    assert.equal(await opened(page),false);
    assert.deepEqual(await selected(page),[place.id]);
    assert.equal(await button(page,place.id).evaluate(e=>e===document.activeElement),true);
    if(place.id==='oficina'||place.id==='minas')await capture(page,place.id+'-selecionada');
  }
  checks.push('Retorno de todas as prévias restaura destino e foco');
  await focus(page,'estalagem');
  const tabbed=new Set();
  for(let i=0;i<17;i++){
    const id=await page.evaluate(()=>document.activeElement.closest('.landmark')?.dataset.id);
    if(id)tabbed.add(id);
    await page.keyboard.press('Tab');
  }
  check('Tab alcança 14 destinos',tabbed.size===14);
  await focus(page,'estalagem');await page.keyboard.press('Shift+Tab');await page.keyboard.press('Tab');
  check('Shift+Tab e Tab restauram foco',await button(page,'estalagem').evaluate(e=>e===document.activeElement));
  for(const key of ['ArrowRight','ArrowLeft','ArrowDown','ArrowUp']){
    await focus(page,'borun');await page.keyboard.press(key);
    check(key+' navega espacialmente',(await selected(page))[0]!=='borun');
  }
  await page.keyboard.press('Space');check('Espaço visita',await opened(page));await page.keyboard.press('Escape');
  await page.mouse.move(inn.x,inn.y);await page.mouse.click(inn.x,inn.y);
  check('Clique visita',await opened(page));await page.locator('#back').click();
  const box=await button(page,'estalagem').boundingBox();
  await page.mouse.click(box.x+1,box.y+1);
  check('Margem transparente não visita',!(await opened(page)));
  const excluded=await page.evaluate(()=>{
    let tested=0;
    for(const p of window.TERMINUS_MAP.destinations.filter(p=>!p.fixed)){
      const b=document.querySelector('[data-id="'+p.id+'"] button').getBoundingClientRect();
      for(let y=5;y<124;y+=12)for(let x=5;x<124;x+=12){
        if(p.hitRows[y].some(([a,z])=>x>=a&&x<z))continue;
        const hit=document.elementFromPoint(b.x+(x+.5)*b.width/128,b.y+(y+.5)*b.height/128);
        if(hit?.classList.contains('destination-button'))return -1;
        tested++;
      }
    }
    return tested;
  });
  check('Alfa exclui margens e vazios internos',excluded>100);
  await page.mouse.move(inn.x,inn.y);await page.mouse.down();await page.mouse.move(inn.x-60,inn.y+10,{steps:8});await page.mouse.up();
  check('Arrasto cancela visita',!(await opened(page)));
  const rectBefore=await page.locator('[data-id="estalagem"]').boundingBox();
  await page.mouse.wheel(3000,0);
  check('Rolagem não desloca a cidade',JSON.stringify(await page.locator('[data-id="estalagem"]').boundingBox())===JSON.stringify(rectBefore));
  await focus(page,'coliseu');await page.keyboard.press('Enter');
  await page.locator('#view-controls button').nth(1).click();await page.locator('#view-controls button').nth(2).click();await scene(page);
  check('Troca rápida preserva último fundo',(await page.locator('#scene-image').getAttribute('src')).endsWith('coliseu-servico-v2.png'));
  await page.keyboard.press('Escape');
  await resize(page,{width:390,height:844});
  check('Retrato orienta rotação e impede miniaturas',await page.locator('#orientation').isVisible()&&await page.locator('#frame').isHidden()&&await page.locator('#frame').evaluate(e=>e.inert));
  await capture(page,'orientacao-retrato');
  await resize(page,{width:1280,height:720});
  check('Retorno horizontal restaura cidade',await page.locator('#orientation').isHidden());
  check('Sem animações',await page.evaluate(()=>[...document.querySelectorAll('*')].every(e=>getComputedStyle(e).animationName==='none'&&getComputedStyle(e).transitionDuration==='0s')));
  await page.emulateMedia({reducedMotion:'reduce'});await focus(page,'estalagem');
  check('Movimento reduzido preserva destaque sem zoom',await page.locator('[data-id="estalagem"]').evaluate(e=>e.dataset.state==='selected'&&getComputedStyle(e.querySelector('.facade')).transform==='matrix(1, 0, 0, 1, 0, 0)'));
  await page.emulateMedia({reducedMotion:'no-preference'});await page.keyboard.press('Escape');

  const touch=await browser.newPage({viewport:{width:1280,height:720},hasTouch:true});
  await touch.goto(url);await ready(touch);
  for(const id of ['estalagem','portal']){
    const p=await point(touch,id);
    await touch.touchscreen.tap(p.x,p.y);
    check(id+': primeiro toque identifica',!(await opened(touch))&&(await selected(touch)).join()===id);
    await touch.touchscreen.tap(p.x,p.y);
    check(id+': segundo toque visita',await opened(touch));
    await touch.locator('#back').tap();
    const cdp=await touch.context().newCDPSession(touch);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x-25,y:p.y}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    check(id+': deslocamento cancela visita',!(await opened(touch)));
    await cdp.detach();
    await touch.touchscreen.tap(450,50);
    check(id+': toque no terreno limpa',(await selected(touch)).length===0);
  }
  await touch.close();
  for(const kind of ['cidade','fundo']){
    const failed=await browser.newPage({viewport:{width:1280,height:720}});
    const pattern=kind==='cidade'?'**/cidade-v2.png':'**/estalagem-nyra-salao-v1.png';
    await failed.route(pattern,r=>r.abort());await failed.goto(url);
    if(kind==='fundo'){await ready(failed);await focus(failed,'estalagem');await failed.keyboard.press('Enter');}
    const retry=failed.locator(kind==='cidade'?'#retry-city':'#retry-scene');
    await retry.waitFor({state:'visible'});
    check('Falha '+kind+' oferece recuperação',await retry.isEnabled());
    if(kind==='cidade')check('Cidade incompleta não tem destinos ativos',await failed.locator('.destination-button:enabled').count()===0);
    await capture(failed,'falha-'+kind);
    await failed.unroute(pattern);await retry.click();
    if(kind==='cidade')await ready(failed);else await scene(failed);
    check('Recuperação '+kind+' funciona',await retry.isHidden());
    await failed.close();
  }
  const contrast=(a,b)=>{
    const lum=h=>{const c=h.match(/[\da-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
    const [hi,lo]=[lum(a),lum(b)].sort((a,b)=>b-a);return (hi+.05)/(lo+.05);
  };
  const ratios={text:contrast('360a0b','f9eacf'),primary:contrast('fff8eb','552070'),primaryHover:contrast('fff8eb','6d3185'),secondaryHover:contrast('360a0b','eedff2'),focusBacking:contrast('edaa2f','360a0b')};
  check('Contraste de textos e indicadores',Object.values(ratios).every(r=>r>=4.5));
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'resultados.json'),JSON.stringify({status:'em desenvolvimento',revision:'tela única',checkedAt:new Date().toISOString(),browser:await browser.version(),checks,contrast:ratios,errors,limitations:['Toque emulado; sem dispositivo físico.','Sem sessão manual de leitor de tela.']},null,2)+'\n');
  console.log(checks.length+' checks passed.');
}finally{await browser.close();}
