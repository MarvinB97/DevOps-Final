const JWT = require('jsonwebtoken');
const config = require('../config/config');

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    const decoded = JWT.verify(token.split(' ')[1], config.jwtSecret);
    req.user = decoded;
    next();
    return true;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = auth;
