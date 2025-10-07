// Advanced Animations and Interactions
class PortfolioAnimations {
    constructor() {
        this.initializeParticleEffects();
        this.initializeScrollAnimations();
        this.initializeInteractiveElements();
        this.initializePerformanceOptimizations();
    }

    // Particle Background Effect
    initializeParticleEffects() {
        const particlesContainer = document.getElementById('particlesContainer');
        if (!particlesContainer) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
            `;
            particlesContainer.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // Advanced Scroll Animations
    initializeScrollAnimations() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Animate elements on scroll
            this.animateOnScroll();
        });

        // Intersection Observer for advanced animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for child elements
                    if (entry.target.dataset.stagger) {
                        const children = entry.target.querySelectorAll('.stagger-item');
                        children.forEach((child, index) => {
                            child.style.animationDelay = `${index * 0.1}s`;
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    }

    // Interactive Elements
    initializeInteractiveElements() {
        // Magnetic buttons
        this.initializeMagneticButtons();
        
        // Hover sound effects
        this.initializeSoundEffects();
        
        // Custom cursor
        this.initializeCustomCursor();
        
        // Page transitions
        this.initializePageTransitions();
    }

    // Magnetic Buttons Effect
    initializeMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) * 0.1;
                const deltaY = (y - centerY) * 0.1;
                
                button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Sound Effects on Interaction
    initializeSoundEffects() {
        // This is a placeholder for sound effects
        // In a real implementation, you would use the Web Audio API
        const buttons = document.querySelectorAll('button, .btn, .nav-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Play subtle click sound
                this.playSound('click');
            });
            
            button.addEventListener('mouseenter', () => {
                // Play hover sound
                this.playSound('hover');
            });
        });
    }

    playSound(type) {
        // Placeholder for sound implementation
        // You would typically use the Web Audio API here
        console.log(`Playing ${type} sound`);
    }

    // Custom Cursor
    initializeCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Change cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // Smooth Page Transitions
    initializePageTransitions() {
        // Add transition class to body
        document.body.classList.add('page-transition');
        
        // Handle internal link clicks
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    // Smooth scroll to section
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance Optimizations
    initializePerformanceOptimizations() {
        // Lazy loading for images
        this.initializeLazyLoading();
        
        // Debounce scroll events
        this.initializeDebouncedEvents();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    // Lazy Loading for Images
    initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Debounce Expensive Events
    initializeDebouncedEvents() {
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        // Debounce scroll and resize events
        const debouncedScroll = debounce(() => {
            // Handle debounced scroll events
        }, 10);

        window.addEventListener('scroll', debouncedScroll);
        window.addEventListener('resize', debounce(() => {
            // Handle debounced resize events
        }, 250));
    }

    // Preload Critical Resources
    preloadCriticalResources() {
        const criticalResources = [
            // Add paths to critical resources here
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Utility Methods
    animateOnScroll() {
        // Custom scroll animations can be added here
    }

    // Initialize all animations
    static init() {
        return new PortfolioAnimations();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    PortfolioAnimations.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioAnimations;
}