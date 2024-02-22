const { GroupRepository, UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { ServerConfig } = require('../config');
const { Auth } = require('../utils/common');
const groupRepository = new GroupRepository();
const userRepository = new UserRepository();


async function createGroup (data){
    try {
        const user = await userRepository.get(data.admins);
        data.isPersonal = data.isPersonal == 1 ? true : false;
        // data.admins = data.userId;
        // data.users = data.userId;
        console.log('user details : ',user);
        console.log('data payload : ',data);
        const group = await groupRepository.create(data);
        // add group id into admin profile
        // userDetails.tweets.push(tweet.id);
        // userDetails.save();
        // user.groups.push(data.admin);
        // await user.save();
        // userDetails.replies.pull(tweet.id);
        // userDetails.save();
        // await user.save()

        // add group id into all members profile
        group.users.map(async(id,index)=>{
            const user = await userRepository.get(id);
            console.log('group user : ',user);
            user.groups.push(group.id);
            await user.save();
        });


        console.log('group details : ',group);
        return group;
    } catch (error) {
        console.log('group service create group error :',error);
        throw new AppError(`not able to create a group , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getGroup(id){
    try {
        const group = await groupRepository.get(id);
        console.log('group details : ',group);
        return group;
    } catch (error) {
        console.log('group service get group error :',error);
        throw new AppError(`not able to get a group details , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getGroupsByIds(idsArr){
    try {
        const groups = await groupRepository.getGroupByIds(idsArr);
        console.log('group details : ',groups);
        return groups;
    } catch (error) {
        console.log('group service get group error :',error);
        throw new AppError(`not able to get a group details , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getGroups(){
    try {
        const groups = await groupRepository.getAll();
        console.log('groups details : ',groups);
        return groups;
    } catch (error) {
        console.log('group service get group error :',error);
        throw new AppError(`not able to get a group details , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function deleteGroup(id){
    try {
        const group = await groupRepository.delete(id);
        console.log('group details : ',group);
        return group;
    } catch (error) {
        console.log('group service delete group error :',error);
        throw new AppError(`not able to get a group details , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateGroup(data){
    try {
        data.isPersonal = data.isPersonal == 1 ? true : false;
        const group = await groupRepository.update(data.id,data);
        console.log('group details : ',group);
        return group;
    } catch (error) {
        console.log('group service delete group error :',error);
        throw new AppError(`not able to get a group details , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createGroup,
    getGroups,
    getGroup,
    deleteGroup,
    updateGroup,
    getGroupsByIds
}