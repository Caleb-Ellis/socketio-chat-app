// Import dependencies
import React from 'react';
import $ from 'jquery';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.slideHandler = this.slideHandler.bind(this);
  }

  slideHandler() {
    $('#userListPanel').toggleClass('show hide');
    $('#slider').toggleClass('fa-angle-left fa-angle-right');
    $('.chatWrapper').toggleClass('center left');
  }

  render() {
    return (
      <div id="userListPanel" className="show">
        <div id="topRightPanel">
          <div id="userProfile">
            <img className="profile-pic whiteBorder" src={this.props.profilePic} alt=""/><strong>{this.props.username}</strong>
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
