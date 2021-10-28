import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;
const likeSchema = new mongoose.Schema({
  user: {
    type: Array,
  },
  status: {
    type: ObjectId,
    ref: 'Status',
    required: true,
  },
  amount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Like', likeSchema);
