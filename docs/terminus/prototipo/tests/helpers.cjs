const assert = require("node:assert/strict");
const E = require("../engine.js");
const C = require("../content.js");

function finishScene(
  game,
  { route = "X", outcome = "A", paid = false, variant = 0 } = {},
) {
  let words = 0;
  while (game.state.scene) {
    const s = game.state,
      pg = E.page(s);
    words += pg.body.split(/\s+/).length;
    if (pg.choices.length) {
      let index = Math.min(variant, pg.choices.length - 1);
      if (s.scene.quest === "alliance" && s.scene.page === 0)
        index = route === "X" ? 0 : 1;
      if (C.quests[s.scene.quest].kind === "recruit")
        index = outcome === "A" ? 0 : 1;
      if (paid) {
        const found = pg.choices.findIndex((c) => c.cost && c.affordable);
        if (found >= 0) index = found;
      }
      game.dispatch({ type: "choose", index });
    } else game.dispatch({ type: "advance" });
  }
  return words;
}
function finishBattle(game) {
  let tries = 0;
  while (game.state.battle) {
    if (++tries > 500) throw new Error("Battle did not converge");
    const b = game.state.battle;
    if (b.status === "ready") game.dispatch({ type: "roll" });
    else if (b.status === "won") game.dispatch({ type: "acceptVictory" });
    else {
      game.dispatch({ type: "acceptDefeat" });
      if (game.state.scene) finishScene(game);
      game.dispatch({ type: "rematch" });
    }
  }
}
function play({
  guild = "A",
  route = "X",
  mode = "solo",
  seed = 123456,
  allGuilds = false,
  stopAt = null,
  reverse = false,
  paid = false,
  variant = 0,
  outcome = "A",
} = {}) {
  const game = E.create(seed);
  let words = 0,
    steps = 0;
  while (game.state.stage !== 4) {
    if (++steps > 600) throw new Error("No campaign convergence");
    let s = game.state;
    if (stopAt && stopAt(s)) return { game, words };
    if (s.scene) {
      words += finishScene(game, { route, paid, variant, outcome });
      continue;
    }
    if (s.battle) {
      finishBattle(game);
      continue;
    }
    if (s.rematch !== null) {
      if (game.state.scene) finishScene(game);
      game.dispatch({ type: "rematch" });
      continue;
    }
    let ids = E.available(s),
      id;
    if (mode !== "solo") {
      const side = ids.find((id) => C.quests[id].kind === "side");
      if (side) {
        game.dispatch({ type: "start", id: side });
        continue;
      }
      let acted = false;
      for (let i = 0; i < 5; i++) {
        const status = E.recruitStatus(s, i);
        if (status.canUnlock && s.ludos >= 3) {
          game.dispatch({ type: "unlock", index: i });
          acted = true;
          break;
        }
        if (status.canInvite && (mode === "max" || i % 2 === 0)) {
          game.dispatch({ type: "invite", index: i });
          acted = true;
          break;
        }
        if (status.canPlay) {
          game.dispatch({ type: "start", id: C.pairs[i].id });
          acted = true;
          break;
        }
      }
      if (acted) continue;
    }
    if (s.stage === 1) {
      const introOrder = reverse ? ["C", "B", "A"] : ["A", "B", "C"];
      id = introOrder.map((g) => `g${g}1`).find((id) => ids.includes(id));
      if (!id && ids.includes("champion")) id = "champion";
      if (!id && allGuilds)
        id = ids.find(
          (id) => C.quests[id].kind === "guild" && C.quests[id].step < 5,
        );
      if (!id)
        id = ids.find(
          (id) => C.quests[id].kind === "guild" && C.quests[id].guild === guild,
        );
    } else if (s.stage === 2 && reverse && ids.includes("introY"))
      id = "introY";
    id = id || E.primary(s)[0];
    assert.ok(id, `No primary action at ${JSON.stringify(s)}`);
    game.dispatch({ type: "start", id });
  }
  return { game, words };
}
module.exports = { play, finishScene, finishBattle };
