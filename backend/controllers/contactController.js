const ContactMessage = require('../models/ContactMessage');

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message saved successfully', data: newMessage });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (_req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};
