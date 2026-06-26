const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const protectAdmin = require('../middleware/authMiddleware');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `resume${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

router.post('/upload', protectAdmin, upload.single('resume'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  res.json({ success: true, message: 'Resume uploaded', file: `/uploads/${req.file.filename}` });
});

router.get('/', (_req, res) => {
  const files = fs.readdirSync(uploadDir).filter((file) => file.startsWith('resume'));
  res.json({ success: true, files: files.map((file) => `/uploads/${file}`) });
});

module.exports = router;
