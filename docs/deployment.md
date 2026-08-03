# Deployment — Bunny.net

The site is a static build shipped to a **Bunny Edge Storage** zone and served
through a **Pull Zone**. `.github/workflows/deploy.yml` runs on every push to
`main` that touches `frontend/`, and can also be triggered manually from the
Actions tab.

The workflow lints, runs the full Playwright suite, builds, uploads, purges the
CDN cache, then smoke-tests the live site. A failing test blocks the deploy.

## One-time setup

### 1. Create the Bunny resources

1. **Storage Zone** — pick a region close to your visitors (Ireland/UK → `UK` or
   the default `DE`). Note the zone **name** and its **password** (Storage Zone →
   FTP & API Access → Password).
2. **Pull Zone** — set its origin to the storage zone you just created. Note the
   Pull Zone **ID** from the URL or its settings page.

### 2. Make deep links work (required)

This is a single-page app: React Router owns `/projects/:slug`, but those paths
don't exist as files in storage. Without this step every deep link and refresh
returns 404 — the homepage will look fine, so it's easy to miss.

In the **Storage Zone** settings:

- Set the custom **404 path** to `/index.html`
- Enable **Rewrite 404 to 200 status code**

The deploy workflow checks a deep link at the end and warns if this isn't set.

### 3. Add the repository configuration

**Settings → Secrets and variables → Actions → Secrets.** All of these are read
as `secrets.*` by the workflow.

| Secret | Example / where to find it | Required |
| --- | --- | --- |
| `SITE_URL` | `https://kristiancolville.ie` — absolute, `https://`, no trailing slash. Baked into the canonical and social-preview tags at build time. | Yes |
| `BUNNY_STORAGE_ZONE` | Storage zone name, e.g. `kristiancolville`. | Yes |
| `BUNNY_STORAGE_PASSWORD` | Storage Zone → FTP & API Access → Password. Use the **read/write** one, not read-only. | Yes |
| `BUNNY_STORAGE_ENDPOINT` | Region host, e.g. `uk.storage.bunnycdn.com`. Defaults to `storage.bunnycdn.com` (DE) — must match the zone's region. | No |
| `BUNNY_PULL_ZONE_ID` | Numeric ID from the pull zone's dashboard URL. | No |
| `BUNNY_API_KEY` | Account Settings → API Access → API Key. Only used for cache purging. | No |

Without `BUNNY_PULL_ZONE_ID` and `BUNNY_API_KEY` the deploy still succeeds — it
skips the purge with a warning, and the edge serves the previous build until its
cache expires.

## Why `SITE_URL` is required

`og:url`, `og:image` and the canonical link have to be absolute — LinkedIn,
Slack and X won't resolve relative paths, and the preview silently degrades to
plain text. Vite injects `%VITE_SITE_URL%` into `index.html` at build time, so
the value is fixed per build. The workflow refuses to build without it rather
than shipping the `http://localhost:5173` default from `frontend/.env`.

After the first deploy, run the URL through
[LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to confirm
the card renders and to prime their cache.

## Custom domain

Add the domain to the Pull Zone (Hostnames), point a CNAME at the pull zone
hostname, and enable Bunny's free TLS. Then update the `SITE_URL` variable and
re-run the workflow so the social tags match the new domain — they're baked in
at build time and won't update on their own.

## Notes

- Vite emits content-hashed filenames, so old `assets/*.js` and `*.css` files
  accumulate in storage across deploys. They're unreferenced and harmless; clear
  them out from the Bunny file manager occasionally if you care.
- The e2e suite runs against the Vite dev server, not the production bundle.
  It catches application regressions, not build-output problems — the post-deploy
  smoke check covers the latter.
