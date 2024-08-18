import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastifyPlugin } from 'fastify-plugin';

export const initSwagger = fastifyPlugin((fastify, _, done) => {
    const opts = {
        swagger: {
            info: {
                title: 'Chat server',
                version: '1.0.0',
            },
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
            schemes: ['http'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
    };

    fastify.register(fastifySwagger, opts);

    const uiOpts = {
        routePrefix: '/api-docs',
        staticCSP: true,
        transformStaticCSP: (header) => header,
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
    };

    fastify.register(fastifySwaggerUi, uiOpts);
    done();
});
