import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaQuoteLeft, FaRegFileLines, FaCheck, FaUser } from "react-icons/fa6";

const CASE_STUDIES = [
  {
    student: "Sofía Benítez",
    role: "Estudiante de Medicina, 4º Año",
    challenge:
      "Saturación por volumen de apuntes. Memorizaba temporalmente pero olvidaba temas clave antes del examen final.",
    intervention: "Spaced Repetition & Leitner System",
    metric: "Promedio: 9.6 / 10",
    performance: "+45% Retención a largo plazo",
    quote:
      "Estudiar medicina parecía un intento de beber agua de una manguera de bomberos. Al sistematizar mis repasos con flashcards de forma espaciada, la sensación de agobio desapareció. Hoy puedo evocar conceptos de patología de hace meses de forma casi instantánea.",
  },
  {
    student: "Lucas Dell'Acqua",
    role: "Ingeniería de Software",
    challenge:
      "Dificultad para mantener el enfoque durante sesiones largas. Procrastinación recurrente ante temarios densos.",
    intervention: "Método Pomodoro & Active Recall",
    metric: "Concentración: 98%",
    performance: "-50% Tiempo de fatiga",
    quote:
      "Solía procrastinar hasta el último día y luego encerrarme 12 horas seguidas. Terminaba exhausto y con baja retención. Implementar bloques de enfoque estricto de 25 minutos combinados con cuestionarios activos transformó por completo mis notas y mi salud mental.",
  },
  {
    student: "Camila Rostova",
    role: "Licenciatura en Ciencias de la Educación",
    challenge:
      "Comprensión superficial de teorías de aprendizaje complejas. Dependencia excesiva de la relectura pasiva y el resaltador.",
    intervention: "Técnica Feynman & Mind Mapping",
    metric: "Comprensión Profunda",
    performance: "Tesis aprobada con honores",
    quote:
      "Creía que resaltar textos era estudiar. La Técnica Feynman me obligó a simplificar ideas difíciles hasta explicarlas de forma llana. Diseñar mapas radiales me permitió ver de golpe el mapa general del contenido académico. Es un cambio de paradigma.",
  },
];

function CaseStudyCard({ study, index }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.article
      ref={ref}
      className="border-2 border-border bg-surface p-8 flex flex-col gap-6 group hover:border-primary transition-all duration-300 relative max-md:p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Document icon & top bar */}
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div className="flex items-center gap-2 text-text-muted font-mono text-[0.65rem] font-bold tracking-widest uppercase">
          <FaRegFileLines className="text-accent text-sm" />
          <span>REPORTE DE CASO: #{String(index + 1).padStart(3, "0")}</span>
        </div>
        <span className="font-mono text-[0.65rem] font-bold text-primary border border-primary px-2.5 py-0.5 uppercase tracking-wide">
          {study.metric}
        </span>
      </div>

      {/* Case study metadata grid */}
      <div className="grid grid-cols-2 gap-4 border border-border bg-bg/50 p-4 font-mono text-[0.7rem] text-text-muted">
        <div>
          <span className="block font-bold text-text uppercase text-[0.55rem] tracking-wider mb-0.5">
            Sujeto de estudio
          </span>
          <span className="text-text font-semibold flex items-center gap-1">
            <FaUser className="shrink-0 text-accent" /> {study.student}
          </span>
          <span className="text-[0.6rem] block text-text-muted opacity-80 mt-0.5">
            {study.role}
          </span>
        </div>
        <div>
          <span className="block font-bold text-text uppercase text-[0.55rem] tracking-wider mb-0.5">
            Intervención
          </span>
          <span className="text-primary font-bold">{study.intervention}</span>
          <span className="text-[0.6rem] block text-accent font-semibold mt-0.5">
            {study.performance}
          </span>
        </div>
      </div>

      {/* Challenge statement */}
      <div className="font-body text-xs text-text-muted leading-relaxed flex gap-2">
        <span className="font-bold text-text uppercase shrink-0 font-mono text-[0.6rem] pt-0.5">
          [DESAFÍO]
        </span>
        <p>{study.challenge}</p>
      </div>

      {/* Central narrative / student quote */}
      <div className="relative pt-2">
        <FaQuoteLeft className="absolute -top-1 -left-2 text-accent/20 text-4xl pointer-events-none" />
        <blockquote className="font-display text-sm italic text-text leading-relaxed pl-6 relative z-[1]">
          "{study.quote}"
        </blockquote>
      </div>

      {/* Verification mark */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between font-mono text-[0.6rem] text-text-muted">
        <span className="italic">
          Bitácora de seguimiento · Evidencia Verificada
        </span>
        <span className="flex items-center gap-1 text-primary font-bold uppercase tracking-wider">
          <FaCheck className="text-accent text-xs" /> Aprobado
        </span>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="beneficios"
      className="relative py-24 px-8 max-md:py-16 max-md:px-5"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Double academic separation rule */}
        <div
          className="flex flex-col gap-1 mb-16 max-md:mb-10"
          aria-hidden="true"
        >
          <span className="h-[3px] bg-text" />
          <span className="h-px bg-border" />
        </div>

        {/* Section Header */}
        <div ref={headerRef} className="mb-16 max-w-[760px] max-md:mb-10">
          <motion.div
            className="inline-flex items-center gap-3 mb-6 py-1.5 px-4 border-2 border-border font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent">§ IV</span>
            <span>Evidencia Empírica y Casos de Uso</span>
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
            Casos de estudio{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              reales
            </span>
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
            Análisis cualitativo y cuantitativo del rendimiento estudiantil tras
            la adopción de metodologías activas de aprendizaje estructurado y
            desarrollo intelectual sistemático.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
          {CASE_STUDIES.map((study, idx) => (
            <CaseStudyCard key={study.student} study={study} index={idx} />
          ))}
        </div>

        {/* Section Footnote */}
        <motion.div
          className="mt-12 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="h-px flex-1 bg-border max-md:w-full" />
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wider uppercase italic shrink-0">
            * Resultados documentados y validados mediante entrevistas
            académicas cualitativas
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}
