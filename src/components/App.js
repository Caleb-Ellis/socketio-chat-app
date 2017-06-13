// Import dependencies
import React from 'react';
import ChatRoom from './ChatRoom';
import '../styles/App.css';
import '../styles/Login.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

    // Bind 'this' to event handlers - React ES6 does not do this by default
    this.leaveHandler = this.leaveHandler.bind(this);
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  leaveHandler(e) {
    this.setState({
      submitted: false,
      username: ''
    });
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    // Prevent page refresh
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });

  }

  componentDidMount() {
    // Auto-focus on input text
    document.getElementById("inputText").focus();
  }

  render() {
    // If username is submitted - show main chat page
    if (this.state.submitted) {
      return (
        <ChatRoom
          leaveHandler={this.leaveHandler}
          username={this.state.username} />
      );
    }

    // Initial page load - show a simple login form
    return (
      <form onSubmit={this.usernameSubmitHandler} className="centered">
        <div className="loginWrapper">
          <div className="mainWrapper">
            <div id="appName" className="title">
              <h2>React Chat</h2>
            </div>
            <div>
              <input id="inputText"
                type="text"
                maxLength="30"
                onChange={this.usernameChangeHandler}
                placeholder="Enter a username..."
                required />
            </div>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    );
  }

}
App.defaultProps = {
};

export default App;
