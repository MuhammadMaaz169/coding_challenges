import Fastify from 'fastify'
import { customLogger } from './common/logger.js';
import { configureHttpServer } from './http_server/index.js';
const app = Fastify({
    logger: true
});

customLogger.setLogger(app.log);

(() => {
    configureHttpServer(app);
    // configureSocketServer(app);
})()