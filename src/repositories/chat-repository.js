const { Chat } = require("../models");
const CrudRepository = require("./crud-repository");

class ChatRepository extends CrudRepository{
    constructor()
    {
        super(Chat);
    }
    async getChatByChatId(chatId)
    {
        const chats = await Chat.find({
            chatId:chatId,
        });
        return chats;
    }
    async getChatsByChatIds(msgIds)
    {
        const chats = await Chat.find({
            _id:msgIds,
        });
        console.log('all group chats messages : ',chats);
        return chats;
    }
}

module.exports = ChatRepository;