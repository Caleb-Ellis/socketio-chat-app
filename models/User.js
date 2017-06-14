var mongoose = require('mongoose');

// Create User model
var userSchema = new mongoose.Schema({
  "username": {type: String, required: true},
  "profilePic": {type: String, default: 'https://raw.githubusercontent.com/Caleb-Ellis/socketio-chat-app/react/src/img/user.png'}
}, {colection: "users"});

module.exports = mongoose.model('User', userSchema);
