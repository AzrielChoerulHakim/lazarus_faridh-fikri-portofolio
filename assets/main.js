/* Faridh Fikri / The Threshold — functional interactions, no scroll blocking */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const menuButton = $('#menu-button');
  const mobile = $('#mobile-menu');
  const progress = $('.reading-progress');
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  const closeMenu = () => {
    if (!menuButton || !mobile) return;
    mobile.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    document.body.classList.remove('menu-open');
  };
  if (menuButton && mobile) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      mobile.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      document.body.classList.toggle('menu-open', open);
    });
    mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (innerWidth > 930) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  let frame = 0;
  function updateProgress() {
    frame = 0;
    if (!progress) return;
    const height = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / height))})`;
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateProgress); }, { passive:true });
  updateProgress();

  const jobs = [
    { period:'SEPTEMBER — DESEMBER 2025',role:'Management Trainee <em>(HRGA)</em>',organization:'PT Starlead Technology Indonesia',description:'Menangani kebutuhan Corporate Legal, administrasi kontrak PKWT, urusan HR, serta koordinasi General Affairs. Di sini saya belajar melihat hubungan antara ketepatan dokumen dan kelancaran aktivitas perusahaan.',category:'LEGAL / PEOPLE / OPERATIONS' },
    { period:'DESEMBER 2022 — JULI 2026',role:'Freelance Sales <em>Representative</em>',organization:'Coil Disco Indonesia',description:'Menjalankan direct sales, penjualan melalui e-commerce, dan distribusi ke toko. Saya juga berinteraksi dengan pelanggan potensial serta membangun hubungan bisnis untuk pembelian berulang.',category:'SALES / BUSINESS RELATIONS' },
    { period:'FEBRUARI 2024',role:'Legal <em>Internship</em>',organization:'Pengadilan Agama Jakarta Selatan',description:'Membantu pemeriksaan berkas gugatan, verifikasi dokumen perkara, dan pengarsipan dokumen litigasi secara sistematis. Pengalaman ini memberi saya pemahaman praktis tentang ketelitian administrasi perkara.',category:'COURT / LEGAL ADMINISTRATION' },
    { period:'JANUARI 2023',role:'Administrative <em>Internship</em>',organization:'BNN Kota Tangerang',description:'Mendukung administrasi hukum, persuratan, proses penerbitan SKHPN, serta penyusunan laporan dan narasi publikasi instansi. Dari sini saya mengenal pentingnya alur kerja administrasi yang jelas.',category:'PUBLIC ADMINISTRATION' }
  ];
  const triggers = [...document.querySelectorAll('[data-exp]')];
  const detail = $('#journey-detail');
  const updateJob = number => {
    const item = jobs[number];
    if (!item || !detail) return;
    triggers.forEach(btn => {
      const active = Number(btn.dataset.exp) === number;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-expanded', String(active));
    });
    $('#detail-period').textContent = item.period;
    $('#detail-role').innerHTML = item.role; // Trusted, static authored copy only.
    $('#detail-org').textContent = item.organization;
    $('#detail-description').textContent = item.description;
    $('#detail-category').textContent = item.category;
    $('#detail-glyph').textContent = String(number+1).padStart(2, '0');
  };
  triggers.forEach(btn => btn.addEventListener('click', () => updateJob(Number(btn.dataset.exp))));
})();
