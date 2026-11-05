let initialCards = [
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

initialCards.forEach(card => {
    console.log(card.name);
});

// Selecionando os elementos necessários no DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('#edit-popup');
const closeEditButton = editModal.querySelector('.popup__close'); // Seleciona o botão de fechar dentro do modal

// Criando funções reutilizáveis para abrir e fechar o modal
function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

// Adicionando os event listeners para escutar os cliques
profileEditButton.addEventListener('click', function () {
  openModal(editModal);
});

closeEditButton.addEventListener('click', function () {
  closeModal(editModal);
});

// Função para preencher os campos do formulário com os dados atuais da página
function fillProfileForm() {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  const nameInput = document.querySelector('.popup__input_type_name');
  const descriptionInput = document.querySelector('.popup__input_type_description');

  nameInput.value = profileName;
  descriptionInput.value = profileDescription;
}

// Função para preencher o formulário e abrir o pop-up
function handleOpenEditModal() {
  fillProfileForm(); 
  openModal(editModal); 
}

// Atualizando o event listener do botão "Editar perfil"
profileEditButton.addEventListener('click', handleOpenEditModal);

//  Encontra o formulário no DOM
const formElement = document.querySelector('.popup__form');

//  Cria o manipulador do evento submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editModal);
}

// Conecta o manipulador ao formulário
formElement.addEventListener('submit', handleProfileFormSubmit);

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
  openModal(addModal);
});

closeAddButton.addEventListener('click', function () {
  closeModal(addModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');

  const newCard = createCardElement(nameInput.value, linkInput.value);
  cardsContainer.prepend(newCard);

  newCardForm.reset();
  closeModal(addModal);
}

newCardForm.addEventListener('submit', handleCardFormSubmit);


const imageModal = document.querySelector('#image-popup');
const closeImageModalButton = imageModal.querySelector('.popup__close');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

closeImageModalButton.addEventListener('click', function () {
  closeModal(imageModal);
});

