import { bindBasketProductList } from "../../state/basketManager.js";

export const slider = (products, containerOfDay) => {
  const productDay = products.filter((product) => product.goodsOfDay);

  containerOfDay.renderCards(productDay, "day-products__item swiper-slide");
  bindBasketProductList(".day-products__list", products);
};

const swiper = new Swiper(".swiper", {
  speed: 400,
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".day-products__navigation-btn--next",
    prevEl: ".day-products__navigation-btn--prev",
  },
});
