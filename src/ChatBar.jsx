import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      username: '',
    }

    this.onEnterMessage = this.onEnterMessage.bind(this);
    this.onEnterUsername = this.onEnterUsername.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onEnterUsername(event) {
    if(event.key === 'Enter'){
    this.props.onNewUsername(this.state.username);
    }
  }

  onEnterMessage(event) {
    const state = {};
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      state.content = '';
      event.target.value = '';
      this.setState(state);
    }
  }

  onChangeMessage(event) {
    this.setState({
      content: event.target.value
    });
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.onEnterUsername} onChange={this.onChangeUsername} defaultValue= { this.props.name } />
        <input className="chatbar-message" onKeyPress={this.onEnterMessage} onChange={this.onChangeMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;