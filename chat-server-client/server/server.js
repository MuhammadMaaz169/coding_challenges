import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const clients = new Map();
const groups = new Map();

wss.on('connection', function connection(ws) {
  ws.connection;
  ws.on('error', console.error);

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    switch (parsedMessage.type) {
      case 'register':
        ws.username = parsedMessage.username;
        clients.set(parsedMessage.userName, ws);
        ws.send(JSON.stringify({ type: 'info', message: 'User registered successfully' }));
        break;

      case 'message':
        if (clients.has(parsedMessage.to)) {
          clients.get(parsedMessage.to).send(
            JSON.stringify({
              type: 'message',
              from: ws.username,
              message: parsedMessage.message,
            })
          );
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
        }
        break;

      case 'joinGroup':
        console.log('joinGroup');
        break;
    }
  });
});

// { "type": "register", "userName": "Alpha" }   { "type": "message", "to": "Beta", "message": "Hey, how are you" }
// { "type": "register", "userName": "Beta" }  { "type": "message", "to": "Alpha", "message": "Good!" }
