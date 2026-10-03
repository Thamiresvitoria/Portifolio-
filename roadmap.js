(() => {
  "use strict";

  const units = {
    uc1: {
      title: "Sistemas operacionais e aplicativos de escritório",
      description:
        "Fundamentos de informática, produtividade e organização com ferramentas digitais.",
      icon: "fa-laptop",
      student: "Dacyrrôse Melo",
      highlight:
        "Comprometimento, organização e colaboração durante as atividades.",
      photo: "../Assets/Fotos_aluno_130/dacyrrose_melo.jpg",
    },
    uc2: {
      title: "Desenvolver sistemas de informação",
      description:
        "Lógica de programação e criação de soluções alinhadas às necessidades dos usuários.",
      icon: "fa-code",
      student: "Messias Kaynã",
      highlight: "Dedicação, colaboração e disposição para apoiar os colegas.",
      photo: "../Assets/Fotos_aluno_130/messiaskayna.jpeg.jpeg",
    },
    uc3: {
      title: "Elaborar projetos de aplicações web",
      description:
        "Planejamento de interfaces e projetos web funcionais, acessíveis e centrados no usuário.",
      icon: "fa-pen-ruler",
      student: "Evellyn Gomes",
      highlight:
        "Criatividade, liderança e excelente participação nas atividades.",
      photo: "../Assets/Fotos_aluno_130/evellyn_gomes.jpeg",
    },
    uc4: {
      title: "Desenvolver aplicações para websites",
      description:
        "Construção do portfólio da turma com Figma, HTML, CSS e JavaScript.",
      icon: "fa-window-maximize",
      student: "Carlos Henrique",
      highlight:
        "Dedicação ao desenvolvimento das interfaces e ótima colaboração com a turma.",
      photo: "../Assets/Fotos_aluno_130/carlos_henrique.jpg",
    },
    uc5: {
      title: "Codificar Front-End de aplicações web",
      description:
        "Criação dos portfólios pessoais e aplicação prática dos conhecimentos de Front-End.",
      icon: "fa-laptop-code",
      student: "Matheus Marques",
      highlight: "Liderança, comunicação e apoio constante às equipes.",
      photo: "../Assets/Fotos_aluno_130/matheus_marques.jpg",
    },
    uc6: {
      title: "Publicar aplicações web",
      description:
        "Publicação, revisão técnica e melhoria da presença das aplicações na web.",
      icon: "fa-cloud-arrow-up",
      student: "Ewerton Henrique",
      highlight:
        "Destaque pelo domínio técnico, iniciativa e apoio aos colegas durante a publicação dos projetos.",
      photo: "../Assets/Fotos_aluno_130/Ewerton Henrique Lima Da Silva.jpg",
    },
  };

  const steps = [...document.querySelectorAll(".step[data-unit]")];
  const card = document.querySelector(".details-card");
  if (!steps.length || !card) return;

  const icon = card.querySelector(".details-icon i");
  const number = card.querySelector(".uc-number");
  const title = card.querySelector(".details-text h2");
  const status = card.querySelector(".details-text .status");
  const description = card.querySelector(".details-text p");
  const photo = card.querySelector(".student-photo img");
  const student = card.querySelector(".student-info h3");
  const highlight = card.querySelector(".student-info p");
  const highlightLabel = card.querySelector(".highlight-title span");
  const previous = card.querySelector(".arrow.left");
  const next = card.querySelector(".arrow.right");
  let currentIndex = -1;

  const showUnit = (index, shouldFocus = false) => {
    currentIndex = Math.max(0, Math.min(index, steps.length - 1));
    const step = steps[currentIndex];
    const id = step.dataset.unit;
    const unit = units[id];
    if (!unit) return;

    card.hidden = false;

    steps.forEach((item, itemIndex) => {
      const active = itemIndex === currentIndex;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    icon.className = `fa-solid ${unit.icon}`;
    number.textContent = id.toUpperCase();
    title.textContent = unit.title;
    status.textContent = "CONCLUÍDO";
    status.className = "status concluido";
    description.textContent = unit.description;
    photo.src = unit.photo;
    photo.alt = `Destaque da ${id.toUpperCase()}: ${unit.student}`;
    student.textContent = unit.student;
    highlight.textContent = unit.highlight;
    highlightLabel.textContent =
      id === "uc3"
        ? "DESTAQUE — VOTO DOS PROFESSORES"
        : "DESTAQUE — VOTO DA TURMA";
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === steps.length - 1;
    if (shouldFocus) card.focus({ preventScroll: true });
  };

  steps.forEach((step, index) =>
    step.addEventListener("click", () => showUnit(index)),
  );
  previous.addEventListener("click", () =>
    showUnit(currentIndex === -1 ? 0 : currentIndex - 1),
  );
  next.addEventListener("click", () =>
    showUnit(currentIndex === -1 ? 0 : currentIndex + 1),
  );
  card.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showUnit(currentIndex - 1);
    if (event.key === "ArrowRight") showUnit(currentIndex + 1);
  });
})();
