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