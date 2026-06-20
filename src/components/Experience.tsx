import { useEffect, useRef } from "react";
import { experience } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { handleSpotlight } from "../lib/spotlight";

export function Experience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: the timeline spine "draws" from top to bottom,
  // scrubbed to scroll position. gsap.context scopes + auto-cleans the tween
  // (safe under React StrictMode double-mount).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !spineRef.current || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: true,
          },
        }
      );
    }, wrapRef);

    // recalc once layout/fonts settle
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(id);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="04 / Journey"
        title="Where I've been"
      />

      <div ref={wrapRef} className="relative mt-12 max-w-3xl">
        {/* the spine — draws on scroll via GSAP */}
        <div
          ref={spineRef}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-line to-transparent"
        />

        <ol className="space-y-10">
          {experience.map((job, i) => (
            <li key={`${job.company}-${i}`} className="relative pl-10">
              {/* node */}
              <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-canvas ring-2 ring-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <Reveal delay={i * 0.05}>
                <div
                  onMouseMove={handleSpotlight}
                  className="glass spotlight rounded-card p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-accent">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-ink-muted">
                    {job.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {job.description}
                  </p>
                  {job.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/[0.03] px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-inset ring-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
