"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  /** Seconds to wait before starting — use for staggering items in a list. */
  delay?: number;
  /** Rendered element — use "li" when the parent is a <ul>/<ol>. */
  as?: "div" | "li";
  className?: string;
}

/**
 * Fades content in with a subtle upward drift when it scrolls into view.
 * Runs once per element; disabled entirely for users who prefer reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Tag = as;
  const MotionTag = as === "li" ? motion.li : motion.div;

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
