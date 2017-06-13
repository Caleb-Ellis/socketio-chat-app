// Import dependencies
import React from 'react';

class User extends React.Component {
  render() {
    return (
      <div className='userInfo'>
        <div>
          <img className='profilePic' src={this.props.profilePic} alt=''/>
        </div>
        <div className='username'>
          { this.props.username }
        </div>
      </div>
    );
  }
}

User.defaultProps = {
  username: '',
  profilePic: 'https://raw.githubusercontent.com/Caleb-Ellis/socketio-chat-app/react/src/img/user.png'
};

export default User;
