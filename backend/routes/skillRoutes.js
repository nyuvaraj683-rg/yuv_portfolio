const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getSkills);
router.post('/', protectAdmin, createSkill);
router.put('/:id', protectAdmin, updateSkill);
router.delete('/:id', protectAdmin, deleteSkill);

module.exports = router;
