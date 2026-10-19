(() => {
  'use strict';
  const map = window.TERMINUS_MAP;
  const $ = id => document.getElementById(id);
  const stage = $('stage');
  const viewport = $('viewport');
  const world = $('world');
  const preview = $('preview');
  const places = new Map();
  let camera = 0;
  let scale = 1;
  let visibleWidth = map.viewportWidth;
  let selected = map.destinations[0];
  let selectionMode = 'selected';
  let keyboardSelection = false;
  let pointerInput = false;
  let ready = false;
  let gesture = null;
  let suppressClick = false;
  let touchHandled = false;
  let touchArmed = null;
  let returnFocus = null;
  let currentView = 0;
  let viewRequest = 0;

  function setCamera(value) {
    camera = Math.max(0, Math.min(map.width - visibleWidth, value));
    world.style.transform = `scale(${scale}) translateX(${-camera}px)`;
    $('pan-left').disabled = !ready || camera <= 0;
    $('pan-right').disabled = !ready || camera >= map.width - visibleWidth;
    $('camera-thumb').style.width = `${100 * visibleWidth / map.width}%`;
    $('camera-thumb').style.left = `${100 * camera / map.width}%`;
  }

  function reveal(place) {
    if (place.fixed) return;
    const margin = Math.min(72, visibleWidth / 5);
    if (place.x < camera + margin) setCamera(place.x - margin);
    else if (place.x + place.width > camera + visibleWidth - margin) {
      setCamera(place.x + place.width - visibleWidth + margin);
    }
  }

  function resize() {
    // Narrow screens keep readable landmarks and reveal a smaller slice of the world.
    scale = Math.max(stage.clientWidth / map.viewportWidth, Math.min(1, (stage.clientHeight - 124) / 624));
    if (stage.clientWidth > 760) scale = stage.clientWidth / map.viewportWidth;
    visibleWidth = Math.min(map.width, stage.clientWidth / scale);
    stage.style.setProperty('--scale', scale);
    setCamera(camera);
    if (!preview.open) reveal(selected);
  }

  function select(place, mode = 'selected', keyboard = false) {
    selected = place;
    selectionMode = mode;
    keyboardSelection = keyboard;
    for (const entry of places.values()) {
      const active = entry.place === place;
      if (active) entry.wrapper.dataset.state = mode;
      else delete entry.wrapper.dataset.state;
      entry.wrapper.dataset.keyboard = String(active && keyboard);
      entry.button.setAttribute('aria-pressed', String(active));
    }
    $('destination-name').textContent = place.name;
    $('destination-detail').textContent = place.views.map(view => view.name).join(' · ');
    $('selection-state').textContent = place.fixed ? 'Retornar à narrativa' : 'Destino selecionado';
    $('visit').setAttribute('aria-label', `Visitar ${place.name}`);
  }

  function createLandmark(place) {
    const wrapper = document.createElement('div');
    wrapper.className = 'landmark';
    wrapper.dataset.id = place.id;
    Object.assign(wrapper.style, {left: `${place.x}px`, top: `${place.y}px`, width: `${place.width}px`, height: `${place.height}px`});
    const image = document.createElement('img');
    image.className = 'facade';
    image.alt = '';
    image.draggable = false;
    const button = document.createElement('button');
    button.className = 'landmark-button';
    button.type = 'button';
    button.disabled = true;
    button.setAttribute('aria-label', place.name);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'preview');
    button.style.clipPath = `url(#hit-${place.id})`;
    const marker = document.createElement('span');
    marker.className = 'landmark-marker';
    marker.textContent = '◆';
    marker.setAttribute('aria-hidden', 'true');
    wrapper.append(image, button, marker);
    $(place.fixed ? 'portal-anchor' : 'destinations').append(wrapper);
    const ns = 'http://www.w3.org/2000/svg';
    const clip = document.createElementNS(ns, 'clipPath');
    clip.id = `hit-${place.id}`;
    clip.setAttribute('clipPathUnits', 'objectBoundingBox');
    const path = document.createElementNS(ns, 'path');
    const n = map.hitGrid;
    path.setAttribute('d', place.hitRows.flatMap((runs, y) => runs.map(([a, b]) =>
      `M${a / n},${y / n}H${b / n}V${(y + 1) / n}H${a / n}Z`)).join(''));
    clip.append(path);
    $('hit-shapes').append(clip);
    button.addEventListener('pointermove', event => {
      if (event.pointerType !== 'touch' && !gesture && (event.movementX || event.movementY)) select(place, 'hover');
    });
    button.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch' && selected === place && selectionMode === 'hover') select(place);
    });
    button.addEventListener('focus', () => {
      if (!pointerInput) { select(place, 'selected', true); reveal(place); }
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
      select(place, 'selected', event.detail === 0);
      visit(button);
    });
    places.set(place.id, {place, wrapper, image, button});
  }

  function screenCenter(place) {
    const rect = places.get(place.id).wrapper.getBoundingClientRect();
    return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
  }

  function moveFocus(from, dx, dy) {
    const origin = screenCenter(from);
    const candidates = map.destinations.filter(place => place !== from).map(place => {
      const point = screenCenter(place);
      const x = point.x - origin.x;
      const y = point.y - origin.y;
      const along = x * dx + y * dy;
      const across = Math.abs(x * dy - y * dx);
      return {place, along, score: Math.hypot(x, y) + across * 2};
    }).filter(candidate => candidate.along > 1).sort((a, b) => a.score - b.score);
    if (candidates.length) places.get(candidates[0].place.id).button.focus({preventScroll: true});
  }

  function beginGesture(event) {
    if (!ready || event.button !== 0 || !event.isPrimary) return;
    const button = event.target.closest('.landmark-button');
    const id = button?.parentElement.dataset.id;
    gesture = {id: event.pointerId, startX: event.clientX, startY: event.clientY, camera,
      place: id ? places.get(id).place : null, surface: event.currentTarget, moved: false, type: event.pointerType};
    suppressClick = false;
    touchHandled = false;
  }

  function moveGesture(event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY);
    if (distance > 8 && !gesture.moved) {
      gesture.moved = true;
      suppressClick = true;
      touchArmed = null;
      if (!gesture.place?.fixed) viewport.classList.add('dragging');
      gesture.surface.setPointerCapture(event.pointerId);
      select(selected);
    }
    if (gesture.moved) {
      event.preventDefault();
      if (!gesture.place?.fixed) setCamera(gesture.camera - (event.clientX - gesture.startX) / scale);
    }
  }

  function endGesture(event) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const ended = gesture;
    gesture = null;
    viewport.classList.remove('dragging');
    if (ended.surface.hasPointerCapture(event.pointerId)) ended.surface.releasePointerCapture(event.pointerId);
    if (event.type === 'pointercancel' || ended.moved) return;
    if (ended.type === 'touch' && ended.place) {
      touchHandled = true;
      const open = touchArmed === ended.place.id;
      touchArmed = ended.place.id;
      select(ended.place);
      if (open) visit(places.get(ended.place.id).button);
    } else if (ended.type === 'touch') touchArmed = null;
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
    viewport.inert = true;
    $('portal-anchor').inert = true;
    $('visit').disabled = true;
    $('load-panel').hidden = false;
    $('load-title').textContent = 'Preparando a cidade';
    $('load-message').textContent = 'Carregando o panorama e as 14 fachadas…';
    $('retry-city').hidden = true;
    setCamera(camera);
    for (const entry of places.values()) entry.button.disabled = true;
    const assets = [{name: 'Panorama', image: $('terrain'), file: map.background},
      ...Array.from(places.values(), entry => ({name: entry.place.name, image: entry.image, file: entry.place.facade}))];
    const results = await Promise.allSettled(assets.map(asset => loadImage(asset.image, map.artRoot + asset.file)));
    const missing = assets.filter((_, index) => results[index].status === 'rejected');
    if (missing.length) {
      $('load-title').textContent = 'Não foi possível carregar a cidade';
      $('load-message').textContent = `Imagens ausentes: ${missing.map(asset => asset.name).join(', ')}. Mantenha a pasta assets junto ao projeto e tente novamente.`;
      $('retry-city').hidden = false;
      return;
    }
    ready = true;
    viewport.inert = false;
    $('portal-anchor').inert = false;
    for (const entry of places.values()) entry.button.disabled = false;
    $('load-panel').hidden = true;
    $('visit').disabled = false;
    select(selected, selectionMode, keyboardSelection);
    setCamera(camera);
  }

  function visit(trigger) {
    if (!ready || preview.open) return;
    touchArmed = null;
    returnFocus = trigger;
    $('preview-title').textContent = selected.name;
    $('view-controls').replaceChildren();
    selected.views.forEach((view, index) => {
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
    const view = selected.views[index];
    for (const [i, button] of Array.from($('view-controls').children).entries()) button.setAttribute('aria-pressed', String(i === index));
    $('scene-image').hidden = true;
    $('scene-status').hidden = false;
    $('scene-status').textContent = `Carregando ${view.name}…`;
    $('retry-scene').hidden = true;
    const image = new Image();
    try {
      await loadImage(image, map.viewRoot + view.file);
      if (request !== viewRequest || !preview.open) return;
      image.id = 'scene-image';
      image.alt = `${selected.name} — ${view.name}, ilustração em tinta preta e bege`;
      $('scene-image').replaceWith(image);
      $('scene-status').textContent = `${view.name} carregado`;
      $('scene-status').hidden = true;
    } catch {
      if (request !== viewRequest || !preview.open) return;
      $('scene-status').textContent = `O fundo “${view.name}” não carregou. Confira a pasta assets/terminus/locais e tente novamente, ou volte à cidade.`;
      $('retry-scene').hidden = false;
    }
  }

  function closePreview() {
    ++viewRequest;
    preview.close();
    select(selected);
    returnFocus.focus({preventScroll: true});
  }

  document.addEventListener('pointerdown', () => { pointerInput = true; }, true);
  document.addEventListener('pointermove', event => { if (event.movementX || event.movementY) pointerInput = true; }, true);
  document.addEventListener('keydown', () => { pointerInput = false; }, true);
  for (const place of map.destinations) createLandmark(place);
  viewport.addEventListener('pointerdown', beginGesture);
  viewport.addEventListener('pointermove', moveGesture);
  viewport.addEventListener('pointerup', endGesture);
  viewport.addEventListener('pointercancel', endGesture);
  // The portal has the same two-tap contract but never drags the city.
  $('portal-anchor').addEventListener('pointerdown', beginGesture);
  $('portal-anchor').addEventListener('pointermove', moveGesture);
  $('portal-anchor').addEventListener('pointerup', endGesture);
  $('portal-anchor').addEventListener('pointercancel', endGesture);
  viewport.addEventListener('wheel', event => {
    const delta = event.deltaX || (event.shiftKey ? event.deltaY : 0);
    if (!delta || !ready) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientWidth : 1;
    setCamera(camera + delta * unit / scale);
  }, {passive: false});
  $('pan-left').addEventListener('click', () => setCamera(camera - visibleWidth * .65));
  $('pan-right').addEventListener('click', () => setCamera(camera + visibleWidth * .65));
  $('visit').addEventListener('click', () => visit($('visit')));
  $('back').addEventListener('click', closePreview);
  preview.addEventListener('cancel', event => { event.preventDefault(); closePreview(); });
  $('retry-city').addEventListener('click', loadCity);
  $('retry-scene').addEventListener('click', () => showView(currentView));
  new ResizeObserver(resize).observe(stage);
  resize();
  select(selected);
  loadCity();
})();
