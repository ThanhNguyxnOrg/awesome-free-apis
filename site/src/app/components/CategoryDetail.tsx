import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { apis, categories, type Category } from "./data";
import { ApiCard } from "./ApiCard";
import { AuthBadge, HttpsBadge } from "./AuthBadge";
import { categoryDescriptions } from "./categoryDescriptions";

export function CategoryDetail({
  category,
  onBack,
  onSelectCategory,
}: {
  category: Category;
  onBack: () => void;
  onSelectCategory: (c: Category) => void;
}) {
  const [view, setView] = useState<"cards" | "list">("cards");
  const [filter, setFilter] = useState<"all" | "none" | "apiKey" | "oauth">("all");
  const [sort, setSort] = useState<"default" | "az" | "za" | "featured">("default");

  const items = useMemo(() => {
    let base = apis.filter((a) => a.category === category.slug);
    if (filter !== "all") base = base.filter((a) => a.auth === filter);
    const sorted = [...base];
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "za") sorted.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "featured")
      sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [category.slug, filter, sort]);

  const stats = useMemo(() => {
    const list = apis.filter((a) => a.category === category.slug);
    return {
      total: category.count,
      noAuth: list.filter((a) => a.auth === "none").length,
      apiKey: list.filter((a) => a.auth === "apiKey").length,
      oauth: list.filter((a) => a.auth === "oauth").length,
    };
  }, [category]);

  const statCards = [
    { v: stats.total, l: "Total APIs", c: "#3b82f6" },
    { v: stats.noAuth, l: "No Auth", c: "#10b981" },
    { v: stats.apiKey, l: "API Key", c: "#f59e0b" },
    { v: stats.oauth, l: "OAuth", c: "#ef4444" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-24">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 transition-colors hover:text-white"
            style={{ color: "#8b949e", fontSize: 13 }}
          >
            <ArrowLeft size={14} /> All categories
          </button>
          <div
            className="rounded-xl p-2 max-h-[70vh] overflow-y-auto"
            style={{
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {categories.map((c) => {
              const active = c.slug === category.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => onSelectCategory(c)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 transition-colors"
                  style={{
                    background: active ? "rgba(59,130,246,0.12)" : "transparent",
                    color: active ? "#93c5fd" : "#8b949e",
                    fontSize: 13,
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{c.emoji}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: active ? "#93c5fd" : "#484f58",
                    }}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 lg:hidden"
          style={{ color: "#8b949e", fontSize: 13 }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="mb-8 flex items-center gap-4">
          <div style={{ fontSize: 44 }}>{category.emoji}</div>
          <div>
            <h1
              style={{
                color: "#e6edf3",
                fontSize: 36,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              {category.name}
            </h1>
            <p style={{ color: "#8b949e", marginTop: 6, fontSize: 14, maxWidth: 560 }}>
              {categoryDescriptions[category.slug] ?? `${category.count} APIs in this category`}
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map((s) => (
            <div
              key={s.l}
              className="rounded-xl p-4"
              style={{
                background: "#0d1117",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: s.c,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  color: "#8b949e",
                  fontSize: 11,
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "none", "apiKey", "oauth"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full px-3 py-1.5 transition-colors"
                style={{
                  background:
                    filter === f ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    filter === f ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)"
                  }`,
                  color: filter === f ? "#93c5fd" : "#8b949e",
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {f === "all" ? "All" : f === "none" ? "No Auth" : f === "apiKey" ? "API Key" : "OAuth"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{
                background: "#0d1117",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <ArrowUpDown size={12} style={{ color: "#8b949e" }} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="bg-transparent outline-none"
                style={{
                  color: "#cbd5e1",
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                <option value="default" style={{ background: "#0d1117" }}>Default</option>
                <option value="featured" style={{ background: "#0d1117" }}>Featured first</option>
                <option value="az" style={{ background: "#0d1117" }}>A → Z</option>
                <option value="za" style={{ background: "#0d1117" }}>Z → A</option>
              </select>
            </div>
            <div
              className="flex rounded-lg p-1"
              style={{
                background: "#0d1117",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
            <button
              onClick={() => setView("cards")}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
              style={{
                background: view === "cards" ? "rgba(255,255,255,0.06)" : "transparent",
                color: view === "cards" ? "#e6edf3" : "#8b949e",
              }}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
              style={{
                background: view === "list" ? "rgba(255,255,255,0.06)" : "transparent",
                color: view === "list" ? "#e6edf3" : "#8b949e",
              }}
            >
              <List size={14} />
            </button>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{
              background: "#0d1117",
              border: "1px dashed rgba(255,255,255,0.08)",
              color: "#8b949e",
            }}
          >
            No APIs match this filter yet.
          </div>
        ) : view === "cards" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((api) => (
              <ApiCard key={api.name} api={api} />
            ))}
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-xl"
            style={{
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {items.map((api, idx) => (
              <a
                key={api.name}
                href={api.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                style={{
                  borderTop:
                    idx === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="min-w-0 flex-1">
                  <div
                    style={{
                      color: "#e6edf3",
                      fontWeight: 600,
                      fontSize: 14.5,
                    }}
                  >
                    {api.name}
                  </div>
                  <div
                    style={{
                      color: "#8b949e",
                      fontSize: 13,
                      marginTop: 2,
                    }}
                    className="truncate"
                  >
                    {api.description}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <AuthBadge type={api.auth} />
                  <HttpsBadge https={api.https} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
