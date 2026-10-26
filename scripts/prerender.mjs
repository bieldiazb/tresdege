// Escriu l'HTML de la home dins dist/index.html perquè sigui indexable sense JS
import { readFileSync, writeFileSync, rmSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { resolve } from "node:path"

const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href)
const file = "dist/index.html"
const html = readFileSync(file, "utf8")
const out = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
if (out === html) throw new Error("No s'ha trobat <div id=\"root\"></div> a dist/index.html")
writeFileSync(file, out)
rmSync("dist-ssr", { recursive: true, force: true })
console.log("prerender: dist/index.html")
