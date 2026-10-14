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

  const galleryCollections = {
    UC1: [
      "20260522_193328.jpg",
      "20260522_202538.jpg",
      "20260522_205731.jpg",
      "20260527_194808.jpg",
      "20260527_210036.jpg",
      "20260605_185149.jpg",
    ],
    UC2: [
      "20260611_162913.jpg",
      "20260611_201232.jpg",
      "20260611_210847.jpg",
      "20260617_211454.jpg",
      "20260618_190901.jpg",
      "20260618_202244.jpg",
      "20260707_192634.jpg",
      "20260707_194010.jpg",
    ],
    UC3: [
      "20260710_211121.jpg",
      "20260714_210054.jpg",
      "20260715_190856.jpg",
      "20260715_194800.jpg",
      "20260715_201411.jpg",
      "20260720_200752.jpg",
      "IMG-20260727-WA0236.jpg",
      "mei.jpg",
    ],
    UC4: [
      "20260728_190935.jpg",
      "20260730_204608.jpg",
      "20260731_204501.jpg",
      "20260810_194538.jpg",
      "20260810_204454.jpg",
      "20260817_203049.jpg",
      "20260819_193003.jpg",
      "20260819_193603.jpg",
    ],
    UC5: [
      "20260825_200040.jpg",
      "20260827_205227.jpg",
      "20260827_210615.jpg",
      "20260910_193306.jpg",
      "20260910_193347.jpg",
      "IMG-20260901-WA0300.jpg",
    ],
    UC6: [
      "20260917_210731.jpg",
      "20260928_191426.jpg",
      "20260929_193433.jpg",
      "20260929_194846.jpg",
      "IMG_8381.jpg",
      "IMG_8382.jpg",
      "IMG-20260918-WA0086.jpg",
      "IMG-20260918-WA0095.jpg",
    ],
    UC7: [
      "confraternizacao-turma-uc7.png",
      "selfie-colegas-uc7.png",
      "dinamica-turma-uc7.png",
      "dinamica-colega-uc7.png",
    ],
  };

  const galleryThemes = {
    UC1: "Integração e fundamentos digitais",
    UC2: "Lógica, desafios e trabalho em equipe",
    UC3: "Planejamento do Projeto Integrador",
    UC4: "Desenvolvimento de aplicações web",
    UC5: "Codificação Front-End",
    UC6: "Publicação e apresentação dos projetos",
    UC7: "Conclusão do Projeto Integrador",
  };

  const gallerySpecialCaptions = {
    "UC1/20260522_193328.jpg": "UC1 · Primeiro encontro da Turma 130 em sala",
    "UC1/20260522_202538.jpg": "UC1 · Apresentação sobre informática básica",
    "UC1/20260522_205731.jpg": "UC1 · Foto coletiva com a docente",
    "UC1/20260527_194808.jpg": "UC1 · Atividade prática individual no computador",
    "UC1/20260527_210036.jpg": "UC1 · Equipe reunida para resolver um desafio",
    "UC1/20260605_185149.jpg": "UC1 · Apresentação de atividade da turma",
    "UC2/20260611_162913.jpg": "UC2 · Apresentação sobre análise de dados",
    "UC2/20260611_201232.jpg": "UC2 · Dinâmica colaborativa de lógica",
    "UC2/20260611_210847.jpg": "UC2 · Equipe apresentando uma solução no quadro",
    "UC2/20260617_211454.jpg": "UC2 · Foto coletiva ao final da atividade",
    "UC2/20260618_190901.jpg": "UC2 · Equipe após apresentação de lógica",
    "UC2/20260618_202244.jpg": "UC2 · Apresentação de solução em equipe",
    "UC2/20260707_192634.jpg": "UC2 · Resolução de desafio em grupo",
    "UC2/20260707_194010.jpg": "UC2 · Apresentação do bingo de programação",
    "UC3/20260710_211121.jpg": "UC3 · Planejamento do projeto em dupla",
    "UC3/20260714_210054.jpg": "UC3 · Brainstorm do Projeto Integrador",
    "UC3/20260715_190856.jpg": "UC3 · Apresentação do problema do projeto",
    "UC3/20260715_194800.jpg": "UC3 · Equipe apresentando o projeto Crescer",
    "UC3/20260715_201411.jpg": "UC3 · Equipe apresentando o projeto Zero ao MEI",
    "UC3/20260720_200752.jpg": "UC3 · Desenvolvimento prático no computador",
    "UC3/IMG-20260727-WA0236.jpg": "UC3 · Foto espontânea da turma após a atividade",
    "UC3/mei.jpg": "UC3 · Apresentação dos projetos no auditório",
    "UC4/20260728_190935.jpg": "UC4 · Apresentação da retrospectiva da turma",
    "UC4/20260730_204608.jpg": "UC4 · Momento espontâneo entre colegas",
    "UC4/20260731_204501.jpg": "UC4 · Desenvolvimento da aplicação no computador",
    "UC4/20260810_194538.jpg": "UC4 · Apresentação técnica da aplicação web",
    "UC4/20260810_204454.jpg": "UC4 · Equipe demonstrando uma aplicação web",
    "UC4/20260817_203049.jpg": "UC4 · Apresentação das etapas do projeto",
    "UC4/20260819_193003.jpg": "UC4 · Equipe após uma atividade prática",
    "UC4/20260819_193603.jpg": "UC4 · Apresentação de encerramento da unidade",
    "UC5/20260825_200040.jpg": "UC5 · Momento espontâneo da equipe",
    "UC5/20260827_205227.jpg": "UC5 · Construção da lógica no quadro",
    "UC5/20260827_210615.jpg": "UC5 · Apresentação de exercício Front-End",
    "UC5/20260910_193306.jpg": "UC5 · Apresentação dos resultados da unidade",
    "UC5/20260910_193347.jpg": "UC5 · Premiação dos vencedores do Kahoot",
    "UC5/IMG-20260901-WA0300.jpg": "UC5 · Turma celebrando as conquistas da formação",
    "UC6/20260917_210731.jpg": "UC6 · Vencedora do desafio em sala",
    "UC6/20260928_191426.jpg": "UC6 · Apresentação da turma no Senac",
    "UC6/20260929_193433.jpg": "UC6 · Premiação dos vencedores do Kahoot",
    "UC6/20260929_194846.jpg": "UC6 · Ewerton, aluno destaque da turma",
    "UC6/IMG_8381.jpg": "UC6 · Turma 130 reunida com a docente",
    "UC6/IMG_8382.jpg": "UC6 · Foto coletiva da Turma 130",
    "UC6/IMG-20260918-WA0086.jpg": "UC6 · Apresentação de projeto no auditório",
    "UC6/IMG-20260918-WA0095.jpg": "UC6 · Encerramento das apresentações da turma",
    "UC7/confraternizacao-turma-uc7.png": "UC7 · Confraternização de encerramento da turma",
    "UC7/selfie-colegas-uc7.png": "UC7 · Registro espontâneo entre colegas",
    "UC7/dinamica-turma-uc7.png": "UC7 · Dinâmica de encerramento com a turma",
    "UC7/dinamica-colega-uc7.png": "UC7 · Momento da dinâmica de encerramento",
  };

  const gallery = document.querySelector(".galeria-grid");
  if (gallery) {
    const photos = Object.entries(galleryCollections)
      .reverse()
      .flatMap(([uc, files]) => files.map((file) => ({ uc, file })));
    const dateOccurrences = new Map();

    photos.forEach(({ uc, file }) => {
      const dateKey = file.match(/(20\d{6})/)?.[1] || "sem-data";
      const key = `${uc}/${dateKey}`;
      dateOccurrences.set(key, (dateOccurrences.get(key) || 0) + 1);
    });

    const datePositions = new Map();
    const galleryFragment = document.createDocumentFragment();

    photos.forEach(({ uc, file }) => {
      const dateValue = file.match(/(20\d{2})(\d{2})(\d{2})/);
      const dateKey = dateValue?.[0] || "sem-data";
      const sessionKey = `${uc}/${dateKey}`;
      const position = (datePositions.get(sessionKey) || 0) + 1;
      datePositions.set(sessionKey, position);

      const formattedDate = dateValue
        ? `${dateValue[3]}/${dateValue[2]}/${dateValue[1]}`
        : "registro complementar";
      const hasMultiplePhotos = (dateOccurrences.get(sessionKey) || 0) > 1;
      const automaticCaption = `${uc} · ${galleryThemes[uc]} — ${formattedDate}${
        hasMultiplePhotos ? ` · registro ${position}` : ""
      }`;
      const caption = gallerySpecialCaptions[`${uc}/${file}`] || automaticCaption;

      const button = document.createElement("button");
      const image = document.createElement("img");
      button.type = "button";
      button.dataset.galleryItem = "";
      button.setAttribute("aria-label", `Ampliar foto: ${caption}`);
      image.src = `../Assets/Fotos 130 das UCs/${uc}/${file}`;
      image.alt = `Turma 130 — ${caption}`;
      image.loading = "lazy";
      image.decoding = "async";
      button.append(image);
      galleryFragment.append(button);
    });

    gallery.replaceChildren(galleryFragment);
    const items = [...gallery.querySelectorAll("button[data-gallery-item]")];
    const prev = document.querySelector(".seta-esquerda");
    const next = document.querySelector(".seta-direita");
    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = lightbox?.querySelector(".lightbox-image");
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
      title: "Vitrine de Ideias",
      uc: "UC1",
      team: "Em grupo",
      technologies: ["Ideação", "Pitch", "Apresentação"],
      description:
        "Criação de startups baseadas em ideias impossíveis, apresentadas em uma vitrine para exercitar criatividade, argumentação e comunicação.",
      icon: "lampada.svg",
    },
    {
      title: "Sistema de Bingo em JavaScript",
      uc: "UC2",
      team: "Em grupo",
      technologies: ["JavaScript", "Lógica", "DOM"],
      description:
        "Sistema interativo de bingo desenvolvido para aplicar variáveis, arrays, funções, estruturas condicionais e manipulação da página.",
      icon: "pessoa_codigo.svg",
    },
    {
      title: "Ideação do Projeto Integrador",
      uc: "UC3",
      team: "Em grupo",
      technologies: ["Pesquisa", "Ideação", "Pré-pitch"],
      description:
        "Definição das propostas do Projeto Integrador por equipes, com pesquisa do problema, organização da solução e entrega de um pré-pitch.",
      icon: "pessoas_junto.svg",
    },
    {
      title: "Portfólio da Turma 130",
      uc: "UC4",
      team: "Em grupo",
      technologies: ["HTML", "CSS", "JavaScript"],
      description:
        "Desenvolvimento colaborativo deste site para reunir a trajetória, os projetos, a grade e os perfis dos estudantes da Turma 130.",
      icon: "computer.svg",
      link: "https://github.com/Thamiresvitoria/Portifolio-",
    },
    {
      title: "Portfólio Pessoal",
      uc: "UC5",
      team: "Projeto individual",
      technologies: ["HTML", "CSS", "JavaScript"],
      description:
        "Criação de um portfólio profissional individual para apresentar formação, habilidades, experiências e projetos de cada estudante.",
      icon: "pessoa_pensante.svg",
    },
    {
      title: "Deploy do Projeto Integrador",
      uc: "UC6",
      team: "Em grupo",
      technologies: ["Deploy", "GitHub Pages", "SEO"],
      description:
        "Publicação do Projeto Integrador na web, com ajustes finais, versionamento, acessibilidade, SEO e preparação para apresentação.",
      icon: "planeta.svg",
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
        <div><h3>${project.title}</h3><span class="projeto-equipe">${project.team}</span></div>
      </div>
      <div class="projeto-tags">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <p class="projeto-descricao">${project.description}</p>`;
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
