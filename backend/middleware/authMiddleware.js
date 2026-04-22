const { loggedInTokens } = require('../utils/simpleSession');

function requireLogin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Please login first.' });
  }

  const token = authHeader.split(' ')[1];

  if (!loggedInTokens.has(token)) {
    return res.status(401).json({ message: 'Invalid or expired login token.' });
  }

  next();
}

module.exports = requireLogin;
