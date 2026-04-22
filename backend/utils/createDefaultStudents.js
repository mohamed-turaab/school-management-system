const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

async function ensureStudentAccount(filter, data) {
  const existing = await Student.findOne(filter);
  const password = await bcrypt.hash(data.password, 10);

  if (existing) {
    const update = {};

    if (!existing.email && data.email) {
      update.email = data.email;
    }

    if (!existing.password) {
      update.password = password;
    }

    if (!existing.birthDate && data.birthDate) {
      update.birthDate = data.birthDate;
    }

    if (!existing.joinedAt && data.joinedAt) {
      update.joinedAt = data.joinedAt;
    }

    if (Object.keys(update).length > 0) {
      await Student.updateOne({ _id: existing._id }, { $set: update });
    }

    return;
  }

  await Student.create({ ...data, password });
}

async function createDefaultStudents() {
  await ensureStudentAccount(
    { name: 'Mohamed Turaab' },
    {
      name: 'Mohamed Turaab',
      email: 'mohamed@gmail.com',
      password: 'mohamed1',
      birthDate: '2014-03-17',
      joinedAt: '2019-09-02',
      age: 21,
      class: 'f3',
      presentDays: 21,
      absentDays: 2,
      examResults: [
        { grade: 'F3', subject: 'Math', score: 78, total: 100 },
        { grade: 'F3', subject: 'English', score: 81, total: 100 }
      ]
    }
  );

  await ensureStudentAccount(
    { name: 'Ahmed Hassan' },
    {
      name: 'Ahmed Hassan',
      email: 'mohamed2@gmail.com',
      password: 'mohamed2',
      birthDate: '2011-06-09',
      joinedAt: '2018-08-14',
      age: 15,
      class: 'Grade 8',
      presentDays: 22,
      absentDays: 1,
      examResults: [
        { grade: 'Grade 8', subject: 'Math', score: 85, total: 100 },
        { grade: 'Grade 8', subject: 'Science', score: 79, total: 100 }
      ]
    }
  );

  await ensureStudentAccount(
    { name: 'Ayaan Mohamed' },
    {
      name: 'Ayaan Mohamed',
      email: 'mohamed3@gmail.com',
      password: 'mohamed3',
      birthDate: '2012-11-24',
      joinedAt: '2020-01-06',
      age: 14,
      class: 'Grade 7',
      presentDays: 20,
      absentDays: 3,
      examResults: [
        { grade: 'Grade 7', subject: 'Math', score: 74, total: 100 },
        { grade: 'Grade 7', subject: 'History', score: 88, total: 100 }
      ]
    }
  );

  await ensureStudentAccount(
    { name: 'Fatima Ali' },
    {
      name: 'Fatima Ali',
      email: 'mohamed4@gmail.com',
      password: 'mohamed4',
      birthDate: '2010-01-15',
      joinedAt: '2017-09-11',
      age: 16,
      class: 'Grade 9',
      presentDays: 24,
      absentDays: 0,
      examResults: [
        { grade: 'Grade 9', subject: 'Math', score: 91, total: 100 },
        { grade: 'Grade 9', subject: 'English', score: 87, total: 100 }
      ]
    }
  );

  await ensureStudentAccount(
    { name: 'Yusuf Abdullahi' },
    {
      name: 'Yusuf Abdullahi',
      email: 'mohamed5@gmail.com',
      password: 'mohamed5',
      birthDate: '2013-08-30',
      joinedAt: '2021-02-03',
      age: 13,
      class: 'Grade 6',
      presentDays: 18,
      absentDays: 4,
      examResults: [
        { grade: 'Grade 6', subject: 'Math', score: 69, total: 100 },
        { grade: 'Grade 6', subject: 'Geography', score: 76, total: 100 }
      ]
    }
  );
}

module.exports = createDefaultStudents;
