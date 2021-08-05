const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');
const Error400 = require('../errors/error-400');
const Error409 = require('../errors/error-409');
const Error404 = require('../errors/error-404');

const getUser = (req, res, next) => User
  .findById(req.params.userId, 'name email avatar about')
  .orFail(() => {
    throw new Error('NotFound');
  })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new Error400('Переданны не корректные данные'));
    }
    if (err.message === 'NotFound') {
      return next(new Error404('Пользователь по указанному _id не найден'));
    }
    return next(err);
  });

const getCurrentUser = (req, res) => {
  req.params.userId = req.user._id;
  getUser(req, res);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const createUser = (req, res, next) => User.create(req.body)
  .then((user) => res.send({ userId: user._id }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new Error400('Не корректно указан email или пароль'));
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return next(new Error409('Пользователь с указанным email уже зарегистрирован!'));
    }
    return next(err);
  });

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, select: 'name email avatar about' })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new Error400('Переданы некорректные данные при обновления профиля'));
      }
      if (err.message === 'NotFound') {
        return next(new Error404('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, select: 'name email avatar about' })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new Error400('Переданы некорректные данные при обновления аватара'));
      }
      if (err.message === 'NotFound') {
        return next(new Error404('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Токен удалён' });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.secretKey, { expiresIn: '7d' });
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Вы авторизовались' });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  login,
  logout,
};
