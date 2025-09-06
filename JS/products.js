// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const categorySections = document.querySelectorAll('.category-section');
const categoryHeaders = document.querySelectorAll('.category-header');
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close');
const orderForm = document.getElementById('orderForm');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navMenu && hamburger) {
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Category Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        filterCategories(category);
    });
});

function filterCategories(category) {
    categorySections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category');

        if (category === 'all' || sectionCategory === category) {
            section.classList.remove('hidden');
            section.classList.add('show');
            // Expand the category if it was collapsed
            section.classList.remove('collapsed');
        } else {
            section.classList.add('hidden');
            section.classList.remove('show');
        }
    });
}

// Category Collapse/Expand Functionality
categoryHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const categorySection = header.parentElement;
        categorySection.classList.toggle('collapsed');

        // Animate the toggle icon
        const toggleIcon = header.querySelector('.category-toggle i');
        if (categorySection.classList.contains('collapsed')) {
            toggleIcon.style.transform = 'rotate(-90deg)';
        } else {
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    });
});

// Show all categories initially
filterCategories('all');



// Initialize category states (all expanded by default)
categorySections.forEach(section => {
    section.classList.remove('collapsed');
});

// Product Search Logic
const searchInput = document.getElementById('productSearchInput');
const searchBtn = document.getElementById('productSearchBtn');
function runProductSearch() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;
    categorySections.forEach(section => {
        let sectionHasVisible = false;
        const productCards = section.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
            if (name.includes(query) || desc.includes(query)) {
                card.style.display = '';
                sectionHasVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        // Show/hide section based on if any product is visible
        if (sectionHasVisible) {
            section.classList.remove('hidden');
            section.classList.add('show');
            section.classList.remove('collapsed');
            anyVisible = true;
        } else {
            section.classList.add('hidden');
            section.classList.remove('show');
        }
    });
    // Optionally, show a message if no products found
    // (not implemented here for brevity)
}
if (searchInput) {
    searchInput.addEventListener('input', runProductSearch);
}
if (searchBtn) {
    searchBtn.addEventListener('click', runProductSearch);
}
;

// Order Product Function (redirect to Google Form)
function orderProduct(event, productName) {
    // Replace with your actual Google Form URL and field entry for product name
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSerRHEmqHQIDvcJWeJZ9HwSH1ms0xfYQJjWX6UIHcYkFWkLww/viewform?usp=sharing&ouid=106194449731465733968';
    // If you want to prefill a field, use the entry ID for the product name field
    // Example: '?usp=pp_url&entry.1234567890=' + encodeURIComponent(productName.replace('-', ' '))
    // Update 'entry.1234567890' to your Google Form's field entry ID
    const prefill = '?usp=pp_url';
    window.open(baseUrl + prefill, '_blank'); // open in new tab
}

// ...order form and modal logic removed...

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show all categories initially
    filterCategories('all');

    // Add loading animation to product images (only once, after DOM is ready)
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        // Only set opacity to 0 if the image is not already loaded
        if (!img.complete) {
            img.style.opacity = '0';
        }
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        // If already loaded (from cache), trigger fade-in immediately
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Initialize category states (all expanded by default)
    categorySections.forEach(section => {
        section.classList.remove('collapsed');
    });
});

// Add CSS for additional animations and effects
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top:hover {
        transform: translateY(-2px) scale(1.1);
    }
    
    .product-image img {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .category-toggle i {
        transition: transform 0.3s ease;
    }
    
    .category-section:hover .category-header {
        transform: translateX(5px);
    }
`;
document.head.appendChild(style);

// Contact form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation to form fields
document.getElementById('customerEmail').addEventListener('blur', function () {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
        this.setCustomValidity('Please enter a valid email address');
    } else {
        this.style.borderColor = '#ddd';
        this.setCustomValidity('');
    }
});

document.getElementById('customerPhone').addEventListener('blur', function () {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#dc3545';
        this.setCustomValidity('Please enter a valid phone number');
    } else {
        this.style.borderColor = '#ddd';
        this.setCustomValidity('');
    }
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

