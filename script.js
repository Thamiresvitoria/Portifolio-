const nav = document.querySelector("nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelectorAll("nav a");

if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(item => {
            item.classList.remove("active");
            item.removeAttribute("aria-current");
        });

        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        if (nav) {
            nav.classList.remove("is-open");
        }

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});