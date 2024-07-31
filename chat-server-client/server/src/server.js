import WebSocket, { WebSocketServer } from 'ws';
import { registerUser } from './users.js';
import { transmitMessage } from './message.js';

const wss = new WebSocketServer({ port: 8080 });

// const clients = new Map();
const groups = new Map();

wss.on('connection', function connection(ws) {
  ws.connection;
  ws.on('error', console.error);

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    const handler = caseHandlers.get(parsedMessage.type) || (() => console.log("Default case"));
    handler(parsedMessage, ws);

    // switch (parsedMessage.type) {
    //   case 'register':
    //     ws.email = parsedMessage.email;

    //     clients.set(parsedMessage.email, ws);
    //     ws.send(JSON.stringify({ type: 'info', message: 'User registered successfully' }));

    //     console.log(clients);
    //     break;

    //   case 'message':
    //     if (clients.has(parsedMessage.to)) {
    //       clients.get(parsedMessage.to).send(
    //         JSON.stringify({
    //           type: 'message',
    //           from: ws.username,
    //           message: parsedMessage.message,
    //         })
    //       );
    //     } else {
    //       ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
    //     }
    //     break;

    //   case 'joinGroup':
    //     console.log('joinGroup');
    //     break;
    // }
  });
});

// { "type": "register", "userName": "Alpha" }   { "type": "message", "to": "Beta", "message": "Hey, how are you" }
// { "type": "register", "userName": "Beta" }  { "type": "message", "to": "Alpha", "message": "Good!" }


const caseHandlers = new Map([
  ["register", registerUser],
  ["message", transmitMessage],
]);
