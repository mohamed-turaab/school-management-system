const Student = require('../models/Student');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function addStudent(req, res) {
  try {
    const { name, email, password, birthDate, age, class: studentClass, presentDays, absentDays } = req.body;

    if (!name || !age || !studentClass) {
      return res.status(400).json({ message: 'Name, age, and class are required.' });
    }

    if (!email || !password || !birthDate) {
      return res.status(400).json({ message: 'Email, password, and birthDate are required for student login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      age,
      class: studentClass,
      joinedAt: new Date(),
      presentDays: presentDays || 0,
      absentDays: absentDays || 0
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student.', error: error.message });
  }
}

async function getAllStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students.', error: error.message });
  }
}

async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student.', error: error.message });
  }
}

async function findStudentPublic(req, res) {
  try {
    const search = req.query.search;

    if (!search) {
      return res.status(400).json({ message: 'Enter student ID, name, or email.' });
    }

    const trimmedSearch = search.trim();
    const query = mongoose.Types.ObjectId.isValid(trimmedSearch)
      ? { _id: trimmedSearch }
      : {
          $or: [
            { name: new RegExp(`^${trimmedSearch}$`, 'i') },
            { email: trimmedSearch.toLowerCase() }
          ]
        };

    const student = await Student.findOne(query);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to find student.', error: error.message });
  }
}

async function updateStudentPublic(req, res) {
  try {
    const search = req.body.search;
    const date = req.body.date || new Date().toISOString().slice(0, 10);
    const attendance = req.body.attendance;
    const workDone = req.body.workDone || '';
    const grade = req.body.grade || '';
    const subject = req.body.subject || '';
    const score = req.body.score;
    const total = req.body.total;

    if (!search) {
      return res.status(400).json({ message: 'Enter student ID, name, or email.' });
    }

    const trimmedSearch = search.trim();
    const query = mongoose.Types.ObjectId.isValid(trimmedSearch)
      ? { _id: trimmedSearch }
      : {
          $or: [
            { name: new RegExp(`^${trimmedSearch}$`, 'i') },
            { email: trimmedSearch.toLowerCase() }
          ]
        };

    const student = await Student.findOne(query);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    if (attendance) {
      const normalizedAttendance = attendance.toLowerCase();
      if (!['present', 'absent'].includes(normalizedAttendance)) {
        return res.status(400).json({ message: 'Attendance must be present or absent.' });
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
    }

    if (grade || subject || score !== undefined || total !== undefined) {
      if (!grade || !subject || score === undefined || total === undefined) {
        return res.status(400).json({ message: 'Grade, subject, score, and total are required for exam results.' });
      }

      student.examResults.push({
        grade,
        subject,
        score: Number(score),
        total: Number(total)
      });
    }

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student information.', error: error.message });
  }
}

async function addExamResult(req, res) {
  try {
    const { search, grade, subject, score, total } = req.body;

    if (!search || !grade || !subject || score === undefined || total === undefined) {
      return res.status(400).json({ message: 'Search, grade, subject, score, and total are required.' });
    }

    const trimmedSearch = search.trim();
    const query = mongoose.Types.ObjectId.isValid(trimmedSearch)
      ? { _id: trimmedSearch }
      : {
          $or: [
            { name: new RegExp(`^${trimmedSearch}$`, 'i') },
            { email: trimmedSearch.toLowerCase() }
          ]
        };

    const student = await Student.findOne(query);

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
}

async function updateStudent(req, res) {
  try {
    const { name, email, password, birthDate, age, class: studentClass, presentDays, absentDays } = req.body;

    const updateData = {
      name,
      email,
      birthDate,
      age,
      class: studentClass,
      presentDays,
      absentDays
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student.', error: error.message });
  }
}

async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student.', error: error.message });
  }
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  findStudentPublic,
  updateStudentPublic,
  addExamResult,
  updateStudent,
  deleteStudent
};
