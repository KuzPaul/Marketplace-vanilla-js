import { CATALOG_PAGE_SIZE } from "../config/constants.js";

const CITY_KEYS = {
  Оренбург: "orenburg",
  Москва: "moscow",
  "Санкт-Петербург": "saintPetersburg",
};

const getPrice = (product) => product.price?.new ?? product.price?.old ?? 0;

export class CatalogState {
  #products = [];
  #sortValue = "price-min";

  filterProduct = {
    currentCity: "Оренбург",
    availability: "all-item",
    filterList: [],
  };

  setProducts(products) {
    this.#products = products;
  }

  getProducts() {
    return this.#products;
  }

  setSortValue(value) {
    this.#sortValue = value;
  }

  getSortValue() {
    return this.#sortValue;
  }

  getFilteredProducts() {
    let result = this.#products;

    if (this.filterProduct.availability !== "all-item") {
      const cityKey = CITY_KEYS[this.filterProduct.currentCity];
      result = result.filter(
        (product) => product.availability[cityKey] > 0,
      );
    }

    if (this.filterProduct.filterList.length > 0) {
      result = result.filter((product) =>
        product.type.some((type) =>
          this.filterProduct.filterList.includes(type),
        ),
      );
    }

    return result;
  }

  getDisplayProducts() {
    const products = [...this.getFilteredProducts()];

    switch (this.#sortValue) {
      case "price-min":
        products.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-max":
        products.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "rating-max":
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return products;
  }

  resetFilters() {
    this.filterProduct.filterList.length = 0;
    this.filterProduct.availability = "all-item";
  }
}

export { CATALOG_PAGE_SIZE };
