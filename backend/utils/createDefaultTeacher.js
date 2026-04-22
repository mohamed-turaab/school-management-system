const bcrypt = require('bcryptjs');
const Teacher = require('../models/Teacher');

async function createDefaultTeacher() {
  const email = process.env.TEACHER_EMAIL || 'teacher@gmail.com';
  const password = process.env.TEACHER_PASSWORD || 'teacher123';

  const existingTeacher = await Teacher.findOne({ email });

  if (existingTeacher) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Teacher.create({
    name: 'Default Teacher',
    email,
    password: hashedPassword,
    subject: 'General Studies',
    phone: ''
  });

  console.log(`Default teacher created: ${email}`);
}

module.exports = createDefaultTeacher;
