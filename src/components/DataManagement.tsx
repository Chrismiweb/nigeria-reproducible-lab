import { useState, useRef } from "react";
import { Upload, Globe, Lock, FileText, Trash2, Share2, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  visibility: "public" | "private";
  uploadedAt: string;
}

export default function DataManagement() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles: UploadedFile[] = Array.from(incoming).map((f) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      type: f.name.split(".").pop()?.toUpperCase() || "FILE",
      visibility: "private",
      uploadedAt: new Date().toLocaleTimeString(),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const toggleVisibility = (id: string) => {
    setFiles((f) =>
      f.map((file) =>
        file.id === id
          ? { ...file, visibility: file.visibility === "public" ? "private" : "public" }
          : file
      )
    );
  };

  const removeFile = (id: string) => {
    setFiles((f) => f.filter((file) => file.id !== id));
  };

  const handleShare = (id: string, name: string) => {
    const fakeLink = `https://reprolab.ng/data/${id}/${name}`;
    navigator.clipboard.writeText(fakeLink);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const fileIconColor: Record<string, string> = {
    CSV: "hsl(148 65% 42%)",
    JSON: "hsl(207 90% 54%)",
    XLSX: "hsl(117 57% 40%)",
    PDF: "hsl(0 84% 60%)",
    TXT: "hsl(220 15% 45%)",
  };

  return (
    <section id="data" className="py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-dark bg-green-muted rounded-full mb-4 uppercase tracking-wider">
            Step 3
          </span>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-navy mb-4">
            Data Management & Sharing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload your experimental data files and share them publicly or privately with collaborators.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          className={`upload-zone rounded-2xl p-12 text-center cursor-pointer mb-8 transition-all duration-300 ${dragging ? "border-green bg-green-muted" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".csv,.json,.xlsx,.txt,.pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--gradient-accent)", opacity: dragging ? 1 : 0.8 }}>
            <Upload className="w-8 h-8 text-white" />
          </div>
          <p className="text-base font-semibold text-foreground mb-1">
            {dragging ? "Drop files here!" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-muted-foreground">
            or <span className="text-green-dark font-medium underline underline-offset-2">browse files</span>
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Supported: CSV, JSON, XLSX, TXT, PDF • Max 20MB per file
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-navy text-sm uppercase tracking-wider mb-4">
              Uploaded Files ({files.length})
            </h3>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border card-base"
              >
                {/* File icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: fileIconColor[file.type] || "hsl(220 15% 45%)" }}
                >
                  {file.type.slice(0, 3)}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size} • Uploaded at {file.uploadedAt}</p>
                </div>

                {/* Visibility toggle */}
                <button
                  onClick={() => toggleVisibility(file.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    file.visibility === "public"
                      ? "bg-green-muted text-green-dark border border-green/30"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {file.visibility === "public" ? (
                    <><Globe className="w-3 h-3" /> Public</>
                  ) : (
                    <><Lock className="w-3 h-3" /> Private</>
                  )}
                </button>

                {/* Share */}
                {file.visibility === "public" && (
                  <button
                    onClick={() => handleShare(file.id, file.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all btn-primary"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {copied === file.id ? (
                      <><CheckCircle className="w-3 h-3" /> Copied!</>
                    ) : (
                      <><Share2 className="w-3 h-3" /> Share</>
                    )}
                  </button>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state hint */}
        {files.length === 0 && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              No files uploaded yet. Upload CSV, JSON, or other data files above.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
