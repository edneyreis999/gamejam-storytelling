import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';

const {chromium} = createRequire(import.meta.url)('playwright');
const root = path.resolve(import.meta.dirname, '..');
const assets = path.join(root, 'assets/characters-coreto');
const manifest = JSON.parse(await fs.readFile(path.join(assets, 'manifest.json'), 'utf8'));
const output = path.join(assets, 'verificacao');
const html = '<!doctype html><link rel="icon" href="data:,"><style>body{margin:0}canvas{display:block}</style>' +
    ['libs/pixi', 'rmmz_core', 'rmmz_managers', 'rmmz_objects', 'rmmz_sprites']
        .map(name => `<script src="/rpg-maker/Terminus/js/${name}.js"></script>`).join('');
const mime = {'.js': 'text/javascript', '.png': 'image/png'};
const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/') {response.setHeader('Content-Type', 'text/html'); response.end(html); return;}
    const pathname = decodeURIComponent(url.pathname);
    const relative = pathname.startsWith('/img/characters/')
        ? '/assets/characters-coreto/processados/' + path.basename(pathname) : pathname;
    const file = path.resolve(root, '.' + relative);
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
let browser;
const report = [];
try {
    browser = await chromium.launch({channel: 'msedge', headless: true});
    const page = await browser.newPage({viewport: {width: 1000, height: 1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {if (message.type() === 'error') errors.push(message.text());});
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(async () => {
        window.$dataSystem = await (await fetch('/rpg-maker/Terminus/data/System.json')).json();
        window.$gameMap = new Game_Map();
    });
    for (const entry of manifest.sheets) {
        const result = await page.evaluate(async entry => {
            if (window.preview) window.preview.destroy(true, {children: true});
            const [width, height] = entry.size;
            const [columns, rows] = entry.grid;
            const app = new PIXI.Application({width, height, backgroundColor: 0xcac5ba, preserveDrawingBuffer: true});
            app.stop();
            window.preview = app;
            document.body.appendChild(app.view);
            const name = entry.name.replace(/\.png$/, '');
            const bitmap = ImageManager.loadCharacter(name);
            await new Promise(resolve => bitmap.addLoadListener(resolve));
            const selections = [];
            for (let row = 0; row < rows; row++) {
                for (let column = 0; column < columns; column++) {
                    const character = new Game_CharacterBase();
                    const index = columns === 3 ? 0 : Math.floor(row / 4) * 4 + Math.floor(column / 3);
                    character.setImage(name, index);
                    character.setDirection(2 + (row % 4) * 2);
                    character.setPattern(column % 3);
                    const sprite = new Sprite_Character(character);
                    sprite.updateBitmap();
                    sprite.updateFrame();
                    sprite.x = (column + 0.5) * width / columns;
                    sprite.y = (row + 1) * height / rows;
                    app.stage.addChild(sprite);
                    const frame = sprite._frame;
                    selections.push([frame.x, frame.y, frame.width, frame.height]);
                }
            }
            app.renderer.render(app.stage);
            return {name: entry.name, width: bitmap.width, height: bitmap.height,
                big: Boolean(ImageManager.isBigCharacter(name)), object: Boolean(ImageManager.isObjectCharacter(name)), selections};
        }, entry);
        assert.deepEqual([result.width, result.height], entry.size);
        assert.equal(result.big, entry.grid[0] === 3);
        assert.equal(result.object, entry.name.startsWith('!'));
        for (let row = 0; row < entry.grid[1]; row++) {
            for (let column = 0; column < entry.grid[0]; column++) {
                const w = entry.size[0] / entry.grid[0], h = entry.size[1] / entry.grid[1];
                assert.deepEqual(result.selections[row * entry.grid[0] + column], [column * w, row * h, w, h]);
            }
        }
        await page.locator('canvas').screenshot({path: path.join(output, entry.name.replace('.png', '-engine.png'))});
        report.push({name: result.name, frames: result.selections.length, dimensions: entry.size,
            big: result.big, object: result.object});
    }
    assert.deepEqual(errors, []);
    await fs.writeFile(path.join(output, 'runtime.json'), JSON.stringify({sheets: report, errors}, null, 2) + '\n');
    console.log(JSON.stringify({sheets: report.length, frames: report.reduce((n, sheet) => n + sheet.frames, 0), errors}));
} finally {
    if (browser) await browser.close();
    server.close();
}
