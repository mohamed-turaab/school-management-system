const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { loggedInTokens } = require('../utils/simpleSession');
const Student = require('../models/Student');
const { loggedInStudentTokens } = require('../utils/studentSession');
const Teacher = require('../models/Teacher');
const { loggedInTeacherTokens } = require('../utils/teacherSession');

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = crypto.randomBytes(24).toString('hex');
    loggedInTokens.add(token);

    res.status(200).json({
      message: 'Login successful.',
      token,
      admin: {
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
}

module.exports = {
  loginAdmin,
  loginStudent: async function loginStudent(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const student = await Student.findOne({ email: email.toLowerCase() });

      if (!student || !student.password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, student.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = crypto.randomBytes(24).toString('hex');
      loggedInStudentTokens.set(token, student._id.toString());

      res.status(200).json({
        message: 'Student login successful.',
        token,
        student: {
          id: student._id,
          name: student.name,
          email: student.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Student login failed.', error: error.message });
    }
  },
  loginTeacher: async function loginTeacher(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const teacher = await Teacher.findOne({ email: email.toLowerCase() });

      if (!teacher || !teacher.password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, teacher.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = crypto.randomBytes(24).toString('hex');
      loggedInTeacherTokens.set(token, teacher._id.toString());

      res.status(200).json({
        message: 'Teacher login successful.',
        token,
        teacher: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Teacher login failed.', error: error.message });
    }
  },
  getTeacherProfile: async function getTeacherProfile(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Please login as a teacher first.' });
      }

      const token = authHeader.split(' ')[1];
      const teacherId = loggedInTeacherTokens.get(token);

      if (!teacherId) {
        return res.status(401).json({ message: 'Invalid or expired teacher token.' });
      }

      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found.' });
      }

      res.status(200).json({
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        phone: teacher.phone,
        joinedAt: teacher.joinedAt
      });
    } catch (error) {
      res.status(500).json({ message: 'Could not load teacher profile.', error: error.message });
    }
  }
};
