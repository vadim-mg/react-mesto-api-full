const { NODE_ENV, JWT_SECRET, ALLOWED_CORS } = process.env;
module.exports = {
  secretKey: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  allowedCors: NODE_ENV === 'production' ? ALLOWED_CORS : [
    'http://localhost:3001',
    'https://localhost:3001',
  ],
};
