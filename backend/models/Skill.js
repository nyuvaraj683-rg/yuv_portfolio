const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: 'general' },
    icon: { type: String, default: 'fa-solid fa-star' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
