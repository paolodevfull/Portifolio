const root = document.documentElement;
const header = document.querySelector('.site-header');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navBackdrop = document.getElementById('navBackdrop');
const copyEmailButton = document.getElementById('copyEmail');
const heroScrollButton = document.getElementById('heroScroll');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateThemeControl() {
  const isLight = root.dataset.theme === 'light';
  themeToggle?.setAttribute('aria-pressed', String(isLight));
  themeToggle?.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
}

updateThemeControl();

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeControl();
});

function setMenu(open) {
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mainNav?.classList.toggle('is-open', open);
  navBackdrop?.classList.toggle('is-visible', open);
  document.body.classList.toggle('menu-open', open);
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navBackdrop?.addEventListener('click', () => setMenu(false));

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) setMenu(false);
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
  heroScrollButton?.classList.toggle('is-hidden', window.scrollY > 80);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const navLinks = [...document.querySelectorAll('.nav__link')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visibleEntry.target.id}`;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -58% 0px', threshold: [0.05, 0.25, 0.5] });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryInput = document.createElement('textarea');
  temporaryInput.value = text;
  temporaryInput.setAttribute('readonly', '');
  temporaryInput.style.position = 'fixed';
  temporaryInput.style.opacity = '0';
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand('copy');
  temporaryInput.remove();
}

copyEmailButton?.addEventListener('click', async () => {
  try {
    await copyText(copyEmailButton.dataset.email);
    copyEmailButton.classList.add('is-copied');
    copyEmailButton.setAttribute('aria-label', 'E-mail copiado');

    window.setTimeout(() => {
      copyEmailButton.classList.remove('is-copied');
      copyEmailButton.removeAttribute('aria-label');
    }, 2200);
  } catch {
    window.prompt('Copie o endereço de e-mail:', copyEmailButton.dataset.email);
  }
});

const currentYear = document.getElementById('currentYear');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
