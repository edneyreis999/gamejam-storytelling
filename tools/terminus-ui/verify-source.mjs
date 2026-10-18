import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const sharp=createRequire(import.meta.url)('sharp');
const project='rpg-maker/Terminus';
fs.mkdirSync('.local-tools/options-review',{recursive:true});
function plugins(file){const context={};vm.runInNewContext(fs.readFileSync(file,'utf8'),context);return context.$plugins;}
function decode(value){
    if(typeof value!=='string') return value;
    try {const parsed=JSON.parse(value);if(Array.isArray(parsed))return parsed.map(decode);if(parsed&&typeof parsed==='object')return Object.fromEntries(Object.entries(parsed).map(([key,value])=>[key.split(':')[0],decode(value)]));return parsed;}
    catch {return value;}
}
const current=plugins(project+'/js/plugins.js');
const options=current.find(p=>p.name==='Coreto_1_OptionsCore');
const categories=decode(options.parameters['Categories:arraystruct']);
const rows=categories.flatMap(c=>c.List).filter(r=>r.Symbol);
const manifest=JSON.parse(fs.readFileSync('tools/terminus-ui/manifest.json'));
assert.equal(rows.length,77);
assert.equal(new Set(rows.map(r=>r.Symbol)).size,77);
for(const row of rows){
    assert(!row.Symbol.startsWith('---'));
    assert.notEqual(row.Icon,320,row.Symbol+' has a generic Settings icon');
    const spec=manifest.options.find(o=>o.symbol===row.Symbol);
    assert(spec,row.Symbol);
    assert(fs.existsSync(project+'/img/system/'+spec.asset+'.png'));
    new Function(row.DrawJS);
}
const backup='.local-tools/options-before';
const comparedWithBackup=fs.existsSync(backup+'/plugins.js');
if(comparedWithBackup){
    const previous=plugins(backup+'/plugins.js');
    const old=decode(previous.find(p=>p.name==='Coreto_1_OptionsCore').parameters['Categories:arraystruct']);
    const oldRows=old.flatMap(c=>c.List).filter(r=>r.Symbol&&!r.Symbol.startsWith('---'));
    const behavior=row=>Object.fromEntries(Object.entries(row).filter(([key])=>!['DrawJS','TextStr','Icon'].includes(key)));
    assert.deepEqual(rows.map(behavior),oldRows.map(behavior),'Option behavior changed');
    assert.deepEqual(categories.map(c=>c.ShowJS),old.map(c=>c.ShowJS),'Category visibility changed');
    const core=p=>p.find(p=>p.name==='Coreto_0_CoreEngine').parameters;
    assert.equal(core(current)['MenuLayout:struct'],core(previous)['MenuLayout:struct'],'Title changed');
    const atlas=file=>sharp(file).extract({left:0,top:0,width:512,height:640}).raw().toBuffer();
    assert((await atlas(project+'/img/system/IconSet.png')).equals(await atlas(backup+'/IconSet.png')),'Original atlas changed');
}
const newNames=Object.entries(manifest.icons).filter(([,index])=>index>=336).map(([name])=>name);
const hashes=await Promise.all(newNames.map(async name=>createHash('sha256').update(await sharp(project+'/img/system/TerminusUI_'+name+'.png').raw().toBuffer()).digest('hex')));
assert.equal(new Set(hashes).size,newNames.length);
for(const index of Object.values(manifest.icons)){
    const {data,info}=await sharp(project+'/img/system/IconSet.png').extract({left:(index%16)*32,top:Math.floor(index/16)*32,width:32,height:32}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    assert.equal(data[3],0,'Opaque icon cell '+index);
    assert(data.some((value,i)=>i%info.channels===3&&value>0),'Empty icon '+index);
}
const previews=await Promise.all(newNames.map(async(name,i)=>({input:await sharp(project+'/img/system/TerminusUI_'+name+'.png').resize(48,48).png().toBuffer(),left:24+(i%10)*100,top:20+Math.floor(i/10)*100})));
const height=Math.ceil(newNames.length/10)*100;
const labels=Buffer.from(`<svg width="1000" height="${height}">${newNames.map((name,i)=>`<text x="${48+(i%10)*100}" y="${88+Math.floor(i/10)*100}" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#360a0b">${name}</text>`).join('')}</svg>`);
await sharp({create:{width:1000,height,channels:4,background:'#f9eacf'}}).composite([...previews,{input:labels,left:0,top:0}]).png().toFile('.local-tools/options-review/icons.png');
console.log(JSON.stringify({options:77,distinctNewIcons:newNames.length,comparedWithBackup}));
