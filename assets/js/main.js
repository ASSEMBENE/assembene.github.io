/* ============================================
   ASSEMBENE CONCEPTION — Main JS
   ============================================ */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Hero shrink effect (comme Porcelanosa) ---
const heroImage = document.querySelector('.hero-image');
const heroWrapper = document.querySelector('.hero-wrapper');

if (heroImage && heroWrapper) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const wrapperH = heroWrapper.offsetHeight;
    const progress = Math.min(scrollY / wrapperH, 1);

    // Scale de 1 → 0.88 + léger fade
    const scale = 1 - (progress * 0.12);
    const opacity = 1 - (progress * 0.6);
    heroImage.style.transform = `scale(${scale})`;
    heroImage.style.opacity = opacity;

    // Contenu héro se décale vers le haut
    const content = document.querySelector('.hero-content-wrap');
    if (content) {
      content.style.transform = `translateY(${scrollY * 0.3}px)`;
      content.style.opacity = 1 - (progress * 1.8);
    }
  }, { passive: true });
}

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- Scroll reveal ---
const reveals = document.querySelectorAll('.reveal');
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
.observe = (() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => obs.observe(el));
})();

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});
