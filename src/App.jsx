import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', (event) => {
      const newMessages = this.state.messages;
      const messageObject = JSON.parse(event.data);
      newMessages.push(messageObject);
      this.setState({messages: newMessages});
    });
  }

  onNewMessage(message) {
    this.socket.send(JSON.stringify({key: '', username: this.state.currentUser.name, content: message}));
  }

  onNewUsername(username) {
    this.setState({currentUser: {name: username} });
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} onNewUsername = {this.onNewUsername} onNewMessage={this.onNewMessage} />
      </div>
    );
  }
}
export default App;
