const { loggedInTeacherTokens } = require('../utils/teacherSession');

function requireTeacherLogin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Please login as a teacher first.' });
  }

  const token = authHeader.split(' ')[1];
  const teacherId = loggedInTeacherTokens.get(token);

  if (!teacherId) {
    return res.status(401).json({ message: 'Invalid or expired teacher token.' });
  }

  req.teacherId = teacherId;
  next();
}

module.exports = requireTeacherLogin;
