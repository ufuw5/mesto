export { PopupWithForm };

import { Popup } from './Popup.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from '../utils/config.js';

class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._validator = new FormValidator(validationConfig, this._form);
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll('.form__input');
    const data = {};
    inputList.forEach(inputElement => {
      data[`${inputElement.name}`] = `${inputElement.value}`;
    });
    return data;
  }

  _isActiveSubmitButton() {
    return this._form.querySelector('.form__submit_nonactive') ? false : true;
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      if (this._isActiveSubmitButton()) {
        this._submitCallback(this._getInputValues());
        this.close();
      }
    });
    super.setEventListeners();
  }

  open() {
    this._validator.enableValidation();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
