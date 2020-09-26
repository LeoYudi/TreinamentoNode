const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  slug: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Link', LinkSchema);