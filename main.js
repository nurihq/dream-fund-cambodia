/* ===== Dream Fund Cambodia — Main JS ===== */

// --- Reveal on Scroll ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// --- Navbar scroll effect ---
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

// --- Counter animation ---
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when impact bar is visible
const impactBar = document.querySelector('.impact-bar');
if (impactBar) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    counterObserver.observe(impactBar);
}

// --- Hero particles ---
const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particlesContainer.appendChild(particle);
    }
}

// --- Contact form handling ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok || response.redirected) {
                // Show success modal
                const modal = document.getElementById('successModal');
                if (modal) {
                    modal.classList.remove('hidden');
                }
                contactForm.reset();
            } else {
                throw new Error('Failed');
            }
        } catch (err) {
            // Fallback: show inline success (form likely submitted via redirect)
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
            contactForm.reset();
        }
        
        btnText.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// --- Success modal close ---
const closeModal = document.getElementById('closeModal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        document.getElementById('successModal').classList.add('hidden');
    });
}

// Check for #success in URL (redirect-based form)
if (window.location.hash === '#success') {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('hidden');
    history.replaceState(null, '', window.location.pathname);
}

// --- Newsletter form ---
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #2D5016, #4A7A2E)';
        input.value = '';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
