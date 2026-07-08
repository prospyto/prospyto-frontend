"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

type ChildProps = {
  className?: string;
  style?: CSSProperties;
};

export default function StaggerGroup({
  children,
  className = "",
  staggerMs = 80,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
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
        return cloneElement(element, {
          className: [
            element.props.className ?? "",
            "stagger-item",
            visible ? "stagger-visible" : "",
          ]
            .filter(Boolean)
            .join(" "),
          style: {
            ...(element.props.style ?? {}),
            transitionDelay: visible ? `${i * staggerMs}ms` : "0ms",
          },
        });
      })}
    </div>
  );
}
