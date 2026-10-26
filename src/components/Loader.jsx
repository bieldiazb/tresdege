import { useEffect, useState } from "react"

// L'entrada és el primer instant del hero: una capa blau marí on s'obre un cercle des del centre
// i deixa veure el degradat de darrere, mentre les lletres de TRESDEGÉ pugen (index.css).
// Només la primera vegada de la sessió; index.html l'amaga si ja l'has vista o si no hi ha JS.
export default function Loader() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    try { sessionStorage.setItem("td-intro", "1") } catch { /* sense storage: es tornarà a veure */ }
    const t = setTimeout(() => setGone(true), 1400)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null
  return <div className="loader" aria-hidden="true" />
}
