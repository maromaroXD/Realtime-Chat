const users = [];

//Join user to chat

const userOnJoin = (id , username , room ) => {
  const user = {id , username , room};
  users.push(user);
  return user;
}

//Get Current user
const getCurrentUser = (id) => {
  return users.find(user => id === user.id);
}

//on Leave
const userOnLeave = (id) => {
  const index  = users.findIndex(user => user.id === id);
  if(index != -1) {
    users.splice(index , 1);
  }
}

//room users
const getRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}
module.exports = {
  userOnJoin,
  getCurrentUser,
  userOnLeave,
  getRoomUsers
}
