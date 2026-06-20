import { about, profile } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SparkleIcon } from "./ui/Icons";

const aboutSrc = "/styles/clean.png";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="01 / About"
        title="Designing apps that feel inevitable"
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Avatar / portrait card */}
        <Reveal>
          <div className="glass relative overflow-hidden rounded-card p-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-surface-1">
              <img
                src={aboutSrc}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
              {/* glossy sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Bio + highlights */}
        <div>
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm transition-colors hover:border-accent/40"
                >
                  <SparkleIcon
                    width={18}
                    height={18}
                    className="shrink-0 text-accent"
                  />
                  <span className="text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
