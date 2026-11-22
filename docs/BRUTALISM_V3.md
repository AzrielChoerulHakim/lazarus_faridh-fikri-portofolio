# Faridh — Immersive Sculptural Impasto / Current Art Direction

> V4 evolution within the V3 experimental branch. The earlier V3 boxed-image / long-pinned-scene direction has been superseded.

## Core decision

**Rejected:** fixed painted plates inserted between ordinary webpage blocks. Those plates made the art feel like illustrations *attached to* a site rather than its governing environment.

**Chosen:** a three-world typographic narrative. Each original painting becomes a complete, full-bleed picture plane with live HTML components spatially composed above it. Adjacent sections draw their pigments and contrast from the actual art; large typography sits *inside* the picture, not in a card nearby.

### World 01 — Arrival

`assets/impasto-dissolution.webp` fills the opening viewport using CSS `object-fit:cover`. The semantic name, professional description and action remain real accessible HTML. A flat dark contrast gradient protects type readability. No masked fragments, moving art cutouts or authored fake glow.

### World 02 — Four real environments

`assets/impasto-procession.webp` is the background of the actual four-entry employment archive. On desktop, the full image remains a CSS-sticky environmental backdrop while the actual professional history scrolls at the right. The four chapter titles, CV text and source organization details stay unchanged. The active state is based on real article positions, computed by `app.js`.

On mobile, the world becomes a finite visual stage followed by a native horizontal strip of genuine work articles (S03), with keyboard/touch access and real previous/next buttons. No vertical-to-horizontal wheel hijack.

### World 03 — Horizon

`assets/impasto-horizon.webp` fills the final visual threshold. The human-readable ending is set within the image composition, followed by directly actionable email and WhatsApp links.

## Scroll Director decision

Source: [Lazarus Scroll Director](https://github.com/AzrielChoerulHakim/lazarus-design-os/blob/main/docs/SCROLL_SYSTEMS.md), verified from repo commit `39c41d6528bfdf2005e3a29d2d37e8d0a71a493a`.

- **S04 Sticky Evidence Exchange** (one dominant mechanism). Reader job: maintain spatial and narrative continuity across four verified CV entries. The painting is editorial metaphor, not itself factual evidence of job duties.
- **S03 Native Snap Chapter Strip** (one supporting mechanism). Reader job: browse those same four entries directly on touch screens.
- **Rejected:** depth parallax / SVG scene slicing (no source-backed depth layers), typographic disclosure (extra spectacle), spatial zoom (no real verified detail), horizontal pinned cinema (traps long copy).

The executable decision record is `scroll-plan.json`. The GitHub workflow runs the Design OS decision validator using a pinned upstream revision.

## Fidelity and fallbacks

- Original images remain the same full-resolution individual WebP files. On different aspect ratios, CSS may crop the view while the original file itself is unmodified.
- No-JS: every fact, figure and link is already in semantic document order.
- Reduced motion: no long pinned world; illustration is finite-height and the four work entries stack vertically.
- Keyboard/touch: no pointer-only shortcuts, no wheel capture, and no fabricated progressive counters.
- All headings stay HTML, with document-true source terms and dates.
- Mobile 320/390 and short-height viewports receive optical type rules and overflow checks.

## Validation boundary

GitHub Actions runs the existing content-integrity tests, Scroll Director decision gate, seven reduced-motion browser viewport renders, two live-motion viewports, reverse-scroll state checks and a no-JS page. These tests verify engineering invariants, not subjective art quality. Manual screenshot and device visual QA is still required before the draft PR is merged.

The source CV PDF was not newly attached for this V4 correction. We preserve the repository's previously verified `CONTENT_INTEGRITY.md` ledger and make no new employment, project or award claims.
