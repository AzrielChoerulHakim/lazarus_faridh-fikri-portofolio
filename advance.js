/* Faridh / Lazarus Scroll Director S04 + S03
 * Canonical work state is owned by app.js and reflected in #work-count.
 * This visual adaptor never scroll-jacks, invents progress, or measures a second chapter clock.
 */
(() => {
  'use strict';
  const html = document.documentElement;
  const counter = document.getElementById('work-count');
  const world = document.querySelector('.work-world');
  const workPages = [...document.querySelectorAll('.work-page')];
  if (!counter || !world || workPages.length !== 4) return;

  let lastChapter = -1;
  function renderChapter() {
    const chapter = Number.parseInt(counter.textContent, 10);
    if (!Number.isInteger(chapter) || chapter < 1 || chapter > workPages.length) return;
    if (chapter === lastChapter) return;
    lastChapter = chapter;
    world.dataset.chapter = String(chapter);
    workPages.forEach((page, index) => {
      page.dataset.active = String(index + 1 === chapter);
    });
  }

  // app.js already provides the single measured source of chapter state.
  // The observer transfers that state into the visual world only on actual changes.
  const observer = new MutationObserver(renderChapter);
  observer.observe(counter, { childList: true, characterData: true, subtree: true });
  window.addEventListener('pageshow', renderChapter);
  renderChapter();

  if ('IntersectionObserver' in window) {
    const visible = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-current', entry.isIntersecting);
      }
    }, { rootMargin:'-12% 0px -18% 0px', threshold:0 });
    document.querySelectorAll('.skills > li').forEach(item => visible.observe(item));
  }

  html.dataset.visualDirection = 'surrealist-world-editorial';
  html.dataset.scrollDominant = 'sticky-evidence-exchange';
  html.dataset.scrollSupporting = 'native-snap-strip';
})();
