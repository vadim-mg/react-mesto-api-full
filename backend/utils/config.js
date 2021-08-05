const {
  NODE_ENV, JWT_SECRET, ALLOWED_CORS, PORT = 3000,
} = process.env;
module.exports = {
  secretKey: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  allowedCors: NODE_ENV === 'production' ? ALLOWED_CORS : [
    'http://localhost:3001',
    'https://localhost:3001',
  ],
  port: PORT,
  dataBase: 'mongodb://localhost:27017/mestodb',
};
