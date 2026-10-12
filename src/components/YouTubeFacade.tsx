"use client";

import { useState } from "react";
import Image from "next/image";

// Click-to-load YouTube embed. Renders only the thumbnail + a play button
// until the user opts in, so no YouTube JS or third-party cookies load with
// the page. The parent must size the box (e.g. `relative aspect-video`).
export default function YouTubeFacade({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB] focus-visible:ring-inset"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110 md:h-20 md:w-20"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-[#0A1628] md:h-8 md:w-8">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
