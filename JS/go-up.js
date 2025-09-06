/**
 * Go-Up Button Functionality
 * Reusable scroll-to-top button for BDG website pages
 * 
 * Usage: Include this file in any HTML page with:
 * <script src="go-up-button.js"></script>
 * 
 * The button will be automatically created and styled
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        showAfterScroll: 300, // Show button after scrolling this many pixels
        scrollDuration: 200,  // Smooth scroll duration in milliseconds (reduced for faster response)
        buttonSize: 50,       // Button size in pixels
        bottomOffset: 30,     // Distance from bottom of screen
        rightOffset: 30,      // Distance from right of screen
        zIndex: 1000         // Z-index for button positioning
    };

    // CSS Variables (matching BDG theme)
    const colors = {
        primaryBlue: '#003366',
        secondaryBlue: '#0053aa',
        white: '#ffffff'
    };

    let scrollToTopBtn = null;
    let isScrolling = false;

    /**
     * Create the go-up button element
     */
    function createButton() {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'bdg-scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.setAttribute('title', 'Go to top');

        // Apply styles
        applyButtonStyles();

        // Initially hide the button
        scrollToTopBtn.style.display = 'none';

        // Add to page
        document.body.appendChild(scrollToTopBtn);
    }

    /**
     * Apply CSS styles to the button
     */
    function applyButtonStyles() {
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: ${config.bottomOffset}px;
            right: ${config.rightOffset}px;
            background: linear-gradient(135deg, ${colors.primaryBlue}, ${colors.secondaryBlue});
            color: ${colors.white};
            border: none;
            border-radius: 50%;
            width: ${config.buttonSize}px;
            height: ${config.buttonSize}px;
            cursor: pointer;
            display: none;
            z-index: ${config.zIndex};
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-size: 16px;
            outline: none;
            user-select: none;
        `;
    }

    /**
     * Add CSS animations and hover effects
     */
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .bdg-scroll-to-top:hover {
                transform: scale(1.1) translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                background: linear-gradient(135deg, ${colors.secondaryBlue}, ${colors.primaryBlue});
            }
            
            .bdg-scroll-to-top:active {
                transform: scale(0.95);
                transition: transform 0.1s ease;
            }
            
            .bdg-scroll-to-top:focus {
                outline: 2px solid ${colors.secondaryBlue};
                outline-offset: 2px;
            }
            
            .bdg-scroll-to-top.show {
                display: block !important;
                animation: fadeInUp 0.3s ease forwards;
            }
            
            .bdg-scroll-to-top.hide {
                animation: fadeOutDown 0.3s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            .bdg-scroll-to-top.pulse {
                animation: pulse 0.6s ease-in-out;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .bdg-scroll-to-top {
                    width: 45px !important;
                    height: 45px !important;
                    bottom: 20px !important;
                    right: 20px !important;
                    font-size: 14px !important;
                }
            }
            
            @media (max-width: 480px) {
                .bdg-scroll-to-top {
                    width: 40px !important;
                    height: 40px !important;
                    bottom: 15px !important;
                    right: 15px !important;
                    font-size: 12px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Smooth scroll to top function
     */
    function scrollToTop() {
        if (isScrolling) return;

        isScrolling = true;
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / config.scrollDuration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startPosition * (1 - easeOut));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                isScrolling = false;
                // Add pulse effect when scroll completes
                scrollToTopBtn.classList.add('pulse');
                setTimeout(() => {
                    scrollToTopBtn.classList.remove('pulse');
                }, 600);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    /**
     * Show or hide button based on scroll position
     */
    function toggleButtonVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > config.showAfterScroll) {
            if (scrollToTopBtn.style.display === 'none') {
                scrollToTopBtn.classList.remove('hide');
                scrollToTopBtn.classList.add('show');
                scrollToTopBtn.style.display = 'block';
            }
        } else {
            if (scrollToTopBtn.style.display === 'block') {
                scrollToTopBtn.classList.remove('show');
                scrollToTopBtn.classList.add('hide');
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        }
    }

    /**
     * Throttle function to limit scroll event frequency
     */
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

    /**
     * Add event listeners
     */
    function addEventListeners() {
        // Scroll event with throttling
        const throttledToggle = throttle(toggleButtonVisibility, 100);
        window.addEventListener('scroll', throttledToggle, { passive: true });

        // Click event
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTop();
        });

        // Keyboard support
        scrollToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });

        // Touch support for mobile
        let touchStartY = 0;
        scrollToTopBtn.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        scrollToTopBtn.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;

            // If it's a tap (minimal movement)
            if (Math.abs(touchDiff) < 10) {
                e.preventDefault();
                scrollToTop();
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden, pause any animations
                isScrolling = false;
            }
        });

        // Handle window resize
        window.addEventListener('resize', throttle(() => {
            // Reapply styles if needed for responsive design
            if (scrollToTopBtn) {
                applyButtonStyles();
            }
        }, 250));
    }

    /**
     * Check if Font Awesome is loaded
     */
    function checkFontAwesome() {
        // Check if Font Awesome is available
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-arrow-up';
        testElement.style.cssText = 'position: absolute; left: -9999px; top: -9999px;';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement, ':before');
        const hasFontAwesome = computedStyle.content !== 'none' && computedStyle.content !== '';

        document.body.removeChild(testElement);

        if (!hasFontAwesome) {
            // Fallback to text arrow if Font Awesome is not available
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.style.fontSize = '20px';
            scrollToTopBtn.style.fontWeight = 'bold';
        }
    }

    /**
     * Initialize the go-up button
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Create button and add styles
        createButton();
        addStyles();
        addEventListeners();

        // Check Font Awesome availability after a short delay
        setTimeout(checkFontAwesome, 100);

        // Initial visibility check
        toggleButtonVisibility();

        console.log('BDG Go-Up Button initialized successfully');
    }

    /**
     * Public API for customization
     */
    window.BDGGoUpButton = {
        /**
         * Update configuration
         */
        config: function (newConfig) {
            Object.assign(config, newConfig);
            if (scrollToTopBtn) {
                applyButtonStyles();
            }
        },

        /**
         * Show button manually
         */
        show: function () {
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.remove('hide');
                scrollToTopBtn.classList.add('show');
                scrollToTopBtn.style.display = 'block';
            }
        },

        /**
         * Hide button manually
         */
        hide: function () {
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.remove('show');
                scrollToTopBtn.classList.add('hide');
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        },

        /**
         * Destroy the button
         */
        destroy: function () {
            if (scrollToTopBtn) {
                scrollToTopBtn.remove();
                scrollToTopBtn = null;
            }
        },

        /**
         * Scroll to top programmatically
         */
        scrollToTop: scrollToTop
    };

    // Auto-initialize
    init();

})();