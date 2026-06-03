import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiRefreshCw,
  FiAward,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

const QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es tu mayor obstáculo a la hora de estudiar?",
    options: [
      {
        text: "Me distraigo fácilmente y procrastino de forma constante.",
        method: "pomodoro",
      },
      {
        text: "Memorizo hoy pero lo olvido todo para la semana que viene.",
        method: "spaced",
      },
      {
        text: "Entiendo la teoría pero me cuesta explicarla o aplicarla en exámenes.",
        method: "feynman",
      },
      {
        text: "Me aburre releer apuntes y siento que mi estudio es muy pasivo.",
        method: "active",
      },
      {
        text: "Me cuesta ver cómo se conectan los conceptos globales entre sí.",
        method: "mapping",
      },
    ],
  },
  {
    id: 2,
    question: "¿Cómo prefieres interactuar con información nueva?",
    options: [
      {
        text: "Mediante bloques de concentración estrictos seguidos de descansos obligatorios.",
        method: "pomodoro",
      },
      {
        text: "Creando mis propios cuestionarios y auto-evaluándome continuamente.",
        method: "active",
      },
      {
        text: "Explicándosela en voz alta a otra persona o a mí mismo de forma simple.",
        method: "feynman",
      },
      {
        text: "Organizándola visualmente en lienzos, mapas conceptuales y colores.",
        method: "mapping",
      },
      {
        text: "Clasificando fichas de estudio en base a lo bien que las domino.",
        method: "leitner",
      },
    ],
  },
  {
    id: 3,
    question: "¿Qué formato de recurso prefieres construir para repasar?",
    options: [
      {
        text: "Una lista de tareas corta para resolver en sprints intensivos de 25 minutos.",
        method: "pomodoro",
      },
      {
        text: "Cajas físicas o digitales con fichas de preguntas y respuestas.",
        method: "leitner",
      },
      {
        text: "Una guía ultra simplificada, libre de tecnicismos complejos.",
        method: "feynman",
      },
      {
        text: "Un mapa radial gráfico con múltiples conexiones de colores.",
        method: "mapping",
      },
      {
        text: "Simulacros de examen a libro cerrado creados por mí.",
        method: "active",
      },
    ],
  },
  {
    id: 4,
    question: "Ante un examen conceptual complejo, tu primera acción es:",
    options: [
      {
        text: "Estructurar mis sesiones usando un temporizador estricto sin notificaciones.",
        method: "pomodoro",
      },
      {
        text: "Hacer un esquema gráfico general para entender la arquitectura total del tema.",
        method: "mapping",
      },
      {
        text: "Simular una clase explicando la idea clave del tema a un principiante.",
        method: "feynman",
      },
      {
        text: "Buscar exámenes de años anteriores y tratar de resolverlos sin mirar apuntes.",
        method: "active",
      },
      {
        text: "Planificar repasos distribuidos en los días previos (día 1, 3, 7).",
        method: "spaced",
      },
    ],
  },
  {
    id: 5,
    question:
      "¿Cuál es tu ventana ideal de preparación antes de una evaluación?",
    options: [
      {
        text: "Sesiones de productividad concentrada en el día a día para evitar fatiga.",
        method: "pomodoro",
      },
      {
        text: "Semanas de antelación estructuradas para consolidar memoria a largo plazo.",
        method: "spaced",
      },
      {
        text: "Días dedicados a sintetizar conceptos difíciles en ideas comprensibles.",
        method: "feynman",
      },
      {
        text: "Sesiones dinámicas y creativas basadas en conexiones visuales y resúmenes estructurados.",
        method: "mapping",
      },
      {
        text: "Estudio diario e intensivo basado puramente en la resolución de problemas.",
        method: "active",
      },
    ],
  },
];

const METHOD_DETAILS = {
  active: {
    title: "Active Recall (Recuerdo Activo)",
    subtitle: "Ideal para la retención práctica de alta demanda",
    description:
      "Tu perfil indica que necesitas un desafío constante para mantenerte enfocado y consolidar conocimiento. Evita releer de forma pasiva; en su lugar, ponte a prueba con simulacros, hazte preguntas antes de ver las respuestas y haz del autoexamen tu herramienta principal de estudio.",
    recommendations: [
      "Prueba a escribir de memoria todo lo que recuerdes en una hoja en blanco justo después de leer.",
      "Diseña cuestionarios activos en lugar de simples resúmenes escritos.",
      "Usa flashcards de preguntas complejas para estudiar.",
    ],
    targetId: "metodos",
  },
  feynman: {
    title: "Técnica Feynman (Simplificación Conceptual)",
    subtitle: "Perfecta para profundizar y disolver la confusión",
    description:
      "Te beneficias enormemente del procesamiento profundo. Tu método óptimo consiste en simplificar conceptos difíciles explicándolos en un lenguaje llano, libre de tecnicismos innecesarios. Al enseñar la materia, descubrirás inmediatamente tus vacíos cognitivos.",
    recommendations: [
      "Explica el tema de estudio en voz alta como si le estuvieras enseñando a un niño de 8 años.",
      "Usa analogías cotidianas para explicar ideas abstractas o fórmulas complejas.",
      "Identifica en qué partes te trabas y vuelve a repasar esa sección específica del libro.",
    ],
    targetId: "metodos",
  },
  spaced: {
    title: "Spaced Repetition (Repetición Espaciada)",
    subtitle: "Tu escudo definitivo contra el olvido a largo plazo",
    description:
      "Tu perfil es altamente analítico y se beneficia de la organización sistemática del tiempo. En lugar de estudiar todo el día anterior, programa sesiones de repaso de baja intensidad pero espaciadas de manera inteligente en el tiempo (intervalos de 1, 3, 7 y 14 días).",
    recommendations: [
      "Utiliza un calendario estricto de repasos automatizados.",
      "Combina esta técnica con herramientas digitales de repaso activo.",
      "Estudia de forma distribuida para no saturar tu memoria de trabajo.",
    ],
    targetId: "metodos",
  },
  pomodoro: {
    title: "Método Pomodoro (Gestión y Foco)",
    subtitle: "Para contrarrestar la fatiga y vencer la procrastinación",
    description:
      "Tu mayor desafío es mantener la consistencia y evadir distracciones. Necesitas una estructura externa estricta: trabaja intensamente durante bloques cerrados de 25 minutos seguidos por 5 minutos de desconexión absoluta. Esto entrena a tu cerebro a sostener foco de alta calidad.",
    recommendations: [
      "Apaga o aleja tu teléfono por completo durante los 25 minutos de enfoque.",
      "Durante los 5 minutos de descanso, camina o estírate, no mires redes sociales.",
      "Define una única tarea atencional por cada bloque Pomodoro.",
    ],
    targetId: "metodos",
  },
  mapping: {
    title: "Mind Mapping (Pensamiento Visual)",
    subtitle: "Ideal para cerebros creativos y conexiones globales",
    description:
      "Eres un pensador visual y global. La estructura lineal de los libros tradicionales puede limitarte. Diseña mapas radiales, diagramas asociativos y redes lógicas para ver de un vistazo cómo se interconectan los temas del examen de manera espacial y cromática.",
    recommendations: [
      "Inicia tus mapas con una idea central y ramifica hacia los lados con palabras clave.",
      "Utiliza códigos de colores para diferenciar temas y jerarquías.",
      "Asocia imágenes sencillas o símbolos a conceptos difíciles de recordar.",
    ],
    targetId: "metodos",
  },
  leitner: {
    title: "Sistema Leitner (Fichas por Niveles)",
    subtitle: "Excelente para el aprendizaje sistemático y de vocabulario",
    description:
      "Te gusta el progreso táctil e interactivo. El sistema Leitner con tarjetas ordenadas en cajas en base a tu nivel de dominio te permitirá focalizar tu esfuerzo exclusivamente en el material que más te cuesta, maximizando tu tiempo disponible.",
    recommendations: [
      "Prepara fichas con preguntas claras al frente y respuestas completas detrás.",
      "Usa 3 o 5 cajas de repaso (Caja 1 diaria, Caja 2 cada 3 días, Caja 3 semanal).",
      "Si fallas una carta de la caja 3, devuélvela sin excusas a la caja 1.",
    ],
    targetId: "metodos",
  },
};

export default function StudyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [recommendedMethod, setRecommendedMethod] = useState(null);

  const handleAnswerSelect = (method) => {
    const updatedAnswers = [...answers, method];
    setAnswers(updatedAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate best method
      const counts = updatedAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});

      let bestMethod = "active"; // Default fallback
      let maxCount = 0;

      Object.entries(counts).forEach(([method, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestMethod = method;
        }
      });

      setRecommendedMethod(bestMethod);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizFinished(false);
    setRecommendedMethod(null);
  };

  const handleScrollToMethods = () => {
    const target = document.querySelector("#metodos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const progressPercentage = (currentQuestion / QUESTIONS.length) * 100;

  return (
    <section
      id="quiz"
      className="relative max-w-[1280px] mx-auto py-24 px-8 max-md:py-16 max-md:px-5"
    >
      <div className="mx-auto">
        {/* Double brutalist academic rule */}
        <div
          className="flex flex-col gap-1 mb-16 max-md:mb-10"
          aria-hidden="true"
        >
          <span className="h-[3px] bg-text" />
          <span className="h-px bg-border" />
        </div>

        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-6 py-1.5 px-4 border-2 border-border font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted">
            <span className="text-accent">§ III</span>
            <span>Evaluación Cognitiva</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-text tracking-tight uppercase mb-5">
            ¿Cuál método{" "}
            <span className="italic text-primary underline decoration-accent decoration-3 underline-offset-4">
              es para ti
            </span>
            ?
          </h2>

          <p className="font-body text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-text-muted border-l-4 border-l-accent pl-5">
            Responde honestamente a este test de diagnóstico de 5 preguntas
            basado en tus hábitos actuales, y nuestro sistema identificará la
            metodología académica que desbloqueará tu máximo potencial
            intelectual.
          </p>
        </div>

        {/* Quiz Core Box */}
        <div className="border-2 border-border bg-surface p-10 max-md:p-6 transition-all duration-300">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {/* Progress bar and counter */}
                <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                  <span>
                    PREGUNTA {currentQuestion + 1} DE {QUESTIONS.length}
                  </span>
                  <span>
                    {Math.round(
                      ((currentQuestion + 1) / QUESTIONS.length) * 100,
                    )}
                    % COMPLETADO
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bg border border-border">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question */}
                <h3 className="font-display text-2xl font-black text-text leading-snug uppercase max-md:text-xl pt-4">
                  {QUESTIONS[currentQuestion].question}
                </h3>

                {/* Options List */}
                <div className="flex flex-col gap-3.5 mt-2">
                  {QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.method)}
                      className="flex items-center text-left py-4 px-6 border-2 border-border bg-bg/20 text-text font-body text-sm font-semibold transition-all duration-200 cursor-pointer hover:border-primary hover:bg-bg max-md:py-3.5 max-md:px-4"
                    >
                      <span className="font-mono text-xs font-bold text-accent shrink-0 w-8">
                        [{String.fromCharCode(65 + idx)}]
                      </span>
                      <span>{option.text}</span>
                      <FiArrowRight className="ml-auto text-text-muted shrink-0 text-base opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Result Tag Header */}
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold tracking-widest uppercase">
                  <FiAward className="text-base" />
                  <span>Resultado del Diagnóstico</span>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-3xl font-black text-text uppercase tracking-tight max-md:text-2xl">
                    {METHOD_DETAILS[recommendedMethod].title}
                  </h3>
                  <p className="font-mono text-xs font-bold text-accent uppercase tracking-wider mt-1.5">
                    {METHOD_DETAILS[recommendedMethod].subtitle}
                  </p>
                </div>

                {/* Recommendation Detail Body */}
                <p className="font-body text-sm leading-relaxed text-text-muted">
                  {METHOD_DETAILS[recommendedMethod].description}
                </p>

                {/* Actions & Checklist Protocol */}
                <div className="border border-border bg-bg/50 p-6 rounded-none flex flex-col gap-4">
                  <h4 className="font-mono text-xs font-bold text-text uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
                    <FiCheckCircle className="text-accent" />
                    Protocolo Recomendado de Inicio:
                  </h4>
                  <ul className="list-none flex flex-col gap-3 p-0 m-0">
                    {METHOD_DETAILS[recommendedMethod].recommendations.map(
                      (rec, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <span className="font-mono text-[0.65rem] font-bold text-accent shrink-0 pt-0.5">
                            [0{idx + 1}]
                          </span>
                          <p className="font-body text-xs text-text-muted leading-relaxed">
                            {rec}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 mt-4 max-sm:flex-col">
                  <button
                    onClick={handleScrollToMethods}
                    className="cta-sweep flex-1 py-4 px-6 bg-primary text-surface font-mono text-xs font-bold uppercase tracking-widest border-2 border-primary cursor-pointer hover:border-accent hover:text-text"
                  >
                    <span className="relative z-[1]">
                      Ver Detalles del Método
                    </span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex-1 py-4 px-6 border-2 border-border bg-transparent text-text font-mono text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors duration-250 hover:bg-bg hover:border-primary flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw />
                    Volver a evaluar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section Footnote */}
        <div className="mt-12 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2">
          <span className="h-px flex-1 bg-border max-md:w-full" />
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wider uppercase italic shrink-0">
            * Diagnóstico referencial de hábitos de estudio basados en
            rendimiento cognitivo
          </p>
          <span className="h-px flex-1 bg-border max-md:hidden" />
        </div>
      </div>
    </section>
  );
}
