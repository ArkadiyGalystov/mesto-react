class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //получим информацию о пользователе
  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData)
  }

  //обновим информацию пользователя
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData)
  }

  //обновим аватар пользователя
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._getResponseData)
  }

  //получим карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData)
  }

  //добавим новую карточку
  addCards(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData)
  }

  //удалим карточку
  removeCardApi(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  // поставим лайк карточке
  addCardLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  // удалим лайк с карточки
  removeCardLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData)
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '66d4ecb9-cab0-4156-b439-f15da17be6f0',
    'Content-Type': 'application/json',
  },
});

export { api };

