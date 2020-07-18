const page = document.querySelector('.page');
const cardList = page.querySelector('.cards__list');
const editProfileButton = page.querySelector('.profile__edit-button');
const addCardButton = page.querySelector('.add-button');
const profileTitle = page.querySelector('.profile__title');
const profileSubtitle = page.querySelector('.profile__subtitle');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_nonactive',
  activeButtonClass: 'form__submit_active',
  inputErrorClass: 'form__input_mod-error'
}


function createCard(title, imgLink) {
  const cardElement = document.querySelector('#card').content.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = imgLink;
  cardImageElement.alt = title;
  cardImageElement.addEventListener('click', openImagePopup);
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleCardLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', removeCard);
  return cardElement;
}

function addCard(card) {
  cardList.prepend(card);
}

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

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

function initForm(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  inputList.forEach(inputElement => {
    checkInputValidity(config, form, inputElement);
    toggleButtonState(config, inputList, buttonElement);
  });
  return form;
}

function openEditProfile(form) {
  form.reset();
  form.editProfileName.value = profileTitle.textContent;
  form.editProfileDescription.value = profileSubtitle.textContent;
  openPopup(initForm(form));
}

function submitEditProfile(form) {
  profileTitle.textContent = form.editProfileName.value;
  profileSubtitle.textContent = form.editProfileDescription.value;
  closePopup();
}

function openAddCard(form) {
  form.reset();
  openPopup(initForm(form));
}

function submitAddCard(form) {
  addCard(createCard(form.addCardName.value, form.addCardLink.value));
  closePopup();
}

function openImagePopup(evt) {
  const imgLink = evt.target.src;
  const title = evt.target.closest('.card__container').querySelector('.card__title').textContent;
  const imageElement = document.querySelector('.image-popup');
  const image = imageElement.querySelector('.image-popup__image');
  image.src = imgLink;
  image.alt = title;
  imageElement.querySelector('.image-popup__title').textContent = title;
  openPopup(imageElement);
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

initialCards.forEach(item => { addCard(createCard(item.name, item.link)); });
page.addEventListener('click', pageClickListener);
closePopupButtons.forEach(item => { item.addEventListener('click', closePopup); });
popups.forEach(item => { item.addEventListener('click', evt => { evt.target === evt.currentTarget ? closePopup() : null; }); });
enableValidation(config);
