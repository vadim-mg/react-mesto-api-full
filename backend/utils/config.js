const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = {
  secretKey: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
