export { Card };

class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._generateCard();
  }

  _generateCard() {
    this._cardElement = this._getTemplate(this._templateSelector);
    const image = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
    this._setEventListeners();
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.card__like-button');
    const removeButton = this._cardElement.querySelector('.card__remove-button');
    const image = this._cardElement.querySelector('.card__image');
    likeButton.addEventListener('click', () => {
      this._toggleCardLike(likeButton);
    });
    removeButton.addEventListener('click', () => {
      this._removeCard();
    });
    image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _toggleCardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_active');
  }

  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCard() {
    return this._cardElement;
  }
}
