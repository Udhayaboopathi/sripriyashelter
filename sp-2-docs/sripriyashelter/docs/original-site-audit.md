# Original site audit — sripriyashelter.com

Captured 18 Oct 2026 (IST) with Playwright (system Chrome) at 1440 and 390, plus REA `inspect_web_page` against the live home page. Raw text/link/image dumps are in `scratch/text/sripriya-*.json` (not shipped).

## Technology
- Vite + React single-page app (client-rendered). `index.html` ships an empty root, so the content is invisible without JavaScript.
- Tailwind/shadcn-style CSS variables in `index-lHv5Ni9E.css`.
- Contact form validated with Zod (name 2–100, phone 10–15, valid email, message 10–1000) and submitted via `mailto:`.

## Routes found
| Route | Status | Notes |
|---|---|---|
| `/` | 200 | Hero, why-choose, about, projects, testimonials, CTA, founder, map, form |
| `/projects` | 200 | Project grid with filters |
| `/projects/sripriya-RoseLand` | 200 | Full project page (price, facts, amenities, plans, brochure, map) |
| `/projects/sripriya-Individual-house` | 200 | Project page; overview copy mentions another project |
| `/projects/sripriya-individual-house` (lowercase) | 200 **bug** | Renders RoseLand content |
| `/gallery` | 200 | 12 images, 3 categories |
| `/about` | 200 | Story, leadership, vision/mission, values, milestones |
| `/contact` | 200 | Info cards, form, map |
| any other path | SPA fallback | |

## Brand tokens (verified from the CSS)
| Token | Value | Hex |
|---|---|---|
| `--primary` | hsl(12 98% 53%) | #fd4112 |
| primary gradient end | hsl(12 98% 45%) | #e32f02 |
| `--secondary` / foreground | hsl(234 100% 21%) | #000b6b |
| gray text | hsl(220 9% 46%) | #6b7280 |
| light bg | hsl(220 20% 97%) | #f6f7f9 |
| accent/muted | hsl(220 14% 96%) | #f3f4f6 |
| border | — | #e5e7eb |
| radius | .5rem | |
| Fonts | Playfair Display (h1–h6), DM Sans (body) | Google Fonts import |

Logo: a text wordmark in Playfair, "Sripriya" in orange and "Shelter" in navy. The only bitmap logo is `favicon.ico` (256px).

## Verified contact data (visible on the site)
- Phone +91 96001 03760 · WhatsApp wa.me/919962863133 · sripriyashelters@gmail.com
- No.5/122-A, Khaji Shahib Street, C. Pallavaram, Chennai – 600043 (Near Poorvika Mobile, Pallavaram Market)
- Mon–Sat 9:00 AM – 7:00 PM, Sunday 10:00 AM – 4:00 PM
- Instagram: instagram.com/sripriyashelter

## Defects and inconsistencies found
1. The lowercase Individual House URL shows RoseLand. **Fixed:** canonical lowercase slugs, and the legacy mixed-case URLs 308-redirect.
2. The "Call Now" CTA uses a dummy `tel:+919876543210`. **Fixed:** uses the real number.
3. The footer "Facebook" icon links to Instagram. **Dropped**; the Facebook URL is listed as missing.
4. JSON-LD lists +91-99622-38632 and sripriyashelter@gmail.com, which differ from the visible details. **The rebuild uses the visible details**; flagged.
5. Contradictory copy (kept verbatim, flagged in missing-content.md): "across Bangalore"; Individual House text references "Sripriya Gardens… Electronic City" and "Premium 2 & 3 BHK apartments"; milestones (1000 families, 2000+ homes) vs stats (200+ families, 5+ years) vs "15+ years" in the meta description; testimonial roles name projects that don't exist.
6. Image files named `Elevation*.jpeg` are actually floor plans (renamed descriptively).
7. Privacy/Terms links point to `#`.
8. Typo "Potale Water" in the RoseLand amenities (kept verbatim, flagged).
