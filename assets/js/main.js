/**
 * FiveM Code Hub — Team Portfolio
 * Vanilla ES modules. No build step, no dependencies.
 */

import { SITE, HERO_ROLES, STATS, TEAM, SKILLS, PROJECTS, PROJECT_FILTERS, PROCESS } from './data.js';

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Escape any string that lands inside innerHTML. */
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ───────────────────────────── ICONS ───────────────────────────── */

const ICONS = {
  server:   '<svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="3" width="15" height="5.5" rx="1.6" stroke="currentColor" stroke-width="1.5"/><rect x="2.5" y="11.5" width="15" height="5.5" rx="1.6" stroke="currentColor" stroke-width="1.5"/><circle cx="5.6" cy="5.75" r="1" fill="currentColor"/><circle cx="5.6" cy="14.25" r="1" fill="currentColor"/></svg>',
  database: '<svg viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="4.7" rx="6.5" ry="2.7" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 4.7v10.6c0 1.5 2.9 2.7 6.5 2.7s6.5-1.2 6.5-2.7V4.7" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 10c0 1.5-2.9 2.7-6.5 2.7S3.5 11.5 3.5 10" stroke="currentColor" stroke-width="1.5"/></svg>',
  gamepad:  '<svg viewBox="0 0 20 20" fill="none"><path d="M6.6 5.5h6.8a4 4 0 0 1 3.9 3.1l.9 4.2a2.1 2.1 0 0 1-3.8 1.6l-1.2-1.8H6.8l-1.2 1.8a2.1 2.1 0 0 1-3.8-1.6l.9-4.2a4 4 0 0 1 3.9-3.1Z" stroke="currentColor" stroke-width="1.5"/><path d="M6.4 8.6v2.2M5.3 9.7h2.2M13 9h.01M14.8 10.6h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  terminal: '<svg viewBox="0 0 20 20" fill="none"><rect x="2.2" y="3.4" width="15.6" height="13.2" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m6 8 2.4 2.2L6 12.4M10.8 12.6h3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  code:     '<svg viewBox="0 0 20 20" fill="none"><path d="m7 6-4 4 4 4M13 6l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  github:   '<svg viewBox="0 0 20 20" fill="none"><path d="M10 1.7a8.3 8.3 0 0 0-2.6 16.2c.4.07.55-.18.55-.4v-1.5c-2.3.5-2.8-1.1-2.8-1.1-.38-.97-.93-1.23-.93-1.23-.76-.52.06-.5.06-.5.84.06 1.28.86 1.28.86.75 1.28 1.96.91 2.44.7.08-.55.3-.92.53-1.13-1.83-.2-3.75-.91-3.75-4.07 0-.9.32-1.63.85-2.2-.09-.21-.37-1.05.08-2.18 0 0 .7-.22 2.28.84a7.9 7.9 0 0 1 4.15 0c1.58-1.06 2.27-.84 2.27-.84.46 1.13.17 1.97.09 2.18.53.57.85 1.3.85 2.2 0 3.17-1.93 3.87-3.77 4.07.3.25.56.75.56 1.52v2.26c0 .22.15.48.56.4A8.3 8.3 0 0 0 10 1.7Z" fill="currentColor"/></svg>',
  discord:  '<svg viewBox="0 0 20 20" fill="none"><path d="M15.6 5.1A13 13 0 0 0 12.4 4l-.2.4a12 12 0 0 1 2.8 1.1 11 11 0 0 0-9.9 0A12 12 0 0 1 7.9 4.4L7.6 4a13 13 0 0 0-3.2 1.1C2.3 8.3 1.8 11.4 2 14.4a13 13 0 0 0 4 2 9.6 9.6 0 0 0 .8-1.4 8.4 8.4 0 0 1-1.3-.6l.3-.3a9.3 9.3 0 0 0 8 0l.3.3a8.4 8.4 0 0 1-1.3.6c.2.5.5 1 .8 1.4a13 13 0 0 0 4-2c.3-3.5-.5-6.6-2-9.3ZM7.4 12.6c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Zm5.2 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Z" fill="currentColor"/></svg>',
  mail:     '<svg viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4" width="15" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m3 6 7 5 7-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  link:     '<svg viewBox="0 0 20 20" fill="none"><path d="M11.5 4.5h4v4M15.5 4.5 9 11M15 11.5v3a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 14.5v-8A1.5 1.5 0 0 1 5.5 5h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/* ────────────────────────── RENDER: STATS ─────────────────────── */

function renderStats() {
  const host = $('#stats');
  if (!host) return;

  host.innerHTML = STATS.map(
    (s) => `
    <div class="stat">
      <dd class="stat__value" data-count="${s.value}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</dd>
      <dt class="stat__label">${esc(s.label)}</dt>
    </div>`
  ).join('');
}

/** Count-up, triggered once when the stats block scrolls into view. */
function initCounters() {
  const nodes = $$('.stat__value');
  if (!nodes.length) return;

  if (REDUCED) {
    nodes.forEach((n) => (n.textContent = n.dataset.count + n.dataset.suffix));
    return;
  }

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.5 }
  );
  nodes.forEach((n) => io.observe(n));
}

/* ────────────────────────── RENDER: TEAM ──────────────────────── */

function socialLinks(socials = {}, name = '') {
  const map = { github: 'GitHub', discord: 'Discord', email: 'Email' };
  return Object.entries(socials)
    .filter(([, href]) => href && href !== '#')
    .map(
      ([key, href]) => `
      <a class="social-btn" href="${esc(href)}" target="_blank" rel="noopener"
         aria-label="${esc(name)} on ${map[key] || key}">${ICONS[key === 'email' ? 'mail' : key] || ICONS.link}</a>`
    )
    .join('');
}

function renderTeam() {
  const host = $('#teamGrid');
  if (!host) return;

  host.innerHTML = TEAM.map((m, i) => {
    const initials =
      m.initials ||
      m.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    return `
    <article class="member reveal" data-accent="${esc(m.accent || 'violet')}" data-delay="${Math.min(i + 1, 5)}">
      <div class="member__top">
        <div class="member__avatar">
          ${
            m.avatar
              ? `<img src="${esc(m.avatar)}" alt="" loading="lazy" width="64" height="64">`
              : esc(initials)
          }
          ${m.lead ? '<span class="member__badge">Lead</span>' : ''}
        </div>
        <div>
          <h3 class="member__name">${esc(m.name)}</h3>
          <p class="member__role">${esc(m.role)}</p>
          <p class="member__meta">
            ${m.age ? `<span>${esc(m.age)} yrs</span>` : ''}
            ${m.location ? `<span>${esc(m.location)}</span>` : ''}
          </p>
        </div>
      </div>

      <p class="member__bio">${esc(m.bio)}</p>

      ${
        m.focus?.length
          ? `<p class="member__section-label">Focus</p>
             <div class="chips">${m.focus.map((f) => `<span class="chip chip--focus">${esc(f)}</span>`).join('')}</div>`
          : ''
      }

      ${
        m.stack?.length
          ? `<p class="member__section-label">Stack</p>
             <div class="chips">${m.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>`
          : ''
      }

      ${
        Object.keys(m.socials || {}).length
          ? `<div class="member__socials">${socialLinks(m.socials, m.name)}</div>`
          : ''
      }
    </article>`;
  }).join('');
}

/* ───────────────────────── RENDER: SKILLS ─────────────────────── */

function renderSkills() {
  const host = $('#skillsGrid');
  if (!host) return;

  host.innerHTML = SKILLS.map(
    (g, i) => `
    <article class="skill-card reveal" data-accent="${esc(g.accent)}" data-delay="${Math.min(i + 1, 5)}">
      <header class="skill-card__head">
        <span class="skill-card__icon" aria-hidden="true">${ICONS[g.icon] || ICONS.code}</span>
        <h3 class="skill-card__title">${esc(g.category)}</h3>
      </header>
      ${g.items
        .map(
          (s) => `
        <div class="skill">
          <div class="skill__row">
            <span class="skill__name">${esc(s.name)}</span>
            <span class="skill__pct">${esc(s.level)}%</span>
          </div>
          <div class="skill__track" role="progressbar" aria-label="${esc(s.name)}"
               aria-valuenow="${esc(s.level)}" aria-valuemin="0" aria-valuemax="100">
            <span class="skill__fill" data-level="${esc(s.level)}"></span>
          </div>
        </div>`
        )
        .join('')}
    </article>`
  ).join('');
}

/** Fill the skill bars when their card enters the viewport. */
function initSkillBars() {
  const bars = $$('.skill__fill');
  if (!bars.length) return;

  if (REDUCED) {
    bars.forEach((b) => (b.style.width = b.dataset.level + '%'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const bar = e.target;
        const delay = [...bar.closest('.skill-card').querySelectorAll('.skill__fill')].indexOf(bar) * 110;
        setTimeout(() => (bar.style.width = bar.dataset.level + '%'), delay);
        io.unobserve(bar);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

/* ──────────────────────── RENDER: PROJECTS ────────────────────── */

function projectCard(p, i) {
  return `
  <article class="project reveal" data-accent="${esc(p.accent || 'violet')}"
           data-tags="${esc((p.tags || []).join(','))}" data-delay="${Math.min(i + 1, 5)}">
    <header class="project__head">
      <span class="project__icon" aria-hidden="true">${ICONS.code}</span>
      <div style="display:flex;align-items:center;gap:.5rem">
        ${p.featured ? '<span class="tag-featured">Featured</span>' : ''}
        <span class="project__year">${esc(p.year)}</span>
      </div>
    </header>

    <h3 class="project__title">${esc(p.title)}</h3>
    <p class="project__summary">${esc(p.summary)}</p>

    <div class="project__stack">
      ${(p.stack || []).map((t) => `<span class="chip">${esc(t)}</span>`).join('')}
    </div>

    ${
      p.links?.repo && p.links.repo !== '#'
        ? `<footer class="project__foot">
             <a class="project__link" href="${esc(p.links.repo)}" target="_blank" rel="noopener">
               Source ${ICONS.link}
             </a>
           </footer>`
        : `<footer class="project__foot">
             <span class="project__link" style="color:var(--fg-dim);cursor:default">Private repository</span>
           </footer>`
    }
  </article>`;
}

function renderProjects() {
  const grid = $('#projectsGrid');
  const bar  = $('#filters');
  if (!grid || !bar) return;

  grid.innerHTML = PROJECTS.map(projectCard).join('');

  bar.innerHTML = PROJECT_FILTERS.map(
    (f, i) => `
    <button class="filter ${i === 0 ? 'is-active' : ''}" role="tab"
            aria-selected="${i === 0}" data-filter="${esc(f)}">${esc(f)}</button>`
  ).join('');

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;

    $$('.filter', bar).forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });

    const filter = btn.dataset.filter;
    $$('.project', grid).forEach((card) => {
      const tags = (card.dataset.tags || '').split(',');
      const show = filter === 'All' || tags.includes(filter);

      card.classList.toggle('is-hidden', !show);
      if (show && !REDUCED) {
        card.classList.remove('is-entering');
        void card.offsetWidth;              // force reflow to restart the animation
        card.classList.add('is-entering');
      }
    });
  });
}

/* ───────────────────────── RENDER: PROCESS ────────────────────── */

function renderProcess() {
  const host = $('#processList');
  if (!host) return;

  host.innerHTML = PROCESS.map(
    (p, i) => `
    <li class="process__item reveal" data-delay="${Math.min(i + 1, 5)}">
      <span class="process__step">${esc(p.step)}</span>
      <h3 class="process__title">${esc(p.title)}</h3>
      <p class="process__text">${esc(p.text)}</p>
    </li>`
  ).join('');
}

/* ───────────────────────────── HERO TYPE ──────────────────────── */

function initTypewriter() {
  const el = $('#typewriter');
  if (!el || !HERO_ROLES.length) return;

  if (REDUCED) {
    el.textContent = HERO_ROLES[0];
    return;
  }

  let word = 0, char = 0, deleting = false;

  const tick = () => {
    const current = HERO_ROLES[word];
    el.textContent = current.slice(0, char);

    let wait = deleting ? 45 : 85;

    if (!deleting && char === current.length) {
      wait = 1700;                        // hold the finished word
      deleting = true;
    } else if (deleting && char === 0) {
      deleting = false;
      word = (word + 1) % HERO_ROLES.length;
      wait = 320;
    } else {
      char += deleting ? -1 : 1;
    }
    setTimeout(tick, wait);
  };
  tick();
}

/* ──────────────────────────── NAVIGATION ──────────────────────── */

function initNav() {
  const header = $('#header');
  const nav    = $('#nav');
  const toggle = $('#navToggle');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('.nav__link')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // sticky header + scroll progress + back-to-top, batched in one rAF
  const bar   = $('#scrollBar');
  const toTop = $('#toTop');
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      header.classList.toggle('is-stuck', y > 20);
      if (bar) bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      toTop.classList.toggle('is-visible', y > 600);

      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' })
  );
}

/** Highlight the nav link of the section currently on screen. */
function initScrollSpy() {
  const links = $$('.nav__link[href^="#"]');
  const sections = links
    .map((l) => $(l.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle('is-active', l.getAttribute('href') === `#${e.target.id}`)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

/* ────────────────────────── SCROLL REVEAL ─────────────────────── */

function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  if (REDUCED) {
    items.forEach((i) => i.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((i) => io.observe(i));
}

/* ──────────────────────────── THE FORM ────────────────────────── */

function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  const note = $('#formNote');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name:    (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email:   (v) => (EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    subject: (v) => (v.trim().length >= 3 ? '' : 'Please enter a subject.'),
    message: (v) => (v.trim().length >= 20 ? '' : 'Please give at least 20 characters of detail.'),
  };

  const errorNode = (input) => $(`#${input.getAttribute('aria-describedby')}`);

  const validate = (input) => {
    const msg = rules[input.name]?.(input.value) ?? '';
    const field = input.closest('.field');
    field.classList.toggle('has-error', Boolean(msg));
    const err = errorNode(input);
    if (err) err.textContent = msg;
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    return !msg;
  };

  const inputs = $$('input, textarea', form);

  inputs.forEach((input) => {
    input.addEventListener('blur', () => validate(input));
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('has-error')) validate(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = inputs.map(validate);
    if (results.includes(false)) {
      note.textContent = 'Please fix the highlighted fields.';
      note.classList.remove('is-ok');
      $('.field.has-error input, .field.has-error textarea', form)?.focus();
      return;
    }

    // Static host: no backend. Hand off to the visitor's mail client.
    const data = Object.fromEntries(new FormData(form));
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    note.textContent = 'Opening your mail client…';
    note.classList.add('is-ok');
    form.reset();
  });
}

/* ─────────────────────────────  BOOT  ─────────────────────────── */

function init() {
  // content first — reveal/observers must see the finished DOM
  renderStats();
  renderTeam();
  renderSkills();
  renderProjects();
  renderProcess();

  initNav();
  initScrollSpy();
  initReveal();
  initCounters();
  initSkillBars();
  initTypewriter();
  initForm();

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
