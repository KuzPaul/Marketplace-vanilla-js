export const itemModalHtml = (flag = true) => {
  if (flag) {
    return `<div class="modal__content">
            <h3 class="modal__title">Благодарим за обращение!</h3>
            <p class="modal__description">Мы получили вашу заявку и свяжемся с вами в ближайшее время</p>
            <button class="modal__btn" type="button" aria-label="кнопка">
              <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-close"></use>
              </svg>
            </button>
          </div>`;
  } else {
    return `<div class="modal__content">
            <h3 class="modal__title">Не удалось отправить обращение</h3>
            <p class="modal__description">Что-то пошло не так, попробуйте отправить форму ещё раз. Если ошибка повторится — свяжитесь со службой поддержки.</p>
            <button class="modal__btn" type="button" aria-label="кнопка">
              <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-close"></use>
              </svg>
            </button>
          </div>`;
  }
};
