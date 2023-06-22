const authRouter = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../utils/celebrate');

authRouter.post('/signup', createUserValidation, createUser);
authRouter.post('/signin', loginValidation, login);

module.exports = authRouter;
