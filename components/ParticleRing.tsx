"use client";

import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  radiusOffset: number;
  size: number;
  baseAlpha: number;
  speed: number;
  twinklePhase: number;
};

export default function ParticleRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const PARTICLE_COUNT = 180;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radiusOffset: Math.random(), // 0 = anneau intérieur, 1 = anneau extérieur
      size: Math.random() * 2.4 + 1.4,
      baseAlpha: Math.random() * 0.5 + 0.45,
      speed: (Math.random() * 0.9 + 0.35) * (Math.random() < 0.5 ? 1 : -1),
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    let frame: number;
    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const outerRadius = Math.min(width, height) * 0.62;
      const innerRadius = outerRadius * 0.5;

      // Anneaux-guides visibles en pointillé, pour ancrer visuellement la forme
      ctx.save();
      ctx.strokeStyle = "rgba(224, 170, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      [innerRadius, (innerRadius + outerRadius) / 2, outerRadius].forEach((r) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      const positions: { x: number; y: number }[] = [];

      for (const p of particles) {
        if (!reduceMotion) {
          p.angle += p.speed * 0.004;
        }
        const radius = innerRadius + p.radiusOffset * (outerRadius - innerRadius);
        const x = cx + Math.cos(p.angle) * radius;
        const y = cy + Math.sin(p.angle) * radius * 0.65; // légèrement aplati, effet ellipse
        positions.push({ x, y });

        const twinkle = reduceMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(t * 0.03 + p.twinklePhase);

        // Réaction au curseur : les particules proches grossissent et brillent
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximityBoost = dist < 150 ? (150 - dist) / 150 : 0;

        const alpha = Math.min(1, p.baseAlpha * twinkle + proximityBoost * 0.5);
        const size = p.size + proximityBoost * 2.5;

        const color = p.radiusOffset > 0.5 ? "224, 170, 255" : "192, 132, 252";
        ctx.beginPath();
        ctx.shadowColor = `rgba(${color}, 0.9)`;
        ctx.shadowBlur = 8 + proximityBoost * 10;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Lignes de constellation entre particules proches
      ctx.strokeStyle = "rgba(224, 170, 255, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 55) {
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.stroke();
          }
        }
      }

      t += 1;
      frame = requestAnimationFrame(draw);
    }

    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden
    />
  );
}
