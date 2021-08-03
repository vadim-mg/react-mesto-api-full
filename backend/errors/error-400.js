// ошибка валидации
// 400 — переданы некорректные данные в метод создания карточки,
// пользователя, обновления аватара пользователя и профиля
class Error400 extends Error {
  constructor(message = 'Некорректные входные данные') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = Error400;
