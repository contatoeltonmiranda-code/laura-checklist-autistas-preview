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

  // ---------- Nav dynamic offer text + 10min persistent countdown ----------
  const navOfferText = document.getElementById('nav-offer-text');
  const navCountdown = document.getElementById('nav-countdown');

  if (navOfferText) {
    const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const today = new Date();
    const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d1 = new Date(d0); d1.setDate(d0.getDate() - 1);
    const d2 = new Date(d0); d2.setDate(d0.getDate() - 2);
    const days = [d2, d1, d0];
    // Agrupa dias consecutivos por mês mantendo ordem
    const groups = [];
    days.forEach((dt) => {
      const key = dt.getMonth() + '-' + dt.getFullYear();
      const last = groups[groups.length - 1];
      if (last && last.key === key) {
        last.days.push(dt.getDate());
      } else {
        groups.push({ key, month: dt.getMonth(), days: [dt.getDate()] });
      }
    });
    const fmtGroup = (g) => {
      const ds = g.days;
      let str;
      if (ds.length === 1) str = ds[0] + '';
      else if (ds.length === 2) str = ds[0] + ' e ' + ds[1];
      else str = ds.slice(0, -1).join(', ') + ' e ' + ds[ds.length - 1];
      return str + ' de ' + MESES[g.month];
    };
    const parts = groups.map(fmtGroup);
    let texto;
    if (parts.length === 1) texto = 'Oferta válida nos dias ' + parts[0];
    else texto = 'Oferta válida nos dias ' + parts.join(' e ');
    navOfferText.textContent = texto;
  }

  if (navCountdown) {
    const STORAGE_KEY = 'laura_timer_end';
    const DURATION = 10 * 60 * 1000;
    let endTs;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        endTs = parseInt(stored, 10);
        if (!endTs || isNaN(endTs)) endTs = null;
      }
      if (!endTs) {
        endTs = Date.now() + DURATION;
        localStorage.setItem(STORAGE_KEY, String(endTs));
      }
    } catch (e) {
      endTs = Date.now() + DURATION;
    }
    const pad2 = (n) => String(n).padStart(2, '0');
    const tickNav = () => {
      const diff = endTs - Date.now();
      if (diff <= 0) {
        navCountdown.textContent = '00:00';
        clearInterval(navTick);
        return;
      }
      const m = Math.floor(diff / 60000);
      const sc = Math.floor((diff % 60000) / 1000);
      navCountdown.textContent = pad2(m) + ':' + pad2(sc);
    };
    tickNav();
    const navTick = setInterval(tickNav, 1000);
  }

  // ---------- Pulse no CTA crítico da oferta ----------
  const criticalCTAs = document.querySelectorAll('[data-pulse]');
  if (!prefersReduced) {
    criticalCTAs.forEach((el) => el.classList.add('is-pulsing'));
  }
})();
