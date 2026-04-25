"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [1, 2, 3];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label="Hero image slideshow"
      aria-roledescription="carousel"
    >
      {/* TODO: Replace placeholder divs with real <Image> tags pointing to /images/hero-1.jpg, hero-2.jpg, hero-3.jpg */}
      <div className="relative w-full aspect-[4/3]" aria-live="polite">
        {SLIDES.map((n, i) => (
          <div
            key={n}
            className={`img-placeholder absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${n} of ${SLIDES.length}`}
          >
            Slide {n} of {SLIDES.length} — Hero image
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        {SLIDES.map((n, i) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to slide ${n}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-3 w-3 rounded-full transition-colors cursor-pointer ${
              i === active ? "bg-blue-600" : "bg-[#CBD5E1] hover:bg-[#94A3B8]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
