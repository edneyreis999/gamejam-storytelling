const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const prototype = path.resolve(root, '../prototipo');
const A = require(path.join(prototype, 'art.js'));
const K = require(path.join(prototype, 'catalog.js'));
const portraits = {};
const portrait = A.portrait;
A.portrait = (speaker, expression = 'atento', pose = 'base') => {
  const id = portrait(speaker, expression, pose);
  portraits[JSON.stringify([speaker, expression, pose])] = id;
  return id;
};
K.build();
for (const key of Object.keys(portraits)) {
  const [speaker, , pose] = JSON.parse(key);
  for (const expression of ['neutro', 'feliz', 'triste', 'raiva', 'confuso', ...Object.keys(A.expressions)])
    A.portrait(speaker, expression, pose);
}
const assets = Object.fromEntries(Object.entries(A.assets).map(([id, a]) => [id, {
  id, name: a.name, owner: a.owner, category: a.category, preview: a.preview || null,
}]));
const sourceMap = require(path.join(prototype, 'mapa/manifest.js'));
const map = {
  width: sourceMap.width, height: sourceMap.height, hitGrid: sourceMap.hitGrid,
  background: sourceMap.background, artRoot: sourceMap.artRoot,
  destinations: sourceMap.destinations.map(({id, name, x, y, width, height, fixed, facade, hitRows}) =>
    ({id, name, x, y, width, height, fixed, facade, hitRows})),
};
const records = require(path.join(prototype, 'locales/en-US.js'))
  .filter(r => !/inventário de arte|direção de arte|cenas e variantes|relatório de percurso|V3 apresenta|ferramentas editoriais|prévias com spoilers|(?:busto|objeto|fundo) a produzir|V3 · Explore|Importar partida V3|jogar e consultar o inventário|Economia experimental/i.test(r.pt))
  .map(({id, pt, en, template}) => ({id, pt, en, ...(template ? {template} : {})}));
const script = require(path.join(prototype, 'quest-script.js'));
const outputs = {
  'art.js': `globalThis.TerminusArt = (() => {\nconst assets = ${JSON.stringify(assets)};\nconst portraits = ${JSON.stringify(portraits)};\nreturn {assets, portrait(speaker, expression = 'atento', pose = 'base') {\nconst id = portraits[JSON.stringify([speaker, expression, pose])];\nif (!id) throw new Error('Unknown portrait: ' + speaker + '/' + expression + '/' + pose);\nreturn id;\n}};\n})();\n`,
  'map.js': `globalThis.TERMINUS_MAP = ${JSON.stringify(map)};\n`,
  'locale.js': `globalThis.TerminusLocale = ${JSON.stringify(records)};\n`,
  'script.js': `globalThis.TerminusQuestScript = ${JSON.stringify({records: script.records})};\n`,
};
const check = process.argv.includes('--check');
for (const [name, body] of Object.entries(outputs)) {
  const file = path.join(root, 'runtime', name);
  if (check) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== body)
      throw new Error(`Runtime desatualizado: ${name}. Execute node docs/terminus/jogo/scripts/build-runtime.cjs`);
  } else {
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, body);
  }
}
console.log(`${check ? 'Verified' : 'Generated'} player runtime: ${Object.keys(assets).length} assets, ${records.length} translations.`);
