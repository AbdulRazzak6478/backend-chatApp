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
    async getGroupByIds(IdsArr)
    {
        const group = await Group.find({
            _id:IdsArr,
        });
        console.log('group array :',group);
        return group;
    }
}

module.exports = GroupRepository;