export { PopupWithImage };

import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  open({ name, link }) {
    const image = this._popup.querySelector('.image-popup__image');
    const title = this._popup.querySelector('.image-popup__title');
    image.src = link;
    image.alt = name;
    title.textContent = name;
    super._setEventListeners();
    super.open();
  }

  close() {
    super._removeEventListeners();
    super.close();
  }
}
