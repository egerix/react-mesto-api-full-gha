const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (err) {
    next(err);
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    if (!payload) {
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (err) {
    next(err);
    return;
  }

  req.user = payload;

  next();
};
