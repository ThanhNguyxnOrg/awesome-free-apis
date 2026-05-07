import { Github } from "lucide-react";
import { stats } from "./data";
import apiData from "../../data/apis.json";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "#06080f",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div
              style={{
                color: "#e6edf3",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Awesome Free APIs
            </div>
            <p
              style={{
                color: "#8b949e",
                fontSize: 13,
                marginTop: 6,
                maxWidth: 480,
              }}
            >
              Auto-generated from README.md via GitHub Actions. Edit the README,
              push to main — the site rebuilds itself.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ThanhNguyxnOrg/awesome-free-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-white/[0.04]"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e6edf3",
                fontSize: 13,
              }}
            >
              <Github size={14} /> Star on GitHub
            </a>
          </div>
        </div>
        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6"
          style={{
            borderColor: "rgba(255,255,255,0.04)",
            color: "#484f58",
            fontSize: 12,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          <span>MIT License · {stats.total} APIs · Built with React + Tailwind</span>
          <span>Last synced: {apiData.meta.generated_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}</span>
        </div>
      </div>
    </footer>
  );
}
