const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", () => {

        links.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });
});

    const menuToggle = document.getElementById('menuToggle');
    const menuList = document.getElementById('menuList');
    if (menuToggle && menuList) {
      menuToggle.addEventListener('click', () => {
        const isOpen = menuList.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menuList.classList.remove('open');
          menuToggle.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* =========================================================
   PROJETOS DA TURMA
========================================================= */


/* ---------------------------------------------------------
   LISTA DE PROJETOS
--------------------------------------------------------- */

const projetos = [

    {
        id: 1,
        titulo: "BINGO",
        uc: "UC2",
        equipe: "Grupo de 5 integrantes",

        tecnologias: [
            "JavaScript",
            "Lógica",
            "Git e Github"
        ],

        descricao:
            "Atividade da UC2, criação de um bingo, usando variáveis, loop de repetições, array e outros conteúdos que foram passados.",

        status: "Concluído",

        icone: "fa-code",

        link: "#"
    },


    {
        id: 2,
        titulo: "PORTFÓLIO DA TURMA",
        uc: "UC3",
        equipe: "Squad Integral ",

        tecnologias: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        descricao:
            "Uma landing page que representa a turma 130, responsivo com informações sobre os integrantes do grupo, projetos e formas de contato.",

        status: "Em andamento",

        icone: "fa-desktop",

        link: "#"
    },


    {
        id: 3,
        titulo: "CATÁLOGO DE FILMES",
        uc: "UC4",
        equipe: "Grupo 3 · 5 integrantes",

        tecnologias: [
            "Java",
            "Spring Boot",
            "MySQL"
        ],

        descricao:
            "Aplicação para cadastro e gerenciamento de filmes, com sistema de usuários e avaliações.",

        status: "Concluído",

        icone: "fa-database",

        link: "#"
    },


    {
        id: 4,
        titulo: "SERVICE DESK",
        uc: "UC4",
        equipe: "Grupo 4 · 6 integrantes",

        tecnologias: [
            "ServiceNow",
            "JavaScript",
            "APIs"
        ],

        descricao:
            "Projeto de help desk com cadastro de chamados, controle de usuários e níveis de acesso.",

        status: "Em andamento",

        icone: "fa-cloud",

        link: "#"
    }

];


/* ---------------------------------------------------------
   CONFIGURAÇÕES
--------------------------------------------------------- */

const projetosPorPagina = 4;

let filtroAtual = "todos";

let paginaAtual = 0;


/* ---------------------------------------------------------
   ELEMENTOS
--------------------------------------------------------- */

const listaProjetos =
    document.getElementById("projetosLista");

const botoesFiltro =
    document.querySelectorAll(".filtro-projeto");

const botaoAnterior =
    document.querySelector(".projeto-anterior");

const botaoProximo =
    document.querySelector(".projeto-proximo");


/* ---------------------------------------------------------
   PEGAR PROJETOS DO FILTRO
--------------------------------------------------------- */

function projetosFiltrados() {

    if (filtroAtual === "todos") {

        return projetos;

    }


    if (filtroAtual === "outros") {

        return projetos.filter(projeto => {

            return ![
                "UC1",
                "UC2",
                "UC3",
                "UC4"
            ].includes(projeto.uc);

        });

    }


    return projetos.filter(projeto => {

        return projeto.uc === filtroAtual;

    });


}


/* ---------------------------------------------------------
   CRIAR CARD
--------------------------------------------------------- */

function criarCardProjeto(projeto) {

    const card = document.createElement("article");

    card.className = "projeto-card";


    /* TECNOLOGIAS */

    const tecnologiasHTML =
        projeto.tecnologias
            .map(tecnologia => {

                return `
                    <span>
                        ${tecnologia}
                    </span>
                `;

            })
            .join("");


    /* STATUS */

    const statusIcone =
        projeto.status.toLowerCase().includes("concluído")
            ? "fa-circle-check"
            : "fa-calendar";


    card.innerHTML = `

        <!-- ÍCONE -->

        <div class="projeto-icone">

            <i class="fa-solid ${projeto.icone}"></i>

        </div>


        <!-- CONTEÚDO -->

        <div class="projeto-conteudo">


            <!-- TÍTULO -->

            <h3>
                ${projeto.titulo}
            </h3>


            <!-- EQUIPE -->

            <div class="projeto-equipe">

                <i class="fa-solid fa-users"></i>

                <span>
                    ${projeto.equipe}
                </span>

            </div>


            <!-- TECNOLOGIAS -->

            <div class="projeto-tags">

                ${tecnologiasHTML}

            </div>


            <!-- DESCRIÇÃO -->

            <p class="projeto-descricao">

                ${projeto.descricao}

            </p>


            <!-- RODAPÉ -->

            <div class="projeto-rodape">

                <span class="projeto-status">

                    <i class="fa-solid ${statusIcone}"></i>

                    ${projeto.status}

                </span>


                <a
                    href="${projeto.link}"
                    class="projeto-botao">

                    <i class="fa-brands fa-github"></i>

                    GitHub

                </a>

            </div>

        </div>

    `;


    return card;

}


/* ---------------------------------------------------------
   MOSTRAR PROJETOS
--------------------------------------------------------- */

function mostrarProjetos() {

    if (!listaProjetos) {
        return;
    }


    const filtrados =
        projetosFiltrados();


    const inicio =
        paginaAtual * projetosPorPagina;


    const fim =
        inicio + projetosPorPagina;


    const projetosPagina =
        filtrados.slice(inicio, fim);


    listaProjetos.innerHTML = "";


    projetosPagina.forEach(projeto => {

        const card =
            criarCardProjeto(projeto);

        listaProjetos.appendChild(card);

    });


    atualizarSetas(filtrados.length);

}


/* ---------------------------------------------------------
   ATUALIZAR SETAS
--------------------------------------------------------- */

function atualizarSetas(totalProjetos) {

    const totalPaginas =
        Math.ceil(
            totalProjetos / projetosPorPagina
        );


    if (botaoAnterior) {

        botaoAnterior.disabled =
            paginaAtual === 0;

    }


    if (botaoProximo) {

        botaoProximo.disabled =
            paginaAtual >= totalPaginas - 1;

    }

}


/* ---------------------------------------------------------
   FILTROS
--------------------------------------------------------- */

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        /* Remove o ativo dos outros */

        botoesFiltro.forEach(item => {

            item.classList.remove("ativo");

        });


        /* Ativa o botão clicado */

        botao.classList.add("ativo");


        /* Pega o filtro */

        filtroAtual =
            botao.dataset.filtro;


        /* Volta para primeira página */

        paginaAtual = 0;


        /* Atualiza os cards */

        mostrarProjetos();

    });

});


/* ---------------------------------------------------------
   SETA ESQUERDA
--------------------------------------------------------- */

if (botaoAnterior) {

    botaoAnterior.addEventListener("click", () => {

        if (paginaAtual > 0) {

            paginaAtual--;

            mostrarProjetos();

        }

    });

}


/* ---------------------------------------------------------
   SETA DIREITA
--------------------------------------------------------- */

if (botaoProximo) {

    botaoProximo.addEventListener("click", () => {

        const totalProjetos =
            projetosFiltrados().length;


        const totalPaginas =
            Math.ceil(
                totalProjetos / projetosPorPagina
            );


        if (paginaAtual < totalPaginas - 1) {

            paginaAtual++;

            mostrarProjetos();

        }

    });

}


/* ---------------------------------------------------------
   INICIAR
--------------------------------------------------------- */

mostrarProjetos();