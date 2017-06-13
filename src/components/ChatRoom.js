
// Import dependencies
import React from 'react';
import '../styles/ChatRoom.css';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import UserList from './UserList';

let socket = io.connect();

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

    // Bind 'this' to event handlers - React ES6 does not do this by default
    this.sendHandler = this.sendHandler.bind(this);
    this.leaveEmit = this.leaveEmit.bind(this);


    // SOCKET FUNCTIONS
    // Listen for messages from the server
    socket.on('server:message', message => {
      this.addMessage(message);
    });

    // Listen for users typing
    socket.on('server:typing', data => {
      document.getElementById('feedback').innerHTML='<p><em>'+data+' is typing...</em></p>';
    });

    // Listen for users joining
    socket.on('server:join', data => {
      document.getElementById('feedback').innerHTML='<p><em>'+data+' has entered the room ('+new Date(Date.now()).toLocaleString()+')</em></p>';
    });

    // Listen for users leaving
    socket.on('server:leave', data => {
      document.getElementById('feedback').innerHTML='<p><em>'+data+' has left the room ('+new Date(Date.now()).toLocaleString()+')</em></p>';
    });
  }

  leaveEmit() {
    socket.emit('leave', this.props.username);
  }

  sendHandler(message) {
    let date = new Date(Date.now()).toLocaleString();
    const messageObject = {
      username: this.props.username,
      message,
      date: date
    };

    // Emit the message to the server
    socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  componentDidMount() {
    // Auto-focus on input text
    document.getElementById("input-text").focus();

    // Emit join message
    socket.emit('join', this.props.username);

    // Allow unmount on page close/refresh
    window.addEventListener('beforeunload', () => {
      this.leaveEmit()
    });
  }

  componentWillUnmount() {
    this.leaveEmit();
    // Allow unmount on page close/refresh
    window.removeEventListener('beforeunload', () => {
      this.leaveEmit()
    });
  }

  render() {
    return (
      <div className="chatWrapper left">
        <div className="mainWrapper">
          <div className="title">
            <h2 id="roomTitle">Chatroom</h2>
          <i onClick={this.props.leaveHandler} id="leaveBtn" className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </div>
        <ChatHistory
          messages={this.state.messages} />
        <div id="feedback"></div>
        <ChatInput
          onSend={this.sendHandler} />
        </div>
        <UserList
          username={this.props.username}
          profilePic={this.props.profilePic} />
      </div>
    );
  }

}
ChatRoom.defaultProps = {
  username: 'Anonymous',
  profilePic: 'https://raw.githubusercontent.com/Caleb-Ellis/socketio-chat-app/react/src/img/user.png'
};

export default ChatRoom;
