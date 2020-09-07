export { Api };

class Api {
  constructor(options) {
    this.options = options;
  }

  _sendQuery(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) { return res.json(); }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._sendQuery(`${this.options.baseUrl}/cards`, {
      method: 'GET',
      headers: this.options.headers
    });
  }

  setCard(card) {
    return this._sendQuery(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(card)
    });
  }

  deleteCard(id) {
    return this._sendQuery(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers
    });
  }

  setLike(id) {
    return this._sendQuery(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.options.headers,
    });
  }

  deleteLike(id) {
    return this._sendQuery(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.options.headers
    });
  }

  getUserInfo() {
    return this._sendQuery(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.options.headers
    });
  }

  setUserInfo(info) {
    return this._sendQuery(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify(info)
    });
  }

  setUserAvatar(avatar) {
    return this._sendQuery(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify(avatar)
    });
  }
}
