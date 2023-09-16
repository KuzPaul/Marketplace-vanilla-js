import { basketCardHtml } from "./basketItemHtml.js";

export class BasketRender {
  itemBasket = [];
  countBasket = 0;

  constructor(container = ".basket__list", countBasketEl) {
    this.container = document.querySelector(container);
    this.countBasketEl = countBasketEl;
    this.basketCardHtml = basketCardHtml;
  }

  renderBasket(card) {
    const elementLi = document.createElement("li");
    elementLi.className = "basket__item";
    elementLi.innerHTML = this.basketCardHtml(card);
    return elementLi;
  }

  renderAll() {
    if (!this.container) {
      return;
    }

    const containerFragment = document.createDocumentFragment();
    this.container.innerHTML = "";

    this.itemBasket.forEach((card) => {
      containerFragment.append(this.renderBasket(card));
    });

    this.container.append(containerFragment);
    this.countBasketEl.textContent = this.countBasket;
  }

  addCardBasket(products = [], id) {
    if (id === null || id === undefined || id === "") {
      return false;
    }

    const card = products.find((product) => product.id === +id);
    if (!card) {
      return false;
    }

    if (this.itemBasket.some((item) => item.id === card.id)) {
      return false;
    }

    this.itemBasket.push(card);
    this.countBasket = this.itemBasket.length;
    this.renderAll();
    return true;
  }

  removeBasket(buttonClose, cardEl) {
    cardEl.remove();
    this.itemBasket.splice(
      this.itemBasket.findIndex(
        (item) => item.id === +buttonClose.dataset.id,
      ),
      1,
    );
    this.countBasket = this.itemBasket.length;
    this.countBasketEl.textContent = this.countBasket;
    return this.itemBasket;
  }
}
