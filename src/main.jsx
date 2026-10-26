import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { initConsent } from "./consent"

const root = document.getElementById("root")
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producció el HTML ve prerenderitzat (scripts/prerender.mjs): hidratem
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

initConsent()
