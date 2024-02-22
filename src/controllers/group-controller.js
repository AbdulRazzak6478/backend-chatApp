const { GroupService, ChatService  } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createGroup(req, res){
    try {
        let users = req.body.users.split(',');
        console.log('users : ',users);
        const data = {
            name : req.body.name,
            isPersonal : req.body.isPersonal,
            admins : req.body.admin,
            users : users,
            // messages : req.body.messages
        };
        console.log('data : ',data);
        const response = await GroupService.createGroup(data);
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log('group controller createGroup error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getGroup(req, res){
    try {
        const response = await GroupService.getGroup(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller getGroup error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getGroups(req, res){
    try {
        const response = await GroupService.getGroups();
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller getGroups error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getGroupsByIds(req, res){
    try {
       
        const idsArr = req.body.ids
        console.log('group ids req :',req.body.ids);
        console.log('group ids :',idsArr);
        const response = await GroupService.getGroupsByIds(idsArr);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller getGroups error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function deleteGroup(req, res){
    try {
        const response = await GroupService.deleteGroup(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller deleteGroup error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function updateGroup(req, res){
    try {
        console.log(' data : ',req.body);
        const response = await GroupService.updateGroup(req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller deleteGroup error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function chatMessage(req, res){
    try {
        console.log('message data : ',req.body);
        const response = await ChatService.createChatMessage(req.params.id,req.body);
        console.log('message response : ',response);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller create message error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllGroupChats(req, res){
    try {
        console.log('message data : ',req.body);
        const response = await ChatService.getAllGroupChats(req.params.id);
        console.log('message response : ',response);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('group controller get group chats message error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    createGroup,
    getGroups,
    getGroup,
    deleteGroup,
    updateGroup,
    chatMessage,
    getAllGroupChats,
    getGroupsByIds
}