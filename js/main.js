import { initBurgerCatalog } from "./components/UI/initBurgerCatalog.js";
import { cityChange } from "./components/UI/cityChange.js";
import { Catalog } from "./components/catalog/catalogRender.js";
import { accordionUi } from "./components/UI/accordion.js";
import { formSubmit } from "./components/formSubmit/validate.js";
import { RenderCards } from "./components/catalog/RenderCards.js";
import { initBasket, bindBasketHeader } from "./state/basketManager.js";

window.addEventListener("DOMContentLoaded", () => {
  initBasket();
  bindBasketHeader();

  const container = new RenderCards(".catalog__list");
  const containerOfDay = new RenderCards(".day-products__list");
  const catalog = new Catalog(containerOfDay, container);

  catalog.initFetchCatalog().then(() => {
    cityChange(catalog.catalogState, catalog.applyFilters);
  });

  initBurgerCatalog();
  accordionUi();
  formSubmit();
});
