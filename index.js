var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var port = 4000;
var server = app.listen(port, function() {
  console.log('Listening to port ' + port);
});

// Static files
app.use(express.static('public'));

// Socket setup and pass server
var io = socket(server);
io.on('connection', (socket) => {
  console.log('Made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  })
});
