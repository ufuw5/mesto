import { initialCards } from './data.js';
import { validationConfig } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');
const cardList = page.querySelector('.cards__list');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const formClasses = {};
const cardTemplateSelector = '#card';

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
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
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
    formClasses.editProfile = new FormValidator(validationConfig, form);
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
    formClasses.addCard = new FormValidator(validationConfig, form);
  };
  formClasses.addCard.enableValidation();
  openPopup(form);
}

function submitAddCard(form) {
  const name = form.addCardName.value;
  const link = form.addCardLink.value;
  cardList.append(new Card(cardTemplateSelector, name, link).getCard());
  closePopup();
}

function isActiveSubmitButton(form) {
  return form.querySelector('.form__submit_nonactive') ? false : true;
}

function openImagePopup(target) {
  const card = target.closest('.card');
  const link = card.querySelector('.card__image').src;
  const name = card.querySelector('.card__title').textContent;
  const popup = document.querySelector('.image-popup');
  const image = popup.querySelector('.image-popup__image');
  image.src = link;
  image.alt = name;
  popup.querySelector('.image-popup__title').textContent = name;
  openPopup(popup);
}

function pageClickListener(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    openEditProfile(document.forms.editProfile);
  } else if (evt.target.classList.contains('add-button')) {
    openAddCard(document.forms.addCard);
  } else if (evt.target.classList.contains('card__image')) {
    openImagePopup(evt.target);
  };
}

function pageKeyboardListener(evt) {
  if (evt.key === 'Escape') { closePopup(); };
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

initialCards.forEach(item => { cardList.append(new Card(cardTemplateSelector, item.name, item.link).getCard()); });
page.addEventListener('click', pageClickListener);
closePopupButtons.forEach(item => { item.addEventListener('click', closePopup); });
popups.forEach(item => { item.addEventListener('click', evt => { evt.target === evt.currentTarget ? closePopup() : null; }); });
initForm();
