---
name: Resonance Infrastructure Light
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3a494b'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6a7a7b'
  outline-variant: '#b9cacb'
  surface-tint: '#00696f'
  primary: '#00696f'
  on-primary: '#ffffff'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00dce6'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#585f69'
  on-tertiary: '#ffffff'
  tertiary-container: '#d5dbe7'
  on-tertiary-container: '#59606a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#dde3ef'
  tertiary-fixed-dim: '#c1c7d2'
  on-tertiary-fixed: '#161c24'
  on-tertiary-fixed-variant: '#414751'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Satoshi
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Satoshi
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The design system embodies the "Industrial Swiss Engineering" aesthetic—a philosophy where precision meets modern infrastructure. The brand personality is authoritative yet transparent, moving away from dark-mode mystique toward a high-end, light-mode operational clarity. 

The visual style is **Corporate / Modern** with a **Minimalist** foundation. It prioritizes structure, high-contrast readability, and technical sophistication. By utilizing a soft white and slate canvas, the interface feels expansive and breathable, while "Electric Cyan" accents provide high-energy signals for critical actions and status indicators. The intended emotional response is one of reliability, speed, and uncompromising technical quality.

## Colors
This design system utilizes a high-clarity light palette designed for long-form data consumption and professional workflows.

- **Primary (Electric Cyan):** Used exclusively for high-contrast CTAs, progress indicators, and active states. It serves as the "resonance" that cuts through the neutral interface.
- **Secondary (Deep Indigo-Slate):** The primary color for all typography, icons, and structural emphasis. Its deep tone ensures AAA accessibility against the light background.
- **Tertiary (Technical Grey):** Reserved for hairline borders, dividers, and inactive states. It defines the "engineering" grid without adding visual weight.
- **Neutral (Soft White/Slate):** The foundational surface color. It provides a clean, clinical backdrop that reduces eye strain compared to pure white.

## Typography
The typography system follows a rigorous hierarchy. **Hanken Grotesk** (selected as the closest available substitute for Cabinet Grotesk) provides a bold, architectural feel for headlines. **Satoshi** is used for body text to maintain a modern, neutral legibility. **JetBrains Mono** is introduced for small technical labels and metadata to reinforce the industrial/infrastructure narrative.

Headlines should use tight tracking to emphasize the "Swiss" influence, while body text requires generous line heights to ensure readability against the light background. All technical labels must be in uppercase to distinguish them from prose.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop and a **Fluid Grid** on mobile. 

- **Desktop:** A 12-column grid with a maximum container width of 1280px. Gutters are fixed at 24px to ensure a structured, technical appearance.
- **Mobile:** A 4-column fluid grid with 16px margins. 
- **Rhythm:** Spacing follows an 8px geometric scale. Padding within components (like cards) should be generous (min 32px) to maintain the minimalist, airy aesthetic.

Layout transitions should be abrupt and precise, reflecting the "engineering" nature of the design. Use white space as a structural element to separate functional groups rather than relying on heavy background fills.

## Elevation & Depth
In this light-mode iteration, depth is created through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows.

1.  **Surfaces:** The primary background is `#F8FAFC`. Secondary surfaces (like cards or sidebars) can use pure `#FFFFFF` to subtly lift them from the background.
2.  **Borders:** Use 1px solid lines in `#E2E8F4` for all container boundaries. This creates a "blueprint" or technical schematic feel.
3.  **Shadows:** Shadows are minimized. If necessary for temporary states (like dropdowns), use a single, ultra-diffused shadow: `0px 10px 30px rgba(15, 23, 42, 0.05)`. 
4.  **Interaction:** Depth is communicated through color shifts (e.g., a button filling with Electric Cyan) rather than physical extrusion.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the industrial aesthetic, making the professional interface feel modern and accessible without becoming "bubbly."

Large containers like cards or hero sections use `rounded-lg` (0.5rem), while buttons and input fields use the base `rounded` (0.25rem). Status chips and purely technical badges may remain sharp or use a very subtle corner radius to maintain the engineering vibe.

## Components
- **Buttons:** Primary buttons use `#00F2FE` background with `#0F172A` text for maximum contrast. Secondary buttons use a `#E2E8F4` border with no fill.
- **Input Fields:** Use a `#FFFFFF` fill with a `#E2E8F4` border. On focus, the border transitions to `#0F172A` (not the accent color) to maintain a professional, grounded feel.
- **Cards:** White backgrounds (`#FFFFFF`) with a 1px `#E2E8F4` border. No shadows.
- **Chips/Badges:** Small, technical labels using `label-caps` typography. Status signals for "Active" or "Online" utilize the Electric Cyan as a small dot or a light glowing background.
- **Lists:** Separated by horizontal technical lines (`#E2E8F4`). Use JetBrains Mono for list numbering or timestamps.
- **Interactive Elements:** Hover states should involve subtle shifts—either a background tint change to a very light slate or a slight darkening of the border.