export { Card };

class Card {
  constructor({ data, handleImageClick, handleRemove, handleToggleLike }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likeScore = data.likes.length;
    this._like = data.like;
    this._handleImageClick = handleImageClick;
    this._handleRemove = handleRemove;
    this._handleToggleLike = handleToggleLike;
    this._generate(templateSelector);
  }

  _generate(templateSelector) {
    this._cardElement = this._getTemplate(templateSelector);
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._removeButton = this._cardElement.querySelector('.card__remove-button');
    this._image = this._cardElement.querySelector('.card__image');
    this._likeScoreElement = this._cardElement.querySelector('.card__like-score');
    if (this._handleRemove) { this._removeButton.classList.add('card__remove-button_active') };
    if (this._like) { this._likeButton.classList.add('card__like-button_active'); }
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._likeScoreElement.textContent = this._likeScore;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListeners();
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleToggleLike(this._id, this._like).then(data => this._toggleLike(data.likes.length));
    });
    this._removeButton.addEventListener('click', () => {
      this._handleRemove(this._id, this._remove.bind(this));
    });
    this._image.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _toggleLike(likeScore) {
    this._like = !this._like;
    this._likeButton.classList.toggle('card__like-button_active');
    this._likeScore = likeScore;
    this._likeScoreElement.textContent = this._likeScore;
  }

  _remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  get() {
    return this._cardElement;
  }
}
