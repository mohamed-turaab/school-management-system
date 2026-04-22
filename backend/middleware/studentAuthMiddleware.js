const { loggedInStudentTokens } = require('../utils/studentSession');

function requireStudentLogin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Please login as a student first.' });
  }

  const token = authHeader.split(' ')[1];
  const studentId = loggedInStudentTokens.get(token);

  if (!studentId) {
    return res.status(401).json({ message: 'Invalid or expired student token.' });
  }

  req.studentId = studentId;
  next();
}

module.exports = requireStudentLogin;
