const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(admin._id);
    res.json({ success: true, token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const existing = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = await Admin.create({ username, password, email });
    const token = signToken(admin._id);
    res.status(201).json({ success: true, token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};
