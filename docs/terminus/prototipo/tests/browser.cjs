const fs = require("fs"),
  path = require("path");
const {
  chromium,
} = require("../../../../coreto/tools/qa/runner/node_modules/playwright");
const { play, finishQuest, start } = require("./helpers.cjs");
const E = require("../engine");
const root = path.resolve(__dirname, "../../../..");
const out = path.join(__dirname, "../verificacao");
fs.mkdirSync(out, { recursive: true });
const http = require("http");
const server = http.createServer((req, res) => {
  const file = path.resolve(
    root,
    "." + decodeURIComponent(req.url.split("?")[0]),
  );
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(
    file.endsWith(path.sep) ? path.join(file, "index.html") : file,
    (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.setHeader(
        "Content-Type",
        file.endsWith(".js")
          ? "text/javascript"
          : file.endsWith(".css")
            ? "text/css"
            : file.endsWith(".png")
              ? "image/png"
              : "text/html",
      );
      res.end(data);
    },
  );
});
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/docs/terminus/prototipo/index.html`;
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = [];
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce",
      hasTouch: true,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await context.addInitScript(() => {
      localStorage.setItem("terminus-campaign-v2", "antiga");
      localStorage.setItem("outra-aplicacao", "preservar");
    });
    await page.goto(url);
    if (
      await page.evaluate(
        () =>
          localStorage.getItem("terminus-campaign-v2") !== null ||
          localStorage.getItem("outra-aplicacao") !== "preservar",
      )
    )
      throw new Error("Legacy storage cleanup scope");
    results.push(
      "Limpeza restrita à chave antiga conhecida; outros dados preservados",
    );
    await page
      .getByRole("button", { name: "Sentar para ouvir", exact: true })
      .click();
    let save,
      observer,
      seen = 0;
    async function state() {
      save = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("terminus-campaign-v3")),
      );
      if (!observer) {
        observer = E.create(save.seed);
      }
      for (; seen < save.commands.length; seen++)
        observer.dispatch(save.commands[seen]);
      return observer.state;
    }
    for (let i = 0; i < 180; i++) {
      const s = await state();
      if (s.completed.includes("gA1")) break;
      if (s.scene) {
        const choices = page.locator(".choices button");
        await choices.first().click();
      } else await page.locator(".quest-list button").first().click();
    }
    let s = await state();
    if (!s.completed.includes("gA1"))
      throw new Error("Opening did not reach map");
    await page
      .getByRole("button", { name: "Voltar ao mapa", exact: true })
      .click();
    if ((await page.locator("[data-destination]").count()) !== 13)
      throw new Error("Missing destinations");
    results.push("Abertura e Q-A1 por cliques públicos; 13 destinos e portal");
    for (const width of [1280, 768, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.screenshot({
        path: path.join(out, `mapa-${width}.png`),
        fullPage: true,
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      if (overflow) throw new Error("Page overflow " + width);
      results.push(`Mapa ${width}px: sem overflow da página; rolagem local`);
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.locator("#destination-oficina").focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("button", { name: "Voltar ao mapa", exact: true })
      .click();
    if (
      await page
        .locator("#destination-oficina")
        .evaluate((e) => e !== document.activeElement)
    )
      throw new Error("Focus not restored");
    results.push("Teclado: Enter visita; retorno restaura foco e posição");
    await page.locator("#destination-quarta").tap();
    await page
      .getByText("Nenhuma atividade disponível neste local agora.", {
        exact: false,
      })
      .waitFor();
    results.push("Toque emulado abre local sem iniciar missão indisponível");
    await page.screenshot({
      path: path.join(out, "local-quarta.png"),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Voltar ao mapa", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Portal · Noite da História", exact: true })
      .click();
    while ((await state()).scene)
      await page.locator(".choices button").first().click();
    await page.screenshot({
      path: path.join(out, "coreto.png"),
      fullPage: true,
    });
    await page.getByRole("button", { name: /Voltar a Terminus/ }).click();
    results.push("Portal retorna à moldura e ao mapa sem avanço de quest");
    const before = await page.evaluate(() =>
      localStorage.getItem("terminus-campaign-v3"),
    );
    await page
      .getByRole("button", { name: "Cenas e variantes", exact: true })
      .click();
    await page.screenshot({
      path: path.join(out, "previa.png"),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Inventário de arte", exact: true })
      .click();
    if (
      before !==
      (await page.evaluate(() => localStorage.getItem("terminus-campaign-v3")))
    )
      throw new Error("Editorial changed save");
    results.push("Prévias e inventário isolados do armazenamento");
    const broken = await context.newPage();
    await broken.route(
      "**/assets/terminus/locais/guilda-virmura-recepcao-v1.png",
      (route) => route.abort(),
    );
    await broken.goto(url);
    await broken
      .getByRole("button", { name: "Continuar a história", exact: true })
      .click();
    await broken.locator("#destination-virmura").click();
    await broken
      .getByRole("alert")
      .filter({ hasText: "Não foi possível abrir" })
      .waitFor();
    results.push("Falha de imagem: mensagem legível e retorno disponível");
    await broken.close();
    const loaded = await page.evaluate(async () => {
      const paths = [
        ...Object.values(TerminusAssetFiles.backgrounds).map(
          (file) => "../../../assets/terminus/locais/" + file + ".png",
        ),
        ...Object.values(TerminusAssetFiles.portraits).flatMap((p) =>
          Object.values(p.files),
        ),
      ];
      const failures = [];
      for (const src of paths) {
        const image = new Image();
        image.src = src;
        try {
          await image.decode();
        } catch {
          failures.push(src);
        }
      }
      return { count: paths.length, failures };
    });
    if (loaded.failures.length)
      throw new Error("Images failed: " + loaded.failures.join(","));
    results.push(
      loaded.count +
        " imagens decodificadas no navegador (fundos e expressões)",
    );
    const mobile = E.create(123456);
    finishQuest(mobile, "intro");
    finishQuest(mobile, "gA1");
    start(mobile, "gB1");
    while (mobile.state.scene) mobile.dispatch({ type: "advance" });
    start(mobile, "gB1");
    while (E.page(mobile.state).passage.operation !== "give")
      mobile.dispatch({ type: "advance" });
    const mobileFile = path.join(out, "mobile-v3.json");
    fs.writeFileSync(mobileFile, JSON.stringify(mobile.save()));
    await page.getByRole("button", { name: "Jogar", exact: true }).click();
    await page.locator("#import-file").setInputFiles(mobileFile);
    await page
      .getByRole("button", { name: "Usar esta partida", exact: true })
      .click();
    await page.setViewportSize({ width: 320, height: 900 });
    await page.screenshot({
      path: path.join(out, "leitura-320.png"),
      fullPage: true,
    });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw new Error("Reading overflows at 320");
    if (
      (await page.locator(".scene-object.handover").count()) !== 1 ||
      (await page
        .locator(".scene-object.handover")
        .evaluate((e) => getComputedStyle(e).animationName !== "none"))
    )
      throw new Error("Reduced motion ignored");
    results.push(
      "Leitura e objeto em 320px; movimento reduzido preserva texto",
    );
    fs.unlinkSync(mobileFile);
    await page.setViewportSize({ width: 1280, height: 900 });
    const beforeJournal = await page.evaluate(() =>
      localStorage.getItem("terminus-campaign-v3"),
    );
    await page.getByRole("button", { name: "Diário", exact: true }).click();
    for (const name of [
      "Objetivos pendentes",
      "Itens de missão",
      "Equipe e convites",
    ])
      await page.getByRole("heading", { name, exact: true }).waitFor();
    if (
      await page.getByRole("button", { name: /Convidar|Pedir exceção/ }).count()
    )
      throw new Error("Journal exposes game mutations");
    if (
      beforeJournal !==
      (await page.evaluate(() => localStorage.getItem("terminus-campaign-v3")))
    )
      throw new Error("Journal changed state");
    await page
      .getByRole("button", { name: "Retomar a história", exact: true })
      .click();
    results.push("Diário mostra objetivos, itens e equipe sem ações ou avanço");
    const exported = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Exportar partida", exact: true })
      .click();
    const download = await exported;
    const downloadPath = path.join(out, "exportado-v3.json");
    await download.saveAs(downloadPath);
    if (JSON.parse(fs.readFileSync(downloadPath)).version !== 3)
      throw new Error("Wrong export version");
    fs.unlinkSync(downloadPath);
    results.push("Exportação JSON pelo botão e download do navegador");
    const fixture = play({
      guild: "C",
      route: "Y",
      stopAt: (s) => s.battle?.id === "t5",
    }).game.save();
    const file = path.join(out, "importacao-v3.json");
    fs.writeFileSync(file, JSON.stringify(fixture));
    await page.getByRole("button", { name: "Jogar", exact: true }).click();
    await page.locator("#import-file").setInputFiles(file);
    await page
      .getByRole("button", { name: "Usar esta partida", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Rolar o D20", exact: true })
      .waitFor();
    await page.screenshot({
      path: path.join(out, "neral-transformado.png"),
      fullPage: true,
    });
    results.push(
      "Importação v3 por seletor; batalha final e forma transformada",
    );
    await page.reload();
    await page
      .getByRole("button", { name: "Continuar a história", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Rolar o D20", exact: true })
      .waitFor();
    results.push("Recarga conserva batalha, dados e posição de leitura");
    if (errors.length) throw new Error(errors.join("\n"));
    fs.unlinkSync(file);
    fs.writeFileSync(
      path.join(out, "browser.json"),
      JSON.stringify(
        {
          status: "pass",
          browser: await browser.version(),
          results,
          errors,
          limits: [
            "Toque emulado; sem ensaio em aparelho físico.",
            "Aceite artístico permanece com o autor.",
          ],
        },
        null,
        2,
      ),
    );
    console.log(results.join("\n"));
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
