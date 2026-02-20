import { useState, useRef } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2, RotateCcw, Info } from "lucide-react";

type CheckStatus = "idle" | "checking" | "reproducible" | "needs-work";

interface CheckIssue {
  severity: "error" | "warning" | "info";
  message: string;
}

const mockIssues: CheckIssue[] = [
  { severity: "warning", message: "No dependency lock file found (requirements.txt or environment.yml)" },
  { severity: "info", message: "Random seed not set — results may vary between runs" },
  { severity: "info", message: "Consider pinning exact library versions for full reproducibility" },
];

export default function ReproducibilityChecker() {
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [issues, setIssues] = useState<CheckIssue[]>([]);
  const configRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);

  const handleCheck = async () => {
    if (!configFile) return;
    setStatus("checking");
    setIssues([]);

    // Simulate async check
    await new Promise((r) => setTimeout(r, 2800));

    // Simulate result based on file names
    const isGood = configFile.name.includes("docker") || configFile.name.includes("env");
    if (isGood) {
      setStatus("reproducible");
      setIssues([{ severity: "info", message: "All environment variables are pinned" }, { severity: "info", message: "Dependency versions are locked" }]);
    } else {
      setStatus("needs-work");
      setIssues(mockIssues);
    }
  };

  const reset = () => {
    setStatus("idle");
    setConfigFile(null);
    setDataFile(null);
    setIssues([]);
  };

  const severityStyles: Record<string, string> = {
    error: "text-destructive bg-destructive/10 border-destructive/20",
    warning: "text-yellow-700 bg-yellow-50 border-yellow-200",
    info: "text-blue-700 bg-blue-50 border-blue-200",
  };

  const SeverityIcon = ({ s }: { s: string }) =>
    s === "error" ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <Info className="w-4 h-4 flex-shrink-0" />;

  return (
    <section id="checker" className="py-24" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container max-w-3xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-dark bg-green-muted rounded-full mb-4 uppercase tracking-wider">
            Step 4
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Reproducibility Checker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload your experiment configuration and data to verify whether your experiment can be successfully replicated.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
          {status === "idle" || status === "checking" ? (
            <div className="space-y-6">
              {/* Config upload */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Experiment Configuration File *
                </label>
                <div
                  className="upload-zone rounded-xl p-6 text-center cursor-pointer"
                  onClick={() => configRef.current?.click()}
                >
                  <input ref={configRef} type="file" accept=".yml,.yaml,.json,.txt,.cfg,.env,.dockerfile,Dockerfile" className="hidden" onChange={(e) => setConfigFile(e.target.files?.[0] || null)} />
                  {configFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-dark">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{configFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload config file (YAML, JSON, Dockerfile, .env)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Data upload */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Experimental Data File <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <div
                  className="upload-zone rounded-xl p-6 text-center cursor-pointer"
                  onClick={() => dataRef.current?.click()}
                >
                  <input ref={dataRef} type="file" accept=".csv,.json,.xlsx,.txt" className="hidden" onChange={(e) => setDataFile(e.target.files?.[0] || null)} />
                  {dataFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-dark">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{dataFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload data file (CSV, JSON, XLSX)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Check button */}
              <button
                disabled={!configFile || status === "checking"}
                onClick={handleCheck}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: "var(--gradient-accent)" }}
              >
                {status === "checking" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Reproducibility…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Run Reproducibility Check
                  </>
                )}
              </button>

              {status === "checking" && (
                <div className="space-y-2">
                  {["Parsing configuration file…", "Checking dependency specifications…", "Validating environment constraints…"].map((msg, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-green/30 border-t-green animate-spin"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Result Panel */
            <div className="space-y-6">
              {/* Status banner */}
              <div className={`rounded-xl p-6 text-center ${status === "reproducible" ? "status-reproducible" : "status-needs-work"}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {status === "reproducible" ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <AlertCircle className="w-8 h-8" />
                  )}
                  <h3 className="font-heading text-xl font-bold">
                    {status === "reproducible" ? "✅ Experiment is Reproducible!" : "⚠️ Needs Adjustments"}
                  </h3>
                </div>
                <p className="text-sm opacity-80">
                  {status === "reproducible"
                    ? "Your configuration meets reproducibility standards. Others can replicate your experiment."
                    : "Some issues were detected. Address them to improve reproducibility."}
                </p>
              </div>

              {/* Issues list */}
              {issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-navy mb-3">
                    {status === "reproducible" ? "Confirmations" : "Issues Found"}
                  </h4>
                  <div className="space-y-2">
                    {issues.map((issue, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${severityStyles[issue.severity]}`}>
                        <SeverityIcon s={issue.severity} />
                        {issue.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files used */}
              <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">Config:</span> {configFile?.name}</p>
                {dataFile && <p className="mt-1"><span className="font-medium text-foreground">Data:</span> {dataFile.name}</p>}
              </div>

              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-border text-navy hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Run Another Check
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
