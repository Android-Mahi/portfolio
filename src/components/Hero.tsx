import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { profile, stats, socials } from "../data/content";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DownloadIcon,
  MapPinIcon,
  SocialIcon,
} from "./ui/Icons";

// Finalized portrait: background-removed photo. The hero uses the rounded
// version (transparent corners) inside the 3D frame; fallbacks use the square.
const PORTRAIT_SQUARE = "/styles/clean.png";

// Code-split the entire 3D bundle: it only downloads when the hero actually
// decides to render it (desktop + motion allowed).
const HeroPhoto = lazy(() => import("./three/HeroPhoto"));

/** Lightweight photo card — the stand-in for phones / reduced-motion (no 3D). */
function FallbackPhoto({ src }: { src: string }) {
  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* glow */}
      <div className="absolute h-60 w-60 rounded-full bg-accent opacity-20 blur-[80px]" />
      {/* photo in a glowing glass frame */}
      <div className="relative aspect-square w-56 animate-float rounded-3xl bg-gradient-to-br from-accent/60 via-accent-2/40 to-accent-3/50 p-[2px] shadow-[0_0_60px_var(--color-accent-glow)] sm:w-64">
        <img
          src={src}
          alt={profile.name}
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const show3D = isDesktop && !reduced;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* faint engineering grid behind everything */}
      <div className="bg-grid pointer-events-none absolute inset-0" />

      <div className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Left: copy ── */}
        <motion.div
          className="min-w-0"
          variants={reduced ? undefined : container}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "show"}
        >
          <motion.div variants={reduced ? undefined : item}>
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={reduced ? undefined : item}
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-ink-muted text-2xl font-medium sm:text-3xl">
              Hi, I&apos;m
            </span>
            <span className="text-aurora">{profile.name}</span>
          </motion.h1>

          <motion.p
            variants={reduced ? undefined : item}
            className="mt-4 font-display text-xl font-medium text-ink sm:text-2xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={reduced ? undefined : item}
            className="mt-4 max-w-xl text-pretty break-words text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={reduced ? undefined : item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="btn-primary">
              View my work <ArrowRightIcon width={18} height={18} />
            </a>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <DownloadIcon width={18} height={18} /> Résumé
              </a>
            ) : (
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            )}
          </motion.div>

          {/* socials */}
          <motion.div
            variants={reduced ? undefined : item}
            className="mt-7 flex items-center gap-2 text-ink-muted"
          >
            {socials
              .filter((s) => s.url)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={s.icon} width={18} height={18} />
                </a>
              ))}
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm">
              <MapPinIcon width={16} height={16} /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D / fallback ── */}
        <div className="relative h-[320px] w-full min-w-0 sm:h-[420px] lg:h-[520px] lg:overflow-hidden lg:rounded-full">
          {show3D ? (
            <Suspense fallback={<FallbackPhoto src={PORTRAIT_SQUARE} />}>
              <HeroPhoto />
            </Suspense>
          ) : (
            <FallbackPhoto src={PORTRAIT_SQUARE} />
          )}
        </div>
      </div>

      {/* Stats strip — in normal flow so it never overlaps content on mobile */}
      <div className="mx-auto mt-12 w-full max-w-6xl px-6">
        <div className="glass grid grid-cols-2 gap-4 rounded-2xl px-6 py-5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      {!reduced && (
        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-ink-faint lg:block"
        >
          <ArrowDownIcon className="animate-bounce" />
        </a>
      )}
    </section>
  );
}
