(() => {
  'use strict';
  const E = TerminusEngine, C = TerminusContent, L = TerminusLanguage;
  const A = TerminusArt, FX = TerminusPresentation;
  const KEY = 'terminus-player-v3', SETTINGS = 'terminus-player-settings';
  const main = document.querySelector('#main'), menu = document.querySelector('#menu');
  const modal = document.querySelector('#modal'), effects = document.querySelector('#effects');
  const skip = document.querySelector('#skip-animation');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let audio = TerminusAudio.createAudio();
  const settings = {language: 'en-US', speed: 'normal', reduced: false, sound: true, volume: 0.35, musicVolume: 0.25};
  let game = null, view = 'title', journalTab = 'objectives', busy = false;
  let travel = null, animationTimer = null, revealTimer = null, revealAll = null;
  let rewardTimer = null, lastPlace = 'virmura', mapFocus = null, restored = false;
  let previousVisual = null, revealedPassage = null;
  const arcNames = ['A Noite da História', 'I · Uma bandeira', 'II · O custo de avançar', 'III · Quem está do outro lado', 'Fim da história'];
  const english = () => L.getLanguage() === 'en-US';
  const say = (pt, en) => english() ? en : pt;
  const reduced = () => settings.reduced || media.matches;
  const text = value => L.text(String(value)).replace(/\b(?:Q-[A-Z0-9]+|E\d{2}|R[1-5]|S[1-3])\s*·\s*/g, '');
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value === null) continue;
      node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) {
      if (child !== null && child !== undefined) node.append(typeof child === 'string' ? text(child) : child);
    }
    return node;
  }
  function button(label, action, attrs = {}) {
    const node = el('button', {type: 'button', ...attrs}, label);
    node.addEventListener('click', event => {
      if (event.detail > 1 || !node.isConnected) return;
      const cue = attrs['data-sound'] || (attrs['data-choice'] !== undefined ? 'confirm' : 'selection');
      if (!attrs['data-advance'] && cue !== 'none') sound(cue);
      action(event);
    });
    return node;
  }
  function sound(kind) { if (settings.sound) audio.play(kind); }
  function image(id, className, alt = '') {
    const asset = A.assets[id];
    if (!asset?.preview) return el('span', {class: 'image-unavailable'}, alt || asset?.owner || '');
    const img = el('img', {src: asset.preview, alt: text(alt), class: className, draggable: 'false'});
    img.addEventListener('error', () => {
      img.replaceWith(el('span', {class: 'image-unavailable', role: 'status'}, say('Imagem indisponível. A história pode continuar.', 'Image unavailable. You can keep playing.')));
    }, {once: true});
    return img;
  }
  function notice(message, error = false) {
    const node = document.querySelector('#notice');
    node.hidden = !message;
    node.setAttribute('role', error ? 'alert' : 'status');
    node.replaceChildren();
    if (message) node.append(el('span', {}, message), button(say('Fechar aviso', 'Dismiss'), () => { node.hidden = true; resize(); }));
    resize();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(game.save())); }
    catch { notice(say('Não foi possível salvar neste navegador. Exporte a partida para guardar seu progresso.', 'This browser could not save your progress. Export your save to keep it.'), true); }
  }
  function restorePosition() {
    const place = game.state.location;
    lastPlace = C.places[place] ? place : game.save().commands.findLast(command => command.type === 'visit')?.location || 'virmura';
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS, JSON.stringify(settings)); }
    catch { notice(say('As opções valem até fechar esta página; o navegador não conseguiu guardá-las.', 'These settings apply until this page closes; the browser could not store them.'), true); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(game.save(), null, 2)], {type: 'application/json'}));
    const link = el('a', {href: url, download: 'terminus-partida.json'});
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function confirm(title, description, action, label = say('Confirmar escolha', 'Confirm choice')) {
    menu.close();
    document.querySelector('#modal-title').textContent = text(title);
    document.querySelector('#modal-body').replaceChildren(...text(description).split('\n\n').map(p => el('p', {}, p)));
    document.querySelector('#modal-actions').replaceChildren(
      button(say('Voltar sem alterar', 'Go back'), () => modal.close()),
      button(label, () => { modal.close(); action(); }, {class: 'primary'}),
    );
    modal.showModal();
  }
  function cancelPresentation() {
    clearInterval(revealTimer); revealTimer = null; revealAll = null;
    clearTimeout(animationTimer); animationTimer = null;
    if (travel) { travel.cancel(); travel = null; }
    effects.replaceChildren(); skip.hidden = true; busy = false;
  }
  function sequence(duration, complete) {
    busy = true;
    skip.hidden = reduced();
    skip.textContent = say('Abreviar animação', 'Skip animation');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true; clearTimeout(animationTimer); skip.hidden = true; skip.onclick = null;
      busy = false; effects.replaceChildren(); complete();
    };
    skip.onclick = finish;
    animationTimer = setTimeout(finish, reduced() ? 0 : duration);
  }
  function reward(before, after) {
    const messages = [];
    if (after.ludos > before.ludos) messages.push(`+${after.ludos - before.ludos} Ludos`);
    for (const id of Object.keys(after.items)) if (!before.items[id]) messages.push(text(E.itemName(id)));
    for (const r of after.recruits) if (r.invited && !before.recruits.some(old => old.invited && old.name === r.name))
      messages.push(say(`${r.name} se juntou ao time`, `${r.name} joined the team`));
    if (!messages.length) return;
    const node = document.querySelector('#reward');
    clearTimeout(rewardTimer); node.textContent = messages.join(' · '); node.hidden = false;
    node.classList.remove('reward-in');
    void node.offsetWidth;
    node.classList.add('reward-in');
    sound('reward'); rewardTimer = setTimeout(() => { node.hidden = true; }, 3600);
  }
  function dispatch(action) {
    if (busy) return;
    try {
      const before = game.state;
      if (before.location && before.location !== 'coreto') lastPlace = before.location;
      game.dispatch(action); save(); view = 'play'; restored = false;
      if (action.type === 'map' || action.type === 'defer' || action.type === 'leaveCoreto') mapFocus = lastPlace;
      render();
      reward(before, game.state);
      if (action.type === 'roll') animateBattle();
      else if (before.stage !== game.state.stage && game.state.stage < 4) {
        effects.append(el('div', {class: 'chapter-card'}, el('span', {}, 'Terminus'), el('h2', {}, arcNames[game.state.stage])));
        sequence(750, () => {});
      }
    } catch (error) { notice(error.message, true); }
  }
  function newGame() {
    const begin = () => {
      game = E.create(crypto.getRandomValues(new Uint32Array(1))[0] || 1);
      previousVisual = null; revealedPassage = null; lastPlace = 'virmura';
      dispatch({type: 'start', id: 'intro'});
    };
    if (!game) begin();
    else confirm(say('Começar outra história?', 'Begin a new story?'), say('A partida desta edição será substituída. Exporte seu progresso antes se quiser guardá-lo.', 'This edition’s save will be replaced. Export it first if you want to keep your progress.'), begin, say('Começar nova partida', 'Start new game'));
  }
  function start(id) {
    if (C.quests[id].kind === 'commit') {
      const mentor = C.guilds[C.quests[id].guild].mentor;
      confirm(say('Assumir esta bandeira?', 'Commit to this guild?'),
        say(`Você apoiará ${mentor}. A adesão será irreversível nesta partida; as outras duas guildas se tornarão adversárias. Seus conflitos de recrutamento já resolvidos serão preservados.`, `You will support ${mentor}. This commitment is permanent for this playthrough; the other two guilds will become rivals. Your resolved recruitment conflicts will be preserved.`),
        () => dispatch({type: 'start', id}), say('Assumir o compromisso', 'Make the commitment'));
    } else if (id === 'gate') {
      confirm(say('Encerrar os recrutamentos?', 'Close recruitment?'),
        say(`Seu time tem ${E.allyCount(game.state)} de 5 aliados. Você pode vencer sozinho. Avançar encerra todos os convites, inclusive os que dependem de Ludos. Volte ao mapa para cuidar das pendências.`, `Your team has ${E.allyCount(game.state)} of 5 allies. You can win alone. Proceeding closes every invitation, including those requiring Ludos. Return to the map to finish any remaining recruitment.`),
        () => dispatch({type: 'start', id}), say('Encerrar e avançar', 'Close recruitment and proceed'));
    } else dispatch({type: 'start', id});
  }
  function openJournal(tab = 'objectives') { if (busy) return; revealAll?.(); journalTab = tab; view = 'journal'; render(); }
  function languagePicker(id) {
    const select = el('select', {id}, el('option', {value: 'en-US'}, 'English'), el('option', {value: 'pt-BR'}, 'Português'));
    select.value = settings.language;
    select.addEventListener('change', () => {
      revealAll?.(); settings.language = select.value; L.setLanguage(select.value); saveSettings();
      const open = menu.open; render(); if (open) openMenu();
      document.getElementById(id)?.focus();
    });
    return el('label', {class: 'setting'}, say('Idioma', 'Language'), select);
  }
  function openMenu() {
    if (busy) return;
    revealAll?.();
    menu.replaceChildren(el('header', {}, el('h2', {id: 'menu-title'}, 'Terminus'), button(say('Voltar ao jogo', 'Return to game'), () => menu.close(), {id: 'menu-close', 'data-sound': 'cancel'})));
    const commands = el('div', {class: 'menu-actions'});
    if (game) commands.append(
      button(say('Diário', 'Journal'), () => { menu.close(); openJournal(); }),
      button(say('Exportar partida', 'Export save'), download),
    );
    commands.append(button(say('Importar partida', 'Import save'), () => document.querySelector('#import-file').click()),
      button(say('Nova partida', 'New game'), () => { menu.close(); newGame(); }),
      button(say('Como jogar', 'How to play'), () => { menu.close(); view = 'help'; render(); }),
      button(say('Tela inicial', 'Title screen'), () => { menu.close(); view = 'title'; render(); }));
    const speed = el('select', {id: 'text-speed'},
      ...[['slow', say('Lenta', 'Slow')], ['normal', say('Normal', 'Normal')], ['fast', say('Rápida', 'Fast')], ['instant', say('Instantânea', 'Instant')]].map(([value, label]) => el('option', {value}, label)));
    speed.value = settings.speed;
    speed.onchange = () => { settings.speed = speed.value; saveSettings(); };
    const motion = el('input', {id: 'reduce-motion', type: 'checkbox'}); motion.checked = reduced();
    motion.disabled = media.matches;
    motion.onchange = () => { settings.reduced = motion.checked; saveSettings(); document.body.dataset.reduced = String(reduced()); };
    const soundToggle = el('input', {id: 'sound', type: 'checkbox'}); soundToggle.checked = settings.sound;
    soundToggle.onchange = () => { settings.sound = soundToggle.checked; audio.configure(settings); if (settings.sound) { audio.unlock(); sound('confirm'); } saveSettings(); };
    const volume = el('input', {id: 'volume', type: 'range', min: '0', max: '1', step: '.05', value: settings.volume});
    volume.oninput = () => { settings.volume = Number(volume.value); audio.configure(settings); saveSettings(); };
    volume.onchange = () => sound('confirm');
    const musicVolume = el('input', {id: 'music-volume', type: 'range', min: '0', max: '1', step: '.05', value: settings.musicVolume});
    musicVolume.oninput = () => { settings.musicVolume = Number(musicVolume.value); audio.configure(settings); saveSettings(); };
    menu.append(commands, languagePicker('language'), el('label', {class: 'setting'}, say('Velocidade do texto', 'Text speed'), speed),
      el('label', {class: 'setting'}, motion, say('Reduzir movimento', 'Reduce motion')),
      el('label', {class: 'setting'}, soundToggle, say('Som ativado', 'Sound enabled')),
      el('label', {class: 'setting'}, say('Volume dos efeitos', 'Effects volume'), volume),
      el('label', {class: 'setting'}, say('Volume da música', 'Music volume'), musicVolume));
    menu.showModal();
  }
  function hud() {
    const node = document.querySelector('#hud'); node.replaceChildren();
    if (game && view !== 'title') node.append(el('span', {class: 'resources'}, `${game.state.ludos} Ludos · ${game.state.rerolls} ${say('cargas', 'rerolls')}`), button(say('Diário', 'Journal'), () => openJournal(), {id: 'journal-button'}));
    node.append(button(say('Menu', 'Menu'), openMenu, {id: 'menu-button', 'aria-haspopup': 'dialog', 'aria-controls': 'menu'}));
  }
  function title() {
    main.className = 'title-screen';
    main.append(image('bg-coreto', 'scene-background'));
    const actions = el('div', {class: 'title-actions'});
    if (game) actions.append(button(say('Continuar a história', 'Continue the story'), () => { view = 'play'; restored = true; render(); }, {class: 'primary', id: 'continue-game'}));
    actions.append(button(say('Começar a história', 'Begin the story'), newGame, {class: game ? '' : 'primary', id: 'start-game'}),
      button(say('Importar partida', 'Import save'), () => document.querySelector('#import-file').click()));
    main.append(el('section', {class: 'title-copy'}, el('p', {class: 'eyebrow'}, say('A Noite da História', 'Story Night')),
      el('h1', {}, 'Terminus'), el('p', {class: 'tagline'}, say('Uma cidade. Três bandeiras. Seu caminho.', 'One city. Three banners. Your own way.')),
      actions, languagePicker('title-language')), el('p', {class: 'studio'}, 'Coreto Studio'));
  }
  function background(id) { main.append(image(id, 'scene-background')); }
  function renderPortrait(id, className = '') {
    if (!id) return null;
    const asset = A.assets[id];
    return el('figure', {class: `portrait ${asset.owner === 'Ghork' ? 'speaker-ghork' : ''} ${className}`}, image(id, '', asset.owner));
  }
  function scene() {
    const pg = E.page(game.state), p = pg.passage;
    const narrated = p.type === 'description' || p.type === 'action';
    main.className = `scene-screen ${narrated ? 'describing' : ''}`;
    main.dataset.passage = p.id;
    background(p.background);
    const changed = previousVisual && previousVisual.background !== p.background;
    if (changed && !restored) {
      main.classList.add(p.era !== previousVisual.era ? 'portal-enter' : 'scene-enter');
      main.append(image(previousVisual.background, 'scene-background outgoing-background'));
    }
    if (!changed && !restored && previousVisual?.bust && p.bust !== previousVisual.bust) {
      const outgoing = renderPortrait(previousVisual.bust, 'portrait-out');
      outgoing.setAttribute('aria-hidden', 'true'); main.append(outgoing);
    }
    const portrait = renderPortrait(p.bust, !restored && p.bust !== previousVisual?.bust ? (previousVisual?.speaker === p.speaker ? 'expression-change' : 'enter-portrait') : '');
    if (portrait) main.append(portrait);
    if (p.object) main.append(el('div', {class: `scene-object ${p.operation === 'give' && !restored && p.id !== previousVisual?.id ? 'handover' : ''}`, 'data-recipient': p.recipient === 'Ghork' ? 'left' : 'right'}, image(p.object, '', A.assets[p.object].name)));
    const panel = el('article', {class: narrated ? 'description-panel' : 'dialogue-panel'});
    if (p.type === 'dialogue' || p.type === 'thought') panel.append(el('h1', {class: 'speaker-plate'}, p.speaker + (p.type === 'thought' ? say(' · pensamento', ' · thought') : '')));
    else panel.append(el('h1', {class: 'sr-only'}, pg.title));
    const paragraph = el('p', {class: 'passage-text'});
    const fullText = text(p.text);
    const animated = el('span', {'aria-hidden': 'true'}, fullText);
    paragraph.append(el('span', {class: 'sr-only'}, fullText), animated);
    panel.append(paragraph);
    const controls = el('div', {class: 'reading-controls'}), choices = el('div', {class: 'choices', 'aria-label': say('Escolhas da cena', 'Scene choices')});
    const advance = button(say('Continuar', 'Continue'), () => {
      if (revealAll) { revealAll(); return; }
      dispatch({type: 'advance'});
    }, {class: 'advance primary', 'data-advance': true});
    for (const choice of pg.choices) {
      const b = button(choice.label, () => dispatch({type: 'choose', index: choice.index}), {'data-choice': choice.index, disabled: !choice.affordable});
      if (choice.cost) b.append(el('small', {}, `${choice.cost} Ludo · ${choice.affordable ? say('intervenção', 'intervention') : say('saldo insuficiente', 'not enough Ludos')}`));
      choices.append(b);
    }
    controls.append(advance);
    if (pg.choices.length) controls.append(choices);
    if (pg.canDefer) controls.append(button(say('Decidir depois', 'Decide later'), () => dispatch({type: 'defer'}), {class: 'defer'}));
    panel.append(controls); main.append(panel);
    const passageKey = JSON.stringify([p.id, p.text]);
    const finish = () => {
      clearInterval(revealTimer); revealTimer = null; revealAll = null;
      panel.dataset.revealing = 'false';
      animated.textContent = fullText; choices.hidden = false; advance.hidden = pg.choices.length > 0;
      advance.textContent = say('Continuar', 'Continue'); revealedPassage = passageKey;
    };
    if (['dialogue', 'thought'].includes(p.type) && settings.speed !== 'instant' && !reduced() && !restored && revealedPassage !== passageKey) {
      const parts = [...new Intl.Segmenter(L.getLanguage(), {granularity: 'grapheme'}).segment(fullText)].map(part => part.segment);
      let count = 0; const began = performance.now(), rate = {slow: 20, normal: 35, fast: 60}[settings.speed];
      animated.textContent = ''; choices.hidden = true; advance.textContent = say('Revelar texto', 'Reveal text');
      panel.dataset.revealing = 'true';
      revealAll = finish;
      revealTimer = setInterval(() => {
        if (document.hidden || menu.open || modal.open) return;
        count = Math.min(parts.length, Math.floor((performance.now() - began) / 1000 * rate));
        animated.textContent = parts.slice(0, count).join('');
        if (count === parts.length) finish();
      }, 25);
    } else finish();
    previousVisual = p; restored = false;
  }
  function walk(location) {
    if (busy) return;
    const pawn = main.querySelector('.travel-pawn');
    if (!pawn) { dispatch({type: 'visit', location, scroll: 0}); return; }
    busy = true;
    const job = FX.travel(pawn, lastPlace, location, {reduced: reduced(), onStep: () => sound('step')});
    travel = job; skip.hidden = reduced(); skip.textContent = say('Chegar ao destino', 'Arrive now'); skip.onclick = () => job.finish();
    job.finished.then(() => {
      if (travel !== job) return;
      travel = null; busy = false; skip.hidden = true; skip.onclick = null;
      lastPlace = location; dispatch({type: 'visit', location, scroll: 0});
    });
  }
  function map() {
    main.className = 'map-screen';
    main.append(TerminusMapView.render({state: game.state, reduced: reduced(), selected: mapFocus || game.state.map.focus,
      focusOnReady: !!mapFocus, onVisit: walk,
      onPortal: () => {
        if (busy) return;
        effects.append(el('div', {class: 'portal-flash'})); sound('portal'); sequence(450, () => start('coreto'));
      },
      onFocus: focus => {
        if (busy || focus === game.state.map.focus) return;
        game.dispatch({type: 'mapPosition', scroll: 0, focus}); save();
      },
    }));
    const layer = el('div', {class: 'travel-layer', 'aria-hidden': 'true'}), pawn = el('div', {class: 'travel-pawn'});
    const [x, y] = FX.route(lastPlace, lastPlace).at(-1);
    pawn.style.backgroundImage = `url("${FX.spriteSource}")`;
    pawn.style.backgroundPosition = '-40px 0';
    pawn.style.transform = `translate(${x - 20}px, ${y - 52}px)`;
    layer.append(pawn); main.querySelector('#viewport').append(layer); mapFocus = null;
  }
  function recruitment(parent) {
    const s = game.state, activities = E.locationActivities(s, s.location);
    C.pairs.forEach((pair, i) => {
      if (C.recruitPlaces[i] !== s.location) return;
      const r = s.recruits[i], status = E.recruitStatus(s, i);
      if (!status.opened && !status.outcome) return;
      const section = el('section', {class: 'recruit-item'}, el('h2', {}, pair.title), el('p', {}, status.reason));
      const invitation = activities.find(a => a.id === `invite${i}`), intervention = activities.find(a => a.id === `unlock${i}`);
      if (invitation?.available) section.append(button(say(`Convidar ${r.name}`, `Invite ${r.name}`), () => dispatch({type: 'invite', index: i})));
      if (intervention) section.append(button(say('Pedir exceção · 3 Ludos', 'Ask for an exception · 3 Ludos'), () => {
        confirm(say('Intervir na história?', 'Change the story?'), say('Rheed pode encaixar uma ajuda que não tinha contado. O pedido custa 3 Ludos e libera o acesso; o convite continua opcional.', 'Rheed can work in some help he had not mentioned. This costs 3 Ludos and opens access; the invitation remains optional.'), () => dispatch({type: 'unlock', index: i}), say('Gastar 3 Ludos', 'Spend 3 Ludos'));
      }, {disabled: !intervention.available}));
      parent.append(section);
    });
  }
  function location() {
    const s = game.state;
    if (!s.completed.includes('gA1')) {
      main.className = 'location-screen'; background('bg-virmura-sede');
      main.append(el('section', {class: 'location-panel'}, el('h1', {}, say('O começo em Terminus', 'A beginning in Terminus')),
        ...E.primary(s).map(id => button(C.quests[id].title, () => start(id), {class: 'primary'}))));
      return;
    }
    if (!s.location) { map(); return; }
    main.className = 'location-screen';
    if (s.location === 'coreto') {
      main.classList.add('coreto-visit');
      background('bg-coreto'); main.append(renderPortrait(A.portrait('Rheed', 'feliz')));
      main.append(el('section', {class: 'location-panel'}, el('p', {class: 'eyebrow'}, say('A Noite da História', 'Story Night')),
        el('h1', {}, say('Um intervalo com Rheed', 'A moment with Rheed')),
        el('p', {}, say('Guarde uma nova chance para quando o dado não ajudar.', 'Keep another chance for when the die lets you down.')),
        button(say('Comprar nova rolagem · 1 Ludo', 'Buy a reroll · 1 Ludo'), () => dispatch({type: 'buyReroll'}), {class: 'primary', disabled: !s.ludos}),
        button(say('Voltar a Terminus', 'Return to Terminus'), () => dispatch({type: 'leaveCoreto'}))));
      return;
    }
    const place = C.places[s.location]; background('bg-' + place[1]);
    const panel = el('section', {class: 'location-panel'}, el('p', {class: 'eyebrow'}, arcNames[s.stage]), el('h1', {}, place[0]));
    const activities = E.locationActivities(s, s.location), list = el('div', {class: 'activities'});
    for (const activity of activities.filter(a => a.action.type === 'start'))
      list.append(button(activity.label, () => start(activity.id), {disabled: !activity.available}));
    if (activities.some(a => a.id === 'rematch' && a.available)) list.append(button(say('Tentar revanche gratuita', 'Try a free rematch'), () => dispatch({type: 'rematch'}), {class: 'primary'}));
    if (!activities.some(a => a.available)) list.append(el('p', {}, say('Nenhuma atividade disponível agora. Consulte seu diário para escolher o próximo destino.', 'No activities available here right now. Check your journal for your next destination.')));
    panel.append(list); recruitment(panel);
    panel.append(button(say('Voltar ao mapa', 'Return to map'), () => dispatch({type: 'map'}), {class: 'back-map', 'data-sound': 'cancel'})); main.append(panel);
  }
  function battle() {
    const s = game.state, b = s.battle, q = C.quests[b.index === null ? `g${b.id}` : `fight${b.index}`];
    main.className = 'battle-screen'; background(b.id === 'B4' ? 'bg-mercado' : b.id === 't5' ? 'bg-coliseu-servico' : 'bg-coliseu-arena');
    main.append(el('header', {class: 'battle-header'}, el('p', {class: 'eyebrow'}, say('Confronto', 'Encounter')), el('h1', {}, q.title)));
    const roster = FX.battleRoster(s, C);
    for (const side of ['allies', 'enemies']) {
      const team = el('div', {class: `formation ${side}`, 'aria-label': side === 'allies' ? say('Seu time', 'Your team') : say('Adversários', 'Opponents')});
      for (const member of roster[side]) {
        const figure = el('figure', {class: `fighter ${member.collective ? 'collective' : ''}`}, el('figcaption', {}, member.label || member.name));
        if (member.name && !member.collective) figure.prepend(image(A.portrait(member.name, member.expression || 'neutro', member.pose || 'base', A.costume(member.name, side === 'allies' ? s : {})), '', member.name));
        team.append(figure);
      }
      main.append(team);
    }
    const console = el('section', {class: 'battle-console'});
    const dice = el('div', {class: 'dice', 'aria-hidden': 'true'}, b.die === null ? '20' : String(b.die));
    const result = el('div', {class: 'battle-math'});
    result.append(el('p', {}, say(`Dificuldade ${b.difficulty} · Aliados +${E.allyCount(s)}`, `Difficulty ${b.difficulty} · Allies +${E.allyCount(s)}`)));
    if (b.die !== null) result.append(el('p', {class: 'dice-result', role: 'status'}, `${b.die} + ${E.allyCount(s)} = ${b.total} · ${b.status === 'won' ? say('Vitória', 'Victory') : b.total === b.difficulty ? say('Empate — revés', 'Tie — setback') : say('Revés', 'Setback')}`));
    else result.append(el('p', {}, say('Supere a dificuldade. Empate é revés.', 'Beat the difficulty. A tie is a setback.')));
    const actions = el('div', {class: 'actions'});
    if (b.status === 'ready') actions.append(button(say('Rolar o D20', 'Roll the D20'), () => dispatch({type: 'roll'}), {id: 'roll-die', 'data-sound': 'none', class: 'primary'}));
    if (b.status === 'failed') actions.append(
      button(say(`Usar nova rolagem (${s.rerolls})`, `Use a reroll (${s.rerolls})`), () => dispatch({type: 'roll'}), {id: 'roll-die', 'data-sound': 'none', class: 'primary', disabled: !s.rerolls}),
      button(say('Aceitar revés e preparar revanche', 'Accept setback and prepare a rematch'), () => dispatch({type: 'acceptDefeat'}), {id: 'accept-defeat'}));
    if (b.status === 'won') actions.append(button(say('Ver o resultado da luta', 'See the outcome'), () => dispatch({type: 'acceptVictory'}), {id: 'accept-victory', class: 'primary'}));
    console.append(dice, result, actions); main.append(console);
  }
  function animateBattle() {
    const won = game.state.battle.status === 'won';
    main.classList.add('rolling'); sound('dice');
    main.querySelector('.battle-console .actions').inert = true;
    sequence(650, () => {
      main.classList.remove('rolling'); main.classList.add(won ? 'won' : 'failed');
      main.querySelector(won ? '.formation.allies' : '.formation.enemies').classList.add('attacking');
      main.querySelector(won ? '.formation.enemies' : '.formation.allies').classList.add('hit');
      sound(won ? 'win' : 'fail');
      sequence(400, () => {
        main.querySelector('.battle-console .actions').inert = false;
        main.querySelector('.battle-console .actions button:not(:disabled)')?.focus({preventScroll: true});
      });
    });
  }
  function locate(location) {
    if (E.explorationBlock(game.state)) return;
    if (game.state.location === 'coreto') game.dispatch({type: 'leaveCoreto'});
    if (game.state.location !== null) { lastPlace = game.state.location; game.dispatch({type: 'map'}); }
    game.dispatch({type: 'mapPosition', scroll: 0, focus: location}); save(); mapFocus = location; view = 'play'; render();
  }
  function journal() {
    main.className = 'journal-screen';
    main.append(el('header', {class: 'journal-heading'}, el('p', {class: 'eyebrow'}, 'Terminus'), el('h1', {}, say('Diário de Ghork', 'Ghork’s journal')),
      button(say('Retomar a história', 'Return to the story'), () => { view = 'play'; restored = true; render(); }, {id: 'journal-close'})));
    const tabs = el('div', {class: 'tabs', role: 'tablist', 'aria-label': say('Diário', 'Journal')});
    const names = [['objectives', say('Objetivos', 'Objectives')], ['items', say('Itens', 'Items')], ['team', say('Equipe', 'Team')], ['history', say('Histórico', 'History')]];
    for (const [id, name] of names) tabs.append(button(name, () => { journalTab = id; render(); document.querySelector(`[data-tab="${id}"]`).focus(); },
      {id: `tab-${id}`, role: 'tab', 'data-tab': id, 'aria-selected': String(id === journalTab), 'aria-controls': 'journal-content', tabindex: id === journalTab ? '0' : '-1'}));
    tabs.onkeydown = event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); const current = names.findIndex(([id]) => id === journalTab);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (current + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
      tabs.children[next].click();
    };
    const content = el('section', {id: 'journal-content', class: 'journal-content', role: 'tabpanel', 'aria-labelledby': `tab-${journalTab}`, tabindex: '0'}), s = game.state;
    if (journalTab === 'objectives') {
      const objectives = E.objectives(s);
      if (s.battle) content.append(el('p', {}, say('Conclua o confronto em andamento.', 'Finish the current encounter.')));
      if (s.rematch) content.append(el('p', {}, say('Sua revanche gratuita está disponível.', 'Your free rematch is available.')));
      for (const o of objectives) {
        const block = E.explorationBlock(s) || (s.rematch === 't5' && o.location !== 'coliseu' ? say('A invasão continua no coliseu.', 'The invasion continues at the coliseum.') : '');
        content.append(el('article', {class: 'objective'}, el('h2', {}, o.title), el('p', {}, o.task), el('small', {}, o.place),
          button(say('Localizar no mapa', 'Locate on map'), () => locate(o.location), {'data-locate': o.location, disabled: !!block || !C.places[o.location]}), block ? el('p', {class: 'muted'}, block) : null));
      }
      if (!objectives.length && !s.battle && !s.rematch) content.append(el('p', {}, say('Nenhum objetivo pendente agora.', 'No pending objectives right now.')));
    } else if (journalTab === 'items') {
      const items = Object.keys(s.items);
      if (!items.length) content.append(el('p', {}, say('Nenhum item de missão em posse.', 'No quest items in your possession.')));
      for (const id of items) content.append(el('figure', {class: 'journal-item'}, image(`quest-${id}`, '', ''), el('figcaption', {}, E.itemName(id))));
    } else if (journalTab === 'team') {
      const allies = s.recruits.filter(r => r.invited);
      content.append(el('p', {}, say(`${allies.length} de 5 aliados · bônus +${allies.length}`, `${allies.length} of 5 allies · bonus +${allies.length}`)));
      for (const r of allies) content.append(el('figure', {class: 'journal-member'}, image(A.portrait(r.name, 'neutro', 'base', A.costume(r.name, s)), '', r.name), el('figcaption', {}, r.name)));
      if (!allies.length) content.append(el('p', {}, say('Ghork segue sozinho. Recrutar é opcional.', 'Ghork travels alone. Recruiting allies is optional.')));
      for (let i = 0; i < s.recruits.length; i++) {
        const r = s.recruits[i], status = E.recruitStatus(s, i);
        if (!r.invited && (status.opened || status.outcome)) content.append(el('p', {}, text(C.pairs[i].title) + ' · ' + text(status.reason)));
      }
    } else content.append(el('ol', {class: 'history'}, ...s.history.map(entry => el('li', {}, entry))));
    main.append(tabs, content);
  }
  function ending() {
    main.className = 'end-screen'; background('bg-coreto');
    const s = game.state;
    main.append(el('section', {class: 'end-summary'}, el('p', {class: 'eyebrow'}, say('História concluída', 'Story complete')), el('h1', {}, say('Por hoje, ficamos aqui.', 'That is our story for tonight.')),
      el('p', {}, say(`Ghork conquistou o campeonato pela guilda ${text(C.guilds[s.guild].name)} e derrotou a operação de Neral.`, `Ghork won the championship for ${text(C.guilds[s.guild].name)} and defeated Neral’s operation.`)),
      el('p', {}, s.recruits.filter(r => r.invited).map(r => r.name).join(' · ') || say('Ghork lutou sozinho.', 'Ghork fought alone.')),
      el('div', {class: 'actions'}, button(say('Rever minhas escolhas', 'Revisit my choices'), () => openJournal('history'), {class: 'primary'}), button(say('Exportar partida', 'Export save'), download), button(say('Começar outra história', 'Begin another story'), newGame)),
      el('p', {class: 'studio'}, 'Coreto Studio')));
  }
  function help() {
    main.className = 'help-screen';
    main.append(el('h1', {}, say('Como jogar', 'How to play')),
      ...[
        say('Clique ou use Enter/Espaço para revelar uma fala; avance novamente para continuar. Escolhas aparecem ao terminar o texto.', 'Click or use Enter/Space to reveal a line; advance again to continue. Choices appear when the text is complete.'),
        say('No mapa, clique em um destino para visitar. No toque, selecione e toque novamente. Tab e setas percorrem os destinos; Enter confirma. A caminhada pode ser abreviada.', 'On the map, click a destination to visit. On touch, select it, then tap again. Tab and arrow keys move between destinations; Enter confirms. Walking can be skipped.'),
        say('O diário guarda objetivos, itens, equipe e decisões. Localizar destaca um destino sem visitá-lo. O portal permite visitar Rheed entre cenas e batalhas.', 'Your journal keeps objectives, items, your team and decisions. Locate highlights a destination without visiting it. The portal takes you to Rheed between scenes and encounters.'),
        say('Vença com D20 + aliados maior que a dificuldade. Empate é revés. Cargas compradas com Rheed permitem rolar novamente; aceitar o revés permite uma revanche gratuita. Recrutar é opcional.', 'Win when D20 + allies is greater than the difficulty. A tie is a setback. Rerolls bought from Rheed let you roll again; accepting a setback allows a free rematch. Recruitment is optional.'),
        say('O progresso é salvo automaticamente neste navegador. Exporte a partida para guardar uma cópia ou continuar em outro navegador. Opções de leitura, movimento e som ficam no menu.', 'Progress saves automatically in this browser. Export your save to keep a copy or continue in another browser. Reading, motion and sound settings are in the menu.'),
      ].map(p => el('p', {}, p)), button(say('Voltar à história', 'Return to the story'), () => { view = game ? 'play' : 'title'; restored = true; render(); }));
  }
  function render() {
    cancelPresentation(); menu.close();
    document.documentElement.lang = L.getLanguage(); document.body.dataset.reduced = String(reduced());
    main.replaceChildren(); main.className = ''; delete main.dataset.passage;
    hud();
    if (view === 'title') title();
    else if (view === 'journal' && game) journal();
    else if (view === 'help') help();
    else if (game?.state.scene) scene();
    else if (game?.state.battle) battle();
    else if (game?.state.stage === 4) ending();
    else if (game) location();
    else title();
    if (view !== 'journal' && view !== 'help') audio.setTrack(TerminusAudio.track(view, game?.state, game?.state.scene ? E.page(game.state).passage : null));
    resize(); main.focus({preventScroll: true});
  }
  function resize() {
    const noticeNode = document.querySelector('#notice');
    const height = innerHeight - (noticeNode.hidden ? 0 : noticeNode.offsetHeight);
    const width = Math.min(innerWidth, height * 16 / 9);
    document.documentElement.style.setProperty('--frame-width', width + 'px');
    document.documentElement.style.setProperty('--frame-height', width * 9 / 16 + 'px');
    document.documentElement.style.setProperty('--map-scale', width / 1280);
    const blocked = innerHeight > innerWidth || width < 512;
    const frame = document.querySelector('#game-frame'), orientation = document.querySelector('#orientation');
    frame.hidden = blocked; frame.inert = blocked; orientation.hidden = !blocked;
    orientation.textContent = say('Jogue na horizontal. Gire o dispositivo ou amplie a janela para continuar.', 'Play in landscape. Rotate your device or enlarge the window to continue.');
    if (blocked) { menu.close(); modal.close(); }
  }
  document.querySelector('#import-file').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      if (file.size > 2000000) throw new Error(say('Escolha uma partida exportada de até 2 MB.', 'Choose an exported save of up to 2 MB.'));
      const imported = E.restore(JSON.parse(await file.text()));
      confirm(say('Usar a partida importada?', 'Use the imported save?'), say('A partida desta edição será substituída. O progresso do protótipo permanece separado.', 'This edition’s save will be replaced. Prototype progress stays separate.'), () => {
        game = imported; save(); restorePosition();
        restored = true; previousVisual = null; revealedPassage = null; view = 'play'; render();
      }, say('Usar esta partida', 'Use this save'));
    } catch { notice(say('Não foi possível importar esta partida. Escolha um arquivo exportado pelo jogo; seu progresso atual foi preservado.', 'This save could not be imported. Choose a file exported by the game; your current progress is unchanged.'), true); }
    finally { event.target.value = ''; }
  });
  document.addEventListener('keydown', event => {
    if (!['Enter', ' '].includes(event.key)) return;
    if (event.repeat) { event.preventDefault(); return; }
    if (modal.open || menu.open || document.querySelector('#game-frame').inert) return;
    if (busy) { event.preventDefault(); skip.onclick?.(); return; }
    if (event.target === main || event.target.closest('.passage-text')) { event.preventDefault(); main.querySelector('.advance:not([hidden])')?.click(); }
  });
  for (const event of ['pointerdown', 'keydown']) document.addEventListener(event, () => { if (settings.sound) audio.unlock(); }, {capture: true});
  media.addEventListener('change', () => { revealAll?.(); if (busy) skip.onclick?.(); document.body.dataset.reduced = String(reduced()); });
  document.addEventListener('visibilitychange', () => audio.visibility(document.hidden));
  window.addEventListener('resize', resize);
  window.addEventListener('pagehide', () => { cancelPresentation(); audio.dispose(); });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    audio = TerminusAudio.createAudio(); audio.configure(settings); audio.visibility(document.hidden); restored = true; render();
  });
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS) || 'null');
    if (stored) {
      if (['en-US', 'pt-BR'].includes(stored.language)) settings.language = stored.language;
      if (['slow', 'normal', 'fast', 'instant'].includes(stored.speed)) settings.speed = stored.speed;
      if (typeof stored.reduced === 'boolean') settings.reduced = stored.reduced;
      if (Number.isFinite(stored.musicVolume) && stored.musicVolume >= 0 && stored.musicVolume <= 1) settings.musicVolume = stored.musicVolume;
      if (typeof stored.sound === 'boolean') settings.sound = stored.sound;
      if (Number.isFinite(stored.volume) && stored.volume >= 0 && stored.volume <= 1) settings.volume = stored.volume;
    }
  } catch { notice(say('Não foi possível ler as opções salvas. As opções padrão estão ativas.', 'Saved settings could not be read. Default settings are active.'), true); }
  audio.configure(settings);
  audio.visibility(document.hidden);
  L.setLanguage(settings.language);
  try { const saved = localStorage.getItem(KEY); if (saved) { game = E.restore(JSON.parse(saved)); restorePosition(); } }
  catch { notice(say('A partida salva não pôde ser aberta. Importe uma cópia ou inicie outra história. O arquivo anterior foi preservado.', 'The saved game could not be opened. Import a copy or begin another story. The previous file was preserved.'), true); }
  render();
})();
