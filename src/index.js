const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const { DB, ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const users=[{}];

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:true}));
app.use('/',apiRoutes);
app.use(cors()); 

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

 

    socket.on('joined',({groupid})=>{
      // users[socket.id]=chatUserId;
      // console.log('users array : ',users);
      console.log(groupid,' has joined');
      socket.join(groupid);
      socket.broadcast.emit('userJoined',{user:groupid,message:`${groupid} has joined`});
    })
    socket.emit('welcome',{user:'Admin',message : 'welcome to the chat'});

    socket.on('user-message',(data)=>{
      console.log('chat message object from client : ',data);
      socket.join(data.groupid);
      io.to(data.groupid).emit('message-received',{...data});
      // socket.emit('message-received',data);
    })
    socket.on('client',(msg)=>{
      console.log('Client : ',msg,' is connected')
    });

    socket.on('disconnect',()=>{
      console.log('user Disconnected ',socket.id);
    });
    // socket.emit('welcome',{user:'Admin',message:'Welcome to Chat'});
  //   socket.on('joined',(user)=>{
  //     users[socket.id] = user;
  //     console.log(`${user} have joined`,users[socket.id]);
  //     console.log('users socket id array : ',users)
  //     socket.emit('welcome',{user,message : 'welcome to the chat'});
  //     // socket.broadcast.emit('user joined',{user,message:'user has joined'});
  //   })
  //   socket.on('join_room',(data)=>{
  //   console.log('joining room ',data.groupid);
  //   socket.join(data.groupid);
  // });
  // socket.on('hello',(args)=>{
  //   console.log('emit : hello ,',args);
  // })
  //   socket.on('chat',(args)=>{
  //     console.log('chat data from client : ',args);
  //     socket.join(args.groupid);
  //     io.to(args.groupid).emit('msg_rcvd',{...args});
  //   })
 
  //   socket.on('disconnect',()=>{
  //     console.log('user Disconnected ',socket.id);
  //   });
  });
  // app.get('/',(req,res)=>{
  //   res.send('Hello world');
  // })


server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT:${ServerConfig.PORT}`);
  await DB.DBconnect()
});