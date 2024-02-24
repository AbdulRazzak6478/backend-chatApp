const mongoose = require('mongoose');

const privateChatSchema = new mongoose.Schema({
  messages : [
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
    userNames : [
        {
            type:mongoose.Schema.Types.String,
        }
    ],
  users : [
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ], 
});

const PrivateChat = mongoose.model('PrivateChat',privateChatSchema);

module.exports = PrivateChat;
