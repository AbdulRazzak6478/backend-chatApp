const { UserRepository } = require('../repositories');
const { User } = require('../models')
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { ServerConfig } = require('../config');
const { Auth } = require('../utils/common');
const userRepository = new UserRepository();


async function signup(data)
{
    try {
        const user = await userRepository.create(data);
        console.log('user created :',user);
        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Cannot SignUp the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function signIn(data)
{
    try {
        // get user by email to check its present or not
        const user = await userRepository.getUserByEmail(data.email);
        console.log('user details : ',user.length);
        console.log('user details : ',user[0]);
        const encryptedPassword = user[0]?.password;
        if(user.length == 0)
        {
            throw new AppError(`No user found `,StatusCodes.BAD_REQUEST)
        }
        // compare password
        if(!Auth.checkPassword(data.password,encryptedPassword))
        {
            throw new AppError(`incorrect password `,StatusCodes.BAD_REQUEST)
        }
        const input = {
            id : user[0].id,
            email : user[0].email
        }
        const token = Auth.createToken(input);
        return {user,token};
        // return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Not able to signin the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    } 
}

async function getAllUsers()
{
    try {
        const users = await userRepository.getAll();
        console.log('users : ',users);

        return users;
    } catch (error) {
        console.log('user service getAll users  error :',error);
        throw new AppError(`Not able to get the users , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports = {
    signup,
    signIn,
    getAllUsers,
}