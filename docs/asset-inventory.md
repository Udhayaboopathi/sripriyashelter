# Asset inventory

All imagery is **first-party Sripriya Shelter content** downloaded from the live site on 18 Oct 2026 (IST). No reference-site (Avittam) asset is used anywhere. Downloads were EXIF-transposed, capped at 2400px on the long edge and re-encoded (JPEG q84). PNG plans/maps were kept as PNG for legibility. Files were renamed descriptively. Note that the originals named `Elevation*.jpeg` are floor plans. Typed metadata (src, width, height, alt, original URL) lives in `src/data/assets.ts`. Everything is served through `next/image` (AVIF/WebP, qualities 75/85).

| Local file | Original URL | Size | Weight | Used in |
|---|---|---|---|---|
| `public/images/projects/roseland/roseland-elevation.jpg` | https://www.sripriyashelter.com/assets/ELEVATION_FINAL_VIEW-C_BJbl94.png | 2260×2160 | 699 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-01.jpg` | https://www.sripriyashelter.com/assets/Elevation-CJYQgUj2.jpeg | 1600×999 | 146 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-02.jpg` | https://www.sripriyashelter.com/assets/Elevation2-4YSTgPOT.jpeg | 1273×1351 | 163 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-03.jpg` | https://www.sripriyashelter.com/assets/Elevation3-8otezMO6.jpeg | 1273×1351 | 174 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-04.jpg` | https://www.sripriyashelter.com/assets/Elevation4-CHtbU2W6.jpeg | 1273×1351 | 186 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-05.jpg` | https://www.sripriyashelter.com/assets/Elevation5-Bi9xMfA-.jpeg | 1273×1351 | 167 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-floor-plan-06.jpg` | https://www.sripriyashelter.com/assets/floorplan-2-DdjCpzyz.jpeg | 1273×1351 | 171 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-parking-plan.png` | https://www.sripriyashelter.com/assets/PARKING-CE6pQFTf.png | 823×800 | 630 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/projects/roseland/roseland-location-map.png` | https://www.sripriyashelter.com/assets/map-D6f2gh5A.png | 966×772 | 1058 KB | RoseLand project page (hero/plans/gallery) |
| `public/images/home/residential-elevation.jpg` | https://www.sripriyashelter.com/assets/project-5-3e6ITNY3.png | 1824×1743 | 420 KB | Home hero slide 2, gallery, why cards |
| `public/images/projects/individual-house/individual-house-elevation.jpg` | https://www.sripriyashelter.com/assets/project-6-Cw0gqZ7F.jpeg | 1600×1466 | 460 KB | Individual House project page |
| `public/images/home/night-view-residence.jpg` | https://www.sripriyashelter.com/assets/project-7-Csvatah_.jpeg | 1440×1920 | 358 KB | Gallery, why cards |
| `public/images/home/entrance-staircase.jpg` | https://www.sripriyashelter.com/assets/project-8-DTJl7_UO.jpeg | 1440×1920 | 466 KB | Gallery |
| `public/images/projects/individual-house/individual-house-site-01.jpg` | https://www.sripriyashelter.com/assets/site-WFWtsfLC.jpeg | 2400×1800 | 551 KB | Individual House project page |
| `public/images/projects/individual-house/individual-house-site-02.jpg` | https://www.sripriyashelter.com/assets/site2-LK5EnQuj.jpeg | 1800×2400 | 561 KB | Individual House project page |
| `public/images/projects/individual-house/individual-house-site-03.jpg` | https://www.sripriyashelter.com/assets/site3-CYlTJXwZ.jpeg | 2400×1800 | 531 KB | Individual House project page |
| `public/images/projects/individual-house/individual-house-site-04.jpg` | https://www.sripriyashelter.com/assets/site4-CXrLsps2.jpeg | 1800×2400 | 721 KB | Individual House project page |
| `public/images/projects/individual-house/individual-house-site-05.jpg` | https://www.sripriyashelter.com/assets/site5-aKxtmJxT.jpeg | 1800×2400 | 462 KB | Individual House project page |
| `public/images/office/office-conference-room.jpg` | https://www.sripriyashelter.com/assets/office-1-DuIZ299h.jpg | 1920×1280 | 325 KB | Gallery, About office carousel |
| `public/images/office/office-reception.jpg` | https://www.sripriyashelter.com/assets/office-2-WR0mLHJq.jpg | 1920×1280 | 366 KB | Gallery, About office carousel |
| `public/images/office/office-main.jpg` | https://www.sripriyashelter.com/assets/office-3-BzZt2gjP.jpg | 1920×1280 | 465 KB | Home hero slide 1, About overview, contact split |
| `public/images/office/office-workspace.jpg` | https://www.sripriyashelter.com/assets/office-4-D86GLKsL.jpg | 1920×1280 | 483 KB | Gallery, About, page heroes |
| `public/images/team/u-nethaji-founder.jpg` | https://www.sripriyashelter.com/assets/founder-DQozKT9G.jpg | 1600×2400 | 624 KB | Founder split, Leadership |
| `public/images/team/un-srinath-ceo.jpg` | https://www.sripriyashelter.com/assets/srinath-DkjA6hlx.jpg | 1600×2400 | 644 KB | Leadership |
| `public/images/brand/sripriya-logo-mark-256.png` | https://www.sripriyashelter.com/favicon.ico | 256×256 | 21 KB | Footer/logo mark, modal, map card |

## Fonts
Playfair Display and DM Sans, the same families as the original Google Fonts import. They are self-hosted at build time via `next/font/google`.

## Icons
`lucide-react` for UI icons. The Instagram and WhatsApp glyphs are inline SVGs (`SocialIcon.tsx`) because lucide ships no brand icons. `src/app/favicon.ico` is the original favicon.

## Placeholders (rendered with `AssetPlaceholder`, labelled, `data-placeholder="true"`)
| Key | Where | Reason |
|---|---|---|
| `projects.sripriya-individual-house.floorPlan` | Individual House → Plans & Drawings | No floor plan published |

## Not available (see missing-content.md)
High-resolution/vector logo, amenity photography, project videos, Individual House brochure, RoseLand RERA certificate.

## v2: sample stock media and drawn samples

v2 adds **38 stock photos** (`public/images/stock/`, Pexels License and Mixkit stills) and **19 short stock videos** (`public/videos/`, Mixkit Stock Video Free License, 5.6 MB total, each with a poster in `public/images/stock/posters/`). It also adds drawn samples: `public/images/samples/qr-tnrera.svg` and `individual-house-sample-floor-plan.svg`, and patterns `public/images/patterns/network-orange(-soft).svg`. Every item is typed in `src/data/stock.ts` with `isDummy: true` and a `credit {provider, url, license}`. The complete per-file table with source URLs and licences is in **docs/missing-content.md › Stock media used**. No Avittam photo, video, logo or text is used anywhere.
