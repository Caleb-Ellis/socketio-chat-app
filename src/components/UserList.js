// Import dependencies
import React from 'react';
import $ from 'jquery';
import { CSSTransitionGroup } from 'react-transition-group';

import User from './User';


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

  componentDidMount() {
    // Animate user panel coming out on mount
    setTimeout( () => $('#userListPanel').toggleClass('show hide'), 100);
  }

  componentDidUpdate() {
    // If there is a new user in the state, scroll to bottom of list
    const objDiv = document.getElementById('userList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // TODO: Loop through all users in the state and create a User component
    const users = this.props.users.map((user, i) => {
      return (
        <User
          key={i}
          username={user} />
      );
    });

    return (
      <div id="userListPanel" className="hide">
        <div id="topRightPanel">
          <div className="userProfile">
            <img className="profilePic whiteBorder" src={this.props.profilePic} alt=""/><strong id="myText">{this.props.username}</strong>
          </div>
        </div>
        <div id="usersWindow">
          <div id="userList">
            <CSSTransitionGroup
              transitionName="userlist-slide"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}>
                { users }
            </CSSTransitionGroup>
          </div>
          <i onClick={this.slideHandler} id="slider" className="fa fa-angle-left fa-lg" aria-hidden="true"></i>
        </div>
      </div>
    );
  }

}

UserList.defaultProps = {
};

export default UserList;
