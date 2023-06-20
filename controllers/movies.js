const { Error } = require('mongoose');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError404,
} = require('../utils/errors');

const Movie = require('../modeles/movie');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  BadRequestMessage,
  MovieForbiddenMessage,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((newMovie) => res.status(HTTP_STATUS_CREATED).send(newMovie))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(BadRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  const { movieID } = req.params;
  return Movie.findById(movieID)
    .orFail(() => {
      throw new NotFoundError404('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne({ _id: movieID })
          .then(res.status(HTTP_STATUS_OK).send(movie))
          .catch(next);
      } else {
        next(new ForbiddenError(MovieForbiddenMessage));
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(BadRequestMessage));
      } else {
        next(err);
      }
    });
};
