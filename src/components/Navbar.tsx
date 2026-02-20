import { useState, useEffect } from "react";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { label: "Environment", href: "#environment" },
  { label: "Documentation", href: "#documentation" },
  { label: "Data", href: "#data" },
  { label: "Checker", href: "#checker" },
  { label: "Impact", href: "#impact" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur shadow-hero py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-white">
            Repro<span className="text-green-light">Lab</span>
            <span className="text-xs text-green-light/70 ml-1 font-normal">NG</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#community"
            className="ml-3 px-5 py-2.5 text-sm font-semibold text-white rounded-lg btn-primary"
            style={{ background: "var(--gradient-accent)" }}
          >
            Join Us
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden nav-blur border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#community"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-3 text-sm font-semibold text-white text-center rounded-lg btn-primary"
            style={{ background: "var(--gradient-accent)" }}
          >
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}
