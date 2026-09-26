# AI Rules & Project Architecture

## Tech Stack
- **Architecture**: Zero-JS static site built for maximum performance, SEO, accessibility, and minimal bundle overhead (Lighthouse Mobile target: 100/100).
- **HTML / Template**: Vanilla semantic HTML5 (`src/index.html`) with build-time placeholder interpolation (`%WA%`, `%SITE_URL%`) and inlined critical assets.
- **Styling**: Tailwind CSS v3 configured in `tailwind.config.js` and compiled via `@tailwindcss/cli` with purge and minification.
- **Typography**: Self-hosted variable font (`Plus Jakarta Sans` in `public/fonts/`) with a custom zero-layout-shift font fallback (`Jakarta Fallback`).
- **Icons**: Inline SVG symbol sprite (`src/icons.svg`) with Material Symbols referenced via `<svg class="ic"><use href="#i-..."/></svg>`.
- **Image Pipeline**: `sharp` via Node.js script (`scripts/images.mjs`) to generate responsive multi-density AVIF/WebP images and Open Graph banners from `assets/photos/`.
- **Build Engine**: Node.js ESM build script (`scripts/build.mjs`) that inlines minified CSS and SVG sprites, calculates SHA-1 cache-busting query strings, and outputs `dist/`.
- **Configuration**: `site.config.json` as the single source of truth for business variables (WhatsApp phone number and site URL).
- **Deployment & Edge**: Vercel static hosting configured via `vercel.json` with immutable asset caching and strict security headers.

---

## Library & Tooling Usage Rules

### 1. Styling & Design System
- **Use**: Tailwind CSS utilities and custom classes defined in `tailwind.config.js` and `src/styles.css`.
- **Do NOT use**: CSS-in-JS libraries, component UI libraries (e.g., Radix, shadcn, Bootstrap), or external CSS stylesheets.
- **Rule**: All design tokens (custom palette such as `primary`, `surface`, `gold`, and typography scales) must be configured in `tailwind.config.js`.

### 2. Icons
- **Use**: Inline SVG symbols located in `src/icons.svg`.
- **Syntax**: `<svg class="ic w-5 h-5"><use href="#i-icon_name" /></svg>`.
- **Do NOT use**: Icon packages (`lucide-react`, `font-awesome`, Google Fonts CDN links).
- **Rule**: To add a new icon, add its `<symbol id="i-name" viewBox="0 0 960 960">...</symbol>` path to `src/icons.svg`.

### 3. Image Processing & Media
- **Use**: `sharp` within `scripts/images.mjs` for resizing, compression, AVIF/WebP generation, and dynamic placeholder fallbacks.
- **Source Files**: Place high-resolution original images in `assets/photos/` and run `npm run images`.
- **Output Files**: Referenced from `public/img/` using `<picture>` with responsive `srcset` (AVIF + WebP).
- **Do NOT use**: Heavy unoptimized image formats directly in `src/index.html` without responsive srcset.

### 4. Client-Side Scripting & Runtime
- **Use**: Semantic HTML5 elements and CSS-only interactions (e.g., details/summary, CSS pseudo-classes, anchor scrolling).
- **Do NOT use**: React, Vue, jQuery, or runtime client-side JavaScript bundles unless explicitly requested.
- **Rule**: Keep the client bundle at 0 KB of JS to maintain 100 Lighthouse performance.

### 5. Build & Environment Configuration
- **Use**: `scripts/build.mjs` for compiling, inlining, asset cache-busting, and generating `dist/index.html`, `dist/robots.txt`, and `dist/sitemap.xml`.
- **Use**: `site.config.json` for contact numbers, conversion links, and canonical URLs.
- **Use**: `vercel.json` for security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) and long-term cache headers.
