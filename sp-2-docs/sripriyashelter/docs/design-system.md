# Design system

Source of truth: `src/app/globals.css` (CSS custom properties + Tailwind v4 `@theme inline`).

## Colour tokens
| Token | Value | Source |
|---|---|---|
| `--brand-primary` | hsl(12 98% 53%) · #fd4112 | Original CSS `--primary` |
| `--brand-primary-strong` | hsl(12 98% 45%) · #e32f02 | Original CTA gradient end stop |
| `--brand-secondary` | hsl(234 100% 21%) · #000b6b | Original CSS `--secondary` / foreground |
| `--brand-accent` | hsl(220 14% 96%) · #f3f4f6 | Original `--accent` |
| `--background-primary` | #ffffff | Original |
| `--background-secondary` | hsl(220 20% 97%) · #f6f7f9 | Original light bg |
| `--text-primary` | #000b6b | Original foreground |
| `--text-secondary` | hsl(220 9% 46%) · #6b7280 | Original gray |
| `--border-color` | #e5e7eb | Original |
| `--brand-secondary-deep` | hsl(234 100% 11%) | **Derived** — dark sections (the reference uses black) |
| `--brand-secondary-ink` | hsl(234 60% 7%) | **Derived** — footer / darkest surfaces |
| `--brand-primary-soft` / `-line` | primary at 10% / 30% | **Derived** — eyebrow pill (pattern from the reference) |
| `--surface-warm` | warm gradient tint | **Derived** — "why" section background |

Tailwind aliases: `brand`, `brand-strong`, `navy`, `navy-deep`, `navy-ink`, `accent`, `surface`, `surface-alt`, `ink`, `muted`, `line`.

## Typography
| Role | Font | Size / weight |
|---|---|---|
| Headings h1–h6, logo wordmark | Playfair Display (`next/font`, `--font-playfair`) | page h1 38→56px, section h2 32→40→48px, 700 |
| Body / UI | DM Sans (`next/font`, `--font-dm-sans`) | 15–16px body, line-height 1.7, muted colour |
| Eyebrow | DM Sans | 12–13px, 800, `tracking-[3px]`, uppercase, pill |
| Nav | DM Sans 15px (desktop) / Playfair 28px (off-canvas) | |

## Spacing & layout
- `.container-site`: max-widths 540/720/960/1140/1320 at 576/768/992/1200/1400, 12px gutters (mirrors the reference grid).
- `.section-y`: 100px vertical padding on desktop, 64px on mobile.
- Header height `--header-height: 80px`.
- Extra breakpoint `xs: 430px`.

## Radii & shadows
- Original `.5rem` (8px) for inputs/small UI, `--radius-card` 16px, `--radius-media` 24px (glass panels, media), pills 999px.
- Card shadow `0 10px 40px rgb(0 0 0 / .05)`; hover `0 20px 50px rgb(0 0 0 / .15)`; header `0 0 8px rgb(0 0 0 / .2)`.

## Motion
| Name | Value | Used by |
|---|---|---|
| `--ease-standard` | cubic-bezier(.4,0,.2,1), 500ms | Card lift, top rule, icon scale |
| `--ease-button` | cubic-bezier(.645,.045,.355,1), 250ms | Circle-fill button hover, arrow swap |
| Header | 400ms ease-in-out translateY | Hide on scroll |
| `.reveal` | opacity/translate 800ms `--ease-standard`, 100ms stagger via `--reveal-delay` | Section entrances (IntersectionObserver) |
| `hero-zoom` | 7s slow scale | Hero slides cross-fade |
| `marquee` | linear loop | Brand text band |
| motion/react | spring/opacity | Modal, off-canvas, lightbox |

`prefers-reduced-motion: reduce` disables reveals, marquee, zoom and smooth scrolling.

## Components
`ButtonLink`/`Button` (primary, outline, outline-light, ghost-light), `Eyebrow`, `SectionHeading`, `Reveal`, `AssetPlaceholder`, `Logo`, `StatusBadge`, `Lightbox`, `ProjectCard`, `EnquiryForm` (underline/boxed), `SocialIcon`; layout `Header`, `MobileNavigation`, `Footer`, `FloatingActions`, `EnquiryProvider`.
