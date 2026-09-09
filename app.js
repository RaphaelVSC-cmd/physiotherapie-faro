/**
 * PHYSIOTHERAPIE FARO – APPLICATION ENGINE (v6.1 Bespoke Edition)
 * GSAP + ScrollTrigger + Lenis + SplitType + Consent + 3D Tilt + Signature Navigator
 */

'use strict';

// === 1. LENIS SMOOTH SCROLL ENGINE ===
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, // WICHTIG: natives flüssiges Touch-Scrollen auf Smartphones
    autoResize: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Lenis Smooth Scroll für interne Anker-Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80, duration: 1.1 });
        }
      }
    });
  });
}

// === 2. TAGESZEIT-PERSONALISIERUNG (v6.1 Standard) ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;
  const h = new Date().getHours();
  let greeting;
  if (h >= 6 && h < 12) {
    greeting = 'Guten Morgen in München';
  } else if (h >= 12 && h < 18) {
    greeting = 'Guten Tag in München';
  } else {
    greeting = 'Guten Abend in München';
  }
  el.textContent = greeting;
}

// === 3. PRIMITIV 1: HERO KINETIC TYPOGRAPHY (3D SplitType Reveal) ===
function initKineticTypography() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle || typeof SplitType === 'undefined') return;

  const split = new SplitType(heroTitle, { types: 'words,chars' });
  gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    rotateX: -30,
    stagger: 0.018,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.2,
  });

  document.querySelectorAll('.section-title').forEach((el) => {
    const s = new SplitType(el, { types: 'lines' });
    gsap.from(s.lines, {
      opacity: 0,
      y: 35,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// === 4. PRIMITIV 2: EDITORIAL TEXT-SCRUBBING (Apple-Style Dim-to-Reveal) ===
function initTextScrub() {
  document.querySelectorAll('[data-text-scrub]').forEach((container) => {
    const rawText = container.textContent.trim();
    const words = rawText.split(/\s+/);
    container.innerHTML = words
      .map((w) => `<span class="text-scrub-word">${w}</span> `)
      .join('');

    const wordSpans = container.querySelectorAll('.text-scrub-word');
    gsap.to(wordSpans, {
      opacity: 1.0,
      stagger: 0.04,
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        end: 'bottom 45%',
        scrub: 0.6,
      },
    });
  });
}

// === 5. PRIMITIV 4: DYNAMIC STAT & RATING COUNTERS ===
function initCounters() {
  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.target || '').includes('.');
    const duration = parseFloat(el.dataset.duration || '2.0');

    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
          const current = this.targets()[0].val;
          const formatted = isDecimal
            ? current.toFixed(1).replace('.', ',')
            : Math.round(current).toLocaleString('de-DE');
          el.textContent = formatted + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// === 6. PRIMITIV 6: NATIVE CSS-3D PERSPECTIVE TILT (0 KB Payload) ===
function init3DTilt() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('.card-3d').forEach((card) => {
    if (!isTouch) {
      // Desktop: Feinfühlige 3D-Cursor-Reaktion
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6; // Max 6 Grad Neigung
        const rotateY = (x / (rect.width / 2)) * 6;

        gsap.to(card, {
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)',
        });
      });
    } else {
      // Mobile: Sanfter 3D-Scroll-Tilt ohne Jitter
      gsap.fromTo(
        card,
        { transform: 'perspective(1000px) rotateX(5deg) translateY(18px)' },
        {
          transform: 'perspective(1000px) rotateX(0deg) translateY(0px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}

// === 7. PRIMITIV 10: DYNAMIC SVG PATH DRAWING (Kinetic Spine Stroke) ===
function initSvgPathDraw() {
  document.querySelectorAll('[data-svg-draw]').forEach((svgWrap) => {
    const path = svgWrap.querySelector('path');
    if (!path) return;
    const len = path.getTotalLength ? path.getTotalLength() : 800;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svgWrap,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// === 8. PRIMITIV 12: CONTINUOUS ROTATING SEAL / STAMP ===
function initRotatingBadge() {
  const seal = document.querySelector('[data-rotating-seal] .rotating-seal');
  if (!seal) return;

  gsap.to(seal, {
    rotation: 360,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2.0,
    },
  });
}

// === 9. PRIMITIV 5: MAGNETIC BUTTONS (Desktop) ===
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.28,
        y: (e.clientY - r.top - r.height / 2) * 0.28,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// === 10. SCROLL REVEAL (FADE-UP & BLUR) ===
function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// === 11. SIGNATURE FEATURE: 3-KLICK SCHMERZ- & MOBILITÄTS-NAVIGATOR ===
function initSignatureFeature() {
  const card = document.getElementById('painNavigatorCard');
  if (!card) return;

  const stage1 = document.getElementById('navStage1');
  const stage2 = document.getElementById('navStage2');
  const stage3 = document.getElementById('navStage3');

  const ind1 = document.getElementById('stepIndicator1');
  const ind2 = document.getElementById('stepIndicator2');
  const ind3 = document.getElementById('stepIndicator3');

  const regionBtns = card.querySelectorAll('.region-btn');
  const durationBtns = card.querySelectorAll('.duration-btn');

  const goToStep2Btn = document.getElementById('goToStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const goToStep3Btn = document.getElementById('goToStep3Btn');
  const resetBtn = document.getElementById('resetNavigatorBtn');

  const transferToFormBtn = document.getElementById('transferToFormBtn');
  const transferToWaBtn = document.getElementById('transferToWaBtn');

  // State
  let selectedRegion = 'hws';
  let selectedRegionTitle = 'HWS & Nacken';
  let selectedDuration = 'akut';
  let selectedDurationTitle = 'Akut (< 2 Wochen)';

  // Region selection
  regionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      regionBtns.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedRegion = btn.dataset.region;
      selectedRegionTitle = btn.querySelector('.btn-title')?.textContent || selectedRegion;
    });
  });

  // Duration selection
  durationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      durationBtns.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedDuration = btn.dataset.duration;
      selectedDurationTitle = btn.querySelector('.btn-title')?.textContent || selectedDuration;
    });
  });

  // Navigation handlers
  goToStep2Btn?.addEventListener('click', () => {
    stage1.hidden = true;
    stage2.hidden = false;
    ind1.classList.remove('is-active');
    ind2.classList.add('is-active');
  });

  backToStep1Btn?.addEventListener('click', () => {
    stage2.hidden = true;
    stage1.hidden = false;
    ind2.classList.remove('is-active');
    ind1.classList.add('is-active');
  });

  goToStep3Btn?.addEventListener('click', () => {
    calculateRecommendation();
    stage2.hidden = true;
    stage3.hidden = false;
    ind2.classList.remove('is-active');
    ind3.classList.add('is-active');
  });

  resetBtn?.addEventListener('click', () => {
    stage3.hidden = true;
    stage1.hidden = false;
    ind3.classList.remove('is-active');
    ind1.classList.add('is-active');
  });

  // Recommendation Knowledge Matrix
  const matrix = {
    hws: {
      headline: 'Manuelle Therapie & gezielte HWS-Mobilisation',
      summary:
        'Bei Nacken- und Halswirbelsäulen-Blockaden steht die schonende Entlastung der gereizten Nervenwurzeln, Myofaszialtechnik und atlastherapeutische Dekompression im Fokus.',
      method: 'Manuelle Therapie (MT)',
      prescription: 'MT 6x oder MT 10x',
      freq: '1–2x wöchentlich',
    },
    lws: {
      headline: 'Segmentale LWS-Entlastung & KGG-Stabilisation',
      summary:
        'Bei Lendenwirbelsäulen-, Bandscheiben- und Ischiasbeschwerden kombinieren wir manuelle Traktion mit aktiver Rumpf- und Tiefenmuskelstabilisierung.',
      method: 'MT + Krankengymnastik am Gerät (KGG)',
      prescription: 'MT 6x + KGG 10x',
      freq: '2x wöchentlich',
    },
    schulter: {
      headline: 'Gelenkzentrierung & PNF-Rotatorenmanschetten-Therapie',
      summary:
        'Bei Impingement, Kalkschulter oder Kapselreizungen erweitern wir den subakromialen Raum durch manualtherapeutische Kapseldehnung und neurophysiologische Aktivierung.',
      method: 'Manuelle Therapie (MT) & PNF',
      prescription: 'MT 6x / 10x',
      freq: '1–2x wöchentlich',
    },
    knie: {
      headline: 'Funktionelle Knie- & Kreuzband-Rehabilitation',
      summary:
        'Nach Meniskus-, Bandverletzungen oder bei Kniearthrose steht die Wiederherstellung der physiologischen Beinachse und propriozeptives Stabilitätstraining im Mittelpunkt.',
      method: 'Krankengymnastik (KG) & KGG',
      prescription: 'KG 10x / KGG 10x',
      freq: '2x wöchentlich',
    },
    cmd: {
      headline: 'Craniomandibuläre Dysfunktion (CMD) Kiefertherapie',
      summary:
        'Gezielte Behandlung von Kiefersperren, Zähneknirschen und begleitenden Nackenverspannungen in enger Zusammenarbeit mit Ihrem behandelnden Zahnarzt.',
      method: 'Spezielle CMD-Manuelle Therapie',
      prescription: 'Zahnarzt-Rezept: MT bei CMD',
      freq: '1x wöchentlich',
    },
  };

  function calculateRecommendation() {
    const data = matrix[selectedRegion] || matrix.hws;
    const headlineEl = document.getElementById('resultHeadline');
    const summaryEl = document.getElementById('resultSummary');
    const methodEl = document.getElementById('resultMethod');
    const prescriptionEl = document.getElementById('resultPrescription');
    const freqEl = document.getElementById('resultFreq');

    if (headlineEl) headlineEl.textContent = data.headline;
    if (summaryEl) summaryEl.textContent = data.summary;
    if (methodEl) methodEl.textContent = data.method;
    if (prescriptionEl) prescriptionEl.textContent = data.prescription;
    if (freqEl) freqEl.textContent = data.freq;

    // Prefill form transfer button
    if (transferToFormBtn) {
      transferToFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msgField = document.getElementById('formMessage');
        if (msgField) {
          msgField.value = `[Aus Schmerz-Navigator]: Region: ${selectedRegionTitle}, Phase: ${selectedDurationTitle}. Empfohlene Methode: ${data.method} (${data.prescription}). Bitte um Ersttermin.`;
        }
        const target = document.getElementById('kontakt');
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -70 });
        }
      });
    }

    // Prefill WhatsApp Transfer Link
    if (transferToWaBtn) {
      const text = encodeURIComponent(
        `Hallo Praxis Faro, ich habe Ihren Schmerz-Navigator genutzt: Region: ${selectedRegionTitle}, Status: ${selectedDurationTitle}. Empfohlene Therapie: ${data.method}. Wann haben Sie einen Termin frei?`
      );
      transferToWaBtn.href = `https://wa.me/498918914161?text=${text}`;
    }
  }
}

// === 12. MOBILE NAVIGATION ENGINE (Deadlock-Safe & Robust Anchor Handler) ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  closeBtn?.addEventListener('click', close);
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });

  // Anchor click closes drawer and reliably scrolls with Lenis
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      close();
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis && lenis.scrollTo) {
              lenis.scrollTo(target, { offset: -70, duration: 1.0 });
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });
}

// === 13. MODAL MANAGEMENT (Impressum & Datenschutz) ===
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      const focusable = modal.querySelector('button, [href], input, select, textarea');
      if (focusable) focusable.focus();
    });
  });

  const closeAll = () => {
    document.querySelectorAll('.modal:not([hidden])').forEach((m) => {
      m.setAttribute('hidden', '');
      m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  document.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

// === 14. DSGVO CONSENT MANAGER (§ 25 TDDDG Two-Click Maps) ===
function initConsent() {
  const KEY = 'consent_faro_v1';
  const banner = document.getElementById('consentBanner');
  const stored = localStorage.getItem(KEY);
  const mapsPlaceholder = document.getElementById('mapsPlaceholder');

  function applyConsent(accepted) {
    if (accepted) {
      document.querySelectorAll('iframe[data-src]').forEach((frame) => {
        frame.src = frame.dataset.src;
      });
      if (mapsPlaceholder) {
        mapsPlaceholder.classList.add('is-hidden');
      }
    }
    if (banner) {
      banner.setAttribute('hidden', '');
    }
  }

  if (stored === 'accepted') {
    applyConsent(true);
  } else if (stored === 'rejected') {
    applyConsent(false);
  } else if (banner) {
    banner.removeAttribute('hidden');
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('activateMapBtn')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.removeAttribute('hidden');
  });
}

// === 15. FORMSPREE MIT RESILIENTEM FALLBACK (v6.1 Standard) ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : 'Absenden';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Wird gesendet...';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        if (status) {
          status.style.color = '#0d8a7d';
          status.textContent =
            '✓ Vielen Dank! Ihre Terminanfrage ist eingegangen. Wir melden uns innerhalb von 24h.';
        }
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      } else {
        // Fallback bei Formspree Free-Tier Limit oder HTTP-Fehler
        if (fallback) fallback.style.display = 'block';
        if (status) {
          status.textContent =
            'Hinweis: Übertragung ausgelastet. Bitte nutzen Sie WhatsApp oder Direktanruf.';
        }
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
      }
    } catch {
      // Netzwerkfehler
      if (fallback) fallback.style.display = 'block';
      if (status) {
        status.textContent =
          'Hinweis: Verbindung unterbrochen. Bitte rufen Sie uns direkt unter 089 18914161 an.';
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  });
}

// === 16. HEADER SCROLL STATE ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 25);
    },
    { passive: true }
  );
}

// === 17. MAIN INITIALIZATION (Reduced Motion Guard) ===
document.addEventListener('DOMContentLoaded', () => {
  // Always active utility engines
  initTimeGreeting();
  initConsent();
  initMobileNav();
  initModals();
  initHeader();
  initContactForm();
  initSignatureFeature();

  // Motion-Budget Guard: Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // 1. Smooth Scroll Physics
    initLenis();

    // 2. Motion-Katalog Primitives (Mindestens 5 aktiv)
    initKineticTypography(); // Primitiv 1: 3D Typo Reveal
    initScrollAnimations();  // Primitiv 2: Scroll Fade-Up
    initCounters();          // Primitiv 4: Dynamic Counters (5.0 Sterne, 26+ Rezensionen)
    init3DTilt();            // Primitiv 6: Native CSS-3D Perspective Tilt
    initTextScrub();         // Primitiv 2B: Editorial Text-Scrubbing
    initSvgPathDraw();       // Primitiv 10: Dynamic SVG Path Drawing
    initRotatingBadge();     // Primitiv 12: Continuous Rotating Stamp
    initMagneticButtons();   // Primitiv 5: Magnetic Buttons
  }
});
