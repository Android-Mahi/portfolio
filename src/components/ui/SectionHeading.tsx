import { Fragment } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

type Props = {
  /** Small mono label above the title, e.g. "01 / About" */
  eyebrow: string;
  title: string;
  /** Optional supporting line under the title */
  subtitle?: string;
  align?: "left" | "center";
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};
const word = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Premium word-by-word reveal. A single container drives a staggered fade+rise
 * of each word — no `overflow-hidden` mask, so it can never clip descenders
 * (Tailwind's large text sizes ship line-height:1, which a mask would guillotine).
 */
function AnimatedTitle({ title }: { title: string }) {
  const reduced = usePrefersReducedMotion();
  const words = title.split(" ");

  if (reduced) {
    return (
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl">
        {title}
      </h2>
    );
  }

  return (
    <motion.h2
      className="mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
      </Reveal>

      <AnimatedTitle title={title} />

      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
