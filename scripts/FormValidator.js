export { FormValidator };

class FormValidator {
  constructor({ ...config }, form) {
    this._config = config;
    this._form = form;
    this._isEnabled = false;
  };

  _showInputError({ ...config }, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError({ ...config }, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState({ ...config }, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.remove(config.activeButtonClass);
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.classList.add(config.activeButtonClass);
    }
  };

  _checkInputValidity({ ...config }, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, formElement, inputElement);
    }
  };

  _setEventListeners({ ...config }, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(config, formElement, inputElement);
        this._toggleButtonState(config, inputList, buttonElement);
      });
    });
  };

  _check({ ...config }, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach(inputElement => {
      inputElement.value === '' ? this._hideInputError(config, formElement, inputElement) : this._checkInputValidity(config, formElement, inputElement);
      this._toggleButtonState(config, inputList, buttonElement);
    });
  };

  enableValidation() {
    if (!this._isEnabled) {
      this._setEventListeners(this._config, this._form);
      this._isEnabled = true;
    };
    this._check(this._config, this._form);
  };
}

