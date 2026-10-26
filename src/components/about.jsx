import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const blocs = [
  {
    num: "01",
    titol: "Qui sóc?",
    text: "Un dia del mes d'abril de l'any 2001, una cosa va portar a l'altra… o potser va ser al revés. El que sí que estava clar és que necessitava donar forma a una idea.",
  },
  {
    num: "02",
    titol: "Què vull fer?",
    text: "D'aquesta pregunta en va sortir el nom i el concepte: David Díaz + Disseny Gràfic (DD+DG). Tot junt i barrejat, però amb prioritat, no fos cas que l'ordre dels factors alterés el producte.",
  },
  {
    num: "03",
    titol: "Del nom a la marca",
    text: "Amb una mica de polsim matemàtic i també literari, el projecte va evolucionar: 3DG, TRESDG, TRESDEGÉ. El que havia començat com un nom es va convertir en una identitat.",
  },
  {
    num: "04",
    titol: "Avui",
    text: "Avui, TRESDEGÉ és un estudi de disseny gràfic a Manresa centrat en crear identitats clares, coherents i amb personalitat: logotips, etiquetes, maquetació i tot el material imprès d'una marca. Projectes que no només es veuen bé, sinó que tenen sentit.",
  },
]

function BlocItem({ bloc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className="group relative border-t border-foreground/10 pt-8 pb-2"
      initial={{ y: 24 }}
      animate={inView ? { y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Línia animada al hover */}
      <div className="absolute top-0 left-0 h-px w-full bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" aria-hidden="true" />

      <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug font-titol tracking-[-0.01em]">
        {bloc.titol}
      </h3>
      <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
        {bloc.text}
      </p>
    </motion.div>
  )
}

export default function About() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  return (
    <section id="about" className="relative py-28 md:py-36 bg-background overflow-hidden">

      {/* Títol gegant de fons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <motion.div
          className="mt-20 flex whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[20vw] font-bold font-display tracking-tighter text-foreground/5 mr-[10vw]"
            >
              TRESDEGÉ TRESDEGÉ TRESDEGÉ TRESDEGÉ
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Capçalera */}
        <motion.div
          ref={headerRef}
          initial={{ y: 20 }}
          animate={headerInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground font-titol leading-[1.05] tracking-[-0.02em] max-w-3xl">
            Tot va començar amb dues preguntes.
          </h2>
        </motion.div>

        {/* Grid de blocs */}
        <div className="mt-16 grid gap-0 md:grid-cols-2 md:gap-x-16">
          {blocs.map((bloc, i) => (
            <BlocItem key={bloc.num} bloc={bloc} index={i} />
          ))}
        </div>

        {/* Signatura */}
        <motion.div
          className="mt-20 flex items-center gap-4"
        >
          <div className="h-px w-8 bg-foreground/30" />
          <span className="text-foreground font-medium font-titol text-base">
            David Díaz Lladós
          </span>
        </motion.div>

      </div>
    </section>
  )
}