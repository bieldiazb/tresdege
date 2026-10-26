import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    image: "1.jpg",
    title: "Identitat de marca",
    client: "Projecte de mostra",
    tag: "Identitat Visual",
    year: "2024",
    description: "Desenvolupament complet d'identitat visual, direcció creativa i aplicacions digitals.",
  },
  {
    id: 2,
    image: "2.jpg",
    title: "Disseny de packaging",
    client: "Projecte de mostra",
    tag: "Packaging",
    year: "2024",
    description: "Sistema de packaging minimalista amb focus en sostenibilitat.",
  },
  {
    id: 3,
    image: "3.jpg",
    title: "Direcció d'art",
    client: "Projecte de mostra",
    tag: "Editorial",
    year: "2023",
    description: "Direcció artística per campanya digital i contingut editorial.",
  },
  {
    id: 4,
    image: "4.jpg",
    title: "Disseny web",
    client: "Projecte de mostra",
    tag: "Digital",
    year: "2024",
    description: "Disseny UX/UI per ecommerce premium.",
  },
  {
    id: 5,
    image: "5.jpg",
    title: "Rebranding",
    client: "Projecte de mostra",
    tag: "Branding",
    year: "2023",
    description: "Rebranding complet amb nou posicionament estratègic.",
  },
  {
    id: 6,
    image: "6.jpg",
    title: "Sistema visual",
    client: "Projecte de mostra",
    tag: "Identitat Visual",
    year: "2024",
    description: "Sistema visual modular per marca digital-first.",
  },
  {
    id: 7,
    image: "7.jpg",
    title: "Maquetació editorial",
    client: "Projecte de mostra",
    tag: "Editorial",
    year: "2023",
    description: "Disseny editorial i maquetació avançada.",
  },
  {
    id: 8,
    image: "8.jpg",
    title: "Campanya",
    client: "Projecte de mostra",
    tag: "Campanya",
    year: "2024",
    description: "Campanya 360º amb activacions digitals.",
  },
  {
    id: 9,
    image: "9.jpg",
    title: "Llançament de producte",
    client: "Projecte de mostra",
    tag: "Branding",
    year: "2023",
    description: "Llançament de producte amb direcció creativa.",
  },
  {
    id: 10,
    image: "10.jpg",
    title: "Marca digital",
    client: "Projecte de mostra",
    tag: "Digital",
    year: "2024",
    description: "Branding digital adaptat a xarxes socials.",
  },
  {
    id: 11,
    image: "11.jpg",
    title: "Sistema tipogràfic",
    client: "Projecte de mostra",
    tag: "Tipografia",
    year: "2023",
    description: "Sistema tipogràfic personalitzat.",
  },
  {
    id: 12,
    image: "12.jpg",
    title: "Concepte creatiu",
    client: "Projecte de mostra",
    tag: "Concepte",
    year: "2024",
    description: "Concepte creatiu i execució visual.",
  },
]

// Categories úniques extretes dels projectes
const categories = ["Tots", ...Array.from(new Set(projects.map((p) => p.tag)))]

// ─── MODAL ───────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="relative md:w-[55%] h-64 md:h-auto bg-neutral-900 overflow-hidden shrink-0"
          key={project.id + "-img"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <img src={`/images/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-5 text-white/10 text-8xl font-bold font-titol leading-none select-none pointer-events-none">
            {String(project.id).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col justify-between p-8 md:p-12 overflow-y-auto"
          key={project.id + "-text"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-text">
                {project.tag} — {project.year}
              </span>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors text-sm"
                aria-label="Tancar"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-titol leading-tight">
              {project.title}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-px w-6 bg-muted-foreground/40" />
              <p className="text-sm text-muted-foreground font-text">{project.client}</p>
            </div>

            <p className="mt-8 text-base text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <button onClick={onPrev} className="flex items-center gap-2 text-sm font-medium font-text text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
              Anterior
            </button>
            <span className="text-xs text-muted-foreground/40 font-mono">
              {String(project.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button onClick={onNext} className="flex items-center gap-2 text-sm font-medium font-text text-muted-foreground hover:text-foreground transition-colors group">
              Següent
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── COLUMNA PARALLAX ─────────────────────────────────────────────────────────

function Column({ projects, y, onSelect }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-8">
      {/* initial={false}: les peces es veuen des del primer pintat; només animen les que entren en filtrar */}
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project) => (
          <motion.button
            key={project.id}
            layout
            onClick={() => onSelect(project)}
            className="relative aspect-[3/4] rounded-xl overflow-hidden group text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            data-cursor="Veure"
          >
            <motion.div
              className="h-full w-full"
              initial={{ clipPath: "inset(6% 6% 6% 6% round 10px)", scale: 1.06 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
            <img
              src={`/images/${project.image}`}
              alt={`${project.title}, ${project.tag.toLowerCase()}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
            />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p className="text-sm text-white/85 font-text [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] delay-75">
                {project.tag}
              </p>
              <h3 className="text-white text-lg font-semibold font-titol [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                {project.title}
              </h3>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

// Parallax només amb 4 columnes: amb menys, les columnes s'apilen i les fotos se solaparien
const WIDE = "(min-width: 1024px)"
function useWide() {
  return useSyncExternalStore(
    (cb) => { const mq = window.matchMedia(WIDE); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb) },
    () => window.matchMedia(WIDE).matches,
    () => false,
  )
}

// ─── SECCIÓ PRINCIPAL ─────────────────────────────────────────────────────────

export default function WorkParallax() {
  const gallery = useRef(null)
  const [selected, setSelected] = useState(null)
  const [activeFilter, setActiveFilter] = useState("Tots")
  const wide = useWide()

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  })

  const y  = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 350])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 300])

  // Filtrar i redistribuir en 4 columnes
  const filtered = activeFilter === "Tots"
    ? projects
    : projects.filter((p) => p.tag === activeFilter)

  const col1 = filtered.filter((_, i) => i % 4 === 0)
  const col2 = filtered.filter((_, i) => i % 4 === 1)
  const col3 = filtered.filter((_, i) => i % 4 === 2)
  const col4 = filtered.filter((_, i) => i % 4 === 3)

  // Navegació del modal respectant el filtre actiu
  const selectedIndex = selected ? filtered.findIndex((p) => p.id === selected.id) : -1

  const handlePrev = () => {
    if (selectedIndex < 0) return
    const prev = (selectedIndex - 1 + filtered.length) % filtered.length
    setSelected(filtered[prev])
  }

  const handleNext = () => {
    if (selectedIndex < 0) return
    const next = (selectedIndex + 1) % filtered.length
    setSelected(filtered[next])
  }

  return (
    <section id="work" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Capçalera */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground font-titol leading-[1.05] tracking-[-0.02em]">
            Una selecció de treballs recents
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Identitats, direcció creativa, disseny digital i sistemes visuals creats
            per marques que volen destacar i comunicar amb criteri.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat)
                // Si el projecte seleccionat al modal no és al nou filtre, tancar
                if (selected && cat !== "Tots" && selected.tag !== cat) {
                  setSelected(null)
                }
              }}
              aria-pressed={activeFilter === cat}
              className={`press relative rounded-full px-5 py-2 text-sm font-text ${
                activeFilter === cat
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30"
              }`}
            >
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-pill-parallax"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Galeria */}
        <div ref={gallery} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Column projects={col1} y={wide ? y : 0}  onSelect={setSelected} />
          <Column projects={col2} y={wide ? y2 : 0} onSelect={setSelected} />
          <Column projects={col3} y={wide ? y3 : 0} onSelect={setSelected} />
          <Column projects={col4} y={wide ? y4 : 0} onSelect={setSelected} />
        </div>
      </div>

      <div className="h-0 lg:h-64" aria-hidden="true" />

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}