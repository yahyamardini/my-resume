// Renders <App /> to static HTML and injects it into dist/index.html, so the
// deployed page carries its content without executing JavaScript. Runs after
// `vite build`; the client then hydrates that markup (see src/main.jsx).
//
// Uses Vite's SSR module loader rather than plain node so that JSX and the
// `import './styles/App.css'` in App.jsx resolve the same way they do in the
// browser build.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist', 'index.html');
const PLACEHOLDER = '<!--app-html-->';

const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true },
});

try {
  const template = await readFile(indexPath, 'utf8');
  if (!template.includes(PLACEHOLDER)) {
    throw new Error(
      `${PLACEHOLDER} not found in dist/index.html — did index.html lose it?`,
    );
  }

  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const html = renderToString(React.createElement(App));

  await writeFile(indexPath, template.replace(PLACEHOLDER, html));
  console.log(`prerender: injected ${html.length} bytes into dist/index.html`);
} finally {
  await vite.close();
}
