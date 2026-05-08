import { categories, type Category } from "./data";

export function TagCloud({ onSelect }: { onSelect: (c: Category) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-2 pt-12">
      <div className="mb-5 flex items-center gap-3">
        <div
          style={{
            color: "#8b949e",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11.5,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Quick jump
        </div>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => onSelect(c)}
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#cbd5e1",
              fontSize: 13,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6,182,212,0.1)";
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
              e.currentTarget.style.color = "#7dd3fc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            <span>{c.emoji}</span>
            <span>{c.name}</span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "#06b6d4",
              }}
            >
              {c.count}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
