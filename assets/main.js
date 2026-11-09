(() => {
  'use strict';
  const button = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-nav');
  const progress = document.querySelector('.reading-line');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear().toString();
  function closeMenu() {
    if (!button || !mobileMenu) return;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Buka menu navigasi');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  }
  if (button && mobileMenu) {
    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(willOpen));
      button.setAttribute('aria-label', willOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      mobileMenu.hidden = !willOpen;
      document.body.classList.toggle('menu-open', willOpen);
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  }
  let ticking = false;
  function updateProgress() {
    if (progress) {
      const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const percent = Math.max(0, Math.min(100, (window.scrollY / height) * 100));
      progress.style.transform = `scaleX(${percent / 100})`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, {passive: true});
  updateProgress();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }
    }, {threshold: 0.06, rootMargin: '0px 0px -35px 0px'});
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }
})();
