class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }


  signUp = (email, password) => fetch(`${this._baseUrl}/signup`,
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.ok
      ? response.json()
      : response.text().then(text => Promise.reject(text))
    )


  signIn = (email, password) => fetch(`${this._baseUrl}/signin`,
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.ok
      ? response.json()
      : response.text().then(text => Promise.reject(text))
    )
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        return data
      } else
        return
    })


  signOut = () => {
    localStorage.removeItem('token')
  }


  checkToken = () => localStorage.getItem('token')
    ? fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.ok
        ? response.json()
        : response.text().then(text => Promise.reject(text))
      )
      .catch(err => err)
    : Promise.reject(err => 'Токен не найден')
}

const auth = new Auth('https://auth.nomoreparties.co')
export default auth
