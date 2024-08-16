import { login } from './auth.controller.js';

export const authRoutes = (fastify, _, done) => {
  const path = '/auth/login';

  fastify.route({
    method: 'POST',
    url: path,
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: login,
  });
  done();
};
