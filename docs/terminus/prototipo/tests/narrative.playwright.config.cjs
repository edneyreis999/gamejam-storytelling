const fs = require("node:fs");
const path = require("node:path");
const { defineConfig } = require("../../../../coreto/tools/qa/runner/node_modules/playwright/test");
const root = path.resolve(__dirname, "../../../..");
const file = path.join(root, "loki.config.json");
const policy = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
if (!policy || typeof policy !== "object" || Array.isArray(policy)) throw new Error("Invalid loki.config.json");
const slow = Object.hasOwn(policy, "slowTests") ? policy.slowTests : {};
if (!slow || typeof slow !== "object" || Array.isArray(slow)) throw new Error("Invalid slowTests configuration");
for (const key of ["maxWorkers", "maxBrowsers"])
  if (slow[key] !== undefined && (!Number.isSafeInteger(slow[key]) || slow[key] < 1))
    throw new Error(`Invalid slowTests.${key}`);

module.exports = defineConfig({
  testDir: path.resolve(__dirname, "../.."),
  projects: [
    { name: "narrative", testMatch: "**/prototipo/tests/narrative.browser.cjs" },
    { name: "player", testMatch: "**/jogo/tests/player.browser.cjs", fullyParallel: true },
  ],
  outputDir: path.join(root, ".artifacts/terminus-player/browser"),
  reporter: [["list"], ["json", { outputFile: path.join(root, ".artifacts/terminus-player/browser-results.json") }]],
  // Each worker owns one browser; isolated cases need no nested browser pool.
  workers: Math.min(2, slow.maxWorkers ?? 10, slow.maxBrowsers ?? 10),
  retries: 0,
  metadata: {
    maxWorkers: slow.maxWorkers ?? 10,
    maxBrowsers: slow.maxBrowsers ?? 10,
    maxWorkersSource: slow.maxWorkers === undefined ? "default" : "loki.config.json",
    maxBrowsersSource: slow.maxBrowsers === undefined ? "default" : "loki.config.json",
    workerCeiling: Math.min(2, slow.maxWorkers ?? 10, slow.maxBrowsers ?? 10),
    browserCeiling: Math.min(2, slow.maxWorkers ?? 10, slow.maxBrowsers ?? 10),
    scheduling: "Two browser workers reserved for this invocation; no nested jobs.",
  },
  use: {
    channel: process.env.TERMINUS_QA_BROWSER || "msedge",
    headless: true,
    viewport: { width: 1280, height: 720 },
    reducedMotion: "reduce",
    actionTimeout: 10000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
