# my-resume

My résumé, built with React + Vite and deployed to GitHub Pages at
<https://yahyamardini.github.io/my-resume/>.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # vite build + prerender into dist/
npm run preview  # serve the built output
npm run lint
```

## Prerendering

`npm run build` runs two steps: `vite build`, then `scripts/prerender.js`.

The prerender step renders `<App />` to static HTML and injects it into the
`<!--app-html-->` placeholder in `dist/index.html`. The client then hydrates that
markup rather than rendering from scratch (`src/main.jsx`).

This exists because a résumé is read by machines that don't run JavaScript —
notably link-preview crawlers (LinkedIn, Slack, WhatsApp) and "save page as".
Without it the deployed page is an empty `<div id="root">`.

Two constraints follow from this, worth knowing before editing:

- **Components must render without browser globals.** `html2pdf.js` touches
  `window` at module scope, so `App.jsx` imports it dynamically inside the click
  handler. A top-level import would break the build.
- **Use `className`, never `class`.** React silently drops `class`, which
  previously meant the `html2pdf__page-break` divs did nothing and PDF page
  breaks never fired.

If `dist/index.html` ever loses the `<!--app-html-->` placeholder, the build
fails loudly rather than deploying an empty shell.

## Deployment

Pushing to `master` triggers `.github/workflows/` to build and publish `dist/`
to GitHub Pages.
