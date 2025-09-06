// Ensure navigation is initialized after DOM is ready (fixes burger icon on support page)
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initNavigation === 'function') initNavigation();
});
// DOM Elements
const supportForm = document.getElementById('supportForm');

// Show service details
function showServiceDetails(category) {
    // Hide all service details
    const allDetails = document.querySelectorAll('.service-details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });

    // Show selected service details
    const selectedDetail = document.getElementById(`${category}-details`);
    if (selectedDetail) {
        selectedDetail.style.display = 'block';

        // Scroll to service details section
        document.getElementById('service-details').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Request support function
function requestSupport(serviceType) {
    // Create a simple alert for demo purposes
    // In a real application, this would open a contact form or redirect to a support page
    alert(`Requesting ${serviceType}. Our support team will contact you shortly.\n\nFor immediate assistance, please call +1-800-BDG-TECH`);

    // You could also implement a modal form here
    // showSupportModal(serviceType);
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
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate support stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });

    // Animate support services
    const supportServices = document.querySelectorAll('.support-service');
    supportServices.forEach((service, index) => {
        service.style.opacity = '0';
        service.style.transform = 'scale(0.8)';
        service.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        service.style.transitionDelay = `${index * 0.3}s`;

        setTimeout(() => {
            service.style.opacity = '1';
            service.style.transform = 'scale(1)';
        }, 1000 + (index * 300));
    });

    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        method.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(method);
    });
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}




// Support service hover effects
document.querySelectorAll('.support-service').forEach(service => {
    service.addEventListener('click', () => {
        const serviceType = service.getAttribute('data-service');
        showServiceDetails(serviceType);
    });
});

// Add dynamic connection lines for support illustration
function createConnectionLines() {
    const illustration = document.querySelector('.support-illustration');
    if (illustration) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Create connection lines from center to each service
        const services = ['installation', 'training', 'maintenance', 'monitoring'];
        services.forEach((service, index) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '50%');
            line.setAttribute('y1', '50%');

            // Set end points based on service position
            switch (service) {
                case 'installation':
                    line.setAttribute('x2', '25%');
                    line.setAttribute('y2', '25%');
                    break;
                case 'training':
                    line.setAttribute('x2', '75%');
                    line.setAttribute('y2', '25%');
                    break;
                case 'maintenance':
                    line.setAttribute('x2', '25%');
                    line.setAttribute('y2', '75%');
                    break;
                case 'monitoring':
                    line.setAttribute('x2', '75%');
                    line.setAttribute('y2', '75%');
                    break;
            }

            line.setAttribute('stroke', 'var(--secondary-blue)');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('opacity', '0.6');
            line.setAttribute('stroke-dasharray', '5,5');

            svg.appendChild(line);
        });

        illustration.appendChild(svg);
    }
}

// Initialize connection lines after page load
window.addEventListener('load', () => {
    setTimeout(createConnectionLines, 1500);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or details
        const openDetails = document.querySelector('.service-details[style*="block"]');
        if (openDetails) {
            openDetails.style.display = 'none';
        }
    }
});

// Add focus management for service cards
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});



// Add success animation
function showSuccessAnimation() {
    const successIcon = document.createElement('div');
    successIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    successIcon.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        color: var(--success-green);
        z-index: 2000;
        animation: successPulse 1s ease-in-out;
    `;

    document.body.appendChild(successIcon);

    setTimeout(() => {
        document.body.removeChild(successIcon);
    }, 1000);
}

// Add CSS for success animation
const style = document.createElement('style');
style.textContent = `
    @keyframes successPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    .support-service:hover {
        cursor: pointer;
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.1);
    }
    
    .contact-method:hover .method-icon {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
// Initialize all functionality

// Ensure burger icon works regardless of duplicate function definitions
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
};
// Only one DOMContentLoaded event to initialize all functionality
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initScrollEffects === 'function') initScrollEffects();
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initBackToTop === 'function') initBackToTop();
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

