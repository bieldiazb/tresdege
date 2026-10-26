import { FaInstagram } from "react-icons/fa"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { goTo } from "../lib/scroll"

export default function Navbar() {
  const [onHero, setOnHero] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")


  // Detectar secció activa + si estem al hero
  useEffect(() => {
    const sections = ["hero", "about", "services", "process", "work", "contacte"]

    const onScroll = () => {
      const hero = document.getElementById("hero")
      if (hero) setOnHero(window.scrollY < hero.offsetHeight - 80)

      // Quina secció és visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Bloquejar scroll i tancar amb Escape quan el menú mobile és obert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false) }
    if (mobileOpen) window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileOpen])

  const navLinks = [
    { id: "about",    label: "Sobre mi"   },
    { id: "services", label: "Serveis"    },
    { id: "process",  label: "Procés"     },
    { id: "work",     label: "Projectes"  },
    { id: "contacte", label: "Contacte"   },
  ]

  const linkClass = (id) => `
    relative text-sm font-text transition-colors duration-200
    ${onHero
      ? activeSection === id ? "text-white" : "text-white/85 hover:text-white"
      : activeSection === id ? "text-foreground" : "text-foreground/65 hover:text-foreground"
    }
  `

  return (
    <>
      <header className="fixed top-4 left-0 z-50 w-full px-4">
        <motion.div
          className={`
            mx-auto flex h-12 items-center justify-between rounded-full px-3
            w-full max-w-4xl backdrop-blur-xl transition-colors duration-500
            ${onHero
              ? "bg-[#12063b]/45 border border-white/15"
              : "bg-background/80 border border-border shadow-sm"
            }
          `}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          {/* Brand */}
          <a
            href="#hero"
            onClick={goTo("top")}
            className={`px-4 font-display text-2xl transition-colors duration-300 ${onHero ? "text-white" : "text-foreground"}`}
          >
            TRESDEGÉ
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 px-2 font-text">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={goTo(id)}
                aria-current={activeSection === id ? "true" : undefined}
                className={linkClass(id)}
                style={{ padding: "0.4rem 0.75rem" }}
              >
                {label}
                {/* Punt indicador secció activa */}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-dot"
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${onHero ? "bg-white" : "bg-foreground"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Divisor + Instagram */}
            <div className={`flex items-center gap-4 pl-4 ml-2 border-l transition-colors ${onHero ? "border-white/20" : "border-border"}`}>
              <a
                href="https://www.instagram.com/tresdege/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de TRESDEGÉ"
                className={`transition text-base ${onHero ? "text-white/85 hover:text-white" : "text-foreground/65 hover:text-foreground"}`}
              >
                <FaInstagram />
              </a>
            </div>
          </nav>

          {/* Botó mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`
              md:hidden rounded-full p-2 transition
              ${onHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}
            `}
            aria-label={mobileOpen ? "Tanca el menú" : "Obre el menú"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 z-40 h-full w-72 bg-background flex flex-col pt-24 pb-10 px-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ id, label }, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={goTo(id, () => setMobileOpen(false))}
                    className="block text-left py-3 border-b border-border/50 last:border-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="flex items-center justify-between group">
                      <span className={`text-2xl font-bold font-titol ${activeSection === id ? "text-foreground" : "text-foreground/40"}`}>
                        {label}
                      </span>
                      <span className="text-foreground/30 group-hover:text-foreground transition-colors duration-200 text-lg">
                        →
                      </span>
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer del menú */}
              <motion.div
                className="mt-auto flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-text">
                  Manresa
                </span>
                <a
                  href="https://www.instagram.com/tresdege/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-foreground/50 hover:text-foreground transition text-xl"
                >
                  <FaInstagram />
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}