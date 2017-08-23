// server/server.js
const express = require('express');
const http = require('http');
const ws = require('ws');
const uuidv1 = require('uuid/v1');

const app = express();

const server = http.createServer(app);
// const wss = new ws.Server({server: server});
const wss = new ws.Server({server});
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message)=> {
    const receivedMessage = JSON.parse(message);
    const messageObject = {
      key: uuidv1(),
      username: receivedMessage.username,
      content: receivedMessage.content
    };
    wss.broadcast(JSON.stringify(messageObject));
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3001, () => {
  console.log('Server listening on ', server.address().port);
});