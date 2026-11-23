import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js";
import { initialCards, validationConfig } from "./utils.js";

// Validação dos formulários
const validators = {};
document
  .querySelectorAll(validationConfig.formSelector)
  .forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    validator.enableValidation();
    validators[formElement.id] = validator;
  });

// Informações do usuário
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Pop-up de imagem
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Cartões
function createCard({ name, link }) {
  const card = new Card({ name, link }, "#cards__template", (name, link) =>
    imagePopup.open(name, link)
  );
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => cardsSection.addItem(createCard(item)),
  },
  ".cards__list"
);
cardsSection.renderItems();

// Pop-up de edição de perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo(values);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  document.querySelector("#profile-name").value = name;
  document.querySelector("#profile-description").value = description;
  validators["edit-profile-form"].resetValidation();
  editProfilePopup.open();
});

// Pop-up de novo cartão
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
  cardsSection.addItem(
    createCard({ name: values["place-name"], link: values.link }),
    "prepend"
  );
  newCardPopup.close();
});
newCardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  validators["new-card-form"].resetValidation();
  newCardPopup.open();
});
