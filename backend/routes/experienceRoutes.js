const express = require('express');
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getExperiences);
router.post('/', protectAdmin, createExperience);
router.put('/:id', protectAdmin, updateExperience);
router.delete('/:id', protectAdmin, deleteExperience);

module.exports = router;
