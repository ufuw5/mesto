export { UserInfo };

class UserInfo {
  constructor({ handleEdit, handleEditAvatar }, profileSelector) {
    this._profileElement = document.querySelector(profileSelector);
    this._handleEdit = handleEdit;
    this._handleEditAvatar = handleEditAvatar;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._profileElement.querySelector('.profile__avatar-button').addEventListener('click', this._handleEditAvatar);
    this._profileElement.querySelector('.profile__edit-button').addEventListener('click', this._handleEdit);
  }

  _renderer() {
    this._profileElement.querySelector('.profile__title').textContent = this._name;
    this._profileElement.querySelector('.profile__subtitle').textContent = this._about;
    this._profileElement.querySelector('.profile__avatar-image').src = this._avatar;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      id: this._id
    };
  }

  setUserInfo({ name = this._name, about = this._about, avatar = this._avatar, _id = this._id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    this._renderer();
  }
}
