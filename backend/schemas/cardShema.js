const { Joi } = require('celebrate');
const { urlPattern } = require('../utils/regExpressions');

// Схемы валидации для разных маршрутов
const cardSchema = {
  card: {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(new RegExp(urlPattern)),
    }),
  },
  id: {
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  },
};

module.exports = cardSchema;
