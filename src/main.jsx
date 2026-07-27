import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders App into #root, so attach to that markup instead of
// throwing it away. Falls back to a client render during `vite dev`, where
// #root holds only the <!--app-html--> placeholder comment — hence
// firstElementChild rather than hasChildNodes(), which counts that comment.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
