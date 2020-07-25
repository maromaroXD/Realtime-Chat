const path          = require('path');
const http          = require('http');
const express       = require('express');
const socketio      = require('socket.io');
const app           = express();
const server        = http.createServer(app);
const io            = socketio(server);
const formatMessage = require('./utils/msj');
const {  userOnJoin, getCurrentUser ,
         userOnLeave, getRoomUsers } = require('./utils/users');
const Bot           = 'Server Bot';
//Te static folder :
app.use(express.static(path.join(__dirname , 'public')));

//RUN when a client connect
 io.on('connection', socket => {
   console.log('New connection');
   socket.on('joinRoom' , (cnt) => {
     const user = userOnJoin(socket.id , cnt.username , cnt.room);
     socket.join(user.room);
     socket.emit('message', formatMessage(Bot ,'Welcome To Game&Chat'));
     //Broadcast when new connection
     socket.broadcast.to(user.room).emit('message' ,
                      formatMessage(Bot,`${cnt.username} has joined the chat.`));

     io.to(cnt.room).emit('roomUsers', {
       room  : cnt.room,
       users : getRoomUsers(cnt.room)
     })

     socket.on('disconnect' , () => {
          userOnLeave(socket.id);
          io.to(cnt.room).emit('message' , formatMessage(Bot , `${cnt.username} has left the chat.`));
          io.to(cnt.room).emit('roomUsers', {
            room  : cnt.room,
            users : getRoomUsers(cnt.room)
          })
     });
   });

   //Listen for chat
   socket.on('chatMessage' , (msg) => {
     const user = getCurrentUser(socket.id);
     io.to(user.room).emit('message' , formatMessage(user.username, msg.text));
   });

   //Broadcast when disconnection


 });

const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`));
