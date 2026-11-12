
/* =====================================================
   VISHAL JADHAV | INTERACTIVE ANIMATION ENGINE
   Features:
   1. Reverse Scroll Reveal
   2. Mouse Following Spotlight
   3. Interactive 3D Cards
   4. Custom Cursor Follower
   5. Active Navigation Section
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       GLOBAL SETTINGS
    ================================= */

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =================================
       1. REVERSE SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if (reducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        // Play animation when entering viewport
                        entry.target.classList.add("active");

                    } else {

                        // Reverse animation when leaving viewport
                        entry.target.classList.remove("active");

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* =================================
       2. ACTIVE NAVIGATION SECTION
    ================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navItems = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // Stop here on touch devices or reduced-motion settings.
    // Scroll reveal and active navigation still work.

    if (!finePointer || reducedMotion) return;


    /* =================================
       3. MOUSE FOLLOWING SPOTLIGHT
    ================================= */

    let mouseFrame = null;

    document.addEventListener("pointermove", event => {

        if (mouseFrame) return;

        mouseFrame = requestAnimationFrame(() => {

            document.documentElement.style.setProperty(
                "--mouse-x",
                `${event.clientX}px`
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                `${event.clientY}px`
            );

            mouseFrame = null;

        });

    });


    /* =================================
       4. INTERACTIVE 3D CARDS
    ================================= */

    const cards = document.querySelectorAll(".glass-card");

    cards.forEach(card => {

        card.addEventListener("pointermove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((centerY - y) / centerY) * 5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
            `;

        });

        card.addEventListener("pointerleave", () => {

            card.style.transform = "";

        });

    });


    /* =================================
       5. CUSTOM CURSOR FOLLOWER
    ================================= */

    const cursor = document.createElement("div");

    cursor.className = "cursor-glow";

    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("pointermove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.classList.add("visible");

    });

    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    // Cursor interaction with clickable elements

    document.querySelectorAll("a, button").forEach(element => {

        element.addEventListener("pointerenter", () => {
            cursor.classList.add("hovering");
        });

        element.addEventListener("pointerleave", () => {
            cursor.classList.remove("hovering");
        });

    });


    document.addEventListener("pointerleave", () => {
        cursor.classList.remove("visible");
    });

});
