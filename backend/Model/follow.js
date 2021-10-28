import mongoose from 'mongoose';
const {
  ObjectId
} = mongoose.Schema;
const followSchema = new mongoose.Schema({
  user:{
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  userFollow: [{
    type: ObjectId,
    ref: 'User',
  }],
  total:{
    type:Number
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Follow', followSchema);
