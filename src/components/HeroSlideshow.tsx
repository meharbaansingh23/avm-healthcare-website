"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/images/hero/Hero-1.png", alt: "AVM Healthcare surgical instruments" },
  { src: "/images/hero/Hero-2.png", alt: "Precision surgical instruments" },
  { src: "/images/hero/Hero-3.png", alt: "AVM Healthcare products" },
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
      setActive((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slides[0].src}
          alt={slides[0].alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      role="region"
      aria-label="Hero image slideshow"
      aria-roledescription="carousel"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
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
