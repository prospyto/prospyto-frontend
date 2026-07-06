"use client";

import { useEffect, useState } from "react";

const FULL_TEXT =
  "Je m'appelle Prospère Azonglahoun. Développeur Full Stack. Je t'aide à construire de A à Z ton allié informatique — ton outil numérique pour faire avancer ton business : portfolio, site web, site vitrine, et plus encore.";

// Effet machine à écrire : le texte s'affiche progressivement à l'arrivée
// sur le site. Code original, sans librairie externe.
export default function TypewriterHero() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(FULL_TEXT);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 22);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="hero-title font-heading font-bold text-2xl md:text-4xl leading-snug tracking-tight min-h-[7rem] md:min-h-[6rem]">
      {displayed}
      <span className="typewriter-cursor" aria-hidden>
        |
      </span>
    </h1>
  );
}
