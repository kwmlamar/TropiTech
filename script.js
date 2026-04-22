/* ============================================================
   TROPITECH SOLUTIONS — Shared GSAP Script
   GSAP 3.12.5 + ScrollTrigger
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Dynamic footer year ----
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Progress bar ----
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        }, { passive: true });
    }

    // ---- Nav scroll state ----
    const nav = document.getElementById('main-nav');
    if (nav) {
        const onScroll = () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---- Mobile menu ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Section label ----
    const sectionLabel = document.getElementById('section-label');
    if (sectionLabel) {
        const sections = document.querySelectorAll('[data-section]');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    sectionLabel.textContent = e.target.dataset.section;
                }
            });
        }, { threshold: 0.4 });
        sections.forEach(s => io.observe(s));
    }

    // ---- GSAP Init ----
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ---- HERO ENTRANCE (index only) ----
    const heroEyebrow = document.getElementById('hero-eyebrow');
    const heroHeadline = document.getElementById('hero-headline');
    const heroSub = document.getElementById('hero-sub');
    const heroCtas = document.getElementById('hero-ctas');
    const heroScroll = document.getElementById('hero-scroll');

    if (heroHeadline) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl
            .to(heroEyebrow, { opacity: 1, y: 0, duration: 0.7, delay: 0.2 })
            .to(heroHeadline, { opacity: 1, y: 0, duration: 1.0 }, '-=0.3')
            .to(heroSub,     { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
            .to(heroCtas,    { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
            .to(heroScroll,  { opacity: 1, duration: 0.6 }, '-=0.3');
    }

    // ---- INNER HERO REVEAL ----
    const innerHeroEls = document.querySelectorAll('.inner-hero .inner-page-tag, .inner-hero .inner-hero-heading, .inner-hero .inner-hero-sub, .inner-hero .hero-ctas');
    if (innerHeroEls.length) {
        gsap.fromTo(innerHeroEls,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.15 }
        );
    }

    // ---- GENERIC REVEAL (scroll-triggered) ----
    document.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 48 },
            {
                opacity: 1, y: 0,
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            }
        );
    });

    document.querySelectorAll('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -48 },
            {
                opacity: 1, x: 0,
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
        );
    });

    document.querySelectorAll('.reveal-right').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: 48 },
            {
                opacity: 1, x: 0,
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
        );
    });

    document.querySelectorAll('.reveal-scale').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.92 },
            {
                opacity: 1, scale: 1,
                duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
        );
    });

    // ---- WHY CARDS (staggered) ----
    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length) {
        gsap.to(whyCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.why-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- SERVICE CARDS (staggered) ----
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
        gsap.to(serviceCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- PORTFOLIO CARDS (staggered) ----
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    if (portfolioCards.length) {
        gsap.to(portfolioCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: portfolioCards[0].closest('.portfolio-grid, .portfolio-full-grid'),
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- PROCESS STEPS (staggered) ----
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length) {
        gsap.to(processSteps, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- TESTIMONIAL CARDS (staggered) ----
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length) {
        gsap.to(testimonialCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- SERVICE DETAIL CARDS ----
    const detailCards = document.querySelectorAll('.service-detail-card');
    if (detailCards.length) {
        gsap.to(detailCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: detailCards[0],
                start: 'top 85%',
                once: true
            }
        });
    }

    // ---- VALUE CARDS ----
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length) {
        gsap.to(valueCards, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.values-grid',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ---- CONTACT FORM CARD ----
    const contactFormCard = document.querySelector('.contact-form-card');
    if (contactFormCard) {
        gsap.to(contactFormCard, {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
                trigger: contactFormCard,
                start: 'top 85%',
                once: true
            }
        });
    }

    // ---- ABOUT INTRO ----
    const aboutIntroEls = document.querySelectorAll('.about-intro > *');
    if (aboutIntroEls.length) {
        gsap.fromTo(aboutIntroEls,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.85, ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.about-intro',
                    start: 'top 80%',
                    once: true
                }
            }
        );
    }

    // ---- STATS COUNTER ANIMATION ----
    document.querySelectorAll('.about-stat-number').forEach(el => {
        const target = el.textContent;
        const numMatch = target.match(/[\d.]+/);
        if (!numMatch) return;
        const num = parseFloat(numMatch[0]);
        const suffix = target.replace(numMatch[0], '');
        const isFloat = target.includes('.');

        gsap.fromTo(
            { val: 0 },
            { val: num, duration: 1.5, ease: 'power2.out',
              onUpdate: function() {
                  el.textContent = (isFloat ? this.targets()[0].val.toFixed(1) : Math.round(this.targets()[0].val)) + suffix;
              },
              scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true
              }
            }
        );
    });

    // ---- CTA BANNER REVEAL ----
    const ctaBannerContent = document.querySelector('.cta-banner-content');
    if (ctaBannerContent) {
        gsap.fromTo(ctaBannerContent,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0,
                duration: 1.0, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-banner',
                    start: 'top 75%',
                    once: true
                }
            }
        );
    }

    // ---- PARALLAX on hero bg ----
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

});
