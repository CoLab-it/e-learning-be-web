const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('userprofiles', userProfile);
