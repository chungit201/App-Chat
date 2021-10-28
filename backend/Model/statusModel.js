import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;
const statusSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  photo: {
    type: Array,
  },
  description: {
    type: String,
    maxLength: 2000,
  },
  like: {
    type: ObjectId,
    ref: 'Like'
  },
  comment: {
    type: ObjectId,
    ref: 'Comments'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Status', statusSchema);
