const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function onStart() {
  initialCards.forEach(item => { addCard(item.name, item.link); });
  document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);
  document.querySelector('.add-button').addEventListener('click', openAddCardPopup);
  document.querySelectorAll('.popup__close-button').forEach(item => { item.addEventListener('click', evt => { closePopup(evt.target) }) });
  document.querySelector('.edit-profile-popup__submit-button').addEventListener('click', () => { submitEditProfile(); });
  document.querySelector('.add-card-popup__submit-button').addEventListener('click', () => { submitAddCard(); });
  document.querySelector('.add-card-popup__name').addEventListener('keydown', evt => { if (evt.keyCode === 13) { submitAddCard(); } });
  document.querySelector('.add-card-popup__link').addEventListener('keydown', evt => { if (evt.keyCode === 13) { submitAddCard(); } });
}

function addCard(title, imgLink) {
  const cardElement = document.querySelector('#card').content.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = imgLink;
  cardImageElement.alt = title;
  cardImageElement.addEventListener('click', evt => { openImagePopup(evt.target.src, evt.target.parentElement.querySelector('.card__title').textContent); });
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__like-button').addEventListener('click', evt => { evt.target.classList.toggle('card__like-button_active'); });
  cardElement.querySelector('.card__remove-button').addEventListener('click', evt => { evt.target.closest('.card').remove(); });
  document.querySelector('.cards__list').prepend(cardElement);
}

function openPopup(popup) {
  popup.closest('.popup').classList.add('popup_opened');
  popup.closest('.popup').classList.remove('popup_closed');
}

function closePopup(popup) {
  popup.closest('.popup').classList.remove('popup_opened');
  popup.closest('.popup').classList.add('popup_closed');
}

function openEditProfilePopup() {
  const editProfileElement = document.querySelector('.edit-profile-popup');
  editProfileElement.querySelector('.edit-profile-popup__name').value = document.querySelector('.profile__title').textContent;
  editProfileElement.querySelector('.edit-profile-popup__description').value = document.querySelector('.profile__subtitle').textContent;
  openPopup(editProfileElement);
}

function submitEditProfile() {
  document.querySelector('.profile__title').textContent = document.querySelector('.edit-profile-popup__name').value;
  document.querySelector('.profile__subtitle').textContent = document.querySelector('.edit-profile-popup__description').value;
  closePopup(document.querySelector('.edit-profile-popup').closest('.popup'));
}

function openAddCardPopup() {
  const addCardElement = document.querySelector('.add-card-popup');
  addCardElement.querySelector('.add-card-popup__name').value = '';
  addCardElement.querySelector('.add-card-popup__link').value = '';
  openPopup(addCardElement);
}

function submitAddCard() {
  addCard(document.querySelector('.add-card-popup__name').value, document.querySelector('.add-card-popup__link').value);
  closePopup(document.querySelector('.add-card-popup').closest('.popup'));
}

function openImagePopup(imgLink, title) {
  const imageElement = document.querySelector('.image-popup');
  const image = imageElement.querySelector('.image-popup__image')
  image.src = imgLink;
  image.alt = title;
  imageElement.querySelector('.image-popup__title').textContent = title;
  openPopup(imageElement);
}

onStart();
