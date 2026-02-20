import { useState } from "react";
import { Check, Copy, Terminal, ChevronDown } from "lucide-react";

const environments = [
  {
    id: "python",
    name: "Python",
    version: "3.11.x",
    icon: "🐍",
    color: "hsl(207 90% 54%)",
    description: "Data science, ML experiments, scripting",
    setup: `# Python 3.11 Environment Setup
conda create -n repro-env python=3.11
conda activate repro-env
pip install -r requirements.txt

# Freeze dependencies
pip freeze > requirements.txt

# Record environment
pip list --format=freeze > environment.lock`,
  },
  {
    id: "java",
    name: "Java",
    version: "JDK 17 LTS",
    icon: "☕",
    color: "hsl(25 90% 54%)",
    description: "Enterprise apps, Android, backend systems",
    setup: `# Java 17 LTS Environment
# Install via SDKMAN (recommended)
curl -s "https://get.sdkman.io" | bash
sdk install java 17.0.9-tem

# Verify version
java -version

# Maven setup
mvn wrapper:wrapper
echo "java.version=17" >> .mvn/wrapper/maven-wrapper.properties`,
  },
  {
    id: "docker",
    name: "Docker",
    version: "24.x",
    icon: "🐋",
    color: "hsl(207 89% 54%)",
    description: "Containerized, fully portable experiments",
    setup: `# Dockerfile for reproducible experiment
FROM python:3.11-slim

WORKDIR /experiment
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Build & run
docker build -t my-experiment:v1 .
docker run --rm my-experiment:v1`,
  },
  {
    id: "r",
    name: "R",
    version: "4.3.x",
    icon: "📊",
    color: "hsl(271 81% 56%)",
    description: "Statistical analysis, data visualization",
    setup: `# R 4.3 Environment with renv
install.packages("renv")
renv::init()

# Snapshot dependencies
renv::snapshot()

# Restore environment
renv::restore()

# Session info for reproducibility
sessionInfo()
writeLines(capture.output(sessionInfo()), "session_info.txt")`,
  },
  {
    id: "nodejs",
    name: "Node.js",
    version: "20 LTS",
    icon: "⚡",
    color: "hsl(117 57% 40%)",
    description: "Web apps, CLI tools, automation scripts",
    setup: `# Node.js 20 LTS with nvm
nvm install 20
nvm use 20

# Lock dependencies
npm ci  # Use ci instead of install

# Save exact versions
npm shrinkwrap

# Record Node version
node --version > .nvmrc`,
  },
  {
    id: "jupyter",
    name: "Jupyter",
    version: "Notebook 7.x",
    icon: "📓",
    color: "hsl(38 92% 50%)",
    description: "Interactive notebooks, reproducible analysis",
    setup: `# Jupyter reproducible setup
pip install jupyter nbconvert

# Run notebook non-interactively
jupyter nbconvert --to notebook \\
  --execute experiment.ipynb \\
  --output experiment_executed.ipynb

# Export to HTML for sharing
jupyter nbconvert --to html \\
  experiment_executed.ipynb`,
  },
];

export default function EnvironmentSetup() {
  const [selected, setSelected] = useState("python");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const env = environments.find((e) => e.id === selected)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(env.setup);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="environment" className="py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-dark bg-green-muted rounded-full mb-4 uppercase tracking-wider">
            Step 1
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Standardized Environment Setup
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose your technology stack and get a reproducible environment configuration ready to copy.
          </p>
        </div>

        {/* Environment Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {environments.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                selected === e.id
                  ? "env-card-selected"
                  : "border-border bg-card hover:border-green/50 hover:bg-green-muted/50"
              }`}
            >
              <div className="text-2xl mb-1">{e.icon}</div>
              <div className="text-xs font-semibold text-foreground">{e.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{e.version}</div>
            </button>
          ))}
        </div>

        {/* Config Panel */}
        <div className="rounded-2xl border border-border overflow-hidden card-base">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-navy text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{env.icon}</span>
              <div>
                <h3 className="font-semibold font-heading">{env.name} — {env.version}</h3>
                <p className="text-xs text-white/60">{env.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
              >
                <Terminal className="w-3.5 h-3.5" />
                {showCode ? "Hide" : "Show"} Config
                <ChevronDown className={`w-3 h-3 transition-transform ${showCode ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "var(--gradient-accent)" }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Code block */}
          {showCode && (
            <pre className="p-6 text-sm text-green-light bg-navy-dark overflow-x-auto leading-relaxed">
              <code>{env.setup}</code>
            </pre>
          )}

          {/* Tips footer */}
          <div className="px-6 py-4 bg-muted/50 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-green-dark">💡 Tip:</span> Commit your environment config file to version control so collaborators can reproduce your setup exactly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
