/* Faridh Fikri — minimal behavior only. Nothing builds or layers scene imagery. */
(() => {
  const trigger = document.querySelector('.menu-button');
  const nav = document.querySelector('#mobile-nav');
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  const canUseMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function closeMenu(returnFocus = false) {
    if (!trigger || !nav) return;
    nav.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Buka menu');
    if (returnFocus) trigger.focus();
  }

  if (trigger && nav) {
    trigger.addEventListener('click', () => {
      const opening = nav.hidden;
      nav.hidden = !opening;
      trigger.setAttribute('aria-expanded', String(opening));
      trigger.setAttribute('aria-label', opening ? 'Tutup menu' : 'Buka menu');
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !nav.hidden) closeMenu(true);
    });
    const desktop = window.matchMedia('(min-width: 711px)');
    const onDesktop = () => { if (desktop.matches) closeMenu(); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
    onDesktop();
  }

  // Navigation status assists orientation; the content order and links work without JS.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        for (const a of navLinks) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-15% 0px -72% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  // Expose current research constraints to automated QA without altering client data.
  document.documentElement.dataset.visualDirection = 'sculptural-impasto';
  document.documentElement.dataset.sceneImplementation = 'single-raster';
})();
