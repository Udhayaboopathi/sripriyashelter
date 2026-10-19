# Visual QA log (v2)

All times IST (Asia/Calcutta), 18 Oct 2026. Every capture was made against the production build (`next build && next start -p 3100`). Playwright used system Chrome. REA used headless Chrome on loopback CDP: `127.0.0.1:9333` (1440×900 window), `9334` (768×1024) and `9335`. Chrome's 500px minimum window width meant REA could not capture a true 390px viewport, so all 390 comparisons use Playwright mobile emulation (the sanctioned fallback).

## Final comparison images (`docs/screenshots/`)
| File | What |
|---|---|
| `compare-final-1440.jpg` | **Full page, reference (left) vs RoseLand rebuild (right), 1440** |
| `compare-final-768.jpg` | Same at 768 |
| `compare-final-390.jpg` | Same at 390 |
| `compare-first-load-1440.jpg` | First load, REA `capture_web_screenshot`: reference vs rebuild, both with the auto-opened Quick Enquiry popup |
| `compare-first-load-768.jpg` | Same at 768 (REA) |
| `final/<page>-{1440,768,390}.jpg` | Every rebuilt route at all three widths (21 files, full page) |
| `reference-avittam-home-{1440,390}.jpg`, `original-sripriya-*.jpg`, `rea-reference-viewport-1440.png` | Reference and original-site captures from phase 1 |

## Passes
1. **Pass 1** (after wiring all sections): full-page Playwright captures of Home and RoseLand at 1440/390, sliced and reviewed section by section against the reference slices. Fixes: removed a 40px gap under the hero; the specs panel now aligns to the top (`self-start`, min-h 520); a 2px horizontal overflow at 390 caused by split-word entrance transforms (`overflow-x-clip` on split headings).
2. **Pass 2** (side by side at 1440/768/390 plus REA): REA `inspect_web_page` showed that split headings exposed "word\u00a0 word" accessible names, so word spans are now separated by real spaces. It also confirmed that **no video is requested at first load** (lazy loading works) and that the Quick Enquiry dialog auto-opens. The shorts coverflow now shows 3 cards like the reference instead of 5.
   REA `compare_web_screenshots` (channel_threshold 48), first load:
   | Width | Changed ratio | Mean abs Δ |
   |---|---|---|
   | 1440 | 0.511 | 33.6 |
   | 768 | 0.567 | 38.9 |

   The difference comes mostly from photography and brand colour (orange/navy vs Avittam's red/magenta poster hero). Popup geometry, header and floating elements line up, as shown in `compare-first-load-*.jpg`.
3. **Pass 3**: the chat bubble now sits above the popup overlay like the reference; the popup submit button uses a gradient; shorts pagination dots got 24×24 hit areas (Lighthouse target-size).
   A Lighthouse NO_LCP on landing pages was traced, by bisecting sections, to CSS `scroll-snap` on the gallery carousel. Chrome treats the snap re-alignment as a scroll and stops LCP recording. Snap was removed (arrows and autoplay use JS smooth scrolling).
   Then a final 21-page capture (`final/`) and the final side-by-side images. All routes at all widths: **no horizontal overflow, no console errors**.

## Interactions recreated (each covered by Playwright)
Auto-opening Quick Enquiry popup (once per session) · brochure popup from the header pill and "Download Brochure" · films slider (prev/next, click to play) · walkthrough video modal · shorts coverflow (arrows + dots) · landmark and testimonial ambient videos (lazy, pause off-screen) · gallery and updates carousels (autoplay, pause on hover/focus) + lightbox (arrows/Esc) · amenities 3-row marquee (alternating, pause on hover) · specs tabs (arrow keys) / mobile accordion · plans tabs · split-word heading reveal + fadeInUp · hide-on-scroll header · off-canvas menu · chat bubble · forms (validation, honest mail-client fallback).

## Lighthouse (final build, `docs/lighthouse/*.html`)
| Page | Mode | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | desktop | 99 | 97 | 100 | 100 | 1.0 s | 0 | 0 ms |
| Home | mobile | 84 | 97 | 100 | 100 | 4.6 s | 0 | 30 ms |
| RoseLand | desktop | 99 | 97 | 100 | 100 | 1.0 s | 0 | 0 ms |
| RoseLand | mobile | 83 | 97 | 100 | 100 | 4.7 s | 0 | 50 ms |
| Contact | desktop | 99 | 96 | 100 | 100 | 0.9 s | 0 | 0 ms |
| Contact | mobile | 89 | 96 | 100 | 100 | 3.7 s | 0 | 40 ms |

The only remaining a11y failure is `color-contrast`: white or small text on the brand orange #fd4112 is 3.53:1. That is a brand decision, carried over and documented in missing-content.md. Mobile LCP is the hero photograph under Lighthouse's simulated slow 4G.

## Responsive pass (19 Oct 2026)
Mobile Lighthouse after the pass:

| Page | Perf |
|---|---|
| home | 90 |
| RoseLand | 92 |
| Individual House | 88 |
| projects | 94 |
| gallery | 90 |
| about | 92 |
| contact | 93 |

Desktop is 99–100. Details, REA comparisons and screenshots are in `responsive-report.md`.
