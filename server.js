var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});

// Setup socket.io
io.on('connection', socket => {

  // Log chat messages
  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`);

    // When message received by server, send to everyone else on socket
    socket.broadcast.emit('server:message', data);
  });

  // Log when user enters room
  socket.on('join', data => {
    console.log(`${data} has entered the room`)
  });

  // Log when user exits room
  socket.on('leave', data => {
    console.log(`${data} has left the room`)
  });
});
