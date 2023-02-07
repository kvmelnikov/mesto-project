export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    initialUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    deleteCardApi(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    addLikeCardApi(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    deleteLikeCardApi(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    addCardQuery(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    updateAvatarQuery(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    sendEditUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => {
            return this._checkResponse(res)
        });
    }

}