import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {openRuntime} from './test-runtime.mjs';
const native=process.argv.includes('--native'),withoutDS=process.argv.includes('--without-ds');
const output=path.resolve('.local-tools/options-review');
fs.mkdirSync(output,{recursive:true});
const runtime=await openRuntime({native,fixtureName:'options-native-'+withoutDS,pluginTransform:withoutDS?plugins=>{plugins.find(p=>p.name==='Coreto_5_DesignSystem').status=false;}:undefined});
const {page,errors}=runtime;
try {
    const pressUntil=async(key,condition)=>{
        await page.keyboard.down(key);
        try {await page.waitForFunction(condition);} finally {await page.keyboard.up(key);}
    };
    const capture = async name => {
        await page.waitForFunction(() => ImageManager.isReady() && !SceneManager._scene._optionsWindow?._scrollDuration);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const pixels=await page.evaluate(()=>{const bitmap=Bitmap.snap(SceneManager._scene);const data=bitmap.canvas.toDataURL();bitmap.destroy();return data;});
        fs.writeFileSync(path.join(output,name+(native?'-native':'')+(withoutDS?'-without-ds':'')+'.png'),Buffer.from(pixels.split(',')[1],'base64'));
    };
    const category = async index => {
        await page.evaluate(index => {
            const s=SceneManager._scene;
            s._categoryWindow.select(index);
            s._optionsWindow.setCategory(s._categoryWindow.currentData());
            s._optionsWindow.activate();
        },index);
        await page.waitForFunction(() => ImageManager.isReady() && !SceneManager._scene._optionsWindow._scrollDuration);
    };
    const select = async symbol => {
        await page.evaluate(symbol => {
            const w=SceneManager._scene._optionsWindow, index=w.findSymbol(symbol);
            if(index<0) throw Error('Missing option '+symbol);
            w.select(index);w.ensureCursorVisible(false);
        },symbol);
        await page.waitForFunction(() => !SceneManager._scene._optionsWindow._scrollDuration);
    };
    const value = symbol => page.evaluate(symbol=>SceneManager._scene._optionsWindow.getConfigValue(symbol),symbol);
    const clickControl = async (symbol,ratio,slider=false) => {
        await select(symbol);
        const point=await page.evaluate(({ratio,slider})=>{
            const w=SceneManager._scene._optionsWindow,i=w.index(),c=w._optionControls[i],r=w.itemRect(i);
            const p=w.worldTransform.apply(new Point(c.x+ratio*(slider?c.trackWidth:c.width)+w.padding-w.origin.x,r.y+r.height/2+w.padding-w.origin.y));
            return {x:p.x,y:p.y};
        },{ratio,slider});
        await page.mouse.click(point.x,point.y);
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    };
    await page.waitForFunction(() => SceneManager._scene?.constructor.name === 'Scene_Title' && SceneManager._scene.isStarted() && !SceneManager._scene.isBusy());
    await page.evaluate(() => SceneManager.push(Scene_Options));
    await page.waitForFunction(() => SceneManager._scene?.constructor.name === 'Scene_Options' && SceneManager._scene.isStarted() && ImageManager.isReady());
    await page.waitForFunction(()=>SceneManager._scene._optionsWindow.currentSymbol()==='alwaysDash');
    await capture('geral');
    await select('randomEncounters');
    await pressUntil('ArrowDown',()=>SceneManager._scene._optionsWindow.currentSymbol()==='battleAniShow');
    await pressUntil('ArrowUp',()=>SceneManager._scene._optionsWindow.currentSymbol()==='randomEncounters');
    await clickControl('alwaysDash',0.25);
    assert.equal(await value('alwaysDash'),false);
    await clickControl('alwaysDash',0.75);
    assert.equal(await value('alwaysDash'),true);
    await clickControl('randomEncounters',0.1);
    assert.equal(await value('randomEncounters'),0);
    await clickControl('randomEncounters',0.9);
    assert.equal(await value('randomEncounters'),2);
    await select('rebindGamepad');
    await capture('geral-controles');
    await category(1);
    await clickControl('masterVolume',0.3,true);
    assert.equal(await value('masterVolume'),30);
    await capture('audio');
    await clickControl('masterVolume',0,true);
    assert.equal(await value('masterVolume'),0);
    await clickControl('masterVolume',1,true);
    assert.equal(await value('masterVolume'),100);
    await select('seBuzzer');
    await capture('audio-sons');
    await category(2);
    await capture('interface');
    await select('textSpeed');
    await page.evaluate(()=>{const w=SceneManager._scene._optionsWindow;while(w.getConfigValue('textSpeed')<11)w.cursorRight();});
    assert.equal(await value('textSpeed'),11);
    await capture('interface-texto');
    await select('uiInputPosition');
    await capture('interface-organizacao');
    await category(3);
    await capture('teste-desligado');
    await select('assistMode');
    await page.evaluate(()=>SceneManager._scene._optionsWindow.cursorRight());
    await page.waitForFunction(()=>SceneManager._scene._optionsWindow.findSymbol('assistGoldMultiplier')>=0);
    await select('assistGoldMultiplier');
    await capture('teste-recompensas');
    await clickControl('assistGoldMultiplier',0.3,true);
    assert.equal(await value('assistGoldMultiplier'),3);
    await select('assistCallDebug');
    await capture('teste-acoes');
    await category(0);
    await select('rebindKeyboard');
    await page.evaluate(()=>SceneManager._scene._optionsWindow.processOk());
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_RebindKeyboard' && SceneManager._scene.isStarted());
    await capture('teclado');
    const rebindDrawing=await page.evaluate(()=>{
        const w=SceneManager._scene._rebindWindow,b=w.contents,draw=b.drawText,drawings=[];
        b.drawText=function(text,...args){drawings.push({text,color:this.textColor,size:this.fontSize,face:this.fontFace});return draw.call(this,text,...args);};
        w.redrawItem(w.index()); b.drawText=draw;return drawings;
    });
    if(!withoutDS) assert(rebindDrawing.length>0&&rebindDrawing.every(d=>d.color==='#360a0b'),JSON.stringify(rebindDrawing));
    await page.evaluate(()=>SceneManager._scene.startRebind());
    await page.waitForFunction(()=>SceneManager._scene._inputMsgWindow.isOpen());
    await capture('teclado-aguardando');
    await pressUntil('Escape',()=>SceneManager._scene._inputMsgWindow.isClosed());
    await page.evaluate(()=>SceneManager.pop());
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_Options' && SceneManager._scene.isStarted());
    await category(0);await select('rebindGamepad');
    await page.evaluate(()=>SceneManager._scene._optionsWindow.processOk());
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_RebindGamepad' && SceneManager._scene.isStarted());
    await capture('controle');
    await page.evaluate(()=>{const w=SceneManager._scene._rebindWindow;w.select(9);w.processOk();});
    await page.waitForFunction(()=>SceneManager._scene._helpWindow._text.includes('Conecte um controle'));
    await capture('controle-ausente');
    await page.evaluate(()=>SceneManager.pop());
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_Options' && SceneManager._scene.isStarted());
    await page.evaluate(()=>SceneManager.pop());
    await page.waitForFunction(()=>SceneManager._scene?.constructor.name==='Scene_Title' && SceneManager._scene.isStarted());
    await capture('titulo');
    console.log(JSON.stringify({native,withoutDS,errors,rebindDrawing,checks:'keyboard, pointer, ranges, conditional rows, rebind and scene return'}));
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(output,'interactions-'+(native?'native':'browser')+'-'+(withoutDS?'off':'on')+'.json'),JSON.stringify({native,withoutDS,errors,rebindDrawing,checks:'keyboard, pointer, ranges, conditional rows, rebind and scene return'},null,2));
} finally {await runtime.close();}
