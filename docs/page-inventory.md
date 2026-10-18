# Page inventory (v2: full reference section set)

The reference (avittamhomes.com/avittam-nayanmar-tambaram) is one long landing page. v2 rebuilds **every one of its sections, in the same order**, as data-driven components in `src/components/landing/` (`LandingPage.tsx`). They render on Home and both project pages and are reused on the other routes.

Reference order → component:
1. Hero banner + price badge + location tag + stats strip → `LandingHero`
2. "Why" 3×2 image cards → `WhySection`
3. View From Terrace (framed image) → `TerraceSection`
4. Dark project overview (image + progress card + glass card + price + 3 stat tiles + Download Brochure) → `OverviewSection`
5. Location map card + "How close is …, really?" 4 portrait landmark videos → `LocationSection`
6. Creators/films slider (one 16:9 video, arrows, caption) → `FilmsSlider`
7. Full-width video band with play button → `WalkthroughBand` (+ `VideoModal`)
8. Shorts coverflow (centre 360×640, arrows + dots) → `ShortsSlider`
9. Giant-text image band → `BigTextBand`
10. Gallery carousel + "Updates – Current Status (date)" carousel + lightbox → `GallerySection`
11. Amenities: dark band, 3 marquee rows in alternating directions → `AmenitiesMarquee`
12. Specifications: vertical tabs on desktop, accordion below 768px → `SpecsTabs`
13. RERA strip (QR cards) → `ApprovalsStrip`
14. Video testimonials 2×2 (stars + title) → `VideoTestimonials`
15. Company split ("To Learn More") → `CompanySplit`
16. Contact split (image + underline form with "Interested In") → `ContactSplit`
17. Ongoing projects (2 cards with overlapping panels) → `OngoingProjects`
18. Footer → `Footer` (existing)

Global (all routes): fixed hide-on-scroll header with an orange **Brochure** pill that opens the brochure popup; **Quick Enquiry popup that auto-opens 3.5 s after the first page load of a session** (`sessionStorage["sp-quick-enquiry-seen"]`), just as the reference does, and also opens from the side "Enquire Now" tab and every enquiry button; "Glad to support you!" chat bubble linked to Sripriya's real WhatsApp; floating WhatsApp/call buttons; off-canvas menu; split-word heading reveal plus fadeInUp scroll reveals (all disabled under `prefers-reduced-motion`).

| Route | Rendering | Sections |
|---|---|---|
| `/` | Static | All 17 landing sections (1–17) with company-level content: hero = home copy + RoseLand ₹69 L badge; overview = company overview; location = office in Pallavaram |
| `/projects/sripriya-roseland` | SSG | All 17 landing sections + **Plans & Drawings tabs** (the real 6 floor plans, parking plan, location map, elevation) inserted after the gallery; Residence JSON-LD |
| `/projects/sripriya-individual-house` | SSG | All 17 landing sections + Plans tabs showing the **sample indicative floor plan** (no visible placeholder); brochure pill shows "Request Brochure" |
| `/projects` | Static | Page hero · status filters + cards · Shorts coverflow · Big-text band · Video testimonials · Contact split |
| `/gallery` | Static | Page hero · filter grid + lightbox · Films slider · Walkthrough band · Shorts coverflow · Contact split |
| `/about` | Static | Page hero · story · leadership · vision/mission · office carousel · values · milestones · Big-text band · Video testimonials · Ongoing projects · Contact split |
| `/contact` | Static | Page hero · info cards · Contact split (office photo, underline form) · Location (map card + landmark videos) |
| `/projects/sripriya-RoseLand`, `/projects/sripriya-Individual-house` | 308 → canonical | |
| `/sitemap.xml`, `/robots.txt`, 404 | as in phase 1 | |

The reference has **no FAQ and no separate price/floor-plan section**, so none was invented. The prices shown are Sripriya's published ones (RoseLand ₹69 L onwards, Individual House ₹2 Cr). The floor plans are real for RoseLand and a flagged sample for the Individual House.
