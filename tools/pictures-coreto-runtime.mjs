import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';

const {chromium} = createRequire(import.meta.url)('playwright');
const root = path.resolve(import.meta.dirname, '..');
const assets = path.join(root, 'assets/pictures-coreto');
const manifest = JSON.parse(await fs.readFile(path.join(assets, 'manifest.json'), 'utf8'));
const names = process.argv.slice(2);
const available = manifest.portraits.filter(entry => entry.status !== 'bloqueado_pela_ferramenta');
const selected = names.length ? available.filter(entry => names.includes(entry.name)) : available;
const output = path.join(assets, 'verificacao');
const html = '<!doctype html><link rel="icon" href="data:,"><style>body{margin:0}canvas{display:block}</style>' +
    ['libs/pixi', 'rmmz_core', 'rmmz_managers', 'rmmz_objects', 'rmmz_sprites']
        .map(name => `<script src="/rpg-maker/Terminus/js/${name}.js"></script>`).join('');
const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/') {response.setHeader('Content-Type', 'text/html'); response.end(html); return;}
    const pathname = decodeURIComponent(url.pathname);
    const relative = pathname.startsWith('/img/pictures/')
        ? '/assets/pictures-coreto/processados/' + path.basename(pathname) : pathname;
    const file = path.resolve(root, '.' + relative);
    if (!file.startsWith(root + path.sep)) {response.writeHead(403).end(); return;}
    try {
        response.setHeader('Content-Type', path.extname(file) === '.js' ? 'text/javascript' : 'application/octet-stream');
        response.end(await fs.readFile(file));
    } catch (error) {
        response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
        if (error.code !== 'ENOENT') console.error(error);
    }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
    browser = await chromium.launch({channel: 'msedge', headless: true});
    const page = await browser.newPage({viewport: {width: 1320, height: 700}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {if (message.type() === 'error') errors.push(message.text());});
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(() => {
        TouchInput.initialize();
        window.$gameScreen = new Game_Screen();
        window.$gameParty = {inBattle: () => false};
        window.preview = new PIXI.Application({width: 1320, height: 700, backgroundColor: 0xddd0b5, preserveDrawingBuffer: true});
        preview.stop();
        document.body.appendChild(preview.view);
    });
    const portraits = [];
    for (let start = 0; start < selected.length; start += 8) {
        const results = await page.evaluate(async entries => {
            for (const child of preview.stage.removeChildren()) child.destroy();
            const result = [];
            for (const [index, entry] of entries.entries()) {
                const name = entry.name.replace(/\.png$/, '');
                const bitmap = ImageManager.loadPicture(name);
                await new Promise(resolve => bitmap.addLoadListener(resolve));
                $gameScreen.showPicture(index + 1, name, 0, (index % 4) * 330, Math.floor(index / 4) * 350, 100, 100, 255, 0);
                const sprite = new Sprite_Picture(index + 1);
                sprite.update();
                preview.stage.addChild(sprite);
                result.push({name: entry.name, size: [bitmap.width, bitmap.height], visible: sprite.visible});
            }
            preview.renderer.render(preview.stage);
            return result;
        }, selected.slice(start, start + 8));
        for (const result of results) {
            assert.deepEqual(result.size, [330, 350]);
            assert.equal(result.visible, true);
        }
        portraits.push(...results);
        await page.locator('canvas').screenshot({path: path.join(output, `engine-${String(start / 8 + 1).padStart(2, '0')}.png`)});
    }
    assert.deepEqual(errors, []);
    await fs.writeFile(path.join(output, 'runtime.json'), JSON.stringify({portraits, errors}, null, 2) + '\n');
    console.log(JSON.stringify({portraits: portraits.length, errors}));
} finally {
    if (browser) await browser.close();
    server.close();
}
