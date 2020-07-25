co,st chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message' , msg => {
  console.log(msg);
});

//submit

chatForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const msg = e.target.element.msg.value;
});
