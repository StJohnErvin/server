const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  data: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
