import { Github, Heart, Search, Shuffle, Sparkles, Plus } from "lucide-react";
import { stats } from "./data";
import { useFavorites } from "./favorites";

export function Navbar({
  onSearchClick,
  onFavoritesClick,
  onRandomClick,
  onHomeClick,
}: {
  onSearchClick: () => void;
  onFavoritesClick: () => void;
  onRandomClick: () => void;
  onHomeClick: () => void;
}) {
  const favs = useFavorites();
  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        background: "rgba(6, 8, 15, 0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2"
        >
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ boxShadow: "0 4px 16px rgba(6,182,212,0.25)", borderRadius: 8 }}>
            <defs>
              <linearGradient id="navLogo" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#06b6d4"/>
                <stop offset="50%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#a855f7"/>
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="#0d1117"/>
            <polygon points="32,10 51,21 51,43 32,54 13,43 13,21" stroke="url(#navLogo)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
            <path d="M32,10 V32 L13,43 M32,32 L51,43" stroke="url(#navLogo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="32" cy="10" r="4" fill="#0d1117" stroke="url(#navLogo)" strokeWidth="2"/>
            <circle cx="13" cy="43" r="4" fill="#0d1117" stroke="url(#navLogo)" strokeWidth="2"/>
            <circle cx="51" cy="43" r="4" fill="#0d1117" stroke="url(#navLogo)" strokeWidth="2"/>
            <circle cx="32" cy="32" r="5" fill="url(#navLogo)"/>
          </svg>
          <span
            style={{
              color: "#e6edf3",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontSize: 15,
            }}
          >
            Awesome APIs
          </span>
        </button>

        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-3 rounded-xl px-4 py-2 transition-all hover:border-white/15"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minWidth: 320,
            color: "#8b949e",
            fontSize: 13.5,
          }}
        >
          <Search size={15} />
          <span className="flex-1 text-left">Search {stats.total}+ APIs...</span>
          <kbd
            className="rounded px-1.5 py-0.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10.5,
              color: "#8b949e",
            }}
          >
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRandomClick}
            title="Random API"
            className="flex h-9 items-center gap-1.5 rounded-lg px-3 transition-colors hover:bg-white/5"
            style={{
              color: "#cbd5e1",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 13,
            }}
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Random</span>
          </button>
          <button
            onClick={onFavoritesClick}
            title="Favorites"
            className="relative flex h-9 items-center gap-1.5 rounded-lg px-3 transition-colors hover:bg-white/5"
            style={{
              color: "#cbd5e1",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 13,
            }}
          >
            <Heart size={14} fill={favs.size > 0 ? "#ef4444" : "none"} color={favs.size > 0 ? "#ef4444" : undefined} />
            <span className="hidden sm:inline">Favorites</span>
            {favs.size > 0 && (
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "#fca5a5",
                  background: "rgba(239,68,68,0.15)",
                  padding: "1px 6px",
                  borderRadius: 999,
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                {favs.size}
              </span>
            )}
          </button>
          <a
            href="https://github.com/ThanhNguyxnOrg/awesome-free-apis/issues/new?template=add_api.yml"
            target="_blank"
            rel="noopener noreferrer"
            title="Submit a New API"
            className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-200"
            style={{
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Submit API</span>
          </a>
          <a
            href="https://github.com/ThanhNguyxnOrg/awesome-free-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#e6edf3", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
