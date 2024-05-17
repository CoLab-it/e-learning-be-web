const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'user',
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  likedCourse: {
    type: [mongoose.Types.ObjectId],
  },
});

module.exports = mongoose.model('User', userSchema);
