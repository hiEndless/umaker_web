"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseOffset: number;
  type: "node" | "relay" | "hub";
}

const BLUE   = "33,150,243";
const GREEN  = "34,197,94";
const WHITE  = "242,237,230";

type ParticleVariant = "hero" | "strategy";

const PARTICLE_CONFIG: Record<ParticleVariant, {
  density: number;
  minCount: number;
  speed: number;
  connectionDistance: number;
  edgeOpacity: number;
  showGreenNodes: boolean;
}> = {
  hero: {
    density: 1,
    minCount: 40,
    speed: 1,
    connectionDistance: 1,
    edgeOpacity: 1,
    showGreenNodes: true,
  },
  strategy: {
    density: 0.42,
    minCount: 22,
    speed: 0.42,
    connectionDistance: 0.78,
    edgeOpacity: 0.48,
    showGreenNodes: false,
  },
};

export function AgentParticleCanvas({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: ParticleVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = PARTICLE_CONFIG[variant];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number | undefined;
    let W = 0, H = 0;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      init();
      if (reducedMotion) draw(false);
    };

    const init = () => {
      const COUNT = Math.max(config.minCount, Math.floor((W * H * config.density) / 4500));
      particles = Array.from({ length: COUNT }, () => {
        const roll = Math.random();
        const type: Particle["type"] = roll < 0.08 ? "hub" : roll < 0.28 ? "relay" : "node";
        return {
          x:           Math.random() * W,
          y:           Math.random() * H,
          vx:          (Math.random() - 0.5) * (type === "hub" ? 0.15 : 0.4) * config.speed,
          vy:          (Math.random() - 0.5) * (type === "hub" ? 0.15 : 0.4) * config.speed,
          radius:      type === "hub" ? 6 : type === "relay" ? 4 : 2.5,
          baseAlpha:   type === "hub" ? 0.95 : type === "relay" ? 0.8 : 0.55 + Math.random() * 0.35,
          pulseOffset: Math.random() * Math.PI * 2,
          type,
        };
      });
    };

    let t = 0;
    const draw = (animate = true) => {
      ctx.clearRect(0, 0, W, H);
      if (animate) t += 0.014 * config.speed;

      /* ── EDGES ── */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const MAX  = (a.type === "hub" || b.type === "hub" ? 220 : 140) * config.connectionDistance;

          if (dist < MAX) {
            const t01    = 1 - dist / MAX;
            const isHot  = a.type !== "node" || b.type !== "node";
            const alpha  = (isHot ? t01 * 0.55 : t01 * 0.18) * config.edgeOpacity;
            const color  = isHot ? BLUE : "80,80,80";
            const width  = isHot ? 1.0  : 0.5;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth   = width;
            ctx.stroke();

            /* travelling data-dot on hot edges */
            if (animate && isHot && dist < MAX * 0.8) {
              const phase = ((t * 0.6 + i * 0.37 + j * 0.19) % 1);
              const px = a.x + (b.x - a.x) * phase;
              const py = a.y + (b.y - a.y) * phase;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${BLUE},0.9)`;
              ctx.fill();
            }
          }
        }
      }

      /* ── NODES ── */
      for (const p of particles) {
        // move + wrap
        p.x += p.vx; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        p.y += p.vy; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

        const pulse = 0.72 + 0.28 * Math.sin(t * 1.6 + p.pulseOffset);
        const r     = p.radius * pulse;
        const alpha = p.baseAlpha * pulse;

        if (p.type === "hub") {
          /* outer glow ring */
          const grd = ctx.createRadialGradient(p.x, p.y, r, p.x, p.y, r + 18);
          grd.addColorStop(0, `rgba(${BLUE},0.35)`);
          grd.addColorStop(1, `rgba(${BLUE},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 18, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          /* ring stroke */
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${BLUE},${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          /* core */
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${WHITE},${alpha})`;
          ctx.fill();

        } else if (p.type === "relay") {
          /* outer ring */
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${BLUE},${alpha * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          /* core */
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE},${alpha})`;
          ctx.fill();

        } else {
          /* plain node — mostly blue, some green */
        const isGreen = config.showGreenNodes && Math.sin(p.pulseOffset * 3.7) > 0.65;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = isGreen
            ? `rgba(${GREEN},${alpha})`
            : `rgba(${BLUE},${alpha})`;
          ctx.fill();
        }
      }

      if (animate) animId = requestAnimationFrame(() => draw(true));
    };

    resize();
    if (!reducedMotion) draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      if (animId !== undefined) cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
