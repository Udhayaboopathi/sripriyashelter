# Responsive pass — report (19 Oct 2026)

## Scope
- **Routes (7):** `/`, `/projects`, `/projects/sripriya-roseland`, `/projects/sripriya-individual-house`, `/gallery`, `/about`, `/contact`. All 17 reference sections are on the home and project pages.
- **Widths (15):**
  - Mobile: 320, 360, 375, 390, 430
  - Tablet: 600, 768, 820, 1024
  - Laptop: 1280, 1366, 1440
  - Desktop: 1920, 2560
  - Ultrawide: 3440
- Touch and mobile emulation (`isMobile`, `hasTouch`) is on below 1024 px.

## How it was tested
| Check | Tool | Result |
|---|---|---|
| scrollWidth ≤ viewport, no visible element past the viewport (unless clipped by a carousel/marquee ancestor that fits), images load, videos get a source near the viewport, posters return 200, every scroll-reveal becomes visible, hero heading not covered by the price badge or the side "Enquire Now" tab | `e2e/responsive.spec.ts` (Playwright project `responsive`, 105 route × width tests + 1 video-source test) | **106/106 pass** |
| Touch targets ≥ 44 px, text ≥ 11 px, broken images, page errors | audit script (`scratch/resp/audit.mjs`, all 105 combinations) | Before: overflow at 320 on 4 pages (+35 px), about 20 kinds of undersized targets, 10 px hero labels. **After: 0 overflow, 0 targets under 44 px, 0 text under 11 px, 0 broken images, 0 errors** |
| Touch swipe (shorts coverflow, films slider, gallery carousel), tapping the off-canvas menu | `e2e/interactions.spec.ts` › touch (real CDP touch events) | pass |
| Keyboard: skip link first, then the header in order; visible 2 px focus ring; focus trap + Escape + focus return in the quick-enquiry popup, brochure popup, gallery lightbox, video modal and off-canvas menu; spec tabs with arrow keys | `interactions.spec.ts` › keyboard | pass |
| `reducedMotion: 'reduce'`: headings and reveals visible immediately, marquees static, no hero zoom, gallery doesn't autoplay, ambient videos don't play, modals still work | `interactions.spec.ts` › reduced motion | pass |
| Responsive navigation: hamburger only at 320–820; full nav plus off-canvas toggle at 1024, 1280 and 1920 (same as the reference) | `interactions.spec.ts` | pass |
| Visual comparison with Avittam at desktop 1440, tablet 768 and mobile 500 (REA capture needs at least 500 px) | REA `capture_web_screenshot` + `compare_web_screenshots` | see below |

## Main fixes
1. **320 px overflow:**
   - The header Brochure pill becomes icon-only below 360 px; it keeps `aria-label`.
   - The logo is 19 px below 360 px.
   - The approvals card is tighter: QR 60 px, smaller gaps, a truncating link.
2. **44 px touch targets:**
   - logo, desktop nav links, header phone, Brochure, menu toggle
   - modal close buttons, footer links/Instagram/tel/mail
   - breadcrumbs, project and gallery filter pills, contact links
   - shorts dots and arrows (the arrows no longer shrink)
3. **Shorts controls on phones:** below 430 px the five dots are replaced by a "2 / 6" counter, so the arrows keep their full 50 px.
4. **Swipe support** (`useSwipe`, `touch-action: pan-y`) on the shorts coverflow and the films slider.
5. **Focus trap** (`useFocusTrap`) on every modal. Focus returns to the trigger.
6. **Fluid typography with `clamp()`:** hero h1 and stats, every section heading (`SplitTitle`/`SectionHeading`), page-hero h1, the big-text band, gallery and location sub-headings, overview title. Hero stat labels are now 11 px minimum.
7. **Hero layout:**
   - The copy reserves room for the fixed side tab below `lg`.
   - At tablet width the copy narrows so it no longer runs under the ₹69 L badge (this happened at 768).
8. **2560 / 3440:** the whole composition scales (`zoom: 1.25` from 2400 px, `1.5` from 3200 px). Centred containers grow proportionally (≈1650 / 1980 physical px) and text stays readable. Full-bleed sections (hero, walkthrough, big-text band, marquees, approvals strip, footer) stay edge-to-edge.
9. **Reduced motion:** `MotionConfig reducedMotion="user"` for motion/react, on top of the existing CSS overrides.

## Performance (mobile Lighthouse, simulated Moto G / slow 4G)
Changes:
- Video posters are attached only within about 1.5 screens. Before, all 19 posters, about 1 MB, downloaded on load.
- motion/react is loaded lazily (`LazyMotion` + `m.*`), which takes about 42 KB of unused JS off the critical path.
- The favicon went from 184 KB to 3 KB (same artwork; 16/32/48 px).
- Total page weight on home: 1,580 KiB → 526 KiB.

| Page | Before (perf / LCP) | After (perf / a11y / BP / SEO, LCP, TBT, CLS) |
|---|---|---|
| Home | 84 / 4.6 s | **90** / 97 / 100 / 100, 3.5 s, 60 ms, 0 |
| RoseLand | 83 / 4.7 s | **92** / 97 / 100 / 100, 3.3 s, 80 ms, 0 |
| Individual House | – | **88** / 97 / 100 / 100, 3.7 s, 130 ms, 0 |
| Projects | – | **94** / 95 / 100 / 100, 3.1 s, 20 ms, 0 |
| Gallery | – | **90** / 96 / 100 / 100, 3.6 s, 80 ms, 0 |
| About | – | **92** / 96 / 100 / 100, 3.4 s, 30 ms, 0 |
| Contact | 89 / 3.7 s | **93** / 96 / 100 / 100, 3.2 s, 30 ms, 0 |

Desktop is 99–100 on every page. Reports are in `docs/lighthouse/*-responsive-pass.html`. The "before" figures are from the v2 run recorded in `visual-qa.md`.

The mobile LCP that remains is mostly framework JS (React/Next, about 120 KB gz) competing with the hero image on the simulated slow link. The observed LCP on the box is about 0.3 s.

The remaining accessibility deductions are known items:
- White text on brand orange #fd4112 (3.5:1) is a brand decision.
- On `/projects`: a heading-order skip (h1 → h3 in the cards) and card link labels that don't start with the visible badge text.

## REA comparison with the reference (first viewport, home)
| Width | changed-pixel ratio (threshold 24) | Notes |
|---|---|---|
| 1440 | 0.985 | Same structure: header, hero copy at left, round price badge at right, location tag, orange stats bar, floating WhatsApp/call/chat. The pixel difference comes from different photos and brand. The reference shows its quick-enquiry popup at first paint; ours is suppressed for the capture |
| 768 | 0.937 | Same as above. Our hero copy no longer overlaps the badge |
| 500 | 0.961 | Same as above |

Pixel ratios are expected to be high: the photos, logo and colours are deliberately not Avittam's. Side-by-side images are `screenshots/responsive/rea-compare-{1440,768,500}.jpg`.

## Screenshots (`docs/screenshots/responsive/`)
- `home-<width>.jpg` for all 15 widths.
- `<page>-{320,768,1440,3440}.jpg` for the other routes.
- Pages at 2560/3440 taller than Chrome's 16,384 px capture limit were stitched from viewport captures, so the fixed WhatsApp/chat/side-tab buttons repeat in each band. This is an artefact of the stitching.

## Known limitations
- Chrome cannot open a headless window narrower than 500 px, so REA captures stop at 500. 320–430 are covered by Playwright.
- `zoom` on large screens needs a current browser: Chrome/Edge, Safari, or Firefox 126 and later. Older browsers simply show the 1320 px layout centred.
