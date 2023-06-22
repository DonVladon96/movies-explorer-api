const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('./constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(REGEX_URL).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка для создания фильма' }),
    trailerLink: Joi.string().uri().regex(REGEX_URL).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка для создания фильма' }),
    thumbnail: Joi.string().uri().regex(REGEX_URL).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка для создания фильма' }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieDeleteValidation = celebrate({
  params: Joi.object().keys({
    movieID: Joi.string().hex().length(24).required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  createMovieValidation,
  movieDeleteValidation,
  createUserValidation,
  updateUserValidation,
  loginValidation,
};
