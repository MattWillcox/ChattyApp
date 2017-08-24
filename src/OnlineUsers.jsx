import React, {Component} from 'react';

class OnlineUsers extends Component {
  render() {
    return (
        <span className="online-users">
          {this.props.onlineUsers} user(s) online.
        </span>
    );
  }
}
export default OnlineUsers;