/**
 * FiveM Code Hub — Team Portfolio
 * Vanilla ES modules. No build step, no dependencies.
 * Bilingual: Arabic (RTL, default) / English (LTR).
 */

import { SITE, HERO_ROLES, STATS, TEAM, SKILLS, PROJECTS, PROJECT_FILTERS, PROCESS } from './data.js';
import { T, LANGS, DEFAULT_LANG, FILTER_LABELS, localizeDigits } from './i18n.js';

/* Discord data produced by `npm run seed`; empty until the first run. */
let DISCORD = { users: {}, guild: null };

async function loadDiscord() {
  try {
    const res = await fetch('assets/data/discord.json', { cache: 'no-cache' });
    if (res.ok) DISCORD = await res.json();
  } catch {
    // Seed not run yet, or offline — cards fall back to initials.
  }
}

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Escape any string that lands inside innerHTML. */
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ─────────────────────────── LANGUAGE ─────────────────────────── */

const STORE_KEY = 'fch-lang';

function readLang() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved && LANGS[saved]) return saved;
  } catch { /* private mode — fall through */ }
  return navigator.language?.startsWith('ar') ? 'ar' : DEFAULT_LANG;
}

let LANG = readLang();

/** Translate a key. */
const t = (key) => T[LANG]?.[key] ?? T.en[key] ?? key;

/** Pick the right side of a { ar, en } pair — passes plain strings through. */
const tx = (val) => (val && typeof val === 'object' && !Array.isArray(val) ? val[LANG] ?? val.en : val);

/** Localize digits for display (Arabic-Indic in AR). */
const num = (v) => localizeDigits(v, LANG);

/** Thousands-grouped number, localized (١٬١٦٣ / 1,163). */
const group = (v) =>
  LANG === 'ar'
    ? localizeDigits(Number(v).toLocaleString('en-US'), 'ar').replace(/,/g, '٬')
    : Number(v).toLocaleString('en-US');

/* ────────────────────────── COLOUR UTILS ─────────────────────────── */

/**
 * Discord accent colours are often near-black, which would make the halo
 * invisible on a dark page. When the seed marks a colour unusable we sample
 * the avatar instead and pick its most saturated dominant tone.
 */
const paletteCache = new Map();

function dominantColour(img) {
  if (paletteCache.has(img.src)) return paletteCache.get(img.src);

  try {
    const size = 48;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);

    const { data } = ctx.getImageData(0, 0, size, size);
    const buckets = new Map();

    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      if (a < 200) continue;

      const mx = Math.max(r, g, b);
      const mn = Math.min(r, g, b);
      const lum = (r + g + b) / 3;
      const sat = mx === 0 ? 0 : (mx - mn) / mx;

      // Skip near-black, near-white, and washed-out pixels.
      if (lum < 34 || lum > 232 || sat < 0.24) continue;

      // Group by hue so shades of one colour reinforce each other instead
      // of splitting into competing buckets.
      const mean = (r + g + b) / 3;
      let hue = 0;
      const delta = mx - mn;
      if (delta) {
        if (mx === r) hue = ((g - b) / delta) % 6;
        else if (mx === g) hue = (b - r) / delta + 2;
        else hue = (r - g) / delta + 4;
        hue = (hue * 60 + 360) % 360;
      }

      const key = Math.round(hue / 24);
      const bucket = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0, sat: 0 };
      bucket.n++; bucket.r += r; bucket.g += g; bucket.b += b;
      bucket.sat += sat;
      buckets.set(key, bucket);
    }

    if (!buckets.size) return null;

    // Pick the dominant hue. Saturation only breaks near-ties, so the colour
    // a human would name stays the winner.
    const best = [...buckets.values()].sort(
      (a, b) => b.n - a.n || b.sat / b.n - a.sat / a.n
    )[0];
    const rgb = [best.r, best.g, best.b].map((c) => Math.round(c / best.n));

    const hex = '#' + vivid(rgb).map((c) => c.toString(16).padStart(2, '0')).join('');
    paletteCache.set(img.src, hex);
    return hex;
  } catch {
    // Tainted canvas (CDN without CORS) — keep the authored accent.
    return null;
  }
}

/**
 * Raise a sampled colour to a brightness and saturation that reads as an
 * accent on a dark page. Avatars are often dim, and a muddy #1a2a31 halo is
 * indistinguishable from the background.
 */
function vivid([r, g, b]) {
  // RGB → HSL
  const [r1, g1, b1] = [r / 255, g / 255, b / 255];
  const mx = Math.max(r1, g1, b1), mn = Math.min(r1, g1, b1);
  const l = (mx + mn) / 2;
  const d = mx - mn;

  let h = 0;
  let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  if (d !== 0) {
    if (mx === r1) h = ((g1 - b1) / d) % 6;
    else if (mx === g1) h = (b1 - r1) / d + 2;
    else h = (r1 - g1) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  // Clamp into a band that stays vivid without blowing out.
  s = Math.min(Math.max(s, 0.62), 0.92);
  const l2 = Math.min(Math.max(l, 0.52), 0.68);

  // HSL → RGB
  const c = (1 - Math.abs(2 * l2 - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l2 - c / 2;

  const seg = [
    [c, x, 0], [x, c, 0], [0, c, x],
    [0, x, c], [x, 0, c], [c, 0, x],
  ][Math.floor(h / 60) % 6];

  return seg.map((v) => Math.round((v + m) * 255));
}

/** Paint the halo, ring, and role colour for one card. */
function applyAccent(card, hex) {
  if (!hex) return;
  card.style.setProperty('--accent', hex);
  card.classList.add('has-live-accent');
}

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
  play:     '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.6" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 7.2v5.6l4.4-2.8-4.4-2.8Z" fill="currentColor"/></svg>',
  copy:     '<svg viewBox="0 0 20 20" fill="none"><rect x="7" y="7" width="9.5" height="9.5" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M13 4.5A1.5 1.5 0 0 0 11.5 3h-6A2.5 2.5 0 0 0 3 5.5v6A1.5 1.5 0 0 0 4.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  check:    '<svg viewBox="0 0 20 20" fill="none"><path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  globe:    '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.4" stroke="currentColor" stroke-width="1.5"/><path d="M2.6 10h14.8M10 2.6a12 12 0 0 1 0 14.8 12 12 0 0 1 0-14.8Z" stroke="currentColor" stroke-width="1.5"/></svg>',
};

/* ────────────────────────── RENDER: STATS ─────────────────────── */

function renderStats() {
  const host = $('#stats');
  if (!host) return;

  host.innerHTML = STATS.map(
    (s) => `
    <div class="stat">
      <dd class="stat__value" data-count="${s.value}" data-suffix="${esc(s.suffix)}">${num(0)}${esc(num(s.suffix))}</dd>
      <dt class="stat__label">${esc(tx(s.label))}</dt>
    </div>`
  ).join('');
}

/** Count-up, triggered once when the stats block scrolls into view. */
let counterIO;
/** Bumped on every language switch so in-flight animations abort. */
let counterRun = 0;

function initCounters() {
  counterIO?.disconnect();
  const run = ++counterRun;

  const nodes = $$('.stat__value');
  if (!nodes.length) return;

  const finish = (el) => (el.textContent = group(el.dataset.count) + num(el.dataset.suffix));

  if (REDUCED) { nodes.forEach(finish); return; }

  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = num(el.dataset.suffix || '');
    const start = performance.now();

    const tick = (now) => {
      // A newer run superseded this one — stop and let the new one own the DOM.
      if (run !== counterRun) return;

      const p = Math.min((now - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = group(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  counterIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      animate(e.target);
      counterIO.unobserve(e.target);
    }),
    { threshold: 0.5 }
  );
  nodes.forEach((n) => counterIO.observe(n));
}

/* ────────────────────────── RENDER: TEAM ──────────────────────── */

function socialLinks(s = {}, name = '', d = null) {
  const out = [];

  if (s.github && s.github !== '#')
    out.push(`<a class="social-btn" href="${esc(s.github)}" target="_blank" rel="noopener"
                 aria-label="${esc(name)} — GitHub">${ICONS.github}</a>`);

  // Real profile link — Discord resolves /users/<id> for everyone.
  if (s.discord && s.discord !== '#') {
    const url = d?.profile || `https://discord.com/users/${s.discord}`;
    out.push(`<a class="social-btn" href="${esc(url)}" target="_blank" rel="noopener"
                 aria-label="${esc(name)} — Discord">${ICONS.discord}</a>`);
    out.push(`<button type="button" class="social-btn social-btn--copy" data-copy="${esc(s.discord)}"
                 aria-label="${esc(t('team.copyId'))}">${ICONS.copy}</button>`);
  }

  if (s.email && s.email !== '#')
    out.push(`<a class="social-btn" href="${esc(s.email)}"
                 aria-label="${esc(name)} — ${esc(t('form.email'))}">${ICONS.mail}</a>`);

  return out.join('');
}

function renderTeam() {
  const host = $('#teamGrid');
  if (!host) return;

  host.innerHTML = TEAM.map((m, i) => {
    const name = tx(m.name);
    const d = DISCORD.users?.[m.socials?.discord] || null;

    const initials =
      m.initials || name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    const avatar = d?.avatar || m.avatar || null;
    const banner = d?.banner || null;

    // Seeded accent wins only when it is bright enough to read as an accent.
    const seeded = d?.accentUsable ? d.accent : null;

    return `
    <article class="member reveal${banner ? ' has-banner' : ''}"
             data-accent="${esc(m.accent || 'violet')}"
             data-discord="${esc(m.socials?.discord || '')}"
             ${seeded ? `style="--accent:${esc(seeded)}"` : ''}
             data-delay="${Math.min(i + 1, 5)}">

      <div class="member__banner">
        ${banner ? `<img class="member__banner-img" src="${esc(banner)}" alt="" loading="lazy">` : ''}
        <span class="member__banner-wash" aria-hidden="true"></span>
        ${m.lead ? `<span class="member__badge">${esc(t('team.lead'))}</span>` : ''}
      </div>

      <div class="member__top">
        <div class="member__avatar">
          ${
            avatar
              ? `<img class="member__avatar-img" src="${esc(avatar)}" alt=""
                      loading="lazy" width="80" height="80" crossorigin="anonymous"
                      onerror="this.closest('.member__avatar').classList.add('is-fallback')">`
              : ''
          }
          <span class="member__initials">${esc(initials)}</span>
          ${
            d?.decoration
              ? `<img class="member__deco" src="${esc(d.decoration)}" alt="" loading="lazy" aria-hidden="true">`
              : ''
          }
        </div>

        <div class="member__ident">
          <h3 class="member__name">${esc(name)}</h3>
          ${
            d?.username
              ? `<p class="member__handle" dir="ltr">
                   @${esc(d.username)}
                   ${d.tagBadge && d.tag
                     ? `<span class="member__tag"><img src="${esc(d.tagBadge)}" alt="" loading="lazy">${esc(d.tag)}</span>`
                     : ''}
                 </p>`
              : ''
          }
          <p class="member__role">${esc(tx(m.role))}</p>
        </div>

      </div>

      <p class="member__meta">
        ${m.age ? `<span>${num(m.age)} ${esc(t('team.years'))}</span>` : ''}
        ${m.location ? `<span>${esc(tx(m.location))}</span>` : ''}
        <span class="member__count" data-owner="${esc(m.initials || '')}"></span>
      </p>

      <p class="member__bio">${esc(tx(m.bio))}</p>

      ${
        tx(m.focus)?.length
          ? `<p class="member__section-label">${esc(t('team.focus'))}</p>
             <div class="chips">${tx(m.focus).map((f) => `<span class="chip chip--focus">${esc(f)}</span>`).join('')}</div>`
          : ''
      }

      ${
        m.stack?.length
          ? `<p class="member__section-label">${esc(t('team.stack'))}</p>
             <div class="chips">${m.stack.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>`
          : ''
      }

      ${
        Object.keys(m.socials || {}).length
          ? `<div class="member__socials">${socialLinks(m.socials, name, d)}</div>`
          : ''
      }
    </article>`;
  }).join('');

  // Show how many shipped projects each member owns.
  $$('.member__count').forEach((el) => {
    const n = PROJECTS.filter((p) => p.owner && p.owner === el.dataset.owner).length;
    el.textContent = n ? `${num(n)} ${t('team.projects')}` : '';
  });

  initLiveAccents();
}

/**
 * Derive each card's accent from its avatar once the image decodes, unless the
 * seed already supplied a usable colour.
 */
function initLiveAccents() {
  $$('.member').forEach((card) => {
    if (card.style.getPropertyValue('--accent')) return;   // seeded colour wins

    const img = $('.member__avatar-img', card);
    if (!img) return;

    const run = () => applyAccent(card, dominantColour(img));
    if (img.complete && img.naturalWidth) run();
    else img.addEventListener('load', run, { once: true });
  });
}

/** Copy-to-clipboard for the Discord ID, with a visible confirmation. */
function initCopy() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;

    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API needs a secure context; fall back to a temp selection.
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* give up silently */ }
      ta.remove();
    }

    btn.classList.add('is-copied');
    btn.innerHTML = ICONS.check;
    toast(`${t('team.copied')} — ${value}`);

    setTimeout(() => {
      btn.classList.remove('is-copied');
      btn.innerHTML = ICONS.discord;
    }, 1800);
  });
}

let toastTimer;
function toast(msg) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2400);
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
        <h3 class="skill-card__title">${esc(tx(g.category))}</h3>
      </header>
      ${g.items
        .map(
          (s) => `
        <div class="skill">
          <div class="skill__row">
            <span class="skill__name">${esc(tx(s.name))}</span>
            <span class="skill__pct">${num(s.level)}%</span>
          </div>
          <div class="skill__track" role="progressbar" aria-label="${esc(tx(s.name))}"
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

  if (REDUCED) { bars.forEach((b) => (b.style.width = b.dataset.level + '%')); return; }

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const bar = e.target;
      const delay = [...bar.closest('.skill-card').querySelectorAll('.skill__fill')].indexOf(bar) * 110;
      setTimeout(() => (bar.style.width = bar.dataset.level + '%'), delay);
      io.unobserve(bar);
    }),
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

/* ──────────────────────── RENDER: PROJECTS ────────────────────── */

function projectCard(p, i) {
  const owner = TEAM.find((m) => m.initials === p.owner);
  const od = owner ? DISCORD.users?.[owner.socials?.discord] : null;

  const link =
    p.links?.repo   ? { href: p.links.repo,   label: t('projects.source'),  icon: ICONS.link } :
    p.links?.video  ? { href: p.links.video,  label: t('projects.video'),   icon: ICONS.play } :
    p.links?.discord? { href: p.links.discord,label: t('projects.details'), icon: ICONS.discord } : null;

  return `
  <article class="project reveal${p.image ? ' has-shot' : ''}" data-accent="${esc(p.accent || 'violet')}"
           data-tags="${esc((p.tags || []).join(','))}" data-delay="${Math.min(i + 1, 5)}">

    ${
      p.image
        ? `<div class="project__shot">
             <img src="${esc(p.image)}" alt="" loading="lazy" decoding="async">
             ${p.featured ? `<span class="tag-featured">${esc(t('projects.featured'))}</span>` : ''}
           </div>`
        : ''
    }

    <div class="project__body">
      <header class="project__head">
        <span class="project__icon" aria-hidden="true">${ICONS.code}</span>
        <div class="project__meta">
          ${!p.image && p.featured ? `<span class="tag-featured">${esc(t('projects.featured'))}</span>` : ''}
          <span class="project__year">${num(p.year)}</span>
        </div>
      </header>

      <h3 class="project__title">${esc(tx(p.title))}</h3>
      <p class="project__summary">${esc(tx(p.summary))}</p>

      <div class="project__stack">
        ${(p.stack || []).map((x) => `<span class="chip">${esc(x)}</span>`).join('')}
      </div>

      <footer class="project__foot">
        ${
          owner
            ? `<span class="project__owner" title="${esc(tx(owner.name))}">
                 ${od?.avatar ? `<img src="${esc(od.avatar)}" alt="" loading="lazy">` : ''}
                 <span>${esc(tx(owner.name))}</span>
               </span>`
            : '<span></span>'
        }
        ${
          link
            ? `<a class="project__link" href="${esc(link.href)}" target="_blank" rel="noopener">
                 ${esc(link.label)} ${link.icon}
               </a>`
            : ''
        }
      </footer>
    </div>
  </article>`;
}

function renderProjects() {
  const grid = $('#projectsGrid');
  const bar  = $('#filters');
  if (!grid || !bar) return;

  grid.innerHTML = PROJECTS.map(projectCard).join('');
  bar.setAttribute('aria-label', t('projects.filters'));

  const labels = FILTER_LABELS[LANG] || FILTER_LABELS.en;
  bar.innerHTML = PROJECT_FILTERS.map(
    (f, i) => `
    <button class="filter ${i === 0 ? 'is-active' : ''}" role="tab"
            aria-selected="${i === 0}" data-filter="${esc(f)}">${esc(labels[f] || f)}</button>`
  ).join('');
}

/** Bound once — survives re-render because it is delegated. */
function initFilters() {
  const bar = $('#filters');
  const grid = $('#projectsGrid');
  if (!bar || !grid) return;

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
      const show = filter === 'All' || (card.dataset.tags || '').split(',').includes(filter);
      card.classList.toggle('is-hidden', !show);
      if (show && !REDUCED) {
        card.classList.remove('is-entering');
        void card.offsetWidth;              // force reflow to restart the animation
        card.classList.add('is-entering');
      }
    });
  });
}

/* ────────────────────────── RENDER: GUILD ─────────────────────── */

function renderGuild() {
  const host = $('#guildCard');
  const g = DISCORD.guild;
  if (!host) return;

  if (!g) { host.hidden = true; return; }
  host.hidden = false;

  host.innerHTML = `
    <a class="guild" href="${esc(g.invite)}" target="_blank" rel="noopener">
      <div class="guild__banner" aria-hidden="true">
        ${g.banner || g.splash ? `<img src="${esc(g.banner || g.splash)}" alt="" loading="lazy">` : ''}
      </div>
      <div class="guild__body">
        ${g.icon ? `<img class="guild__icon" src="${esc(g.icon)}" alt="" loading="lazy" width="56" height="56">` : ''}
        <div class="guild__info">
          <p class="guild__name">${esc(g.name)}</p>
          <p class="guild__stats">
            ${g.online != null ? `<span class="guild__dot guild__dot--on"></span>${group(g.online)} ${esc(t('guild.online'))}` : ''}
            ${g.members != null ? `<span class="guild__dot"></span>${group(g.members)} ${esc(t('guild.members'))}` : ''}
          </p>
        </div>
        <span class="guild__cta">${esc(t('guild.join'))}</span>
      </div>
    </a>`;
}

/* ───────────────────────── RENDER: PROCESS ────────────────────── */

function renderProcess() {
  const host = $('#processList');
  if (!host) return;

  host.innerHTML = PROCESS.map(
    (p, i) => `
    <li class="process__item reveal" data-delay="${Math.min(i + 1, 5)}">
      <span class="process__step">${num(p.step)}</span>
      <h3 class="process__title">${esc(tx(p.title))}</h3>
      <p class="process__text">${esc(tx(p.text))}</p>
    </li>`
  ).join('');
}

/* ───────────────────────── STATIC STRINGS ─────────────────────── */

/** Apply translations to everything marked with data-i18n. */
function applyStatic() {
  $$('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));

  document.title = t('meta.title');
  $('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
  $('meta[property="og:title"]')?.setAttribute('content', t('meta.title'));
  $('meta[property="og:description"]')?.setAttribute('content', t('meta.desc'));
  $('html').setAttribute('lang', LANG);
  $('html').setAttribute('dir', LANGS[LANG].dir);

  const year = $('#year');
  if (year) year.textContent = num(new Date().getFullYear());
}

/* ───────────────────────────── HERO TYPE ──────────────────────── */

let typeTimer;
function initTypewriter() {
  const el = $('#typewriter');
  const roles = HERO_ROLES[LANG] || HERO_ROLES.en;
  if (!el || !roles.length) return;

  clearTimeout(typeTimer);

  if (REDUCED) { el.textContent = roles[0]; return; }

  let word = 0, char = 0, deleting = false;

  const tick = () => {
    const current = roles[word];
    el.textContent = current.slice(0, char);

    let wait = deleting ? 45 : 85;

    if (!deleting && char === current.length) {
      wait = 1700;                        // hold the finished word
      deleting = true;
    } else if (deleting && char === 0) {
      deleting = false;
      word = (word + 1) % roles.length;
      wait = 320;
    } else {
      char += deleting ? -1 : 1;
    }
    typeTimer = setTimeout(tick, wait);
  };
  tick();
}

/* ──────────────────────────── LANG SWITCH ─────────────────────── */

function initLangSwitch() {
  const btns = $$('[data-lang]');

  const sync = () => btns.forEach((b) => {
    const on = b.dataset.lang === LANG;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });

  btns.forEach((b) =>
    b.addEventListener('click', () => {
      const next = b.dataset.lang;
      if (next === LANG || !LANGS[next]) return;

      LANG = next;
      try { localStorage.setItem(STORE_KEY, LANG); } catch { /* ignore */ }

      // Re-render everything that contains copy.
      applyStatic();
      renderStats();
      renderTeam();
      renderSkills();
      renderProjects();
      renderProcess();
      renderGuild();

      // Observers were bound to nodes that no longer exist.
      initReveal();
      initCounters();
      initSkillBars();
      initTypewriter();
      syncFormLabels();
      sync();
    })
  );

  sync();
}

/* ──────────────────────────── NAVIGATION ──────────────────────── */

function initNav() {
  const header = $('#header');
  const nav    = $('#nav');
  const toggle = $('#navToggle');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', t('nav.open'));
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? t('nav.close') : t('nav.open'));
  });

  nav.addEventListener('click', (e) => { if (e.target.closest('.nav__link')) closeMenu(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
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
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) =>
        l.classList.toggle('is-active', l.getAttribute('href') === `#${e.target.id}`));
    }),
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

/* ────────────────────────── SCROLL REVEAL ─────────────────────── */

let revealIO;
function initReveal() {
  revealIO?.disconnect();

  const items = $$('.reveal');
  if (!items.length) return;

  if (REDUCED) { items.forEach((i) => i.classList.add('is-visible')); return; }

  revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      revealIO.unobserve(e.target);
    }),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((i) => revealIO.observe(i));
}

/* ──────────────────────────── THE FORM ────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RULES = {
  name:    (v) => (v.trim().length >= 2 ? '' : 'form.err.name'),
  email:   (v) => (EMAIL_RE.test(v.trim()) ? '' : 'form.err.email'),
  subject: (v) => (v.trim().length >= 3 ? '' : 'form.err.subject'),
  message: (v) => (v.trim().length >= 20 ? '' : 'form.err.message'),
};

/** Re-translate any error already on screen after a language switch. */
function syncFormLabels() {
  $$('#contactForm .field.has-error').forEach((f) => {
    const input = $('input, textarea', f);
    const key = RULES[input.name]?.(input.value);
    if (key) $(`#${input.getAttribute('aria-describedby')}`).textContent = t(key);
  });
}

function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  const note = $('#formNote');

  const validate = (input) => {
    const key = RULES[input.name]?.(input.value) ?? '';
    const field = input.closest('.field');
    field.classList.toggle('has-error', Boolean(key));
    const err = $(`#${input.getAttribute('aria-describedby')}`);
    if (err) err.textContent = key ? t(key) : '';
    input.setAttribute('aria-invalid', String(Boolean(key)));
    return !key;
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

    if (inputs.map(validate).includes(false)) {
      note.textContent = t('form.err.fix');
      note.classList.remove('is-ok');
      $('.field.has-error input, .field.has-error textarea', form)?.focus();
      return;
    }

    // Static host: no backend. Hand off to the visitor's mail client.
    const d = Object.fromEntries(new FormData(form));
    const body = `${t('form.name')}: ${d.name}\n${t('form.email')}: ${d.email}\n\n${d.message}`;
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;

    note.textContent = t('form.sending');
    note.classList.add('is-ok');
    form.reset();
  });
}

/* ─────────────────────────────  BOOT  ─────────────────────────── */

async function init() {
  await loadDiscord();
  applyStatic();

  // content first — reveal/observers must see the finished DOM
  renderStats();
  renderTeam();
  renderSkills();
  renderProjects();
  renderProcess();
  renderGuild();

  initNav();
  initScrollSpy();
  initFilters();
  initCopy();
  initLangSwitch();
  initReveal();
  initCounters();
  initSkillBars();
  initTypewriter();
  initForm();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
