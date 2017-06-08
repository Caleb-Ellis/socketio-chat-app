'use strict';

var express = require('express');
var router = express.Router();

// Login page
router.get('/', function(req, res) {
  res.render('login');
});

// Chatroom page
router.get('/room', function(req, res) {
  res.render('room');
});

module.exports = router;
