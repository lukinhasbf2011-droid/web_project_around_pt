export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Método privado para clonar o template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  // Métodos privados de eventos
 _handleLikeIcon() {
  this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard());
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._text, this._link));
  }

  // Método público que retorna o cartão pronto
  generateCard() {
    this._element = this._getTemplate();
    
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._cardTitle.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}