"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  /** Format with thousands separators (e.g. 10,000). */
  thousands?: boolean;
  durationMs?: number;
  className?: string;
};

/**
 * Counts up to `target` with an ease-out cubic curve (decelerates toward the
 * end so the number feels like it "arrives") when scrolled into view. Runs once.
 * Honors prefers-reduced-motion by snapping straight to the final value.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  thousands = false,
  durationMs = 2000,
  className,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          setValue(target);
          return;
        }

        const steps = 60;
        const interval = durationMs / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setValue(Math.floor(ease * target));
          if (step >= steps) {
            setValue(target);
            clearInterval(timer);
          }
        }, interval);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  const display = thousands ? value.toLocaleString() : value;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
