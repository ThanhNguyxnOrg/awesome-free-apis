import { apis } from "./data";
import { ApiCard } from "./ApiCard";

export function FeaturedAPIs() {
  const featured = apis.filter((a) => a.featured);
  return (
    <section
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#06080f" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#fcd34d",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            ⭐ Featured
          </div>
          <h2
            style={{
              fontSize: 32,
              letterSpacing: "-0.02em",
              color: "#e6edf3",
              fontWeight: 700,
            }}
          >
            Most Popular APIs
          </h2>
          <p style={{ color: "#8b949e", marginTop: 8, fontSize: 15 }}>
            Hand-picked APIs developers love and use every day.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((api) => (
            <ApiCard key={api.name} api={api} />
          ))}
        </div>
      </div>
    </section>
  );
}
