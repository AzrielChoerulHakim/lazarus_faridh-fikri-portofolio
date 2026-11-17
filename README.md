# Faridh Fikri — The Sculptural Impasto Exhibition

**Branch:** experiment/faridh-sculptural-impasto-v2  
**Direction:** Surrealist Digital Editorial → Sculptural Impasto, from [Lazarus Design OS](https://github.com/AzrielChoerulHakim/lazarus-design-os/tree/experiment/sculptural-impasto-visual-mapping-v1/visual-directions/01-sculptural-impasto).

## Built from scratch: the art direction now decides the site

The previous experiment placed small paintings beside conventional serif headlines. This iteration **abandons that composition entirely**.

The site behaves like an authored visual publication:
1. **Cover / Typographic masthead** — Faridh Fikri's name becomes an independent, monumental title on the bone-pigment-colored page. The actual opening scene is **one intact 1536×1024 painting** occupying the website's full exhibition width, not a side-card.
2. **Profile / Actual person** — authentic Faridh photograph and CV-based narrative, in a dark indigo dossier; the painting is never falsely represented as professional work.
3. **Work / Primary evidence** — four genuinely held roles in a typeset professional ledger. No image distraction; every detail is accessible from native HTML disclosures.
4. **Intermission / Physical pigment** — another uninterrupted original impasto painting breaks the reading rhythm, with a clearly separate explanatory title and caption.
5. **Skills / Text-only material** — four actual skill families, no decorative cards.
6. **Education / Record** — the real degree, IPK 3.76/4.00 and four training items form a structured typographic archive.
7. **Contact / Useful ending** — verified email and WhatsApp remain visible and keyboard-reachable; no fictional creative projects.

## Non-negotiable visual constraints

- One scene = **one original complete raster**. No artistic SVG, canvas, assembled cutouts, overlapping image collage, CSS fog/lighting, fake bump maps, or parallax.
- The two used oil-painting files are **1536×1024** and committed as real binary Git objects in assets/.
- Visual decisions follow the Design OS dual lighting model (moonlit illustrated world and oblique raised paint relief), spatial D0–D4 planes and section/responsive mapping.
- Image depth and paint strokes already exist inside the originals. Web CSS only defines editorial space, framing, colors and typography.
- Important text remains HTML outside artwork and works without visual effects.
- Painting is labeled as a conceptual metaphor, never as a portfolio of Faridh's own design projects.

## Exact career source

See [Content Integrity Ledger](docs/CONTENT_INTEGRITY.md). All factual content is derived from the previous CV-grounded main-branch site (Faridh Fikri, law degree UIN Jakarta, Corporate Legal / HRGA, Starlead, Coil Disco, Pengadilan Agama Jakarta Selatan and BNN Kota Tangerang, 4 trainings, GPA, original contact). The old PDF CV was not newly attached at this stage, so the ledger states this evidentiary boundary. The actual Faridh portrait has been preserved byte-for-byte.

## Code and visual QA

This is a static website, no build command or app framework required. To run locally:

    python3 -m http.server 8000

From repo root open \`http://localhost:8000/\`.

    node --test tests/portfolio.test.mjs
    node scripts/check-portfolio-browser.mjs

The browser script runs in GitHub Actions with Playwright Chromium and collects full-page screenshots at **320, 390, 640, 768, 1024, 1440 and 832×384**. It checks full-res loaded images, the full-width hero, portfolio details, functional menu/disclosures, and horizontal overflow. Image quality and visual authorship are assessed additionally via real screenshots; CI is not proof of aesthetic excellence or full accessibility certification.

The pre-existing GitHub Pages workflow still publishes only \`main\`. This rebuild is intentionally isolated for review, and does not interfere with the current public site.

## Design decisions

[Art-direction reconstruction audit](docs/ART_DIRECTION_RECONSTRUCTION.md) explains why the rejected generic cards were discarded and how the painting-to-information translation now works. Tone of Voice, Anti-AI Generic, Typography and the original Lazarus production workflow remain external OS authorities, not rebuilt here.
