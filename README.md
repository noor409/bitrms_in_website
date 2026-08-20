# BITRMS Technologies — Website

Marketing site for BITRMS across its five practices — Green Hydrogen, Cyber Security,
Odoo ERP & Facial Recognition, RMS Telecom, and Carbon & Climate Solutions — built with
Next.js and a Sanity-powered admin panel so non-technical staff can update all text and
images without touching code.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Sanity Studio**, embedded at `/studio`, as the admin/content panel
- Placeholder content ships in `src/lib/content/` so the site renders correctly even
  before Sanity is connected — every page prefers live CMS content and silently falls
  back to these placeholders otherwise

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site works immediately with
placeholder content — no Sanity setup required to browse it.

## Connect Sanity (the admin panel)

The admin panel needs your own free Sanity project — this is a one-time, two-minute step
that can't be done on your behalf since it requires your own account login.

1. Create a free account and project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `npx sanity@latest init` from this folder and follow the prompts — it will
   create a project and print the Project ID).
2. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — from the Sanity dashboard
   - `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
   - `SANITY_API_TOKEN` — create one under **API → Tokens** in your Sanity project,
     with **Editor** permissions. Only used by the seed script below; never sent to
     the browser.
3. Restart `npm run dev`, then visit `http://localhost:3000/studio` and log in with the
   same account. This is the admin panel — every content type (services, projects,
   team, testimonials, certifications, blog posts, job openings, site settings) is
   editable there, including drag-and-drop image upload.
4. Optionally, run `npm run seed` to populate the new project with the same placeholder
   content that ships in the codebase, so there's something to edit right away instead
   of starting from empty documents.

Anyone you want to be able to edit the site should be invited as a member of the Sanity
project (Project → Members in the Sanity dashboard) — that's the entire access control
model for the admin panel.

## Contact form

The contact form works with zero configuration: submissions open the visitor's email
client with a pre-filled message to the address in `src/lib/content/site.ts`. To have
the form send emails directly instead, create a free API key at
[resend.com](https://resend.com) and set `RESEND_API_KEY` in `.env.local`.

## Replacing placeholder content

Everything under `src/lib/content/` (services, projects, team, testimonials,
certifications, clients, jobs, blog posts, company timeline) is placeholder copy meant
to be replaced. Once Sanity is connected, editing content there is the intended
workflow — through `/studio`, not by editing these files. The files remain as the
fallback/seed source only.

Swap the logo and brand colors in `src/app/globals.css` (`--color-brand-*` /
`--color-accent-*` tokens) once real brand assets are available.

## Project structure

```
src/
  app/
    (site)/            # public site — shares the Navbar/Footer layout
    studio/[[...tool]]/ # embedded Sanity Studio (the admin panel)
    api/contact/        # contact form submission endpoint
  components/           # UI, layout, and page-section components
  lib/content/           # placeholder content (fallback + seed source)
  sanity/                # Sanity client, GROQ queries, schema types
scripts/seed.ts          # pushes placeholder content into a connected Sanity project
```

## Build & deploy

The app is containerized and deploys automatically via GitHub Actions on every push to
`main`. There's no local Node.js/npm requirement to build or run it — only Docker.

### How it works

1. Push to `main` triggers `.github/workflows/deploy.yml`.
2. It builds a production Docker image (`Dockerfile`, multi-stage, Next.js standalone
   output) and pushes it to GitHub Container Registry as
   `ghcr.io/noor409/bitrms_in_website`.
3. It copies `docker-compose.yml` to the VPS and runs `docker compose pull && docker
   compose up -d`, so the server always ends up running the image that was just built.

The site is reachable directly at `http://YOUR_SERVER_IP:3000`, and via
`https://new.bitrms.in` through the Caddy reverse proxy in `docker-compose.yml` /
`Caddyfile`, which also handles automatic HTTPS (Let's Encrypt). To point the proxy at a
different domain, edit the first line of `Caddyfile`. Requires the domain's DNS A record
to point at the VPS and ports 80/443 to be open.

### One-time setup required

**On the VPS** (Docker must already be installed):
```bash
mkdir -p ~/bitrms-deploy
```
Add the deploy public key to `~/.ssh/authorized_keys` for whichever user the pipeline
should SSH in as.

**In the GitHub repo** (Settings → Secrets and variables → Actions):
- Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (the deploy private key)
- Variables (optional — already default to the current values): `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`

**On the server**, if the contact form should send real emails, create
`~/bitrms-deploy/.env` containing `RESEND_API_KEY=...`. This file is never touched by
the pipeline, so it persists across deploys. `SANITY_API_TOKEN` is not needed on the
server — it's only used locally when running `npm run seed`.

By default the pipeline expects the GHCR package to be **public** (Packages tab on the
repo → package settings → Change visibility), so the server can `docker pull` without
authenticating. To keep it private instead, add a `docker login ghcr.io` step to the
deploy job in the workflow using a PAT with `read:packages`.

### Local development / testing without host Node.js

```bash
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=1pokv7jm \
  -t bitrms-website:dev .
docker run --rm -p 3000:3000 --env-file .env.local bitrms-website:dev
```

Or, for a normal `npm run dev` workflow, install Node.js locally — it's just not
required for building or deploying the production image.
