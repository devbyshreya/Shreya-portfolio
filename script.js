
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // 1. Smooth Navigation
    // ========================================

    const sectionLinks = document.querySelectorAll('a[href^="#"]');

    sectionLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });


    // ========================================
    // 2. Contact Form Validation
    // ========================================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent =
                        "Please fill in all the fields.";
                }
                return;
            }

            const recipient = "shreyaaa.1626@gmail.com";

            const subject = encodeURIComponent(
                `Portfolio Inquiry from ${name}`
            );

            const body = encodeURIComponent(
                `Hello Shreya,\n\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}\n`
            );

            const mailtoLink =
                `mailto:${recipient}?subject=${subject}&body=${body}`;

            if (formStatus) {
                formStatus.textContent =
                    "Your email application will open. Review and send the email to complete delivery.";
            }

            window.location.href = mailtoLink;
        });
    }


    // ========================================
    // 3. Scroll Reveal Animations
    // ========================================

    const revealElements = document.querySelectorAll(
        ".education-card, " +
        ".project-card, " +
        ".contact-info, " +
        ".contact-form-container, " +
        ".skills-section .cell"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("show");
        });
    }


    // ========================================
    // 4. Highlight Active Navigation Section
    // ========================================

    const sections = document.querySelectorAll(
        "#skills, #education, #projects, #contact"
    );

    const navigationLinks = document.querySelectorAll(
        '.hero-section .links a[href^="#"], nav a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;

                        navigationLinks.forEach((link) => {
                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {
                                link.classList.add("active");
                            } else {
                                link.classList.remove("active");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    // ========================================
    // 5. Dynamic Copyright Year
    // ========================================

    const copyrightYear = document.getElementById("copyright-year");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // 6. Dark Mode Toggle
    // ========================================

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");

    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);

        if (themeIcon) {
            themeIcon.className = isDark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );
        }
    }

    // Load the saved theme safely
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch (error) {
        console.warn("Theme preference could not be loaded.");
    }

    applyTheme(savedTheme === "dark");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark =
                !document.body.classList.contains("dark-mode");

            applyTheme(isDark);

            try {
                localStorage.setItem(
                    "portfolio-theme",
                    isDark ? "dark" : "light"
                );
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }
        });
    }


    // ========================================
    // 7. Console Message
    // ========================================

    console.log(
        `Shreya Singh's Portfolio | ${new Date().getFullYear()}`
    );

});
