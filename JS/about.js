// Contact functions
function contactUs(type) {
    let message = '';
    let subject = '';

    if (type === 'consultation') {
        // Open Google Form for scheduling consultation
        const googleFormUrl = 'https://forms.gle/rZmzWRgkzKm98mdh6';
        window.open(googleFormUrl, '_blank');
        return;
    } else if (type === 'quote') {
        subject = 'Quote Request for VEICHI Products';
        message = 'Hello BDG Team,\n\nI am interested in VEICHI products and would like to request a detailed quote.\n\nPlease provide pricing and availability information.\n\nBest regards';
        // Create mailto link
        const email = 'aymandos.hussain@gmail.com';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
        setTimeout(() => {
            alert(`Email client opened for ${type}. If your email client didn't open, please contact us directly at ${email}`);
        }, 500);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate service categories
    const serviceCategories = document.querySelectorAll('.service-category');
    serviceCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });

    // Animate partner cards
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate logo circles
    const logoCircles = document.querySelectorAll('.logo-circle');
    logoCircles.forEach((circle, index) => {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0.8)';
        circle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        circle.style.transitionDelay = `${index * 0.3}s`;

        setTimeout(() => {
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        }, 500 + (index * 300));
    });

    // Animate service items in BDG visual
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });

    // Add click handlers for service items
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const service = item.getAttribute('data-service');
            highlightService(service);
        });
    });

    // Ensure burger icon works (safe event listener)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Highlight service function
function highlightService(serviceType) {
    const serviceCategories = document.querySelectorAll('.service-category');

    // Remove previous highlights
    serviceCategories.forEach(category => {
        category.classList.remove('highlighted');
    });

    // Find and highlight the matching service category
    const targetCategory = document.querySelector(`.service-category[data-category="${serviceType}"]`);
    if (targetCategory) {
        targetCategory.classList.add('highlighted');
        targetCategory.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Remove highlight after 3 seconds
        setTimeout(() => {
            targetCategory.classList.remove('highlighted');
        }, 3000);
    }
}

// Add CSS for highlighted service
const style = document.createElement('style');
style.textContent = `
    .service-category.highlighted {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 83, 170, 0.3);
        border: 2px solid var(--secondary-blue);
    }
    
    .service-item:hover {
        cursor: pointer;
    }
    
    .logo-circle:hover {
        cursor: pointer;
    }
    
    .highlight-item:hover .highlight-icon {
        transform: scale(1.1);
    }
    
    .info-item:hover .info-icon {
        transform: scale(1.1);
    }
    
    .contact-item:hover .contact-icon {
        transform: scale(1.1);
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.1);
    }
    
    .partner-card:hover .partner-icon {
        transform: scale(1.1);
    }
    
    .card-icon:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Parallax effect for partnership overview
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const partnershipSection = document.querySelector('.partnership-overview');

    if (partnershipSection) {
        const rate = scrolled * -0.3;
        partnershipSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth hover effects for CTA buttons
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation for logo circles
document.querySelectorAll('.logo-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        circle.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            circle.style.animation = '';
        }, 600);
    });
});

// Add pulse animation CSS
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;

        if (focusedElement.classList.contains('service-item')) {
            e.preventDefault();
            focusedElement.click();
        }

        if (focusedElement.classList.contains('cta-btn')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Make service items focusable
document.querySelectorAll('.service-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Learn more about ${item.querySelector('span').textContent}`);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });

    // Set initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Performance monitoring
let pageLoadTime = performance.now();

window.addEventListener('load', () => {
    const loadTime = performance.now() - pageLoadTime;
    console.log(`BDG About page loaded in ${Math.round(loadTime)}ms`);
});


// Add success feedback for interactions
function showSuccessFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-green);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Add slide animation
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(slideStyle);

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
});


// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .product-category, .solution-card, .service-item, .stat-item'
    );

    animateElements.forEach(el => observer.observe(el));
}
// Safe mobile menu toggle (fix ReferenceError)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}


// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }

    lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Scroll Effects and Animations
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .product-category, .solution-card, .service-item, .stat-item'
    );

    animateElements.forEach(el => observer.observe(el));
}
