// Criar efeito de transição com a barrinha

const barrinhas = document.querySelectorAll("nav a");

barrinhas.forEach(barrinha => {

    barrinha.addEventListener("click", () => {

        barrinhas.forEach(item => {
            item.classList.remove("active");
        });

        barrinha.classList.add("active");
    });

});