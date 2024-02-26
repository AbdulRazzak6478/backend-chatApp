const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  message : {
    type : String
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId
  },
  userName : {
    type : String
  },
  chatId : {
    type : mongoose.Schema.Types.ObjectId,
  }
},{timestamps:true});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;