import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from /my-resume/, so the build needs that
  // prefix. The dev server does not: with a base set it answers `/` with a bare
  // 302 to the base path, which some embedded browsers render as a blank page
  // rather than following.
  base: command === 'build' ? '/my-resume/' : '/',
  // `host: true` binds 0.0.0.0 instead of `localhost`. Node 20 resolves
  // `localhost` to IPv6, so the default leaves the server on [::1] only, while
  // the dev container's port forwarding connects over IPv4 127.0.0.1 and is
  // refused — the forwarded page comes up blank. Applies to `preview` too,
  // since .devcontainer/devcontainer.json forwards both 5173 and 4173.
  server: { host: true },
  preview: { host: true },
}))
