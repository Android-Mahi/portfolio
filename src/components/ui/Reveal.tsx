import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Travel distance in px before settling */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
};

/**
 * Fade + rise into view on scroll. Honours reduced-motion by rendering
 * statically. `viewport.once` means it animates a single time, not on every
 * scroll pass — calmer and cheaper.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
