import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/**
 * SectionDivider — separador animat entre seccions
 *
 * Props:
 *   variant: "line" | "dots" | "word"
 *   word: string (només per variant="word", default "✦")
 *   className: string extra
 *
 * Ús:
 *   <SectionDivider variant="line" />
 *   <SectionDivider variant="word" word="TRESDEGÉ" />
 *   <SectionDivider variant="dots" />
 */
export default function SectionDivider({ variant = "line", word = "✦", className = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  if (variant === "dots") {
    return (
      <div ref={ref} className={`flex items-center justify-center gap-3 py-4 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-foreground/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
    )
  }

  if (variant === "word") {
    return (
      <div ref={ref} className={`flex items-center gap-6 py-6 overflow-hidden ${className}`}>
        <motion.div
          className="flex-1 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          style={{ originX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.span
          className="text-xs uppercase tracking-[0.4em] text-muted-foreground/50 font-text shrink-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {word}
        </motion.span>
        <motion.div
          className="flex-1 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          style={{ originX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    )
  }

  // Default: "line"
  return (
    <div ref={ref} className={`px-6 max-w-7xl mx-auto ${className}`}>
      <motion.div
        className="h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        style={{ originX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

// ─── ÚS RECOMANAT ─────────────────────────────────────────────────────────────
// Entre Hero i About:
//   <SectionDivider variant="line" />
//
// Entre About i Services:
//   <SectionDivider variant="word" word="Serveis" />
//
// Entre sections més lleugeres:
//   <SectionDivider variant="dots" />