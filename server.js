var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var dotenv = require('dotenv');

// Connect to database
dotenv.config();
var dbURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017/react-chat";
mongoose.connect(dbURI, {db: {safe: true}});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log('Connected to: ' + dbURI);
});

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

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Get User model
var User = require(__dirname + '/models/User.js');

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log('Listening on port '+ PORT);
  }
});

let users = [];
// Setup socket.io
io.on('connection', socket => {
  console.log('Made connection to ' + socket.id);

  // When client sends a message
  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`);

    // When message received by server, send to everyone else on socket
    socket.broadcast.emit('server:message', data);
  });

  // When user enters room
  socket.on('join', user => {
    users.push(user);
    console.log(users);
    io.emit('server:userlist', users);
    socket.broadcast.emit('server:join', user);
  });

  // When user exits room
  socket.on('leave', user => {
    let index = users.indexOf(user);
    if (index !== -1) {
      users.splice(index, 1);
    }
    console.log(users);
    io.emit('server:userlist', users);
    socket.broadcast.emit('server:leave', user);
  });


});
