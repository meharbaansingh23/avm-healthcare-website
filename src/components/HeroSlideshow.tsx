"use client";

import { useEffect, useState } from "react";

const SLIDES = [1, 2, 3];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      {/* TODO: Replace placeholder divs with real <Image> tags pointing to /images/hero-1.jpg, hero-2.jpg, hero-3.jpg */}
      <div className="relative w-full aspect-[4/3]">
        {SLIDES.map((n, i) => (
          <div
            key={n}
            className={`img-placeholder absolute inset-0 transition-opacity duration-1000 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            Slide {n} of {SLIDES.length} — Hero image
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {SLIDES.map((n, i) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to slide ${n}`}
            onClick={() => setActive(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === active ? "bg-blue-600" : "bg-[#CBD5E1]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
