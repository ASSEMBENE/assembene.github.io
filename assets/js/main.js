/* ============================================
   ASSEMBENE CONCEPTION — Main JS
   ============================================ */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Hero slider ---
let current = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
  setInterval(() => {
    heroSlides[current].classList.remove('hero-slide-active');
    current = (current + 1) % heroSlides.length;
    heroSlides[current].classList.add('hero-slide-active');
  }, 6000);
}

// --- Hero shrink au scroll ---
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / window.innerHeight, 1);
  document.querySelectorAll('.hero-slide').forEach(slide => {
    slide.style.transform = `scale(${1 - progress * 0.1})`;
  });
  const content = document.querySelector('.hero-content-wrap');
  if (content) {
    content.style.transform = `translateY(${scrollY * 0.25}px)`;
    content.style.opacity = Math.max(0, 1 - progress * 2);
  }
}, { passive: true });

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
    }
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
    });
  });
}

// --- Scroll reveal ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
  });
});
