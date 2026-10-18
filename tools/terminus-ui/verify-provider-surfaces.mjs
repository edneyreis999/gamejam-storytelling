import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openRuntime} from './test-runtime.mjs';
const native=process.argv.includes('--native'),withoutDS=process.argv.includes('--without-ds');
const hideSkin=process.argv.includes('--hide-skin');
const runtime=await openRuntime({native,fixtureName:'surfaces-native-'+withoutDS,pluginTransform:plugins=>{
    if(withoutDS)plugins.find(p=>p.name==='Coreto_5_DesignSystem').status=false;
    const battle=plugins.find(p=>p.name==='VisuMZ_1_BattleCore');
    const layout=JSON.parse(battle.parameters['BattleLayout:struct']);
    layout['StatusWindowSkinFilename:str']='CoretoWindow';
    layout['StatusWindowSkinHide:eval']=String(hideSkin);
    layout['StatusWindowSelectableBackHide:eval']='true';
    battle.parameters['BattleLayout:struct']=JSON.stringify(layout);
}});
try{
    const {page}=runtime;
    await page.evaluate(()=>{DataManager.setupNewGame();SceneManager.goto(Scene_Map);});
    await page.waitForFunction(()=>SceneManager._scene instanceof Scene_Map&&SceneManager._scene.isStarted());
    await page.evaluate(()=>{BattleManager.setup(1,true,true);SceneManager.push(Scene_Battle);});
    await page.waitForFunction(()=>SceneManager._scene instanceof Scene_Battle&&SceneManager._scene.isStarted()&&ImageManager.isReady());
    const status=await page.evaluate(()=>{
        const w=SceneManager._scene._statusWindow;
        w.refresh();w._refreshFrame();w._refreshBack();
        w.activate();w.select(0);w.openness=255;w._updateCursor();
        return {skin:w.windowskin.url,frameUsesSkin:w._frameSprite.children.length>0&&w._frameSprite.children.every(part=>part.bitmap===w.windowskin),backUsesSkin:w._backSprite.bitmap===w.windowskin,
            cursorVisible:w._cursorSprite.visible,opacity:w.opacity,
            backgroundAlpha:w.contentsBack.context.getImageData(0,0,w.contentsBack.width,w.contentsBack.height).data.filter((_,i)=>i%4===3).some(v=>v!==0)};
    });
    const evidence={native,withoutDS,hideSkin,status,errors:runtime.errors};
    fs.writeFileSync(`.local-tools/visumz-review/provider-surfaces-${native?'native':'browser'}-${withoutDS?'off':'on'}-${hideSkin?'hidden':'visible'}.json`,JSON.stringify(evidence,null,2));
    console.log(JSON.stringify(evidence));
    assert.match(status.skin,/CoretoWindow\.png$/);
    assert.equal(status.frameUsesSkin,true,'BattleCore skin frame must remain in use');
    assert.equal(status.backUsesSkin,true,'BattleCore skin background must remain in use');
    assert.equal(status.backgroundAlpha,false,'BattleCore hidden selectable background must remain empty');
    assert.equal(status.cursorVisible,true,'Hiding item backgrounds must not remove keyboard focus');
    assert.equal(status.opacity,hideSkin?0:255,'BattleCore skin visibility must remain authoritative');
    assert.deepEqual(runtime.errors,[]);
}finally{await runtime.close();}
