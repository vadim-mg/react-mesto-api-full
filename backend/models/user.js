const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Error401 = require('../errors/error-401');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: (v) => validator.isURL(v),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => validator.isEmail(v),
    select: false,
  },
  password: {
    type: String,
    required: true,
    // в чек-листе сказано: Поле password не ограничено в длину, так как пароль хранится в виде хеша
    // minlength: 8,
    select: false,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    return bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        return next();
      })
      .catch(next);
  }
  return next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const errorMessage = 'Неправильные почта или пароль';
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error401(errorMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error401(errorMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
