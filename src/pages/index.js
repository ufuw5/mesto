import './index.css';

import { initialCards } from '../utils/data.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const cardTemplateSelector = '#card';
const cardContainer = new Section({
  items: initialCards,
  renderer: item => { cardContainer.addItem(getCard(item), true); }
}, '.cards__list');
const imagePopup = new PopupWithImage('#imagePopup');
const addCardPopup = new PopupWithForm(data => {
  cardContainer.addItem(getCard({ name: data.addCardName, link: data.addCardLink }));
}, '#addCardPopup');
const profilePopup = new PopupWithForm(data => {
  userInfo.setUserInfo({ name: data.editProfileName, about: data.editProfileDescription })
}, '#editProfilePopup');
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function getCard(item) {
  return new Card({
    data: item,
    handleCardClick: (name, link) => { imagePopup.open({ name, link }); }
  }, cardTemplateSelector).getCard();
}

function openEditProfile(form) {
  const info = userInfo.getUserInfo();
  form.editProfileName.value = info.name;
  form.editProfileDescription.value = info.about;
  profilePopup.open();
}

function pageClickListener(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    openEditProfile(document.forms.editProfile);
  } else if (evt.target.classList.contains('add-button')) {
    addCardPopup.open();
  };
}

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
cardContainer.renderer();
window.addEventListener('click', pageClickListener);
