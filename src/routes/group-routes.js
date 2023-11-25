const express = require('express');
const { GroupController } = require('../controllers');
const router = express.Router();

router.post('/',GroupController.createGroup);

router.get('/',GroupController.getGroups)

router.get('/:id',GroupController.getGroup);


router.post('/:id/chats',GroupController.chatMessage);

router.get('/:id/chats',GroupController.getAllGroupChats);


router.delete('/:id',GroupController.deleteGroup);

router.patch('/',GroupController.updateGroup);



module.exports = router;
