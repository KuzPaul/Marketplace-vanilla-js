import { ProductsApi } from "../api/productsApi.js";
import { filterCatalog } from "./catalogFilter.js";
import { sortCatalog } from "./catalogSort.js";
import { slider } from "../UI/slider.js";
import { CatalogState, CATALOG_PAGE_SIZE } from "../../state/catalogState.js";
import {
  bindBasketProductList,
} from "../../state/basketManager.js";

export class Catalog {
  catalogState = new CatalogState();
  #statusEl = null;
  #statusTimeout = null;

  constructor(containerOfDay, container) {
    this.slider = slider;
    this.containerOfDay = containerOfDay;
    this.containerRenderCards = container;
  }

  catalogRender(products) {
    try {
      this.catalogState.setProducts(products);

      this.containerRenderCards.renderCheckbox(products);
      const checkboxCount = this.containerRenderCards.categories;
      document.querySelectorAll(".custom-checkbox__label").forEach((item) => {
        const countEl = item.querySelector(".custom-checkbox__count");
        if (countEl) {
          countEl.textContent = checkboxCount[item.htmlFor];
        }
      });

      this.applyFilters = filterCatalog(
        this.catalogState,
        this.playPaginator,
      );
      sortCatalog(this.catalogState, this.playPaginator);
      this.playPaginator(this.catalogState.getDisplayProducts());

      this.slider(products, this.containerOfDay);
      bindBasketProductList(".catalog__list", products);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  }

  showPaginationStatus(message) {
    if (!this.#statusEl) {
      this.#statusEl = document.createElement("p");
      this.#statusEl.className = "catalog__status";
      this.#statusEl.setAttribute("role", "status");
      this.#statusEl.setAttribute("aria-live", "polite");
      document
        .querySelector(".catalog__pagination")
        ?.insertAdjacentElement("beforebegin", this.#statusEl);
    }

    this.#statusEl.textContent = message;

    clearTimeout(this.#statusTimeout);
    this.#statusTimeout = setTimeout(() => {
      if (this.#statusEl) {
        this.#statusEl.textContent = "";
      }
    }, 3000);
  }

  pageDisabled(countPage) {
    document.querySelectorAll(".catalog__pagination-link").forEach((btn) => {
      btn.removeAttribute("disabled");
      if (Number(btn.dataset.page) > countPage) {
        btn.setAttribute("disabled", "true");
      }
    });
  }

  getPageSlice(products, pageNumber) {
    const start = (pageNumber - 1) * CATALOG_PAGE_SIZE;
    return products.slice(start, start + CATALOG_PAGE_SIZE);
  }

  playPaginator = (products) => {
    const countPage = Math.ceil(products.length / CATALOG_PAGE_SIZE) || 1;
    this.pageDisabled(countPage);
    this.containerRenderCards.renderCards(
      this.getPageSlice(products, 1),
    );

    if (this._handle) {
      document
        .querySelector(".catalog__pagination")
        ?.removeEventListener("click", this._handle);
    }

    this._handle = (e) => {
      const btnPage = e.target.closest(".catalog__pagination-link");
      if (!btnPage || btnPage.hasAttribute("disabled")) {
        return;
      }

      const numberPage = Number(btnPage.dataset.page);
      const pageProducts = this.getPageSlice(products, numberPage);

      if (pageProducts.length === 0) {
        this.showPaginationStatus("Страница недоступна");
        return;
      }

      document
        .querySelectorAll(".catalog__pagination-link")
        .forEach((btn) => {
          btn.classList.remove("catalog__pagination-link--active");
        });
      btnPage.classList.add("catalog__pagination-link--active");
      this.containerRenderCards.renderCards(pageProducts);
    };

    document
      .querySelector(".catalog__pagination")
      ?.addEventListener("click", this._handle);
  };

  createPaginatorEl(countProduct) {
    const containerPage = document.querySelector(".catalog__pagination");
    const countPage = Math.ceil(countProduct / CATALOG_PAGE_SIZE);

    for (let i = 1; i <= countPage; i++) {
      const pageEl = document.createElement("li");
      pageEl.className = "catalog__pagination-item";
      const btnPage = document.createElement("button");
      btnPage.className = "catalog__pagination-link";
      btnPage.textContent = i;
      btnPage.dataset.page = i;
      pageEl.append(btnPage);
      containerPage?.append(pageEl);
    }
  }

  async initFetchCatalog() {
    const products = await ProductsApi.fetchProducts();
    this.createPaginatorEl(products.length);
    this.catalogRender(products);
  }
}
