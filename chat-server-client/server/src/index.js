import Fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket';

import { customLogger } from './common/logger.js';
import { configureHttpServer } from './http_server/index.js';
import { configureSocketServer } from './socket_server/index.js';

const app = Fastify({
    logger: true
});

app.register(fastifyWebsocket);


customLogger.setLogger(app.log);

(() => {
    configureHttpServer(app);
    configureSocketServer(app);
})()