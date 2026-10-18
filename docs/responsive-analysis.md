# Responsive analysis

Container widths follow the reference's Bootstrap grid (540/720/960/1140/1320 at 576/768/992/1200/1400). Component breakpoints use the Tailwind v4 defaults (sm 640, md 768, lg 1024, xl 1280) plus a custom `xs` at 430px.

| Area | ≥1024 (desktop) | 768–1023 (tablet) | <768 (mobile, tested at 390) |
|---|---|---|---|
| Header | Logo · inline nav (lg+) · phone (xl+) · "Get in Touch" pill · hamburger | Inline nav hidden below 1024 (off-canvas only); the pill stays | Smaller logo (21px) and pill (11px, nowrap); 80px bar |
| Off-canvas | Right panel `min(90vw, 420px)`, all widths (as on the reference) | Same | 90vw panel; Escape/overlay close; body scroll locked |
| Hero | ~830px tall, text left, stats band | Stats band 3 columns | Shorter hero; stats band stays as 3 compact columns |
| Card grids | 4 columns | 2 columns | 1 column |
| Dark overview | Image + glass card side by side | Stacked | Stacked; services list single column |
| Plans tabs | Vertical tab list + panel | Vertical | Horizontal scrollable tab list (intentional internal overflow) |
| Gallery | Masonry, 3 columns | 2 columns | 1 column; lightbox full screen |
| Testimonials | 2-column grid | 2 columns | 1 column |
| Contact split | Image + underline form | Stacked | Stacked |
| Footer | 4 columns | 2 columns | 1 column |

## Verification (actually run)
- `scratch/cap-rb.mjs pass3` captured all 7 pages at 1440, 1024, 768 and 390: **no page-level horizontal overflow and no console errors**. The only elements wider than their box are by design: the hero image during its zoom (inside `overflow-hidden`) and the plans tab scroller at 390.
- Playwright e2e asserts `scrollWidth - clientWidth ≤ 0` on every route at 1440 and 390.
- Screenshots: `screenshots/rebuild-*-1440.jpg`, `rebuild-*-390.jpg`, `rebuild-home-1024.jpg`, `rebuild-home-768.jpg`.

## v2 landing sections: responsive behaviour
| Section | ≥1200 | 768–1199 | <768 (390) |
|---|---|---|---|
| Hero | 750px banner, price badge + location tag | 680px, badge kept | 620px, badge/tag hidden, stats 2×2 |
| Why | 3 columns | 2 columns | 1 column |
| Overview | image + glass card side by side | stacked | stacked, stat tiles 1 column below 430 |
| Location | map 2/3 + info 1/3; 4 landmark cards | stacked map; 2×2 cards | same |
| Films | 856px video, arrows outside | arrows inside | arrows inside |
| Walkthrough band | 870px | 440–560px | 240–300px |
| Shorts | 360×640 centre, step 400 | 315px, step 330 | 260px, step 250 |
| Amenity marquee | 300×200 tiles | 260×170 | 200×130 |
| Specs | 412px tabs + panel | 260px tabs + panel | **accordion** (as in the reference) |
| RERA strip | 2 cards in a row | 2 cards | stacked |
| Testimonials | 2×2 | 2×2 | 1 column |
| Company / Contact split | image + text | stacked | stacked; contact image hidden |
| Ongoing projects | 2 columns | 2 columns | 1 column |
