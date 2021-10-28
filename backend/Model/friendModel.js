import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;
const friendSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  friends: {
    type: Array,
  },
  status: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Friend', friendSchema);
