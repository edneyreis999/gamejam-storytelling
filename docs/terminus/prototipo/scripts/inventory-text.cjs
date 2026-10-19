// Read-only by default; --write records the editorial baseline before revision.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const C = require('../campaign.js');
const K = require('../catalog.js');
const Q = require('../quest-script.js');
const units = new Map();
const groupA = new Set(['intro','E01','champion','E03','E08','retaliation','commitA','commitB','commitC']);
const groupB = new Set(['introX','introY','alliance','X1','X2','Y1','Y2','classify','R1','R2','R3','R4','R5']);
function batch(scene) { return groupA.has(scene) || /^g[ABC]/.test(scene) ? 'a' : groupB.has(scene) ? 'b' : 'c'; }
function add(original, scene, speaker, type, occurrence) {
  if (!original || typeof original !== 'string') return;
  if (!units.has(original)) units.set(original, {
    id: 'text.' + crypto.createHash('sha256').update(original).digest('hex').slice(0,16),
    original, batch: batch(scene), scenes: [], speakers: [], types: [], occurrences: [], sources: [],
  });
  const u = units.get(original);
  for (const [key,value] of [['scenes',scene],['speakers',speaker],['types',type]])
    if (value && !u[key].includes(value)) u[key].push(value);
  if (!u.occurrences.includes(occurrence)) u.occurrences.push(occurrence);
}
for (const v of K.build().variants) {
  const p = v.passage;
  if (p.type !== 'action') add(p.text,v.scene,p.speaker,p.type,p.id);
}
for (const q of Object.values(C.quests)) {
  add(q.title,q.id,'Interface','title',q.id+'.title');
  q.steps.forEach(st=>add(st.title,q.id,'Interface','objective',q.id+'.steps.'+st.id));
  q.pages.forEach((p,i)=>p.choices.forEach((c,j)=>add(c.label,q.id,'Escolha','choice',`${q.id}.p${i+1}.choice${j}.label`)));
}
for (const [i,b] of C.recruitmentDialogue.blocks.entries()) add(b.blocked,'unlock'+i,b.speaker,'dialogue',`recruitmentDialogue.blocks.${i}.blocked`);
for (const [name,c] of Object.entries(C.recruitmentDialogue.candidates)) add(c.blocked,'unlock',name,'dialogue',`recruitmentDialogue.candidates.${name}.blocked`);
for (const record of Q.records) {
  for (const p of [...(record.body||[]),...(record.response||[]),...(record.choice?[{text:record.choice}]:[])]) {
    const u=units.get(p.text);
    if(u) u.sources.push({file:'../storytelling/quests-da-campanha.md',line:record.line});
  }
}
for(const file of ['campaign.js','content.js','supplementary.js']) {
  const text=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  for(const match of text.matchAll(/"(?:[^"\\]|\\.)*"/g)) {
    let value;try {value=JSON.parse(match[0]);}catch {continue;}
    const u=units.get(value);
    if(u) u.sources.push({file,line:text.slice(0,match.index).split('\n').length});
  }
}
const entries=[...units.values()];
if(process.argv.includes('--write')) {
  const out=path.join(__dirname,'../editorial');
  fs.mkdirSync(out,{recursive:true});
  for(const group of ['a','b','c']) {
    const target=path.join(out,`inventory-${group}.json`);
    if(fs.existsSync(target)) throw new Error(`Baseline already exists: ${target}`);
    fs.writeFileSync(target,JSON.stringify(entries.filter(u=>u.batch===group),null,2)+'\n');
  }
}
console.log(JSON.stringify({units:entries.length,batches:Object.fromEntries(['a','b','c'].map(b=>[b,{units:entries.filter(x=>x.batch===b).length,words:entries.filter(x=>x.batch===b).reduce((n,x)=>n+x.original.split(/\s+/).length,0)}]))},null,2));
