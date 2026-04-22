/**
 * Constantine, Algeria - City of Bridges
 * JavaScript with Multilingual Support
 */

let translations = null;
let currentLang = 'en';

document.addEventListener('DOMContentLoaded', async function() {
    // Load saved language preference
    const savedLang = localStorage.getItem('constantine-lang') || 'en';
    
    // Load translations first
    try {
        const response = await fetch('lang.json');
        translations = await response.json();
        console.log('Translations loaded:', Object.keys(translations));
    } catch (error) {
        console.error('Failed to load translations:', error);
        return;
    }
    
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    
    // Set initial language
    setLanguage(savedLang);
    
    // Attach language switcher click handler
    const langSwitch = document.getElementById('langSwitch');
    console.log('Language switch button:', langSwitch);
    
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language switch clicked. Current:', currentLang);
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            console.log('Switching to:', newLang);
            setLanguage(newLang);
        });
    } else {
        console.error('Language switch button not found!');
    }
    
    // Initialize counter animation
    animateCounters();
});

/**
 * Set Language
 */
function setLanguage(lang) {
    if (!translations || !translations[lang]) {
        console.error('No translations for language:', lang);
        return;
    }
    
    currentLang = lang;
    localStorage.setItem('constantine-lang', lang);
    
    const langData = translations[lang];
    console.log('Setting language to:', lang, langData.meta);
    
    // Update HTML lang and dir attributes
    document.documentElement.lang = langData.meta.lang;
    document.documentElement.dir = langData.meta.dir;
    
    // Update page title
    document.title = langData.meta.title;
    
    // Update all translatable elements
    let count = 0;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedValue(langData, key);
        if (translation) {
            element.textContent = translation;
            count++;
        }
    });
    console.log('Updated', count, 'elements');
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') 
                    ? index === 1 
                        ? 'scaleX(0)' 
                        : index === 0 
                            ? 'rotate(45deg) translate(5px, 5px)' 
                            : 'rotate(-45deg) translate(5px, -5px)'
                    : 'none';
            });
        });
        
        // Close menu when clicking on a link (but not the language button)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 54, 93, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const animatableElements = document.querySelectorAll(
        '.bridge-card, .landmark-card, .culture-card, .gallery-item, .visit-card'
    );
    
    animatableElements.forEach(el => observer.observe(el));
    
    // Timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = currentLang === 'ar' ? 'translateX(30px)' : 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Subtle parallax effect for hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                hero.style.backgroundPosition = `center ${scrolled * parallaxSpeed}px`;
            }
        });
    }
}

/**
 * Counter animation for facts
 */
function animateCounters() {
    const counters = document.querySelectorAll('.fact-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}
