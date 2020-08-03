import { initialCards } from './data.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const page = document.querySelector('.page');
const cardList = page.querySelector('.cards__list');
const editProfileButton = page.querySelector('.profile__edit-button');
const addCardButton = page.querySelector('.add-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const formClasses = {};
const validateConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_nonactive',
  activeButtonClass: 'form__submit_active',
  inputErrorClass: 'form__input_mod-error'
};
const cardConfig = {
  templateSelector: '#card',
  cardSelector: '.card',
  imageSelector: '.card__image',
  likeButtonSelector: '.card__like-button',
  likeButtonSelectorActive: 'card__like-button_active',
  removeButtonSelector: '.card__remove-button',
  titleSelector: '.card__title',
  popupSelector: '.image-popup',
  popupImageSelector: '.image-popup__image',
  popupTitleSelector: '.image-popup__title',
  openPopup: openPopup,
  closePopup: closePopup
};


function openPopup(popupElement) {
  const popup = popupElement.closest('.popup');
  window.addEventListener('keydown', pageKeyboardListener);
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

function closePopup() {
  const popup = page.querySelector('.popup_opened');
  window.removeEventListener('keydown', pageKeyboardListener);
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

function initForm() {
  closePopupButtons.forEach(item => { item.addEventListener('click', closePopup); });
  popups.forEach(item => { item.addEventListener('click', evt => { evt.target === evt.currentTarget ? closePopup() : null; }); });
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formSubmitListener(evt);
    });
  });
}

function openEditProfile(form) {
  form.reset();
  form.editProfileName.value = profileTitle.textContent;
  form.editProfileDescription.value = profileSubtitle.textContent;
  if (!formClasses.editProfile) {
    formClasses.editProfile = new FormValidator(validateConfig, form);
  };
  formClasses.editProfile.enableValidation();
  openPopup(form);
}

function submitEditProfile(form) {
  profileTitle.textContent = form.editProfileName.value;
  profileSubtitle.textContent = form.editProfileDescription.value;
  closePopup();
}

function openAddCard(form) {
  form.reset();
  if (!formClasses.addCard) {
    formClasses.addCard = new FormValidator(validateConfig, form);
  };
  formClasses.addCard.enableValidation();
  openPopup(form);
}

function submitAddCard(form) {
  const name = form.addCardName.value;
  const link = form.addCardLink.value;
  cardList.prepend(new Card(cardConfig, { name, link }).getCard());
  closePopup();
}

function isActiveSubmitButton(form) {
  return form.querySelector('.form__submit_nonactive') ? false : true;
}

function pageClickListener(evt) {
  switch (evt.target) {
    case editProfileButton:
      openEditProfile(document.forms.editProfile);
      break;
    case addCardButton:
      openAddCard(document.forms.addCard);
      break;
    default:
      break;
  }
}

function pageKeyboardListener(evt) {
  switch (evt.key) {
    case 'Escape':
      closePopup();
      break;
    default:
      break;
  }
}

function formSubmitListener(evt) {
  const form = evt.target.closest('.form');
  if (isActiveSubmitButton(form)) {
    switch (form) {
      case document.forms.editProfile:
        submitEditProfile(form);
        break;
      case document.forms.addCard:
        submitAddCard(form);
        break;
      default:
        break;
    }
  }
}

initialCards.forEach(item => { cardList.prepend(new Card(cardConfig, item).getCard()); });
page.addEventListener('click', pageClickListener);
initForm();
