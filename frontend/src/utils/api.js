import {apiConfig, authConfig} from "./config";

class Api {

  constructor({url}) {
    this._url = url;
    this._token = '';
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _getConfigWithAuth(config) {
    if (!config) {
      config = {}
    }
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.authorization = 'Bearer ' + localStorage.getItem(authConfig.tokenStorageName);
    return config;
  }

  _makeRequest(path, config) {
    const configWithAuth = this._getConfigWithAuth(config)
    return fetch(`${this._url}/${path}`, configWithAuth)
      .then(this._handleResponse);
  }

  getUserInfo() {
    return this._makeRequest('users/me')
  }

  getCards() {
    return this._makeRequest('cards')
  }

  updateUserInfo({name, about}) {
    return this._makeRequest('users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  addCard({name, link}) {
    return this._makeRequest('cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  removeCard(cardId) {
    return this._makeRequest(`cards/${cardId}`, {
      method: 'DELETE',
    })
  }

  like(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, {
      method: 'PUT',
    })
  }

  dislike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, {
      method: 'DELETE',
    })
  }

  changeLikeCardStatus(cardId, like) {
    if (like) {
      return this.like(cardId)
    } else {
      return this.dislike(cardId)
    }
  }

  updateAvatar({avatar}) {
    return this._makeRequest('users/me/avatar ', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
  }

}

const api = new Api(apiConfig)

export {
  api,
}
