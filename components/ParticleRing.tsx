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

    const PARTICLE_COUNT = 140;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radiusOffset: Math.random(), // 0 = anneau intérieur, 1 = anneau extérieur
      size: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.5 + 0.15,
      speed: (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? 1 : -1),
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
      const outerRadius = Math.min(width, height) * 0.55;
      const innerRadius = outerRadius * 0.55;

      for (const p of particles) {
        if (!reduceMotion) {
          p.angle += p.speed * 0.002;
        }
        const radius = innerRadius + p.radiusOffset * (outerRadius - innerRadius);
        const x = cx + Math.cos(p.angle) * radius;
        const y = cy + Math.sin(p.angle) * radius * 0.65; // légèrement aplati, effet ellipse

        const twinkle = reduceMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(t * 0.02 + p.twinklePhase);

        // Réaction subtile au curseur : les particules proches brillent plus
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximityBoost = dist < 120 ? (120 - dist) / 120 : 0;

        const alpha = Math.min(1, p.baseAlpha * twinkle + proximityBoost * 0.5);
        const size = p.size + proximityBoost * 1.5;

        const color = p.radiusOffset > 0.5 ? "224, 170, 255" : "154, 92, 200";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
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
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}
