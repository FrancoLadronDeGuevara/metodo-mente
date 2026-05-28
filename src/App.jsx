import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import WhyMethod from "./components/WhyMethod/WhyMethod";
import StudyMethods from "./components/StudyMethods/StudyMethods";
import StudyQuiz from "./components/StudyQuiz/StudyQuiz";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

/* Placeholder sections for scroll-spy targets */
function PlaceholderSection({ id, label }) {
  return (
    <section
      id={id}
      className="min-h-[60vh] flex items-center justify-center border-t-2 border-t-border"
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">
        [ {label} — Próximamente ]
      </p>
    </section>
  );
}

function TrackedSection({ id, label, onInView, children }) {
  const { ref } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) onInView(id);
    },
  });

  return (
    <div ref={ref}>
      {children || <PlaceholderSection id={id} label={label} />}
    </div>
  );
}

function TrackedHero({ onInView }) {
  const { ref } = useInView({
    threshold: 0.4,
    onChange: (inView) => {
      if (inView) onInView("inicio");
    },
  });

  return (
    <div ref={ref}>
      <HeroSection />
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("inicio");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} />

      <main className="flex-1">
        <TrackedHero onInView={setActiveSection} />

        <TrackedSection id="por-que" onInView={setActiveSection}>
          <WhyMethod />
        </TrackedSection>

        <TrackedSection id="metodos" onInView={setActiveSection}>
          <StudyMethods />
        </TrackedSection>

        <TrackedSection id="quiz" onInView={setActiveSection}>
          <StudyQuiz />
        </TrackedSection>

        <TrackedSection id="beneficios" onInView={setActiveSection}>
          <Testimonials />
        </TrackedSection>
        <TrackedSection
          id="recursos"
          label="Recursos"
          onInView={setActiveSection}
        />
        <TrackedSection
          id="contacto"
          label="Contacto"
          onInView={setActiveSection}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
