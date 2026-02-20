import { FlaskConical, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/10 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white">
              Repro<span className="text-green-light">Lab</span>
              <span className="text-xs text-green-light/60 ml-1 font-normal">NG</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/50">
            {["#environment", "#documentation", "#data", "#checker", "#impact", "#community"].map((href) => (
              <a key={href} href={href} className="hover:text-white/80 transition-colors capitalize">
                {href.replace("#", "")}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg stat-card flex items-center justify-center text-white/50 hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="text-center text-xs text-white/30">
          © {new Date().getFullYear()} ReproLab NG — Promoting reproducibility in Nigerian software engineering research.
          <br />
          Built with ❤️ for the Nigerian tech & research community.
        </div>
      </div>
    </footer>
  );
}
