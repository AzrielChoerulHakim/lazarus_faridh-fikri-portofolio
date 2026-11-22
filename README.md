# Faridh Fikri — The Surrealist World Portfolio

**Implementation branch:** `experiment/faridh-surrealist-brutalism-v3`  
**Public main branch:** preserved unchanged pending human review.  
**Direction:** Sculptural Impasto × Immersive Editorial Typography × Lazarus Scroll Director.

## The art is the environment, not an insert

V4 removes the previously framed image plates. Each of the same three original paintings now fills its own visual world with live HTML typography composed on the same surface. Real career text stays normal semantic HTML. No new image sources, raster cutouts, fragment composites or fictional professional claims were introduced.

- **Opening:** Faridh's name, headline and direct navigation inhabit the first full-bleed impasto scene. The paint texture remains an original authored raster, without browser-added lighting effects that pretend to alter the canvas itself.
- **Profile:** the authentic unaltered portrait and CV-backed identity continue on the same midnight-indigo reading surface.
- **Work:** the second original painting is a full-width atmospheric background, persistent under four real professional chapters on desktop. Each actual work entry remains ordinary text and scrolls in normal reading order.
- **Interlude:** the old full-screen type scrub is reduced to an immediate static statement, avoiding a third competing high-salience scroll system.
- **Skills / education:** typographic factual indexes, with the preserved degree, GPA, training and skills.
- **Horizon:** the third original painting occupies the entire exit stage, with the closing headline on the image itself. The real email and WhatsApp follow directly.

The painting is a conceptual editorial metaphor, **never** misrepresented as Faridh's own client work. The full original three 1536×1024 WebP files remain unmodified; `object-fit: cover` may make an editorial crop at narrow viewport ratios while preserving the underlying image.

## Scroll grammar: sourced from Lazarus Design OS

Read [scroll-plan.json](scroll-plan.json) and the upstream [Scroll Director](https://github.com/AzrielChoerulHakim/lazarus-design-os/blob/main/docs/SCROLL_SYSTEMS.md).

**S04 Sticky Evidence Exchange (dominant):** the full-bleed artistic scene stays in place while four real work articles pass through it. Active-state labels and chapter emphasis derive from `app.js`'s existing `#work-count`; `advance.js` only subscribes to that same value and does not maintain a second progress clock.

**S03 Native Snap Chapter Strip (supporting):** at small widths, the complete career chapters appear as directly swipeable native horizontal records, with functional previous/next controls. No custom dragging, frozen wheel or forced vertical-to-horizontal mapping.

Other candidate effects, including depth parallax, zoom transit and typographic scrub, were rejected for this portfolio because they add spectacle without substantiating the CV evidence.

## Code and safeguards

- `index.html`: real CV content and one ordinary image element per art scene.
- `styles.css`: original semantic information styling.
- `advance.css`: retained experimental editorial baseline.
- `world.css`: **latest immersive art direction**; full-bleed environments, world-to-type relationships, responsive and reduced-motion recomposition.
- `app.js`: single canonical work chapter state, native mobile menu and scroll-snap buttons.
- `advance.js`: one small state adaptor for the selected S04/S03 mechanisms.
- `scroll-plan.json`: verified reader jobs, source evidence, rejected systems, desktop/mobile/reduced-motion fallbacks; release QA left pending human checks.
- `docs/CONTENT_INTEGRITY.md`: provenance of all actual professional facts and images.
- `tests/portfolio.test.mjs`, `scripts/check-portfolio-browser.mjs`: semantic and browser behavior tests.

Run locally from repo root:

```bash
python3 -m http.server 8000
node --check app.js
node --check advance.js
node --test tests/portfolio.test.mjs
# with Playwright + Chromium installed:
node scripts/check-portfolio-browser.mjs
```

GitHub Actions additionally validates the `scroll-plan.json` **decision** stage against a pinned Lazarus Design OS revision. Release validation still requires observed screenshot evidence inside the final reviewed repository, actual touch and keyboard testing, visual inspection and approval.

## Release boundary

`main` and the live public deployment are deliberately untouched. This work remains a draft PR so the visual result can be reviewed before merging. The original CV PDF was not reattached in this task; no new unverified assertions were added.
