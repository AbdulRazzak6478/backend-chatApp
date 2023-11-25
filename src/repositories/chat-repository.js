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
}

module.exports = ChatRepository;