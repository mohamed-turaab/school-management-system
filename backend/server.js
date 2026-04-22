const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const teacherAdminRoutes = require('./routes/teacherAdminRoutes');
const createDefaultAdmin = require('./utils/createDefaultAdmin');
const createDefaultStudents = require('./utils/createDefaultStudents');
const createDefaultTeacher = require('./utils/createDefaultTeacher');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/teachers', teacherAdminRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_management';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await createDefaultAdmin();
    await createDefaultTeacher();
    await createDefaultStudents();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
