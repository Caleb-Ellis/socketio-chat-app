// Import dependencies
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // If there is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            username={message.username}
            message={message.message}
            date={message.date}
            fromMe={message.fromMe} />
        );
      });

    return (
      <div className='messages' id='messageList'>
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
            { messages }
        </CSSTransitionGroup>
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
