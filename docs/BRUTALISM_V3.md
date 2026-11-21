# V3 / Surrealist Editorial Brutalism

## Intent

Convert a static painting exhibition into an **authored six-act portfolio**. The visitor should feel a change of *spatial grammar* rather than a sequence of cards with slide-up animations. The story must remain subordinate to Faridh's actual qualifications and contacts.

### Source constraints

- Four professional experiences, the degree, GPA, training records, contact fields and exact institution names are unmodified.
- The portrait stays the same first-party raster, without style transfer, masking or identity alteration.
- Three original 1536×1024 oil painting rasters remain individual image elements. They are metaphoric art direction, never portrayed as Faridh's professional projects.
- The CV PDF was not reattached for this change. `CONTENT_INTEGRITY.md` records the provenance and its limitations.

## Design grammar

**Palette:** deep indigo `#14243A`, weathered ivory `#F1E7D8`, rust `#A65F46`, ink `#141B25`. Use large, flat color planes instead of fake generative lighting.

**Type:** Fraunces for human, literary display; IBM Plex Sans as the assertive information voice; IBM Plex Mono for ledgers, institutional metadata and sectional indices. Radical scale shifts replace a generic system of rounded cards, shadows or glass.

**Rhythm:** monumental masthead → full painting → person → four real records → statement wipe → four competencies → academic ledger → intact final painting → contact.

## Scroll choreography (native scroll, sticky framing)

| Scene | Scroll response | Fallback |
| --- | --- | --- |
| Hero | Two reading states: large name and cover text retreat, one complete painting rises, second editorial title emerges | Static title plus whole painting |
| Profile | Photograph and factual dossier gently settle as the reader traverses the pinned room | Static semantic profile |
| Work | Real professional records remain DOM text; native scroll sets the relevant chapter accent; mobile retains native horizontal scroll snap and real buttons | All records visible, fully readable |
| Statement | Exact same-size HTML text copy clips left-to-right according to progress (not a canvas image) | Full legible statement |
| Skills | Text rows receive local current-state emphasis as they enter reading space | Ordinary ordered list |
| Horizon | The complete original painting scales within an object-fit:contain viewport; its separate title sits below | Full image with caption outside |

Implementation uses `requestAnimationFrame` merely to coalesce passive scroll and resize measurements. No document-wide transform, hijacked wheel, artificial smooth-scroll engine, decorative WebGL or split images.

## Responsiveness

- ≥ 721 px: native sticky stage compositions for hero/profile/interlude/horizon and sticky work painting.
- ≤ 720 px: portrait dossier returns to normal reading flow; work records remain native horizontally swipeable chapters with usable buttons; major stage titles are recomposed for narrow screens.
- ≤ 420 px: optical type-size and line-break adjustments prevent horizontal overflow.
- `prefers-reduced-motion: reduce`: pinned long-form scenes collapse into static document sections and the complete painting imagery remains visible.
- All functional text, links, addresses, and career evidence remain in regular HTML, never baked into decorative artwork.

## Review checklist

1. Confirm original CV data, contact links and all four experiences have not changed.
2. Observe hero and statement at mid-scroll on desktop and 390 px mobile; progress must visually correspond to native scroll position.
3. Inspect all three paintings at full extent, with neither segmented parallax nor stretched aspect ratio.
4. Check document width, heading typography, contact links and original images at 320, 390, 640, 768, 1024 and 1440 px, plus short landscape.
5. Verify keyboard navigation, escape-to-close menu, mobile swipe buttons, and reduced motion.
6. Inspect on a real touch device and compare screenshots before approving merge into `main`.

This branch is an **experiment, not a claim of publication or final visual signoff**.
