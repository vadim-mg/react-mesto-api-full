class Api {

  constructor({ token, baseUrl }) {
    this.token = token
    this.baseUrl = baseUrl
  }

  /**
   * Вызов API
   * @param {String} adress - переменная часть адреса запроса
   * @param {String} error - текст ошибки для передачи в Catch, в случае ошибки
   * @param {String} method1, по дефолту GET
   * @param {Object} rest - другие параметры
   * @returns
   */
  _fetch = (adress, error = 'какая-то ошибка', method1 = 'GET', rest) => fetch(
    this.baseUrl + adress,
    {
      method: method1,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    })
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`[${error}] Ошибка запроса: ${res.url} ${res.status}`)
    )


  loadUserInfo = () => this._fetch(
    'users/me',
    'Ошибка загрузки профиля'
  )

  setUserInfo = ({ name, about }) => this._fetch(
    'users/me',
    'Профиль не сохранился',
    'PATCH',
    { name: name, about: about }
  )

  getCardList = () => this._fetch(
    'cards',
    'Ошибка загрузки карточек'
  )

  saveCard = ({ link, name }) => this._fetch(
    'cards',
    'Ошибка сохранения карточки',
    'POST',
    { name: name, link: link }
  )

  deleteCard = id => this._fetch(
    'cards/' + id,
    'Ошибка удаления карточки',
    'DELETE'
  )

  /**
   * Установка - снятие лайка на сервере
   * @param {String} id - карточки
   * @param {Boolean} value: true - поставить лайк, false -снять
   * @returns
   */
  changeLikeCardStatus = (id, value = true) => this._fetch(
    'cards/likes/' + id,
    `Ошибка ${value ? 'установки' : 'снятия'} лайка`,
    value ? 'PUT' : 'DELETE'
  )

  setAvatar = avatar => this._fetch(
    'users/me/avatar',
    'Ошибка утановки аватара',
    'PATCH',
    avatar
  )
}


const api = new Api({
  token: 'd119b3a4-6901-4a18-8871-5024c655ab94',
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/'
})

export default api





