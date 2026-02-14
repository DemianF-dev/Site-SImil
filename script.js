/**
 * SIMIL V3 - Modern Interactions
 * Fluid animations, smooth transitions, and dynamic interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initCursor();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initTestimonialsSlider();
    initFormInteractions();
    initMagneticButtons();
    
    // New Innovative Features
    initScrollProgress();
    initThemeToggle();
    initParticleSystem();
    initROICalculator();
    initShareButtons();
    initScrollToTop();
    initSocialProof();
    initToastSystem();
    initAccessibility();
    initPerformanceOptimizations();
});

// ========================================
// PRELOADER
// ========================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading time
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Trigger hero animations after preloader
        setTimeout(() => {
            animateHeroElements();
        }, 300);
    }, 1800);
}

function animateHeroElements() {
    const titleLines = document.querySelectorAll('.title-line');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');
    
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroCta) {
        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroStats) {
        setTimeout(() => {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 800);
    }
}

// ========================================
// CUSTOM CURSOR
// ========================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Check if device supports hover (not touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Follower has more delay for smooth effect
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .property-card, .step-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll behavior for navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Smooth scroll
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const revealElements = document.querySelectorAll(
        '.section-header, .step-card, .property-card, .info-card, .about-text, .contact-info'
    );
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Parallax effect for hero
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && !window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
}

// ========================================
// COUNTERS
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
function initTestimonialsSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!cards.length) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        cards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showSlide(currentIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            resetAutoPlay();
        });
    });
    
    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    startAutoPlay();
}

// ========================================
// FORM INTERACTIONS
// ========================================
function initFormInteractions() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="60">
                    <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>Mensagem Enviada!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            submitBtn.style.background = '#25D366';
            
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll to element
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
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

// ========================================
// ADDITIONAL EFFECTS
// ========================================

// Text scramble effect for special elements
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize scramble on hover for logo
/* 
const logo = document.querySelector('.logo-text');
if (logo) {
    const fx = new TextScramble(logo);
    const originalText = logo.innerText;
    
    logo.parentElement.addEventListener('mouseenter', () => {
        fx.setText('SIMIL');
    });
}
*/

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Disable animations on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-premium', 'none');
    
    // Disable all animations
    const animatedElements = document.querySelectorAll('.gradient-orb, .floating-card, .mouse');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });
}

// Console easter egg
console.log('%c SIMIL ', 'background: linear-gradient(135deg, #e74422 0%, #f9d423 100%); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Reengenharia Imobiliária de Excelência ', 'color: #e74422; font-size: 14px;');
console.log('%c Desenvolvido com ❤️ por SIMIL Team ', 'color: #666; font-size: 12px;');

// ========================================
// NOVAS FUNCIONALIDADES INOVADORAS
// ========================================

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, 50));
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('simil-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('simil-theme', newTheme);
        
        // Show toast notification
        showToast('info', 'Tema Alterado', `Modo ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
    });
}

// Interactive Particle System
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || window.matchMedia('(pointer: coarse)').matches) return;
    
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    // Set canvas size
    function resizeCanvas() {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 100));
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(231, 68, 34, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseActive = false;
    let mouseTimeout;
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseActive = true;
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseActive = false;
        }, 100);
    });
    
    // Animation loop
    let animationId;
    let isVisible = true;
    
    // Visibility check
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);
    
    function animate() {
        if (!isVisible) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
            
            // Connect particles near mouse
            if (isMouseActive) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(231, 68, 34, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// ROI Calculator
function initROICalculator() {
    const investmentSlider = document.getElementById('investmentAmount');
    const timeSlider = document.getElementById('timeHorizon');
    const rateSlider = document.getElementById('appreciationRate');
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (!investmentSlider || !timeSlider || !rateSlider) return;
    
    const investmentDisplay = document.getElementById('investmentValueDisplay');
    const timeDisplay = document.getElementById('timeValueDisplay');
    const rateDisplay = document.getElementById('rateValueDisplay');
    const futureValueDisplay = document.getElementById('futureValue');
    const gainDisplay = document.getElementById('appreciationGain');
    const roiDisplay = document.getElementById('roiPercentage');
    
    function formatCurrency(value) {
        return 'R$ ' + value.toLocaleString('pt-BR');
    }
    
    function updateCalculations() {
        const investment = parseInt(investmentSlider.value);
        const years = parseInt(timeSlider.value);
        const rate = parseFloat(rateSlider.value) / 100;
        
        // Update displays
        investmentDisplay.textContent = formatCurrency(investment);
        timeDisplay.textContent = years + (years === 1 ? ' ano' : ' anos');
        rateDisplay.textContent = (rate * 100).toFixed(1) + '% ao ano';
        
        // Calculate compound appreciation
        const futureValue = investment * Math.pow(1 + rate, years);
        const gain = futureValue - investment;
        const roi = ((futureValue - investment) / investment) * 100;
        
        // Animate results
        animateValue(futureValueDisplay, futureValue, formatCurrency);
        animateValue(gainDisplay, gain, (v) => '+ ' + formatCurrency(v));
        animateValue(roiDisplay, roi, (v) => v.toFixed(1) + '%', true);
        
        // Draw chart
        drawROIChart(investment, years, rate);
    }
    
    function animateValue(element, target, formatter, isPercent = false) {
        const start = parseFloat(element.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
        const duration = 800;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const current = start + (target - start) * easeProgress;
            element.textContent = formatter(current);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    function drawROIChart(initial, years, rate) {
        const canvas = document.getElementById('roiChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Calculate data points
        const dataPoints = [];
        for (let i = 0; i <= years; i++) {
            dataPoints.push(initial * Math.pow(1 + rate, i));
        }
        
        const maxValue = Math.max(...dataPoints);
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#e74422';
        ctx.lineWidth = 3;
        
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / years) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw gradient fill
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
        gradient.addColorStop(0, 'rgba(231, 68, 34, 0.3)');
        gradient.addColorStop(1, 'rgba(231, 68, 34, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw points
        dataPoints.forEach((value, index) => {
            const x = padding + (chartWidth / years) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#e74422';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(231, 68, 34, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }
    
    // Event listeners
    investmentSlider.addEventListener('input', updateCalculations);
    timeSlider.addEventListener('input', updateCalculations);
    rateSlider.addEventListener('input', updateCalculations);
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            updateCalculations();
            showToast('success', 'Cálculo Atualizado', 'Projeção recalculada com sucesso!');
        });
    }
    
    // Initial calculation
    updateCalculations();
}

// Share Buttons
function initShareButtons() {
    const shareTrigger = document.getElementById('shareTrigger');
    const shareOptions = document.getElementById('shareOptions');
    
    if (!shareTrigger || !shareOptions) return;
    
    shareTrigger.addEventListener('click', () => {
        shareOptions.classList.toggle('active');
        shareTrigger.classList.toggle('active');
        shareTrigger.setAttribute('aria-expanded', shareOptions.classList.contains('active'));
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.share-float')) {
            shareOptions.classList.remove('active');
            shareTrigger.classList.remove('active');
            shareTrigger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Share actions
    const shareBtns = document.querySelectorAll('.share-btn');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    shareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            let shareUrl = '';
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        showToast('success', 'Link Copiado!', 'O link foi copiado para sua área de transferência.');
                    });
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
            
            shareOptions.classList.remove('active');
            shareTrigger.classList.remove('active');
        });
    });
}

// Scroll to Top
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Social Proof Notifications
function initSocialProof() {
    const container = document.getElementById('socialProofContainer');
    if (!container) return;
    
    const notifications = [
        { name: 'Ricardo M.', action: 'acabou de agendar uma visita', time: '2 minutos atrás' },
        { name: 'Ana S.', action: 'visualizou Residencial Portofino', time: '5 minutos atrás' },
        { name: 'Carlos B.', action: 'solicitou informações', time: '8 minutos atrás' },
        { name: 'Mariana L.', action: 'acabou de compartilhar', time: '12 minutos atrás' },
        { name: 'Fernando R.', action: 'está calculando ROI', time: '15 minutos atrás' }
    ];
    
    let currentIndex = 0;
    
    function showNotification() {
        const notification = notifications[currentIndex];
        
        const el = document.createElement('div');
        el.className = 'social-proof';
        el.innerHTML = `
            <div class="social-proof-avatar">${notification.name.charAt(0)}</div>
            <div class="social-proof-content">
                <p class="social-proof-text"><strong>${notification.name}</strong> ${notification.action}</p>
                <span class="social-proof-time">${notification.time}</span>
            </div>
        `;
        
        container.appendChild(el);
        
        setTimeout(() => {
            el.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => el.remove(), 500);
        }, 5000);
        
        currentIndex = (currentIndex + 1) % notifications.length;
    }
    
    // Show first notification after 10 seconds
    setTimeout(() => {
        showNotification();
        // Then every 20-30 seconds
        setInterval(showNotification, 25000);
    }, 10000);
}

// Toast Notification System
function showToast(type, title, message, duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Fechar notificação">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 400);
    });
    
    // Auto remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 400);
        }
    }, duration);
}

function initToastSystem() {
    // Toast system is initialized via showToast function
    // This function is called on demand
}

// Accessibility Enhancements
function initAccessibility() {
    // Keyboard navigation for mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
        
        // Trap focus in mobile menu when open
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.click();
                menuToggle.focus();
            }
        });
    }
    
    // Skip link focus management
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            mainContent.removeAttribute('tabindex');
        });
    }
    
    // Announce page load to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = 'Página SIMIL carregada. Use Tab para navegar.';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 3000);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Prefetch visible links
    const visibleLinks = document.querySelectorAll('a[href^="http"]');
    visibleLinks.forEach(link => {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = link.href;
        document.head.appendChild(prefetch);
    });
    
    // Monitor Core Web Vitals (simplified)
    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                }
            });
            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Performance Observer not supported
        }
    }
}

// Enhanced Text Reveal Animation
function initTextRevealAnimations() {
    const revealElements = document.querySelectorAll('.title-line, .section-title, .hero-description');
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 3D Tilt Effect for Cards
function init3DTiltEffect() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cards = document.querySelectorAll('.property-card, .step-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize enhanced animations after preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        initTextRevealAnimations();
        init3DTiltEffect();
    }, 2000);
});

// Add animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(-120%);
            opacity: 0;
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);