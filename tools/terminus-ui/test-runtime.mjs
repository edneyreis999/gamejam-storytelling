import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {readPlugins} from './plugin-parameters.mjs';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=path.resolve('rpg-maker/Terminus');

export async function openRuntime({native=false,fixtureName='visumz-runtime',pluginTransform}={}) {
    let server, child, browser;
    let pluginScript;
    if(pluginTransform){const plugins=readPlugins(path.join(root,'js/plugins.js'));pluginTransform(plugins);pluginScript='var $plugins = '+JSON.stringify(plugins)+';';}
    if(native){
        const fixture=path.resolve('.local-tools',fixtureName);
        fs.mkdirSync(fixture,{recursive:true});
        for(const name of ['js','data','img','audio','fonts','icon','effects','css'].filter(name=>name!=='js'||!pluginScript)){
            const target=path.join(root,name),link=path.join(fixture,name);
            if(fs.existsSync(target)&&!fs.existsSync(link))fs.symlinkSync(target,link,'junction');
        }
        if(pluginScript){
            const target=path.join(fixture,'js');
            if(fs.existsSync(target)&&fs.lstatSync(target).isSymbolicLink())throw Error('Use a separate fixture for parameter overrides');
            fs.cpSync(path.join(root,'js'),target,{recursive:true});
            fs.writeFileSync(path.join(target,'plugins.js'),pluginScript);
        }
        fs.copyFileSync(path.join(root,'index.html'),path.join(fixture,'index.html'));
        const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
        pkg.main='index.html?test';pkg.window.show=false;
        fs.writeFileSync(path.join(fixture,'package.json'),JSON.stringify(pkg));
        fs.mkdirSync(path.join(fixture,'save'),{recursive:true});
        fs.copyFileSync(path.join(root,'save/config.rmmzsave'),path.join(fixture,'save/config.rmmzsave'));
        const portServer=createServer();
        await new Promise(r=>portServer.listen(0,'127.0.0.1',r));
        const port=portServer.address().port;await new Promise(r=>portServer.close(r));
        const executable='C:/Program Files (x86)/Steam/steamapps/common/RPG Maker MZ/nwjs-win/nw.exe';
        child=spawn(executable,[`--remote-debugging-port=${port}`,`--user-data-dir=${path.join(fixture,'profile')}`,fixture],{windowsHide:true,stdio:['ignore','ignore','pipe']});
        await new Promise((resolve,reject)=>{
            const timer=setTimeout(()=>reject(Error('NW.js debugging endpoint did not start')),15000);
            child.once('error',e=>{clearTimeout(timer);reject(e);});
            child.stderr.on('data',chunk=>{if(chunk.toString().includes('DevTools listening')){clearTimeout(timer);resolve();}});
        });
        browser=await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
    } else {
        const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.png':'image/png','.ttf':'font/ttf','.woff':'font/woff','.ogg':'audio/ogg','.css':'text/css'};
        server=createServer((req,res)=>{
            const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
            if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
            try{const target=file===root?path.join(root,'index.html'):file;res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(pluginScript&&target===path.join(root,'js/plugins.js')?pluginScript:fs.readFileSync(target));}
            catch(error){if(error.code==='ENOENT')res.writeHead(404).end();else{res.writeHead(500).end();console.error(error);}}
        });
        await new Promise(r=>server.listen(0,'127.0.0.1',r));
        browser=await chromium.launch({channel:'msedge',headless:true});
    }
    const page=native?(browser.contexts()[0].pages()[0]||await browser.contexts()[0].waitForEvent('page')):await browser.newPage({viewport:{width:1280,height:720}});
    page.setDefaultTimeout(15000);
    const errors=[];page.on('pageerror',e=>errors.push(e.stack));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text()+' '+message.location().url);});
    if(!native)await page.goto(`http://127.0.0.1:${server.address().port}/?test`);
    await page.waitForFunction(()=>globalThis.SceneManager?._scene?.constructor.name==='Scene_Title'&&SceneManager._scene.isStarted());
    return {page,errors,close:async()=>{if(native&&!page.isClosed())await page.evaluate(()=>nw.App.quit());await browser.close();if(server)await new Promise(r=>server.close(r));}};
}
