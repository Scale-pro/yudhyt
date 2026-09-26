---
name: Clinical Vitality & Trust
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#49607c'
  primary: '#001428'
  on-primary: '#ffffff'
  primary-container: '#0f2942'
  on-primary-container: '#7991af'
  inverse-primary: '#b0c9e8'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#001805'
  on-tertiary: '#ffffff'
  tertiary-container: '#002f10'
  on-tertiary-container: '#00a54b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b0c9e8'
  on-primary-fixed: '#011d35'
  on-primary-fixed-variant: '#314863'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 52px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 19px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-credential:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-cta:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style
The design system delivers an authoritative, deeply compassionate, and modern clinical environment. It targets individuals seeking evidence-based medical solutions for metabolic dysfunction, hypothyroidism, and sustained weight management—patients who frequently experience medical dismissal or clinical fatigue.

The visual direction merges **Modern Healthcare** with **Refined Editorial Warmth**. Rather than sterile clinical whites and cold technology tropes, the interface uses rich, grounding navies paired with luminous restorative teals and soft porcelain surfaces. The experience must evoke clinical excellence, emotional validation, transparency, and immediate conversion capability without feeling transactional.

## Colors
The palette balances authoritative medical governance with biologic vitality and high-conversion cues:

- **Primary (`#0F2942`)**: Deep Medical Navy. Anchors navigation, foundational typography, regulatory badges (CRM-SP), and key hero panels. Conveys institutional trust, scientific rigor, and security.
- **Secondary (`#0D9488`)**: Restorative Soft Teal. Highlights medical specialties, clinical tags, key statistics, subtle decorative backdrops, and active states. Reflects metabolic renewal and cellular vitality.
- **Tertiary (`#25D366`)**: Direct-Action WhatsApp Green. Reserved strictly for primary patient acquisition, consultation booking CTAs, and the persistent conversion anchor.
- **Neutral (`#64748B`)**: Slate Gray. Drives supporting body copy, iconography borders, and secondary structural lines without visual harshness.
- **Surface Accents**: Crisp White (`#FFFFFF`) for elevated treatment cards, paired with Warm Off-White (`#F8FAFC`) and Light Aquamarine tint (`#F0FDFA`) for alternating patient path sections.

## Typography
Plus Jakarta Sans was selected for its modern geometric precision combined with organic, humanized terminals. This dual nature ensures dense medical explanations remain effortlessly legible on small screens while projecting a sophisticated, warm clinical aura on display titles.

Titles utilize negative letter spacing to feel tight, confident, and professional. Medical accreditations (such as CRM badges and protocol stamps) use uppercase tracking for clinical authority. Body copy prioritizes generous line heights (1.5x to 1.6x) to reduce cognitive load for patients reviewing complex symptom descriptions.

## Layout & Spacing
The layout follows a structured 12-column desktop fluid system constrained to a maximum content container of 1200px to ensure focused reading arcs and prevent eye fatigue. On mobile breakpoints (&lt;768px), the layout compresses into a single-column 4-grid structure with 1.25rem outer margins and continuous vertical flow.

Spacing scales deliberately between therapeutic quiet zones (3rem to 5rem between distinct protocol sections) and tightly paired informational clusters (0.5rem to 1rem between medical claims, icons, and micro-copy).

## Elevation & Depth
Depth is constructed through ambient clinical diffusion rather than heavy physical drops:

- **Surface Baselines**: Base canvases use flat `#FFFFFF` and `#F8FAFC` to establish cleanliness and open light.
- **Medical Cards & Pillars**: Utilize a dual-layer approach: a sharp 1px low-contrast boundary (`rgba(15, 41, 66, 0.08)`) coupled with a wide, soft ambient shadow (`0 8px 30px -4px rgba(15, 41, 66, 0.05)`). This conveys physical weight and pristine finish without visual clutter.
- **Conversion Badges & Floating Widget**: The WhatsApp floating widget and prominent sticky booking triggers feature a high-performance lift: `0 12px 28px -6px rgba(37, 211, 102, 0.35)`, ensuring the primary patient action floats distinctly above the informational layers.

## Shapes
A roundedness level of `2` (0.5rem base radius) is maintained to project accessibility, safety, and clinical gentleness. Card components and specialty blocks scale up to `rounded-lg` (1rem) to soften content grouping. Conversion buttons, accreditation pills, and floating action anchors utilize full pill-shaped radiuses to invite physical interaction and align with standard messaging metaphors.

## Components

### Buttons
- **Primary Conversion CTA (WhatsApp Booking)**: Full pill geometry, background `#25D366`, text `#FFFFFF`, bold weight. Left-aligned WhatsApp brand icon. Hover states introduce a subtle scale transform (`1.02`) and elevated green shadow.
- **Secondary CTA (Clinical Explanations)**: Deep Navy (`#0F2942`) solid or ghost border (`1.5px solid #0F2942`), text matched to border. Used for reading complete treatment protocols or patient prep guides.

### Accreditations & Trust Chips
- Compact pill indicators with `#F0FDFA` background, `#0D9488` border (`1px`), and `#0F2942` text. Displays doctor verification: "CRM-SP 235037", "Especialista em Saúde Metabólica", and "Medicina Personalizada".

### Specialty & Diagnostic Cards
- White background (`#FFFFFF`) with 16px corner radiuses and subtle slate borders (`#E2E8F0`).
- Features a localized teal icon well at top-left (`#E6FFFA` background, `#0D9488` icon), followed by a semibold medical title, targeted symptom bullets, and treatment outcomes.

### Proof & Testimonial Blocks
- Clean, quotation-focused cards with subtle teal left border accents (3px). Includes patient demographics, verified treatment milestones (e.g., "Remissão de Sintomas - 6 Meses"), and star ratings in warm amber.

### Persistent Floating WhatsApp Widget
- Fixed lower-right position (24px offset on desktop, 16px on mobile).
- Green badge (`#25D366`) accompanied by an auto-expanding conversational tooltip: *"Dra. Yudyd está online. Agende sua avaliação metabólica."*