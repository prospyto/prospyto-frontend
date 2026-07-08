"use client";

import { useRef, useState } from "react";

export default function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const animating = useRef(false);

  function handleHover() {
    if (animating.current) return;
    animating.current = true;
    const duration = 700;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        animating.current = false;
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <div
      onMouseEnter={handleHover}
      className="card-surface p-5 text-center md:text-left cursor-default"
    >
      <p className="text-3xl md:text-4xl font-heading font-bold text-secondary">
        {display}
        {suffix}
      </p>
      <p className="text-white/70 font-body text-sm mt-1">{label}</p>
    </div>
  );
}
