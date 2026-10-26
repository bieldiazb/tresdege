// Scroll compartit: tots els enllaços interns passen per aquí (Lenis si és actiu)
let lenis = null
export const setLenis = (l) => { lenis = l }

export function scrollToId(id) {
  const el = id === "top" ? document.body : document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el)
  else window.scrollTo({ top: id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" })
}

// onClick per a <a href="#id">: manté l'enllaç real (indexable) i hi afegeix el scroll suau
export const goTo = (id, after) => (e) => {
  e.preventDefault()
  after?.()
  scrollToId(id)
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`)
}
