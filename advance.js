/* FARIDH / V3 — authored scroll scenes; native scrolling, no scroll hijack. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 720px)');
  const scenes = [
    { el: document.querySelector('.narrative-cover'), property: '--hero-p' },
    { el: document.querySelector('.narrative-profile'), property: '--profile-p' },
    { el: document.querySelector('.statement-stage'), property: '--statement-p' },
    { el: document.querySelector('.horizon-transition'), property: '--horizon-p' }
  ].filter(scene => scene.el);
  const coverType = document.querySelector('.cover-type');
  const workPages = [...document.querySelectorAll('.work-page')];
  const workTrack = document.getElementById('work-pages');
  let raf = 0;

  const clamp = n => Math.max(0, Math.min(1, n));
  const round = n => Math.round(n * 1000) / 1000;

  function progress(element) {
    const bounds = element.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - window.innerHeight);
    return clamp(-bounds.top / travel);
  }

  function activeWorkIndex() {
    if (!workPages.length || !workTrack) return -1;
    if (mobile.matches) {
      const start = workPages[0].offsetLeft;
      const position = workTrack.scrollLeft + start;
      let best = 0, smallest = Infinity;
      workPages.forEach((page, index) => {
        const delta = Math.abs(page.offsetLeft - position);
        if (delta < smallest) { smallest = delta; best = index; }
      });
      return best;
    }
    const focus = Math.min(window.innerHeight * .56, 650);
    let best = 0, smallest = Infinity;
    workPages.forEach((page, index) => {
      const b = page.getBoundingClientRect();
      const delta = Math.abs((b.top + b.bottom) / 2 - focus);
      if (delta < smallest) { smallest = delta; best = index; }
    });
    return best;
  }

  let lastWork = -1;
  function updateWork() {
    const index = activeWorkIndex();
    if (index < 0 || index === lastWork) return;
    lastWork = index;
    workPages.forEach((page, i) => {
      page.dataset.active = String(index === i);
    });
    if (workTrack) workTrack.setAttribute('data-chapter', String(index + 1));
  }

  function frame() {
    raf = 0;
    for (const scene of scenes) {
      const value = motion.matches || (mobile.matches && scene.property === '--profile-p')
        ? 1
        : round(progress(scene.el));
      scene.el.style.setProperty(scene.property, value);
      if (scene.property === '--hero-p' && coverType) {
        // Prevent invisible hero links from remaining in the tab order mid-scene.
        coverType.inert = !motion.matches && value > .59;
      }
    }
    updateWork();
  }

  function schedule() {
    if (!raf) raf = window.requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
  workTrack?.addEventListener('scroll', schedule, { passive:true });
  motion.addEventListener?.('change', schedule);
  mobile.addEventListener?.('change', schedule);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('is-current');
        else entry.target.classList.remove('is-current');
      }
    }, { rootMargin:'-15% 0px -20% 0px', threshold:0.08 });
    document.querySelectorAll('.skills > li').forEach(el => observer.observe(el));
  }

  root.dataset.visualDirection = 'surrealist-editorial-brutalism';
  root.dataset.sceneImplementation = 'intact-raster-scroll-narrative';
  frame();
})();
