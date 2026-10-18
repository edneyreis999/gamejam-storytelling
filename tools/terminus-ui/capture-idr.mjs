import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {openRuntime} from './test-runtime.mjs';
import {readPlugins} from './plugin-parameters.mjs';

const output=path.resolve('docs/terminus/idr/assets/IDR-001');
fs.mkdirSync(output,{recursive:true});
assert(!fs.existsSync(path.join(output,'manifest.json')),'IDR-001 already captured; use a new record for a later revision.');
const project=path.resolve('rpg-maker/Terminus');
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const saves=Object.fromEntries(fs.readdirSync(project+'/save').map(name=>[name,hash(project+'/save/'+name)]));
const parametersHash=hash(project+'/js/plugins.js');
const runtime=await openRuntime({native:true,fixtureName:'idr-001-native'});
const {page}=runtime;
const captures=[];
async function ready(name){
    await page.waitForFunction(name=>SceneManager._scene?.constructor.name===name&&SceneManager._scene.isStarted()&&!SceneManager._scene.isBusy()&&ImageManager.isReady()&&!SceneManager._scene._optionsWindow?._scrollDuration,name);
}
async function scene(name){await page.evaluate(name=>SceneManager.goto(window[name]),name);await ready(name);}
async function capture(file,description){
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.waitForFunction(()=>ImageManager.isReady());
    const result=await page.evaluate(()=>{const b=Bitmap.snap(SceneManager._scene);const result={data:b.canvas.toDataURL(),width:b.width,height:b.height,scene:SceneManager._scene.constructor.name};b.destroy();return result;});
    fs.writeFileSync(path.join(output,file+'.png'),Buffer.from(result.data.split(',')[1],'base64'));
    captures.push({file:file+'.png',description,scene:result.scene,width:result.width,height:result.height,sha256:hash(path.join(output,file+'.png'))});
    console.log('Captured '+file);
}
async function category(index){
    await page.evaluate(index=>{const s=SceneManager._scene;s._categoryWindow.select(index);s._optionsWindow.setCategory(s._categoryWindow.currentData());s._optionsWindow.activate();s._optionsWindow.smoothScrollTo(0,0);},index);
    await ready('Scene_Options');
}
try{
    await ready('Scene_Title');
    await page.waitForFunction(()=>SceneManager._scene._commandWindow.isOpen());
    await capture('01-titulo','Título com arte de entrada e lettering desenhado pelo CoreEngine.');
    await scene('Scene_Options');
    await page.mouse.move(5,5);
    await capture('02-opcoes-geral','Geral: seleção clara e valor ativo com confirmação.');
    await page.evaluate(()=>{ConfigManager.uiHoverSelect=false;SceneManager._scene._optionsWindow.select(1);});
    const point=await page.evaluate(()=>{const w=SceneManager._scene._optionsWindow,r=w.itemRect(2),p=w.worldTransform.apply(new Point(r.x+300+w.padding-w.origin.x,r.y+r.height/2+w.padding-w.origin.y));return {x:p.x,y:p.y};});
    await page.mouse.move(point.x,point.y);
    await page.waitForFunction(()=>SceneManager._scene._optionsWindow._coretoHoverIndex===2);
    await capture('03-opcoes-hover','Seleção em Sempre correr e hover separado em Salvamento automático; preferência alterada apenas em memória para demonstrar os estados.');
    await page.mouse.move(5,5);
    for(const [index,file,description] of [[1,'04-opcoes-audio','Áudio: barras e valores numéricos.'],[2,'05-opcoes-interface','Interface: controles de janela e texto.'],[3,'07-opcoes-teste','Teste: ferramentas auxiliares na configuração atual.']]){
        await category(index);await capture(file,description);
        if(index===2){
            await page.evaluate(()=>{const w=SceneManager._scene._optionsWindow;w.select(w.findSymbol('uiInputPosition'));w.ensureCursorVisible(false);});
            await ready('Scene_Options');await capture('06-opcoes-indisponivel','Organização e dependências dos controles; disponibilidade segue a preferência atual.');
        }
    }
    await scene('Scene_RebindKeyboard');await capture('08-remapeamento-teclado','Remapeamento de teclado.');
    await scene('Scene_RebindGamepad');await capture('09-remapeamento-controle','Remapeamento de controle, sem dispositivo de demonstração conectado.');
    await page.evaluate(()=>{
        DataManager.setupNewGame();$gameParty.gainGold(500);
        for(const db of [$dataItems,$dataWeapons,$dataArmors])for(const item of db.filter(item=>item&&item.name&&!item.name.startsWith('-')).slice(0,4))$gameParty.gainItem(item,3);
        const actor=$gameParty.leader();actor.learnSkill(actor.currentClass().learnings[0].skillId);
    });
    await scene('Scene_Map');
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.evaluate(()=>SceneManager.snapForBackground());
    for(const [name,file,description] of [
        ['Scene_Menu','10-menu-interno','Menu principal com grupo e recursos de demonstração.'],
        ['Scene_Item','11-itens','Inventário com itens de demonstração.'],
        ['Scene_Equip','12-equipamento','Equipamentos e atributos.'],
        ['Scene_Skill','13-habilidades','Habilidades da classe de demonstração.'],
        ['Scene_Status','14-status','Status do personagem de demonstração.']
    ]){await scene(name);await capture(file,description);}
    await page.evaluate(()=>{const item=$dataItems.find(item=>item&&item.name&&!item.name.startsWith('-'));SceneManager.goto(Scene_Shop);SceneManager.prepareNextScene([[0,item.id,0,0]],false);});
    await ready('Scene_Shop');await page.evaluate(()=>SceneManager._scene.commandBuy());await capture('15-loja','Compra com um item de demonstração; nenhuma transação realizada.');
    await page.evaluate(async()=>{await DataManager.saveGame(1);});
    await scene('Scene_Save');await capture('16-salvamento','Slot criado exclusivamente na sessão isolada.');
    await scene('Scene_Map');
    await page.evaluate(()=>{$gameMessage.setSpeakerName('Prévia de interface');$gameMessage.add('Registro visual da interface de Terminus.\nTexto de demonstração para conferir leitura e espaçamento.');});
    await page.waitForFunction(()=>{const w=SceneManager._scene._messageWindow;return w?.isOpen()&&!w._textState&&w.pause;});
    await capture('17-dialogo','Mensagem de demonstração; não constitui texto narrativo do jogo.');
    await page.evaluate(()=>{$gameMessage.clear();ConfigManager.autoBattleAtStart=false;BattleManager.setup(1,true,true);SceneManager.goto(Scene_Battle);});
    await ready('Scene_Battle');
    await page.waitForFunction(()=>{const s=SceneManager._scene;return BattleManager.isInputting()&&!s.isBusy()&&[s._partyCommandWindow,s._actorCommandWindow].some(w=>w.active&&w.isOpen());});
    await capture('18-batalha','Interface da batalha de demonstração usando a primeira tropa do banco atual.');
    assert.deepEqual(runtime.errors,[]);
    assert.equal(hash(project+'/js/plugins.js'),parametersHash);
    for(const [name,digest] of Object.entries(saves))assert.equal(hash(project+'/save/'+name),digest,name);
    const plugins=readPlugins(project+'/js/plugins.js').map(p=>({name:p.name,status:p.status,sha256:hash(project+'/js/plugins/'+p.name+'.js')}));
    const manifest={record:'IDR-001',date:'2026-10-18',capturedAt:new Date().toISOString(),status:'em desenvolvimento',runtime:await page.evaluate(()=>process.versions),parametersHash,plugins,captures,errors:runtime.errors,userSavesPreserved:true,parametersPreserved:true};
    fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
}finally{await runtime.close();}
