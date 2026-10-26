import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Loader2, Check } from "lucide-react"

function Field({ label, id, children, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      className="space-y-2"
      initial={{ y: 12 }}
      animate={inView ? { y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay }}
    >
      <label htmlFor={id} className="text-sm font-medium text-foreground font-text">
        {label}
      </label>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [focused, setFocused] = useState(null)

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const form = e.currentTarget
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }

    try {
      const res = await fetch("https://formspree.io/f/maqwoqee", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Error")
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b border-foreground/35 text-foreground placeholder:text-muted-foreground/80 text-base py-3 outline-none transition-colors duration-200 font-text"
  const inputFocused = "border-foreground"

  return (
    <section id="contacte" className="relative py-32 bg-background overflow-hidden">

      {/* Decoració de fons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Grid principal */}
        <div className="grid gap-20 md:grid-cols-2 items-start">

          {/* Columna esquerra */}
          <motion.div
            ref={headerRef}
            initial={{ y: 20 }}
            animate={headerInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground font-titol leading-[1.05] tracking-[-0.02em] max-w-md">
              Parlem del teu projecte
            </h2>

            <div className="mt-10 space-y-5 text-base text-muted-foreground leading-relaxed">
              <p>
                Si tens una idea, una marca o un projecte digital en ment, explica'ns-ho.
                Busquem crear identitats i experiències digitals amb criteri i personalitat.
              </p>
              <p>
                Treballem amb marques i projectes creatius que volen una presència
                digital sòlida, coherent i amb caràcter propi.
              </p>
            </div>

            {/* Email directe */}
            <div className="mt-12 border-t border-border/50 pt-8">
              <p className="text-base text-muted-foreground mb-2 font-text">
                O escriu directament a
              </p>
              <a
                href="mailto:hola@tresdege.com"
                className="text-2xl md:text-3xl font-semibold font-titol text-foreground hover:text-[#0068d6] underline decoration-foreground/20 hover:decoration-current transition-colors duration-200"
              >
                hola@tresdege.com
              </a>
            </div>
          </motion.div>

          {/* Columna dreta — formulari */}
          <div>
            {sent ? (
              <motion.div
                className="flex flex-col items-center text-center space-y-6 py-20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-titol">
                  Missatge enviat
                </h3>
                <p className="text-muted-foreground max-w-xs leading-relaxed">
                  Gràcies per escriure'ns. Et respondrem tan aviat com sigui possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                <Field label="Nom" id="name" delay={0.1}>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="El teu nom"
                    className={`${inputBase} ${focused === "name" ? inputFocused : ""}`}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>

                <Field label="Correu electrònic" id="email" delay={0.15}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="hola@tu.com"
                    className={`${inputBase} ${focused === "email" ? inputFocused : ""}`}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>

                <Field label="Missatge" id="message" delay={0.2}>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Explica'ns breument què necessites…"
                    className={`${inputBase} resize-none ${focused === "message" ? inputFocused : ""}`}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </Field>

                <div className="space-y-6">
                  <label className="flex items-start gap-3 text-base text-foreground font-text">
                    <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 accent-[#0068d6]" />
                    <span>
                      He llegit i accepto la{" "}
                      <a href="/privacitat.html" className="underline hover:text-foreground">política de privacitat</a>.
                    </span>
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed font-text">
                    Responsable: David Díaz Lladós (TRESDEGÉ). Finalitat: respondre la teva consulta.
                    Legitimació: el teu consentiment. Destinataris: Formspree (enviament del formulari), sense
                    cessions a tercers. Drets: accés, rectificació, supressió i altres, a hola@tresdege.com.
                  </p>
                  {error && (
                    <p role="alert" className="text-sm font-medium text-destructive">
                      No s'ha pogut enviar. Torna-ho a provar o escriu a hola@tresdege.com.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="press w-full rounded-full bg-foreground text-background font-text font-semibold text-base py-4 flex items-center justify-center gap-2 hover:bg-foreground/85 disabled:opacity-60 disabled:cursor-progress"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                    {loading ? "Enviant…" : "Enviar missatge"}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}