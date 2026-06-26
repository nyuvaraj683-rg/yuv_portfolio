const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
