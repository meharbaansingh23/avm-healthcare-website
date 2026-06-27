"use client";

import Image from "next/image";
import { useState } from "react";

export type CarouselImage = {
  src: string;
  alt: string;
  /** Natural source dimensions — used to compute the card's display width
   *  from the fixed height. Optional: if omitted, the ratio is detected on load. */
  width?: number;
  height?: number;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  /** Duration of one full loop, in seconds. Larger = slower. */
  speedSeconds?: number;
  pauseOnHover?: boolean;
  cardHeightDesktop?: number;
  cardHeightMobile?: number;
  /** Colour of the soft edge gradient — match the section background. */
  fadeColor?: string;
};

/**
 * Reusable infinite image carousel. The track renders the image list TWICE and
 * a CSS keyframe translates it by exactly -50%, so the loop is seamless with no
 * visible reset jump. Cards keep their natural aspect ratio (fixed height, auto
 * width via the `aspect-ratio` style). Transform-only animation → GPU-cheap.
 * Pauses on hover; both edges fade into `fadeColor`.
 */
export default function ImageCarousel({
  images,
  speedSeconds = 60,
  pauseOnHover = true,
  cardHeightDesktop = 400,
  cardHeightMobile = 280,
  fadeColor = "#FFFFFF",
}: ImageCarouselProps) {
  // Fallback aspect ratios discovered on load for any image lacking dimensions.
  const [ratios, setRatios] = useState<Record<string, number>>({});

  const ratioFor = (img: CarouselImage) =>
    img.width && img.height ? img.width / img.height : ratios[img.src] ?? 1.5;

  const renderGroup = (ariaHidden: boolean) => (
    <div className="flex shrink-0" aria-hidden={ariaHidden || undefined}>
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="carousel-card group/card relative shrink-0 mr-6 rounded-2xl overflow-hidden bg-[#EEF2F7] shadow-sm transition-shadow duration-300 hover:shadow-xl"
          style={{ aspectRatio: String(ratioFor(img)) }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width ?? 1500}
            height={img.height ?? 1000}
            sizes="(max-width: 768px) 70vw, 40vw"
            className="h-full w-full object-cover"
            onLoad={(e) => {
              if (img.width && img.height) return;
              const t = e.currentTarget;
              if (!t.naturalWidth || !t.naturalHeight) return;
              setRatios((prev) =>
                prev[img.src]
                  ? prev
                  : { ...prev, [img.src]: t.naturalWidth / t.naturalHeight }
              );
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`carousel relative overflow-hidden ${
        pauseOnHover ? "carousel--pause" : ""
      }`}
      style={
        {
          "--carousel-duration": `${speedSeconds}s`,
          "--card-h-desktop": `${cardHeightDesktop}px`,
          "--card-h-mobile": `${cardHeightMobile}px`,
        } as React.CSSProperties
      }
      role="region"
      aria-label="Image carousel"
    >
      <div className="carousel-track flex w-max">
        {renderGroup(false)}
        {renderGroup(true)}
      </div>

      {/* Soft edge fades — cards dissolve in/out of view */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{
          background: `linear-gradient(to right, ${fadeColor} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{
          background: `linear-gradient(to left, ${fadeColor} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
