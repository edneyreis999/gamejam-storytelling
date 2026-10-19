(() => {
  'use strict';
  const map = window.TERMINUS_MAP;
  const $ = id => document.getElementById(id);
  const stage = $('stage');
  const preview = $('preview');
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
  let visiting = null;
  let returnFocus = null;
  let currentView = 0;
  let viewRequest = 0;

  function resize() {
    const scale = Math.min(innerWidth / map.width, innerHeight / map.height);
    const blocked = innerHeight > innerWidth || scale < .4;
    document.documentElement.style.setProperty('--scale', scale);
    $('orientation').hidden = !blocked;
    $('frame').hidden = blocked;
    $('frame').inert = blocked;
    if (blocked && preview.open) closePreview();
  }

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
    $('destination-name').textContent = active ? active.name : '';
    $('destination-detail').textContent = active ? active.views.map(view => view.name).join(' · ') : '';
  }

  function retain(place, keyboard = false) {
    retained = place;
    hovered = null;
    keyboardSelection = keyboard;
    renderSelection();
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
    button.setAttribute('aria-label', place.fixed ? 'Retornar ao Coreto' : place.name);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'preview');
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
      visit(place, button);
    });
    places.set(place.id, {place, wrapper, image, shadow, button});
  }

  function moveFocus(from, dx, dy) {
    const center = place => {
      const rect = places.get(place.id).wrapper.getBoundingClientRect();
      return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
    };
    const origin = center(from);
    const candidates = map.destinations.filter(place => place !== from).map(place => {
      const point = center(place);
      const x = point.x - origin.x;
      const y = point.y - origin.y;
      return {place, along: x * dx + y * dy, score: Math.hypot(x, y) + Math.abs(x * dy - y * dx) * 2};
    }).filter(candidate => candidate.along > 1).sort((a, b) => a.score - b.score);
    if (candidates.length) places.get(candidates[0].place.id).button.focus({preventScroll: true});
  }

  function beginGesture(event) {
    if (!ready || event.button !== 0 || !event.isPrimary || event.target.closest('.notice')) return;
    const button = event.target.closest('.destination-button');
    const id = button?.closest('.landmark').dataset.id;
    gesture = {id: event.pointerId, startX: event.clientX, startY: event.clientY,
      place: id ? places.get(id).place : null, moved: false, type: event.pointerType};
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
      if (open) visit(ended.place, places.get(ended.place.id).button);
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
    $('load-title').textContent = 'Preparando a cidade';
    $('load-message').textContent = 'Carregando a cidade e as fachadas…';
    $('retry-city').hidden = true;
    for (const entry of places.values()) entry.button.disabled = true;
    const assets = [{name: 'Fundo da cidade', image: $('terrain'), file: map.background},
      ...Array.from(places.values(), entry => ({name: entry.place.name, image: entry.image, file: entry.place.facade}))];
    const results = await Promise.allSettled(assets.map(asset => loadImage(asset.image, map.artRoot + asset.file)));
    const missing = assets.filter((_, index) => results[index].status === 'rejected');
    if (missing.length) {
      $('load-title').textContent = 'Não foi possível carregar a cidade';
      $('load-message').textContent = 'Imagens ausentes: ' + missing.map(asset => asset.name).join(', ') + '. Mantenha a pasta assets junto ao projeto e tente novamente.';
      $('retry-city').hidden = false;
      return;
    }
    for (const entry of places.values()) {
      if (entry.shadow) entry.shadow.src = entry.image.src;
      entry.button.disabled = false;
    }
    ready = true;
    stage.dataset.ready = 'true';
    $('viewport').inert = false;
    $('portal-anchor').inert = false;
    const recovering = document.activeElement === $('retry-city');
    $('load-panel').hidden = true;
    renderSelection();
    if (recovering) places.get(map.destinations[0].id).button.focus({preventScroll: true});
  }

  function visit(place, trigger) {
    if (!ready || preview.open) return;
    touchArmed = null;
    visiting = place;
    returnFocus = trigger;
    $('preview-title').textContent = place.name;
    $('view-controls').replaceChildren();
    place.views.forEach((view, index) => {
      const button = document.createElement('button');
      button.textContent = view.name;
      button.type = 'button';
      button.addEventListener('click', () => showView(index));
      $('view-controls').append(button);
    });
    preview.showModal();
    $('back').focus({preventScroll: true});
    showView(0);
  }

  async function showView(index) {
    currentView = index;
    const request = ++viewRequest;
    const view = visiting.views[index];
    for (const [i, button] of Array.from($('view-controls').children).entries()) button.setAttribute('aria-pressed', String(i === index));
    $('scene-image').hidden = true;
    $('scene-status').hidden = false;
    $('scene-status').textContent = 'Carregando ' + view.name + '…';
    $('retry-scene').hidden = true;
    const image = new Image();
    try {
      await loadImage(image, map.viewRoot + view.file);
      if (request !== viewRequest || !preview.open) return;
      image.id = 'scene-image';
      image.alt = visiting.name + ' — ' + view.name + ', ilustração em tinta preta e bege';
      $('scene-image').replaceWith(image);
      $('scene-status').textContent = view.name + ' carregado';
      $('scene-status').hidden = true;
    } catch {
      if (request !== viewRequest || !preview.open) return;
      $('scene-status').textContent = 'O fundo “' + view.name + '” não carregou. Confira a pasta assets/terminus/locais e tente novamente, ou volte à cidade.';
      $('retry-scene').hidden = false;
    }
  }

  function closePreview() {
    ++viewRequest;
    preview.close();
    retain(visiting, !pointerInput);
    returnFocus.focus({preventScroll: true});
  }

  document.addEventListener('pointerdown', () => { pointerInput = true; }, true);
  document.addEventListener('keydown', event => {
    pointerInput = false;
    if (event.key === 'Escape' && !preview.open) { event.preventDefault(); clearSelection(); }
  }, true);
  for (const place of map.destinations) createLandmark(place);
  stage.addEventListener('pointerdown', beginGesture);
  stage.addEventListener('pointermove', moveGesture);
  stage.addEventListener('pointerup', endGesture);
  stage.addEventListener('pointercancel', endGesture);
  $('back').addEventListener('click', closePreview);
  preview.addEventListener('cancel', event => { event.preventDefault(); closePreview(); });
  $('retry-city').addEventListener('click', loadCity);
  $('retry-scene').addEventListener('click', () => showView(currentView));
  window.addEventListener('resize', resize);
  resize();
  renderSelection();
  loadCity();
})();
