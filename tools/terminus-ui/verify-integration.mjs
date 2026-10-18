import fs from 'node:fs';
import assert from 'node:assert/strict';
import {openRuntime} from './test-runtime.mjs';
const native=process.argv.includes('--native');
const runtime=await openRuntime({native,fixtureName:'integration-native'});
const {page}=runtime,output='.local-tools/visumz-review';
fs.mkdirSync(output,{recursive:true});
const evidence={native,scenes:[],checks:[]};
async function ready(name){await page.waitForFunction(name=>SceneManager._scene?.constructor.name===name&&SceneManager._scene.isStarted()&&ImageManager.isReady()&&(name!=='Scene_Options'||SceneManager._scene._optionsWindow.maxItems()>0),name);}
async function capture(name){
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.waitForFunction(()=>ImageManager.isReady());
    const pixels=await page.evaluate(()=>{const bitmap=Bitmap.snap(SceneManager._scene);const data=bitmap.canvas.toDataURL();bitmap.destroy();return data;});
    fs.writeFileSync(`${output}/${native?'native':'browser'}-${name}.png`,Buffer.from(pixels.split(',')[1],'base64'));
    evidence.scenes.push(name);
}
async function scene(name){await page.evaluate(name=>SceneManager.goto(window[name]),name);await ready(name);await capture(name);}
try{
    await capture('Scene_Title');
    await scene('Scene_Options');
    const symbols=await page.evaluate(()=>SceneManager._scene._optionsWindow._list.map(r=>r.symbol));
    for(const symbol of ['autoBattleAtStart','autoBattleUseSkills'])assert(symbols.includes(symbol),symbol);
    await page.evaluate(async()=>{
        ConfigManager.autoBattleAtStart=true;ConfigManager.autoBattleUseSkills=true;ConfigManager.visualHpGauge=false;
        await ConfigManager.save();
    });
    await page.waitForFunction(async()=>{const config=await StorageManager.loadObject('config');return config?.autoBattleAtStart===true&&config.autoBattleUseSkills===true&&config.visualHpGauge===false;});
    const saved=await page.evaluate(()=>StorageManager.loadObject('config'));
    for(const [key,value] of Object.entries({autoBattleAtStart:true,autoBattleUseSkills:true,visualHpGauge:false}))assert.equal(saved[key],value,key);
    await page.evaluate(async()=>{
        ConfigManager.autoBattleAtStart=false;ConfigManager.autoBattleUseSkills=false;ConfigManager.visualHpGauge=true;
        ConfigManager._isLoaded=false;ConfigManager.load();
    });
    await page.waitForFunction(()=>ConfigManager.isLoaded());
    assert.deepEqual(await page.evaluate(()=>[ConfigManager.autoBattleAtStart,ConfigManager.autoBattleUseSkills,ConfigManager.visualHpGauge]),[true,true,false]);
    evidence.checks.push('Battle options persist and reload');
    await page.evaluate(()=>{
        ConfigManager.autoBattleAtStart=false;ConfigManager.visualHpGauge=true;
        DataManager.setupNewGame();$gameParty.gainGold(500);
        for(const db of [$dataItems,$dataWeapons,$dataArmors])for(const item of db.filter(item=>item&&item.name&&!item.name.startsWith('-')).slice(0,4))$gameParty.gainItem(item,3);
        window.testItemId=$dataItems.find(item=>item&&item.name&&!item.name.startsWith('-')&&item.occasion<3).id;
        const actor=$gameActors.actor(1);actor.learnSkill(actor.currentClass().learnings[0].skillId);
        SceneManager.goto(Scene_Map);
    });
    await ready('Scene_Map');await capture('Scene_Map');
    const diagonal=await page.evaluate(()=>{
        const player=$gamePlayer;
        // Use a passable tile pair from the current map, without changing the database.
        for(let y=1;y<$gameMap.height()-1;y++)for(let x=1;x<$gameMap.width()-1;x++){
            player.locate(x,y);
            if(player.canPassDiagonally(x,y,6,2)){player.moveDiagonally(6,2);return {before:[x,y],after:[player.x,player.y],enabled:VisuMZ.EventsMoveCore.Settings.Movement.EnableDir8};}
        }
        throw Error('No passable diagonal found');
    });
    assert.equal(diagonal.enabled,true);assert.deepEqual(diagonal.after,diagonal.before.map(v=>v+1));evidence.checks.push('Diagonal movement');
    await scene('Scene_Menu');
    await scene('Scene_Item');
    await page.waitForFunction(()=>SceneManager._scene._itemWindow.maxItems()>0);
    const itemUse=await page.evaluate(()=>{
        const s=SceneManager._scene,actor=$gameParty.members()[0],item=$dataItems[testItemId];
        actor.setHp(1);const before=$gameParty.numItems(item);
        s._itemWindow.select(s._itemWindow._data.indexOf(item));s.onItemOk();s._actorWindow.select(0);s.onActorOk();
        return {before,after:$gameParty.numItems(item),hp:actor.hp};
    });
    assert.equal(itemUse.after,itemUse.before-1);assert(itemUse.hp>1);evidence.checks.push('Item use heals actor and consumes one item');
    await scene('Scene_Equip');
    const equip=await page.evaluate(()=>{
        const s=SceneManager._scene;s.commandEquip();s._slotWindow.select(0);s.onSlotOk();
        const actor=s.actor(),before=actor.equips()[0].id;
        const index=s._itemWindow._data.findIndex(item=>item&&item.id!==before);
        if(index<0)throw Error('No alternative equipment in fixture');
        const expected=s._itemWindow._data[index].id;s._itemWindow.select(index);s.onItemOk();
        return {before,expected,after:actor.equips()[0].id};
    });
    assert.equal(equip.after,equip.expected);assert.notEqual(equip.before,equip.after);evidence.checks.push('Equipment change');
    await scene('Scene_Skill');
    await page.waitForFunction(()=>SceneManager._scene._itemWindow.maxItems()>0);
    await scene('Scene_Status');
    for(const index of [1,2,3,4,0]){
        await page.evaluate(index=>SceneManager._scene._categoryWindow.select(index),index);
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    }
    evidence.checks.push('Skill list and all status categories');
    const beforeShop=await page.evaluate(()=>$gameParty.numItems($dataItems[testItemId]));
    await page.evaluate(()=>{SceneManager.goto(Scene_Shop);SceneManager.prepareNextScene([[0,testItemId,0,0]],false);});
    await ready('Scene_Shop');await capture('Scene_Shop');
    await page.evaluate(()=>{const s=SceneManager._scene;s.commandBuy();s._buyWindow.select(0);s.onBuyOk();s._numberWindow._number=1;s.onNumberOk();});
    assert.equal(await page.evaluate(()=>$gameParty.numItems($dataItems[testItemId])),beforeShop+1);
    evidence.checks.push('Shop purchase');
    await page.evaluate(async()=>{await DataManager.saveGame(19);$gameParty.loseGold(10);await DataManager.loadGame(19);});
    assert.equal(await page.evaluate(()=>$gameParty.numItems($dataItems[testItemId])),beforeShop+1);
    await scene('Scene_Save');evidence.checks.push('Save/load slot 19 in isolated storage');
    await scene('Scene_Map');
    await page.evaluate(()=>{BattleManager.setup(1,true,true);SceneManager.push(Scene_Battle);});
    await ready('Scene_Battle');
    await page.waitForFunction(()=>BattleManager.isInputting());
    await capture('Scene_Battle');
    await page.evaluate(()=>SceneManager._scene.commandOptions());await ready('Scene_Options');
    await capture('BattleOptions');await page.evaluate(()=>SceneManager.pop());await ready('Scene_Battle');
    await page.evaluate(()=>{BattleManager.abort();});
    await ready('Scene_Map');
    evidence.checks.push('Battle input, options round trip and battle exit');
    await scene('Scene_Options');
    assert.deepEqual(runtime.errors,[]);
    evidence.errors=runtime.errors;
    fs.writeFileSync(`${output}/integration-${native?'native':'browser'}.json`,JSON.stringify(evidence,null,2));
    console.log(JSON.stringify(evidence));
}finally{await runtime.close();}
