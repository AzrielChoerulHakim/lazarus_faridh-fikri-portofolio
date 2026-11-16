# Faridh Fikri — Surreal Editorial Portfolio

A self-contained static portfolio grounded in the supplied Faridh Fikri CV and portrait. Designed with one coherent surreal architectural background, not layered ornamental SVGs.

## Run and publish

Open `index.html` in a browser. For GitHub Pages, publish the `main` branch using the included `.github/workflows/pages.yml` workflow. For Vercel, import as a plain static website with no build command.

## Creative and interaction notes

- The original surreal background and authentic client portrait are embedded directly in `index.html` as optimized images.
- Editorial Indonesian copy is a casual-friendly creative proposal, not an attributed quotation by Faridh. All biographical details must stay aligned with the supplied CV.
- No decorative SVGs or redundant arrow glyphs. Accordion expand/collapse indicators remain because they signal a real interaction.
- Camera-depth movement follows scroll on desktop. The backdrop also has a subdued ambient daylight effect. Navigation state, portrait entrance and experience disclosures use purposeful transitions.
- On mobile and short-height viewports the background remains stable; `prefers-reduced-motion` disables ambient and scroll-driven effects while retaining all content and functionality.
- Typography uses Cabin from Google Fonts with system fallbacks. No font binaries, third-party JS, analytics or backend are bundled.

## Verification

Reviewed screenshot renders at 320, 390, 640, 768, 1024 and 1440 CSS pixels plus 832×384 short landscape; observed no horizontal overflow, broken embedded images, redundant arrow characters or runtime JavaScript errors. Checked mobile navigation, disclosure toggling, internal section anchors and reduced-motion fallback. Desktop scene variables were verified to change with scrolling. This is not a claim of complete WCAG certification or cross-browser compatibility testing.
