import { WebSocketServer } from 'ws';
import { auth } from '../common/auth.middleware.js';

export const configureSocketServer = (app) => {
  app.register(async function (fastify) {
    fastify.route({
      method: 'get',
      url: '/',
      websocket: true,
      preHandler: [auth],
      handler: websocketHandler,
    });
  });
};

const websocketHandler = (socket) => {
  socket.on('message', (message) => {
    socket.send('hi from server');
  });
};

// const caseHandlers = new Map([['message', transmitMessage]]);
// const transmitMessage = (payload, ws) => {};
