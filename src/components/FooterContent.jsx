import { FaInstagram, FaRegEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { goTo } from "../lib/scroll";

export default function FooterContent() {
  return (
    <footer className="h-full w-full bg-foreground/90 text-background flex flex-col items-center justify-end ">

      {/* NAV + ICONES (just a sobre del text gran) */}
      <div className="flex flex-col items-center gap-4 mb-20">

        {/* NAVIGACIÓ */}
        <nav aria-label="Peu" className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base font-text text-background/80">
          <a href="#hero" onClick={goTo("top")} className="hover:text-background transition-colors duration-200">Inici</a>
          <a href="#work" onClick={goTo("work")} className="hover:text-background transition-colors duration-200">Projectes</a>
          <a href="#services" onClick={goTo("services")} className="hover:text-background transition-colors duration-200">Serveis</a>
          <a href="#contacte" onClick={goTo("contacte")} className="hover:text-background transition-colors duration-200">Contacte</a>
        </nav>

        {/* ICONES */}
        <div className="flex gap-8 text-2xl text-background/70">
          <a
            href="mailto:hola@tresdege.com"
            className="hover:text-background transition-colors duration-200"
            aria-label="Envia un correu a hola@tresdege.com"
          >
            <FaRegEnvelope />
          </a>
          <a
            href="https://www.instagram.com/tresdege/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-background transition-colors duration-200"
            aria-label="Instagram de TRESDEGÉ"
          >
            <FaInstagram />
          </a>
        </div>

        {/* LEGAL */}
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-6 text-center text-sm font-text text-background/70">
          <a href="/avis-legal.html" className="hover:text-background transition">Avís legal</a>
          <a href="/privacitat.html" className="hover:text-background transition">Privacitat</a>
          <a href="/cookies.html" className="hover:text-background transition">Cookies</a>
          <button type="button" data-cookie-settings className="underline-offset-4 hover:text-background hover:underline transition">Configura les cookies</button>
          <span>© {new Date().getFullYear()} TRESDEGÉ · David Díaz Lladós, dissenyador gràfic a Manresa</span>
        </nav>
      </div>

      {/* TEXT GEGANT */}
      <div className="w-full flex justify-center items-end ">
        {/* El nom s'aixeca lletra a lletra quan el peu es revela (decoratiu).
            S'observa el paràgraf, no cada lletra: una lletra amagada dins la seva màscara mai no compta com a visible */}
        <motion.p
          aria-hidden="true"
          className="text-[16vw] leading-[0.8] font-bold tracking-tight font-display select-none"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.04 }}
        >
          {[..."TRESDEGÉ"].map((ch, i) => (
            <span key={i} className="hero-mask">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "100%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </div>
    </footer>
  );
}
