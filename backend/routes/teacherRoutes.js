const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const requireTeacherLogin = require('../middleware/teacherAuthMiddleware');
const { getTeacherProfile } = require('../controllers/authController');

const router = express.Router();

function findStudentQuery(search) {
  const trimmedSearch = search.trim();

  return mongoose.Types.ObjectId.isValid(trimmedSearch)
    ? { _id: trimmedSearch }
    : {
        $or: [
          { name: new RegExp(`^${trimmedSearch}$`, 'i') },
          { email: trimmedSearch.toLowerCase() }
        ]
      };
}

router.get('/me', requireTeacherLogin, getTeacherProfile);

router.get('/students', requireTeacherLogin, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load students.', error: error.message });
  }
});

router.post('/students/:search/attendance', requireTeacherLogin, async (req, res) => {
  try {
    const { search } = req.params;
    const { attendance, date = new Date().toISOString().slice(0, 10), workDone = '' } = req.body;

    if (!attendance) {
      return res.status(400).json({ message: 'Attendance is required.' });
    }

    const normalizedAttendance = attendance.toLowerCase();
    if (!['present', 'absent'].includes(normalizedAttendance)) {
      return res.status(400).json({ message: 'Attendance must be present or absent.' });
    }

    const student = await Student.findOne(findStudentQuery(search));

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    student.dailyEntries.push({ date, attendance: normalizedAttendance, workDone });
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

router.post('/students/:search/exam', requireTeacherLogin, async (req, res) => {
  try {
    const { search } = req.params;
    const { grade, subject, score, total } = req.body;

    if (!grade || !subject || score === undefined || total === undefined) {
      return res.status(400).json({ message: 'Grade, subject, score, and total are required.' });
    }

    const student = await Student.findOne(findStudentQuery(search));

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    student.examResults.push({
      grade,
      subject,
      score: Number(score),
      total: Number(total)
    });

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add exam result.', error: error.message });
  }
});

router.delete('/students/:search', requireTeacherLogin, async (req, res) => {
  try {
    const { search } = req.params;
    const student = await Student.findOneAndDelete(findStudentQuery(search));

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student.', error: error.message });
  }
});

module.exports = router;
