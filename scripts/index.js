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

// 1. Função para preencher os campos do formulário com os dados atuais da página
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