# Aviral.dev — Portfolio

A minimalistic, single-page portfolio. Paper, ink & grid — warm cream paper with
a subtle grain texture, a fixed framed border, a fine graph-paper grid, and a
light/dark theme toggle. No build step, no dependencies.

## Run

Just open `index.html` in a browser. Or serve it locally:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files

- `index.html` — content & structure
- `styles.css` — the full design system (theme tokens, grid, grain, frame)
- `script.js` — theme toggle (persists to `localStorage`, follows OS by default)

## Customize

- **Theme colors / grid / grain** — CSS variables at the top of `styles.css`
  (`:root` for light, `[data-theme="dark"]` for dark).
- **Links** — search `index.html` for `TODO` to drop in your real GitHub /
  LinkedIn / project repo URLs.

## Deploy

Static site — works as-is on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.
