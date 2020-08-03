export { Card };

class Card {
  constructor({ ...config }, { ...data }) {
    this._generateCard(config, data);
  }

  _generateCard({ ...config }, { ...data }) {
    this._cardElement = this._getTemplate(config);
    const image = this._cardElement.querySelector(config.imageSelector);
    const likeButton = this._cardElement.querySelector(config.likeButtonSelector);
    const removeButton = this._cardElement.querySelector(config.removeButtonSelector);
    this._cardElement.querySelector(config.titleSelector).textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
    this._setEventListeners(config, { image, likeButton, removeButton }, data);
  }

  _getTemplate({ ...config }) {
    return document.querySelector(config.templateSelector).content.querySelector(config.cardSelector).cloneNode(true);
  }

  _setEventListeners({ ...config }, { ...buttons }, { ...data }) {
    buttons.image.addEventListener('click', () => {
      this._openPopup(config, data);
    });
    buttons.likeButton.addEventListener('click', () => {
      this._toggleCardLike(config, buttons.likeButton);
    });
    buttons.removeButton.addEventListener('click', () => {
      this._removeCard(config);
    });
  }

  _openPopup({ ...config }, { ...data }) {
    const popup = document.querySelector(config.popupSelector);
    const image = popup.querySelector(config.popupImageSelector);
    image.src = data.link;
    image.alt = data.name;
    popup.querySelector(config.popupTitleSelector).textContent = data.name;
    config.openPopup(popup);
  }

  _closePopup({ ...config }) {
    config.closePopup();
  }

  _toggleCardLike({ ...config }, likeButton) {
    likeButton.classList.toggle(config.likeButtonSelectorActive);
  }

  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCard() {
    return this._cardElement;
  }
}
