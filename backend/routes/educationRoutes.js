const express = require('express');
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getEducation);
router.post('/', protectAdmin, createEducation);
router.put('/:id', protectAdmin, updateEducation);
router.delete('/:id', protectAdmin, deleteEducation);

module.exports = router;
