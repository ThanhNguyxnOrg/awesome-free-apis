import { useEffect, useRef, useState } from "react";
import { Search, Sparkles, Zap } from "lucide-react";
import { stats } from "./data";

const statItems = [
  { value: stats.total, suffix: "+", label: "Free APIs", grad: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
  { value: stats.categories, suffix: "", label: "Categories", grad: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { value: stats.noAuth, suffix: "", label: "No Auth Required", grad: "linear-gradient(135deg, #10b981, #06b6d4)" },
  { value: stats.httpsPercent, suffix: "%", label: "HTTPS Enabled", grad: "linear-gradient(135deg, #f59e0b, #ef4444)" },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function StatCard({
  item,
  active,
  index,
}: {
  item: (typeof statItems)[number];
  active: boolean;
  index: number;
}) {
  const v = useCountUp(item.value, active);
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        animation: `fadeInUp 0.6s ${index * 0.1}s both`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: item.grad,
          mixBlendMode: "overlay",
          filter: "blur(40px)",
        }}
      />
      <div
        className="relative"
        style={{
          fontSize: 44,
          lineHeight: 1.05,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          background: item.grad,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {v.toLocaleString()}
        {item.suffix}
      </div>
      <div
        className="relative"
        style={{
          color: "#8b949e",
          fontSize: 11.5,
          marginTop: 6,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

export function Hero({ onSearchClick }: { onSearchClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #06080f 0%, #0a0e1f 50%, #06080f 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-[460px] w-[460px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.45), transparent 65%)",
          filter: "blur(80px)",
          animation: "orbFloat 14s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-1/4 h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)",
          filter: "blur(90px)",
          animation: "orbFloat 18s ease-in-out infinite reverse",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[640px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.25), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Mesh gradient sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.0) 0deg, rgba(139,92,246,0.08) 90deg, rgba(6,182,212,0.06) 180deg, rgba(59,130,246,0.08) 270deg, rgba(59,130,246,0.0) 360deg)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 text-center">
        {/* Badge */}
        <div
          className="mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#93c5fd",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            backdropFilter: "blur(8px)",
            animation: "fadeInUp 0.5s 0s both",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Auto-synced from README.md · GitHub Actions
        </div>

        {/* Floating accent icons */}
        <div className="relative mx-auto" style={{ maxWidth: 900 }}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-4 top-4 hidden md:block"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 12px 40px rgba(59,130,246,0.5)",
                transform: "rotate(-12deg)",
              }}
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <defs><linearGradient id="heroLogo" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs>
                <rect width="64" height="64" rx="14" fill="#0d1117"/>
                <path d="M24 18L10 32L24 46" stroke="url(#heroLogo)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 18L54 32L40 46" stroke="url(#heroLogo)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="32" r="4" fill="url(#heroLogo)"/>
              </svg>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 top-12 hidden md:block"
            style={{ animation: "float 7s ease-in-out infinite 1s" }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                boxShadow: "0 12px 40px rgba(139,92,246,0.5)",
                transform: "rotate(10deg)",
              }}
            >
              <Sparkles size={22} color="#fff" />
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 84px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              animation: "fadeInUp 0.7s 0.1s both",
            }}
            className="mb-6"
          >
            <span
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Awesome
            </span>{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Free APIs
            </span>
          </h1>
        </div>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 19,
            lineHeight: 1.55,
            maxWidth: 640,
            animation: "fadeInUp 0.7s 0.2s both",
          }}
          className="mx-auto mb-12"
        >
          A curated collection of{" "}
          <span style={{ color: "#e6edf3", fontWeight: 500 }}>{stats.total}+ free public APIs</span>{" "}
          for developers. Search, browse by category, and start building in seconds.
        </p>

        {/* Big Search Bar with permanent glow */}
        <div
          className="mx-auto mb-16"
          style={{ maxWidth: 680, animation: "fadeInUp 0.7s 0.3s both" }}
        >
          <div
            className="relative rounded-2xl p-[1.5px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.6), rgba(139,92,246,0.5), rgba(6,182,212,0.5))",
              boxShadow: "0 0 60px rgba(59,130,246,0.18)",
            }}
          >
            <button
              onClick={onSearchClick}
              className="group flex w-full items-center gap-4 rounded-2xl px-6"
              style={{
                background: "rgba(13, 17, 23, 0.85)",
                backdropFilter: "blur(16px)",
                height: 68,
                color: "#94a3b8",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#93c5fd",
                }}
              >
                <Search size={17} />
              </div>
              <span style={{ fontSize: 16, flex: 1, textAlign: "left" }}>
                Search {stats.total}+ free APIs...
              </span>
              <div
                className="flex items-center gap-1"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11.5,
                }}
              >
                <kbd
                  className="rounded-md px-2 py-1"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#cbd5e1",
                  }}
                >
                  ⌘
                </kbd>
                <kbd
                  className="rounded-md px-2 py-1"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#cbd5e1",
                  }}
                >
                  K
                </kbd>
              </div>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
          style={{ animation: "fadeInUp 0.8s 0.4s both" }}
        >
          {statItems.map((s, i) => (
            <StatCard key={s.label} item={s} active={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
