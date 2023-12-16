const express = require('express');

const router = express.Router();
const groupRoutes = require('./group-routes.js')
const privateChatRoutes = require('./privateChat-routes.js')
const { InfoController, UserController } = require('../controllers/index.js');

router.use('/groups',groupRoutes);

router.use('/chats',privateChatRoutes);

router.get('/info',InfoController.info);

router.post('/register',UserController.signup);

router.post('/signin',UserController.signIn);

router.get('/users',UserController.getAllUsers);

router.get('/users/:id',UserController.getUser);

module.exports = router;

