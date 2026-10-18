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

## v2: section-by-section metrics used for the recreation (1440px, measured with Playwright `getComputedStyle` + REA)

| # | Reference section | Height | Key measurements | Rebuild |
|---|---|---|---|---|
| 1 | Hero | 830 (header 80 fixed) | full-bleed banner; coloured stats strip at base | 750px banner + orange stats strip; navy gradient over the elevation photo |
| 2 | Why | 1608 | pad 100; gradient 135° #fff9f6→#fff1f1; cards 412×562, r16, border rgba(255,94,20,.2), shadow 0 10 40 rgba(0,0,0,.05), stagger .1s | identical tokens |
| 3 | Terrace | 1019 | pad 80; gradient white→orange 8%; bordered r16 image | same |
| 4 | Dark overview | 1079 | pad 120; #050505 + network; image 616×728 + 80% card + badge; glass card r24 p50 | navy-ink + orange network SVG; same geometry |
| 5 | Location | 1692 | pad 100; #f9f9f9; map 863×450 + info, orange border r24; 4 vertical video cards + labels | same (2×2 on mobile) |
| 6 | Creators slider | 820 | pad 80; single 856×482 video, outside arrows, caption | same |
| 7 | Video band | 870 | full width | 870 (scales down to 240 at 390) |
| 8 | Shorts | 1180 | centre 360×640, sides 90%, arrows + dots | same, 3 visible |
| 9 | Big text band | 650 | giant text at the image base | 650, marquee wordmark |
| 10 | Gallery | 1562 | carousel + Updates carousel | same + lightbox |
| 11 | Amenities | 1090 | pad 120 dark; 3 marquee rows of image tiles | same, alternating directions, pause on hover |
| 12 | Specs | 1102 | pad 120 #f4f7f9; tabs 412w + panel; accordion on mobile | same |
| 13 | RERA | 210 | orange; 2 white QR cards | same |
| 14 | Testimonials | 1479 | #111 pad 100; 2×2 video cards, stars + title | same + published quotes |
| 15 | Company | 1018 | pad 130/160; gradient white→#ffe5d3; image + text + "To Learn More" | same |
| 16 | Contact | 1007 | image left; underline form Name/Phone/Interested In/Message | same (+ Email, which the original's validation requires) |
| 17 | Ongoing projects | 1220 | #f9f9f9; 2 cards, overlapping white panel | same |
| 18 | Footer | 598 | #0a0a0a | navy-ink footer (Sripriya colours) |

Popups: the reference auto-opens a split Quick Enquiry popup (image left with "Enquiry Now", form right: name, phone, interested in, when planning to buy, Send OTP). The rebuild matches the layout and fields. It does **not** fake an OTP: the form validates name and phone, then opens a pre-filled email, or POSTs to `NEXT_PUBLIC_ENQUIRY_ENDPOINT` when that is configured. Reference page height is 19 042px; the RoseLand rebuild is 19 666px (the extra height is the real Plans & Drawings section).
