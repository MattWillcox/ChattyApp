import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages.map(message => {
      if(message.type === 'incomingMessage'){
        return <Message
          key={message.key}
          username={message.username}
          content={message.content}
          userColor={message.color} />
      }
      if(message.type === 'incomingNotification'){
        return <Notification
          key={message.key}
          oldUsername={message.oldUsername}
          newUsername={message.newUsername} />
      }
      if(message.type === 'incomingImage'){
        return <img src={message.content} alt={message.username} key={message.key} className='message-image'/>
      }
    })
    return (
      <div className="message-list">
        {messages}
      </div>
    );
  }
}
export default MessageList;