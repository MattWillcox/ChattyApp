import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notifications: [],
      onlineUsers: 0
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', (event) => {
      const messageObject = JSON.parse(event.data);
      switch(messageObject.type) {
        case 'incomingMessage': {
          const newMessages = this.state.messages;
          newMessages.push({
            type: 'incomingMessage',
            key: messageObject.key,
            username: messageObject.username,
            content: messageObject.content,
            color: messageObject.color
          });
          this.setState({messages: newMessages});
          break;
        }
        case 'incomingNotification': {
          if(messageObject.newUsername){
            const newMessages = this.state.messages;
            newMessages.push({
              type: 'incomingNotification',
              key: messageObject.key,
              oldUsername: messageObject.oldUsername,
              newUsername: messageObject.newUsername
            });
            this.setState({messages: newMessages});
          }
          break;
        }
        case 'incomingImage': {
          const newMessages = this.state.messages;
          newMessages.push({
            type: 'incomingImage',
            key: messageObject.key,
            username: messageObject.username,
            content: messageObject.content,
            color: messageObject.color
          });
          this.setState({messages: newMessages});
          break;
        }
        case 'connectedUsers': {
          this.setState({onlineUsers: messageObject.count});
          break;
        }
      }
    });
  }

  onNewMessage(message) {
    var imgRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.(jpg$)|(png$)|(gif$)/;
    if(imgRegex.test(message)){
      this.socket.send(JSON.stringify({
        type: 'postImage',
        key: '',
        username: this.state.currentUser.name,
        content: message
      }));
    } else {
      this.socket.send(JSON.stringify({
        type: 'postMessage',
        key: '',
        username: this.state.currentUser.name,
        content: message
      }));
    }
  }

  onNewUsername(username) {
    this.socket.send(JSON.stringify({
      type: 'postNotification',
      key: '',
      oldUsername: this.state.currentUser.name,
      newUsername: username
    }));
    this.setState({currentUser: {name: username}});
  }

  render() {
    return (
      <div>
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} onNewUsername = {this.onNewUsername} onNewMessage={this.onNewMessage} />
      </div>
    );
  }
}
export default App;
