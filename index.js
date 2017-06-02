'use strict';

const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Static files
app.use(express.static('public'));

// Socket setup and pass server
const io = socket(server);
io.on('connection', (socket) => {
  console.log(`Made socket connection ${ socket.id }`);

  // Handle chat event
  socket.on('chat', (data) => io.sockets.emit('chat', data));

  // Handle typing event
  socket.on('typing', (data) => socket.broadcast.emit('typing', data));
});
