# Faridh Fikri — Sculptural Impasto Editorial Portfolio

A **from-zero rebuild**, not an edit of the previous visual components. This website presents Faridh Fikri's *actual legal/HRGA, administrative and sales background*, through the optional Sculptural Impasto mapping researched in [Lazarus Design OS](https://github.com/AzrielChoerulHakim/lazarus-design-os/tree/experiment/sculptural-impasto-visual-mapping-v1/visual-directions/01-sculptural-impasto).

## The client is not a web developer

Faridh is a S1 Ilmu Hukum graduate (UIN Syarif Hidayatullah Jakarta, IPK 3.76, 2021–2025). The portfolio documents four authentic experiences: PT Starlead Technology Indonesia (Corporate Legal & HRGA), Coil Disco Indonesia (Sales), Pengadilan Agama Jakarta Selatan and BNN Kota Tangerang (internships). Education, four trainings, skills and verified contact information are preserved. **There are no invented software projects, awards or testimonials.**

See [Content Integrity Ledger](docs/CONTENT_INTEGRITY.md) for exact transcription and source limitations. In this reconstruction pass, factual detail was checked against the existing CV-grounded portfolio on main. The original CV PDF was **not reattached** in this pass.

## Visual direction

**Surrealist Digital Editorial → Sculptural Impasto.** The image roles follow the Design OS:
- A full, original oil-painting raster about a colonnade dissolving into pigment opens the site as a metaphor, not professional evidence.
- The real Faridh portrait anchors the biography. No synthetic personal image.
- Four legal/work dossiers are rendered as semantic HTML disclosure elements.
- A second standalone impasto painting marks the transition from experience to skills.
- Education, certifications and skills are text-first and factual.
- A final independent oil scene accompanies working email / WhatsApp contact actions.

One painting scene = **one single complete image element**. No SVG art, cutout images, stacked clouds/statues/portals, CSS painting filters, parallax, or pseudo-3D. Text and links are outside the paintings.

### Assets

- assets/faridh-portrait.webp: preserved *verbatim* from the old CV-grounded first-party site.
- assets/impasto-dissolution.webp, assets/impasto-procession.webp, assets/impasto-horizon.webp: **1536×1024**, complete original raster paintings, optimized locally as WebP quality 82 and uploaded to the GitHub branch as actual binary blobs. Each Git blob SHA was verified against original bytes.

These paintings are editorial concepts produced for the Lazarus visual study, **not** Faridh's actual portfolio projects or photographs.

## Develop

A plain static website (no build, no package manager needed):

    python3 -m http.server 8000

Open http://localhost:8000/. Requires no JavaScript library; the four experience disclosures remain usable if JS fails. JavaScript is used only for mobile navigation and section tracking.

## Quality checks

    node --test tests/portfolio.test.mjs
    node scripts/check-portfolio-browser.mjs

The second command requires Playwright/Chromium (the scoped GitHub Action installs it). The action tests the complete actual 1536×1024 paintings, authentic portrait, responsive geometries at 320/390/640/768/1024/1440/832×384, key link targets, four experience records and mobile navigation. It captures full-page screenshots for human comparison. **CI proves functional and geometric checks, not subjective originality or accessibility certification.**

## Deployment

The existing .github/workflows/pages.yml publishes the main branch to GitHub Pages. This reconstruction is intentionally isolated on experiment/faridh-impasto-full-rebuild until visual/code review; the previous main website remains available. The branch can be previewed on Vercel if the repository is connected.

Tone of voice, anti-generic and client evidence standards come from existing Lazarus Design OS, rather than being rebuilt in this repository.