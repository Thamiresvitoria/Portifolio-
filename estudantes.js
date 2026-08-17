// ========================================
// ELEMENTOS
// ========================================

const pesquisa = document.querySelector("#pesquisa");
const ordem = document.querySelector("#ordem");
const filtroCurso = document.querySelector("#filtroCurso");
const filtroInteresse = document.querySelector("#filtroInteresse");
const filtroFormacao = document.querySelector("#filtroFormacao");

const container = document.querySelector("#cardsAlunos");

const botaoAnterior = document.querySelector("#anterior");
const botaoProximo = document.querySelector("#proximo");

const indicadores = document.querySelector("#indicadores");


// ========================================
// CHECAGEM DE SEGURANÇA
// Se algum elemento não for encontrado, avisa no console
// exatamente qual ID está faltando, em vez de travar silenciosamente.
// ========================================

const elementosNecessarios = {
    "#pesquisa": pesquisa,
    "#ordem": ordem,
    "#filtroCurso": filtroCurso,
    "#filtroInteresse": filtroInteresse,
    "#filtroFormacao": filtroFormacao,
    "#cardsAlunos": container,
    "#anterior": botaoAnterior,
    "#proximo": botaoProximo,
    "#indicadores": indicadores
};

let faltando = false;

for (const [seletor, elemento] of Object.entries(elementosNecessarios)) {
    if (!elemento) {
        console.error(
            `[estudantes.js] Elemento não encontrado no HTML: ${seletor}. ` +
            `Verifique se o id está escrito exatamente assim no estudantes.html.`
        );
        faltando = true;
    }
}

if (faltando) {
    console.error(
        "[estudantes.js] Script interrompido: um ou mais elementos essenciais " +
        "não foram encontrados. A ordenação e os filtros não vão funcionar até isso ser corrigido."
    );
    throw new Error("estudantes.js: elementos essenciais ausentes no HTML.");
}


// ========================================
// CONFIGURAÇÃO
// ========================================

// Quantidade de cards por página, de acordo com o tamanho da tela.
// Isso acompanha os breakpoints do CSS (estudantes.css / estudantes-responsive.css):
// desktop/tablet largo -> 4 (comportamento original, sem alteração)
// tablet (<=1024px)     -> 3 (bate com .cards-alunos { grid-template-columns: repeat(3, 1fr); })
// mobile (<=768px)      -> 2 (bate com .cards-alunos { grid-template-columns: repeat(2, 1fr); })
function getCardsPorPagina() {

    const largura = window.innerWidth;

    if (largura <= 768) {
        return 2;
    }

    if (largura <= 1024) {
        return 3;
    }

    return 4;

}

let CARDS_POR_PAGINA = getCardsPorPagina();

let cardsFiltrados = [];

let paginaAtual = 0;


// Guarda todos os cards originais
const cardsOriginais = [
    ...container.querySelectorAll(".cards-aluno")
];

console.log(`[estudantes.js] ${cardsOriginais.length} cards de alunos encontrados.`);


// ========================================
// FILTRAR ESTUDANTES
// ========================================

function filtrarEstudantes() {

    const texto = pesquisa.value
        .toLowerCase()
        .trim();

    const curso = filtroCurso.value;

    const interesse = filtroInteresse.value;

    const formacao = filtroFormacao.value;


    // Filtra os estudantes
    cardsFiltrados = cardsOriginais.filter(card => {

        const nome = card
            .querySelector("h2")
            .textContent
            .toLowerCase()
            .trim();


        const correspondeNome =
            nome.includes(texto);


        const correspondeCurso =
            curso === "todos" ||
            card.dataset.curso === curso;


        const correspondeInteresse =
            interesse === "todos" ||
            card.dataset.interesse === interesse;


        const correspondeFormacao =
            formacao === "todos" ||
            card.dataset.formacao === formacao;


        return (
            correspondeNome &&
            correspondeCurso &&
            correspondeInteresse &&
            correspondeFormacao
        );

    });


    // ========================================
    // ORDEM ALFABÉTICA (usa o nome já sem espaços nas pontas,
    // já que o textContent do h2 pode vir com quebras de linha do HTML)
    // ========================================

    if (ordem.value === "az") {

        cardsFiltrados.sort((a, b) => {

            const nomeA =
                a.querySelector("h2").textContent.trim();

            const nomeB =
                b.querySelector("h2").textContent.trim();


            return nomeA.localeCompare(
                nomeB,
                "pt-BR",
                {
                    sensitivity: "base"
                }
            );

        });

    }


    // ========================================
    // ORDEM Z → A
    // ========================================

    if (ordem.value === "za") {

        cardsFiltrados.sort((a, b) => {

            const nomeA =
                a.querySelector("h2").textContent.trim();

            const nomeB =
                b.querySelector("h2").textContent.trim();


            return nomeB.localeCompare(
                nomeA,
                "pt-BR",
                {
                    sensitivity: "base"
                }
            );

        });

    }


    // Volta para a primeira página
    paginaAtual = 0;


    atualizarCarrossel();

}


// ========================================
// ATUALIZAR CARROSSEL
// ========================================

function atualizarCarrossel() {

    // Limpa os cards atuais
    container.innerHTML = "";


    // Nenhum estudante encontrado
    if (cardsFiltrados.length === 0) {

        container.innerHTML = `
            <p class="nenhum-estudante">
                Nenhum estudante encontrado.
            </p>
        `;

        botaoAnterior.style.display = "none";

        botaoProximo.style.display = "none";

        indicadores.innerHTML = "";

        return;
    }


    // ========================================
    // CALCULAR PÁGINAS
    // ========================================

    const totalPaginas = Math.ceil(
        cardsFiltrados.length / CARDS_POR_PAGINA
    );


    // ========================================
    // PEGAR OS CARDS DA PÁGINA
    // ========================================

    const inicio =
        paginaAtual * CARDS_POR_PAGINA;


    const fim =
        inicio + CARDS_POR_PAGINA;


    const cardsDaPagina =
        cardsFiltrados.slice(inicio, fim);


    // ========================================
    // ADICIONAR OS CARDS
    // ========================================

    cardsDaPagina.forEach(card => {

        container.appendChild(card);

    });


    // ========================================
    // BOTÕES
    // ========================================

    if (totalPaginas > 1) {

        botaoAnterior.style.display = "flex";

        botaoProximo.style.display = "flex";

    } else {

        botaoAnterior.style.display = "none";

        botaoProximo.style.display = "none";

    }


    // ========================================
    // INDICADORES
    // ========================================

    criarIndicadores(totalPaginas);


    // Pequena animação
    container.classList.remove("carrossel-animando");


    setTimeout(() => {

        container.classList.add("carrossel-animando");

    }, 10);

}


// ========================================
// PRÓXIMA PÁGINA
// ========================================

function proximaPagina() {

    const totalPaginas = Math.ceil(
        cardsFiltrados.length / CARDS_POR_PAGINA
    );


    if (paginaAtual < totalPaginas - 1) {

        paginaAtual++;

    } else {

        paginaAtual = 0;

    }


    atualizarCarrossel();

}


// ========================================
// PÁGINA ANTERIOR
// ========================================

function paginaAnterior() {

    const totalPaginas = Math.ceil(
        cardsFiltrados.length / CARDS_POR_PAGINA
    );


    if (paginaAtual > 0) {

        paginaAtual--;

    } else {

        paginaAtual = totalPaginas - 1;

    }


    atualizarCarrossel();

}


// ========================================
// INDICADORES
// ========================================

function criarIndicadores(totalPaginas) {

    indicadores.innerHTML = "";


    for (
        let i = 0;
        i < totalPaginas;
        i++
    ) {

        const indicador =
            document.createElement("button");


        indicador.classList.add("indicador");


        indicador.setAttribute(
            "aria-label",
            `Ir para página ${i + 1}`
        );


        if (i === paginaAtual) {

            indicador.classList.add("ativo");

        }


        indicador.addEventListener(
            "click",
            () => {

                paginaAtual = i;

                atualizarCarrossel();

            }
        );


        indicadores.appendChild(indicador);

    }

}


// ========================================
// EVENTOS DO CARROSSEL
// ========================================

botaoProximo.addEventListener(
    "click",
    proximaPagina
);


botaoAnterior.addEventListener(
    "click",
    paginaAnterior
);


// ========================================
// EVENTOS DOS FILTROS
// ========================================

pesquisa.addEventListener(
    "input",
    filtrarEstudantes
);


ordem.addEventListener(
    "change",
    filtrarEstudantes
);


filtroCurso.addEventListener(
    "change",
    filtrarEstudantes
);


filtroInteresse.addEventListener(
    "change",
    filtrarEstudantes
);


filtroFormacao.addEventListener(
    "change",
    filtrarEstudantes
);


// ========================================
// RESPONSIVO: recalcula cards por página ao redimensionar
// Só atualiza o carrossel se o número de cards por página
// realmente mudou (evita re-renderizar em todo pequeno resize,
// ex: abrir/fechar teclado no celular).
// ========================================

let resizeTimeout;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {

        const novoValor = getCardsPorPagina();

        if (novoValor !== CARDS_POR_PAGINA) {

            CARDS_POR_PAGINA = novoValor;

            paginaAtual = 0;

            atualizarCarrossel();

        }

    }, 200);

});


// ========================================
// INICIAR - Ordenação alfabética por padrão
// ========================================

ordem.value = "az";
filtrarEstudantes();

console.log("[estudantes.js] Inicializado com sucesso, ordem A→Z aplicada.");