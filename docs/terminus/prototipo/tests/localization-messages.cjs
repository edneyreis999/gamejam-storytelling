// node --test docs/terminus/prototipo/tests/localization-messages.cjs
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const E = require("../engine.js");
const C = require("../campaign.js");
const records = require("../locales/en-US.js");
const { play } = require("./helpers.cjs");

const properNames = new Set([
  "Ghork", "Rheed", "Nyra", "Durn", "Jorvi", "Seldan", "Virmura", "Lala",
  "Meruna", "Borun", "Sevrak", "Torvak", "Savel", "Guedra", "Elune", "Pirka",
  "Rask", "Darvek", "Zagra", "Dorga", "Brakka", "Nima", "Sura", "Edrin",
  "Korr", "Velka", "Tessa", "Mavren", "Odrik", "Lethra", "Neral", "Dam",
  "Terminus", "Daratrine", "Ludo", "Ludos", "A", "B", "C", "X", "Y",
]);

test("Twelve campaign paths localize runtime messages and nested parameters", () => {
  const unknown = new Map();
  let currentContext = "";
  const context = {
    TerminusLocale: records,
    recordUnknown(value) {
      if (/[A-Za-zÀ-ÿ]/.test(value) && !properNames.has(value))
        unknown.set(value, currentContext);
    },
  };
  const source = fs.readFileSync(path.join(__dirname, "../localization.js"), "utf8").replace(/\r\n/g, "\n");
  const fallback = "    return value;\n  }\n  function localizeMarkup";
  assert.equal(source.split(fallback).length, 2, "Update the fallback probe if the localizer changes");
  // Observe unresolved parameters as well as complete messages, without changing translation behavior.
  vm.createContext(context);
  vm.runInContext(source.replace(fallback,
    "    recordUnknown(value); return value;\n  }\n  function localizeMarkup"), context);
  const language = context.TerminusLanguage;
  language.setLanguage("en-US");
  const checked = new Set();
  function check(text, origin) {
    if (typeof text !== "string" || checked.has(text)) return;
    checked.add(text);
    currentContext = origin;
    language.text(text);
  }

  const routes = [];
  for (const guild of "ABC") for (const route of "XY") for (const mode of ["solo", "max"]) {
    const { game } = play({ guild, route, mode, allGuilds: mode === "max" });
    assert.equal(game.state.stage, 4, `${guild}${route}/${mode} must reach the ending`);
    const save = game.save();
    const replay = E.create(save.seed);
    const label = `${guild}${route}/${mode}`;
    let historyCount = 0;
    for (const action of save.commands) {
      replay.dispatch(action);
      const state = replay.state;
      for (const entry of state.history.slice(historyCount)) check(entry, `${label}: history`);
      historyCount = state.history.length;
      for (let i = 0; i < C.pairs.length; i++) check(E.recruitStatus(state, i).reason, `${label}: recruitment`);
      for (const id of Object.keys(state.items)) check(E.itemName(id), `${label}: item ${id}`);
      check(E.explorationBlock(state), `${label}: exploration`);
      if (state.scene) {
        const page = E.page(state);
        check(page.title, `${label}: scene title`);
        check(page.body, `${label}: ${page.passage.id}`);
        check(page.passage.speaker, `${label}: speaker`);
        for (const choice of page.choices) check(choice.label, `${label}: choice`);
      } else {
        for (const objective of E.objectives(state)) {
          check(objective.title, `${label}: objective title`);
          check(objective.task, `${label}: objective task`);
          check(objective.place, `${label}: objective place`);
        }
        for (const place of Object.keys(C.places)) {
          for (const activity of E.locationActivities(state, place)) {
            check(activity.label, `${label}: ${place} activity`);
            check(activity.reason, `${label}: ${place} availability`);
          }
        }
      }
    }
    routes.push({ guild, route, mode, states: save.commands.length });
  }
  const result = {
    routes,
    totalStates: routes.reduce((sum, route) => sum + route.states, 0),
    uniqueTexts: checked.size,
    unknown: [...unknown].map(([text, origin]) => ({ text, origin })),
  };
  const output = path.resolve(__dirname, "../../../../.artifacts/terminus-localization");
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, "runtime-messages.json"), JSON.stringify(result, null, 2) + "\n");
  assert.equal(routes.length, 12);
  assert.ok(checked.size > 1000, "Exercise complete campaign messages, not a sample");
  assert.deepEqual(result.unknown, [], "Untranslated runtime text; see runtime-messages.json");
});
