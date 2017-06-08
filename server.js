'use strict';

// Set app dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const socket = require('socket.io');

// Set app components
const routes = require('./app/routes');

// Set port number
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', routes);

const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Socket setup and pass server
const io = socket(server);
io.on('connection', (socket) => {
  console.log(`Made socket connection ${ socket.id }`);

  // Handle chat event
  socket.on('chat', (data) => io.sockets.emit('chat', data));

  // Handle typing event
  socket.on('typing', (data) => socket.broadcast.emit('typing', data));
});
