document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const activeClasses = [
        "text-blue-700",
        "dark:text-blue-500",
        "md:text-blue-700",
    ];
    const inactiveClasses = ["text-gray-900", "dark:text-white"];

    // Create a Map for O(1) lookup of nav links by section ID
    const navLinkMap = new Map();
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
            navLinkMap.set(href, link);
        }
    });

    let currentActiveLink = null;

    const updateActiveLink = (targetLink) => {
        if (!targetLink || targetLink === currentActiveLink) return;

        if (currentActiveLink) {
            currentActiveLink.classList.remove(...activeClasses);
            currentActiveLink.classList.add(...inactiveClasses);
        }

        targetLink.classList.add(...activeClasses);
        targetLink.classList.remove(...inactiveClasses);
        currentActiveLink = targetLink;
    };

    const observerOptions = {
        root: null,
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                const targetLink = navLinkMap.get(`#${id}`);
                if (targetLink) {
                    updateActiveLink(targetLink);
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Handle initial state if there's a hash
    window.addEventListener("load", () => {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = navLinkMap.get(hash);
            if (targetLink) {
                updateActiveLink(targetLink);
            }
        }
    });
});
