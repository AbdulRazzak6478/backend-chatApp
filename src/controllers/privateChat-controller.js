const { PrivateChatService, ChatService  } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createPrivateChat(req, res){
    try {
        req.body.users = req.body.users.split(',');
        console.log("data payload : ",req.body);
        const response = await PrivateChatService.createPrivateChat(req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('privateChat controller getGroups error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getPrivateChats(req, res){
    try {
        const response = await PrivateChatService.getPrivateChats();
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller get Private Chat error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getPrivateChat(req, res){
    try {
        const response = await PrivateChatService.getPrivateChat(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller get Private Chat error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function deletePrivateChat(req, res){
    try {
        const response = await PrivateChatService.deletePrivateChat(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller delete Private Chat error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function chatMessage(req, res){
    try {
        console.log('message data : ',req.body);
        const response = await ChatService.createPrivateChatMessage(req.params.id,req.body);
        console.log('message response : ',response);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('private chat controller create message error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getAllPrivateChats(req, res){
    try {
        console.log('message data : ',req.body);
        const response = await ChatService.getAllGroupChats(req.params.id);
        console.log('message response : ',response);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller get private chats message error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = { 
    createPrivateChat,
    getPrivateChats,
    getPrivateChat,
    deletePrivateChat,
    chatMessage,
    getAllPrivateChats
}