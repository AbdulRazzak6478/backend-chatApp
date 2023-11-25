const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const { DB, ServerConfig } = require('./config');
const apiRoutes = require('./routes');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:true}));
app.use('/',apiRoutes);

// io.on('connection', (socket) => {
//     console.log('a user connected',socket.id);

//     socket.on('doctor',(arg)=>{
//       console.log('event recieve from client ',arg);
//     })
//     socket.emit('hello','world');
  
//     socket.on('disconnect',()=>{
//       console.log('user Disconnected ',socket.id);
//     })
//   });app.get('/',(req,res)=>{
//     res.send('Hello world')
//   })


server.listen(ServerConfig.PORT,async()=>{
  console.log(`Successfully started the server on PORT:${ServerConfig.PORT}`);
  await DB.DBconnect()
});