export const cityChange = (catalogState, applyFilters) => {
  const locationBtn = document.querySelector(".location__city");
  const locationCityName = document.querySelector(".location__city-name");

  if (!locationBtn) {
    return;
  }

  locationBtn.addEventListener("click", () => {
    locationBtn.classList.toggle("location__city--active");
  });

  document
    .querySelector(".location__sublist")
    ?.addEventListener("click", (e) => {
      try {
        const cityLink = e.target.closest(".location__sublink");
        if (!cityLink) {
          return;
        }

        locationCityName.textContent = cityLink.textContent;
        catalogState.filterProduct.currentCity = cityLink.textContent;
        locationBtn.classList.remove("location__city--active");
        applyFilters?.();
      } catch (error) {
        console.error(`Ошибка нажатия ${error}`);
      }
    });
};
