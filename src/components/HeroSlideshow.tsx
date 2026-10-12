"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
 *
 * Slides 2–3 aren't mounted on first load so they don't compete with slide 1
 * (the LCP image) for bandwidth. They mount 1s after the window `load` event
 * (which waits for slide 1, as it's in the initial HTML), or
 * as soon as the dot navigation is hovered/focused, and auto-rotation only
 * advances to a slide once its image has loaded, so the crossfade never
 * reveals a half-loaded image.
 */

const REST_MOUNT_DELAY_MS = 1000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getReducedMotionServer = () => false;

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );
  const [restMounted, setRestMounted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Read straight from the <img> rather than next/image's onLoad, which waits
  // on img.decode() and can stall indefinitely in a background tab.
  const isSlideReady = (i: number) => {
    const img = containerRef.current?.querySelector<HTMLImageElement>(`img[data-slide="${i}"]`);
    return !!img && img.complete && img.naturalWidth > 0;
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      timer = setTimeout(() => setRestMounted(true), REST_MOUNT_DELAY_MS);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      clearTimeout(timer);
    };
  }, []);

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
      // Hold on the current slide until the next one's image has loaded.
      setActiveIndex((i) => {
        const next = (i + 1) % slides.length;
        return isSlideReady(next) ? next : i;
      });
    }, 6000);
  }, [reducedMotion, stopRotation]);

  // Start/refresh the auto-rotation; cleared on unmount or when startRotation
  // changes (e.g. reduced-motion preference flips).
  useEffect(() => {
    startRotation();
    return stopRotation;
  }, [startRotation, stopRotation]);

  // Manual selection: jump to the slide and reset the rotation timer.
  const handleDotClick = (i: number) => {
    setRestMounted(true);
    setActiveIndex(i);
    startRotation();
  };

  return (
    <div
      ref={containerRef}
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
          {(i === 0 || restMounted) && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              // Slides 2–3 are already deferred by mounting late; once
              // mounted, fetch them straight away so they're ready to fade in.
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
              data-slide={i}
            />
          )}
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
        onFocus={() => setRestMounted(true)}
        onMouseEnter={() => {
          setRestMounted(true);
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
