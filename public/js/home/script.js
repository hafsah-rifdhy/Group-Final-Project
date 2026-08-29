document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = nav.querySelectorAll('.links a, .actions .btn');

    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const toggleMenu = (forceState) => {
        const isOpen = typeof forceState === 'boolean'
            ? forceState
            : !nav.classList.contains('nav-open');

        nav.classList.toggle('nav-open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen.toString());

        if (window.innerWidth < 768) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    };

    navToggle.addEventListener('click', () => toggleMenu());

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                toggleMenu(false);
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && nav.classList.contains('nav-open')) {
            toggleMenu(false);
        }
    });
});