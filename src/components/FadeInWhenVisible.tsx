"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type FadeInWhenVisibleProps = {
  children: React.ReactNode;
  /** Stagger delay in seconds (e.g. index * 0.1 for grid children). */
  delay?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "ref">;

/**
 * Wraps content with the site-wide scroll reveal: a subtle fade-in-up
 * (opacity 0 → 1, y 20 → 0) triggered once when the element scrolls into view.
 * Respects prefers-reduced-motion (transitions are neutralised in globals.css).
 */
export default function FadeInWhenVisible({
  children,
  delay = 0,
  className,
  ...rest
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
