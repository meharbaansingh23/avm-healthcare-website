import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type PillButtonProps = {
  /** If provided, renders as a Link (or external <a> when `external`). */
  href?: string;
  /** If provided (and no href), renders as a <button>. */
  onClick?: () => void;
  children: ReactNode;
  /** 'default' = white/navy text · 'dark' = navy bg/white text (light sections). */
  variant?: "default" | "dark";
  /** 'sm' = compact (text-xs) for in-card use. */
  size?: "default" | "sm";
  /** Opens an href in a new tab with the right rel attributes. */
  external?: boolean;
  className?: string;
};

/**
 * Polished pill-shaped CTA used for inline "Read article →" style links. Renders
 * as a Link (internal), an <a> (external), a <button> (onClick), or a plain
 * decorative <span> when neither href nor onClick is given — the span form is
 * safe to nest inside a parent <Link> (e.g. clickable cards) without invalid
 * nested anchors. The arrow nudges right on hover, including when an ancestor
 * `.group` is hovered, so in-card pills react to the whole card.
 */
export default function PillButton({
  href,
  onClick,
  children,
  variant = "default",
  size = "default",
  external,
  className = "",
}: PillButtonProps) {
  const isSm = size === "sm";

  const sizeCls = isSm
    ? "gap-1.5 px-3.5 py-2 text-xs"
    : "gap-2 px-5 py-2.5 text-sm";

  const variantCls =
    variant === "dark"
      ? "bg-[#0A1628] text-white border border-[#0A1628] shadow-sm hover:shadow-md hover:bg-[#0d1f38]"
      : "bg-white text-[#0A1628] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:bg-[#FAFAF9]";

  const cls = `group/pill inline-flex items-center rounded-full font-medium cursor-pointer transition-all duration-200 ${sizeCls} ${variantCls} ${className}`;

  const inner = (
    <>
      {children}
      <ArrowRight
        size={isSm ? 14 : 16}
        aria-hidden
        className="transition-transform duration-200 group-hover/pill:translate-x-0.5 group-hover:translate-x-0.5"
      />
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }

  // Decorative (non-interactive) — safe inside a parent link/card.
  return <span className={cls}>{inner}</span>;
}
