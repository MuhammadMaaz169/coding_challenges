import Fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket';

import { customLogger } from './common/logger.js';
import { configureHttpServer } from './http_server/index.js';
import { configureSocketServer } from './socket_server/index.js';
import fastifyCookie from '@fastify/cookie'
const app = Fastify({
    logger: true
});

app.register(fastifyWebsocket);
app.register(fastifyCookie)

customLogger.setLogger(app.log);

(() => {
    configureHttpServer(app);
    configureSocketServer(app);
})()