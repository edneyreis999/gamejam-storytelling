const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const P = require('../presentation.js');
const C = require('../../prototipo/campaign.js');
const map = require('../../prototipo/mapa/manifest.js');
const { play } = require('../../prototipo/tests/helpers.cjs');

test('All map destinations have connected routes contained in the map', () => {
  for (const from of map.destinations) for (const to of map.destinations) {
    const route = P.route(from.id, to.id);
    assert.deepEqual(route[0], P.entrances[from.id]);
    assert.deepEqual(route.at(-1), P.entrances[to.id]);
    assert.ok(route.length <= 40, `${from.id} → ${to.id}`);
    for (const [x, y] of route) assert.ok(x >= 0 && x <= map.width && y >= 0 && y <= map.height);
  }
  assert.throws(() => P.route('unknown', 'minas'), RangeError);
});

function animationFixture() {
  const frames = new Map();
  let next = 0;
  const context = vm.createContext({
    requestAnimationFrame(callback) { frames.set(++next, callback); return next; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../presentation.js'), 'utf8'), context);
  const classes = new Set();
  const pawn = { style: {}, classList: { add: name => classes.add(name), remove: name => classes.delete(name) } };
  return {
    api: context.TerminusPresentation, pawn, frames, classes,
    tick(time) { const pending = [...frames.values()]; frames.clear(); for (const callback of pending) callback(time); },
  };
}

test('Walking settles within 2.4 seconds and skipping/cancelling settle once', async () => {
  for (const mode of ['natural', 'skip', 'cancel', 'reduced', 'stationary']) {
    const { api, pawn, frames, classes, tick } = animationFixture();
    const movement = api.travel(pawn, 'mercado', mode === 'stationary' ? 'mercado' : 'coliseu', { reduced: mode === 'reduced' });
    let settled = 0;
    movement.finished.then(() => settled++);
    if (mode === 'skip') { movement.finish(); movement.finish(); }
    if (mode === 'cancel') { movement.cancel(); movement.cancel(); }
    tick(0);
    tick(600);
    tick(1200);
    tick(2400);
    const result = await movement.finished;
    assert.equal(result.cancelled, mode === 'cancel');
    assert.equal(settled, 1);
    assert.equal(frames.size, 0);
    assert.equal(classes.has('is-walking'), false);
    assert.doesNotMatch(pawn.style.transform, /NaN|Infinity/);
    if (mode !== 'cancel') {
      const [x, y] = P.entrances[mode === 'stationary' ? 'mercado' : 'coliseu'];
      assert.equal(pawn.style.transform, `translate(${x - 20}px, ${y - 52}px)`);
    }
  }
});

test('Every non-stationary route takes twice its original duration', async () => {
  for (const from of map.destinations) for (const to of map.destinations) {
    if (from.id === to.id) continue;
    const path = P.route(from.id, to.id);
    const distance = path.slice(1).reduce((sum, point, index) => sum + Math.hypot(point[0] - path[index][0], point[1] - path[index][1]), 0);
    const previousDuration = Math.min(1200, Math.max(360, distance * 1.6));
    const { api, pawn, frames, classes, tick } = animationFixture();
    const movement = api.travel(pawn, from.id, to.id);
    tick(0);
    tick(previousDuration);
    assert.ok(classes.has('is-walking'), `${from.id} → ${to.id} must still be walking at original duration`);
    tick(previousDuration * 2 - 1);
    assert.ok(classes.has('is-walking'));
    tick(previousDuration * 2);
    assert.equal((await movement.finished).cancelled, false);
    assert.equal(frames.size, 0);
  }
});

test('Walking frames and footfalls run at half the original cadence', async () => {
  const { api, pawn, tick } = animationFixture();
  let footsteps = 0;
  const movement = api.travel(pawn, 'mercado', 'coliseu', { onStep: () => footsteps++ });
  tick(0);
  assert.equal(footsteps, 1);
  assert.ok(pawn.style.backgroundPosition.startsWith('0px'));
  tick(359);
  assert.ok(pawn.style.backgroundPosition.startsWith('0px'));
  tick(360);
  assert.ok(pawn.style.backgroundPosition.startsWith('-40px'));
  tick(719);
  assert.equal(footsteps, 1);
  tick(720);
  assert.ok(pawn.style.backgroundPosition.startsWith('-80px'));
  assert.equal(footsteps, 2);
  movement.finish();
  await movement.finished;
});

test('Combat roster reveals only recruited allies and already selected opponents', () => {
  const game = play({ mode: 'max', stopAt: state => state.battle?.id === 't3' }).game;
  const state = game.state;
  const before = structuredClone(state);
  const roster = P.battleRoster(state, C);
  assert.deepEqual(roster.enemies.map(enemy => enemy.name), state.opponents);
  assert.deepEqual(roster.allies.map(ally => ally.name), ['Ghork', ...state.recruits.filter(recruit => recruit.invited).map(recruit => recruit.name)]);
  assert.deepEqual(state, before);
  const solo = play({ mode: 'solo', stopAt: current => Boolean(current.battle) }).game.state;
  assert.deepEqual(P.battleRoster(solo, C).allies.map(ally => ally.name), ['Ghork']);
  assert.equal(P.battleRoster(solo, C).enemies[0].collective, true);
  for (const transformed of [false, true]) {
    const final = { ...state, battle: { id: 't5' }, flags: { ...state.flags, transformed } };
    assert.equal(P.battleRoster(final, C).enemies[0].pose, transformed ? 'transformado' : 'base');
  }
});
