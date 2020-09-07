export { Popup };

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = (evt) => { if (evt.key === 'Escape') { this.close(); }; }
    this._handleClickClose = (evt) => { if (evt.target.classList.contains('popup')) { this.close(); }; }
    this._handleClickCloseButton = () => { this.close(); }
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    window.addEventListener('click', this._handleClickClose);
    window.addEventListener('keydown', this._handleEscClose);
    this._closeButton.addEventListener('click', this._handleClickCloseButton);
  }

  _removeEventListeners() {
    window.removeEventListener('click', this._handleClickClose);
    window.removeEventListener('keydown', this._handleEscClose);
    this._closeButton.removeEventListener('click', this._handleClickCloseButton);
  }
}
