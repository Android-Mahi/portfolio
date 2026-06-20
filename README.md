# Android Developer Portfolio

A premium, 3D, Material-You-inspired portfolio for an Android developer.
Dark theme, Android-green accent, glassmorphism, smooth scroll, and an
interactive 3D hero — built mobile-first so it stays buttery on a phone.

![hero](docs/preview-desktop.png)

## Tech stack

| Concern        | Choice                                  | Why |
| -------------- | --------------------------------------- | --- |
| Build / app    | **Vite + React + TypeScript**           | Fast, modern, the de-facto stack for acclaimed dev portfolios. |
| Styling        | **Tailwind CSS v4**                     | Whole design system lives in one `@theme` block (`src/index.css`). |
| 3D hero        | **React Three Fiber + drei** (Three.js) | One focused, GPU-cheap centerpiece — lazy-loaded, desktop-only. |
| Scroll motion  | **GSAP + ScrollTrigger**                | Timeline "spine draw" effect; integrates with Lenis. |
| UI motion      | **Framer Motion**                       | Declarative reveals, stagger, card tilt. |
| Smooth scroll  | **Lenis**                               | Premium inertia scrolling (auto-off for reduced-motion). |

## Run it

```bash
npm install      # already done if node_modules exists
npm run dev      # local dev at http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build at http://localhost:4173
```

## ✏️ Make it yours (start here)

**Almost everything you need to edit is in one file:**

### `src/data/content.ts`
Your name, role, tagline, socials, stats, about text, skills, projects, and
experience all live here. Every placeholder is marked with `// TODO`. Update
those values and the whole site updates — no JSX editing required.

### Images & resume → drop into `public/`
- **Headshot** → put `me.jpg` in `public/`, set `profile.avatarUrl = "/me.jpg"`.
  (Without it, a tasteful initials avatar is shown.)
- **Resume** → put `resume.pdf` in `public/`, set `profile.resumeUrl = "/resume.pdf"`.
  (Without it, the hero shows a "Get in touch" button instead.)
- **Project screenshots** → put e.g. `pulse.png` in `public/`, set the
  project's `image: "/pulse.png"`. (Without it, a generated gradient + phone
  mock is shown.)
- **Social preview** → replace `public/og-image.png` (1200×630) for nice
  link previews, and update the `<title>`/meta in `index.html`.

### Re-skin the theme in seconds
Open `src/index.css` and change `--color-accent` (currently Android green
`#3ddc84`). Because Material 3 derives everything from one source color, the
whole site — buttons, glows, gradients, 3D lighting — follows.

## Deploy

### Vercel / Netlify (recommended — zero config)
Push to GitHub and import the repo. Build command `npm run build`, output
`dist`. Leave `base: "/"` in `vite.config.ts`.

### GitHub Pages (project site, e.g. `username.github.io/portfolio`)
1. In `vite.config.ts` set `base: "/portfolio/"` (your repo name).
2. Build and publish `dist/` (e.g. with the `gh-pages` package or a GitHub
   Action). For a **user site** (`username.github.io`) keep `base: "/"`.

## Accessibility & performance notes
- **`prefers-reduced-motion` is honoured everywhere** — Lenis, GSAP, the 3D
  hero, and all reveals fall back to static. Test with macOS *Reduce Motion*.
- **Mobile never downloads Three.js.** The 3D hero is a `lazy()` chunk that
  only loads on desktop with motion enabled; phones get a pure-CSS orb.
- The 3D scene caps `dpr` at 1.5 and uses an emissive (env-map-free) material,
  so there are no runtime HDR downloads.

## Project structure
```
src/
  data/content.ts        ← EDIT THIS (all your content)
  index.css              ← design tokens / theme (@theme)
  App.tsx                ← section composition
  components/
    Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
    three/HeroScene.tsx  ← the 3D centerpiece
    ui/                  ← Reveal, SectionHeading, Icons, ScrollProgress
  hooks/                 ← useLenis, useMediaQuery (reduced-motion / mobile)
  lib/gsap.ts            ← GSAP + ScrollTrigger registration
```
