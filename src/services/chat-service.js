const { ChatRepository, UserRepository, GroupRepository, PrivateChatRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const chatRepository = new ChatRepository();
const userRepository = new UserRepository();
const groupRepository = new GroupRepository();
const privateChatRepository = new PrivateChatRepository();

async function createChatMessage(groupId,data)
{
    try {
        console.log('groupId : ',groupId);
        console.log('data from request : ',data);
        const user = await userRepository.get(data.userId);
        console.log('user details ',user);
        data.userName = user.name;
        data.chatId = groupId;
        console.log('message payload',data);

        const group = await groupRepository.get(groupId);
        console.log('group details : ',group);
        
        const message = await chatRepository.create(data);
        console.log('chat message : ',message);

        user.messages.push(message?.id);
        await user.save();

        group.messages.push(message.id);
        await group.save();

        return message;
    } catch (error) {
        console.log('chat service create message error :',error);
        throw new AppError(`not able to create a message or chat  , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function createPrivateChatMessage(chatId,data)
{
    try {
        console.log('chatId : ',chatId);
        console.log('data from request : ',data);
        const user = await userRepository.get(data.userId);
        console.log('user details ',user);
        data.userName = user.name;
        data.chatId = chatId;
        console.log('message payload',data);

        const chat = await privateChatRepository.get(chatId);
        console.log('group details : ',chat);
        
        const message = await chatRepository.create(data);
        console.log('chat message : ',message);

        user.messages.push(message?.id);
        await user.save();

        chat.messages.push([message?.id,user.id]);
        await chat.save();

        return message;
    } catch (error) {
        console.log('chat service create message error :',error);
        throw new AppError(`not able to create a message or chat  , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllGroupChats(chatId){
    try {
        console.log('chat id : ',chatId);
        const chats = await chatRepository.getChatByChatId(chatId);
        // const chats = await chatRepository.getAll();
        console.log('group chats : ',chats);
        return chats;
    } catch (error) {
        console.log('error in getting group chats , from chat service getAllGroupChats',error);
    }
}

module.exports = {
    createChatMessage,
    getAllGroupChats,
    createPrivateChatMessage
}
