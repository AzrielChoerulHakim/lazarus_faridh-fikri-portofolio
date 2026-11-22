/* Lazarus Sculptural Impasto: reading controls, not visual composites.
   Never fragment paintings or manipulate their lighting/objects. */
(() => {
  const navToggle = document.querySelector('.menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 720px)');
  document.documentElement.classList.add('js-ready');

  function closeMenu(focus = false) {
    if (!navToggle || !mobileNav) return;
    mobileNav.hidden = true;
    navToggle.setAttribute('aria-expanded','false');
    navToggle.setAttribute('aria-label','Buka navigasi');
    if (focus) navToggle.focus();
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      navToggle.setAttribute('aria-expanded',String(open));
      navToggle.setAttribute('aria-label',open ? 'Tutup navigasi' : 'Buka navigasi');
    });
    mobileNav.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
    });
    const desktopQuery = window.matchMedia('(min-width: 721px)');
    const resetMenu = () => { if (desktopQuery.matches) closeMenu(); };
    desktopQuery.addEventListener?.('change',resetMenu);
    resetMenu();
  }

  // Navigation indicates actual visible reading section, not artificial ornament.
  const topLinks = [...document.querySelectorAll('.nav a, .mobile-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of topLinks) {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        }
      }
    },{rootMargin:'-22% 0px -63% 0px',threshold:0});
    sections.forEach(section => navObserver.observe(section));
  }

  // Desktop: the single whole painting stays fixed while actual CV evidence scrolls.
  // Mobile: native horizontal snap turns each real job into a readable chapter.
  const pagesRoot = document.getElementById('work-pages');
  const entries = pagesRoot ? [...pagesRoot.querySelectorAll('.work-page')] : [];
  // The layout, not viewport width alone, decides whether chapters use horizontal scrolling.
  const isSnapCarousel = () => Boolean(pagesRoot && mobileViewport.matches && getComputedStyle(pagesRoot).display === 'flex' && getComputedStyle(pagesRoot).overflowX !== 'visible');
  const counter = document.getElementById('work-count');
  const mobileCounter = document.getElementById('work-mobile-count');
  const prev = document.getElementById('work-prev');
  const next = document.getElementById('work-next');
  let current = 0;

  function chooseIndex() {
    if (!entries.length) return 0;
    if (isSnapCarousel()) {
      const firstOffset = entries[0].offsetLeft;
      const pos = pagesRoot.scrollLeft + firstOffset;
      let selected = 0, delta = Infinity;
      entries.forEach((entry,i) => {
        const distance = Math.abs(entry.offsetLeft - pos);
        if (distance < delta) {delta=distance;selected=i;}
      });
      return selected;
    }
    const focusLine = Math.min(window.innerHeight * .56,650);
    let selected = 0,delta=Infinity;
    entries.forEach((entry,i) => {
      const rect = entry.getBoundingClientRect();
      const distance = Math.abs((rect.top+rect.bottom)/2-focusLine);
      if (distance < delta) {delta=distance;selected=i;}
    });
    return selected;
  }

  function renderIndex() {
    const nextIndex = chooseIndex();
    if (nextIndex !== current) current=nextIndex;
    const text = (current+1) + ' dari ' + entries.length;
    if (counter && counter.textContent !== text) counter.textContent=text;
    if (mobileCounter && mobileCounter.textContent !== text) mobileCounter.textContent=text;
    if (prev) prev.disabled=current===0;
    if (next) next.disabled=current===entries.length-1;
  }
  function navigateTo(index) {
    if (!pagesRoot || !entries[index]) return;
    const firstOffset = entries[0].offsetLeft;
    const dest = entries[index].offsetLeft - firstOffset;
    pagesRoot.scrollTo({left:dest,behavior:reducedMotion.matches?'instant':'smooth'});
    current=index;
    renderIndex();
  }
  if (entries.length) {
    if (prev) prev.addEventListener('click',()=>navigateTo(Math.max(0,current-1)));
    if (next) next.addEventListener('click',()=>navigateTo(Math.min(entries.length-1,current+1)));
    pagesRoot.addEventListener('scroll',renderIndex,{passive:true});
    window.addEventListener('scroll',()=>{if(!isSnapCarousel())renderIndex();},{passive:true});
    window.addEventListener('resize',renderIndex,{passive:true});
    mobileViewport.addEventListener?.('change',renderIndex);
    renderIndex();
  }

  document.documentElement.dataset.visualDirection='sculptural-impasto';
  document.documentElement.dataset.sceneImplementation='single-raster';
})();