const { User } = require("../models");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository{
    constructor()
    {
        super(User);
    }
    async getUserByEmail(email)
    {
        const user = await User.find({
            email:email,
        });
        return user;
    }
}

module.exports = UserRepository;