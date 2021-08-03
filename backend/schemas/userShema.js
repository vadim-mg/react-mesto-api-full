const { Joi } = require('celebrate');
const { urlPattern } = require('../utils/regExpressions');

// Схемы валидации для разных маршрутов
const userSchema = {
  id: {
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  },
  profile: {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  },
  avatar: {
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(new RegExp(urlPattern)),
    }),
  },
  authData: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(new RegExp(urlPattern)),
    }),
  },
};

module.exports = userSchema;
