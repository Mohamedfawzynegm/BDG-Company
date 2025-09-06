// DOM Elements
const modal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const modalTitle = document.getElementById('modalTitle');
const solutionTypeInput = document.getElementById('solutionType');

// Smooth scroll to solutions
function scrollToSolutions() {
    document.querySelector('.solutions-overview').scrollIntoView({
        behavior: 'smooth'
    });
}

// Show solution details
function showSolutionDetails(category) {
    // Hide all solution details
    const allDetails = document.querySelectorAll('.solution-details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });

    // Show selected solution details
    const selectedDetail = document.getElementById(`${category}-details`);
    if (selectedDetail) {
        selectedDetail.style.display = 'block';

        // Scroll to detailed solutions section
        document.getElementById('detailed-solutions').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Request quote function
function requestQuote(solutionType) {
    modalTitle.textContent = 'Request Quote';
    solutionTypeInput.value = solutionType;
    modal.style.display = 'block';

    // Focus on first input
    setTimeout(() => {
        document.getElementById('companyName').focus();
    }, 100);
}

// Request demo function
function requestDemo(solutionType) {
    modalTitle.textContent = 'Schedule Demo';
    solutionTypeInput.value = `${solutionType} Demo`;
    modal.style.display = 'block';

    // Focus on first input
    setTimeout(() => {
        document.getElementById('companyName').focus();
    }, 100);
}

// Modal event listeners
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const requestData = {
        solutionType: formData.get('solutionType'),
        companyName: formData.get('companyName'),
        contactName: formData.get('contactName'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        projectDetails: formData.get('projectDetails')
    };

    // Submit request
    submitRequest(requestData);
});

function submitRequest(requestData) {
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show success message
        alert(`Thank you ${requestData.contactName}! Your request for ${requestData.solutionType} has been submitted successfully. Our team will contact you within 24 hours.`);

        // Close modal and reset form
        modal.style.display = 'none';
        contactForm.reset();

        // In a real application, you would send this data to your server
        console.log('Request submitted:', requestData);

    }, 2000);
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
    // Animate solution categories
    const solutionCategories = document.querySelectorAll('.solution-category');
    solutionCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });

    // Animate advantage items
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate application items in hero
    const appItems = document.querySelectorAll('.application-item');
    appItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });

    // Animate showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
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

// Add real-time validation
document.getElementById('contactEmail').addEventListener('blur', function () {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
        this.setCustomValidity('Please enter a valid email address');
    } else {
        this.style.borderColor = '#ddd';
        this.setCustomValidity('');
    }
});

document.getElementById('contactPhone').addEventListener('blur', function () {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#dc3545';
        this.setCustomValidity('Please enter a valid phone number');
    } else {
        this.style.borderColor = '#ddd';
        this.setCustomValidity('');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const showcaseItems = document.querySelectorAll('.showcase-item');

    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }

    // Animate showcase items on scroll
    showcaseItems.forEach((item, index) => {
        const rate = scrolled * (0.1 + index * 0.05);
        item.style.transform = `translateY(${rate}px) scale(1)`;
    });
});

// Add dynamic connection lines animation
function animateConnectionLines() {
    const svg = document.querySelector('.connection-lines svg');
    if (svg) {
        const paths = svg.querySelectorAll('path');
        paths.forEach((path, index) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = `drawLine 2s ease-in-out ${index * 0.3}s forwards`;
        });
    }
}

// Add CSS for line animation
const style = document.createElement('style');
style.textContent = `
    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    .showcase-item:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }
    
    .application-item:hover .app-icon {
        transform: scale(1.1);
        background: var(--secondary-blue);
        color: var(--white);
    }
`;
document.head.appendChild(style);

// Initialize connection lines animation after page load
window.addEventListener('load', () => {
    setTimeout(animateConnectionLines, 1500);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Add focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap when modal opens
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    trapFocus(modalContent);
}
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

