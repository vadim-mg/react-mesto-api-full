// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;
class Error404 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = Error404;
