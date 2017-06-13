// Import dependencies
import React from 'react';

class Message extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'fromMe' : 'fromOther';

    return (
      <div>
        <div className={`message ${fromMe}`}>
          <div className='userInfo'>
            <div>
              <img className='profilePic' src={this.props.profilePic} alt=''/>
            </div>
            <div className='username'>
              { this.props.username }
            </div>
            <div className='date'>
              { this.props.date }
            </div>
          </div>
          <div className='messageBody'>
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
  profilePic: 'https://raw.githubusercontent.com/Caleb-Ellis/socketio-chat-app/react/src/img/user.png',
  fromMe: false
};

export default Message;
