import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {options, headings, segments, rebindText} from './options.mjs';
import {paths} from './icon-paths.mjs';

const sharp = createRequire(import.meta.url)('sharp');
const root = path.resolve('rpg-maker/Terminus');
const cli = process.argv[process.argv.indexOf('--coreto-cli') + 1];
if (!process.argv.includes('--coreto-cli')) throw Error('Use --coreto-cli <path to coreto/cli.mjs>');
const theme = JSON.parse(fs.readFileSync(new URL('theme.json', import.meta.url), 'utf8'));
const renderer = fs.readFileSync(new URL('option-draw.js', import.meta.url), 'utf8');
fs.mkdirSync('.local-tools', {recursive:true});
function call(namespace, ...args) {
    const output = execFileSync(process.execPath, [cli, '--project', root, namespace, ...args, '--json'], {encoding:'utf8', maxBuffer:16e6});
    const result = JSON.parse(output);
    if (!result.ok) throw Error(output);
    return result.result;
}
function set(namespace, field, value) {
    const current = call(namespace, 'parameters', 'get', '--path', field);
    const input = path.resolve('.local-tools/terminus-ui-parameter.json');
    fs.writeFileSync(input, JSON.stringify(value));
    const args = ['parameters', 'set', '--path', field, '--input', input];
    if (current.fileHash) args.push('--expected-hash', current.fileHash);
    call(namespace, ...args);
}

const iconNames = Object.keys(paths);
const iconIndex = {};
const composites = [];
for (const [i, name] of iconNames.entries()) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 -2 28 28"><g fill="none" stroke="${theme.Ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</g></svg>`;
    fs.writeFileSync(new URL(`icons/${name}.svg`, import.meta.url), svg + '\n');
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    fs.writeFileSync(path.join(root, `img/system/TerminusUI_${name}.png`), png);
    iconIndex[name] = 336 + i;
    const glyph = await sharp(png).resize(24,24).png().toBuffer();
    const tile = await sharp({create:{width:32,height:32,channels:4,background:'#00000000'}}).composite([{input:glyph,left:4,top:4}]).png().toBuffer();
    composites.push({input:tile,left:(i%16)*32,top:(21+Math.floor(i/16))*32});
}
const atlasPath = path.join(root,'img/system/IconSet.png');
const existing = await sharp(atlasPath).extract({left:0,top:0,width:512,height:640}).png().toBuffer();
const originalIcons = ['Settings','Audio','TextEffects','Menu','Save','Clock','Conversation','Language','Music','Ambience','Jingle','SoundEffects'];
for(const [i,name] of originalIcons.entries()){
    const glyph=await sharp(path.join(root,`img/system/CoretoTheme_${name}.png`)).resize(24,24).png().toBuffer();
    composites.push({input:glyph,left:i*32+4,top:644});
}
const atlas = await sharp({create:{width:512,height:(21+Math.ceil(iconNames.length/16))*32,channels:4,background:'#00000000'}})
    .composite([{input:existing,left:0,top:0},...composites]).png().toBuffer();
fs.writeFileSync(atlasPath, atlas);
originalIcons.forEach((name,i)=>iconIndex[name]=320+i);

// Native touch buttons: two 48px rows, preserving RPG Maker's cell contract.
const touchButtons=[[0,2,'M18 12H6m5-5-5 5 5 5'],[2,1,'m15 5-7 7 7 7'],[3,1,'m9 5 7 7-7 7'],[4,1,'M5 12h14'],[5,1,'M5 12h14M12 5v14'],[6,1,'M3 8h18M3 16h18'],[7,1,'M3 8h18M3 16h18M8 3v18M16 3v18'],[8,2,'m4 12 5 5L20 6'],[10,1,'M3 6h18M3 12h18M3 18h18']];
const buttonSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="528" height="96">${[0,1].map(state=>touchButtons.map(([cell,span,d])=>`<g transform="translate(${cell*48} ${state*48})"><rect x="1" y="1" width="${span*48-2}" height="46" rx="6" fill="${state?theme.Surfaces.primary:theme.Surfaces.panel}" stroke="${state?theme.Surfaces.gold:theme.Surfaces.border}"/><path transform="translate(${span*24-12} 12)" d="${d}" fill="none" stroke="${state?theme.Surfaces.onAccent:theme.Ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>`).join('')).join('')}</svg>`;
fs.writeFileSync(new URL('icons/touch-buttons.svg',import.meta.url),buttonSvg+'\n');
await sharp(Buffer.from(buttonSvg)).png().toFile(path.join(root,'img/system/ButtonSet.png'));

const actions = new Set(['rebindKeyboard','rebindGamepad','TF_AdvSoundOptions','assistSpawnItems','assistSpawnWeapons','assistSpawnArmors','assistCallDebug']);
const ranges = {compassSize:[50,100],weatherDensity:[0,100],atbSpeed:[1,5],textSpeed:[1,11],windowToneRed:[-255,255],windowToneGreen:[-255,255],windowToneBlue:[-255,255],assistExpMultiplier:[0,10],assistGoldMultiplier:[0,10],assistDropMultiplier:[0,10]};
for (const symbol of ['masterVolume','bgmVolume','bgsVolume','meVolume','seVolume','voiceVolume']) ranges[symbol]=[0,100];
function callback(spec, value='undefined', choices='[]', display='String(value)') {
    return renderer.replace('__THEME__',JSON.stringify(theme)).replace('__SPEC__',JSON.stringify(spec))
        .replace('__VALUE__',value).replace('__CHOICES__',choices).replaceAll('__DISPLAY__',display);
}
const categories = call('options','parameters','get','--path','/Categories').value;
const names = ['Geral','Áudio','Interface','Teste'];
const categoryIcons = ['Settings','Audio','Menu','Debug'];
const manifest = [];
categories.forEach((category,c) => {
    category.Name=names[c]; category.Icon=iconIndex[categoryIcons[c]];
    category.List=category.List.filter(row=>!row.Symbol.startsWith('---'));
    for (const row of category.List) {
        if (!row.Symbol) {
            const original=row.TextStr.replace(/\\C\[\d+\]/g,'');
            const label=headings[original] || original;
            row.TextStr=label; row.DrawJS=callback({kind:'heading',label});
            continue;
        }
        const symbol=row.Symbol;
        if (!options[symbol]) throw Error('Missing presentation for '+symbol);
        const [label, icon]=options[symbol];
        const spec={label,icon,asset:(paths[icon]?'TerminusUI_':'CoretoTheme_')+icon,kind:'toggle'};
        let value='this.getConfigValue(symbol)', choices=JSON.stringify(['Desligado','Ligado']), display='String(value)';
        if (symbol==='fullScreen') value='!!Graphics._isFullScreen()';
        if (symbol==='stretchScreen') value='!!Graphics._stretchEnabled';
        if (symbol.startsWith('windowTone')) value=`$gameSystem.windowTone()[${['windowToneRed','windowToneGreen','windowToneBlue'].indexOf(symbol)}]`;
        if (ranges[symbol]) {
            spec.kind='slider'; [spec.min,spec.max]=ranges[symbol];
            if (symbol.endsWith('Volume')||['compassSize','weatherDensity'].includes(symbol)) display="value + '%'";
            if (symbol.endsWith('Multiplier')) display="'×' + (2 ** value)";
            if (symbol==='textSpeed') display="value === 11 ? 'Instantâneo' : String(value)";
        }
        if (actions.has(symbol)) spec.kind='action';
        if (segments[symbol]) {
            choices=JSON.stringify(segments[symbol]);
            if (!['atbActive','fullScreen','uiButtonPosition','uiHelpPosition','uiInputPosition','uiMenuStyle'].includes(symbol)) spec.kind='segments';
            if (segments[symbol].length>3) {spec.kind='cycle';display=`${choices}[value]`;}
        }
        if (symbol==='questTrackerPosition') choices='[TextManager.questTrackerPosOff, TextManager.questTrackerPosOn]';
        if (symbol==='autoBattleUseSkills') choices='[VisuMZ.BattleCore.Settings.AutoBattle.StyleOFF, VisuMZ.BattleCore.Settings.AutoBattle.StyleON]';
        if (['uiHelpPosition','uiInputPosition'].includes(symbol)) spec.disabledHint='Ative a organização personalizada';
        const soundLists={seCursor:'cursorSFXs',seOK:'okSFXs',seCancel:'cancelSFXs',seBuzzer:'buzzerSFXs'};
        if (soundLists[symbol]) {spec.kind='cycle'; display=`value === 0 ? 'Padrão' : 'Variação ' + value`;}
        if (symbol==='textFont') {spec.kind='cycle';display="value === 0 ? 'Padrão Coreto' : TextManager.optionsCoreFonts[value]";}
        if (symbol==='textLocale') {spec.kind='cycle';display='TextManager.getLanguageName(ConfigManager.textLocale)';}
        if (symbol==='voiceLocale') {spec.kind='cycle';display='TextManager.getCurrentAudioLanguage()';}
        row.Icon=iconIndex[icon];row.TextStr=label;row.DrawJS=callback(spec,value,choices,display);
        if(['autoBattleAtStart','autoBattleUseSkills','visualHpGauge'].includes(symbol)){
            row.TextStr='';
            const field={autoBattleAtStart:'autoBattleStart',autoBattleUseSkills:'autoBattleStyle',visualHpGauge:'visualHpGauge'}[symbol];
            row.DrawJS=row.DrawJS.replace('wrappedLabel(spec.label,',`wrappedLabel(TextManager.${field},`);
        }
        manifest.push({category:category.Name,symbol,...spec,index:row.Icon});
    }
});
set('options','/Categories',categories);
set('options','/OptionsSettings/buttonAssistCategory','Trocar categoria');
const rebind=call('options','parameters','get','--path','/Rebind').value;
set('options','/Rebind',{...rebind,...rebindText});
const assist=call('core','parameters','get','--path','/ButtonAssist').value;
set('core','/ButtonAssist',{...assist,OkText:'Selecionar',CancelText:'Voltar',SwitchActorText:'Trocar aliado',KeyUP:'↑',KeyDOWN:'↓',KeyLEFT:'←',KeyRIGHT:'→'});
fs.writeFileSync(new URL('manifest.json',import.meta.url),JSON.stringify({revision:'terminus-options-2026-10-18',icons:iconIndex,options:manifest},null,2)+'\n');
console.log(JSON.stringify({options:manifest.length,newIcons:iconNames.length,categories:categories.map(c=>({name:c.Name,rows:c.List.length}))}));
