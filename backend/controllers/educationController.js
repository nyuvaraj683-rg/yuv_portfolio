const Education = require('../models/Education');

exports.getEducation = async (_req, res, next) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

exports.createEducation = async (req, res, next) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

exports.updateEducation = async (req, res, next) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Education not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Education not found' });
    res.json({ success: true, message: 'Education deleted' });
  } catch (error) {
    next(error);
  }
};
