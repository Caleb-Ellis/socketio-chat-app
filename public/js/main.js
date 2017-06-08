// Make connection
var socket = io();

// Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    sendBtn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

var users = [
  {
    firstName: 'Caleb',
    lastName: 'Ellis',
    profilePic: './img/me.jpg'
  },
  {
    firstName: 'Carolina',
    lastName: 'Fonseca',
    profilePic: './img/carol.jpg'
  },
  {
    firstName: 'Sara',
    lastName: 'Fonseca',
    profilePic: './img/sara.jpg'
  },
  {
    firstName: 'Nathan',
    lastName: 'Hawes',
    profilePic: './img/nathan.jpg'
  }
]

// Preload images
function preload(arrayOfImages) {
    $(arrayOfImages).each(function() {
        $('<img/>')[0].src = this;
    });
}
preload(['./img/user.png']);

// Emit events
function emitMessage() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    date: Date.now()
  });
  message.value = "";
};

function emitTyping() {
  socket.emit('typing', handle.value);
};

// jQuery events
$(sendBtn).click(function() {
  emitMessage();
});

$(message).keypress(function(key) {
  // If enter is pressed, emit message
  if (key.which === 13) {
    emitMessage();
    return false;
  } else {
    emitTyping();
  }
});

$('#slider').click(function() {
  $('#rightPanel').toggleClass('shrink');
  $('#slider').toggleClass('fa-angle-left fa-angle-right');
});

$('#leaveBtn').click(function() {
  window.location.href = '/';
});

// Listen for socket events
socket.on('chat', function(data) {
  if (data.handle === '' || data.message === '') {
    return null;
  }
  var html;
  data.date = new Date(data.date).toLocaleString();
  feedback.innerHTML = '';
  if (data.handle === handle.value) {
    html = '<li><div class="userData"><img class="profilePic greenBorder" src="./img/me.jpg"><strong>' + data.handle
          +'</strong><div class="date">' + data.date
          +'</div></div><div id="outputSelf"><p>' + data.message
          +'</p></div></li>';
  } else {
    html = '<li><div class="userData alignRight"><div class="date">' + data.date
          +'</div><strong>' + data.handle + '</strong><img class="profilePic blueBorder" src="./img/carol.jpg">'
          +'</div><div id="outputOther"><p>' + data.message
          +'</p></div></li>';
  }
  $(html).hide().appendTo('#chatHistory').slideDown({duration: 300, easing: 'easeOutQuart'});
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

socket.on('connected', function(data) {
  var html = '<p><em>' + data + ' has joined the room</em></p>';
  $(html).appendTo('#chatHistory');
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

socket.on('disconnected', function(data) {
  var html = '<p><em>' + data + ' has left the room</em></p>';
  $(html).appendTo('#chatHistory');
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

function loadUsers() {
  users.sort(function(a, b){
    var nameA=a.firstName.toLowerCase(), nameB=b.firstName.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB)
      return 1;
    return 0;
  });
  var html = '';
  for (var i=0; i<users.length; i++) {
    html += '<li class="user"><img class="profilePic whiteBorder" src='+users[i].profilePic+'><strong>'+users[i].firstName+' '+users[i].lastName+'</strong></li>'
  }
  $(html).appendTo('#userList');
}
$(document).ready(function() {
  loadUsers();
});
