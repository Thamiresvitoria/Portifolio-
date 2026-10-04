(() => {
  "use strict";

  const menuToggle = document.querySelector("#menuToggle");
  const menuList = document.querySelector("#menuList");

  const closeMenu = () => {
    if (!menuToggle || !menuList) return;
    menuList.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && menuList) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuList.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu",
      );
      document.body.classList.toggle("menu-open", isOpen);
    });
    menuList
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener(
      "keydown",
      (event) => event.key === "Escape" && closeMenu(),
    );
    window.addEventListener(
      "resize",
      () => window.innerWidth > 820 && closeMenu(),
    );
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav .menu a").forEach((link) => {
    const linkPage =
      new URL(link.href, location.href).pathname.split("/").pop() ||
      "index.html";
    const active = linkPage === currentPage;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const gallery = document.querySelector(".galeria-grid");
  if (gallery) {
    const items = [...gallery.querySelectorAll("button[data-gallery-item]")];
    const prev = document.querySelector(".seta-esquerda");
    const next = document.querySelector(".seta-direita");
    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = lightbox?.querySelector(".lightbox-image");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const galleryTotal = document.querySelector("#galeriaTotal");
    const galleryStatus = document.querySelector("#galeriaStatus");
    let activeIndex = 0;

    const galleryStep = () => {
      const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0;
      return (
        (items[0]?.getBoundingClientRect().width || gallery.clientWidth) + gap
      );
    };

    const updateGalleryNavigation = () => {
      if (!items.length) return;
      const step = galleryStep();
      const start = Math.min(
        items.length - 1,
        Math.max(0, Math.round(gallery.scrollLeft / step)),
      );
      const visible = Math.max(1, Math.floor((gallery.clientWidth + 1) / step));
      const end = Math.min(items.length, start + visible);
      if (galleryTotal)
        galleryTotal.textContent = `${items.length} foto${items.length === 1 ? "" : "s"}`;
      if (galleryStatus)
        galleryStatus.textContent = `${start + 1}–${end} de ${items.length}`;
      if (prev) prev.disabled = gallery.scrollLeft <= 3;
      if (next)
        next.disabled =
          gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 3;
    };

    prev?.addEventListener("click", () =>
      gallery.scrollBy({ left: -galleryStep(), behavior: "smooth" }),
    );
    next?.addEventListener("click", () =>
      gallery.scrollBy({ left: galleryStep(), behavior: "smooth" }),
    );
    gallery.addEventListener(
      "scroll",
      () => requestAnimationFrame(updateGalleryNavigation),
      { passive: true },
    );
    new ResizeObserver(updateGalleryNavigation).observe(gallery);

    const showImage = (index) => {
      if (!lightbox || !lightboxImage || !items.length) return;
      activeIndex = (index + items.length) % items.length;
      const image = items[activeIndex].querySelector("img");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      if (lightboxCaption)
        lightboxCaption.textContent =
          items[activeIndex].querySelector(".foto-legenda")?.textContent ||
          image.alt;
    };

    const openLightbox = (index) => {
      if (!lightbox) return;
      showImage(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close")?.focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.style.overflow = "";
      items[activeIndex]?.focus();
    };

    items.forEach((item, index) =>
      item.addEventListener("click", () => openLightbox(index)),
    );
    lightbox
      ?.querySelector(".lightbox-close")
      ?.addEventListener("click", closeLightbox);
    lightbox
      ?.querySelector(".lightbox-prev")
      ?.addEventListener("click", () => showImage(activeIndex - 1));
    lightbox
      ?.querySelector(".lightbox-next")
      ?.addEventListener("click", () => showImage(activeIndex + 1));
    lightbox?.addEventListener(
      "click",
      (event) => event.target === lightbox && closeLightbox(),
    );
    document.addEventListener("keydown", (event) => {
      if (!lightbox || lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(activeIndex - 1);
      if (event.key === "ArrowRight") showImage(activeIndex + 1);
    });
    updateGalleryNavigation();
  }

  const projectList = document.querySelector("#projetosLista");
  if (!projectList) return;

  const projects = [
    {
      title: "Bingo em JavaScript",
      uc: "UC2",
      team: "Equipe de 5 estudantes",
      technologies: ["JavaScript", "Lógica", "Git"],
      description:
        "Jogo de bingo criado para praticar variáveis, arrays, laços e condições.",
      icon: "pessoa_codigo.svg",
      link: "https://github.com/Thamiresvitoria/Bingo",
    },
    {
      title: "Portfólio da Turma",
      uc: "UC4",
      team: "Squad da Turma 130",
      technologies: ["HTML", "CSS", "JavaScript"],
      description:
        "Site colaborativo com a trajetória, os projetos e os perfis da Turma 130.",
      icon: "computer.svg",
      link: "https://github.com/Thamiresvitoria/Portifolio-",
    },
    {
      title: "Apresentação de Lógica",
      uc: "UC2",
      team: "Equipe de 7 estudantes",
      technologies: ["Apresentação", "Lógica", "Equipe"],
      description:
        "Apresentação prática sobre estruturas condicionais e laços de repetição.",
      icon: "pessoas_junto.svg",
    },
    {
      title: "Portfólios Pessoais",
      uc: "UC5",
      team: "Projeto individual",
      technologies: ["HTML", "CSS", "JavaScript"],
      description:
        "Portfólios individuais para apresentar habilidades, experiências e projetos.",
      icon: "pessoa_pensante.svg",
    },
    {
      title: "Publicação Web",
      uc: "UC6",
      team: "Turma 130",
      technologies: ["Deploy", "GitHub Pages", "SEO"],
      description:
        "Publicação e melhoria das aplicações web desenvolvidas durante o curso.",
      icon: "planeta.svg",
    },
    {
      title: "Projeto Integrador",
      uc: "UC7",
      team: "Turma 130",
      technologies: ["Front-End", "UX", "Colaboração"],
      description:
        "Entrega final que reúne planejamento, interface, desenvolvimento e publicação.",
      icon: "grade.svg",
    },
  ];

  const filters = [...document.querySelectorAll(".filtro-projeto")];
  const previousButton = document.querySelector(".projeto-anterior");
  const nextButton = document.querySelector(".projeto-proximo");
  const pagination = document.querySelector("#projetoPaginacao");
  let currentFilter = "todos";
  let currentProjectPage = 0;

  const projectsPerPage = () => (window.innerWidth <= 820 ? 1 : 2);
  const filteredProjects = () =>
    currentFilter === "todos"
      ? projects
      : projects.filter(
          (project) => project.uc.toLowerCase() === currentFilter,
        );

  const createProjectCard = (project) => {
    const article = document.createElement("article");
    article.className = "projeto-card";
    const link = project.link
      ? `<a class="projeto-botao" href="${project.link}" target="_blank" rel="noopener noreferrer"><img src="../Assets/icones/github-svgrepo-com.svg" alt="" aria-hidden="true"> GitHub</a>`
      : `<span class="projeto-equipe">Projeto acadêmico</span>`;
    article.innerHTML = `
      <div class="projeto-card-topo">
        <div class="projeto-icone" aria-hidden="true"><img src="../Assets/icones/${project.icon}" alt=""></div>
        <div><h3>${project.title}</h3><span class="projeto-equipe"><img src="../Assets/icones/pessoas.svg" alt="" aria-hidden="true"> ${project.team}</span></div>
      </div>
      <div class="projeto-tags">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <p class="projeto-descricao">${project.description}</p>
      <div class="projeto-rodape"><span class="projeto-status"><img src="../Assets/icones/estrela.svg" alt="" aria-hidden="true"> Concluído</span>${link}</div>`;
    return article;
  };

  const renderProjects = () => {
    const filtered = filteredProjects();
    const perPage = projectsPerPage();
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    currentProjectPage = Math.min(currentProjectPage, totalPages - 1);
    projectList.replaceChildren(
      ...filtered
        .slice(currentProjectPage * perPage, (currentProjectPage + 1) * perPage)
        .map(createProjectCard),
    );
    if (!filtered.length)
      projectList.innerHTML =
        '<p class="projeto-vazio">Nenhum projeto encontrado neste filtro.</p>';
    if (previousButton) previousButton.disabled = currentProjectPage === 0;
    if (nextButton) nextButton.disabled = currentProjectPage >= totalPages - 1;
    if (pagination)
      pagination.textContent = filtered.length
        ? `Página ${currentProjectPage + 1} de ${totalPages} · ${filtered.length} projeto${filtered.length === 1 ? "" : "s"}`
        : "0 projetos";
  };

  filters.forEach((button) =>
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("ativo"));
      button.classList.add("ativo");
      currentFilter = button.dataset.filter || "todos";
      currentProjectPage = 0;
      renderProjects();
    }),
  );
  previousButton?.addEventListener("click", () => {
    if (currentProjectPage > 0) currentProjectPage--;
    renderProjects();
  });
  nextButton?.addEventListener("click", () => {
    if (
      (currentProjectPage + 1) * projectsPerPage() <
      filteredProjects().length
    )
      currentProjectPage++;
    renderProjects();
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentProjectPage = 0;
      renderProjects();
    }, 150);
  });
  renderProjects();
})();
