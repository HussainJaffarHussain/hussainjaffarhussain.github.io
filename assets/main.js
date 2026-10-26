/* Signal: site behavior. Content comes from config.js; nothing here holds personal data. */
(() => {
  'use strict';
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- tiny safe DOM builder (text only, never innerHTML with data) ---------- */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k);
    return n;
  }
  const ICONS = {
    github: ['M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21'],
    linkedin: ['M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z', 'M2 9h4v12H2z', 'M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
    mail: ['M4 4h16v16H4z', 'M22 6l-10 7L2 6'],
    chat: ['M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z'],
    file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M12 18v-6', 'M9 15l3 3 3-3'],
    arrow: ['M7 17L17 7', 'M8 7h9v9'],
    code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6']
  };
  function icon(name) {
    const NS = 'http://www.w3.org/2000/svg';
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    for (const d of ICONS[name]) { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); s.append(p); }
    return s;
  }
  const ext = (href) => /^https?:/i.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  /* ---------- owner details ---------- */
  $$('[data-owner="name"]').forEach(n => { n.textContent = D.owner.name; });
  $$('[data-owner="title"]').forEach(n => { n.textContent = D.owner.title; });
  const profile = $('#profile-img');
  profile.src = D.owner.profileImage; profile.alt = D.owner.profileAlt;
  $('#year').textContent = new Date().getFullYear();

  const L = D.links;
  const socialItems = [
    L.github && { href: L.github, label: 'GitHub', ic: 'github' },
    L.linkedin && { href: L.linkedin, label: 'LinkedIn', ic: 'linkedin' },
    L.resume && { href: L.resume, label: 'Resume', ic: 'file', download: true }
  ].filter(Boolean);
  $$('[data-social]').forEach(row => socialItems.forEach(s =>
    row.append(el('li', null, el('a', { href: s.href, download: s.download, ...(s.download ? {} : ext(s.href)) }, icon(s.ic), s.label)))));

  const navResume = $('#nav-resume');
  if (L.resume) { navResume.href = L.resume; navResume.setAttribute('download', ''); navResume.textContent = 'Download resume'; }

  const contactLinks = $('#contact-links');
  [
    L.email && { href: 'mailto:' + L.email, label: L.email, ic: 'mail' },
    L.whatsapp && { href: L.whatsapp, label: 'Message on WhatsApp', ic: 'chat' },
    L.linkedin && { href: L.linkedin, label: 'LinkedIn', ic: 'linkedin' },
    L.github && { href: L.github, label: 'GitHub', ic: 'github' }
  ].filter(Boolean).forEach(c => contactLinks.append(
    el('li', null, el('a', { href: c.href, ...ext(c.href) }, el('span', { class: 'ic' }, icon(c.ic)), c.label))));

  /* ---------- about ---------- */
  D.about.intro.forEach(t => $('#about-intro').append(el('p', { text: t })));
  D.about.focus.forEach(t => $('#about-focus').append(el('li', { text: t })));
  const extras = [['Background', D.about.background], ['Certifications', D.about.certifications], ['Interests', D.about.interests]];
  extras.forEach(([h, list]) => { if (list && list.length) $('#about-extra').append(el('div', { class: 'reveal' }, el('h3', { text: h }), el('ul', null, list.map(t => el('li', { text: t }))))); });

  /* ---------- skills ---------- */
  D.skills.forEach(g => $('#skills-grid').append(
    el('article', { class: 'skill' }, el('span', { class: 'skill-code', 'aria-hidden': 'true', text: g.code }), el('h3', { text: g.group }),
      el('ul', null, g.items.map(t => el('li', { text: t }))))));

  /* ---------- projects ---------- */
  const PALETTES = [['#4F6BFF', '#36D6F0'], ['#8A7CFF', '#4F6BFF'], ['#36D6F0', '#8A7CFF'], ['#4F6BFF', '#8A7CFF']];
  // A designed placeholder: converging signal lines in the site's world, unique per project.
  function placeholderVis(seed, label) {
    const NS = 'http://www.w3.org/2000/svg';
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 800 400'); s.setAttribute('preserveAspectRatio', 'xMidYMid slice'); s.setAttribute('aria-hidden', 'true');
    const [c1, c2] = PALETTES[seed % PALETTES.length];
    let r = (seed + 1) * 9301;
    const rnd = () => (r = (r * 1664525 + 1013904223) >>> 0) / 4294967296;
    const cx = 500 + rnd() * 160, cy = 200 + rnd() * 50;
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = `<radialGradient id="g${seed}" cx="${cx / 8}%" cy="${cy / 4}%" r="45%"><stop offset="0" stop-color="#FFF1DD" stop-opacity=".55"/><stop offset=".35" stop-color="${c2}" stop-opacity=".18"/><stop offset="1" stop-color="#080B1E" stop-opacity="0"/></radialGradient>`;
    s.append(defs);
    const bg = document.createElementNS(NS, 'rect'); bg.setAttribute('width', 800); bg.setAttribute('height', 400); bg.setAttribute('fill', `url(#g${seed})`); s.append(bg);
    for (let i = 0; i < 26; i++) {
      const p = document.createElementNS(NS, 'path');
      const x0 = rnd() * 900 - 50, y0 = -20 + rnd() * 60;
      const mx = (x0 + cx) / 2 + (rnd() - .5) * 120, my = (y0 + cy) / 2;
      p.setAttribute('d', `M${x0} ${y0} Q${mx} ${my} ${cx} ${cy}`);
      p.setAttribute('fill', 'none'); p.setAttribute('stroke', i % 3 ? c1 : c2);
      p.setAttribute('stroke-opacity', (.18 + rnd() * .4).toFixed(2)); p.setAttribute('stroke-width', (.6 + rnd() * 1.2).toFixed(2));
      s.append(p);
    }
    const core = document.createElementNS(NS, 'circle'); core.setAttribute('cx', cx); core.setAttribute('cy', cy); core.setAttribute('r', 7); core.setAttribute('fill', '#FFF1DD'); s.append(core);
    const frag = document.createDocumentFragment();
    frag.append(s, el('span', { class: 'ph', text: label }));
    return frag;
  }

  const grid = $('#project-grid');
  const byId = Object.fromEntries(D.projects.map(p => [p.id, p]));
  D.projects.forEach((p, i) => {
    const vis = el('div', { class: 'pvis' });
    if (p.image) vis.append(el('img', { src: p.image, alt: `Screenshot of ${p.title}`, loading: 'lazy', decoding: 'async' }));
    else vis.append(placeholderVis(i, 'Screenshot coming soon'));
    const actions = el('div', { class: 'pactions' },
      el('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: () => openCase(p.id) }, 'Read case study'),
      p.github && el('a', { class: 'link-btn', href: p.github, ...ext(p.github) }, icon('code'), 'Code'),
      p.demo && el('a', { class: 'link-btn', href: p.demo, ...ext(p.demo) }, icon('arrow'), 'Live demo'));
    const rel = p.related && byId[p.related];
    grid.append(el('article', { class: 'pcard', 'data-cat': p.category },
      vis,
      el('div', { class: 'pbody' },
        el('div', { class: 'pmeta' }, el('span', { class: 'pcat', text: p.category }), el('span', { class: 'status', 'data-s': p.status, text: p.status })),
        el('h3', { text: p.title }),
        el('p', { text: p.short }),
        el('ul', { class: 'ptags', 'aria-label': 'Technology' }, p.stack.map(t => el('li', { text: t }))),
        rel && el('p', { class: 'prelated' }, 'Works with: ', el('a', { href: '#', onclick: e => { e.preventDefault(); openCase(rel.id); } }, rel.title.split(':')[0])),
        actions)));
  });

  // filters
  const cats = ['All', ...new Set(D.projects.map(p => p.category))];
  const filters = $('#filters');
  cats.forEach(c => filters.append(el('button', { class: 'chip-btn', type: 'button', 'aria-pressed': c === 'All' ? 'true' : 'false', onclick: e => {
    $$('.chip-btn', filters).forEach(b => b.setAttribute('aria-pressed', b === e.currentTarget ? 'true' : 'false'));
    $$('.pcard', grid).forEach(card => card.classList.toggle('hidden', c !== 'All' && card.dataset.cat !== c));
  } }, c)));

  // case study dialog
  const dlg = $('#case');
  const body = $('#case-body');
  let lastFocus = null;
  function block(title, content) { return el('section', { class: 'case-block' }, el('h3', { text: title }), content); }
  const listOf = (arr, cls = 'case-list') => el('ul', { class: cls }, arr.map(t => el('li', { text: t })));
  function openCase(id) {
    const p = byId[id];
    if (!p) return;
    lastFocus = document.activeElement;
    body.replaceChildren(
      el('div', { class: 'pmeta' }, el('span', { class: 'pcat', text: p.category }), el('span', { class: 'status', 'data-s': p.status, text: p.status })),
      el('h2', { id: 'case-title', text: p.title }),
      el('p', { class: 'lede', text: p.short }),
      p.problem && block('The problem', el('p', { text: p.problem })),
      p.solution && block('The approach', el('p', { text: p.solution })),
      p.architecture && block(p.id === 'whatsapp-automation' ? 'Architecture and data flow' : 'How data flows', listOf(p.architecture, 'flow')),
      p.scope && block(p.status === 'Live' ? 'Features' : 'Designed scope', listOf(p.scope)),
      p.useCases && block('Example use cases', listOf(p.useCases)),
      block('Technology', el('ul', { class: 'ptags' }, p.stack.map(t => el('li', { text: t })))),
      p.security && block('Security considerations', listOf(p.security)),
      p.testing && block('Testing and validation', listOf(p.testing)),
      p.challenges && block('Challenges and trade-offs', listOf(p.challenges)),
      p.future && block('Next improvements', listOf(p.future)),
      (p.github || p.demo) && block('Links', el('div', { class: 'pactions' },
        p.github && el('a', { class: 'link-btn', href: p.github, ...ext(p.github) }, icon('code'), 'Source code'),
        p.demo && el('a', { class: 'link-btn', href: p.demo, ...ext(p.demo) }, icon('arrow'), 'Live demo'))),
      el('p', { class: 'case-note', text: p.status === 'Live'
        ? 'Want the details behind this build? Ask me in the contact form.'
        : `Status: ${p.status}. The scope above is what this project is designed to do. Screenshots, test results and links are added as each part ships.` })
    );
    dlg.showModal();
    dlg.scrollTop = 0;
    $('.case-close', dlg).focus();
  }
  $('.case-close', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { if (lastFocus) lastFocus.focus(); });

  /* ---------- services ---------- */
  const svcList = $('#service-list');
  D.services.forEach((s, i) => {
    const id = 'svc-' + i;
    const head = el('button', { class: 'svc-head', type: 'button', 'aria-expanded': 'false', 'aria-controls': id },
      el('span', { class: 'svc-num', text: String(i + 1).padStart(2, '0') }),
      el('span', { class: 'svc-title', text: s.title }),
      el('span', { class: 'svc-plus', 'aria-hidden': 'true' }));
    head.addEventListener('click', () => head.setAttribute('aria-expanded', head.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'));
    const cta = el('a', { class: 'btn btn-primary btn-sm', href: '#contact', onclick: () => { $('#f-subject').value = 'Inquiry: ' + s.title; } }, 'Ask about this');
    svcList.append(el('div', { class: 'svc reveal' }, head,
      el('div', { class: 'svc-body', id }, el('div', null, el('div', { class: 'svc-content' },
        el('div', null, el('h4', { text: 'The problem' }), el('p', { text: s.problem }), el('div', { class: 'svc-tech' }, s.tech.map(t => el('span', { text: t })))),
        el('div', null, el('h4', { text: 'Typical uses' }), el('ul', null, s.uses.map(t => el('li', { text: t })))),
        el('div', null, el('h4', { text: 'You get' }), el('ul', null, s.deliverables.map(t => el('li', { text: t })))),
        el('div', null, cta))))));
  });
  $('.svc-head', svcList).setAttribute('aria-expanded', 'true');

  /* ---------- workflow + the one interactive moment: press and hold to send a signal ---------- */
  const steps = $('#workflow-steps');
  D.workflow.forEach((w, i) => steps.append(el('li', { class: 'step' },
    el('span', { class: 'step-node', text: String(i + 1).padStart(2, '0') }),
    el('div', { class: 'step-body' }, el('h3', { text: w.step }), el('p', { text: w.text })))));
  const stepEls = $$('.step', steps);
  const sendBtn = $('#send-btn'), sendNote = $('#send-note');
  let hold = 0, holding = false, holdRaf = null, holdLast = 0, sent = false;
  function paintHold() {
    sendBtn.style.setProperty('--hold', hold.toFixed(3));
    steps.style.setProperty('--flow', hold.toFixed(3));
    stepEls.forEach((s, i) => s.classList.toggle('lit', hold >= (i + .5) / stepEls.length || sent));
  }
  function holdTick(now) {
    const dt = Math.min(250, now - (holdLast || now)); holdLast = now;
    hold = clamp(hold + (holding ? dt / 1600 : -dt / 900), 0, 1);
    if (hold >= 1 && !sent) {
      sent = true; holding = false;
      sendNote.textContent = 'Signal received. That is the whole process, start to finish.';
      sendBtn.querySelector('.send-label').textContent = 'Signal sent';
    }
    paintHold();
    if (sent) { hold = 1; paintHold(); holdRaf = null; holdLast = 0; return; }
    if (holding || hold > 0) holdRaf = requestAnimationFrame(holdTick); else { holdRaf = null; holdLast = 0; }
  }
  function startHold(e) {
    if (sent) return;
    if (e.type === 'keydown' && (e.repeat || (e.key !== ' ' && e.key !== 'Enter'))) return;
    e.preventDefault();
    if (reduceMQ.matches) { hold = 1; holdTick(performance.now()); return; }
    holding = true; sendBtn.classList.add('holding');
    if (!holdRaf) holdRaf = requestAnimationFrame(holdTick);
  }
  function endHold() { holding = false; sendBtn.classList.remove('holding'); if (!holdRaf && !sent) holdRaf = requestAnimationFrame(holdTick); }
  sendBtn.addEventListener('pointerdown', startHold);
  sendBtn.addEventListener('keydown', startHold);
  ['pointerup', 'pointerleave', 'pointercancel', 'keyup', 'blur'].forEach(t => sendBtn.addEventListener(t, endHold));
  sendBtn.addEventListener('contextmenu', e => e.preventDefault());
  sendBtn.addEventListener('click', e => e.preventDefault());

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const t = en.target;
    const sibs = t.parentElement ? [...t.parentElement.children].filter(c => c.matches('.skill,.pcard,.svc')) : [];
    const idx = Math.max(0, sibs.indexOf(t));
    t.style.transitionDelay = (Math.min(idx, 6) * 90) + 'ms';
    t.classList.add('in');
    setTimeout(() => { t.style.transitionDelay = ''; }, 1400);   // retire the stagger so hovers respond at once
    io.unobserve(t);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  $$('.reveal,.skill,.pcard').forEach(n => io.observe(n));

  /* ---------- nav: solid background, active section, mobile menu ---------- */
  const nav = $('.nav'), menu = $('#menu'), menuBtn = $('.menu-btn');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.querySelector('.sr').textContent = open ? 'Close menu' : 'Open menu';
  }
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });

  const navLinks = $$('.menu ul a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let activeId = '';
  function updateNav() {
    nav.classList.toggle('solid', scrollY > 40);
    const mid = innerHeight * .4;
    let cur = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= mid) cur = s;
    // the services section hands off to the process section, which belongs to no nav item
    if (cur && cur.id !== activeId) {
      activeId = cur.id;
      navLinks.forEach(a => { const on = a.getAttribute('href') === '#' + activeId; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    }
  }

  /* ---------- the signature thread: a pulse travels the page and lands at the form ---------- */
  const thread = $('.thread'), threadPulse = $('.thread-pulse'), contactSec = $('#contact'), form = $('#contact-form');
  let lastTy = -1, lastArrive = -1;
  function updateThread() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const prog = max > 0 ? scrollY / max : 0;
    thread.classList.toggle('on', scrollY > innerHeight * .6);
    const ty = Math.round(innerHeight * (.08 + prog * .84));
    if (ty !== lastTy) { lastTy = ty; threadPulse.style.setProperty('--ty', ty + 'px'); }
    const r = contactSec.getBoundingClientRect();
    const arrive = Math.round(clamp(1 - r.top / innerHeight, .25, 1) * 100) / 100;
    if (arrive !== lastArrive) { lastArrive = arrive; form.style.setProperty('--arrive', arrive); }
  }

  /* ==========================================================
     HERO: the descent
     ========================================================== */
  const hero = $('.hero'), stage = $('.stage'), sceneImg = $('.scene-img'), canvas = $('.pulses');
  const bands = $$('.band').map(b => ({ el: b, a: +b.dataset.a, b: +b.dataset.b, op: -1, k: -1, ks: -1, kb: -1 }));

  // split headline text into word spans (seeded so it is identical every load)
  function rng(seed) { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
  $$('.split').forEach((node, n) => {
    const text = node.textContent.trim();
    const words = text.split(/\s+/);
    const r = rng(17 + n * 31);
    const vis = el('span', { 'aria-hidden': 'true' });
    words.forEach((w, i) => {
      const th = (i / words.length) * .5 + r() * .06;
      const wi = el('span', { class: 'wi', text: w }); wi.style.setProperty('--th', th.toFixed(3));
      vis.append(el('span', { class: 'w' }, wi), i < words.length - 1 ? ' ' : '');
    });
    node.replaceChildren(el('span', { class: 'sr', text }), vis);
  });

  // load the poster through an Image so the stage paints it the moment it arrives
  const posterImg = new Image();
  posterImg.onload = posterImg.onerror = () => sceneImg.classList.add('loaded');
  posterImg.src = matchMedia('(max-width: 720px), (orientation: portrait) and (max-width: 1024px), (orientation: portrait) and (pointer: coarse)').matches
    ? 'assets/img/hero-mobile.jpg' : 'assets/img/hero-poster.jpg';

  function heroProgress() {
    const range = hero.offsetHeight - innerHeight;
    return range > 0 ? clamp(-hero.getBoundingClientRect().top / range, 0, 1) : 0;
  }

  let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true, loadK = 0, loadStart = performance.now(), lastP = -1;
  function updateBands(p) {
    const last = bands.length - 1;
    bands.forEach((B, i) => {
      const len = B.b - B.a;
      const f = Math.min(.05, len / 3);
      const inE = i === 0 ? 1 : smoothstep(p, B.a, B.a + f);
      const outE = i === last ? 1 : 1 - smoothstep(p, B.b - f, B.b);
      const op = Math.round(inE * outE * 1000) / 1000;
      let k = clamp((p - B.a) / Math.min(.09, len * .4), 0, 1);
      if (i === 0) k = Math.max(k, loadK);
      k = Math.round(k * 1000) / 1000;
      if (op !== B.op) { B.op = op; B.el.style.setProperty('--o', op); B.el.classList.toggle('live', op > .5); }
      if (Math.abs(k - B.k) >= .008 || (k === 1 && B.k !== 1) || (k === 0 && B.k !== 0)) {
        B.k = k; B.el.style.setProperty('--k', k);
        if (i === last) {
          B.el.style.setProperty('--ks', clamp((k - .5) * 3, 0, 1).toFixed(3));
          B.el.style.setProperty('--kb', clamp((k - .7) * 4, 0, 1).toFixed(3));
        }
      }
    });
  }
  function tick(now) {
    const dt = Math.min(100, now - (lastTick || now)); lastTick = now;
    loadK = clamp((now - loadStart) / 1400, 0, 1);
    loadK = 1 - Math.pow(1 - loadK, 3);
    shown += (target - shown) * (1 - Math.pow(1 - .14, dt / 16.667));
    const settled = Math.abs(target - shown) < .0005 && loadK >= 1;
    if (settled) shown = target;
    const p = Math.round(shown * 10000) / 10000;
    if (p !== lastP) { lastP = p; stage.style.setProperty('--p', p); }
    updateBands(shown);
    if (settled) { rafId = null; lastTick = 0; } else rafId = requestAnimationFrame(tick);
  }
  function onHeroScroll() {
    if (!scrubOn) return;               // phones and reduced motion keep the static hero untouched
    const t = heroProgress();
    scrollSpeed = Math.min(1, scrollSpeed + Math.abs(t - target) * 18);
    target = t;
    if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
  }

  // keyboard users who tab into the settle band are carried to where it is fully visible
  $('.band-3').addEventListener('focusin', () => {
    if (scrubOn && heroProgress() < .9) scrollTo({ top: hero.offsetTop + hero.offsetHeight - innerHeight, behavior: reduceMQ.matches ? 'auto' : 'smooth' });
  });

  /* signal pulses on a canvas: streaks fall along rays into the core; scrolling speeds them up */
  const ctx = canvas.getContext('2d');
  let cw = 0, ch = 0, dpr = 1, pulses = [], pulseRaf = null, pulseLast = 0, scrollSpeed = 0;
  function sizeCanvas() {
    dpr = Math.min(1.5, devicePixelRatio || 1);
    cw = canvas.clientWidth; ch = canvas.clientHeight;
    canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spawn(p, fresh) {
    p.x0 = Math.random() * 1.3 - .15;
    p.t = fresh ? Math.random() : 0;
    p.v = .05 + Math.random() * .09;
    p.len = .05 + Math.random() * .08;
    p.hue = Math.random() < .7 ? '54,214,240' : '138,124,255';
    p.a = .35 + Math.random() * .55;
    return p;
  }
  for (let i = 0; i < 46; i++) pulses.push(spawn({}, true));
  function pulseFrame(now) {
    const dt = Math.min(64, now - (pulseLast || now)) / 1000; pulseLast = now;
    scrollSpeed *= Math.pow(.04, dt);
    const boost = 1 + scrollSpeed * 6;
    const P = +stage.style.getPropertyValue('--p') || 0;
    ctx.clearRect(0, 0, cw, ch);
    const cx = cw * .5, cy = ch * (.96 - P * .1);
    for (const p of pulses) {
      p.t += p.v * dt * boost;
      if (p.t > 1) spawn(p, false);
      const sx = p.x0 * cw, sy = -ch * .05;
      const e = t => t * t * (3 - 2 * t) * .4 + t * .6;
      const t1 = e(p.t), t0 = e(Math.max(0, p.t - p.len));
      const x1 = sx + (cx - sx) * t1, y1 = sy + (cy - sy) * t1;
      const x0 = sx + (cx - sx) * t0, y0 = sy + (cy - sy) * t0;
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      const a = p.a * Math.sin(Math.PI * Math.min(1, p.t * 1.05));
      g.addColorStop(0, `rgba(${p.hue},0)`); g.addColorStop(1, `rgba(${p.hue},${a.toFixed(3)})`);
      ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }
    pulseRaf = (scrubOn && heroOnScreen && !document.hidden) ? requestAnimationFrame(pulseFrame) : null;
    if (!pulseRaf) pulseLast = 0;
  }
  function runPulses() { if (!pulseRaf && scrubOn && heroOnScreen && !document.hidden) pulseRaf = requestAnimationFrame(pulseFrame); }

  new IntersectionObserver(([en]) => {
    heroOnScreen = en.isIntersecting;
    if (heroOnScreen) { onHeroScroll(); runPulses(); }
  }).observe(hero);

  /* the five static-hero gates: identical strings to styles.css, decided live */
  const GATES = [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)'
  ];
  const MQLS = GATES.map(q => matchMedia(q));
  let scrubOn = false;
  function enableScrub() {
    if (scrubOn) return; scrubOn = true;
    sizeCanvas();
    bands.forEach(B => { B.op = -1; B.k = -1; });
    loadStart = performance.now();
    target = shown = heroProgress(); lastP = -1;
    addEventListener('scroll', onHeroScroll, { passive: true });
    if (rafId === null) rafId = requestAnimationFrame(tick);
    runPulses();
  }
  function disableScrub() {
    if (!scrubOn) return; scrubOn = false;
    removeEventListener('scroll', onHeroScroll);
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    if (pulseRaf !== null) { cancelAnimationFrame(pulseRaf); pulseRaf = null; }
    stage.style.removeProperty('--p');
    bands.forEach(B => { ['--o', '--k', '--ks', '--kb'].forEach(v => B.el.style.removeProperty(v)); B.el.classList.remove('live'); });
  }
  function applyHeroMode() { MQLS.some(m => m.matches) ? disableScrub() : enableScrub(); }
  MQLS.forEach(m => m.addEventListener('change', applyHeroMode));

  // reduced motion flips live in both directions
  function pinToFinalStates() { sent = sent || hold > 0; hold = sent ? 1 : hold; stepEls.forEach(s => s.classList.add('lit')); steps.style.setProperty('--flow', 1); }
  function unpinFinalStates() { if (!sent) { stepEls.forEach(s => s.classList.remove('lit')); steps.style.setProperty('--flow', hold.toFixed(3)); } }
  reduceMQ.addEventListener('change', e => { e.matches ? pinToFinalStates() : unpinFinalStates(); applyHeroMode(); });
  if (reduceMQ.matches) pinToFinalStates();

  /* ---------- page-wide scroll handling ---------- */
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false; updateNav(); updateThread(); });
  }, { passive: true });
  addEventListener('resize', () => { if (scrubOn) { sizeCanvas(); onHeroScroll(); } updateThread(); });
  document.addEventListener('visibilitychange', () => { document.body.classList.toggle('paused', document.hidden); if (!document.hidden) runPulses(); });

  applyHeroMode();
  updateNav(); updateThread();

  /* ==========================================================
     CONTACT FORM: validated, honest about where messages go
     ========================================================== */
  const fields = {
    name: { el: $('#f-name'), err: $('#e-name'), check: v => v.trim().length >= 2 || 'Please enter your name.' },
    email: { el: $('#f-email'), err: $('#e-email'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.' },
    subject: { el: $('#f-subject'), err: $('#e-subject'), check: v => v.trim().length >= 3 || 'Please add a short subject.' },
    message: { el: $('#f-message'), err: $('#e-message'), check: v => v.trim().length >= 20 || 'Please write at least 20 characters so I can help.' }
  };
  const status = $('#form-status'), submit = $('#f-submit');
  const openedAt = Date.now();
  function validate(key) {
    const f = fields[key]; const res = f.check(f.el.value);
    const ok = res === true;
    f.err.textContent = ok ? '' : res;
    f.el.parentElement.classList.toggle('bad', !ok);
    f.el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (!ok) f.el.setAttribute('aria-describedby', f.err.id); else f.el.removeAttribute('aria-describedby');
    return ok;
  }
  Object.keys(fields).forEach(k => {
    fields[k].el.addEventListener('blur', () => { if (fields[k].el.value) validate(k); });
    fields[k].el.addEventListener('input', () => { if (fields[k].el.parentElement.classList.contains('bad')) validate(k); });
  });
  function setStatus(text, kind) { status.textContent = text; status.className = 'form-status' + (kind ? ' ' + kind : ''); }
  function setBusy(busy) {
    submit.disabled = busy;
    submit.replaceChildren(busy ? el('span', { class: 'spinner', 'aria-hidden': 'true' }) : '', el('span', { text: busy ? 'Sending...' : 'Send message' }));
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const okAll = Object.keys(fields).map(validate).every(Boolean);
    if (!okAll) { const first = Object.values(fields).find(f => f.el.getAttribute('aria-invalid') === 'true'); first && first.el.focus(); setStatus('Please fix the highlighted fields.', 'bad'); return; }
    // spam protection: a hidden honeypot field and a minimum time on page
    if ($('#f-website').value || Date.now() - openedAt < 3000) { setStatus('Thanks, your message was received.', 'ok'); form.reset(); return; }

    const data = Object.fromEntries(Object.keys(fields).map(k => [k, fields[k].el.value.trim()]));
    const endpoint = D.contact.formEndpoint;
    if (endpoint) {
      setBusy(true); setStatus('');
      // form services can be slow: reassure after a few seconds, give up cleanly after 60
      const slow = setTimeout(() => setStatus('Still sending, the mail service can take a few seconds...'), 5000);
      const ctrl = new AbortController();
      const giveUp = setTimeout(() => ctrl.abort(), 60000);
      try {
        // _subject and _replyto are understood by FormSubmit and Formspree: a clear email subject, and Reply goes to the visitor
        const payload = { ...data, _subject: 'Portfolio message: ' + data.subject, _replyto: data.email, _template: 'table' };
        // a url-encoded body with only an Accept header is a "simple" request: no CORS preflight, so one round trip instead of two
        const body = new URLSearchParams(payload);
        const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body, signal: ctrl.signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const out = await res.json().catch(() => ({}));
        if (out.success === false || out.success === 'false') throw new Error(out.message || 'Not delivered');
        form.reset();
        setStatus('Thank you. Your message was sent and I will reply by email.', 'ok');
      } catch (err) {
        setStatus('Sorry, the message could not be sent. Please try again in a moment' + (L.email ? ', or email ' + L.email + ' directly.' : '.'), 'bad');
      } finally { clearTimeout(slow); clearTimeout(giveUp); setBusy(false); }
      return;
    }
    if (L.email) {
      const href = `mailto:${L.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.message + '\n\n' + data.name + '\n' + data.email)}`;
      location.href = href;
      setStatus('Your email app should open with the message ready. Press send there to deliver it.', 'ok');
      return;
    }
    setStatus('This form is not connected to an inbox yet, so your message was not sent. Please reach out through one of the profile links instead.', 'bad');
  });
})();
