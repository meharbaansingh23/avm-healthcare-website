"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Client-provided photography. The text overlay (in page.tsx) stays constant
// across all three slides — only the background image crossfades.
const slides = [
  {
    src: "/images/hero-1.webp",
    alt: "Surgical instruments arranged on a blue surgical drape with warm bokeh",
  },
  {
    src: "/images/hero-2.webp",
    alt: "Precision surgical instruments laid out on a green drape in an operating room",
  },
  {
    src: "/images/hero-3.webp",
    alt: "A gloved hand placing a surgical instrument onto a tray",
  },
];

/**
 * Full-bleed hero background slideshow. All three slides are rendered at once,
 * stacked absolutely; only the `active` slide has opacity 1 while the others sit
 * at opacity 0. Animating opacity alone (1.5s easeInOut) gives a true crossfade
 * with no enter/exit flicker. A single dark gradient overlay sits ON TOP of the
 * whole stack (not per-slide) to keep the left-aligned hero text readable.
 *
 * Auto-rotation uses a setInterval (6s) held in a ref, with explicit
 * start/stop helpers so a manual dot click can reset the timer and hovering the
 * dot navigation can pause it. The interval is cleared on unmount.
 */
export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  const stopRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startRotation = useCallback(() => {
    stopRotation();
    // Don't auto-rotate while paused on hover or when reduced motion is set.
    if (reducedMotion || isHoveringRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 6000);
  }, [reducedMotion, stopRotation]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Start/refresh the auto-rotation; cleared on unmount or when startRotation
  // changes (e.g. reduced-motion preference flips).
  useEffect(() => {
    startRotation();
    return stopRotation;
  }, [startRotation, stopRotation]);

  // Manual selection: jump to the slide and reset the rotation timer.
  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    startRotation();
  };

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero image slideshow"
    >
      {/* All slides stacked; only opacity animates → flicker-free crossfade */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.5, ease: "easeInOut" }}
          aria-hidden
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Constant directional gradient — sits on top of all slides */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 100%)",
        }}
      />
      {/* Vignette — darkens the edges so attention falls on the text */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(10,22,40,0.5) 100%)",
        }}
      />

      {/* Dot navigation — bottom centre. Hovering pauses auto-rotation. */}
      <div
        className="absolute inset-x-0 bottom-0 mb-12 flex justify-center gap-2 z-20"
        onMouseEnter={() => {
          isHoveringRef.current = true;
          stopRotation();
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          startRotation();
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
            onClick={() => handleDotClick(i)}
            className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
              i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
