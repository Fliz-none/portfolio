// Intersection Observer for smooth scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(
  ".fade-up, .about-content, .special-card, .skill-card, .project-card, .contact-box"
).forEach(el => {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;
  if (scrollPosition < window.innerHeight) {
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// Add stagger animation delays to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// Add stagger animation delays to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
  card.style.animationDelay = `${(index * 0.08)}s`;
});
