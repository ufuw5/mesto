export { PopupWithForm };

import { Popup } from './Popup.js';
import { FormValidator } from './FormValidator.js';
import { formConfig } from '../utils/config.js';

class PopupWithForm extends Popup {
  constructor(handleSubmitClick, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formConfig.formSelector);
    this._submitButton = this._form.querySelector(formConfig.submitButtonSelector);
    this._validator = new FormValidator(formConfig, this._form);
    this._submitCallback = handleSubmitClick;
    this._handleSubmitClick = evt => {
      evt.preventDefault();
      if (this._isActiveSubmitButton()) {
        this._wait(true);
        this._submitCallback(this._getInputValues(), this.close.bind(this));
      }
    }
  }

  _wait(isWait) {
    if (isWait) {
      this._submitButton.querySelector(formConfig.submitButtonTextSelector).classList.add(formConfig.hideButtonTextClass);
      this._submitButton.querySelector(formConfig.submitButtonWaitTextSelector).classList.remove(formConfig.hideButtonTextClass);
    } else {
      this._submitButton.querySelector(formConfig.submitButtonWaitTextSelector).classList.add(formConfig.hideButtonTextClass);
      this._submitButton.querySelector(formConfig.submitButtonTextSelector).classList.remove(formConfig.hideButtonTextClass);
    }
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(formConfig.inputSelector);
    const data = {};
    inputList.forEach(inputElement => {
      data[`${inputElement.name}`] = `${inputElement.value}`;
    });
    return data;
  }

  _isActiveSubmitButton() {
    return this._submitButton.classList.contains(formConfig.inactiveButtonClass) ? false : true;
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmitClick);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._handleSubmitClick);
    super._removeEventListeners();
  }

  setSubmitCallback(handleSubmitClick) {
    this._submitCallback = handleSubmitClick;
  }

  open() {
    this._setEventListeners();
    this._wait(false);
    this._validator.enableValidation();
    super.open();
  }

  close() {
    this._form.reset();
    this._removeEventListeners();
    super.close();
  }
}
