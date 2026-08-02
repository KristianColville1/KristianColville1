# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `frontend/` portfolio site (React + Vite + TypeScript + Tailwind CSS v4) described in `docs/superpowers/specs/2026-08-02-portfolio-design.md` — a single-page home with routed project case studies, dark-mode-first, atomic-design components, tested with Storybook (component-level) and Playwright (e2e flows).

**Architecture:** Atomic-design component tree (`atoms` → `molecules` → `organisms` → `templates` → `pages`) where every component is presentational and all logic/state lives in hooks (`useProjects`, `useCertifications`, `useTheme`, `useActiveSection`). Content is static typed data in `src/content/`, not a CMS. Routing via React Router: `/` is a single scrolling page, `/projects/:slug` is a lazy-loaded case-study page per project.

**Tech Stack:** React 18+, Vite, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme` config), React Router, Framer Motion, Storybook (`@storybook/react-vite`), Playwright.

## Global Constraints

- Dark mode is the default appearance; light mode is the Tailwind `dark:`-variant inversion, toggled manually and persisted to `localStorage` (not OS-detected).
- Accent colors are exactly `#744FC6` (purple, primary interactive), `#EF8354` (orange, secondary/CTA), `#85FF9E` (mint, sparing use e.g. verified indicators) — 2-3 colors doing real work, not all five source-palette colors.
- No typewriter-effect text, no animated stat/badge widgets, no heavy parallax or sound — motion is restrained (hover states, scroll-reveal only).
- Every component in `atoms/`, `molecules/`, `organisms/` gets a Storybook story; no separate unit-test framework is introduced.
- Playwright covers only the flows listed in this plan's tasks — it is not a general unit-test replacement.
- Content lives in typed static files under `src/content/`; no CMS, no MDX pipeline.
- State management is local component state plus a single `ThemeContext` — no Redux/Zustand/query library.
- Core Web Vitals lab targets: Lighthouse Performance score ≥ 90, LCP < 2.5s, CLS < 0.1, Total Blocking Time < 200ms (lab proxy for INP, which requires field data).
- GitHub profile README, hosting/deployment configuration, and a blog/writing section are explicitly out of scope for this plan.

---

### Task 1: Scaffold the Vite + React + TypeScript + Tailwind v4 project

**Files:**
- Create: `frontend/` (via Vite scaffold — `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`)
- Modify: `frontend/index.html`, `frontend/src/index.css`, `frontend/vite.config.ts`

**Interfaces:**
- Produces: Tailwind utility classes available in any `.tsx` file under `frontend/src/`; custom theme tokens `bg-accent-purple`, `text-accent-purple`, `bg-accent-orange`, `text-accent-orange`, `bg-accent-mint`, `text-accent-mint`, `font-display`, `font-body`; `dark:` variant driven by a `.dark` class on `<html>`.

- [ ] **Step 1: Scaffold the Vite React-TS project**

Run from the repo root:

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

- [ ] **Step 2: Install Tailwind CSS v4 and its Vite plugin**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Wire the Tailwind Vite plugin**

Replace the contents of `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 4: Configure Tailwind theme tokens and dark mode**

Replace the contents of `frontend/src/index.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-accent-purple: #744FC6;
  --color-accent-orange: #EF8354;
  --color-accent-mint: #85FF9E;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}

body {
  font-family: var(--font-body);
}
```

- [ ] **Step 5: Set the page title and load fonts**

Replace the contents of `frontend/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kristian Colville — Software Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Verify the build succeeds**

Run: `npm run build` (from `frontend/`)
Expected: build completes with no errors, `frontend/dist/` is created.

- [ ] **Step 7: Commit**

```bash
git add frontend
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind v4 frontend"
```

---

### Task 2: Set up Storybook

**Files:**
- Create: `frontend/.storybook/main.ts`, `frontend/.storybook/preview.ts`

**Interfaces:**
- Produces: `npm run storybook` launches Storybook on a local port with hot-reloading component stories from `src/**/*.stories.tsx`.

- [ ] **Step 1: Initialize Storybook**

Run from `frontend/`:

```bash
npx storybook@latest init
```

Accept the auto-detected React + Vite framework (`@storybook/react-vite`).

- [ ] **Step 2: Point stories at the atomic-design component tree**

Edit `frontend/.storybook/main.ts` so the `stories` glob covers the component tree we're about to build:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
```

- [ ] **Step 3: Remove the generated example stories**

```bash
rm -rf frontend/src/stories
```

- [ ] **Step 4: Verify Storybook runs**

Run: `npm run storybook` (from `frontend/`)
Expected: Storybook opens in the browser with an empty sidebar (no stories yet — the example ones were removed, and real components come in later tasks) and no build errors in the terminal.

- [ ] **Step 5: Commit**

```bash
git add frontend/.storybook frontend/package.json frontend/package-lock.json
git commit -m "chore: set up Storybook for the frontend"
```

---

### Task 3: Set up Playwright and a smoke test

**Files:**
- Create: `frontend/playwright.config.ts`, `frontend/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `npm run test:e2e` runs Playwright against a dev server it starts automatically.

- [ ] **Step 1: Install Playwright**

Run from `frontend/`:

```bash
npm init playwright@latest -- --quiet --browser=chromium --gitignore=false
```

When prompted, choose TypeScript and set the tests directory to `e2e`.

- [ ] **Step 2: Configure the dev server and test directory**

Replace the contents of `frontend/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
```

- [ ] **Step 3: Add an npm script**

In `frontend/package.json`, add to `"scripts"`:

```json
"test:e2e": "playwright test"
```

- [ ] **Step 4: Write the smoke test**

Create `frontend/e2e/smoke.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('home page loads with the expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Kristian Colville — Software Engineer');
});
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npm run test:e2e` (from `frontend/`)
Expected: 1 passed.

- [ ] **Step 6: Commit**

```bash
git add frontend/playwright.config.ts frontend/e2e frontend/package.json frontend/package-lock.json
git commit -m "chore: set up Playwright with a home page smoke test"
```

---

### Task 4: Content types, placeholder data, and content hooks

**Files:**
- Create: `frontend/src/content/types.ts`, `frontend/src/content/projects.ts`, `frontend/src/content/certifications.ts`, `frontend/src/content/achievements.ts`, `frontend/src/content/experience.ts`, `frontend/src/content/skills.ts`, `frontend/src/content/contact.ts`, `frontend/src/content/bio.ts`
- Create: `frontend/src/hooks/useProjects.ts`, `frontend/src/hooks/useCertifications.ts`

**Interfaces:**
- Produces: types `Project`, `Certification`, `Achievement`, `ExperienceEntry`, `SkillGroup`, `ContactLink` (all exported from `content/types.ts`); `useProjects(): Project[]`; `useCertifications(): Certification[]`; static exports `achievements: Achievement[]`, `experienceEntries: ExperienceEntry[]`, `skillGroups: SkillGroup[]`, `contactLinks: ContactLink[]`, `bio: { headline: string; about: string }`.

- [ ] **Step 1: Define the content types**

Create `frontend/src/content/types.ts`:

```typescript
export type Project = {
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

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
};

export type Achievement = {
  name: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;
  end: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};
```

- [ ] **Step 2: Add placeholder project data**

Create `frontend/src/content/projects.ts`:

```typescript
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'sample-project-one',
    name: 'Sample Project One',
    pitch: 'A placeholder project pitch — replace with a real one-line summary.',
    stack: ['React', 'TypeScript', 'Node.js'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/kristiancolville1/sample-project-one',
    caseStudy: {
      problem: 'Placeholder: what problem did this project solve?',
      approach: 'Placeholder: what was the approach and stack?',
      decisions: 'Placeholder: what were the key technical decisions and trade-offs?',
      outcome: 'Placeholder: what was the measurable outcome?',
    },
  },
  {
    slug: 'sample-project-two',
    name: 'Sample Project Two',
    pitch: 'A second placeholder project pitch.',
    stack: ['Python', 'PostgreSQL'],
    repoUrl: 'https://github.com/kristiancolville1/sample-project-two',
    caseStudy: {
      problem: 'Placeholder: what problem did this project solve?',
      approach: 'Placeholder: what was the approach and stack?',
      decisions: 'Placeholder: what were the key technical decisions and trade-offs?',
      outcome: 'Placeholder: what was the measurable outcome?',
    },
  },
];
```

- [ ] **Step 3: Add placeholder certification, achievement, experience, skills, contact and bio data**

Create `frontend/src/content/certifications.ts`:

```typescript
import type { Certification } from './types';

export const certifications: Certification[] = [
  {
    name: 'Sample Certification',
    issuer: 'Sample Issuer',
    date: '2024-01-01',
    verifyUrl: 'https://example.com/verify',
  },
];
```

Create `frontend/src/content/achievements.ts`:

```typescript
import type { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    name: 'Hackathon — 2nd Place',
    issuer: 'Code Institute',
    date: '2022-02-02',
    description: 'Placed 2nd in the January 2022 Code Institute hackathon.',
    image: '/images/hackathon-award.png',
  },
];
```

Create `frontend/src/content/experience.ts`:

```typescript
import type { ExperienceEntry } from './types';

export const experienceEntries: ExperienceEntry[] = [
  {
    role: 'Placeholder Role',
    company: 'Placeholder Company',
    start: '2023',
    end: 'Present',
    summary: 'Placeholder: outcome-focused summary of this role.',
  },
];
```

Create `frontend/src/content/skills.ts`:

```typescript
import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Python'] },
  { title: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite'] },
  { title: 'Backend', items: ['Node.js', 'PostgreSQL'] },
  { title: 'Tools', items: ['Git', 'Docker', 'Playwright'] },
];
```

Create `frontend/src/content/contact.ts`:

```typescript
import type { ContactLink } from './types';

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: 'mailto:kristiancolville96@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/kristiancolville1' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kristiancolville' },
];
```

Create `frontend/src/content/bio.ts`:

```typescript
export const bio = {
  headline: 'Software engineer building things that work.',
  about: 'Placeholder about paragraph — replace with a short, specific, human bio.',
};
```

- [ ] **Step 4: Add content hooks**

Create `frontend/src/hooks/useProjects.ts`:

```typescript
import { projects } from '../content/projects';
import type { Project } from '../content/types';

export function useProjects(): Project[] {
  return projects;
}
```

Create `frontend/src/hooks/useCertifications.ts`:

```typescript
import { certifications } from '../content/certifications';
import type { Certification } from '../content/types';

export function useCertifications(): Certification[] {
  return certifications;
}
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit` (from `frontend/`)
Expected: no type errors.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/content frontend/src/hooks
git commit -m "feat: add typed content data and content hooks"
```

---

### Task 5: Router, theme provider, and the app shell

**Files:**
- Create: `frontend/src/hooks/useTheme.tsx`, `frontend/src/pages/Home.tsx`, `frontend/src/pages/ProjectDetail.tsx`
- Modify: `frontend/src/App.tsx`, `frontend/src/main.tsx`

**Interfaces:**
- Consumes: `useProjects()` from Task 4.
- Produces: `ThemeProvider`, `useTheme(): { theme: 'light' | 'dark'; toggleTheme: () => void }` (both from `hooks/useTheme.tsx`); routes `/` and `/projects/:slug` with a catch-all redirect to `/`; `data-testid="home-page"` and `data-testid="project-detail-page"` markers used by e2e tests until later tasks replace them with real content.

- [ ] **Step 1: Install React Router and Framer Motion**

```bash
npm install react-router-dom framer-motion
```

- [ ] **Step 2: Write the failing e2e test for routing behavior**

Create `frontend/e2e/routing.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('unknown project slug redirects to home', async ({ page }) => {
  await page.goto('/projects/does-not-exist');
  await expect(page).toHaveURL('/');
  await expect(page.getByTestId('home-page')).toBeVisible();
});

test('known project slug stays on the project detail page', async ({ page }) => {
  await page.goto('/projects/sample-project-one');
  await expect(page.getByTestId('project-detail-page')).toBeVisible();
});
```

- [ ] **Step 3: Run the test and verify it fails**

Run: `npm run test:e2e -- routing` (from `frontend/`)
Expected: FAIL — the app doesn't have routing yet.

- [ ] **Step 4: Add the theme provider and hook**

Create `frontend/src/hooks/useTheme.tsx`:

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

- [ ] **Step 5: Add the Home and ProjectDetail pages**

Create `frontend/src/pages/Home.tsx`:

```tsx
export function Home() {
  return <div data-testid="home-page">Home Page</div>;
}
```

Create `frontend/src/pages/ProjectDetail.tsx`:

```tsx
import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <div data-testid="project-detail-page">{project.name}</div>;
}
```

- [ ] **Step 6: Wire up the app shell with routing and lazy-loaded project pages**

Replace the contents of `frontend/src/App.tsx`:

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Home } from './pages/Home';

const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })),
);

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

Replace the contents of `frontend/src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 7: Run the test and verify it passes**

Run: `npm run test:e2e -- routing` (from `frontend/`)
Expected: 2 passed.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/hooks/useTheme.tsx frontend/src/pages frontend/src/App.tsx frontend/src/main.tsx frontend/e2e/routing.spec.ts frontend/package.json frontend/package-lock.json
git commit -m "feat: add routing, theme provider, and app shell"
```

---

### Task 6: Atoms — Button, IconLink, Badge, TechChip, Heading, RevealSection

**Files:**
- Create: `frontend/src/components/atoms/Button.tsx`, `frontend/src/components/atoms/Button.stories.tsx`
- Create: `frontend/src/components/atoms/IconLink.tsx`, `frontend/src/components/atoms/IconLink.stories.tsx`
- Create: `frontend/src/components/atoms/Badge.tsx`, `frontend/src/components/atoms/Badge.stories.tsx`
- Create: `frontend/src/components/atoms/TechChip.tsx`, `frontend/src/components/atoms/TechChip.stories.tsx`
- Create: `frontend/src/components/atoms/Heading.tsx`, `frontend/src/components/atoms/Heading.stories.tsx`
- Create: `frontend/src/components/atoms/RevealSection.tsx`, `frontend/src/components/atoms/RevealSection.stories.tsx`

**Interfaces:**
- Consumes: `framer-motion` (installed in Task 5).
- Produces:
  - `Button({ children, variant?: 'primary' | 'secondary', href?, onClick?, className? })` — renders `<a>` if `href` given (external links get `target="_blank" rel="noopener noreferrer"`; in-page `#anchor` and `mailto:` links don't), else `<button>`.
  - `IconLink({ href: string, label: string })`
  - `Badge({ children, tone?: 'neutral' | 'success' })`
  - `TechChip({ label: string })`
  - `Heading({ level?: 1 | 2 | 3, children, className? })`
  - `RevealSection({ id: string, children, className? })` — renders a real `<section>` (via `motion.section`) that fades and slides in once when scrolled into view; every page section from Task 8 onward uses this instead of a plain `<section>` for the spec's "scroll-reveal on section entry" requirement.

- [ ] **Step 1: Build the Button atom**

Create `frontend/src/components/atoms/Button.tsx`:

```tsx
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent-orange text-neutral-950 hover:bg-accent-orange/90',
  secondary:
    'border border-accent-purple text-accent-purple hover:bg-accent-purple/10',
};

export function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    const isExternal = !href.startsWith('#') && !href.startsWith('mailto:');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

Create `frontend/src/components/atoms/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Get in touch', variant: 'primary', href: 'https://example.com' },
};

export const Secondary: Story = {
  args: { children: 'View source', variant: 'secondary', href: 'https://example.com' },
};

export const AsButton: Story = {
  args: { children: 'Toggle theme', variant: 'secondary' },
};
```

- [ ] **Step 2: Build the IconLink, Badge, TechChip and Heading atoms**

Create `frontend/src/components/atoms/IconLink.tsx`:

```tsx
type IconLinkProps = {
  href: string;
  label: string;
};

export function IconLink({ href, label }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-neutral-500 transition-colors hover:text-accent-purple dark:text-neutral-400"
    >
      {label}
    </a>
  );
}
```

Create `frontend/src/components/atoms/IconLink.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconLink } from './IconLink';

const meta: Meta<typeof IconLink> = {
  title: 'Atoms/IconLink',
  component: IconLink,
};
export default meta;

type Story = StoryObj<typeof IconLink>;

export const Default: Story = {
  args: { href: 'https://github.com/kristiancolville1', label: 'GitHub' },
};
```

Create `frontend/src/components/atoms/Badge.tsx`:

```tsx
import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success';
};

const TONE_CLASSES: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  success: 'bg-accent-mint/20 text-accent-mint',
};

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}
```

Create `frontend/src/components/atoms/Badge.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { children: 'New', tone: 'neutral' } };
export const Success: Story = { args: { children: 'Verified', tone: 'success' } };
```

Create `frontend/src/components/atoms/TechChip.tsx`:

```tsx
type TechChipProps = {
  label: string;
};

export function TechChip({ label }: TechChipProps) {
  return (
    <span className="rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
      {label}
    </span>
  );
}
```

Create `frontend/src/components/atoms/TechChip.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechChip } from './TechChip';

const meta: Meta<typeof TechChip> = {
  title: 'Atoms/TechChip',
  component: TechChip,
};
export default meta;

type Story = StoryObj<typeof TechChip>;

export const Default: Story = { args: { label: 'TypeScript' } };
```

Create `frontend/src/components/atoms/Heading.tsx`:

```tsx
import type { ReactNode } from 'react';

type HeadingProps = {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
};

const LEVEL_CLASSES: Record<NonNullable<HeadingProps['level']>, string> = {
  1: 'text-4xl md:text-6xl font-bold tracking-tight',
  2: 'text-2xl md:text-4xl font-bold tracking-tight',
  3: 'text-lg md:text-xl font-semibold',
};

export function Heading({ level = 2, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  return (
    <Tag className={`font-display text-neutral-900 dark:text-neutral-50 ${LEVEL_CLASSES[level]} ${className}`}>
      {children}
    </Tag>
  );
}
```

Create `frontend/src/components/atoms/Heading.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = { args: { level: 1, children: 'Software engineer building things that work.' } };
export const H2: Story = { args: { level: 2, children: 'Projects' } };
export const H3: Story = { args: { level: 3, children: 'Problem' } };
```

- [ ] **Step 3: Build the RevealSection atom**

Create `frontend/src/components/atoms/RevealSection.tsx`:

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function RevealSection({ id, children, className = '' }: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
```

Create `frontend/src/components/atoms/RevealSection.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RevealSection } from './RevealSection';

const meta: Meta<typeof RevealSection> = {
  title: 'Atoms/RevealSection',
  component: RevealSection,
};
export default meta;

type Story = StoryObj<typeof RevealSection>;

export const Default: Story = {
  args: { id: 'preview', children: <p className="p-6">Scroll me into view to see the reveal animation.</p> },
};
```

- [ ] **Step 4: Verify in Storybook**

Run: `npm run storybook` (from `frontend/`)
Expected: `Atoms/Button`, `Atoms/IconLink`, `Atoms/Badge`, `Atoms/TechChip`, `Atoms/Heading`, and `Atoms/RevealSection` all appear in the sidebar and render without errors; toggle the Storybook toolbar's background/theme control to confirm both light and dark look correct; scrolling `Atoms/RevealSection` out of and back into view replays the fade/slide-in.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/atoms
git commit -m "feat: add Button, IconLink, Badge, TechChip, Heading and RevealSection atoms"
```

---

### Task 7: useActiveSection hook, NavLink, and the Navbar

**Files:**
- Create: `frontend/src/hooks/useActiveSection.ts`
- Create: `frontend/src/components/molecules/NavLink.tsx`, `frontend/src/components/molecules/NavLink.stories.tsx`
- Create: `frontend/src/components/organisms/Navbar.tsx`, `frontend/src/components/organisms/Navbar.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Button` from Task 6.
- Produces: `useActiveSection(sectionIds: string[]): string`; `NavLink({ href, label, active })`; `Navbar()` (no props — reads `useTheme()` and `useActiveSection()` itself, since scroll/theme state is intrinsic UI behavior, not page data).

- [ ] **Step 1: Write the failing e2e test for the navbar**

Create `frontend/e2e/navbar.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('theme toggle switches and persists dark mode', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('button', { name: /light mode/i }).click();
  await expect(html).not.toHaveClass(/dark/);

  await page.reload();
  await expect(html).not.toHaveClass(/dark/);
});

test('nav links are present for every section', async ({ page }) => {
  await page.goto('/');
  for (const label of ['About', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Experience', 'Contact']) {
    await expect(page.getByRole('link', { name: label })).toBeVisible();
  }
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm run test:e2e -- navbar` (from `frontend/`)
Expected: FAIL — there's no navbar yet.

- [ ] **Step 3: Add the scroll-spy hook**

Create `frontend/src/hooks/useActiveSection.ts`:

```typescript
import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

- [ ] **Step 4: Add the NavLink molecule**

Create `frontend/src/components/molecules/NavLink.tsx`:

```tsx
type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

export function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        active ? 'text-accent-orange' : 'text-neutral-600 hover:text-accent-orange dark:text-neutral-300'
      }`}
    >
      {label}
    </a>
  );
}
```

Create `frontend/src/components/molecules/NavLink.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLink } from './NavLink';

const meta: Meta<typeof NavLink> = {
  title: 'Molecules/NavLink',
  component: NavLink,
};
export default meta;

type Story = StoryObj<typeof NavLink>;

export const Inactive: Story = { args: { href: '#about', label: 'About', active: false } };
export const Active: Story = { args: { href: '#about', label: 'About', active: true } };
```

- [ ] **Step 5: Add the Navbar organism**

Create `frontend/src/components/organisms/Navbar.tsx`:

```tsx
import { NavLink } from '../molecules/NavLink';
import { Button } from '../atoms/Button';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../hooks/useTheme';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const activeId = useActiveSection(SECTIONS.map((section) => section.id));
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="flex flex-wrap gap-6">
        {SECTIONS.map((section) => (
          <NavLink key={section.id} href={`#${section.id}`} label={section.label} active={activeId === section.id} />
        ))}
      </div>
      <Button variant="secondary" onClick={toggleTheme}>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </Button>
    </nav>
  );
}
```

Create `frontend/src/components/organisms/Navbar.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
```

- [ ] **Step 6: Wire the Navbar into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';

export function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
    </div>
  );
}
```

- [ ] **Step 7: Run the test and verify it passes**

Run: `npm run test:e2e -- navbar` (from `frontend/`)
Expected: 2 passed.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/hooks/useActiveSection.ts frontend/src/components/molecules/NavLink.tsx frontend/src/components/molecules/NavLink.stories.tsx frontend/src/components/organisms/Navbar.tsx frontend/src/components/organisms/Navbar.stories.tsx frontend/src/pages/Home.tsx frontend/e2e/navbar.spec.ts
git commit -m "feat: add scroll-spy navbar with theme toggle"
```

---

### Task 8: Hero and About organisms

**Files:**
- Create: `frontend/src/components/organisms/Hero.tsx`, `frontend/src/components/organisms/Hero.stories.tsx`
- Create: `frontend/src/components/organisms/About.tsx`, `frontend/src/components/organisms/About.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Heading`, `Button`, `RevealSection` from Task 6; `bio` from Task 4.
- Produces: `Hero({ headline: string })`; `About({ about: string })`.

- [ ] **Step 1: Build the Hero organism**

Create `frontend/src/components/organisms/Hero.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { RevealSection } from '../atoms/RevealSection';

type HeroProps = {
  headline: string;
};

export function Hero({ headline }: HeroProps) {
  return (
    <RevealSection id="hero" className="flex flex-col gap-6 px-6 py-24 md:py-32">
      <Heading level={1}>{headline}</Heading>
      <Button href="#contact" variant="primary" className="w-fit">
        Get in touch
      </Button>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/Hero.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: { headline: 'Software engineer building things that work.' },
};
```

- [ ] **Step 2: Build the About organism**

Create `frontend/src/components/organisms/About.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';

type AboutProps = {
  about: string;
};

export function About({ about }: AboutProps) {
  return (
    <RevealSection id="about" className="px-6 py-16">
      <Heading level={2}>About</Heading>
      <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">{about}</p>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/About.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { About } from './About';

const meta: Meta<typeof About> = {
  title: 'Organisms/About',
  component: About,
};
export default meta;

type Story = StoryObj<typeof About>;

export const Default: Story = {
  args: { about: 'Placeholder about paragraph — replace with a short, specific, human bio.' },
};
```

- [ ] **Step 3: Wire Hero and About into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { bio } from '../content/bio';

export function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
    </div>
  );
}
```

- [ ] **Step 4: Verify in Storybook and the browser**

Run: `npm run storybook` — confirm `Organisms/Hero` and `Organisms/About` render.
Run: `npm run dev` — visit `http://localhost:5173`, confirm the hero headline and About section render below the navbar.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/organisms/Hero.tsx frontend/src/components/organisms/Hero.stories.tsx frontend/src/components/organisms/About.tsx frontend/src/components/organisms/About.stories.tsx frontend/src/pages/Home.tsx
git commit -m "feat: add Hero and About sections"
```

---

### Task 9: ProjectCard and ProjectsSection

**Files:**
- Create: `frontend/src/components/molecules/ProjectCard.tsx`, `frontend/src/components/molecules/ProjectCard.stories.tsx`
- Create: `frontend/src/components/organisms/ProjectsSection.tsx`, `frontend/src/components/organisms/ProjectsSection.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `TechChip`, `Button`, `Heading` from Task 6; `Project` type and `useProjects()` from Task 4.
- Produces: `ProjectCard({ project: Project })`; `ProjectsSection({ projects: Project[] })`.

- [ ] **Step 1: Build the ProjectCard molecule**

Create `frontend/src/components/molecules/ProjectCard.tsx`:

```tsx
import { Link } from 'react-router-dom';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import type { Project } from '../../content/types';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
      <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-50">{project.name}</h3>
      <p className="text-neutral-600 dark:text-neutral-300">{project.pitch}</p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-accent-purple hover:underline">
          Read case study
        </Link>
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="primary">
            Live demo
          </Button>
        )}
        <Button href={project.repoUrl} variant="secondary">
          GitHub
        </Button>
      </div>
    </article>
  );
}
```

Create `frontend/src/components/molecules/ProjectCard.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const WithLiveDemo: Story = {
  args: {
    project: {
      slug: 'sample-project-one',
      name: 'Sample Project One',
      pitch: 'A placeholder project pitch.',
      stack: ['React', 'TypeScript'],
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/kristiancolville1/sample-project-one',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};

export const WithoutLiveDemo: Story = {
  args: {
    project: {
      slug: 'sample-project-two',
      name: 'Sample Project Two',
      pitch: 'A second placeholder project pitch.',
      stack: ['Python', 'PostgreSQL'],
      repoUrl: 'https://github.com/kristiancolville1/sample-project-two',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};
```

- [ ] **Step 2: Build the ProjectsSection organism**

Create `frontend/src/components/organisms/ProjectsSection.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { ProjectCard } from '../molecules/ProjectCard';
import type { Project } from '../../content/types';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <RevealSection id="projects" className="px-6 py-16">
      <Heading level={2}>Projects</Heading>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/ProjectsSection.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProjectsSection } from './ProjectsSection';
import { projects } from '../../content/projects';

const meta: Meta<typeof ProjectsSection> = {
  title: 'Organisms/ProjectsSection',
  component: ProjectsSection,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};
export default meta;

type Story = StoryObj<typeof ProjectsSection>;

export const Default: Story = { args: { projects } };
```

- [ ] **Step 3: Wire ProjectsSection into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { bio } from '../content/bio';
import { useProjects } from '../hooks/useProjects';

export function Home() {
  const projects = useProjects();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
```

- [ ] **Step 4: Verify in Storybook and the browser**

Run: `npm run storybook` — confirm `Molecules/ProjectCard` (both stories) and `Organisms/ProjectsSection` render, with the "Live demo" button only appearing on the `WithLiveDemo` story.
Run: `npm run dev` — visit `http://localhost:5173`, confirm both sample projects render as cards.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/molecules/ProjectCard.tsx frontend/src/components/molecules/ProjectCard.stories.tsx frontend/src/components/organisms/ProjectsSection.tsx frontend/src/components/organisms/ProjectsSection.stories.tsx frontend/src/pages/Home.tsx
git commit -m "feat: add project cards and the projects section"
```

---

### Task 10: ProjectDetailTemplate and the real ProjectDetail page

**Files:**
- Create: `frontend/src/components/templates/ProjectDetailTemplate.tsx`
- Modify: `frontend/src/pages/ProjectDetail.tsx`

**Interfaces:**
- Consumes: `Heading`, `TechChip`, `Button` from Task 6; `Project` type from Task 4; `ProjectsSection` (already wired into Home in Task 9, giving the "Read case study" link this task's e2e test navigates through).
- Produces: `ProjectDetailTemplate({ project: Project })`.

- [ ] **Step 1: Write the failing e2e test for the project detail flow**

Create `frontend/e2e/project-detail.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('navigating from a project card opens its case study and links back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read case study' }).first().click();

  await expect(page).toHaveURL(/\/projects\/sample-project-one/);
  await expect(page.getByRole('heading', { name: 'Sample Project One' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/kristiancolville1/sample-project-one',
  );

  await page.getByRole('link', { name: '← Back home' }).click();
  await expect(page).toHaveURL('/');
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm run test:e2e -- project-detail` (from `frontend/`)
Expected: FAIL — the detail page only shows a placeholder name, with no heading role or back link.

- [ ] **Step 3: Build the ProjectDetailTemplate**

Create `frontend/src/components/templates/ProjectDetailTemplate.tsx`:

```tsx
import { Link } from 'react-router-dom';
import { Heading } from '../atoms/Heading';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import type { Project } from '../../content/types';

type ProjectDetailTemplateProps = {
  project: Project;
};

export function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-sm text-accent-purple hover:underline">
        ← Back home
      </Link>
      <Heading level={1} className="mt-4">
        {project.name}
      </Heading>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="primary">
            Live demo
          </Button>
        )}
        <Button href={project.repoUrl} variant="secondary">
          GitHub
        </Button>
      </div>

      <section className="mt-10 space-y-8">
        <div>
          <Heading level={3}>Problem</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.problem}</p>
        </div>
        <div>
          <Heading level={3}>Approach</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.approach}</p>
        </div>
        <div>
          <Heading level={3}>Key decisions</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.decisions}</p>
        </div>
        <div>
          <Heading level={3}>Outcome</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.outcome}</p>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 4: Wire it into the ProjectDetail page**

Replace the contents of `frontend/src/pages/ProjectDetail.tsx`:

```tsx
import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ProjectDetailTemplate } from '../components/templates/ProjectDetailTemplate';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectDetailTemplate project={project} />;
}
```

- [ ] **Step 5: Run the test and verify it passes**

Run: `npm run test:e2e -- project-detail` (from `frontend/`)
Expected: 1 passed.

- [ ] **Step 6: Also re-run the routing test from Task 5**

Run: `npm run test:e2e -- routing`
Expected: 2 passed — confirms the redirect behavior still holds now that the detail page renders real content.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/templates/ProjectDetailTemplate.tsx frontend/src/pages/ProjectDetail.tsx frontend/e2e/project-detail.spec.ts
git commit -m "feat: add the project case-study detail page"
```

---

### Task 11: SkillsGrid organism

**Files:**
- Create: `frontend/src/components/organisms/SkillsGrid.tsx`, `frontend/src/components/organisms/SkillsGrid.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Heading`, `TechChip` from Task 6; `SkillGroup` type and `skillGroups` from Task 4.
- Produces: `SkillsGrid({ groups: SkillGroup[] })`.

- [ ] **Step 1: Build the SkillsGrid organism**

Create `frontend/src/components/organisms/SkillsGrid.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { TechChip } from '../atoms/TechChip';
import { RevealSection } from '../atoms/RevealSection';
import type { SkillGroup } from '../../content/types';

type SkillsGridProps = {
  groups: SkillGroup[];
};

export function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <RevealSection id="skills" className="px-6 py-16">
      <Heading level={2}>Skills</Heading>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechChip key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/SkillsGrid.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillsGrid } from './SkillsGrid';
import { skillGroups } from '../../content/skills';

const meta: Meta<typeof SkillsGrid> = {
  title: 'Organisms/SkillsGrid',
  component: SkillsGrid,
};
export default meta;

type Story = StoryObj<typeof SkillsGrid>;

export const Default: Story = { args: { groups: skillGroups } };
```

- [ ] **Step 2: Wire SkillsGrid into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { useProjects } from '../hooks/useProjects';

export function Home() {
  const projects = useProjects();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
```

- [ ] **Step 3: Verify in Storybook and the browser**

Run: `npm run storybook` — confirm `Organisms/SkillsGrid` renders a 4-column grid on wide viewports and reflows to fewer columns when the Storybook viewport is narrowed.
Run: `npm run dev` — confirm the Skills section renders between About and Projects.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/organisms/SkillsGrid.tsx frontend/src/components/organisms/SkillsGrid.stories.tsx frontend/src/pages/Home.tsx
git commit -m "feat: add the skills bento grid"
```

---

### Task 12: CertificationCard and CertificationsSection

**Files:**
- Create: `frontend/src/components/molecules/CertificationCard.tsx`, `frontend/src/components/molecules/CertificationCard.stories.tsx`
- Create: `frontend/src/components/organisms/CertificationsSection.tsx`, `frontend/src/components/organisms/CertificationsSection.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Badge`, `Button`, `Heading` from Task 6; `Certification` type and `useCertifications()` from Task 4.
- Produces: `CertificationCard({ certification: Certification })`; `CertificationsSection({ certifications: Certification[] })`.

- [ ] **Step 1: Write the failing e2e test for certification links**

Create `frontend/e2e/certifications.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('certification verify link opens in a new tab with the correct URL', async ({ page }) => {
  await page.goto('/');
  const verifyLink = page.getByRole('link', { name: 'Verify' }).first();
  await expect(verifyLink).toHaveAttribute('href', 'https://example.com/verify');
  await expect(verifyLink).toHaveAttribute('target', '_blank');
  await expect(verifyLink).toHaveAttribute('rel', 'noopener noreferrer');
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm run test:e2e -- certifications` (from `frontend/`)
Expected: FAIL — there's no certifications section yet.

- [ ] **Step 3: Build the CertificationCard molecule**

Create `frontend/src/components/molecules/CertificationCard.tsx`:

```tsx
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import type { Certification } from '../../content/types';

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{certification.name}</h3>
        {certification.verifyUrl && <Badge tone="success">Verified</Badge>}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {certification.issuer} · {certification.date}
      </p>
      {certification.verifyUrl && (
        <Button href={certification.verifyUrl} variant="secondary" className="w-fit">
          Verify
        </Button>
      )}
    </div>
  );
}
```

Create `frontend/src/components/molecules/CertificationCard.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationCard } from './CertificationCard';

const meta: Meta<typeof CertificationCard> = {
  title: 'Molecules/CertificationCard',
  component: CertificationCard,
};
export default meta;

type Story = StoryObj<typeof CertificationCard>;

export const WithVerifyLink: Story = {
  args: {
    certification: {
      name: 'Sample Certification',
      issuer: 'Sample Issuer',
      date: '2024-01-01',
      verifyUrl: 'https://example.com/verify',
    },
  },
};

export const WithoutVerifyLink: Story = {
  args: {
    certification: { name: 'Unverified Certification', issuer: 'Sample Issuer', date: '2023-06-01' },
  },
};
```

- [ ] **Step 4: Build the CertificationsSection organism**

Create `frontend/src/components/organisms/CertificationsSection.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { CertificationCard } from '../molecules/CertificationCard';
import type { Certification } from '../../content/types';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <RevealSection id="certifications" className="px-6 py-16">
      <Heading level={2}>Certifications</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CertificationCard key={cert.name} certification={cert} />
        ))}
      </div>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/CertificationsSection.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationsSection } from './CertificationsSection';
import { certifications } from '../../content/certifications';

const meta: Meta<typeof CertificationsSection> = {
  title: 'Organisms/CertificationsSection',
  component: CertificationsSection,
};
export default meta;

type Story = StoryObj<typeof CertificationsSection>;

export const Default: Story = { args: { certifications } };
```

- [ ] **Step 5: Wire CertificationsSection into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { CertificationsSection } from '../components/organisms/CertificationsSection';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
    </div>
  );
}
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `npm run test:e2e -- certifications` (from `frontend/`)
Expected: 1 passed.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/molecules/CertificationCard.tsx frontend/src/components/molecules/CertificationCard.stories.tsx frontend/src/components/organisms/CertificationsSection.tsx frontend/src/components/organisms/CertificationsSection.stories.tsx frontend/src/pages/Home.tsx frontend/e2e/certifications.spec.ts
git commit -m "feat: add certifications section with verification links"
```

---

### Task 13: AchievementCard and AchievementsSection

**Files:**
- Create: `frontend/src/components/molecules/AchievementCard.tsx`, `frontend/src/components/molecules/AchievementCard.stories.tsx`
- Create: `frontend/src/components/organisms/AchievementsSection.tsx`, `frontend/src/components/organisms/AchievementsSection.stories.tsx`
- Create: `frontend/public/images/hackathon-award.png` (copied from `assets/images/`)
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Heading` from Task 6; `Achievement` type and `achievements` from Task 4.
- Produces: `AchievementCard({ achievement: Achievement })`; `AchievementsSection({ achievements: Achievement[] })`.

- [ ] **Step 1: Copy the hackathon image into the frontend's public assets**

```bash
mkdir -p frontend/public/images
cp "assets/images/Code Institute - January 2022 Hackathon 2nd Place - 2022-02-02 (1).png" "frontend/public/images/hackathon-award.png"
```

- [ ] **Step 2: Build the AchievementCard molecule**

Create `frontend/src/components/molecules/AchievementCard.tsx`:

```tsx
import type { Achievement } from '../../content/types';

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      {achievement.image && (
        <img
          src={achievement.image}
          alt={achievement.name}
          loading="lazy"
          className="h-40 w-full rounded-md object-cover"
        />
      )}
      <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{achievement.name}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {achievement.issuer} · {achievement.date}
      </p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{achievement.description}</p>
    </div>
  );
}
```

Create `frontend/src/components/molecules/AchievementCard.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementCard } from './AchievementCard';

const meta: Meta<typeof AchievementCard> = {
  title: 'Molecules/AchievementCard',
  component: AchievementCard,
};
export default meta;

type Story = StoryObj<typeof AchievementCard>;

export const Default: Story = {
  args: {
    achievement: {
      name: 'Hackathon — 2nd Place',
      issuer: 'Code Institute',
      date: '2022-02-02',
      description: 'Placed 2nd in the January 2022 Code Institute hackathon.',
      image: '/images/hackathon-award.png',
    },
  },
};
```

- [ ] **Step 3: Build the AchievementsSection organism**

Create `frontend/src/components/organisms/AchievementsSection.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { AchievementCard } from '../molecules/AchievementCard';
import type { Achievement } from '../../content/types';

type AchievementsSectionProps = {
  achievements: Achievement[];
};

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <RevealSection id="achievements" className="px-6 py-16">
      <Heading level={2}>Achievements</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/AchievementsSection.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementsSection } from './AchievementsSection';
import { achievements } from '../../content/achievements';

const meta: Meta<typeof AchievementsSection> = {
  title: 'Organisms/AchievementsSection',
  component: AchievementsSection,
};
export default meta;

type Story = StoryObj<typeof AchievementsSection>;

export const Default: Story = { args: { achievements } };
```

- [ ] **Step 4: Wire AchievementsSection into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { CertificationsSection } from '../components/organisms/CertificationsSection';
import { AchievementsSection } from '../components/organisms/AchievementsSection';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { achievements } from '../content/achievements';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
    </div>
  );
}
```

- [ ] **Step 5: Verify in Storybook and the browser**

Run: `npm run storybook` — confirm `Molecules/AchievementCard` and `Organisms/AchievementsSection` render, with the hackathon image visible.
Run: `npm run dev` — confirm the Achievements section renders with the image between Certifications and (eventually) Experience.

- [ ] **Step 6: Commit**

```bash
git add frontend/public/images/hackathon-award.png frontend/src/components/molecules/AchievementCard.tsx frontend/src/components/molecules/AchievementCard.stories.tsx frontend/src/components/organisms/AchievementsSection.tsx frontend/src/components/organisms/AchievementsSection.stories.tsx frontend/src/pages/Home.tsx
git commit -m "feat: add achievements section with hackathon award"
```

---

### Task 14: ExperienceTimeline organism

**Files:**
- Create: `frontend/src/components/organisms/ExperienceTimeline.tsx`, `frontend/src/components/organisms/ExperienceTimeline.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Heading` from Task 6; `ExperienceEntry` type and `experienceEntries` from Task 4.
- Produces: `ExperienceTimeline({ entries: ExperienceEntry[] })`.

- [ ] **Step 1: Build the ExperienceTimeline organism**

Create `frontend/src/components/organisms/ExperienceTimeline.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { ExperienceEntry } from '../../content/types';

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <RevealSection id="experience" className="px-6 py-16">
      <Heading level={2}>Experience</Heading>
      <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.start}`}>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">
              {entry.role} · {entry.company}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.start} — {entry.end}
            </p>
            <p className="mt-1 text-neutral-700 dark:text-neutral-300">{entry.summary}</p>
          </li>
        ))}
      </ol>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/ExperienceTimeline.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExperienceTimeline } from './ExperienceTimeline';
import { experienceEntries } from '../../content/experience';

const meta: Meta<typeof ExperienceTimeline> = {
  title: 'Organisms/ExperienceTimeline',
  component: ExperienceTimeline,
};
export default meta;

type Story = StoryObj<typeof ExperienceTimeline>;

export const Default: Story = { args: { entries: experienceEntries } };
```

- [ ] **Step 2: Wire ExperienceTimeline into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { CertificationsSection } from '../components/organisms/CertificationsSection';
import { AchievementsSection } from '../components/organisms/AchievementsSection';
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ExperienceTimeline entries={experienceEntries} />
    </div>
  );
}
```

- [ ] **Step 3: Verify in Storybook and the browser**

Run: `npm run storybook` — confirm `Organisms/ExperienceTimeline` renders.
Run: `npm run dev` — confirm the Experience section renders after Achievements.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/organisms/ExperienceTimeline.tsx frontend/src/components/organisms/ExperienceTimeline.stories.tsx frontend/src/pages/Home.tsx
git commit -m "feat: add experience timeline"
```

---

### Task 15: ContactSection organism

**Files:**
- Create: `frontend/src/components/organisms/ContactSection.tsx`, `frontend/src/components/organisms/ContactSection.stories.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Heading` from Task 6; `ContactLink` type and `contactLinks` from Task 4.
- Produces: `ContactSection({ links: ContactLink[] })`.

- [ ] **Step 1: Write the failing e2e tests for contact links and the hero CTA**

Create `frontend/e2e/contact.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('contact section exposes working links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:kristiancolville96@gmail.com',
  );
  await expect(page.getByRole('link', { name: 'GitHub' }).last()).toHaveAttribute(
    'href',
    'https://github.com/kristiancolville1',
  );
});

test('hero CTA scrolls to the contact section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get in touch' }).click();
  await expect(page).toHaveURL(/#contact$/);
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm run test:e2e -- contact` (from `frontend/`)
Expected: FAIL — there's no contact section for the hero CTA to scroll to yet.

- [ ] **Step 3: Build the ContactSection organism**

Create `frontend/src/components/organisms/ContactSection.tsx`:

```tsx
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { ContactLink } from '../../content/types';

type ContactSectionProps = {
  links: ContactLink[];
};

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <RevealSection id="contact" className="px-6 py-24 text-center">
      <Heading level={2}>Get in touch</Heading>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {links.map((link) => {
          const isExternal = !link.href.startsWith('mailto:');
          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-accent-purple hover:underline"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </RevealSection>
  );
}
```

Create `frontend/src/components/organisms/ContactSection.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';
import { contactLinks } from '../../content/contact';

const meta: Meta<typeof ContactSection> = {
  title: 'Organisms/ContactSection',
  component: ContactSection,
};
export default meta;

type Story = StoryObj<typeof ContactSection>;

export const Default: Story = { args: { links: contactLinks } };
```

- [ ] **Step 4: Wire ContactSection into the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { CertificationsSection } from '../components/organisms/CertificationsSection';
import { AchievementsSection } from '../components/organisms/AchievementsSection';
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline';
import { ContactSection } from '../components/organisms/ContactSection';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { contactLinks } from '../content/contact';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ExperienceTimeline entries={experienceEntries} />
      <ContactSection links={contactLinks} />
    </div>
  );
}
```

- [ ] **Step 5: Run the tests and verify they pass**

Run: `npm run test:e2e -- contact` (from `frontend/`)
Expected: 2 passed.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/organisms/ContactSection.tsx frontend/src/components/organisms/ContactSection.stories.tsx frontend/src/pages/Home.tsx frontend/e2e/contact.spec.ts
git commit -m "feat: add contact section and wire up the hero CTA anchor"
```

---

### Task 16: Extract HomeTemplate and verify full-page assembly

**Files:**
- Create: `frontend/src/components/templates/HomeTemplate.tsx`
- Modify: `frontend/src/pages/Home.tsx`

**Interfaces:**
- Consumes: every organism from Tasks 7-15; all content types and data from Task 4.
- Produces: `HomeTemplate({ headline, about, skillGroups, projects, certifications, achievements, experienceEntries, contactLinks })` — the presentational composition root for the home page, matching the atomic-design `templates` layer from the spec. `Home.tsx` becomes a thin page that only fetches data and hands it down.

- [ ] **Step 1: Write the failing e2e test for full-page assembly**

Create `frontend/e2e/home.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('home page renders every section in order', async ({ page }) => {
  await page.goto('/');
  const sectionIds = await page
    .locator('section[id]')
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionIds).toEqual([
    'hero',
    'about',
    'skills',
    'projects',
    'certifications',
    'achievements',
    'experience',
    'contact',
  ]);
});

test('mobile viewport renders without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
```

- [ ] **Step 2: Run the test and verify the section-order assertion passes but confirm the file structure doesn't yet match the spec**

Run: `npm run test:e2e -- home` (from `frontend/`)
Expected: both pass already (Home.tsx renders all sections in order from Task 15) — this task's real deliverable is the refactor in Step 3, which must keep these tests green.

- [ ] **Step 3: Extract HomeTemplate**

Create `frontend/src/components/templates/HomeTemplate.tsx`:

```tsx
import { Navbar } from '../organisms/Navbar';
import { Hero } from '../organisms/Hero';
import { About } from '../organisms/About';
import { SkillsGrid } from '../organisms/SkillsGrid';
import { ProjectsSection } from '../organisms/ProjectsSection';
import { CertificationsSection } from '../organisms/CertificationsSection';
import { AchievementsSection } from '../organisms/AchievementsSection';
import { ExperienceTimeline } from '../organisms/ExperienceTimeline';
import { ContactSection } from '../organisms/ContactSection';
import type {
  Project,
  Certification,
  Achievement,
  ExperienceEntry,
  SkillGroup,
  ContactLink,
} from '../../content/types';

type HomeTemplateProps = {
  headline: string;
  about: string;
  skillGroups: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  experienceEntries: ExperienceEntry[];
  contactLinks: ContactLink[];
};

export function HomeTemplate({
  headline,
  about,
  skillGroups,
  projects,
  certifications,
  achievements,
  experienceEntries,
  contactLinks,
}: HomeTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={headline} />
      <About about={about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ExperienceTimeline entries={experienceEntries} />
      <ContactSection links={contactLinks} />
    </div>
  );
}
```

- [ ] **Step 4: Slim down the Home page**

Replace the contents of `frontend/src/pages/Home.tsx`:

```tsx
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { contactLinks } from '../content/contact';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <HomeTemplate
      headline={bio.headline}
      about={bio.about}
      skillGroups={skillGroups}
      projects={projects}
      certifications={certifications}
      achievements={achievements}
      experienceEntries={experienceEntries}
      contactLinks={contactLinks}
    />
  );
}
```

- [ ] **Step 5: Run the full e2e suite and verify everything still passes**

Run: `npm run test:e2e` (from `frontend/`)
Expected: all tests across `smoke`, `routing`, `navbar`, `project-detail`, `certifications`, `contact`, and `home` specs pass.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/templates/HomeTemplate.tsx frontend/src/pages/Home.tsx frontend/e2e/home.spec.ts
git commit -m "refactor: extract HomeTemplate and slim down the Home page"
```

---

### Task 17: Performance and accessibility QA pass

**Files:**
- None created or modified up front — this task audits the built site against the Global Constraints' Core Web Vitals targets and fixes anything that fails.

**Interfaces:**
- Consumes: the full site built in Tasks 1-16.
- Produces: a passing Lighthouse audit against the thresholds in Global Constraints.

- [ ] **Step 1: Build and preview the production bundle**

```bash
npm run build
npm run preview -- --port 4173
```

Leave this running in one terminal.

- [ ] **Step 2: Run Lighthouse against the preview server**

In a second terminal, from `frontend/`:

```bash
npx lighthouse http://localhost:4173 --preset=desktop --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"
```

- [ ] **Step 3: Check the results against the thresholds**

Open `frontend/lighthouse-report.json` and check:
- `categories.performance.score` ≥ 0.9
- `audits['largest-contentful-paint'].numericValue` < 2500 (ms)
- `audits['cumulative-layout-shift'].numericValue` < 0.1
- `audits['total-blocking-time'].numericValue` < 200 (ms) — lab proxy for INP

- [ ] **Step 4: Fix any failing metric**

If LCP fails: confirm `frontend/public/images/hackathon-award.png` (added in Task 13) is reasonably sized (under ~200KB) — recompress it with an image tool if not, since it's currently the largest image on the page and already has `loading="lazy"` applied.
If CLS fails: check that the `<img>` in `AchievementCard` (Task 13) has explicit `width`/`height` attributes matching its rendered `h-40` box so the browser can reserve space before the image loads — add them if missing.
If TBT fails: confirm the `ProjectDetail` route is still lazy-loaded (`lazy(() => import('./pages/ProjectDetail'))` in `frontend/src/App.tsx` from Task 5) so its code isn't in the initial bundle.

- [ ] **Step 5: Re-run Lighthouse after any fixes and confirm it passes**

Run: `npx lighthouse http://localhost:4173 --preset=desktop --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"`
Expected: all four thresholds from Step 3 pass.

- [ ] **Step 6: Remove the report file and commit any fixes**

```bash
rm frontend/lighthouse-report.json
git add -A
git commit -m "perf: pass Lighthouse Core Web Vitals thresholds" --allow-empty
```

(If Step 4 required no fixes, this commit will be empty — that's expected; `--allow-empty` lets the QA pass still be recorded in history.)
