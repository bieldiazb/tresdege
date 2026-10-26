import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { goTo } from "../lib/scroll"

const steps = [
  {
    num: "01",
    title: "Descoberta",
    duration: "1–2 dies",
    description:
      "Comencem per entendre el teu negoci, el teu públic i els teus objectius. Una conversa honesta que marca el camí.",
    details: ["Briefing inicial", "Anàlisi de competència", "Definició d'objectius", "Proposta de col·laboració"],
    accent: "#0084ff",
  },
  {
    num: "02",
    title: "Concepte",
    duration: "3–5 dies",
    description:
      "Transformem el briefing en idees. Explorem direccions visuals i triem la que millor representa la teva marca.",
    details: ["Moodboard visual", "Direccions creatives", "Presentació de conceptes", "Feedback i refinament"],
    accent: "#7c6fff",
  },
  {
    num: "03",
    title: "Disseny",
    duration: "1–3 setmanes",
    description:
      "Executem el concepte escollit amb precisió. Cada píxel, cada tipografia i cada color té un motiu.",
    details: ["Disseny de peces principals", "Sistema visual complet", "Revisions iteratives", "Aprovació final"],
    accent: "#a2b4dd",
  },
  {
    num: "04",
    title: "Entrega",
    duration: "1–2 dies",
    description:
      "Et lliurem tots els arxius ordenats i preparats per usar. I si cal, t'expliquem com treure'n el màxim profit.",
    details: ["Arxius en tots els formats", "Manual d'ús bàsic", "Suport post-entrega", "Arxiu del projecte"],
    accent: "#7fd1ff",
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(steps.length - 1) * 100}vw`])

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ height: `${steps.length * 60}vh` }}
      className="relative bg-[#1a0a4a]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-[#1a0a4a]">

        {/* Capçalera compacta */}
        <motion.div
          ref={headerRef}
          className="pt-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-end justify-between"
          initial={{ y: 16 }}
          animate={headerInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white font-titol leading-tight tracking-[-0.02em]">
            Com treballem: del briefing a l'entrega
          </h2>
        </motion.div>

        {/* Barra progrés */}
        <div className="mt-4 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="relative h-px bg-white/25">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>

        {/* Slides */}
        <div className="flex-1 flex items-stretch overflow-hidden">
          <motion.div className="flex" style={{ x }}>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} scrollYProgress={scrollYProgress} total={steps.length} />
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="pb-6 flex justify-center gap-2">
          {steps.map((_, i) => (
            <Dot key={i} i={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  )
}

// Indicador del pas actiu: s'eixampla quan el seu tram de scroll és a la vista (scaleX, sense animar width)
function Dot({ i, total, progress }) {
  const range = [i / total, (i + 0.5) / total]
  const scaleX = useTransform(progress, range, [1, 3.3])
  const opacity = useTransform(progress, range, [0.3, 0.95])
  return (
    <span className="w-[6px] h-[6px] mx-[7px]">
      <motion.span className="block h-full w-full rounded-full bg-white origin-center" style={{ scaleX, opacity }} />
    </span>
  )
}

function StepCard({ step, index, scrollYProgress, total }) {
  // Cada card activa quan el seu rang de scroll
  const start = index / total
  const end = (index + 1) / total

  // El pas actiu sempre a opacitat plena (el primer a l'inici, l'últim al final); els veïns s'esvaeixen
  // Rangs sempre dins [0, 1] i creixents (framer els passa a WAAPI, que no n'accepta d'altres)
  const first = index === 0
  const last = index === total - 1
  const inRange = [...(first ? [] : [start - 0.08]), start, end, ...(last ? [] : [end + 0.08])]
  const outRange = [...(first ? [] : [0.3]), 1, 1, ...(last ? [] : [0.3])]
  const cardOpacity = useTransform(scrollYProgress, inRange, outRange)
  const cardScale  = useTransform(scrollYProgress, first ? [0, 1] : [start - 0.08, start], first ? [1, 1] : [0.97, 1])

  return (
    <motion.div
      className="w-screen shrink-0 px-6 md:px-12 flex items-center"
      style={{ opacity: cardOpacity, scale: cardScale }}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center">

        {/* Layout: número gegant + contingut */}
        <div className="w-full grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">

          {/* Número gran */}
          <div className="hidden md:flex items-center justify-center">
            <motion.span
              className="font-bold font-titol leading-none select-none"
              style={{
                fontSize: "28vw",
                color: step.accent,
                opacity: 0.15,
                lineHeight: 1,
              }}
            >
              {step.num}
            </motion.span>
          </div>

          {/* Contingut */}
          <div className="flex flex-col gap-6 py-8">

            {/* Tag + durada */}
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: step.accent }}
              />
              <span className="text-sm text-white/85 font-text">
                Pas {step.num} — {step.duration}
              </span>
            </div>

            {/* Títol */}
            <h3 className="text-5xl md:text-5xl lg:text-6xl lg:text-7xl font-bold text-white font-titol leading-none">
              {step.title}
            </h3>

            {/* Línia */}
            <div className="h-px w-12" style={{ backgroundColor: step.accent }} />

            {/* Descripció + detalls en columnes */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <p className="text-base md:text-lg text-white/75 leading-relaxed">
                {step.description}
              </p>

              <ul className="flex flex-col gap-2.5">
                {step.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-text text-white/80">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: step.accent }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA últim pas */}
            {index === total - 1 && (
              <div className="pt-2">
                <a
                  href="#contacte"
                  onClick={goTo("contacte")}
                  className="press inline-flex items-center gap-2 rounded-full bg-white text-[#1a0a4a] font-text font-semibold text-base px-8 py-4 hover:bg-white/90"
                >
                  Comencem un projecte
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  )
}