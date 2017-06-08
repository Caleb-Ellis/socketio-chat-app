'use strict';

// Set app dependencies
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var socket = require('socket.io');

// Set app components
var routes = require('./app/routes');

// Set port number
var PORT = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', routes);

// Start server
var server = app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});

// Socket setup and pass server
var io = socket(server);
// Chatroom namespace
io.on('connection', function(socket) {
  console.log('Made socket connection ' + socket.id );
  socket.broadcast.emit('connected', socket.id);

  // Handle chat event
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });

  // Handle disconnect
  socket.on('disconnect', function() {
    console.log(socket.id + ' disconnected');
    socket.broadcast.emit('disconnected', socket.id);
  });
});
