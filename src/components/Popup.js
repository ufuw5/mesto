export { Popup };

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') { this.close(); };
    }
    this._handleClickClose = (evt) => {
      if (evt.target.classList.contains('popup')) { this.close(); };
    }
  }

  open() {
    window.addEventListener('click', this._handleClickClose);
    window.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    window.removeEventListener('click', this._handleClickClose);
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => { this.close(); });
  }
}
