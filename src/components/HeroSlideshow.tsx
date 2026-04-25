"use client";

import { useEffect, useState } from "react";

// To swap in real photos: replace each placeholder div in the map below with
//   <Image src="/images/hero-1.jpg" alt={label} fill className="object-cover" />
// (each slide wrapper is already absolute inset-0, so `fill` will position correctly).
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
      <div className="img-placeholder w-full h-full rounded-none">
        {SLIDES[0]}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
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

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
              i === active
                ? "bg-[#0A1628]"
                : "bg-[#0A1628]/30 hover:bg-[#0A1628]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
