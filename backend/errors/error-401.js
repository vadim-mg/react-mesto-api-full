// 401 — передан неверный логин или пароль.
// Ещё эту ошибку возвращает авторизационный мидлвэр, если передан неверный JWT
class Error401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Error401;
