import { elementCardHtml } from "./catalogItemHtml.js";
import { initTooltip } from "../UI/initTooltip.js";

export class RenderCards {
  categories = {
    pendant: 0,
    ceiling: 0,
    overhead: 0,
    point: 0,
    nightlights: 0,
  };

  constructor(container = ".catalog__list") {
    this.container = document.querySelector(container);
    this.elementCardHtml = elementCardHtml;
    this.initTooltip = initTooltip;
  }

  // метод создания карточки для главной страницы
  createCard(product, className = "catalog__item") {
    const element = document.createElement("li");
    element.className = className;
    element.innerHTML = this.elementCardHtml(
      product,
      className !== "catalog__item",
    );
    return element;
  }

  // метод рендера нескольких карточек
  renderCards(products, className = "catalog__item") {
    if (!this.container) return console.error("Контейнер не найден");
    if (products.length === 0) return console.error("Пустой массив");

    const containerFragment = document.createDocumentFragment();
    this.container.innerHTML = "";

    products.forEach((product) => {
      try {
        const element = this.createCard(product, className);
        containerFragment.append(element);
      } catch (error) {
        console.error("Ошибка создания карточки: ", error, product);
      }
    });

    this.container.append(containerFragment);
    if (className === "catalog__item") this.initTooltip();
  }

  // метод для заполнения категорий для карточек
  renderCheckbox(products) {
    products.forEach((product) => {
      if (product) {
        product.type.forEach((item) => (this.categories[item] += 1));
      }
    });
  }
}
