const express = require('express');
const { createMessage, getMessages } = require('../controllers/contactController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createMessage);
router.get('/', protectAdmin, getMessages);

module.exports = router;
