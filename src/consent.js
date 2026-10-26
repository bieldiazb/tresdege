// Consentiment de cookies + Google Analytics 4 (mode bàsic: GA4 no es carrega fins que s'accepta).
// La mateixa peça serveix a la home (main.jsx) i a les pàgines legals (legal.js).
// Qualsevol element amb [data-cookie-settings] torna a obrir el bàner.

const GA_ID = "G-KDYWXVXHGS"
const KEY = "td-cookie-consent" // "granted" | "denied" (dada tècnica, exempta de consentiment)
const VERSION = 1 // puja-ho si canvien les cookies i cal tornar a preguntar

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return v?.version === VERSION ? v.analytics : null
  } catch {
    return null
  }
}

function save(analytics) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, version: VERSION, date: new Date().toISOString() }))
  } catch { /* sense storage: es tornarà a preguntar */ }
}

let loaded = false
function loadAnalytics() {
  window[`ga-disable-${GA_ID}`] = false
  if (loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
  window.gtag("js", new Date())
  window.gtag("config", GA_ID)
  const s = document.createElement("script")
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

// Retirar el consentiment: atura GA4 i esborra les seves cookies (_ga, _ga_XXXX) de tots els dominis possibles
function stopAnalytics() {
  window[`ga-disable-${GA_ID}`] = true
  window.gtag?.("consent", "update", { analytics_storage: "denied" })
  const host = location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim()
    if (!name.startsWith("_ga")) continue
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`
    }
  }
}

const CSS = `
.td-cc{position:fixed;z-index:9990;left:16px;right:16px;bottom:16px;max-width:520px;margin-left:auto;
  background:#12063b;color:#fff;border-radius:16px;padding:20px;font:400 15px/1.5 "DM Sans Variable",system-ui,sans-serif;
  box-shadow:0 18px 50px -12px rgba(18,6,59,.55);transform:translateY(0);opacity:1;
  transition:transform 280ms cubic-bezier(.23,1,.32,1),opacity 200ms ease}
.td-cc[data-hidden]{transform:translateY(16px);opacity:0;pointer-events:none}
@starting-style{.td-cc{transform:translateY(16px);opacity:0}}
.td-cc h2{margin:0 0 6px;font:600 17px/1.3 "Outfit Variable",system-ui,sans-serif}
.td-cc p{margin:0 0 16px;color:rgba(255,255,255,.88)}
.td-cc a{color:#fff;text-decoration:underline;text-underline-offset:3px}
.td-cc-row{display:flex;gap:8px;flex-wrap:wrap}
.td-cc button{flex:1 1 140px;min-height:44px;border-radius:999px;font:600 15px/1 "DM Sans Variable",system-ui,sans-serif;
  cursor:pointer;transition:transform 160ms cubic-bezier(.23,1,.32,1),background-color 200ms ease}
.td-cc button:active{transform:scale(.97)}
.td-cc button:focus-visible{outline:2px solid #7fd1ff;outline-offset:3px}
/* Mateix format per a les dues opcions (AEPD, Guia de cookies 2023) */
.td-cc-accept,.td-cc-reject{background:#fff;color:#12063b;border:0}
.td-cc-accept:hover,.td-cc-reject:hover{background:#e8ecff}
@media (prefers-reduced-motion:reduce){.td-cc{transition:opacity 200ms ease}}
`

let box = null
function showBanner() {
  if (!document.getElementById("td-cc-style")) {
    const st = document.createElement("style")
    st.id = "td-cc-style"
    st.textContent = CSS
    document.head.appendChild(st)
  }
  if (!box) {
    box = document.createElement("section")
    box.className = "td-cc"
    box.setAttribute("role", "dialog")
    box.setAttribute("aria-labelledby", "td-cc-title")
    box.innerHTML = `
      <h2 id="td-cc-title">Cookies d'analítica</h2>
      <p>Amb el teu permís, fem servir Google Analytics per saber quantes persones visiten el web i com el fan servir. No hi ha publicitat. <a href="/cookies.html">Més informació</a></p>
      <div class="td-cc-row">
        <button type="button" class="td-cc-reject">Rebutjar</button>
        <button type="button" class="td-cc-accept">Acceptar</button>
      </div>`
    box.querySelector(".td-cc-accept").addEventListener("click", () => decide(true))
    box.querySelector(".td-cc-reject").addEventListener("click", () => decide(false))
    document.body.appendChild(box)
  }
  box.removeAttribute("data-hidden")
  box.querySelector(".td-cc-accept").focus({ preventScroll: true })
}

function hideBanner() {
  box?.setAttribute("data-hidden", "")
}

function decide(analytics) {
  save(analytics)
  hideBanner()
  if (analytics) loadAnalytics()
  else stopAnalytics()
}

export function initConsent() {
  const choice = read()
  if (choice === true) loadAnalytics()
  else if (choice === null) showBanner()

  // «Configura les cookies» des de qualsevol enllaç o botó amb data-cookie-settings
  document.addEventListener("click", (e) => {
    const t = e.target.closest?.("[data-cookie-settings]")
    if (!t) return
    e.preventDefault()
    showBanner()
  })
}
