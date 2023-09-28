export const modalUi = (modal) => {
  modal.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".modal__btn")) {
        modal.innerHTML = "";
        modal.classList.add("visually-hidden");
      }
    },
    { once: true },
  );
};
