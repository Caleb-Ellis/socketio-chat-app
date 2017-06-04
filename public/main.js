// Make connection
const socket = io();

// Query DOM
const message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    date: Date.now()
  });
  message.value = "";
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', (data) => {
  if (data.message === '') {
    return null;
  }
  data.date = new Date(data.date).toLocaleString();
  feedback.innerHTML = '';
  chatHistory.innerHTML += '<li><div id="userData"><strong>'
                            + data.handle
                            + '</strong><div class="date">'
                            + data.date
                            +'</div></div>'
                            +'<div id="output"><p>'
                            + data.message
                            + '</p></li>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
