import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown, ArrowRight, CheckCircle } from "lucide-react";

const pills = [
  "Python Environments",
  "Docker Configs",
  "Experiment Templates",
  "Data Sharing",
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/60 via-transparent to-navy-dark/80" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(hsl(148 65% 42%) 1px, transparent 1px), linear-gradient(90deg, hsl(148 65% 42%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium text-green-light border border-green-light/30 bg-green-light/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-light animate-pulse" />
          Built for Nigerian Software Engineers & Researchers
        </div>

        {/* Headline */}
        <h1 className="section-heading text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-up">
          Make Your Experiments
          <br />
          <span className="gradient-text">Truly Reproducible</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          A platform that helps software engineers and researchers in Nigeria standardize environments, document experiments, and verify reproducibility — so science moves forward together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <a
            href="#environment"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl btn-primary"
            style={{ background: "var(--gradient-accent)" }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#checker"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl border border-white/25 hover:bg-white/10 transition-all duration-300"
          >
            Check Reproducibility
          </a>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          {pills.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-white/70 stat-card rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-green-light" /> {p}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center animate-bounce">
          <a href="#environment" className="text-white/40 hover:text-white/70 transition-colors">
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
