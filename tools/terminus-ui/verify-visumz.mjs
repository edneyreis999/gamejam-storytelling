import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readPlugins,pluginDefaults,decode,leaves,setParameter} from './plugin-parameters.mjs';
const root='rpg-maker/Terminus',manifest=JSON.parse(fs.readFileSync('tools/terminus-ui/visumz-manifest.json'));
const plugins=readPlugins(root+'/js/plugins.js');
const expected=['Coreto_0_CoreEngine',...manifest.plugins.map(p=>p.name),'Coreto_1_MessageCore','Coreto_1_OptionsCore','Coreto_1_SaveCore','Coreto_2_ExtMessageFunc','Coreto_5_DesignSystem'];
assert.deepEqual(plugins.map(p=>p.name),expected);assert(plugins.every(p=>p.status));
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for(const entry of manifest.plugins){
    const source=manifest.source+'/'+entry.name+'.js',target=root+'/js/plugins/'+entry.name+'.js';
    assert.equal(hash(source),entry.sha256);assert.equal(hash(target),entry.sha256);
    const defaults=pluginDefaults(source,{expandStructs:manifest.expandStructs}).parameters;
    for(const change of entry.changes)setParameter(defaults,change.path.split('/'),change.value);
    assert.deepEqual(plugins.find(p=>p.name===entry.name).parameters,defaults,entry.name+' contains an undocumented override');
    for(const leaf of leaves(decode(defaults)))if(leaf.path.at(-1).endsWith(':func'))new Function(leaf.value);
}
const recovery='.local-tools/visumz-before';
const saveBaseline=process.argv.includes('--save-baseline')?process.argv[process.argv.indexOf('--save-baseline')+1]:recovery+'/save';
const saves=fs.readdirSync(root+'/save').filter(file=>file.endsWith('.rmmzsave'));
for(const file of saves)assert.equal(hash(root+'/save/'+file),hash(saveBaseline+'/'+file),'User save changed: '+file);
const previous=readPlugins(recovery+'/js/plugins.js');
assert.equal(plugins[0].parameters['MenuLayout:struct'],previous[0].parameters['MenuLayout:struct'],'Title configuration changed');
for(const name of ['Coreto_0_CoreEngine','Coreto_1_MessageCore','Coreto_1_SaveCore','Coreto_2_ExtMessageFunc'])assert.equal(hash(root+'/js/plugins/'+name+'.js'),hash(recovery+'/js/plugins/'+name+'.js'));
const result={plugins:manifest.plugins.map(({name,version,sha256})=>({name,version,sha256})),order:expected,declaredParameterDefaults:true,expandedStructs:manifest.expandStructs,documentedOverridesOnly:true,originalSources:true,userSavesPreserved:saves,titlePreserved:true};
fs.mkdirSync('.local-tools/visumz-review',{recursive:true});fs.writeFileSync('.local-tools/visumz-review/source.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
