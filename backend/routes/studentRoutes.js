const express = require('express');
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  addExamResult,
  deleteStudent
} = require('../controllers/studentController');
const requireLogin = require('../middleware/authMiddleware');
const requireStudentLogin = require('../middleware/studentAuthMiddleware');

const router = express.Router();

router.get('/me', requireStudentLogin, async (req, res) => {
  try {
    const Student = require('../models/Student');
    const student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load student.', error: error.message });
  }
});

router.post('/me/attendance', requireStudentLogin, async (req, res) => {
  try {
    const Student = require('../models/Student');
    const { attendance, workDone = '', date = new Date().toISOString().slice(0, 10) } = req.body;

    if (!attendance) {
      return res.status(400).json({ message: 'Attendance is required.' });
    }

    const normalizedAttendance = attendance.toLowerCase();

    if (!['present', 'absent'].includes(normalizedAttendance)) {
      return res.status(400).json({ message: 'Attendance must be present or absent.' });
    }

    const student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    student.dailyEntries.push({
      date,
      attendance: normalizedAttendance,
      workDone
    });

    if (normalizedAttendance === 'present') {
      student.presentDays += 1;
    } else {
      student.absentDays += 1;
    }

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save attendance.', error: error.message });
  }
});

router.post('/', requireLogin, addStudent);
router.get('/', requireLogin, getAllStudents);
router.post('/:id/exam', requireLogin, addExamResult);
router.get('/:id', requireLogin, getStudentById);
router.put('/:id', requireLogin, updateStudent);
router.delete('/:id', requireLogin, deleteStudent);

module.exports = router;
