import React, {Component} from 'react';
import OnlineUsers from './OnlineUsers.jsx'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <h1 className="navbar-brand">Chatty</h1>
        <OnlineUsers onlineUsers={this.props.onlineUsers} />
      </nav>
    );
  }
}
export default NavBar;