import type { AuthType } from "./data";

const styles: Record<AuthType, { bg: string; text: string; border: string; label: string; icon: string }> = {
  none: { bg: "#064e3b40", text: "#6ee7b7", border: "#10b98155", label: "No Auth", icon: "🟢" },
  apiKey: { bg: "#451a0340", text: "#fcd34d", border: "#f59e0b55", label: "API Key", icon: "🔑" },
  oauth: { bg: "#450a0a40", text: "#fca5a5", border: "#ef444455", label: "OAuth", icon: "🔐" },
};

export function AuthBadge({ type }: { type: AuthType }) {
  const s = styles[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 uppercase tracking-wider"
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1,
      }}
    >
      <span style={{ fontSize: 10 }}>{s.icon}</span>
      {s.label}
    </span>
  );
}

export function HttpsBadge({ https }: { https: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 uppercase tracking-wider"
      style={{
        background: https ? "#0c4a6e40" : "#3f3f4640",
        color: https ? "#7dd3fc" : "#a1a1aa",
        border: `1px solid ${https ? "#0ea5e955" : "#52525b55"}`,
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1,
      }}
    >
      {https ? "✓" : "✕"} HTTPS
    </span>
  );
}
