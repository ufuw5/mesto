let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__name');
let inputDescription = document.querySelector('.popup__description');
let titleProfile = document.querySelector('.profile__title');
let subtitleProfile = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = titleProfile.textContent;
  inputDescription.value = subtitleProfile.textContent;
}

function save() {
  titleProfile.textContent = inputName.value;
  subtitleProfile.textContent = inputDescription.value;
  close();
}

function close() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', close);
saveButton.addEventListener('click', save);
