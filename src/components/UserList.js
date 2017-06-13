// Import dependencies
import React from 'react';
import $ from 'jquery';

//import User from './User';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.slideHandler = this.slideHandler.bind(this);
  }

  slideHandler() {
    // Slides user list behind/out of main chat window
    $('#userListPanel').toggleClass('show hide');
    $('#slider').toggleClass('fa-angle-left fa-angle-right');
    $('.chatWrapper').toggleClass('center left');
  }

  componentDidUpdate() {
    // If there is a new user in the state, scroll to bottom of list
    const objDiv = document.getElementById('userList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // TODO: Loop through all users in the state and create a User component


    return (
      <div id="userListPanel" className="show">
        <div id="topRightPanel">
          <div id="userProfile">
            <img className="profilePic whiteBorder" src={this.props.profilePic} alt=""/><strong>{this.props.username}</strong>
          </div>
        </div>
        <div id="usersWindow">
          <ul id="userList"></ul>
          <div id="windowSlider">
            <i onClick={this.slideHandler} id="slider" className="fa fa-angle-left fa-lg" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }

}

UserList.defaultProps = {
};

export default UserList;
