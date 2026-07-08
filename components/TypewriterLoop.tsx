"use client";

import { useEffect, useState } from "react";

export default function TypewriterLoop({
  text,
  typeSpeed = 55,
  eraseSpeed = 30,
  pauseAfterType = 1800,
  pauseAfterErase = 500,
  className = "",
}: {
  text: string;
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseAfterType?: number;
  pauseAfterErase?: number;
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
    let phase: "typing" | "pausedTyped" | "erasing" | "pausedErased" = "typing";
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (phase === "typing") {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          phase = "pausedTyped";
          timeoutId = setTimeout(tick, pauseAfterType);
        } else {
          timeoutId = setTimeout(tick, typeSpeed);
        }
        return;
      }

      if (phase === "pausedTyped") {
        phase = "erasing";
        timeoutId = setTimeout(tick, eraseSpeed);
        return;
      }

      if (phase === "erasing") {
        i -= 1;
        setDisplay(text.slice(0, i));
        if (i <= 0) {
          phase = "pausedErased";
          timeoutId = setTimeout(tick, pauseAfterErase);
        } else {
          timeoutId = setTimeout(tick, eraseSpeed);
        }
        return;
      }

      // pausedErased
      phase = "typing";
      timeoutId = setTimeout(tick, typeSpeed);
    }

    timeoutId = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, typeSpeed, eraseSpeed, pauseAfterType, pauseAfterErase]);

  return (
    <span className={className}>
      {display}
      <span className="typewriter-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
