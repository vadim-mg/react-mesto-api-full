module.exports = (err, req, res, next) => {
  const { statusCode } = err;
  let { message } = err;

  if (statusCode === 500) {
    message = `На сервере произошла ошибка: ${message}`;
  }

  res.status(statusCode).send({ message });

  next();
};
