require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { authRoutes, routes } = require('./routes/routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', authRoutes); // обработчики на роуты /signin и /signup
app.use(auth);
app.use('/', routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
