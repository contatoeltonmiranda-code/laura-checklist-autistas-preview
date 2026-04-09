// ============================================
// Checklist Diario — E-Ink / Paper
// Zero motion by default, respeita prefers-reduced-motion
// ============================================
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav scrolled state + sticky CTA mobile
  const nav = document.querySelector('.nav');
  const stickyCTA = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');

  const onScroll = () => {
    if (window.scrollY > 10) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }

    // Sticky CTA mobile — aparece a partir de 500px OU meio do hero
    if (stickyCTA && hero) {
      const heroHeight = hero.offsetHeight;
      const trigger = Math.min(heroHeight * 0.55, 500);
      if (window.scrollY > trigger) {
        stickyCTA.classList.add('visible');
      } else {
        stickyCTA.classList.remove('visible');
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal — SO se motion permitido E IO suportado
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Ativa o modo motion adicionando classe ao html (CSS gateia por essa classe)
    document.documentElement.classList.add('js-motion');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px 10% 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });

    // Safety: depois de 1.5s, tudo visivel (se scroll nao disparou)
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        el.classList.add('visible');
      });
    }, 1500);
  }
  // Se reduced-motion: CSS ja mantem tudo visivel, nada a fazer.

  // Smooth scroll para ancoras — instantaneo se reduced-motion
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href === '#checkout') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // FAQ: multi-open permitido (user control, e-reader feel)
})();
