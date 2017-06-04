// Make connection
const socket = io();

// Query DOM
const message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

// Preload images
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

$(['./img/user.png']).preload();

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
$(btn).click(function() {
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

// Listen for socket events
socket.on('chat', (data) => {
  if (data.handle === '' || data.message === '') {
    return null;
  }
  data.date = new Date(data.date).toLocaleString();
  feedback.innerHTML = '';
  var html = '<li><div class="userData"><img class="profilePic" src="./img/user.png"><strong>' + data.handle
            +'</strong><div class="date">' + data.date
            +'</div></div><div id="output"><p>' + data.message
            +'</p></li>';
  $(html).hide().appendTo('#chatHistory').slideDown(300);
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
