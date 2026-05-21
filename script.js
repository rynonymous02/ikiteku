// ── Burger menu ──
function toggleMenu() {
  document.getElementById('burger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('show');
}

function closeMenu() {
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('show');
}

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-center a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  links.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
});

// ── Carousel ──
const TOTAL = 3;
let current = 0;
let autoTimer;

const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('#carouselDots button');

function carouselGo(idx) {
  current = (idx + TOTAL) % TOTAL;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  resetAuto();
}

function carouselMove(dir) { 
  carouselGo(current + dir); 
}

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => carouselMove(1), 4000);
}

// Touch / swipe support
let tsX = 0;
track.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tsX;
  if (Math.abs(dx) > 40) carouselMove(dx < 0 ? 1 : -1);
});

resetAuto();

// ── Count-up animation for testimoni stats ──
function animateCountUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  
  requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.testi-stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statEls.forEach(el => statsObserver.observe(el));
