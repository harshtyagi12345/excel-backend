const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  data: Array, // parsed JSON from Excel
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upload', uploadSchema);
