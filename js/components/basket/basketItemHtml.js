export const basketCardHtml = (card) => {
  return `
                <div class="basket__img">
                  <img src="${card.image}" alt="Фотография товара" height="60" width="60">
                </div>
                <span class="basket__name">${card.name}</span>
                <span class="basket__price">${new Intl.NumberFormat(
                  "ru-RU",
                ).format(card.price?.new)} руб</span>
                <button class="basket__item-close" type="button" data-id="${card.id}">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>`;
};
