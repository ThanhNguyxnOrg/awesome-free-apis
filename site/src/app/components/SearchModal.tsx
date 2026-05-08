import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { apis, categories } from "./data";
import { AuthBadge } from "./AuthBadge";

export function SearchModal({
  open,
  onClose,
  onSelectCategory,
}: {
  open: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? apis.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            a.category.toLowerCase().includes(q)
        )
      : apis.filter((a) => a.featured);
    const map = new Map<string, typeof apis>();
    for (const api of filtered) {
      const arr = map.get(api.category) ?? [];
      arr.push(api);
      map.set(api.category, arr);
    }
    return Array.from(map.entries()).map(([slug, list]) => ({
      category: categories.find((c) => c.slug === slug),
      list,
    }));
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24"
      style={{
        background: "rgba(6, 8, 15, 0.7)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.15s ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl"
        style={{
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          animation: "fadeInUp 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            height: 60,
          }}
        >
          <Search size={18} style={{ color: "#8b949e" }} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs by name, description, or category..."
            className="flex-1 bg-transparent outline-none"
            style={{ color: "#e6edf3", fontSize: 15 }}
          />
          <button
            onClick={onClose}
            className="flex h-7 items-center gap-1 rounded-md px-2"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#8b949e",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
            }}
          >
            ESC <X size={12} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {grouped.length === 0 ? (
            <div
              className="px-4 py-12 text-center"
              style={{ color: "#8b949e", fontSize: 14 }}
            >
              No APIs match "{query}"
            </div>
          ) : (
            <>
              {!query && (
                <div
                  className="px-3 py-2"
                  style={{
                    color: "#484f58",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Featured
                </div>
              )}
              {grouped.map(({ category, list }) => (
                <div key={category?.slug} className="mb-3">
                  <button
                    onClick={() => {
                      if (category) {
                        onSelectCategory(category.slug);
                        onClose();
                      }
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 transition-colors hover:text-white"
                    style={{
                      color: "#8b949e",
                      fontSize: 12.5,
                      fontWeight: 500,
                    }}
                  >
                    <span>{category?.emoji}</span>
                    <span>{category?.name}</span>
                  </button>
                  {list.map((api) => (
                    <a
                      key={api.name}
                      href={api.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          style={{
                            color: "#e6edf3",
                            fontSize: 13.5,
                            fontWeight: 500,
                          }}
                        >
                          {api.name}
                        </div>
                        <div
                          className="truncate"
                          style={{ color: "#8b949e", fontSize: 12.5, marginTop: 1 }}
                        >
                          {api.description}
                        </div>
                      </div>
                      <AuthBadge type={api.auth} />
                    </a>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
