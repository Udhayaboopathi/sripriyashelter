# Implementation plan (as executed)

1. **Discovery.** Captured the reference and the original with REA (CDP) and Playwright at 8 widths. Extracted computed styles, the original CSS tokens, page text, links and images.
2. **Content model.** Typed data in `src/types/content.ts` and `src/data/*` (site, navigation, projects, gallery, testimonials, page copy, assets). Copy is verbatim from the original; contradictions are flagged with `contentNotes`/`status` rather than rewritten.
3. **Design system.** Original brand tokens plus reference-derived spacing, radii, shadows and easings in `globals.css` (Tailwind v4 `@theme`).
4. **Layout shell.** Hide-on-scroll header, off-canvas nav, footer, floating actions, enquiry modal context, skip link, JSON-LD.
5. **Sections & pages.** Home, Projects (filters), Project detail (SSG + legacy-slug 308 redirects), Gallery (filter + lightbox), About, Contact, not-found, sitemap, robots.
6. **Forms.** Client validation that mirrors the original Zod rules, a honeypot, a minimum fill time, and `NEXT_PUBLIC_ENQUIRY_ENDPOINT` (JSON POST) with an honest `mailto:` fallback. No fake success message.
7. **Refinement pass 1.** Fixed reveal sections captured blank (smooth-scroll interaction in the capture script), the visual-band text cut-off, and the restart/port issue.
8. **Refinement pass 2.** Mobile header CTA wrapping; centred gallery carousel heading with arrows below the track.
9. **Refinement pass 3.** Value-card icons clipped when a card has no image; project enquiry image no longer uses the location map; duplicate/conflicting robots meta on the 404 page; tablet (768/1024) captures reviewed.
10. **Verification.** ESLint, `tsc --noEmit`, `next build`, Playwright e2e (desktop 1440 + mobile 390), Lighthouse, REA viewport captures and pixel comparisons.

## Integration points for the client
- `NEXT_PUBLIC_SITE_URL` sets canonical URLs, the sitemap and Open Graph (`.env.example`).
- `NEXT_PUBLIC_ENQUIRY_ENDPOINT` takes JSON POST `{name, phone, email, message, project?, source}` and expects a 2xx response (Formspree, a CRM webhook, or a Next route handler).
- To add a project, append an entry to `src/data/projects.ts`; routes, sitemap, footer and cards update automatically.
