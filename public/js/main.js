const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

//Username and Room
const { username , room } = Qs.parse(location.search,{
  ignoreQueryPrefix : true
});

console.log(username , room);

//Join room

socket.emit('joinRoom' ,{username , room});

//Message from server
socket.on('message' , msg => {
  console.log(msg);
  outputMsg(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Update Connected Users
socket.on('roomUsers' , RoomInfo => {
  document.getElementById('room-name').textContent = RoomInfo.room;
  document.getElementById('users').innerHTML = "";
  for(let i=0 ; i < RoomInfo.users.length ; i++)
  {
    let li = document.createElement('li');
    li.innerHTML =`${RoomInfo.users[i].username}`;
    document.getElementById('users').appendChild(li);
  }
});

//submit

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = {
    text : e.target.elements.msg.value,
    name : username
  };
  //Emit the message to the server
  socket.emit('chatMessage' , msg);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

const outputMsg = (msg) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.name}<span> ${msg.time}</span></p>
    <p class="text">
      ${msg.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
};
