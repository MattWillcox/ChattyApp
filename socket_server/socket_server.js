// server/server.js
const express = require('express');
const http = require('http');
const ws = require('ws');
const uuidv1 = require('uuid/v1');

const app = express();

const server = http.createServer(app);
const wss = new ws.Server({server});
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

const onlineUsers = {
  type: 'connectedUsers',
  count: 0
}

const colors = ['#C0392B', '#3498DB', '#229954', '#230290']; //Array of possible username colors

//Broadcast function to send updates to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

/*  Reads on user connection and waits for messages.
    On message received it will check type and emit a response based on it.
    Possible types are message, notification and image. Once response is created
    it will send it out as a broadcast to all clients. It will also keep track of
    connecting/disconnecting users and emit the current count for tracking  */
wss.on('connection', (ws) => {
  console.log('Client connected');
  userColor = colors.shift();
  colors.push(userColor);
  onlineUsers.count = wss.clients.size;
  wss.broadcast(JSON.stringify(onlineUsers));

  ws.on('message', (message)=> {
    const receivedMessage = JSON.parse(message);
    let messageObject = {};
    if(receivedMessage.type === 'postMessage'){
      messageObject = {
        type: 'incomingMessage',
        key: uuidv1(),
        username: receivedMessage.username,
        content: receivedMessage.content,
        color: userColor
      };
    }
    if(receivedMessage.type === 'postNotification'){
       messageObject = {
        type: 'incomingNotification',
        key: uuidv1(),
        oldUsername: receivedMessage.oldUsername,
        newUsername: receivedMessage.newUsername
      };
    }
    if(receivedMessage.type === 'postImage'){
      messageObject = {
        type: 'incomingImage',
        key: uuidv1(),
        username: receivedMessage.username,
        content: receivedMessage.content,
        color: userColor
      };
    }
  wss.broadcast(JSON.stringify(messageObject));
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers.count = wss.clients.size;
    wss.broadcast(JSON.stringify(onlineUsers));
  })
});

server.listen(3001, () => {
  console.log('Server listening on ', server.address().port);
});