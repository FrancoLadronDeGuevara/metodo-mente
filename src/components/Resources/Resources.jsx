import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaBook,
  FaMobileScreenButton,
  FaLink,
  FaArrowUpRightFromSquare,
  FaStar,
  FaBookmark,
} from "react-icons/fa6";

const RESOURCE_CATEGORIES = [
  {
    id: "libros",
    label: "Libros",
    icon: FaBook,
  },
  {
    id: "apps",
    label: "Apps",
    icon: FaMobileScreenButton,
  },
  {
    id: "links",
    label: "Links útiles",
    icon: FaLink,
  },
];

const RESOURCES = {
  libros: [
    {
      title: "Make It Stick: The Science of Successful Learning",
      author: "Peter C. Brown, Henry L. Roediger III",
      description:
        "Investigación de Harvard sobre por qué las técnicas de estudio populares fallan y cuáles realmente funcionan según la ciencia cognitiva.",
      tags: ["Active Recall", "Spaced Repetition"],
      rating: 5,
      url: "https://www.amazon.com/Make-Stick-Science-Successful-Learning/dp/0674729013",
    },
    {
      title: "A Mind for Numbers",
      author: "Barbara Oakley",
      description:
        "Estrategias prácticas para superar bloqueos en matemáticas y ciencias, basadas en neurociencia del aprendizaje y la técnica Pomodoro.",
      tags: ["Pomodoro", "Neurociencia"],
      rating: 5,
      url: "https://www.amazon.com/Mind-Numbers-Science-Flunked-Algebra/dp/039916524X",
    },
    {
      title: "Ultralearning",
      author: "Scott H. Young",
      description:
        "Marco de aprendizaje intensivo y autodidacta. Incluye principios de metalearning, recuperación activa y retroalimentación directa.",
      tags: ["Metalearning", "Autodidacta"],
      rating: 4,
      url: "https://www.amazon.com/Ultralearning-Master-Outsmart-Competition-Accelerate/dp/006285268X",
    },
    {
      title: "How We Learn",
      author: "Benedict Carey",
      description:
        "Explica cómo el cerebro absorbe y retiene información, desmitificando hábitos de estudio y proponiendo alternativas basadas en evidencia.",
      tags: ["Neurociencia", "Retención"],
      rating: 4,
      url: "https://www.amazon.com/How-We-Learn-Surprising-Happens/dp/0812984293",
    },
  ],
  apps: [
    {
      title: "Anki",
      author: "Flashcards con Spaced Repetition",
      description:
        "La herramienta definitiva para memorización a largo plazo. Usa un algoritmo de repetición espaciada científicamente validado. Gratuita en PC y Android.",
      tags: ["Spaced Repetition", "Flashcards"],
      rating: 5,
      url: "https://apps.ankiweb.net/",
    },
    {
      title: "Forest",
      author: "Temporizador de enfoque gamificado",
      description:
        "Planta árboles virtuales mientras te concentras. Si abandonas la sesión, el árbol muere. Excelente para implementar la técnica Pomodoro.",
      tags: ["Pomodoro", "Gamificación"],
      rating: 4,
      url: "https://www.forestapp.cc/",
    },
    {
      title: "Notion",
      author: "Espacio de trabajo todo-en-uno",
      description:
        "Organiza apuntes, bases de datos de estudio, calendarios de repaso y wikis personales. Ideal para implementar Cornell Notes y Zettelkasten digital.",
      tags: ["Organización", "Cornell Notes"],
      rating: 5,
      url: "https://www.notion.so/",
    },
    {
      title: "Obsidian",
      author: "Knowledge base con grafos de conocimiento",
      description:
        "Editor Markdown con enlaces bidireccionales. Perfecto para construir un Zettelkasten digital y visualizar conexiones entre conceptos.",
      tags: ["Zettelkasten", "Mind Mapping"],
      rating: 5,
      url: "https://obsidian.md/",
    },
  ],
  links: [
    {
      title: "Learning How to Learn — Coursera",
      author: "Dr. Barbara Oakley · McMaster University",
      description:
        "El curso online más popular del mundo sobre técnicas de aprendizaje. Cubre chunking, memoria de trabajo, procrastinación y técnicas basadas en neurociencia.",
      tags: ["Curso gratuito", "Neurociencia"],
      rating: 5,
      url: "https://www.coursera.org/learn/learning-how-to-learn",
    },
    {
      title: "Retrieval Practice — Research Hub",
      author: "retrievalpractice.org",
      description:
        "Hub de investigación sobre Active Recall con guías descargables, estrategias para docentes y resúmenes de papers académicos actualizados.",
      tags: ["Active Recall", "Investigación"],
      rating: 4,
      url: "https://www.retrievalpractice.org/",
    },
    {
      title: "The Cornell Note Taking System",
      author: "Cornell University · LSC",
      description:
        "Guía oficial de la Universidad de Cornell sobre su sistema de toma de apuntes, con plantillas descargables y ejemplos paso a paso.",
      tags: ["Cornell Notes", "Plantillas"],
      rating: 4,
      url: "https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/",
    },
    {
      title: "Leitner System Calculator",
      author: "leitnerportal.com",
      description:
        "Herramienta interactiva para calcular intervalos de repaso óptimos según el sistema de Leitner. Incluye simulador visual de cajas.",
      tags: ["Leitner System", "Herramienta"],
      rating: 3,
      url: "https://www.leitnerportal.com/",
    },
  ],
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={`text-[0.6rem] ${
            i < rating ? "text-accent" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

function ResourceCard({ resource, index }) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <a
      ref={ref}
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block border-2 border-border bg-surface p-6 no-underline transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-primary)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-display text-base font-bold text-text leading-snug group-hover:text-primary transition-colors duration-300">
            {resource.title}
          </h3>
          <p className="font-mono text-[0.6rem] font-bold text-text-muted uppercase tracking-wider mt-1">
            {resource.author}
          </p>
        </div>
        <FaArrowUpRightFromSquare className="text-text-muted text-xs shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </div>

      {/* Description */}
      <p className="font-body text-xs text-text-muted leading-relaxed mb-4">
        {resource.description}
      </p>

      {/* Footer: Tags + Rating */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.55rem] font-bold uppercase tracking-wider py-0.5 px-2 border border-border text-text-muted group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <StarRating rating={resource.rating} />
      </div>
    </a>
  );
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("libros");

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="recursos"
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
            <span className="text-accent">§ V</span>
            <span>Bibliografía y Recursos Complementarios</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-text tracking-tight uppercase mb-5">
            Recursos{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              recomendados
            </span>
          </h2>

          <p className="font-body text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-text-muted border-l-4 border-l-accent pl-5">
            Selección curada de libros, aplicaciones y enlaces que complementan
            y profundizan las metodologías de estudio presentadas en esta guía
            académica.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-10 max-md:mb-8 flex-wrap">
          {RESOURCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 py-2.5 px-5 border-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-primary border-primary text-surface shadow-[3px_3px_0_var(--color-accent)]"
                    : "bg-transparent border-border text-text-muted hover:border-primary hover:text-primary"
                }`}
              >
                <Icon
                  className={`text-sm ${isActive ? "text-accent" : ""}`}
                />
                <span>{cat.label}</span>
                <span
                  className={`ml-1 text-[0.55rem] py-0.5 px-1.5 border ${
                    isActive
                      ? "border-surface/30 text-surface/80"
                      : "border-border text-text-muted"
                  }`}
                >
                  {RESOURCES[cat.id].length}
                </span>
              </button>
            );
          })}

          {/* Decorative bookmark */}
          <div className="ml-auto hidden md:flex items-center gap-2 font-mono text-[0.6rem] text-text-muted uppercase tracking-wider">
            <FaBookmark className="text-accent text-xs" />
            <span>Material verificado</span>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1" key={activeCategory}>
          {RESOURCES[activeCategory].map((resource, idx) => (
            <ResourceCard key={resource.title} resource={resource} index={idx} />
          ))}
        </div>

        {/* Section Footnote */}
        <div className="mt-12 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2">
          <span className="h-px flex-1 bg-border max-md:w-full" />
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wider uppercase italic shrink-0">
            * Los enlaces externos son verificados periódicamente. Última
            revisión: Junio 2026
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </div>
      </div>
    </section>
  );
}
