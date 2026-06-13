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
          border-color: rgba(6, 182, 212, 0.3) !important;
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.08) !important;
        }
        ::selection { background: rgba(6, 182, 212, 0.25); color: #fff; }
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
