
/* =====================================================
   VISHAL JADHAV | WEBSITE INTERACTIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");


    /* =================================
       1. MOBILE MENU TOGGLE
    ================================= */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("show");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        /* =================================
           2. CLOSE MENU AFTER NAVIGATION
        ================================= */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });


        /* =================================
           3. CLOSE MENU WHEN CLICKING OUTSIDE
        ================================= */

        document.addEventListener("click", event => {

            const clickedInside =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {

                navLinks.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            }

        });


        /* =================================
           4. CLOSE MENU WITH ESCAPE KEY
        ================================= */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navLinks.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

                menuToggle.focus();

            }

        });

    }


    /* =================================
       5. SMOOTH ANCHOR NAVIGATION
    ================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

        });

    });

});
