"use client";

import { useEffect, useState } from "react";

// To swap in real photos: replace each placeholder div in the map below with
//   <Image src="/images/hero-1.jpg" alt={s} fill className="object-cover" />
// and add `relative` to the slide wrapper so `fill` can position correctly.
const SLIDES = [
  "Hero image 1 — Operating theatre",
  "Hero image 2 — Surgical instruments",
  "Hero image 3 — Hospital setting",
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="img-placeholder w-full h-72 rounded-none">
        {SLIDES[0]}
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative w-full h-72 overflow-hidden"
        role="region"
        aria-label="Hero image slideshow"
        aria-roledescription="carousel"
      >
        {SLIDES.map((label, i) => (
          <div
            key={label}
            className={`img-placeholder absolute inset-0 rounded-none transition-opacity duration-1000 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
              i === active ? "bg-white" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
