import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import { PrismaClient } from '@prisma/client';
import { healthRoutes } from './routes/health.js';
import { projectRoutes } from './routes/projects.js';
import { skillRoutes } from './routes/skills.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = parseInt(process.env.API_PORT || '3001', 10);
const HOST = process.env.API_HOST || 'http://localhost:3001';
const NODE_ENV = process.env.NODE_ENV || 'development';

export const prisma = new PrismaClient();

async function build() {
  const fastify = Fastify({
    logger: NODE_ENV !== 'test',
  });

  // Register plugins
  await fastify.register(helmet);
  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Portfolio API',
        description: 'API for Luca Di Francesco - Software Engineer Portfolio',
        version: '1.0.0',
      },
      host: HOST.replace('http://', '').replace('https://', ''),
      schemes: [HOST.startsWith('https') ? 'https' : 'http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: undefined,
      preHandler: undefined,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    routePrefix: '/docs',
  });

  // Register routes
  await fastify.register(healthRoutes);
  await fastify.register(projectRoutes);
  await fastify.register(skillRoutes);

  // Error handling
  fastify.setErrorHandler(errorHandler);

  return fastify;
}

async function start() {
  try {
    const fastify = await build();
    await fastify.listen({ port: PORT, host: '0.0.0.0' });

    fastify.log.info(`Server running at http://localhost:${PORT}`);
    fastify.log.info(`API Docs at http://localhost:${PORT}/docs`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start server if not in test environment
if (NODE_ENV !== 'test') {
  start();
}

export { build };
