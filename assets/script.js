// ============================================
// LP LAURA — Checklist Diário (v3 Cosmic Calm Premium)
// Reveal on scroll + countdown + sticky CTA + smooth scroll
// Respeita prefers-reduced-motion
// ============================================
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ativa motion apenas se o usuário não pediu para reduzir
  if (!prefersReduced) {
    document.documentElement.classList.add('js-motion');
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window && !prefersReduced) {
    // Ativa o modo reveal (esconde todos .reveal via CSS) e depois observa
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
    // Safety net — se alguma .reveal ainda estiver invisível após 3s (ex: abaixo do fold nunca scrollado), força visível
    setTimeout(() => {
      revealEls.forEach((el) => {
        if (!el.classList.contains('is-in')) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 2) el.classList.add('is-in');
        }
      });
    }, 3000);
  }
  // Sem JS / sem IO / prefers-reduced-motion: .reveal já é visível por padrão no CSS

  // ---------- Smooth scroll para âncoras internas ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href === '#checkout') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // ---------- Sticky CTA mobile — aparece aos 500px ----------
  const sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    let ticking = false;
    const toggleSticky = () => {
      if (window.scrollY > 500) sticky.classList.add('is-visible');
      else sticky.classList.remove('is-visible');
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleSticky);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- Countdown até 30 Abril 2026 ----------
  const countdownEl = document.querySelector('[data-countdown]');
  if (countdownEl) {
    const deadline = new Date('2026-04-30T23:59:59').getTime();
    const numEl = countdownEl.querySelector('.countdown-ring__num');
    const labelEl = countdownEl.querySelector('.countdown-ring__label');

    const updateCountdown = () => {
      const now = Date.now();
      const diff = deadline - now;
      if (diff <= 0) {
        if (numEl) numEl.textContent = '0';
        if (labelEl) labelEl.textContent = 'Encerrado';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (numEl) numEl.textContent = String(days);
      if (labelEl) labelEl.textContent = days === 1 ? 'Dia restante' : 'Dias restantes';
    };
    updateCountdown();
    // Atualiza a cada hora (suficiente para contagem de dias)
    setInterval(updateCountdown, 60 * 60 * 1000);
  }

  // ---------- Pulse no CTA crítico da oferta ----------
  const criticalCTAs = document.querySelectorAll('[data-pulse]');
  if (!prefersReduced) {
    criticalCTAs.forEach((el) => el.classList.add('is-pulsing'));
  }
})();
