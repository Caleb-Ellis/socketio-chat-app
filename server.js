'use strict';

// Set app dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const socket = require('socket.io');

// Set app components
//const routes = require('./app/routes');
//const session = require('./app/session');
//const passport = require('./app/auth');
//const ioServer = require('./app/socket')(app);

// App setup
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
