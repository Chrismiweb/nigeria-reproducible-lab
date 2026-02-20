import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, BookOpen, Globe, Award, Zap } from "lucide-react";

const stats = [
  { label: "Experiments Documented", value: "2,400+", icon: BookOpen, color: "hsl(var(--green))" },
  { label: "Researchers Joined", value: "680+", icon: Users, color: "hsl(207 90% 54%)" },
  { label: "Reproducibility Rate", value: "94%", icon: TrendingUp, color: "hsl(var(--green))" },
  { label: "Universities Reached", value: "38", icon: Globe, color: "hsl(38 92% 50%)" },
];

const benefits = [
  {
    icon: Award,
    title: "Research Credibility",
    desc: "Reproducible experiments validate findings and build trust in Nigerian software engineering research.",
    bar: 90,
  },
  {
    icon: Users,
    title: "Collaborative Science",
    desc: "Shared environments and data enable cross-institution collaboration across Nigerian universities and tech hubs.",
    bar: 75,
  },
  {
    icon: Zap,
    title: "Faster Innovation",
    desc: "Building on reproducible baselines accelerates the pace of innovation in the Nigerian tech ecosystem.",
    bar: 82,
  },
  {
    icon: Globe,
    title: "Global Recognition",
    desc: "Internationally reproducible research from Nigeria gains visibility in global conferences and journals.",
    bar: 68,
  },
];

function AnimatedBar({ percent, delay }: { percent: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all ease-out"
        style={{
          width: animate ? `${percent}%` : "0%",
          transitionDuration: "1.2s",
          transitionDelay: `${delay}s`,
          background: "var(--gradient-accent)",
        }}
      />
    </div>
  );
}

export default function ImpactSection() {
  return (
    <section id="impact" className="py-24 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(hsl(148 65% 42%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-green/20" />

      <div className="relative container max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-light bg-green-light/10 rounded-full mb-4 uppercase tracking-wider border border-green-light/20">
            Impact
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Why Reproducibility Matters
            <br />
            <span className="gradient-text">in Nigeria</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Building a culture of reproducible research strengthens the foundation of Nigeria's growing tech and research community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="font-heading text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-xs text-white/50">{label}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map(({ icon: Icon, title, desc, bar }, i) => (
            <div key={title} className="stat-card rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--gradient-accent)" }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>Impact score</span>
                  <span>{bar}%</span>
                </div>
                <AnimatedBar percent={bar} delay={i * 0.15} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-white/70 text-lg italic max-w-3xl mx-auto leading-relaxed border-l-4 pl-6 text-left" style={{ borderColor: "hsl(var(--green))" }}>
            "Science that cannot be reproduced is not science at all. Nigeria's engineers have the talent — reproducibility gives them the credibility to compete globally."
          </blockquote>
          <p className="text-white/40 text-sm mt-3 ml-6">— ReproLab NG Research Initiative</p>
        </div>
      </div>
    </section>
  );
}
