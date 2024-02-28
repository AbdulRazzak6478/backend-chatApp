const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const { DB, ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { ChatService } = require('./services');

const users=[{}];


  // client   ==== server

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:true}));
app.use('/',apiRoutes);
app.use(cors()); 

io.on('connection', async (socket) => {
    console.log('a user connected',socket.id);
    socket.on('joined',({groupid})=>{
      console.log(groupid,' has joined');
      socket.join(groupid);
      socket.broadcast.emit('userJoined',{groupid,message:`${groupid} has joined`});
    })
    socket.emit('welcome',{user:'Admin',message : 'welcome to the chat'});

    socket.on('user-message',async(data)=>{
      console.log('chat message object from client : ',data);
      
      socket.join(data.chatId); // create group

      const dataPayload = {
        message : data.message,
        userId : data.userId,
        chatId : data.chatId,
        userName : data.userName,
      }
      data.createdAt = new Date();
      if(data.isGroup)
      {
        console.log('group chatting');
        
        const groupMessage = await ChatService.createChatMessage(dataPayload.chatId,dataPayload);
        console.log('chat message created in group : ',groupMessage);
        // io.to(data.chatId).emit('message-received',{groupMessage});
      }else {
        console.log('end to end user chat, chatting');
        const privateChat = await ChatService.createPrivateChatMessage(dataPayload.chatId,dataPayload);
        console.log('chat message created in privateChat : ',privateChat);
      }
      
      io.to(data.chatId).emit('message-received',{...data});
      // socket.emit('message-received',data);
    })
    socket.on('client',(msg)=>{
      console.log('Client : ',msg,' is connected')
    });

    socket.on('disconnect',()=>{
      console.log('user Disconnected ',socket.id);
    });
  }
);


server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT:${ServerConfig.PORT}`);
  await DB.DBconnect()
});