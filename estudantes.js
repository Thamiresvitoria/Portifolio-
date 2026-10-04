(() => {
  "use strict";

  const search = document.querySelector("#pesquisa");
  const order = document.querySelector("#ordem");
  const courseFilter = document.querySelector("#filtroCurso");
  const interestFilter = document.querySelector("#filtroInteresse");
  const educationFilter = document.querySelector("#filtroFormacao");
  const container = document.querySelector("#cardsAlunos");
  const previousButton = document.querySelector("#anterior");
  const nextButton = document.querySelector("#proximo");
  const indicators = document.querySelector("#indicadores");

  if (
    ![
      search,
      order,
      courseFilter,
      interestFilter,
      educationFilter,
      container,
      previousButton,
      nextButton,
      indicators,
    ].every(Boolean)
  )
    return;

  document.querySelectorAll("button.redes-sociais-btn").forEach((button) => {
    const link = button.querySelector("a");
    if (link) button.replaceWith(link);
    else button.remove();
  });

  const originalCards = [...container.querySelectorAll(".cards-aluno")];
  const normalize = (value = "") =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  const dataHas = (value, expected) =>
    normalize(value).split(/\s+/).includes(normalize(expected));
  const nameOf = (card) => card.querySelector("h2")?.textContent.trim() || "";

  const socialIcon = (label) => {
    const normalizedLabel = normalize(label);
    if (normalizedLabel.includes("github"))
      return "../Assets/icones/github-svgrepo-com.svg";
    if (normalizedLabel.includes("linkedin"))
      return "../Assets/icones/linkedIn.svg";
    return "../Assets/icones/acessibildade.svg";
  };

  document.querySelectorAll(".redes-sociais a").forEach((link) => {
    const href = link.getAttribute("href")?.trim();
    if (!href) {
      link.remove();
      return;
    }
    link.querySelector("i, .social-icon")?.remove();
    const icon = document.createElement("img");
    icon.className = "social-icon";
    icon.src = socialIcon(link.textContent);
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    link.prepend(icon);
  });

  const studentModal = document.createElement("div");
  studentModal.className = "student-modal";
  studentModal.hidden = true;
  studentModal.setAttribute("role", "dialog");
  studentModal.setAttribute("aria-modal", "true");
  studentModal.setAttribute("aria-labelledby", "student-modal-title");
  studentModal.innerHTML = `
    <div class="student-modal-dialog">
      <button class="student-modal-close" type="button" aria-label="Fechar perfil ampliado">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <div class="student-modal-content"></div>
    </div>`;
  document.body.appendChild(studentModal);

  const modalContent = studentModal.querySelector(".student-modal-content");
  const modalClose = studentModal.querySelector(".student-modal-close");
  let lastFocusedCard = null;

  const closeStudentModal = () => {
    studentModal.hidden = true;
    document.body.classList.remove("student-modal-open");
    lastFocusedCard?.focus();
  };

  const openStudentModal = (card) => {
    const photo = card.querySelector(".aluno-topo img")?.cloneNode(true);
    const title = card.querySelector(".aluno-topo h2")?.cloneNode(true);
    const subtitle = card.querySelector(".aluno-topo span")?.cloneNode(true);
    const information = card.querySelector(".aluno-info")?.cloneNode(true);
    const socials = card.querySelector(".redes-sociais")?.cloneNode(true);
    if (!photo || !title || !information) return;

    title.id = "student-modal-title";
    const profile = document.createElement("article");
    profile.className = "student-modal-profile";

    const hero = document.createElement("div");
    hero.className = "student-modal-hero";
    const identity = document.createElement("div");
    identity.className = "student-modal-identity";
    identity.append(title);
    if (subtitle) identity.append(subtitle);
    hero.append(photo, identity);

    information.classList.add("student-modal-info");
    profile.append(hero, information);
    if (socials?.querySelector("a")) {
      socials.classList.add("student-modal-socials");
      profile.append(socials);
    }

    modalContent.replaceChildren(profile);
    lastFocusedCard = card;
    studentModal.hidden = false;
    document.body.classList.add("student-modal-open");
    modalClose.focus();
  };

  originalCards.forEach((card) => {
    const image = card.querySelector(".aluno-topo img");
    if (image) image.alt = `Foto de ${nameOf(card)}`;
    card.tabIndex = 0;
    card.setAttribute("aria-label", `Abrir perfil completo de ${nameOf(card)}`);
    card.setAttribute("aria-haspopup", "dialog");
    card.addEventListener("click", (event) => {
      if (!event.target.closest("a, button")) openStudentModal(card);
    });
    card.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        event.target === card
      ) {
        event.preventDefault();
        openStudentModal(card);
      }
    });
  });

  modalClose.addEventListener("click", closeStudentModal);
  studentModal.addEventListener("click", (event) => {
    if (event.target === studentModal) closeStudentModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !studentModal.hidden) closeStudentModal();
  });
  let filteredCards = [...originalCards];
  let currentPage = 0;
  let lastPerPage = 4;

  const cardsPerPage = () => {
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 820) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
  };

  const resultBar = document.createElement("div");
  resultBar.className = "resultados-estudante";
  resultBar.setAttribute("aria-live", "polite");
  document.querySelector(".carousel")?.before(resultBar);

  const matchesCourse = (card, selected) => {
    if (selected === "todos") return true;
    const course = normalize(card.dataset.curso);
    if (selected === "front-end" && course === "ads") return true;
    return dataHas(course, selected);
  };

  const renderIndicators = (totalPages) => {
    indicators.replaceChildren();
    const maxVisible =
      window.innerWidth <= 560 ? 5 : window.innerWidth <= 820 ? 7 : totalPages;
    let pageIndexes = Array.from({ length: totalPages }, (_, index) => index);

    if (totalPages > maxVisible) {
      const sideCount = Math.max(1, Math.floor((maxVisible - 3) / 2));
      const nearby = Array.from(
        { length: sideCount * 2 + 1 },
        (_, offset) => currentPage - sideCount + offset,
      );
      pageIndexes = [...new Set([0, ...nearby, totalPages - 1])]
        .filter((index) => index >= 0 && index < totalPages)
        .sort((a, b) => a - b);
    }

    pageIndexes.forEach((index, position) => {
      if (position > 0 && index - pageIndexes[position - 1] > 1) {
        const ellipsis = document.createElement("span");
        ellipsis.className = "indicador-reticencias";
        ellipsis.textContent = "…";
        ellipsis.setAttribute("aria-hidden", "true");
        indicators.appendChild(ellipsis);
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = `indicador${index === currentPage ? " ativo" : ""}`;
      button.setAttribute("aria-label", `Ir para a página ${index + 1}`);
      button.setAttribute(
        "aria-current",
        index === currentPage ? "page" : "false",
      );
      button.addEventListener("click", () => {
        currentPage = index;
        render();
      });
      indicators.appendChild(button);
    });
  };

  const render = () => {
    const perPage = cardsPerPage();
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / perPage));
    currentPage = Math.min(currentPage, totalPages - 1);
    const visibleCards = filteredCards.slice(
      currentPage * perPage,
      (currentPage + 1) * perPage,
    );
    container.dataset.visible = String(visibleCards.length);
    container.replaceChildren(...visibleCards);

    if (!visibleCards.length) {
      const empty = document.createElement("p");
      empty.className = "nenhum-estudante";
      empty.textContent =
        "Nenhum estudante encontrado. Tente limpar ou alterar os filtros.";
      container.appendChild(empty);
    }

    const hasMultiplePages = totalPages > 1 && filteredCards.length > 0;
    previousButton.disabled = !hasMultiplePages || currentPage === 0;
    nextButton.disabled = !hasMultiplePages || currentPage >= totalPages - 1;
    renderIndicators(hasMultiplePages ? totalPages : 0);
    resultBar.innerHTML = `<span><strong>${filteredCards.length}</strong> estudante${filteredCards.length === 1 ? "" : "s"}</span><span>Página ${filteredCards.length ? currentPage + 1 : 0} de ${filteredCards.length ? totalPages : 0}</span>`;
  };

  const filterStudents = () => {
    const term = normalize(search.value);
    filteredCards = originalCards.filter((card) => {
      const searchableText = normalize(card.textContent);
      const interest = interestFilter.value;
      const education = educationFilter.value;
      return (
        searchableText.includes(term) &&
        matchesCourse(card, courseFilter.value) &&
        (interest === "todos" || dataHas(card.dataset.interesse, interest)) &&
        (education === "todos" || dataHas(card.dataset.formacao, education))
      );
    });

    if (order.value === "az" || order.value === "za") {
      const direction = order.value === "az" ? 1 : -1;
      filteredCards.sort(
        (a, b) =>
          direction *
          nameOf(a).localeCompare(nameOf(b), "pt-BR", { sensitivity: "base" }),
      );
    }
    currentPage = 0;
    render();
  };

  previousButton.addEventListener("click", () => {
    if (currentPage > 0) currentPage--;
    render();
  });
  nextButton.addEventListener("click", () => {
    if ((currentPage + 1) * cardsPerPage() < filteredCards.length)
      currentPage++;
    render();
  });
  [search, order, courseFilter, interestFilter, educationFilter].forEach(
    (control) =>
      control.addEventListener(
        control === search ? "input" : "change",
        filterStudents,
      ),
  );

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nextPerPage = cardsPerPage();
      if (nextPerPage !== lastPerPage) {
        lastPerPage = nextPerPage;
        currentPage = 0;
        render();
      }
    }, 150);
  });

  order.value = "az";
  lastPerPage = cardsPerPage();
  filterStudents();
})();
