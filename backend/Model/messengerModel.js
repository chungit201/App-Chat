import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;
const messageSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: Object
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Messenger', messageSchema);
