"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import type { IconKey } from "@/lib/content/types";

const LIME = "220, 253, 53";
const WHITE = "245, 247, 250";

interface Bubble {
  x: number;
  y: number;
  r: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  life: number;
}

interface CircuitSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface CircuitPulse {
  segment: CircuitSegment;
  t: number;
  speed: number;
}

interface Ring {
  x: number;
  y: number;
  r: number;
  maxR: number;
}

interface Emitter {
  x: number;
  y: number;
  interval: number;
  timer: number;
  rings: Ring[];
}

interface Orbiter {
  radiusX: number;
  radiusY: number;
  angle: number;
  speed: number;
  size: number;
}

/**
 * Ambient, per-service background animation used behind a service detail
 * page's content section. Reuses the same motif as that service's icon
 * (rising bubbles, radar sweep, circuit pulses, signal rings, orbiting
 * dots) at section scale, in the site's lime/dark visual language.
 */
export function ServiceSectionBackground({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let t = 0;

    let bubbles: Bubble[] = [];
    let circuitSegments: CircuitSegment[] = [];
    let circuitPulses: CircuitPulse[] = [];
    let emitters: Emitter[] = [];
    let orbiters: Orbiter[] = [];

    function resize() {
      if (!canvas || !container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (icon === "leaf") {
        bubbles = Array.from({ length: 26 }, () => spawnBubble(true));
      }

      if (icon === "cpu") {
        circuitSegments = buildCircuit(width, height);
        circuitPulses = Array.from({ length: Math.min(10, circuitSegments.length) }, () => ({
          segment: circuitSegments[Math.floor(Math.random() * circuitSegments.length)],
          t: Math.random(),
          speed: 0.004 + Math.random() * 0.006,
        }));
      }

      if (icon === "radio-tower") {
        emitters = [0.12, 0.38, 0.62, 0.88].map((fx) => ({
          x: width * fx,
          y: height * (0.15 + Math.random() * 0.7),
          interval: 90 + Math.random() * 40,
          timer: Math.random() * 60,
          rings: [],
        }));
      }

      if (icon === "globe") {
        orbiters = Array.from({ length: 46 }, () => ({
          radiusX: 30 + Math.random() * (width * 0.42),
          radiusY: 20 + Math.random() * (height * 0.42),
          angle: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.006,
          size: 1 + Math.random() * 1.6,
        }));
      }
    }

    function spawnBubble(randomY = false): Bubble {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        r: 1.5 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.6,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
        life: 1,
      };
    }

    function buildCircuit(w: number, h: number): CircuitSegment[] {
      const cols = Math.max(4, Math.round(w / 130));
      const rows = Math.max(3, Math.round(h / 130));
      const segments: CircuitSegment[] = [];
      const stepX = w / cols;
      const stepY = h / rows;
      for (let cx = 0; cx <= cols; cx++) {
        for (let cy = 0; cy <= rows; cy++) {
          const x = cx * stepX;
          const y = cy * stepY;
          if (cx < cols && Math.random() < 0.45) {
            segments.push({ x1: x, y1: y, x2: x + stepX, y2: y });
          }
          if (cy < rows && Math.random() < 0.45) {
            segments.push({ x1: x, y1: y, x2: x, y2: y + stepY });
          }
        }
      }
      return segments;
    }

    function drawLeaf() {
      if (!ctx) return;
      for (const b of bubbles) {
        const x = b.x + Math.sin(b.wobble) * 8;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${LIME}, ${0.35 * b.life})`;
        ctx.lineWidth = 1;
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function stepLeaf() {
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        b.life = Math.min(1, (height - b.y) / 80);
        if (b.y < -10) {
          Object.assign(b, spawnBubble());
        }
      }
    }

    function drawRadar() {
      if (!ctx) return;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.hypot(width, height) * 0.55;

      for (let r = maxR / 3; r <= maxR; r += maxR / 3) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${WHITE}, 0.08)`;
        ctx.lineWidth = 1;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const angle = t * 0.02;
      const grad = ctx.createConicGradient
        ? ctx.createConicGradient(angle, cx, cy)
        : null;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, angle, angle + 0.5);
      ctx.closePath();
      if (grad) {
        grad.addColorStop(0, `rgba(${LIME}, 0.22)`);
        grad.addColorStop(1, `rgba(${LIME}, 0)`);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = `rgba(${LIME}, 0.12)`;
      }
      ctx.fill();
      ctx.restore();
    }

    function drawCircuit() {
      if (!ctx) return;
      ctx.lineWidth = 1;
      for (const s of circuitSegments) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${WHITE}, 0.07)`;
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      }
      for (const p of circuitPulses) {
        const x = p.segment.x1 + (p.segment.x2 - p.segment.x1) * p.t;
        const y = p.segment.y1 + (p.segment.y2 - p.segment.y1) * p.t;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${LIME}, 0.85)`;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function stepCircuit() {
      for (const p of circuitPulses) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.segment = circuitSegments[Math.floor(Math.random() * circuitSegments.length)];
        }
      }
    }

    function drawTower() {
      if (!ctx) return;
      for (const e of emitters) {
        for (const ring of e.rings) {
          const opacity = 0.3 * (1 - ring.r / ring.maxR);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${LIME}, ${Math.max(0, opacity)})`;
          ctx.lineWidth = 1;
          ctx.arc(e.x, e.y, ring.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${WHITE}, 0.6)`;
        ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function stepTower() {
      for (const e of emitters) {
        e.timer++;
        if (e.timer > e.interval) {
          e.timer = 0;
          e.rings.push({ x: e.x, y: e.y, r: 0, maxR: 140 + Math.random() * 60 });
        }
        for (const ring of e.rings) ring.r += 0.8;
        e.rings = e.rings.filter((r) => r.r < r.maxR);
      }
    }

    function drawGlobe() {
      if (!ctx) return;
      const cx = width * 0.5;
      const cy = height * 0.5;
      for (const o of orbiters) {
        const x = cx + Math.cos(o.angle) * o.radiusX;
        const y = cy + Math.sin(o.angle) * o.radiusY;
        const depth = (Math.sin(o.angle) + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${LIME}, ${0.15 + depth * 0.35})`;
        ctx.arc(x, y, o.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function stepGlobe() {
      for (const o of orbiters) o.angle += o.speed;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      switch (icon) {
        case "leaf":
          drawLeaf();
          break;
        case "shield":
          drawRadar();
          break;
        case "cpu":
          drawCircuit();
          break;
        case "radio-tower":
          drawTower();
          break;
        case "globe":
          drawGlobe();
          break;
      }
    }

    function step() {
      t++;
      switch (icon) {
        case "leaf":
          stepLeaf();
          break;
        case "cpu":
          stepCircuit();
          break;
        case "radio-tower":
          stepTower();
          break;
        case "globe":
          stepGlobe();
          break;
      }
      draw();
      animationFrame = requestAnimationFrame(step);
    }

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [icon]);

  if (theme === "light") return null;

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
