const mongoose = require('mongoose');

const privateChatSchema = new mongoose.Schema({
  messages : [
        [
            {
                type:mongoose.Schema.Types.ObjectId,
            },
            {
                type:mongoose.Schema.Types.ObjectId,
            }
        ]
    ],
  users : [
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
});

const PrivateChat = mongoose.model('PrivateChat',privateChatSchema);

module.exports = PrivateChat;