(function (root) {
  'use strict';
  // Originals: rpg-maker/Terminus/audio/. Paths are relative to the player HTML.
  const catalog = {
    title: ['bgm/Theme1', 1], city: ['bgm/Town1', 1], coreto: ['bgm/Town6', 1],
    tension: ['bgm/Dungeon1', 1], battle: ['bgm/Battle1', 1], final: ['bgm/Battle5', 1], ending: ['bgm/Theme2', 1],
    selection: ['se/Cursor1', 0.5], confirm: ['se/Decision1', 0.65], cancel: ['se/Cancel1', 0.5],
    step: ['se/Move1', 0.18], dice: ['se/Switch1', 0.6], reward: ['se/Item1', 0.7],
    portal: ['se/Teleport', 0.65], win: ['me/Victory1', 0.8], fail: ['me/Defeat1', 0.7],
  };

  function track(view, state, passage) {
    if (view === 'title' || !state) return 'title';
    if (state.stage === 4 || state.scene?.quest === 'ending') return 'ending';
    if (state.scene) {
      if (passage?.background === 'bg-coreto') return 'coreto';
      if (['invasion', 'fight5', 'setback-t5', 'after5'].includes(state.scene.quest)) return 'tension';
      return 'city';
    }
    if (state.battle) return state.battle.id === 't5' ? 'final' : 'battle';
    if (state.location === 'coreto') return 'coreto';
    if (state.rematch === 't5' || (state.completed.includes('invasion') && !state.completed.includes('after5'))) return 'tension';
    return 'city';
  }

  function createAudio() {
    let unlocked = false, disposed = false, hidden = false;
    let enabled = true, musicVolume = 0.25, effectsVolume = 0.35;
    let desired = null, current = null, fadeTimer = null;
    const music = new Set(), effects = new Set();
    const allowed = () => unlocked && enabled && !hidden && !disposed;
    const duck = () => [...effects].some(entry => entry.sting) ? 0.25 : 1;
    function levels() {
      for (const entry of music) entry.media.volume = musicVolume * entry.level * duck();
      for (const entry of effects) entry.media.volume = effectsVolume * entry.level;
    }
    function release(entry, collection) {
      collection.delete(entry);
      entry.media.pause();
      entry.media.removeAttribute('src');
      entry.media.load();
    }
    function stopEffects() {
      for (const entry of effects) release(entry, effects);
      levels();
    }
    function start(entry, collection) {
      entry.media.play().catch(() => {
        if (collection.has(entry)) release(entry, collection);
        if (current === entry) current = null;
        levels();
      });
    }
    function make(kind, loop) {
      const [file, level] = catalog[kind];
      const media = new root.Audio(`audio/${file}.ogg`);
      media.loop = loop;
      media.preload = 'auto';
      return { media, kind, level, sting: kind === 'win' || kind === 'fail' };
    }
    function sync() {
      if (!allowed() || !musicVolume || !desired) {
        clearInterval(fadeTimer); fadeTimer = null;
        for (const entry of music) entry.media.pause();
        return;
      }
      if (current?.kind === desired) {
        for (const entry of music) if (entry !== current) release(entry, music);
        clearInterval(fadeTimer); fadeTimer = null;
        current.level = 1; levels();
        if (current.media.paused) start(current, music);
        return;
      }
      clearInterval(fadeTimer);
      for (const entry of music) if (entry !== current) release(entry, music);
      const outgoing = current;
      const outgoingLevel = outgoing?.level || 0;
      current = make(desired, true);
      const incoming = current;
      incoming.level = 0; music.add(incoming); levels(); start(incoming, music);
      const began = Date.now();
      fadeTimer = setInterval(() => {
        const progress = Math.min(1, (Date.now() - began) / 1000);
        incoming.level = progress;
        if (outgoing) outgoing.level = outgoingLevel * (1 - progress);
        levels();
        if (progress === 1) {
          clearInterval(fadeTimer); fadeTimer = null;
          if (outgoing) release(outgoing, music);
        }
      }, 40);
    }
    function configure(settings) {
      enabled = settings.sound; musicVolume = settings.musicVolume; effectsVolume = settings.volume;
      if (!enabled || !effectsVolume) stopEffects();
      levels(); sync();
    }
    function unlock() { if (!disposed && (!unlocked || !current)) { unlocked = true; sync(); } }
    function setTrack(kind) { if (kind !== desired) { desired = kind; sync(); } }
    function play(kind) {
      if (!allowed() || !effectsVolume || !catalog[kind]) return;
      // Repeated steps or clicks replace their own tail instead of piling up.
      for (const entry of effects) if (entry.kind === kind || (entry.sting && ['win', 'fail'].includes(kind))) release(entry, effects);
      const entry = make(kind, false);
      effects.add(entry);
      const finish = () => { if (effects.has(entry)) release(entry, effects); levels(); };
      entry.media.onended = finish; entry.media.onerror = finish;
      levels(); start(entry, effects);
    }
    function visibility(value) { hidden = value; if (hidden) stopEffects(); sync(); }
    function dispose() {
      disposed = true; clearInterval(fadeTimer); stopEffects();
      for (const entry of music) release(entry, music);
      current = null;
    }
    return { unlock, configure, setTrack, play, visibility, dispose };
  }
  const api = { catalog, track, createAudio };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TerminusAudio = api;
})(globalThis);
