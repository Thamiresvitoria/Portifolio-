(() => {
  "use strict";

  const units = {
    uc1: {
      title: "Sistemas operacionais e aplicativos de escritório",
      description:
        "Fundamentos de informática, produtividade e organização com ferramentas digitais.",
      icon: "../Assets/icones/PC.svg",
      student: "Dacyrrôse Melo",
      highlight:
        "Comprometimento, organização e colaboração durante as atividades.",
      photo: "../Assets/Fotos 130 das UCs/UC1/20260605_185149.jpg",
    },
    uc2: {
      title: "Desenvolver sistemas de informação",
      description:
        "Lógica de programação e criação de soluções alinhadas às necessidades dos usuários.",
      icon: "../Assets/icones/pessoa_codigo.svg",
      student: "Messias Kaynã",
      highlight: "Dedicação, colaboração e disposição para apoiar os colegas.",
      photo: "../Assets/Fotos 130 das UCs/UC2/20260707_200948.jpg",
    },
    uc3: {
      title: "Elaborar projetos de aplicações web",
      description:
        "Planejamento de interfaces e projetos web funcionais, acessíveis e centrados no usuário.",
      icon: "../Assets/icones/pincel.svg",
      student: "Evellyn Gomes",
      highlight:
        "Criatividade, liderança e excelente participação nas atividades.",
      photo: "../Assets/Fotos 130 das UCs/UC3/20260728_190940.jpg",
    },
    uc4: {
      title: "Desenvolver aplicações para websites",
      description:
        "Construção do portfólio da turma com Figma, HTML, CSS e JavaScript.",
      icon: "../Assets/icones/pagina_vazia.svg",
      student: "Carlos Henrique",
      highlight:
        "Dedicação ao desenvolvimento das interfaces e ótima colaboração com a turma.",
      photo: "../Assets/Fotos 130 das UCs/UC4/20260819_193603.jpg",
    },
    uc5: {
      title: "Codificar Front-End de aplicações web",
      description:
        "Criação dos portfólios pessoais e aplicação prática dos conhecimentos de Front-End.",
      icon: "../Assets/icones/computer.svg",
      student: "Matheus Marques",
      highlight: "Liderança, comunicação e apoio constante às equipes.",
      photo: "../Assets/Fotos 130 das UCs/UC5/20260910_193306.jpg",
    },
    uc6: {
      title: "Publicar aplicações web",
      description:
        "Publicação, revisão técnica e melhoria da presença das aplicações na web.",
      icon: "../Assets/icones/planeta.svg",
      student: "Ewerton Henrique",
      highlight:
        "Destaque pelo domínio técnico, iniciativa e apoio aos colegas durante a publicação dos projetos.",
      photo: "../Assets/Fotos 130 das UCs/UC6/20260929_194846.jpg",
    },
    uc7: {
      title: "Projeto Integrador — Desenvolvedor Front-End",
      description:
        "Conclusão e apresentação do Projeto Integrador, reunindo planejamento, desenvolvimento e publicação da solução web.",
      icon: "../Assets/icones/grade.svg",
      student: "Caio Cesar Costa",
      highlight:
        "Escolhido pelos colegas como destaque da turma pelo comprometimento e pela colaboração durante o Projeto Integrador.",
      photo: "../Assets/Fotos 130 das UCs/UC7/caio-cesar-destaque-uc7.png",
    },
  };

  const steps = [...document.querySelectorAll(".step[data-unit]")];
  const card = document.querySelector(".details-card");
  if (!steps.length || !card) return;

  const icon = card.querySelector(".details-icon img");
  const number = card.querySelector(".uc-number");
  const title = card.querySelector(".details-text h2");
  const status = card.querySelector(".details-text .status");
  const description = card.querySelector(".details-text p");
  const photoButton = card.querySelector(".student-photo");
  const photo = card.querySelector(".student-photo img");
  const student = card.querySelector(".student-info h3");
  const highlight = card.querySelector(".student-info p");
  const highlightLabel = card.querySelector(".highlight-title span");
  const previous = card.querySelector(".arrow.left");
  const next = card.querySelector(".arrow.right");
  const photoModal = document.querySelector("#roadmapPhotoModal");
  const fullPhoto = photoModal?.querySelector(".roadmap-photo-full");
  const photoCaption = photoModal?.querySelector("figcaption");
  const photoClose = photoModal?.querySelector(".roadmap-photo-close");
  let currentIndex = -1;

  const closePhoto = () => {
    if (!photoModal || photoModal.hidden) return;
    photoModal.hidden = true;
    document.body.classList.remove("roadmap-photo-open");
    photoButton?.focus();
  };

  const openPhoto = () => {
    if (!photoModal || !fullPhoto || !photoCaption || !photo.src) return;
    fullPhoto.src = photo.currentSrc || photo.src;
    fullPhoto.alt = photo.alt;
    photoCaption.textContent = student.textContent;
    photoModal.hidden = false;
    document.body.classList.add("roadmap-photo-open");
    photoClose?.focus();
  };

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
    icon.src = unit.icon;
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
  photoButton?.addEventListener("click", openPhoto);
  photoClose?.addEventListener("click", closePhoto);
  photoModal?.addEventListener("click", (event) => {
    if (event.target === photoModal) closePhoto();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePhoto();
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showUnit(currentIndex - 1);
    if (event.key === "ArrowRight") showUnit(currentIndex + 1);
  });
})();
