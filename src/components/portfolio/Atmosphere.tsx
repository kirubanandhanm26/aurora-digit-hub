import { useEffect, useRef, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    let p = 0;
    const tick = () => {
      p += Math.random() * 4 + 1.5;
      if (p >= 100) {
        p = 100;
        setPct(100);
        setTimeout(() => {
          setHidden(true);
          setTimeout(onDone, 700);
        }, 350);
        return;
      }
      setPct(p);
      raf = requestAnimationFrame(() => setTimeout(tick, 30));
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center aurora-bg noise transition-opacity duration-700 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? "#00F5FF" : i % 3 === 1 ? "#FF4ECD" : "#7B2FF7",
              opacity: 0.6,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl blur-2xl bg-[var(--gradient-primary)] opacity-60 animate-pulse-glow" />
          <div className="relative w-24 h-24 rounded-2xl glass-strong flex items-center justify-center font-display text-4xl font-bold">
            <span className="text-gradient-primary">K</span>
          </div>
        </div>

        <div className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">
          Loading Experience
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--gradient-primary)] transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px #00F5FF" }}
          />
        </div>
        <div className="font-mono text-5xl font-bold text-gradient-primary tabular-nums">
          {String(Math.floor(pct)).padStart(3, "0")}
          <span className="text-white/40 text-2xl">%</span>
        </div>
      </div>
    </div>
  );
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      }
      requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        ringRef.current?.classList.add("is-hover");
      } else {
        ringRef.current?.classList.remove("is-hover");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden aurora-bg noise pointer-events-none">
      {/* Blobs */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, #00F5FF 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, #7B2FF7 0%, transparent 70%)", animationDelay: "5s" }} />
      <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, #FF4ECD 0%, transparent 70%)", animationDelay: "10s" }} />

      {/* Light rays */}
      <div className="absolute top-0 left-1/4 w-1 h-[120vh] bg-gradient-to-b from-cyan-400/40 via-transparent to-transparent blur-md animate-ray" />
      <div className="absolute top-0 right-1/4 w-1 h-[120vh] bg-gradient-to-b from-fuchsia-400/40 via-transparent to-transparent blur-md animate-ray" style={{ animationDelay: "3s" }} />

      {/* Stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            opacity: Math.random() * 0.6 + 0.2,
            animation: `pulse-glow ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
