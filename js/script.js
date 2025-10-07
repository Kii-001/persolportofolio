// Portfolio Main JavaScript
class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.init();
    }

    // Initialize the application
    init() {
        if (this.isInitialized) return;
        
        try {
            // Initialize AOS (Animate On Scroll)
            this.initAOS();
            
            // Initialize all components
            this.initLoadingScreen();
            this.initThemeToggle();
            this.initNavigation();
            this.initTypedText();
            this.initSkillAnimations();
            this.initScrollEffects();
            this.init3DEffects();
            this.initFormHandling();
            this.initCounters();
            this.initTabSystem();
            this.initDownloadCV();
            this.initBackToTop();
            
            // Set current year in footer
            this.setCurrentYear();
            
            this.isInitialized = true;
            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    // Initialize AOS
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                disable: window.innerWidth < 768
            });
        }
    }

    // Loading Screen
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        const progressFill = document.querySelector('.progress-fill');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Hide loading screen
                this.hideLoadingScreen(loadingScreen);
            }
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
        }, 150);
    }

    hideLoadingScreen(loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 500);
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use OS preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Add keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
    }

    // Navigation
    // Navigation with improved hamburger menu
initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navLinks) return;

    // Create overlay element
    this.createOverlay();

    // Mobile menu toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMobileMenu(hamburger, navLinks);
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            this.closeMobileMenu(hamburger, navLinks);
        });
    });

    // Close mobile menu when clicking on overlay
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            this.closeMobileMenu(hamburger, navLinks);
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            this.closeMobileMenu(hamburger, navLinks);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            this.closeMobileMenu(hamburger, navLinks);
        }
    });

    // Active navigation highlighting
    this.initScrollSpy();
}

createOverlay() {
    if (document.querySelector('.nav-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        this.closeMobileMenu(
            document.getElementById('hamburger'),
            document.querySelector('.nav-links')
        );
    });
}

toggleMobileMenu(hamburger, navLinks) {
    const isOpening = !navLinks.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }

    // Toggle body scroll
    document.body.style.overflow = isOpening ? 'hidden' : '';
    
    // Update aria attributes
    hamburger.setAttribute('aria-expanded', isOpening);
    navLinks.setAttribute('aria-hidden', !isOpening);

    // Announce to screen readers
    if (isOpening) {
        this.announceToScreenReader('Menu opened');
    } else {
        this.announceToScreenReader('Menu closed');
    }
}

closeMobileMenu(hamburger, navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }

    document.body.style.overflow = '';
    
    // Update aria attributes
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
}

announceToScreenReader(message) {
    const announcer = document.getElementById('a11y-announcer') || this.createA11yAnnouncer();
    announcer.textContent = message;
}

createA11yAnnouncer() {
    const announcer = document.createElement('div');
    announcer.id = 'a11y-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
    return announcer;
}

initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

    // Typed Text Animation
    initTypedText() {
        const typedText = document.getElementById('typed-text');
        if (!typedText) return;
        
        const texts = [
            'Web Developer',
            'UI/UX Designer',
            'Frontend Specialist',
            'Problem Solver',
            'Creative Thinker'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before starting next
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Start typing animation after a delay
        setTimeout(type, 1000);
    }

    // Skill Animations
    initSkillAnimations() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        const radialProgresses = document.querySelectorAll('.radial-progress');
        
        if (skillProgresses.length === 0 && radialProgresses.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('skill-progress')) {
                        this.animateSkillBar(element);
                    } else if (element.classList.contains('radial-progress')) {
                        this.animateRadialProgress(element);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        skillProgresses.forEach(progress => observer.observe(progress));
        radialProgresses.forEach(progress => observer.observe(progress));
    }

    animateSkillBar(progressBar) {
        const width = progressBar.getAttribute('data-width');
        if (width) {
            progressBar.style.width = `${width}%`;
        }
    }

    animateRadialProgress(radialProgress) {
        const progressValue = radialProgress.getAttribute('data-progress');
        const valueElement = radialProgress.querySelector('.radial-value');
        const radialFill = radialProgress.querySelector('.radial-fill');
        
        if (progressValue && valueElement) {
            // Animate counter
            this.animateCounter(valueElement, 0, progressValue, 1500);
            
            // Animate SVG progress
            if (radialFill) {
                const circumference = 283; // 2 * π * 45 (radius)
                const offset = circumference - (progressValue / 100) * circumference;
                radialFill.style.strokeDashoffset = offset;
            }
        }
    }

    // Counter Animation
    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `${value}%`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Scroll Effects
    initScrollEffects() {
        const header = document.getElementById('mainHeader');
        if (header) {
            this.initHeaderScroll(header);
        }
    }

    initHeaderScroll(header) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 3D Effects
    init3DEffects() {
        const cards3D = document.querySelectorAll('.card-3d');
        if (cards3D.length === 0) return;

        cards3D.forEach(card => {
            card.addEventListener('mousemove', this.handleCard3DHover.bind(this));
            card.addEventListener('mouseleave', this.handleCard3DLeave.bind(this));
            card.addEventListener('touchmove', this.handleCard3DTouch.bind(this), { passive: true });
        });
    }

    handleCard3DHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = ((centerY - y) / centerY) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    handleCard3DLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }

    handleCard3DTouch(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const fakeMouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            e.currentTarget.dispatchEvent(fakeMouseEvent);
        }
    }

    // Form Handling
    initFormHandling() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        // Initialize form validation
        this.initFormValidation(contactForm);
        
        // Handle form submission
        contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    initFormValidation(form) {
        const fields = form.querySelectorAll('input, textarea');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        this.clearFieldError(field);
        
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Validate all fields
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fix the errors in the form.', 'error');
            return;
        }
        
        // Show loading state
        this.setButtonLoading(submitButton, true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.submitForm(form);
            
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.setAttribute('aria-label', 'Sending message...');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.removeAttribute('aria-label');
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            button.classList.remove('loading');
        }
    }

    async submitForm(form) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.2) { // 80% success rate for demo
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Close button event
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            if (document.body.contains(notification)) {
                this.hideNotification(notification);
            }
        }, 5000);
        
        // Store timeout ID for cleanup
        notification._autoRemoveTimeout = autoRemove;
        
        return notification;
    }

    hideNotification(notification) {
        if (notification._autoRemoveTimeout) {
            clearTimeout(notification._autoRemoveTimeout);
        }
        
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }

    // Counter Animation for Stats
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    this.animateCounter(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Tab System
    initTabSystem() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabButtons.length === 0 || tabPanes.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab, tabButtons, tabPanes);
            });

            // Keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetTab = button.getAttribute('data-tab');
                    this.switchTab(targetTab, tabButtons, tabPanes);
                }
            });
        });
    }

    switchTab(targetTab, tabButtons, tabPanes) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        const activeButton = Array.from(tabButtons).find(btn => 
            btn.getAttribute('data-tab') === targetTab
        );
        const activePane = document.getElementById(`${targetTab}-tab`);
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
            activePane.classList.add('active');
        }
    }

    // Download CV
    initDownloadCV() {
        const downloadBtn = document.getElementById('download-cv');
        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadCV();
        });
    }

    downloadCV() {
        // In a real scenario, this would link to your actual CV file
        this.showNotification('Preparing your download...', 'info');
        
        // Simulate download process
        setTimeout(() => {
            // Create a temporary link for download
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Fathur-Rizky-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('CV download started!', 'success');
        }, 1000);
    }

    // Back to Top
    initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });

        // Keyboard support
        backToTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Utility Methods
    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            if (observer && typeof observer.disconnect === 'function') {
                observer.disconnect();
            }
        });
        this.observers = [];
        this.isInitialized = false;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}

// Additional utility functions
class PortfolioUtils {
    // Debounce function
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Check if element is in viewport
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Preload images
    static preloadImages(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}



// Make utils globally available
window.PortfolioUtils = PortfolioUtils;

// Error boundary for the application
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

