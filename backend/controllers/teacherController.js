const bcrypt = require('bcryptjs');
const Teacher = require('../models/Teacher');

async function addTeacher(req, res) {
  try {
    const { name, email, password, subject, phone = '' } = req.body;

    if (!name || !email || !password || !subject) {
      return res.status(400).json({ message: 'Name, email, password, and subject are required.' });
    }

    const existingTeacher = await Teacher.findOne({ email: email.toLowerCase() });

    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      subject,
      phone,
      joinedAt: new Date()
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add teacher.', error: error.message });
  }
}

async function getAllTeachers(req, res) {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teachers.', error: error.message });
  }
}

async function updateTeacher(req, res) {
  try {
    const { name, email, password, subject, phone } = req.body;
    const updateData = { name, email, subject, phone };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update teacher.', error: error.message });
  }
}

async function deleteTeacher(req, res) {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete teacher.', error: error.message });
  }
}

module.exports = {
  addTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher
};
