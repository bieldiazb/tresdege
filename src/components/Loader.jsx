import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const EASE_IN_OUT = [0.77, 0, 0.175, 1]

// Cortina d'entrada: es pinta per sobre (el contingut ja hi és, no s'amaga), dura < 1 s
// i només surt la primera vegada de la sessió. index.html la treu si ja l'has vista o si no hi ha JS.
export default function Loader() {
  const [open, setOpen] = useState(true)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    let already = false
    try {
      already = sessionStorage.getItem("td-intro") === "1"
      sessionStorage.setItem("td-intro", "1")
    } catch { /* sense storage: la mostrem igualment */ }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const skip = already || reduced
    const t = setTimeout(() => {
      if (skip) setSeen(true)
      setOpen(false)
    }, skip ? 0 : 350)
    return () => clearTimeout(t)
  }, [])

  if (seen) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="loader fixed inset-0 z-[9999] flex flex-col overflow-hidden pointer-events-none"
          aria-hidden="true"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex-1 bg-[#12063b] flex items-end px-8 md:px-16 pb-6"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <span className="font-display text-white text-5xl md:text-7xl tracking-tight leading-none">
              TRESDEGÉ
            </span>
          </motion.div>
          <motion.div
            className="flex-1 bg-[#0084ff] flex items-start justify-end px-8 md:px-16 pt-6"
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <span className="font-text text-white text-base md:text-lg">Disseny gràfic · Manresa</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
