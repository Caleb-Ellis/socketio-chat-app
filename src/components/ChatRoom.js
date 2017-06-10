
// Import dependencies
import React from 'react';
import '../styles/ChatRoom.css';

import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    this.socket = io('http://localhost:8080', { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  componentDidMount() {
    // Auto-focus on input text
    document.getElementById("input-text").focus();
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
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
