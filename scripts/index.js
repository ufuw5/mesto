import { initialCards } from './data.js';
import { validationConfig } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');
const cardList = page.querySelector('.cards__list');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const formClasses = {};
const cardTemplateSelector = '#card';

function openEditProfile(form) {
  form.reset();
  form.editProfileName.value = profileTitle.textContent;
  form.editProfileDescription.value = profileSubtitle.textContent;
  if (!formClasses.editProfile) {
    formClasses.editProfile = new FormValidator(validationConfig, form);
  };
  formClasses.editProfile.enableValidation();
  togglePopup(form);
}

function submitEditProfile(form) {
  profileTitle.textContent = form.editProfileName.value;
  profileSubtitle.textContent = form.editProfileDescription.value;
  togglePopup(form);
}

function openAddCard(form) {
  form.reset();
  if (!formClasses.addCard) {
    formClasses.addCard = new FormValidator(validationConfig, form);
  };
  formClasses.addCard.enableValidation();
  togglePopup(form);
}

function submitAddCard(form) {
  const name = form.addCardName.value;
  const link = form.addCardLink.value;
  cardList.append(new Card(cardTemplateSelector, name, link).getCard());
  togglePopup(form);
}

function isActiveSubmitButton(form) {
  return form.querySelector('.form__submit_nonactive') ? false : true;
}

function pageClickListener(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    openEditProfile(document.forms.editProfile);
  } else if (evt.target.classList.contains('add-button')) {
    openAddCard(document.forms.addCard);
  } else if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
    togglePopup(evt.target);
  };
}

function pageKeyboardListener(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    if (!(openedPopup == null)) { togglePopup(openedPopup); }
  };
}

function formSubmitListener(evt) {
  const form = evt.target.closest('.form');
  if (isActiveSubmitButton(form)) {
    if (form === document.forms.editProfile) {
      submitEditProfile(form);
    } else if (form === document.forms.addCard) {
      submitAddCard(form);
    };
  };
}

function togglePopup(popupElement) {
  const popup = popupElement.closest('.popup');
  popup.classList.toggle('popup_closed');
  popup.classList.toggle('popup_opened');
}

function initForm() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formSubmitListener(evt);
    });
  });
}

initialCards.forEach(item => { cardList.append(new Card(cardTemplateSelector, item.name, item.link).getCard()); });
page.addEventListener('click', pageClickListener);
window.addEventListener('keydown', pageKeyboardListener);
initForm();
