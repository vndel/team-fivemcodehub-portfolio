#!/usr/bin/env node
/**
 * =============================================================
 *  Discord Seed  —  npm run seed
 * =============================================================
 *  Fetches avatars, banners, and accent colours for every member
 *  listed in TEAM, then writes assets/data/discord.json.
 *
 *  WHY A BUILD STEP INSTEAD OF FETCHING IN THE BROWSER?
 *    1. discord.com/api rejects unauthenticated requests (401).
 *    2. A bot token shipped to the browser is a public token —
 *       anyone could read it from view-source and take the server.
 *    3. Discord sends no CORS headers, so the browser is blocked
 *       regardless.
 *
 *  So the token stays in .env (git-ignored), runs locally, and only
 *  the resulting public CDN URLs are committed.
 *
 *  USAGE
 *    cp .env.example .env      # then paste DISCORD_BOT_TOKEN
 *    npm run seed
 * =============================================================
 */

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'assets/data/discord.json');
const API = 'https://discord.com/api/v10';
const CDN = 'https://cdn.discordapp.com';

/* ── env ──────────────────────────────────────────────────── */

async function loadEnv() {
  try {
    const raw = await readFile(resolve(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch { /* no .env — rely on real env vars */ }
}

/* ── api ──────────────────────────────────────────────────── */

/** Discord blocks the default Node user-agent, so send a real one. */
const HEADERS = (token) => ({
  Authorization: `Bot ${token}`,
  'User-Agent': 'DiscordBot (https://team.fivemcodehub.com, 1.0)',
});

async function api(path, token, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(API + path, { headers: HEADERS(token) });

    if (res.status === 429) {
      const { retry_after: wait = 1 } = await res.json().catch(() => ({}));
      await new Promise((r) => setTimeout(r, wait * 1000 + 300));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${path}`);
    return res.json();
  }
  throw new Error(`rate limited after ${tries} tries — ${path}`);
}

/* ── helpers ──────────────────────────────────────────────── */

const isAnimated = (hash) => typeof hash === 'string' && hash.startsWith('a_');

const asset = (path, hash, size) =>
  `${CDN}/${path}/${hash}.${isAnimated(hash) ? 'gif' : 'png'}?size=${size}`;

/** Discord returns accent_color as a 24-bit integer. */
const intToHex = (n) =>
  typeof n === 'number' ? '#' + n.toString(16).padStart(6, '0') : null;

/** Fallback avatar when the user has never set one. */
const defaultAvatar = (id) =>
  `${CDN}/embed/avatars/${(BigInt(id) >> 22n) % 6n}.png`;

/** Relative luminance — decides whether text on this colour should be dark. */
function isLight(hex) {
  if (!hex) return false;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.45;
}

/**
 * Discord accent colours are frequently near-black (#161616, #454b4b), which
 * would make the card halo invisible against a dark page. Report whether the
 * colour carries enough light and saturation to be usable as an accent; the
 * client falls back to sampling the avatar when it does not.
 */
function isUsableAccent(hex) {
  if (!hex) return false;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const mx = Math.max(r, g, b);
  const sat = mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx;
  return mx > 90 && sat > 0.22;
}

/* ── main ─────────────────────────────────────────────────── */

async function main() {
  await loadEnv();

  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.error('\n  Missing DISCORD_BOT_TOKEN.');
    console.error('  Copy .env.example to .env and paste your bot token.\n');
    process.exit(1);
  }

  // Read the IDs straight out of data.js so the two never drift apart.
  const dataSrc = await readFile(resolve(ROOT, 'assets/js/data.js'), 'utf8');
  const ids = [...dataSrc.matchAll(/discord:\s*'(\d{17,20})'/g)].map((m) => m[1]);

  if (!ids.length) {
    console.error('  No Discord IDs found in assets/js/data.js.');
    process.exit(1);
  }

  console.log(`\n  Seeding ${ids.length} member(s)…\n`);

  const me = await api('/users/@me', token);
  console.log(`  bot: ${me.username}#${me.discriminator ?? ''} (${me.id})\n`);

  const users = {};

  for (const id of ids) {
    try {
      const u = await api(`/users/${id}`, token);
      const accent = intToHex(u.accent_color) || u.banner_color || null;

      users[id] = {
        id,
        username: u.username,
        globalName: u.global_name || null,
        avatar: u.avatar ? asset(`avatars/${id}`, u.avatar, 256) : defaultAvatar(id),
        avatarStatic: u.avatar ? `${CDN}/avatars/${id}/${u.avatar}.png?size=256` : defaultAvatar(id),
        banner: u.banner ? asset(`banners/${id}`, u.banner, 600) : null,
        accent,
        accentIsLight: isLight(accent),
        accentUsable: isUsableAccent(accent),
        decoration: u.avatar_decoration_data?.asset
          ? `${CDN}/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png?size=160`
          : null,
        tag: u.primary_guild?.identity_enabled ? u.primary_guild.tag : null,
        tagBadge: u.primary_guild?.badge && u.primary_guild?.identity_guild_id
          ? `${CDN}/clan-badges/${u.primary_guild.identity_guild_id}/${u.primary_guild.badge}.png?size=32`
          : null,
        profile: `https://discord.com/users/${id}`,
      };

      console.log(
        `  ✓ ${u.username.padEnd(18)} avatar${u.banner ? ' + banner' : '         '}` +
        `${accent ? ` ${accent}` : ''}`
      );
    } catch (err) {
      console.error(`  ✗ ${id} — ${err.message}`);
    }
  }

  /* Server card — pulled from the invite so it needs no extra perms. */
  let guild = null;
  const invite = process.env.DISCORD_INVITE_CODE;

  if (invite) {
    try {
      const res = await fetch(`${API}/invites/${invite}?with_counts=true`, { headers: HEADERS(token) });
      const inv = await res.json();

      if (inv?.guild) {
        const g = inv.guild;
        guild = {
          id: g.id,
          name: g.name,
          description: g.description || null,
          icon: g.icon ? asset(`icons/${g.id}`, g.icon, 256) : null,
          banner: g.banner ? asset(`banners/${g.id}`, g.banner, 600) : null,
          splash: g.splash ? `${CDN}/splashes/${g.id}/${g.splash}.png?size=600` : null,
          members: inv.approximate_member_count ?? null,
          online: inv.approximate_presence_count ?? null,
          invite: `https://discord.gg/${invite}`,
        };
        console.log(`\n  ✓ guild: ${g.name} — ${guild.members ?? '?'} members`);
      }
    } catch (err) {
      console.error(`  ✗ invite ${invite} — ${err.message}`);
    }
  }

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(
    OUT,
    JSON.stringify({ generatedAt: new Date().toISOString(), users, guild }, null, 2) + '\n'
  );

  console.log(`\n  → assets/data/discord.json\n`);
}

main().catch((err) => {
  console.error('\n  seed failed:', err.message, '\n');
  process.exit(1);
});
