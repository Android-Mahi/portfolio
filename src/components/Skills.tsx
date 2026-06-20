import { skillGroups } from "../data/content";
import { handleSpotlight } from "../lib/spotlight";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

// Flatten for the marquee strip
const allSkills = skillGroups.flatMap((g) => g.skills);

function Marquee() {
  return (
    <div className="group relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {[...allSkills, ...allSkills].map((s, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-4 py-2 font-mono text-sm text-ink-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="02 / Toolkit"
          title="The stack I ship with"
          subtitle="A modern, production-grade Android toolkit — chosen for performance, testability and developer joy."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div
                onMouseMove={handleSpotlight}
                className="glass spotlight group h-full rounded-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  <span className="text-gradient">{group.title}</span>
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-sm text-ink-muted ring-1 ring-inset ring-white/5 transition-colors group-hover:text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Marquee />
    </section>
  );
}
