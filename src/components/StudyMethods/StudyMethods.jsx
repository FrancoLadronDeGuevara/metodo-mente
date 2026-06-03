import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBrain,
  FaBookOpen,
  FaHourglassHalf,
  FaSitemap,
  FaLayerGroup,
  FaGraduationCap,
} from "react-icons/fa6";

const METHODS = [
  {
    icon: FaBrain,
    title: "Active Recall",
    subtitle: "Recuerdo Activo",
    difficulty: "Alta",
    effectiveness: "Sobresaliente",
    science: "Esfuerzo de recuperación cognitiva",
    description:
      "Fuerza a tu cerebro a recuperar activamente información de la memoria en lugar de releer pasivamente. Este esfuerzo fortalece las conexiones neuronales y consolida el aprendizaje.",
    steps: [
      "Cierra el libro e intenta escribir todo lo que recuerdes.",
      "Responde cuestionarios rápidos antes de repasar el material.",
      "Utiliza tarjetas de memoria (flashcards) para auto-evaluarte.",
    ],
  },
  {
    icon: FaGraduationCap,
    title: "Técnica Feynman",
    subtitle: "Aprender enseñando",
    difficulty: "Media",
    effectiveness: "Excelente",
    science: "Procesamiento profundo y síntesis",
    description:
      "Explica un concepto complejo utilizando un lenguaje tan sencillo que incluso un niño de 8 años podría comprenderlo. Si te trabas o usas tecnicismos, has identificado una brecha en tu conocimiento.",
    steps: [
      "Elige el tema y finge enseñárselo a un principiante.",
      "Identifica las lagunas donde tu explicación pierda claridad.",
      "Regresa al material original para simplificar los puntos débiles.",
    ],
  },
  {
    icon: FaLayerGroup,
    title: "Spaced Repetition",
    subtitle: "Repetición Espaciada",
    difficulty: "Media",
    effectiveness: "Sobresaliente",
    science: "Curva del olvido de Ebbinghaus",
    description:
      "Distribuye los repasos a lo largo del tiempo en intervalos crecientes (1 día, 3 días, 7 días, etc.). Esto interrumpe la curva natural del olvido y transfiere el conocimiento a la memoria de largo plazo.",
    steps: [
      "Crea un calendario estructurado de repaso sistemático.",
      "Aumenta el intervalo si respondes correctamente.",
      "Reduce el intervalo a cero ante un error de recuperación.",
    ],
  },
  {
    icon: FaHourglassHalf,
    title: "Método Pomodoro",
    subtitle: "Gestión de la atención",
    difficulty: "Baja",
    effectiveness: "Alta",
    science: "Resistencia a la fatiga atencional",
    description:
      "Divide tu tiempo de estudio en bloques de enfoque absoluto de 25 minutos seguidos por 5 minutos de descanso absoluto. Previene el agotamiento cognitivo y mantiene alto el nivel de concentración.",
    steps: [
      "Elimina toda distracción y programa un temporizador.",
      "Trabaja con foco absoluto hasta que suene la alarma.",
      "Desconéctate por completo durante 5 minutos para recargar.",
    ],
  },
  {
    icon: FaSitemap,
    title: "Mind Mapping",
    subtitle: "Estructuración Visual",
    difficulty: "Baja",
    effectiveness: "Alta",
    science: "Teoría de la Codificación Dual",
    description:
      "Crea diagramas radiales no lineales para conectar ideas visualmente. Utiliza imágenes, ramas de colores y palabras clave para reflejar la forma asociativa en la que el cerebro procesa la información.",
    steps: [
      "Coloca el concepto central en el medio del lienzo.",
      "Dibuja ramas asociativas para los subtemas principales.",
      "Vincula ideas cruzadas para crear una red de relaciones.",
    ],
  },
  {
    icon: FaBookOpen,
    title: "Sistema Leitner",
    subtitle: "Estudio Inteligente de Fichas",
    difficulty: "Media",
    effectiveness: "Excelente",
    science: "Práctica distribuida y optimizada",
    description:
      "Un método de repetición espaciada que utiliza cajas físicas o digitales para categorizar flashcards. Las cartas se mueven a cajas de repaso menos frecuentes al acertar, u obligatoriamente a la primera al fallar.",
    steps: [
      "Coloca todas tus flashcards en la Caja 1 de repaso diario.",
      "Si aciertas la tarjeta, muévela a la Caja 2 (repaso semanal).",
      "Si fallas una tarjeta en cualquier caja, devuélvela a la Caja 1.",
    ],
  },
];

function MethodCard({ method, index }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const Icon = method.icon;

  return (
    <motion.article
      ref={ref}
      className="border-2 border-border bg-surface p-8 flex flex-col gap-6 group hover:border-primary transition-all duration-300 relative max-md:p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Editorial layout corner index */}
      <span className="absolute top-4 right-4 font-mono text-[0.65rem] font-bold text-border tracking-[0.2em]">
        COD. {method.title.toUpperCase().replace(/\s+/g, "-")}
      </span>

      {/* Main card header */}
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 border-2 border-primary flex items-center justify-center text-primary text-xl shrink-0 group-hover:bg-primary group-hover:text-surface transition-all duration-300">
          <Icon />
        </div>
        <div>
          <h3 className="font-display text-2xl font-extrabold text-text tracking-tight uppercase max-sm:text-xl">
            {method.title}
          </h3>
          <p className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
            {method.subtitle}
          </p>
        </div>
      </div>

      {/* Technical Academic Scorecard */}
      <div className="grid grid-cols-3 gap-2 py-3 px-4 border border-border bg-bg/50 font-mono text-[0.68rem] tracking-wide text-text-muted">
        <div>
          <span className="block font-bold text-text uppercase text-[0.55rem] tracking-wider">
            Dificultad
          </span>
          {method.difficulty}
        </div>
        <div>
          <span className="block font-bold text-text uppercase text-[0.55rem] tracking-wider">
            Efectividad
          </span>
          {method.effectiveness}
        </div>
        <div className="col-span-1 truncate">
          <span className="block font-bold text-text uppercase text-[0.55rem] tracking-wider">
            Base Científica
          </span>
          <span className="truncate block" title={method.science}>
            {method.science}
          </span>
        </div>
      </div>

      {/* Narrative Description */}
      <p className="font-body text-sm leading-relaxed text-text-muted">
        {method.description}
      </p>

      {/* Protocol steps */}
      <div className="mt-auto">
        <h4 className="font-mono text-[0.7rem] font-bold text-text uppercase tracking-widest mb-3 border-b border-border pb-1">
          Protocolo de Aplicación
        </h4>
        <ul className="list-none flex flex-col gap-2 p-0 m-0">
          {method.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="font-mono text-[0.7rem] font-bold text-accent shrink-0 pt-0.5">
                [{idx + 1}]
              </span>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                {step}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function StudyMethods() {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      id="metodos"
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
        <div ref={headerRef} className="mb-16 max-md:mb-10">
          <motion.div
            className="inline-flex items-center gap-3 mb-6 py-1.5 px-4 border-2 border-border font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent">§ II</span>
            <span>Metodologías de Alto Rendimiento</span>
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
            Sistemas prácticos{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              de estudio
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
            Selección rigurosa de metodologías activas estructuradas para
            optimizar la asimilación del conocimiento y maximizar el retorno
            sobre el tiempo invertido en tu formación intelectual.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
          {METHODS.map((method, idx) => (
            <MethodCard key={method.title} method={method} index={idx} />
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
            Adopta una metodología a la vez para permitir la adaptación
            cognitiva
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}
