const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const app       = express();
const server    = http.createServer(app);
const io        = socketio(server);

//Te static folder :
app.use(express.static(path.join(__dirname , 'public')));

//RUN when a client connect
 io.on('connection', socket => {
   console.log('New connection');

   socket.emit('message', 'Welcome To our App');

   //Broadcast when new connection
   socket.broadcast.emit('message' , 'A user has joined the chat.');
   //Broadcast when disconnection
   socket.on('disconnect' , () => {
     io.emit('message' , 'A user has left the chat');
   });
 });

const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`));
