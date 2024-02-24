const { PrivateChat } = require("../models");
const CrudRepository = require("./crud-repository");

class PrivateChatRepository extends CrudRepository{
    constructor()
    {
        super(PrivateChat);
    }
    async getChatsByChatIds(chatIds)
    {
        const chats = await PrivateChat.find({
            _id:chatIds,
        });
        console.log('all private chats  : ',chats);
        return chats;
    }  
}

module.exports = PrivateChatRepository;