/* =========================================================
   FLUID SECTION REVEAL ON SCROLL
========================================================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

/* =========================================================
   TYPING EFFECT (hero)
========================================================= */
function typeInto(elId, text, speed, done){
  const el = document.getElementById(elId);
  if(!el) return;
  let i = 0;
  (function step(){
    if(i < text.length){
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else if (done){
      done();
    }
  })();
}

typeInto('typing-text', 'Olá! Sou o', 90, () => {
  typeInto('typing-text2', 'PAOLO', 130, () => {
    typeInto('typing-text3', 'TI & Desenvolvimento', 55);
  });
});

/* =========================================================
   THEME TOGGLE
========================================================= */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});

/* =========================================================
   MOBILE NAV
========================================================= */
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

/* =========================================================
   SKILLS: tap-to-toggle (works on touch, hover still works via CSS)
========================================================= */
document.querySelectorAll('.skill').forEach(card => {
  card.addEventListener('click', () => {
    const wasOpen = card.classList.contains('is-open');
    document.querySelectorAll('.skill.is-open').forEach(c => c.classList.remove('is-open'));
    if (!wasOpen) card.classList.add('is-open');
  });
});

/* =========================================================
   PHONE MASK
========================================================= */
const telInput = document.getElementById('telefone');
if (telInput) {
  telInput.addEventListener('input', () => {
    let digits = telInput.value.replace(/\D/g, '').slice(0, 11);
    let out = digits;
    if (digits.length > 2) out = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    if (digits.length > 7) out = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
    telInput.value = out;
  });
}

/* =========================================================
   CONTACT FORM (front-end only — plug a backend/service to actually send)
========================================================= */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Mensagem pronta — conecte um serviço de envio (ex: Formspree, EmailJS) para completar o envio.';
    contactForm.reset();
  });
}