# Visual QA log

All times are IST (Asia/Calcutta), 18 Oct 2026. Captures were made against the production build (`next build && next start -p 3100`) with Playwright and system Chrome. REA captures went through a headless Chrome exposed on CDP `127.0.0.1:9333`.

## Screenshots (`docs/screenshots/`)
| File | What |
|---|---|
| `compare-home-1440.jpg` | Side by side: reference · rebuild · original, home, 1440 (top ~4200px) |
| `compare-home-390.jpg` | Same at 390 |
| `compare-fold-1440-rea.png` | First viewport, reference vs rebuild, both captured by **REA `capture_web_screenshot`** |
| `compare-roseland-1440.jpg` | Original vs rebuild RoseLand project page |
| `reference-avittam-home-{1440,390}.jpg` | Reference full page |
| `original-sripriya-home-{1440,390}.jpg`, `original-sripriya-roseland-1440.jpg` | Original site |
| `rebuild-<page>-{1440,390}.jpg` | Every rebuilt route, full page |
| `rebuild-home-{1024,768}.jpg` | Tablet widths |
| `rea-*.png` | Raw REA artifacts (content-addressed PNG, sha256 verified on decode) |

## REA pixel comparisons (`compare_web_screenshots`, channel_threshold 24)
| Before | After | Changed ratio | Mean abs channel Δ | Interpretation |
|---|---|---|---|---|
| Reference first viewport | Rebuild home first viewport | 0.998 | 69.4 | Expected: different brand, photos and copy. The tool does no layout or semantic analysis, so a high ratio does not mean the layout differs |
| Original Sripriya home fold | Rebuild home first viewport | 0.813 | 51.1 | Same brand and photos, new layout and composition |

Pixel diffing cannot score "same design language, different brand", so layout fidelity was judged by side-by-side review (below) and by matching the measured tokens (header 80px, 1320 container, 16/24px radii, shadows, easings).

REA `inspect_web_page` on the rebuild home (1440): 1062 DOM nodes, 738 accessibility nodes, **0 console events** in the observation window, no storage keys.

## Pass log
| Pass | Finding | Fix |
|---|---|---|
| 1 | Reveal sections captured blank | Capture script used smooth scroll; it now uses `behavior:'instant'` (site unchanged) |
| 1 | "SRIPRIYA SHELTER" band clipped at 1440 | Font size 8.4vw |
| 1 | Restart served stale CSS (port still bound) | `fuser -k` before start |
| 2 | Mobile header CTA wrapped onto 2 lines | nowrap, 11px pill, 21px logo |
| 2 | Gallery carousel heading off-centre vs reference | Centred heading, navy arrows below the track |
| 3 | About "values" icons clipped (no image above them) | Icon positioned inside the card when there is no image |
| 3 | Project enquiry split used the location map as photo | Prefers a site photo, falls back to the hero |
| 3 | 404 had both `noindex` and `index, follow` | Removed the root robots override |
| 3 | Lighthouse: logo label mismatch, redundant alt in carousel | Visible-text logo name + sr-only suffix; decorative alt inside labelled buttons |
| 3 | 1024/768 captures | No overflow; grids drop to 2 columns as intended |

## Automated checks (as run, final build)
- `npm run lint` → exit 0, no warnings printed
- `npx tsc --noEmit` (after `next typegen`) → exit 0
- `npm run build` → exit 0, 15 static pages generated
- `npm run test:e2e` (Playwright 1440 + 390, system Chrome) → **41 passed, 1 skipped** (the desktop-nav test is skipped on mobile by design)
- Lighthouse 12.8.2 (localhost production server, default throttling):

| Page | Form factor | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| / | mobile | 90 | 96 | 100 | 100 | 3.6 s | 0 |
| / | desktop | 99 | 96 | 100 | 100 | 0.9 s | 0 |
| /projects/sripriya-roseland | mobile | 97 | 97 | 100 | 100 | 2.6 s | 0 |
| /projects/sripriya-roseland | desktop | 100 | 97 | 100 | 100 | 0.7 s | 0 |
| /contact | mobile | 98 | 96 | 100 | 100 | 2.3 s | 0 |
| /contact | desktop | 100 | 96 | 100 | 100 | 0.6 s | 0 |

The only remaining accessibility failure is **colour-contrast**: white on the verified brand orange #fd4112 (and orange text on white) is 3.53:1. That is the original site's own pairing. Fixing it needs a darker accessible orange, which is a brand decision for the client (see missing-content.md).
