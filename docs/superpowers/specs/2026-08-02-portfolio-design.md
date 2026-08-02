# Portfolio Site — Design Spec

Date: 2026-08-02
Status: Approved (pre-implementation)

## Goal

Build a personal portfolio website for Kristian Colville — a working software engineer — that serves both job-seeking credibility and a personal showcase, roughly equally. The site should be unique (not templated-generic), fast, accessible, and built to be easy to extend with real content (projects, certifications) over time.

Scope of this spec: the `frontend/` portfolio site only. The GitHub profile README is explicitly out of scope for this round — picked up as a separate follow-up once the site exists.

## Research basis

A research pass (web search, 2024-2026 sources) informed the structural and content decisions below. Full findings live in `docs/research-portfolio-best-practices.md`. Headline takeaways applied here:

- Curate 3-5 projects with real case-study depth (problem → approach → decisions → outcome) rather than cataloging every repo.
- Avoid clichés: typewriter-effect hero text (also a screen-reader accessibility bug), badge/stats-widget spam, snake-graph gimmicks.
- Dark-mode-first, restrained micro-interactions over heavy animation — 2026 trend correction is toward cognitive clarity, not sensory richness.
- Bento-grid layouts fit scannable skill/cert blocks well in a CSS-grid-based (Tailwind) build.
- Mobile-first and Core Web Vitals are table stakes, not nice-to-haves.
- Every project needs a working live-demo link and GitHub link; broken links are a top-cited trust-killer.
- A clear, repeated CTA — visitors shouldn't have to hunt for how to make contact.

## Repo structure

```
kristiancolville1/
├── README.md                 # GitHub profile README — out of scope this round
├── docs/
│   ├── superpowers/specs/    # design specs (this file)
│   ├── research-portfolio-best-practices.md
│   ├── content-notes.md      # real project/cert content, gathered incrementally
│   └── private/              # gitignored — CVs etc., not committed
├── assets/                   # existing images (hackathon award, palette refs)
└── frontend/                 # the portfolio site (React + Vite + TS)
    ├── src/
    │   ├── components/
    │   │   ├── atoms/        # Button, Badge, TechChip, Heading, IconLink
    │   │   ├── molecules/    # ProjectCard, CertificationCard, AchievementCard, NavLink
    │   │   ├── organisms/    # Navbar, Hero, ProjectsSection, CertificationsSection,
    │   │   │                 # SkillsGrid, ExperienceTimeline, ContactSection
    │   │   └── templates/    # HomeTemplate, ProjectDetailTemplate
    │   ├── pages/             # Home, ProjectDetail (route-level; wire data via hooks)
    │   ├── hooks/             # useProjects, useCertifications, useActiveSection, useTheme
    │   ├── content/           # projects.ts, certifications.ts (typed static data)
    │   └── ...
    ├── .storybook/
    ├── e2e/                   # Playwright specs
    ├── index.html
    ├── tailwind.config.js
    └── vite.config.ts
```

## Stack

React + Vite + TypeScript, Tailwind CSS (dark-mode-first via `dark:` variant), React Router (for `/projects/:slug` case-study routes), Framer Motion for restrained micro-interactions. Content is static typed data (`src/content/*.ts`), not a CMS or MDX pipeline — adding a project or cert means editing one array. Host-agnostic build output; hosting platform (Vercel/Netlify/GitHub Pages) not yet decided and not baked into the build.

## Routes

- `/` — single-page scroll: Hero → About → Skills → Projects (preview cards) → Certifications → Achievements → Experience → Contact
- `/projects/:slug` — full case-study page per project: problem, approach/stack, key decisions, outcome/metric, live demo + GitHub links, back-to-home nav
- Unknown `/projects/:slug` → 404 → redirect home

## Component architecture

Atomic design, strictly presentational components:

- **atoms** — smallest UI primitives (Button, Badge, TechChip, Heading, IconLink)
- **molecules** — composed from atoms (ProjectCard, CertificationCard, AchievementCard, NavLink)
- **organisms** — page sections composed from molecules/atoms (Navbar, Hero, ProjectsSection, CertificationsSection, SkillsGrid, ExperienceTimeline, ContactSection)
- **templates** — page-level layout composition (HomeTemplate, ProjectDetailTemplate)
- **pages** — route entries; call hooks for data, pass plain props down to templates

No component fetches data or owns side effects directly — that logic lives in hooks (`useProjects`, `useCertifications`, `useActiveSection` for scroll-spy nav highlighting, `useTheme` for dark/light mode). Components take props and render.

## State management

Local component state where genuinely scoped (e.g. mobile nav open/closed). A single `ThemeContext` for dark/light mode, since that's the one cross-cutting concern. No Redux/Zustand/query library — content is static imported data, not fetched async, so there's no server state to manage.

## Content model

Typed only where the shape is real domain data reused across components/hooks. Component props are typed where non-obvious from usage; no blanket `React.FC`, no speculative generics.

```ts
type Project = {
  slug: string;
  name: string;
  pitch: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  caseStudy: {
    problem: string;
    approach: string;
    decisions: string;
    outcome: string;
  };
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
};
```

`content/projects.ts` and `content/certifications.ts` ship with 1-2 clearly-placeholder-but-functional entries (including the Code Institute hackathon 2nd place as an Achievement) so the site renders meaningfully before real content is filled in. Real content gets gathered incrementally in `docs/content-notes.md`.

## Visual system

- **Color:** dark neutral base, accents from the "palette one" coolors export — purple (`#744FC6`) as primary interactive/link color, orange (`#EF8354`) as secondary highlight (CTAs, active states), mint (`#85FF9E`) reserved for sparing use (e.g. a verified indicator on certifications). 2-3 colors doing real work, not all five competing. Light mode is a Tailwind `dark:` inversion of the same system, not a separate design.
- **Typography:** one strong display typeface for headings (oversized, tight tracking) carries most of the visual personality; a clean system/sans stack for body copy. Hierarchy comes from type, not imagery/color blocking.
- **Layout:** bento-grid (`grid-cols-12` / `col-span-*`) for Skills and Certifications; Projects section uses a simpler stacked/2-column card list since each card needs room for pitch + stack chips + links.
- **Motion:** Framer Motion, restrained — scroll-reveal on section entry, hover states on cards/links, one small signature hover interaction (visual, not audio, for accessibility). No parallax, no heavy page-transition choreography.
- **Assets:** hackathon image used in Achievements. Palette PNGs in `assets/` remain design references only, not shipped assets.

## Non-functional requirements

- **Performance:** Vite route-based code-splitting (project detail pages lazy-loaded), lazy-loaded images. Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms — verified via Lighthouse before considering a build done.
- **Accessibility:** semantic HTML, full keyboard navigability, no motion-only affordances. No typewriter-style text animation (avoids the known screen-reader issue outright).
- **Error handling:** a project missing `liveUrl` simply omits that button rather than linking to nothing. Unknown project slugs 404 → redirect home. No contact form/backend to fail — contact is direct links (mailto etc.), so nothing to error-handle there.

## Testing

- **Storybook** — every atom/molecule/organism gets a story, covering key states, dark/light mode, and responsive viewports. This is where components are built and visually verified in isolation before being wired into pages/templates.
- **Playwright** — e2e coverage of flows that matter: home page renders and nav links scroll to the correct section, each project card navigates to its `/projects/:slug` page and back, external links (live demo/GitHub/cert verify) have correct `href`s and open in a new tab, dark/light toggle persists, mobile viewport renders without layout breaks.
- No unit-test suite for presentational components beyond Storybook — this isn't behavior-heavy code, and Storybook + Playwright cover the risk that actually exists.

## Explicitly out of scope (this spec)

- GitHub profile README — follow-up spec once the site is live and there's a real link to point to.
- Hosting/deployment configuration — platform not yet chosen.
- Blog/writing section — only worth adding if it'll be genuinely maintained; not part of v1.
- Real project/certification content — gathered incrementally in `docs/content-notes.md`, backed by CVs in `docs/private/` (gitignored).
