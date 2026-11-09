# Faridh Fikri — Legal & People Operations

Portfolio pribadi Faridh Fikri, dikembangkan oleh Lazarus Dev dengan pendekatan editorial yang menonjolkan pengalaman Corporate Legal, HRGA, administrasi, dan relasi bisnis.

## Teknologi

Website statis HTML, CSS, dan JavaScript tanpa framework atau dependency runtime. Cocok untuk GitHub Pages, Cloudflare Pages, Netlify, ataupun Vercel. Aset foto bersumber dari dokumentasi pribadi yang diberikan secara langsung; foto dioptimasi menjadi WebP tanpa membuat gambar sintetis.

## Menjalankan

```bash
python3 -m http.server 4173
```

Buka `http://localhost:4173`.

## Validasi

```bash
node --check assets/main.js
python3 scripts/validate.py
```

## Struktur

- `index.html` — konten dan metadata SEO
- `assets/style.css` — sistem visual dan responsive layout
- `assets/main.js` — navigasi, transisi, progress baca
- `assets/images/` — dua foto personal asli yang dioptimasi ke WebP
- `assets/docs/Faridh-Fikri-CV.pdf` — CV sumber
- `scripts/validate.py` — pemeriksaan aset dan tautan lokal

## Deploy

Website dapat di-deploy dari root repository (output directory `.`). Untuk GitHub Pages: `Settings → Pages → Deploy from a branch → main / (root)`.

Konten fakta diperoleh dari CV dan dokumen pendukung milik Faridh Fikri, tanpa testimonial, proyek, atau hasil terukur yang dikarang.