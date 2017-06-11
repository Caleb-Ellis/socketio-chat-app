
// Import dependencies
import React from 'react';
import '../styles/ChatRoom.css';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

let socket = io.connect();

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    // Bind 'this' to event handlers - React ES6 does not do this by default
    this.sendHandler = this.sendHandler.bind(this);
    this.leaveEmit = this.leaveEmit.bind(this);

    // Listen for messages from the server
    socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  leaveEmit() {
    socket.emit('leave', this.props.username);
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
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
    // Allow unmount on page close/refresh
    window.removeEventListener('beforeunload', () => {
      this.leaveEmit()
    });
  }

  render() {
    return (
      <div className="mainWrapper">
        <div className="title">
          <h2>Chatroom</h2>
          <i id="leaveBtn" className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </div>
        <ChatHistory messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatRoom.defaultProps = {
  username: 'Anonymous'
};

export default ChatRoom;
