import { useEffect } from "react"
import { MotionConfig } from "framer-motion"
import Lenis from "lenis"

import { setLenis } from "./lib/scroll"
import Loader from "./components/Loader"
import CustomCursor from "./components/CustomCursor"
import SectionDivider from "./components/Sectiondivider"
import Hero from "./components/hero"
import About from "./components/about"
import Services from "./components/services"
import Process from "./components/Process"
import WorkParallax from "./components/WorkParallax"
import Contact from "./components/contact"
import Navbar from "./components/navbar"
import FooterSticky from "./components/FooterSticky"

export default function App() {
  // Una sola instància de Lenis per a tota la pàgina; res de scroll suau amb reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis()
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    setLenis(lenis)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contingut" className="skip-link">Salta al contingut</a>
      <Loader />
      <CustomCursor />
      <Navbar />
      <main id="contingut" tabIndex={-1} className="outline-none">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Services />
        <Process />
        <WorkParallax />
        <SectionDivider />
        <Contact />
      </main>
      <FooterSticky />
    </MotionConfig>
  )
}
