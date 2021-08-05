require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./utils/config');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authRoutes, routes } = require('./routes/routes');
const { cors } = require('./middlewares/cors');

const app = express();
app.use(cors);

app.use(helmet());
app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(config.dataBase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use('/', authRoutes); // обработчики на роуты /signin и /signup
app.use(auth);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${config.port}`);
});
