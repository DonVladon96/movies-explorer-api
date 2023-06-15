const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../modeles/user');
const { NotFoundError404, ConflictError, BadRequestError } = require('../utils/errors');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const NewUserObj = user.toObject();
        delete NewUserObj.password;
        res.status(HTTP_STATUS_CREATED).send(NewUserObj);
      })
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          next(new BadRequestError('При регистрации были введены некорректные данные'));
        } else if (err.code === 11000) {
          next(new ConflictError('Пользователь уже существует'));
        } else {
          next(err);
        }
      });
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError404('Пользователь не найден');
    })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError404('Пользователь не найден');
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('User is not found');
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};
