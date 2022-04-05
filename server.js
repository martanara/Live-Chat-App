const express = require('express');
const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const socket = require('socket.io');
const io = socket(server);

const messages = [];
const users = [];

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => { 
    console.log('Oh, I\'ve got something from ' + socket.id)
    messages.push(message);
    socket.broadcast.emit('message', message);
});
  socket.on('join', ({ name }) => {
    users.push({ name, id: socket.id });
    socket.broadcast.emit('join', name);
  });
  socket.on('disconnect', () => {
    console.log('Socket ' + socket.id + ' has left');
    const found = users.find(user => user.id === socket.id)
    if(found){
      socket.broadcast.emit('removeUser', found.name);
      users.splice(users.indexOf(found), 1)
    }
  });
});

// const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, '/client')));

/*
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
*/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('Page not found...');
});
  
