import { BasketRender } from "../components/basket/basket.js";

let basketInstance = null;
let headerUiBound = false;
const boundListSelectors = new Set();

export function initBasket() {
  if (!basketInstance) {
    const countBasketEl = document.querySelector(".header__user-count");
    basketInstance = new BasketRender(".basket__list", countBasketEl);
  }
  return basketInstance;
}

export function getBasket() {
  if (!basketInstance) {
    return initBasket();
  }
  return basketInstance;
}

export function bindBasketProductList(listSelector, products) {
  if (boundListSelectors.has(listSelector)) {
    return;
  }

  const listEl = document.querySelector(listSelector);
  if (!listEl) {
    return;
  }

  boundListSelectors.add(listSelector);
  const basket = getBasket();
  const basketEmpty = document.querySelector(".basket__empty-block");
  const basketLink = document.querySelector(".basket__link");

  listEl.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".product-card__link.btn--icon");
    if (!addBtn?.dataset.id) {
      return;
    }

    const added = basket.addCardBasket(products, addBtn.dataset.id);
    if (added) {
      basketEmpty?.classList.add("visually-hidden");
      basketLink?.classList.remove("visually-hidden");
    }
  });
}

export function bindBasketHeader() {
  if (headerUiBound) {
    return;
  }

  headerUiBound = true;
  const listBasketCard = document.querySelector(".header__basket");
  const basketEmpty = document.querySelector(".basket__empty-block");
  const basketLink = document.querySelector(".basket__link");
  const basket = getBasket();

  document.querySelector(".header__user-btn")?.addEventListener("click", () => {
    listBasketCard?.classList.toggle("basket--active");
  });

  document.querySelector(".header__basket")?.addEventListener("click", (e) => {
    const buttonClose = e.target.closest(".basket__item-close");
    if (!buttonClose) {
      return;
    }

    const cardEl = e.target.closest(".basket__item");
    const itemBasket = basket.removeBasket(buttonClose, cardEl);

    if (itemBasket.length === 0) {
      basketEmpty?.classList.remove("visually-hidden");
      basketLink?.classList.add("visually-hidden");
    }
  });
}
