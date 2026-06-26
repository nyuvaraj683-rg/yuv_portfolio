const express = require('express');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCertificates);
router.post('/', protectAdmin, createCertificate);
router.put('/:id', protectAdmin, updateCertificate);
router.delete('/:id', protectAdmin, deleteCertificate);

module.exports = router;
