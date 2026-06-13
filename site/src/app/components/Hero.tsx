import { useEffect, useRef, useState } from "react";
import { Search, Play } from "lucide-react";
import { stats } from "./data";

const statItems = [
  { value: stats.total, suffix: "+", label: "Free APIs" },
  { value: stats.categories, suffix: "", label: "Categories" },
  { value: stats.noAuth, suffix: "", label: "No Auth Required" },
  { value: stats.httpsPercent, suffix: "%", label: "HTTPS Enabled" },
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
      className="relative overflow-hidden rounded-xl p-5"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.05)",
        animation: `fadeInUp 0.6s ${index * 0.1}s both`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, #06b6d4, transparent)",
        }}
      />
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: "#ffffff",
        }}
      >
        {v.toLocaleString()}
        {item.suffix}
      </div>
      <div
        style={{
          color: "#8b949e",
          fontSize: 11,
          marginTop: 6,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

function ApiPlayground() {
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const [loading, setLoading] = useState(false);

  const triggerRun = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTab("response");
    }, 600);
  };

  const catFactResponse = `{
  "status": 200,
  "data": {
    "fact": "Cats can jump up to six times their height.",
    "length": 43,
    "breed_reference": "https://api.freeapis.org/v1/breeds/9"
  },
  "rate_limit": {
    "remaining": 99,
    "reset_seconds": 36
  }
}`;

  return (
    <div
      className="relative w-full rounded-xl border text-left font-mono overflow-hidden"
      style={{
        background: "#080b11",
        borderColor: "rgba(255,255,255,0.06)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[11px] text-gray-500 ml-2">awesome_api.js</span>
        </div>
        <div className="flex gap-1 bg-white/[0.04] p-0.5 rounded-md">
          <button
            onClick={() => setActiveTab("request")}
            className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
              activeTab === "request"
                ? "bg-white/[0.08] text-white font-medium"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Request
          </button>
          <button
            onClick={() => setActiveTab("response")}
            className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
              activeTab === "response"
                ? "bg-white/[0.08] text-white font-medium"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Response
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="p-5 text-[13px] leading-relaxed overflow-x-auto min-h-[170px] flex flex-col justify-between">
        {activeTab === "request" ? (
          <div>
            <span className="text-pink-500">const</span> url = <span className="text-cyan-400">"https://api.freeapis.org/v1/cats"</span>;<br />
            <span className="text-pink-500">const</span> res = <span className="text-pink-500">await</span> <span className="text-blue-400">fetch</span>(url);<br />
            <span className="text-pink-500">const</span> data = <span className="text-pink-500">await</span> res.<span className="text-blue-400">json</span>();<br />
            <span className="text-blue-400">console</span>.<span className="text-blue-400">log</span>(data);
          </div>
        ) : (
          <pre className="text-gray-300 text-[11px] leading-normal whitespace-pre font-mono">
            {catFactResponse}
          </pre>
        )}

        <div className="mt-5 flex items-center justify-between border-t pt-4 border-white/[0.04]">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            GET · No Auth · HTTPS
          </div>
          <button
            onClick={triggerRun}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 active:scale-[0.97] transition-all disabled:opacity-60"
          >
            <Play size={10} fill="black" />
            {loading ? "Calling..." : "Run Test"}
          </button>
        </div>
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
        background: "#06080f",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at top, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 40%, transparent 80%)",
        }}
      />

      {/* Spot glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Search */}
          <div className="lg:col-span-7 text-left">
            {/* Active Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded px-2.5 py-1 text-[11px]"
              style={{
                background: "rgba(6,182,212,0.06)",
                border: "1px solid rgba(6,182,212,0.18)",
                color: "#22d3ee",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              Auto-synced from README.md
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 68px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                fontWeight: 700,
              }}
              className="mb-6 text-white"
            >
              Curated Index of <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Free Public APIs
              </span>
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: 585,
              }}
              className="mb-8 font-sans"
            >
              A clean, structured catalog of <span className="text-white font-medium">{stats.total}+ free APIs</span>. Completely free, HTTPS-enabled, and auto-synchronized for instant development integration.
            </p>

            {/* Interactive Search Bar Trigger */}
            <div className="max-w-[480px]">
              <button
                onClick={onSearchClick}
                className="group flex w-full items-center gap-3.5 rounded-xl px-4 transition-all duration-200"
                style={{
                  background: "rgba(13, 17, 23, 0.65)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  height: 54,
                  color: "#8b949e",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(6,182,212,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                }}
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    color: "#22d3ee",
                  }}
                >
                  <Search size={14} />
                </div>
                <span className="text-[13.5px] flex-1 text-left">
                  Search {stats.total}+ free APIs...
                </span>
                <div
                  className="flex items-center gap-1 text-[10.5px]"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <kbd className="rounded bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 text-gray-400">⌘</kbd>
                  <kbd className="rounded bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 text-gray-400">K</kbd>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Code Playground */}
          <div className="lg:col-span-5">
            <ApiPlayground />
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 border-t pt-10"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {statItems.map((s, i) => (
            <StatCard key={s.label} item={s} active={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
