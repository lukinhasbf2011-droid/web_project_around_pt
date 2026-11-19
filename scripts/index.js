import Card from "./card.js";
import FormValidator from "./formValidator.js";
import { openModal, closeModal, setPopupListeners } from "./utils.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Selecionando os elementos necessários no DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeEditButton = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const imageModal = document.querySelector("#image-popup");
const closeImageModalButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");

// Configuração de validação
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Habilitando a validação para todos os formulários da página
const validators = {};
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
  validators[formElement.id] = validator;
});

// Fechar edição
closeEditButton.addEventListener("click", function () {
  closeModal(editModal);
});

// Preenche os campos do formulário com os dados atuais da página
function fillProfileForm() {
  const nameInput = editModal.querySelector(".popup__input_type_name");
  const descriptionInput = editModal.querySelector(".popup__input_type_description");

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Preenche o formulário e abre o pop-up
function handleOpenEditModal() {
  fillProfileForm();
  validators[editProfileForm.id].resetValidation();
  openModal(editModal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);

const editProfileForm = editModal.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = editModal.querySelector(".popup__input_type_name");
  const jobInput = editModal.querySelector(".popup__input_type_description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Cards Section
const cardsContainer = document.querySelector(".cards__list");

// Abre o pop-up de imagem (passada para a classe Card)
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imageModal);
}

// Renderizando os cards com a classe Card
function renderCard(name, link, container) {
  const card = new Card({ name, link }, "#cards__template", handleCardClick);
  container.prepend(card.generateCard());
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

const profileAddButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#new-card-popup");
const closeAddButton = addModal.querySelector(".popup__close");
const newCardForm = addModal.querySelector(".popup__form");

profileAddButton.addEventListener("click", function () {
  validators[newCardForm.id].resetValidation();
  openModal(addModal);
});

closeAddButton.addEventListener("click", function () {
  closeModal(addModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = addModal.querySelector(".popup__input_type_card-name");
  const linkInput = addModal.querySelector(".popup__input_type_url");

  renderCard(nameInput.value, linkInput.value, cardsContainer);

  newCardForm.reset();
  closeModal(addModal);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

closeImageModalButton.addEventListener("click", function () {
  closeModal(imageModal);
});

// Fechar pop-ups com clique no fundo e com Esc
setPopupListeners();