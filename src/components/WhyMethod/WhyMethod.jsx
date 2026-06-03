import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBrain, FaClock, FaRepeat, FaArrowTrendUp } from "react-icons/fa6";

const STATS = [
  {
    icon: FaBrain,
    value: "80%",
    label: "de lo estudiado se olvida en 24hs",
    source: "Curva del olvido — Ebbinghaus, 1885",
    description:
      "Sin un método de repaso estructurado, la mayor parte del esfuerzo se pierde al día siguiente.",
  },
  {
    icon: FaArrowTrendUp,
    value: "2.5×",
    label: "mayor retención con Active Recall",
    source: "Roediger & Karpicke, 2006",
    description:
      "Recuperar información activamente supera ampliamente a la relectura pasiva.",
  },
  {
    icon: FaClock,
    value: "40%",
    label: "menos tiempo de estudio necesario",
    source: "Dunlosky et al., 2013",
    description:
      "Las técnicas basadas en evidencia reducen las horas necesarias para alcanzar el mismo nivel de dominio.",
  },
  {
    icon: FaRepeat,
    value: "92%",
    label: "de retención a largo plazo",
    source: "Spaced Repetition — Pimsleur, 1967",
    description:
      "La repetición espaciada consolida el conocimiento en la memoria de largo plazo de forma duradera.",
  },
];

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const Icon = stat.icon;

  return (
    <motion.article
      ref={ref}
      className="relative border-2 border-border bg-surface p-8 flex flex-col gap-4 group hover:border-primary transition-colors duration-300 max-md:p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Index number — brutalista editorial detail */}
      <span className="absolute top-3 right-4 font-mono text-[0.65rem] font-bold text-border tracking-[0.15em] uppercase">
        Nº{String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="w-11 h-11 border-2 border-accent flex items-center justify-center text-accent text-xl transition-all duration-300 group-hover:bg-accent group-hover:text-surface">
        <Icon />
      </div>

      {/* Value */}
      <div>
        <span className="font-display text-[2.75rem] font-black leading-none text-text tracking-tight">
          {stat.value}
        </span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary mt-1.5">
          {stat.label}
        </p>
      </div>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-text-muted">
        {stat.description}
      </p>

      {/* Source — academic footnote */}
      <div className="mt-auto pt-4 border-t border-t-border flex items-start gap-1.5">
        <span className="font-display text-xs text-accent font-bold leading-none mt-0.5">
          †
        </span>
        <span className="font-mono text-[0.6rem] text-text-muted tracking-wide italic leading-snug">
          {stat.source}
        </span>
      </div>
    </motion.article>
  );
}

export default function WhyMethod() {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <section
      id="importancia"
      className="relative py-24 px-8 max-md:py-16 max-md:px-5"
    >
      {/* Section decorative border */}
      <div className="max-w-[1280px] mx-auto">
        {/* Top double rule */}
        <div
          className="flex flex-col gap-1 mb-16 max-md:mb-10"
          aria-hidden="true"
        >
          <span className="h-[3px] bg-text" />
          <span className="h-px bg-border" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="mb-16 max-md:mb-10">
          {/* Section label */}
          <motion.div
            className="inline-flex items-center gap-3 mb-6 py-1.5 px-4 border-2 border-border font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent">§</span>
            <span>Fundamentos</span>
          </motion.div>

          <motion.h2
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-text tracking-tight uppercase mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            ¿Por qué importa{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              el método
            </span>
            ?
          </motion.h2>

          <motion.p
            className="font-body text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-text-muted border-l-4 border-l-accent pl-5"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            La mayoría de los estudiantes dedica horas a técnicas ineficaces. La
            ciencia cognitiva lleva décadas demostrando que{" "}
            <strong className="text-text font-bold">
              cómo estudiás importa más que cuánto estudiás
            </strong>
            . Estos son los datos que lo respaldan.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.value} stat={stat} index={i} />
          ))}
        </div>

        {/* Bottom annotation */}
        <motion.div
          className="mt-10 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="h-px flex-1 bg-border max-md:w-full" />
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wide italic shrink-0">
            Fuentes: publicaciones peer-reviewed en psicología cognitiva y
            neurociencia del aprendizaje
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}
