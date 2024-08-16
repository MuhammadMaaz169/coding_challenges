import { defaultController } from './index.controller.js';

export const defaultRoute = (fastify, _, done) => {
  const path = '/';

  fastify.route({
    method: 'GET',
    url: path,
    schema: {
      tags: ['default'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: defaultController,
  });
  done();
};
