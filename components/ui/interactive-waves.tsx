"use client";

import { useCallback, useEffect, useRef } from "react";

type Grad = readonly [number, number, number];

class Noise {
  p = new Uint8Array(512);
  seed: number;
  grad3: Grad[] = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1],
  ];

  constructor(seed: number) {
    this.seed = seed > 0 && seed < 1 ? seed : Math.random();
    this.init(this.seed);
  }

  init(seed: number) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 0; i < 256; i++) {
      const j = Math.floor(seed * (i + 1)) % 256;
      const k = p[i];
      p[i] = p[j];
      p[j] = k;
    }
    for (let i = 0; i < 512; i++) this.p[i] = p[i & 255];
  }

  dot(g: Grad, x: number, y: number) {
    return g[0] * x + g[1] * y;
  }

  perlin2(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const u = fade(x);
    const v = fade(y);
    const { p, grad3 } = this;
    const n00 = this.dot(grad3[p[X + p[Y]] % 12], x, y);
    const n01 = this.dot(grad3[p[X + p[Y + 1]] % 12], x, y - 1);
    const n10 = this.dot(grad3[p[X + 1 + p[Y]] % 12], x - 1, y);
    const n11 = this.dot(grad3[p[X + 1 + p[Y + 1]] % 12], x - 1, y - 1);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
  }
}

const animationConfig = {
  GRID_X_GAP: 14,
  GRID_Y_GAP: 36,
  GRID_WIDTH_OFFSET: 200,
  GRID_HEIGHT_OFFSET: 30,
  WAVE_TIME_X_FACTOR: 0.0125,
  WAVE_NOISE_X_FACTOR: 0.002,
  WAVE_TIME_Y_FACTOR: 0.005,
  WAVE_NOISE_Y_FACTOR: 0.0015,
  WAVE_NOISE_MAGNITUDE: 10,
  WAVE_AMPLITUDE_X: 24,
  WAVE_AMPLITUDE_Y: 12,
  MOUSE_INFLUENCE_RADIUS: 175,
  MOUSE_FALLOFF_FACTOR: 0.001,
  MOUSE_FORCE_FACTOR: 0.00065,
  MOUSE_SMOOTHING_FACTOR: 0.1,
  MAX_MOUSE_VELOCITY: 100,
  TENSION_STRENGTH: 0.005,
  FRICTION: 0.925,
  CURSOR_DISPLACEMENT_STRENGTH: 2,
  MAX_CURSOR_DISPLACEMENT: 100,
};

type WavePoint = {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
};

type MouseState = {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
};

type AnimationState = {
  ctx: CanvasRenderingContext2D | null;
  mouse: MouseState;
  lines: WavePoint[][];
  noise: Noise;
  bounding: DOMRect | null;
  animationFrameId: number | null;
  lineColor: string;
};

function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationState = useRef<AnimationState>({
    ctx: null,
    mouse: {
      x: -10,
      y: 0,
      lx: 0,
      ly: 0,
      sx: 0,
      sy: 0,
      v: 0,
      vs: 0,
      a: 0,
      set: false,
    },
    lines: [],
    noise: new Noise(Math.random()),
    bounding: null,
    animationFrameId: null,
    lineColor: "rgb(0 0 0 / 0.11)",
  });

  const moved = useCallback((point: WavePoint, withCursorForce = true) => {
    const coords = {
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    };
    coords.x = Math.round(coords.x * 10) / 10;
    coords.y = Math.round(coords.y * 10) / 10;
    return coords;
  }, []);

  useEffect(() => {
    const state = animationState.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    state.ctx = ctx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const setSize = () => {
      state.bounding = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(state.bounding.width * dpr));
      canvas.height = Math.max(1, Math.floor(state.bounding.height * dpr));
      canvas.style.width = `${state.bounding.width}px`;
      canvas.style.height = `${state.bounding.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setLines = () => {
      if (!state.bounding) return;
      const { width, height } = state.bounding;
      state.lines = [];
      const {
        GRID_X_GAP,
        GRID_Y_GAP,
        GRID_WIDTH_OFFSET,
        GRID_HEIGHT_OFFSET,
      } = animationConfig;

      const oWidth = width + GRID_WIDTH_OFFSET;
      const oHeight = height + GRID_HEIGHT_OFFSET;
      const totalLines = Math.ceil(oWidth / GRID_X_GAP);
      const totalPoints = Math.ceil(oHeight / GRID_Y_GAP);
      const xStart = (width - GRID_X_GAP * totalLines) / 2;
      const yStart = (height - GRID_Y_GAP * totalPoints) / 2;

      for (let i = 0; i <= totalLines; i++) {
        const points: WavePoint[] = [];
        for (let j = 0; j <= totalPoints; j++) {
          points.push({
            x: xStart + GRID_X_GAP * i,
            y: yStart + GRID_Y_GAP * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        state.lines.push(points);
      }
    };

    const movePoints = (time: number) => {
      const { lines, mouse, noise } = state;
      const {
        WAVE_TIME_X_FACTOR,
        WAVE_NOISE_X_FACTOR,
        WAVE_TIME_Y_FACTOR,
        WAVE_NOISE_Y_FACTOR,
        WAVE_NOISE_MAGNITUDE,
        WAVE_AMPLITUDE_X,
        WAVE_AMPLITUDE_Y,
        MOUSE_INFLUENCE_RADIUS,
        MOUSE_FALLOFF_FACTOR,
        MOUSE_FORCE_FACTOR,
        TENSION_STRENGTH,
        FRICTION,
        CURSOR_DISPLACEMENT_STRENGTH,
        MAX_CURSOR_DISPLACEMENT,
      } = animationConfig;

      for (const points of lines) {
        for (const p of points) {
          const move =
            noise.perlin2(
              (p.x + time * WAVE_TIME_X_FACTOR) * WAVE_NOISE_X_FACTOR,
              (p.y + time * WAVE_TIME_Y_FACTOR) * WAVE_NOISE_Y_FACTOR,
            ) * WAVE_NOISE_MAGNITUDE;
          p.wave.x = Math.cos(move) * WAVE_AMPLITUDE_X;
          p.wave.y = Math.sin(move) * WAVE_AMPLITUDE_Y;

          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy);
          const influenceRadius = Math.max(MOUSE_INFLUENCE_RADIUS, mouse.vs);

          if (d < influenceRadius) {
            const falloff = 1 - d / influenceRadius;
            const force = Math.cos(d * MOUSE_FALLOFF_FACTOR) * falloff;
            const forceFactor =
              force * influenceRadius * mouse.vs * MOUSE_FORCE_FACTOR;
            p.cursor.vx += Math.cos(mouse.a) * forceFactor;
            p.cursor.vy += Math.sin(mouse.a) * forceFactor;
          }

          p.cursor.vx += (0 - p.cursor.x) * TENSION_STRENGTH;
          p.cursor.vy += (0 - p.cursor.y) * TENSION_STRENGTH;
          p.cursor.vx *= FRICTION;
          p.cursor.vy *= FRICTION;
          p.cursor.x += p.cursor.vx * CURSOR_DISPLACEMENT_STRENGTH;
          p.cursor.y += p.cursor.vy * CURSOR_DISPLACEMENT_STRENGTH;
          p.cursor.x = Math.min(
            MAX_CURSOR_DISPLACEMENT,
            Math.max(-MAX_CURSOR_DISPLACEMENT, p.cursor.x),
          );
          p.cursor.y = Math.min(
            MAX_CURSOR_DISPLACEMENT,
            Math.max(-MAX_CURSOR_DISPLACEMENT, p.cursor.y),
          );
        }
      }
    };

    const drawLines = () => {
      const { bounding, lines } = state;
      if (!bounding) return;
      ctx.clearRect(0, 0, bounding.width, bounding.height);
      ctx.beginPath();
      ctx.strokeStyle = state.lineColor;
      ctx.lineWidth = 0.6;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (const points of lines) {
        const p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        for (let i = 0; i < points.length - 1; i++) {
          const currentPoint = moved(points[i], true);
          const nextPoint = moved(points[i + 1], true);
          ctx.quadraticCurveTo(
            currentPoint.x,
            currentPoint.y,
            (currentPoint.x + nextPoint.x) / 2,
            (currentPoint.y + nextPoint.y) / 2,
          );
        }
      }
      ctx.stroke();
    };

    const tick = (time: number) => {
      const { mouse } = state;
      const { MOUSE_SMOOTHING_FACTOR, MAX_MOUSE_VELOCITY } = animationConfig;

      mouse.sx += (mouse.x - mouse.sx) * MOUSE_SMOOTHING_FACTOR;
      mouse.sy += (mouse.y - mouse.sy) * MOUSE_SMOOTHING_FACTOR;

      const dx = mouse.sx - mouse.lx;
      const dy = mouse.sy - mouse.ly;
      const d = Math.hypot(dx, dy);

      mouse.v = d;
      mouse.vs += (d - mouse.vs) * MOUSE_SMOOTHING_FACTOR;
      mouse.vs = Math.min(MAX_MOUSE_VELOCITY, mouse.vs);
      mouse.a = Math.atan2(dy, dx);
      mouse.lx = mouse.sx;
      mouse.ly = mouse.sy;

      movePoints(time);
      drawLines();
      state.animationFrameId = requestAnimationFrame(tick);
    };

    const updateMousePosition = (x: number, y: number) => {
      if (!state.bounding) return;
      const { mouse } = state;
      mouse.x = x - state.bounding.left;
      mouse.y = y - state.bounding.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    };

    const onResize = () => {
      setSize();
      setLines();
    };
    const onPointerMove = (e: PointerEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    setSize();
    setLines();
    drawLines();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);

    if (!reduceMotion) {
      state.animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      if (state.animationFrameId != null) {
        cancelAnimationFrame(state.animationFrameId);
      }
    };
  }, [moved]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}

export default Waves;
export { Waves };
