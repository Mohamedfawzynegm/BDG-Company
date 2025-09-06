// Contact methods
function initiateCall() {
    const phoneNumber = '+201055901888';
    window.location.href = `tel:${phoneNumber}`;

    // Show confirmation
    showNotification('Initiating call to +201055901888', 'info');
}

function initiateEmail() {
    const email = 'aymandos.hussain@gmail.com';
    const subject = 'Inquiry from BDG Website';
    const body = 'Hello BDG Team,\n\nI am interested in learning more about your VEICHI solutions and services.\n\nPlease contact me to discuss my requirements.\n\nBest regards';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    showNotification('Opening email client...', 'info');
}

function initiateWhatsApp() {
    const phoneNumber = '201055901888'; // Without + for WhatsApp
    const message = 'Hello BDG Team, I am interested in your VEICHI solutions and would like to discuss my requirements.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    showNotification('Opening WhatsApp...', 'info');
}

function showLocation() {
    const address = 'Obour Buildings, Salah Salem, Nasr City, Egypt';
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    window.open(googleMapsUrl, '_blank');
    showNotification('Opening location in Google Maps...', 'info');
}

function contactDirect(method) {
    if (method === 'phone') {
        initiateCall();
    } else if (method === 'email') {
        const email = 'aymandos.hussain@gmail.com';
        const subject = 'Direct Contact Request - Ayman Hussein';
        const body = 'Dear Mr. Ayman Hussein,\n\nI would like to schedule a direct consultation to discuss VEICHI solutions for my business.\n\nPlease let me know your availability.\n\nBest regards';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        showNotification('Opening email for direct contact...', 'info');
    }
}

function scrollToForm() {
    document.querySelector('.contact-forms').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const quickForm = document.getElementById('quickContactForm');
    if (quickForm) {
        quickForm.addEventListener('submit', handleQuickFormSubmit);
    }
    // Initialize FAQ functionality
    initializeFAQ();
    // Initialize animations
    initializeAnimations();

    // Ensure burger icon works regardless of duplicate function definitions
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

function handleQuickFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        inquiryType: formData.get('inquiryType'),
        message: formData.get('message')
    };

    if (validateQuickForm(data)) {
        submitForm('quick', data, e.target);
    }
}


function validateQuickForm(data) {
    let isValid = true;

    // Clear previous errors
    clearFormErrors();

    // Validate required fields
    if (!data.name.trim()) {
        showFieldError('quickName', 'Name is required');
        isValid = false;
    }

    if (!data.phone.trim()) {
        showFieldError('quickPhone', 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(data.phone)) {
        showFieldError('quickPhone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (!data.email.trim()) {
        showFieldError('quickEmail', 'Email is required');
        isValid = false;
    } else if (!validateEmail(data.email)) {
        showFieldError('quickEmail', 'Please enter a valid email address');
        isValid = false;
    }

    if (!data.message.trim()) {
        showFieldError('quickMessage', 'Message is required');
        isValid = false;
    }

    return isValid;
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFormErrors() {
    // Remove error classes
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });

    // Remove error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.remove();
    });
}

function submitForm(type, data, form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        const formType = type === 'quick' ? 'Quick Contact' : 'Detailed Inquiry';
        showNotification(`Thank you ${data.name}! Your ${formType} has been submitted successfully. We'll contact you within 2 hours.`, 'success');

        // Reset form
        form.reset();
        clearFormErrors();

        // Log data (in real app, send to server)
        console.log(`${formType} submitted:`, data);

        // Send email notification (simulate)
        sendEmailNotification(type, data);

    }, 2000);
}

function sendEmailNotification(type, data) {
    // In a real application, this would send data to your server
    const emailData = {
        to: 'aymandos.hussain@gmail.com',
        subject: `New ${type === 'quick' ? 'Quick Contact' : 'Detailed Inquiry'} from Website`,
        body: formatEmailBody(type, data)
    };

    console.log('Email notification:', emailData);
}

function formatEmailBody(type, data) {
    if (type === 'quick') {
        return `
New Quick Contact Form Submission:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Inquiry Type: ${data.inquiryType || 'Not specified'}
Message: ${data.message}

Submitted at: ${new Date().toLocaleString()}
        `;
    } else {
        return `
New Detailed Inquiry Form Submission:

Contact Information:
- Name: ${data.name}
- Title: ${data.title || 'Not specified'}
- Company: ${data.company}
- Industry: ${data.industry || 'Not specified'}
- Email: ${data.email}
- Phone: ${data.phone}

Project Details:
- Services: ${data.services.length > 0 ? data.services.join(', ') : 'Not specified'}
- Budget: ${data.budget || 'Not specified'}
- Timeline: ${data.timeline || 'Not specified'}
- Description: ${data.description}

Newsletter: ${data.newsletter ? 'Yes' : 'No'}

Submitted at: ${new Date().toLocaleString()}
        `;
    }
}

// Form validation initialization
function initializeFormValidation() {
    // Real-time validation
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
                this.classList.add('success');
            }
        });
    });

    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('blur', function () {
            if (this.value && !validatePhone(this.value)) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
                this.classList.add('success');
            }
        });
    });

    // Clear validation on input
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('error', 'success');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Animations
function initializeAnimations() {
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

    // Animate method cards
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate stat items
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


    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch (type) {
            case 'success': return 'var(--success-green)';
            case 'error': return 'var(--danger-red)';
            case 'warning': return 'var(--warning-orange)';
            default: return 'var(--secondary-blue)';
        }
    }

    function closeNotification(closeBtn) {
        const notification = closeBtn.parentNode;
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    // Add notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .method-card:hover .method-icon {
        transform: scale(1.1);
    }
    
    .info-card:hover .info-icon {
        transform: scale(1.1);
    }
    
    .contact-btn:hover {
        transform: translateY(-2px) scale(1.02);
    }
`;
    document.head.appendChild(notificationStyle);

    // Parallax effect for contact overview
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const contactOverview = document.querySelector('.contact-overview');

        if (contactOverview) {
            const rate = scrolled * -0.3;
            contactOverview.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;

            if (focusedElement.classList.contains('faq-question')) {
                e.preventDefault();
                focusedElement.click();
            }

            if (focusedElement.classList.contains('method-btn') ||
                focusedElement.classList.contains('contact-btn') ||
                focusedElement.classList.contains('cta-btn')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Make interactive elements focusable
    document.querySelectorAll('.faq-question').forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });

    // Update ARIA attributes for FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    });

    // Performance monitoring
    let pageLoadTime = performance.now();

    window.addEventListener('load', () => {
        const loadTime = performance.now() - pageLoadTime;
        console.log(`BDG Contact page loaded in ${Math.round(loadTime)}ms`);
    });


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
}