import { questionsApi } from "../api/questionsApi.js";
import { itemModalHtml } from "./itemModal.js";
import { modalUi } from "./modalUi.js";

export const formSubmit = () => {
  const form = document.querySelector(".questions__form");
  const modal = document.querySelector(".modal");

  const validator = new JustValidate(".questions__form");
  validator
    .addField("#name", [
      { rule: "required", errorMessage: "Введите ваше имя" },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимальная длина — три символа",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Максимальная длина — двадцать символов",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
        errorMessage: "Введите вашу почту",
      },
      {
        rule: "email",
        errorMessage: "Почта введена неверно",
      },
    ])
    .addField("#agree", [
      { rule: "required", errorMessage: "Согласие обязательно" },
    ])
    .onSuccess(async () => {
      const dataForm = new FormData(form);
      const responseBool = await questionsApi(dataForm);

      modal.innerHTML = itemModalHtml(responseBool);
      modal.classList.remove("visually-hidden");
      modalUi(modal);

      form.reset();
    });
};
