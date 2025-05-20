// Initialize GSAP timeline
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

// Animation sequence
window.addEventListener('DOMContentLoaded', () => {
  // Animate main elements
  tl.to("#mainTitle", { opacity: 1, y: 0, duration: 1.2 })
    .to("#subTitle", { opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
    .to("#emailForm", { opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
    .to("#features", { opacity: 1, stagger: 0.3, duration: 1.2 }, "-=0.8");
  
  // Create particles
  createParticles();
  
  // Custom cursor
  const cursor = document.querySelector('.cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
  });
  
  // Feature shine effect
  const features = document.querySelectorAll('.feature-item');
  
  features.forEach(feature => {
    feature.addEventListener('mousemove', (e) => {
      const shine = feature.querySelector('.feature-shine');
      const bounds = feature.getBoundingClientRect();
      
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      
      shine.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
    });
  });
  
  // Form submission
  const form = document.querySelector('.email-container');
  const emailInput = document.querySelector('.email-input');
  const submitBtn = document.querySelector('.submit-btn');
  
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (emailInput.value && validateEmail(emailInput.value)) {
      // Show success message
      emailInput.value = '';
      
      // Create and animate a success message
      const successMsg = document.createElement('div');
      successMsg.className = 'absolute top-full left-0 w-full text-green-400 mt-3 text-center font-semibold';
      successMsg.textContent = 'Thank you! We\'ll notify you when we launch.';
      form.appendChild(successMsg);
      
      gsap.from(successMsg, {
        opacity: 0,
        y: -15,
        duration: 0.6
      });
      
      // Remove message after 3 seconds
      setTimeout(() => {
        gsap.to(successMsg, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => successMsg.remove()
        });
      }, 3000);
    } else {
      // Show error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'absolute top-full left-0 w-full text-red-400 mt-3 text-center font-semibold';
      errorMsg.textContent = 'Please enter a valid email address.';
      form.appendChild(errorMsg);
      
      gsap.from(errorMsg, {
        opacity: 0,
        y: -15,
        duration: 0.6
      });
      
      // Remove message after 3 seconds
      setTimeout(() => {
        gsap.to(errorMsg, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => errorMsg.remove()
        });
      }, 3000);
    }
  });
});

// Helper functions
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 60;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 3;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const delay = Math.random() * 6;
    const duration = Math.random() * 25 + 15;
    
    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    
    particlesContainer.appendChild(particle);
    
    // Animate with GSAP
    gsap.to(particle, {
      y: '+=' + (Math.random() * 120 - 60),
      x: '+=' + (Math.random() * 120 - 60),
      opacity: Math.random() * 0.6 + 0.4,
      duration: duration,
      delay: delay,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}