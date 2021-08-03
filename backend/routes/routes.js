const authRoutes = require('express').Router(); // маршруты для авторизации и регистрации
const routes = require('express').Router(); // все остальные маршруты для авторизованных пользователей

const { celebrate } = require('celebrate');
const userSchema = require('../schemas/userShema');

const { logout, login, createUser } = require('../controllers/users');
const Error404 = require('../errors/error-404');

// маршруты для авторизации и регистрации
authRoutes.post('/signin', logout, celebrate(userSchema.authData), login);
authRoutes.post('/signup', logout, celebrate(userSchema.authData), createUser);

// все остальные маршруты для авторизованных пользователей
routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.use('/', (req, res, next) => next(new Error404('Был запрошен не существующий роут')));

module.exports = {
  authRoutes,
  routes,
};
