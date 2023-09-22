export const initTooltip = () => {
  tippy(".tooltip__btn", {
    content: (ref) => {
      return ref
        .closest(".product-card__tooltip")
        .querySelector(".tooltip__content").innerHTML;
    },
    allowHTML: true,
    theme: "lightwhite",
  });
};
