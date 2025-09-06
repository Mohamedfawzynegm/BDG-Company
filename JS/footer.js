// Enhanced Footer JavaScript

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const button = emailInput.parentNode.querySelector('button');
    const email = emailInput.value.trim();

    // Validate email
    if (!email) {
        showFooterNotification('Please enter your email address', 'error');
        emailInput.focus();
        return;
    }

    if (!validateEmail(email)) {
        showFooterNotification('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
    }

    // Show loading state
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        // Reset button
        button.innerHTML = originalIcon;
        button.classList.remove('loading');

        // Show success message
        showFooterNotification(`Welcome aboard! You'll receive our latest updates soon.`, 'success');

        // Clear input
        emailInput.value = '';

        // Add success animation to newsletter section
        const newsletterSection = document.querySelector('.newsletter-section');
        newsletterSection.style.transform = 'scale(1.02)';
        setTimeout(() => {
            newsletterSection.style.transform = 'scale(1)';
        }, 300);

        // Log subscription (in real app, send to server)
        console.log('Newsletter subscription:', {
            email: email,
            timestamp: new Date().toISOString(),
            source: 'footer'
        });

    }, 1500);
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contact developer function
function contactDeveloper() {
    const subject = 'Web Development Inquiry from BDG Website';
    const body = `Hello,

I found your contact through the BDG website and I'm interested in discussing web development services.

Please let me know your availability for a consultation.

Best regards`;

    const mailtoLink = `mailto:developer@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    showFooterNotification('Opening email client to contact developer...', 'info');

    // Log developer contact
    console.log('Developer contact initiated:', {
        timestamp: new Date().toISOString(),
        source: 'footer'
    });
}

// Scroll to top function
function scrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    // Add click animation
    backToTopBtn.style.transform = 'translateY(-2px) scale(0.95)';
    setTimeout(() => {
        backToTopBtn.style.transform = 'translateY(-2px) scale(1)';
    }, 150);

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Show feedback
    setTimeout(() => {
        showFooterNotification('Back to top!', 'info');
    }, 500);
}

// Footer notification system
function showFooterNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.footer-notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getFooterNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeFooterNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${getFooterNotificationColor(type)};
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        max-width: 320px;
        font-size: 0.85rem;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeFooterNotification(notification.querySelector('.notification-close'));
        }
    }, 4000);
}

function getFooterNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getFooterNotificationColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#0053aa';
    }
}

function closeFooterNotification(closeBtn) {
    const notification = closeBtn.parentNode;
    notification.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add enter key support for newsletter
    const newsletterInput = document.getElementById('newsletterEmail');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });

        // Add focus/blur effects
        newsletterInput.addEventListener('focus', () => {
            newsletterInput.parentNode.style.transform = 'scale(1.02)';
            newsletterInput.parentNode.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        });

        newsletterInput.addEventListener('blur', () => {
            newsletterInput.parentNode.style.transform = 'scale(1)';
            newsletterInput.parentNode.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    }

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link, .dev-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (link.classList.contains('social-link')) {
                link.style.transform = 'translateY(-3px) scale(1.1)';
            } else {
                link.style.transform = 'translateY(-2px)';
            }
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click tracking for footer links
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-bottom-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkText = link.textContent.trim();
            const linkHref = link.getAttribute('href');

            // Log click
            console.log('Footer link clicked:', {
                text: linkText,
                href: linkHref,
                timestamp: new Date().toISOString()
            });

            // Add click animation
            link.style.transform = 'translateX(8px) scale(0.98)';
            setTimeout(() => {
                link.style.transform = 'translateX(5px) scale(1)';
            }, 150);
        });
    });

    // Initialize animations
    initializeFooterAnimations();

    // Add founder info hover effect
    const founderInfo = document.querySelector('.founder-info');
    if (founderInfo) {
        founderInfo.addEventListener('mouseenter', () => {
            founderInfo.style.background = 'rgba(255, 255, 255, 0.08)';
            founderInfo.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });

        founderInfo.addEventListener('mouseleave', () => {
            founderInfo.style.background = 'rgba(255, 255, 255, 0.05)';
            founderInfo.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    }
});

// Footer animations
function initializeFooterAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'scale(0.8)';
        link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });

    // Animate developer section
    const developerSection = document.querySelector('.developer-section');
    if (developerSection) {
        developerSection.style.opacity = '0';
        developerSection.style.transform = 'translateY(20px)';
        developerSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            developerSection.style.opacity = '1';
            developerSection.style.transform = 'translateY(0)';
        }, 1000);
    }

    // Animate newsletter benefits
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1200 + (index * 100));
    });
}

// Add notification animations CSS
const footerNotificationStyle = document.createElement('style');
footerNotificationStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .footer-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .footer-notification .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 3px;
        transition: background-color 0.3s ease;
        font-size: 0.8rem;
    }
    
    .footer-notification .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    /* Enhanced hover effects */
    .footer-links a {
        position: relative;
        overflow: hidden;
    }
    
    .footer-links a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: -100%;
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.5);
        transition: left 0.3s ease;
    }
    
    .footer-links a:hover::after {
        left: 0;
    }
`;
document.head.appendChild(footerNotificationStyle);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;

        if (focusedElement.classList.contains('back-to-top')) {
            e.preventDefault();
            scrollToTop();
        }

        if (focusedElement.classList.contains('dev-contact-btn')) {
            e.preventDefault();
            contactDeveloper();
        }
    }
});

// Make interactive elements focusable
document.querySelectorAll('.back-to-top, .dev-contact-btn, .social-link, .dev-social-link').forEach(element => {
    element.setAttribute('tabindex', '0');
});

// Performance monitoring
console.log('Enhanced BDG Footer loaded successfully');

// Error handling
window.addEventListener('error', (e) => {
    if (e.target.closest('.footer')) {
        console.error('Footer error:', e.error);
    }
});