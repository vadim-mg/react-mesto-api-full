const Card = require('../models/card');
const Error400 = require('../errors/error-400');
const Error403 = require('../errors/error-403');
const Error404 = require('../errors/error-404');

const getCards = (req, res, next) => Card.find({})
  .populate({
    path: 'owner',
    model: 'User',
  })
  .populate({
    path: 'likes',
    model: 'User',
  })
  .then((cards) => res.send({ data: cards }))
  .catch(next);

const createCard = (req, res, next) => {
  const newCard = req.body;
  newCard.owner = req.user._id;
  Card.create(newCard)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400('Не корректные входные данные '));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(() => new Error('NotFound'))
  .then((card) => {
    if (String(card.owner._id) !== String(req.user._id)) {
      return Promise.reject(new Error('noAccessRights'));
    }
    return Card.findByIdAndDelete(card._id)
      .then((c) => res.send({ data: c }));
  })
  .catch((err) => {
    if (err.message === 'NotFound') {
      return next(new Error404('Картока с указанным _id не найдена'));
    }
    if (err.name === 'CastError') {
      return next(new Error400('Переданны не корректные данные'));
    }
    if (err.message === 'noAccessRights') {
      return next(new Error403('Не достаточно прав доступа'));
    }
    return next(err);
  });

const likeCard = (req, res, next) => {
  let updateObject = {};
  switch (req.method) {
    case 'PUT':
      updateObject = { $addToSet: { likes: req.user._id } };
      break;
    case 'DELETE':
      updateObject = { $pull: { likes: req.user._id } };
      break;
    default:
      return next(new Error('не верный метод'));
  }
  return Card.findByIdAndUpdate(req.params.cardId,
    updateObject,
    { new: true })
    .orFail(() => new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new Error404('Картока с указанным _id не найдена'));
      } if (err.name === 'CastError') {
        return next(new Error400('переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
};
