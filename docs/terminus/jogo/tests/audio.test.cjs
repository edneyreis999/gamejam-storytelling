const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const A = require('../audio.js');
const { play } = require('../../prototipo/tests/helpers.cjs');
const E = require('../../prototipo/engine.js');

test('Every audio cue uses an unchanged recording from the RPG Maker project', () => {
  for (const [file, volume] of Object.values(A.catalog)) {
    assert.ok(volume > 0 && volume <= 1);
    const local = fs.readFileSync(path.join(__dirname, '../audio', file + '.ogg'));
    const original = fs.readFileSync(path.join(__dirname, '../../../../rpg-maker/Terminus/audio', file + '.ogg'));
    assert.deepEqual(local, original);
    assert.equal(local.subarray(0, 4).toString(), 'OggS');
  }
});

test('Music follows restored campaign contexts without mutating the save', () => {
  assert.equal(A.track('title', null), 'title');
  for (const [quest, expected] of [['intro', 'coreto'], ['invasion', 'tension'], ['ending', 'ending']]) {
    const game = play({ mode: 'max', stopAt: s => s.scene?.quest === quest }).game;
    const before = JSON.stringify(game.save());
    assert.equal(A.track('play', game.state, E.page(game.state).passage), expected);
    assert.equal(JSON.stringify(game.save()), before);
  }
  for (const [id, expected] of [['t0', 'battle'], ['t5', 'final']]) {
    const game = play({ mode: 'max', stopAt: s => s.battle?.id === id }).game;
    assert.equal(A.track('play', game.state), expected);
  }
  const state = { stage: 1, location: null, completed: [] };
  assert.equal(A.track('play', state), 'city');
  assert.equal(A.track('play', { ...state, location: 'coreto' }), 'coreto');
  assert.equal(A.track('play', { ...state, rematch: 't5' }), 'tension');
});

test('Audio lifecycle fades, ducks, pauses, resumes and tolerates failed playback', async () => {
  const elements = [], timers = new Map();
  let time = 0, timerId = 0;
  class Audio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; elements.push(this); }
    play() { this.paused = false; return this.reject ? Promise.reject(new Error('Unavailable')) : Promise.resolve(); }
    pause() { this.paused = true; }
    removeAttribute() { this.src = ''; }
    load() {}
  }
  const context = vm.createContext({ Audio, Date: { now: () => time }, setInterval: fn => { timers.set(++timerId, fn); return timerId; }, clearInterval: id => timers.delete(id) });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../audio.js'), 'utf8'), context);
  const audio = context.TerminusAudio.createAudio();
  const tick = () => { time += 1000; for (const fn of timers.values()) fn(); };
  audio.setTrack('title'); assert.equal(elements.length, 0);
  audio.unlock(); tick();
  const title = elements[0]; assert.equal(title.volume, 0.25);
  audio.setTrack('title'); audio.unlock(); assert.equal(elements.length, 1);
  audio.play('win'); assert.equal(title.volume, 0.0625);
  elements.at(-1).onended(); assert.equal(title.volume, 0.25);
  audio.setTrack('city'); tick(); assert.equal(title.paused, true);
  const city = elements.at(-1);
  audio.visibility(true); assert.equal(city.paused, true);
  audio.visibility(false); assert.equal(city.paused, false);
  audio.configure({ sound: false, musicVolume: 0.25, volume: 0.35 });
  assert.ok(elements.every(a => a.paused));
  audio.configure({ sound: true, musicVolume: 0.25, volume: 0.35 });
  assert.equal(city.paused, false);
  audio.visibility(true); city.reject = true; audio.visibility(false);
  await Promise.resolve(); assert.equal(city.paused, true);
  audio.dispose(); assert.equal(timers.size, 0);
  audio.unlock(); audio.play('confirm'); assert.ok(elements.every(a => a.paused));
});
