"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fait apparaître son contenu (fondu + léger décalage) quand il entre dans
// le viewport. Code original basé sur IntersectionObserver natif du
// navigateur — pas de bibliothèque externe.
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""}`}>
      {children}
    </div>
  );
}
