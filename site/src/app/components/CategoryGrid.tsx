import { categories, type Category } from "./data";

export function CategoryGrid({
  onSelect,
  activeSlug,
}: {
  onSelect: (c: Category) => void;
  activeSlug?: string;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="relative mb-8 flex items-end justify-between gap-6">
        <div>
          <h2
            style={{
              fontSize: 28,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Browse by Category
          </h2>
          <p style={{ color: "#8b949e", marginTop: 6, fontSize: 14 }}>
            Explore {categories.length} curated categories spanning every developer need.
          </p>
        </div>
        <div
          style={{
            color: "#8b949e",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11.5,
          }}
        >
          {categories.length} Categories
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <button
              key={c.slug}
              onClick={() => onSelect(c)}
              className="group relative rounded-xl text-left transition-all duration-200"
              style={{
                background: "#0a0e14",
                border: active
                  ? "1px solid #06b6d4"
                  : "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: active ? "0 0 15px rgba(6,182,212,0.15)" : "none",
                minHeight: 110,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)";
                  e.currentTarget.style.background = "#0d121c";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.background = "#0a0e14";
                }
              }}
            >
              {/* Highlight accent left border */}
              <div
                className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  background: "#06b6d4",
                }}
              />
              <div className="flex h-full flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 22 }}>{c.emoji}</span>
                  <span
                    style={{
                      color: "#8b949e",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11.5,
                    }}
                  >
                    /{c.slug}
                  </span>
                </div>
                <div className="mt-3">
                  <div
                    style={{
                      color: "#e6edf3",
                      fontSize: 13.5,
                      fontWeight: 600,
                      lineHeight: 1.25,
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      color: "#06b6d4",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    {c.count} APIs
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
