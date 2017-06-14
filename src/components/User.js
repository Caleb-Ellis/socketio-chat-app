// Import dependencies
import React from 'react';

class User extends React.Component {
  render() {
    return (
      <div className="userPanel">
        <div className="userProfile">
          <img className="profilePic blueBorder" src={this.props.profilePic} alt=""/><strong id="userText">{this.props.username}</strong>
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
