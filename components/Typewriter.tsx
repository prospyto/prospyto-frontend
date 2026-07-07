"use client";

import { useEffect, useState } from "react";

// Effet machine à écrire : le texte s'affiche progressivement, lettre par
// lettre, dès l'arrivée sur la page. Code original (setInterval + state),
// pas de librairie externe. Respecte prefers-reduced-motion.
export default function Typewriter({
  text,
  speed = 45,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const id = setTimeout(() => setDisplay(text), 0);
      return () => clearTimeout(id);
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {display}
      <span className="typewriter-cursor" aria-hidden>|</span>
    </span>
  );
}
