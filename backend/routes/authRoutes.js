const express = require('express');
const { loginAdmin, loginStudent, loginTeacher, getTeacherProfile } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/student-login', loginStudent);
router.post('/teacher-login', loginTeacher);
router.get('/teacher/me', getTeacherProfile);

module.exports = router;
