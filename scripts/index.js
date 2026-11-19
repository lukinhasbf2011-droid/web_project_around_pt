const initialCards = [
    {
        name: 'Vale de Yosemite',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg'
    },
    {
        name: 'Lago Louise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg'
    },
    {
        name: 'Montanhas Carecas',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg'
    },
    {
        name: 'Latemar',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg'
    },
    {
        name: 'Parque Nacional da Vanoise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg'
    },
    {
        name: 'Lago di Braies',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg'
    }
];


// Selecionando os elementos necessários no DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('#edit-popup');
const closeEditButton = editModal.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imageModal = document.querySelector('#image-popup');
const closeImageModalButton = imageModal.querySelector('.popup__close');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');


// Criando funções reutilizáveis para abrir e fechar o modal
function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

// Adicionando os event listeners para escutar os cliques

closeEditButton.addEventListener('click', function () {
  closeModal(editModal);
});

// Função para preencher os campos do formulário com os dados atuais da página
function fillProfileForm() {
  const nameInput = editModal.querySelector('.popup__input_type_name');
  const descriptionInput = editModal.querySelector('.popup__input_type_description');

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Função para preencher o formulário e abrir o pop-up
function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(editProfileForm);
  openModal(editModal); 
}

// Atualizando o event listener do botão "Editar perfil"
profileEditButton.addEventListener('click', handleOpenEditModal);

//  Encontra o formulário no DOM
const editProfileForm = editModal.querySelector('.popup__form');

//  Cria o manipulador do evento submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = editModal.querySelector('.popup__input_type_name');
  const jobInput = editModal.querySelector('.popup__input_type_description');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editModal);
}

// Conecta o manipulador ao formulário
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Cards Section
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#cards__template');

// Criando Elmentos
function createCardElement(name="Lugar sem nome", link="../images/placeholder.jpg") {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  cardImage.addEventListener('click', function () {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imageModal);
  });

  return cardElement;
}
// Renderizando os cards
function renderCard(name, link, container) {
 const cardRender = createCardElement(name, link);
 container.prepend(cardRender);
}
// dando os nomes e links para os cards iniciais
initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});	

const profileAddButton = document.querySelector('.profile__add-button');
const addModal = document.querySelector('#new-card-popup');
const closeAddButton = addModal.querySelector('.popup__close');
const newCardForm = addModal.querySelector('.popup__form');

profileAddButton.addEventListener('click', function () {
  resetValidation(newCardForm);
  openModal(addModal);
});

closeAddButton.addEventListener('click', function () {
  closeModal(addModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = addModal.querySelector('.popup__input_type_card-name');
  const linkInput = addModal.querySelector('.popup__input_type_url');

  renderCard(nameInput.value, linkInput.value, cardsContainer);

  newCardForm.reset();
  closeModal(addModal);
}

newCardForm.addEventListener('submit', handleCardFormSubmit);

closeImageModalButton.addEventListener('click', function () {
  closeModal(imageModal);
});



// Função que exibe a mensagem de erro no elemento span
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

// Função que oculta a mensagem de erro
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

// Verifica se o campo individual é válido
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Verifica se existe pelo menos um campo inválido na lista
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const resetValidation = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const buttonElement = form.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
};

// Alterna o estado do botão (ativo/inativo) baseado na validade dos campos
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
};

// Adiciona os ouvintes de eventos para cada input do formulário
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  // Define o estado inicial do botão ao carregar
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Função principal que ativa a validação em todos os formulários da página
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Inicializa a validação
enableValidation();

// Seleciona todos os pop-ups da página
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    // Se o clique aconteceu exatamente no fundo escuro (.popup) e não na caixa de conteúdo
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Fecha o pop-up ao pressionar a tecla Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

import Card from "./card.js";
import FormValidator from "./formValidator.js";

// Objeto de configuração de validação (ajuste conforme o seu código)
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Habilitando a validação para todos os formulários da página
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});