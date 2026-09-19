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

## Editing the content

All wording lives in `src/resume.json`; the components under `src/components/`
only render it. Adding a bullet or a skill means editing that file and nothing
else.

The shape borrows JSON Resume's field names where they fit (`basics`, `work`,
`highlights`, `languages`) so the data stays easy to export, but it is not the
JSON Resume schema and none of that toolchain is installed. It deviates where
the spec has no home for something: `selfLearning` and `programmingLanguages`
are local additions, `skills` is a flat array rather than keyword groups, and
dates are human strings ("March 2024") rather than ISO, since they are printed
verbatim.

The JSON-LD block in `index.html` still repeats the name, job title and
employer by hand — worth generating from `resume.json` if it grows.

## Prerendering

`npm run build` runs two steps: `vite build`, then `scripts/prerender.js`.

The prerender step renders `<App />` to static HTML and injects it into the
`<!--app-html-->` placeholder in `dist/index.html`. The client then hydrates that
markup rather than rendering from scratch (`src/main.jsx`).

This exists because a résumé is read by machines that don't run JavaScript —
notably link-preview crawlers (LinkedIn, Slack, WhatsApp) and "save page as".
Without it the deployed page is an empty `<div id="root">`.

Two constraints follow from this, worth knowing before editing:

- **Components must render without browser globals.** The prerender runs in
  Node, so anything touching `window`, `document` or `localStorage` at module
  scope or during the first render breaks the build. `ThemeToggle` reads
  `localStorage` in an effect for this reason, and renders `system` on its first
  pass so the client's markup matches what was prerendered.
- **Use `className`, never `class`.** React silently drops `class`, so a style
  written that way is simply absent with no warning.

If `dist/index.html` ever loses the `<!--app-html-->` placeholder, the build
fails loudly rather than deploying an empty shell.

## PDF

The site carries a ready-made PDF at `/my-resume/resume.pdf`, and the toolbar
link points at it. It is built during deployment by `scripts/pdf.sh`, which
renders the built site with WeasyPrint:

```bash
npm run build && npm run pdf   # needs weasyprint on PATH
```

WeasyPrint renders print media, so the file comes out of the same `@media print`
rules in `src/styles/App.css` as Ctrl+P. What it does *not* do is add the
furniture a browser's print dialog stamps into the paper margin — the date, the
document title, the page URL and the page numbers. That is a dialog setting no
stylesheet can reach, which is the reason the PDF is built here instead of being
left to whoever visits.

WeasyPrint runs no JavaScript, which is fine because the prerender step has
already written the content into `dist/index.html`. It is installed in CI only
(see `.github/workflows/deploy.yml`) and nothing local depends on it; `npm run
build` works without it.

The script stages `dist/` under the `my-resume/` prefix and serves it over HTTP
while rendering, because the built HTML references its assets absolutely
(`/my-resume/assets/...`) and no `file://` base URL can resolve those. It also
prints the page count and the embedded fonts, and warns if the web fonts were
missed and a system face was substituted.

The file is a build artifact under `dist/`, so it is not committed.

## Deployment

Pushing to `master` triggers `.github/workflows/` to build and publish `dist/`
to GitHub Pages.
