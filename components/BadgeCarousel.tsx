"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Badge = {
  name: string;
  Icon: LucideIcon;
};

export default function BadgeCarousel({
  badges,
  turnMs = 2200,
}: {
  badges: Badge[];
  turnMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || badges.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % badges.length);
    }, turnMs);
    return () => clearInterval(id);
  }, [badges.length, turnMs]);

  const current = badges[index];
  const Icon = current.Icon;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Anneau qui tourne en boucle (désactivé via CSS si prefers-reduced-motion) */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed badge-carousel-ring"
          style={{
            borderColor: "var(--secondary-color)",
            animationDuration: `${turnMs}ms`,
          }}
          aria-hidden
        />
        {/* Fond fixe (ne tourne pas), contenu du badge affiché à chaque tour */}
        <div
          key={current.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center badge-carousel-pop"
          style={{ background: "rgba(224, 170, 255, 0.12)" }}
        >
          <Icon size={26} className="text-secondary" />
        </div>
      </div>

      <span className="text-sm text-white/85 font-body font-medium text-center min-h-[1.25rem]">
        {current.name}
      </span>

      {/* Points indicateurs de progression */}
      <div className="flex gap-1.5">
        {badges.map((b, i) => (
          <span
            key={b.name}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              background: i === index ? "var(--secondary-color)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
