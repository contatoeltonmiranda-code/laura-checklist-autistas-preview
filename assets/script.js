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

  // ---------- Countdown até 30 Abril 2026 (dias, horas, min, seg) ----------
  const ctDays = document.getElementById('ct-days');
  const ctHours = document.getElementById('ct-hours');
  const ctMins = document.getElementById('ct-mins');
  const ctSecs = document.getElementById('ct-secs');
  if (ctDays) {
    const deadline = new Date('2026-04-30T23:59:59').getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const updateTimer = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        ctDays.textContent = '00'; ctHours.textContent = '00';
        ctMins.textContent = '00'; ctSecs.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      ctDays.textContent = pad(d);
      ctHours.textContent = pad(h);
      ctMins.textContent = pad(m);
      ctSecs.textContent = pad(s);
    };
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ---------- Nav countdown (Europa/Lisboa, 30 Abril 2026 23:59:59) ----------
  const ntDays = document.getElementById('nt-days');
  const ntHours = document.getElementById('nt-hours');
  const ntMins = document.getElementById('nt-mins');
  const ntSecs = document.getElementById('nt-secs');
  if (ntDays && ntHours && ntMins && ntSecs) {
    // Europa/Lisboa em 30/04/2026 esta em WEST (UTC+1) -> 22:59:59 UTC
    const navDeadline = Date.UTC(2026, 3, 30, 22, 59, 59);
    const padN = (n) => String(n).padStart(2, '0');
    const updateNav = () => {
      const diff = navDeadline - Date.now();
      if (diff <= 0) {
        ntDays.textContent = '00'; ntHours.textContent = '00';
        ntMins.textContent = '00'; ntSecs.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const sc = Math.floor((diff % 60000) / 1000);
      ntDays.textContent = padN(d);
      ntHours.textContent = padN(h);
      ntMins.textContent = padN(m);
      ntSecs.textContent = padN(sc);
    };
    updateNav();
    setInterval(updateNav, 1000);
  }

  // ---------- Pulse no CTA crítico da oferta ----------
  const criticalCTAs = document.querySelectorAll('[data-pulse]');
  if (!prefersReduced) {
    criticalCTAs.forEach((el) => el.classList.add('is-pulsing'));
  }
})();
