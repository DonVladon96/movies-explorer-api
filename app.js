const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const { endpoint } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
require('dotenv').config();

mongoose.connect(endpoint).then(() => {
  console.log('Connected to database.');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(errors());
app.use(errorMiddlewares);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening server on ${PORT} port`);
});
