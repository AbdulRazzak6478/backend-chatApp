const { Group } = require("../models");
const CrudRepository = require("./crud-repository");

class GroupRepository extends CrudRepository{
    constructor()
    {
        super(Group);
    }
    async getGroupByName(name)
    {
        const group = await Group.find({
            name:name,
        });
        return group;
    }
}

module.exports = GroupRepository;