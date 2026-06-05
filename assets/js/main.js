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

function changeSlide() {
  heroSlides[current].classList.remove('hero-slide-active');
  current = (current + 1) % heroSlides.length;
  heroSlides[current].classList.add('hero-slide-active');
}
setInterval(changeSlide, 6000);

// Créer les éléments du slider
const heroWrapper = document.querySelector('.hero-sticky');
if (heroWrapper) {
  // Slide actuelle
  const slideA = document.createElement('div');
  slideA.className = 'hero-slide hero-slide-active';
  slideA.style.backgroundImage = `url('${slides[0]}')`;

  // Slide suivante (cachée)
  const slideB = document.createElement('div');
  slideB.className = 'hero-slide';
  slideB.style.backgroundImage = `url('${slides[1]}')`;

  // Overlay gradient commun
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';

  // Remplacer hero-image par le slider
  const oldHeroImage = document.querySelector('.hero-image');
  if (oldHeroImage) oldHeroImage.remove();

  heroWrapper.prepend(overlay);
  heroWrapper.prepend(slideB);
  heroWrapper.prepend(slideA);

  // Précharger les images
  slides.forEach(src => { const img = new Image(); img.src = src; });

  // Fonction de transition
  function nextSlideTransition() {
    const allSlides = document.querySelectorAll('.hero-slide');
    const active = document.querySelector('.hero-slide-active');
    const inactive = document.querySelector('.hero-slide:not(.hero-slide-active)');

    // Préparer la prochaine image
    nextSlide = (currentSlide + 1) % slides.length;
    inactive.style.backgroundImage = `url('${slides[nextSlide]}')`;
    inactive.style.opacity = '0';
    inactive.style.zIndex = '2';
    active.style.zIndex = '1';

    // Transition fondu lent
    inactive.classList.add('hero-slide-active');

    setTimeout(() => {
      active.classList.remove('hero-slide-active');
      active.style.zIndex = '1';
      inactive.style.zIndex = '2';
      currentSlide = nextSlide;
    }, 2500);
  }

  // Lancer le slider toutes les 6 secondes
  setInterval(nextSlideTransition, 6000);
}

// --- Hero shrink effect au scroll ---
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const wrapperH = window.innerHeight;
  const progress = Math.min(scrollY / wrapperH, 1);

  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach(slide => {
    const scale = 1 - (progress * 0.12);
    slide.style.transform = `scale(${scale})`;
  });

  const content = document.querySelector('.hero-content-wrap');
  if (content) {
    content.style.transform = `translateY(${scrollY * 0.3}px)`;
    content.style.opacity = 1 - (progress * 1.8);
  }
}, { passive: true });

// --- Mobile menu ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
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
}

// --- Scroll reveal ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

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
