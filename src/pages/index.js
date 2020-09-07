import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const cardTemplateSelector = '#card';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: 'c791e527-e4b7-4175-8eba-6e62f06389ee',
    'Content-Type': 'application/json'
  }
});
const imagePopup = new PopupWithImage('#imagePopup');
const addCardPopup = new PopupWithForm((data, closeFunction) => {
  api.setCard(data)
    .then(card => { cardContainer.addItem(getCard(card)); })
    .then(closeFunction)
    .catch(err => { console.log(err); });
}, '#addCardPopup');
const profilePopup = new PopupWithForm((data, closeFunction) => {
  api.setUserInfo(data)
    .then(info => { userInfo.setUserInfo(info) })
    .then(closeFunction)
    .catch(err => { console.log(err); });
}, '#editProfilePopup');
const profileAvatarPopup = new PopupWithForm((data, closeFunction) => {
  api.setUserAvatar(data)
    .then(info => { userInfo.setUserInfo(info) })
    .then(closeFunction)
    .catch(err => { console.log(err); });
}, '#editProfileAvatarPopup');
const deleteCardPopup = new PopupWithForm(() => { }, '#deleteCardPopup');
const userInfo = new UserInfo({
  handleEdit: () => { openEditProfile(); },
  handleEditAvatar: () => { profileAvatarPopup.open(); }
}, '#profile');

let cardContainer;

function getCard(item) {
  const id = userInfo.getUserInfo().id;
  item.like = item.likes.some(item => item._id === id);
  return new Card({
    data: item,
    handleImageClick: (name, link) => { imagePopup.open({ name, link }); },
    handleRemove: item.owner._id === id ? (id, removeFunction) => {
      deleteCardPopup.setSubmitCallback((data, closeFunction) => {
        api.deleteCard(id)
          .then(removeFunction)
          .then(closeFunction)
          .catch(err => { console.log(err); });
      });
      deleteCardPopup.open();
    } : null,
    handleToggleLike: (id, like) => like ? api.deleteLike(id) : api.setLike(id)
  }, cardTemplateSelector).get();
}

function openEditProfile() {
  const info = userInfo.getUserInfo();
  const form = document.forms.editProfile;
  form.name.value = info.name;
  form.about.value = info.about;
  profilePopup.open();
}

function pageClickListener(evt) {
  if (evt.target.classList.contains('add-button')) {
    addCardPopup.open();
  };
}

function initCardContainer(initialCards) {
  cardContainer = new Section({
    items: initialCards,
    renderer: item => { cardContainer.addItem(getCard(item), true); }
  }, '.cards__list');
  cardContainer.renderer();
}

api.getInitialCards()
  .then(initialCards => { initCardContainer(initialCards); })
  .catch(err => { console.log(err); });
api.getUserInfo()
  .then(info => { userInfo.setUserInfo(info) })
  .catch(err => { console.log(err); });
window.addEventListener('click', pageClickListener);
