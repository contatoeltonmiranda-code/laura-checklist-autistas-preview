// ============================================
// Checklist Diário — interações leves
// ============================================
(function () {
  'use strict';

  // Nav scrolled state
  const nav = document.querySelector('.nav');
  const stickyCTA = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');

  const onScroll = () => {
    if (window.scrollY > 10) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }

    // sticky CTA mobile aparece quando o usuário rolou o suficiente
    // (gatilho na metade do hero ou 500px, o que vier primeiro)
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

  // Scroll reveal
  if ('IntersectionObserver' in window) {
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
      // Elementos já visíveis no carregamento — revelar imediatamente
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  // Smooth scroll para âncoras (fallback caso smooth-scroll do CSS falhe)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href === '#checkout') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // FAQ: fechar os outros ao abrir um (accordion single-open opcional)
  // Deixar múltiplos abertos ao mesmo tempo é mais amigável em LPs,
  // então NÃO forçamos single-open. Comentário mantido por referência.
})();
