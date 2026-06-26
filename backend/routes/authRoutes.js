const express = require('express');
const { login, register, getMe } = require('../controllers/authController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protectAdmin, getMe);

module.exports = router;
