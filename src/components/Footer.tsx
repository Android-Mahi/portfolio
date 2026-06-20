import { profile, navLinks } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent font-display text-xs font-bold text-[#04130a]">
            {"</>"}
          </span>
          <span className="font-display text-sm font-semibold text-ink-muted">
            android.dev
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-ink-faint">
          © {profile.name}
        </p>
      </div>
    </footer>
  );
}
