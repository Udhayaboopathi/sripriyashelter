# Page inventory

| Route | Rendering | Sections | Original equivalent |
|---|---|---|---|
| `/` | Static (prerendered) | Hero (3-slide cross-fade + orange stats band) · Why choose us (4 lift cards) · About overview (dark, glass card, services list) · Projects showcase · Brand text band · Gallery carousel · Testimonials (dark) · CTA band · Founder split · Visit Us (map card) · Send Us a Message (underline form) | `/` |
| `/projects` | Static | Page hero · status filters (All/Ongoing/Completed/Upcoming) with empty state · project cards · CTA | `/projects` |
| `/projects/sripriya-roseland` | SSG via `generateStaticParams` | Project hero · dark overview (price, facts, CTA) · amenities · Plans & Drawings tabs (6 floor plans, parking, location map, elevation) · project gallery · brochure card (Google Drive) · location · enquiry form | `/projects/sripriya-RoseLand` |
| `/projects/sripriya-individual-house` | SSG | Same template; floor plan = labelled AssetPlaceholder; no brochure | `/projects/sripriya-Individual-house` |
| `/projects/sripriya-RoseLand`, `/projects/sripriya-Individual-house` | 308 → canonical | Legacy URLs preserved | |
| `/gallery` | Static | Page hero · category filter · masonry grid · lightbox (keyboard nav) · closing note | `/gallery` |
| `/about` | Static | Page hero · story split · leadership (founder, CEO) · vision/mission · office carousel · values · milestones timeline · CTA | `/about` |
| `/contact` | Static | Page hero · 4 info cards · form split · map | `/contact` |
| `/sitemap.xml`, `/robots.txt` | Metadata routes | | |
| unknown path | `not-found.tsx` (404; unknown project slugs return a noindex not-found page) | | |

Global: hide-on-scroll header, off-canvas menu, side "Enquire Now" tab → Quick Enquiry modal, floating WhatsApp/call buttons, footer with tri-colour strip, skip link, Organization JSON-LD, per-project Residence JSON-LD.
