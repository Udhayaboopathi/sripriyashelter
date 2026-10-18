# Sripriya Shelter — Next.js rebuild

A production rebuild of https://www.sripriyashelter.com. It keeps Sripriya's own brand (logo wordmark, #fd4112 orange / #000b6b navy, Playfair Display + DM Sans, photography, projects and contact details) and uses the **design language** of the Avittam Nayanmar project page (layout rhythm, hide-on-scroll header, off-canvas nav, eyebrow pills, lift cards, dark glass sections, tabs, motion). No reference-site content or assets are used.

## Stack
Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · motion · lucide-react · Playwright.

## Getting started
```bash
# Node 20.9+ (built and tested with Node 24)
npm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_ENQUIRY_ENDPOINT
npm run dev                  # http://localhost:3000
```

## Scripts
| Script | What |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` (run `npx next typegen` first on a fresh clone) |
| `npm run test:e2e` | Playwright tests (desktop 1440 + mobile 390). Starts `npm start` on port 3200 after `npm run build`. Use `npx playwright install chromium` or set `CHROME_PATH` to an installed Chrome |

## Routes
`/`, `/projects`, `/projects/sripriya-roseland`, `/projects/sripriya-individual-house` (legacy `/projects/sripriya-RoseLand` and `/projects/sripriya-Individual-house` → 308), `/gallery`, `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`.

## Content
All content lives in typed data files under `src/data/` (`site.ts`, `projects.ts`, `gallery.ts`, `testimonials.ts`, `content.ts`, `assets.ts`). To add a project, add an entry to `projects.ts`; cards, routes, sitemap and footer update automatically.

## Enquiry form
Client-side validation mirrors the original rules (name 2–100, phone 10–15 digits, email, message 10–1000), plus a honeypot and a minimum fill time. If `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is set, the form POSTs JSON `{name, phone, email, message, project?, source}` and shows success only on a 2xx response. Otherwise it opens a prefilled email to sripriyashelters@gmail.com and tells the visitor so. It never shows a fake "sent" message.

## Docs
See `docs/`: reference-analysis, original-site-audit, design-system, page-inventory, asset-inventory, implementation-plan, responsive-analysis, visual-qa (incl. Lighthouse and REA results), missing-content, `screenshots/` and `lighthouse/`.

## v2: full reference section set
Home and both project pages render the complete reference landing-page sequence (`src/components/landing/LandingPage.tsx`), driven by `src/data/landing.ts`. Sample content and stock media are flagged `isDummy: true` (see `src/data/stock.ts`), and every item is listed in `docs/missing-content.md` under "Replace before launch". The Quick Enquiry popup auto-opens once per browser session (`sessionStorage` key `sp-quick-enquiry-seen`); e2e tests pre-set this flag except in the test titled `[fresh session]`.

Checks: `npm run lint`, `npx next typegen && npm run typecheck`, `npm run build`, `CHROME_PATH=/usr/bin/google-chrome E2E_PORT=3100 npm run test:e2e` (61 tests).
