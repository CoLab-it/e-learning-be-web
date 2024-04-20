const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  number: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('userprofiles', userProfile);
