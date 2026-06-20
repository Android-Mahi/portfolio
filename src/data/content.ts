/* ============================================================
   ✏️  EDIT THIS FILE  — single source of truth for the whole site.
   Now filled in from your GitHub + LinkedIn. A few optional
   polish spots are marked  // TODO.
   ============================================================ */

export const profile = {
  name: "Mahendran V",
  firstName: "Mahendran",
  role: "Android Application Engineer",
  // One punchy sentence. This sits under your name in the hero.
  tagline:
    "I build reliable, scalable, offline-first Android apps that empower field teams and drive real-world impact.",
  location: "Chennai, India",
  email: "androdevmahi@gmail.com",
  availability: "Open to opportunities",
  // Path to your resume placed in /public (e.g. /resume.pdf). Leave "" to hide the button.
  resumeUrl: "", // TODO drop resume.pdf in /public and set "/resume.pdf"
  // Your photo — background-removed "clean" version (finalized look).
  avatarUrl: "/styles/clean.png",
};

export const socials = [
  { label: "GitHub", url: "https://github.com/Android-Mahi", icon: "github" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mahendran-v-48395717a/",
    icon: "linkedin",
  },
  { label: "Email", url: "mailto:androdevmahi@gmail.com", icon: "mail" },
] as const;

/* Quick stats shown in the hero. All true as of 2026. */
export const stats = [
  { value: "5+", label: "Years experience" },
  { value: "Senior", label: "Mobile Engineer" },
  { value: "Kotlin", label: "Primary language" },
  { value: "Compose", label: "UI of choice" },
];

export const about = {
  // 2–3 short paragraphs. First person, human.
  paragraphs: [
    "I'm a Senior Mobile Software Engineer at Sedin Technologies with 5+ years building Android apps. I specialise in offline-first, enterprise field-service software — the kind of app that has to keep working when the network doesn't.",
    "Day to day I work across Work Orders, Inspections, Meter Reading and Asset Health workflows, building in Kotlin and Jetpack Compose on a Clean Architecture (MVVM) foundation with Coroutines, Flow and Retrofit. I care about the details users feel — smooth scrolling, reliable sync, and states that reassure.",
    "Outside client work I experiment with ideas like BlankChat, my offline-capable messaging app, and I lean into AI-assisted development to ship faster without cutting corners.",
  ],
  highlights: [
    "Offline-first enterprise apps",
    "Clean Architecture (MVVM)",
    "Coroutines & Flow",
    "AI-assisted development",
  ],
};

/* ── Skills, grouped. Grounded in your LinkedIn + shipped work. ── */
export const skillGroups = [
  {
    title: "Languages",
    skills: ["Kotlin", "Java", "Dart", "SQL"],
  },
  {
    title: "UI & Design",
    skills: ["Jetpack Compose", "Material 3", "Android SDK", "XML Views", "Animations"],
  },
  {
    title: "Architecture",
    skills: ["Clean Architecture", "MVVM", "Coroutines", "Flow", "Hilt / Dagger"],
  },
  {
    title: "Jetpack & Libraries",
    skills: ["Room", "WorkManager", "DataStore", "Navigation", "Lifecycle"],
  },
  {
    title: "Networking & Data",
    skills: ["Retrofit", "Firebase", "Offline-first Sync", "REST APIs", "Gson"],
  },
  {
    title: "Tooling & Quality",
    skills: ["Gradle (KTS)", "Git", "Unit Testing", "Espresso", "CI/CD"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  tags: string[];
  // Optional links — empty strings are hidden automatically.
  playStoreUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  // Path to a screenshot/mockup in /public, OR leave "" for a generated gradient.
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    // ── Professional work at Sedin (proprietary — no public links) ──
    title: "Enterprise Field-Service Suite",
    blurb: "Offline-first Android for field teams · Sedin Technologies",
    description:
      "Enterprise Android features for field-service and asset-management workflows — Work Orders, Service Requests, Inspections, Meter Reading and Asset Health. Built with Jetpack Compose and Clean Architecture (MVVM), with offline-first local storage and background sync so field teams stay productive even without a connection.",
    tags: [
      "Jetpack Compose",
      "Clean Architecture",
      "Coroutines & Flow",
      "Retrofit",
      "Offline-first",
      "Hilt",
    ],
    // Proprietary client work — intentionally no code/store links.
    image: "", // TODO optional: add a /public mockup screenshot
    featured: true,
  },
  {
    // ── REAL personal project, from your GitHub ──
    title: "BlankChat",
    blurb: "Messaging that works even with mobile data OFF.",
    description:
      "An innovative chat app that lets users send and receive messages without an active mobile-data connection. Built fully in Jetpack Compose with Material 3, a Firebase backend (Auth, Firestore, Storage, Cloud Messaging), a Room cache for offline-first behaviour, WorkManager for background sync, and DataStore for preferences.",
    tags: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Firebase",
      "Room",
      "WorkManager",
    ],
    githubUrl: "https://github.com/Android-Mahi/BlankChat",
    image: "", // TODO optional: add /blankchat.png screenshot to /public
    featured: true,
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Mobile Software Engineer",
    company: "Sedin Technologies · Remote",
    period: "Dec 2021 — Present",
    description:
      "Build and maintain enterprise Android features for field-service and asset-management workflows — Work Orders, Service Requests, Inspections, Meter Reading and Asset Health. Focus on offline-first sync, Clean Architecture (MVVM) and code quality.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines", "Retrofit", "Clean Arch"],
  },
  {
    role: "Native Mobile Application Developer",
    company: "Mobility Intelligence Softwares",
    period: "Mar 2021 — Dec 2021",
    description:
      "Developed native Android applications in Kotlin, building responsive UIs and coroutine-based concurrency on top of the Android framework.",
    tags: ["Kotlin", "Coroutines", "Android Framework"],
  },
  {
    role: "Flutter Application Developer · Internship",
    company: "Sri Kannapiran Mills Ltd.",
    period: "Sep 2020 — Dec 2020",
    description:
      "Built cross-platform mobile features with Flutter during an internship, exploring platform interoperability and the Android framework.",
    tags: ["Flutter", "Dart", "Android Framework"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
