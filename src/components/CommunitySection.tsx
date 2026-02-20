import { useState } from "react";
import { Mail, User, MessageSquare, Building, Send, CheckCircle, Users, ArrowRight } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  institution: string;
  role: string;
  message: string;
}

export default function CommunitySection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", institution: "", role: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"join" | "contact">("join");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-all placeholder:text-muted-foreground";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  const roles = ["Software Engineer", "Researcher / Academician", "PhD Student", "MSc Student", "Data Scientist", "Other"];
  const perks = [
    "Access to reproducibility resources and templates",
    "Connect with researchers across Nigerian universities",
    "Early access to new platform features",
    "Monthly newsletter on reproducibility best practices",
    "Collaboration opportunities on joint research",
  ];

  return (
    <section id="community" className="py-24" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-dark bg-green-muted rounded-full mb-4 uppercase tracking-wider">
            Community
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Join the Movement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Connect with Nigeria's growing community of researchers and engineers committed to reproducible science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Perks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-navy rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Member Benefits</h3>
                  <p className="text-xs text-white/50">680+ researchers & engineers</p>
                </div>
              </div>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-light flex-shrink-0 mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Community stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Active Members", val: "680+", emoji: "👥" },
                { label: "Universities", val: "38", emoji: "🎓" },
                { label: "States Covered", val: "24", emoji: "🗺️" },
                { label: "Papers Helped", val: "190+", emoji: "📄" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center card-base">
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  <div className="font-heading font-bold text-navy text-lg">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {/* Tab switcher */}
            <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6">
              {(["join", "contact"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                    activeTab === tab ? "bg-card text-navy shadow-card" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "join" ? "Join the Community" : "Contact / Feedback"}
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--gradient-accent)" }}>
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">Welcome to ReproLab NG! 🎉</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for joining. We'll be in touch with resources and community updates.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", institution: "", role: "", message: "" }); }}
                    className="text-sm font-medium text-green-dark underline underline-offset-2"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input className={`${inputClass} pl-10`} placeholder="Amina Bello" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input type="email" className={`${inputClass} pl-10`} placeholder="you@university.edu.ng" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Institution / Organization</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      <input className={`${inputClass} pl-10`} placeholder="e.g., University of Lagos, Andela, etc." value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Your Role</label>
                    <select className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="">Select your role…</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {activeTab === "contact" && (
                    <div>
                      <label className={labelClass}>Message / Feedback</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                        <textarea
                          className={`${inputClass} pl-10 resize-none`}
                          rows={4}
                          placeholder="Share your feedback, collaboration ideas, or questions…"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all btn-primary"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    <Send className="w-4 h-4" />
                    {activeTab === "join" ? "Join ReproLab NG" : "Send Message"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
