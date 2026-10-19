'use strict';
globalThis.TerminusMapView = { render({state, onVisit, onPortal, onFocus, reduced = false, preview = false, focusOnReady = false, selected = null}) {
  const map = window.TERMINUS_MAP;
  const L = TerminusLanguage;
  const stage = document.createElement('section');
  stage.className = 'city-map' + (reduced ? ' reduce-motion' : '');
  stage.setAttribute('aria-label', 'Mapa de Terminus');
  stage.innerHTML = `
      <h1 class="sr-only">Mapa da cidade de Terminus</h1>
      <section id="city" aria-label="Destinos da cidade">
        <div id="viewport">
          <img id="terrain" alt="" draggable="false" width="1280" height="720">
          <div id="destinations"></div>
        </div>
        <div id="portal-anchor"></div>
        <aside id="load-panel" class="map-notice" aria-live="polite">
          <h2 id="load-title">Preparando a cidade</h2>
          <p id="load-message">Carregando a cidade e as fachadas…</p>
          <button id="retry-city" class="primary" hidden>Carregar novamente</button>
        </aside>
        <footer class="destination-bar" aria-live="polite" aria-atomic="true">
          <p id="empty-selection">Escolha seu próximo destino</p>
          <div id="selection-copy" hidden>
            <h2 id="destination-name"></h2>
            <p id="destination-detail"></p>
          </div>
        <button type="button" id="map-legend-button">Legenda</button></footer>
      </section>
      <svg class="clip-definitions" aria-hidden="true">
        <defs id="hit-shapes">
          <symbol id="bootprints" viewBox="0 0 40 32">
            <g fill="currentColor" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round">
              <path d="M7 17C4 13 5 7 8 4C10 2 14 3 15 7L17 16L13 20Z"/>
              <path d="M9 20L14 22L12 28L6 26Z"/>
              <path d="M25 10C24 6 27 2 30 2C34 2 36 6 35 10L32 19L26 17Z"/>
              <path d="M26 20L32 22L30 28L24 26Z"/>
            </g>
          </symbol>
        </defs>
      </svg>
    `;
  const $ = id => stage.querySelector('#' + id);
  const summary = document.createElement('div');
  summary.className = 'map-legend';
  summary.hidden = true;
  summary.setAttribute('role', 'region');
  summary.setAttribute('aria-label', 'Legenda do mapa');
  const icons = {mission: ['Quest', 'Missão ou revanche'], invite: ['Formation', 'Convite'], intervention: ['Coin', 'Intervenção com Ludos']};
  for (const [icon, label] of Object.values(icons)) {
    const entry = document.createElement('span');
    const image = document.createElement('img');
    image.src = '../../../tools/terminus-ui/icons/' + icon + '.svg';
    image.alt = '';
    entry.append(image, label);
    summary.append(entry);
  }
  stage.append(summary);
  $('map-legend-button').setAttribute('aria-expanded', 'false');
  $('map-legend-button').addEventListener('click', () => {
    summary.hidden = !summary.hidden;
    $('map-legend-button').setAttribute('aria-expanded', String(!summary.hidden));
  });
  const places = new Map();
  let retained = null;
  let hovered = null;
  let keyboardSelection = false;
  let pointerInput = false;
  let ready = false;
  let gesture = null;
  let suppressClick = false;
  let touchHandled = false;
  let touchArmed = null;
  const activities = new Map(map.destinations.map(place => [place.id, preview || place.fixed ? [] : TerminusEngine.locationActivities(state, place.id).filter(a => a.available)]));
  const permitted = place => preview || state.rematch !== 't5' || place.id === 'coliseu';

  function renderSelection() {
    const active = hovered || retained;
    const mode = hovered ? 'hover' : 'selected';
    for (const entry of places.values()) {
      if (entry.place === active) entry.wrapper.dataset.state = mode;
      else delete entry.wrapper.dataset.state;
      entry.wrapper.dataset.keyboard = String(entry.place === active && !hovered && keyboardSelection);
      entry.button.setAttribute('aria-pressed', String(entry.place === active));
    }
    $('empty-selection').hidden = !!active;
    $('selection-copy').hidden = !active;
    $('destination-name').textContent = active ? L.text(active.name) : '';
    const entries = active ? activities.get(active.id) : [];
    $('destination-detail').textContent = !active ? '' : active.fixed ? L.text('Visitar a Noite da História') : !permitted(active) ? L.text('A invasão continua. Retorne ao coliseu.') : entries.length ? `${entries.length} ${L.text(entries.length === 1 ? 'ação disponível' : 'ações disponíveis')} · ${L.text(entries[0].label)}${entries.length > 1 ? ' · ' + L.text(`e mais ${entries.length - 1}`) : ''}` : L.text('Sem atividade disponível agora');
  }

  function retain(place, keyboard = false) {
    retained = place;
    hovered = null;
    keyboardSelection = keyboard;
    renderSelection();
    if (!preview && !place.fixed) onFocus(place.id);
  }

  function clearSelection() {
    retained = null;
    hovered = null;
    keyboardSelection = false;
    touchArmed = null;
    if (document.activeElement.matches('.destination-button')) document.activeElement.blur();
    renderSelection();
  }

  function createLandmark(place) {
    const wrapper = document.createElement('div');
    wrapper.className = 'landmark';
    wrapper.dataset.id = place.id;
    Object.assign(wrapper.style, {left: place.x + 'px', top: place.y + 'px', width: place.width + 'px', height: place.height + 'px'});
    const image = document.createElement('img');
    image.className = 'facade';
    image.alt = '';
    image.draggable = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'destination-button ' + (place.fixed ? 'portal-button' : 'landmark-button');
    button.disabled = true;
    button.id = 'destination-' + place.id;
    button.dataset.destination = place.id;
    const pending = activities.get(place.id);
    button.setAttribute('aria-label', L.text(place.name) + (pending.length ? ' · ' + pending.map(a => L.text(a.label)).join('; ') : ''));
    if (!permitted(place)) button.setAttribute('aria-label', L.text(place.name) + ' · ' + L.text('Indisponível durante a invasão'));
    let shadow = null;
    if (place.fixed) {
      const label = document.createElement('span');
      label.textContent = 'Retornar ao Coreto';
      button.append(image, label);
      wrapper.append(button);
      wrapper.style.left = wrapper.style.top = '0px';
      $('portal-anchor').append(wrapper);
    } else {
      shadow = document.createElement('img');
      shadow.className = 'cast-shadow';
      shadow.alt = '';
      shadow.draggable = false;
      wrapper.append(shadow, image, button);
      $('destinations').append(wrapper);
      button.style.clipPath = 'url(#hit-' + place.id + ')';
      const ns = 'http://www.w3.org/2000/svg';
      const clip = document.createElementNS(ns, 'clipPath');
      clip.id = 'hit-' + place.id;
      clip.setAttribute('clipPathUnits', 'objectBoundingBox');
      const path = document.createElementNS(ns, 'path');
      const n = map.hitGrid;
      path.setAttribute('d', place.hitRows.flatMap((runs, y) => runs.map(([a, b]) =>
        'M' + a / n + ',' + y / n + 'H' + b / n + 'V' + (y + 1) / n + 'H' + a / n + 'Z')).join(''));
      clip.append(path);
      $('hit-shapes').append(clip);
    }
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    marker.classList.add('landmark-marker');
    marker.setAttribute('aria-hidden', 'true');
    marker.innerHTML = '<use href="#bootprints"/>';
    wrapper.append(marker);
    if (pending.length) {
      const badges = document.createElement('div');
      badges.className = 'quest-markers';
      badges.setAttribute('aria-hidden', 'true');
      for (const [category, [icon]] of Object.entries(icons)) {
        const count = pending.filter(a => a.category === category).length;
        if (!count) continue;
        const badge = document.createElement('span');
        badge.dataset.category = category;
        const image = document.createElement('img');
        image.alt = '';
        image.src = '../../../tools/terminus-ui/icons/' + icon + '.svg';
        badge.append(image);
        if (count > 1) badge.append(String(count));
        badges.append(badge);
      }
      wrapper.append(badges);
    }
    button.addEventListener('pointermove', event => {
      if (event.pointerType !== 'touch' && !gesture && hovered !== place) {
        hovered = place;
        renderSelection();
      }
    });
    button.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch' && hovered === place) {
        hovered = null;
        renderSelection();
      }
    });
    button.addEventListener('focus', () => {
      if (!pointerInput) retain(place, true);
    });
    button.addEventListener('keydown', event => {
      const vectors = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]};
      if (vectors[event.key]) {
        event.preventDefault();
        moveFocus(place, ...vectors[event.key]);
      }
    });
    button.addEventListener('click', event => {
      if (event.detail > 0 && (suppressClick || touchHandled || event.pointerType === 'touch')) return;
      retain(place, event.detail === 0);
      visit(place);
    });
    places.set(place.id, {place, wrapper, image, shadow, button});
  }

  function moveFocus(from, dx, dy) {
    const center = place => {
      const rect = places.get(place.id).wrapper.getBoundingClientRect();
      return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
    };
    const origin = center(from);
    const candidates = map.destinations.filter(place => place !== from && permitted(place)).map(place => {
      const point = center(place);
      const x = point.x - origin.x;
      const y = point.y - origin.y;
      return {place, along: x * dx + y * dy, score: Math.hypot(x, y) + Math.abs(x * dy - y * dx) * 2};
    }).filter(candidate => candidate.along > 1).sort((a, b) => a.score - b.score);
    if (candidates.length) places.get(candidates[0].place.id).button.focus({preventScroll: true});
  }

  function beginGesture(event) {
    if (!ready || event.button !== 0 || !event.isPrimary || event.target.closest('.map-notice, .destination-bar, .map-legend')) return;
    const button = event.target.closest('.destination-button');
    const id = button?.closest('.landmark').dataset.id;
    gesture = {id: event.pointerId, startX: event.clientX, startY: event.clientY,
      place: id && permitted(places.get(id).place) ? places.get(id).place : null, moved: false, type: event.pointerType};
    suppressClick = false;
    touchHandled = false;
  }

  function moveGesture(event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY) > 8 && !gesture.moved) {
      gesture.moved = true;
      suppressClick = true;
      touchArmed = null;
      hovered = null;
      stage.setPointerCapture(event.pointerId);
      renderSelection();
    }
    if (gesture.moved) event.preventDefault();
  }

  function endGesture(event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const ended = gesture;
    gesture = null;
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    if (event.type === 'pointercancel' || ended.moved) {
      touchArmed = null;
      return;
    }
    if (!ended.place) {
      clearSelection();
      return;
    }
    if (ended.type === 'touch') {
      touchHandled = true;
      const open = touchArmed === ended.place.id;
      touchArmed = ended.place.id;
      retain(ended.place);
      if (open) visit(ended.place);
    }
  }

  function loadImage(image, source) {
    return new Promise((resolve, reject) => {
      image.onload = () => { image.onload = null; image.onerror = null; resolve(); };
      image.onerror = () => { image.onload = null; image.onerror = null; reject(new Error(source)); };
      image.src = source;
    });
  }

  async function loadCity() {
    ready = false;
    stage.dataset.ready = 'false';
    $('viewport').inert = true;
    $('portal-anchor').inert = true;
    $('load-panel').hidden = false;
    $('load-title').textContent = L.text('Preparando a cidade');
    $('load-message').textContent = L.text('Carregando a cidade e as fachadas…');
    $('retry-city').hidden = true;
    for (const entry of places.values()) entry.button.disabled = true;
    const assets = [{name: 'Fundo da cidade', image: $('terrain'), file: TerminusArt.assets['map-terrain'].preview},
      ...Array.from(places.values(), entry => ({name: entry.place.name, image: entry.image, file: TerminusArt.assets['map-' + entry.place.id].preview}))];
    const results = await Promise.allSettled(assets.map(asset => loadImage(asset.image, asset.file)));
    if (!stage.isConnected) return;
    const missing = assets.filter((_, index) => results[index].status === 'rejected');
    if (missing.length) {
      $('load-title').textContent = L.text('Não foi possível carregar a cidade');
      $('load-message').textContent = L.text('Imagens ausentes: ' + missing.map(asset => L.text(asset.name)).join(', ') + '. Mantenha a pasta assets junto ao projeto e tente novamente.');
      $('retry-city').hidden = false;
      return;
    }
    for (const entry of places.values()) {
      if (entry.shadow) entry.shadow.src = entry.image.src;
      entry.button.disabled = !permitted(entry.place);
    }
    ready = true;
    stage.dataset.ready = 'true';
    $('viewport').inert = false;
    $('portal-anchor').inert = false;
    const recovering = document.activeElement === $('retry-city');
    $('load-panel').hidden = true;
    renderSelection();
    if (recovering) places.get(map.destinations.find(permitted).id).button.focus({preventScroll: true});
    else if (!preview && selected && places.has(selected)) {
      const previous = places.get(selected);
      if (permitted(previous.place)) {
        retain(previous.place, true);
        if (focusOnReady) previous.button.focus({preventScroll: true});
      }
    }
  }

  function visit(place) {
    if (!ready || !permitted(place)) return;
    touchArmed = null;
    if (place.fixed) onPortal();
    else onVisit(place.id);
  }

  stage.addEventListener('pointerdown', () => { pointerInput = true; }, true);
  stage.addEventListener('keydown', event => {
    pointerInput = false;
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!summary.hidden) { summary.hidden = true; $('map-legend-button').setAttribute('aria-expanded', 'false'); $('map-legend-button').focus(); }
      else clearSelection();
    }
  }, true);
  for (const place of [...map.destinations].sort((a, b) => a.y - b.y || a.x - b.x)) createLandmark(place);
  stage.addEventListener('pointerdown', beginGesture);
  stage.addEventListener('pointermove', moveGesture);
  stage.addEventListener('pointerup', endGesture);
  stage.addEventListener('pointercancel', endGesture);
  $('retry-city').addEventListener('click', loadCity);
  L.localizeMarkup(stage);
  renderSelection();
  loadCity();
  return stage;
}};
