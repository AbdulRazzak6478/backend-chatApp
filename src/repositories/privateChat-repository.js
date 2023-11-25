const { PrivateChat } = require("../models");
const CrudRepository = require("./crud-repository");

class PrivateChatRepository extends CrudRepository{
    constructor()
    {
        super(PrivateChat);
    }
    async getChatByChatId(chatId)
    {
        const chats = await PrivateChat.find({
            chatId:chatId,
        });
        return chats;
    }
}

module.exports = PrivateChatRepository;