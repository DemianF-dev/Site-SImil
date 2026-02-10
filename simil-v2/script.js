document.addEventListener('DOMContentLoaded', () => {
    console.log('SIMIL V2.2 - Sidney Milani Luxury Hub Initialized');

    // Smooth scrolling for luxury navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 110,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Elegant Scroll Disclosure
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only apply reveal to specific decorative elements to prevent blocking content
    document.querySelectorAll('.card, .about-image, .section-title').forEach(el => {
        el.style.opacity = "0.2"; // Start at low opacity
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 1s cubic-bezier(0.19, 1, 0.22, 1)";
        revealObserver.observe(el);
    });
});

// Helper for dynamic reveal class
window.addEventListener('scroll', () => {
    const revealed = document.querySelectorAll('.reveal-active');
    revealed.forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });
});
