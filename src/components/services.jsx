import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { goTo } from "../lib/scroll";

const services = [
  {
    title: "Logotips i identitat de marca",
    subtitle: "Branding",
    description:
      "Logotip, paleta de colors, tipografies i manual de marca perquè la teva empresa es reconegui a tot arreu.",
    image: "/images/services/content.jpg",
    alt: "Sessió de fotos d'una marca de roba",
    accent: "#a2b4dd",
  },
  {
    title: "Etiquetes, flyers i gran format",
    subtitle: "Impressió",
    description:
      "Etiquetes i packaging, flyers, cartells, banners, roll-ups, vinils i plotters, amb arxius preparats per a impremta.",
    image: "/images/services/print.jpg",
    alt: "Dissenyador revisant etiquetes impreses al taller",
    accent: "#0084ff",
  },
  {
    title: "Maquetació editorial",
    subtitle: "Editorial",
    description:
      "Revistes, catàlegs, llibres, cartes de restaurant i dossiers amb criteri tipogràfic i jerarquia visual clara.",
    image: "/images/services/layout.jpg",
    alt: "Revista maquetada oberta",
    accent: "#7c6fff",
  },
  {
    title: "Web, apps, contingut i SEO",
    subtitle: "Digital",
    description:
      "Disseny de webs i apps, creació de contingut per a xarxes i auditories SEO, amb la mateixa identitat que la resta de la marca.",
    image: "/images/services/web.jpg",
    alt: "Estació de treball amb pantalles de disseny web",
    accent: "#12063b",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1];

// Amb pantalla tàctil no hi ha hover: les descripcions s'ensenyen sempre
const HOVER_MQ = "(hover: hover) and (pointer: fine)";
function useCanHover() {
  return useSyncExternalStore(
    (cb) => { const mq = window.matchMedia(HOVER_MQ); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); },
    () => window.matchMedia(HOVER_MQ).matches,
    () => false, // servidor: descripcions visibles al HTML
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const canHover = useCanHover();

  return (
    <section id="services" className="py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          initial={{ y: 20 }}
          animate={headerInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground font-titol leading-[1.05] tracking-[-0.02em] max-w-2xl">
            Disseny gràfic per a la teva marca
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-sm lg:text-right">
            Del logotip a l'etiqueta i el plotter: disseny gràfic des de Manresa per
            a marques del Bages i de tot Catalunya.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} canHover={canHover} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, canHover }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const open = hovered || !canHover;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.a
      ref={ref}
      href="#contacte"
      onClick={goTo("contacte")}
      aria-label={`${service.title}: demana pressupost`}
      className="press group block rounded-2xl overflow-hidden"
      initial={{ y: 24 }}
      animate={inView ? { y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="relative h-[420px] md:h-[500px] bg-neutral-900">
        {/* La foto s'obre des d'un marc ja visible fins a omplir la targeta */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(7% 7% 7% 7% round 12px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        >
        <motion.img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          style={{ y }}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover brightness-[0.5] contrast-[1.1]"
          draggable={false}
        />
        </motion.div>
        {/* Vel neutre perquè el text es llegeixi sobre la foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ backgroundColor: service.accent, opacity: hovered ? 0.14 : 0 }}
        />

        <div className="relative z-10 h-full flex flex-col justify-end p-7 md:p-10">
          <span className="absolute top-7 left-7 md:top-10 md:left-10 rounded-full bg-white/15 px-3 py-1 text-sm text-white font-text">{service.subtitle}</span>
          <h3 className="text-3xl md:text-4xl font-semibold text-white font-titol leading-tight tracking-[-0.01em]">
            {service.title}
          </h3>

          {/* La descripció s'obre amb grid-rows (sense animar height) */}
          <div
            className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
          >
            <p className="overflow-hidden text-white/85 leading-relaxed text-base max-w-md">
              <span className="block pt-4">{service.description}</span>
            </p>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-white text-sm font-medium font-text">
            Demana pressupost
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
