import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';

const {chromium} = createRequire(import.meta.url)('playwright');
const root = path.resolve(import.meta.dirname, '../..');
const sampleDirectory = process.argv[2];
if (!sampleDirectory) throw Error('Informe a pasta samplemaps da instalação do RPG Maker MZ.');
const output = path.resolve(root, process.argv[3] || 'assets/tilesets-coreto/verificacao');
const sheetDirectory = process.argv[4] || 'rpg-maker/Terminus/img/tilesets';
const onlyTileset = process.argv[5] ? Number(process.argv[5]) : null;
await fs.mkdir(output, {recursive: true});
const database = JSON.parse(await fs.readFile(path.join(root, 'rpg-maker/Terminus/data/Tilesets.json'), 'utf8'));
// Keep full-map captures below the engine's per-layer geometry limit.
const files = ['Map005.json', 'Map008.json', 'Map014.json', 'Map032.json', 'Map027.json', 'Map056.json', 'Map079.json'];
const examples = [];
for (const name of files) {
    const map = JSON.parse(await fs.readFile(path.join(sampleDirectory, name), 'utf8'));
    if (onlyTileset === null || map.tilesetId === onlyTileset) examples.push({name, map});
}
assert.equal(new Set(examples.map(example => example.map.tilesetId)).size, onlyTileset === null ? 6 : 1);

const html = '<!doctype html><meta charset="utf-8"><link rel="icon" href="data:,"><style>body{margin:0;background:#f6daa6}canvas{display:block}</style><script src="/rpg-maker/Terminus/js/libs/pixi.js"></script><script src="/rpg-maker/Terminus/js/rmmz_core.js"></script>';
const mime = {'.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json'};
const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/') {response.setHeader('Content-Type', 'text/html'); response.end(html); return;}
    const file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep)) {response.writeHead(403).end(); return;}
    try {
        response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
        response.end(await fs.readFile(file));
    } catch (error) {
        response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
        if (error.code !== 'ENOENT') console.error(error);
    }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({channel: 'msedge', headless: true});
const report = [];
try {
    for (const {name, map} of examples) {
        const tileset = database[map.tilesetId];
        for (const variant of ['antes', 'depois']) {
            const page = await browser.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            page.on('console', message => {if (message.type() === 'error') errors.push(message.text());});
            await page.goto(`http://127.0.0.1:${server.address().port}/`);
            const info = await page.evaluate(async ({map, tileset, variant, sheetDirectory}) => {
                const width = map.width * 48, height = map.height * 48;
                const app = new PIXI.Application({width, height, backgroundColor: 0xf6daa6, preserveDrawingBuffer: true});
                app.stop();
                document.body.appendChild(app.view);
                const scale = Math.min(0.75, 1100 / width, 1100 / height);
                app.view.style.width = `${Math.round(width * scale)}px`;
                app.view.style.height = `${Math.round(height * scale)}px`;
                const tilemap = new Tilemap();
                tilemap.width = width;
                tilemap.height = height;
                tilemap.flags = tileset.flags;
                tilemap.setData(map.width, map.height, map.data);
                const base = variant === 'antes' ? '/assets/tilesets-coreto/originais/' : `/${sheetDirectory}/`;
                const bitmaps = await Promise.all(tileset.tilesetNames.map(async name => {
                    if (!name) return new Bitmap(1, 1);
                    const response = await fetch(`${base}${name}.png`);
                    if (!response.ok) throw Error(`Tileset indisponível: ${name}`);
                    const bitmap = Bitmap.load(`${base}${name}.png`);
                    await new Promise(resolve => bitmap.addLoadListener(resolve));
                    return bitmap;
                }));
                tilemap.setBitmaps(bitmaps);
                app.stage.addChild(tilemap);
                window.renderFrame = frame => {
                    tilemap.animationFrame = frame;
                    tilemap.refresh();
                    app.renderer.render(app.stage);
                    return app.view.toDataURL();
                };
                window.renderFrame(0);
                return {width, height, files: tileset.tilesetNames.filter(Boolean)};
            }, {map, tileset, variant, sheetDirectory});
            await page.locator('canvas').screenshot({path: path.join(output, `${name.replace('.json', '')}-${variant}.png`)});
            const frames = await page.evaluate(() => [0, 1, 2, 3].map(frame => window.renderFrame(frame)));
            assert.equal(errors.length, 0, errors.join('\n'));
            report.push({sample: name, tileset: tileset.name, variant, ...info, renderedFrames: frames.length,
                distinctAnimationFrames: new Set(frames).size, errors});
            await page.close();
        }
    }
    for (let i = 0; i < report.length; i += 2) {
        assert.equal(report[i].distinctAnimationFrames, report[i + 1].distinctAnimationFrames);
    }
    await fs.writeFile(path.join(output, 'runtime.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({samples: examples.length, renders: report.length, errors: 0}));
} finally {
    await browser.close();
    server.close();
}
