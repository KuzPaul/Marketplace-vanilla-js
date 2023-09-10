export const filterCatalog = (catalogState, onUpdate) => {
  const applyFilters = () => {
    onUpdate(catalogState.getDisplayProducts());
  };

  document
    .querySelector(".catalog-form__reset")
    ?.addEventListener("click", () => {
      catalogState.resetFilters();
      onUpdate(catalogState.getDisplayProducts());
    });

  document.querySelectorAll('input[name="status"]').forEach((status) => {
    status.addEventListener("change", (e) => {
      catalogState.filterProduct.availability = e.currentTarget.value;
      applyFilters();
    });
  });

  document.querySelectorAll(".custom-checkbox__label").forEach((item) =>
    item.addEventListener("click", (e) => {
      const fieldId = e.currentTarget.htmlFor;
      if (fieldId === "agree") {
        return;
      }

      const { filterList } = catalogState.filterProduct;

      if (!filterList.includes(fieldId)) {
        filterList.push(fieldId);
      } else {
        filterList.splice(filterList.indexOf(fieldId), 1);
      }

      applyFilters();
    }),
  );

  return applyFilters;
};
