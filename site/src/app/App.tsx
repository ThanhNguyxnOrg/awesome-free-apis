import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CategoryGrid } from "./components/CategoryGrid";
import { FeaturedAPIs } from "./components/FeaturedAPIs";
import { CategoryDetail } from "./components/CategoryDetail";
import { SearchModal } from "./components/SearchModal";
import { Footer } from "./components/Footer";
import { TagCloud } from "./components/TagCloud";
import { FavoritesView } from "./components/FavoritesView";
import { apis, categories, type Category } from "./components/data";

type View = "home" | "category" | "favorites";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [active, setActive] = useState<Category | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goCategory = (c: Category) => {
    setActive(c);
    setView("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setView("home");
    setActive(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goFavorites = () => {
    setView("favorites");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openRandom = () => {
    const api = apis[Math.floor(Math.random() * apis.length)];
    if (api?.link) window.open(api.link, "_blank", "noopener,noreferrer");
  };

  const selectBySlug = (slug: string) => {
    const c = categories.find((c) => c.slug === slug);
    if (c) goCategory(c);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#06080f",
        color: "#e6edf3",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .api-card { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .api-card:hover {
          transform: translateY(-2px);
          border-color: rgba(59, 130, 246, 0.35) !important;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.12) !important;
        }
        .category-tile { transition: transform 0.18s ease, background 0.2s ease, box-shadow 0.2s ease; }
        .category-tile:hover {
          transform: translateY(-3px) scale(1.02);
          background: linear-gradient(135deg, rgba(6,182,212,0.7), rgba(139,92,246,0.55)) !important;
          box-shadow: 0 12px 40px rgba(6,182,212,0.22), 0 0 0 1px rgba(6,182,212,0.25);
        }
        .category-tile:hover .tile-glow { opacity: 1; }
        .category-tile:hover .tile-inner { background: linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.05)), #0d1117 !important; }
        ::selection { background: rgba(59,130,246,0.35); color: #fff; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.12); }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 25px) scale(0.95); }
        }
      `}</style>

      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        onFavoritesClick={goFavorites}
        onRandomClick={openRandom}
        onHomeClick={goHome}
      />

      {view === "category" && active && (
        <CategoryDetail
          category={active}
          onBack={goHome}
          onSelectCategory={goCategory}
        />
      )}

      {view === "favorites" && <FavoritesView onBack={goHome} />}

      {view === "home" && (
        <>
          <Hero onSearchClick={() => setSearchOpen(true)} />
          <TagCloud onSelect={goCategory} />
          <CategoryGrid onSelect={goCategory} />
          <FeaturedAPIs />
        </>
      )}

      <Footer />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCategory={selectBySlug}
      />
    </div>
  );
}
