const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const ErrorUnauthorized = require('../utils/errors/Unauthorized-error-401');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (mail) => validator.isEmail(mail),
        message: 'Некорректный URL адрес',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длинна поля - 2 символа.'],
      maxlength: [30, 'Максимальная длинна поля - 30 символов.'],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
