import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Métodos", href: "#metodos" },
  { label: "Diagnóstico", href: "#quiz" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Recursos", href: "#recursos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar({ activeSection }) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 border-b-3 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-surface border-border shadow-[0_4px_30px_rgba(0,0,0,0.08)] py-2.5 backdrop-blur-md"
          : "border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-1 no-underline group"
          onClick={(e) => handleNavClick(e, "#inicio")}
        >
          <img
            src={logo}
            alt="Método Mente logo"
            className="w-[42px] h-[42px] object-contain transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-108"
          />
          <div className="flex gap-0.5 font-display pt-3">
            <span className="text-sm font-extrabold text-text tracking-tight uppercase">
              Método
            </span>
            <span className="text-sm font-extrabold text-primary tracking-tight uppercase italic">
              Mente
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex list-none gap-1 m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative py-2 px-4 font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] no-underline transition-colors duration-250 ${
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-text-muted hover:text-text"
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-accent"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-10 h-10 border-2 border-border bg-transparent text-text text-lg cursor-pointer transition-all duration-250 hover:bg-primary hover:border-primary hover:text-surface hover:rotate-15"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <FiSun />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <FiMoon />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Toggle */}
          <button
            className="flex md:hidden items-center justify-center w-10 h-10 border-2 border-border bg-transparent text-text text-xl cursor-pointer transition-all duration-250 hover:border-primary hover:text-primary"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menú de navegación"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="overflow-hidden border-t-2 border-border bg-surface md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="list-none m-0 py-4 flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    className={`block py-3.5 px-8 font-mono text-sm font-bold uppercase tracking-[0.12em] no-underline border-l-4 transition-all duration-200 ${
                      activeSection === link.href.slice(1)
                        ? "text-primary border-l-accent"
                        : "text-text-muted border-l-transparent hover:text-text hover:bg-bg hover:border-l-accent"
                    }`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
