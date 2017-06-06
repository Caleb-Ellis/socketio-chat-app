// Make connection
const socket = io();

// Query DOM
const message = document.getElementById('message');
    handle = document.getElementById('handle'),
    sendBtn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

// Preload images
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
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

// Listen for socket events
socket.on('chat', (data) => {
  if (data.handle === '' || data.message === '') {
    return null;
  }
  let html;
  data.date = new Date(data.date).toLocaleString();
  feedback.innerHTML = '';
  if (data.handle === handle.value) {
    html = '<li><div class="userData"><img class="profilePic greenBorder" src="./img/me.jpg"><strong>' + data.handle
          +'</strong><div class="date">' + data.date
          +'</div></div><div id="outputSelf"><p>' + data.message
          +'</p></div></li>';
  } else {
    html = '<li><div class="userData alignRight"><div class="date">' + data.date
          +'</div><strong>' + data.handle + '</strong><img class="profilePic blueBorder" src="./img/me2.jpg">'
          +'</div><div id="outputOther"><p>' + data.message
          +'</p></div></li>';
  }
  $(html).hide().appendTo('#chatHistory').slideDown(200);
  $("#chatWindow").animate({ scrollTop: $('#chatWindow')[0].scrollHeight}, 1000);
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
