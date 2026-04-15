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

  // ---------- Timer unificado: nav (MM:SS) + offer (DD:HH:MM:SS) + textos dinamicos ----------
  // Ambos leem a MESMA chave localStorage.laura_timer_end — sincronizados.
  const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const pad2 = (n) => String(n).padStart(2, '0');

  const buildOfferDateText = () => {
    const today = new Date();
    const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d1 = new Date(d0); d1.setDate(d0.getDate() - 1);
    const d2 = new Date(d0); d2.setDate(d0.getDate() - 2);
    const days = [d2, d1, d0];
    const groups = [];
    days.forEach((dt) => {
      const key = dt.getMonth() + '-' + dt.getFullYear();
      const last = groups[groups.length - 1];
      if (last && last.key === key) {
        last.days.push(dt.getDate());
      } else {
        groups.push({ key: key, month: dt.getMonth(), days: [dt.getDate()] });
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
    return parts.length === 1 ? parts[0] : parts.join(' e ');
  };

  const offerDatePhrase = buildOfferDateText();
  const navOfferText = document.getElementById('nav-offer-text');
  if (navOfferText) navOfferText.textContent = 'Oferta válida nos dias ' + offerDatePhrase;
  const offerDynDate = document.getElementById('offer-dynamic-date');
  if (offerDynDate) offerDynDate.textContent = 'nos dias ' + offerDatePhrase;
  const finalDynDate = document.getElementById('final-dynamic-date');
  if (finalDynDate) finalDynDate.textContent = 'nos dias ' + offerDatePhrase;

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

  const navCountdown = document.getElementById('nav-countdown');
  const ctDays = document.getElementById('ct-days');
  const ctHours = document.getElementById('ct-hours');
  const ctMins = document.getElementById('ct-mins');
  const ctSecs = document.getElementById('ct-secs');

  let timerInterval;
  const tickTimers = () => {
    const diff = endTs - Date.now();
    if (diff <= 0) {
      if (navCountdown) navCountdown.textContent = '00:00';
      if (ctDays) ctDays.textContent = '00';
      if (ctHours) ctHours.textContent = '00';
      if (ctMins) ctMins.textContent = '00';
      if (ctSecs) ctSecs.textContent = '00';
      if (timerInterval) clearInterval(timerInterval);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (ctDays) ctDays.textContent = pad2(d);
    if (ctHours) ctHours.textContent = pad2(h);
    if (ctMins) ctMins.textContent = pad2(m);
    if (ctSecs) ctSecs.textContent = pad2(s);
    const totalMins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if (navCountdown) navCountdown.textContent = pad2(totalMins) + ':' + pad2(secs);
  };
  tickTimers();
  timerInterval = setInterval(tickTimers, 1000);

  // ---------- Pulse no CTA crítico da oferta ----------
  const criticalCTAs = document.querySelectorAll('[data-pulse]');
  if (!prefersReduced) {
    criticalCTAs.forEach((el) => el.classList.add('is-pulsing'));
  }
})();
