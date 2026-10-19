const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const E = require('../engine');
const C = require('../campaign');
const A = require('../art');
const K = require('../catalog');
const map = require('../mapa/manifest');
const {play, finishQuest, finishScene, start} = require('./helpers.cjs');
function opened() {
  const g = E.create(123456);
  finishQuest(g, 'intro');
  finishQuest(g, 'gA1');
  g.dispatch({type:'map'});
  return g;
}
const actionable = (s, location) => E.locationActivities(s, location).filter(a => a.available);

test('Mapa usa os 13 IDs da campanha e um portal; todas as artes selecionadas têm arquivo e uso', () => {
  assert.deepEqual(map.destinations.filter(p => !p.fixed).map(p => p.id).sort(), Object.keys(C.places).sort());
  assert.deepEqual(map.destinations.filter(p => p.fixed).map(p => p.id), ['coreto']);
  const records = K.build().records.filter(a => a.variant === 'Mapa da cidade');
  assert.equal(records.length, 15);
  for (const record of records) {
    assert.ok(fs.existsSync(path.resolve(__dirname, '..', record.preview)), record.id);
    assert.equal(record.uses[0].scene, 'city-map');
  }
  assert.equal(A.assets['map-terrain'].preview, map.artRoot + map.background);
});

test('Consulta de atividades é pura; mapa acompanha a próxima etapa e a conclusão da entrega', () => {
  const g = opened();
  const before = g.save();
  const state = g.state;
  const frozen = structuredClone(state);
  const all = Object.keys(C.places).flatMap(place => actionable(state, place));
  assert.ok(all.length > 1);
  assert.ok(Object.keys(C.places).some(place => actionable(state, place).length > 1));
  assert.deepEqual(state, frozen);
  assert.deepEqual(g.save(), before);
  assert.ok(actionable(g.state, 'virmura').some(a => a.id === 'gB1'));
  start(g, 'gB1'); finishScene(g);
  const destination = E.destination(g.state, 'gB1');
  assert.equal(destination, 'mercado');
  assert.ok(!actionable(g.state, 'virmura').some(a => a.id === 'gB1'));
  assert.ok(actionable(g.state, destination).some(a => a.id === 'gB1'));
  finishQuest(g, 'gB1');
  assert.ok(!Object.keys(C.places).flatMap(place => actionable(g.state, place)).some(a => a.id === 'gB1'));
});

test('Conflito resolvido espera convite; intervenção exige saldo e se converte em convite', () => {
  const first = opened();
  finishQuest(first, 'R1');
  const pending = E.locationActivities(first.state, C.recruitPlaces[0]).find(a => a.id === 'invite0');
  assert.equal(pending.available, false);
  assert.match(pending.reason, /guilda/);
  const g = play({mode:'max', stopAt:s => s.stage === 2 && !s.scene}).game;
  const location = C.recruitPlaces[1];
  const paid = actionable(g.state, location).find(a => a.id === 'unlock1');
  assert.ok(paid);
  g.dispatch({type:'visit',location});
  g.dispatch(paid.action); finishScene(g);
  const invite = actionable(g.state, location).find(a => a.id === 'invite1');
  assert.ok(invite);
  const balance = g.state.ludos;
  g.dispatch(invite.action); finishScene(g);
  assert.equal(g.state.ludos,balance);
  assert.ok(!E.locationActivities(g.state,location).some(a => ['unlock1','invite1'].includes(a.id)));
});

test('Sem Ludos não há marcador de intervenção; secundária libera a ação sem alterar a regra', () => {
  const g = play({stopAt:s => s.routeProgress === 2 && !s.scene}).game;
  const location = C.recruitPlaces[2];
  const before = E.locationActivities(g.state,location).find(a => a.id === 'unlock2');
  assert.equal(before.available,false);
  assert.match(before.reason,/insuficientes/);
  assert.ok(!actionable(g.state,location).some(a => a.id === 'unlock2'));
  finishQuest(g,'side2');
  assert.ok(actionable(g.state,location).some(a => a.id === 'unlock2'));
});

test('Mapa não antecipa R3/R4/R5 e remove recrutamentos ao passar o ponto de não retorno', () => {
  const g = opened();
  const early = Object.keys(C.places).flatMap(place => E.locationActivities(g.state,place));
  assert.ok(!early.some(a => ['R3','R4','R5','invite2','invite3','invite4','unlock2','unlock3','unlock4'].includes(a.id)));
  const late = play({stopAt:s => s.stage === 3 && !s.scene}).game;
  assert.ok(actionable(late.state,E.destination(late.state,'R5')).some(a => a.id === 'R5'));
  finishQuest(late,'gate');
  const closed = Object.keys(C.places).flatMap(place => actionable(late.state,place));
  assert.ok(!closed.some(a => a.category !== 'mission' || /^R[1-5]$/.test(a.id)));
});

test('Cenas e batalhas não oferecem navegação; revanche final sinaliza apenas o coliseu', () => {
  assert.match(E.explorationBlock(E.create(1).state),/Virmura/);
  const g = play({seed:1,stopAt:s => s.battle?.id === 't5'}).game;
  assert.deepEqual(E.locationActivities(g.state,'coliseu'),[]);
  g.dispatch({type:'roll'});
  assert.equal(g.state.battle.status,'failed');
  g.dispatch({type:'acceptDefeat'}); finishScene(g);
  assert.equal(g.state.rematch,'t5');
  assert.ok(actionable(g.state,'coliseu').some(a => a.id === 'rematch'));
  for (const place of Object.keys(C.places).filter(p => p !== 'coliseu'))
    assert.deepEqual(E.locationActivities(g.state,place),[]);
});

test('Saves V3 com deslocamento antigo mantêm foco, entregas, saldo e replay', () => {
  const g = opened();
  g.dispatch({type:'mapPosition',scroll:1840,focus:'quarta'});
  g.dispatch({type:'visit',location:'quarta',scroll:1840});
  g.dispatch({type:'map'});
  const restored = E.restore(JSON.parse(JSON.stringify(g.save())));
  assert.equal(restored.save().version,3);
  assert.deepEqual(restored.state,g.state);
  assert.deepEqual(restored.state.map,{scroll:1840,focus:'quarta'});
  restored.dispatch({type:'mapPosition',scroll:0,focus:'mercado'});
  assert.deepEqual(restored.state.deliveries,g.state.deliveries);
  assert.equal(restored.state.ludos,g.state.ludos);
});
