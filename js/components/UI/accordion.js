export const accordionUi = () => {
  document.querySelectorAll(".accordion__btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnActive = document.querySelector(".accordion__btn--active");
      if (btnActive && btnActive !== e.currentTarget) {
        btnActive.classList.remove("accordion__btn--active");
      }
      e.currentTarget.classList.toggle("accordion__btn--active");
    });
  });
};
