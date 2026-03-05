// ========================================
// SUGARSON DRIVING SCHOOL - PROFESSIONAL JS
// Enhanced Interactions & Form Handling
// ========================================

// ========================================
// MOBILE NAVIGATION
// ========================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('mobile-open');
        document.body.style.overflow = nav.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && nav.classList.contains('mobile-open')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in to elements
const animatedElements = document.querySelectorAll(
    '.service-card, .feature-item, .testimonial-card, .area-item'
);

animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    fadeInObserver.observe(el);
});

// ========================================
// BOOKING FORM HANDLING
// ========================================
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate phone number
        const phoneRegex = /^0[0-9\s]{8,12}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            showFormMessage('Please enter a valid South African phone number', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showFormMessage('Thank you! We\'ll call you back within 24 hours.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showFormMessage(message, type) {
    // Remove existing message
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 16px;
        margin-top: 16px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(0, 201, 167, 0.1); color: #00a88a; border: 1px solid rgba(0, 201, 167, 0.2);' 
            : 'background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2);'}
    `;
    
    bookingForm.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 15l-6-6-6 6"/>
    </svg>
`;
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ff6b35, #e55a25);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
        scrollTopBtn.style.transform = 'scale(1)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transform = 'scale(0.8)';
    }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 12px 32px rgba(255, 107, 53, 0.4)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.3)';
});

// ========================================
// PARALLAX HERO EFFECT (Subtle)
// ========================================
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < 600) {
            const parallax = scrolled * 0.15;
            heroVisual.style.transform = `translateY(${parallax}px)`;
        }
    }, { passive: true });
}

// ========================================
// IMAGE ERROR HANDLING
// ========================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            min-height: 200px;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 14px;
            font-weight: 500;
            border-radius: inherit;
        `;
        placeholder.textContent = this.alt || 'Image';
        this.parentElement.appendChild(placeholder);
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
const animateCounter = (element, target, suffix = '', duration = 1500) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
};

// Observe trust items and animate when visible
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberEl = entry.target.querySelector('.trust-number');
            if (numberEl && !numberEl.classList.contains('animated')) {
                numberEl.classList.add('animated');
                const text = numberEl.textContent;
                const value = parseInt(text);
                
                if (text.includes('+')) {
                    animateCounter(numberEl, value, '+');
                } else if (text.includes('%')) {
                    animateCounter(numberEl, value, '%');
                } else if (text.includes('★')) {
                    numberEl.textContent = '5★';
                }
            }
            trustObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.trust-item').forEach(item => {
    trustObserver.observe(item);
});

// ========================================
// SERVICE CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// CONSOLE BRANDING
// ========================================
console.log(
    '%c🚗 Sugarson Driving School',
    'font-size: 24px; font-weight: 800; color: #ff6b35; font-family: Plus Jakarta Sans, sans-serif;'
);
console.log(
    '%cProfessional Driving Lessons in Gauteng',
    'font-size: 14px; color: #6b7280; font-family: Inter, sans-serif;'
);
console.log(
    '%c📞 Call Now: 076 266 3765',
    'font-size: 16px; font-weight: 700; color: #00c9a7; font-family: Plus Jakarta Sans, sans-serif;'
);
