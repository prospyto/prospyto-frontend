"use client";

import { useEffect, useRef } from "react";

// Curseur personnalisé en forme de nuage qui suit la souris.
// Code original : pas de bibliothèque externe, juste un SVG animé
// positionné en absolu et rattrapé en douceur (lerp) sur chaque frame.
export default function CloudCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Pas de curseur personnalisé sur mobile/tactile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handleMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    let frame: number;
    function animate() {
      position.current.x += (target.current.x - position.current.x) * 0.18;
      position.current.y += (target.current.y - position.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x - 24}px, ${position.current.y - 16}px)`;
      }
      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
        <path
          d="M12 24C6.5 24 2 20 2 15.5C2 11.4 5.1 8 9.1 7.6C10.4 3.6 14.3 1 18.6 1C23.2 1 27 4 28.4 8.1C28.9 8 29.5 8 30 8C35 8 39 12 39 17C39 17.5 39 18 38.9 18.5C43 19.1 46 22.4 46 26.4C46 27 45.5 27.5 44.9 27.5H12Z"
          fill="var(--secondary-color, #e0aaff)"
          fillOpacity="0.55"
        />
      </svg>
    </div>
  );
}
