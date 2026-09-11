# FiveM Code Hub — Team Portfolio

Professional team portfolio for **[team.fivemcodehub.com](https://team.fivemcodehub.com)**.
Pure HTML, CSS, and vanilla JavaScript — no build step, no dependencies, no server.

**Live:** <https://team.fivemcodehub.com> · **Mirror:** <https://vndel.github.io/team-fivemcodehub-portfolio/>

---

## Features

- **Data-driven** — all content lives in one file (`assets/js/data.js`). Adding a team member or project never requires touching HTML.
- **Responsive** — fluid typography and layouts from 320 px to ultrawide.
- **Accessible** — semantic landmarks, keyboard navigation, focus-visible rings, `aria-live` regions, and full `prefers-reduced-motion` support.
- **Fast** — no framework, no bundler. Single CSS file, single JS module.
- **SEO ready** — Open Graph tags, JSON-LD `Organization` schema, `sitemap.xml`, and `robots.txt`.

---

## Project structure

```
.
├── index.html                  # Markup and metadata
├── assets/
│   ├── css/styles.css          # Design tokens + all components
│   ├── js/
│   │   ├── data.js             # ← EDIT THIS to change content
│   │   └── main.js             # Rendering, animation, validation
│   └── img/
│       ├── favicon.svg
│       └── og.svg              # Social share card
├── CNAME                       # Custom domain
├── .nojekyll                   # Serve files starting with _
├── robots.txt
└── sitemap.xml
```

---

## Editing content

Everything is in **`assets/js/data.js`**.

### Add a team member

```js
export const TEAM = [
  // ...existing members
  {
    name: 'Full Name',
    role: 'Backend Developer',
    age: 22,
    location: 'Country',
    initials: 'FN',
    accent: 'cyan',                  // violet | cyan | pink | amber | lime
    bio: 'Short professional bio.',
    focus: ['Area 1', 'Area 2'],
    stack: ['Node.js', 'MySQL'],
    socials: { github: '#', discord: '#', email: 'mailto:you@example.com' },
  },
];
```

The card, colour theming, and scroll animation are generated automatically.

### Add a project

```js
export const PROJECTS = [
  // ...existing projects
  {
    title: 'Project Name',
    tags: ['API', 'Security'],       // must match PROJECT_FILTERS
    accent: 'violet',
    year: '2026',
    summary: 'What it does and why it matters.',
    stack: ['Node.js', 'Redis'],
    links: { repo: 'https://github.com/...', demo: null },
    featured: true,                  // optional — adds a "Featured" badge
  },
];
```

To add a new filter button, append the tag name to `PROJECT_FILTERS`.

### Change the colour identity

Edit the brand tokens at the top of `assets/css/styles.css`:

```css
:root {
  --violet: #8b5cf6;
  --cyan:   #22d3ee;
  --pink:   #f472b6;
}
```

Every gradient, accent, glow, and progress bar derives from these three values.

---

## Local preview

The site uses ES modules, so it must be served over HTTP — opening `index.html`
directly from the filesystem will fail on CORS.

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

---

## Deployment

GitHub Pages builds straight from the `main` branch — **push and it is live.**
There is no CI workflow to maintain, because the site is already static.

*Settings → Pages* is configured as:

| Setting | Value              |
|---------|--------------------|
| Source  | Deploy from branch |
| Branch  | `main` / `/` (root)|

### Custom domain

`CNAME` points at `team.fivemcodehub.com`, and the DNS record is already live:

| Type  | Name   | Value             |
|-------|--------|-------------------|
| CNAME | `team` | `vndel.github.io` |

Once GitHub finishes issuing the TLS certificate, tick **Enforce HTTPS** in
*Settings → Pages*.

To drop the custom domain, delete `CNAME` and the site serves from
`https://vndel.github.io/team-fivemcodehub-portfolio/`.

---

## Browser support

Chrome, Edge, Firefox, and Safari — current and previous major versions.
Requires support for ES modules, `IntersectionObserver`, and CSS `color-mix()`.

---

## License

MIT — see [LICENSE](LICENSE).
