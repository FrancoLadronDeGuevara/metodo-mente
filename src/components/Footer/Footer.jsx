import { FiBookOpen, FiGithub, FiMail, FiArrowUpRight } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { CURRENT_YEAR } from "../../constants/constants";

const FOOTER_LINKS = [
  {
    title: "Navegación",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Métodos", href: "#metodos" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "Recursos", href: "#recursos" },
    ],
  },
  {
    title: "Técnicas",
    links: [
      { label: "Pomodoro", href: "#metodos" },
      { label: "Feynman", href: "#metodos" },
      { label: "Active Recall", href: "#metodos" },
      { label: "Spaced Repetition", href: "#metodos" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Artículos", href: "#recursos" },
      { label: "Guías PDF", href: "#recursos" },
      { label: "Bibliografía", href: "#recursos" },
      { label: "Comunidad", href: "#contacto" },
    ],
  },
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-surface">
      {/* Top decorative rule */}
      <div
        className="flex flex-col gap-1 px-8 max-w-[1280px] mx-auto"
        aria-hidden="true"
      >
        <span className="h-1 bg-text" />
        <span className="h-px bg-border" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pt-14 pb-10 grid grid-cols-[1.2fr_2fr] gap-16 max-md:grid-cols-1 max-md:gap-10 max-md:px-5 max-md:pt-10 max-md:pb-8">
        {/* Colophon */}
        <div>
          <div className="flex items-center gap-3.5 mb-6">
            <img
              src={logo}
              alt="Método Mente"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="font-display text-2xl font-extrabold text-text uppercase tracking-tight leading-tight m-0">
                Método{" "}
                <span className="text-primary italic">Mente</span>
              </h3>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-muted m-0 mt-0.5">
                Aprende mejor, no más.
              </p>
            </div>
          </div>

          <p className="font-body text-sm leading-relaxed text-text-muted mb-6 max-w-[320px]">
            Una publicación digital dedicada a la ciencia del aprendizaje
            efectivo. Cada técnica, respaldada por evidencia empírica.
          </p>

          <div className="flex gap-2">
            {[
              { icon: FiGithub, label: "GitHub" },
              { icon: FiMail, label: "Email" },
              { icon: FiBookOpen, label: "Blog" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="flex items-center justify-center w-[42px] h-[42px] border-2 border-border text-text-muted text-lg no-underline transition-all duration-250 hover:bg-primary hover:border-primary hover:text-surface hover:-translate-y-0.5"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-md:gap-6 max-[480px]:grid-cols-1">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent m-0 mb-5 pb-3 border-b-2 border-b-border">
                {col.title}
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 font-body text-sm text-text-muted no-underline transition-all duration-200 hover:text-text hover:translate-x-1"
                      onClick={(e) => handleClick(e, link.href)}
                    >
                      {link.label}
                      <FiArrowUpRight className="text-[0.7rem] opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-t-border">
        <div className="max-w-[1280px] mx-auto px-8 py-5 flex justify-between items-center gap-4 max-md:flex-col max-md:text-center max-md:gap-2 max-md:px-5 max-md:py-4">
          <p className="font-mono text-[0.7rem] text-text-muted tracking-wide m-0">
            © {CURRENT_YEAR} Método Mente — Todos los derechos reservados.
          </p>
          <p className="font-mono text-[0.65rem] text-text-muted opacity-60 tracking-wide m-0">
            Diseñado con rigurosidad editorial · Tipografía: Playfair Display +
            Space Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
