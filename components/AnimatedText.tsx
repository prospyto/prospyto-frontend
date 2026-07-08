"use client";

import { useRef, useEffect, useState } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({
  children,
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 cubic-bezier-smooth`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
