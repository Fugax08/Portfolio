import { FastifyInstance } from 'fastify';
import { prisma } from '../index.js';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/api/health',
    {
      schema: {
        description: 'Check API health status',
        tags: ['health'],
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              timestamp: { type: 'string' },
              database: { type: 'string' },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      try {
        await prisma.$queryRaw`SELECT 1`;
        return reply.status(200).send({
          status: 'ok',
          timestamp: new Date().toISOString(),
          database: 'connected',
        });
      } catch (error) {
        return reply.status(503).send({
          status: 'error',
          timestamp: new Date().toISOString(),
          database: 'disconnected',
        });
      }
    }
  );
}
