const express = require('express');
const { PrivateChatController } = require('../controllers');
const router = express.Router();

router.post('/',PrivateChatController.createPrivateChat);

router.get('/',PrivateChatController.getPrivateChats);

router.get('/:id',PrivateChatController.getPrivateChat);

router.post('/:id',PrivateChatController.chatMessage);

router.get('/:id/chat',PrivateChatController.getAllPrivateChats);

router.delete('/:id',PrivateChatController.deletePrivateChat);



module.exports = router;
