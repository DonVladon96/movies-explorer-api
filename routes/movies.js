const movieRouter = require('express').Router();
const {
  getMovies,
  createMovies,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, movieDeleteValidation } = require('../utils/celebrate');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovies);
movieRouter.delete('/:movieID', movieDeleteValidation, deleteMovie);

module.exports = movieRouter;
