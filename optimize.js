// Performance Optimization Script for Portfolio
(function(){
    'use strict';
    
    // Optimize animations with requestAnimationFrame
    const optimizeAnimations = () => {
        const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animation"]');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    };
    
    // Lazy load images
    const lazyLoadImages = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    // Preload critical resources
    const preloadCriticalResources = () => {
        const criticalImages = ['src/images/GEAR4.png', 'src/images/Luffy.png'];
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    };
    
    // Optimize form handling
    const optimizeForms = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add form submission logic here
                console.log('Form submitted');
            });
        });
    };
    
    // Debounce scroll events
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
    
    // Optimize scroll performance
    const optimizeScroll = () => {
        let ticking = false;
        const updateScroll = () => {
            // Scroll-based optimizations
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    };
    
    // Initialize optimizations when DOM is ready
    const init = () => {
        optimizeAnimations();
        lazyLoadImages();
        preloadCriticalResources();
        optimizeForms();
        optimizeScroll();
    };
    
    // Run optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for potential external use
    window.PortfolioOptimizer = {
        optimizeAnimations,
        lazyLoadImages,
        preloadCriticalResources,
        optimizeForms,
        optimizeScroll
    };
})();
