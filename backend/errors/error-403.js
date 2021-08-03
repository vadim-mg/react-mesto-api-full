// 403 — попытка удалить чужую карточку;
class Error403 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Error403;
