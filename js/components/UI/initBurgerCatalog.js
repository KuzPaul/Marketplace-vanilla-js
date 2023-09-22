export const initBurgerCatalog = () => {
  const btnCatalog = document.querySelector(".header__catalog-btn");
  const btnCloseCatalog = document.querySelector(".main-menu__close");
  const catalogMenu = document.querySelector(".main-menu");

  if (!btnCatalog) {
    return;
  }
  btnCatalog.addEventListener("click", (e) => {
    catalogMenu.classList.add("main-menu--active");
  });

  if (btnCloseCatalog) {
    btnCloseCatalog.addEventListener("click", () => {
      catalogMenu.classList.remove("main-menu--active");
    });
  }
};
