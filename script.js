/* =========================================================
   SPIREX FOUNDATION
   ABOUT PAGE
   COMPLETE FINAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const themeToggle =
        document.getElementById("themeToggle");

    const scrollProgress =
        document.querySelector(".scroll-progress");

    const pointerGlow =
        document.querySelector(".pointer-glow");

    const brandLogo =
        document.getElementById("brandLogo");


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                const opened =
                    navLinks.classList.toggle(
                        "nav-active"
                    );

                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.toggle(
                        "fa-bars",
                        !opened
                    );

                    icon.classList.toggle(
                        "fa-xmark",
                        opened
                    );

                }


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(opened)
                );

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "nav-active"
                        );


                        const icon =
                            menuToggle.querySelector("i");


                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =====================================================
       THEME
       ===================================================== */

    function applyTheme(theme) {

        const light =
            theme === "light";


        document.body.classList.toggle(
            "light-mode",
            light
        );


        if (!themeToggle) {
            return;
        }


        const icon =
            themeToggle.querySelector("i");


        if (icon) {

            icon.classList.toggle(
                "fa-sun",
                light
            );

            icon.classList.toggle(
                "fa-moon",
                !light
            );

        }


        themeToggle.setAttribute(
            "aria-label",
            light
                ? "Switch to dark mode"
                : "Switch to light mode"
        );


        themeToggle.setAttribute(
            "title",
            light
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }


    const savedTheme =
        localStorage.getItem(
            "spirex-theme"
        );


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {

        applyTheme(savedTheme);

    } else {

        const prefersLight =
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;


        applyTheme(
            prefersLight
                ? "light"
                : "dark"
        );

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const light =
                    document.body.classList.contains(
                        "light-mode"
                    );


                const nextTheme =
                    light
                        ? "dark"
                        : "light";


                applyTheme(nextTheme);


                localStorage.setItem(
                    "spirex-theme",
                    nextTheme
                );

            }
        );

    }


    /* =====================================================
       LOGO / BRAND HOVER EFFECT
       ===================================================== */

    if (brandLogo) {

        const supportsHover =
            window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches;


        if (supportsHover) {

            brandLogo.addEventListener(
                "mouseenter",
                () => {

                    brandLogo.classList.add(
                        "logo-hover"
                    );

                }
            );


            brandLogo.addEventListener(
                "mouseleave",
                () => {

                    brandLogo.classList.remove(
                        "logo-hover"
                    );

                }
            );

        }

    }


    /* =====================================================
       CLOSE MOBILE NAV ON RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                navLinks &&
                navLinks.classList.contains(
                    "nav-active"
                )
            ) {

                navLinks.classList.remove(
                    "nav-active"
                );


                const icon =
                    menuToggle?.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }


                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-up, .reveal-left, .reveal-right"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "active"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "active"
            );

        });

    }


    /* =====================================================
       COUNTERS
       ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        /*
                         * Current statistics are
                         * intentionally 0 until
                         * verified by Team Lead.
                         */

                        if (
                            !Number.isFinite(target) ||
                            target <= 0
                        ) {

                            counter.textContent =
                                "0";


                            observer.unobserve(
                                counter
                            );


                            return;

                        }


                        const duration =
                            1500;


                        const start =
                            performance.now();


                        function animate(time) {

                            const progress =
                                Math.min(
                                    (time - start) /
                                    duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            counter.textContent =
                                Math.floor(
                                    target * eased
                                ).toLocaleString();


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                counter.textContent =
                                    target.toLocaleString();

                            }

                        }


                        requestAnimationFrame(
                            animate
                        );


                        observer.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;


        scrollProgress.style.width =
            `${Math.min(percentage, 100)}%`;

    }


    updateScrollProgress();


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    /* =====================================================
       POINTER GLOW
       ===================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        pointerGlow &&
        !isTouchDevice
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                pointerGlow.style.left =
                    `${event.clientX}px`;


                pointerGlow.style.top =
                    `${event.clientY}px`;


                pointerGlow.style.opacity =
                    "1";

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                pointerGlow.style.opacity =
                    "0";

            }
        );

    }


    /* =====================================================
       ACTIVE NAV LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (
                href === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =====================================================
       ESC KEY - CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                navLinks.classList.contains(
                    "nav-active"
                )
            ) {

                navLinks.classList.remove(
                    "nav-active"
                );


                const icon =
                    menuToggle?.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }


                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});
