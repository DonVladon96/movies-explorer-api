require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DB_ADDRESS, PORT } = require('./utils/config');

mongoose.set('strictQuery', false);
mongoose.connect(DB_ADDRESS).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to database.');
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Error connecting to database:', error);
});

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(errors());
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Go on ${PORT}`);
});
