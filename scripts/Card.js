export { Card };
import { togglePopup } from './index.js';

class Card {
  constructor(templateSelector, name, link) {
    this._name = name;
    this._link = link;
    this._generateCard(templateSelector, name, link);
  }

  _openImagePopup() {
    const popup = document.querySelector('#imagePopup');
    const image = popup.querySelector('.image-popup__image');
    image.src = this._link;
    image.alt = this._name;
    popup.querySelector('.image-popup__title').textContent = this._name;
    togglePopup(popup);
  }

  _generateCard(templateSelector, name, link) {
    this._cardElement = this._getTemplate(templateSelector);
    const image = this._cardElement.querySelector('.card__image');
    this._cardElement.querySelector('.card__title').textContent = name;
    image.src = link;
    image.alt = name;
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
      this._openImagePopup();
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
