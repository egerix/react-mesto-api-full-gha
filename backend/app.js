require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { routes } = require('./routes');
const { handleError } = require('./middlewares/handleErrors');
const config = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const limiter = rateLimit(config.limiter);

const app = express();

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
