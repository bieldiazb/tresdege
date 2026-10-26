import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Grainient from "./Grainient"
import { goTo } from "../lib/scroll"

// Entrades des d'un estat ja visible (sense JS el hero es llegeix igual); la cortina del Loader les tapa al principi
const EASE_OUT = [0.23, 1, 0.32, 1]
const rise = (delay, y = 16) => ({
  initial: { y },
  animate: { y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
})

const NAME = "TRESDEGÉ"

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // En sortir del hero, el rètol s'allunya i el contingut s'esvaeix: profunditat lligada al scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86])
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#12063b]"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Grainient
          color1="#a2b4dd"
          color2="#0084ff"
          color3="#12063b"
          timeSpeed={0.75}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.2}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.08}
          grainScale={1}
          grainAnimated
          contrast={1.5}
          gamma={1}
          saturation={0.5}
          centerX={0}
          centerY={0}
          zoom={0.75}
          interactive
        />
      </div>
      {/* Vel blau marí: garanteix 4,5:1 del text blanc sobre la zona clara del degradat */}
      <div className="absolute inset-0 z-0 bg-[#12063b]/35" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        {/* Lletres que pugen dins la seva màscara quan s'obre la cortina (CSS: sense JS es veuen quietes) */}
        <motion.p
          aria-label={NAME}
          className="text-[15vw] md:text-[10rem] leading-[0.85] text-white font-display tracking-[-0.03em] select-none will-change-transform"
          style={{ scale: nameScale, y: nameY }}
        >
          {[...NAME].map((ch, i) => (
            <span key={i} className="hero-mask" aria-hidden="true">
              <span className="hero-letter" style={{ "--i": i }}>{ch}</span>
            </span>
          ))}
        </motion.p>

        <motion.div style={{ opacity: fade }}>
        <motion.h1
          className="mt-6 md:mt-8 text-[1.75rem] leading-tight md:text-5xl font-titol font-semibold text-white tracking-[-0.02em]"
          {...rise(0.65)}
        >
          Dissenyador gràfic a Manresa
        </motion.h1>

        <motion.p
          className="mt-4 mx-auto max-w-xl text-base md:text-xl text-white/85 font-text"
          {...rise(0.72)}
        >
          Logotips, etiquetes, maquetació i gran format, amb els arxius a punt per a impremta.
        </motion.p>

        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          {...rise(0.8)}
        >
          <a
            href="#work"
            onClick={goTo("work")}
            data-cursor="Veure"
            className="press inline-flex items-center justify-center rounded-full bg-white font-text text-[#12063b] px-8 py-3.5 text-base font-semibold hover:bg-white/90"
          >
            Veure projectes
          </a>
          <a
            href="#contacte"
            onClick={goTo("contacte")}
            className="press inline-flex items-center justify-center rounded-full border border-white/40 font-text text-white px-8 py-3.5 text-base font-medium hover:border-white hover:bg-white/10"
          >
            Parlem del teu projecte
          </a>
        </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        onClick={goTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Baixa a Sobre mi"
      >
        <motion.span
          className="block w-px h-10 bg-current origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
        />
      </a>
    </section>
  )
}
