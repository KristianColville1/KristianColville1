# Research: What Makes a Great Software Engineer Portfolio (2025-2026)

Findings from a research pass done while designing the portfolio site (see `docs/superpowers/specs/2026-08-02-portfolio-design.md`).

## 1. Content & structure

Best portfolios converge on: a sharp hero/value statement (not a job title, not a typewriter animation), a short human "about," 2-5 curated projects with real depth, a plainly-stated skills/stack section, a brief outcome-focused experience section, and an explicit contact CTA. Josh Comeau's framing: a portfolio is a "highlight reel, not a comprehensive index" — the most common mistake is listing every project shallowly instead of a few projects deeply. Missing project context (problem, role, goal) and no clear CTA are repeatedly cited failure modes.

## 2. Differentiation

Curation + depth + voice beats volume or decoration. Strong project write-ups act as a "tour guide" — problem, decisions, trade-offs, why — not just a feature list. Shipped/real work (users, revenue, tests) outranks tech-stack novelty in hiring-manager discussions. Concrete metrics beat adjectives. Personal voice (e.g. a portfolio that reads like a personal wiki/digital garden) is memorable specifically because it isn't templated. Small, sparing signature interactions beat heavy animation. Live demos beat static screenshots.

## 3. Visual/UX trends (2025-2026)

Minimalism is trending toward "resonant" (oversized typography, generous whitespace, muted palettes with texture) rather than sterile flat minimalism. Micro-interactions (hover states, scroll transitions) are favored over heavy animation — 2026 trend pieces describe a correction toward "cognitive clarity over sensory richness." Typography-led design is increasingly the primary storytelling device over imagery. Bento-grid (CSS-grid card) layouts are a strong, still-fresh fit for organizing projects/skills. Dark mode is the expected default (not just an option) given stated user preference figures. Mobile-first is mandatory — a majority of portfolio views are mobile. Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) and accessibility are treated as inseparable from UX, not bolt-ons.

## 4. Technical signals recruiters/engineers check

Recruiters reportedly form an impression from a GitHub profile in as little as ~90 seconds — pinned repos, repo names, and README quality shape that first pass. Up to 6 pinned repos should be chosen deliberately (breadth or depth), not just "most recent." Live demo + GitHub links together beat screenshots alone; broken links are a top-cited failure. Commit hygiene, branching, and tests read as seniority signals. Caveat: the strongest engineers sometimes have thin public portfolios because real work is proprietary — the portfolio's job is to compensate with clarity and depth, not raw volume, and raw commit-count is a diluted signal now that AI-assisted coding inflates contribution graphs broadly.

## 5. GitHub profile README specifically

Avoid: animated typewriter bios (also a screen-reader accessibility bug), stacked stats/streak/trophy widgets, snake-game contribution graphs, visitor counters, generic soft-skill language, long unsubstantiated "currently learning" lists.

Still works: one sharp specific bio line, 3-5 core technologies (not an icon wall), at most one dark-themed stats widget if genuinely flattering, 3-6 pinned repos with real one-line descriptions, a "currently building" line, one outbound link to the portfolio site, one concrete metric if available. Target 30-90 second comprehension.

## 6. Pitfalls to avoid

Stale content, broken links, missing project context, over-animation, typewriter effects, generic template look, poor mobile optimization, slow load times/unoptimized assets, unexplained jargon, no CTA.

## Top 10 actionable takeaways (applied in the design spec)

1. Curate 3-5 projects with real depth, not a catalog of every repo.
2. Case-study project copy: problem → approach/stack → decisions → outcome, with working live + GitHub links on every project.
3. Sharp one-line hero value statement — no typewriter effect.
4. Dark mode default with a light toggle.
5. Bento-grid for skills/certifications blocks.
6. Motion stays purposeful and light — no parallax, no sound.
7. Typography carries the design system.
8. Mobile-first, budget for Core Web Vitals, verify with Lighthouse before shipping.
9. One clear, repeated contact CTA.
10. Lean GitHub README: one bio line, 3-5 technologies, pinned repos with real descriptions, one link to the portfolio, at most one stats widget.

## Sources

- [Josh Comeau — Building an Effective Dev Portfolio](https://www.joshwcomeau.com/effective-portfolio/)
- [Peerlist — How To Write A Case Study As A Developer](https://blog.peerlist.io/p/how-to-write-a-case-study-as-a-developer)
- [devbio.me — GitHub Profile README: What to Include in 2026](https://devbio.me/blogs/github-profile-readme-guide)
- [daily.dev — Readme Badges GitHub: Best Practices](https://daily.dev/blog/readme-badges-github-best-practices/)
- [finalroundai.com — How to Use GitHub as a Developer Portfolio](https://www.finalroundai.com/articles/github-developer-portfolio)
- [Hacker News — What portfolio items are most impressive when hiring developers?](https://news.ycombinator.com/item?id=14420802)
- [fueler.io — 15 Portfolio Mistakes to Avoid in 2025](https://fueler.io/blog/portfolio-mistakes-to-avoid)
- [elements.envato.com — Portfolio design trends for 2026](https://elements.envato.com/learn/portfolio-trends)
- [elements.envato.com — UX/UI design trends for 2026](https://elements.envato.com/learn/ux-ui-design-trends)
- [siteimprove.com — Core Web Vitals and WCAG](https://www.siteimprove.com/blog/core-web-vitals-wcag/)
- [sitebuilderreport.com — Software Engineer Portfolios examples](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios)
- [reallygooddesigns.com — 37 Best Personal Portfolio Websites](https://reallygooddesigns.com/best-personal-portfolio-websites/)
- [senorit.de — Bento Grid Design Trend](https://senorit.de/en/blog/bento-grid-design-trend-2025)
- [dev.to — The problem with the typewriter effect](https://dev.to/savvasstephnds/the-problem-with-the-typewriter-effect-and-how-to-fix-it-2731)
