"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  /** Seconds for one full loop. Slower = larger number. */
  durationSec?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee. Renders the item list twice and translates the
 * track by exactly -50% so the loop is seamless (no janky reset). Pauses on
 * hover and fades both edges via a CSS mask. Transform/opacity only — GPU-cheap.
 */
export default function Marquee({ items, durationSec = 40, className }: MarqueeProps) {
  const renderGroup = (ariaHidden: boolean) => (
    <div className="flex shrink-0" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <div key={i} className="shrink-0 mr-6">
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`marquee group relative overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  );
}
