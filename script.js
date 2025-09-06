// Responsive nav: close menu on Support, About, or Contact click
document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu && navToggle) {
        const closeOnClickLinks = navMenu.querySelectorAll('a[href$="support.html"], a[href$="about.html"], a[href$="contact.html"]');
        closeOnClickLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
});
// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initBackToTop();
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

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formObject = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Validate all fields
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    form.classList.add('loading');

    // Simulate form submission (replace with actual API call)
    simulateFormSubmission(formObject)
        .then(response => {
            showSuccessMessage(form);
            form.reset();
        })
        .catch(error => {
            showErrorMessage(form, 'Failed to send message. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            form.classList.remove('loading');
        });
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');

    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showSuccessMessage(form) {
    let successElement = form.querySelector('.success-message');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        form.insertBefore(successElement, form.firstChild);
    }

    successElement.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';

    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successElement.parentNode) {
            successElement.remove();
        }
    }, 5000);
}

function showErrorMessage(form, message) {
    let errorElement = form.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.backgroundColor = '#f8d7da';
        errorElement.style.color = '#721c24';
        errorElement.style.padding = '1rem';
        errorElement.style.borderRadius = '5px';
        errorElement.style.marginBottom = '1rem';
        errorElement.style.border = '1px solid #f5c6cb';
        form.insertBefore(errorElement, form.firstChild);
    }

    errorElement.textContent = message;

    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                console.log('Form submitted:', formData);
                resolve({ success: true });
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-item h3');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Product catalog functionality
function initProductCatalog() {
    const productCards = document.querySelectorAll('.product-category');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterContent(query);
        }, 300));
    }
}

function filterContent(query) {
    const searchableElements = document.querySelectorAll('[data-searchable]');

    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Cookie consent (if needed)
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        showCookieConsent();
    }
}

function showCookieConsent() {
    const consentBanner = document.createElement('div');
    consentBanner.className = 'cookie-consent';
    consentBanner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <button class="btn btn-primary" onclick="acceptCookies()">Accept</button>
        </div>
    `;

    // Add styles
    consentBanner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1e3c72;
        color: white;
        padding: 1rem;
        z-index: 10000;
        display: flex;
        justify-content: center;
    `;

    document.body.appendChild(consentBanner);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.querySelector('.cookie-consent');
    if (banner) {
        banner.remove();
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });

    // Monitor scroll performance
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            // Scroll ended
        }, 150);
    }, { passive: true });
}


// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initProductCatalog();
    initSearch();
    initCookieConsent();
    initPerformanceMonitoring();

    // Add smooth reveal animations
    addRevealAnimations();

    // Initialize lazy loading for images
    initLazyLoading();

    // Add keyboard navigation support
    initKeyboardNavigation();
});

// Add reveal animations to elements
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.hero-content, .section-header, .contact-form');

    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // In a real implementation, you would replace the placeholder with the actual image
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation support
function initKeyboardNavigation() {
    // Tab focus management for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (trigger && menu) {
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                    menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                }

                if (e.key === 'Escape') {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }
            });
        }
    });
}

// Advanced form features
function initAdvancedFormFeatures() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Auto-save form data
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue && input.type !== 'submit') {
            input.value = savedValue;
        }

        // Save data on input
        input.addEventListener('input', debounce(() => {
            if (input.type !== 'submit') {
                localStorage.setItem(`form_${input.name}`, input.value);
            }
        }, 500));
    });

    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        setTimeout(() => {
            formInputs.forEach(input => {
                localStorage.removeItem(`form_${input.name}`);
            });
        }, 3000); // Clear after successful submission
    });

    // Character counter for textarea
    const textarea = form.querySelector('textarea');
    if (textarea) {
        const maxLength = 500;
        textarea.setAttribute('maxLength', maxLength);

        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #666;
            margin-top: 0.25rem;
        `;

        textarea.parentNode.appendChild(counter);

        const updateCounter = () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#dc3545' : '#666';
        };

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Product comparison feature
function initProductComparison() {
    const compareButtons = document.querySelectorAll('.btn-compare');
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];

    compareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;

            if (compareList.find(item => item.id === productId)) {
                // Remove from comparison
                compareList = compareList.filter(item => item.id !== productId);
                button.textContent = 'Add to Compare';
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline');
            } else {
                // Add to comparison (max 3 items)
                if (compareList.length < 3) {
                    compareList.push({ id: productId, name: productName });
                    button.textContent = 'Remove from Compare';
                    button.classList.remove('btn-outline');
                    button.classList.add('btn-primary');
                } else {
                    alert('You can compare up to 3 products at a time.');
                }
            }

            localStorage.setItem('compareList', JSON.stringify(compareList));
            updateCompareWidget();
        });
    });

    updateCompareWidget();
}

function updateCompareWidget() {
    const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    let widget = document.getElementById('compare-widget');

    if (compareList.length === 0) {
        if (widget) widget.remove();
        return;
    }

    if (!widget) {
        widget = document.createElement('div');
        widget.id = 'compare-widget';
        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            border: 2px solid #1e3c72;
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 300px;
        `;
        document.body.appendChild(widget);
    }

    widget.innerHTML = `
        <h4 style="margin-bottom: 0.5rem; color: #1e3c72;">Compare Products (${compareList.length}/3)</h4>
        <ul style="list-style: none; margin-bottom: 1rem;">
            ${compareList.map(item => `<li style="padding: 0.25rem 0;">${item.name}</li>`).join('')}
        </ul>
        <button class="btn btn-primary btn-sm" onclick="showComparison()" style="margin-right: 0.5rem;">Compare</button>
        <button class="btn btn-outline btn-sm" onclick="clearComparison()">Clear</button>
    `;
}

function showComparison() {
    const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    if (compareList.length < 2) {
        alert('Please select at least 2 products to compare.');
        return;
    }

    // In a real implementation, this would open a comparison modal or page
    alert(`Comparing: ${compareList.map(item => item.name).join(', ')}`);
}

function clearComparison() {
    localStorage.removeItem('compareList');
    const widget = document.getElementById('compare-widget');
    if (widget) widget.remove();

    // Reset all compare buttons
    document.querySelectorAll('.btn-compare').forEach(button => {
        button.textContent = 'Add to Compare';
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline');
    });
}


// Newsletter signup
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Simulate newsletter signup
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }, 1000);
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAdvancedFormFeatures();
        initProductComparison();
        initNewsletter();
    }, 1000);
});

// Export functions for global access
window.showComparison = showComparison;
window.clearComparison = clearComparison;
window.acceptCookies = acceptCookies;
