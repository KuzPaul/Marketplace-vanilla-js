export const sortCatalog = (catalogState, onUpdate) => {
  const sortSelect = document.querySelector(".catalog__sort-select");
  if (!sortSelect) {
    return;
  }

  catalogState.setSortValue(sortSelect.value);

  sortSelect.addEventListener("change", (e) => {
    catalogState.setSortValue(e.currentTarget.value);
    onUpdate(catalogState.getDisplayProducts());
  });
};
