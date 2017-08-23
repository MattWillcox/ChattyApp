import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      username: '',
    }

    this.onEnter = this.onEnter.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onEnter(event) {
    const state = {};
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      state.content = '';
      event.target.value = '';
      this.setState(state);
    }
  }

  onBlur(event) {
    this.props.onNewUsername(this.state.username);
  }

  onChangeMessage(event) {
    this.setState({
      content: event.target.value
    });
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onBlur={ this.onBlur } onChange={ this.onChangeUsername } defaultValue= { this.props.name } />
        <input className="chatbar-message" onKeyPress={ this.onEnter } onChange={ this.onChangeMessage } placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;