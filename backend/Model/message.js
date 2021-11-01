import mongoose from 'mongoose';
const messageChema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    content:{
        type:String,
        maxLength:200,
    },
    receiver:{
        type:mongoose.Types.ObjectId,
    },
    replyFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
    },
    
},{timestamp:true});
module.exports = mongoose.model('Message',messageChema);