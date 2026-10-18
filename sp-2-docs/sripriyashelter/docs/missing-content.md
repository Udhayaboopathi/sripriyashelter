# Missing content

Nothing below was invented. Where an item is visibly needed, the UI renders a labelled `AssetPlaceholder` or leaves the section out. Copy marked *flagged* is published verbatim from the original but contradicts other published facts; it needs client confirmation.

| Page | Section | Missing item | Recommended format |
|---|---|---|---|
| Global | Header / footer logo | High-resolution or vector logo (the original only has a text wordmark and a 256px favicon) | SVG (and a 1024px transparent PNG) |
| Global | Footer social | Facebook page URL (the original "Facebook" icon links to Instagram) | Full https URL |
| Global | Footer legal | Privacy Policy and Terms pages (the original links to `#`) | Approved legal copy (Markdown/DOCX) |
| Global | Brand colour | Accessible darker orange for small text on buttons (white on #fd4112 is 3.53:1, below WCAG AA 4.5:1) | Approved hex, e.g. ≈ hsl(12 98% 40%) |
| Global | SEO / JSON-LD | Confirm the official phone/email: the original JSON-LD lists +91-99622-38632 / sripriyashelter@gmail.com, but the visible site shows +91 96001 03760 / sripriyashelters@gmail.com (the rebuild uses the visible pair) | Written confirmation |
| Global | Meta description | "15+ years of excellence" conflicts with "5+ Years Experience" (*flagged*) | Confirmed figure |
| Home | Projects showcase / Projects hero | "across Bangalore" while all projects are in Chennai (*flagged*) | Corrected sentence |
| Home / About | Testimonials | Verification and consent for the 4 testimonials; roles cite "Sripriya Heights/Gardens/Enclave", which aren't listed projects (*flagged*) | Name, project, quote, written consent, optional photo (1:1 JPG ≥400px) |
| About | Milestones | 2016 "1000 Happy Families" and 2024 "2000+ Homes Delivered" conflict with 200+ families / 4+ projects (*flagged*) | Verified year–event list |
| About | Story | "more than 3 successful projects" vs "4+ Projects Delivered" (*flagged*) | Confirmed figure |
| RoseLand | Overview / RERA strip | TNRERA registration number (the reference-style RERA strip is not rendered without it) | Registration ID + certificate PDF |
| RoseLand | Specifications | Construction specifications (structure, flooring, doors, windows, electrical, plumbing). The reference spec tabs are reused for plans instead | Table or DOCX per category |
| RoseLand | Amenities | Amenity photography (icon tiles are used instead) | 4:3 JPG ≥1600px per amenity |
| RoseLand | Amenities | "Potale Water" probably means "Potable Water" (*flagged*, kept verbatim) | Corrected label |
| RoseLand | Location | Exact address/coordinates (only "Shankar nagar, Pammal, Chennai" and a map image are published) | Address + Google Maps link |
| RoseLand | Media | Walkthrough video or 3D tour (reference video sliders omitted) | MP4/YouTube URL |
| Individual House | Plans & Drawings | Floor plan (**placeholder rendered**: `projects.sripriya-individual-house.floorPlan`) | PNG/PDF ≥1600px |
| Individual House | Brochure | Brochure (no download card shown) | PDF |
| Individual House | Location | Exact locality (only "Chennai" is published) | Address / map link |
| Individual House | Overview / card | Summary says "Premium 2 & 3 BHK apartments" and the 2nd paragraph describes "Sripriya Gardens… Electronic City" for a single 2400 sq.ft house (*flagged*) | Corrected project copy |
| Projects | Upcoming filter | No upcoming projects are published (an empty state is shown) | Project data in `src/data/projects.ts` format |
| Contact | Form delivery | Production enquiry endpoint (until configured, the form opens the visitor's mail client and says so) | `NEXT_PUBLIC_ENQUIRY_ENDPOINT` URL (Formspree/CRM webhook) |
| Contact / Footer | Working hours | Confirm hours shown site-wide (Mon–Sat 9–7, Sun 10–4, from the contact page) | Written confirmation |
