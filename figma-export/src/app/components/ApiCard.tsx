import { useState } from "react";
import { ArrowUpRight, Check, Copy, Heart } from "lucide-react";
import type { Api } from "./data";
import { AuthBadge, HttpsBadge } from "./AuthBadge";
import { toggleFavorite, useFavorites } from "./favorites";

export function ApiCard({ api }: { api: Api }) {
  const favs = useFavorites();
  const isFav = favs.has(api.name);
  const [copied, setCopied] = useState(false);

  const onCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(api.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(api.name);
  };

  return (
    <a
      href={api.link}
      target="_blank"
      rel="noopener noreferrer"
      className="api-card group relative block overflow-hidden rounded-xl p-5 transition-all duration-200"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.03)), #0d1117",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3
          style={{
            color: "#e6edf3",
            fontSize: 17,
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {api.name}
        </h3>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={onCopy}
            title="Copy link"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/[0.06]"
            style={{ color: copied ? "#10b981" : "#8b949e" }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
          <button
            onClick={onFav}
            title={isFav ? "Remove favorite" : "Add favorite"}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-white/[0.06]"
            style={{ color: isFav ? "#ef4444" : "#8b949e" }}
          >
            <Heart size={13} fill={isFav ? "#ef4444" : "none"} />
          </button>
          <ArrowUpRight
            size={16}
            className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "#8b949e" }}
          />
        </div>
      </div>
      <p
        style={{
          color: "#8b949e",
          fontSize: 13.5,
          lineHeight: 1.5,
          marginBottom: 14,
        }}
      >
        {api.description}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        <AuthBadge type={api.auth} />
        <HttpsBadge https={api.https} />
      </div>
    </a>
  );
}
