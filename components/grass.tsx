"use client";

import { useEffect, useRef } from "react";

type Blade = {
  x: number;
  h: number;
  w: number;
  lean: number;
  shade: number;
  phase: number;
};

export function Grass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -1, y: -1 };
    let blades: Blade[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const layers = [
        { count: Math.max(90, Math.floor(width / 4.2)), h0: 0.38, h1: 0.62, w: 0.7, shade: 0.22 },
        { count: Math.max(110, Math.floor(width / 3.4)), h0: 0.48, h1: 0.78, w: 0.9, shade: 0.38 },
        { count: Math.max(130, Math.floor(width / 2.8)), h0: 0.55, h1: 0.96, w: 1.15, shade: 0.58 },
      ];

      blades = layers.flatMap((layer) =>
        Array.from({ length: layer.count }, (_, i) => ({
          x: ((i + Math.random()) / layer.count) * width,
          h: height * (layer.h0 + Math.random() * (layer.h1 - layer.h0)),
          w: layer.w * (0.55 + Math.random() * 0.7),
          lean: (Math.random() - 0.5) * 0.55,
          shade: layer.shade + (Math.random() - 0.5) * 0.1,
          phase: Math.random() * Math.PI * 2,
        })),
      );
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1;
      mouse.y = -1;
    };

    const draw = () => {
      const { width, height } = wrap.getBoundingClientRect();
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (const b of blades) {
        const wind = Math.sin(t * 0.9 + b.phase) * 3.5;
        let push = 0;
        if (mouse.x >= 0) {
          const dx = b.x - mouse.x;
          const dy = height - mouse.y;
          const dist = Math.hypot(dx, Math.max(0, dy));
          const influence = Math.max(0, 1 - dist / 70);
          push = Math.sign(dx || 1) * influence * 18;
        }

        const tipX = b.x + wind + push + b.lean * b.h * 0.22;
        const tipY = height - b.h;
        const midX = b.x + (wind + push) * 0.4 + b.lean * b.h * 0.08;
        const midY = height - b.h * 0.48;
        const light = 18 + b.shade * 42;

        ctx.beginPath();
        ctx.moveTo(b.x - b.w, height + 1);
        ctx.quadraticCurveTo(midX - b.w * 0.25, midY, tipX, tipY);
        ctx.quadraticCurveTo(midX + b.w * 0.25, midY, b.x + b.w, height + 1);
        ctx.closePath();
        ctx.fillStyle = `hsla(30, 6%, ${light}%, ${0.42 + b.shade * 0.45})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative z-10 mt-auto w-full overflow-hidden">
      <span className="pointer-events-none absolute inset-x-0 top-[42%] z-10 flex -translate-y-1/2 justify-center">
        <span className="inline-flex h-6 items-center rounded-xl border border-border bg-bg/90 px-3 text-xs leading-4 text-text">
          touch grass
        </span>
      </span>
      <canvas
        ref={canvasRef}
        className="block h-[140px] w-full sm:h-[180px]"
        aria-hidden="true"
      />
    </div>
  );
}
