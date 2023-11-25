const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required : true,
    },
    name:{
        type:String,
    }, 
    profileImg:{
        type:String
    }, 
    bio:{
        type:String
    },
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
});

userSchema.pre('save',function(next){
    const user = this;
    const saltRounds = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = encryptedPassword;
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;