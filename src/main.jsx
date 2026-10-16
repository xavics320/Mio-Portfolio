import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SpeedInsights } from "@vercel/speed-insights/next"

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>
)

// root.hasChildNodes() è true quando la pagina arriva prerenderizzata
// (vedi scripts/prerender.mjs) — in quel caso va idratata, non rimontata.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
