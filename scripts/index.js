const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.add-button');
const editProfilePopup = document.querySelector('.edit-profile-popup');
const editProfilePopupName = editProfilePopup.querySelector('.edit-profile-popup__name');
const editProfilePopupdescription = editProfilePopup.querySelector('.edit-profile-popup__description');
const cardList = document.querySelector('.cards__list');
const addCardPopup = document.querySelector('.add-card-popup');
const addCardPopupName = addCardPopup.querySelector('.add-card-popup__name');
const addCardPopuplink = addCardPopup.querySelector('.add-card-popup__link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closePopupButtons = document.querySelectorAll('.popup__close-button');


function addCard(title, imgLink) {
  const cardElement = document.querySelector('#card').content.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = imgLink;
  cardImageElement.alt = title;
  cardImageElement.addEventListener('click', evt => { openImagePopup(evt.target.src, evt.target.closest('.card__container').querySelector('.card__title').textContent); });
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleCardLike);
  cardElement.querySelector('.card__remove-button').addEventListener('click', removeCard);
  cardList.prepend(cardElement);
}

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function removeCard(evt) {
  evt.target.closest('.card').remove();
}

function openPopup(popup) {
  const popupParent = popup.closest('.popup');
  popupParent.classList.add('popup_opened');
  popupParent.classList.remove('popup_closed');
}

function closePopup(popup) {
  const popupParent = popup.closest('.popup');
  popupParent.classList.remove('popup_opened');
  popupParent.classList.add('popup_closed');
}

function openEditProfilePopup() {
  editProfilePopupName.value = profileTitle.textContent;
  editProfilePopupdescription.value = profileSubtitle.textContent;
  openPopup(editProfilePopup);
}

function submitEditProfile() {
  profileTitle.textContent = editProfilePopupName.value;
  profileSubtitle.textContent = editProfilePopupdescription.value;
  closePopup(editProfilePopup);
}

function openAddCardPopup() {
  addCardPopupName.value = '';
  addCardPopuplink.value = '';
  openPopup(addCardPopup);
}

function submitAddCard() {
  addCard(addCardPopupName.value, addCardPopuplink.value);
  closePopup(addCardPopup);
}

function openImagePopup(imgLink, title) {
  const imageElement = document.querySelector('.image-popup');
  const image = imageElement.querySelector('.image-popup__image');
  image.src = imgLink;
  image.alt = title;
  imageElement.querySelector('.image-popup__title').textContent = title;
  openPopup(imageElement);
}

initialCards.forEach(item => { addCard(item.name, item.link); });
editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
editProfilePopup.addEventListener('submit', evt => {
  evt.preventDefault();
  submitEditProfile();
});
addCardPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  submitAddCard();
});
closePopupButtons.forEach(item => { item.addEventListener('click', evt => { closePopup(evt.target) }) });
