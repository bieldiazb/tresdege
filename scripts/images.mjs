// Genera AVIF + WebP a tres amplades a public/img/ a partir de photos/*.jpg
// Ús: npm run images
import sharp from "sharp"
import { readdirSync, mkdirSync, writeFileSync } from "node:fs"

const WIDTHS = [640, 1280, 1920]
mkdirSync("public/img", { recursive: true })
const sizes = {}

for (const file of readdirSync("photos").filter((f) => f.endsWith(".jpg"))) {
  const name = file.replace(/\.jpg$/, "")
  const meta = await sharp(`photos/${file}`).metadata()
  sizes[name] = { w: meta.width, h: meta.height }
  for (const w of WIDTHS.filter((w) => w <= meta.width)) {
    const img = sharp(`photos/${file}`).resize({ width: w })
    await img.clone().avif({ quality: 50 }).toFile(`public/img/${name}-${w}.avif`)
    await img.clone().webp({ quality: 72 }).toFile(`public/img/${name}-${w}.webp`)
  }
}
// Mides originals: les fa servir <Photo> per posar width/height i evitar CLS
writeFileSync("src/img-sizes.json", JSON.stringify(sizes, null, 2) + "\n")
console.log(sizes)
