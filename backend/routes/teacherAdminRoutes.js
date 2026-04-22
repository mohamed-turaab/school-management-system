const express = require('express');
const requireLogin = require('../middleware/authMiddleware');
const {
  addTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');

const router = express.Router();

router.post('/', requireLogin, addTeacher);
router.get('/', requireLogin, getAllTeachers);
router.put('/:id', requireLogin, updateTeacher);
router.delete('/:id', requireLogin, deleteTeacher);

module.exports = router;
