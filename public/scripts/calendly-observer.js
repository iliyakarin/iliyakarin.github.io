document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const script = document.createElement("script");
                script.src =
                    "https://assets.calendly.com/assets/external/widget.js";
                script.async = true;
                document.body.appendChild(script);
                observer.disconnect();
            }
        });
    });

    const widget = document.querySelector(".calendly-inline-widget");
    if (widget) {
        observer.observe(widget);
    }
});
