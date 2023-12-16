const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  content : {
    type : String
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId
  },
  userName : {
    type : String
  },
  chatId : {
    type : String
  }
},{timestamps:true});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;