"use client";

import { useEffect, useRef } from "react";
import { Hand } from "lucide-react";

// Curseur personnalisé en forme de main qui suit la souris,
// rattrapée en douceur (lerp) sur chaque frame.
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
        cursorRef.current.style.transform = `translate(${position.current.x - 16}px, ${position.current.y - 16}px)`;
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
      <Hand size={32} color="var(--secondary-color, #e0aaff)" strokeWidth={1.75} />
    </div>
  );
}
