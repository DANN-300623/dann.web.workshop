  /* ---------- MOBILE MENU ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burgerBtn && mobileMenu) {
    function openMobileMenu(){
      mobileMenu.classList.add('open');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu(){
      mobileMenu.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    burgerBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) { closeMenuBtn.addEventListener('click', closeMobileMenu); }
    mobileMenu.querySelectorAll('.mnav-link').forEach(function(a){
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- LOGO — vraca na vrh ako smo vec na pocetnoj ---------- */
  const brandLink = document.querySelector('.brand');
  if (brandLink) {
    brandLink.addEventListener('click', function(e){
      const path = window.location.pathname;
      const naPocetnoj = path.endsWith('/') || path.endsWith('index.html');
      if (naPocetnoj) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ---------- SCROLL REVEAL + SEKVENCIJALNO POJAVLJIVANJE ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- SUPTILAN PARALLAX NA HERO SADRŽAJU ---------- */
  const heroInner = document.querySelector('.hero .container');
  if (heroInner && !prefersReducedMotion) {
    window.addEventListener('scroll', function(){
      const y = window.scrollY;
      if (y < 700) {
        heroInner.style.transform = 'translateY(' + (y * 0.12) + 'px)';
      }
    }, { passive: true });
  }

  /* ---------- KONTAKT FORMA ---------- */
  const formCheck = document.getElementById('contactForm');
  if (formCheck) {
    const form = document.getElementById('contactForm');
    const confirmationMsg = document.getElementById('confirmationMsg');

    // Nakon što deployuješ kontakt-apps-script.gs kao Web app,
    // nalepi tu adresu ovde (Deploy → New deployment → Web app → kopiraj URL).
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvT5yjq8YQJ0o_zHKfMTuIKfXVzEM6R9mX8Saqo80P0CxrKkeSn7huWV9e5Oq0DDrmgQ/exec';

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // honeypot provera - ako je skriveno polje popunjeno, to je bot,
      // tiho prekini slanje bez ikakve poruke o grešci
      const honeypotEl = document.getElementById('website');
      if (honeypotEl && honeypotEl.value) {
        return;
      }

      const fd = new FormData();
      fd.append('name', document.getElementById('ime').value);
      fd.append('email', document.getElementById('email').value);
      fd.append('phone', document.getElementById('telefon').value);
      fd.append('projectType', document.getElementById('tip').value);
      fd.append('message', document.getElementById('poruka').value);
      fd.append('website', honeypotEl ? honeypotEl.value : '');

      fetch(SCRIPT_URL, { method: 'POST', body: fd })
        .then(function(){
          var jeEngleski = document.documentElement.lang === 'en';
          confirmationMsg.textContent = jeEngleski
            ? "Thanks for your message! We'll get back to you shortly at the contact you provided."
            : 'Hvala na poruci! Javljamo se uskoro na naveden kontakt.';
          confirmationMsg.style.display = 'block';
          form.reset();
          confirmationMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function(){
          var jeEngleski = document.documentElement.lang === 'en';
          confirmationMsg.textContent = jeEngleski
            ? 'Something went wrong — please try again or email us directly at dann.web.workshop@gmail.com'
            : 'Došlo je do greške — probajte ponovo ili pišite direktno na dann.web.workshop@gmail.com';
          confirmationMsg.style.display = 'block';
        });
    });
  }

  /* ---------- SKRIVEN DETALJ (samo paketi.html) ---------- */
  const hiddenDetailBtn = document.getElementById('hiddenDetail');
  const detailModal = document.getElementById('detailModal');
  const closeDetailModalBtn = document.getElementById('closeDetailModal');

  if (hiddenDetailBtn && detailModal) {
    hiddenDetailBtn.addEventListener('click', function(){
      detailModal.classList.add('open');
    });
    if (closeDetailModalBtn) {
      closeDetailModalBtn.addEventListener('click', function(){
        detailModal.classList.remove('open');
      });
    }
    detailModal.addEventListener('click', function(e){
      if (e.target === detailModal) { detailModal.classList.remove('open'); }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') { detailModal.classList.remove('open'); }
    });
  }

  /* ---------- KOD ZA POPUST IZ URL-a (samo kontakt.html) ---------- */
  const poljePoruka = document.getElementById('poruka');
  if (poljePoruka) {
    const urlParams = new URLSearchParams(window.location.search);
    const kod = urlParams.get('kod');
    if (kod) {
      poljePoruka.value = 'Kod za popust: ' + kod + '\n\n';
      poljePoruka.focus();
      poljePoruka.setSelectionRange(poljePoruka.value.length, poljePoruka.value.length);
    }
  }
