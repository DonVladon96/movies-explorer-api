const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../utils/errors/Not-found-error-404');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');

router.use(authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Ошибка на сервере'));
});

module.exports = router;
