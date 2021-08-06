class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }


  signUp = (email, password) => fetch(`${this._baseUrl}/signup`,
    {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.ok
      ? response.json()
      : response.text().then(text => Promise.reject(text)))


  signOut = () => fetch(`${this._baseUrl}/signout`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    })
    .then(response => response.ok
      ? response.json()
      : response.text().then(text => Promise.reject(text)))

}

const auth = new Auth('http://localhost:3000')
export default auth
