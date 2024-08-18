import { auth } from '../../../common/auth.middleware.js';
import { login, testAuthentication } from './auth.controller.js';

export const authRoutes = (fastify, _, done) => {
  const path = '/auth';

  fastify.route({
    method: 'POST',
    url: path + '/login',
    schema: {
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', default: 'user1@gmail.com', },
          password: { type: 'string', default: '1234',  },
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

  fastify.route({
    method: 'GET',
    url: path + '/test',
    schema: {
      description: "Test authentication",
      tags: ['Auth'],
      response: {
        200: {
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
    preHandler: [auth],
    handler: testAuthentication,
  });
  done();
};
