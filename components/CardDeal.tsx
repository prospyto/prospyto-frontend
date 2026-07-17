"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

type ChildProps = {
  className?: string;
  style?: CSSProperties;
};

// Légère variation de rotation par carte, pour que la distribution
// ne semble pas parfaitement mécanique (comme des cartes tenues en main).
const ROTATIONS = [-6, 4, -3, 5, -5, 3];

export default function CardDeal({
  children,
  className = "",
  dealMs = 220,
}: {
  children: ReactNode;
  className?: string;
  dealMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<ChildProps>;
        const rotation = ROTATIONS[i % ROTATIONS.length];
        return cloneElement(element, {
          className: [
            element.props.className ?? "",
            "card-deal-item",
            visible ? "card-deal-visible" : "",
          ]
            .filter(Boolean)
            .join(" "),
          style: {
            ...(element.props.style ?? {}),
            transitionDelay: visible ? `${i * dealMs}ms` : "0ms",
            ["--deal-rotate" as string]: `${rotation}deg`,
          },
        });
      })}
    </div>
  );
}
