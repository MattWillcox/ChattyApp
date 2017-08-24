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

  //Reads event of user hitting enter after updating username and forwards to parent components
  onEnterUsername(event) {
    if(event.key === 'Enter'){
    this.props.onNewUsername(this.state.username);
    this.textInput.focus();
    }
  }

  //Reads event of user hitting enter after updating message field and forwards to parent components
  onEnterMessage(event) {
    const state = {};
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      state.content = '';
      event.target.value = '';
      this.setState(state);
    }
  }

  //Reads event of user adding characters to chat bar and updates current state
  onChangeMessage(event) {
    this.setState({
      content: event.target.value
    });
  }

  //Reads event of user adding characters to username and updates current state
  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  //Creates our HTML
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.onEnterUsername} onChange={this.onChangeUsername} placeholder="Enter a username and hit ENTER" />
        <input className="chatbar-message" ref={(thisInput) => {this.textInput = thisInput}} onKeyPress={this.onEnterMessage} onChange={this.onChangeMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;