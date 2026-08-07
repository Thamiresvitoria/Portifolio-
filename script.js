// Pegue todas as sections
const sections = document.querySelectorAll("section");

// Pegue todos os links da navbar
const links = document.querySelectorAll("nav a");

// Crie um observador
const observer = new IntersectionObserver((entries) => {

    // Para cada section que o observador detectar
    entries.forEach(entry => {

        // Se a section estiver visível
        if (entry.isIntersecting) {

            // Remova a barrinha de todos os links
            links.forEach(link => {
                link.classList.remove("active");
            });

            // Encontre o link que corresponde à section
            const linkAtivo = document.querySelector(
                `nav a[href="#${entry.target.id}"]`
            );

            // Se encontrou o link
            if (linkAtivo) {

                // Coloque a barrinha nele
                linkAtivo.classList.add("active");
            }
        }
    });

}, {
    // Considere ativo quando 50% estiver visível
    threshold: 0.5
});

// Observe todas as sections
sections.forEach(section => {
    observer.observe(section);
});