import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import heroBg from "../../assets/hero-bg.png";
import { CURRENT_YEAR } from "../../constants/constants";

export default function HeroSection() {
  const handleExplore = (e) => {
    e.preventDefault();
    const target = document.querySelector("#metodos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 pt-24 pb-16 max-md:items-end max-md:min-h-svh max-md:px-5 max-md:pt-20 max-md:pb-12"
      id="inicio"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover grayscale-[40%] contrast-110 opacity-20 dark:opacity-12 dark:grayscale-50 dark:contrast-120"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 flex justify-between px-[8%] z-[1] pointer-events-none max-md:px-[4%]"
        aria-hidden="true"
      >
        <span className="w-px h-full bg-border opacity-30" />
        <span className="w-px h-full bg-border opacity-30 max-md:hidden" />
        <span className="w-px h-full bg-border opacity-30" />
        <span className="w-px h-full bg-border opacity-30 max-md:hidden" />
        <span className="w-px h-full bg-border opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[860px]">
        {/* Issue number tag — brutalista editorial detail */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8 py-2 px-5 border-2 border-border font-mono text-xs font-bold tracking-[0.2em] uppercase text-text-muted max-md:mb-6 max-md:text-[0.65rem] max-md:py-1.5 max-md:px-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-primary">VOL. I</span>
          <span className="text-accent">—</span>
          <span className="text-text-muted">{CURRENT_YEAR}</span>
        </motion.div>

        <motion.h1
          className="font-display text-[clamp(3rem,7vw,6rem)] font-black leading-[1.05] text-text tracking-tighter mb-6 uppercase"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Domina el arte <br />
          <span className="inline-block italic text-primary underline decoration-accent decoration-4 underline-offset-8">
            de aprender
          </span>
        </motion.h1>

        <motion.p
          className="font-body text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed text-text-muted max-w-[600px] mb-10 border-l-4 border-l-accent pl-5 max-md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Técnicas respaldadas por la ciencia cognitiva para transformar cómo
          procesas, retienes y aplicás el conocimiento.
        </motion.p>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <a
            href="#metodos"
            className="cta-sweep inline-flex items-center gap-3 py-4 px-9 bg-primary text-surface font-mono text-sm font-bold uppercase tracking-[0.15em] no-underline border-3 border-primary transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent hover:text-text hover:-translate-y-0.5 group"
            onClick={handleExplore}
          >
            <span className="relative z-[1]">Explorar Métodos</span>
            <FiArrowDown className="relative z-[1] text-lg transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Bottom decorative footnote */}
        <motion.div
          className="flex items-start gap-1.5 pt-6 border-t border-t-border max-md:pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="font-display text-base text-accent font-bold">
            *
          </span>
          <span className="font-mono text-[0.7rem] text-text-muted tracking-wide leading-relaxed italic ">
            Basado en investigaciones de ciencia cognitiva y neuroaprendizaje
          </span>
        </motion.div>
      </div>
    </section>
  );
}
