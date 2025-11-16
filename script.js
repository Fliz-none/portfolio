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

// Skill tooltip functionality - Accordion style
const skillCards = document.querySelectorAll('.skill-card');
const tooltipMap = new Map();

skillCards.forEach(card => {
  const skillName = card.getAttribute('data-skill');
  const skillDesc = card.getAttribute('data-description');
  
  // Create tooltip for each skill card
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.innerHTML = `
    <div class="skill-tooltip-content">
      <strong>${skillName}</strong><br>${skillDesc}
    </div>
  `;
  document.body.appendChild(tooltip);
  tooltipMap.set(card, tooltip);
  
  card.addEventListener('mouseenter', function() {
    const tooltip = tooltipMap.get(this);
    tooltip.classList.add('show');
    
    // Position tooltip
    const rect = this.getBoundingClientRect();
    const tooltipHeight = 80;
    let top = rect.top - tooltipHeight - 15;
    let left = rect.left + rect.width / 2 - 140; // 140 = 280/2
    
    if (top < 0) {
      top = rect.bottom + 15;
    }
    
    if (left < 0) {
      left = 10;
    } else if (left + 280 > window.innerWidth) {
      left = window.innerWidth - 280 - 10;
    }
    
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  });
  
  card.addEventListener('mouseleave', function() {
    const tooltip = tooltipMap.get(this);
    tooltip.classList.remove('show');
  });
});
