// =================================================
// DADOS DE CADA UC (placeholder — preencha depois)
// =================================================
const dadosUC = {
    uc1: {
        titulo: "Sistemas operacionais e aplicativos de escritório",
        status: "concluido",
        statusTexto: "CONCLUÍDO",
        descricao: "Texto descritivo da UC1 aqui.",
        icone: "fa-laptop",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC1.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    },
    uc2: {
        titulo: "Desenvolver Sistemas de Informação",
        status: "concluido",
        statusTexto: "CONCLUÍDO",
        descricao: "Texto descritivo da UC2 aqui.",
        icone: "fa-globe",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC2.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    },
    uc3: {
        titulo: "Elaborar projetos de aplicações para web",
        status: "concluido",
        statusTexto: "CONCLUÍDO",
        descricao: "Nesta etapa, aprofundamos o planejamento e a estruturação de projetos web, com foco em soluções criativas, funcionais e centradas no usuário.",
        icone: "fa-pen-nib",
        alunoNome: "EVELYN GOMES",
        alunoTexto: "Destaca-se pelo comprometimento, criatividade e excelente desempenho nas atividades desenvolvidas. Demonstra ótima liderança, boa comunicação interpessoal e está sempre disposta a apoiar os demais membros da equipe ao longo das aulas, contribuindo para um ambiente colaborativo e produtivo.",
        alunoFoto: "../Assets/Fotos_aluno_130/evellyn_gomes.jpeg"
    },
    uc4: {
        titulo: "Desenvolver aplicações para websites",
        status: "desenvolvimento",
        statusTexto: "EM DESENVOLVIMENTO",
        descricao: "Texto descritivo da UC4 aqui.",
        icone: "fa-shield-halved",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC4.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    },
    uc5: {
        titulo: "Codificar Front-End de aplicações web",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC5 aqui.",
        icone: "fa-vector-square",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC5.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    },
    uc6: {
        titulo: "Publicar aplicações web",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC6 aqui.",
        icone: "fa-code",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC6.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    },
    uc7: {
        titulo: "Projeto Integrador - Desenvolvedor Front-end",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC7 aqui.",
        icone: "fa-globe",
        alunoNome: "NOME DO ALUNO",
        alunoTexto: "Texto sobre o destaque do aluno na UC7.",
        alunoFoto: "../Assets/Fotos_aluno_130/PLACEHOLDER.jpg"
    }
};

// =================================================
// LÓGICA DE CLIQUE
// =================================================
document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".step");
    const detailsCard = document.querySelector(".details-card");

    // Elementos que serão atualizados dinamicamente
    const detailsIcon = document.querySelector(".details-icon i");
    const ucNumero = document.querySelector(".uc-number");
    const ucTitulo = document.querySelector(".details-text h2");
    const ucStatus = document.querySelector(".details-text .status");
    const ucDescricao = document.querySelector(".details-text p");

    const alunoFoto = document.querySelector(".student-photo img");
    const alunoNome = document.querySelector(".student-info h3");
    const alunoTexto = document.querySelector(".student-info p");

    // Esconde o card de detalhes até o primeiro clique
    detailsCard.style.display = "none";

    steps.forEach((step) => {
        step.addEventListener("click", () => {

            // Remove "active" de todas as etapas e adiciona só na clicada
            steps.forEach((s) => s.classList.remove("active"));
            step.classList.add("active");

            // Descobre qual UC foi clicada pela tag <strong> dentro do step
            const ucId = step.querySelector("strong").textContent.trim().toLowerCase();
            const dados = dadosUC[ucId];

            if (!dados) return;

            // Atualiza o card de detalhes da UC
            detailsIcon.className = `fa-solid ${dados.icone}`;
            ucNumero.textContent = ucId.toUpperCase();
            ucTitulo.textContent = dados.titulo;
            ucStatus.textContent = dados.statusTexto;
            ucStatus.className = `status ${dados.status}`;
            ucDescricao.textContent = dados.descricao;

            // Atualiza o aluno destaque
            alunoFoto.src = dados.alunoFoto;
            alunoFoto.alt = `Aluno destaque - ${dados.alunoNome}`;
            alunoNome.textContent = dados.alunoNome;
            alunoTexto.textContent = dados.alunoTexto;

            // Mostra o card (caso ainda esteja escondido)
            detailsCard.style.display = "flex";
        });
    });

});