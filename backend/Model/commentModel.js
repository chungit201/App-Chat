import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: ObjectId,
    ref: 'Status',
    required: true,
  },
  content: {
    type: String,
    maxLength: 1000
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('Comments', commentSchema);
