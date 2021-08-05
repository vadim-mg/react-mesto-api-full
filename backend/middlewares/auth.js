const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Error401 = require('../errors/error-401');
const config = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Error401('Необходима авторизация!'));
  }

  const payload = jwt.verify(token, config.secretKey);

  return User.findById(payload._id, 'name email avatar about')
    .then((user) => {
      if (user) {
        req.user = user;
        return next();
      }
      res.clearCookie('jwt');
      throw new Error401('Этот пользователь больше не существует');
    })
    .catch(next);
};
