import { useState } from "react";
import { profile, socials } from "../data/content";
import { handleSpotlight } from "../lib/spotlight";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowRightIcon, SocialIcon } from "./ui/Icons";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend needed: compose a mailto with the message pre-filled.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <div
        onMouseMove={handleSpotlight}
        className="glass spotlight relative overflow-hidden rounded-[28px] p-8 sm:p-12"
      >
        {/* glow accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent opacity-10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-3 opacity-10 blur-[90px]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="05 / Contact"
              title="Let's build something great"
              subtitle="Have a project, a role, or just want to say hi? My inbox is always open."
            />

            <Reveal delay={0.1}>
              <a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-flex items-center gap-2 font-display text-lg text-ink transition-colors hover:text-accent sm:text-xl"
              >
                {profile.email}
                <ArrowRightIcon width={18} height={18} />
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex gap-2">
                {socials
                  .filter((s) => s.url)
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <SocialIcon name={s.icon} width={19} height={19} />
                    </a>
                  ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-none`}
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Send message <ArrowRightIcon width={18} height={18} />
              </button>
              <p className="text-center text-xs text-ink-faint">
                Opens your email app — no data is stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
