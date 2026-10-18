import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openRuntime} from './test-runtime.mjs';
const native=process.argv.includes('--native');
const runtime=await openRuntime({native,fixtureName:'hover-native'});
const {page}=runtime;
const output='.local-tools/visumz-review';fs.mkdirSync(output,{recursive:true});
try{
    await page.evaluate(()=>SceneManager.push(Scene_Options));
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_Options'&&SceneManager._scene.isStarted()&&ImageManager.isReady());
    for(const hoverSelect of [true,false]){
        await page.evaluate(value=>{ConfigManager.uiHoverSelect=value;const w=SceneManager._scene._optionsWindow;w.smoothScrollTo(0,0);w.select(1);},hoverSelect);
        await page.waitForFunction(()=>!SceneManager._scene._optionsWindow._scrollDuration);
        for(const i of [1,2,3,5,2,-1]){
            const point=await page.evaluate(i=>{
                if(i<0)return{x:5,y:5};
                const w=SceneManager._scene._optionsWindow,r=w.itemRect(i),p=w.worldTransform.apply(new Point(r.x+400+w.padding-w.origin.x,r.y+r.height/2+w.padding-w.origin.y));return{x:p.x,y:p.y};
            },i);
            await page.mouse.move(point.x,point.y);
            await page.waitForFunction(i=>SceneManager._scene._optionsWindow._coretoHoverIndex===i,i);
            const state=await page.evaluate(()=>{
                const w=SceneManager._scene._optionsWindow;
                return {hover:w._coretoHoverIndex,selected:w.index(),rows:[1,2,3,5].map(i=>{const r=w.itemRect(i);return {i,color:w.contentsBack.getPixel(r.x+5,r.y+r.height/2)};})};
            });
            for(const row of state.rows){
                const expected=row.i===state.hover||row.i===state.selected?'#eedff2':'#f9eacf';
                assert.equal(row.color,expected,JSON.stringify({native,hoverSelect,state}));
            }
        }
    }
    await page.mouse.move(400,500);
    await page.mouse.wheel(0,700);
    await page.waitForFunction(()=>{const w=SceneManager._scene._optionsWindow;return w.scrollY()>0&&!w._scrollDuration;});
    await page.evaluate(()=>{const s=SceneManager._scene;s._categoryWindow.select(1);s._optionsWindow.setCategory(s._categoryWindow.currentData());});
    await page.waitForFunction(()=>{const w=SceneManager._scene._optionsWindow;return w._list.some(r=>r.symbol==='masterVolume')&&!w._scrollDuration;});
    await page.mouse.move(800,350);
    await page.waitForFunction(()=>SceneManager._scene._optionsWindow._coretoHoverIndex>=0);
    await page.evaluate(()=>SceneManager._scene._optionsWindow.deactivate());
    await page.waitForFunction(()=>SceneManager._scene._optionsWindow._coretoHoverIndex===-1);
    await page.evaluate(()=>{const w=SceneManager._scene._optionsWindow;w.activate();w.select(w.findSymbol('bgmVolume'));});
    await page.mouse.move(5,5);
    await page.waitForFunction(()=>{const w=SceneManager._scene._optionsWindow;return w._coretoHoverIndex===-1&&w._coretoSelectedIndex===w.index();});
    const visible=await page.evaluate(()=>{const w=SceneManager._scene._optionsWindow;return w._list.map((row,i)=>{const r=w.itemRect(i);return {symbol:row.symbol,i,selected:w.index(),enabled:w.isCommandEnabled(i),visible:r.y>=0&&r.y+r.height<=w.contentsBack.height,color:w.contentsBack.getPixel(r.x+5,r.y+r.height/2)};}).filter(r=>r.symbol&&r.visible);});
    for(const row of visible)assert.equal(row.color,!row.enabled?'#d3c7b4':row.i===row.selected?'#eedff2':'#f9eacf',JSON.stringify(row));
    const pixels=await page.evaluate(()=>{const bitmap=Bitmap.snap(SceneManager._scene);const data=bitmap.canvas.toDataURL();bitmap.destroy();return data;});
    fs.writeFileSync(output+`/hover-${native?'native':'browser'}.png`,Buffer.from(pixels.split(',')[1],'base64'));
    const result={native,checks:['sequential hover with hover selection on/off','pointer leave','scroll','category change','deactivation','selection change'],errors:runtime.errors,versions:await page.evaluate(()=>Utils.isNwjs()?process.versions:{browser:navigator.userAgent})};
    fs.writeFileSync(output+`/hover-${native?'native':'browser'}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
    assert.deepEqual(runtime.errors,[]);
}finally{await runtime.close();}
