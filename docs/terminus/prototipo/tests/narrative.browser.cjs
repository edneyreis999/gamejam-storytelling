const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { test, expect } = require("../../../../coreto/tools/qa/runner/node_modules/playwright/test");
const E = require("../engine.js");
const L = require("../localization.js");
const { play, start } = require("./helpers.cjs");
const url = pathToFileURL(path.resolve(__dirname, "../index.html")).href;
const cases = [
  { id: "welcome", scene: "intro", passage: "intro.p1.body.1", visual: "rheed-colorido-v1" },
  { id: "rescue", scene: "intro", passage: "intro.p4.body.1", visual: "ghork" },
  { id: "care", scene: "intro", passage: "intro.p4.body.4", visual: "virmura" },
  { id: "work-and-shelter", scene: "gA1", passage: "gA1.p1.body.3", visual: "virmura" },
  { id: "lala", scene: "gA1", passage: "gA1.p3.body.3", visual: "lala" },
  { id: "contract-x", scene: "alliance", passage: "alliance.p2.choice0.3", visual: "zagra" },
  { id: "contract-y", scene: "alliance", passage: "alliance.p2.choice1.3", visual: "darvek", choice: 1 },
  { id: "recruitment", scene: "R1", passage: "R1.p1.body.2", visual: "brakka" },
  { id: "semifinal", scene: "fight3", passage: "fight3.p2.body.1", visual: "nima" },
  { id: "revelation", scene: "fight5", passage: "fight5.p1.body.1", visual: "neral-revelado" },
  { id: "transformation", scene: "fight5", passage: "fight5.p2.body.2", visual: "neral-transformado" },
  { id: "dam-message-narrow", scene: "ending", passage: "ending.p5.body.1", visual: "lala", narrow: true },
];

function fixture(sample) {
  // Saved commands prepare the scene; import, language changes and rendering use the public UI.
  const game = play({ mode: "max", paid: sample.scene === "ending", stopAt: s => s.scene?.quest === sample.scene }).game;
  for (let i = 0; i < 100; i++) {
    if (!game.state.scene) { start(game, sample.scene); continue; }
    const current = E.page(game.state);
    if (current.passage.id === sample.passage) return game;
    game.dispatch(current.choices.length
      ? { type: "choose", index: current.choices[sample.choice ?? 0].index }
      : { type: "advance" });
  }
  throw new Error(`Unreachable fixture: ${sample.passage}`);
}

async function closeNotice(page) {
  if (await page.locator("#notice").isVisible()) await page.locator("#notice button").click();
}

for (const sample of cases) test(`${sample.id}: English and Portuguese keep the same acting and reading position`, async ({ page }, info) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const game = fixture(sample);
  await page.goto(url);
  await page.locator("#import-file").setInputFiles({
    name: "scene.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(game.save())),
  });
  await page.locator("#modal-actions button").last().click();
  await closeNotice(page);
  if (sample.narrow) await page.setViewportSize({ width: 844, height: 390 });
  const before = await page.evaluate(() => localStorage.getItem("terminus-campaign-v3"));
  for (const language of ["en-US", "pt-BR"]) {
    await page.locator("#menu-button").click();
    await page.locator("#language-menu").selectOption(language);
    await page.locator("#menu-close").click();
    await closeNotice(page);
    L.setLanguage(language);
    await expect(page.locator("[data-passage]")).toHaveAttribute("data-passage", sample.passage);
    await expect(page.locator(".dialogue-panel > p")).toHaveText(L.text(E.page(game.state).passage.text));
    const bust = page.locator(".bust-image");
    await expect(bust).toHaveAttribute("src", new RegExp(`/expressoes/${sample.visual}/(neutro|feliz|triste|raiva|confuso)\\.png$`));
    await expect.poll(() => bust.evaluate(img => img.complete && img.naturalWidth === 504)).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem("terminus-campaign-v3"))).toBe(before);
    await expect(page.locator(".asset-error")).toHaveCount(0);
    await expect(page.locator("#orientation")).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath(`${language}.png`) });
    if (sample.narrow) {
      const panel = page.locator(".dialogue-panel");
      expect(await panel.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(18);
      await panel.evaluate(el => { el.scrollTop = el.scrollHeight; });
      expect(await panel.evaluate(el => el.scrollTop + el.clientHeight >= el.scrollHeight - 1)).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
