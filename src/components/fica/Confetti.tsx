import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  shape: number;
};

const COLORS = ["#FF3EA5", "#C56BFF", "#8B7CFF", "#FF7BD5", "#A6E8FF", "#FFD84D", "#FFF6FB"];

export function Confetti({ fire }: { fire: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!fire) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const count = W() < 640 ? 90 : 170;
    const parts: P[] = Array.from({ length: count }, () => ({
      x: W() / 2 + (Math.random() - 0.5) * W() * 0.5,
      y: H() * 0.42 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 13,
      vy: -Math.random() * 15 - 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.32,
      size: 6 + Math.random() * 9,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.floor(Math.random() * 3),
    }));

    let raf = 0;
    let frames = 0;
    const tick = () => {
      frames++;
      ctx.clearRect(0, 0, W(), H());
      for (const p of parts) {
        p.vy += 0.36;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 0) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const fn = i === 0 ? "moveTo" : "lineTo";
            ctx[fn]((Math.cos(a) * p.size) / 1.6, (Math.sin(a) * p.size) / 1.6);
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      if (frames < 320) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W(), H());
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fire]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
