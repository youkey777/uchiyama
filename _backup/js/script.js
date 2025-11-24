document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .reveal-mask');
    animatedElements.forEach(el => observer.observe(el));


    // 2. Header Scroll Logic (Hide on scroll down, show on scroll up)
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scroll Down
                header.classList.add('is-hidden');
            } else {
                // Scroll Up
                header.classList.remove('is-hidden');
            }
        } else {
            header.classList.remove('is-hidden');
        }
        lastScrollTop = scrollTop;
    });

    // 3. Smooth Scroll for Anchor Links
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

});
