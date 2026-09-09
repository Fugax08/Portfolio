import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { build } from '../src/index';
import type { FastifyInstance } from 'fastify';

describe('Health Endpoint', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = await build();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return health status', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);
    const json = JSON.parse(response.payload);
    expect(json).toHaveProperty('status');
    expect(json).toHaveProperty('timestamp');
  });
});

describe('Projects Endpoint', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = await build();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should fetch all projects', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/projects',
    });

    expect(response.statusCode).toBe(200);
    const projects = JSON.parse(response.payload);
    expect(Array.isArray(projects)).toBe(true);
  });

  it('should filter featured projects', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/projects?featured=true',
    });

    expect(response.statusCode).toBe(200);
    const projects = JSON.parse(response.payload);
    projects.forEach((project: any) => {
      expect(project.featured).toBe(true);
    });
  });
});

describe('Skills Endpoint', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = await build();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should fetch all skills', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/skills',
    });

    expect(response.statusCode).toBe(200);
    const skills = JSON.parse(response.payload);
    expect(Array.isArray(skills)).toBe(true);
  });
});
