import { useEffect, useState } from "react";

function Sparkle({
  x,
  y,
  size,
  delay,
  color,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
  color: string;
}) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute animate-twinkle"
      style={{ left: x, top: y, width: size, height: size, animationDelay: `${delay}s` }}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 0c.8 6.6 4.6 10.4 12 12-7.4 1.6-11.2 5.4-12 12-.8-6.6-4.6-10.4-12-12C7.4 10.4 11.2 6.6 12 0z" />
    </svg>
  );
}

function Bubble({
  x,
  y,
  size,
  delay,
  duration,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-full animate-float-slow"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background:
          "radial-gradient(circle at 30% 28%, rgba(255,255,255,.95) 0 8%, rgba(255,214,246,.45) 26%, rgba(166,232,255,.28) 52%, rgba(197,107,255,.22) 78%, rgba(255,255,255,.1) 100%)",
        boxShadow: "inset 0 0 18px rgba(255,255,255,.7), 0 0 24px rgba(255,255,255,.35)",
        border: "1px solid rgba(255,255,255,.5)",
      }}
    />
  );
}

/** Fundo global: gradiente, grid, bolhas, sparkles, pompom e reflexos. */
export function Backdrop() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden y2k-bg">
      <div className="absolute inset-0 y2k-grid" style={{ transform: `translateY(${scroll * -0.06}px)` }} />
      <div
        className="absolute -left-24 -top-24 h-[46vh] w-[46vh] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF7BD5 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-32 top-1/3 h-[52vh] w-[52vh] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #A6E8FF 0%, transparent 70%)" }}
      />
      <div style={{ transform: `translateY(${scroll * -0.12}px)` }}>
        <Bubble x="4%" y="62%" size={110} delay={0} duration={16} />
        <Bubble x="82%" y="18%" size={74} delay={2.5} duration={13} />
        <Bubble x="68%" y="74%" size={140} delay={1.2} duration={19} />
        <Bubble x="24%" y="12%" size={54} delay={3.4} duration={11} />
        <Bubble x="46%" y="88%" size={62} delay={0.8} duration={15} />
      </div>
      <div style={{ transform: `translateY(${scroll * 0.08}px)` }}>
        <Sparkle x="10%" y="22%" size={34} delay={0} color="#FFD84D" />
        <Sparkle x="88%" y="52%" size={26} delay={0.9} color="#FFD84D" />
        <Sparkle x="30%" y="70%" size={20} delay={1.7} color="#FFF6FB" />
        <Sparkle x="60%" y="8%" size={22} delay={2.3} color="#A6E8FF" />
        <Sparkle x="74%" y="88%" size={30} delay={1.1} color="#FF7BD5" />
      </div>
      <span
        aria-hidden
        className="absolute left-[-3rem] top-[38%] h-40 w-40 rounded-full pompom animate-float-mid opacity-80"
      />
      <span
        aria-hidden
        className="absolute right-[-2.5rem] bottom-[12%] h-28 w-28 rounded-full pompom animate-float-mid opacity-70"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

/** Correntinha com pingente de coração. */
export function CharmChain({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 120"
      className={`animate-float-mid ${className}`}
      style={{ filter: "drop-shadow(0 4px 8px rgba(58,29,122,.5))" }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx="30"
          cy={10 + i * 12}
          rx="7"
          ry="9"
          fill="none"
          stroke="#E9E4FF"
          strokeWidth="3.5"
        />
      ))}
      <path
        d="M30 84c-9-8-18-13-18-22 0-6 5-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 5 0 10 4 10 10 0 9-9 14-18 22z"
        fill="#8B7CFF"
        stroke="#3A1D7A"
        strokeWidth="3"
      />
      <circle cx="24" cy="66" r="3" fill="#FFF6FB" opacity=".8" />
    </svg>
  );
}

/** Palavra em contas de pulseira da amizade. */
export function BeadWord({ text, className = "" }: { text: string; className?: string }) {
  const colors = ["#FF3EA5", "#C56BFF", "#8B7CFF", "#FF7BD5", "#A6E8FF", "#FFD84D"];
  return (
    <span className={`inline-flex flex-wrap items-center gap-1 ${className}`}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-1" />
        ) : (
          <span
            key={i}
            className="inline-flex h-7 w-7 items-center justify-center rounded-[9px] text-[13px] font-extrabold animate-bead-in"
            style={{
              background: colors[i % colors.length],
              color: "#FFF6FB",
              border: "2px solid #3A1D7A",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,.6), 0 3px 0 rgba(58,29,122,.7)",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {ch.toUpperCase()}
          </span>
        ),
      )}
    </span>
  );
}
