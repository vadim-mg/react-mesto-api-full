const DEVELOPMENT_ALLOWED_CORS = "['http://localhost:3001', 'https://localhost:3001']";
const DEVELOPMENT_SECRET = 'dev-secret';

module.exports = {
  secretKey: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : DEVELOPMENT_SECRET,
  allowedCors: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_CORS : DEVELOPMENT_ALLOWED_CORS,
  port: 3000,
  dataBase: 'mongodb://localhost:27017/mestodb',
};
