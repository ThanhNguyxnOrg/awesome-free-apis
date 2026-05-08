import { ArrowLeft, Heart } from "lucide-react";
import { apis } from "./data";
import { ApiCard } from "./ApiCard";
import { useFavorites } from "./favorites";

export function FavoritesView({ onBack }: { onBack: () => void }) {
  const favs = useFavorites();
  const items = apis.filter((a) => favs.has(a.name));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 transition-colors hover:text-white"
        style={{ color: "#8b949e", fontSize: 13 }}
      >
        <ArrowLeft size={14} /> Home
      </button>

      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(236,72,153,0.15))",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <Heart size={24} color="#ef4444" fill="#ef4444" />
        </div>
        <div>
          <h1
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#e6edf3",
            }}
          >
            Your Favorites
          </h1>
          <p style={{ color: "#8b949e", marginTop: 6, fontSize: 14 }}>
            {items.length === 0
              ? "Heart any API to save it here. Stored in your browser only."
              : `${items.length} API${items.length === 1 ? "" : "s"} saved locally.`}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{
            background: "#0d1117",
            border: "1px dashed rgba(255,255,255,0.08)",
          }}
        >
          <Heart
            size={40}
            className="mx-auto mb-4"
            style={{ color: "#484f58" }}
          />
          <div style={{ color: "#8b949e", fontSize: 15 }}>
            No favorites yet. Click the heart on any API to save it.
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((api) => (
            <ApiCard key={api.name} api={api} />
          ))}
        </div>
      )}
    </div>
  );
}
