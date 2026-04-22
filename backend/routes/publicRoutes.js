const express = require('express');
const { findStudentPublic, getStudentById, updateStudentPublic } = require('../controllers/studentController');

const router = express.Router();

router.get('/student', findStudentPublic);
router.post('/student', updateStudentPublic);
router.get('/students/:id', getStudentById);

module.exports = router;
