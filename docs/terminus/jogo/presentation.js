(function (root) {
  "use strict";

  const spriteSource = "../../../assets/terminus/personagens/ghork.png";
  const entrances = {
    estalagem: [320, 239],
    mercado: [150, 420],
    boticario: [365, 435],
    contratos: [520, 250],
    virmura: [740, 260],
    borun: [585, 445],
    sevrak: [815, 445],
    treino: [565, 603],
    quarta: [950, 252],
    coliseu: [1155, 294],
    oficina: [810, 615],
    cisterna: [1035, 615],
    minas: [1140, 474],
    coreto: [112, 178],
  };
  // Crossroads follow the two paved streets and the southern footpath.
  const roads = {
    u0: [110, 225], u1: [345, 237], u2: [510, 250],
    u3: [720, 250], u4: [850, 246], u5: [1000, 278], u6: [1180, 303],
    m0: [110, 409], m1: [270, 414], m2: [440, 440],
    m3: [510, 430], m4: [770, 441], m5: [940, 460], m6: [1120, 484],
    s0: [450, 580], s1: [535, 610], s2: [765, 630], s3: [920, 643], s4: [1100, 682],
  };
  const nodes = { ...roads, ...entrances };
  const edges = [
    ["u0", "u1"], ["u1", "u2"], ["u2", "u3"], ["u3", "u4"],
    ["u4", "u5"], ["u5", "u6"], ["u1", "m1"], ["u2", "m3"],
    ["u3", "m4"], ["u5", "m5"], ["m0", "m1"], ["m1", "m2"],
    ["m2", "m3"], ["m3", "m4"], ["m4", "m5"], ["m5", "m6"],
    ["m2", "s0"], ["s0", "s1"], ["s1", "s2"], ["s2", "s3"],
    ["s3", "s4"], ["m5", "s3"],
    ["estalagem", "u1"], ["mercado", "m0"], ["boticario", "m2"],
    ["contratos", "u2"], ["virmura", "u3"], ["borun", "m3"],
    ["sevrak", "m4"], ["treino", "s1"], ["quarta", "u5"],
    ["coliseu", "u6"], ["oficina", "s2"], ["cisterna", "s3"],
    ["minas", "m6"], ["coreto", "u0"],
  ];
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const neighbors = Object.fromEntries(Object.keys(nodes).map(id => [id, []]));
  for (const [a, b] of edges) {
    const weight = distance(nodes[a], nodes[b]);
    neighbors[a].push([b, weight]);
    neighbors[b].push([a, weight]);
  }

  function route(from, to) {
    from = from || "virmura";
    if (!entrances[from] || !entrances[to]) throw new RangeError("Unknown map destination.");
    const costs = { [from]: 0 };
    const previous = {};
    const pending = new Set(Object.keys(nodes));
    while (pending.size) {
      const current = [...pending].reduce((best, id) =>
        (costs[id] ?? Infinity) < (costs[best] ?? Infinity) ? id : best);
      if (current === to) break;
      pending.delete(current);
      for (const [next, weight] of neighbors[current]) {
        const cost = costs[current] + weight;
        if (cost < (costs[next] ?? Infinity)) {
          costs[next] = cost;
          previous[next] = current;
        }
      }
    }
    const path = [to];
    while (path[0] !== from) path.unshift(previous[path[0]]);
    return path.map(id => [...nodes[id]]);
  }

  function travel(pawn, from, to, { reduced = false, onStep } = {}) {
    const path = route(from, to);
    const lengths = path.slice(1).map((point, i) => distance(path[i], point));
    const total = lengths.reduce((sum, length) => sum + length, 0);
    const duration = Math.min(2400, Math.max(720, total * 3.2));
    let frame = null;
    let started = null;
    let settled = false;
    let direction = 0;
    let lastStep = -1;
    let resolve;
    const finished = new Promise(done => { resolve = done; });
    function draw(point, column) {
      pawn.style.transform = `translate(${point[0] - 20}px, ${point[1] - 52}px)`;
      pawn.style.backgroundPosition = `${-column * 40}px ${-direction * 55}px`;
    }
    function settle(cancelled) {
      if (settled) return;
      settled = true;
      if (frame !== null) root.cancelAnimationFrame(frame);
      if (!cancelled) draw(path[path.length - 1], 1);
      else pawn.style.backgroundPosition = `-40px ${-direction * 55}px`;
      pawn.classList.remove("is-walking");
      resolve({ cancelled });
    }
    function tick(now) {
      if (settled) return;
      if (started === null) started = now;
      const elapsed = now - started;
      if (elapsed >= duration) { settle(false); return; }
      let remaining = total * elapsed / duration;
      let segment = 0;
      while (segment < lengths.length - 1 && remaining > lengths[segment]) {
        remaining -= lengths[segment++];
      }
      const a = path[segment];
      const b = path[segment + 1];
      const progress = remaining / lengths[segment];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      direction = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : 2) : (dy < 0 ? 3 : 0);
      const step = Math.floor(elapsed / 360);
      const point = [a[0] + dx * progress, a[1] + dy * progress];
      draw(point, [0, 1, 2, 1][step % 4]);
      if (step !== lastStep && step % 2 === 0) {
        lastStep = step;
        if (onStep) onStep(point);
      }
      frame = root.requestAnimationFrame(tick);
    }
    pawn.style.backgroundImage = `url("${spriteSource}")`;
    draw(path[0], 1);
    if (reduced || total === 0) settle(false);
    else {
      pawn.classList.add("is-walking");
      frame = root.requestAnimationFrame(tick);
    }
    return { finished, finish: () => settle(false), cancel: () => settle(true) };
  }

  function battleRoster(state, content) {
    const portrait = (name, pose = "base") => ({ name, expression: "neutro", pose });
    const allies = [portrait("Ghork"), ...state.recruits.filter(r => r.invited).map(r => portrait(r.name))];
    const id = state.battle && state.battle.id;
    let enemies = [];
    if (id === "B4") enemies = [portrait("Assaltante")];
    if (id === "C4") enemies = [portrait("Veterano")];
    if (id === "t0" || id === "t1") {
      const guild = Object.keys(content.guilds).filter(key => key !== state.guild)[Number(id.slice(1))];
      enemies = [{ name: content.guilds[guild].name, collective: true }];
    }
    if (id === "t2") enemies = [portrait(state.xy === "X" ? "Zagra" : "Darvek")];
    if (id === "t3") enemies = (state.opponents || []).map(name => portrait(name));
    if (id === "t4") enemies = [portrait("Torvak")];
    if (id === "t5") enemies = [portrait("Neral", state.flags.transformed ? "transformado" : "base")];
    return { allies, enemies };
  }

  const sounds = {
    selection: [[440, 0, 0.05]],
    confirm: [[392, 0, 0.08], [587, 0.06, 0.12]],
    step: [[130, 0, 0.035]],
    dice: [[220, 0, 0.04], [330, 0.055, 0.04], [440, 0.11, 0.06]],
    win: [[392, 0, 0.12], [494, 0.1, 0.12], [587, 0.2, 0.22]],
    fail: [[294, 0, 0.12], [220, 0.12, 0.2]],
    reward: [[587, 0, 0.08], [784, 0.08, 0.16]],
    portal: [[196, 0, 0.18], [294, 0.08, 0.18], [392, 0.16, 0.25]],
  };

  function createAudio() {
    let context = null;
    let disposed = false;
    const active = new Set();
    function unlock() {
      if (disposed) return Promise.resolve(false);
      const Audio = root.AudioContext || root.webkitAudioContext;
      if (!Audio) return Promise.resolve(false);
      if (!context) {
        try { context = new Audio(); }
        catch { return Promise.resolve(false); }
      }
      if (context.state === "running") return Promise.resolve(true);
      return context.resume().then(() => context.state === "running", () => false);
    }
    function play(kind, volume = 0.4) {
      if (!context || context.state !== "running" || disposed) return;
      const notes = sounds[kind];
      const level = Math.min(1, Math.max(0, volume));
      if (!notes || !level) return;
      const now = context.currentTime;
      for (const [frequency, offset, duration] of notes) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = now + offset;
        oscillator.type = kind === "step" || kind === "dice" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(level * (kind === "step" ? 0.06 : 0.16), start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        active.add(oscillator);
        oscillator.onended = () => {
          active.delete(oscillator);
          oscillator.disconnect();
          gain.disconnect();
        };
        oscillator.start(start);
        oscillator.stop(start + duration + 0.01);
      }
    }
    function mute() {
      for (const oscillator of active) oscillator.stop();
      active.clear();
    }
    function dispose() {
      disposed = true;
      mute();
      if (context && context.state !== "closed") return context.close();
      return Promise.resolve();
    }
    return { unlock, play, mute, dispose };
  }

  for (const point of Object.values(entrances)) Object.freeze(point);
  const api = { spriteSource, entrances: Object.freeze(entrances), route, travel, battleRoster, createAudio };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TerminusPresentation = api;
})(globalThis);
