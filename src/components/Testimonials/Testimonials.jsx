import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaQuoteLeft,
  FaRegFileLines,
  FaCheck,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

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
  {
    student: "Mateo Herrera",
    role: "Abogacía, 3er Año",
    challenge:
      "Dificultad para relacionar artículos del código civil con casos prácticos. Estudio desorganizado y sin estructura.",
    intervention: "Cornell Notes & Interleaving",
    metric: "Calificación: 10 / 10",
    performance: "+60% Conexiones conceptuales",
    quote:
      "El derecho civil tiene cientos de artículos que parecen inconexos. Tomar notas con el método Cornell y alternar entre materias me obligó a pensar transversalmente. Ahora cada artículo encaja como pieza de un rompecabezas lógico.",
  },
  {
    student: "Valentina Park",
    role: "Diseño Industrial, 5to Año",
    challenge:
      "Bloqueos creativos frecuentes y dificultad para documentar procesos de diseño de forma sistemática.",
    intervention: "Journaling Cognitivo & Pomodoro",
    metric: "Productividad: 92%",
    performance: "3 proyectos entregados antes de plazo",
    quote:
      "Mis bloqueos creativos duraban semanas enteras. Registrar mis pensamientos de diseño en un diario cognitivo estructurado, combinado con sprints de Pomodoro, desbloqueó mi proceso creativo. Ahora produzco más y con mayor claridad conceptual.",
  },
  {
    student: "Tomás Avendaño",
    role: "Doctorado en Neurociencia Cognitiva",
    challenge:
      "Volumen inmanejable de papers académicos. Pérdida de hilos argumentales entre publicaciones relacionadas.",
    intervention: "Zettelkasten & Active Recall",
    metric: "Papers revisados: 200+",
    performance: "Publicación en Nature Reviews",
    quote:
      "Leer 30 papers por semana sin un sistema es como intentar construir un edificio sin planos. El método Zettelkasten me permitió crear una red de conocimiento interconectada. Cada nueva lectura enriquece las anteriores automáticamente.",
  },
];

const AUTOPLAY_INTERVAL = 6000;

function CaseStudyCard({ study, index }) {
  return (
    <article className="border-2 border-border bg-surface p-8 flex flex-col gap-6 group hover:border-primary transition-all duration-300 relative max-md:p-6 select-none">
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
    </article>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const paginate = useCallback((newDirection) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return CASE_STUDIES.length - 1;
        if (next >= CASE_STUDIES.length) return 0;
        return next;
      });
      // Small delay to allow DOM update before removing transition class
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 300);
  }, []);

  const goToSlide = useCallback((idx) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 300);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || isTransitioning) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, isTransitioning, paginate]);

  return (
    <section
      id="testimonios"
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
        <div
          ref={headerRef}
          className={`mb-16 max-w-[760px] max-md:mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            headerInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6 py-1.5 px-4 border-2 border-border font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted">
            <span className="text-accent">§ IV</span>
            <span>Evidencia Empírica y Casos de Uso</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-text tracking-tight uppercase mb-5">
            Casos de estudio{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              reales
            </span>
          </h2>

          <p className="font-body text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-text-muted border-l-4 border-l-accent pl-5">
            Análisis cualitativo y cuantitativo del rendimiento estudiantil tras
            la adopción de metodologías activas de aprendizaje estructurado y
            desarrollo intelectual sistemático.
          </p>
        </div>

        {/* ── Carousel ──────────────────────────────────── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%-1rem)] z-10 w-11 h-11 border-2 border-border bg-surface flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed max-xl:translate-x-0 max-xl:left-3"
            aria-label="Testimonio anterior"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%-1rem)] z-10 w-11 h-11 border-2 border-border bg-surface flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed max-xl:translate-x-0 max-xl:right-3"
            aria-label="Testimonio siguiente"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Slide Container */}
          <div className="overflow-hidden relative max-w-[820px] mx-auto">
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isTransitioning
                  ? "opacity-0 scale-95 translate-y-3"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              <CaseStudyCard
                study={CASE_STUDIES[currentIndex]}
                index={currentIndex}
              />
            </div>
          </div>

          {/* Slide Counter & Dots */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Counter */}
            <span className="font-mono text-[0.7rem] font-bold text-text-muted tracking-widest">
              {String(currentIndex + 1).padStart(2, "0")}{" "}
              <span className="text-border">/</span>{" "}
              {String(CASE_STUDIES.length).padStart(2, "0")}
            </span>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  disabled={isTransitioning}
                  className={`h-2 rounded-none border border-border transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${
                    idx === currentIndex
                      ? "w-8 bg-primary border-primary"
                      : "w-2 bg-transparent hover:border-primary"
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>

            {/* Progress bar (auto-play indicator) */}
            <div className="w-16 h-0.5 bg-border overflow-hidden rounded-none">
              <div
                className="h-full bg-accent"
                style={{
                  animation: isPaused
                    ? "none"
                    : `carousel-progress ${AUTOPLAY_INTERVAL}ms linear infinite`,
                }}
                key={currentIndex}
              />
            </div>
          </div>
        </div>

        {/* Section Footnote */}
        <div className="mt-12 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2">
          <span className="h-px flex-1 bg-border max-md:w-full" />
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wider uppercase italic shrink-0">
            * Resultados documentados y validados mediante entrevistas
            académicas cualitativas
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </div>
      </div>
    </section>
  );
}
