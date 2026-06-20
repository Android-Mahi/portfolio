import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects, type Project } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ExternalIcon, GithubIcon, PlayIcon } from "./ui/Icons";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

/* Deterministic gradient when a project has no screenshot — keeps cards
   looking intentional rather than empty. */
const gradients = [
  "from-emerald-500/30 via-teal-500/20 to-sky-500/30",
  "from-sky-500/30 via-indigo-500/20 to-emerald-500/30",
  "from-teal-500/30 via-emerald-500/20 to-cyan-500/30",
  "from-green-500/30 via-lime-500/15 to-teal-500/30",
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // raw 0..1 pointer position, springed for weight
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    // feed the spotlight glow (shares the same rect)
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const links = [
    project.playStoreUrl && {
      url: project.playStoreUrl,
      label: "Play Store",
      Icon: PlayIcon,
    },
    project.githubUrl && {
      url: project.githubUrl,
      label: "Code",
      Icon: GithubIcon,
    },
    project.liveUrl && { url: project.liveUrl, label: "Live", Icon: ExternalIcon },
  ].filter(Boolean) as { url: string; label: string; Icon: typeof PlayIcon }[];

  return (
    <Reveal delay={index * 0.06} className={project.featured ? "lg:col-span-6" : "lg:col-span-3"}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="glass spotlight group relative h-full overflow-hidden rounded-card p-1.5 [transform-style:preserve-3d]"
      >
        <div
          className={`grid h-full grid-cols-1 gap-5 rounded-[16px] p-5 sm:p-6 ${
            project.featured ? "md:grid-cols-2 md:items-center" : ""
          }`}
        >
          {/* Visual */}
          <div
            style={reduced ? undefined : { transform: "translateZ(40px)" }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`grid h-full w-full place-items-center bg-gradient-to-br ${gradients[index % gradients.length]}`}
                >
                  {/* faux phone mock */}
                  <div className="h-[78%] w-[34%] rounded-[14px] border-2 border-white/20 bg-canvas/50 p-1 shadow-2xl backdrop-blur-sm">
                    <div className="h-full w-full rounded-[9px] bg-gradient-to-b from-white/10 to-transparent">
                      <div className="mx-auto mt-1.5 h-1 w-6 rounded-full bg-white/25" />
                    </div>
                  </div>
                </div>
              )}
              {project.featured && (
                <span className="absolute left-3 top-3 chip !bg-canvas/70 backdrop-blur">
                  ★ Featured
                </span>
              )}
            </div>
          </div>

          {/* Copy */}
          <div style={reduced ? undefined : { transform: "translateZ(28px)" }}>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-accent">
              {project.blurb}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/[0.03] px-2 py-1 font-mono text-xs text-ink-muted ring-1 ring-inset ring-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {links.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon width={16} height={16} /> {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="03 / Selected work"
        title="Things I've built & shipped"
        subtitle="A few projects I'm proud of. Hover a card to feel the depth."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
