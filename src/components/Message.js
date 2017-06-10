// Import dependencies
import React from 'react';

class Message extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : 'from-other';

    return (
      <div>
        <div className={`message ${fromMe}`}>
          <div className='user-info'>
            <div>
              <img className='profile-pic' src={require('../img/user.png')} alt=''/>
            </div>
            <div className='username'>
              { this.props.username }
            </div>
            <div className='date'>
              { new Date(Date.now()).toLocaleString() }
            </div>
          </div>
          <div className='message-body'>
            { this.props.message }
          </div>
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;
