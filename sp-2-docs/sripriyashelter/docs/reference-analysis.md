# Reference analysis — Avittam Nayanmar (design language only)

Reference URL: https://avittamhomes.com/avittam-nayanmar-tambaram/ (captured 18 Oct 2026, IST).
**Only the design language was borrowed.** No Avittam text, logo, photography, video or brand colour was copied into the rebuild.

## How it was observed
| Method | Tool | Result |
|---|---|---|
| Viewport capture | REA `capture_web_screenshot` (CDP Chrome on 127.0.0.1:9333) | Worked: 1440×813 PNG artifact (`screenshots/rea-reference-viewport-1440.png`) |
| DOM / a11y / resources | REA `inspect_web_page` | Worked (policy-filtered sections noted by the tool) |
| Bundle / CSS | REA `analyze_web_bundle` | Worked; raw CSS also saved and read directly |
| Interaction scenario | REA `capture_browser_scenario` (390px: close popup → open menu) | First run blocked by `#enquiryPopup` overlay; second run with an explicit close step completed |
| Full-page captures at 1920/1440/1280/1024/768/430/390/375 | Playwright (system Chrome) | Worked (REA viewport capture never scrolls, so full-page was done in Playwright) |
| Computed styles | Playwright `getComputedStyle` sweep (`scratch/styles-av.mjs`) | Worked at 1440 and 390 |

## Observed layout system (measured, not guessed)
- **Grid/container:** Bootstrap-style container, max-width 1320px, 12px gutters; breakpoints 576/768/992/1200/1400/1600.
- **Header:** fixed, white, 80px (90px on mobile), shadow `0 0 8px rgba(0,0,0,.2)`. Hides on scroll down (`translateY(-190%)`) and returns on scroll up, 400ms ease-in-out. Serif nav at 18px. One orange pill CTA (radius 30px, ring shadow). A hamburger opens an off-canvas panel at every width.
- **Typography:** display serif headings (48px/800 on desktop). Body is a neutral sans at 14–16px, colour #666. Eyebrows are 13px/800 uppercase with 3px tracking in a tinted pill (radius 50px, 10% fill, 30% border).
- **Cards (`why-card`):** radius 16px, soft shadow `0 10px 40px rgba(0,0,0,.05)`, 1px tinted border. On hover: lift −10px, deeper shadow, a top rule scaling in on X, and the icon scaling to 1.1. Transition .5s `cubic-bezier(.4,0,.2,1)`.
- **Buttons:** .25s `cubic-bezier(.645,.045,.355,1)`, circle-fill hover and an arrow swap.
- **Section rhythm (home):** hero banner (830px) → warm gradient "why" cards → wide image → dark overview with glass card (radius 24, padding 50) → location map card → video sliders → gallery carousel with giant marquee text → dark amenities tiles → specification vertical tabs → orange RERA strip → dark testimonials grid → company split → contact split with underline inputs → ongoing projects → dark footer with tri-colour top strip.
- **Motion:** WOW.js `fadeInUp` reveals with 0.1s stagger; marquee text; slider arrows.
- **Overlays:** a Quick Enquiry modal (image left, form right) auto-opens on load; a fixed side "Enquire" tab; floating WhatsApp/call buttons.

## What was adopted vs. rejected
| Pattern | Adopted? | Notes |
|---|---|---|
| Fixed hide-on-scroll header + pill CTA + off-canvas | Yes | `useScrollDirection`, same timings |
| Eyebrow pill + big serif heading | Yes | Sripriya colours and fonts |
| Lift-on-hover cards with top rule | Yes | `.5s cubic-bezier(.4,0,.2,1)` |
| Dark overview with glass card | Yes | Deep navy derived from the Sripriya secondary colour instead of black |
| Giant outlined/marquee brand text band | Yes | "SRIPRIYA SHELTER" |
| Gallery carousel with arrows | Yes | |
| Vertical spec tabs | Pattern reused for **Plans & Drawings** (Sripriya publishes no specifications) |
| RERA strip | No | No RERA number is published → listed in missing-content.md |
| Video / shorts sliders | No | Sripriya has no videos |
| Auto-opening modal | No | Intrusive; the modal opens only from the side tab or CTAs |
| Yellow price highlight, black dark sections | Replaced | Brand orange / derived navy |
