"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

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
 * Full-bleed hero background slideshow. Three slides crossfade (1s) via
 * framer-motion's AnimatePresence with mode="sync" (the entering and exiting
 * slides animate simultaneously, giving a true crossfade). A directional dark
 * gradient keeps the left-aligned hero text readable across every slide.
 *
 * Auto-rotation uses a setInterval (6s) with cleanup on unmount / dependency
 * change. Hovering the dot navigation pauses rotation; clicking a dot switches
 * slide and — because `active` is a dependency — resets the rotation timer.
 */
export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-rotation: advance the slide every 6s. setInterval is cleared on unmount
  // and whenever a dependency changes (so a manual dot click resets the timer).
  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [reducedMotion, paused, active]);

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero image slideshow"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
          aria-hidden
        >
          <Image
            src={slides[active].src}
            alt={slides[active].alt}
            fill
            priority={active === 0}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Directional gradient — keeps the left-aligned hero text readable */}
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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
              i === active ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
