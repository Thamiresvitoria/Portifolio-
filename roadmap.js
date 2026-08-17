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
        alunoNome: "DACYRRÔSE MELO",
        alunoTexto: "Destaca-se pelo comprometimento, organização e dedicação durante as atividades desenvolvidas. Demonstra facilidade no uso de ferramentas tecnológicas e boa capacidade de adaptação aos diferentes recursos apresentados, contribuindo de forma ativa para o desenvolvimento das atividades e para a colaboração com os demais colegas.",
        alunoFoto: "../Assets/Fotos_aluno_130/dacyrrose_melo.jpg"
    },
    uc2: {
        titulo: "Desenvolver Sistemas de Informação",
        status: "concluido",
        statusTexto: "CONCLUÍDO",
        descricao: "Texto descritivo da UC2 aqui.",
        icone: "fa-globe",
        alunoNome: "MESSIAS KAYNÃ",
        alunoTexto: "Destaca-se pela dedicação, colaboração e disposição em ajudar os colegas durante as atividades desenvolvidas. Está sempre disposto a compartilhar conhecimentos, tirar dúvidas e apoiar os demais membros da turma, contribuindo para um ambiente mais colaborativo e produtivo. Demonstra também comprometimento e facilidade para trabalhar em equipe.",
        alunoFoto: "../Assets/Fotos_aluno_130/messiaskayna.jpeg.jpeg"
    },
    uc3: {
        titulo: "Elaborar projetos de aplicações para web",
        status: "concluido",
        statusTexto: "CONCLUÍDO",
        descricao: "Nesta etapa, aprofundamos o planejamento e a estruturação de projetos web, com foco em soluções criativas, funcionais e centradas no usuário.",
        icone: "fa-pen-nib",
        alunoNome: "EVELLYN GOMES",
        alunoTexto: "Destaca-se pelo comprometimento, criatividade e excelente desempenho nas atividades desenvolvidas. Demonstra ótima liderança, boa comunicação interpessoal e está sempre disposta a apoiar os demais membros da equipe ao longo das aulas, contribuindo para um ambiente colaborativo e produtivo.",
        alunoFoto: "../Assets/Fotos_aluno_130/evellyn_gomes.jpeg"
    },
    uc4: {
        titulo: "Desenvolver aplicações para websites",
        status: "desenvolvimento",
        statusTexto: "EM DESENVOLVIMENTO",
        descricao: "Texto descritivo da UC4 aqui.",
        icone: "fa-shield-halved",
        alunoNome: "A DEFINIR",
        alunoTexto: "EM BREVE",
        alunoFoto: "../Assets/logo_navbar.svg"
    },
    uc5: {
        titulo: "Codificar Front-End de aplicações web",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC5 aqui.",
        icone: "fa-vector-square",
        alunoNome: "A DEFINIR",
        alunoTexto: "EM BREVE",
        alunoFoto: "../Assets/logo_navbar.svg"
    },
    uc6: {
        titulo: "Publicar aplicações web",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC6 aqui.",
        icone: "fa-code",
        alunoNome: "A DEFINIR",
        alunoTexto: "EM BREVE",
        alunoFoto: "../Assets/logo_navbar.svg"
    },
    uc7: {
        titulo: "Projeto Integrador - Desenvolvedor Front-end",
        status: "fazer",
        statusTexto: "A FAZER",
        descricao: "Texto descritivo da UC7 aqui.",
        icone: "fa-globe",
        alunoNome: "A DEFINIR",
        alunoTexto: "EM BREVE",
        alunoFoto: "../Assets/logo_navbar.svg"
    }
};

document.addEventListener("DOMContentLoaded", () => {
 
    const steps = document.querySelectorAll(".step");
    const detailsCard = document.querySelector(".details-card");
 
    const setaEsquerda = document.querySelector(".arrow.left");
    const setaDireita = document.querySelector(".arrow.right");
 
    // Elementos que serão atualizados dinamicamente
    const detailsIcon = document.querySelector(".details-icon i");
    const ucNumero = document.querySelector(".uc-number");
    const ucTitulo = document.querySelector(".details-text h2");
    const ucStatus = document.querySelector(".details-text .status");
    const ucDescricao = document.querySelector(".details-text p");
 
    const alunoFoto = document.querySelector(".student-photo img");
    const alunoNome = document.querySelector(".student-info h3");
    const alunoTexto = document.querySelector(".student-info p");
 
    // Lista de IDs na ordem em que aparecem (uc1, uc2, uc3...)
    const ordemUC = Array.from(steps).map((step) =>
        step.querySelector("strong").textContent.trim().toLowerCase()
    );
 
    // Índice da UC atualmente exibida (-1 = nenhuma selecionada ainda)
    let indiceAtual = -1;
 
    // Esconde o card de detalhes até a primeira seleção
    detailsCard.style.display = "none";
 
    // Função central: recebe o índice dentro de ordemUC e atualiza tudo
    function mostrarUC(indice) {
 
        // Trava o índice dentro dos limites válidos (não deixa passar do início/fim)
        if (indice < 0) indice = 0;
        if (indice > ordemUC.length - 1) indice = ordemUC.length - 1;
 
        indiceAtual = indice;
        const ucId = ordemUC[indice];
        const dados = dadosUC[ucId];
        if (!dados) return;
 
        // Marca o step correspondente como ativo
        steps.forEach((s) => s.classList.remove("active"));
        steps[indice].classList.add("active");
 
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
    }
 
    // Clique em qualquer step chama mostrarUC com o índice dele
    steps.forEach((step, indice) => {
        step.addEventListener("click", () => mostrarUC(indice));
    });
 
    // Setas navegam para a UC anterior/próxima a partir da atual
    setaEsquerda.addEventListener("click", () => {
        // Se nada foi selecionado ainda, a seta esquerda começa do início
        const proximo = indiceAtual === -1 ? 0 : indiceAtual - 1;
        mostrarUC(proximo);
    });
 
    setaDireita.addEventListener("click", () => {
        // Se nada foi selecionado ainda, a seta direita começa do início
        const proximo = indiceAtual === -1 ? 0 : indiceAtual + 1;
        mostrarUC(proximo);
    });
 
});