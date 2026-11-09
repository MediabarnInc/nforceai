# nForce AI design system

The source of truth for every colour, font, size, radius and spacing value on the site. Impeccable checks the code against this file. A value that isn't listed here is a bug, or it gets added here on purpose.

Creative idea: **signal from noise**. Calm navy fields with geometry, grain and translucent overlap; one gold or red shape marks the anomaly, "the thing we found".

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--navy` | `#131D36` | Primary ink, dark sections, logo on light |
| `--gold` | `#C49832` | Logo on navy, the anomaly shape, data highlights. Never text on light backgrounds |
| `--red` | `#D6364C` | Primary CTA fill only (white text, 4.7:1) |
| `--red-deep` | `#C21F22` | CTA hover and pressed state |
| `--terracotta` | `#D17453` | Gradient end, shapes, accents on navy (5.0:1). Large text only on white |
| `--blush` | `#FFE3FB` | Light tint for trust and highlight sections |
| `--smoke` | `#F2F5F9` | Alternate light section background |
| `--cream` | `#FFF9F2` | Resource and article surfaces only |
| `--line` | `#E0E4E9` | Dividers and hairlines on light |
| `--ink-muted` | `#4A536A` | Secondary text on light surfaces (6.4:1 or better) |
| `--on-navy-muted` | `#B8BDCB` | Secondary text on flat navy (8.9:1) |
| `--teal` `--violet` `--lavender` `--mauve` | `#3E817B` `#61639A` `#C7C9DD` `#A26FA1` | Data visualisation and tags only |

Rules: gold and red never sit side by side. At most two accents per composition, navy always present. Links are navy (or white on navy) with an underline, never red text.

## Typography

Sora Variable, self-hosted. One family, so hierarchy comes from size, weight and spacing.

| Style | Size | Line height | Weight |
| --- | --- | --- | --- |
| Display | clamp(44px → 72px) | 1.05 | 600 |
| H1 | clamp(36px → 56px) | 1.1 | 600 |
| H2 | clamp(28px → 40px) | 1.15 | 600 |
| H3 | 24px | 1.25 | 600 |
| Lead | 20px | 1.6 | 400 |
| Body | 17px | 1.65 | 400 |
| Small | 15px | 1.55 | 400 |
| Numeral | clamp(56px → 96px) | 1 | 300 |

Headings use letter-spacing -0.02em. Body text stays at default tracking. Max line length 38rem (about 70 characters of Sora at 17px). Sentence case everywhere, no all-caps text, no eyebrow labels above headings.

## Shape and space

- Radius: `0` for sections and tiles, `12px` for the rare card, `999px` for buttons, pills and tags.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Grid: 12 columns, 1280px max content width, gutters 24px, side padding clamp(20px → 48px).

## Shape kit

Rounded blocks on a tight grid with small gaps, in the spirit of mid-century geometric posters, plus the logo's own chevron. Path builders live in `src/lib/shapes.ts`; compositions use `Mosaic.astro`.

- **Blocks:** drop (three round corners, one sharp), bullet (flat on one side, round on the other), dome (half disc), arch, leaf (two opposite round corners), pill, quarter circle, circle, ring.
- **Strips:** tall rounded pills in translucent gradients that overlap the blocks (homepage hero, voice page).
- **No pointed shapes:** no diamonds, chevrons, triangles or hexagons outside the logo itself.
- **Data mark:** a small "×" scattered sparingly on dark fields.
- **The anomaly:** one solid gold circle per composition, never more. It replaces a block in the grid.

Rules: blocks take two-colour gradients from the palette plus grain. At least one translucent shape overlaps others in every composition (multiply on light, screen on dark). Terracotta only on light backgrounds. Heroes are full-bleed: the composition sits directly on the section gradient (the homepage hero uses the light `.ng-dawn`), never in a box. Keep compositions calm: large blocks on a 4-column grid with even gaps, one or two translucent overlapping circles, one gold circle.

## Texture: noisy gradients

Every coloured section is a linear blend between palette colours with a static SVG noise layer (`.grain`). No radial glows, no blur, no glassmorphism, no coloured shadows.

| Class | Blend | Use |
| --- | --- | --- |
| `.ng-dawn` | white → apricot (#f4d6c8) | Light page heroes |
| `.ng-mist` | smoke → lavender | Light content sections, form panels |
| `.ng-linen` | cream → lavender | Every former dark section (page headers on voice and responsible AI, stakes, challenge, why, closing band), plus trust, story and commitment sections and article headers. The footer is a noisy slate-navy gradient (#484E6C to #232840) with pale grey (#EAEFF0) text and logo |

Grain: overlay blend at 18 to 22% on dark fields, multiply at 16% on light fields (add `.grain-light`). Shapes can take a two-colour `gradient` with their own fine grain; never gradient text.

## Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint). No bounce or elastic.
- Duration: 200 to 600ms. Only `transform` and `opacity` animate.
- Content is visible by default; reveals only enhance it. Everything stops under `prefers-reduced-motion`.
